import { Skeleton } from "~/components/shared/ui/skeleton";
import { Spinner } from "~/components/shared/ui/spinner";
import { PageContainer } from "~/components/shared/ui";

export default function TeamPageSkeleton() {
  return (
    <PageContainer justify="normal">
      <div className="flex w-full flex-col justify-center gap-2 md:gap-6">
        <TeamViewSkeleton />
        <PlayersViewSkeleton />
      </div>
    </PageContainer>
  );
}

function TeamViewSkeleton() {
  return (
    <div className="flex flex-col items-center md:max-w-5xl md:flex-row">
      <Skeleton className="h-[90px] w-[90px] rounded-xl md:h-[200px] md:w-[200px] flex items-center justify-center">
        <Spinner size="sm" color="primary" className="text-gray-400/20" />
      </Skeleton>
      <div className="flex flex-1 flex-col w-full md:ml-4">
        <Skeleton className="h-4 w-full mt-4 md:mt-0 bg-gray-400/5" />
        <Skeleton className="h-3 w-3/4 mt-2 bg-gray-400/5" />
        <div className="flex flex-row items-center justify-between gap-2 mt-4">
          <Skeleton className="h-6 w-6 rounded-full bg-gray-400/5" />
          <Skeleton className="h-6 w-6 rounded-full bg-gray-400/5" />
        </div>
      </div>
    </div>
  );
}

function PlayersViewSkeleton() {
  return (
    <div className="flex flex-col md:max-w-5xl">
      <div className="relative flex flex-col gap-4 p-4">
        <div className="flex flex-row items-center justify-between">
          <Skeleton className="h-4 w-64 bg-gray-400/5" />
          <Skeleton className="h-8 w-8 rounded-full bg-gray-400/5" />
        </div>
        <div className="grid grid-cols-1 items-center justify-center gap-4 md:grid-cols-2">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((_, index) => (
            <Skeleton
              key={index}
              className="h-24 w-full border-[1px] border-gray-400/20 bg-gray-400/3 rounded-xl p-4 flex items-center"
            >
              <Skeleton className="h-16 w-16 rounded-full mr-4 flex items-center justify-center">
                <Spinner
                  size="sm"
                  color="primary"
                  className="text-gray-400/20"
                />
              </Skeleton>
              <div className="flex flex-col justify-center gap-2 flex-1">
                <Skeleton className="h-4 w-3/4 bg-gray-400/5" />
                <Skeleton className="h-4 w-1/2 bg-gray-400/5" />
              </div>
            </Skeleton>
          ))}
        </div>
      </div>
    </div>
  );
}
