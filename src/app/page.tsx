'use client';

import { useState, useEffect, useCallback } from 'react';
import { trpc } from '../lib/trpc';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { supabase } from '../../server/db/supabase';
import type { Message } from '../../server/db/supabase';

export default function Home() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  const { user, isLoading: authLoading } = useUser();

  const userId = user?.sub ?? '';

  const { data: messages = [], refetch } = trpc.getMessages.useQuery(
    { user_id: userId, limit: 50 },
    { 
      enabled: !!userId,
      staleTime: 30000, // Cache for 30 seconds
      refetchOnWindowFocus: false,
    }
  );

  const chatWithGeminiMutation = trpc.chatWithGemini.useMutation({
    onMutate: async (variables) => {
      // Optimistic update - add user message immediately
      const optimisticMessage: Message = {
        id: `temp-${Date.now()}`,
        user_id: userId,
        role: 'user',
        content: variables.message,
        created_at: new Date().toISOString(),
      };
      
      setLocalMessages(prev => [...prev, optimisticMessage]);
      setMessage('');
    },
    onError: (error, variables) => {
      // Remove optimistic message on error
      setLocalMessages(prev => prev.filter(msg => msg.id !== `temp-${Date.now()}`));
      console.error('Failed to send message:', error);
    },
  });

  // Initialize local messages when tRPC data loads
  useEffect(() => {
    if (messages.length > 0) {
      setLocalMessages(messages);
    }
  }, [messages]);

  // Set up Supabase Realtime subscription
  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          console.log('New message received:', payload.new);
          setLocalMessages(prev => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const handleSendMessage = useCallback(async () => {
    if (!userId) return; // guard
    if (message.trim() && !isLoading) {
      setIsLoading(true);
      const content = message.trim();
      
      // Check if this is an image request
      const isImageRequest = content.startsWith('/image');
      const sanitizedMessage = isImageRequest ? content.substring('/image'.length).trim() : content;

      try {
        await chatWithGeminiMutation.mutateAsync({
          message: sanitizedMessage,
          userId: userId,
          isImageRequest,
        });
      } catch (error) {
        console.error('Failed to send message:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [message, userId, isLoading, chatWithGeminiMutation]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const formatTime = useCallback((timestamp: string) =>
    new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), []);

  return (
    <div className="chat-container">
      {/* Chat Messages Area */}
      <div className="bg-light" style={{ height: 'calc(100vh - 200px)', overflowY: 'auto' }}>
        <div className="p-3">
          {!user && !authLoading && (
            <div className="alert alert-info">Please <Link href="/api/auth/login">log in</Link> to view and send messages.</div>
          )}

          {user && localMessages.length === 0 && (
            <div className="d-flex mb-3">
              <div className="bg-white rounded p-3 shadow-sm" style={{ maxWidth: '80%' }}>
                <p className="mb-0">Welcome {user.name ?? 'there'}! I'm powered by Google Gemini AI. Ask me anything or use /image for image-related requests.</p>
                <small className="text-muted">Just now</small>
              </div>
            </div>
          )}

          {user && localMessages.map((msg) => (
            <div key={msg.id} className={`d-flex mb-3 ${msg.role === 'user' ? 'justify-content-end' : ''}`}>
              <div className={`rounded p-3 shadow-sm ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-white'}`} style={{ maxWidth: '80%' }}>
                <p className="mb-0">{msg.content}</p>
                <small className={msg.role === 'user' ? 'text-white-50' : 'text-muted'}>
                  {formatTime(msg.created_at)}
                </small>
              </div>
            </div>
          ))}

          {isLoading && user && (
            <div className="d-flex mb-3">
              <div className="bg-white rounded p-3 shadow-sm" style={{ maxWidth: '80%' }}>
                <div className="d-flex align-items-center">
                  <div className="spinner-border spinner-border-sm me-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <span className="text-muted">Gemini AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-white border-top p-3">
        <div className="d-flex align-items-end">
          <div className="flex-grow-1 me-2">
            <textarea
              className="form-control"
              placeholder={user ? 'Type your message... (use /image for image requests)' : 'Login to chat'}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={1}
              style={{ resize: 'none' }}
              disabled={isLoading || !user}
            />
          </div>
          {user ? (
            <button className="btn btn-primary" onClick={handleSendMessage} disabled={!message.trim() || isLoading}>
              {isLoading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              )}
            </button>
          ) : (
            <Link href="/api/auth/login" className="btn btn-primary">Login</Link>
          )}
        </div>
      </div>
    </div>
  );
}
