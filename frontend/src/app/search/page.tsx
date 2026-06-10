import Loading from "@/components/Loading";
import SearchResults from "@/components/Pages/Search/search";
import { metadataSearch } from "@/utils/metadatas";
import { Suspense } from "react";

export const metadata = metadataSearch;

export default function SearchPage() {
  return (
    <Suspense fallback={<Loading />}>
      <SearchResults />
    </Suspense>
  );
}
