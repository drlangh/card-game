import Link from 'next/link';
import { IoMdArrowBack } from 'react-icons/io';

export default function BackArrow({ href, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="hover:bg-opacity-20 absolute left-6 md:left-16 top-12 md:top-20 p-2 rounded-full border-2 border-transparent hover:border-white hover:shadow-[0px_0px_15px_3px_rgba(255,255,224,0.8)] transition-all duration-300"
    >
      <IoMdArrowBack color="white" size={24} strokeWidth={20} />
    </Link>
  );
}
