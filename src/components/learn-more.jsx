'use client';

import useInformationStore from '@/stores/InformationStore';
import { useCallback, useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { RxExternalLink } from 'react-icons/rx';
import { getMoreInformation } from '@/api/gemini';
import ReactMarkdown from 'react-markdown';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const LINK =
  'https://prism.ucalgary.ca/server/api/core/bitstreams/f6a4c80d-ed62-4d95-af18-af5dd3207a82/content';

export default function LearnMorePopup({
  cardData,
  onClose,
  setLearnMoreInfo,
  learnMoreInfo,
  file,
  showPopup,
}) {
  const { age, category } = useInformationStore();

  const [rotatingText, setRotatingText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const loadingTexts = [
    'Preparing your information...',
    'Gathering insights...',
    'Fetching details...',
    'Compiling data...',
    'Almost there...',
  ];

  const fetchMoreInformation = useCallback(async () => {
    try {
      const content = await getMoreInformation(
        cardData,
        age,
        category,
        file
      );
      setLearnMoreInfo(content);
    } catch (error) {
      toast.error(
        'Error generating more information. Please try again.'
      );
      onClose();
    }
  }, [cardData, age, category, file, onClose, setLearnMoreInfo]);

  useEffect(() => {
    if (learnMoreInfo) return;

    fetchMoreInformation();
  }, [learnMoreInfo, fetchMoreInformation]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex(
        (prevIndex) => (prevIndex + 1) % loadingTexts.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setRotatingText(loadingTexts[textIndex]);
  }, [textIndex]);

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 200,
          }}
          onClick={onClose}
          className="fixed top-0 left-0 right-0 w-full h-full bg-black/45 z-50 overflow-hidden"
        >
          <motion.div
            initial={{
              y: '100%',
            }}
            animate={{
              y: '10%',
            }}
            exit={{
              y: '100%',
            }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 200,
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="relative bottom-0 left-0 right-0 w-full h-[100vh] text-[#2D2D53] bg-[#babcda] 
                     overflow-y-auto overflow-x-hidden shadow-2xl p-9 md:px-20 md:py-10 rounded-3xl"
          >
            <button
              className="sticky top-4 -mr-7 float-right "
              onClick={onClose}
            >
              <IoClose size={24} />
            </button>
            <h2 className="wide-text text-left clear-right text-3xl w-7/12 md:text-5xl">
              Learn More of this Card
            </h2>

            <div className="p-6 bg-violet-200 rounded-2xl my-10 text-base md:text-lg">
              {cardData}
            </div>
            <AnimatePresence mode="wait">
              {learnMoreInfo ? (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="mb-24"
                >
                  <div className="mb-10 prose prose-sm max-w-none text-base md:text-lg">
                    <ReactMarkdown className="whitespace-pre-wrap">
                      {learnMoreInfo}
                    </ReactMarkdown>
                  </div>
                  <Link
                    href={LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:opacity-70 text-base md:text-lg"
                  >
                    <RxExternalLink
                      size={20}
                      className="inline-block -mt-1 mr-2"
                    />
                    Dozois, E., & Wells, L. (2020). Changing contexts:
                    A framework for engaging male-oriented settings in
                    gender equality and violence prevention –
                    Practitioners’ guide. Calgary, AB: The University
                    of Calgary, Shift: The Project to End Domestic
                    Violence.
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className=" animate-pulse"
                >
                  <div className="mb-10 space-y-4">
                    <div className="relative h-4 bg-[#2D2D53]/50 rounded w-full overflow-hidden">
                      <div className="absolute inset-0 shimmer" />
                    </div>
                    <div className="relative h-4 bg-[#2D2D53]/50 rounded w-11/12 overflow-hidden">
                      <div className="absolute inset-0 shimmer" />
                    </div>
                    <div className="relative h-4 bg-[#2D2D53]/50 rounded w-10/12 overflow-hidden">
                      <div className="absolute inset-0 shimmer" />
                    </div>
                    <div className="relative h-4 bg-[#2D2D53]/50 rounded w-full overflow-hidden">
                      <div className="absolute inset-0 shimmer" />
                    </div>
                    <div className="relative h-4 bg-[#2D2D53]/50 rounded w-9/12 overflow-hidden">
                      <div className="absolute inset-0 shimmer" />
                    </div>
                  </div>

                  <div className="mb-10 space-y-4">
                    <div className="relative h-4 bg-[#2D2D53]/50 rounded w-full overflow-hidden">
                      <div className="absolute inset-0 shimmer" />
                    </div>
                    <div className="relative h-4 bg-[#2D2D53]/50 rounded w-11/12 overflow-hidden">
                      <div className="absolute inset-0 shimmer" />
                    </div>
                    <div className="relative h-4 bg-[#2D2D53]/50 rounded w-10/12 overflow-hidden">
                      <div className="absolute inset-0 shimmer" />
                    </div>
                  </div>

                  <div className="relative mb-10 h-20 bg-[#2D2D53]/50 rounded overflow-hidden">
                    <div className="absolute inset-0 shimmer" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
