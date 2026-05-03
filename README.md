# Risk Assessment Platform

A comprehensive SaaS risk management platform for identifying, assessing, scoring, and treating risks across multiple domains (WHS, AML/CTF, Privacy, Fair Work, and Operational).

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Frontend**: React 19 + TypeScript 5
- **Styling**: Tailwind CSS 4
- **Forms**: React Hook Form + Zod
- **Database**: Supabase PostgreSQL
- **Auth**: Supabase Auth with RLS
- **AI**: Anthropic Claude API for risk generation
- **Payments**: Stripe
- **Email**: Resend
- **Deployment**: Vercel

## Project Structure

```
riskassessment/
├── app/
│   ├── (auth)/                    # Auth pages (login, signup)
│   ├── (dashboard)/               # Protected dashboard routes
│   ├── api/                       # API endpoints
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── ui/                        # Reusable UI components
│   ├── dashboard/                 # Dashboard components
│   ├── assessments/               # Assessment components
│   ├── risks/                     # Risk components
│   └── controls/                  # Control components
├── lib/
│   ├── anthropic.ts              # Claude API client
│   ├── risk-prompts.ts           # Risk generation prompts
│   ├── risk-scoring.ts           # Risk scoring calculations
│   ├── supabase/                 # Supabase clients
│   ├── stripe.ts                 # Stripe client
│   ├── resend.ts                 # Email service
│   └── types.ts                  # TypeScript types
├── supabase/migrations/           # Database migrations
└── middleware.ts                  # Auth middleware
```

## Setup Instructions

### 1. Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Anthropic
ANTHROPIC_API_KEY=your_anthropic_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# Resend
RESEND_API_KEY=your_resend_key
RESEND_FROM_EMAIL=noreply@yourdomain.com

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Security
CRON_SECRET=your_random_cron_secret
```

### 2. Database Setup

1. Create a new Supabase project
2. Run the migrations in order:
   - `001_initial_schema.sql` - Core tables and auth
   - `002_assessments.sql` - Assessments table
   - `003_risks.sql` - Risks table
   - `004_controls.sql` - Controls table
   - `005_templates.sql` - Assessment templates
   - `006_audit_log.sql` - Audit logging

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the app.

## Key Features

### Assessments
- Create structured risk assessments across 5 domains
- Track assessment status (draft, in_progress, completed, archived)
- Template support for standardized assessments

### Risk Register
- Centralized risk register with filtering and sorting
- Automatic risk scoring (likelihood × consequence matrix)
- Risk levels: critical, high, medium, low
- Risk ownership and due date tracking

### AI-Powered Risk Generation
- Generate risks using Claude AI based on assessment context
- Domain-specific prompts for WHS, AML, Privacy, Fair Work, Operational
- Automatic risk scoring for generated risks

### Controls Management
- Link controls to specific risks
- Track control effectiveness (0-100%)
- Control types: preventive, detective, corrective
- Implementation tracking

### Team Management
- Multi-tenant architecture with Supabase RLS
- Role-based access control (admin, manager, viewer)
- Team member invitations and management

### Reporting
- Risk register export to DOCX format
- Heatmap visualization of risk portfolio
- Audit logging of all changes

### Automated Workflows
- Review reminders (cron job)
- Risk alerts for critical/high risks (cron job)
- Supabase connection keepalive

## API Endpoints

### Assessments
- `GET /api/assessments` - List assessments
- `POST /api/assessments` - Create assessment
- `GET /api/assessments/:id` - Get assessment
- `PUT /api/assessments/:id` - Update assessment
- `DELETE /api/assessments/:id` - Delete assessment
- `POST /api/assessments/:id/generate` - Generate risks with AI

### Risks
- `GET /api/risks` - List risks
- `POST /api/risks` - Create risk
- `GET /api/risks/:id` - Get risk
- `PUT /api/risks/:id` - Update risk
- `DELETE /api/risks/:id` - Delete risk

### Controls
- `GET /api/controls?riskId=...` - List controls
- `POST /api/controls` - Create control

### Cron Jobs
- `GET /api/cron/review-reminders?secret=...` - Send review reminders
- `GET /api/cron/risk-alerts?secret=...` - Send risk alerts
- `GET /api/cron/supabase-keepalive?secret=...` - Keep Supabase alive

## Database Schema

### Key Tables
- **profiles** - User profiles with organization info
- **teams** - Team/organization records
- **team_members** - Team membership with roles
- **assessments** - Risk assessments
- **risks** - Identified risks with scores
- **controls** - Risk treatments/controls
- **assessment_templates** - Reusable assessment templates
- **audit_log** - Change tracking for compliance
- **subscriptions** - Stripe subscription data

## Development Notes

- All pages in `(dashboard)` are protected by middleware
- RLS (Row Level Security) enforces team-based data isolation
- Risk scores are calculated automatically from likelihood × consequence
- Audit logs capture all changes for compliance
- Email templates are in `lib/resend.ts`

## Deployment

Deploy to Vercel:

```bash
git push origin main
```

Vercel will automatically:
1. Build the Next.js project
2. Deploy to CDN
3. Set environment variables from project settings
4. Configure cron jobs from `vercel.json`

## Next Steps

1. Integrate with Shield apps (WHS Shield, AML Shield Pro, etc.)
2. Add more sophisticated risk heatmap visualization
3. Implement risk timeline/history
4. Add collaborative comments on risks
5. Enhance report generation with charts and graphs
6. Build mobile app for on-site risk assessments
7. Add integrations with JIRA, Slack, Teams

## Support

For issues or feature requests, contact your development team.
