export type SigninRequest = {
  phone_number: string;
  password: string;
};

export interface SigninInitResponse {
  login_session_id: string;
  message: string;
}

export type VerifyPinRequest = {
  pin_code: string;
  login_session_id: string;
};

export interface VerifyPinResponse {
  access_token: string;
  refresh_token: string;
  company_name: string;
  country: string;
  date_of_birth: string;
  email: string;
  first_name: string;
  gender: string;
  id_expiry_date: string;
  id_issue_date: string;
  id_number: string;
  job_title: string;
  last_name: string;
  middle_name: string;
  phone_number: string;
  profile_image: string;
}