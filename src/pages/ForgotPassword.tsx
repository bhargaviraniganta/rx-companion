import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/components/AuthLayout";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, ArrowLeft } from "lucide-react";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { forgotPassword } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await forgotPassword(email);
      
      if (result.resetToken && result.resetEmail) {
        // Navigate to reset password page with token
        navigate(`/reset-password?token=${encodeURIComponent(result.resetToken)}&email=${encodeURIComponent(result.resetEmail)}`);
      } else {
        // No account found, show generic message
        toast({
          title: "Check Your Email",
          description: "If an account exists, you will receive a password reset link.",
        });
      }
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
            Forgot password?
          </h2>
          <p className="text-muted-foreground">
            Enter your email and we'll help you reset your password
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                disabled={isSubmitting}
                autoComplete="email"
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
                Processing...
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

export default ForgotPassword;
