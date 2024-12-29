import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import Home from "./pages/Home.jsx";
import Header from "./components/Header.jsx";
// import Home from "./pages/Home";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
  ]);

  return (
    <>
      <div className="overflow-x-hidden">
        <Header />
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
