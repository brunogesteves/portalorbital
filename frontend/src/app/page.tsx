import { metadataHome } from "@/utils/metadatas";
import { Suspense } from "react";
import Home from "../components/Pages/Home/home";
import Loading from "@/components/Loading";

export const metadata = metadataHome;

export default function HomePage() {
  return (
    <Suspense fallback={<Loading />}>
      <Home />
    </Suspense>
  );
}
