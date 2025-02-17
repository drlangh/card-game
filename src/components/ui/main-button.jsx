'use client';

import Link from 'next/link';

function CustomLink({ href, className, disabled, children }) {
  if (!href) {
    return children;
  }

  return (
    <Link
      href={disabled ? '' : href}
      className={`size-full ${className} ${disabled && 'pointer-events-none'}`}
    >
      {children}
    </Link>
  );
}

export default function MainButton({
  href,
  linkClassName,
  className,
  children,
  disabled,
  onClick,
}) {
  return (
    <button
      className={`${className} bg-opacity-60 text-white py-3 px-9 rounded-full border-sty border-transparent border border-white
          hover:border-opacity-100 hover:shadow-[0px_0px_15px_3px_rgba(255,255,224,0.8)] transition-all duration-300 hover:bg-white hover:bg-opacity-20
          disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:border disabled:bg-transparent disabled:text-gray-200 
          `}
      disabled={disabled}
      onClick={onClick}
    >
      <CustomLink
        href={href}
        className={linkClassName}
        disabled={disabled}
      >
        {children}
      </CustomLink>
    </button>
  );
}
