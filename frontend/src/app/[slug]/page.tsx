"use client"
import { useParams } from "next/navigation";

import { useSlug } from "./useSlug";


export default  function SlugPage() { 
    const params = useParams();
    const slug = params.slug as string;
    

  return useSlug(slug)

}
