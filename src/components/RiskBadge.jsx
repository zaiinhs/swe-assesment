import { Shield, ShieldAlert, ShieldX } from "lucide-react";

const CONFIG = {
  aman: { Icon: Shield, label: "AMAN", text: "text-aman", border: "border-aman/30", glow: "shadow-[0_0_24px_-6px_rgba(16,185,129,0.3)]" },
  waspada: { Icon: ShieldAlert, label: "HATI-HATI", text: "text-waspada", border: "border-waspada/30", glow: "shadow-[0_0_24px_-6px_rgba(245,158,11,0.3)]" },
  bahaya: { Icon: ShieldX, label: "BERISIKO", text: "text-bahaya", border: "border-bahaya/30", glow: "shadow-[0_0_24px_-6px_rgba(239,68,68,0.3)]" },
};

export default function RiskBadge({ level, score }) {
  const c = CONFIG[level];
  if (!c) return null;
  return (
    <div className="flex flex-col items-center gap-1.5 sm:gap-2 animate-scale-in">
      <div className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl glass border ${c.border} ${c.glow}`}>
        <c.Icon size={13} className="sm:size-[15]" />
        <span className={`text-[9px] sm:text-[11px] font-bold tracking-wider uppercase ${c.text}`}>{c.label}</span>
      </div>
      {typeof score === "number" && (
        <div className="flex items-center gap-1.5 text-[9px] sm:text-[11px] text-kabut/70">
          <span className="font-mono font-semibold text-embun">{score}</span>
          <span>/ 100</span>
          <div className="w-14 sm:w-16 h-0.5 sm:h-1 rounded-full bg-kanvas-terang overflow-hidden">
            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${score}%`, background: level === "aman" ? "#10b981" : level === "waspada" ? "#f59e0b" : "#ef4444" }} />
          </div>
        </div>
      )}
    </div>
  );
}
