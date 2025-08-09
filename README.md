Arakoo Chat App
A real-time, authenticated chat application built with Next.js (App Router), Auth0, Supabase, and AI-powered enhancements using Cursor AI, Loom, and other listed AI tools.

This project was built as part of a demonstration to integrate cutting-edge authentication, database, and AI-assisted development workflows.

🚀 Features
User Authentication with Auth0

Real-time Chat using Supabase Realtime

Secure User Data — Messages are linked to user.sub from Auth0

Mobile-Responsive UI with Bootstrap

AI-Assisted Development using Cursor AI prompts for faster implementation

Step-by-step recorded phases with Loom videos

📹 Development Phases & Video Recordings
Phase	Description	Video Label
1	Project setup & Supabase configuration	1_Project_Setup
2	Auth0 integration & protected routes	2_Auth0_Integration
3	Supabase table creation & linking messages to Auth0 user	3_Supabase_Messages
4	UI updates & mobile responsiveness	4_UI_Responsive
5	Final testing, cleanup & deployment prep	5_Final_Testing

🛠 Tech Stack
Frontend: Next.js 15 (App Router)

Backend: Supabase (PostgreSQL + Realtime)

Auth: Auth0 (OAuth 2.0 + OpenID Connect)

Styling: Bootstrap 5

AI Tools Used:

Cursor AI — for AI-assisted code generation and integration

Loom — for phase recording and demonstration

Other listed AI tools for debugging, refactoring, and documentation

⚙️ Setup Instructions
1. Clone the repo
bash
Copy
Edit
git clone https://github.com/Diablo-Gato/SAMPLE.git
cd SAMPLE
2. Install dependencies
bash
Copy
Edit
npm install
3. Configure environment variables
Create a .env.local file in the root:

ini
Copy
Edit
AUTH0_SECRET=your_auth0_secret
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=your_auth0_issuer_url
AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_CLIENT_SECRET=your_auth0_client_secret
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
4. Run the development server
bash
Copy
Edit
npm run dev
5. Open in browser
Visit http://localhost:3000

🧪 Usage
Click Login to authenticate via Auth0

Send a message — it’s stored in Supabase linked to your Auth0 sub

Log out anytime via the header button

📄 License
This project is licensed under the MIT License — see the LICENSE file for details.

