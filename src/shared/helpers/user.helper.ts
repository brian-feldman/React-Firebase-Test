export const extractWorkspaceFromEmail = (email: string) => {
  if (!email.includes("@")) return "";
  return email.split("@")[1];
};
