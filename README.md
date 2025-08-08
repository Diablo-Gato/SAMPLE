# Mobile Chat App

A mobile-first chat application built with Next.js, TypeScript, Bootstrap, tRPC, Supabase, Auth0, and Google Gemini AI.

## Phase 1: Mobile Chat Skeleton ✅

### Features Implemented:
- **Mobile-first responsive design** using Bootstrap
- **Chat interface** with header, messages area, and input section
- **Interactive message input** with send button and Enter key support
- **Sample chat messages** to demonstrate the UI
- **Modern styling** with Bootstrap components

## Phase 2: tRPC + Supabase Integration ✅

### Features Implemented:
- **tRPC Setup** - Type-safe API layer with full TypeScript support
- **Supabase Integration** - Database for message persistence
- **Real-time Message Handling** - Send and fetch messages from database
- **Loading States** - Spinner animations during message sending
- **Error Handling** - Proper error handling for API calls

## Phase 3: Auth0 Authentication ✅

### Features Implemented:
- **Auth0 Integration** - Secure user authentication
- **User Profile Display** - Show user name and avatar in header
- **Protected Chat** - Only logged-in users can send messages
- **User-Specific Data** - Messages stored with Auth0 user.sub
- **Login/Logout Flow** - Seamless authentication experience

## Phase 4: Supabase Realtime ✅

### Features Implemented:
- **Real-time Subscriptions** - Instant message updates across browsers
- **Live Message Sync** - New messages appear without page refresh
- **Multi-window Support** - Test with multiple browser windows
- **User-Filtered Updates** - Only receive messages for current user
- **Automatic Cleanup** - Proper subscription cleanup on unmount

## Phase 5: Google Gemini AI Integration ✅

### Features Implemented:
- **Gemini Pro Integration** - Advanced text generation with Google's AI
- **Gemini Pro Vision** - Image-related requests and analysis
- **Smart Message Routing** - Automatically detects image vs text requests
- **Real AI Responses** - No more simulated responses
- **Error Handling** - Graceful handling of API failures

### AI Features:
- **Text Generation** - Ask questions, get creative responses
- **Image Analysis** - Use `/image` prefix for image-related requests
- **Context Awareness** - AI remembers conversation history
- **Multi-modal Support** - Handles both text and image inputs

### Backend Structure:
```
server/
├── db/
│   └── supabase.ts          # Supabase client configuration
├── gemini/
│   └── client.ts            # Google Gemini AI client
├── trpc/
│   ├── context.ts           # tRPC context with Supabase
│   └── router.ts            # tRPC procedures (includes chatWithGemini)
src/
├── app/
│   ├── api/
│   │   ├── auth/[...auth0]/
│   │   │   └── route.ts     # Auth0 authentication endpoints
│   │   └── trpc/[trpc]/
│   │       └── route.ts     # tRPC API endpoint
│   ├── layout.tsx           # Root layout with providers and header
│   ├── page.tsx             # Chat interface with Gemini AI
│   └── globals.css          # Mobile-first styles
├── components/
│   ├── AuthProvider.tsx     # Auth0 UserProvider wrapper
│   ├── AuthButtons.tsx      # Login/logout + user profile
│   └── TRPCProvider.tsx     # tRPC and React Query provider
└── lib/
    └── trpc.ts              # tRPC client configuration
```

### Database Schema:
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Technologies Used:
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Bootstrap 5** for responsive UI components
- **tRPC** for type-safe API layer
- **Supabase** for database and real-time features
- **Auth0** for authentication and user management
- **Google Gemini AI** for intelligent responses
- **React Query** for client-side state management
- **Zod** for input validation

## Setup Instructions:

### 1. Install Dependencies:
```bash
npm install
```

### 2. Configure Environment Variables:
Create `.env.local` file:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Auth0 Configuration
AUTH0_SECRET=your_generated_secret
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://your_auth0_domain
AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_CLIENT_SECRET=your_auth0_client_secret

# Google Gemini AI Configuration
GOOGLE_API_KEY=your_gemini_api_key
```

### 3. Configure Supabase:
1. Create a Supabase project at https://supabase.com
2. Create the `messages` table with the schema above
3. Enable Row Level Security (RLS) for the messages table
4. Copy your project URL and anon key to `.env.local`

### 4. Configure Auth0:
1. Create an Auth0 application
2. Set callback URLs to `http://localhost:3000/api/auth/callback`
3. Copy credentials to `.env.local`

### 5. Configure Google Gemini AI:
1. Get API key from Google AI Studio
2. Add to `.env.local` as `GOOGLE_API_KEY`

### 6. Run Development Server:
```bash
npm run dev
```

### 7. Open in Browser:
```
http://localhost:3000
```

## Features:

### Current Features:
- ✅ **Mobile-first responsive design**
- ✅ **Real-time message sending**
- ✅ **Message persistence in Supabase**
- ✅ **Loading states and animations**
- ✅ **Type-safe API with tRPC**
- ✅ **User authentication with Auth0**
- ✅ **Real-time message updates**
- ✅ **Multi-window synchronization**
- ✅ **Google Gemini AI integration**
- ✅ **Smart message routing**

### AI Usage Instructions:
1. **Text Questions**: Simply type your message and send
2. **Image Requests**: Start your message with `/image` followed by your request
3. **Examples**:
   - "What's the weather like today?"
   - "/image describe a beautiful sunset"
   - "Write a short story about space exploration"
   - "/image analyze this image of a cat"

### Testing Real-time Features:
1. **Open two browser windows** to `http://localhost:3000`
2. **Log in** with the same Auth0 account in both windows
3. **Send a message** in one window
4. **Watch it appear instantly** in the other window without refresh

### Next Steps (Future Enhancements):
1. **File Upload Support** - Upload images for analysis
2. **Message Search** - Search through chat history
3. **Message Reactions** - Like, heart, etc.
4. **Typing Indicators** - Show when AI is thinking
5. **Conversation Export** - Download chat history

## Development Notes:

- Messages are stored with `user.sub` from Auth0
- Real-time updates are filtered by current user
- Gemini AI provides intelligent, contextual responses
- Image requests use Gemini Pro Vision model
- All API calls are type-safe with tRPC
- Supabase Realtime handles live message synchronization

---

**Status:** Phase 5 Complete ✅  
**Next:** Future Enhancements & Advanced Features
