interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

interface SignUpRequest {
  nickname: string;
  email: string;
  password: string;
  interest: string;
}

interface ProfileResponse {
  nickname: string;
  email: string;
  point: string;
  interests: InterestEnglishType[];
}

interface InterestRequest {
  interests: string[];
}