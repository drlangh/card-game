'use client';

import { getCard } from '@/api/gemini';
import { BackArrow, Card, MainButton } from '@/components';
import useInformationStore from '@/stores/InformationStore';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import LearnMorePopup from './learn-more';

export default function CardClient({ file }) {
  const { age, category } = useInformationStore();
  const [cardData, setCardData] = useState(
    'Click "Generate Card" to begin.'
  );
  const [rotating, setRotating] = useState(false);
  const [status, setStatus] = useState(null);
  const [cardReady, setCardReady] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [learnMoreInfo, setLearnMoreInfo] = useState(null);

  if (!age || !category) {
    redirect('/categories');
  }

  return (
    <>
      <div
        className={`w-full h-full absolute overflow-hidden ${showPopup ? 'z-50' : 'z-0'}`}
      >
        <Card
          cardData={cardData}
          rotating={rotating}
          category={category}
          setCardReady={setCardReady}
        />
      </div>
      <BackArrow href={'/categories'} />
      <div
        className={
          'w-full h-screen flex items-center justify-between flex-col relative z-10 py-7 md:py-20 pointer-events-none'
        }
      >
        <h1 className="wide-text text-center text-3xl w-7/12 md:text-4xl leading-[2rem]">
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
              {status === 200 && (
                <button
                  onClick={() => setShowPopup(true)}
                  className="pointer-events-auto text-white flex flex-row items-center gap-2 rounded-full py-3 px-9 hover:underline"
                >
                  Learn More
                </button>
              )}
            </>
          ) : (
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
          )}
        </div>
      </div>
      <LearnMorePopup
        cardData={cardData}
        onClose={() => setShowPopup(false)}
        learnMoreInfo={learnMoreInfo}
        setLearnMoreInfo={setLearnMoreInfo}
        file={file}
        showPopup={showPopup}
      />
    </>
  );
}
