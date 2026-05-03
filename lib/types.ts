export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          organization: string | null
          role: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at'>
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      teams: {
        Row: {
          id: string
          name: string
          owner_id: string
          subscription_tier: 'free' | 'starter' | 'professional'
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['teams']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['teams']['Insert']>
      }
      team_members: {
        Row: {
          id: string
          team_id: string
          user_id: string
          role: 'admin' | 'manager' | 'viewer'
          invited_at: string
          joined_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['team_members']['Row'], 'id' | 'invited_at'>
        Update: Partial<Database['public']['Tables']['team_members']['Insert']>
      }
      assessments: {
        Row: {
          id: string
          team_id: string
          created_by: string
          title: string
          description: string | null
          domain: 'whs' | 'aml' | 'privacy' | 'fairwork' | 'operational'
          status: 'draft' | 'in_progress' | 'completed' | 'archived'
          assessment_date: string
          review_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['assessments']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['assessments']['Insert']>
      }
      risks: {
        Row: {
          id: string
          assessment_id: string
          team_id: string
          title: string
          description: string | null
          category: string | null
          likelihood: number
          consequence: number
          risk_score: number
          risk_level: 'critical' | 'high' | 'medium' | 'low'
          owner: string | null
          due_date: string | null
          status: 'open' | 'mitigating' | 'closed'
          ai_generated: boolean
          notes: any
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['risks']['Row'], 'id' | 'created_at' | 'updated_at' | 'risk_level' | 'risk_score'>
        Update: Partial<Database['public']['Tables']['risks']['Insert']>
      }
      controls: {
        Row: {
          id: string
          risk_id: string
          team_id: string
          title: string
          description: string | null
          type: 'detective' | 'preventive' | 'corrective'
          effectiveness: number
          owner: string | null
          implementation_date: string | null
          status: 'planned' | 'implemented' | 'ineffective'
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['controls']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['controls']['Insert']>
      }
      assessment_templates: {
        Row: {
          id: string
          team_id: string
          name: string
          domain: string
          template_data: any
          is_system_template: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['assessment_templates']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['assessment_templates']['Insert']>
      }
      audit_log: {
        Row: {
          id: string
          team_id: string
          user_id: string
          action: string
          entity_type: string
          entity_id: string
          changes: any
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['audit_log']['Row'], 'id' | 'created_at'>
        Update: never
      }
    }
  }
}

export type RiskScore = 'critical' | 'high' | 'medium' | 'low'

export interface RiskAssessmentData {
  title: string
  likelihood: number
  consequence: number
  risk_score?: number
  notes?: string
  category?: string
}
