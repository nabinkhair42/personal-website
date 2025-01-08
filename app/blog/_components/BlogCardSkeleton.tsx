import { Skeleton } from "@/components/ui/skeleton"

export default function BlogCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 border rounded-lg overflow-hidden shadow-lg h-full">
      <Skeleton className="h-48 w-full" />
      <div className="p-6 flex flex-col flex-grow">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-4" />
        <div className="flex items-center justify-between mt-auto">
          <Skeleton className="h-4 w-24" />
          <div className="flex -space-x-2">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="w-8 h-8 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
