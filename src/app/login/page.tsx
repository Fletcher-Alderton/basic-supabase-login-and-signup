"use client"

import { useRouter } from 'next/navigation'
import { useState } from "react";
import supabase from "../ultils/supabaseClient";

export default function Login() {
    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();
    const router = useRouter();

    async function SingInWithEmail() {
        try {
            if (email && password) {
                const resp = await supabase.auth.signInWithPassword({
                    email: email,
                    password: password,
                });
                if (resp.error) throw resp.error;
                const userID = resp.data.user?.id;
                router.push("/")
            }
        } catch { }
    }
    return (
        <div>
            <div className="flex flex-col w-full items-center">
                <label htmlFor="email" className="text-gray-700">
                    Email
                    <span className="text-red-500 required-dot">
                        *
                    </span>
                </label>
                <input
                    type="text"
                    id="email"
                    className="px-4 py-2 text-base text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    name="email"
                    placeholder="Your email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="flex flex-col w-full items-center mt-4">
                <label htmlFor="password" className="text-gray-700">
                    Password
                    <span className="text-red-500 required-dot">
                        *
                    </span>
                </label>
                <input
                    type="password"
                    id="password"
                    className="px-4 py-2 text-base text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    name="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="flex flex-col w-full items-center mt-4">
                <button
                    type="button"
                    className="py-2 px-4 flex justify-center items-center  bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                    onClick={SingInWithEmail}
                >
                    Login
                </button>
            </div>
        </div>
    );
}
