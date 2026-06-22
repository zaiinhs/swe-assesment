import { CheckCircle2, XCircle, Lightbulb, RotateCcw, ExternalLink } from "lucide-react";
import RiskBadge from "./RiskBadge";
import Button from "./Button";
import CheckpointGate from "./CheckpointGate";

const LEVEL_COLORS = { aman: "#10b981", waspada: "#f59e0b", bahaya: "#ef4444" };

export default function ResultCard({ result, address, onReset }) {
  const color = LEVEL_COLORS[result.level] || "#8b5cf6";

  return (
    <div className="w-full space-y-4 sm:space-y-5 animate-slide-up">

      {/* Gate + Badge */}
      <div className="flex flex-col items-center gap-4 sm:gap-5">
        <CheckpointGate
          angle={result.level === "aman" ? -78 : result.level === "waspada" ? -38 : 0}
          color={color}
        />
        <RiskBadge level={result.level} score={result.score} />
      </div>

      {/* Address display */}
      <div className="flex items-center gap-2 sm:gap-2.5 glass rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-[10px] sm:text-xs font-mono text-kabut/80 break-all">
        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0" style={{ background: color }} />
        <span>{address}</span>
      </div>

      {/* Analysis results */}
      <div className="glass rounded-lg sm:rounded-2xl p-4 sm:p-5 space-y-2 sm:space-y-2.5">
        <div className="flex items-center gap-2 text-[9px] sm:text-[10px] text-kabut/60 uppercase tracking-wider font-semibold mb-2.5 sm:mb-3">
          <CheckCircle2 size={10} className="sm:size-[11]" style={{ color }} />
          <span>Hasil Analisis</span>
        </div>
        {result.reasons.map((r, i) => (
          <div key={i} className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-lg bg-white/[0.02]">
            <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg flex items-center justify-center shrink-0 flex-none ${r.ok ? "bg-aman/10" : "bg-bahaya/10"}`}>
              {r.ok ? (
                <CheckCircle2 size={12} className="sm:size-[13] text-aman" />
              ) : (
                <XCircle size={12} className="sm:size-[13] text-bahaya" />
              )}
            </div>
            <span className="text-xs sm:text-sm text-embun/85 leading-relaxed">{r.text}</span>
          </div>
        ))}
      </div>

      {/* Recommendation section */}
      <div className="glass rounded-lg sm:rounded-2xl p-4 sm:p-5" style={{ borderLeft: `2.5px solid ${color}` }}>
        <div className="flex items-start gap-3 sm:gap-3.5">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0 flex-none" style={{ background: `${color}15` }}>
            <Lightbulb size={15} className="sm:size-[16]" style={{ color }} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[9px] sm:text-[10px] font-bold tracking-wider uppercase mb-1.5 sm:mb-2" style={{ color }}>
              Rekomendasi
            </div>
            <p className="text-xs sm:text-sm text-embun/85 leading-relaxed">{result.recommendation}</p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
        <Button variant="secondary" className="flex-1" onClick={onReset} icon={<RotateCcw size={12} className="sm:size-[13]" />}>
          Cek Wallet Lain
        </Button>
        <Button variant="ghost" className="flex-1" onClick={() => window.open(`https://etherscan.io/address/${address}`, "_blank")} icon={<ExternalLink size={12} className="sm:size-[13]" />}>
          Lihat di Etherscan
        </Button>
      </div>

      <p className="text-[8px] sm:text-[9px] text-kabut/25 text-center leading-relaxed">
        Hasil indikasi berdasarkan data publik. Bukan jaminan keamanan mutlak.
      </p>
    </div>
  );
}
