"use client"
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useRouter } from 'next/navigation'
 

const CreatePoll: React.FC = () => {

    const router = useRouter();
    const CREATE_URL = `http://localhost:3000/api/createPoll`;
    const [title, setTitle] = useState<string>('');
    const [options, setOptions] = useState<string[]>(['']);
    const [loading, setIsLoading] = useState<boolean>(false);


    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newOptions = [...options];
        newOptions[index] = event.target.value;
        setOptions(newOptions);
    };

    const addOption = () => {
        if (options.length < 10) {
            setOptions([...options, '']);
        } else {
            toast.error("Cannot have more than 10 options")
        }
    };


    const triggerPollCreation = async () => {
        setIsLoading(true);
        // // Simulate a loading delay
        // setTimeout(() => {
        //     setIsLoading(false);
        // }, 3000);
        const pollData = {
            title,
            options
        }
        try {
            const res = await axios.post(CREATE_URL, pollData);
            const {data, status} = res;
            if(status === 200) {
                toast("Success! Poll created!")
                router.push(`/poll/${data.id}`)
            }
        } catch(e) {
            toast.error("Error, could not create a poll")
            console.log(e);
        }
        setIsLoading(false);
    };


    return (
        <div id="faq-section" className='mx-auto max-w-7xl py-24 lg:px-8 rounded-2xl my-32 faq-bg min-h-[94vh]'>
            <h2 className='text-4xl lg:text-6xl font-semibold text-center text-black'>Create a Poll</h2>
            <div className="w-full px-4 pt-16">
                <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white py-6 px-6 mb-5 border-2">
                    <div className="mb-10">
                        <label>Poll Title *</label>
                        <input type="text" value={title} onChange={handleTitleChange} className="my-4 py-4 sm:pl-6 w-full lg:text-xl text-black sm:rounded-full bg-lightgrey pl-1 focus:outline-none bg-emailbg focus:text-black" placeholder="Poll Title" autoComplete="off" />
                    </div>
                    <div>
                        <label>Options</label>
                        {options.map((option, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(event) => handleOptionChange(event, index)}
                                    className="my-4 py-4 sm:pl-6 w-full lg:text-xl text-black sm:rounded-full bg-lightgrey pl-1 focus:outline-none bg-emailbg focus:text-black"
                                    placeholder="Poll Option"
                                    autoComplete="off"
                                />
                            </div>
                        ))}
                    </div>
                    <div className='mt-5 text-center lg:text-end'>
                        <button onClick={addOption} className='text-sm md:text-lg font-semibold hover:shadow-xl bg-blue text-white py-3 px-6 md:py-3 md:px-5 rounded-full hover:bg-hoblue'>
                            Add Option
                        </button>
                    </div>

                </div>
                <div>
                    <div className="mt-16 lg:text-center">
                        {!loading ? (
                            <button onClick={triggerPollCreation} className='text-sm md:text-2xl font-semibold hover:shadow-xl bg-orange text-white py-3 px-6 md:py-5 md:px-9 rounded-full'>
                                Create Poll
                            </button>
                            ) : (
                                <h2 className="text-sm md:text-2xl font-semibold text-white text-center">Loading....</h2>
                            )
                        }
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-center"
            />
        </div>
    )
}

export default CreatePoll;