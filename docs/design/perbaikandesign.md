# Panduan Perbaikan Desain Halaman Publik

## 1. Audit & Persiapan
- [x] **Aset visual**
  - Logo tersedia sebagai komponen React `resources/js/components/app-logo.tsx` dan `app-logo-icon.tsx` (versi teks + ikon).
  - Palet warna saat ini terdefinisi di `resources/css/app.css` dengan variabel berbasis OKLCH (dominasi gelap #003? ≈ `--primary: oklch(0.205 0 0)`; mode gelap juga tersedia). Belum ada warna aksen navy/gold spesifik seperti referensi desain baru.
  - Tipografi default: `Instrument Sans` (lihat deklarasi `--font-sans` pada `app.css`).
  - Ilustrasi gelombang / ornamen belum ada di repository; perlu dibuat/import sebagai SVG baru.
  - Foto hero di halaman publik diambil dari data dinamis (spot/event) sehingga tidak ada file statis; stok foto resolusi tinggi perlu disiapkan agar konsisten dengan konsep baru.
- [x] **Pemetaan konten halaman publik saat ini**
  1. `Hero` dengan judul “Ekowisata Waduk Manduk”, subjudul, dua tombol CTA.
  2. (Opsional) `StatusBanner` – menampilkan crowd level & cuaca bila data SiteStatus tersedia.
  3. Section “Sorotan Spot” – grid 4 kartu `SpotCard`.
  4. Section “UMKM Mitra” – grid 4 kartu `UmkmCard`.
  5. Section “Event Komunitas” – grid 3 kartu `EventCard`.
  6. Section “Cerita & Dokumentasi” – grid 3 kartu `StoryCard`.
  7. Footer generik berasal dari `PublicLayout`.
  > Belum ada section tambahan seperti highlight wave, galeri besar, video embed, atau artikel panjang sebagaimana contoh desain acuan.
- [x] **Komponen yang bisa dipakai ulang**
  - Layout dasar: `PublicLayout`, `Hero`, `StatusBanner`.
  - Komponen kartu: `SpotCard`, `UmkmCard`, `EventCard`, `StoryCard`.
  - Utilitas UI: `Button`, `PageContainer`, komponen from `@/components/common`.
  - Untuk wave/ornamen, perlu komponen baru karena tidak ada padanan di repo.

## 2. Perancangan Komponen
- [ ] Buat wireframe sederhana per section (boleh di kertas atau Figma).
- [ ] Definisikan struktur props untuk komponen `Hero`, `HighlightSection`, `WaveCTA`, `GalleryGrid`, `VideoSpotlight`, `ArticleList`, `Footer`.
- [ ] Siapkan data dummy di `resources/js/types/public.ts` bila diperlukan untuk uji layout.

## 3. Implementasi Layout
- [ ] Refactor `resources/js/pages/Public/Home/Index.tsx` menjadi wrapper yang menyusun komponen baru.
- [ ] Tambahkan utilitas Tailwind khusus (gradient, warna navy/gold) melalui konfigurasi Tailwind proyek (misalnya `tailwind.config.ts` bila digunakan).
- [ ] Implementasikan setiap komponen di `resources/js/components/public/` dengan fokus pada struktur HTML dan kelas utilitas.

## 4. Integrasi Data
- [ ] Sambungkan hero & highlight dengan data Spot unggulan dari controller `HomeController`.
- [ ] Isi galeri dan artikel menggunakan koleksi Story (`type: "gallery"`, `"blog"`).
- [ ] Tambahkan metadata (judul, deskripsi, CTA) ke controller bila diperlukan.

## 5. Pengujian & Responsif
- [ ] Uji di viewport desktop (>= 1280px), tablet (768–1024px), dan mobile (<= 640px).
- [ ] Pastikan slider/galeri tetap bisa di-swipe di layar sentuh.
- [ ] Verifikasi core web vitals: ukuran gambar dioptimalkan, tidak ada CLS mencolok.

## 6. Finishing
- [ ] Tambahkan fallback konten bila data kosong (mis. placeholder galeri).
- [ ] Update SEO meta (judul, deskripsi) sesuai branding baru.
- [ ] Dokumentasikan komponen & variabel desain baru di README atau wiki internal.
