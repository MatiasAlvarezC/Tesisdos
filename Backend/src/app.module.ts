/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BotesModule } from './botes/botes.module';
import { ReportesModule } from './reportes/reportes.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public'),}),
    TypeOrmModule.forRoot({
      type: 'mysql', 
      host: 'localhost', 
      port: 3306, 
      username: 'root', 
      password: 'admin', 
      database: 'club_de_remo', 
      entities: [__dirname + '/**/*.entity{.ts,.js}'], 
      charset: 'utf8mb4',
      //synchronize: true, // Sincroniza las entidades con la base de datos (solo para desarrollo) // CAUSA PROBLEMAS CON LAS ENTIDADES
      }),
    UserModule,
    AuthModule,
    BotesModule,
    ReportesModule
    ],

  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}