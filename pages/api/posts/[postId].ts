import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";

/**
 * Asynchronous function that handles a GET request to retrieve a post and its
 * associated data from the database, specified by postId. Returns a JSON object
 * containing the post and its comments, sorted by creation date in descending
 * order. If postId is not provided or not a string, or if any other errors occur,
 * returns a status 400 error code.
 *
 * @param {NextApiRequest} req - the incoming request object
 * @param {NextApiResponse} res - the outgoing response object
 * @return {Promise<void>} - a Promise that resolves with the response object
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { postId } = req.query;

    if (!postId || typeof postId !== 'string') {
      throw new Error('Invalid ID');
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
      },
    });

    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
