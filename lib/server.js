"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const runtimeConfig_1 = require("./src/config/runtimeConfig");
const next_1 = __importDefault(require("next"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const dev = process.env.NODE_ENV !== 'production';
const app = (0, next_1.default)({ dev });
const handle = app.getRequestHandler();
const port = parseInt(process.env.PORT || '3000', 10);
app.prepare().then(() => {
    const server = (0, express_1.default)();
    if (!dev) {
        server.use((0, morgan_1.default)('combined', {
            skip: (req) => {
                var _a;
                if (((_a = req === null || req === void 0 ? void 0 : req.originalUrl) === null || _a === void 0 ? void 0 : _a.includes('/healthcheck')) &&
                    (0, runtimeConfig_1.shouldSkipHealthLog)((0, runtimeConfig_1.getRuntimeConfig)())) {
                    return true;
                }
                return false;
            },
        }));
        server.use((0, compression_1.default)());
    }
    server.disable('x-powered-by');
    server.use((req, res) => {
        return handle(req, res);
    });
    server.listen(port, '0.0.0.0', (err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`> Started on port ${port}`);
    });
});
