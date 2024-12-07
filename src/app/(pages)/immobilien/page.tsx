// This page is a server component by default in the app directory.
// It can directly call the async RealEstateList component.

import RealEstateList from "@/app/components/immobilienList/RealEstateList";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  return <RealEstateList searchParams={searchParams} />;
}
