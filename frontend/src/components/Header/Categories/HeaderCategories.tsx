"use client";
import { CategoryProps } from "@/utils/types";
import { HeaderCategoriesLogic } from "./Header.Categories.Logic";
import Link from "next/link";

export const HeaderCategoriesDesktop = () => {
  const { data } = HeaderCategoriesLogic();

  return (
    <nav className="bg-nav-red-strip w-full py-2 flex justify-center items-center" data-purpose="secondary-navigation">
      <ul className="bg-nav-blue-pill rounded-full flex items-center px-4 py-1.5 space-x-0">
        <li className="nav-link text-white px-4">
          <a href={`/`} className={`cursor-pointer hover:text-[#e8491a]`}>
            Home
          </a>
        </li>
        {data?.categories?.map((cat: CategoryProps) => (
          <li key={cat.id} className="nav-link text-white px-4">
            <a href={`/${cat.slug.toLowerCase()}`} className={`cursor-pointer hover:text-[#e8491a]`}>
              {cat.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export const HeaderCategoriesMobile = ({ slug }: { slug: string }) => {
  const { data } = HeaderCategoriesLogic();

  return (
    <nav className="relative z-10 w-full overflow-x-auto no-scrollbar">
      <ul className="flex space-x-2 px-4 items-center w-max pb-1">
        <li>
          <Link
            href="/"
            className={`${slug === "Home" ? "btn-silver-active" : "btn-blue-glossy"} tracking-tight font-sans`}
          >
            Home
          </Link>
        </li>

        {data.categories.sort().map((cat: CategoryProps) => (
          <li key={cat.id}>
            <a
              href={`/${cat.slug.toLowerCase()}`}
              className={`${slug.toLowerCase() === cat.slug.toLowerCase() ? "btn-silver-active" : "btn-blue-glossy"} tracking-tight font-sans `}
            >
              {cat.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
