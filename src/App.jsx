import { useState } from "react";
import {
  Wallet, ArrowRight, Shield, Zap, AlertTriangle, Sparkles,
  ScanLine, Hexagon, Orbit, Activity, ShieldCheck,
} from "lucide-react";
import CheckpointGate from "./components/CheckpointGate";
import Button from "./components/Button";
import AddressInput from "./components/AddressInput";
import ResultCard from "./components/ResultCard";
import { SAMPLE_ADDRESSES } from "./data/sampleAddresses";
import { isValidEthAddress } from "./lib/validation";
import { getWalletData } from "./lib/etherscan";
import { calculateRisk } from "./lib/heuristic";

const MOCK_RESULTS = {
  aman: {
    level: "aman", score: 12,
    reasons: [
      { ok: true, text: "Wallet sudah aktif sejak 2 tahun lalu" },
      { ok: true, text: "Tercatat lebih dari 150 transaksi yang wajar" },
      { ok: true, text: "Pola transaksi stabil, tidak ada lonjakan aneh" },
    ],
    recommendation: "Wallet ini menunjukkan pola pengguna aktif yang wajar. Tetap selalu cek ulang alamat sebelum mengirim dana besar.",
  },
  waspada: {
    level: "waspada", score: 52,
    reasons: [
      { ok: true, text: "Wallet sudah ada sejak 8 bulan lalu" },
      { ok: false, text: "Hanya tercatat 4 transaksi dalam setahun terakhir" },
      { ok: false, text: "Belum pernah menerima dari banyak sumber berbeda" },
    ],
    recommendation: "Sebelum kirim dana besar, coba kirim nominal kecil dulu sebagai tes, atau minta verifikasi tambahan dari penerima.",
  },
  bahaya: {
    level: "bahaya", score: 88,
    reasons: [
      { ok: false, text: "Wallet baru dibuat 4 hari lalu" },
      { ok: false, text: "Menerima dana dari 23 alamat berbeda dalam 3 hari" },
      { ok: false, text: "Pola ini mirip wallet penampung hasil penipuan" },
    ],
    recommendation: "Sangat disarankan untuk TIDAK mengirim dana ke alamat ini. Verifikasi ulang lewat kanal resmi sebelum melanjutkan.",
  },
};

function hashSeed(s) { let h=0; for(let i=0;i<s.length;i++) h=(h*31+s.charCodeAt(i))>>>0; return h; }

const FEATURES = [
  { icon: Shield, label: "On-chain Data", desc: "Real-time dari Ethereum" },
  { icon: Activity, label: "Risk Score", desc: "Analisis pola transaksi" },
  { icon: Zap, label: "Instant", desc: "Tanpa login, gratis" },
];

export default function App() {
  const [stage, setStage] = useState("landing");
  const [address, setAddress] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [apiKeyValid, setApiKeyValid] = useState(true);
  const hasApiKey = Boolean(import.meta.env.VITE_ETHERSCAN_API_KEY);
  const useLiveData = hasApiKey && apiKeyValid;

  async function runCheck(addr) {
    if (!addr || !isValidEthAddress(addr)) return;
    setAddress(addr); setStage("loading"); setError(null);
    if (!useLiveData) {
      const keys = Object.keys(MOCK_RESULTS);
      await new Promise(r => setTimeout(r, 1800));
      setResult(MOCK_RESULTS[keys[hashSeed(addr) % keys.length]]);
      setStage("result"); return;
    }
    try {
      const wd = await getWalletData(addr);
      setResult(calculateRisk(wd)); setStage("result");
    } catch (err) {
      if (err.message === "API_KEY_INVALID") {
        setApiKeyValid(false);
        const keys = Object.keys(MOCK_RESULTS);
        await new Promise(r => setTimeout(r, 1200));
        setResult(MOCK_RESULTS[keys[hashSeed(addr) % keys.length]]);
        setStage("result"); return;
      }
      setError(err.message); setStage("landing");
    }
  }

  function handleReset() { setStage("landing"); setAddress(""); setResult(null); setError(null); }

  return (
    <div className="min-h-dvh bg-void bg-grid flex flex-col items-center overflow-hidden">
      {/* Decorative background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-72 h-72 md:w-96 md:h-96 bg-lampu/5 rounded-full blur-[100px] animate-float" />
        <div className="absolute top-[5%] right-[3%] w-80 h-80 md:w-[500px] md:h-[500px] bg-lampu-cyan/4 rounded-full blur-[120px] animate-float-delay" />
        <div className="absolute bottom-[10%] left-[10%] w-96 h-96 md:w-[600px] md:h-[600px] bg-lampu-pink/3 rounded-full blur-[140px] animate-float-slow" />

        {/* Floating symbols - hidden on mobile */}
        <div className="hidden lg:block absolute top-[20%] right-[8%] text-lampu/6 animate-float"><Hexagon size={28} /></div>
        <div className="hidden lg:block absolute bottom-[30%] left-[5%] text-lampu-cyan/6 animate-float-delay"><Orbit size={24} /></div>
        <div className="hidden lg:block absolute top-[50%] right-[5%] text-lampu-pink/6 animate-float-slow"><Activity size={20} /></div>
      </div>

      {/* Main container - improved responsive */}
      <div className="relative z-10 w-full max-w-2xl px-4 sm:px-5 md:px-6 pt-4 sm:pt-6 md:pt-8 pb-6 sm:pb-8 flex flex-col min-h-dvh">

        {/* Header - responsive */}
        <header className="animate-fade-in mb-6 sm:mb-8 md:mb-10">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-lampu to-waspada flex items-center justify-center shrink-0">
                <Wallet size={16} className="text-embun" />
              </div>
              <span className="font-bold text-sm sm:text-base font-display text-embun">Cek Dompet</span>
            </div>
            <div className="flex items-center gap-2">
              {!useLiveData && (
                <div className="flex items-center gap-1 px-2 py-1 rounded-full glass text-[9px] sm:text-[10px] text-waspada/80 font-medium">
                  <Zap size="8" className="sm:size-[9]" />
                  <span>Demo</span>
                </div>
              )}
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-aman/60 animate-pulse" />
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex flex-col items-center justify-center">

          {/* Landing stage */}
          {stage === "landing" && (
            <div className="w-full flex flex-col items-center gap-6 sm:gap-7 md:gap-8 animate-slide-up">

              {/* Eyebrow label */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[8px] sm:text-[9px] text-lampu/70 uppercase tracking-widest font-semibold">
                <Sparkles size={9} className="sm:size-[10]" />
                <span>Wallet Safety Checker</span>
              </div>

              {/* Hero visual - gate */}
              <div className="relative flex justify-center py-4 sm:py-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-lampu/4 rounded-full blur-[80px]" />
                </div>
                <div className="relative scale-100 sm:scale-110 md:scale-125 origin-center animate-float">
                  <CheckpointGate angle={0} color="#ffb02e" />
                </div>
              </div>

              {/* Headline - improved responsive typography */}
              <div className="text-center space-y-2 sm:space-y-3">
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold font-display text-embun leading-tight tracking-tight">
                  Cek dulu,
                  <br />
                  <span className="bg-gradient-to-r from-lampu via-lampu to-waspada bg-clip-text text-transparent animate-gradient">
                    sebelum kirim
                  </span>
                  <br />
                  crypto
                </h1>
                <p className="text-xs sm:text-sm text-kabut/80 leading-relaxed max-w-xs sm:max-w-sm mx-auto">
                  Lindungi aset kamu dari penipuan dengan data blockchain real-time.
                </p>
              </div>

              {/* Error message */}
              {error && (
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-bahaya glass rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 w-full border border-bahaya/20 animate-scale-in">
                  <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                  <span className="break-all">{error}</span>
                </div>
              )}

              {/* Input section */}
              <div className="w-full glass rounded-xl sm:rounded-2xl p-4 sm:p-5 space-y-3.5 scanline">
                <div className="flex items-center gap-2 text-[9px] sm:text-[10px] text-kabut/60 uppercase tracking-wider font-semibold">
                  <ScanLine size={11} className="sm:size-[12]" />
                  <span>Masukkan Alamat Wallet</span>
                </div>
                <AddressInput value={address} onChange={setAddress} onSubmit={runCheck} />
                <Button
                  className="w-full"
                  onClick={() => runCheck(address)}
                  disabled={!isValidEthAddress(address)}
                  icon={<ArrowRight size={16} />}
                >
                  Cek Sekarang
                </Button>
              </div>

              {/* Sample addresses */}
              <div className="w-full space-y-3">
                <p className="text-[8px] sm:text-[9px] text-kabut/50 uppercase tracking-wider font-semibold text-center">
                  Atau coba contoh
                </p>
                <div className="flex flex-col gap-2">
                  {SAMPLE_ADDRESSES.map((s) => (
                    <button key={s.address} onClick={() => runCheck(s.address)}
                      className="group flex items-center gap-3 glass rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-left transition-all duration-300 hover:bg-white/[0.04] hover:border-white/10 active:scale-[0.98]"
                    >
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-lampu/10 to-lampu-pink/10 flex items-center justify-center shrink-0 group-hover:from-lampu/20 group-hover:to-lampu-pink/20 transition-all">
                        <ScanLine size={13} className="sm:size-[14] text-lampu/60 group-hover:text-lampu transition-colors" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[11px] sm:text-xs font-mono text-embun/80 truncate">{s.address.slice(0, 8)}...{s.address.slice(-6)}</div>
                        <div className="text-[9px] sm:text-[10px] text-kabut/60 mt-1">{s.label}</div>
                      </div>
                      <ArrowRight size={12} className="text-kabut/30 group-hover:text-lampu/60 transition-all group-hover:translate-x-0.5 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Features grid */}
              <div className="w-full grid grid-cols-3 gap-2 sm:gap-3">
                {FEATURES.map((f) => (
                  <div key={f.label} className="glass rounded-lg p-2.5 sm:p-3 text-center space-y-1.5 hover:bg-white/[0.02] transition-colors">
                    <div className="flex justify-center">
                      <f.icon size={13} className="sm:size-[14] text-lampu/60" />
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-medium text-embun/70 leading-tight">{f.label}</div>
                  </div>
                ))}
              </div>

              {/* Trust indicators */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
                <div className="flex items-center gap-1.5 text-[8px] sm:text-[9px] text-kabut/40"><ShieldCheck size={9} className="sm:size-[10] text-aman/50" /><span>On-chain data</span></div>
                <div className="flex items-center gap-1.5 text-[8px] sm:text-[9px] text-kabut/40"><Zap size={9} className="sm:size-[10] text-lampu/50" /><span>Privasi terjaga</span></div>
                <div className="flex items-center gap-1.5 text-[8px] sm:text-[9px] text-kabut/40"><Wallet size={9} className="sm:size-[10] text-lampu-cyan/50" /><span>Gratis</span></div>
              </div>

              <p className="text-[8px] sm:text-[9px] text-kabut/25 leading-relaxed text-center max-w-xs">
                Hasil indikasi berdasarkan data publik. Bukan jaminan keamanan mutlak.
              </p>
            </div>
          )}

          {/* Loading stage */}
          {stage === "loading" && (
            <div className="text-center space-y-6 sm:space-y-8 animate-fade-in">
              <div className="flex justify-center scale-100 sm:scale-110 md:scale-125 origin-center">
                <CheckpointGate angle={0} animating color="#8b5cf6" />
              </div>
              <div className="space-y-2.5 sm:space-y-3">
                <div className="w-40 sm:w-48 h-1 rounded-full bg-kanvas-terang mx-auto overflow-hidden">
                  <div className="w-full h-full animate-shimmer" />
                </div>
                <p className="text-xs sm:text-sm text-kabut font-medium">Memeriksa riwayat wallet...</p>
                <p className="text-[10px] sm:text-[11px] text-kabut/50">Menganalisis pola transaksi on-chain</p>
              </div>
            </div>
          )}

          {/* Result stage */}
          {stage === "result" && result && (
            <ResultCard result={result} address={address} onReset={handleReset} />
          )}
        </main>

        {/* Footer */}
        <footer className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-garis text-center animate-fade-in">
          <div className="flex items-center justify-center gap-1.5 text-[8px] sm:text-[9px] text-kabut/20 font-medium">
            <span>Cek Dompet</span><span className="mx-1">·</span><span>v1.0</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
