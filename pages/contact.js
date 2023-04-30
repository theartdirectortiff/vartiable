import Container from "@/components/container";

export default function Contact() {
  return (
    <section className="py-48">
      <Container>
        <h1 className="text-tournesol text-center text-9xl uppercase">
          TOUCH THE COFE
        </h1>
        <p className="text-center opacity-50">
          To discover why its cool to drink a coffee with us
        </p>
        <form className="fixed bottom-0 left-0 right-0 bg-gray-900 m-12 p-12">
          <h2>Claim your coffee time</h2>
          <div className="w-full grid grid-cols-1 gap-12">
            <div className="w-full grid grid-cols-2 gap-12">
              <input type="text" placeholder="Name" className="p-4" />
              <input type="text" placeholder="Name" className="p-4" />
            </div>
            <textarea placeholder="Message" className="p-4"></textarea>
            <button>Send</button>
          </div>
        </form>
      </Container>
    </section>
  );
}
