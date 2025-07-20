import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { VerifyPinResponse } from '@/lib/api/types';
import { storage } from '@/lib/utils/storage';
import { authService } from '@/lib/api/auth';


type AuthContextType = {
    user: VerifyPinResponse | null;
    sessionId: string | null;
    isLoading: boolean;
    login: (phone: string, password: string) => Promise<void>;
    verifyPin: (pin: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<VerifyPinResponse | null>(null);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const userData = await storage.getUser();
                const session = await storage.getSession();

                if (userData) {
                    setUser(JSON.parse(userData));
                }

                if (session) {
                    setSessionId(session);
                }
            } catch (error) {
                console.error('Failed to load user data', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadUser();
    }, []);

    const login = async (phone: string, password: string) => {
        try {
            const response = await authService.signinInit({ phone_number: phone, password });
            setSessionId(response.login_session_id);
            await storage.saveSession(response.login_session_id);
        } catch (error) {
            console.error('Login failed', error);
            throw error;
        }
    };

    const verifyPin = async (pin: string) => {
        if (!sessionId) throw new Error('No active session');


        try {
            const response = await authService.verifyPin({
                pin_code: pin,
                login_session_id: sessionId
            });



            setUser(response);
            await storage.saveToken(response.access_token);
            await storage.saveUser(JSON.stringify(response));
        } catch (error) {
            console.error('PIN verification failed', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            setUser(null);
            setSessionId(null);
            await storage.clearAll();
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, sessionId, isLoading, login, verifyPin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};