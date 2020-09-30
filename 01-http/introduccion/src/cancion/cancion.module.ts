import {Module} from "@nestjs/common";
import {CancionController} from "./cancion.controller";
import {CancionService} from "./cancion.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CancionEntity} from "./cancion.entity";

@Module({
    controllers:[
        CancionController
    ],
    imports: [
        TypeOrmModule.forFeature(
            [
                CancionEntity
            ],
            'default'
        )
    ],
    providers:[
        CancionService
    ]
})
export class CancionModule{

}