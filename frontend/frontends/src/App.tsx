import "./App.css";
import { QueryClientProvider } from "./query";
import { RouterProvider } from "./router";

function App() {
  return (
    <QueryClientProvider>
      <RouterProvider />
    </QueryClientProvider>
  );
}

export default App;