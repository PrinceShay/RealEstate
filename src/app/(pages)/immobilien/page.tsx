import RealEstateList from "@/app/components/immobilienList/RealEstateList";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Page({ searchParams }: PageProps) {
  return <RealEstateList searchParams={searchParams} />;
}
