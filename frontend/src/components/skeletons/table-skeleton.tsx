export const TableSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4">
      <h1 className="text-2xl font-semibold text-gray-200 text-center">
        Electric Data Library
      </h1>
      <div className="flex justify-between">
        <div className="flex space-x-2">
          <div className="w-60 h-10 bg-gray-200 rounded-lg" />
          <div className="w-16 h-10 bg-gray-200 rounded-lg" />
        </div>
        <div className="w-24 h-10 bg-gray-200 rounded-lg" />
      </div>
      <div className="w-full h-12 bg-gray-200 rounded-lg" />
      <div className="w-full h-12 bg-gray-200 rounded-lg" />
      <div className="w-full h-12 bg-gray-200 rounded-lg" />
      <div className="flex justify-between">
        <div className="w-40 h-4 bg-gray-200 rounded-md" />
        <div className="flex justify-end space-x-2">
          <div className="w-10 h-10 bg-gray-200 rounded-lg" />
          <div className="w-10 h-10 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
};
