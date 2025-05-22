import React, { useEffect, useState } from 'react';
import { Progress } from 'flowbite-react';

const AnimatedCircularProgress = ({ targetValue, label }) => {
  const [value, setValue] = useState(0);

  const radius = 90;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(prev => {
        if (prev < targetValue) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [targetValue]);

  return (
    <div className="relative w-[180px] h-[180px]">
      <svg height="180" width="180">
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx="90"
          cy="90"
        />
        <circle
          stroke="#6366f1"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx="90"
          cy="90"
          className="transition-all duration-200 ease-linear"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-semibold text-white">{value}%</span>
        <span className="text-xs text-white">{label}</span>
      </div>
    </div>
  );
};

const ProgressBar = () => {
  const [progress1, setProgress1] = useState(0);
  const [progress2, setProgress2] = useState(0);

  useEffect(() => {
    const interval1 = setInterval(() => {
      setProgress1(prev => {
        if (prev < 45) return prev + 1;
        clearInterval(interval1);
        return prev;
      });
    }, 100);

    const interval2 = setInterval(() => {
      setProgress2(prev => {
        if (prev < 70) return prev + 1;
        clearInterval(interval2);
        return prev;
      });
    }, 100);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, []);

  return (
    <div className="w-full flex justify-center my-10">
      <div className="w-[90%] md:w-3/5 bg-white/20 rounded-xl shadow-md p-6 border border-slate-300">
        <h2 className="text-lg font-semibold mb-4 text-center text-white">
          Upload Progress
        </h2>

        <Progress progress={progress1} color="indigo" size="xl" className="rounded-full transition-all duration-500" />
        <p className="text-sm text-center mt-2 text-white">{progress1}% completed</p>

        <Progress progress={progress2} color="indigo" size="xl" className="rounded-full transition-all duration-500 mt-8" />
        <p className="text-sm text-center mt-2 text-white">{progress2}% completed</p>

        <div className="flex justify-center gap-8 mt-12 flex-wrap">
          <AnimatedCircularProgress targetValue={45} label="Uploading" />
          <AnimatedCircularProgress targetValue={60} label="Processing" />
          <AnimatedCircularProgress targetValue={85} label="Completed" />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
