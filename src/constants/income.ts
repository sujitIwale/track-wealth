export const IncomeSources = {
  salary: {
    id: "salary",
    name: "Salary",
    icon: "💰",
  },
  side_hustle: {
    id: "side_hustle",
    name: "Side Hustle",
    icon: "💸",
  },
  cash: {
    id: "cash",
    name: "Cash",
    icon: "💵",
  },
  other: {
    id: "other",
    name: "Other",
    icon: "📦",
  },
};

export type IncomeSource = keyof typeof IncomeSources;

export const IncomeSourcesList = Object.values(IncomeSources);
