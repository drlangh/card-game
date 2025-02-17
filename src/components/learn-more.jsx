'use client';

import useInformationStore from '@/stores/InformationStore';
import { useCallback, useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { RxExternalLink } from 'react-icons/rx';
import { getMoreInformation } from '@/api/gemini';
import ReactMarkdown from 'react-markdown';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

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
      await getMoreInformation(
        cardData,
        age,
        category,
        file,
        (partialInfo) => setLearnMoreInfo(partialInfo)
      );
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
          className="fixed top-0 left-0 right-0 w-full h-full bg-black/45 z-50 overflow-hidden"
        >
          <motion.div
            initial={{
              y: '100%',
              filter: 'blur(8px)',
              borderRadius: '0px',
            }}
            animate={{
              y: '10%',
              filter: 'blur(0px)',
              borderRadius: '24px',
            }}
            exit={{
              y: '100%',
              filter: 'blur(8px)',
              borderRadius: '0px',
            }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 200,
            }}
            className="relative bottom-0 left-0 right-0 w-full h-[100vh] bg-[#babcda] 
                     overflow-y-auto overflow-x-hidden shadow-2xl p-9 md:p-20"
          >
            <button
              className="sticky top-4 -mr-7 float-right text-[#58589d]"
              onClick={onClose}
            >
              <IoClose size={24} />
            </button>
            {learnMoreInfo ? (
              <div className="text-[#58589d]">
                <h2 className="wide-text text-left clear-right text-3xl w-7/12 md:text-6xl">
                  Learn More
                </h2>

                <div className="p-6 bg-violet-200 rounded-2xl my-10 text-base md:text-lg">
                  {cardData}
                </div>

                <div className="mb-6 prose prose-sm max-w-none text-base md:text-lg">
                  <ReactMarkdown className="whitespace-pre-wrap">
                    {learnMoreInfo}
                  </ReactMarkdown>
                </div>

                <div className="text-center mb-14">
                  <a
                    href={LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 bg-opacity-60 hover:bg-opacity-80 text-white py-2 px-6 rounded-full transition-all duration-300"
                  >
                    <RxExternalLink
                      size={20}
                      className="inline-block -mt-1 mr-2"
                    />
                    Visit Resource
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#58589d]"></div>
                <p className="text-[#58589d] mt-4">{rotatingText}</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
