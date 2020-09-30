import {Module} from "@nestjs/common";
import {CancionService} from "./cancion.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CancionEntity} from "./cancion.entity";
import {CancionController} from "./cancion.controller";

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