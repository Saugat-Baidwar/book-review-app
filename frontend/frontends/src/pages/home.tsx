import { AppShell } from "../components/app-shell";
import { ListBooks } from "../components/book/list-book";

export function HomePage() {
  return (
    <AppShell>
      <h1>Home</h1>
      <ListBooks/>
    </AppShell>
  );
}