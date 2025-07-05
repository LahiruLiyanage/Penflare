import type { Metadata } from "next";
import "./ui/styles/globals.css";

export const metadata: Metadata = {
  title: "Penflare",
  description: "Penflare - the blog App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
