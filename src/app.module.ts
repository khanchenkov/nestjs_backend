import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/user.model";
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import {Post} from "./posts/posts.model";
import { FilesModule } from './files/files.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from 'path';
import sequelize from "sequelize";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static')
        }),
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        // SequelizeModule.forRoot({
        //     dialect: 'postgres',
        //     host: process.env.POSTGRES_HOST,
        //     port: Number(process.env.POSTGRES_PORT),
        //     username: process.env.POSTGRES_USER,
        //     password: process.env.POSTGRES_PASSWORD,
        //     database: process.env.POSTGRES_DB,
        //     models: [User, Post],
        //     autoLoadModels: true
        // }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: 'ec2-54-87-179-4.compute-1.amazonaws.com',
            port: 5432,
            username: 'ibkveczyqtvhng',
            password: 'd6eadfee7f844e65af54a6bf87fa23d5c64cdef301cea23774602ad0dd1f0c31',
            database: 'd52c22i6in5mk8',
            models: [User, Post],
            ssl: true,
            autoLoadModels: true
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            uri: 'postgres://ibkveczyqtvhng:d6eadfee7f844e65af54a6bf87fa23d5c64cdef301cea23774602ad0dd1f0c31@ec2-54-87-179-4.compute-1.amazonaws.com:5432/d52c22i6in5mk8',
            models: [User, Post],
            ssl: true,
            autoLoadModels: true
        }),
        // SequelizeModule.forRoot({
        //
        // }),
        UsersModule,
        AuthModule,
        PostsModule,
        FilesModule
    ],
})

export class AppModule {}