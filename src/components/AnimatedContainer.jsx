'use client';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useContext, useRef } from 'react';

function FrozenRouter({ children }) {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;

  if (!context) {
    return children;
  }

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

export default function AnimatedContainer({ children }) {
  const pathname = usePathname();
  return (
    <>
      <AnimatePresence mode={'wait'} initial={false}>
        <motion.div
          key={pathname}
          className="flex items-center justify-center size-full min-h-dvh z-10 relative transform-gpu"
          initial={{
            opacity: 0,
            y: '5%',
            filter: 'blur(10px)',
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
              duration: 0.6,
              ease: 'easeOut',
            },
          }}
          exit={{
            opacity: 0,
            y: '-5%',
            filter: 'blur(10px)',
            transition: {
              duration: 0.6,
              ease: 'easeIn',
            },
          }}
        >
          <FrozenRouter>{children}</FrozenRouter>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
