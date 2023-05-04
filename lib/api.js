import StoryblokClient from "storyblok-js-client";

const Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_API_KEY,
  cv: "1682593162",
  version: "published",
});

export async function getAllPostsWithSlug() {
  const data = await Storyblok.get("cdn/stories", {
    starts_with: "projets/",
  });
  console.log([...data?.data.stories.map((stry) => stry.slug)]);
  // return data?.data.stories;
}

export async function getAllServicesWithSlug() {
  const data = await Storyblok.get("cdn/stories", {
    starts_with: "services/",
  });
  console.log([...data?.data.stories.map((stry) => stry.slug)]);
  // return data?.data.stories;
}
export async function getPage(page, preview) {
  const res = await Storyblok.get(`cdn/stories/${page}`);
  console.log(res.data.stories);
  return res.data;
}

export async function getAllPosts(preview) {
  const res = await Storyblok.get("cdn/stories", {
    starts_with: "projets/",
    sort_by: "first_published_at:desc",
  });
  return res.data;
}

export async function getAllServices(preview) {
  const res = await Storyblok.get("cdn/stories", {
    starts_with: "services/",
  });
  return res.data;
}

export async function getPost(slug) {
  const res = await Storyblok.get(`cdn/stories/en/projets/${slug}`);
  return res.data;
}

export async function getService(slug) {
  const res = await Storyblok.get(`cdn/stories/services/${slug}`);
  return res.data;
}
