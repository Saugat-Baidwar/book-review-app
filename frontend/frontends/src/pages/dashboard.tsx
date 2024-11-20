import { AppShell } from "../components/app-shell";
import { AddBook } from "../components/book/create-book";
// import { CreateBook } from "../components/book/create-book";
import { ListBooks } from "../components/book/list-book";

export function DashboardPage() {
  return (
    <AppShell>
      {/* <CreateBook /> */}
     <AddBook/>
      <ListBooks />
     
    </AppShell>
  );
}
