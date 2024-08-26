import NavLink from "../components/NavLInk";
import logo from "../assets/cucumber_logo.png";
import places from "../assets/planet.png";
import characters from "../assets/chars.png";

export const Navbar = () => {
  return (
    <div className="navbar bg-primary text-primary-content flex justify-between items-center px-3">
      <NavLink
        href="/"
        src={logo}
        width={30}
        height={50}
        alt="Rick_the-Cucumber_logo_home_button"
        label="Sweet Home"
      />

      <div className="flex space-x-5">
        <NavLink
          href="/places"
          src={places}
          width={40}
          height={50}
          alt="Places_button"
          label="Places"
        />

        <NavLink
          href="/heroes"
          src={characters}
          width={40}
          height={50}
          alt="Characters_button"
          label="Heroes"
        />
      </div>
    </div>
  );
};
