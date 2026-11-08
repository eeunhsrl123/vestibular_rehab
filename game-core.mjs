export class Session {
  constructor(duration) { this.duration=duration; this.elapsed=0; this.state='ready'; }
  start(){ if(['ready','paused'].includes(this.state))this.state='running'; }
  pause(){ if(this.state==='running')this.state='paused'; }
  stop(){ if(this.state!=='done')this.state='stopped'; }
  advance(dt){ if(this.state!=='running')return false; this.elapsed=Math.min(this.duration,this.elapsed+Math.max(0,dt)); if(this.elapsed>=this.duration){this.state='done';return true} return false; }
  get remaining(){return Math.max(0,Math.ceil(this.duration-this.elapsed));}
}
export function trackingPoint(t,speed=1,direction='horizontal'){
  const offset=Math.sin(t*speed*.45)*260;
  return direction==='vertical'?{x:450,y:220+offset*.45}:{x:450+offset,y:220};
}
export class World {
  constructor(){this.platforms=[{x:40,y:360,w:180},{x:270,y:310,w:160},{x:480,y:265,w:160},{x:690,y:215,w:170}];this.stars=this.platforms.map(p=>({x:p.x+p.w/2,y:p.y-50,taken:false}));this.ball={x:100,y:310,vy:0};this.score=0;this.falls=0;}
  step(dt,axis){dt=Math.min(.05,Math.max(0,dt));const b=this.ball,oldY=b.y;b.x=Math.max(16,Math.min(884,b.x+axis*210*dt));b.vy+=650*dt;b.y+=b.vy*dt;
    if(b.vy>0)for(const p of this.platforms){if(b.x+13>=p.x&&b.x-13<=p.x+p.w&&oldY+14<=p.y&&b.y+14>=p.y){b.y=p.y-14;b.vy=-350;break}}
    for(const s of this.stars)if(!s.taken&&Math.hypot(s.x-b.x,s.y-b.y)<32){s.taken=true;this.score++}
    if(b.y>490){this.falls++;this.ball={x:100,y:310,vy:0};}
  }
}
export function cleanGameRecords(value){if(!Array.isArray(value))return [];return value.filter(r=>r&&/^\d{4}-\d{2}-\d{2}$/.test(r.date)&&['gaze','track','bounce'].includes(r.mode)&&[15,30,60,120].includes(r.seconds)&&Number.isInteger(r.score)&&r.score>=0&&r.score<=4).map(({date,mode,seconds,score})=>({date,mode,seconds,score})).slice(-200);}
