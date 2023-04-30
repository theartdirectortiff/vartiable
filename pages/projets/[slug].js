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
            <img src={post.content.ProjectThumbnail} />
            <Container>
              <div className="grid gap-12 md:grid-cols-2 sm:grid-cols-1 py-36">
                <p>{post.content.ProjectDescription}</p>
                <div>
                  <div className="flex justify-between -mt-[1px] p-4 border-y border-y-gray-500">
                    <span>Client</span>
                    <p>{post.content.Client}</p>
                  </div>
                  <div className="flex justify-between -mt-[1px] p-4 border-y border-y-gray-500">
                    <span>Service</span>
                    <p>{post.content.Service}</p>
                  </div>
                  <div className="flex justify-between -mt-[1px] p-4 border-y border-y-gray-500">
                    <span>Year</span>
                    <p>{post.content.Year}</p>
                  </div>
                  <div className="flex justify-between -mt-[1px] p-4 border-y border-y-gray-500">
                    <span>Place</span>
                    <p>{post.content.Place}</p>
                  </div>
                </div>
              </div>
            </Container>
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
