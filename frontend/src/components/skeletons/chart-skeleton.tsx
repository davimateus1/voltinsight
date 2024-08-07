export const ChartSkeleton = () => {
  return (
    <div className="animate-pulse space-y-2 w-[46.5%]">
      <div className="flex justify-end space-x-2 items-center">
        <div className="w-32 h-8 bg-gray-200 rounded-md" />
        <div className="w-[2rem] p-1 h-[2rem] bg-gray-200 rounded-full" />
      </div>
      <div className="w-full h-[285px] bg-gray-200 rounded-lg" />
    </div>
  );
};
