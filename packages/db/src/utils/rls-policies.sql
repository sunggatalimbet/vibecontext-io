-- Enable Row Level Security on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompt_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE docs ENABLE ROW LEVEL SECURITY;

-- Projects table policies
-- Users can only see their own projects
CREATE POLICY "Users can view own projects" ON projects
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own projects
CREATE POLICY "Users can insert own projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own projects
CREATE POLICY "Users can update own projects" ON projects
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own projects
CREATE POLICY "Users can delete own projects" ON projects
  FOR DELETE USING (auth.uid() = user_id);

-- Prompts table policies
-- For MVP, we'll allow all authenticated users to read prompts (they can be shared)
-- But only allow creating/updating prompts through the application logic
-- NOTE: Users cannot delete prompts to preserve reusability
CREATE POLICY "Authenticated users can view prompts" ON prompts
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert prompts" ON prompts
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update prompts" ON prompts
  FOR UPDATE TO authenticated USING (true);

-- Docs table policies
-- Users can only access docs for projects they own
CREATE POLICY "Users can view docs for own projects" ON docs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.docs_id = docs.id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert docs for own projects" ON docs
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.docs_id = docs.id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update docs for own projects" ON docs
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.docs_id = docs.id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete docs for own projects" ON docs
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.docs_id = docs.id 
      AND projects.user_id = auth.uid()
    )
  );

-- Prompt nodes table policies
-- Users can only access prompt nodes for projects they own
CREATE POLICY "Users can view prompt nodes for own projects" ON prompt_nodes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = prompt_nodes.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert prompt nodes for own projects" ON prompt_nodes
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = prompt_nodes.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update prompt nodes for own projects" ON prompt_nodes
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = prompt_nodes.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete prompt nodes for own projects" ON prompt_nodes
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = prompt_nodes.project_id 
      AND projects.user_id = auth.uid()
    )
  ); 