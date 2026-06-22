export default function CheckpointGate({ angle = 0, animating = false, color = "#8b5cf6" }) {
  return (
    <div className="relative w-28 h-20 sm:w-36 sm:h-28 md:w-44 md:h-36">
      {/* Glow aura */}
      <div className="absolute -inset-4 sm:-inset-6 blur-2xl sm:blur-3xl opacity-20 rounded-full" style={{ background: color }} />
      <div className="absolute -inset-2 sm:-inset-3 blur-lg sm:blur-xl opacity-25 rounded-full" style={{ background: color }} />

      {/* Poles */}
      <div className="absolute left-1 sm:left-2 bottom-0 w-1 sm:w-1.5 h-16 sm:h-24 md:h-32 rounded-full"
        style={{ background: `linear-gradient(180deg, ${color}cc, ${color}15)`, boxShadow: `0 0 8px ${color}44` }}
      />
      <div className="absolute right-1 sm:right-2 bottom-0 w-1 sm:w-1.5 h-16 sm:h-24 md:h-32 rounded-full"
        style={{ background: `linear-gradient(180deg, ${color}cc, ${color}15)`, boxShadow: `0 0 8px ${color}44` }}
      />

      {/* Gate bar */}
      <div className={animating ? "gate-swing" : ""}
        style={{
          position: "absolute",
          left: "8%",
          bottom: "62%",
          width: "73%",
          height: "max(8px, 0.5rem)",
          borderRadius: "4px",
          transformOrigin: "left center",
          transform: `rotate(${angle}deg)`,
          transition: "transform 0.9s cubic-bezier(.34,1.56,.64,1)",
          background: `linear-gradient(90deg, ${color}, ${color}dd)`,
          boxShadow: `0 0 16px ${color}66, 0 1.5px 6px ${color}33`,
        }}
      >
        <div className="absolute inset-0 rounded-md overflow-hidden">
          <div className="w-full h-full" style={{ background: `repeating-linear-gradient(90deg, transparent 0 10px, rgba(255,255,255,0.1) 10px 14px)` }} />
        </div>
      </div>

      {/* Light indicator */}
      <div className="absolute right-0.5 sm:right-1 bottom-[62%]">
        <div className="relative">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full"
            style={{ background: color, boxShadow: `0 0 12px ${color}88, 0 0 32px ${color}33` }}
          />
          <div className="absolute inset-0 w-3 h-3 sm:w-4 sm:h-4 rounded-full pulse-ring"
            style={{ border: `1.5px solid ${color}33` }}
          />
        </div>
      </div>
    </div>
  );
}
