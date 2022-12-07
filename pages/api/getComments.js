// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { groq } from "next-sanity";
import { sanityClient } from "../../sanity";

const commentQuery = groq`
*[_type == 'comment' && references(*[_type == 'tweet' && _id == $tweetId]._id)] {
  _id,
  ...
} | order(_createdAt desc)
`;

export default async function handler(req, res) {
  const { tweetId } = req.query;

  const comments = await sanityClient.fetch(commentQuery, { tweetId });

  // console.log("Comments are >>>>>", comments);
  res.status(200).json(comments);
}
