'use client'

import Image from "next/image";
import { useState, useReducer, useEffect } from "react";
import { NylasSessions, useNylasSessions } from "@nylas/identity";

export default function Home() {
  const [authUrl, setAuthUrl] = useState('');
  const [grantId, setGrantId] = useState(null);
  const [session, setSession] = useState(null);

  console.log('grantId', { grantId })

  useEffect(() => {
    const session = new NylasSessions({
      clientId: "<NYLAS_CLIENT_ID>",
      redirectUri:	"http://localhost:3000",
      hosted: true,
      domain: "https://api.us.nylas.com/v3",
    });

    // TODO: Try to remove function some state
    setSession(session);
    
    const getAuthLink = async () => {
      const link = await session.auth({
        provider: "google",
        loginHint: "<EMAIL>",
      }) as string;
      setAuthUrl(link);
    }

    getAuthLink();

    session.onLoginSuccess(({ detail }) => {
      console.log('onLoginSuccess', {detail});
      setGrantId(detail.grant_id);
    });

    session.onLoginFail((event) => {
      console.log('onLoginFail', {event});
    });

    const getUserDetails = async () => {
      const email = await session.isLoggedIn();
      console.log('email', {email});

      if(email) {
        const profile = await session.getProfile();
        console.log('profile', {profile})
        // TODO: Sub refers to grant Id
        setGrantId(profile.sub);
      }
    }

    session.onLogoutSuccess((event) => {
      console.log('onLogoutSuccess', {event});
    });

    getUserDetails();
  }, [])

  const startAuthFlow = () => {
    location.assign(authUrl)
  };

  const disconnectUser = () => {
    // TODO: Try to remove function some state
    session?.logout();

    localStorage.clear();
    setGrantId(null);

    // TODO: Need to find workaround to reset session, PKCE value
    location.reload();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started, Connect!&nbsp;
          {/* <code className="font-mono font-bold">src/app/page.tsx</code> */}
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://www.nylas.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            💙{" "}Nylas{" "}
            {/* <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            /> */}
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <h1 className={`mb-3 text-4xl font-semibold`}>
          {!grantId ? 'Connect to generate user grant' : 'User connected!!'}
        </h1>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <h1 className={`mb-3 text-4xl font-semibold`}>
          {!!grantId && `grantId: ${grantId}`}
        </h1>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          rel="noopener noreferrer"
          onClick={!!grantId ? disconnectUser : startAuthFlow}
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            {!grantId ? "Connect" : "Logout"}{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            {!grantId && 'Try Nylas'}
          </p>
        </a>
      </div>
    </main>
  );
}
