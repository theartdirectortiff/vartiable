import Button from "@/components/Button";
import Container from "@/components/container";
import Head from "next/head";

export default function Page() {
  return (
    <Container>
      <Head>
        <title>VART’IABLE | Agence Créative</title>
        <meta
          name="description"
          content="Vart’iable est une agence créative ayant pour mission de soutenir activement la communication des entreprises et de concevoir des expériences clients inspirantes, innovantes et mémorables."
        />
      </Head>
      <section className="h-screen flex flex-col items-center justify-center gap-8">
        <h1 className="dark:text-tournesol text-romance text-5xl text-center md:text-[6vw] uppercase leading-tight font-bold">
          This page does not exist
        </h1>
        <Button>Back to Home</Button>
      </section>
    </Container>
  );
}
