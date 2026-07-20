import { useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useAppStore } from "@/store/app";

const BASE = import.meta.env.BASE_URL;
const img = (name: string) => `${BASE}driftbottle/${name}`;

export default function BottleDiary({ onBack, contactId }: { onBack: () => void; contactId: string | null }) {
  const bottleData = useAppStore((s) => contactId ? s.bottleData[contactId] : null);
  const bottleDiary = bottleData?.diary || [];
  const [page, setPage] = useState(0);
  const PER_PAGE = 5;
  const totalPages = Math.ceil(bottleDiary.length / PER_PAGE) || 1;
  const currentPage = bottleDiary.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  const formatTime = (timestamp: number) => {
    const d = new Date(timestamp);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  };

  const typeLabel: Record<string, { text: string; emoji: string }> = {
    star: { text: "拾星", emoji: "⭐" },
    ocean: { text: "拾贝", emoji: "🐚" },
    letter: { text: "寄信", emoji: "✉️" },
  };

  return (
    <div className="flex h-[480px] flex-col">
      <div className="flex items-center gap-2 border-b px-4 py-3" style={{ borderColor: "var(--card-border)", background: "var(--card)" }}>
        <button onClick={onBack} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-black/10" style={{ color: "var(--text)" }}>
          <ArrowLeft className="h-4 w-4" />
        </button>
        <h2 className="font-serif text-base font-bold" style={{ color: "var(--text)" }}>日记本</h2>
      </div>

      <div
        className="flex-1 overflow-y-auto fancy-scroll px-4 py-4"
        style={{
          background: "linear-gradient(180deg, #F7FBFF 0%, #E8F4FC 100%)",
        }}
      >
        {bottleDiary.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 py-20">
            <div className="text-3xl opacity-50">📖</div>
            <div className="text-[13px]" style={{ color: "#1a3a6b" }}>还没有记录</div>
            <div className="text-[11px]" style={{ color: "#1a3a6b80" }}>拾取星星、海洋小物或寄信后会记录在这里</div>
          </div>
        ) : (
          <div className="space-y-3">
            {currentPage.map((entry) => {
              const label = typeLabel[entry.type] || { text: "记录", emoji: "📝" };
              return (
                <div
                  key={entry.id}
                  className="rounded-xl border bg-white/80 p-3 shadow-sm backdrop-blur-sm"
                  style={{ borderColor: "#1a3a6b30" }}
                >
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[11px] font-medium" style={{ color: "#1a3a6b" }}>
                      {label.emoji} {label.text}
                    </span>
                    <span className="text-[10px]" style={{ color: "#1a3a6b80" }}>
                      {formatTime(entry.timestamp)}
                    </span>
                  </div>
                  <div className="text-[13px] leading-relaxed" style={{ color: "#1a3a6b" }}>
                    {entry.content}
                  </div>
                  {entry.reply && (
                    <div className="mt-2 rounded-lg bg-[#1a3a6b08] p-2">
                      <div className="mb-0.5 text-[10px] font-medium" style={{ color: "#1a3a6b80" }}>
                        💬 我的回复：
                      </div>
                      <div className="whitespace-pre-line text-[12px] leading-relaxed" style={{ color: "#1a3a6b" }}>
                        {entry.reply}
                      </div>
                    </div>
                  )}
                  {entry.herReply && (
                    <div className="mt-2 rounded-lg bg-[#e8a87c20] p-2">
                      <div className="mb-0.5 text-[10px] font-medium" style={{ color: "#c87941" }}>
                        💌 TA的回复：
                      </div>
                      <div className="whitespace-pre-line text-[12px] leading-relaxed" style={{ color: "#1a3a6b" }}>
                        {entry.herReply}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 翻页 */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 border-t px-3 py-2" style={{ borderColor: "var(--card-border)", background: "var(--card)" }}>
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="flex h-7 w-7 items-center justify-center rounded-full border transition hover:bg-black/5 disabled:opacity-30"
            style={{ borderColor: "var(--card-border)", color: "var(--text)" }}
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <span className="text-[11px]" style={{ color: "var(--text-soft)" }}>
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="flex h-7 w-7 items-center justify-center rounded-full border transition hover:bg-black/5 disabled:opacity-30"
            style={{ borderColor: "var(--card-border)", color: "var(--text)" }}
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
