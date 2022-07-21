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
        SequelizeModule.forRoot({
            dialect: 'postgres',
            uri: process.env.DATABASE_URL,
            models: [User, Post],
            // dialectOptions: {
            //     ssl: {
            //         require: true,
            //         rejectUnauthorized: false
            //     }
            // },
            autoLoadModels: true
        }),
        UsersModule,
        AuthModule,
        PostsModule,
        FilesModule
    ],
})

export class AppModule {}