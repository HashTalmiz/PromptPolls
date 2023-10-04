
"use client";
import { useState, useEffect } from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

interface PollType {
  id: string;
  title: string;
  createdBy: string;
  options: string[];
}


const PastPolls: React.FC = () => {
    let emptyMsg: string = "You haven't created any polls!";

    const [userData, setUserData] = useState<PollType[]>([]);

    useEffect(() => {
        const apiUrl = `http://localhost:3000/api/me`;

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setUserData(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
  
    return (
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
    )
};

export default PastPolls;