import { LoginCredentials, LoginResponse, SignUpRequest } from "@/models/auth";
import { ApiResponse } from "@/models/common";
import { getApiUrl } from "@/utils/getApiUrl";

export async function loginUser(
  credentials: LoginCredentials
): Promise<ApiResponse<LoginResponse | null>> {
  try {
    const response = await fetch(getApiUrl("v1/sqs/login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();

    if (!response.ok) {
      return { status: response.status, data: data };
    }

    return {
      status: response.status,
      data: {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      },
    };
  } catch (error) {
    console.log(error)
    return { status: 500, data: null };
  }
}

export async function signUpUser(
  request: SignUpRequest
): Promise<ApiResponse<string | null>> {
  try {
    const response = await fetch(getApiUrl("v1/sqs/signup"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    const data = await response.json();

    if (!response.ok) {
      return { status: response.status, data: data };
    }

    return {
      status: response.status,
      data: data,
    };
  } catch (error) {
    console.log(error)
    return { status: 500, data: null };
  }
}
