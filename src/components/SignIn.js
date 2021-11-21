import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

const SignIn = () => {
  let navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    loading: false,
    error: null,
  });

  const { name, email, password, error, loading } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (!email || !password) {
      setData({ ...data, error: "Gerekli alanları doldurunuz." });
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      await updateDoc(doc(db, "users", result.user.uid), {
        isOnline: true,
      });
      setData({
        name: "",
        email: "",
        password: "",
        loading: false,
        error: null,
      });
      navigate("/");
    } catch (error) {
      setData({ ...data, error: error.message, loading: false });
    }
  };

  return (
    <div className="page">
      <section className="section">
        <h3 className="title">Giriş Yap</h3>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-container">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="form-container">
            <label htmlFor="password">Şifre</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          {error ? <p className="error">{error}</p> : null}
          <div className="btn-container">
            <button type="submit" className="btn">
              {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </button>
          </div>
        </form>
        <div className="goSignIn">
          <p>Yeni hesap oluştur.</p>
          <Link to="/kayit-ol" className="span">
            Kayıt ol
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
