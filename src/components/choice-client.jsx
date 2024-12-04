'use client';

import { Age } from '@/components';
import { Categories } from '@/components';
import useInformationStore from '@/stores/InformationStore';
import { useState, useEffect } from 'react';

export default function ChoiceClient() {
  const [step, setStep] = useState(1);
  const { age } = useInformationStore();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const step = urlParams.get('step');
      if (step && step === '2' && age) {
        setStep(parseInt(step));
      }
    }
  }, []);

  return (
    <div className="w-full flex items-center justify-center flex-col min-h-screen">
      {step === 1 && <Age setStep={setStep} />}
      {step === 2 && <Categories setStep={setStep} />}
    </div>
  );
}
