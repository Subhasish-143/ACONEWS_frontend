import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Countries from './Countries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  const [active, setActive] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [theme, setTheme] = useState("light-theme");
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === "light-theme" ? "dark-theme" : "light-theme");
  }

  let categories = [
    "general", 
    "world", 
    "nation", 
    "business", 
    "technology", 
    "entertainment", 
    "sports", 
    "science", 
    "health"
  ];

  function handleSearch() {
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
    }
  }

  return (
    <header>
      <nav className="fixed top-0 left-0 w-full h-auto bg-gray-800 z-10 flex items-center justify-around px-4 py-2">
        <Link to="/">
            <h3 className="relative heading font-bold text-2xl text-white">
            ACONEWS
            </h3>
        </Link>

        <ul className={active ? "nav-ul flex gap-8 items-center md:justify-end active" : "nav-ul flex gap-8 items-center md:justify-end"}>
          <li className="flex items-center space-x-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
            />
            <button
              onClick={handleSearch}
              className="bg-[#4666FF88] text-white font-semibold rounded-lg px-4 py-2 hover:border-2 hover:border-[#3355DD] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out shadow-lg"
            >
              Search
            </button>
          </li>

          <li className="dropdown-li">
            <Link className="no-underline font-semibold text-white flex items-center gap-2" onClick={() => { setShowCategoryDropdown(!showCategoryDropdown); setShowCountryDropdown(false); }}>
              Top-Headlines 
              <FontAwesomeIcon className={showCategoryDropdown ? "down-arrow-icon down-arrow-icon-active" : "down-arrow-icon"} icon={faCircleArrowDown} />
            </Link>
            <ul className={showCategoryDropdown ? "dropdown p-2 show-dropdown bg-gray-700" : "dropdown p-2 bg-gray-700"}>
              {categories.map((category, index) => (
                <li key={index} onClick={() => setShowCategoryDropdown(false)}>
                  <Link to={"/top-headlines/" + category} className="flex gap-3 text-white hover:bg-gray-600 p-2 rounded-md capitalize">
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          <li className="dropdown-li">
            <Link className="no-underline font-semibold text-white flex items-center gap-2" onClick={() => { setShowCountryDropdown(!showCountryDropdown); setShowCategoryDropdown(false); }}>
              Country 
              <FontAwesomeIcon className={showCountryDropdown ? "down-arrow-icon down-arrow-icon-active" : "down-arrow-icon"} icon={faCircleArrowDown} />
            </Link>
            <ul className={showCountryDropdown ? "dropdown p-2 show-dropdown bg-gray-700" : "dropdown p-2 bg-gray-700"}>
              {Countries.map((element, index) => (
                <li key={index} onClick={() => setShowCountryDropdown(false)}>
                  <Link to={"/country/" + element?.iso_2_alpha} className="flex gap-3 text-white hover:bg-gray-600 p-2 rounded-md">
                    <img src={`https://flagcdn.com/32x24/${element?.iso_2_alpha}.png`} alt={element?.countryName} />
                    <span>{element?.countryName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          <li>
            <Link className="no-underline font-semibold text-white" to="#" onClick={toggleTheme}>
            <Link className="no-underline font-semibold text-white" to="#" onClick={toggleTheme}>
              <span className="flex items-center cursor-pointer">
                <FontAwesomeIcon icon={theme === "light-theme" ? "faMoon" : "faSun"} className="mr-2" />
                {theme === "light-theme" ? "Dark Mode" : "Light Mode"}
              </span>
            </Link>
            </Link>
          </li>
        </ul>

        <div className={active ? "ham-burger z-index-100 ham-open" : "ham-burger z-index-100"} onClick={() => setActive(!active)}>
          <span className="lines line-1"></span>
          <span className="lines line-2"></span>
          <span className="lines line-3"></span>
        </div>
      </nav>
    </header>
  );
}
