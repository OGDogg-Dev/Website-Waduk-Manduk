---

# Application Overview — Website Waduk Manduk Jatirejo

Dokumen ini menjadi *single source of truth* untuk pengembangan, operasi, dan pemeliharaan website **Waduk Manduk Jatirejo**. Target utama: **portal informasi wisata** yang cepat, mudah dikelola, SEO-friendly, dan menampilkan **Informasi QRIS** (panduan pembayaran nontunai di lokasi, tanpa pemrosesan transaksi di website).

---

## 1) Cakupan & Sasaran

* **Sasaran utama (MVP)**

  * Halaman publik inti: Beranda, Profil/Sejarah, Fasilitas & Harga, Jam Operasional, Peta Interaktif, Galeri, Event/Agenda, Berita/Artikel, FAQ, Kontak.
  * **Halaman/sektion Informasi QRIS**: logo/banner, gambar QRIS (PNG/PDF untuk diunduh/cetak), langkah pembayaran, FAQ, disclaimer “transaksi dilakukan di lokasi”.
  * CMS sederhana (admin/editor) untuk kelola konten (post/event/galeri) dengan status **draft → review → publish**.
  * SEO dasar (meta/OG/schema/sitemap), aksesibilitas dasar (WCAG), performa (LCP < 2.5s).

* **Di luar cakupan (fase berikutnya)**

  * E-ticketing/booking online, pembayaran online, sistem reservasi.
  * Multi-bahasa, etalase UMKM mandiri, kalender komunitas.

---

## 2) Arsitektur & Stack

| Lapisan   | Teknologi                    | Catatan                                          |
| --------- | ---------------------------- | ------------------------------------------------ |
| Backend   | Laravel (PHP ≥ 8.2)          | API/controller, auth, validation, media handling |
| Frontend  | Inertia + React + TypeScript | SPA-like tanpa REST penuh; routing via Laravel   |
| Build     | Vite                         | HMR dev, bundling production                     |
| UI        | Tailwind CSS                 | Utilitas CSS, komponen reusable                  |
| DB        | MySQL/MariaDB/pgsql          | Tabel: users, posts, events, media               |
| Peta      | Google Maps (embed/JS API)   | Mulai dari embed; JS API jika butuh interaksi    |
| Analytics | GA4 / Umami (opsional)       | Trafik & halaman populer                         |
| CI/CD     | GitHub Actions (disarankan)  | Lint, build, test, deploy                        |

**Alur sederhana:**

```
Browser ──(Inertia/HTTP)──> Laravel Routes ──> Controllers ──> Models/DB
   │                                  │
   └──── React Pages (TS, Tailwind) ←─┘
```

---

## 3) Struktur Direktori (disarankan)

```
app/
bootstrap/
config/
database/
  ├─ factories/
  ├─ migrations/
  └─ seeders/
public/
  ├─ qris/            # aset QRIS (PNG/PDF resmi)
  └─ build/           # hasil build vite (prod)
resources/
  ├─ js/
  │  ├─ Pages/        # Halaman Inertia (React)
  │  ├─ Components/   # Komponen UI
  │  ├─ Layouts/      # Layout umum (Header/Footer)
  │  └─ utils/
  ├─ css/
  └─ views/           # blade "root" inertia
routes/
  ├─ web.php          # rute publik & admin
  └─ admin.php        # opsional: rute admin terpisah
storage/
tests/
.env.example
tailwind.config.ts
vite.config.ts
```

---

## 4) Model Data & Skema

### 4.1 Model inti

* **User**: `name`, `email`, `password`, `role` (`admin`/`editor`)
* **Post** (Berita/Artikel): `title`, `slug`, `excerpt`, `body`, `cover_media_id`, `status`, `published_at`
* **Event**: `title`, `slug`, `starts_at`, `ends_at`, `location`, `description`, `hero_media_id`, `status`
* **Media**: `disk`, `path`, `mime`, `size`, `alt_text`, `caption`, `created_by`

### 4.2 Status konten

* `draft` → `review` → `publish`
  Alur ini dipakai di halaman admin untuk moderasi.

---

## 5) Rute & Halaman

### 5.1 Halaman publik (MVP)

* `/` (Beranda)
* `/profil` (Profil/Sejarah)
* `/fasilitas` (Fasilitas & Harga, Jam Operasional)
* `/lokasi` (Peta Interaktif + rute)
* `/galeri`
* `/event` (daftar) & `/event/{slug}` (detail)
* `/berita` (daftar) & `/berita/{slug}` (detail)
* `/faq`
* `/kontak` (form, antispam/ratelimit)
* **`/pembayaran-qris`** (Informasi QRIS: logo/banner/gambar PNG/PDF, langkah, FAQ, **disclaimer**)

### 5.2 Admin/CMS

* `/admin/login`
* `/admin` (dashboard ringkas)
* `/admin/posts` (CRUD, status)
* `/admin/events` (CRUD, status)
* `/admin/media` (upload/alt/caption)
* `/admin/settings` (opsional: metadata situs)

---

## 6) Instalasi & Menjalankan

### 6.1 Prasyarat

* PHP ≥ 8.2, Composer
* Node ≥ 20, PNPM/NPM/Yarn
* MySQL/MariaDB/PostgreSQL
* Key API (opsional): Google Maps

### 6.2 Langkah awal

```bash
# 1) Clone & install deps
git clone https://github.com/OGDogg-Dev/Website-Waduk-Manduk.git
cd Website-Waduk-Manduk
composer install
npm install   # atau pnpm install / yarn

# 2) Copy .env dan generate key
cp .env.example .env
php artisan key:generate

# 3) Atur DB di .env, lalu jalankan migrasi & seed
php artisan migrate --seed

# 4) Jalankan dev
php artisan serve
npm run dev

# 5) Build produksi
npm run build
```

### 6.3 Contoh `.env` (ringkas)

```env
APP_NAME="Waduk Manduk"
APP_ENV=local
APP_KEY=base64:...
APP_URL=http://localhost
APP_TIMEZONE=Asia/Jakarta

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=waduk_manduk
DB_USERNAME=root
DB_PASSWORD=

# Opsional: Google Maps
GOOGLE_MAPS_API_KEY=
```

> **Catatan keamanan**: jangan commit `.env` berisi rahasia.

---

## 7) Panduan Implementasi Fitur

### 7.1 Informasi QRIS

* **Tujuan**: menyediakan **panduan pembayaran nontunai** (bukan proses transaksi).
* **Aset**: tempatkan **gambar resmi QRIS** (PNG/PDF) di `public/qris/`.
* **Halaman**: `/pembayaran-qris` menampilkan:

  * Logo/banner QRIS
  * Tombol **Unduh PNG/PDF**
  * Langkah pembayaran singkat
  * **FAQ + Disclaimer**: “Pembayaran diproses di lokasi; website tidak memproses transaksi/menyimpan data pembayaran.”

### 7.2 CMS (admin/editor)

* **Role**: `admin` (semua), `editor` (kelola konten).
* **Status**: `draft` → `review` → `publish`.
* **Media**: validasi & **whitelist** file (jpeg/png/webp/pdf). Simpan `alt_text` untuk aksesibilitas.

### 7.3 Form Kontak

* Validasi server-side, **rate limit** (Laravel throttle), honeypot/reCAPTCHA opsional.

### 7.4 Peta Interaktif

* Tahap awal: **embed Google Maps** (koordinat lokasi).
* Opsional lanjutan: Maps JS API untuk marker & rute.

---

## 8) SEO, Performa & Aksesibilitas

* **SEO**:

  * Meta title/description per halaman (via Inertia `<Head>`).
  * Open Graph/Twitter Card.
  * `sitemap.xml`, `robots.txt`, schema.org (Breadcrumb, Article, Event).
* **Performa**:

  * Target **LCP < 2.5s**; lazy-load gambar; kompresi; caching headers.
* **Aksesibilitas**:

  * Teks alternatif gambar (`alt`), kontras, fokus ring, landmark/heading terstruktur.

---

## 9) Keamanan & Privasi

* **CSRF** aktif (Laravel).
* Validasi & **whitelist** upload; batasi ukuran file.
* Rate limit login/kontak; audit log aktivitas admin.
* **Tidak menyimpan** data kartu/QRIS/transaksi.
* Halaman **Kebijakan Privasi** (form kontak, cookie/analytics).

---

## 10) Observabilitas, Backup & SOP

* Integrasi **Analytics** (GA4/Umami) & **Search Console**.
* Logging default Laravel (rotasi log).
* **Backup** DB & `public/qris/` + media (jadwal mingguan).
* SOP rilis/rollback (tag release, deploy atomik).

---

## 11) CI/CD (disarankan)

Contoh *workflow* GitHub Actions (gambaran):

* **lint**: ESLint/Prettier (frontend), Laravel Pint (opsional backend).
* **build**: `npm ci && npm run build` + `composer install --no-dev`
* **test**: PHPUnit/Pest (opsional), Vitest/RTL (opsional).
* **deploy**: rsync/SSH/ftp/Platform (sesuai target hosting).

---

## 12) Roadmap & Milestone

* **v0.1 (MVP, 2–3 minggu)**

  * Halaman publik inti + Informasi QRIS
  * CMS dasar (post/event/media) + status konten
  * SEO dasar, peta embed, form kontak (rate limit)
* **v0.2**

  * Galeri lebih optimal (lazy/load more), sitemap otomatis
  * Dashboard ringkas statistik (analytics)
  * Hardening keamanan upload, kebijakan privasi
* **v0.3**

  * Projects/Issues board aktif, automasi backup
  * Peningkatan aksesibilitas (audit Lighthouse ≥ 90)

---

## 13) Contributing & Konvensi

* **Commit**: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`, `perf:`, `test:`
* **Branch**: `feature/<nama>`, `fix/<nama>`
* **PR**: wajib deskripsi, *screenshot* UI jika ada, ceklis QA (lint/build/lighthouse).

---

## 14) Acceptance Checklist (MVP)

* [ ] Semua halaman publik tersedia dengan konten dummy.
* [ ] `/pembayaran-qris` menampilkan **logo/banner, gambar PNG/PDF, langkah, FAQ, disclaimer**.
* [ ] CMS: login admin/editor, CRUD post/event/media, status konten berfungsi.
* [ ] SEO: meta/OG, sitemap, robots; **Search Console** terpasang.
* [ ] Performa: **LCP < 2.5s** pada koneksi 4G (uji Lighthouse).
* [ ] Aksesibilitas: alt text gambar, kontras OK, fokus ring terlihat.
* [ ] Keamanan: CSRF aktif, whitelist upload, rate limit login/kontak.
* [ ] Analytics aktif; privacy page tersedia.
* [ ] Backup rutin DB & media terjadwal.

---

## 15) Lisensi

Tentukan lisensi yang sesuai (mis. MIT). Tambahkan file `LICENSE` di root.

---

### Lampiran A — Snippet Rute (contoh ringkas)

```php
// routes/web.php
Route::get('/', HomeController::class);
Route::inertia('/profil', 'Profile/Index');
Route::inertia('/fasilitas', 'Facilities/Index');
Route::inertia('/lokasi', 'Map/Index');
Route::inertia('/galeri', 'Gallery/Index');

Route::get('/event', [EventController::class, 'index']);
Route::get('/event/{slug}', [EventController::class, 'show']);
Route::get('/berita', [PostController::class, 'index']);
Route::get('/berita/{slug}', [PostController::class, 'show']);

Route::inertia('/faq', 'Faq/Index');
Route::get('/kontak', [ContactController::class, 'form']);
Route::post('/kontak', [ContactController::class, 'submit'])->middleware('throttle:10,1');

// Informasi QRIS
Route::inertia('/pembayaran-qris', 'Qris/Index');
```

### Lampiran B — Komponen Halaman QRIS (kerangka)

```tsx
// resources/js/Pages/Qris/Index.tsx
import { Head } from '@inertiajs/react';

export default function QrisIndex() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Head title="Informasi QRIS" />
      <h1 className="text-2xl font-semibold mb-4">Informasi Pembayaran QRIS</h1>

      <p className="text-sm text-muted-foreground mb-6">
        Website ini hanya menyediakan informasi. Pembayaran diproses <b>di lokasi</b>.
        Kami tidak memproses transaksi atau menyimpan data pembayaran.
      </p>

      <div className="rounded-2xl border p-4 mb-6">
        <img
          src="/qris/qris-poster.png"
          alt="Poster QRIS Waduk Manduk"
          className="mx-auto w-full max-w-md"
          loading="lazy"
        />
        <div className="mt-4 flex gap-3">
          <a className="underline" href="/qris/qris-poster.png" download>Unduh PNG</a>
          <a className="underline" href="/qris/qris-poster.pdf" download>Unduh PDF</a>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-2">Langkah Pembayaran</h2>
      <ol className="list-decimal pl-5 space-y-1">
        <li>Buka aplikasi pembayaran yang mendukung QRIS.</li>
        <li>Pindai QR di loket atau area yang disediakan.</li>
        <li>Pastikan nama merchant sesuai, masukkan nominal, lalu konfirmasi.</li>
        <li>Simpan bukti pembayaran digital Anda.</li>
      </ol>

      <h2 className="text-lg font-semibold mt-6 mb-2">FAQ Singkat</h2>
      <div className="space-y-2">
        <p><b>Apakah bisa bayar lewat website?</b> Tidak, pembayaran hanya di lokasi.</p>
        <p><b>Apa saja aplikasi yang didukung?</b> Semua aplikasi/dompet yang mendukung QRIS.</p>
      </div>
    </div>
  );
}
```

---