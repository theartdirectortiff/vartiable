import Container from "@/components/container";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Button from "@/components/Button";
import { getPage } from "@/lib/api";
import Link from "next/link";

export default function Contact({ pageContent }) {
  const [contactForm, setContactForm] = useState(false);
  const objRef = useRef(false);

  return (
    <>
      <div className="top-48 relative">
        <Container>
          <h1 className="text-tournesol text-center text-[5vw] uppercase leading-tight">
            {pageContent.story.content.Title}
          </h1>
          <p className="text-center opacity-50">
            {pageContent.story.content.Subtitle}
          </p>
          <div
            className={`text-midnight dark:text-white grid  sm:grid-cols-1 md:grid-cols-3 sm:gap-12 md:gap-32 p-10 opacity-50 uppercase`}
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
            <span className="text-center">
              Rte de la Fonderie 2, 1700 Fribourg
            </span>
            <div className="flex flex-col text-right">
              <Link href="mailto:bonjour@vartiable.com?subject=Bonjour la vie !">
                bonjour@vartiable.com
              </Link>
              <Link href="tel:0791571767">0791571767</Link>
            </div>
          </div>
          <div className="flex justify-center">
            <Button action={() => setContactForm(!contactForm)}>
              PLANIFIER SON CAFÉ
            </Button>
          </div>
          <motion.form
            animate={contactForm ? "open" : "closed"}
            initial="closed"
            variants={{
              open: {
                y: 0,
                transition: {
                  animationDelay: 1,
                  type: "tween",
                  ease: [0.4, 0, 0.2, 1],
                },
              },
              closed: {
                y: "100vh",
                transition: {
                  type: "tween",
                  ease: [0.4, 0, 0.2, 1],
                },
              },
            }}
            className="fixed bottom-0 left-0 right-0 dark:bg-white dark:text-midnight text-white bg-midnight m-0 md:m-12 border border-midnight"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="border-b border-midnight p-8 flex justify-between items-center">
              <h2 className="text-3xl uppercase">Claim your coffee time</h2>
              <div className="flex gap-2">
                <button>
                  <svg width="25" height="25" viewBox="0 0 52 52" fill="none">
                    <path
                      d="M0 0.257812H51.4839V51.7417H0V0.257812Z"
                      fill="white"
                    />
                    <path
                      d="M0 0.257812V-1.09703H-1.35484V0.257812H0ZM51.4839 0.257812H52.8387V-1.09703H51.4839V0.257812ZM51.4839 51.7417V57.161H52.8387V51.7417H51.4839ZM0 51.7417H-1.35484V57.161H0V51.7417ZM0 1.61265H51.4839V-1.09703H0V1.61265ZM50.129 0.257812V51.7417H52.8387V0.257812H50.129ZM51.4839 46.3223H0V57.161H51.4839V46.3223ZM1.35484 51.7417V0.257812H-1.35484V51.7417H1.35484Z"
                      fill="#101010"
                      mask="url(#path-1-inside-1_159_414)"
                    />
                    <path
                      d="M12.8711 36.1602H38.613"
                      stroke="#101010"
                      stroke-width="4.06452"
                    />
                  </svg>
                </button>
                <button>
                  <svg width="25" height="25" viewBox="0 0 52 52" fill="none">
                    <path
                      d="M0.257812 0.257812H51.7417V51.7417H0.257812V0.257812Z"
                      fill="white"
                    />
                    <path
                      d="M0.257812 0.257812V-1.09703H-1.09703V0.257812H0.257812ZM51.7417 0.257812H53.0965V-1.09703H51.7417V0.257812ZM51.7417 51.7417V57.161H53.0965V51.7417H51.7417ZM0.257812 51.7417H-1.09703V57.161H0.257812V51.7417ZM0.257812 1.61265H51.7417V-1.09703H0.257812V1.61265ZM50.3868 0.257812V51.7417H53.0965V0.257812H50.3868ZM51.7417 46.3223H0.257812V57.161H51.7417V46.3223ZM1.61265 51.7417V0.257812H-1.09703V51.7417H1.61265Z"
                      fill="#101010"
                      mask="url(#path-1-inside-1_159_411)"
                    />
                    <rect
                      x="15.1612"
                      y="14.4854"
                      width="21.6774"
                      height="21.6774"
                      fill="white"
                      stroke="#101010"
                      stroke-width="4.06452"
                    />
                  </svg>
                </button>
                <button onClick={() => setContactForm(!contactForm)}>
                  <svg width="25" height="25" viewBox="0 0 52 52" fill="none">
                    <path
                      d="M0.515625 0.257812H51.9995V51.7417H0.515625V0.257812Z"
                      fill="white"
                    />
                    <path
                      d="M0.515625 0.257812V-1.09703H-0.839214V0.257812H0.515625ZM51.9995 0.257812H53.3543V-1.09703H51.9995V0.257812ZM51.9995 51.7417V57.161H53.3543V51.7417H51.9995ZM0.515625 51.7417H-0.839214V57.161H0.515625V51.7417ZM0.515625 1.61265H51.9995V-1.09703H0.515625V1.61265ZM50.6447 0.257812V51.7417H53.3543V0.257812H50.6447ZM51.9995 46.3223H0.515625V57.161H51.9995V46.3223ZM1.87046 51.7417V0.257812H-0.839214V51.7417H1.87046Z"
                      fill="#101010"
                      mask="url(#path-1-inside-1_159_417)"
                    />
                    <path
                      d="M16.7734 34.7148L34.9757 16.5125"
                      stroke="#101010"
                      stroke-width="4.06452"
                    />
                    <path
                      d="M17.0684 16.8086L35.2707 35.0109"
                      stroke="#101010"
                      stroke-width="4.06452"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="w-full grid grid-cols-1 gap-4 p-8">
              <div className="w-full grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="p-4 bg-transparent border border-midnight"
                />
                <input
                  type="text"
                  placeholder="Name"
                  className="p-4 bg-transparent border border-midnight"
                />
              </div>
              <textarea
                placeholder="Message"
                className="p-4 bg-transparent border border-midnight"
              ></textarea>
              <div className="flex justify-end">
                <Button>Send</Button>
              </div>
            </div>
          </motion.form>
        </Container>
      </div>
    </>
  );
}

export async function getStaticProps({ preview = null }) {
  const pageContent = (await getPage("coffee", preview)) || [];
  return {
    props: { pageContent, preview },
  };
}
