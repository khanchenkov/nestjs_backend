import {ApiProperty} from "@nestjs/swagger";

export class CreatePostDto {
    @ApiProperty({example: 'Первая запись', description: 'Заголовок заметки'})
    readonly title: string;
    @ApiProperty({example: 'Всем привет!', description: 'Текст заметки'})
    readonly content: string;
    @ApiProperty({example: '1', description: 'Идентификатор пользователя'})
    readonly userId: number;
}