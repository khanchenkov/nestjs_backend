import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'user@mail.ru', description: 'Эл. почта пользователя'})
    @IsString({message: 'Должно быть строкой'})
    @IsEmail({},{message: "Должно быть эл. почтой"})
    readonly email: string;

    @ApiProperty({example: '12345', description: 'Пароль пользователя'})
    @IsString({message: 'Должно быть строкой'})
    @Length(4, 16, {message: 'Должно быть не менее 4 и не более 16 символов'})
    readonly password: string;
}