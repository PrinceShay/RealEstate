import { fetchEstateBySlug } from "@/app/services/estateService";
import { FullEstate } from "@/app/lib/interface";
import { notFound } from "next/navigation";
import EstateContact from "@/app/components/estatePage/EstateContact";
import EstateContent from "@/app/components/estatePage/EstateContent";
import { Suspense } from "react";
import EstateHeroLoader from "@/app/components/estatePage/EstateHeroLoader";
import EstateHero from "@/app/components/estatePage/EstateHero";

interface EstatePageProps {
  params: {
    slug: string;
  };
}

const EstatePage: React.FC<EstatePageProps> = async ({ params }) => {
  const estate: FullEstate | null = await fetchEstateBySlug(params.slug);

  if (!estate) {
    notFound();
  }

  return (
    <main className="px-16 max-w-[1600px] mx-auto py-48 w-full">
      <Suspense fallback={<EstateHeroLoader />}>
        <EstateHero estate={estate} />
      </Suspense>
      <div className="mt-24 grid grid-cols-3 gap-24">
        <EstateContent estate={estate} />
        <EstateContact estate={estate} />
      </div>
    </main>
  );
};

export default EstatePage;
