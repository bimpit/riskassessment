"use client"

import { useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function SendMagicLinkPage() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  async function handleSend() {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "https://www.risk-assessment.com.au/auth/callback"
      }
    })

    if (error) {
      setMessage("Error: " + error.message)
    } else {
      setMessage("Magic link sent to " + email)
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Send Magic Link</h1>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: 10, width: 300 }}
      />

      <br /><br />

      <button
        onClick={handleSend}
        style={{ padding: "10px 20px", background: "blue", color: "white" }}
      >
        Send Magic Link
      </button>

      <p>{message}</p>
    </div>
  )
}
