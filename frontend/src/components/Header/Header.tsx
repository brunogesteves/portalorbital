import { HeaderTopDesktop, HeaderTopMobile } from "./Top/HeaderTop";
import { HeaderCategoriesDesktop, HeaderCategoriesMobile } from "./Categories/HeaderCategories";

export default function Header({ slug }: { slug: string }) {
  return (
    <>
      <div className="hidden md:block w-full">
        <header
          className="bg-metallic-header w-full h-auto flex flex-col items-center relative"
          data-purpose="site-header"
        >
          <HeaderTopDesktop />
          <HeaderCategoriesDesktop />
        </header>
      </div>
      <div className="block md:hidden">
        <header
          className="bg-header-gradient relative overflow-hidden pb-1 pt-4"
          style={{
            background: "linear-gradient(rgb(254, 254, 254) 70%, rgb(181, 190, 197) 100%)",
          }}
        >
          <HeaderTopMobile />
          <HeaderCategoriesMobile slug={slug} />
        </header>
      </div>
    </>
  );
}
