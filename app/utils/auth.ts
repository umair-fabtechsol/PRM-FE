// utils/auth.ts
export const getUser = () => {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const getUserRole = (): string | null => {
  const user = getUser();
  return user?.role || null;
};

export const hasRole = (
  roles: string[],
  currentRole: string | null
): boolean => {
  return currentRole ? roles.includes(currentRole) : false;
};
