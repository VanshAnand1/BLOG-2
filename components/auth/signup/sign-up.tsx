"use client";
import { useState, useEffect } from "react";
import Requirements from "./requirements";

type InputField =
  | "email"
  | "confirmEmail"
  | "displayName"
  | "password"
  | "confirmPassword";

export default function SignUp({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentField, setCurrentField] = useState<InputField | null>();

  return (
    <div>
      <Requirements
        email={email}
        setEmail={setEmail}
        confirmEmail={confirmEmail}
        setConfirmEmail={setConfirmEmail}
        displayName={displayName}
        setDisplayName={setDisplayName}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        currentField={currentField}
        setCurrentField={setCurrentField}
      ></Requirements>
    </div>
  );
}
