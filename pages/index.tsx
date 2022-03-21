/* eslint-disable react/jsx-no-comment-textnodes */
import Link from 'next/link';
import React from 'react';
import getGoogleOAuthUrl from '../utils/getGoogleUrl';

function Home () {
  return (
    <div>
      <h1>NEXT JS</h1>
      <Link href={getGoogleOAuthUrl()} passHref>
        <button>
          Login with Google
        </button>
      </Link>
    </div>
  )
}

export default Home
