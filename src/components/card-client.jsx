'use client';

import uploadFile from '@/api/file';
import { getCard } from '@/api/gemini';
import { Card, MainButton } from '@/components';
import useInformationStore from '@/stores/InformationStore';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import LearnMorePopup from './learn-more';

export default function CardClient() {
  const { age, category } = useInformationStore();
  const [fileUri, setFileUri] = useState(null);
  const [cardData, setCardData] = useState(
    'Click "Generate Card" to begin.'
  );
  const [rotating, setRotating] = useState(false);
  const [status, setStatus] = useState(null);
  const [cardReady, setCardReady] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [learnMoreInfo, setLearnMoreInfo] = useState(null);

  const getFileUri = async () => {
    const file = await uploadFile();
    setFileUri(file);
  };

  useEffect(() => {
    getFileUri();
  }, []);

  if (!age || !category) {
    redirect('/choice');
  }

  return (
    <>
      <div className="w-full h-screen absolute z-0">
        <Card
          cardData={cardData}
          rotating={rotating}
          category={category}
          setCardReady={setCardReady}
        />
      </div>
      <Link
        href={'/choice?step=2'}
        className="pointer-events-auto z-30 absolute left-6 md:left-16 top-12 md:top-20 p-2 rounded-full border-2 border-transparent hover:border-white hover:shadow-[0px_0px_15px_3px_rgba(255,255,224,0.8)] transition-all duration-300"
      >
        <IoMdArrowBack color="white" size={24} strokeWidth={20} />
      </Link>
      <div className="w-full h-screen flex items-center justify-between flex-col relative z-10 py-7 md:py-20 pointer-events-none">
        <h1
          className="
          text-center
          text-3xl
          w-7/12
          md:text-4xl
          font-bold
          pointer-events-auto
          text-white
        "
        >
          {category && category.name}
        </h1>
        <div
          className={`w-10/12 gap-6 mb-14 lg:w-1/3 md:mb-4 flex flex-row items-center ${
            !rotating && status === 200
              ? 'justify-between'
              : 'justify-center'
          }`}
        >
          {!rotating ? (
            <>
              {status === 200 && (
                <button
                  onClick={() => setShowPopup(true)}
                  className="pointer-events-auto text-white flex flex-row items-center gap-2 rounded-full py-3 px-9 border-2 hover:border-white hover:shadow-[0px_0px_15px_3px_rgba(255,255,224,0.8)] transition-all duration-300"
                >
                  Learn More
                </button>
              )}
              <MainButton
                className={`pointer-events-auto transition-all duration-300 ${
                  cardReady
                    ? 'opacity-100'
                    : 'opacity-0 pointer-events-none'
                }`}
                onClick={async () => {
                  setRotating(true);
                  setCardData('');
                  setLearnMoreInfo(null);
                  await getCard(age, category).then((params) => {
                    if (!params) {
                      setRotating(false);
                      return;
                    }

                    const { content, status } = params;
                    setCardData(content);
                    setStatus(status);
                    setRotating(false);
                  });
                }}
              >
                Generate Card
              </MainButton>
            </>
          ) : (
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
          )}
        </div>
      </div>
      {showPopup && (
        <LearnMorePopup
          cardData={cardData}
          onClose={() => setShowPopup(false)}
          learnMoreInfo={learnMoreInfo}
          setLearnMoreInfo={setLearnMoreInfo}
          fileUri={fileUri}
        />
      )}
    </>
  );
}
