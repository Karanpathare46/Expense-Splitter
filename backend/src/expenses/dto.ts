import {IsNotEmpty,IsNumber,IsString,IsUUID,Min} from 'class-validator';
export class CreateExpenseDto{
  @IsString() @IsNotEmpty() description:string;
  @IsNumber() @Min(0.01) amount:number;
  @IsString() @IsNotEmpty() paidBy:string;
  @IsUUID() groupId:string;
}
