"use client"
import React from "react";
import Image from "next/image";
import { LayoutList, Video } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils";

interface UserSession {
  session_id: string;
  first_name: string;
  last_name: string;
  possible_roles: string[],
  selected_role: string | null
}

type InterviewStyle = 'default' | 'video';

export default function Roles() {
  const router = useRouter();
  const searchParams = useSearchParams()

  const [interviewStyle, setInterviewStyle] = React.useState<InterviewStyle>('default');
  const [session, setSession] = React.useState<UserSession>();

  React.useEffect(() => { 
    const session = localStorage.getItem('session');
    if (!session) {
      router.push('/')
    }

    const userSession: UserSession = JSON.parse(session ?? '');
    setSession({
      ...userSession,
      selected_role: searchParams.get('role')
    })
  }, [router]);

  const selectInterviewStyle = (style: InterviewStyle) => { 
    setInterviewStyle(style);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center ">

        <div className="flex items-center flex-col">

          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Interview Warmup</CardTitle>
              <CardDescription className="text-xs">You will be asked a set of questions which will cover your background, behavioral and technical skills depending on your role.</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-0.3">
                    <Label htmlFor="name" className="text-xs font-semibold">Name</Label>
                    <p className="text-sm">{session?.first_name} {session?.last_name}</p>
                  </div>
                  <div className="flex flex-col space-y-0.3">
                    <Label htmlFor="role" className="text-xs font-semibold">Role</Label>
                    <p className="text-sm">{session?.selected_role}</p>
                  </div>
                  <div className="flex flex-col space-y-4">
                    <Label htmlFor="role" className="text-xs font-semibold">Select Interview Style</Label>
                    <div className="space-x-4">

                      <Button
                        onClick={() => selectInterviewStyle("default")}
                        className={cn("group hover:bg-[#1a1a1a] flex-col place-items-center border-2 hover:border-[#1a1a1a] bg-transparent w-20 h-20 rounded-md text-black shadow-none space-y-2", interviewStyle === 'default' && 'border-[#1a1a1a] bg-[#1a1a1a]')}
                      >
                        <LayoutList size={16} className={cn("group-hover:text-white", interviewStyle === 'default' && 'text-white')} />
                        <Label className={cn("text-xs group-hover:text-white", interviewStyle === 'default' && 'text-white')}>Default</Label>
                      </Button>

                      <Button
                        onClick={() => selectInterviewStyle("video")}
                        className={cn("group hover:bg-[#1a1a1a] flex-col place-items-center border-2 hover:border-[#1a1a1a] bg-transparent w-20 h-20 rounded-md text-black shadow-none space-y-2", interviewStyle === 'video' && 'border-[#1a1a1a] bg-[#1a1a1a]')}
                      >
                        <Video size={16} className={cn("group-hover:text-white", interviewStyle === 'video' && 'text-white')} />
                        <Label className={cn("text-xs group-hover:text-white", interviewStyle === 'video' && 'text-white')}>Video</Label>
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button className="w-full h-14">Start</Button> 
            </CardFooter>
          </Card>
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
