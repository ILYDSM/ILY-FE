interface LoginRequest {
  email: string;
  secret_key: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}
