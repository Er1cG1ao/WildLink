// app/page.js
import { redirect } from "next/navigation";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
      <>
        <Head>
          <link rel="preload" href="/remV1.gif" as="image" type="image/gif" />
          <link rel="preload" href="/remV2.gif" as="image" type="image/gif" />
        </Head>
        <Component {...pageProps} />
      </>
  );
}
export default function Home() {
  redirect("/about");  // Redirecting users from `/` to `/about`
}