// Export database client
export { db, client, type Database } from './client'

// Export all schema definitions and types
export * from './schema'

// Export utilities
export { initDatabaseConnection } from './utils'

// Export data access layer functions
export { getUserProjects } from './dal/project'
export { getProjectDocuments } from './dal/docs'
