import { useRouter } from "next/router";
import Container from "@/components/container";
import { getAllServicesWithSlug, getService } from "@/lib/api";
import Head from "next/head";

import Footer from "@/components/footer";

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
            <section className="h-screen">
              <Container>
                <div className="flex flex-col justify-between h-screen py-32">
                  <h1 className="dark:text-tournesol text-romance text-4xl md:text-[6vw] uppercase leading-tight font-bold">
                    {post.content.Title}
                  </h1>
                  <div className="grid gap-12 md:grid-cols-2 sm:grid-cols-1">
                    <span className="hidden md:block">Explore</span>
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
            <Footer
              title={post.content.FooterSectionTitle}
              cta={post.content.FooterCallToAction}
              image={post.content.FooterSectionImage.filename}
            />
          </article>
        </>
      )}
    </>
  );
}

export async function getStaticProps({ params, preview = null, locale }) {
  const data = await getService(params.slug, locale);
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
