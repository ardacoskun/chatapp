import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

const SignUp = () => {
  let navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    loading: false,
    error: null,
  });

  const { name, email, password, error, loading } = data;

  const [alert, setAlert] = useState(true);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (!name || !email || !password) {
      setData({ ...data, error: "Gerekli alanları doldurunuz." });
    }
    try {
      if (name !== "") {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await setDoc(doc(db, "users", result.user.uid), {
          uid: result.user.uid,
          name,
          email,
          createdAt: Timestamp.fromDate(new Date()),
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
      }
    } catch (error) {
      if (email && password) {
        switch (error.message) {
          case "Firebase: Error (auth/email-already-in-use).":
            setData({
              ...data,
              error: "Bu e-postaya sahip bir kullanıcı zaten var.",
              loading: false,
            });
            break;
          case "Firebase: Error (auth/invalid-password).":
            setData({
              ...data,
              error: "Geçersiz bir şifre girdiniz.",
              loading: false,
            });
            break;
          case "Firebase: Password should be at least 6 characters (auth/weak-password).":
            setData({
              ...data,
              error: "Şifre en az 6 karakterden oluşmalı.",
              loading: false,
            });
            break;
          default:
            setData({
              ...data,
              error: "Kayıt başarısız.",
              loading: false,
            });
            break;
        }
      }
    }

    setAlert(true);
  };
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setAlert(false);
      }, [3000]);
    }
  }, [error, handleSubmit]);
  return (
    <div className="page">
      <section className="section">
        <h3 className="title">Kayıt Ol</h3>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-container">
            <label htmlFor="name">Ad Soyad</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className="form-container">
            <label htmlFor="email">E-Posta</label>
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

          {error ? alert && <p className="error">{error}</p> : null}
          <div className="btn-container">
            <button type="submit" className="btn">
              {loading ? "Hesap Oluşturuluyor..." : "Kayıt Ol"}
            </button>
          </div>
        </form>
        <div className="goSignIn">
          <p>Zaten bir hesabım var.</p>
          <Link to="/giris-yap" className="span">
            Giriş Yap
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
