import React, { useState } from "react";
import {
  Wallet,
  Shield,
  ShieldAlert,
  ShieldX,
  Search,
  CheckCircle2,
  XCircle,
  ArrowRight,
  LayoutGrid,
  Sparkles,
  KeyRound,
  AlertTriangle,
  RefreshCw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

/* ---------------------------------------------------
   DESIGN TOKENS
--------------------------------------------------- */
const colors = {
  malam: "#0E1525",
  kanvas: "#16213A",
  kanvasTerang: "#1E2C4A",
  lampu: "#FFB02E",
  aman: "#2FBE74",
  waspada: "#F2994A",
  bahaya: "#EB5757",
  kabut: "#8B96AE",
  embun: "#F3F6FC",
  garis: "#283655",
};

const colorTokens = [
  { name: "Malam", hex: colors.malam, usage: "Background utama aplikasi" },
  { name: "Kanvas", hex: colors.kanvas, usage: "Permukaan kartu / panel" },
  { name: "Lampu Pos", hex: colors.lampu, usage: "Aksen merek & aksi utama" },
  { name: "Aman", hex: colors.aman, usage: "Status risiko rendah" },
  { name: "Waspada", hex: colors.waspada, usage: "Status risiko sedang" },
  { name: "Bahaya", hex: colors.bahaya, usage: "Status risiko tinggi" },
  { name: "Kabut", hex: colors.kabut, usage: "Teks sekunder" },
  { name: "Embun", hex: colors.embun, usage: "Teks utama di atas dasar gelap" },
];

const typeSamples = [
  { role: "Display", font: "Space Grotesk", weight: 700, sample: "Aman untuk dikirim", size: "32px" },
  { role: "Heading", font: "Space Grotesk", weight: 600, sample: "Hasil Pengecekan Wallet", size: "20px" },
  { role: "Body", font: "Inter", weight: 400, sample: "Wallet ini sudah aktif sejak 2 tahun lalu dengan pola transaksi yang wajar.", size: "15px" },
  { role: "Data / Mono", font: "IBM Plex Mono", weight: 500, sample: "0x71C7656EC7ab88b098defB751B7401B5f6d8976", size: "13px" },
];

/* ---------------------------------------------------
   RISK PRESETS (mock heuristic results)
--------------------------------------------------- */
const PRESETS = {
  aman: {
    level: "aman",
    label: "AMAN",
    color: colors.aman,
    Icon: Shield,
    gateAngle: -78,
    reasons: [
      { ok: true, text: "Wallet ini sudah aktif sejak 2 tahun lalu" },
      { ok: true, text: "Tercatat lebih dari 150 transaksi yang wajar" },
      { ok: true, text: "Pola transaksi stabil, tidak ada lonjakan aneh" },
    ],
    recommendation:
      "Wallet ini menunjukkan pola pengguna aktif yang wajar. Tetap selalu cek ulang alamat sebelum mengirim dana besar.",
  },
  waspada: {
    level: "waspada",
    label: "HATI-HATI",
    color: colors.waspada,
    Icon: ShieldAlert,
    gateAngle: -35,
    reasons: [
      { ok: true, text: "Wallet sudah ada sejak 8 bulan lalu" },
      { ok: false, text: "Hanya tercatat 4 transaksi dalam setahun terakhir" },
      { ok: false, text: "Belum pernah menerima dari banyak sumber berbeda" },
    ],
    recommendation:
      "Sebelum kirim dana besar, coba kirim nominal kecil dulu sebagai tes, atau minta verifikasi tambahan dari penerima.",
  },
  bahaya: {
    level: "bahaya",
    label: "BERISIKO",
    color: colors.bahaya,
    Icon: ShieldX,
    gateAngle: 0,
    reasons: [
      { ok: false, text: "Wallet baru dibuat 4 hari lalu" },
      { ok: false, text: "Menerima dana dari 23 alamat berbeda dalam 3 hari" },
      { ok: false, text: "Pola ini mirip wallet penampung hasil penipuan" },
    ],
    recommendation:
      "Sangat disarankan untuk TIDAK mengirim dana ke alamat ini. Verifikasi ulang lewat kanal resmi sebelum melanjutkan.",
  },
};

const SAMPLE_CHIPS = [
  { address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976", preset: "aman" },
  { address: "0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97", preset: "waspada" },
  { address: "0x9F2a1E2c4Bb015e3F8D4a8C0Ab12345DEf6789C", preset: "bahaya" },
];

function hashSeed(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}
const PRESET_KEYS = Object.keys(PRESETS);

/* ---------------------------------------------------
   SIGNATURE VISUAL — Palang Pos Periksa (checkpoint gate)
--------------------------------------------------- */
function CheckpointGate({ angle = 0, animating = false, color = colors.lampu }) {
  return (
    <div className="relative flex items-center justify-center w-[130px] h-[90px] sm:w-[160px] sm:h-[110px]">
      {/* tiang kiri & kanan */}
      <div className="absolute left-1.5 sm:left-2 bottom-0 w-1.5 sm:w-2 h-16 sm:h-20 rounded-t-sm" style={{ background: colors.garis }} />
      <div className="absolute right-1.5 sm:right-2 bottom-0 w-1.5 sm:w-2 h-16 sm:h-20 rounded-t-sm" style={{ background: colors.garis }} />
      {/* palang */}
      <div
        className={animating ? "gate-swing" : ""}
        style={{
          position: "absolute",
          left: 12,
          bottom: 62,
          width: 98,
          height: 10,
          borderRadius: 6,
          transformOrigin: "left center",
          transform: `rotate(${angle}deg)`,
          transition: "transform 0.7s cubic-bezier(.34,1.56,.64,1)",
          background: `repeating-linear-gradient(45deg, ${color} 0 14px, ${colors.embun} 14px 28px)`,
          boxShadow: `0 0 18px ${color}55`,
        }}
      />
      {/* lampu di tiang kanan */}
      <div
        className="absolute right-0.5 sm:right-1 bottom-16 sm:bottom-20 w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full"
        style={{ background: color, boxShadow: `0 0 10px 3px ${color}aa` }}
      />
    </div>
  );
}

/* ---------------------------------------------------
   SHARED UI PIECES
--------------------------------------------------- */
function Button({ children, onClick, variant = "primary", className = "" }) {
  const base = "px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center gap-2 justify-center";
  const style =
    variant === "primary"
      ? { background: colors.lampu, color: colors.malam }
      : { background: "transparent", color: colors.embun, border: `1px solid ${colors.garis}` };
  return (
    <button onClick={onClick} className={`${base} ${className} hover:opacity-90 active:scale-[0.98]`} style={style}>
      {children}
    </button>
  );
}

function Chip({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-150"
      style={{ background: colors.kanvasTerang, color: colors.kabut, border: `1px solid ${colors.garis}`, fontFamily: "IBM Plex Mono, monospace" }}
      onMouseEnter={(e) => (e.currentTarget.style.color = colors.embun)}
      onMouseLeave={(e) => (e.currentTarget.style.color = colors.kabut)}
    >
      {children}
    </button>
  );
}

/* ---------------------------------------------------
   TOKENS VIEW
--------------------------------------------------- */
function TokensView() {
  return (
    <div className="space-y-10">
      <section>
        <h3 className="text-sm font-semibold tracking-wide uppercase mb-4" style={{ color: colors.kabut }}>
          Layout & Responsiveness
        </h3>
        <div className="rounded-xl p-4 space-y-2 text-sm" style={{ background: colors.kanvas, border: `1px solid ${colors.garis}`, color: colors.embun }}>
          <p>Didesain mobile-first — mayoritas user target mengakses lewat ponsel.</p>
          <ul className="list-disc pl-5 space-y-1" style={{ color: colors.kabut }}>
            <li>Breakpoint utama: <code style={{ color: colors.lampu }}>sm</code> (≥640px) untuk transisi layout 1 kolom → 2 kolom</li>
            <li>Komponen kunci (input, button, card hasil) selalu <code style={{ color: colors.lampu }}>w-full</code> dengan <code style={{ color: colors.lampu }}>max-w-md</code> di mobile</li>
            <li>Ukuran visual signature (Checkpoint Gate) menyusut otomatis di layar kecil</li>
            <li>Alamat wallet (teks panjang) selalu <code style={{ color: colors.lampu }}>break-all</code> agar tidak overflow di layar kecil</li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold tracking-wide uppercase mb-4" style={{ color: colors.kabut }}>
          Warna
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {colorTokens.map((c) => (
            <div key={c.name} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${colors.garis}` }}>
              <div style={{ background: c.hex, height: 64 }} />
              <div className="p-3" style={{ background: colors.kanvas }}>
                <div className="text-sm font-semibold" style={{ color: colors.embun }}>{c.name}</div>
                <div className="text-xs mt-0.5" style={{ color: colors.kabut, fontFamily: "IBM Plex Mono, monospace" }}>{c.hex}</div>
                <div className="text-xs mt-1" style={{ color: colors.kabut }}>{c.usage}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold tracking-wide uppercase mb-4" style={{ color: colors.kabut }}>
          Tipografi
        </h3>
        <div className="space-y-4">
          {typeSamples.map((t) => (
            <div key={t.role} className="rounded-xl p-4" style={{ background: colors.kanvas, border: `1px solid ${colors.garis}` }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: colors.lampu }}>{t.role}</span>
                <span className="text-xs" style={{ color: colors.kabut }}>{t.font} · {t.weight} · {t.size}</span>
              </div>
              <div style={{ fontFamily: t.font, fontWeight: t.weight, fontSize: t.size, color: colors.embun }}>
                {t.sample}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold tracking-wide uppercase mb-4" style={{ color: colors.kabut }}>
          Komponen Inti
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl p-4 space-y-3" style={{ background: colors.kanvas, border: `1px solid ${colors.garis}` }}>
            <div className="text-xs font-semibold uppercase" style={{ color: colors.kabut }}>Button</div>
            <div className="flex gap-2 flex-wrap">
              <Button>Cek Sekarang</Button>
              <Button variant="secondary">Batal</Button>
            </div>
          </div>
          <div className="rounded-xl p-4 space-y-3" style={{ background: colors.kanvas, border: `1px solid ${colors.garis}` }}>
            <div className="text-xs font-semibold uppercase" style={{ color: colors.kabut }}>Chip / Sample Address</div>
            <div className="flex gap-2 flex-wrap">
              <Chip>0x71C7...8976</Chip>
              <Chip>0x4838...5f97</Chip>
            </div>
          </div>
          <div className="rounded-xl p-4 space-y-3" style={{ background: colors.kanvas, border: `1px solid ${colors.garis}` }}>
            <div className="text-xs font-semibold uppercase" style={{ color: colors.kabut }}>Risk Badge</div>
            <div className="flex gap-2 flex-wrap">
              {Object.values(PRESETS).map((p) => (
                <span key={p.level} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                  style={{ background: `${p.color}1f`, color: p.color, border: `1px solid ${p.color}55` }}>
                  <p.Icon size={14} /> {p.label}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-xl p-4 space-y-3" style={{ background: colors.kanvas, border: `1px solid ${colors.garis}` }}>
            <div className="text-xs font-semibold uppercase" style={{ color: colors.kabut }}>Checkpoint Gate (Signature)</div>
            <div className="flex justify-center"><CheckpointGate angle={-35} color={colors.waspada} /></div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------------------------------------------
   PROTOTYPE FLOW VIEW
--------------------------------------------------- */
function PrototypeView() {
  const [stage, setStage] = useState("landing"); // landing | loading | result
  const [address, setAddress] = useState("");
  const [result, setResult] = useState(null);

  function runCheck(addr, forcedPreset) {
    if (!addr) return;
    setAddress(addr);
    setStage("loading");
    setTimeout(() => {
      const presetKey = forcedPreset || PRESET_KEYS[hashSeed(addr) % PRESET_KEYS.length];
      setResult(PRESETS[presetKey]);
      setStage("result");
    }, 1200);
  }

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: colors.malam, border: `1px solid ${colors.garis}` }}>
      {/* mock top bar */}
      <div className="flex items-center gap-2 px-5 py-3" style={{ borderBottom: `1px solid ${colors.garis}` }}>
        <Wallet size={18} style={{ color: colors.lampu }} />
        <span className="font-bold text-sm" style={{ color: colors.embun, fontFamily: "Space Grotesk, sans-serif" }}>Cek Dompet</span>
      </div>

      <div className="p-5 sm:p-10 min-h-[440px] sm:min-h-[480px] flex flex-col items-center justify-center">
        {stage === "landing" && (
          <div className="max-w-md w-full text-center space-y-6">
            <CheckpointGate angle={0} color={colors.lampu} />
            <div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: colors.embun, fontFamily: "Space Grotesk, sans-serif" }}>
                Cek dulu sebelum kirim crypto
              </h2>
              <p className="text-sm" style={{ color: colors.kabut }}>
                Lindungi diri dari penipuan. Masukkan alamat wallet penerima untuk dicek.
              </p>
            </div>
            <div className="flex items-center rounded-xl px-3" style={{ background: colors.kanvas, border: `1px solid ${colors.garis}` }}>
              <Search size={16} style={{ color: colors.kabut }} />
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="0x..."
                className="flex-1 bg-transparent outline-none px-3 py-3 text-sm"
                style={{ color: colors.embun, fontFamily: "IBM Plex Mono, monospace" }}
              />
            </div>
            <Button className="w-full" onClick={() => runCheck(address)}>
              Cek Sekarang <ArrowRight size={16} />
            </Button>
            <div>
              <div className="text-xs mb-2" style={{ color: colors.kabut }}>Coba contoh address:</div>
              <div className="flex gap-2 justify-center flex-wrap">
                {SAMPLE_CHIPS.map((c) => (
                  <Chip key={c.address} onClick={() => runCheck(c.address, c.preset)}>
                    {c.address.slice(0, 6)}...{c.address.slice(-4)}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        )}

        {stage === "loading" && (
          <div className="text-center space-y-6">
            <CheckpointGate angle={0} animating color={colors.lampu} />
            <p className="text-sm" style={{ color: colors.kabut }}>Memeriksa riwayat wallet...</p>
          </div>
        )}

        {stage === "result" && result && (
          <div className="max-w-md w-full space-y-5">
            <div className="flex justify-center">
              <CheckpointGate angle={result.gateAngle} color={result.color} />
            </div>
            <div className="text-center">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-3"
                style={{ background: `${result.color}1f`, color: result.color, border: `1px solid ${result.color}55` }}
              >
                <result.Icon size={14} /> TINGKAT RISIKO: {result.label}
              </div>
              <div className="text-xs break-all" style={{ color: colors.kabut, fontFamily: "IBM Plex Mono, monospace" }}>
                {address}
              </div>
            </div>

            <div className="rounded-xl p-4 space-y-2" style={{ background: colors.kanvas, border: `1px solid ${colors.garis}` }}>
              {result.reasons.map((r, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  {r.ok ? (
                    <CheckCircle2 size={16} style={{ color: colors.aman, marginTop: 2 }} />
                  ) : (
                    <XCircle size={16} style={{ color: colors.bahaya, marginTop: 2 }} />
                  )}
                  <span style={{ color: colors.embun }}>{r.text}</span>
                </div>
              ))}
            </div>

            <div
              className="rounded-xl p-4 text-sm"
              style={{ background: colors.kanvasTerang, borderLeft: `3px solid ${result.color}`, color: colors.embun }}
            >
              💡 {result.recommendation}
            </div>

            <Button
              variant="secondary"
              className="w-full"
              onClick={() => {
                setStage("landing");
                setAddress("");
                setResult(null);
              }}
            >
              Cek Wallet Lain
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------
   ROOT APP
--------------------------------------------------- */
export default function CekDompetDesignSystem() {
  const [tab, setTab] = useState("prototype");

  return (
    <div style={{ background: colors.malam, minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        @keyframes gateSwing {
          0%, 100% { transform: rotate(-8deg); }
          50% { transform: rotate(8deg); }
        }
        .gate-swing { animation: gateSwing 0.9s ease-in-out infinite; }
      `}</style>

      <div className="max-w-3xl mx-auto px-4 sm:px-5 py-6 sm:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={16} style={{ color: colors.lampu }} />
              <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: colors.kabut }}>Design System Prototype</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold" style={{ color: colors.embun, fontFamily: "Space Grotesk, sans-serif" }}>
              Cek Dompet
            </h1>
          </div>
          <div className="flex gap-1 rounded-xl p-1 self-start sm:self-auto" style={{ background: colors.kanvas, border: `1px solid ${colors.garis}` }}>
            <button
              onClick={() => setTab("prototype")}
              className="px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              style={tab === "prototype" ? { background: colors.lampu, color: colors.malam } : { color: colors.kabut }}
            >
              <Wallet size={14} /> Prototype
            </button>
            <button
              onClick={() => setTab("tokens")}
              className="px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              style={tab === "tokens" ? { background: colors.lampu, color: colors.malam } : { color: colors.kabut }}
            >
              <LayoutGrid size={14} /> Design Tokens
            </button>
          </div>
        </div>

        {tab === "tokens" ? <TokensView /> : <PrototypeView />}
      </div>
    </div>
  );
}
