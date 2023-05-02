import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "@/components/container";
import PostBody from "@/components/post-body";
import MoreStories from "@/components/more-stories";
import Header from "@/components/header";
import PostHeader from "@/components/post-header";
import SectionSeparator from "@/components/section-separator";
import { getAllPostsWithSlug, getPost, getPostAndMorePosts } from "@/lib/api";
import PostTitle from "@/components/post-title";
import Head from "next/head";
import { CMS_NAME } from "@/lib/constants";
import RichTextResolver from "storyblok-js-client/dist/richTextResolver";

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
            <section className="py-48">
              <Container>
                <h1 className="text-tournesol text-6xl uppercase">
                  {post.content.ProjectName}
                </h1>
              </Container>
            </section>
            <img
              className="w-screen h-screen object-cover"
              src={post.content.ProjectThumbnail}
            />
            <Container>
              <div className="grid gap-12 md:grid-cols-2 sm:grid-cols-1 py-36">
                <div>
                  <span
                    className={`${courierNew.className} uppercase opacity-50`}
                  >
                    Description
                  </span>
                  <p>{post.content.ProjectDescription}</p>
                </div>
                <div>
                  <div className="flex justify-between -mt-[1px] p-4 border-y border-y-gray-600">
                    <span
                      className={`${courierNew.className} uppercase opacity-50`}
                    >
                      Client
                    </span>
                    <p>{post.content.Client}</p>
                  </div>
                  <div className="flex justify-between -mt-[1px] p-4 border-y border-y-gray-600">
                    <span
                      className={`${courierNew.className} uppercase opacity-50`}
                    >
                      Service
                    </span>
                    <p>{post.content.Service}</p>
                  </div>
                  <div className="flex justify-between -mt-[1px] p-4 border-y border-y-gray-600">
                    <span
                      className={`${courierNew.className} uppercase opacity-50`}
                    >
                      Year
                    </span>
                    <p>{post.content.Year}</p>
                  </div>
                  <div className="flex justify-between -mt-[1px] p-4 border-y border-y-gray-600">
                    <span
                      className={`${courierNew.className} uppercase opacity-50`}
                    >
                      Place
                    </span>
                    <p>{post.content.Place}</p>
                  </div>
                </div>
              </div>
            </Container>
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
                <h1 className="text-black text-center font-semibold text-[5vw] uppercase leading-tight  w-5/6 m-auto">
                  {post.content.FooterSectionTitle}
                </h1>
                <div className="w-2/4 m-auto mt-10 rounded-tl-3xl rounded-tr-3xl overflow-hidden relative flex justify-center">
                  <img
                    src={post.content.FooterSectionImage.filename}
                    alt=""
                    className="w-full h-80 object-cover grayscale"
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
          {/* {morePosts.length > 0 && <MoreStories posts={morePosts} />} */}
        </>
      )}
    </>
  );
}

export async function getStaticProps({ params, preview = null }) {
  const data = await getPost(params.slug);
  console.log("data: ", data);

  return {
    props: {
      preview,
      post: { ...data.story },
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();
  return {
    paths: allPosts?.map((post) => `/projets/${post.slug}`) || [],
    fallback: true,
  };
}
