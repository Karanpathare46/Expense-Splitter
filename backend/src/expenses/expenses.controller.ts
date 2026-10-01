import {Body,Controller,Get,Param,Post}from'@nestjs/common';import{ExpensesService}from'./expenses.service';import{CreateExpenseDto}from'./dto';
@Controller('expenses')
export class ExpensesController{
 constructor(private service:ExpensesService){}
 @Post()create(@Body()dto:CreateExpenseDto){return this.service.create(dto);}
 @Get('summary/:groupId')summary(@Param('groupId')id:string){return this.service.summary(id);}
}
