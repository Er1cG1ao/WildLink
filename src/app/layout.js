import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Wild Link",
  description: "告别动物追踪，以一种全新的\n" +
      "方式与海洋生物建立联系...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
