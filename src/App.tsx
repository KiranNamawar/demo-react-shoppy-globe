import { Outlet } from "react-router";
import Header from "./components/header";

function App() {
  return (
    <div id="app">
      <Header />
      <main>
        <Outlet />
      </main>
      {/* <footer>footer</footer> */}
    </div>
  );
}

export default App;
