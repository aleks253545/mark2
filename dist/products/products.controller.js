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
const products_service_1 = require("./products.service");
const products_dto_1 = require("./products.dto");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const auth_service_1 = require("../auth/auth.service");
const api_basic_decorator_1 = require("@nestjs/swagger/dist/decorators/api-basic.decorator");
const api_header_decorator_1 = require("@nestjs/swagger/dist/decorators/api-header.decorator");
let ProductsController = class ProductsController {
    constructor(ProductsService, authService) {
        this.ProductsService = ProductsService;
        this.authService = authService;
    }
    async showAllProducts(offset) {
        return await this.ProductsService.showProducts(offset);
    }
    uploadFile(image, data, req) {
        this.ProductsService.create(image, Object.assign(Object.assign({}, data), { userId: req.user.userId }));
    }
    readNote(id) {
        return this.ProductsService.read(id);
    }
    updateProduct(id, image, data, req) {
        return this.ProductsService.update(id, data, image, req.user.userId);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "showAllProducts", null);
__decorate([
    api_header_decorator_1.ApiHeader({
        name: 'Authorization',
        description: 'user jwt token',
    }),
    api_basic_decorator_1.ApiBasicAuth(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post(),
    common_1.UseInterceptors(platform_express_1.FilesInterceptor('image')),
    __param(0, common_1.UploadedFiles()), __param(1, common_1.Body()), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, products_dto_1.ProductsDTO, Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "uploadFile", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "readNote", null);
__decorate([
    api_header_decorator_1.ApiHeader({
        name: 'Authorization',
        description: 'user jwt token',
    }),
    api_basic_decorator_1.ApiBasicAuth(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Put(':id'),
    common_1.UseInterceptors(platform_express_1.FilesInterceptor('image')),
    __param(0, common_1.Param('id')), __param(1, common_1.UploadedFiles()), __param(2, common_1.Body()), __param(3, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, products_dto_1.ProductsDTO, Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "updateProduct", null);
ProductsController = __decorate([
    common_1.Controller('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService,
        auth_service_1.AuthService])
], ProductsController);
exports.ProductsController = ProductsController;
//# sourceMappingURL=products.controller.js.map