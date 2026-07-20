import { useState, useMemo, useEffect, useCallback } from "react";
import { Book, Library } from "lucide-react";
import { useAppStore } from "@/store/app";
import BottleCardLibrary from "./BottleCardLibrary";
import BottleDiary from "./BottleDiary";
import BottleLetterWriter from "./BottleLetterWriter";
import { AppHeader } from "./HomeScreen";

interface StarItem {
  id: string;
  x: number;
  y: number;
  size: number;
}

interface OceanItem {
  id: string;
  x: number;
  y: number;
  type: "coral" | "pearl" | "shell" | "wave";
}

// 不重叠地生成随机位置
function generateNonOverlapping(count: number, areaWidth: number, areaHeight: number, minDist: number): { x: number; y: number }[] {
  const positions: { x: number; y: number }[] = [];
  let attempts = 0;
  const maxAttempts = count * 30;
  while (positions.length < count && attempts < maxAttempts) {
    attempts++;
    const x = Math.random() * (areaWidth - 40) + 20;
    const y = Math.random() * (areaHeight - 40) + 20;
    const ok = positions.every((p) => Math.hypot(p.x - x, p.y - y) >= minDist);
    if (ok) positions.push({ x, y });
  }
  // 如果位置不够，填充随机位置
  while (positions.length < count) {
    positions.push({
      x: Math.random() * (areaWidth - 40) + 20,
      y: Math.random() * (areaHeight - 40) + 20,
    });
  }
  return positions;
}

function getTodayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function DriftBottleApp({ onBack }: { onBack: () => void }) {
  const bottleNoteCards = useAppStore((s) => s.bottleNoteCards);
  const bottleWhisperCards = useAppStore((s) => s.bottleWhisperCards);
  const bottleStarPicks = useAppStore((s) => s.bottleStarPicks);
  const pickBottleStar = useAppStore((s) => s.pickBottleStar);
  const pickBottleOcean = useAppStore((s) => s.pickBottleOcean);
  const bottleLetters = useAppStore((s) => s.bottleLetters);

  const [view, setView] = useState<"main" | "library" | "diary">("main");
  const [showLetter, setShowLetter] = useState(false);
  const [pickedNote, setPickedNote] = useState<string | null>(null);
  const [pickedWhisper, setPickedWhisper] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const today = getTodayKey();
  const todayPicks = bottleStarPicks[today] || { morning: false, noon: false, evening: false };

  // 当前时段
  const getCurrentSlot = (): "morning" | "noon" | "evening" => {
    const h = new Date().getHours();
    if (h < 10) return "morning";
    if (h < 15) return "noon";
    return "evening";
  };

  // 可领取的星星数量（考虑未领取累积）
  const availableStars = useMemo(() => {
    const slot = getCurrentSlot();
    let count = 0;
    if (slot === "morning" && !todayPicks.morning) count++;
    if ((slot === "noon" || slot === "evening") && !todayPicks.morning) count++;
    if (slot === "noon" && !todayPicks.noon) count++;
    if (slot === "evening" && !todayPicks.noon) count++;
    if (slot === "evening" && !todayPicks.evening) count++;
    return Math.min(count, 3);
  }, [todayPicks]);

  // 生成星星位置
  const stars = useMemo<StarItem[]>(() => {
    const count = Math.max(1, Math.min(availableStars, 4));
    const positions = generateNonOverlapping(count, 100, 100, 30);
    return positions.map((p, i) => ({
      id: `star_${refreshKey}_${i}`,
      x: p.x,
      y: p.y * 0.5 + 5, // 上1/3区域
      size: 32 + Math.random() * 16,
    }));
  }, [availableStars, refreshKey]);

  // 生成海洋小物位置（1-6个，不重叠，无限制）
  const oceanItems = useMemo<OceanItem[]>(() => {
    const count = Math.floor(Math.random() * 6) + 1;
    const positions = generateNonOverlapping(count, 100, 100, 28);
    const types: OceanItem["type"][] = ["coral", "pearl", "shell", "wave"];
    return positions.map((p, i) => ({
      id: `ocean_${refreshKey}_${i}`,
      x: p.x,
      y: 70 + p.y * 0.3, // 下1/3区域
      type: types[Math.floor(Math.random() * types.length)],
    }));
  }, [refreshKey]);

  const oceanImages: Record<OceanItem["type"], string> = {
    coral: "/driftbottle/coral.png",
    pearl: "/driftbottle/pearl.png",
    shell: "/driftbottle/shell.png",
    wave: "/driftbottle/wave.png",
  };

  // 刷新海洋小物
  const refreshOcean = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  const handleStarClick = (starId: string) => {
    if (bottleNoteCards.length === 0) return;
    const card = bottleNoteCards[Math.floor(Math.random() * bottleNoteCards.length)];
    pickBottleStar(card.content);
    setPickedNote(card.content);

    // 标记当前时段已领取
    const slot = getCurrentSlot();
    const newPicks = { ...todayPicks };
    if (slot === "morning" && !newPicks.morning) newPicks.morning = true;
    else if (slot === "noon" && !newPicks.noon) newPicks.noon = true;
    else if (slot === "evening" && !newPicks.evening) newPicks.evening = true;
    else {
      // 找未领取的时段
      if (!newPicks.morning) newPicks.morning = true;
      else if (!newPicks.noon) newPicks.noon = true;
      else if (!newPicks.evening) newPicks.evening = true;
    }
    useAppStore.setState((s) => ({
      bottleStarPicks: { ...s.bottleStarPicks, [today]: newPicks },
    }));

    // 移除被点击的星星
    setTimeout(() => {
      setPickedNote(null);
      setRefreshKey((k) => k + 1);
    }, 2000);
  };

  const handleOceanClick = (item: OceanItem) => {
    if (bottleWhisperCards.length === 0) return;
    const card = bottleWhisperCards[Math.floor(Math.random() * bottleWhisperCards.length)];
    pickBottleOcean(card.content);
    setPickedWhisper(card.content);
    // 海洋小物无限制，点击后刷新新的（1-3个）
    setTimeout(() => {
      setPickedWhisper(null);
      setRefreshKey((k) => k + 1);
    }, 3000);
  };

  // 信封点击
  const handleEnvelopeClick = () => {
    setShowLetter(true);
  };

  const pendingLetters = bottleLetters.filter((l) => !l.receivedAt);
  const receivedLetters = bottleLetters.filter((l) => l.receivedAt && !l.replyAt);
  const repliedLetters = bottleLetters.filter((l) => l.replyAt);

  if (view === "library") return <BottleCardLibrary onBack={() => setView("main")} />;
  if (view === "diary") return <BottleDiary onBack={() => setView("main")} />;
  if (showLetter) return <BottleLetterWriter onClose={() => setShowLetter(false)} />;

  return (
    <div className="relative h-[480px] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 z-20">
        <AppHeader title="漂流瓶" onBack={onBack} />
      </div>

      {/* 底图 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/driftbottle/bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* 星星区域（上1/3） */}
      <div className="absolute top-0 left-0 right-0 z-10" style={{ height: "33%", pointerEvents: "none" }}>
        {stars.map((star) => (
          <button
            key={star.id}
            onClick={() => handleStarClick(star.id)}
            className="absolute animate-twinkle transition-transform hover:scale-125 active:scale-90"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              transform: "translate(-50%, -50%)",
              pointerEvents: "auto",
            }}
          >
            <img src="/driftbottle/star.png" alt="star" className="h-full w-full object-contain drop-shadow-lg" />
          </button>
        ))}
      </div>

      {/* 信封（中间） */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <button
          onClick={handleEnvelopeClick}
          className="transition-transform hover:scale-110 active:scale-95"
          title="写信塞入漂流瓶"
        >
          <img src="/driftbottle/envelope.png" alt="envelope" className="h-16 w-16 object-contain drop-shadow-xl" />
        </button>
        {pendingLetters.length > 0 && (
          <div className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
            {pendingLetters.length}
          </div>
        )}
      </div>

      {/* 海洋小物区域（下1/3） */}
      <div className="absolute bottom-0 left-0 right-0 z-10" style={{ height: "33%", pointerEvents: "none" }}>
        {oceanItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleOceanClick(item)}
            className="absolute transition-transform hover:scale-125 active:scale-90"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              width: 36,
              height: 36,
              transform: "translate(-50%, -50%)",
              pointerEvents: "auto",
            }}
          >
            <img src={oceanImages[item.type]} alt={item.type} className="h-full w-full object-contain drop-shadow-lg" />
          </button>
        ))}
      </div>

      {/* 底部工具栏 */}
      <div className="absolute bottom-2 left-2 right-2 z-20 flex items-center justify-between">
        <button
          onClick={() => setView("diary")}
          className="flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-sm transition hover:scale-105"
          style={{ borderColor: "#ffffff60", background: "#ffffff30", color: "#fff" }}
          title="日记本"
        >
          <Book className="h-4 w-4" />
        </button>
        <button
          onClick={() => setView("library")}
          className="flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-sm transition hover:scale-105"
          style={{ borderColor: "#ffffff60", background: "#ffffff30", color: "#fff" }}
          title="字卡库"
        >
          <Library className="h-4 w-4" />
        </button>
      </div>

      {/* 拾取星星提示 */}
      {pickedNote && (
        <div className="absolute left-1/2 top-1/3 z-30 -translate-x-1/2 -translate-y-1/2 animate-popIn rounded-2xl bg-white/95 p-4 shadow-2xl" style={{ width: "min(280px, 80%)" }}>
          <div className="mb-1 text-center text-2xl">⭐</div>
          <div className="text-center text-[14px] font-medium leading-relaxed" style={{ color: "#1a3a6b" }}>
            {pickedNote}
          </div>
        </div>
      )}

      {/* 拾取海洋小物提示 */}
      {pickedWhisper && (
        <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 animate-popIn rounded-2xl bg-white/95 p-4 shadow-2xl" style={{ width: "min(280px, 80%)" }}>
          <div className="mb-1 text-center text-2xl">🐚</div>
          <div className="text-center text-[13px] leading-relaxed" style={{ color: "#1a3a6b" }}>
            {pickedWhisper}
          </div>
        </div>
      )}

      {/* 信件状态提示 */}
      {(receivedLetters.length > 0 || repliedLetters.length > 0) && (
        <div className="absolute right-2 top-14 z-20 flex flex-col gap-1">
          {receivedLetters.length > 0 && (
            <div className="rounded-full bg-green-500/90 px-2 py-0.5 text-[9px] text-white backdrop-blur-sm">
              对方收到 {receivedLetters.length} 封信
            </div>
          )}
          {repliedLetters.length > 0 && (
            <div className="rounded-full bg-blue-500/90 px-2 py-0.5 text-[9px] text-white backdrop-blur-sm">
              收到 {repliedLetters.length} 封回信
            </div>
          )}
        </div>
      )}
    </div>
  );
}
