export const PostCardSkeleton = () => {
  return (
    <div className="dark:bg-card-darkTheme bg-card flex flex-col gap-5">
      <div
        className={`border-border-darkTheme flex min-h-56 flex-col gap-4 rounded border p-3 pb-6`}
      >
        <div className="dark:border-border-darkTheme flex flex-col gap-3 border-b px-2 pt-2 pb-4 sm:px-3 sm:pt-3">
          <div className="flex justify-between">
            <div className="h-6 w-2/3 animate-pulse rounded bg-gray-300 dark:bg-gray-600" />
          </div>
          <div className="flex justify-between">
            <div className="flex gap-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex h-6 w-20 animate-pulse flex-wrap gap-2 rounded-lg bg-gray-300 dark:bg-gray-600"
                />
              ))}
            </div>
            <div className="text-md hidden h-5 w-46 animate-pulse self-center rounded bg-gray-300 font-semibold sm:block md:text-lg dark:bg-gray-600" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="h-4 w-full animate-pulse rounded bg-gray-300 dark:bg-gray-700" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-gray-300 dark:bg-gray-700" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-gray-300 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  )
}
