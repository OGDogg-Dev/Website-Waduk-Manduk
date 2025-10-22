# Waduk Manduk – Panduan UI Publik

Dokumen ini merangkum cara menjalankan antarmuka publik dan struktur desain yang digunakan setelah penyegaran UI/UX.

## Menjalankan aplikasi

1. **Instal dependensi**
   ```bash
   npm install
   php artisan migrate --seed # opsional, jika membutuhkan data contoh
   ```
2. **Jalankan server pengembangan**
   ```bash
   php artisan serve
   npm run dev
   ```
   Aplikasi publik tersedia melalui Inertia + Vite. Pastikan kedua proses berjalan untuk menampilkan halaman publik lengkap.

## Struktur desain

- **Sistem token** berada di `resources/css/tokens.css` dan meliputi warna, tipografi, radius, dan bayangan.
- **Utilities global** seperti `focus-ring`, `chip`, dan `scrim-hero` didefinisikan di `resources/css/app.css` dan dimuat melalui `resources/js/app.tsx`.
- **Komponen publik utama** berada di `resources/js/components/public/`, mencakup `Header`, `Footer`, `Hero`, `Gallery`, `Lightbox`, `Map`, `Step`, dan `FAQ` untuk kebutuhan lintas halaman.
- **Layout** publik menggunakan `resources/js/layouts/public/public-layout.tsx` dengan header lengket, footer tematik, dan skip-link aksesibel.
- **Halaman Inertia** dikelompokkan per kebutuhan navigasi di `resources/js/pages/Public/`:
  - `Home` – hero dengan scrim, bantuan cepat, agenda, dan cerita terbaru.
  - `Qris` – langkah pembayaran, unduhan materi, FAQ, dan kontak resmi.
  - `Fasilitas` – tabel fasilitas/zebra, tips, paket populer, dan agenda edukasi.
  - `Peta` – peta Leaflet, sorotan area, dan cerita lapangan.
  - `Galeri` – masonry grid dengan lightbox serta agenda bertag dokumentasi.
  - `Berita` – daftar artikel dengan filter topik, load more, dan skeleton loading.
  - `Kontak` – formulir aksesibel dengan ARIA live, informasi kontak, dan status terbaru.

## QA aksesibilitas & kinerja

- Semua tombol & tautan memakai kelas `.focus-ring` untuk fokus `focus-visible` yang jelas.
- Heading menggunakan skala `clamp()` dari token tipografi agar responsif hingga layar ≤360px.
- Gambar non-hero memakai `loading="lazy"`; hero menggunakan resolusi tinggi dengan overlay untuk kontras.
- Komponen peta menggunakan Leaflet dengan marker utama Waduk Manduk dan `ResizeObserver` agar responsif.

## Konvensi commit

Gunakan format `feat(ui): …` untuk penambahan fitur UI dan `fix(ui): …` untuk perbaikan bug/tweak antarmuka agar konsisten dengan perubahan ini.
