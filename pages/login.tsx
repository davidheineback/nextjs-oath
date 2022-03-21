import Link from 'next/link';
import React from 'react';
import getGoogleOAuthURL from '../utils/getGoogleURL';

function Login () {
  return (
    <div>
      <h1>LOGIN PAGE</h1>
      <Link href={getGoogleOAuthURL()} passHref>
        <button>
          Log in with Google
        </button>
      </Link>
    </div>
  )
}

export default Login
