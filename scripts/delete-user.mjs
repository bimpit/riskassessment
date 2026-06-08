import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://jhnvwqmwpnlweqtadxyo.supabase.co'
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
})

async function deleteAuthUserWithDeps(userId, email) {
  console.log(`\nDeleting auth user: ${email} (${userId})`)

  const { error: tmError } = await supabase.from('team_members').delete().eq('user_id', userId)
  if (tmError) console.warn('  team_members:', tmError.message)
  else console.log('  deleted team_members')

  const { error: teamsError } = await supabase.from('teams').delete().eq('owner_id', userId)
  if (teamsError) console.warn('  teams:', teamsError.message)
  else console.log('  deleted teams')

  const { error: profileError } = await supabase.from('profiles').delete().eq('id', userId)
  if (profileError) console.warn('  profiles:', profileError.message)
  else console.log('  deleted profile')

  const { error: deleteError } = await supabase.auth.admin.deleteUser(userId)
  if (deleteError) console.error('  auth delete FAILED:', deleteError.message)
  else console.log(`  auth user deleted OK`)
}

async function cleanOrphanedProfiles() {
  console.log('\n=== CLEANING ORPHANED PROFILES ===')
  const { data: { users } } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 })
  const authIds = new Set(users.map(u => u.id))

  const { data: profiles } = await supabase.from('profiles').select('id, email')
  const orphans = profiles.filter(p => !authIds.has(p.id))

  if (orphans.length === 0) { console.log('No orphaned profiles found.'); return }

  for (const p of orphans) {
    console.log(`Removing orphaned profile: ${p.email} (${p.id})`)

    const { error: tmError } = await supabase.from('team_members').delete().eq('user_id', p.id)
    if (tmError) console.warn('  team_members:', tmError.message)

    const { error: teamsError } = await supabase.from('teams').delete().eq('owner_id', p.id)
    if (teamsError) console.warn('  teams:', teamsError.message)

    const { error: profileError } = await supabase.from('profiles').delete().eq('id', p.id)
    if (profileError) console.error('  profile delete FAILED:', profileError.message)
    else console.log('  removed OK')
  }
}

// Step 1: Clean orphaned profiles (fixes dashboard delete error)
await cleanOrphanedProfiles()

// Step 2: Delete specific auth users by email
const { data: { users: allUsers } } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 })
const toDelete = allUsers.filter(u => [
  'risk-assessment@getcompliai.com.au',
].includes(u.email))

if (toDelete.length === 0) {
  console.log('\nNo matching auth users found to delete.')
} else {
  for (const u of toDelete) await deleteAuthUserWithDeps(u.id, u.email)
}

console.log('\nDone.')
