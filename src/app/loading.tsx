// app/loading.tsx
export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="text-center">
        <img
          src="/loading.png"
          alt="Loading..."
          className="h-10 w-10 mx-auto animate-spin "
        />
        <p className="mt-4 text-sm text-gray-700 ">Loading...</p>
      </div>
    </div>
  );
}
