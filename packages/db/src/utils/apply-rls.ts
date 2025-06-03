import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'

async function applyRLSPolicies() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Missing Supabase environment variables')
  }

  // Create Supabase client with service role key for admin operations
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  try {
    console.log('Applying Row Level Security policies...')

    // Read the RLS policies SQL file
    const rlsSQL = readFileSync(join(__dirname, 'rls-policies.sql'), 'utf8')

    // Split by statements and execute one by one
    const statements = rlsSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0)

    for (const statement of statements) {
      if (statement.trim()) {
        console.log(`Executing: ${statement.substring(0, 50)}...`)
        const { error } = await supabase.rpc('exec_sql', { sql: statement })

        if (error && !error.message.includes('already exists')) {
          console.error('Error executing statement:', statement)
          console.error('Error:', error)
          throw error
        }
      }
    }

    console.log('✅ Successfully applied all RLS policies!')
  } catch (error) {
    console.error('❌ Failed to apply RLS policies:', error)
    throw error
  }
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  applyRLSPolicies()
}
