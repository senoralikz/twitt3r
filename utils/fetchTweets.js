export const fetchTweets = async () => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/getTweets`
        );

        const data = await res.json();
        const tweets = data.tweets;
        return tweets;
    } catch (error) {
        console.error("error getting tweets:", error);
    }
};
