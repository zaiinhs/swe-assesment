# Cek Dompet

**Wallet Safety Checker** — Cek keamanan alamat wallet Ethereum sebelum kirim crypto.

## Live Demo

→ [cek-dompet.vercel.app](https://cek-dompet.vercel.app)

## Cara Menjalankan

```bash
git clone https://github.com/zainal/cek-dompet.git
cd cek-dompet
npm install
cp .env.example .env
# Isi VITE_ETHERSCAN_API_KEY di .env (opsional, tanpa API key tetap jalan dengan mock data)
npm run dev
```

## Untuk Siapa

Pengguna crypto pemula di Indonesia yang ingin memastikan alamat wallet aman sebelum mengirim dana, tanpa perlu paham istilah teknis blockchain.

## Masalah yang Diselesaikan

14,78 juta akun crypto di Indonesia per Mei 2025, banyak dari mereka adalah pemula yang rentan tipu — giveaway palsu, romance scam, "kirim dulu nanti dibalik". Tools yang ada (Nomis, 0xScore, WalletScore) semuanya pakai bahasa teknis untuk web3-native users. **Cek Dompet** menerjemahkan data on-chain menjadi bahasa awam: *"aman nggak kirim ke sini?"*

## Kenapa Dibangun

Tidak ada工具 yang menyajikan penilaian wallet dalam Bahasa Indonesia dengan framing "checkpoint sebelum kirim", bukan "skor reputasi umum". Cek Dompet langsung menjawab keputusan: kirim atau tidak, dengan alasan dan rekomendasi aksi konkret.

## Kompetitor

| Produk | Fokus | Gap |
|---|---|---|
| Nomis | Reputasi untuk airdrop | Teknis, web3-native |
| 0xScore | Skor 30+ parameter | Untuk project owner |
| WalletScore.net | Risk checker | Bahasa Inggris, framing umum |
| Aura/Ethos | Identitas on-chain | Konsep desentralisasi |

## Scope

**In-scope:**
- Input & validasi alamat Ethereum
- Analisis umur & aktivitas wallet
- Deteksi pola transaksi mencurigakan (wallet penampung)
- 3 level risiko: Aman / Hati-hati / Berisiko
- Alasan checklist + rekomendasi aksi
- Mobile-first responsive

**Out-of-scope:**
- Database scam publik (CryptoScamDB)
- Multi-chain (BSC, Polygon)
- Riwayat pencarian / akun user
- Browser extension

## Asumsi

- User hanya perlu cek Ethereum mainnet
- Etherscan API gratis (5 req/s, 100k/hari) cukup untuk prototype
- Heuristik sederhana sudah cukup untuk MVP — perlu tuning dengan data riil scam Indonesia

## Pertanyaan untuk User

1. Seberapa sering mereka benar-benar mengecek wallet sebelum transfer, atau langsung kirim?
2. Apakah mereka pernah ragu tapi tetap kirim karena tekanan sosial?
3. Fitur apa yang paling bikin mereka merasa aman — alasan detail atau rekomendasi aksi?

## Cara Tahu Ini Berhasil

- % pengguna yang menyelesaikan flow cek wallet (tidak drop)
- Rasio penggunaan "cek wallet lain" (indikasi retensi)
- Feedback: "rekomendasi ini membantu atau tidak"

## Next Steps

1. Integrasi database scam publik (CryptoScamDB)
2. Multi-chain support (BSC, Polygon)
3. Browser extension
4. Crowdsourced reporting

## AI Usage

PRD dan design system dibuat dengan bantuan AI. Implementasi heuristic engine dan integrasi API dilakukan manual dengan tuning berdasarkan data Etherscan. AI sempat salah dalam menghitung umur wallet dari timestamp — dikoreksi dengan konversi UTC yang benar.
