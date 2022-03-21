import type { NextApiRequest, NextApiResponse } from 'next'
import { getGoogleOAuthTokens } from '../../../utils/getGoogleAuthTokens';
import { getGoogleUser } from '../../../utils/getGoogleUser';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const code = req.query.code as string;

  try {
    const { id_token, access_token } = await getGoogleOAuthTokens(code)
    console.log({ id_token, access_token });
    const googleUser = await getGoogleUser(id_token, access_token)

    console.log({ googleUser })
    if (!googleUser.verified_email) {
      return res.status(403).send("Google account is not verified");
    }
  } catch (error) {

  }


  res.status(200).json({ name: 'John Google' })
}

export default handler