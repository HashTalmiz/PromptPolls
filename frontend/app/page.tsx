import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

interface PollType {
  id: string;
  title: string;
  createdBy: string;
  options: string[];
}

const fetchPolls = async () => {
  const response = await fetch('http://localhost:3000/api/me');
  const data = await response.json();
  return data;
};


export default async function LandingPage() {
  let userData: PollType[] = []
  let emptyMsg: string = "You haven't created any polls!";
  try{
    userData = await fetchPolls();
  } catch(e) {
    emptyMsg = "Had trouble fetching your past polls :("
  }
  
  return (
    <div className="bg-wework min-h-[90vh] py-16">
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

      <section>
        <div className="grid grid-cols-1 my-7 justify-items-center gap-14 manage">
          <div className="manageTabs text-center px-[40px] py-10 max-w-sm">
            <h4 className="text-xl font-bold mb-5">Your Past Polls</h4>
            <hr style={{ color: 'darkgrey', width: '50%', margin: 'auto' }} />
            <div className="max-h-[200px] max-w-[400px]" style={{overflowY: "auto"}}>
              {userData.length > 0 ? (
                userData.map((poll, i) => (
                  <Link key={i} href={`/poll/${poll.id}`}>
                    <div className="border-2 my-5 flex w-full justify-between rounded-lg px-4 py-2 text-left text- font-medium">
                      <p>{poll.title}</p>
                      <ChevronRightIcon className="h-7 w-7" />
                    </div>
                  </Link>
                ))
              ) : (
                <div className="mt-5">{emptyMsg}</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

