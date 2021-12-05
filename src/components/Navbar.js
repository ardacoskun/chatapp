import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "@firebase/firestore";
import MenuIcon from "./MenuIcon";
import CloseMenu from "./CloseMenu";
import BackButton from "./BackButton";

const Navbar = ({ screenWidth, setChat, chat }) => {
  const [clicked, setClicked] = useState(false);

  const handleClicked = () => {
    setClicked(!clicked);
  };

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
      {screenWidth <= 768 && chat !== "" ? (
        <BackButton setChat={setChat} />
      ) : (
        <Link to="/" className="logo">
          ChatRefill
        </Link>
      )}

      <div className={`navbar-buttons ${!clicked ? "active" : null}`}>
        <Link to="/profile" className="profile-button">
          Hesabım
        </Link>

        <button className="logout" onClick={logOut}>
          Çıkış Yap
        </button>
      </div>
      {clicked ? (
        <CloseMenu handleClicked={handleClicked} />
      ) : (
        <MenuIcon handleClicked={handleClicked} />
      )}
    </nav>
  );
};

export default Navbar;
