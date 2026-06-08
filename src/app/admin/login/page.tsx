import styles from "./login.module.css";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className="glass-panel">
        <LoginForm />
      </div>
    </div>
  );
}
