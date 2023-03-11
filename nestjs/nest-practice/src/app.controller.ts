import {
  Controller,
  Get,
  Post,
  HttpCode,
  Redirect,
  Query,
  Param,
  Req,
  Res,
  Bind,
  HostParam,
  Body,
} from "@nestjs/common";
import { Request, Response } from "express";
import { Observable, of } from "rxjs";
import { AppService, CatsService } from "./app.service";
import { CreateCatDto } from "./dto/create-cat.dto";
import { Cat } from "./interfaces/cat.interface";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

@Controller("cats")
export class CatsController {
  constructor(private catsService: CatsService) {}

  // @Get("ab*cd")
  // findAll(): string {
  //   return "this action return all cats";
  // }

  // @Get("docs")
  // @Redirect("https://docs.nestjs.com", 301)
  // getDocs(@Query("version") version) {
  //   console.log(version);
  //   if (version && version === "5") {
  //     return { url: "https://pge0823.iptime.org" };
  //   }
  // }

  // @Get(":id")
  // findOne(@Param("id") id, @Query() query): string {
  //   console.log(id);
  //   console.log(query);
  //   return `This action returns a #${id} cat`;
  // }

  // //return RxJS value
  // @Get()
  // findAll(): Observable<any[]> {
  //   return of([]);
  // }

  // // @Post()
  // @HttpCode(204)
  // create(): string {
  //   return "this action adds a new cat";
  // }

  // @Post()
  // async create(@Body() createCatDto: CreateCatDto) {
  //   return "this action adds a new cat";
  // }
  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(":name")
  async findOne(@Param("name") name: string): Promise<Cat> {
    console.log(name);
    console.log(this.catsService.findOne(name));
    return (
      this.catsService.findOne(name) ?? { name: "No", age: 0, breed: "No" }
    );
  }
}

@Controller({ host: ":account.example.com" })
export class AccountController {
  @Get()
  getInfo(@HostParam("account") account: string) {
    return account;
  }
}
