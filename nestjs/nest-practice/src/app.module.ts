import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from "@nestjs/common";
import {
  AppController,
  CatsController,
  AccountController,
} from "./app.controller";
import { AppService, CatsService } from "./app.service";
import { LoggerMiddleware } from "./middleware/logger.middleware";

@Module({
  imports: [],
  controllers: [AppController, CatsController, AccountController],
  providers: [AppService, CatsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("cats", "/");
    // .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
