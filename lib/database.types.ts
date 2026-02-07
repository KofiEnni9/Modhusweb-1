// Database types for Supabase tables
export interface Database {
  public: {
    Tables: {
      waitlist: {
        Row: {
          id: string
          email: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
        }
      }
    }
  }
}

// Helper types
export type WaitlistRow = Database['public']['Tables']['waitlist']['Row']
export type WaitlistInsert = Database['public']['Tables']['waitlist']['Insert']
export type WaitlistUpdate = Database['public']['Tables']['waitlist']['Update']
