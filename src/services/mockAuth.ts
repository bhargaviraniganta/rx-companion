/**
 * Mock Authentication Service
 * This simulates a real backend authentication flow.
 * In production, replace this with actual API calls to your Express backend.
 */

import { User, LoginCredentials, SignupCredentials } from "@/types";

// Simulated user database (in real app, this would be SQLite/JSON on backend)
const USERS_STORAGE_KEY = "drugexcipredict_users";
const RESET_TOKENS_KEY = "drugexcipredict_reset_tokens";

interface StoredUser {
  id: string;
  email: string;
  fullName: string;
  // In real app, this would be bcrypt hashed on backend
  passwordHash: string;
}

// Simple hash simulation (NOT SECURE - use bcrypt on real backend)
const simpleHash = (password: string): string => {
  return btoa(password + "_salted_hash");
};

const verifyPassword = (password: string, hash: string): boolean => {
  return simpleHash(password) === hash;
};

const generateToken = (): string => {
  return btoa(Date.now().toString() + Math.random().toString(36));
};

const generateId = (): string => {
  return "user_" + Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const getStoredUsers = (): StoredUser[] => {
  const stored = localStorage.getItem(USERS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveUsers = (users: StoredUser[]): void => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

// Simulate network delay
const delay = (ms: number = 500): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const mockAuthService = {
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    await delay();
    
    const users = getStoredUsers();
    const user = users.find((u) => u.email.toLowerCase() === credentials.email.toLowerCase());
    
    if (!user) {
      throw new Error("Invalid email or password");
    }
    
    if (!verifyPassword(credentials.password, user.passwordHash)) {
      throw new Error("Invalid email or password");
    }
    
    const token = generateToken();
    
    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
      token,
    };
  },

  async signup(credentials: SignupCredentials): Promise<{ user: User; token: string }> {
    await delay();
    
    if (credentials.password !== credentials.confirmPassword) {
      throw new Error("Passwords do not match");
    }
    
    if (credentials.password.length < 8) {
      throw new Error("Password must be at least 8 characters");
    }
    
    const users = getStoredUsers();
    const existingUser = users.find(
      (u) => u.email.toLowerCase() === credentials.email.toLowerCase()
    );
    
    if (existingUser) {
      throw new Error("Email already registered");
    }
    
    const newUser: StoredUser = {
      id: generateId(),
      email: credentials.email,
      fullName: credentials.fullName,
      passwordHash: simpleHash(credentials.password),
    };
    
    users.push(newUser);
    saveUsers(users);
    
    const token = generateToken();
    
    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
      },
      token,
    };
  },

  async forgotPassword(email: string): Promise<{ message: string; resetToken?: string; resetEmail?: string }> {
    await delay();
    
    const users = getStoredUsers();
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      // Don't reveal if email exists for security - still return success message
      return {
        message: "If an account exists with this email, you will be redirected to reset your password.",
      };
    }
    
    const resetToken = generateToken();
    
    // Store reset token with expiry
    const resetTokens = JSON.parse(localStorage.getItem(RESET_TOKENS_KEY) || "{}");
    resetTokens[email.toLowerCase()] = {
      token: resetToken,
      expires: Date.now() + 3600000, // 1 hour
    };
    localStorage.setItem(RESET_TOKENS_KEY, JSON.stringify(resetTokens));
    
    return {
      message: "Redirecting to password reset...",
      resetToken,
      resetEmail: email.toLowerCase(),
    };
  },

  validateResetToken(email: string, token: string): boolean {
    const resetTokens = JSON.parse(localStorage.getItem(RESET_TOKENS_KEY) || "{}");
    const stored = resetTokens[email.toLowerCase()];
    
    if (!stored) return false;
    if (stored.token !== token) return false;
    if (Date.now() > stored.expires) return false;
    
    return true;
  },

  async resetPassword(email: string, token: string, newPassword: string): Promise<void> {
    await delay();
    
    if (!this.validateResetToken(email, token)) {
      throw new Error("Invalid or expired reset token");
    }
    
    if (newPassword.length < 8) {
      throw new Error("Password must be at least 8 characters");
    }
    
    const users = getStoredUsers();
    const userIndex = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());
    
    if (userIndex === -1) {
      throw new Error("User not found");
    }
    
    // Update password
    users[userIndex].passwordHash = simpleHash(newPassword);
    saveUsers(users);
    
    // Remove used reset token
    const resetTokens = JSON.parse(localStorage.getItem(RESET_TOKENS_KEY) || "{}");
    delete resetTokens[email.toLowerCase()];
    localStorage.setItem(RESET_TOKENS_KEY, JSON.stringify(resetTokens));
  },

  async validateToken(token: string): Promise<User | null> {
    await delay(200);
    
    // In real app, this would validate JWT on backend
    if (!token) return null;
    
    // For demo, we just check if there's a logged in user in localStorage
    const storedAuth = localStorage.getItem("drugexcipredict_auth");
    if (storedAuth) {
      const { user, token: storedToken } = JSON.parse(storedAuth);
      if (storedToken === token) {
        return user;
      }
    }
    
    return null;
  },

  logout(): void {
    localStorage.removeItem("drugexcipredict_auth");
  },

  persistAuth(user: User, token: string): void {
    localStorage.setItem("drugexcipredict_auth", JSON.stringify({ user, token }));
  },

  getPersistedAuth(): { user: User; token: string } | null {
    const stored = localStorage.getItem("drugexcipredict_auth");
    return stored ? JSON.parse(stored) : null;
  },
};
