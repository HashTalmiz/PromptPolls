type PollType = {
    id?: string,
    title: string,
    options: string[],
    createdAt?: Date,
    isLive?: boolean
}

type pollersScema = {
    pollId: string,
    IPAdress: string,
    pollOption: number
}

type optionsCountSchema = {
    pollId: string,
    pollOption: string,
    count: number 
}
