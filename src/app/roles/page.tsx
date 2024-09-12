"use client"
import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react"
import { Label } from "@/components/ui/label"
import { useRouter, useSearchParams } from "next/navigation";

interface UserSession {
  session_id: string;
  first_name: string;
  last_name: string;
  possible_roles: string[]
}

export default function Roles() {
  const router = useRouter();
  const searchParams = useSearchParams()

  const [roles, setRoles] = React.useState<string[]>();

  const session_id = searchParams.get('session_id')

  React.useEffect(() => { 
    const session = localStorage.getItem('session');
    if (!session) {
      router.push('/')
    }

    const userSession: UserSession = JSON.parse(session ?? '');
    setRoles(userSession.possible_roles)

  }, []);

  const selectRole = (role: string) => {
    router.push(`/ready?session_id=${session_id}&role=${role}`);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center ">

        <div className="flex items-center flex-col">
          <h1 className="text-xl mb-4 font-bold">What role do you what to practice for?</h1>

          <div className="mt-6">
            {
              roles?.map((role) => (
                <button
                  key={role}
                  className="flex justify-between bg-[#1a1a1a] hover:opacity-60 py-4 px-4 my-3 rounded-md w-full"
                  onClick={()=>selectRole(role)}
                >
                  <Label>{role}</Label>
                  <ChevronRight size={16} className="ml-6"/>
                </button>
              ))
            }
          </div>
        </div>

      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/github.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Github
        </a>
      </footer>
    </div>
  );
}
