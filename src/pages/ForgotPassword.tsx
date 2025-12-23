import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/components/AuthLayout";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, ArrowLeft, CheckCircle } from "lucide-react";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { forgotPassword } = useAuth();
  const { toast } = useToast();

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
      setIsSuccess(true);
      toast({
        title: "Reset Link Generated",
        description: result.message,
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
            Check Your Console
          </h2>
          <p className="text-muted-foreground mb-6">
            Password reset link has been generated. Check your browser's developer console (F12 → Console) to see the reset token.
          </p>
          
          <div className="bg-muted/50 border border-border rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Note:</strong> In a production environment, this reset link would be sent to your email. For this demo, the token is logged to the console.
            </p>
            <p className="text-xs text-muted-foreground">
              Press F12 → Console to view the reset token
            </p>
          </div>
          
          <Link to="/login">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
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
            Forgot password?
          </h2>
          <p className="text-muted-foreground">
            Enter your email and we'll generate a password reset link
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
                Generating reset link...
              </>
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
