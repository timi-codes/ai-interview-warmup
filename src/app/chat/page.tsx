"use client"
import React from "react";
import Image from "next/image";
import { LayoutList, Bot, Mic, Check, BriefcaseIcon, BriefcaseBusiness } from "lucide-react"
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

type Role = "assistant" | "candidate";
interface Transcript {
    role: Role;
    text: string;
}


export default function Roles() {
    const router = useRouter();
    const searchParams = useSearchParams()

    const [session, setSession] = React.useState<UserSession>();
    const [isAnswering, setIsAnswering] = React.useState(false);
    const initializedRef = React.useRef(false);
    const socketRef = React.useRef<Socket | null>(null);
    const [transcripts, setTranscripts] = React.useState<Transcript[]>([]);

    const initializeRoom = React.useCallback(async () => {
        if (initializedRef.current) return;
        
        const session_id = searchParams.get('session_id');

        try {
            socketRef.current?.emit('join', { session_id: session_id });
        } catch (e) {
            console.error('Error initializing room: ', e);
        }
    }, []);

    React.useEffect(() => {
        console.log('Setting up socket connection');
        const socket = io(process.env.NEXT_PUBLIC_API_URL ?? 'http://0.0.0.0:8000', {
            transports: ["websocket"],
            reconnection: true,
        });
        socketRef.current = socket;

        socketRef.current.on('connect', () => {
            console.log('Connected to server');
            initializeRoom();
            initializedRef.current = true;
        });

        socketRef.current.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        socketRef.current.on('chat', (data) => {
            console.log('Received chat event:', data);
            setTranscripts(prevTranscripts => [...prevTranscripts, {
                role: data.role as Role,
                text: data.transcript
            }]);
        });

        // Debug: Log all incoming events
        socketRef.current.onAny((eventName, ...args) => {
            console.log(`Received event: ${eventName}`, args);
        });

        return () => {
            if (socketRef.current) {
                console.log('Cleaning up socket connection');
                socketRef.current.disconnect();
            }
        };
    }, [initializeRoom]);



    const size = useWindowSize();
    if (!size.height || !size.width) {
        return null;
    }

    const isLandscape = size.height <= size.width;
    const ratio = isLandscape ? (size.width - 400) / (size.height - 70) : size.height / size.width;

   


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
                <div className="bg-[#ffffff] rounded-md w-[500px] overflow-hidden">
                    <div className="py-2 px-4 bg-[#eeee]">
                        <h1 className="text-black font-bold py-2">Live Transcript</h1>
                    </div>
                    <div className="px-4 mt-4">
                        {
                            transcripts.map((message, index) => (
                                <div key={index} className="flex flex-row">
                                    <div className="flex flex-col text-black">
                                        <h3 className={cn("mt-2 text-sm font-bold", message.role === "assistant" ? "text-left" : "text-right")}>
                                            {message.role === "assistant" ? "Judith" : "You"}
                                        </h3>
                                        <div className={cn("flex py-0 px-3 py-2 max-w-[90%] rounded-b-xl", message.role === "assistant" ? "justify-start bg-[#f9eebd] rounded-tl-none rounded-tr-xl" : "justify-end bg-[#eeeeee] rounded-tl-xl rounded-tr-none")}>
                                            <p className="text-[13px] font-medium">{message.text}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className="flex items-center h-20">
                <div className="flex items-center space-x-2 opacity-70">
                    <BriefcaseBusiness size={18} strokeWidth={2} />
                    <h1 className="text-lg font-thin">Fullstack Interview Warmup</h1>
                </div>
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
