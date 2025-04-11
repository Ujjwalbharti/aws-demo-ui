"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGlobalContext } from "@/context/GlobalContext";
import { signUpUser } from "@/services/loginService";

export default function Signup() {
  const { token } = useGlobalContext();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    mobileNumber: "",
    email: "",
    password: "",
  });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const response = await signUpUser(formData);

    if (response.status === 201 && response.data) {
      const redirectTo = searchParams.get("redirect") ?? "/";
      router.replace(redirectTo);
      console.log("Signup successful, redirecting to:", redirectTo);
    } else {
      setError(JSON.stringify(response.data));
    }
  };

  const goToLogin = () => {
    const redirectParam = searchParams.get("redirect");
    const loginPath = redirectParam
      ? `/login?redirect=${redirectParam}`
      : "/login";
    router.push(loginPath);
  };

  const renderInput = (
    label: string,
    name: keyof typeof formData,
    type: string = "text"
  ) => (
    <div>
      <label className="block mb-1 text-sm">{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        required
        onChange={handleChange}
        className="border border-gray-300 px-3 py-2 rounded w-full"
      />
    </div>
  );

  if (!isMounted || token) return null;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Signup</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        {renderInput("First Name", "firstName")}
        {renderInput("Last Name", "lastName")}
        {renderInput("User Name", "userName")}
        {renderInput("Mobile Number", "mobileNumber")}
        {renderInput("Email", "email", "email")}
        {renderInput("Password", "password", "password")}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Signup
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm">
          Already have an account?{" "}
          <button
            onClick={goToLogin}
            className="text-blue-600 hover:underline font-medium"
          >
            Click here to login
          </button>
        </p>
      </div>
    </div>
  );
}
