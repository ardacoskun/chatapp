import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="error-page">
      <div className="error-container">
        <h1 className="error-logo">404</h1>
        <h3 className="error-heading">Aradığınız sayfa bulunamadı :(</h3>
        <p className="error-homepage">
          Buradan
          <Link to="/" className="span-error">
            <span> anasayfaya </span>
          </Link>
          dönebilirsiniz.
        </p>
      </div>
    </div>
  );
};

export default Error;
