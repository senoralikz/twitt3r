// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { sanityClient } from "../../sanity";
import { groq } from "next-sanity";

const feedQuery = groq`
*[_type == 'tweet' && !blockTweet] {
  _id,
  ...
} | order(_createdAt desc)
`;

export default async function handler(req, res) {
  const tweets = await sanityClient.fetch(feedQuery);
  console.log(tweets);
  res.status(200).json({ tweets });
}
