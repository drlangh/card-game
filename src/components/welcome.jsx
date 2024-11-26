import Link from 'next/link';
import { MainButton } from '.';
import GeminiLogo from '@/../public/gemini.svg';

export default function Welcome() {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col p-16 gap-2">
      <h1 className="text-6xl md:text-7xl font-bold text-white drop-shadow-text text-center">
        Cards Against Domestic Violence
      </h1>
      <p className="text-lg text-white mb-14 drop-shadow-text">
        Domestic Violence Awareness Cards
      </p>
      <Link href={'/choice'}>
        <MainButton>Get Started</MainButton>
      </Link>

      <span className="w-auto text-white opacity-80 text-xs absolute bottom-5 left-1/2 transform -translate-x-1/2 p-2 flex flex-row items-center gap-1">
        Powered by <GeminiLogo className="w-16 h-auto -mt-2" />
      </span>
    </div>
  );
}
