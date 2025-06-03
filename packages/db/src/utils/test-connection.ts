import { db } from '../client'
import { projects, prompts, promptNodes, docs } from '../schema'

async function testConnection() {
  try {
    console.log('Testing database connection...')

    // Test projects table
    await db.select().from(projects).limit(1)
    console.log('✅ Successfully connected to database')
    console.log('Projects table exists and is accessible')

    // Test prompts table
    await db.select().from(prompts).limit(1)
    console.log('✅ Prompts table exists and is accessible')

    // Test prompt nodes table
    await db.select().from(promptNodes).limit(1)
    console.log('✅ Prompt nodes table exists and is accessible')

    // Test docs table
    await db.select().from(docs).limit(1)
    console.log('✅ Docs table exists and is accessible')

    console.log('🎉 All tables are ready!')
  } catch (error) {
    console.error('❌ Database connection test failed:', error)
    console.error('This could indicate:')
    console.error('- DATABASE_URL is not set or incorrect')
    console.error('- Database is not accessible')
    console.error('- Required tables do not exist')
    console.error('- Migration scripts need to be run')
    process.exit(1)
  }
}

// Export the function for reuse
export { testConnection }

// Only run if this file is executed directly
if (require.main === module) {
  testConnection()
}
