import StoryblokClient from "storyblok-js-client";

const Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_API_KEY,
  cv: "1682593162",
  version: "published",
});

async function fetchAPI(query, { variables, preview } = {}) {
  // Storyblok.get("cdn/stories")
  //   .then((response) => {
  //     console.log(response.data);
  //     return response.data;
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // const res = await fetch("https://api.storyblok.com/v2/cdn/stories", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Token: process.env.STORYBLOK_API_KEY,
  //     Version: preview ? "draft" : "published",
  //   },
  //   body: JSON.stringify({
  //     query,
  //     variables,
  //   }),
  // });
  // const json = await res.json();
  // if (json.errors) {
  //   console.error(json.errors);
  //   throw new Error("Failed to fetch API");
  // }
}

export async function getPreviewPostBySlug(slug) {
  const post = await fetchAPI(
    `
  query PostBySlug($slug: ID!) {
    PostItem(id: $slug) {
      slug
    }
  }
  `,
    {
      preview: true,
      variables: {
        slug: `posts/${slug}`,
      },
    }
  );
  return post;
}

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
  const res = await Storyblok.get(`cdn/stories/${page}`, {
    // accessToken: process.env.STORYBLOK_API_KEY,
    // cv: "1682593162",
    // version: "published",
  });
  // .then((response) => {
  //   console.log(response.data);
  //   return response.data;
  // })
  // .catch((error) => {
  //   console.log(error);
  // });
  console.log(res.data.stories);
  return res.data;
}

export async function getAllPosts(preview) {
  const res = await Storyblok.get("cdn/stories", {
    starts_with: "projets/",
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
  const res = await Storyblok.get(`cdn/stories/projets/${slug}`);
  return res.data;
}

export async function getService(slug) {
  const res = await Storyblok.get(`cdn/stories/services/${slug}`);
  return res.data;
}

export async function getPostAndMorePosts(slug, preview) {
  const data = await fetchAPI(
    `
  query PostBySlug($slug: ID!) {
    PostItem(id: $slug) {
      slug
      published_at
      first_published_at
      id
      content {
        long_text
        intro
        title
        image
        author {
          name
          content
        }
      }
    }
    PostItems(per_page: 3, sort_by: "first_published_at:desc") {
      items {
        slug
        published_at
        first_published_at
        content {
          long_text
          intro
          title
          image
          author {
            name
            content
          }
        }
      }
    }
  }
  `,
    {
      preview,
      variables: {
        slug: `posts/${slug}`,
      },
    }
  );

  return {
    post: data?.PostItem,
    morePosts: (data?.PostItems?.items || [])
      .filter((item) => item.slug !== slug)
      .slice(0, 2),
  };
}
