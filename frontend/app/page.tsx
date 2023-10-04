import React from 'react';
import { Suspense} from 'react'
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import PastPolls from './components/pastPolls'


export default async function LandingPage() {
  return (
    <div className="bg-wework min-h-[100vh] py-16">
      <div className="mx-auto max-w-2xl lg:max-w-7xl sm:py-4 lg:px-8 ">
        <div className="text-center">
          <h3 className="text-4xl sm:text-8xl font-bold text-black my-2">Prompt Polls</h3>
          <h3 className="text-4xl sm:text-4xl font-bold text-black mt-10">A Quick way to start polls</h3>
          <h3 className="text-4xl sm:text-3xl font-bold text-black opacity-50 my-3">No Signup, No Login, Just Polls</h3>
        </div>
        <div className="my-9 text-center lg:text-mid">
          <Link href="/poll/create">
            <button className="text-sm md:text-xl font-semibold hover:shadow-xl bg-blue text-white py-3 px-6 md:py-5 md:px-14 rounded-full hover:bg-hoblue">
              Create a Poll
            </button>
          </Link>
        </div>
      </div>

      <Suspense fallback={<p>Loading feed...</p>}>
        <PastPolls />
      </Suspense>
      
    </div>
  );
};

