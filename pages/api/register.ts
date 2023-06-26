import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { email, username, name, password } = req.body;

  const emailExists = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  const usernameExists = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });

  if (emailExists) {
    return res.status(400).json({ error: {email: 'Email already exists'} });
  }

  if (usernameExists) {
    return res.status(400).json({ error: {username: 'Username already exists'} });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      username,
      name,
      hashedPassword,
    }
  });

  return res.status(200).json(user);
}
