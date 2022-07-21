import { Injectable } from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Post} from "./posts.model";
import {FilesService} from "../files/files.service";

@Injectable()
export class PostsService {

    constructor(
        @InjectModel(Post) private postRepository: typeof Post,
        private fileService: FilesService
    ) {}

    async getAllPosts() {
        return await this.postRepository.findAll({include: {all: true}});
    }

    async getPostById(id) {
        const post = await this.postRepository.findOne({where: {id}});
        return post;
    }

    async create(dto: CreatePostDto, image: any) {
        let fileName;
        if (image) {
            fileName = await this.fileService.createFile(image);
        }
        const post = await this.postRepository.create({...dto, image: fileName});
        return post;
    }

    async update(dto: CreatePostDto, image: any, id: number) {
        const prevPost = await this.getPostById(id);

        let fileName;
        if (image) {
            fileName = await this.fileService.createFile(image);
        } else {
            fileName = prevPost.image;
        }

        const post = await this.postRepository.update({...dto, image: fileName}, {where: {id: id}});
        return post;
    }

    async delete(id) {
        const isDeleted = await this.postRepository.destroy({where: {id}})
        return Boolean(isDeleted);
    }
}
