'use client';

import ContextSVG from '@/../public/context.svg';
import DefiningSVG from '@/../public/defining.svg';
import ReflectionsSVG from '@/../public/reflections.svg';
import RoleSVG from '@/../public/role.svg';
import ToxicSVG from '@/../public/toxic.svg';
import useInformationStore from '@/stores/InformationStore';
import { BackArrow, MainButton } from '.';

const categories = [
  {
    svgComponent: DefiningSVG,
    name: 'Defining Masculinity',
    svgPath: '/defining.svg',
  },
  {
    svgComponent: ToxicSVG,
    name: 'Toxic Masculinity',
    svgPath: '/toxic.svg',
  },
  {
    svgComponent: RoleSVG,
    name: 'The Role of Men and Boys',
    svgPath: '/role.svg',
  },
  {
    svgComponent: ContextSVG,
    name: 'Changing the Context',
    svgPath: '/context.svg',
  },
  {
    svgComponent: ReflectionsSVG,
    name: 'Personal Reflections',
    svgPath: '/reflections.svg',
  },
];

export default function Categories() {
  const { category, setCategory, age } = useInformationStore();

  return (
    <div className="w-full h-full justify-center items-center flex flex-col py-10 px-6 md:px-60 gap-4">
      <BackArrow
        href={age ? '/age' : '/'}
        onClick={() => {
          setCategory(null);
        }}
      />
      <div className="w-auto h-full flex items-center justify-center flex-col gap-6 max-w-[50rem]">
        <h1 className="wide-text text-left text-4xl md:text-[3.3rem] leading-[4rem]">
          Which category resonates with you?
        </h1>
        <p className="text-base md:text-lg opacity-80 text-left w-full">
          Pick a category to explore different perspectives on
          masculinity.
        </p>
        <div className="w-full flex flex-wrap items-center justify-between mb-8">
          {categories.map((cat, index) => {
            const SVGComponent = cat.svgComponent;

            return (
              <button
                key={index}
                onClick={() => {
                  setCategory(cat);
                }}
                className={`text-[#6161a6] bg-white flex items-center justify-center flex-col size-[9rem] p-4 rounded-3xl transition-all duration-100 ${
                  category && category.name === cat.name
                    ? 'bg-opacity-100 text-[#4545c4] font-medium shadow-[0px_0px_15px_3px_#9a9cfe9e] scale-105'
                    : 'bg-opacity-60 hover:bg-opacity-90'
                }`}
              >
                <SVGComponent className="size-12 mb-3" />
                <span className="text-center text-sm">
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>

        <MainButton
          href={age ? '/card' : '/age'}
          disabled={!category}
        >
          Next
        </MainButton>
      </div>
    </div>
  );
}
