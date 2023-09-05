type PollType = {
    id?: string,
    title: string,
    options: string[],
    createdAt?: Date,
    isLive?: boolean,
    createdBy: string
}

type pollersSchema = {
    pollId: string,
    IPAddress: string,
    pollOption: number
}

type votedInfo = {
    pollId: string,
    pollOption: number
}

type optionsCountSchema = {
    pollId: string,
    pollOption: string,
    count: number 
}

type PollStats = {
    id?: string,
    title: string,
    options: Record<string, number>,
    createdAt?: Date,
    isLive?: boolean,
    createdBy?: string
}

type OptionType = {
    title: string,
    count: number
}