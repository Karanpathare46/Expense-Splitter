import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './groups/group.entity';
import { Expense } from './expenses/expense.entity';
import { GroupsModule } from './groups/groups.module';
import { ExpensesModule } from './expenses/expenses.module';

@Module({
  imports:[
    TypeOrmModule.forRoot({
      type:'postgres',
      url:process.env.DATABASE_URL,
      entities:[Group,Expense],
      synchronize:true
    }),
    GroupsModule,
    ExpensesModule
  ]
})
export class AppModule {}
