import { AppShell } from "../components/app-shell";
import { LoginForm } from "../components/auth/login-form";

export function LoginPage() {
  return (
    <AppShell>
      <div className="max-w-3xl mx-auto">
        <LoginForm />
      </div>
    </AppShell>
  );
}