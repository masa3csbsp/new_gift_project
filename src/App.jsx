import { useState } from "react";
import LoginPage from "./components/Login/LoginPage";
import Home from "./pages/Home";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      {isAuthenticated ? (
        <Home />
      ) : (
        <LoginPage onSuccess={() => setIsAuthenticated(true)} />
      )}
    </>
  );
}

export default App;