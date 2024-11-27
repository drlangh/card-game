'use client';
import Link from 'next/link';
import { MainButton } from '.';
import { IoMdArrowBack } from 'react-icons/io';
import useInformationStore from '@/stores/InformationStore';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { IoAlertCircleOutline } from 'react-icons/io5';

const categories = [
  { svgPath: 'dummy.svg', name: 'Defining Masculinity' },
  { svgPath: 'dummy.svg', name: 'Toxic Masculinity' },
  { svgPath: 'dummy.svg', name: 'The Role of Men and Boys' },
  { svgPath: 'dummy.svg', name: 'Changing the Context' },
  { svgPath: 'dummy.svg', name: 'Personal Reflections' },
];

export default function Categories({ setStep }) {
  const { category, setCategory } = useInformationStore();
  const [svgComponents, setSvgComponents] = useState({});
  const [missingCategory, setMissingCategory] = useState(false);

  useEffect(() => {
    const loadSVGs = async () => {
      const components = {};
      for (const cat of categories) {
        const Component = await dynamic(
          () =>
            import(`@/../public/${cat.svgPath}`).then(
              (mod) => mod.default || mod
            ),
          { ssr: false }
        );
        components[cat.name] = Component;
      }
      setSvgComponents(components);
    };

    loadSVGs();
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setCategory(null);
          setStep((step) => step - 1);
        }}
        className="pointer-events-auto absolute left-6 md:left-16 top-6 md:top-20 p-2 rounded-full border-2 border-transparent hover:border-white hover:shadow-[0px_0px_15px_3px_rgba(255,255,224,0.8)] transition-all duration-300"
      >
        <IoMdArrowBack color="white" size={24} strokeWidth={20} />
      </button>

      <div className="w-full flex items-center justify-center flex-col text-white">
        <h1 className="text-5xl md:text-6xl font-bold pointer-events-auto">
          Select a category
        </h1>
        <div className="w-full px-3 flex flex-wrap gap-5 mt-8 items-center justify-center">
          {categories.map((cat, index) => {
            const SVGComponent = svgComponents[cat.name];

            return (
              <div
                key={index}
                onClick={() => {
                  setCategory(cat);
                  setMissingCategory(false);
                }}
                className={`text-[#5A5A7A] flex items-center bg-white justify-center flex-col h-36 w-36 p-4 cursor-pointer rounded-full transition-all duration-100 ${
                  category && category.name === cat.name
                    ? 'bg-opacity-80 text-[#4545c4] font-medium shadow-[0px_0px_15px_3px_#9a9cfe9e] scale-110'
                    : 'bg-opacity-40'
                }`}
              >
                {SVGComponent ? (
                  <SVGComponent className="w-11 h-11 mb-2" />
                ) : (
                  <div className="w-11 h-11 mb-2 bg-gray-200 rounded-full animate-pulse" />
                )}
                <span className="text-center text-sm">
                  {cat.name}
                </span>
              </div>
            );
          })}
        </div>
        {missingCategory && (
          <span className="w-full items-center justify-center mt-4 flex flex-row gap-1 text-red-200 text-sm">
            <IoAlertCircleOutline size={20} />
            <p>Please select a category to continue</p>
          </span>
        )}
        <Link
          href={category ? '/cards' : '#'}
          className="mt-8"
          onClick={() => {
            if (!category) {
              setMissingCategory(true);
              return;
            }
          }}
        >
          <MainButton>Next</MainButton>
        </Link>
      </div>
    </>
  );
}
