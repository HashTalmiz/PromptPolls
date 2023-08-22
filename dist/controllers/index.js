"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addVote = exports.getPoll = exports.createPoll = void 0;
const index_1 = __importDefault(require("../db/index"));
const http_status_codes_1 = require("http-status-codes");
const createPoll = async (req, res) => {
    //const result = zPollTypeSchema.safeParse(req.body);
    // if(!result.success) {
    //     res.status(StatusCodes.BAD_REQUEST).json({
    //         error: ReasonPhrases.BAD_REQUEST,
    //         msg: "Expected title and poll options"
    //     })
    // }
    const poll = req.body;
    const newPoll = await index_1.default.createPoll(poll);
    res.status(200).json(newPoll);
};
exports.createPoll = createPoll;
const getPoll = async (req, res) => {
    const id = req.body.pollId;
    if (!id) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            error: http_status_codes_1.ReasonPhrases.BAD_REQUEST,
            msg: "Expected Poll ID"
        });
    }
    const data = await index_1.default.getPollInfo(id);
    const stats = await index_1.default.getPollStats(id);
    const result = Object.assign(Object.assign({}, data), stats);
    res.status(http_status_codes_1.StatusCodes.OK).json(result);
};
exports.getPoll = getPoll;
const addVote = async (req, res) => {
    //const result = zPollersSchema.safeParse(req.body);
    // if(!result.success) {
    //     res.status(StatusCodes.BAD_REQUEST).json({
    //         error: ReasonPhrases.BAD_REQUEST,
    //         msg: "Incorrect body"
    //     })
    // }
    const result = req.body;
    const json = await index_1.default.addVote(result.pollId, result.IPAddress, result.pollOption);
    res.status(http_status_codes_1.StatusCodes.OK).json(json);
};
exports.addVote = addVote;
//# sourceMappingURL=index.js.map