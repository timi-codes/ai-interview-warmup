"use client"
import React from "react";
import Image from "next/image";
import { LayoutList, Bot, Mic, Check } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Webcam from "react-webcam";
import { useWindowSize } from "@uidotdev/usehooks";
import { io, Socket } from 'socket.io-client';

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

    const [session, setSession] = React.useState<UserSession>();
    const [isAnswering, setIsAnswering] = React.useState(false);
    const initializedRef = React.useRef(false);
    const socketRef = React.useRef<Socket | null>(null);
    const [transcripts, setTranscripts] = React.useState<string[]>([]);

    React.useEffect(() => {
        const socket = io('http://0.0.0.0:8000', {
            transports: ["websocket"],
            reconnection: true,
        });
        socketRef.current = socket;

        socketRef.current.on('connect', () => {
            console.log('Connected to server');
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, []);

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

    // const initializeRoom = React.useCallback(async () => {
    //     try {
    //         if (initializedRef.current) return
    //         console.log('Initializing room...');

    //         if (socketRef.current) {
    //             socketRef.current.emit('join', { code: interviewCode });

    //             audioRef.current = new Audio("/assets/join_call.mp3");
    //             await audioRef.current.play()
    //         }

    //     } catch (e) {
    //         console.error('Error initializing room: ', e);
    //     }
    // }, []);

   


    return (
        <main className="flex flex-col h-screen relative px-6 pt-6">
            <div className="flex space-x-6">
                <div className={cn("relative rounded-md box-border overflow-hidden", isAnswering && "border-8")}>
                    <div className="flex items-center absolute text-lg font-bold px-6 py-3 bottom-0">
                        <h1 className="font-bold">David Tejumola</h1>
                        <div className="ml-2">
                            <DotVisualizer />
                        </div>
                    </div>
                    <div className="absolute flex justify-center space-x-2 bottom-0 right-0 items-center rounded-md px-4 py-2 m-3 shadow-sm	bg-black">
                        <Bot size={18} strokeWidth={3} />
                        <h2 className="text-sm font-bold">Judith</h2>
                    </div>
                    <Webcam
                        height={size.height || 0}
                        width={size.width || 0}
                        videoConstraints={{ facingMode: 'user', aspectRatio: ratio }}
                    />
                </div>
                <div className="bg-[#ffffff] rounded-md w-[400px]">
                    <div className="py-2 px-4">
                        <h1 className="text-black font-bold py-2">Transcript</h1>
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

            <div className="flex items-center h-20">
                <h1 className="text-lg">Fullstack Interview Warmup</h1>
                <Button
                    className="absolute space-x-1 flex justify-between items-center text-white px-[24px] py-[10px] rounded-sm left-[40%]"
                    onClick={() => setIsAnswering(!isAnswering)}
                >
    
                    {
                        isAnswering ? <Check size={18} strokeWidth={3} /> : <Mic size={18} strokeWidth={3} /> 
                    }
                    <h2 className="text-sm font-bold">{isAnswering ? "Done" : "Answer"}</h2>
                </Button>
            </div>

        </main>
    );
}
