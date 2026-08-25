import Loading from "@/components/Loading";
import SlugPage from "@/View/Slug/Slug.view";
import { getSlugMetadata } from "@/utils/metadatas";
import { SlugProps } from "@/utils/types";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params)?.slug;
  return getSlugMetadata(slug as string);
}

export default async function Slug({ params }: SlugProps) {
  const { slug } = await params;

  return (
    <Suspense fallback={<Loading />}>
      <SlugPage slug={slug} />
    </Suspense>
  );
}
