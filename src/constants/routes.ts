const routes = {
  dashboard: "/dashboard",
  transaction: {
    expense: "/transaction/expense",
    income: "/transaction/income",
  },
};

export const desktopNavItems = [
  {
    name: "Dashboard",
    id: "dashboard",
    href: "/dashboard",
    icon: "house",
    type: "link",
  },
  {
    name: "Transactions",
    id: "transactions",
    href: "/expenses",
    icon: "list",
    type: "link",
  },
  {
    name: "Add Expense",
    id: "add-expense",
    icon: "plus",
    type: "button",
  },
  {
    name: "Budget",
    id: "budget",
    href: "/budget",
    icon: "wallet",
    type: "link",
  },
  {
    name: "Settings",
    id: "settings",
    href: "/settings",
    icon: "settings",
    type: "link",
  },
];

export default routes;
