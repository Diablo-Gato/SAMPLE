import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { TRPCProvider } from "../components/TRPCProvider";
import { AuthProvider } from "../components/AuthProvider";
import { AuthButtons } from "../components/AuthButtons";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mobile Chat App",
  description: "A mobile-first chat application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <TRPCProvider>
            <header className="bg-primary text-white p-3 shadow-sm">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <div className="bg-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "36px", height: "36px" }}>
                    <span className="text-primary fw-bold">C</span>
                  </div>
                  <h6 className="mb-0 fw-bold">Chat Assistant</h6>
                </div>
                <AuthButtons />
              </div>
            </header>
            {children}
          </TRPCProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
