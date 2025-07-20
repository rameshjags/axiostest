import api from './axios';
import {
  SigninRequest,
  SigninInitResponse,
  VerifyPinRequest,
  VerifyPinResponse,
} from './types';

export const authService = {
  signinInit: async (data: SigninRequest): Promise<SigninInitResponse> => {
    const response = await api.post('/api/v1/auth/mobile/login', data);

    console.log({response})
    return response.data;
  },

  verifyPin: async (data: VerifyPinRequest): Promise<VerifyPinResponse> => {
    console.log({data})
    const response = await api.post('/api/v1/auth/mobile/validate-pin-code', data);

    console.log({response})
    return response.data;
  },
};