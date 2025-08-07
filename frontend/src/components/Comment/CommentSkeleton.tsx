export const CommentSkeleton = () => {
  return (
    <div className="dark:border-border-darkTheme border-border dark:bg-card-darkTheme bg-card h-36 w-full rounded border p-2">
      <div className="flex flex-col gap-7">
        <div className="h-5 w-46 animate-pulse rounded bg-gray-300 dark:bg-gray-600" />
        <div className="h-7 w-3/4 animate-pulse rounded bg-gray-300 dark:bg-gray-700" />
      </div>
    </div>
  )
}
