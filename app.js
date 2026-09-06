const exercises=[
['Push Ups','Chest · Shoulders · Triceps'],['Squats','Legs · Glutes'],['Deadlifts','Back · Legs'],['Bench Press','Chest · Triceps'],['Plank','Core'],['Running','Cardio'],['Bicep Curls','Arms'],['Lunges','Legs · Glutes']
];
const meals=[['🍳 Breakfast','420 kcal'],['🥗 Lunch','520 kcal'],['🍲 Dinner','480 kcal'],['🍎 Snacks','180 kcal']];
const muscles=[['Chest',80],['Back',70],['Shoulders',65],['Arms',60],['Legs',75],['Core',50]];
let totalFood=1250, burned=423;

function showScreen(id){
 document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
 document.getElementById(id).classList.add('active');
 window.scrollTo(0,0);
}
function renderExercises(list=exercises){
 document.getElementById('exerciseList').innerHTML=list.map((e,i)=>`<div class="exercise"><div class="exercise-img"></div><div><b>${e[0]}</b><small>${e[1]}</small></div><span>›</span></div>`).join('');
}
function filterExercises(){
 const q=document.getElementById('exerciseSearch').value.toLowerCase();
 renderExercises(exercises.filter(e=>e.join(' ').toLowerCase().includes(q)));
}
function renderMeals(){
 document.getElementById('mealList').innerHTML=meals.map(m=>`<div class="meal"><b>${m[0]}</b><span>${m[1]}</span></div>`).join('');
 document.getElementById('foodTotal').textContent=totalFood;
 document.getElementById('foodHome').textContent=`${totalFood.toLocaleString()} / 2,500`;
}
function addFood(){
 const name=prompt('Food name?');
 if(!name)return;
 const cal=Number(prompt('Calories?')||0);
 meals.push([`🍽️ ${name}`,`${cal} kcal`]); totalFood+=cal; renderMeals();
}
function calculateBMR(){
 const age=+document.getElementById('age').value||25;
 const weight=+document.getElementById('weight').value||70;
 const height=+document.getElementById('height').value||175;
 const bmr=Math.round(10*weight+6.25*height-5*age+5);
 document.getElementById('bmrResult').textContent=`${bmr.toLocaleString()} calories/day`;
}
function setupSelectable(){
 document.querySelectorAll('.chips,.gender,#goals').forEach(group=>{
   group.querySelectorAll('button').forEach(btn=>btn.onclick=()=>{group.querySelectorAll('button').forEach(x=>x.classList.remove('active','selected'));btn.classList.add(group.id==='goals'?'selected':'active');});
 });
}
function setupDays(){
 const days=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
 document.getElementById('days').innerHTML=days.map((d,i)=>`<button class="${i<5?'on':''}">${d}</button>`).join('');
 document.querySelectorAll('#days button').forEach(b=>b.onclick=()=>b.classList.toggle('on'));
}
function renderProgress(){
 document.getElementById('muscles').innerHTML=muscles.map(m=>`<div class="muscle-row"><div><span>${m[0]}</span><b>${m[1]}%</b></div><i style="width:${m[1]}%"></i></div>`).join('');
 const vals=[40,75,52,82,58,76,63], names=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
 document.getElementById('bars').innerHTML=vals.map((v,i)=>`<div class="bar" style="height:${v}%"><small>${names[i]}</small></div>`).join('');
 document.getElementById('burnedHome').textContent=`${burned} kcal`;
 document.getElementById('burnedProgress').textContent=`${burned} kcal today`;
}
renderExercises();renderMeals();renderProgress();setupSelectable();setupDays();