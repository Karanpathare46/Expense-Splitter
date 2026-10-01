import {ArrayMinSize,IsArray,IsNotEmpty,IsString} from 'class-validator';
export class CreateGroupDto{
  @IsString() @IsNotEmpty() name:string;
  @IsArray() @ArrayMinSize(2) @IsString({each:true}) participants:string[];
}
