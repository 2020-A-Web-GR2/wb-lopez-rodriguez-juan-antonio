import {Module} from "@nestjs/common";
import {CancionController} from "./cancion.controller";
import {CancionService} from "./cancion.service";

@Module({
    controllers:[
        CancionController
    ],
    imports: [],
    providers:[
        CancionService
    ]
})
export class CancionModule{

}