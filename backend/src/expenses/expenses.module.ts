import{Module}from'@nestjs/common';import{TypeOrmModule}from'@nestjs/typeorm';import{Expense}from'./expense.entity';import{Group}from'../groups/group.entity';import{ExpensesService}from'./expenses.service';import{ExpensesController}from'./expenses.controller';
@Module({imports:[TypeOrmModule.forFeature([Expense,Group])],controllers:[ExpensesController],providers:[ExpensesService]})
export class ExpensesModule{}
