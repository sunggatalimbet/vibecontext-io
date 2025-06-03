import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// Get Supabase connection details from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error(
    'NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables are required'
  )
}

// For now, let's use a simpler approach with the pooler connection
// You'll need to get the actual password from Supabase dashboard
const poolerConnectionString = process.env.DATABASE_URL

if (
  !poolerConnectionString ||
  poolerConnectionString.includes('[YOUR-PASSWORD]')
) {
  throw new Error(
    'DATABASE_URL must be set with the actual database password. Please get the connection string from your Supabase dashboard.'
  )
}

// Create postgres client with connection pooling
const client = postgres(poolerConnectionString, {
  max: 1, // Maximum number of connections
  idle_timeout: 20,
  connect_timeout: 10,
})

// Create drizzle instance
export const db = drizzle(client, { schema })

// Export the client for direct access if needed
export { client }

// Export types
export type Database = typeof db
