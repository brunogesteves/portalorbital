import Loading from "@/components/Loading";
import SearchResults from "@/View/Search/Search.view";
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
