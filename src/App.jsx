import { Outlet } from "react-router";
import Header from "./components/header";

function App() {
  return (
    <div id="app">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
