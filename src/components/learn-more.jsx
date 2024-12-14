'use client';

import useInformationStore from '@/stores/InformationStore';
import { useCallback, useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { RxExternalLink } from 'react-icons/rx';
import { getMoreInformation } from '@/api/gemini';
import ReactMarkdown from 'react-markdown';
import { toast } from 'react-toastify';

const LINK =
  'https://prism.ucalgary.ca/server/api/core/bitstreams/f6a4c80d-ed62-4d95-af18-af5dd3207a82/content';

export default function LearnMorePopup({
  cardData,
  onClose,
  setLearnMoreInfo,
  learnMoreInfo,
  file,
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
    const info = await getMoreInformation(
      cardData,
      age,
      category,
      file
    );

    if (info.toLowerCase().includes('error')) {
      toast.error(
        'Error generating more information. Please try again.'
      );
      onClose();
      return;
    }

    setLearnMoreInfo(info);
  }, [cardData, age, category, onClose, setLearnMoreInfo]);

  useEffect(() => {
    if (learnMoreInfo) return;

    fetchMoreInformation();
  }, []);

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
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black bg-opacity-80 transition-opacity duration-300"
        onClick={() => {
          learnMoreInfo && onClose();
        }}
      ></div>

      {learnMoreInfo ? (
        <div className="bg-white rounded-lg p-9 md:p-16 pt-10 z-60 relative w-11/12 md:w-3/4 max-h-[80vh] overflow-y-auto overflow-x-hidden transform transition-transform duration-300">
          <button
            className="sticky top-4 -mr-7 float-right text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            <IoClose size={24} />
          </button>
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800  clear-right">
            Learn More
          </h2>
          <div className="text-gray-700 mb-6 prose prose-sm max-w-none">
            <ReactMarkdown className="whitespace-pre-wrap">
              {learnMoreInfo}
            </ReactMarkdown>
          </div>
          <div className="text-center">
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
        <div className="flex flex-col items-center relative z-50">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
          <p className="text-white mt-4">{rotatingText}</p>
        </div>
      )}
    </div>
  );
}
