import { InputHTMLAttributes, useState } from "react";
import { IconType } from "react-icons";
import styles from "./styles.module.scss";

interface InputProps extends InputHTMLAttributes<any> {
  name: string;
  label?: string;
  error?: string;

  isPassword?: Boolean;
  iconLeft?: IconType;
  iconRight?: IconType;
}

export function Input({
  label,
  name,
  isPassword,
  error,
  iconLeft,
  iconRight,
  ...rest
}: InputProps) {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <div className={styles.container}>
      {!!label && <label htmlFor={name}>{label}</label>}

      <div className={styles.content}>
        <input
          type={isPassword ? (hidePassword ? "password" : "text") : rest.type}
          {...rest}
        />
      </div>

      {isPassword && (
        <div
          onClick={() => {
            setHidePassword(false);
          }}
        ></div>
      )}

      {!!error && <span>{error}</span>}
    </div>
  );
}
