import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { MainNav } from "@/components/MainNav";
import styles from "./layout.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BadgeHub",
  description: "Browse and manage apps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <section className="brand">
          <Link href={"/"}>
            <h1 className={styles.title}>BadgeHub</h1>
          </Link>
        </section>
        <MainNav />
        <main>{children}</main>
      </body>
    </html>
  );
}
