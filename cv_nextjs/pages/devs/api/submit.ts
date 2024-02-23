import type { NextApiRequest, NextApiResponse } from 'next';

const createItem = async () => {
    return Promise.resolve({ id: 123 })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
//   const data = req.body
  const id = await createItem()

  res.status(200).json({ id })
}