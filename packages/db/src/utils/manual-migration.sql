-- Add tags column to prompts table
ALTER TABLE "prompts" ADD COLUMN "tags" text[] DEFAULT '{}' NOT NULL;

-- Add docs_id column to projects table  
ALTER TABLE "projects" ADD COLUMN "docs_id" uuid;

-- Create docs table
CREATE TABLE "docs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"tech_requirements_filename" text,
	"prod_requirements_filename" text,
	"tech_stack_filename" text,
	"prd_filename" text,
	"qa_filename" text,
	"cursor_rules_filename" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- Add foreign key constraint
ALTER TABLE "docs" ADD CONSTRAINT "docs_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action; 