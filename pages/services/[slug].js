import { useRouter } from "next/router";
import Container from "@/components/container";
import { getAllServicesWithSlug, getService } from "@/lib/api";
import Head from "next/head";
import { CMS_NAME } from "@/lib/constants";

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
                  <h1 className="text-tournesol text-6xl uppercase">
                    {post.content.Title}
                  </h1>
                  <div className="flex justify-between">
                    <span>Explore</span>
                    <p>
                      We create marketing campaigns that bridge the gap between
                      your business and potential customers.{" "}
                    </p>
                  </div>
                </div>
              </Container>
            </section>
            <img src={post.content.Thumbnail.filename} />
            <section className="py-32">
              <Container>
                <div className="grid gap-12 md:grid-cols-2 sm:grid-cols-1 py-36">
                  <h2 className="text-tournesol text-6xl uppercase">
                    Our purpose
                  </h2>
                  <div>
                    <p>{post.content.Description}</p>
                  </div>
                </div>
              </Container>
            </section>
            {/* <pre>{JSON.stringify(post, 0, 4)}</pre> */}
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
