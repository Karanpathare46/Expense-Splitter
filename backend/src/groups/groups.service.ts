import {Injectable,NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Group} from './group.entity';
import {CreateGroupDto} from './dto';

@Injectable()
export class GroupsService{
 constructor(@InjectRepository(Group)private repo:Repository<Group>){}
 create(dto:CreateGroupDto){return this.repo.save(this.repo.create(dto));}
 async findOne(id:string){
  const group=await this.repo.findOne({where:{id},relations:{expenses:true}});
  if(!group)throw new NotFoundException('Group not found');
  return group;
 }
}
