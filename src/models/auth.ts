export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface SignUpRequest {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  mobileNumber: string;
  password: string;
}
