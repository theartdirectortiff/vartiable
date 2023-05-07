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
export async function getPage(page, locale) {
  if (locale === "fr") {
    const res = await Storyblok.get(`cdn/stories/${page}`);
    return res.data;
  } else {
    const res = await Storyblok.get(`cdn/stories/${locale}/${page}`);
    return res.data;
  }
}

export async function getAllPosts(locale) {
  if (locale === "fr") {
    const res = await Storyblok.get(`cdn/stories/`, {
      sort_by: "first_published_at:desc",
      starts_with: "projets/",
    });
    return res.data;
  } else {
    const res = await Storyblok.get(`cdn/stories/`, {
      sort_by: "first_published_at:desc",
      starts_with: "en/projets/",
    });
    return res.data;
  }
}

export async function getAllServices(locale) {
  if (locale === "fr") {
    const res = await Storyblok.get(`cdn/stories/`, {
      starts_with: "services/",
    });
    return res.data;
  } else {
    const res = await Storyblok.get(`cdn/stories/`, {
      starts_with: "en/services/",
    });
    return res.data;
  }
}

export async function getPost(slug, locale) {
  if (locale === "fr") {
    const res = await Storyblok.get(`cdn/stories/projets/${slug}`);
    return res.data;
  } else {
    const res = await Storyblok.get(`cdn/stories/${locale}/projets/${slug}`);
    return res.data;
  }
}

export async function getService(slug, locale) {
  if (locale === "fr") {
    const res = await Storyblok.get(`cdn/stories/services/${slug}`);
    return res.data;
  } else {
    const res = await Storyblok.get(`cdn/stories/${locale}/services/${slug}`);
    return res.data;
  }
}
