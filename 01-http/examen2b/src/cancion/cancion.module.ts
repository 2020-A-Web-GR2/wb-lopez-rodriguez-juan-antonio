import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CancionController} from "./cancion.controller";
import {CancionService} from "./cancion.service";
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