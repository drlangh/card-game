'use client';

import { getCard } from '@/api/gemini';
import { Card, MainButton } from '@/components';
import useInformationStore from '@/stores/InformationStore';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { RxExternalLink } from 'react-icons/rx';

export default function Cards() {
  const [cardData, setCardData] = useState(
    'Click "Generate Card" to begin.'
  );
  const [rotating, setRotating] = useState(false);
  const [link, setLink] = useState(null);
  const { age, category } = useInformationStore();

  useEffect(() => {
    if (!age || !category) {
      redirect('/choice');
    }
  }, [age, category]);

  if (!age || !category) {
    return null;
  }

  return (
    <>
      <div className="w-full h-screen absolute z-0">
        <Card
          cardData={cardData}
          rotating={rotating}
          category={category}
        />
      </div>
      <Link
        href={'/choice'}
        className="pointer-events-auto absolute left-8 md:left-16 top-10 md:top-20 p-2 rounded-full border-2 border-white hover:shadow-[0px_0px_15px_3px_rgba(255,255,224,0.8)] transition-all duration-300"
      >
        <IoMdArrowBack color="white" size={18} />
      </Link>
      <div className="w-full h-full flex items-center justify-between flex-col relative z-10 py-10 md:py-20 pointer-events-none">
        <h1
          className="
          text-5xl
          md:text-6xl
          font-bold
          pointer-events-auto
          text-white
        "
        >
          {category && category.name}
        </h1>
        <div
          className={`w-10/12 lg:w-1/3 md:mb-4 flex flex-row items-center ${
            !rotating && link ? 'justify-between' : 'justify-center'
          }`}
        >
          {!rotating ? (
            <>
              {link && (
                <Link
                  target="_blank"
                  href={link}
                  className="pointer-events-auto text-white hover:underline flex flex-row items-center gap-2"
                >
                  <RxExternalLink size={20} />
                  Learn More
                </Link>
              )}
              <MainButton
                className="pointer-events-auto"
                onClick={async () => {
                  setRotating(true);
                  setCardData('');
                  await getCard(age, category).then((params) => {
                    if (!params) return;

                    const { content, link } = params;
                    setCardData(content);
                    setLink(link);
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
    </>
  );
}
