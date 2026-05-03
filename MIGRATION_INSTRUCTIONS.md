# Signup Error Fix - Migration Instructions

## Summary of Changes

The "An unexpected error occurred" message when clicking Create Account was caused by missing Row Level Security (RLS) policies in Supabase. The application was trying to insert records into tables that didn't have the necessary INSERT policies configured.

## Code Changes Made

1. **Created `/app/api/auth/signup/route.ts`** - A server-side API route that handles signup with the service role key, bypassing client-side RLS restrictions for administrative operations.

2. **Updated `/app/(auth)/signup/page.tsx`** - Modified the signup form to call the new API route instead of directly accessing Supabase from the client.

3. **Created migration file `supabase/migrations/002_add_missing_rls_policies.sql`** - This migration adds the missing RLS policies needed for signup to work.

## Deployment Status

✅ Application deployed to production at: https://www.risk-assessment.com.au

⚠️ **Database schema must be initialized** - The tables don't exist yet. Follow the migration steps below.

## Required Database Migrations

You must apply **BOTH** migrations in the correct order:

### Step 1: Apply Initial Schema (001_initial_schema.sql)
This creates all the tables. Go to your Supabase project:
1. https://app.supabase.com/ → Select your project
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy entire contents of `supabase/migrations/001_initial_schema.sql`
5. Paste into the SQL Editor and click **Run**
6. Wait for completion

### Step 2: Apply Missing RLS Policies (002_add_missing_rls_policies.sql)
This adds the policies needed for signup:
1. Create a new SQL query
2. Copy entire contents of `supabase/migrations/002_add_missing_rls_policies.sql`
3. Paste and click **Run**

### Alternative: Using Supabase CLI
```bash
cd C:\developer\riskAssessment
supabase link --project-ref jhnvwqmwpnlweqtadxyo
supabase db push
```

## What the Migration Does

The migration adds three missing RLS INSERT policies:

1. **"Users can insert their own profile"** - Allows newly authenticated users to create their profile during signup
2. **"Users can create teams"** - Allows users to create new teams (owner_id must be the current user)
3. **"Team owners can add members"** - Allows team owners to add members to their team during signup setup

## Testing the Fix

After applying the migration:

1. Navigate to https://www.risk-assessment.com.au/signup
2. Fill in the signup form:
   - Full Name: Test User
   - Email: test@example.com
   - Organization: Test Org
   - Password: (min 6 characters)
3. Click "Create Account"
4. You should be redirected to the dashboard

If you still see "An unexpected error occurred", check:
- The migration was applied successfully
- Browser console for any API errors
- Supabase database logs for permission denied errors

## Files Modified

- `app/(auth)/signup/page.tsx` - Updated signup form
- `app/api/auth/signup/route.ts` - New API route (created)
- `supabase/migrations/002_add_missing_rls_policies.sql` - New migration (created)
