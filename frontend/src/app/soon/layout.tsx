"use client";

import "../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="min-h-screen bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
