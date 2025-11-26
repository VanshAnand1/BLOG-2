export function isPasswordSecure(password: string, confirmPassword: string) {
  return (
    passwordLength(password) &&
    passwordContainsUpperCase(password) &&
    passwordContainsLowerCase(password) &&
    passwordContainsNumber(password) &&
    passwordsMatch(password, confirmPassword)
  );
}

export const passwordsMatch = (password: string, confirmPassword: string) =>
  password === confirmPassword && password != "";
export const passwordLength = (password: string) => password.length >= 8;
export const passwordContainsUpperCase = (password: string) =>
  /[A-Z]/.test(password);
export const passwordContainsLowerCase = (password: string) =>
  /[a-z]/.test(password);
export const passwordContainsNumber = (password: string) => /\d/.test(password);
