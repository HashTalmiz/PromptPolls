// import Image from "next/image";
"use client";
import { useEffect, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import CheckIcon from "../checkIcon/index"
import axios from "axios";
import { usePathname, useRouter } from 'next/navigation';
import io from 'socket.io-client';

type PollStats = {
    title: string;
    count: number;
};
const pollTitle: string = "Which is the best car?"
const pollOptions: PollStats[] = [
    {
        title: "Object 1",
        count: 10
    },
    {
        title: "Object 2",
        count: 20
    },
    {
        title: "Object 3",
        count: 30
    }
];
const total: number = 60;

const BACKEND_URL = "http://localhost:3000"

const GetPoll: React.FC = () => {
    const [totalVotes, setTotalVotes] = useState(60);
    const [selected, setSelected] = useState();
    const [pollInfo, setPollInfo] = useState();
    const router = useRouter();
    const param = usePathname().slice("/poll/".length);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/getPoll`, { params: { "pollId": `${param}` } })
          .then((response) => {
            setPollInfo(response.data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
    
        const socket = io(`${BACKEND_URL}/poll`, { port: 3000, query: { "id": param } }); 
        socket.on('pollStatsChange', (eventData: any) => {
            console.log(eventData);
        });
    
        return () => {
          if (socket) 
            socket.disconnect();
        };
      }, [param]);


    return (
        <div className="w-full px-4 py-16 min-h-[87vh]">
            <div className="mx-auto w-full max-w-3xl">
                <div className='py-3 text-center lg:text-start'>
                    <span className='text-blue bg-lightblue text-sm md:text-lg font-bold px-6 py-1 rounded-3xl tracking-wider'>POLL STATS</span>
                </div>
                <div className="mb-5 py-3 text-center lg:text-start">
                    <h1 className='text-3xl lg:text-6xl font-bold text-darkpurple'>
                        {pollTitle}
                    </h1>
                </div>
                <RadioGroup value={selected} onChange={setSelected}>
                    <RadioGroup.Label className="sr-only">Poll options</RadioGroup.Label>
                    <div className="space-y-4">
                        {pollOptions.map((pollOption) => (
                            <RadioGroup.Option
                                key={pollOption.title}
                                value={pollOption}
                                className={({ checked }) =>
                                    `${checked ? 'bg-opacity-25 text-white ring-2 ring-green ring-offset-2' : 'bg-white'
                                    }
                                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none transition-all border-2
                                    ${selected ? 'cursor-default pointer-events-none' : ''}`
                                }
                                style={{
                                    background: selected
                                        ? `linear-gradient(to right, #3B82F6 ${(
                                            (pollOption.count / total) * 100
                                        ).toFixed(2)}%, transparent ${(
                                            (pollOption.count / total) * 100
                                        ).toFixed(2)}%)`
                                        : 'none',
                                }}
                            >
                                {({ checked }) => (
                                    <div className="flex w-full items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="text-sm">
                                                <RadioGroup.Label
                                                    as="p"
                                                    className={`font-medium text-lg lg:text-3xl ${checked ? 'text-orange' : ''
                                                        }`}
                                                >
                                                    {pollOption.title}
                                                </RadioGroup.Label>
                                                <RadioGroup.Description
                                                    as="span"
                                                    className={`inline italic ${checked ? 'text-orange' : ''
                                                        }`}
                                                >
                                                    <span>
                                                        {pollOption.count} votes
                                                    </span>
                                                </RadioGroup.Description>
                                            </div>
                                        </div>
                                        {checked && (
                                            <div className="shrink-0 text-white">
                                                <CheckIcon />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </RadioGroup.Option>
                        ))}
                    </div>
                </RadioGroup>
                <div className="text-center my-8 lg:text-xl">
                    Total Votes: { totalVotes }
                </div>
            </div>
        </div>
    )
}

export default GetPoll;


