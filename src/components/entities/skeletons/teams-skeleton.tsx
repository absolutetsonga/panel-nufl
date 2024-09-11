import { Skeleton } from "~/components/shared/ui/skeleton";
import { Spinner } from "~/components/shared/ui/spinner";

export default function TeamsPageSkeleton() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 items-center justify-center gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((_, index) => (
          <Skeleton
            key={index}
            className="h-24 w-full border-[1px] border-gray-400/40 bg-gray-400/3 rounded-xl p-8 flex items-center justify-center"
          >
            <Spinner size="sm" color="primary" className="text-gray-400/20" />
          </Skeleton>
        ))}
      </div>
    </div>
  );
}
