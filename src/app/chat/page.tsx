"use client"
import React from "react";
import Image from "next/image";
import { LayoutList, Video } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Webcam from "react-webcam";
import { useWindowSize } from "@uidotdev/usehooks";

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
import DotVisualizer from "@/components/dot-visualizer";

interface UserSession {
    session_id: string;
    first_name: string;
    last_name: string;
    possible_roles: string[],
    selected_role: string | null
}

type InterviewStyle = 'default' | 'video';

const messages = [
    {
        sender: "Alex",
        isCandidate: true,
        text: "Hello, I am Alex. I am here for the interview.",
    },
    {
        sender: "Interviewer",
        isCandidate: false,
        text: "Hello Alex, I am here to interview you.",
    },
    {
        sender: "Alex",
        isCandidate: true,
        text: "I am ready for the interview.",
    },
    {
        sender: "Interviewer",
        isCandidate: false,
        text: "Great! Let's start.",
    },
    {
        sender: "Alex",
        isCandidate: true,
        text: "Sure.",
    }
]

const videoConstraints = {
    width: 1880,
    height: 1000,
    facingMode: "user"
};


export default function Roles() {


    const router = useRouter();
    const searchParams = useSearchParams()

    const [interviewStyle, setInterviewStyle] = React.useState<InterviewStyle>('default');
    const [session, setSession] = React.useState<UserSession>();
    const size = useWindowSize();
    if (!size.height || !size.width) {
        return null;
    }

    const isLandscape = size.height <= size.width;
    const ratio = isLandscape ? (size.width - 300) / (size.height - 40) : size.height / size.width;

    // React.useEffect(() => {
    //     const session = localStorage.getItem('session');
    //     if (!session) {
    //         router.push('/');
    //     }

    //     const userSession: UserSession = JSON.parse(session ?? '');
    //     setSession({
    //         ...userSession,
    //         selected_role: searchParams.get('role')
    //     });
    // }, []);

    const selectInterviewStyle = (style: InterviewStyle) => {
        setInterviewStyle(style);
    }

    return (
        <main className="flex flex-col h-screen relative px-6 pt-6">
            <div className="flex space-x-6">
                <div className="relative rounded-md box-border overflow-hidden">
                    <div className="flex items-center absolute text-lg font-bold px-6 py-5 bottom-0">
                        <h1>David Tejumola</h1>
                        <div className="ml-2">
                            <DotVisualizer />
                        </div>
                    </div>
                    <Webcam
                        height={size.height || 0}
                        width={size.width || 0}
                        videoConstraints={{ facingMode: 'user', aspectRatio: ratio }}
                    />
                </div>
                <div className="bg-[#ffffff] rounded-md w-[400px]">
                    <div className="py-2 px-4">
                        <h1 className="text-black">Live Transcript</h1>
                    </div>
                    <div>
                        {
                            messages.map((message, index) => (
                                <div key={index} className="flex flex-row">
                                    <div className="flex flex-col">
                                        <p>{message.sender}</p>
                                        <p>{message.text}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="h-10 mt-5">
                <h1 className="text-xl">Fullstack Interview Warmup</h1>
            </div>
        </main>
    );
}
