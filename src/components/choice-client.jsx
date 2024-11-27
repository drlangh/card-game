'use client';

import { Age } from '@/components';
import { Categories } from '@/components';
import { useState, useEffect } from 'react';

export default function ChoiceClient() {
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const step = urlParams.get('step');
      if (step) {
        setStep(parseInt(step));
      }
    }
  }, []);

  return (
    <div className="w-full flex items-center justify-center flex-col h-screen">
      {step === 1 && <Age setStep={setStep} />}
      {step === 2 && <Categories setStep={setStep} />}
    </div>
  );
}
