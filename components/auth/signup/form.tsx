import { type InputField } from "../sign-up-form";

type FormProps = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  confirmEmail: string;
  setConfirmEmail: React.Dispatch<React.SetStateAction<string>>;
  displayName: string;
  setDisplayName: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  currentField: InputField | null | undefined;
  setCurrentField: React.Dispatch<
    React.SetStateAction<InputField | null | undefined>
  >;
};

export default function SignUpForm(props: FormProps) {}
