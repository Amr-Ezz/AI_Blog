'use client'
import { signin, signInWithGoogle } from '../../lib/auth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { AiFillGoogleCircle, AiFillApple, AiFillTwitterSquare } from 'react-icons/ai';


const Signup = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
         await signin(email, password);
         alert('Signup Successfull')
        } catch (error) {
            console.log('error in signIn', error)
        }
    }
    const handleGoogleLogin = async () => {
        try {
          await signInWithGoogle();
          alert("Signup Successful");
        } catch (error: any) {
          if (error.code === "auth/popup-closed-by-user") {
            console.log("Google popup was closed by the user");
          } else {
            console.error("Error regarding Google login", error);
            alert("Google login failed: " + error.message);
          }
        }
      };

  return (
<>
      <div>
        <h1>Sign Up</h1>
      </div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-sm bg-gradient-to-b from-white to-gray-100 rounded-xl p-6 border-4 border-white shadow-xl m-6">
          <div className="text-center font-extrabold text-3xl text-blue-500">
            Sign Up
          </div>
          <form action="" className="mt-6" onSubmit={handleLogin}>
          <input
              required
              className="w-full bg-white border-none py-3 px-5 rounded-xl mt-4 shadow-sm focus:outline-none focus:border-blue-300 placeholder-gray-400"
              type="name"
              name="username"
              id="username"
              placeholder="User Name"
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              required
              className="w-full bg-white border-none py-3 px-5 rounded-xl mt-4 shadow-sm focus:outline-none focus:border-blue-300 placeholder-gray-400"
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              required
              className="w-full bg-white border-none py-3 px-5 rounded-xl mt-4 shadow-sm focus:outline-none focus:border-blue-300 placeholder-gray-400"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <span className="block mt-2 ml-2 text-xs text-blue-500 hover:underline">
              <a href="#">Forgot Password ?</a>
            </span> */}
            <input
              className="block w-full font-bold bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 mt-5 rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border-none"
              type="submit"
              value="Sign Up"
            />
          </form>
          <div className="mt-6">
            <span className="block text-center text-xs text-gray-400">
              Or Sign in with
            </span>
            <div className="flex justify-center gap-4 mt-2">
              <button className="bg-gradient-to-br from-black to-gray-600 border-4 border-white p-2 rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:scale-110 active:scale-90 transition-all duration-200" onClick={handleGoogleLogin}>
                <AiFillGoogleCircle className="text-white text-2xl" />
              </button>
              <button className="bg-gradient-to-br from-black to-gray-600 border-4 border-white p-2 rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:scale-110 active:scale-90 transition-all duration-200">
                <AiFillApple className="text-white text-2xl" />
              </button>
              <button className="bg-gradient-to-br from-black to-gray-600 border-4 border-white p-2 rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:scale-110 active:scale-90 transition-all duration-200">
                <AiFillTwitterSquare className="text-white text-2xl" />
              </button>
            </div>
          </div>
          <span className="block text-center mt-4 text-xs text-blue-500 hover:underline">
            <a href="#">Learn user licence agreement</a>
          </span>
        </div>
      </div>
    </>
  )
}

export default Signup