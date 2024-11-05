import { useEffect, useRef, useState } from "react";
import MainEffect from "./components/MainEffect";
import Image from "next/image";
import Head from "next/head";

const songListLength = 2;

export default function Home() {
  const [currentSong, setCurrentSong] = useState<number>(0);
  const audioRef = useRef(null);

  async function tryUntilSuccess(fn: () => Promise<void>, interval: number) {
    try {
      await fn();
    } catch {
      setTimeout(() => tryUntilSuccess(fn, interval), interval);
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      // @ts-expect-error -- IGNORE
      audioRef.current.onended = () => {
        setCurrentSong((currentSong + 1) % songListLength);
        // @ts-expect-error -- IGNORE
        audioRef.current.src = `/assets/audio/${currentSong}.mp3`;
        
        // @ts-expect-error -- IGNORE
        tryUntilSuccess(() => audioRef.current.play(), 1000);
      }
      
      // @ts-expect-error -- IGNORE
      tryUntilSuccess(() => audioRef.current.play(), 1000);
    }
  }, []);

  return (
    <div>
      <Head>
        <title>EIGEN - LABS</title>
      </Head>
      <audio ref={audioRef} src="/assets/audio/0.mp3" autoPlay />
      <main className="flex flex-col items-center">
        <header className="flex flex-col items-center justify-center">
          <div className="absolute w-full h-full">
            <Image
              style={{
                opacity: 0.5,
                filter: 'brightness(0.4) blur(5px) grayscale(0.5)',
              }}
              src="/assets/bg2.png"
              alt="bg"
              layout="fill"
              objectFit="cover"
              quality={100}
            />
          </div>
          <div className="absolute w-full flex flex-col items-center justify-center z-20">
            <div className="absolute w-full flex flex-col items-center justify-center">
              <h1 className="text-6xl lg:text-9xl font-extrabold text-center shadow-3" style={{ letterSpacing: '20px' }}>EIGEN LABS</h1>
              <h1 className="absolute text-6xl lg:text-9xl font-extrabold text-center shadow-2" style={{ letterSpacing: '20px' }}>EIGEN LABS</h1>
              <h1 className="absolute text-6xl lg:text-9xl font-extrabold text-center shadow-1" style={{ letterSpacing: '20px' }}>EIGEN LABS</h1>
            </div>
            <h3 className="absolute top-1/4 text-lg md:text-2xl lg:text-3xl font-normal pt-32" style={{ textShadow: '2px 2px 4px black' }}>
              Controllable, Secure, Accurate Agents
            </h3>
          </div>
          <MainEffect className="z-10 opacity-40" />
        </header>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}
