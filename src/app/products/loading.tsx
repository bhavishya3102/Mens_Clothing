
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <main className="py-8 px-4 max-w-7xl mx-auto">
      <Skeleton className="h-12 w-64 mb-8" />
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Skeleton className="w-full h-48" />
            <div className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}

