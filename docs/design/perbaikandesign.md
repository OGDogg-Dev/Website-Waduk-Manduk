# Panduan Perbaikan Desain Halaman Publik

Dokumen ini memandu implementasi tampilan baru halaman publik situs Waduk Manduk sesuai referensi desain terbaru (lihat lampiran gambar). Fokus utamanya adalah konsistensi visual, penekanan brand pariwisata air, serta pengalaman pengguna yang informatif dan memikat di seluruh perangkat.

## 1. Identitas Visual Global

### 1.1 Palet Warna
- **Navy gelap** `#001B3B` sebagai latar utama dan blok informasi penting.
- **Biru toska** `#0F4C81` untuk gradasi laut dan latar sekunder.
- **Emas pasir** `#F2C46D` untuk aksen CTA, garis pemisah, dan ikon sorotan.
- **Putih** `#FFFFFF` untuk teks utama pada latar gelap dan blok konten ringan.
- **Biru muda** `#D1E6FF` sebagai warna latar section terang dan kartu testimoni.

Tambahkan variabel warna ini pada `resources/css/app.css` atau konfigurasi Tailwind agar mudah dipakai lintas komponen. Gunakan gradasi linear `#001B3B → #0F4C81` untuk hero dan wave besar.

### 1.2 Tipografi & Ikonografi
- Heading menggunakan **Instrument Serif** atau alternatif serif dekoratif untuk memberikan kesan premium. Jika belum tersedia, impor melalui Google Fonts.
- Body copy tetap memakai **Instrument Sans**.
- Gunakan iconografi garis tipis (outline) untuk stats dan layanan. Warna ikon mengikuti aksen emas.

### 1.3 Ornamen & Ilustrasi
- Sediakan SVG gelombang dengan tiga varian (besar, sedang, kecil) yang dapat ditempatkan di bagian atas/bawah section.
- Tambahkan elemen doodle lingkaran peta dan garis kontur seperti pada referensi hero.
- Background pattern berupa titik-titik halus pada latar terang.

## 2. Struktur Layout Global
- Header transparan di atas hero dengan logo kombinasi teks + ikon, nav menu, dan tombol "Reservasi" berwarna emas.
- `PublicLayout` diperbarui dengan latar belakang navy dan wave yang menyelimuti keseluruhan halaman.
- Footer penuh berwarna navy menampilkan logo putih, alamat, kontak, tautan navigasi, serta badge media sosial.
- Gunakan `PageContainer` dengan maksimal lebar 1200px dan padding horizontal 24px.

## 3. Halaman Beranda

### 3.1 Hero Section
- Latar belakang foto bawah air dengan overlay gradient navy → biru toska.
- Headline "Destinasi Ekowisata Bahari Waduk Manduk" dan subheadline inspiratif.
- Dua tombol CTA: `Jelajahi Sekarang` (primer emas) dan `Tonton Video` (sekunder outline putih dengan ikon play).
- Kolom kanan menampilkan mockup mobile + desktop aplikasi di atas wave dekoratif.
- Baris bawah hero berisi **Kartu Statistik**: jumlah spot, UMKM mitra, event, dan pengunjung. Kartu memiliki ikon emas dan latar semi transparan.

### 3.2 Section Pengalaman Pengunjung
- Layout dua kolom: teks informatif di kiri (judul, paragraf, bullet value proposition) dan foto kapal menyelam di kanan dalam frame rounded dengan ornamen wave.
- Tambahkan CTA kecil "Pelajari Paket Wisata".

### 3.3 Sorotan Spot & UMKM
- Gunakan slider atau grid 3 kolom dengan kartu tinggi berfoto penuh, overlay gradient bawah, judul putih, dan badge kategori.
- Sertakan tombol sekunder "Lihat Semua Spot" dan "Lihat Semua UMKM" di bawah grid.

### 3.4 Event & Agenda
- Section latar navy tua, teks putih. Gunakan layout carousel horizontal 3 kartu event.
- Sisi kiri section memuat heading + deskripsi + CTA "Gabung Komunitas".

### 3.5 Testimoni / Cerita
- Gunakan background putih dengan pattern titik. Grid 2x2 kartu testimoni menampilkan foto kecil, kutipan, dan nama pengunjung.
- Tambahkan link "Baca semua cerita" menuju halaman cerita.

### 3.6 CTA Wave Besar
- Section penuh dengan wave emas dan biru, teks ajakan "Rencanakan perjalanan anda sekarang" serta tombol `Reservasi Sekarang`.

### 3.7 Artikel & Dokumentasi
- Gunakan layout 3 kartu dengan foto besar dan preview konten. Kartu tengah sedikit menonjol (skala 1.05) untuk meniru referensi desain.

## 4. Halaman Publik Lain

### 4.1 Halaman Spot
- Hero mini dengan foto spot spesifik dan overlay gradient.
- Panel informasi tersegmentasi: deskripsi, fasilitas, jadwal kunjungan, peta lokasi (embed Google Maps).
- Galeri foto horizontal dan video highlight.
- Section rekomendasi spot lain (3 kartu).

### 4.2 Halaman UMKM
- Hero dengan foto UMKM unggulan dan tagline kemitraan.
- Grid kartu UMKM 3 kolom dengan latar putih, bayangan lembut, badge kategori.
- Section ajakan bergabung bermitra (wave emas + form singkat).

### 4.3 Halaman Event
- Kalender event di bagian atas dengan filter kategori.
- Daftar event mendatang (kartu panjang) dengan CTA daftar.
- Dokumentasi event lalu dalam grid galeri.

### 4.4 Halaman Cerita
- Layout majalah: hero teks di kiri, foto besar di kanan.
- Daftar artikel berbentuk kartu horizontal dengan highlight kutipan.
- Section video dokumenter dengan thumbnail besar dan tombol play.

## 5. Panduan Implementasi

1. **Struktur Komponen**
   - Buat folder `resources/js/components/public/layout` untuk header, footer, wave background.
   - Buat komponen section modular (`HeroSection`, `StatsBar`, `ExperienceSection`, dll.) sesuai struktur di atas.
2. **Styling**
   - Tambahkan konfigurasi warna dan gradient di Tailwind (`tailwind.config.ts`).
   - Gunakan utility Tailwind untuk responsive grid (mobile 1 kolom, tablet 2, desktop 3).
3. **Aset**
   - Simpan SVG wave & doodle di `resources/images/ornaments/`.
   - Pastikan gambar hero memiliki rasio 16:9 dan ukuran minimal 1920px.
4. **Interaksi**
   - Implementasi slider menggunakan Swiper atau embeddable React carousel dengan navigasi panah emas.
   - Pastikan tombol CTA memiliki animasi hover ringan (scale 1.02, shadow).
5. **Responsif**
   - Tablet: tumpuk hero ke kolom tunggal, mockup device dipindah ke bawah teks.
   - Mobile: ubah grid menjadi slider, pastikan wave tidak menutupi teks.
6. **Aksesibilitas**
   - Kontras warna minimal 4.5:1.
   - Tambahkan alt text pada semua gambar.
   - Keyboard navigation pada carousel.

## 6. Checklist Akhir
- [ ] Variabel warna baru tersedia dan digunakan konsisten.
- [ ] Header dan footer mengikuti desain baru.
- [ ] Semua section beranda terbangun sesuai referensi.
- [ ] Halaman Spot, UMKM, Event, dan Cerita memiliki hero, konten, dan CTA sesuai pedoman.
- [ ] Wave & ornamen tampil tanpa menyebabkan CLS.
- [ ] Komponen responsif di tiga breakpoint utama (mobile, tablet, desktop).
- [ ] SEO meta dan konten CTA diperbarui dengan messaging baru.

> Simpan hasil implementasi di cabang fitur dan koordinasikan dengan tim konten untuk penyusunan copywriting akhir.
