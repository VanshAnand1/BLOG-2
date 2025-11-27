export const inputsMatch = (password: string, confirmPassword: string) =>
  password === confirmPassword && password != "";

export const passwordLength = (password: string) => password.length >= 8;
export const passwordContainsUpperCase = (password: string) =>
  /[A-Z]/.test(password);
export const passwordContainsLowerCase = (password: string) =>
  /[a-z]/.test(password);
export const passwordContainsNumber = (password: string) => /\d/.test(password);

export function isPasswordSecure(password: string) {
  return (
    passwordLength(password) &&
    passwordContainsUpperCase(password) &&
    passwordContainsLowerCase(password) &&
    passwordContainsNumber(password)
  );
}

export function emailIsValid(email: string) {
  const spaceIndex = email.indexOf(" ");
  const atIndex = email.indexOf("@");
  const dotIndex = email.indexOf(".", atIndex);
  return (
    spaceIndex === -1 &&
    atIndex != -1 &&
    email.length > dotIndex + 1 &&
    dotIndex != -1 &&
    dotIndex - atIndex != 1
  );
}

export const displayNameMaxLength = 20;
export const displayNameLength = (displayName: string) =>
  displayName.length <= displayNameMaxLength;
export const displayNameDoesNotContainSpaces = (displayName: string) =>
  displayName === displayName.trim();
