"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addVote = exports.getPoll = exports.createPoll = void 0;
const index_1 = __importDefault(require("../db/index"));
const http_status_codes_1 = require("http-status-codes");
const z = __importStar(require("../utils/zodSchemas"));
const errorHandling_1 = require("../utils/errorHandling");
const request_ip_1 = __importDefault(require("request-ip"));
exports.createPoll = (0, errorHandling_1.asyncHandler)(async (req, res, next) => {
    const clientIp = request_ip_1.default.getClientIp(req);
    const result = z.zodSafeParse(z.zPollTypeSchema, req.body);
    if (result.error) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            reason: http_status_codes_1.ReasonPhrases.BAD_REQUEST,
            error: result.error.issues,
        });
        return;
    }
    const poll = result.data;
    const newPoll = await index_1.default.createPoll(poll);
    res.status(200).json(newPoll);
});
exports.getPoll = (0, errorHandling_1.asyncHandler)(async (req, res, next) => {
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
});
exports.addVote = (0, errorHandling_1.asyncHandler)(async (req, res) => {
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
});
//# sourceMappingURL=index.js.map