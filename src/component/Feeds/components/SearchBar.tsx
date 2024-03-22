import "../styles/searchbar.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ProfileAdd,
  ProfileTick,
  SearchNormal1,
  NotificationBing,
  CloseCircle,
} from "iconsax-react";

interface props {
  userExist: (data: any) => void;
}

const SearchBar: React.FC<props> = ({ userExist }: any) => {
  let [searchBarElement, setSearchBarElement] = useState<HTMLElement | null>(
    null
  );

  const expandNavBar = () => {
    let navBar = document.getElementById("nav-bar");
    if (navBar) {
      if (window.screen.width <= 500)
        if (navBar.style.animationName !== "nav-slide-in") {
          navBar.style.animation = "nav-slide-in 0.5s forwards ease-out";
        } else if (navBar.style.animationName == "nav-slide-in") {
          navBar.style.animation = "nav-slide-out 0.5s forwards ease-out";
        }
    }
  };

  const Userprofile = () => {
    if (userExist.photoURL !== null) {
      return (
        <div
          style={{
            background: `url(${userExist.photoURL}) no-repeat center`,
            backgroundSize: "cover",
          }}
          onClick={expandNavBar}
        >
          <div></div>
        </div>
      );
    } else {
      return (
        <button style={{ color: "#543ee0" }} onClick={expandNavBar}>
          <ProfileTick />
        </button>
      );
    }
  };

  const SearchBarSlideIn = () => {
    if (searchBarElement) {
      (searchBarElement.firstElementChild as HTMLElement).style.animation =
        "searchbar-side-in ease 0.5s forwards";
      setTimeout(() => {
        if (searchBarElement) {
          (
            searchBarElement.firstElementChild?.children[1] as HTMLElement
          ).focus();
        }
      }, 500);
    }
  };

  const SearchBarSlideout = () => {
    if (searchBarElement) {
      (searchBarElement.firstElementChild as HTMLElement).style.animation =
        "searchbar-side-out ease 0.5s forwards";
    }
  };

  useEffect(() => {
    // this format is to store the searchBar in the useSate of searchBar element so that i can change the animation later on
    const searchBar = document.getElementById("search-bar");
    searchBarElement = searchBar;
    setSearchBarElement(searchBar);

    setTimeout(() => {
      if (searchBarElement) {
        (searchBarElement.firstElementChild as HTMLElement).style.visibility =
          "visible";
      }
    }, 500);
  }, []);

  return (
    <section id="search-bar">
      <form>
        <SearchNormal1 style={{ color: "#543ee0" }} />
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search Chatter"
        />
        <CloseCircle variant="Broken" onClick={SearchBarSlideout} />
      </form>

      <h1>CHATTER</h1>

      <div>
        <NotificationBing />

        {userExist && (
          <button onClick={SearchBarSlideIn}>
            <SearchNormal1 />
          </button>
        )}

        {userExist ? (
          <Userprofile />
        ) : (
          <Link to="/sign-up">
            <ProfileAdd style={{ color: "#c50c0c" }} />
          </Link>
        )}
      </div>
    </section>
  );
};

export default SearchBar;
