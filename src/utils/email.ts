export const isDWEmail = (email: string) => {
  return (
    email.endsWith("@datawiz.io") ||
    email.endsWith("@planohero.com") ||
    email.startsWith("support_")
  );
};
