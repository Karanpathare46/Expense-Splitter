import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Group } from '../groups/group.entity';

@Entity('expenses')
export class Expense {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({length:160}) description: string;
  @Column('numeric',{precision:12,scale:2}) amount: number;
  @Column({length:100}) paidBy: string;
  @ManyToOne(()=>Group, group=>group.expenses,{onDelete:'CASCADE'})
  @JoinColumn({name:'groupId'}) group: Group;
}
