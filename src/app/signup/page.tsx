import { Loading } from "@/component/Loading";
import Signup from "@/component/SignUpForm";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex items-center justify-center h-screen">
        <Signup />
      </div>
    </Suspense>
  );
}
