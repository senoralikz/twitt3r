import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Widgets from "../components/Widgets";
import { fetchTweets } from "../utils/fetchTweets.js";
import { Toaster } from "react-hot-toast";

export default function Home({ tweets }) {
    // console.log(tweets);
    return (
        <div className="lg:max-w-6xl mx-auto max-h-screen overflow-hidden">
            <Head>
                <title>twitt3r</title>
                <link rel="icon" href="/twitt3r-icon.png" />
            </Head>

            <Toaster />

            <main className="grid grid-cols-9">
                <Sidebar />
                <Feed tweets={tweets} />
                <Widgets />
            </main>
        </div>
    );
}

export const getServerSideProps = async (context) => {
    const tweets = await fetchTweets();

    return {
        props: {
            tweets,
        },
    };
};
