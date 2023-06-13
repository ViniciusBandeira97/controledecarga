import logo from "../../../public/logo.svg";
import { Input } from "../../components/Form/Input";
import styles from "./styles.module.scss";

export default function SignIn() {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <img src={logo} alt="Logo Alpar do Brasil" />
        <h1>Faça seu login na plataforma</h1>
      </div>

      <form className={styles.form}>
        <Input name="E-mail" />
      </form>
    </div>
  );
}
