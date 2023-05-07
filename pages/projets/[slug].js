import { useRouter } from "next/router";
import Container from "@/components/container";
import { getAllPostsWithSlug, getPost } from "@/lib/api";
import Head from "next/head";

import localFont from "next/font/local";
import Footer from "@/components/footer";
const courierNew = localFont({ src: "../../fonts/courier-new.ttf" });

export default function Post({ post, preview }) {
  const router = useRouter();
  // if (!router.isFallback && !post?.slug) {
  //   return <ErrorPage statusCode={404} />;
  // }
  return (
    <>
      <Head>
        <title>VART’IABLE | Agence Créative</title>
        <meta
          name="description"
          content="Vart’iable est une agence créative ayant pour mission de soutenir activement la communication des entreprises et de concevoir des expériences clients inspirantes, innovantes et mémorables."
        />
      </Head>
      {router.isFallback ? (
        <h1>Loading…</h1>
      ) : (
        <>
          <article>
            <section className="py-48" id="start">
              <Container>
                <h1 className="dark:text-tournesol text-romance text-4xl md:text-[6vw] uppercase leading-tight font-bold">
                  {post.content.ProjectName}
                </h1>
                {/* <pre>{JSON.stringify(post, 0, 4)}</pre> */}
              </Container>
            </section>
            <video
              className="w-screen h-screen object-cover"
              autoPlay
              muted
              playsInline
              loop
              poster={post.content.ProjectThumbnail}
            >
              <source
                src={post.content.ProjectMain.filename}
                type="video/mp4"
              ></source>
            </video>
            <Container>
              <div className="grid gap-12 md:grid-cols-2 sm:grid-cols-1 py-36">
                <div>
                  <span
                    className={`${courierNew.className} uppercase opacity-50 pb-5 block`}
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
              <section className="pb-36">
                <Container>
                  <div className="grid grid-cols-1 gap-12">
                    {post.content.Gallery?.map((item, idx) => (
                      <img
                        className="rounded-md"
                        src={item.filename}
                        alt="SEO"
                      />
                    ))}
                  </div>
                </Container>
              </section>
            </Container>
            <Footer
              title={post.content.FooterSectionTitle}
              cta={post.content.FooterCallToAction}
              image={post.content.FooterSectionImage.filename}
            />
          </article>
          {/* {morePosts.length > 0 && <MoreStories posts={morePosts} />} */}
        </>
      )}
    </>
  );
}

export async function getStaticProps({ params, preview = null, locale }) {
  const data = await getPost(params.slug, locale);
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
