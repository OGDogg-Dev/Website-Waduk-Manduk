# Konsep Inti

* **Tujuan:** Mempromosikan Waduk Manduk sebagai destinasi ekowisata berbasis komunitas, dengan informasi yang jelas, visual yang kuat, dan ajakan sopan (etiket alam).
* **Cakupan:** Hanya **informasi** (rute, fasilitas, aktivitas, UMKM sekitar, cerita warga, kalender kegiatan).
  **Tidak ada** e-ticketing, booking, atau pre-order. **QRIS** ditampilkan hanya sebagai **informasi dukungan** (gambar/disclaimer).
* **Nilai Unik (Brand):** Alam asri · Edukasi ekowisata · Cerita warga · Pemberdayaan non-transaksional.

# Struktur Informasi (Sitemap Ringkas)

* **Beranda:** Hero + info cepat (status lokasi, cuaca ringkas, tombol “Lihat Rute”, teaser UMKM/acara/galeri).
* **Rencanakan Kunjungan:** Rute (peta interaktif), fasilitas, jam buka, etika berkunjung, tips perlengkapan.
* **Jelajah & Aktivitas:** Inspirasi aktivitas (trek ringan, titik foto) sebagai referensi—tanpa pemesanan.
* **UMKM & Kuliner:** **Direktori** profil + tautan **WhatsApp/Maps** (transaksi dilakukan di luar situs).
* **Konservasi & Edukasi:** Do & Don’t, flora-fauna kunci, budaya lokal.
* **Komunitas:** Profil komunitas/relawan, kanal sosial (tanpa formulir pendaftaran).
* **Dukungan & QRIS:** Gambar QRIS dan rekening **sebagai informasi**, + disclaimer.
* **Berita & Cerita:** Blog, liputan, galeri, UGC terkurasi.
* **Tentang & Kontak:** Profil pengelola, mitra, kontak & pengaduan.

# Alur Pengunjung (User Flow)

1. **Masuk Beranda →** dapat gambaran singkat & CTA “Lihat Rute”.
2. **Rencanakan Kunjungan →** lihat peta titik masuk/spot, fasilitas, etiket, cuaca ringkas.
3. **Eksplor Konten →** (opsional) “Jelajah & Aktivitas” untuk inspirasi; “UMKM” untuk cari warung/oleh-oleh.
4. **Hubungi/Datangi →** klik **Maps** untuk navigasi; kontak UMKM via **WhatsApp** bila perlu (di luar situs).
5. **Dukungan →** buka halaman **QRIS (informasional)** bila ingin berdonasi melalui kanal resmi non-situs.
6. **Cerita & Galeri →** membaca/menikmati dokumentasi; (opsional) kirim UGC yang akan dimoderasi.

# Alur Admin/Editor

1. **Login (Fortify) → Dashboard Admin.**
2. **Kelola Konten:**

   * **Site Status:** ubah **Sepi/Normal/Ramai/Ditutup** + catatan cuaca (tampil di Beranda).
   * **Spot & Peta:** tambah/edit titik (viewpoint, fasilitas) untuk peta interaktif.
   * **UMKM:** tambah/edit profil (nama, deskripsi, foto, WA/Maps).
   * **Event:** tambah/edit acara komunitas (informasi saja).
   * **Story/UGC:** kurasi & publish (status Draft/Pending/Published).
3. **Publikasi otomatis:** Beranda menarik data terbaru; cache dibersihkan saat CRUD.
4. **Pantau Analitik:** klik “Get Directions”, klik “WA UMKM”, kunjungan halaman QRIS, waktu baca halaman.

# Data & Teknis (Singkat)

* **Stack:** Laravel 12 + Inertia React **TypeScript** + Tailwind + React-Leaflet (peta).
* **Model utama:** `Spot`, `Umkm`, `Event`, `Story`, `SiteStatus`.
* **Peran:** `ADMIN`, `EDITOR`, `CONTRIBUTOR` (tidak ada peran/akun UMKM).
* **Keamanan:** Moderasi UGC, reCAPTCHA (opsional), RBAC, sanitasi input.
* **SEO & Kinerja:** `<Head>` per halaman, JSON-LD (`TouristAttraction`, `LocalBusiness`, `Event`), gambar terkompresi, lazy load.
* **PWA (opsional):** cache konten inti agar info dasar tetap terbaca saat sinyal lemah.

# KPI Utama (Branding & Info)

* Rasio klik **Get Directions**, klik **WA UMKM**, kunjungan **QRIS (informasi)**, waktu baca halaman, jumlah konten (story/galeri) yang dipublikasikan, dan feedback pengunjung.
