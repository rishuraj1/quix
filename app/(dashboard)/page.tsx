"use client";

import { useOrganization } from "@clerk/nextjs";

import { EmptyOrg } from "./_components/empty-org";
import { CanvasList } from "./_components/canvas-list";

interface DashboardPageProps {
  searchParams: {
    search?: string;
    favourites?: string;
  };
}

const DashboardPage = ({ searchParams }: DashboardPageProps) => {
  {
    JSON.stringify(searchParams);
  }

  const { organization } = useOrganization();

  return (
    <div className="ml-2 lg:ml-0 mr-2 flex-1 h-[calc(100%-80px)] rounded-sm p-6">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <CanvasList orgId={organization?.id} query={searchParams} />
      )}
    </div>
  );
};

export default DashboardPage;
