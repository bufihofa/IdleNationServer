import { Module } from "@nestjs/common";
import { User } from "./entity/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [],
    providers: [],
})  
export class UserModule {}