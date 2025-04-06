export const Profile = () => {
  return (
    <div className="grid w-full grid-cols-[1fr_3fr] grid-rows-[1fr_10fr] border">
      <div className="flex items-center justify-center border-r border-b">
        <div>Profile Icon</div>
      </div>
      <div className="flex items-center justify-center border-b">
        <div>Profile name</div>
      </div>
      <div className="border-r p-2">
        <div>Sidebar stuff</div>
      </div>
      <div className="p-2">
        <div>Main content stuff</div>
      </div>
    </div>
  )
}

export default Profile
