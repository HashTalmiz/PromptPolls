"use client"
import React, { useState } from 'react';
import dynamic from 'next/dynamic'
const CreatePollComponent = dynamic(() => import('../../components/createPoll'), { ssr: false })
const CreatePoll: React.FC = () => {
    return (
        <CreatePollComponent/>
    )
}

export default CreatePoll;