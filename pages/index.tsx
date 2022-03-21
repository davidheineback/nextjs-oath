import Link from 'next/link';
import React from 'react';
import getGoogleOAuthURL from '../utils/getGoogleURL';

function Home() {
  return (
    <div>
      <h1>NEXT JS</h1>
      <Link href={getGoogleOAuthURL()} passHref>
        <button>
          Log in with Google
        </button>
      </Link>
      
    </div>
  )
}

export default Home
