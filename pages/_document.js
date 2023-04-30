import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html suppressHydrationWarning lang="en">
      <Head />
      <body className="dark:bg-midnight dark:text-white w-screen overflow-x-hidden bg-white text-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
