import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Expense } from '../expenses/expense.entity';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({length:100}) name: string;
  @Column('text',{array:true}) participants: string[];
  @OneToMany(()=>Expense, expense=>expense.group)
  expenses: Expense[];
}
