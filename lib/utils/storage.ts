import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'auth_token';
const SESSION_KEY = 'auth_session';
const USER_KEY = 'auth_user';

export const storage = {
  async saveToken(token: string): Promise<void> {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  },

  async getToken(): Promise<string | null> {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  },

  async clearToken(): Promise<void> {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  },

  async saveSession(session: string): Promise<void> {
    await SecureStore.setItemAsync(SESSION_KEY, session);
  },

  async getSession(): Promise<string | null> {
    return await SecureStore.getItemAsync(SESSION_KEY);
  },

  async clearSession(): Promise<void> {
    await SecureStore.deleteItemAsync(SESSION_KEY);
  },

  async saveUser(user: string): Promise<void> {
    await SecureStore.setItemAsync(USER_KEY, user);
  },

  async getUser(): Promise<string | null> {
    return await SecureStore.getItemAsync(USER_KEY);
  },

  async clearUser(): Promise<void> {
    await SecureStore.deleteItemAsync(USER_KEY);
  },

  async clearAll(): Promise<void> {
    await this.clearToken();
    await this.clearSession();
    await this.clearUser();
  },
};