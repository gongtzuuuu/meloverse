import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/favicon.png";
import SearchBar from "@components/SearchBar";
import SignInButton from "./SignInButton";

const Nav = async () => {
  const session = await getServerSession(authOptions);
  let toggleDropdown = false;

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      {/* --------- */}
      {/* Logo Area */}
      {/* --------- */}
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src={logo}
          alt="meloverse Logo"
          width={45}
          height={45}
          className="object-contain rounded-full"
        />
        <p className="logo_text black_gradient">meloverse</p>
      </Link>
      {/* --------------- */}
      {/* Navigation Area */}
      {/* --------------- */}
      <div className="flex gap-3 md:gap-5 relative">
        {session && session.user && (
          <>
            {/* --- Profile Picture --- */}
            <Link href={`/profile/${session?.user.id}`}>
              <Image
                src={session?.user.image}
                alt="profile"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
            {/* --- Search Button --- */}
            {/*<button className="outline_btn">Search</button>*/}
            {/* --- Search Bar --- */}
            {/*<SearchBar toggleDropdown={toggleDropdown} />*/}
          </>
        )}
        {/* --- Logout Button --- */}
        <SignInButton />
      </div>
    </nav>
  );
};

export default Nav;
