import { ApiProperty } from '@nestjs/swagger';
import { PayloadData } from 'actions/interfaces';

export class ChatDto {
    @ApiProperty({
        example: '0f46f678-f141-4948-b3be-e20f9d3772cb',
        description: 'Chat id of the conversation',
        required: false,
    })
    readonly chatId: string;

    @ApiProperty({
        example: 'Seguradora',
        description: 'The watson response',
        required: false,
    })
    readonly message: string;

    @ApiProperty({
        example: '',
        description: 'The payload we send to watson assistant',
        required: false,
    })
    readonly payload: PayloadData;
}
