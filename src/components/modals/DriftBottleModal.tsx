import React, { useState, useMemo, useEffect } from "react";
import { X, Send, Waves } from "lucide-react";
import { useAppStore } from "@/store/app";

interface DriftBottleModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactId: string;
}

export default function DriftBottleModal({ isOpen, onClose, contactId }: DriftBottleModalProps) {
  const driftBottles = useAppStore((s) => s.driftBottles);
  const contacts = useAppStore((s) => s.contacts);
  const addDriftBottle = useAppStore((s) => s.addDriftBottle);
  const markDriftBottleRead = useAppStore((s) => s.markDriftBottleRead);
  const myName = useAppStore((s) => s.beauty.myName);

  const [inputText, setInputText] = useState("");

  const contact = useMemo(
    () => contacts.find((c) => c.id === contactId),
    [contacts, contactId]
  );

  const bottles = useMemo(() => {
    return driftBottles
      .filter((b) => b.contactId === contactId)
      .sort((a, b) => a.timestamp - b.timestamp);
  }, [driftBottles, contactId]);

  useEffect(() => {
    if (isOpen) {
      bottles.forEach((b) => {
        if (!b.isRead) {
          markDriftBottleRead(b.id);
        }
      });
    }
  }, [isOpen, bottles, markDriftBottleRead]);

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${month}月${day}日 ${hours}:${minutes}`;
  };

  const getSenderName = (from: string) => {
    if (from === "me") return myName || "我";
    return contact?.name || "对方";
  };

  const handleSubmit = () => {
    const text = inputText.trim();
    if (!text) return;
    addDriftBottle(contactId, text);
    setInputText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        className="relative flex w-[90%] max-w-sm flex-col animate-popIn rounded-2xl border shadow-2xl overflow-hidden"
        style={{
          borderColor: "rgba(0, 100, 180, 0.3)",
          background: "linear-gradient(180deg, #E8F4FC 0%, #D0E8F5 100%)",
          maxHeight: "80vh",
          height: "28rem",
        }}
      >
        <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: "rgba(0, 100, 180, 0.2)" }}>
          <div className="flex items-center gap-2">
            <Waves className="h-5 w-5" style={{ color: "#0066B3" }} />
            <h2 className="text-lg font-bold" style={{ color: "#003366" }}>
              漂流瓶
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-black/10"
            style={{ color: "#003366" }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div
          className="flex-1 overflow-y-auto fancy-scroll px-4 py-3"
          style={{
            background: "linear-gradient(180deg, rgba(232, 244, 252, 0.5) 0%, rgba(208, 232, 245, 0.5) 100%)",
          }}
        >
          {bottles.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-2" style={{ color: "#004488" }}>
              <Waves className="h-10 w-10 opacity-30" />
              <div className="text-sm">还没有漂流瓶</div>
              <div className="text-xs opacity-70">扔一个瓶子试试吧</div>
            </div>
          ) : (
            <div className="space-y-3">
              {bottles.map((bottle) => {
                const isMe = bottle.from === "me";
                return (
                  <div
                    key={bottle.id}
                    className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className="max-w-[80%] rounded-2xl px-4 py-2 shadow-sm"
                      style={{
                        background: isMe
                          ? "linear-gradient(135deg, #66B2FF 0%, #3388DD 100%)"
                          : "linear-gradient(135deg, #FFFFFF 0%, #F0F8FF 100%)",
                        border: isMe ? "none" : "1px solid rgba(0, 100, 180, 0.2)",
                        color: isMe ? "#FFFFFF" : "#003366",
                      }}
                    >
                      {!isMe && (
                        <div className="mb-1 text-xs font-medium" style={{ color: "#0066B3" }}>
                          {getSenderName(bottle.from)}
                        </div>
                      )}
                      <p className="whitespace-pre-line text-sm leading-relaxed">
                        {bottle.text}
                      </p>
                      <div
                        className={`mt-1 text-[10px] ${isMe ? "text-white/70" : "text-[#0066B3]/60"}`}
                      >
                        {formatTime(bottle.timestamp)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div
          className="flex items-center gap-2 border-t px-4 py-3"
          style={{
            borderColor: "rgba(0, 100, 180, 0.2)",
            background: "rgba(255, 255, 255, 0.6)",
          }}
        >
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="扔一个漂流瓶..."
            className="flex-1 rounded-xl border px-3 py-2 text-sm focus:outline-none"
            style={{
              borderColor: "rgba(0, 100, 180, 0.3)",
              background: "#FFFFFF",
              color: "#003366",
            }}
          />
          <button
            onClick={handleSubmit}
            disabled={!inputText.trim()}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition disabled:opacity-40"
            style={{
              background: "linear-gradient(135deg, #0066B3 0%, #004488 100%)",
            }}
          >
            <Send className="h-4 w-4" style={{ color: "#FFFFFF" }} />
          </button>
        </div>
      </div>
    </div>
  );
}
