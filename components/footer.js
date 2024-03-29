import Link from "next/link";
import Container from "./container";

import localFont from "next/font/local";
import Button from "./Button";
const courierNew = localFont({ src: "../fonts/courier-new.ttf" });
const scotch = localFont({ src: "../fonts/Scotch.otf" });

export default function Footer({ title, image, cta }) {
  return (
    <footer className="bg-[#1a1a1a] rounded-tl-xl rounded-tr-xl">
      <Container>
        <div
          className={`${courierNew.className} text-white hidden md:grid  sm:grid-cols-1 md:grid-cols-3 gap-8 md:gap-32 p-10 opacity-50 uppercase`}
        >
          <div className="flex flex-col">
            <Link target="_blank" href="https://www.instagram.com/vartiable/">
              Instagram
            </Link>
            <Link
              target="_blank"
              href="https://www.linkedin.com/company/vart-iable-agence-cr%C3%A9ative/"
            >
              LinkedIn
            </Link>
            <Link
              target="_blank"
              href="https://open.spotify.com/show/4UumbBYNRVlD0lkUbE9ALM?si=172df12d71854836"
            >
              Spotify
            </Link>
          </div>
          <span className="md:text-center">
            Rte de la Fonderie 2, 1700 Fribourg
          </span>
          <div className="flex flex-col md:text-right">
            <Link href="mailto:bonjour@vartiable.com?subject=Bonjour la vie !">
              bonjour@vartiable.com
            </Link>
            <Link href="tel:0791571767">+41791571767</Link>
          </div>
        </div>
        <div className="my-20">
          <h3
            className={
              scotch.className +
              " pt-20 md:pt-0 text-white text-center text-[13vw] font-medium  md:text-[8vw] uppercase leading-none"
            }
          >
            {title}
          </h3>
        </div>
        <div className="w-4/5 md:w-2/4 h-96 m-auto mt-10 rounded-tl-3xl rounded-tr-3xl overflow-hidden relative flex justify-center">
          <img
            src={image}
            alt=""
            className="w-full h-full grayscale object-cover"
          />
          <div className="absolute bottom-10">
            <Button href="/coffee">{cta}</Button>
          </div>
        </div>
      </Container>
    </footer>
  );
}
