'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Step } from 'react-joyride';

// Dynamic import with type annotation
const Joyride = dynamic(() => import('react-joyride'), { ssr: false }) as React.ComponentType<any>;

export function AppTest(): JSX.Element {
  const [steps, setSteps] = useState<Step[]>([]);
  const [run, setRun] = useState<boolean>(false);

  useEffect(() => {
    setSteps([
      {
        target: '#my-first-step',
        content: 'This is my awesome feature!',
      },
      {
        target: '#my-other-step',
        content: 'This another awesome feature!',
      },
    ]);
    setRun(true);
  }, []);

  return (
    <div className="app">
      <Joyride steps={steps} run={run} />
      <div id="my-first-step">First step content</div>
      <div id="my-other-step">Second step content</div>
    </div>
  );
}