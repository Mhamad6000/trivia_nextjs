import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "@/components/ThemeProvider";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import NextTopLoader from "nextjs-toploader";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Trivia World",
  description: "A trivia game for everyone to enjoy and learn",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
        <NextTopLoader showSpinner={false} height={3} color="#22B357" />
        <NextIntlClientProvider messages={messages}>
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              <div className="container px-4 md:px-6 lg:px-8 py-8 lg:py-12 min-h-screen">
                {children}
              </div>
              <Footer />
            </ThemeProvider>
          </ReactQueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
