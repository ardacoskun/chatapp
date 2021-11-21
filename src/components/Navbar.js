import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "@firebase/firestore";

const Navbar = () => {
  const navigate = useNavigate();
  const logOut = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
    navigate("/giris-yap");
  };
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        ChatRefill
      </Link>

      <div className="navbar-buttons">
        <Link to="/profile" className="profile-button">
          Hesabım
        </Link>
        <button className="logout" onClick={logOut}>
          Çıkış Yap
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
