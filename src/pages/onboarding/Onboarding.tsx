import { Check, ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { userApi } from "@/api/user";
import { useAuth } from "@/contexts/auth/AuthContext";
import { updateUser } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/store/store";
import { currencies } from "@/constants/misc";

const Onboarding: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user?.onboarded && user.currency) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleCurrencySelect = (currency: (typeof currencies)[number]) => {
    setSelectedCurrency(currency);
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleComplete = () => {
    setIsLoading(true);
    userApi
      .onboard({ currency: selectedCurrency.code })
      .then(() => {
        console.log("onboarded");
        dispatch(
          updateUser({ onboarded: true, currency: selectedCurrency.code })
        );
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Welcome!</CardTitle>
            <div className="flex gap-2">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "h-2 w-2 rounded-full",
                    step === i ? "bg-primary" : "bg-muted-foreground/20"
                  )}
                />
              ))}
            </div>
          </div>
          <CardDescription>
            Let's set up your account preferences to get started.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Select your preferred currency
                </label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                    >
                      <div className="flex items-center">
                        <span className="mr-2 text-lg">
                          {selectedCurrency.symbol}
                        </span>
                        <span>
                          {selectedCurrency.code} - {selectedCurrency.name}
                        </span>
                      </div>
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full max-h-60 overflow-auto">
                    {currencies.map((currency) => (
                      <DropdownMenuItem
                        key={currency.code}
                        className="flex items-center justify-between"
                        onClick={() => handleCurrencySelect(currency)}
                      >
                        <div className="flex items-center">
                          <span className="mr-2 text-lg">
                            {currency.symbol}
                          </span>
                          <span>
                            {currency.code} - {currency.name}
                          </span>
                        </div>
                        {selectedCurrency.code === currency.code && (
                          <Check className="h-4 w-4" />
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <p className="text-sm text-muted-foreground">
                  This will be used as your default currency for all
                  transactions.
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-xl font-medium">Confirm Your Selection</h2>
                <p className="text-muted-foreground">
                  You've selected {selectedCurrency.name} (
                  {selectedCurrency.code}) as your preferred currency.
                </p>
                <p className="text-muted-foreground">
                  Click "Complete Setup" to save your preferences and continue
                  to the dashboard.
                </p>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter
          className={cn(step === 1 ? "justify-end" : "justify-between")}
        >
          {step === 2 && (
            <Button
              onClick={handleComplete}
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Setting up your account..." : "Complete Setup"}
            </Button>
          )}

          {step === 1 && <Button onClick={handleNext}>Continue</Button>}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Onboarding;
