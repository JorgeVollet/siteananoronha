// Tipos gerados manualmente a partir de supabase/migrations/001_initial_schema.sql
// Atualizar se o schema mudar.
// Mantém o formato completo exigido por @supabase/ssr (Views, Functions, Enums obrigatórios).

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      site_content: {
        Row: {
          id: string;
          section: string;
          key: string;
          value_text: string | null;
          value_json: Json | null;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          id?: string;
          section: string;
          key: string;
          value_text?: string | null;
          value_json?: Json | null;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          id?: string;
          section?: string;
          key?: string;
          value_text?: string | null;
          value_json?: Json | null;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [];
      };
      portfolio_projects: {
        Row: {
          id: string;
          category: 'engenharia' | 'marcenaria';
          nome: string;
          tipologia: string;
          servicos: string[];
          ordem: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category: 'engenharia' | 'marcenaria';
          nome: string;
          tipologia: string;
          servicos?: string[];
          ordem?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          category?: 'engenharia' | 'marcenaria';
          nome?: string;
          tipologia?: string;
          servicos?: string[];
          ordem?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      portfolio_media: {
        Row: {
          id: string;
          project_id: string;
          type: 'photo' | 'before_after' | 'video';
          ordem: number;
          url: string | null;
          alt: string | null;
          before_url: string | null;
          before_alt: string | null;
          video_url: string | null;
          video_source: 'upload' | 'youtube' | 'vimeo' | null;
          video_thumbnail: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          type: 'photo' | 'before_after' | 'video';
          ordem?: number;
          url?: string | null;
          alt?: string | null;
          before_url?: string | null;
          before_alt?: string | null;
          video_url?: string | null;
          video_source?: 'upload' | 'youtube' | 'vimeo' | null;
          video_thumbnail?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          type?: 'photo' | 'before_after' | 'video';
          ordem?: number;
          url?: string | null;
          alt?: string | null;
          before_url?: string | null;
          before_alt?: string | null;
          video_url?: string | null;
          video_source?: 'upload' | 'youtube' | 'vimeo' | null;
          video_thumbnail?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'portfolio_media_project_id_fkey';
            columns: ['project_id'];
            isOneToOne: false;
            referencedRelation: 'portfolio_projects';
            referencedColumns: ['id'];
          },
        ];
      };
      cta_clicks: {
        Row: {
          id: string;
          cta_location: string;
          user_agent: string | null;
          referrer: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          cta_location: string;
          user_agent?: string | null;
          referrer?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          cta_location?: string;
          user_agent?: string | null;
          referrer?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      articles: {
        Row: {
          id: string;
          slug: string;
          category: 'blog' | 'normas' | 'curiosidades' | 'sketch';
          title: string;
          subtitle: string | null;
          excerpt: string | null;
          content: Json | null;
          cover_image: string | null;
          cover_alt: string | null;
          tags: string[];
          author: string | null;
          reading_time_minutes: number | null;
          seo_meta_description: string | null;
          seo_keywords: string[] | null;
          is_published: boolean;
          is_featured: boolean;
          published_at: string | null;
          views: number;
          created_at: string;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          id?: string;
          slug: string;
          category: 'blog' | 'normas' | 'curiosidades' | 'sketch';
          title: string;
          subtitle?: string | null;
          excerpt?: string | null;
          content?: Json | null;
          cover_image?: string | null;
          cover_alt?: string | null;
          tags?: string[];
          author?: string | null;
          reading_time_minutes?: number | null;
          seo_meta_description?: string | null;
          seo_keywords?: string[] | null;
          is_published?: boolean;
          is_featured?: boolean;
          published_at?: string | null;
          views?: number;
          created_at?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          id?: string;
          slug?: string;
          category?: 'blog' | 'normas' | 'curiosidades' | 'sketch';
          title?: string;
          subtitle?: string | null;
          excerpt?: string | null;
          content?: Json | null;
          cover_image?: string | null;
          cover_alt?: string | null;
          tags?: string[];
          author?: string | null;
          reading_time_minutes?: number | null;
          seo_meta_description?: string | null;
          seo_keywords?: string[] | null;
          is_published?: boolean;
          is_featured?: boolean;
          published_at?: string | null;
          views?: number;
          created_at?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

// Aliases convenientes para uso nos componentes
export type Project =
  Database['public']['Tables']['portfolio_projects']['Row'];

export type ProjectMedia =
  Database['public']['Tables']['portfolio_media']['Row'];

export type ProjectWithMedia = Project & { media: ProjectMedia[] };

export type SiteContent =
  Database['public']['Tables']['site_content']['Row'];

export type CtaClick =
  Database['public']['Tables']['cta_clicks']['Row'];

export type Article =
  Database['public']['Tables']['articles']['Row'];

export type ArticleCategory = 'blog' | 'normas' | 'curiosidades' | 'sketch';
