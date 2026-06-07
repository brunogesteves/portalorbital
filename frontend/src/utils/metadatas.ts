import { Metadata } from "next";
import { api } from "./api";

export const metadataHome: Metadata = {
  title: "Orbital Channel - O mundo em suas mãos",
  description:
    "Uma plataforma de conteúdo tecnológico inovadora trazendo o melhor em tecnologia mundial, sempre buscando as notícias mais atualizadas para você.",
  keywords: [
    "tecnologia",
    "notícias",
    "inovação",
    "inteligência artificial",
    "mundo geek",
    "orbital channel",
  ],
  authors: [{ name: "Orbital Channel" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Orbital Channel - O mundo em suas mãos",
    description:
      "Uma plataforma de conteúdo tecnológico inovadora trazendo o melhor em tecnologia mundial.",
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
    description:
      "Uma plataforma de conteúdo tecnológico inovadora trazendo o melhor em tecnologia mundial.",
  },
};

export const metadataSearch: Metadata = {
  title: "Busca - Orbital Channel",
  description:
    "Encontre as melhores notícias de tecnologia, inovação, entretenimento e muito mais no Orbital Channel.",
  keywords: ["busca", "pesquisa", "tecnologia", "notícias", "orbital channel"],
  alternates: {
    canonical: "/search",
  },
};

export async function getSlugMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug;

  try {
    // Faz a chamada na mesma API que o seu hook usa
    const res = await api.get(`/search/${slug}`);

    if (res.data.status && res.data.content) {
      const data = res.data.content;

      // Se for uma notícia, usa o título dela. Se for categoria, usa o nome.
      return {
        title: `${data.title || data.name} - Orbital Channel`,
        description: data.content
          ? data.content.substring(0, 160)
          : "Confira nosso conteúdo!",
      };
    }
  } catch (error) {
    console.error("Erro ao gerar metadados:", error);
  }

  // Fallback caso a API falhe ou não encontre o conteúdo
  return {
    title: "Conteúdo não encontrado - Orbital Channel",
  };
}
