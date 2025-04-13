import { useRouter, useSearchParams } from "next/navigation";

export default function CreateQueueButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleClick = () => {
    const redirectTo = searchParams.get("redirect") ?? "/";
    router.replace(`/queue?redirect=${redirectTo}`);
  };

  return (
    <div className="flex items-center justify-center w-screen">
      <button
        type="button"
        onClick={handleClick}
        className="text-center p-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
      >
        Create New Queue
      </button>
    </div>
  );
}
