import { signIn } from "next-auth/react";
import { Wallet } from "lucide-react";
import Head from "next/head";
import Image from "next/image";

const LoginPage = () => {
  return (
    <>
      {" "}
      <Head>
        <title>Login - Savora Finance</title>
        <meta
          name="description"
          content="Login to your Savora Finance account"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800">
        <div className="w-full max-w-4xl bg-zinc-900 rounded-2xl shadow-2xl flex overflow-hidden">
          {/* Left Side */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg">
                <Wallet className="w-6 h-6 text-zinc-900" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent tracking-wide">
                Savora
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-zinc-400 mb-8 text-center">
              Sign in to your account to continue managing your finances.
            </p>
            <button
              onClick={() =>
                signIn("google", { callbackUrl: "/admin/dashboard" })
              }
              className="w-full max-w-xs flex items-center justify-center gap-3 py-3 px-6 rounded-lg bg-gradient-to-r from-emerald-400 to-cyan-400 text-zinc-900 font-semibold shadow-lg hover:scale-105 transition-transform"
            >
              <svg className="w-5 h-5" viewBox="0 0 533.5 544.3">
                <path
                  d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                  fill="#4285f4"
                />
                <path
                  d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                  fill="#34a853"
                />
                <path
                  d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                  fill="#fbbc04"
                />
                <path
                  d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                  fill="#ea4335"
                />
              </svg>
              <span>Sign in with Google</span>
            </button>
            {/* <div className="mt-8 w-full max-w-xs">
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-zinc-700" />
            <span className="mx-3 text-zinc-500 text-sm">or</span>
            <div className="flex-grow h-px bg-zinc-700" />
          </div>
          <form className="space-y-5">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              autoComplete="email"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              autoComplete="current-password"
            />
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-gradient-to-r from-emerald-400 to-cyan-400 text-zinc-900 font-bold shadow hover:scale-105 transition-transform"
            >
              Sign in
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-zinc-400">
            Don't have an account?{" "}
            <a href="#" className="text-emerald-400 hover:underline">
              Sign up
            </a>
          </p>
        </div> */}
          </div>
          {/* Right Side */}
          <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-emerald-400/20 via-cyan-400/10 to-indigo-400/10 items-center justify-center">
            <Image
              src="https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg"
              alt="Finance Illustration"
              className="w-4/5 max-w-md mx-auto"
              width={50}
              height={50}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
