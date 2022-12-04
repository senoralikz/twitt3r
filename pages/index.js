import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>twitt3r</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <Sidebar />
        {/* feed */}

        {/* widgets */}
      </main>
    </div>
  );
}
