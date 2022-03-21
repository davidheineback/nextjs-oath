import React from 'react'
import { NextApiRequest, NextApiResponse } from 'next'

import { withIronSessionSsr } from "iron-session/next";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }: any) {
    req.session.user = 'TAMIM'
    console.log(req.session)
    await req.session.save()
    return {
      props: {
        user: req.session.user
      },
    };
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
  // Show the user. No loading state is required
  return (
    <>
    <h1>Your Profile</h1>
    <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  )
}

export default Profile

