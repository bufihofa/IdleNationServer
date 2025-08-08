import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class GoogleLoginDto {
    @IsNotEmpty({ message: 'Token không được để trống' })
    @ApiProperty({ example: 'abc-xyz' })
    token: string;
}
