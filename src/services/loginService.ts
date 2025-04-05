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

    if (!response.ok) {
      return { status: response.status, data: null };
    }

    const data = await response.json();
    return {
      status: response.status,
      data: {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      },
    };
  } catch (error) {
    return { status: 500, data: null };
  }
}

export async function signUp(
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

    if (!response.ok) {
      return { status: response.status, data: null };
    }

    const data = await response.json();
    return {
      status: response.status,
      data: data,
    };
  } catch (error) {
    return { status: 500, data: null };
  }
}
