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
