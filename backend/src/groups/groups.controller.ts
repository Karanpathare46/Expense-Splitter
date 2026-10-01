import {Body,Controller,Get,Param,Post} from '@nestjs/common';
import {GroupsService} from './groups.service';
import {CreateGroupDto} from './dto';
@Controller('groups')
export class GroupsController{
 constructor(private service:GroupsService){}
 @Post()create(@Body()dto:CreateGroupDto){return this.service.create(dto);}
 @Get(':id')findOne(@Param('id')id:string){return this.service.findOne(id);}
}
