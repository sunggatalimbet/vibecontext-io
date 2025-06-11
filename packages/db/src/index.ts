// Export database client
export * from './client'

// Export all schema definitions and types
export * from './schema'

// Export utilities
export * from './utils'

// Export data access layer functions
export { getUserProjects, getUserProjectsWithDocs } from './dal/projects'
export { getUserConversations } from './dal/conversations'
export { getProjectDocuments } from './dal/docs'
