export function dateKey(d=new Date()){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
export function sanitize(value){const out={};if(!value||typeof value!=='object')return out;for(const [k,v] of Object.entries(value)){if(!/^\d{4}-\d{2}-\d{2}$/.test(k)||!v||typeof v!=='object')continue;if(v.score!==null&&(!Number.isInteger(v.score)||v.score<0||v.score>10))continue;out[k]={score:v.score,note:typeof v.note==='string'?v.note.slice(0,1000):'',sessions:Array.isArray(v.sessions)?v.sessions.filter(s=>s&&['gaze','balance','walk'].includes(s.type)&&Number.isFinite(s.seconds)&&s.seconds>0&&s.seconds<=3600).map(s=>({type:s.type,seconds:s.seconds})):[]}}return out}
export class Timer{
 constructor(seconds){this.left=seconds;this.running=false;this.done=false}
 start(now){if(this.running||this.done)return;this.until=now+this.left*1000;this.running=true}
 remaining(now){return this.running?Math.max(0,Math.ceil((this.until-now)/1000)):this.left}
 pause(now){this.left=this.remaining(now);this.running=false}
 tick(now){if(this.running&&this.remaining(now)===0){this.left=0;this.running=false;this.done=true;return true}return false}
}
