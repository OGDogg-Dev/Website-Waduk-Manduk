import type { Config } from 'tailwindcss';

const config = {
    darkMode: ['class'],
    content: [
        './resources/**/*.{js,ts,jsx,tsx,vue,blade.php}',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        container: {
            center: true,
            padding: '1rem',
            screens: {
                lg: '1024px',
                xl: '1280px',
                '2xl': '1400px',
            },
        },
        extend: {
            colors: {
                brand: {
                    900: 'var(--brand-900)',
                    800: 'var(--brand-800)',
                    700: 'var(--brand-700)',
                    600: 'var(--brand-600)',
                    500: 'var(--brand-500)',
                    400: 'var(--brand-400)',
                    300: 'var(--brand-300)',
                    200: 'var(--brand-200)',
                    100: 'var(--brand-100)',
                },
                accent: {
                    800: 'var(--accent-800)',
                    700: 'var(--accent-700)',
                    600: 'var(--accent-600)',
                    500: 'var(--accent-500)',
                    400: 'var(--accent-400)',
                    300: 'var(--accent-300)',
                },
                surface: {
                    0: 'var(--surface-0)',
                    1: 'var(--surface-1)',
                    2: 'var(--surface-2)',
                    3: 'var(--surface-3)',
                },
                text: {
                    primary: 'var(--text-primary)',
                    secondary: 'var(--text-secondary)',
                    muted: 'var(--text-muted)',
                },
                on: {
                    dark: 'var(--text-on-dark)',
                    media: 'var(--text-on-media)',
                    'media-muted': 'var(--text-on-media-muted)',
                },
                overlay: {
                    'scrim-60': 'var(--overlay-scrim-60)',
                    'scrim-48': 'var(--overlay-scrim-48)',
                    'scrim-32': 'var(--overlay-scrim-32)',
                },
                focus: {
                    ring: 'var(--focus-ring-color)',
                },
            },
            fontSize: {
                h1: ['clamp(2.5rem, 5vw, 3.5rem)', { lineHeight: '1.1', fontWeight: '700' }],
                h2: ['clamp(2rem, 4vw, 2.75rem)', { lineHeight: '1.15', fontWeight: '700' }],
                h3: ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.2', fontWeight: '600' }],
                body: ['1rem', { lineHeight: '1.6' }],
            },
            boxShadow: {
                soft: '0 28px 60px -32px rgba(11, 31, 51, 0.28)',
                chip: '0 0 0 1px rgba(255, 255, 255, 0.12)',
            },
        },
    },
} satisfies Config;

export default config;
