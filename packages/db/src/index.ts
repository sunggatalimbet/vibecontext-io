// Export database client
export { db, client, type Database } from './client'

// Export all schema definitions and types
export { schema, projects, prompts, promptNodes, docs } from './schema'

// Export utilities for common operations
export { eq, and, or, like, desc, asc } from 'drizzle-orm'
