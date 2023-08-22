import {Request, Response, NextFunction } from "express";

export const asyncHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) => Promise.resolve(fn(req, res, next)).catch(next);

export const errorResponse = (error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error.statusCode || 500).json({
        response: 'Error',
        error: {
            type: 'UnhandledError',
            path: req.path,
            statusCode: error.statusCode || 500,
            message: error.message
        }
    });
    next(error);
};