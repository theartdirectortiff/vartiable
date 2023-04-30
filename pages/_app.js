import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import Navigation from "@/components/Navigation";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider defaultTheme="dark">
      <Navigation />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
