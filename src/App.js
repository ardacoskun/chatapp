import "./App.css";
import SignUp from "./components/SignUp";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import PrivateRoute from "./components/PrivateRoute";
import { useAuth } from "./contexts/AuthContext";
import Loading from "./components/Loading";
import Profile from "./components/Profile";
import Error from "./components/Error";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  const { loading, user } = useAuth();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route path="/kayit-ol" element={user ? <Home /> : <SignUp />} />
          <Route path="/giris-yap" element={user ? <Home /> : <SignIn />} />
          <Route path="/sifremi-unuttum" element={<ForgotPassword />} />
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
