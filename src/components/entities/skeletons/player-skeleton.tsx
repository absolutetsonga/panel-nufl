import { PageContainer, Skeleton, Spinner } from "~/components/shared/ui";

export function PlayerPageSkeleton() {
  return (
    <PageContainer>
      <div className="flex flex-col items-center gap-6 md:flex-row">
        <div className="relative flex flex-row items-center justify-center">
          <PlayerViewSkeleton />
          <div className="absolute right-0 top-0 gap-6 p-2">
            <div className="flex flex-row gap-4">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

function PlayerViewSkeleton() {
  return (
    <div className="mx-auto max-w-md rounded-xl p-6 pt-10 shadow-md">
      <div className="flex flex-col items-center gap-6">
        <Skeleton className="flex items-center justify-center h-24 w-24 rounded-full border-4 border-indigo-400/30">
          <Spinner size="sm" color="primary" className="text-gray-400/20" />
        </Skeleton>
        <div className="text-center">
          <Skeleton className="h-8 w-48 mb-2 bg-gray-400/5" />
          <Skeleton className="h-6 w-32 bg-gray-400/5" />
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <Skeleton className="h-8 w-32 mb-4 bg-gray-400/5" />

        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
          <div key={index} className="flex items-center">
            <Skeleton className="h-5 w-32 mr-2 bg-gray-400/5" />
            <Skeleton className="h-5 w-24 bg-gray-400/5" />
          </div>
        ))}
      </div>
    </div>
  );
}
