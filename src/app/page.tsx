"use client"
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";

export default function Home() {

  const [currentFile, setCurrentFile] = React.useState<File>();
  const [progress, setProgress] = React.useState<number>(0);

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    setCurrentFile(selectedFiles?.[0]);
    setProgress(0);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <div className="flex items-center flex-col">
          <h1 className="text-xl mb-4 font-bold">Interview Warmup</h1>
          <p>A quick way to prepare for your next interview in </p>
          <div className="bg-[rgb(27, 110, 243)]">
            <TypeAnimation
              sequence={['Project Management', 3000, 'Data Analytics', 3000, 'UX Design', 4000, 'Frontend Development', 3000, 'Cyber Security', 4000]}
              deletionSpeed={2}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              style={{ fontSize: '1em', display: 'inline-block' }}
              className="text-accent  text-black bg-white"
            />
          </div>

          <p className="mt-28 w-9/12 text-center">Practice key questions, get insights about your answers, and get more comfortable interviewing.</p>
        </div>

        <div className="flex gap-5 justify-center sm:flex-row w-full">
          <div className="text-center">
            <div
              className="relative rounded-full transition-colors flex items-center justify-center bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            >
              <input accept="application/pdf" type="file" id="file_input" className="opacity-0 absolute top-0 bottom-0 right-0 left-0" onChange={selectFile} />
              <Image
                className="dark:invert"
                src="https://nextjs.org/icons/file.svg"
                alt="Vercel logomark"
                width={15}
                height={15}
                style={{ marginRight: "0.5rem" }}
              />
              Upload Resume
            </div>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PDF (max. 5mb)</p>
          </div>

          {/* <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Start Practising
          </a> */}
        </div>

        {
          currentFile && (
            <p className="text-sm text-center">Uploading Resume: {currentFile.name.slice(0, 40)}...</p>
          )
        }
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
