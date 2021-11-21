import "./App.css";
import SignUp from "./components/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import PrivateRoute from "./components/PrivateRoute";
import { useAuth } from "./contexts/AuthContext";
import Loading from "./components/Loading";
import Profile from "./components/Profile";
import Error from "./components/Error";

function App() {
  const { loading } = useAuth();
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route path="/kayit-ol" element={<SignUp />} />
          <Route path="/giris-yap" element={<SignIn />} />
          <Route
            exact
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      )}
    </>
  );
}

export default App;
