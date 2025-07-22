import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FcGoogle } from "react-icons/fc";
import authService from "@/services/auth";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Logo from "@/components/shared/Logo";
import { Link } from "react-router";
const Auth = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const handleGoogleAuth = () => {
    // Handle Google authentication
    setIsAuthenticating(true);
    authService.loginWithGoogle();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gray-50">
      <div className="flex flex-col items-center justify-center w-full">
        <Link to="/" className="mb-8">
          <Logo size="lg" />
        </Link>
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome</CardTitle>
            <CardDescription className="text-center">
              Sign in or create an account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <div className="flex flex-col gap-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleGoogleAuth}
                  >
                    {isAuthenticating ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      <FcGoogle className="mr-2 h-5 w-5" />
                    )}
                    Sign in with Google
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="signup">
                <div className="flex flex-col gap-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleGoogleAuth}
                  >
                    <FcGoogle className="mr-2 h-5 w-5" />
                    Sign up with Google
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
