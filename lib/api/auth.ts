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


    return response.data;
  },

  verifyPin: async (data: VerifyPinRequest): Promise<VerifyPinResponse> => {

    const response = await api.post('/api/v1/auth/mobile/validate-pin-code', data);


    return response.data;
  },
};