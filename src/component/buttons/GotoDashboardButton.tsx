import { useRouter, useSearchParams } from "next/navigation";

export default function GoToDashboardButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleClick = () => {
    const redirectTo = searchParams.get("redirect") ?? "/";
    router.replace(redirectTo);
  };

  return (
    <div className="absolute top-0 left-0 p-2">
      <button
        type="button"
        onClick={handleClick}
        className="text-xl text-center p-2 text-white bg-green-500 rounded-xl hover:bg-green-600"
      >
        Home
      </button>
    </div>
  );
}
