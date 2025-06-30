import { signIn } from "next-auth/react";
import Image from "next/image";

import { Wallet } from "lucide-react";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-black text-gray-900 flex justify-center">
      <div className="max-w-screen-lg m-0 sm:m-10 bg-zinc-900 shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
              <Wallet className="w-5 h-5 text-slate-900" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Savora
            </span>
          </div>
          <div className="mt-12 flex flex-col items-center text-white">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
            <div className="w-full flex-1 mt-8">
              <div className="flex flex-col items-center">
                <button
                  onClick={() =>
                    signIn("google", { callbackUrl: "/admin/dashboard" })
                  }
                  className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-zinc-950 text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                >
                  <div className="bg-white p-2 rounded-full">
                    <svg className="w-4" viewBox="0 0 533.5 544.3">
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
                  </div>
                  <span className="ml-4">Sign Up with Google</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
            }}
          ></div>
        </div>
      </div>
    </div>
    // <div classNameName="min-h-screen bg-zinc-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    //   <div className="sm:mx-auto sm:w-full sm:max-w-md">
    //     <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-200">
    //       Sign In
    //     </h2>
    //     <p className="mt-2 text-center text-sm text-gray-400 max-w">
    //       Or{" "}
    //       <a
    //         href="#"
    //         className="font-medium text-emerald-400 hover:text-emerald-500"
    //       >
    //         create an account
    //       </a>
    //     </p>
    //   </div>

    //   <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    //     <div className="bg-zinc-900 py-8 px-4 shadow sm:rounded-lg sm:px-10">
    //       <form className="space-y-6" action="#" method="POST">
    //         <div>
    //           <label htmlFor="email" className="block text-sm font-medium tex-">
    //             Email address
    //           </label>
    //           <div className="mt-1">
    //             <input
    //               id="email"
    //               name="email"
    //               type="email"
    //               required
    //               className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-emerald-400 focus:border-emerald-400 focus:z-10 sm:text-sm"
    //               placeholder="Enter your email address"
    //             />
    //           </div>
    //         </div>

    //         <div>
    //           <label
    //             htmlFor="password"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Password
    //           </label>
    //           <div className="mt-1">
    //             <input
    //               id="password"
    //               name="password"
    //               type="password"
    //               required
    //               className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-emerald-400 focus:border-emerald-400 focus:z-10 sm:text-sm"
    //               placeholder="Enter your password"
    //             />
    //           </div>
    //         </div>

    //         <div>
    //           <button
    //             type="submit"
    //             className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-emerald-400 to-cyan-400 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400"
    //           >
    //             Sign in
    //           </button>
    //         </div>
    //       </form>
    //       <div className="mt-6">
    //         <div className="relative">
    //           <div className="absolute inset-0 flex items-center">
    //             <div className="w-full border-t border-gray-300"></div>
    //           </div>
    //           <div className="relative flex justify-center text-sm">
    //             <span className="px-2 bg-gray-100 text-gray-500">
    //               Or continue with
    //             </span>
    //           </div>
    //         </div>

    //         <div className="mt-6 grid grid-cols-3 gap-3">
    //           <div>
    //             <a
    //               href="#"
    //               className="w-full flex items-center justify-center px-8 py-3 rounded-md shadow-sm text-sm font-medium text-white bg-zinc-800 hover:bg-zinc-700"
    //             >
    //               <img
    //                 className="h-5 w-5 invert"
    //                 src="https://www.svgrepo.com/show/512120/facebook-176.svg"
    //                 alt=""
    //               />
    //             </a>
    //           </div>
    //           <div>
    //             <a
    //               href="#"
    //               className="w-full flex items-center justify-center px-8 py-3 rounded-md shadow-sm text-sm font-medium text-white bg-zinc-800 hover:bg-zinc-700"
    //             >
    //               <img
    //                 className="h-5 w-5 filter invert"
    //                 src="https://www.svgrepo.com/show/513008/twitter-154.svg"
    //                 alt=""
    //               />
    //             </a>
    //           </div>
    //           <div>
    //             <button
    //               onClick={() =>
    //                 signIn("google", { callbackUrl: "/admin/dashboard" })
    //               }
    //               className="w-full flex items-center justify-center px-8 py-3 rounded-md shadow-sm text-sm font-medium text-white bg-zinc-800 hover:bg-zinc-700"
    //             >
    //               <Image
    //                 width={24}
    //                 height={24}
    //                 className="h-6 w-6 invert"
    //                 src="https://www.svgrepo.com/show/506498/google.svg"
    //                 alt=""
    //               />
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default LoginPage;
