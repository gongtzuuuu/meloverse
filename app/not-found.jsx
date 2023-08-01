import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/solid";

export default function NotFound() {
  return (
    <section className="w-full">
      <h1></h1>
      <h1 className="head_text text-left">
        <span className="blue_gradient">404 - Page Not Found</span>
      </h1>
      <Link href="/">
        {" "}
        <p className="desc text-left inline-flex items-center">
          <HomeIcon width={25} height={25} className="cursor-pointer mr-2" /> Go
          back home
        </p>
      </Link>
    </section>
  );
}
