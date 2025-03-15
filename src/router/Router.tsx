import { BrowserRouter, Routes, Route } from "react-router";
import { Dashboard } from "../pages/dashboard";
import { AppLayout } from "../components/layout";
import Expenses from "../pages/expenses";
import Expense from "@/pages/expense";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/expense" element={<Expense />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
