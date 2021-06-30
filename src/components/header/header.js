import React from 'react';
import {useTranslation} from "react-i18next";
import "../../i18n";
import './header.css';

const Header = () => {

  const {t, i18n} = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
  }

  return (
    <div className="app-header d-flex header-flex">
      <h1 className="title">{t("title")}</h1>
      <div className="lang-buttons">
        <button type="button" className="btn btn-outline-light" onClick={() => changeLanguage("en")}>EU</button>
        <button type="button" className="btn btn-outline-light" onClick={() => changeLanguage("ru")}>RU</button>
        <button type="button" className="btn btn-outline-light" onClick={() => changeLanguage("ua")}>UA</button>
      </div>
    </div>
  );
};

export default Header;