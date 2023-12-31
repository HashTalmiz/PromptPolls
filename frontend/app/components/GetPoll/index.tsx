// import Image from "next/image";
"use client";
import { useEffect, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import CheckIcon from "../checkIcon/index"
import axios from "axios";
import { useSearchParams } from 'next/navigation';
import io from 'socket.io-client';

type PollStats = {
    title: string;
    count: number;
};

type votedInfo = {
    pollId: string,
    pollOption: number
}

type PollStat = {
    id?: string,
    title: string,
    options: Record<string, number>[],
    createdAt?: Date,
    isLive?: boolean,
    createdBy?: string
    hasVoted?: votedInfo | null
}
type OptionType = {
    title: string,
    count: number
}

const BACKEND_URL = "http://localhost:3000"

const GetPoll: React.FC = () => {
    const [totalVotes, setTotalVotes] = useState(0);
    const [hasVoted, setHasVoted] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<number>(999);
    const [pollInfo, setPollInfo] = useState<PollStat>({
        title: 'loading',
        options: []
    });
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const optionChosen = async(optionNumber: number) => {
        const result = await axios.post(`${BACKEND_URL}/api/addVote`, {  
            "pollId": pollInfo.id,
            "pollOption": optionNumber
        })
        
        if(result.status == 200) {
            setHasVoted(true);
            setSelectedOption(optionNumber);
        }
        else {
            // error handle on failure of casting vote
        }
    }

    const calculateTotal = (pollInfo: PollStat) => {
        const newTotal = pollInfo.options.reduce((accumulator, currentObject) => {
            return accumulator + currentObject.count;
        }, 0);
        setTotalVotes(newTotal);
    }

    const init = async() => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/getPoll`, {
              params: { pollId: id },
            });
          
            setPollInfo(response.data as PollStat);
          
            if (response.data.hasVoted) {
              setHasVoted(true);
              setSelectedOption(response.data.hasVoted.pollOption);
            }
          
            calculateTotal(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
          
    
        const socket = io(`${BACKEND_URL}/poll`, { port: 3000, query: { "id": id } });
        socket.on('pollStatsChange', (eventData: PollStat) => {
            setPollInfo(eventData);
            calculateTotal(eventData)
        });
    
        return () => {
          if (socket) 
            socket.disconnect();
        };
    }

    useEffect(() => {
        init()
      }, [id]);


    return (
        <div className="w-full px-4 py-16 min-h-[87vh]">
            <div className="mx-auto w-full max-w-3xl">
                <div className='py-3 text-center lg:text-start'>
                    <span className='text-blue bg-lightblue text-sm md:text-lg font-bold px-6 py-1 rounded-3xl tracking-wider'>POLL STATS</span>
                </div>
                <div className="mb-5 py-3 text-center lg:text-start" style={{overflowWrap: "break-word"}}>
                    <h1 className='text-3xl lg:text-6xl font-bold text-darkpurple'>
                        {pollInfo?.title}
                    </h1>
                </div>
                <RadioGroup value={selectedOption} onChange={optionChosen}>
                    <RadioGroup.Label className="sr-only">Poll options</RadioGroup.Label>
                    <div className="space-y-4">
                        {pollInfo.options.map((pollOption, idx) => (
                            <RadioGroup.Option
                                key={pollOption.title}
                                value={idx}
                                className={({ checked }) =>
                                    `${checked ? 'bg-opacity-25 text-white ring-2 ring-green ring-offset-2' : 'bg-white'
                                    }
                                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none transition-all border-2
                                    ${hasVoted ? 'cursor-default pointer-events-none' : ''}`
                                }
                                style={{
                                    background: hasVoted
                                        ? `linear-gradient(to right, #3B82F6 ${(
                                            (pollOption.count / totalVotes) * 100
                                        ).toFixed(2)}%, transparent ${(
                                            (pollOption.count / totalVotes) * 100
                                        ).toFixed(2)}%)`
                                        : 'none',
                                    overflowWrap: "break-word"
                                }}
                            >
                                {({ checked }) => (
                                    <div className="">
                                        <div className="">
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
                                                    {hasVoted && (
                                                        <span>
                                                            {pollOption.count} votes
                                                        </span>
                                                    )}
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


