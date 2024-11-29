import Link from 'next/link';
import { MainButton } from '.';
import GeminiLogo from '@/../public/gemini.svg';

export default function Welcome() {
  return (
    <div className="w-12/12 h-full flex items-center justify-center flex-col py-16 px-6 md:px-32 gap-4">
      <h1 className="text-6xl md:text-7xl font-bold text-white drop-shadow-text text-center">
        Healthy vs. Toxic Masculinity
      </h1>
      <p className="text-base md:text-lg text-white mb-14 drop-shadow-text text-center">
        Explore meaningful conversation starter cards about healthy
        and toxic masculinity by challenging stereotypes, spark
        dialogue, and foster growth in a safe, judgment-free space.
        Start building a more authentic and inclusive masculinity
        today!
      </p>
      <Link href={'/choice'}>
        <MainButton>Get Started</MainButton>
      </Link>

      <span className="w-auto text-white opacity-80 text-xs absolute bottom-3 left-1/2 transform -translate-x-1/2 p-2 flex flex-row items-center gap-1">
        Powered by <GeminiLogo className="w-16 h-auto -mt-2" />
      </span>
    </div>
  );
}
