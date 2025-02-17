'use client';

import useInformationStore from '@/stores/InformationStore';
import Link from 'next/link';
import { useState } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { IoAlertCircleOutline } from 'react-icons/io5';
import { RxCaretDown } from 'react-icons/rx';
import { BackArrow, MainButton } from '.';

const ageRanges = [
  { label: '17 and younger', value: '17 and younger' },
  { label: '18-24', value: '18-24' },
  { label: '25-34', value: '25-34' },
  { label: '35-44', value: '35-44' },
  { label: '45-54', value: '45-54' },
  { label: '55-64', value: '55-64' },
  { label: '65 and over', value: '65 and over' },
];

export default function Age() {
  const { setAge, age, category } = useInformationStore();
  const [missingAge, setMissingAge] = useState(false);

  return (
    <div className="w-full h-full justify-center items-center flex flex-col py-10 px-6 md:px-60 gap-4">
      <BackArrow
        href={category ? '/category' : '/'}
        onClick={() => {
          setAge(null);
        }}
      />
      <div className="w-auto h-full flex items-center justify-center flex-col gap-6 max-w-2xl">
        <h1 className="wide-text text-left text-4xl md:text-[3.3rem] leading-[4rem]">
          Which{' '}
          <span className="special normal-case text-[5.3rem]">
            age range{' '}
          </span>{' '}
          do you fall into?
        </h1>
        <p className="text-base md:text-lg opacity-80 text-left w-full">
          We use your age range to tailor our content and ensure it’s
          relevant to you.
        </p>
        <div className="text-[#6161a6] relative w-full">
          <select
            defaultValue={age || ''}
            className={`w-full bg-white bg-opacity-70 rounded-full px-4 py-2 hover:bg-opacity-100 focus:bg-opacity-100 ${
              missingAge ? 'border border-red-200' : 'border-0'
            }`}
            onChange={(e) => {
              setAge(e.target.value);
              setMissingAge(false);
            }}
          >
            <option value="" disabled>
              Select your age range
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
          <span className="w-full items-center -mt-8 flex flex-row gap-1 text-red-200 text-sm">
            <IoAlertCircleOutline size={20} />
            <p>Please select your age to continue</p>
          </span>
        )}

        <MainButton
          href={category ? '/card' : '/categories'}
          disabled={!age}
        >
          Next
        </MainButton>
      </div>
    </div>
  );
}
