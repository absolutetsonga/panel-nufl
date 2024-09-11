import { Skeleton } from "~/components/shared/ui/skeleton"
import { Spinner } from "~/components/shared/ui/spinner"
import { PageContainer } from "~/components/shared/ui"
import { Heading1, Heading3 } from "~/components/shared/ui/typography"

export default function GamesPageSkeleton() {
  return (
      <div className="relative flex w-full flex-col gap-4">
        <PopulateGameweeksSkeleton />
        <Skeleton className="h-10 w-10 rounded-full absolute right-0 top-0" />
      </div>
  )
}

function PopulateGameweeksSkeleton() {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex flex-col gap-4">
          <Heading3>
            <Skeleton className="h-6 w-60 bg-gray-400/5" />
          </Heading3>
          <PopulateGamesSkeleton />
        </div>
      ))}
    </div>
  )
}

function PopulateGamesSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4">
      {[...Array(4)].map((_, index) => (
        <Skeleton
          key={index}
          className="flex w-full flex-row items-center justify-center gap-2 sm:gap-4 rounded-xl p-2 h-16 bg-gray-400/5"
        >
          <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 text-right">
            <Skeleton className="h-4 w-24 bg-gray-400/5" />
            <Skeleton className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-400/5">
              <Spinner size="sm" color="primary" className="text-gray-400/20" />
            </Skeleton>
          </div>
          <Skeleton className="h-6 w-8 bg-gray-400/5" />
          <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 text-left">
          <Skeleton className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-400/5">
              <Spinner size="sm" color="primary" className="text-gray-400/20" />
            </Skeleton>
            <Skeleton className="h-4 w-24 bg-gray-400/5" />
          </div>
        </Skeleton>
      ))}
    </div>
  )
}