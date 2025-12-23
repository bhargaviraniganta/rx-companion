export interface User {
  id: string;
  email: string;
  fullName: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface PredictionInput {
  drugName: string;
  smilesCode: string;
  excipient: string;
}

export interface PredictionResult {
  compatible: boolean;
  probability: number;
  riskLevel: "LOW" | "HIGH";
  summary: string[];
}

export type Excipient =
  | "Lactose Monohydrate"
  | "Microcrystalline Cellulose"
  | "Magnesium Stearate"
  | "PVP"
  | "Starch";

export const EXCIPIENTS: Excipient[] = [
  "Lactose Monohydrate",
  "Microcrystalline Cellulose",
  "Magnesium Stearate",
  "PVP",
  "Starch",
];
