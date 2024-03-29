import Container from "@/components/container";
import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import { getPage } from "@/lib/api";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

import localFont from "next/font/local";
const scotch = localFont({ src: "../fonts/Scotch.otf" });

export default function Contact({ pageContent }) {
  const [contactForm, setContactForm] = useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();
  const { locale } = router;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setError(
        locale === "fr"
          ? "Veuillez remplir tous les champs"
          : "Please complete all fields"
      );
      return;
    }

    try {
      const res = await fetch("/api/notion-crm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setContactForm(false);
      } else {
        setError(
          locale === "fr" ? "Une erreur est survenue" : "An error occurred"
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <>
      <Head>
        <title>VART’IABLE | Agence Créative</title>
        <meta
          name="description"
          content="Vart’iable est une agence créative ayant pour mission de soutenir activement la communication des entreprises et de concevoir des expériences clients inspirantes, innovantes et mémorables."
        />
        <link rel="icon" href="/images/favicon.png" type="image/png" />
      </Head>
      <div className="top-32 relative">
        <Container>
          <h1
            className={
              scotch.className +
              " dark:text-tournesol text-romance text-center text-[13vw] font-medium  md:text-[8vw] uppercase leading-none"
            }
          >
            {pageContent.story.content.Title}
          </h1>
          <p className="text-center opacity-50">
            {pageContent.story.content.Subtitle}
          </p>
          <div
            className={` text-black dark:text-white grid sm:grid-cols-1 md:grid-cols-3 gap-4 md:gap-32 p-10 opacity-50 uppercase`}
          >
            <div className="flex md:flex-col justify-between">
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
            <div className="flex flex-col md:text-right text-center">
              <Link href="mailto:bonjour@vartiable.com?subject=Bonjour la vie !">
                bonjour@vartiable.com
              </Link>
              <Link href="tel:0791571767">+41791571767</Link>
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              action={() => {
                setContactForm(!contactForm);
                setError(false);
              }}
            >
              {pageContent.story.content.Button}
            </Button>
          </div>
          <motion.div
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
            className="fixed bottom-0 left-0 right-0 dark:bg-white dark:text-midnight text-white bg-midnight m-0 md:m-12 rounded-lg"
          >
            <div className="p-8 flex justify-between items-center">
              <h2 className={`${scotch.className} text-3xl uppercase`}>
                {pageContent.story.content.FormTitle}
              </h2>
              <div className="flex gap-2 items-center">
                <button onClick={() => setContactForm(!contactForm)}>
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
                <button onClick={() => setContactForm(!contactForm)}>
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
            <form
              onSubmit={handleSubmit}
              className="w-full grid grid-cols-1 gap-4 px-8 pb-8"
            >
              <div className="w-full grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={pageContent.story.content.Field1}
                  className="p-4 bg-transparent border border-gray-500 dark:border-midnight"
                />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={pageContent.story.content.Field2}
                  className="p-4 bg-transparent border border-gray-500 dark:border-midnight"
                />
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={pageContent.story.content.Field3}
                className="p-4 bg-transparent border border-gray-500 dark:border-midnight"
              ></textarea>
              <div className="flex justify-end">
                <div className="flex gap-4 items-center">
                  {error ? <span className="text-red-500">{error}</span> : null}
                  <Button>{pageContent.story.content.Button}</Button>
                </div>
              </div>
            </form>
          </motion.div>
        </Container>
      </div>
    </>
  );
}

export async function getStaticProps({ preview = null, locale }) {
  const pageContent = (await getPage("coffee", locale)) || [];
  return {
    props: { pageContent, preview },
  };
}
