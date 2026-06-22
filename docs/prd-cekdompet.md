# PRD: Cek Dompet — Wallet Safety Checker

**Versi:** 1.1 (MVP)
**Tipe dokumen:** Product Requirement Document
**Status:** Draft untuk prototype/demo

---

## 1. Latar Belakang & Problem Statement

Jumlah investor crypto di Indonesia tumbuh sangat cepat, mencapai 14,78 juta akun per Mei 2025 dengan nilai transaksi bulanan puluhan triliun rupiah. Pertumbuhan ini diiringi naiknya kasus penipuan crypto — mulai dari modus giveaway palsu, romance scam yang meminta transfer crypto, hingga skema "kirim dulu nanti dibalas berlipat".

Mayoritas korban adalah pengguna baru/awam yang:
- Tidak familiar dengan konsep "wallet address" dan cara membacanya
- Tidak punya cara mudah untuk menilai apakah sebuah alamat wallet aman untuk dikirimi dana
- Bergantung pada kepercayaan personal/sosial, bukan data objektif

**Problem spesifik yang di-solve produk ini:** *"Bagaimana cara orang awam crypto di Indonesia bisa menilai dengan cepat apakah sebuah wallet address aman untuk dikirimi dana, tanpa harus paham terminologi teknis blockchain?"*

Ini bukan masalah "bagaimana menghitung reputasi wallet secara umum" (itu sudah banyak tools-nya), melainkan masalah **terjemahan**: data on-chain sudah publik dan tersedia, tapi tidak ada yang menyajikannya dengan bahasa dan framing yang dimengerti target pengguna kita sebelum momen kritis (sebelum klik "kirim").

---

## 2. Kompetitor & Unique Value Proposition

### 2.1 Lanskap Kompetitor

| Produk | Fokus Utama | Target User | Bahasa/Framing |
|---|---|---|---|
| Nomis | Reputasi wallet untuk eligibility airdrop & loyalty program, dimint sebagai NFT | Web3-native, DeFi power user | Teknis, istilah web3 (skor, mint, multichain) |
| 0xScore | Skor reputasi 30+ parameter untuk keperluan project/attestation | Web3-native, project owner | Teknis, untuk integrasi pihak ketiga |
| WalletScore.net | Risk checker sebelum kirim dana, ada kategori risiko | General crypto user (global) | Teknis-medium, berbahasa Inggris, framing umum (CEX likelihood, heuristic flags) |
| Aura, Ethos Network | Reputasi sosial/identitas on-chain, badge & vouching | Web3 community, builder | Teknis, konsep identitas terdesentralisasi |

### 2.2 Gap yang Ditemukan

Semua kompetitor di atas dibangun untuk **audiens yang sudah paham web3** — entah untuk keperluan airdrop, DeFi, atau infrastruktur identitas. Tidak ada yang secara spesifik menyasar **pengguna awam Indonesia** yang sekadar butuh jawaban sederhana: *"aman nggak kirim ke sini?"* — dalam bahasa dan konteks yang mereka pahami, pada momen sebelum transaksi dilakukan.

### 2.3 Unique Value Proposition

**Cek Dompet** berbeda dari kompetitor di atas melalui tiga pembeda yang saling menguatkan, bukan hanya satu fitur:

1. **Framing "checkpoint sebelum kirim", bukan "skor reputasi umum"** — produk ini tidak mencoba menjawab "seberapa aktif wallet ini di web3", tapi langsung menjawab pertanyaan keputusan: kirim atau tidak.
2. **Bahasa Indonesia & output actionable** — bukan angka 0-100 yang abstrak, tapi checklist alasan + 1 rekomendasi aksi konkret (misal: "kirim nominal kecil dulu").
3. **Konteks modus penipuan lokal** — pola yang dicek (wallet baru + lonjakan sumber dana dalam waktu singkat) disusun berdasarkan modus yang umum menyasar korban di Indonesia, bukan generic DeFi scoring.

> Singkatnya: kompetitor menjawab "siapa wallet ini di ekosistem web3", produk ini menjawab "apakah aman saya kirim dana ke wallet ini sekarang".

---

## 3. Tujuan Produk

**Goals:**
- Memberikan penilaian risiko instan terhadap sebuah wallet address sebelum user mengirim dana
- Menyajikan alasan penilaian dalam bahasa yang mudah dipahami non-teknis
- Memberikan rekomendasi aksi konkret, bukan sekadar angka/skor abstrak

**Non-goals (di luar scope MVP):**
- Tidak menjamin 100% akurasi deteksi scam (heuristik, bukan database forensik lengkap)
- Tidak mendukung multi-chain di versi awal (fokus Ethereum mainnet)
- Tidak melakukan verifikasi identitas pemilik wallet (KYC)
- Tidak menyimpan riwayat pencarian user (privacy-first, stateless)

---

## 4. Target Pengguna

**Primary persona:** "Dinda, 26 tahun" — baru mulai investasi crypto 6 bulan, sering ikut komunitas Telegram/Discord, pernah mendengar cerita teman kena tipu saat ikut "giveaway". Tidak familiar dengan istilah teknis blockchain.

**Kebutuhan utama:** Cara cepat dan simpel untuk cek kredibilitas wallet sebelum transfer, tanpa harus belajar cara baca blockchain explorer.

---

## 5. User Stories

1. Sebagai pengguna baru crypto, saya ingin memasukkan alamat wallet dan langsung tahu apakah alamat itu berisiko, supaya saya tidak salah kirim dana ke penipu.
2. Sebagai pengguna, saya ingin tahu **alasan** di balik status risiko, bukan cuma label, supaya saya bisa menilai sendiri situasinya.
3. Sebagai pengguna, saya ingin mendapat **saran konkret** (misal: kirim nominal kecil dulu) supaya saya tahu langkah selanjutnya, bukan cuma diberi tahu "berisiko" tanpa solusi.

---

## 6. Scope MVP

### In-scope
| Fitur | Deskripsi |
|---|---|
| Input wallet address | Form input dengan validasi format address Ethereum |
| Analisis wallet age & aktivitas | Hitung umur wallet & jumlah transaksi historis |
| Analisis pola transaksi | Deteksi pola "penampung dana" (banyak sumber berbeda dalam waktu singkat) |
| Hasil risiko 3 level | Aman 🟢 / Hati-hati 🟡 / Berisiko 🔴 |
| Alasan & rekomendasi | Checklist alasan + 1 saran aksi konkret |
| Contoh address siap pakai | 3 chip address contoh untuk demo cepat |

### Out-of-scope (next iteration)
- Cross-check ke database scam publik (CryptoScamDB/Chainabuse)
- Dukungan multi-chain (BSC, Polygon, dll)
- Riwayat pencarian tersimpan (login/akun)
- Notifikasi/extension browser

### 6.1 Persyaratan Non-Fungsional: Mobile-Friendly

Mayoritas target pengguna (pemula crypto Indonesia) kemungkinan besar mengakses lewat ponsel, bukan desktop — sebagian besar interaksi crypto sehari-hari (cek harga, transfer, ikut komunitas Telegram) sudah berlangsung di mobile. Karena itu UI dirancang **mobile-first**, bukan mobile sebagai penyesuaian belakangan:

- Layout 1 kolom di mobile, baru melebar ke 2 kolom di breakpoint ≥640px (tablet/desktop)
- Semua elemen interaktif utama (input address, tombol "Cek Sekarang", card hasil) menggunakan lebar penuh (`w-full`) dengan batas maksimum di layar lebih besar
- Teks panjang seperti alamat wallet di-wrap otomatis agar tidak overflow di layar kecil
- Elemen visual (Checkpoint Gate) menyusut proporsional di layar kecil agar tidak mendominasi viewport
- Target area sentuh (tombol, chip contoh address) tetap nyaman di-tap di layar ponsel (minimum ~40px tinggi)

---

## 7. Logic Penilaian Risiko (Heuristik v1)

**Kategori A — Wallet Age & Aktivitas (bobot 40%)**
- Umur < 30 hari & transaksi < 5x → kontribusi risiko tinggi
- Umur 30–180 hari & transaksi 5–20x → kontribusi risiko sedang
- Umur > 180 hari & transaksi > 20x → kontribusi risiko rendah

**Kategori B — Pola Transaksi (bobot 35%)**
- Rasio unique sender tinggi dalam waktu singkat (>15 alamat dalam 7 hari) → indikasi wallet penampung dana scam
- Pola natural & konsisten → indikasi aman

**Kategori C — Database Scam Publik (bobot 25%, opsional v1.1+)**
- Match di database publik → otomatis level "Berisiko", skip kalkulasi lain

**Output:** Skor gabungan → mapping ke 3 level (Aman / Hati-hati / Berisiko), masing-masing dengan daftar alasan dan 1 rekomendasi aksi.

> Catatan: Threshold angka di atas adalah heuristik awal untuk MVP, perlu di-tuning lebih lanjut dengan data riil pola scam Indonesia sebelum produksi.

---

## 8. Tech Stack (Usulan)

- **Frontend:** React + Tailwind CSS
- **Data on-chain:** Etherscan API (`txlist` endpoint, gratis dengan API key)
- **Hosting demo:** Vercel
- **Tanpa backend/database** di versi MVP — semua kalkulasi dilakukan di client setelah fetch data dari API publik

### 8.1 Catatan Ketersediaan API (Etherscan)

- Etherscan API gratis untuk Ethereum mainnet tetap tersedia dengan API key gratis, limit **5 request/detik** dan **100.000 request/hari** — lebih dari cukup untuk kebutuhan prototype/demo.
- Per akhir November 2025, Etherscan membatasi cakupan tier gratis untuk beberapa chain non-Ethereum (Avalanche, Base, BNB Chain, Optimism) karena lonjakan volume transaksi di ekosistem tersebut. Ethereum mainnet masih termasuk dalam cakupan tier gratis yang dipertahankan.
- **Implikasi untuk roadmap multi-chain (lihat Bab 11):** sebelum menambah dukungan chain lain, perlu evaluasi ulang apakah chain target masih tercakup tier gratis Etherscan, atau perlu API alternatif (misal Routescan, BSCTrace) yang juga mulai menawarkan tier gratis untuk chain yang terdampak.

---

## 9. Metrik Keberhasilan (untuk versi produksi, bukan prototype)

- % pengguna yang menyelesaikan flow cek wallet (tidak drop di tengah)
- Rasio penggunaan tombol "cek wallet lain" (indikasi retensi/kepercayaan terhadap tool)
- (Jangka panjang) feedback eksplisit dari user: "rekomendasi ini membantu/tidak" pasca hasil ditampilkan

---

## 10. Risiko & Asumsi

| Risiko | Mitigasi |
|---|---|
| Heuristik bisa salah (false positive/negative) | Selalu sertakan disclaimer + framing "indikasi", bukan kepastian |
| Rate limit API publik gratis | Cache hasil sementara, batasi jumlah request per sesi |
| User mengandalkan tool ini sepenuhnya tanpa verifikasi lain | UX harus selalu mendorong langkah verifikasi tambahan, bukan jadi otoritas tunggal |

---

## 11. Roadmap Setelah MVP

1. Integrasi database scam publik (Kategori C)
2. Dukungan multi-chain (BSC, Polygon — chain yang populer dipakai modus penipuan di Indonesia)
3. Browser extension untuk cek otomatis saat user paste address di mana pun
4. Crowdsourced reporting — user bisa lapor wallet mencurigakan, memperkaya database lokal
