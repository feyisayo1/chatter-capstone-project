import "./header.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NavbarIcon = () => {
  const openNavBar = () => {
    let navBar = document.getElementById("navicon");
    navBar?.classList.toggle("opennavbar");

    let navContanier = document.getElementsByClassName("nav-container")[0];
    navContanier?.classList.toggle("open-nav-contanier");
  };
  return (
    <section id="navicon" className="navicon" onClick={openNavBar}>
      <span></span>
      <span></span>
      <span></span>
    </section>
  );
};

function Header() {
  useEffect(() => {
    const fade = Array.from(
      document.getElementsByClassName(
        "nav-container"
      ) as HTMLCollectionOf<HTMLElement>
    );

    setTimeout(() => {
      fade[0].style.visibility = "visible";
    }, 1000);
  }, []);
  return (
    <section id="header">
      {/* <h1 className="logo">CHATTER</h1> */}
      <Link to="/" >
          <h1 className="logo">CHATTER</h1>
        </Link>
      <div className="nav-container" style={{ visibility: "hidden" }}>
        {window.screen.width <= 1000 ? <h1 className="logo">CHATTER</h1> : null}

        <nav>
          <Link to="/">Home</Link>
          <a href="/#about">About Us</a>
          <a href="/#contact">Contact</a>
          <Link to="/feeds">Blogs</Link>
        </nav>

        <div className="signin-buttons">
          <Link to='/sign-up'>Log in</Link>
          <Link to='/sign-up'>Sign up</Link>
        </div>
      </div>
      {window.screen.width <= 1000 ? <NavbarIcon /> : null}
    </section>
  );
}

export default Header;
