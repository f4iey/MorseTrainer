'use client';

import dynamic from 'next/dynamic';

const MorseTrainer = dynamic(() => import('./MorseTrainer'), {
  ssr: false
});

export default function MorseTrainerWrapper() {
  return <MorseTrainer />;
}
