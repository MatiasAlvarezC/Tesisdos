/* eslint-disable prettier/prettier */
import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRoot(@Res() res: Response) {
    res.sendFile(join(__dirname, '..', 'public', 'index.html'));
  }
  
  @Get('Public/users-form.html')
  getCrearSocio(@Res() res: Response) {
    res.sendFile(join(__dirname, '..', 'public', 'users-form.html'));

  }
}
