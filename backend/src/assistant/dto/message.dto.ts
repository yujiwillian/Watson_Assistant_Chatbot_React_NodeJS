import { ApiProperty } from '@nestjs/swagger';

export class MessageDto {
    @ApiProperty({
        example: 'Hello',
        description: 'Message that you want to send!',
    })
    message: string;
}
