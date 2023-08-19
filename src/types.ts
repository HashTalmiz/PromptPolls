type PollType = {
    id?: String,
    title: String,
    options: String[],
    createdAt?: Date,
    isLive?: Boolean
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