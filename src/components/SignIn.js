import React, { useState, useEffect } from "react";
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

  const { email, password, error, loading } = data;

  const [alert, setAlert] = useState(true);

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
      if (email && password) {
        switch (error.message) {
          case "Firebase: Error (auth/user-not-found).":
            setData({
              ...data,
              error:
                "Lütfen e-postanızı ve parolanızı kontrol edip yeniden deneyin.",
              loading: false,
            });
            break;
          case "Firebase: Error (auth/wrong-password).":
            setData({
              ...data,
              error: "Hatalı bir şifre girdiniz.",
              loading: false,
            });
            break;
          default:
            setData({
              ...data,
              error: "Giriş başarısız.",
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
        <h3 className="title">Giriş Yap</h3>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-container">
            <label htmlFor="email">Eposta</label>
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
