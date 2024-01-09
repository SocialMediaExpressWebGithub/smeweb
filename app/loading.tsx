export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center h-30vh">
        <p className="mb-4">News is Loading</p>
        <div className="relative inline-flex">
          <div className="flex gap-2">
            <div className="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
            <div className="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
            <div className="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
          </div>
        </div>
      </div>
    </div>


  )
}