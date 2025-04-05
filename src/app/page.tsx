"use client";

import RequireAuth from "@/component/RequireAuth";

export default function HomePage() {
  return (
    <RequireAuth>
      <div>Hello World</div>
    </RequireAuth>
  );
}
