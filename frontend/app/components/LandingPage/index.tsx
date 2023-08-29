"use client"
import React, { Component, useState } from "react";
import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/20/solid'

const names = [
    {
        heading: "Business",
        price: 29,
        user: 'per user, per month',
        button: "Start My 15-day Trial",
        profiles: '10 Social Profiles',
        posts: '5 Scheduled Posts Per Profile',
        templates: "600+ Templated",
        view: "Calendar View",
        support: '24/7 VIP Support',
        category: 'yearly'
    }
]

export default class LandingPage extends Component {

    render() {
        return (
            <div className="bg-wework min-h-screen py-16">

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
                        {names.map((items, i) => (
                            <div className='manageTabs text-center px-[40px] py-10 max-w-sm' key={i}>
                                <h4 className='text-2xl font-bold mb-5'>Your Past Polls</h4>
                                <hr style={{ color: "darkgrey", width: "50%", margin: "auto" }} />
                                <div className="border-2 my-5 flex w-full justify-between rounded-lg px-4 py-2 text-left text- font-medium">
                                    <p>What is the best car?</p>
                                    <ChevronRightIcon className="h-7 w-7"/>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>


            </div>

        );
    }
}
