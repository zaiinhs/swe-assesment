const WEIGHTS = {
  ageActivity: 0.4,
  txPattern: 0.35,
  scamDb: 0.25,
};

function scoreAgeActivity(ageInDays, txCount) {
  if (ageInDays < 30 && txCount < 5) return { score: 0.9, reason: { ok: false, text: `Wallet baru dibuat ${ageInDays} hari lalu dengan hanya ${txCount} transaksi` } };
  if (ageInDays < 30 && txCount >= 5) return { score: 0.6, reason: { ok: true, text: `Wallet baru (${ageInDays} hari) tapi sudah aktif dengan ${txCount} transaksi` } };
  if (ageInDays >= 30 && ageInDays <= 180 && txCount >= 5 && txCount <= 20) return { score: 0.45, reason: { ok: false, text: `Wallet berumur ${ageInDays} hari dengan ${txCount} transaksi — aktivitas terbatas` } };
  if (ageInDays >= 30 && ageInDays <= 180) return { score: 0.35, reason: { ok: true, text: `Wallet berumur ${ageInDays} hari dengan ${txCount} transaksi` } };
  if (ageInDays > 180 && txCount > 20) return { score: 0.1, reason: { ok: true, text: `Wallet sudah aktif sejak ${Math.floor(ageInDays / 365)} tahun lalu dengan ${txCount} transaksi` } };
  if (ageInDays > 180) return { score: 0.2, reason: { ok: true, text: `Wallet berumur ${Math.floor(ageInDays / 30)} bulan dengan ${txCount} transaksi` } };
  return { score: 0.5, reason: { ok: false, text: `Data aktivitas wallet tidak cukup untuk analisis mendalam` } };
}

function scoreTxPattern(recentSenderCount, uniqueSenderCount, txCount) {
  if (recentSenderCount > 15) return { score: 0.95, reason: { ok: false, text: `Menerima dana dari ${recentSenderCount} alamat berbeda dalam 7 hari terakhir` } };
  if (recentSenderCount > 8) return { score: 0.65, reason: { ok: false, text: `${recentSenderCount} pengirim berbeda dalam seminggu — pola perlu diperhatikan` } };
  if (uniqueSenderCount <= 3 && txCount > 10) return { score: 0.15, reason: { ok: true, text: "Pola transaksi stabil dari sumber yang konsisten" } };
  if (uniqueSenderCount <= 10) return { score: 0.3, reason: { ok: true, text: `Dari ${uniqueSenderCount} pengirim berbeda — pola terlihat wajar` } };
  return { score: 0.5, reason: { ok: false, text: `${uniqueSenderCount} pengirim berbeda — perlu diperhatikan lebih lanjut` } };
}

function determineLevel(score) {
  if (score < 0.35) return "aman";
  if (score < 0.65) return "waspada";
  return "bahaya";
}

function getRecommendation(level, reasons) {
  const hasWarning = reasons.some((r) => !r.ok);

  if (level === "aman") {
    return "Wallet ini menunjukkan pola pengguna aktif yang wajar. Tetap selalu cek ulang alamat sebelum mengirim dana besar.";
  }
  if (level === "waspada") {
    return "Sebelum kirim dana besar, coba kirim nominal kecil dulu sebagai tes, atau minta verifikasi tambahan dari penerima.";
  }
  return "Sangat disarankan untuk TIDAK mengirim dana ke alamat ini. Verifikasi ulang lewat kanal resmi sebelum melanjutkan.";
}

export function calculateRisk(walletData) {
  const { ageInDays, txCount, uniqueSenderCount, recentSenderCount } = walletData;

  const ageResult = scoreAgeActivity(ageInDays, txCount);
  const patternResult = scoreTxPattern(recentSenderCount, uniqueSenderCount, txCount);

  const reasons = [ageResult.reason, patternResult.reason];

  if (txCount === 0) {
    reasons.push({ ok: false, text: "Belum ada transaksi tercatat untuk wallet ini" });
  } else if (txCount > 0 && recentSenderCount === 0) {
    reasons.push({ ok: true, text: "Tidak ada lonjakan dana mencurigakan belakangan ini" });
  }

  const scamDbScore = 0;
  const totalScore =
    ageResult.score * WEIGHTS.ageActivity +
    patternResult.score * WEIGHTS.txPattern +
    scamDbScore * WEIGHTS.scamDb;

  const level = determineLevel(totalScore);
  const recommendation = getRecommendation(level, reasons);

  return {
    level,
    score: Math.round(totalScore * 100),
    reasons,
    recommendation,
    details: {
      ageScore: Math.round(ageResult.score * 100),
      patternScore: Math.round(patternResult.score * 100),
    },
  };
}
