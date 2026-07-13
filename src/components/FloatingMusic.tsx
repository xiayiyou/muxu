import { useRef, useEffect, useState } from "react";
import { Play, Pause, SkipForward, X, Music } from "lucide-react";
import { useAppStore } from "@/store/app";

export default function FloatingMusic() {
  const musicFloating = useAppStore((s) => s.musicFloating);
  const setMusicFloating = useAppStore((s) => s.setMusicFloating);
  const songs = useAppStore((s) => s.songs);
  const musicPlaying = useAppStore((s) => s.musicPlaying);
  const setMusicPlaying = useAppStore((s) => s.setMusicPlaying);
  const musicCurrentIndex = useAppStore((s) => s.musicCurrentIndex);
  const setMusicCurrentIndex = useAppStore((s) => s.setMusicCurrentIndex);
  const musicSwitchNote = useAppStore((s) => s.musicSwitchNote);
  const setMusicSwitchNote = useAppStore((s) => s.setMusicSwitchNote);
  const phoneOpen = useAppStore((s) => s.phoneOpen);
  const setPhoneOpen = useAppStore((s) => s.setPhoneOpen);

  const audioRef = useRef<HTMLAudioElement>(null);
  const currentSong = songs[musicCurrentIndex];

  const [pos, setPos] = useState(() => ({
    x: typeof window !== "undefined" ? window.innerWidth - 260 : 100,
    y: typeof window !== "undefined" ? window.innerHeight - 80 : 100,
  }));
  const draggingRef = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0 });
  const movedRef = useRef(false);

  useEffect(() => {
    if (audioRef.current && currentSong?.url) {
      audioRef.current.src = currentSong.url;
      if (musicPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [musicCurrentIndex, currentSong?.url, musicPlaying]);

  const handleEnded = () => {
    if (songs.length === 0) return;
    if (Math.random() < 0.02 && songs.length > 1) {
      let newIdx = musicCurrentIndex;
      while (newIdx === musicCurrentIndex) {
        newIdx = Math.floor(Math.random() * songs.length);
      }
      setMusicCurrentIndex(newIdx);
      setMusicPlaying(true);
      setMusicSwitchNote("宝宝，我换一首歌吧，这个好听");
      return;
    }
    const nextIdx = musicCurrentIndex < songs.length - 1 ? musicCurrentIndex + 1 : 0;
    setMusicCurrentIndex(nextIdx);
    setMusicPlaying(true);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    draggingRef.current = true;
    movedRef.current = false;
    offsetRef.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!draggingRef.current) return;
      movedRef.current = true;
      setPos({
        x: Math.max(0, Math.min(window.innerWidth - 200, e.clientX - offsetRef.current.x)),
        y: Math.max(0, Math.min(window.innerHeight - 60, e.clientY - offsetRef.current.y)),
      });
    };
    const handleUp = () => { draggingRef.current = false; };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, []);

  const handleClick = () => {
    if (movedRef.current) return;
    setMusicFloating(false);
    setPhoneOpen(true);
  };

  if (!musicFloating || !currentSong) return null;

  return (
    <>
      <audio ref={audioRef} onEnded={handleEnded} />

      {/* 切歌弹窗 */}
      {musicSwitchNote && (
        <div
          className="fixed z-[210] flex items-center justify-center"
          style={{ top: pos.y - 70, left: Math.max(0, pos.x) }}
        >
          <div
            className="animate-bubbleIn rounded-2xl border px-4 py-3 shadow-xl"
            style={{
              background: "var(--card)",
              borderColor: "var(--accent)",
              maxWidth: "280px",
            }}
          >
            <div className="mb-1 text-xs font-medium" style={{ color: "var(--accent)" }}>
              🎵 切歌提示
            </div>
            <div className="text-sm" style={{ color: "var(--text)" }}>
              {musicSwitchNote}
            </div>
            <button
              onClick={() => setMusicSwitchNote(null)}
              className="mt-2 w-full rounded-lg py-1.5 text-xs font-medium"
              style={{ background: "var(--accent)", color: "var(--card)" }}
            >
              好的
            </button>
          </div>
        </div>
      )}

      {/* 悬浮音乐播放器 */}
      <div
        className="fixed z-[200] select-none"
        style={{ left: pos.x, top: pos.y, maxWidth: "240px" }}
        onMouseDown={handleMouseDown}
      >
        <div
          className="flex items-center gap-2 rounded-2xl border px-3 py-2 shadow-xl cursor-pointer transition hover:shadow-2xl"
          style={{
            background: "var(--card)",
            borderColor: "var(--card-border)",
          }}
          onClick={handleClick}
        >
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
            style={{ background: "color-mix(in srgb, var(--accent) 15%, transparent)" }}
          >
            <Music className="h-4 w-4" style={{ color: "var(--accent)" }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="truncate text-xs font-medium" style={{ color: "var(--text)" }}>
              {currentSong?.title || "无歌曲"}
            </div>
            <div className="text-[10px]" style={{ color: "var(--text-soft)" }}>
              {musicPlaying ? "播放中" : "已暂停"}
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); setMusicPlaying(!musicPlaying); }}
            className="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-black/5"
            style={{ color: "var(--accent)" }}
          >
            {musicPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (songs.length === 0) return;
              const nextIdx = musicCurrentIndex < songs.length - 1 ? musicCurrentIndex + 1 : 0;
              setMusicCurrentIndex(nextIdx);
              setMusicPlaying(true);
            }}
            className="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-black/5"
            style={{ color: "var(--text-soft)" }}
          >
            <SkipForward className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMusicFloating(false);
              setMusicPlaying(false);
            }}
            className="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-red-50"
            style={{ color: "#E74C3C" }}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </>
  );
}
