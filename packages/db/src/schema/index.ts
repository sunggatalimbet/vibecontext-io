import { relations } from 'drizzle-orm'
import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  json,
} from 'drizzle-orm/pg-core'

export {
  conversations,
  messages,
  type Conversation,
  type NewConversation,
  type Message,
  type NewMessage,
} from './chat'

// Following Supabase best practice: https://supabase.com/docs/guides/auth/managing-user-data
export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey(), // This references auth.users.id via foreign key constraint
  firstName: text('first_name'),
  lastName: text('last_name'),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
}).enableRLS()

// Projects table
export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => profiles.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  appIdeaSummaryJson: json('app_idea_summary_json'),
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
  promptMarkdownFilename: text('prompt_markdown_filename').notNull(),
  tags: text('tags').array().default([]).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
}).enableRLS()

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
export const profilesRelations = relations(profiles, ({ many }) => ({
  projects: many(projects),
}))

export const projectsRelations = relations(projects, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [projects.userId],
    references: [profiles.id],
  }),
  docs: many(docs),
  promptNodes: many(promptNodes),
}))

export const docsRelations = relations(docs, ({ one }) => ({
  project: one(projects, {
    fields: [docs.projectId],
    references: [projects.id],
  }),
}))

export const promptNodesRelations = relations(promptNodes, ({ one, many }) => ({
  project: one(projects, {
    fields: [promptNodes.projectId],
    references: [projects.id],
  }),
  prompt: one(prompts, {
    fields: [promptNodes.promptId],
    references: [prompts.id],
  }),
  parent: one(promptNodes, {
    fields: [promptNodes.parentNodeId],
    references: [promptNodes.id],
    relationName: 'promptNodeHierarchy',
  }),
  children: many(promptNodes, {
    relationName: 'promptNodeHierarchy',
  }),
}))

export const promptsRelations = relations(prompts, ({ many }) => ({
  promptNodes: many(promptNodes),
}))

// Type definitions
export type Profile = typeof profiles.$inferSelect
export type NewProfile = typeof profiles.$inferInsert

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
  profiles,
  projects,
  docs,
  prompts,
  promptNodes,
  profilesRelations,
  projectsRelations,
  docsRelations,
  promptNodesRelations,
  promptsRelations,
}
