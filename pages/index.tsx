import Link from 'next/link';
import React from 'react';
import getGoogleOAuthURL from '../utils/getGoogleURL';
import { withIronSessionSsr } from "iron-session/next";


export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps ({ req }: any) {
    return {
      props: {
        user: req.session.user || 'DAVID'
      },
    };
  }, {
  cookieName: "myapp_cookiename",
  password: "complex_password_at_least_32_characters_long",
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
}
)

function Home ({ user }: any) {
  return (
    <div>
      <h1>INDEX PAGE</h1>
      <div>{user}</div>
      <Link href={getGoogleOAuthURL()} passHref>
        <button>
          Log in with Google
        </button>
      </Link>
    </div>
  )
}

export default Home
