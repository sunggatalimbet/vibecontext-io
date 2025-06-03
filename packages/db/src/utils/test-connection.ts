import { db } from '../client'
import { projects, prompts, promptNodes, docs } from '../schema'

async function testConnection() {
  try {
    console.log('Testing database connection...')

    // Test basic query
    const result = await db.select().from(projects).limit(1)
    console.log('✅ Successfully connected to database')
    console.log('Projects table exists and is accessible')

    // Test all tables
    const promptsTest = await db.select().from(prompts).limit(1)
    console.log('✅ Prompts table exists and is accessible')

    const promptNodesTest = await db.select().from(promptNodes).limit(1)
    console.log('✅ Prompt nodes table exists and is accessible')

    const docsTest = await db.select().from(docs).limit(1)
    console.log('✅ Docs table exists and is accessible')

    console.log('🎉 All tables are ready!')
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    process.exit(1)
  }
}

testConnection()
