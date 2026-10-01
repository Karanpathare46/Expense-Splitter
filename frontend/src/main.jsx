import React,{useEffect,useState}from'react';import{createRoot}from'react-dom/client';import'./style.css';
const API='http://localhost:3001/api';
function App(){
 const[name,setName]=useState('Weekend Trip'),[people,setPeople]=useState('Aman, Karan, Priya'),[group,setGroup]=useState(null);
 const[description,setDescription]=useState('Dinner'),[amount,setAmount]=useState('900'),[payer,setPayer]=useState('Aman'),[summary,setSummary]=useState(null),[error,setError]=useState('');
 const participants=people.split(',').map(x=>x.trim()).filter(Boolean);
 useEffect(()=>{if(!participants.includes(payer))setPayer(participants[0]||'')},[people]);
 async function createGroup(e){e.preventDefault();setError('');const r=await fetch(`${API}/groups`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,participants})});const d=await r.json();if(!r.ok)return setError(JSON.stringify(d.message));setGroup(d);setSummary(null)}
 async function addExpense(e){e.preventDefault();setError('');if(!group)return;const r=await fetch(`${API}/expenses`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({description,amount:Number(amount),paidBy:payer,groupId:group.id})});const d=await r.json();if(!r.ok)return setError(JSON.stringify(d.message));setSummary(await (await fetch(`${API}/expenses/summary/${group.id}`)).json())}
 return <main className="shell"><header><span>FULL-STACK PROJECT</span><h1>Expense Splitter</h1><p>React + TypeScript + NestJS + Express + PostgreSQL + TypeORM</p></header>
 <section className="card"><h2>Create group</h2><form onSubmit={createGroup} className="form"><input value={name} onChange={e=>setName(e.target.value)}/><input value={people} onChange={e=>setPeople(e.target.value)}/><button>Create</button></form></section>
 <section className="card"><h2>Add expense</h2><form onSubmit={addExpense} className="form"><input value={description} onChange={e=>setDescription(e.target.value)}/><input type="number" min="0.01" value={amount} onChange={e=>setAmount(e.target.value)}/><select value={payer} onChange={e=>setPayer(e.target.value)}>{participants.map(p=><option key={p}>{p}</option>)}</select><button disabled={!group}>Add</button></form></section>
 {error&&<div className="error">{error}</div>}
 {summary&&<section className="card"><h2>Settlement</h2><p>Total ₹{summary.total.toFixed(2)} · Each person ₹{summary.equalShare.toFixed(2)}</p>{summary.settlements.map((s,i)=><div className="row" key={i}><span>{s.from} owes {s.to}</span><b>₹{s.amount.toFixed(2)}</b></div>)}{!summary.settlements.length&&<p>Everyone is settled.</p>}</section>}
 </main>
}
createRoot(document.getElementById('root')).render(<App/>);
