import { Loading } from "@/component/Loading";
import Login from "@/component/LoginForm";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex items-center justify-center h-screen">
        <Login />
      </div>
      {/* <Loading/> */}
    </Suspense>
  );
}
