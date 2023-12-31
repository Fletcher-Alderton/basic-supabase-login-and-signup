"use client"

import { useEffect, useState } from "react"
import supabase from "./ultils/supabaseClient"


export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | undefined>();
  useEffect(() => {
    const getUser = async () => {
      const user = await supabase.auth.getUser();
      console.log("user", user)
      if (user) {
        const userId = user.data.user?.id;
        setIsAuthenticated(true);
        setUserId(userId)
      }
    };

    getUser()
  }, [])
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}