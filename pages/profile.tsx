import React from 'react'
import { NextApiRequest, NextApiResponse } from 'next'

import { withIronSessionSsr } from "iron-session/next";
import { getGoogleOAuthTokens } from '../utils/getGoogleAuthTokens';
import { getGoogleUser } from '../utils/getGoogleUser';

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps ({ req, query }: any): Promise<any> {
    console.log(query.code)
    // const code = req.query.code as string;

    const { id_token, access_token } = await getGoogleOAuthTokens(query.code)
    console.log({ id_token, access_token });
    req.session.accessToken = access_token
    req.session.idToken = id_token
    console.log(req.session)


    try {
      const googleUser = await getGoogleUser(id_token, access_token)
      if (!googleUser.verified_email) {
        return {
          notFound: true
        }
      } else {
        req.session.user = googleUser.name
        await req.session.save()
        return {
          props: {
            user: googleUser.name
          },
        };
      }
    } catch (error) {

    }
  },
  {
    cookieName: "myapp_cookiename",
    password: "complex_password_at_least_32_characters_long",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  },
);

const Profile = ({ user }: any) => {
  console.log('PROFILE')
  // Show the user. No loading state is required
  return (
    <>
      <h1>Your Profile</h1>
      <pre>{user}</pre>
    </>
  )
}

export default Profile

