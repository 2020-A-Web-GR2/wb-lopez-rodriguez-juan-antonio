import {Controller, Get} from "@nestjs/common";

@Controller('cancion')
export class CancionController{

    @Get()
    mostrarTodosCanciones(){
        return 'Ok'
    }

}