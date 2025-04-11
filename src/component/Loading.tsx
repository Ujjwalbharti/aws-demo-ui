export function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      <div className="absolute text-gray-700">Loading...</div>
    </div>
  );
}
