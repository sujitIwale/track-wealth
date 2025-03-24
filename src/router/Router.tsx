import { BrowserRouter, Routes, Route } from "react-router";
import { Dashboard } from "../pages/dashboard";
import { AppLayout } from "../components/layout";
import Expenses from "../pages/expenses";
import Auth from "@/pages/auth/Auth";
import { Home } from "lucide-react";
import Success from "@/pages/auth/Success";
import PrivateRoute from "@/components/routes/PrivateRoute";
import GuestRoute from "@/components/routes/GuestRoute";
import Onboarding from "@/pages/onboarding/Onboarding";
import AddTransaction from "@/components/AddTransaction/AddTransaction";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/transaction/:type/:id?"
              element={<AddTransaction open />}
            />
            <Route path="/expenses" element={<Expenses />} />
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
