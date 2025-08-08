-- Database Indexes for Performance Optimization
-- Run these in your Supabase SQL editor

-- Index for user_id queries (most common)
CREATE INDEX IF NOT EXISTS idx_messages_user_id ON messages(user_id);

-- Index for created_at ordering
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);

-- Composite index for user_id + created_at (for pagination)
CREATE INDEX IF NOT EXISTS idx_messages_user_created ON messages(user_id, created_at);

-- Index for content search (for message search feature)
CREATE INDEX IF NOT EXISTS idx_messages_content ON messages USING gin(to_tsvector('english', content));

-- Index for role filtering
CREATE INDEX IF NOT EXISTS idx_messages_role ON messages(role);

-- Enable Row Level Security (RLS) for security
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to only see their own messages
CREATE POLICY "Users can view their own messages" ON messages
  FOR SELECT USING (auth.uid()::text = user_id);

-- Policy to allow users to insert their own messages
CREATE POLICY "Users can insert their own messages" ON messages
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- Policy to allow users to update their own messages
CREATE POLICY "Users can update their own messages" ON messages
  FOR UPDATE USING (auth.uid()::text = user_id);

-- Policy to allow users to delete their own messages
CREATE POLICY "Users can delete their own messages" ON messages
  FOR DELETE USING (auth.uid()::text = user_id);
