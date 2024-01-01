"use client"
import React from "react";
import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/20/solid'

type PollType = {
    id?: string,
    title: string,
    options: string[],
    createdAt?: Date,
    isLive?: boolean,
    createdBy: string
}

export default class LandingPage extends React.Component<{}, { [key: string]: PollType[]}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            userData: [{
                id: "jegorjoirwgowjri43r4r",
                title: "lol1111",
                createdBy: "lefewf",
                options: ["p", "q", "r"]
            },
            {
                id: "435hjr4wherfwi4",
                title: "idefek",
                createdBy: "welnkfewlk",
                options: ["p", "q", "r", "s"]
            }]
          };
    }

    async componentDidMount() {
        try {
          const response = await fetch('http://localhost:3000/api/me');
          const data = await response.json();
          this.setState({ userData: data });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

    render() {
        const { userData } = this.state;
    
        return (
            <div className="bg-wework min-h-[90vh] py-16">
                <div className='mx-auto max-w-2xl lg:max-w-7xl sm:py-4 lg:px-8 '>
                    <div className="text-center">
                        <h3 className="text-4xl sm:text-8xl font-bold text-black my-2">Prompt Polls</h3>
                        <h3 className="text-4xl sm:text-4xl font-bold text-black mt-10">A Quick way to start polls</h3>
                        <h3 className="text-4xl sm:text-3xl font-bold text-black opacity-50 my-3">No Signup, No Login, Just Polls</h3>
                    </div>
                    <div className='my-9 text-center lg:text-mid'>
                        <Link href="/poll/create">
                            <button className='text-sm md:text-xl font-semibold hover:shadow-xl bg-blue text-white py-3 px-6 md:py-5 md:px-14 rounded-full hover:bg-hoblue'>
                                Create a Poll
                            </button>
                        </Link>
                    </div>
                </div>

                <section>
                    <div className='grid grid-cols-1 my-7 justify-items-center gap-14 manage'>
                        <div className='manageTabs text-center px-[40px] py-10 max-w-sm' >
                            <h4 className='text-xl font-bold mb-5'>Your Past Polls</h4>
                            <hr style={{ color: "darkgrey", width: "50%", margin: "auto" }} />
                            {userData.length > 0 ? userData.map((poll, i) => (
                                <Link key={i} href={`/poll/${poll.id}`}>
                                    <div  className="border-2 my-5 flex w-full justify-between rounded-lg px-4 py-2 text-left text- font-medium">
                                        <p>{poll.title}</p>
                                        <ChevronRightIcon className="h-7 w-7" />
                                    </div>
                                </Link>
                            )): (
                                <div className="mt-5">You haven&apos;t created any polls!</div>
                            )
                            }
                        </div>
                    </div>
                </section>
            </div>

        );
    }
}
