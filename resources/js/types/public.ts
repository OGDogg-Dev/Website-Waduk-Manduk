export interface StatusResource {
    crowd_level: string | null;
    weather_summary: string | null;
    temperature?: string | null;
    advisory?: string | null;
    reported_at?: string | null;
    valid_until?: string | null;
}

export interface SpotResource {
    id: number;
    name: string;
    slug?: string | null;
    type: string;
    category?: string | null;
    headline?: string | null;
    description?: string | null;
    hero_image?: string | null;
    latitude?: number | string | null;
    longitude?: number | string | null;
    status?: string | null;
    gallery?: string[] | null;
}

export interface UmkmResource {
    id: number;
    name: string;
    slug?: string | null;
    tagline?: string | null;
    category?: string | null;
    hero_image?: string | null;
    whatsapp_number?: string | null;
    maps_url?: string | null;
    is_featured?: boolean;
    description?: string | null;
    products?: Array<{ name: string; price?: string }>;
}

export interface EventResource {
    id: number;
    title: string;
    slug?: string | null;
    tagline?: string | null;
    start_at?: string | null;
    event_type?: string | null;
    location?: string | null;
    cover_image?: string | null;
}

export interface StoryResource {
    id: number;
    title: string;
    slug: string;
    type: string;
    excerpt?: string | null;
    hero_image?: string | null;
    published_at?: string | null;
}

export interface QrisHeroResource {
    title: string;
    subtitle?: string | null;
    highlight?: string | null;
}

export interface QrisDownloadResource {
    label: string;
    url?: string | null;
    format?: string | null;
    size?: string | null;
}

export interface QrisStepResource {
    title?: string | null;
    description?: string | null;
}

export interface QrisFaqResource {
    question?: string | null;
    description?: string | null;
}

export interface QrisContactResource {
    label?: string | null;
    value?: string | null;
    href?: string | null;
    type?: string | null;
}

export interface QrisPageResource {
    hero: QrisHeroResource;
    downloads: QrisDownloadResource[];
    steps: QrisStepResource[];
    faq: QrisFaqResource[];
    contacts: QrisContactResource[];
    disclaimer?: string | null;
}
