'use client';

export default function MainButton({ className, children, ...rest }) {
  return (
    <button
      className={`${className} min-h-14 bg-opacity-60 text-white py-3 px-9 rounded-full border-transparent border border-white hover:border-2 hover:shadow-[0px_0px_15px_3px_rgba(255,255,224,0.8)] transition-all duration-300
      disabled:bg-gray-400 disabled:pointer-events-none disabled:cursor-not-allowed disabled:shadow-none disabled:hover:border-transparent disabled:text-gray-200 
      `}
      {...rest}
    >
      {children}
    </button>
  );
}
