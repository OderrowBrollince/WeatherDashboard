export default function LoadingState() {
  return (
    <div className="bg-surface-dark rounded-xl p-6 border border-[#233c48] h-[200px] flex flex-col justify-between">
      <div className="flex justify-between">
        <div className="w-24 h-4 bg-[#233c48] rounded shimmer"></div>
        <div className="size-8 rounded-full bg-[#233c48] shimmer"></div>
      </div>
      <div className="flex gap-4 items-center">
        <div className="size-16 rounded-full bg-[#233c48] shimmer"></div>
        <div className="flex flex-col gap-2">
          <div className="w-32 h-8 bg-[#233c48] rounded shimmer"></div>
          <div className="w-20 h-4 bg-[#233c48] rounded shimmer"></div>
        </div>
      </div>
      <div className="w-full h-2 bg-[#233c48] rounded mt-2 shimmer"></div>
    </div>
  );
}
