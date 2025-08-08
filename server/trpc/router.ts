import { z } from 'zod';
import { router, publicProcedure } from './context';
import { Message, NewMessage } from '../db/supabase';
import { geminiTextModel, geminiVisionModel } from '../gemini/client';

export const appRouter = router({
  getMessages: publicProcedure
    .input(z.object({
      user_id: z.string(),
      limit: z.number().optional().default(50),
      offset: z.number().optional().default(0),
    }))
    .query(async ({ input, ctx }) => {
      const { data, error } = await ctx.supabase
        .from('messages')
        .select('*')
        .eq('user_id', input.user_id)
        .order('created_at', { ascending: true })
        .range(input.offset, input.offset + input.limit - 1);

      if (error) {
        throw new Error(`Failed to fetch messages: ${error.message}`);
      }

      return data as Message[];
    }),

  searchMessages: publicProcedure
    .input(z.object({
      user_id: z.string(),
      query: z.string(),
      limit: z.number().optional().default(20),
    }))
    .query(async ({ input, ctx }) => {
      const { data, error } = await ctx.supabase
        .from('messages')
        .select('*')
        .eq('user_id', input.user_id)
        .ilike('content', `%${input.query}%`)
        .order('created_at', { ascending: false })
        .limit(input.limit);

      if (error) {
        throw new Error(`Failed to search messages: ${error.message}`);
      }

      return data as Message[];
    }),

  addMessage: publicProcedure
    .input(z.object({
      user_id: z.string(),
      role: z.enum(['user', 'assistant']),
      content: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const newMessage: NewMessage = {
        user_id: input.user_id,
        role: input.role,
        content: input.content,
      };

      const { data, error } = await ctx.supabase
        .from('messages')
        .insert(newMessage)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to add message: ${error.message}`);
      }

      return data as Message;
    }),

  chatWithGemini: publicProcedure
    .input(
      z.object({
        message: z.string(),
        userId: z.string(),
        isImageRequest: z.boolean().optional().default(false),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { message, userId, isImageRequest } = input;

      // Log the user's message to Supabase
      await ctx.supabase.from("messages").insert({
        user_id: userId,
        role: "user",
        content: message,
      });

      let responseContent: string;
      try {
        if (isImageRequest) {
          // Using gemini-pro-vision for image-related requests
          // Note: This generates text describing images, not actual images
          const result = await geminiVisionModel.generateContent(message);
          responseContent = result.response.text();
        } else {
          // Standard text generation with gemini-pro
          const result = await geminiTextModel.generateContent(message);
          responseContent = result.response.text();
        }
      } catch (error) {
        console.error('Gemini API error:', error);
        responseContent = "I'm sorry, I encountered an error while processing your request. Please try again.";
      }

      // Log the assistant's response to Supabase
      await ctx.supabase.from("messages").insert({
        user_id: userId,
        role: "assistant",
        content: responseContent,
      });

      return { success: true, response: responseContent };
    }),
});

export type AppRouter = typeof appRouter;
