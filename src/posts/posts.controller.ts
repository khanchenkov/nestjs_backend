import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {PostsService} from "./posts.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('posts')
@ApiTags('Записи')
export class PostsController {

    constructor(private postService: PostsService) {}

    @ApiOperation({summary: 'Показать все записи'})
    @ApiResponse({status: 200, type: [Post]})
    @Get()
    @UseInterceptors(FileInterceptor('image'))
    getAll() {
        return this.postService.getAllPosts();
    }

    @ApiOperation({summary: 'Найти 1 запись'})
    @ApiResponse({status: 200, type: Post})
    @UseGuards(JwtAuthGuard)
    @Get(":id")
    @UseInterceptors(FileInterceptor('image'))
    getPost(@Param('id') id: number) {
        return this.postService.getPostById(id);
    }

    @ApiOperation({summary: 'Создание записи'})
    @ApiResponse({status: 201, type: Post})
    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Body() dto: CreatePostDto, @UploadedFile() image) {
        return this.postService.create(dto, image);
    }

    @ApiOperation({summary: 'Редактирование записи'})
    @ApiResponse({status: 200, type: Post})
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @UseInterceptors(FileInterceptor('image'))
    editPost(@Body() dto: CreatePostDto, @UploadedFile() image, @Param('id') id: number) {
        return this.postService.update(dto, image, id);
    }

    @ApiOperation({summary: 'Удаление записи'})
    @ApiResponse({status: 200, type: Post})
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deletePost(@Param('id') id: number) {
        return this.postService.delete(id);
    }
}
