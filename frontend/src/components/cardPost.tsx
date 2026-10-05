import { AllContentProps } from "@/utils/types";
import Link from "next/link";
import Image from "next/image";
import { imageUrl } from "@/utils/api";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";

interface CardPostsProps {
  title: string;
  thumbnail: string;
  slug: string;
  aspect: "square" | "4/3" | "16/9";
}

export const CardPostsDesktop = ({ title, thumbnail, slug, aspect }: CardPostsProps) => {
  return (
    <article>
      <Link href={slug} aria-label={`Ler: ${title}`}>
        <div
          className={`relative group rounded-xl overflow-hidden ${aspect === "square" ? "aspect-square" : "aspect-4/3"} bg-gray-100 cursor-pointer`}
        >
          <Image
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            src={`${imageUrl}/${thumbnail}`}
            fill
            loading="eager"
            unoptimized
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
            <h3 className="text-white font-bold text-xl first-letter:capitalize">{title}</h3>
          </div>
        </div>
      </Link>
    </article>
  );
};

export const CardPostsMobile = ({ title, thumbnail, slug, aspect }: CardPostsProps) => {
  return (
    <Link
      href={slug}
      className={`relative ${aspect === "square" ? "aspect-4/3" : "aspect-[16/9]"} rounded-2xl overflow-hidden shadow-sm cursor-pointer`}
    >
      <Image
        alt={title}
        className="w-full h-full object-cover"
        src={`${imageUrl}/${thumbnail}`}
        fill
        loading="eager"
        unoptimized
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
        <p className="text-white font-bold text-xl leading-tight">{title}</p>
      </div>
    </Link>
  );
};
