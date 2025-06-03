import { pgTable, uuid, integer, timestamp } from 'drizzle-orm/pg-core'
import { projects } from './projects'
import { prompts } from './prompts'

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
})

export type PromptNode = typeof promptNodes.$inferSelect
export type NewPromptNode = typeof promptNodes.$inferInsert
