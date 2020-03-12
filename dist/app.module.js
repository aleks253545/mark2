"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("./users/users.module");
const products_controller_1 = require("./products/products.controller");
const products_service_1 = require("./products/products.service");
const products_module_1 = require("./products/products.module");
const carts_controller_1 = require("./carts/carts.controller");
const carts_service_1 = require("./carts/carts.service");
const carts_module_1 = require("./carts/carts.module");
const users_controller_1 = require("./users/users.controller");
const users_service_1 = require("./users/users.service");
const schedule_1 = require("@nestjs/schedule");
const counters_controller_1 = require("./counters/counters.controller");
const counters_service_1 = require("./counters/counters.service");
const multer_module_1 = require("@nestjs/platform-express/multer/multer.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5431,
                username: 'postgres',
                password: 'aleks1998',
                database: 'postgres',
                autoLoadEntities: true,
                synchronize: true,
            }),
            users_module_1.UsersModule,
            products_module_1.ProductsModule,
            carts_module_1.CartsModule,
            multer_module_1.MulterModule.register({
                dest: './uploads'
            }),
            schedule_1.ScheduleModule.forRoot()
        ],
        controllers: [products_controller_1.ProductsController, carts_controller_1.CartsController, users_controller_1.UsersController, counters_controller_1.CountersController],
        providers: [products_service_1.ProductsService, carts_service_1.CartsService, users_service_1.UsersService, counters_service_1.CountersService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map