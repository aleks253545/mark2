"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const client = redis_1.createClient();
client.on("error", function (error) {
    console.error(error);
});
exports.default = client;
//# sourceMappingURL=redis.js.map