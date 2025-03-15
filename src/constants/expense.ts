export const Categories = {
  food: {
    id: "food",
    name: "Food",
  },
  transportation: {
    id: "transportation", 
    name: "Transportation",
  },
  entertainment: {
    id: "entertainment",
    name: "Entertainment", 
  },
  other: {
    id: "other",
    name: "Other",
  },
  groceries: {
    id: "groceries",
    name: "Groceries",
  },
  shopping: {
    id: "shopping",
    name: "Shopping",
  },
} as const;

export type Category = keyof typeof Categories;

export const CategoriesList = Object.values(Categories);
