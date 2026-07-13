import React, { useState, useRef, useEffect } from "react";
import { Phone, PhoneOff, Maximize2 } from "lucide-react";
import { useAppStore } from "@/store/app";

export default function FloatingPhone() {
  const floatingPhone = useAppStore((s) => s.floatingPhone);
  const activeCall = useAppStore((s) => s.activeCall);
  const activeCallDuration = useAppStore((s) => s.activeCallDuration);
  const setCallModalOpen = useAppStore((s) => s.setCallModalOpen);
  const endActiveCall = useAppStore((s) => s.endActiveCall);

  const [pos, setPos] = useState({ x: 16, y: 100 });
  const dragging = useRef(false);
  const moved = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (floatingPhone && activeCall) {
      setPos({
        x: typeof window !== "undefined" ? window.innerWidth - 180 : 100,
        y: typeof window !== "undefined" ? window.innerHeight - 160 : 100,
      });
    }
  }, [floatingPhone, activeCall]);

  const handleMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    moved.current = false;
    const rect = e.currentTarget.getBoundingClientRect();
    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      moved.current = true;
      const maxX = window.innerWidth - 170;
      const maxY = window.innerHeight - 50;
      setPos({
        x: Math.max(0, Math.min(maxX, e.clientX - offset.current.x)),
        y: Math.max(0, Math.min(maxY, e.clientY - offset.current.y)),
      });
    };
    const handleUp = () => {
      dragging.current = false;
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, []);

  const handleClick = () => {
    if (moved.current) return;
    setCallModalOpen(true);
  };

  const handleEndCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    endActiveCall();
  };

  if (!floatingPhone || !activeCall) return null;

  return (
    <div
      className="fixed z-[200] select-none cursor-pointer"
      style={{ left: pos.x, top: pos.y }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      <div
        className="flex items-center gap-3 rounded-full border px-3 py-2 shadow-lg transition hover:shadow-xl"
        style={{
          borderColor: "var(--card-border)",
          background: "var(--card)",
        }}
      >
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full text-base font-bold"
          style={{ background: "var(--bg)", color: "var(--text)" }}
        >
          {activeCall.contactAvatar || "他"}
        </div>

        <div className="flex flex-col">
          <div
            className="text-xs font-bold leading-tight"
            style={{ color: "var(--text)" }}
          >
            {activeCall.contactName}
          </div>
          <div
            className="text-[10px] leading-tight"
            style={{ color: "#2ECC71" }}
          >
            {activeCall.status === "calling" && "呼叫中..."}
            {activeCall.status === "connected" && formatDuration(activeCallDuration)}
            {activeCall.status === "rejected" && "已挂断"}
          </div>
        </div>

        <button
          onClick={handleEndCall}
          className="ml-1 flex h-7 w-7 items-center justify-center rounded-full transition hover:scale-110"
          style={{
            background: "#E74C3C",
            color: "white",
          }}
          aria-label="挂断"
        >
          <PhoneOff className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
