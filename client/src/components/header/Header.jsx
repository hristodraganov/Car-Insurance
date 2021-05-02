import React, { useState, useContext } from "react";
import { LanguageContext } from "../../Context/LanguageContext/LanguageContext";
import "./Header.css";
import { Link } from "react-router-dom";
import translate from "../../i18n/translate";

const Header = () => {
  const [langCheck, setLangCheck] = useState(false);
  const [checked, setChecked] = useState(false);
  //eslint-disable-next-line
  const [language, setLanguage] = useContext(LanguageContext);
  const [selectedLanguage, setSelectedLanguage] = useState(
    "https://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg"
  );
  //eslint-disable-next-line
  const handleCheck = () => {
    setChecked(!checked);
  };

  return (
    <header className="header">
      <h1 className="logo">
        <Link to="/">{translate("Home")}</Link>
      </h1>

      <input className="menu-btn" type="checkbox" id="menu-btn" />
      <label className="menu-icon" htmlFor="menu-btn">
        <span className="navicon"></span>
      </label>
      <div className="lang-options">
        <div className="selected-lang" onClick={() => setLangCheck(!langCheck)}>
          <img
            style={{ width: "32px", height: "32px" }}
            className="selected-lang-icon"
            alt=""
            src={selectedLanguage}
          ></img>
        </div>
        {langCheck ? (
          <ul>
            <li>
              <img
                style={{ width: "32px", height: "32px" }}
                src="https://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg"
                alt=""
                onClick={() => {
                  setLanguage("en");
                  setLangCheck(!langCheck);
                  setSelectedLanguage(
                    "https://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg"
                  );
                }}
              ></img>
            </li>
            <li>
              <img
                style={{ width: "32px", height: "32px" }}
                src="https://purecatamphetamine.github.io/country-flag-icons/3x2/BG.svg"
                alt=""
                onClick={() => {
                  setLanguage("bg");
                  setLangCheck(!langCheck);
                  setSelectedLanguage(
                    "https://purecatamphetamine.github.io/country-flag-icons/3x2/BG.svg"
                  );
                }}
              ></img>
            </li>
          </ul>
        ) : null}
      </div>
      <ul className="menu">
        <li>
          <Link to="/tpli">{translate("L.I.")}</Link>
        </li>
        <li>
          <Link to="/ci">{translate("C.I.")}</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
