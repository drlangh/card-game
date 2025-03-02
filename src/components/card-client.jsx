'use client';

import { getCard } from '@/api/gemini';
import { BackArrow, MainButton } from '@/components';
import useCardStore from '@/stores/cardStore';
import useInformationStore from '@/stores/InformationStore';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import LearnMorePopup from './learn-more';

export default function CardClient({ file }) {
  const { age, category } = useInformationStore();
  const { cardReady, rotating, cardData, setCardData, setRotating } =
    useCardStore();
  const [generated, setGenerated] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [learnMoreInfo, setLearnMoreInfo] = useState(null);

  useEffect(() => {
    setCardData('Click "Generate Card" to begin.');
  }, []);

  useEffect(() => {
    if (!age || !category) {
      redirect('/categories');
    }
  }, [age, category]);

  return (
    <>
      <BackArrow href={'/categories'} />
      <div
        className={
          'w-full h-dvh flex items-center justify-between flex-col relative z-10 pt-14 md:py-20 pointer-events-none'
        }
      >
        <h1 className="wide-text text-center text-2xl w-7/12 md:text-4xl !leading-7 md:!leading-9">
          {category && category.name}
        </h1>
        <div
          className={
            'w-10/12 gap-6 mb-9 lg:w-1/3 md:mb-4 flex flex-row items-center justify-center'
          }
        >
          {!rotating ? (
            <div
              className={`w-full flex items-center gap-4 ${!cardData ? 'justify-between' : 'justify-center'}`}
            >
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
                  await getCard(age, category).then((content) => {
                    if (!content) {
                      setRotating(false);
                      return;
                    }

                    setCardData(content);
                    setGenerated(true);
                    setRotating(false);
                  });
                }}
              >
                Generate Card
              </MainButton>
              {generated && (
                <button
                  onClick={() => setShowPopup(true)}
                  className="pointer-events-auto text-white flex flex-row items-center gap-2 rounded-full py-3 px-9 hover:underline"
                >
                  Learn More
                </button>
              )}
            </div>
          ) : (
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white" />
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
