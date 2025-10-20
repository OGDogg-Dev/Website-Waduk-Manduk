import type { PaginatedResponse } from '@/types/pagination';

export interface DashboardMetrics {
    counts: {
        spots: number;
        umkms: number;
        events: number;
        stories: number;
        contributors: number;
    };
    recentStories: Array<{
        id: number;
        title: string;
        status: string;
        published_at: string | null;
    }>;
    upcomingEvents: Array<{
        id: number;
        title: string;
        status: string;
        start_at: string | null;
    }>;
    currentStatus: {
        crowd_level: string;
        weather_summary: string | null;
        temperature: string | null;
        is_raining: boolean;
        reported_at: string | null;
        valid_until: string | null;
    } | null;
}

export interface SpotListItem {
    id: number;
    name: string;
    type: string;
    status: string;
    is_featured: boolean;
    sort_order: number;
    updated_at: string | null;
}

export type SpotListResponse = PaginatedResponse<SpotListItem>;

export interface SpotFormData {
    id?: number;
    name: string;
    slug: string | null;
    type: string;
    category: string | null;
    headline: string | null;
    description: string | null;
    tips: string | null;
    latitude: number | null;
    longitude: number | null;
    status: string;
    is_featured: boolean;
    sort_order: number;
    hero_image: string | null;
    gallery: string[];
    metadata: Record<string, unknown> | null;
}

export interface SpotOptions {
    status: Array<{ value: string; label: string }>;
    types: Array<{ value: string; label: string }>;
}

export interface UmkmListItem {
    id: number;
    name: string;
    category: string | null;
    status: string;
    is_featured: boolean;
    whatsapp_number: string | null;
    updated_at: string | null;
}

export type UmkmListResponse = PaginatedResponse<UmkmListItem>;

export interface UmkmFormData {
    id?: number;
    name: string;
    slug: string | null;
    owner_name: string | null;
    category: string | null;
    tagline: string | null;
    description: string | null;
    whatsapp_number: string | null;
    maps_url: string | null;
    instagram_url: string | null;
    facebook_url: string | null;
    status: string;
    is_featured: boolean;
    opening_hours: Record<string, string>;
    products: Array<{ name: string; price?: string }>;
    address: string | null;
    hero_image: string | null;
    gallery: string[];
    metadata: Record<string, unknown> | null;
}

export interface UmkmOptions {
    status: Array<{ value: string; label: string }>;
    categories: Array<{ value: string; label: string }>;
}

export interface EventListItem {
    id: number;
    title: string;
    status: string;
    start_at: string | null;
    end_at: string | null;
    event_type: string | null;
    organizer: string | null;
    author: string | null;
}

export type EventListResponse = PaginatedResponse<EventListItem>;

export interface EventFormData {
    id?: number;
    title: string;
    slug: string | null;
    tagline: string | null;
    summary: string | null;
    body: string | null;
    location: string | null;
    status: string;
    is_featured: boolean;
    start_at: string | null;
    end_at: string | null;
    published_at: string | null;
    event_type: string | null;
    organizer: string | null;
    contact_person: string | null;
    registration_url: string | null;
    cover_image: string | null;
    gallery: string[];
    metadata: Record<string, unknown> | null;
}

export interface EventOptions {
    status: Array<{ value: string; label: string }>;
    types: Array<{ value: string; label: string }>;
}

export interface StoryListItem {
    id: number;
    title: string;
    status: string;
    type: string;
    published_at: string | null;
    author: string | null;
    updated_at: string | null;
}

export type StoryListResponse = PaginatedResponse<StoryListItem>;

export interface StoryFormData {
    id?: number;
    title: string;
    slug: string | null;
    type: string;
    status: string;
    hero_image: string | null;
    excerpt: string | null;
    body: string | null;
    tags: string[];
    gallery: string[];
    source_name: string | null;
    source_url: string | null;
    published_at: string | null;
    metadata: Record<string, unknown> | null;
}

export interface StoryOptions {
    status: Array<{ value: string; label: string }>;
    types: Array<{ value: string; label: string }>;
}

export interface SiteStatusListItem {
    id: number;
    crowd_level: string;
    weather_summary: string | null;
    is_current: boolean;
    reported_at: string | null;
    valid_until: string | null;
    reporter: string | null;
}

export type SiteStatusListResponse = PaginatedResponse<SiteStatusListItem>;

export interface SiteStatusFormData {
    id?: number;
    crowd_level: string;
    weather_summary: string | null;
    temperature: string | null;
    wind: string | null;
    is_raining: boolean;
    advisory: string | null;
    metrics: Record<string, unknown> | null;
    is_current: boolean;
    reported_at: string | null;
    valid_until: string | null;
}

export interface SiteStatusOptions {
    crowdLevels: Array<{ value: string; label: string }>;
}

