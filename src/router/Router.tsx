import { BrowserRouter, Routes, Route } from "react-router";
import { Dashboard } from "../pages/dashboard";
import { AppLayout } from "../components/layout";
import Expenses from "../pages/expenses";
import Expense from "@/pages/expense";
import Auth from "@/pages/auth/Auth";
import { useAuth0 } from "@auth0/auth0-react";
import { Home } from "lucide-react";
import Success from "@/pages/auth/Success";
import PrivateRoute from "@/components/routes/PrivateRoute";
import GuestRoute from "@/components/routes/GuestRoute";
import Onboarding from "@/pages/onboarding/Onboarding";
const Router = () => {
  const { user, isAuthenticated } = useAuth0();
  console.log({ user, isAuthenticated });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/expense" element={<Expense />} />
          </Route>
        </Route>
        <Route element={<GuestRoute />}>
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/success" element={<Success />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
