import Link from 'next/link';
import { MainButton } from '@/components';
import GeminiLogo from '@/../public/gemini.svg';

export default function Home() {
  return (
    <div className="w-full h-full justify-center items-center flex flex-col py-10 px-6 md:px-60 gap-4">
      <h1 className="text-[5vw] text-white leading-[5.5rem] uppercase text-center">
        <span className="special normal-case">Healthy vs Toxic</span>
        <br />
        <span className="wide-text font-black text-[8vw] !mix-blend-difference">
          Masculinity
        </span>
      </h1>
      <p className="text-base md:text-lg text-white mb-14 drop-shadow-text text-center">
        Explore meaningful conversation starter cards about healthy
        and toxic masculinity by challenging stereotypes, spark
        dialogue, and foster growth in a safe, judgment-free space.
      </p>
      <Link href={'/age'}>
        <MainButton>Get Started</MainButton>
      </Link>

      <span
        aria-label="Powered by Gemini"
        className="w-auto text-white opacity-80 text-xs absolute bottom-3 left-1/2 transform -translate-x-1/2 p-2 flex flex-row items-center gap-1"
      >
        Powered by <GeminiLogo className="w-16 h-auto -mt-2" />
      </span>
    </div>
  );
}
