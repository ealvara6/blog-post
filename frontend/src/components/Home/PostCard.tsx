export const PostCard = ({
  title,
  content,
  id,
}: {
  title: string
  content: string
  id: number
}) => {
  return (
    <div className="dark:border-border-darkTheme dark:bg-card-darkTheme bg-card flex h-[450px] w-full flex-col gap-8 overflow-hidden rounded border px-3 py-5">
      <div className="text-2xl md:text-3xl">{title}</div>
      <div className="dark:text-text-primary-darkTheme/80 text-text-primary/80 text-lg">
        {content}
      </div>
    </div>
  )
}
