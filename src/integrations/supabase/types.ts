export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      courses: {
        Row: {
          id: string
          teacher_id: string | null
          title: string | null
        }
        Insert: {
          id?: string
          teacher_id?: string | null
          title?: string | null
        }
        Update: {
          id?: string
          teacher_id?: string | null
          title?: string | null
        }
        Relationships: []
      }
      enrollments: {
        Row: {
          course_id: string | null
          id: string
          student_id: string | null
        }
        Insert: {
          course_id?: string | null
          id?: string
          student_id?: string | null
        }
        Update: {
          course_id?: string | null
          id?: string
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount_etb: number
          bank_name: string | null
          bank_reference: string | null
          chapa_reference: string | null
          chapa_tx_ref: string | null
          created_at: string
          id: string
          method: Database["public"]["Enums"]["payment_method"]
          notes: string | null
          receipt_url: string | null
          status: Database["public"]["Enums"]["payment_status"]
          tier: Database["public"]["Enums"]["plan_tier"]
          updated_at: string
          user_id: string
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          amount_etb: number
          bank_name?: string | null
          bank_reference?: string | null
          chapa_reference?: string | null
          chapa_tx_ref?: string | null
          created_at?: string
          id?: string
          method: Database["public"]["Enums"]["payment_method"]
          notes?: string | null
          receipt_url?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          tier: Database["public"]["Enums"]["plan_tier"]
          updated_at?: string
          user_id: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          amount_etb?: number
          bank_name?: string | null
          bank_reference?: string | null
          chapa_reference?: string | null
          chapa_tx_ref?: string | null
          created_at?: string
          id?: string
          method?: Database["public"]["Enums"]["payment_method"]
          notes?: string | null
          receipt_url?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          tier?: Database["public"]["Enums"]["plan_tier"]
          updated_at?: string
          user_id?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          grade: string | null
          id: string
          phone: string | null
          region: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          grade?: string | null
          id: string
          phone?: string | null
          region?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          grade?: string | null
          id?: string
          phone?: string | null
          region?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      students: {
        Row: {
          full_name: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          full_name?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          full_name?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string
          current_period_end: string | null
          current_period_start: string
          id: string
          status: Database["public"]["Enums"]["subscription_status"]
          tier: Database["public"]["Enums"]["plan_tier"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string
          id?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          tier?: Database["public"]["Enums"]["plan_tier"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string
          id?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          tier?: Database["public"]["Enums"]["plan_tier"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      todos: {
        Row: {
          created_at: string | null
          id: number
          task: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          task?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          task?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          email: string | null
          id: number
          name: string | null
          password: string | null
        }
        Insert: {
          email?: string | null
          id?: number
          name?: string | null
          password?: string | null
        }
        Update: {
          email?: string | null
          id?: number
          name?: string | null
          password?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_active_pro: { Args: { _user_id: string }; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "student"
      payment_method: "chapa" | "manual_bank" | "telebirr"
      payment_status: "pending" | "verified" | "rejected"
      plan_tier:
        | "free"
        | "pro_monthly"
        | "pro_yearly"
        | "pro_lifetime"
        | "pro_campus"
      subscription_status: "active" | "pending" | "expired" | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "student"],
      payment_method: ["chapa", "manual_bank", "telebirr"],
      payment_status: ["pending", "verified", "rejected"],
      plan_tier: [
        "free",
        "pro_monthly",
        "pro_yearly",
        "pro_lifetime",
        "pro_campus",
      ],
      subscription_status: ["active", "pending", "expired", "cancelled"],
    },
  },
} as const
