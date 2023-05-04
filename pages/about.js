import Container from "@/components/container";
import Footer from "@/components/footer";
import { getPage } from "@/lib/api";

export default function About() {
  return (
    <>
      <section className="py-48">
        <Container>
          <h1 className="text-tournesol text-center text-9xl uppercase">
            Our Mission
          </h1>
          <p>
            Our mission is to help you navigate the constantly evolving
            landscape of digital and physical communication. We guide you
            through the ever-evolving landscape of technology and cultural
            changes, empowering you to create a unique and powerful presence in
            the market. Join us in embracing the winds of change and exploring
            the limitless possibilities of the future !
          </p>
        </Container>
      </section>
      <Footer title="Yes" image="yes.jpg" />
    </>
  );
}

// export async function getStaticProps({ preview = null }) {
//   const pageContent = (await getPage("mission", preview)) || [];
//   return {
//     props: { allPosts, pageContent, allServices, preview },
//   };
// }
