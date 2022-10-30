import React from "react";
import { getProviders, signIn } from "next-auth/react";

function Login({ providers }: any) {
  return (
    <div className="flex items-center flex-col bg-black min-h-screen justify-center w-full">
      <img className="w-52 m-5" src="/SpotifyLogo.png" alt="Spotify Logo" />
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          <button
            className="bg-[#1AB26B] text-white px-5 py-2 font-semibold rounded-full"
            onClick={() => {
              signIn(provider.id, { callbackUrl: "/" });
            }}
          >
            Login
          </button>
        </div>
      ))}
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
