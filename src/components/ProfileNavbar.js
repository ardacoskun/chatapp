import React from "react";
import { Link } from "react-router-dom";

const ProfileNavbar = () => {
  return (
    <nav className="profile-navbar">
      <Link to="/" className="logo">
        ChatRefill
      </Link>
      <div className="backtoHome">
        <Link to="/" className="backtoHomelink">
          Ana Sayfa
        </Link>
      </div>
    </nav>
  );
};

export default ProfileNavbar;
