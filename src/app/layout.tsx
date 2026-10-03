import type { Metadata } from "next";
import Link from "next/link";
import { Instagram, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Providers } from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marketlane | Everyday finds, considered",
  description:
    "Thoughtful everyday finds from brands worth knowing, delivered with care.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <footer className="site-footer">
            <div className="footer-main">
              <Link href="/" className="wordmark footer-mark">
                <span className="wordmark-mark">m.</span>
                <span>marketlane</span>
              </Link>
              <p>Good finds, thoughtfully brought together.</p>
              <span className="footer-social">
                <Instagram size={16} /> Made for everyday{" "}
                <ArrowUpRight size={14} />
              </span>
            </div>
            <div className="footer-bottom">
              <span>© 2026 Marketlane Retail Pvt. Ltd.</span>
              <span>Help centre · Privacy · Terms</span>
              <span>Made for good days in India</span>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
