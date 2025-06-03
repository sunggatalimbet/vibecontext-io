import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core'
import { projects } from './projects'

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
})

export type Doc = typeof docs.$inferSelect
export type NewDoc = typeof docs.$inferInsert
