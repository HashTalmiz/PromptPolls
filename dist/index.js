"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes/routes"));
const errorHandling_1 = require("./utils/errorHandling");
// Create Express app
const app = (0, express_1.default)();
// Middleware
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use('/api', routes_1.default);
app.use(errorHandling_1.errorResponse);
// Define a sample route
// app.get('/', (req: Request, res: Response) => {
//     res.send("kik");
// });
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map