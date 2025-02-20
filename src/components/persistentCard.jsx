'use client';

import { Card } from '@/components';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PersistentCard() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (pathname === '/card') {
      setTimeout(() => {
        setIsVisible(true);
      }, 400);
    }
  }, [pathname]);

  return (
    <div
      className={`w-full h-full fixed transition-opacity duration-500 ${
        isVisible
          ? 'opacity-100 pointer-events-auto z-0'
          : 'opacity-0 pointer-events-none -z-10'
      }`}
    >
      <Card />
    </div>
  );
}
