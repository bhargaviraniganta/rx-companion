import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/components/AuthLayout";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Lock, ArrowLeft, CheckCircle } from "lucide-react";
import { mockAuthService } from "@/services/mockAuth";

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  
  const { toast } = useToast();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    if (!token || !email) {
      setIsValidToken(false);
      return;
    }
    
    const valid = mockAuthService.validateResetToken(email, token);
    setIsValidToken(valid);
  }, [token, email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password || !confirmPassword) {
      toast({
        title: "Required Fields",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    if (password.length < 8) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 8 characters",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "Please ensure both passwords match",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await mockAuthService.resetPassword(email!, token!, password);
      setIsSuccess(true);
      toast({
        title: "Password Reset Successful",
        description: "Please login with your new password.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isValidToken === null) {
    return (
      <AuthLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AuthLayout>
    );
  }

  if (!isValidToken) {
    return (
      <AuthLayout>
        <div className="animate-fade-in text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
              <Lock className="h-8 w-8 text-destructive" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">
            Invalid Reset Link
          </h2>
          <p className="text-muted-foreground mb-6">
            This password reset link is invalid or has expired. Please request a new one.
          </p>
          
          <Link to="/forgot-password">
            <Button variant="outline" className="w-full">
              Request New Reset Link
            </Button>
          </Link>
        </div>
      </AuthLayout>
    );
  }

  if (isSuccess) {
    return (
      <AuthLayout>
        <div className="animate-fade-in text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-success-light rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">
            Password Reset Successful
          </h2>
          <p className="text-muted-foreground mb-6">
            Your password has been successfully reset. Please login with your new password.
          </p>
          
          <Link to="/login">
            <Button variant="gradient" className="w-full">
              Go to Login
            </Button>
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="animate-fade-in">
        <Link
          to="/login"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to login
        </Link>

        <div className="space-y-2 mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Reset Password
          </h2>
          <p className="text-muted-foreground">
            Enter your new password below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                disabled={isSubmitting}
                autoComplete="new-password"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Minimum 8 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10"
                disabled={isSubmitting}
                autoComplete="new-password"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            variant="gradient"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Resetting password...
              </>
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
