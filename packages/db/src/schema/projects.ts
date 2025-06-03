import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core'
import { docs } from './docs'

export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull(),
  name: text('name').notNull(),
  appIdeaSummary_text: text('app_idea_summary_text'),
  chatTranscriptFilename: text('chat_transcript_filename'),
  prdFilename: text('prd_filename'),
  docsId: uuid('docs_id'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
})

export type Project = typeof projects.$inferSelect
export type NewProject = typeof projects.$inferInsert
