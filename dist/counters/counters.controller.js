"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const counters_service_1 = require("./counters.service");
const auth_service_1 = require("../auth/auth.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const api_basic_decorator_1 = require("@nestjs/swagger/dist/decorators/api-basic.decorator");
let CountersController = class CountersController {
    constructor(CountersService, authService) {
        this.CountersService = CountersService;
        this.authService = authService;
    }
    updateNote(id, data, req) {
        return this.CountersService.update(id, Object.assign(Object.assign({}, data), { userId: req.user.userId }));
    }
};
__decorate([
    api_basic_decorator_1.ApiBasicAuth(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Put(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], CountersController.prototype, "updateNote", null);
CountersController = __decorate([
    common_1.Controller('counters'),
    __metadata("design:paramtypes", [counters_service_1.CountersService,
        auth_service_1.AuthService])
], CountersController);
exports.CountersController = CountersController;
//# sourceMappingURL=counters.controller.js.map