'use client';

import useInformationStore from '@/stores/InformationStore';
import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { RxExternalLink } from 'react-icons/rx';
import { getMoreInformation } from '@/api/gemini';
import ReactMarkdown from 'react-markdown';
import { toast } from 'react-toastify';

export default function LearnMorePopup({
  cardData,
  link,
  onClose,
  setLearnMoreInfo,
  learnMoreInfo,
}) {
  const { age, category } = useInformationStore();

  const fetchMoreInformation = async () => {
    const info = await getMoreInformation(cardData, age, category);

    if (info.includes('error')) {
      toast.error(
        'Error generating more information. Please try again.'
      );
      onClose();
      return;
    }

    setLearnMoreInfo(info);
  };

  useEffect(() => {
    if (learnMoreInfo) return;

    fetchMoreInformation();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black bg-opacity-80 transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {learnMoreInfo ? (
        <div className="bg-white bg-opacity-90 rounded-lg p-16 pt-10 z-60 relative w-3/4 max-h-[80vh] overflow-y-auto overflow-x-hidden transform transition-transform duration-300">
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
            {/* decrease the size of the line break */}
            <ReactMarkdown className="whitespace-pre-wrap">
              {learnMoreInfo}
            </ReactMarkdown>
          </div>
          {link && (
            <div className="text-center">
              <a
                href={link}
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
          )}
        </div>
      ) : (
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
      )}
    </div>
  );
}
