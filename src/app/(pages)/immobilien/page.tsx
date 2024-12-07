// This page is a server component by default in the app directory.
// It can directly call the async RealEstateList component.

import RealEstateList from "@/app/components/immobilienList/RealEstateList";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Page({ searchParams }: PageProps) {
  return <RealEstateList searchParams={searchParams} />;
}
