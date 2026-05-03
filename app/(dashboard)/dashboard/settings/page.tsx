'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Spinner } from '@/components/ui/Spinner'

interface Profile {
  full_name: string | null
  email: string
  organization: string | null
}

export default function SettingsPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetch('/api/profiles/me')
      .then((r) => r.json())
      .then((data) => { if (!data.error) setProfile(data) })
      .finally(() => setIsLoading(false))
  }, [])

  const handleSave = async () => {
    if (!profile) return
    setIsSaving(true)
    try {
      const res = await fetch('/api/profiles/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: profile.full_name, organization: profile.organization }),
      })
      if (res.ok) alert('Profile updated successfully!')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) return <div className="flex items-center justify-center h-full"><Spinner /></div>

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile</h2>
          <div className="space-y-4">
            <Input label="Email" type="email" value={profile?.email || ''} disabled />
            <Input label="Full Name" value={profile?.full_name || ''} onChange={(e) => setProfile(profile ? { ...profile, full_name: e.target.value } : null)} />
            <Input label="Organization" value={profile?.organization || ''} onChange={(e) => setProfile(profile ? { ...profile, organization: e.target.value } : null)} />
            <Button onClick={handleSave} isLoading={isSaving} variant="primary">Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
