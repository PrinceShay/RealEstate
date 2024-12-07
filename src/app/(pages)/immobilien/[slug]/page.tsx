import { fetchEstateBySlug } from "@/app/services/estateService";
import { FullEstate } from "@/app/lib/interface";
import { notFound } from "next/navigation";
import EstateContact from "@/app/components/estate-page/EstateContact";
import EstateContent from "@/app/components/estate-page/EstateContent";
import EstateHero from "@/app/components/estate-page/estateHero";
import EstateHeroLoader from "@/app/components/estate-page/EstateHeroLoader";
import { Suspense } from "react";

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { slug } = params;
  const estate: FullEstate | null = await fetchEstateBySlug(slug);

  if (!estate) {
    notFound();
  }

  return (
    <main className="px-4 sm:px-16 max-w-[1600px] mx-auto py-4 sm:py-48 w-full">
      <Suspense fallback={<EstateHeroLoader />}>
        <EstateHero estate={estate} />
      </Suspense>
      <div className="mt-24 pb-24 sm:pb-0 flex flex-col sm:grid grid-cols-3 gap-12 sm:gap-24">
        <EstateContent estate={estate} />
        <EstateContact estate={estate} />
      </div>
    </main>
  );
}
