import GeminiLogo from '@/../public/gemini.svg';
import { MainButton } from '@/components';

export default function Home() {
  return (
    <div className="w-full h-full justify-center items-center flex flex-col py-10 px-6 md:px-60 gap-4">
      <h1 className="text-[13vw] md:text-[5vw] text-white md:leading-[5.5rem] uppercase text-center">
        <span className="wide-text font-normal text-[10vw] md:text-[4vw] tracking-wider">
          <span className="text-blue-200">Healthy</span> vs{' '}
          <span className="text-rose-200">Toxic</span>
        </span>
        <br />
        <span className="wide-text font-black text-[10vw] md:text-[8vw]">
          Masculinity
        </span>
      </h1>
      <p className="text-lg md:text-xl text-white mb-14 drop-shadow-text text-center">
        Explore meaningful conversation starter cards about healthy
        and toxic masculinity by challenging stereotypes, spark
        dialogue, and foster growth in a safe, judgment-free space.
      </p>
      <MainButton href={'/age'}>Get Started</MainButton>

      <span
        aria-label="Powered by Gemini"
        className="w-auto text-white opacity-80 text-xs absolute bottom-3 left-1/2 transform -translate-x-1/2 p-2 flex flex-row items-center gap-1"
      >
        Powered by <GeminiLogo className="w-16 h-auto -mt-2" />
      </span>
    </div>
  );
}
