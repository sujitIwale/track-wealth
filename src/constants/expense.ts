export const Categories = {
  food: {
    id: "food",
    name: "Food",
    icon: "🍽️"
  },
  transportation: {
    id: "transportation", 
    name: "Transportation",
    icon: "🚗"
  },
  entertainment: {
    id: "entertainment",
    name: "Entertainment",
    icon: "🎮"
  },
  other: {
    id: "other",
    name: "Other", 
    icon: "📦"
  },
  groceries: {
    id: "groceries",
    name: "Groceries",
    icon: "🛒"
  },
  shopping: {
    id: "shopping",
    name: "Shopping",
    icon: "🛍️"
  },
} as const;

export type Category = keyof typeof Categories;

export const CategoriesList = Object.values(Categories);

export const AccountTypes = {
  cash: {
    id: "cash",
    name: "Cash",
    icon: "💰"
  },
  bank: {
    id: "bank",
    name: "Bank",
    icon: "🏦"
  },
  creditCard: {
    id: "creditCard",
    name: "Credit Card",
    icon: "💳"
  },
  other: {
    id: "other",
    name: "Other",
    icon: "📦"
  },
} as const;

export type AccountType = keyof typeof AccountTypes;

export const AccountTypesList = Object.values(AccountTypes);
