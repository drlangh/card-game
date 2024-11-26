'use client';

export default function MainButton({ className, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`${className} bg-blue-600 bg-opacity-60 hover:border-white text-white py-3 px-9 rounded-full hover:border-2 border-transparent hover:shadow-[0px_0px_15px_3px_rgba(255,255,224,0.8)] transition-all duration-300`}
    >
      {children}
    </button>
  );
}
