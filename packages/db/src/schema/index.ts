import { relations } from 'drizzle-orm'
import { pgTable, uuid, text, timestamp, integer } from 'drizzle-orm/pg-core'

// Projects table
export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull(),
  name: text('name').notNull(),
  appIdeaSummaryText: text('app_idea_summary_text'),
  chatTranscriptFilename: text('chat_transcript_filename'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
}).enableRLS()

// Docs table
export const docs = pgTable('docs', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id')
    .notNull()
    .references(() => projects.id, { onDelete: 'cascade' }),
  techRequirementsFilename: text('tech_requirements_filename'),
  prodRequirementsFilename: text('prod_requirements_filename'),
  techStackFilename: text('tech_stack_filename'),
  prdFilename: text('prd_filename'),
  qaFilename: text('qa_filename'),
  cursorRulesFilename: text('cursor_rules_filename'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
}).enableRLS()

// Prompts table
export const prompts = pgTable('prompts', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title'),
  prompt_markdown_filename: text('prompt_markdown_filename').notNull(),
  tags: text('tags').array().default([]).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
})

// Prompt nodes table
export const promptNodes = pgTable('prompt_nodes', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id')
    .notNull()
    .references(() => projects.id, { onDelete: 'cascade' }),
  parentNodeId: uuid('parent_node_id'),
  promptId: uuid('prompt_id')
    .notNull()
    .references(() => prompts.id),
  displayOrder: integer('display_order').default(0).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
}).enableRLS()

// Relations
export const projectsRelations = relations(projects, ({ many }) => ({
  docs: many(docs),
  promptNodes: many(promptNodes),
}))

export const docsRelations = relations(docs, ({ one }) => ({
  project: one(projects, {
    fields: [docs.projectId],
    references: [projects.id],
  }),
}))

export const promptNodesRelations = relations(promptNodes, ({ one }) => ({
  project: one(projects, {
    fields: [promptNodes.projectId],
    references: [projects.id],
  }),
  prompt: one(prompts, {
    fields: [promptNodes.promptId],
    references: [prompts.id],
  }),
}))

export const promptsRelations = relations(prompts, ({ many }) => ({
  promptNodes: many(promptNodes),
}))

// Type definitions
export type Project = typeof projects.$inferSelect
export type NewProject = typeof projects.$inferInsert

export type Doc = typeof docs.$inferSelect
export type NewDoc = typeof docs.$inferInsert

export type Prompt = typeof prompts.$inferSelect
export type NewPrompt = typeof prompts.$inferInsert

export type PromptNode = typeof promptNodes.$inferSelect
export type NewPromptNode = typeof promptNodes.$inferInsert

// Schema export for Drizzle
export const schema = {
  projects,
  docs,
  prompts,
  promptNodes,
  projectsRelations,
  docsRelations,
  promptNodesRelations,
  promptsRelations,
}
