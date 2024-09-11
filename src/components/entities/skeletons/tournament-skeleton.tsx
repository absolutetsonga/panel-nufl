import { Skeleton } from "~/components/shared/ui";

export function TournamentPageSkeleton() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 w-full items-center justify-center flex-col gap-4">
        <Skeleton className="h-24 w-full border-[1px] border-gray-400/40 bg-gray-400/3 rounded-xl p-8" />
      </div>
    </div>
  );
}
