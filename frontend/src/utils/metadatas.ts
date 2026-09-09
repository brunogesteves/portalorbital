import { Metadata } from "next";
import { api } from "./api";
export const metadataLayout: Metadata = {
  metadataBase: new URL("https://www.orbitaltv.net"),
  title: {
    default: "Orbital Channel",
    template: "%s | Orbital Channel",
  },
  description:
    "Notícias, informações e análises sobre os principais acontecimentos do Brasil e do mundo, com conteúdo atualizado, relevante e fácil de entender.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Orbital Channel",
    description:
      "Notícias, informações e análises sobre os principais acontecimentos do Brasil e do mundo, com conteúdo atualizado, relevante e fácil de entender.",
    type: "website",
    locale: "pt_BR",
    siteName: "Orbital Channel",
  },
};

export const metadataHome: Metadata = {
  metadataBase: new URL("https://www.orbitaltv.net"),

  title: "Orbital Channel - O mundo em suas mãos",
  description:
    "Uma plataforma de conteúdo tecnológico inovadora trazendo o melhor em tecnologia mundial, sempre buscando as notícias mais atualizadas para você.",
  keywords: ["tecnologia", "notícias", "inovação", "inteligência artificial", "mundo geek", "orbital channel"],
  authors: [{ name: "Orbital Channel" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Orbital Channel - O mundo em suas mãos",
    description: "Uma plataforma de conteúdo tecnológico inovadora trazendo o melhor em tecnologia mundial.",
    url: "https://orbitaltv.net",
    siteName: "Orbital Channel",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Orbital Channel Logo",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orbital Channel - O mundo em suas mãos",
    description: "Uma plataforma de conteúdo tecnológico inovadora trazendo o melhor em tecnologia mundial.",
  },
};

export const metadataSearch: Metadata = {
  metadataBase: new URL("https://www.orbitaltv.net"),
  title: "Busca - Orbital Channel",
  description: "Encontre as melhores notícias de tecnologia, inovação, entretenimento e muito mais no Orbital Channel.",
  keywords: ["busca", "pesquisa", "tecnologia", "notícias", "orbital channel"],
  alternates: {
    canonical: "/search",
  },
};

export async function getSlugMetadata(slug: string): Promise<Metadata> {
  try {
    const res = await api.get(`/search/slug/${slug}`);
    if (res.data.status && res.data.content) {
      const data = res.data.content;
      if (res.data.status) {
        if (res.data.type == "category") {
          return {
            title: `${data.name} - Orbital Channel`,
            description: data.content ? data.content.substring(0, 160) : "Confira nosso conteúdo!",
          };
        } else {
          return {
            title: `${data.title} - Orbital Channel`,
            description: data.content ? data.content.substring(0, 160) : "Confira nosso conteúdo!",
          };
        }
      }
    }
  } catch (error) {
    console.error("Erro ao gerar metadados:", error);
  }

  // Fallback caso a API falhe ou não encontre o conteúdo
  return {
    metadataBase: new URL("https://www.orbitaltv.net"),
    title: "Conteúdo não encontrado - Orbital Channel",
  };
}
