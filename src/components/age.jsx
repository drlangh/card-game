'use client';

import { IoMdArrowBack } from 'react-icons/io';
import { MainButton } from '.';
import Link from 'next/link';
import { RxCaretDown } from 'react-icons/rx';
import useInformationStore from '@/stores/InformationStore';
import { useState } from 'react';
import { IoAlertCircleOutline } from 'react-icons/io5';

const ageRanges = [
  { label: 'Under 17', value: 'Under 17' },
  { label: '18-24', value: '18-24' },
  { label: '25-34', value: '25-34' },
  { label: '35-44', value: '35-44' },
  { label: '45-54', value: '45-54' },
  { label: '55-64', value: '55-64' },
  { label: '65 and over', value: '65 and over' },
];

export default function Age({ setStep }) {
  const { setAge, age, setCategory } = useInformationStore();
  const [missingAge, setMissingAge] = useState(false);
  return (
    <>
      <Link
        href={'/'}
        onClick={() => {
          setCategory(null);
          setAge(null);
        }}
        className="pointer-events-auto absolute left-8 md:left-16 top-10 md:top-20 p-2 rounded-full border-2 border-white hover:shadow-[0px_0px_15px_3px_rgba(255,255,224,0.8)] transition-all duration-300"
      >
        <IoMdArrowBack color="white" size={18} />
      </Link>
      <div className="w-auto flex items-center justify-center flex-col gap-10">
        <h1
          className="
          text-5xl
          md:text-6xl
          font-bold
          pointer-events-auto
          text-white
        "
        >
          Select your age
        </h1>
        <div className="text-[#5A5A7A] relative w-full">
          <select
            defaultValue={age || ''}
            className={`w-full bg-white bg-opacity-50 rounded-full px-4 py-2 focus:bg-opacity-70 ${
              missingAge ? 'border border-red-600' : 'border-0'
            }`}
            onChange={(e) => {
              setAge(e.target.value);
              setMissingAge(false);
            }}
          >
            <option value="" disabled>
              Select your age
            </option>
            {ageRanges.map((ageRange) => (
              <option key={ageRange.value} value={ageRange.value}>
                {ageRange.label}
              </option>
            ))}
          </select>
          <RxCaretDown
            size={22}
            className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2"
          />
        </div>

        {missingAge && (
          <span className="w-full items-center -mt-8 flex flex-row gap-1 text-red-700 text-sm">
            <IoAlertCircleOutline size={20} />
            <p>Please select your age to continue</p>
          </span>
        )}

        <MainButton
          onClick={() => {
            if (!age) {
              setMissingAge(true);
              return;
            }
            setStep((step) => step + 1);
          }}
        >
          Next
        </MainButton>
      </div>
    </>
  );
}
