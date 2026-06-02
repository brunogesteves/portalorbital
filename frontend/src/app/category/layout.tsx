import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carros",
  description: "Confira todas as notícias, análises e reportagens sobre Carros no Portal Político.",
  alternates: {
    canonical: "/category",
  },
};

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
