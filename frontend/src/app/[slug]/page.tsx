import Loading from "@/components/Loading";
import SlugPage from "@/components/Pages/Slug/slug";
import { getSlugMetadata } from "@/utils/metadatas";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params)?.slug;
  return getSlugMetadata(slug as string);
}

export default function Slug() {
  return (
    <Suspense fallback={<Loading />}>
      <SlugPage />
    </Suspense>
  );
}
