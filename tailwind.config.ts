import type { Config } from 'tailwindcss';
import containerQueries from '@tailwindcss/container-queries';

const config = {
    darkMode: ['class'],
    content: [
        './resources/**/*.{js,ts,jsx,tsx,vue,blade.php}',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    safelist: ['focus-visible:outline-none'],
    theme: {
        container: {
            center: true,
            padding: '1rem',
            screens: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1440px',
            },
        },
        extend: {
            colors: {
                navy: {
                    900: '#061A2C',
                    800: '#0B2741',
                    700: '#123653',
                },
                gold: {
                    600: '#D99B1A',
                    500: '#F2B640',
                },
                sky: {
                    400: '#6CC6F2',
                    300: '#A6D9F7',
                },
                border: 'var(--border)',
                input: 'var(--input)',
                ring: 'var(--ring)',
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                card: {
                    DEFAULT: 'var(--card)',
                    foreground: 'var(--card-foreground)',
                },
                popover: {
                    DEFAULT: 'var(--popover)',
                    foreground: 'var(--popover-foreground)',
                },
                primary: {
                    DEFAULT: 'var(--primary)',
                    foreground: 'var(--primary-foreground)',
                },
                secondary: {
                    DEFAULT: 'var(--secondary)',
                    foreground: 'var(--secondary-foreground)',
                },
                muted: {
                    DEFAULT: 'var(--muted)',
                    foreground: 'var(--muted-foreground)',
                },
                destructive: {
                    DEFAULT: 'var(--destructive)',
                    foreground: 'var(--destructive-foreground)',
                },
                brand: {
                    950: 'var(--brand-950)',
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
                    DEFAULT: 'var(--accent)',
                    foreground: 'var(--accent-foreground)',
                    900: 'var(--accent-900)',
                    800: 'var(--accent-800)',
                    700: 'var(--accent-700)',
                    600: 'var(--accent-600)',
                    500: 'var(--accent-500)',
                    400: 'var(--accent-400)',
                    300: 'var(--accent-300)',
                    200: 'var(--accent-200)',
                    100: 'var(--accent-100)',
                    50: 'var(--accent-50)',
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
                sidebar: {
                    DEFAULT: 'var(--sidebar-background)',
                    foreground: 'var(--sidebar-foreground)',
                    primary: 'var(--sidebar-primary)',
                    'primary-foreground': 'var(--sidebar-primary-foreground)',
                    accent: 'var(--sidebar-accent)',
                    'accent-foreground': 'var(--sidebar-accent-foreground)',
                    border: 'var(--sidebar-border)',
                    ring: 'var(--sidebar-ring)',
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
                h1: ['var(--font-h1)', { lineHeight: '1.08', fontWeight: '700' }],
                h2: ['var(--font-h2)', { lineHeight: '1.12', fontWeight: '700' }],
                h3: ['var(--font-h3)', { lineHeight: '1.15', fontWeight: '600' }],
                h4: ['var(--font-h4)', { lineHeight: '1.2', fontWeight: '600' }],
                h5: ['var(--font-h5)', { lineHeight: '1.3', fontWeight: '600' }],
                h6: ['var(--font-h6)', { lineHeight: '1.4', fontWeight: '600' }],
                body: ['var(--font-body)', { lineHeight: '1.6' }],
                small: ['var(--font-small)', { lineHeight: '1.5' }],
            },
            spacing: {
                4: 'var(--space-4)',
                8: 'var(--space-8)',
                12: 'var(--space-12)',
                16: 'var(--space-16)',
            },
            borderRadius: {
                12: 'var(--radius-12)',
                16: 'var(--radius-16)',
                20: 'var(--radius-20)',
                xl: 'var(--radius-xl)',
            },
            boxShadow: {
                soft: '0 10px 30px rgba(0, 0, 0, 0.25)',
                chip: '0 0 0 1px rgba(255, 255, 255, 0.12)',
            },
            maxWidth: {
                '8xl': '88rem',
            },
        },
    },
    plugins: [containerQueries],
} satisfies Config;

export default config;
