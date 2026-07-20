import { useState, useRef, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Send } from "lucide-react";
import { useAppStore } from "@/store/app";

const FONTS = [
  { label: "默认", value: "inherit" },
  { label: "宋体", value: "'Songti SC', 'STSong', 'SimSun', serif" },
  { label: "楷体", value: "'Kaiti SC', 'STKaiti', 'KaiTi', serif" },
  { label: "黑体", value: "'PingFang SC', 'Heiti SC', sans-serif" },
  { label: "圆体", value: "'Yuanti SC', 'STYuanti', sans-serif" },
  { label: "手写", value: "'Hannotate SC', 'STHannotate', cursive" },
  { label: "行楷", value: "'Xingkai SC', 'STXingkai', cursive" },
  { label: "魏碑", value: "'Baoli SC', 'STBaoli', serif" },
  { label: "隶书", value: "'Libian SC', 'STLibian', serif" },
  { label: "娃娃体", value: "'Wawati SC', 'STWawati', cursive" },
  { label: "漫画体", value: "'Comic Sans MS', 'Hannotate SC', cursive" },
  { label: "幼圆", value: "'Yuppy SC', 'STYuppy', sans-serif" },
];

const PAGE_CHARS = 120; // 每页约120字

export default function BottleLetterWriter({ onClose }: { onClose: () => void }) {
  const sendBottleLetter = useAppStore((s) => s.sendBottleLetter);
  const [text, setText] = useState("");
  const [font, setFont] = useState(FONTS[1].value);
  const [fontSize, setFontSize] = useState(16);
  const [page, setPage] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [pageFlip, setPageFlip] = useState(false);

  // 自动分页
  const pages: string[] = [];
  for (let i = 0; i < text.length; i += PAGE_CHARS) {
    pages.push(text.slice(i, i + PAGE_CHARS));
  }
  if (pages.length === 0) pages.push("");

  const currentPage = pages[Math.min(page, pages.length - 1)] || "";
  const isLastPage = page >= pages.length - 1;

  // 自动跳到最后一页
  useEffect(() => {
    if (page > pages.length - 1) setPage(pages.length - 1);
  }, [pages.length]);

  const playFlipSound = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch {
      // 静默
    }
  };

  const handleNextPage = () => {
    if (isLastPage) return;
    setPageFlip(true);
    playFlipSound();
    setTimeout(() => {
      setPage((p) => p + 1);
      setPageFlip(false);
    }, 300);
  };

  const handlePrevPage = () => {
    if (page === 0) return;
    setPageFlip(true);
    playFlipSound();
    setTimeout(() => {
      setPage((p) => p - 1);
      setPageFlip(false);
    }, 300);
  };

  const handleSend = () => {
    if (!text.trim()) return;
    sendBottleLetter(text.trim(), font, fontSize);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* 信纸 */}
      <div
        className={`relative ${pageFlip ? "animate-letterFlip" : ""}`}
        style={{
          width: "min(340px, 90vw)",
          height: "min(480px, 80vh)",
          perspective: "1200px",
        }}
      >
        <div
          className="relative h-full w-full overflow-hidden rounded-lg shadow-2xl"
          style={{
            backgroundImage: "url(/driftbottle/letter.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* 关闭按钮 */}
          <button
            onClick={onClose}
            className="absolute right-2 top-2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 transition hover:bg-black/50 active:scale-90"
            style={{ color: "#fff" }}
          >
            <X className="h-5 w-5" />
          </button>

          {/* 写字区 - 从1/8处开始，不滚动，超长自动到下一页 */}
          <textarea
            value={currentPage}
            onChange={(e) => {
              const newText = text.slice(0, page * PAGE_CHARS) + e.target.value + text.slice((page + 1) * PAGE_CHARS);
              setText(newText);
            }}
            placeholder="在此写信..."
            className="absolute inset-0 resize-none overflow-hidden border-none bg-transparent px-6 pb-20 pt-[12.5%] text-center focus:outline-none"
            style={{
              fontFamily: font,
              fontSize: `${fontSize}px`,
              color: "#1a3a6b",
              lineHeight: 1.8,
              background: "transparent",
            }}
          />

          {/* 底部控制栏 */}
          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-2 bg-gradient-to-t from-black/30 to-transparent px-3 pb-3 pt-6">
            {/* 翻页按钮 */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevPage}
                disabled={page === 0}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 transition hover:bg-white active:scale-90 disabled:opacity-30"
                style={{ color: "#1a3a6b" }}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-[11px] font-medium" style={{ color: "#1a3a6b" }}>
                {page + 1} / {pages.length}
              </span>
              <button
                onClick={handleNextPage}
                disabled={isLastPage}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 transition hover:bg-white active:scale-90 disabled:opacity-30"
                style={{ color: "#1a3a6b" }}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="flex w-full items-center justify-between gap-2">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="rounded-lg bg-white/80 px-3 py-1.5 text-[11px] font-medium transition hover:bg-white"
                style={{ color: "#1a3a6b" }}
              >
                字体
              </button>

              <button
                onClick={handleSend}
                disabled={!text.trim()}
                className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[12px] font-bold transition disabled:opacity-40 active:scale-95"
                style={{ background: "#1a3a6b", color: "#fff" }}
              >
                <Send className="h-3.5 w-3.5" />
                寄出
              </button>
            </div>

            {/* 字体设置 */}
            {showSettings && (
              <div className="flex w-full flex-col gap-2 rounded-xl bg-white/95 p-2.5 shadow-lg">
                <div className="flex flex-wrap gap-1">
                  {FONTS.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setFont(f.value)}
                      className={`rounded-md px-2 py-1 text-[10px] transition ${
                        font === f.value ? "bg-[#1a3a6b] text-white" : "hover:bg-black/10"
                      }`}
                      style={{ fontFamily: f.value, color: font === f.value ? "#fff" : "#1a3a6b" }}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px]" style={{ color: "#1a3a6b" }}>字号</span>
                  <input
                    type="range"
                    min={12}
                    max={24}
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-[10px] w-6" style={{ color: "#1a3a6b" }}>{fontSize}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
