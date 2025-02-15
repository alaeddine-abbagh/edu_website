import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <header>
          <nav>
            <ul className="flex justify-end space-x-4">
              <li><a href="/">Home</a></li>
              <li><a href="/explore">Explore</a></li>
              <li><a href="/problems">Problems</a></li>
              <li><a href="/path">Path</a></li>
              <li><a href="/forum">Forum</a></li>
              <li><a href="/blog">Blog</a></li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <p>&copy; 2023 Math Olympiads. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
