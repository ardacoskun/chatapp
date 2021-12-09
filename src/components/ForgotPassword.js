import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    loading: false,
    error: null,
    check: null,
  });
  const { email, error, check, loading } = data;

  const [alert, setAlert] = useState(true);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setData({ ...data, error: null, check: null, loading: true });
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setData({
          error: null,
          check: "Şifre yenileme e-Postası gönderildi.",
        });
      })
      .catch((error) => {
        error &&
          setData({
            ...data,
            email: "",
            error: "Şifre yenileme e-Postası gönderilemedi.",
            check: null,
          });
      });
    setAlert(true);
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setAlert(false);
      }, [3000]);
    }
  }, [error, handleForgotPassword]);

  useEffect(() => {
    if (check) {
      setTimeout(() => {
        setAlert(false);
      }, [3000]);
    }
  }, [check, handleForgotPassword]);

  return (
    <div className="page">
      <section className="section">
        <h3 className="title">Şifremi Unuttum</h3>
        <form className="form" onSubmit={handleForgotPassword}>
          <div className="form-container">
            <label htmlFor="email">E-Posta</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          {check ? alert && <p className="check">{check}</p> : null}
          {error ? alert && <p className="error">{error}</p> : null}
          <div className="btn-container">
            <button type="submit" className="btn">
              Şifre Değiştir
            </button>
          </div>
        </form>
        <div className="goSignIn">
          <Link to="/giris-yap" className="span">
            Giriş Yap
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
