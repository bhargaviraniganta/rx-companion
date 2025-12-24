import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { User, AuthState, LoginCredentials, SignupCredentials } from "@/types";
import { mockAuthService } from "@/services/mockAuth";

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<{ message: string; resetToken?: string; resetEmail?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Check for persisted auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      const persistedAuth = mockAuthService.getPersistedAuth();
      
      if (persistedAuth) {
        const user = await mockAuthService.validateToken(persistedAuth.token);
        if (user) {
          setState({
            user: persistedAuth.user,
            token: persistedAuth.token,
            isAuthenticated: true,
            isLoading: false,
          });
          return;
        }
      }
      
      setState((prev) => ({ ...prev, isLoading: false }));
    };

    checkAuth();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    
    try {
      const { user, token } = await mockAuthService.login(credentials);
      mockAuthService.persistAuth(user, token);
      
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  const signup = useCallback(async (credentials: SignupCredentials) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    
    try {
      const { user, token } = await mockAuthService.signup(credentials);
      mockAuthService.persistAuth(user, token);
      
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    mockAuthService.logout();
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    return mockAuthService.forgotPassword(email);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        signup,
        logout,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
