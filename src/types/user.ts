export type User = {
  id: string;
  email: string;
  name: string | null;
  profilePicture: string | null;
  createdAt: Date;
  updatedAt: Date;
  onboarded: boolean;
  currency: string | null;
};
