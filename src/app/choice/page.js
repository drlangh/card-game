'use client';

import { Age } from '@/components';
import { Categories } from '@/components';
import { useState } from 'react';

export default function Choice() {
  const [step, setStep] = useState(1);
  return (
    <div className="w-full flex items-center justify-center flex-col h-screen">
      {step === 1 && <Age setStep={setStep} />}
      {step === 2 && <Categories setStep={setStep} />}
    </div>
  );
}
