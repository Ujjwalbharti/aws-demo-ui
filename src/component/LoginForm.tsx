"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGlobalContext } from "@/context/GlobalContext";
import { loginUser } from "@/services/loginService";

export default function Login() {
  const { token, setAuthToken } = useGlobalContext();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isMounted, setIsMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && token) {
      const redirectTo = searchParams.get("redirect") ?? "/";
      router.replace(redirectTo);
    }
  }, [token, isMounted, router, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const response = await loginUser({ email, password });

    if (response.status === 200 && response.data) {
      setAuthToken(response.data.accessToken);
      const redirectTo = searchParams.get("redirect") ?? "/";
      router.replace(redirectTo);
    } else {
      setError(JSON.stringify(response.data));
    }
  };

  const goToSignup = () => {
    const redirectParam = searchParams.get("redirect");
    const signupPath = redirectParam
      ? `/signup?redirect=${redirectParam}`
      : "/signup";
    router.push(signupPath);
  };

  if (!isMounted || token) return null;

  return (
    <div className="p-4">
      <div>
        <h2 className="text-xl font-bold mb-4">Login</h2>
      </div>

      <div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded w-full"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Login
          </button>
        </form>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm">
          Don’t have an account?{" "}
          <button
            onClick={goToSignup}
            className="text-blue-600 hover:underline font-medium"
          >
            Click here to signup
          </button>
        </p>
      </div>
    </div>
  );
}
