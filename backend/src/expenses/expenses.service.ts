import {BadRequestException,Injectable,NotFoundException}from'@nestjs/common';import{InjectRepository}from'@nestjs/typeorm';import{Repository}from'typeorm';import{Expense}from'./expense.entity';import{Group}from'../groups/group.entity';import{CreateExpenseDto}from'./dto';
@Injectable()
export class ExpensesService{
 constructor(@InjectRepository(Expense)private expenses:Repository<Expense>,@InjectRepository(Group)private groups:Repository<Group>){}
 async create(dto:CreateExpenseDto){
  const group=await this.groups.findOne({where:{id:dto.groupId}});
  if(!group)throw new NotFoundException('Group not found');
  if(!group.participants.includes(dto.paidBy))throw new BadRequestException('Payer must be a participant');
  return this.expenses.save(this.expenses.create({description:dto.description,amount:dto.amount,paidBy:dto.paidBy,group}));
 }
 async summary(groupId:string){
  const group=await this.groups.findOne({where:{id:groupId},relations:{expenses:true}});
  if(!group)throw new NotFoundException('Group not found');
  const paid:Record<string,number>=Object.fromEntries(group.participants.map(p=>[p,0]));
  for(const e of group.expenses)paid[e.paidBy]+=Number(e.amount);
  const total=group.expenses.reduce((s,e)=>s+Number(e.amount),0);
  const share=total/group.participants.length;
  const debtors=group.participants.map(name=>({name,amount:Math.max(0,share-paid[name])})).filter(x=>x.amount>0.01);
  const creditors=group.participants.map(name=>({name,amount:Math.max(0,paid[name]-share)})).filter(x=>x.amount>0.01);
  const settlements:{from:string;to:string;amount:number}[]=[];
  let i=0,j=0;
  while(i<debtors.length&&j<creditors.length){
   const amount=Math.min(debtors[i].amount,creditors[j].amount);
   settlements.push({from:debtors[i].name,to:creditors[j].name,amount:Number(amount.toFixed(2))});
   debtors[i].amount-=amount;creditors[j].amount-=amount;
   if(debtors[i].amount<0.01)i++;if(creditors[j].amount<0.01)j++;
  }
  return {total:Number(total.toFixed(2)),equalShare:Number(share.toFixed(2)),paid,settlements};
 }
}
