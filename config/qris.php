<?php

return [
    'hero' => [
        'title' => 'Informasi Pembayaran QRIS',
        'subtitle' => 'Gunakan QRIS resmi Waduk Manduk untuk transaksi nontunai yang aman dan cepat di lokasi.',
        'highlight' => 'Kode QR ini hanya digunakan di loket resmi. Website tidak memproses transaksi.',
    ],
    'downloads' => [
        [
            'label' => 'Poster QRIS Waduk Manduk (SVG)',
            'path' => 'qris/waduk-manduk-qris.svg',
            'format' => 'svg',
            'size' => '4 KB',
        ],
    ],
    'steps' => [
        [
            'title' => '1. Siapkan aplikasi pembayaran',
            'description' => 'Gunakan aplikasi bank atau dompet digital yang mendukung QRIS (BRI, BCA, Mandiri, OVO, GoPay, dan lainnya).',
        ],
        [
            'title' => '2. Pindai kode QR di lokasi',
            'description' => 'Datangi loket resmi Waduk Manduk dan pindai QRIS yang tersedia pada banner atau meja layanan.',
        ],
        [
            'title' => '3. Konfirmasi nominal dan merchant',
            'description' => 'Pastikan nama merchant tertera sebagai Komunitas Sahabat Manduk sebelum menyelesaikan pembayaran.',
        ],
        [
            'title' => '4. Simpan bukti transaksi',
            'description' => 'Tunjukkan bukti pembayaran ke petugas loket dan simpan salinan digital untuk arsip pribadi.',
        ],
    ],
    'faq' => [
        [
            'question' => 'Apakah transaksi dilakukan langsung di website?',
            'answer' => 'Tidak. Website hanya menyediakan informasi QRIS resmi. Pembayaran diproses oleh petugas di lokasi Waduk Manduk.',
        ],
        [
            'question' => 'Apakah kode QR ini dapat dicetak ulang?',
            'answer' => 'Ya. Unduh poster QRIS dalam format SVG resolusi tinggi, kemudian cetak untuk dipasang di area pelayanan.',
        ],
        [
            'question' => 'Bagaimana jika pembayaran gagal?',
            'answer' => 'Silakan hubungi petugas loket atau nomor hotline konservasi untuk validasi transaksi dan bantuan lanjutan.',
        ],
    ],
    'contacts' => [
        [
            'label' => 'Hotline Konservasi',
            'value' => '+62 813-1122-3344',
            'href' => 'https://wa.me/6281311223344',
            'type' => 'whatsapp',
        ],
        [
            'label' => 'Email Resmi',
            'value' => 'halo@wadukmanduk.id',
            'href' => 'mailto:halo@wadukmanduk.id',
            'type' => 'email',
        ],
        [
            'label' => 'Loket Informasi',
            'value' => 'Area Dermaga Biru, Waduk Manduk',
            'type' => 'location',
        ],
    ],
    'disclaimer' => 'Transaksi hanya dilayani oleh petugas resmi di lokasi Waduk Manduk. Mohon verifikasi nama merchant dan simpan bukti pembayaran.',
];
