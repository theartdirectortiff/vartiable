import { useRouter } from "next/router";
import Container from "@/components/container";
import { getAllServicesWithSlug, getService } from "@/lib/api";
import Head from "next/head";
import { CMS_NAME } from "@/lib/constants";

import localFont from "next/font/local";
import Link from "next/link";
const courierNew = localFont({ src: "../../fonts/courier-new.ttf" });

export default function Post({ post, preview }) {
  const router = useRouter();
  // if (!router.isFallback && !post?.slug) {
  //   return <ErrorPage statusCode={404} />;
  // }
  return (
    <>
      {router.isFallback ? (
        <h1>Loading…</h1>
      ) : (
        <>
          <article>
            <Head>
              <title>
                {post.content.title} | Next.js Blog Example with {CMS_NAME}
              </title>
              <meta property="og:image" content={post.content.image} />
            </Head>
            <section className="h-screen">
              <Container>
                <div className="flex flex-col justify-between h-screen py-32">
                  <h1 className="dark:text-tournesol text-romance text-[6vw] uppercase leading-tight font-bold">
                    {post.content.Title}
                  </h1>
                  <div className="grid gap-12 md:grid-cols-2 sm:grid-cols-1">
                    <span>Explore</span>
                    <p>{post.content.Lead}</p>
                  </div>
                </div>
              </Container>
            </section>
            <video
              className="w-screen h-screen object-cover"
              autoPlay
              muted
              playsInline
              loop
            >
              <source
                src={post.content.Thumbnail.filename}
                type="video/mp4"
              ></source>
            </video>
            <section className="py-32">
              <Container>
                <div className="grid gap-12 md:grid-cols-2 sm:grid-cols-1 py-36">
                  <h2 className="text-romance dark:text-tournesol text-6xl uppercase">
                    Our purpose
                  </h2>
                  <div>
                    <p>{post.content.Description}</p>
                  </div>
                </div>
              </Container>
            </section>
            {/* <pre>{JSON.stringify(post, 0, 4)}</pre> */}
            <footer className="bg-tournesol rounded-tl-xl rounded-tr-xl">
              <Container>
                <div
                  className={`${courierNew.className} text-black grid  sm:grid-cols-1 md:grid-cols-3 sm:gap-12 md:gap-32 p-10 opacity-50 uppercase`}
                >
                  <div className="flex flex-col">
                    <span>Instagram</span>
                    <span>LinkedIn</span>
                    <span>Spotify</span>
                  </div>
                  <span className="text-center">
                    Rte de la Fonderie 2, 1700 Fribourg
                  </span>
                  <div className="flex flex-col text-right">
                    <span>bonjour@vartiable.com</span>
                    <span>0791571767</span>
                  </div>
                </div>
                <h1 className="text-black text-center font-semibold text-[5vw] uppercase leading-tight w-5/6 m-auto">
                  {post.content.FooterSectionTitle}
                </h1>
                <div className="w-2/4 m-auto mt-10 rounded-tl-3xl rounded-tr-3xl overflow-hidden relative flex justify-center">
                  <img
                    src={post.content.FooterSectionImage.filename}
                    alt=""
                    className="w-full grayscale"
                  />
                  <Link
                    className="absolute bottom-10 px-4 py-1 bg-white text-midnight rounded-full"
                    href="/contact"
                  >
                    Let's have a chat!
                  </Link>
                </div>
              </Container>
            </footer>
          </article>
        </>
      )}
    </>
  );
}

export async function getStaticProps({ params, preview = null }) {
  const data = await getService(params.slug);
  console.log("data: ", data);

  return {
    props: {
      preview,
      post: { ...data.story },
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllServicesWithSlug();
  return {
    paths: allPosts?.map((post) => `/services/${post.slug}`) || [],
    fallback: true,
  };
}
