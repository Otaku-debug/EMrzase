import { useState, useEffect, useRef, useCallback } from "react";
import { QUESTION_BANK, SPECIALTIES } from "./questions.js";

const C = {
  bg:"#0f1923", bgCard:"#162030", bgPanel:"#1c2a3a",
  teal:"#0e8c8c", tealLight:"#14a8a8", tealDim:"#0a6666", navy:"#1a2744",
  border:"rgba(14,140,140,0.18)", text:"#e8f0f5",
  textMid:"rgba(232,240,245,0.65)", textDim:"rgba(232,240,245,0.35)",
  success:"#22c55e", danger:"#ef4444",
};

const COMPANY = {
  number:"16791155", address:"28 Copperfield Street, Blackburn, England, BB1 1RB",
  incorporated:"16 October 2025", sic:"86210 - General Medical Practice Activities",
  directors:[
    {name:"Dr. Emad Elsayed Hassan Ali", role:"Director", appointed:"16 Oct 2025"},
    {name:"Dr. Mariam Mohamed Elmamoon Yehia Zakaria", role:"Director", appointed:"20 Jan 2026"},
  ],
};

const NAV = ["Home","About","Services","Videos","Quiz","Leaderboard","Contact"];

const TOPIC_COLORS = {
  "Cardiology":"#ef4444","Emergency Medicine":"#f97316","Endocrinology":"#3b82f6",
  "Nephrology":"#22c55e","Respiratory":"#8b5cf6","Neurology":"#eab308",
  "Surgery":"#ec4899","Gastroenterology":"#14b8a6","Urology":"#06b6d4",
  "Rheumatology":"#a855f7","Psychiatry":"#d946ef","Haematology":"#f43f5e",
  "Vascular":"#0ea5e9","General Practice":"#4a9eff","Paediatrics":"#22d37e",
  "Anaesthesia":"#94a3b8","Radiology":"#38bdf8","Obstetrics & Gynaecology":"#f472b6",
};

const SERVICES = [
  {title:"General Medical Practice",desc:"Registered under SIC 86210, delivering professional general medical practice activities and clinical care.",tag:"Core Service",img:"https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80"},
  {title:"Primary Healthcare",desc:"Comprehensive primary care services focused on prevention, diagnosis and treatment from our Blackburn base.",tag:"Primary Care",img:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"},
  {title:"Patient Consultations",desc:"Professional patient-centred consultations delivered with clinical rigour and genuine compassion.",tag:"Consultations",img:"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80"},
  {title:"Health Assessments",desc:"Thorough health assessments carried out by our experienced, Companies House verified directors.",tag:"Assessments",img:"https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&q=80"},
];

const VIDEOS = [
  {id:"Gsu8NT1yYes",title:"Congestive Heart Failure",channel:"Ninja Nerd",topic:"Cardiology"},
  {id:"8Yv3VfAS9sU",title:"Septic Shock Pathophysiology",channel:"Ninja Nerd",topic:"Emergency Medicine"},
  {id:"rh8ycjPCj18",title:"Diabetes Mellitus Type 1 & 2",channel:"Ninja Nerd",topic:"Endocrinology"},
  {id:"EgGOwekD1O8",title:"Acute Kidney Injury",channel:"Ninja Nerd",topic:"Nephrology"},
  {id:"lzyUVVOqyS0",title:"Pneumonia Overview",channel:"Ninja Nerd",topic:"Respiratory"},
  {id:"7lpqxDEfszY",title:"Ischaemic & Haemorrhagic Stroke",channel:"Ninja Nerd",topic:"Neurology"},
  {id:"VEpBk8OEVsA",title:"Hypertension Pathophysiology",channel:"Ninja Nerd",topic:"Cardiology"},
  {id:"4A9SBnkNgq8",title:"Acute Appendicitis",channel:"Ninja Nerd",topic:"Surgery"},
  {id:"9TMBK7jFATs",title:"Asthma Pathophysiology",channel:"Ninja Nerd",topic:"Respiratory"},
  {id:"e5XSGmeCaW4",title:"Chronic Kidney Disease",channel:"Ninja Nerd",topic:"Nephrology"},
  {id:"FPaOBhkuIhk",title:"Hypothyroidism & Hyperthyroidism",channel:"Ninja Nerd",topic:"Endocrinology"},
  {id:"bfAE52gJWNE",title:"Pulmonary Embolism",channel:"Ninja Nerd",topic:"Respiratory"},
  {id:"AhDqM2a2sBk",title:"Myocardial Infarction",channel:"Ninja Nerd",topic:"Cardiology"},
  {id:"2DJNnTKTols",title:"Liver Cirrhosis",channel:"Ninja Nerd",topic:"Gastroenterology"},
  {id:"IFpDqfcFkvo",title:"Urinary Tract Infections",channel:"Ninja Nerd",topic:"Urology"},
  {id:"TFoHaVHknLI",title:"Rheumatoid Arthritis",channel:"Ninja Nerd",topic:"Rheumatology"},
  {id:"vkXuFBBOHHo",title:"Bipolar Disorder",channel:"Ninja Nerd",topic:"Psychiatry"},
  {id:"T_tTBBuIqlw",title:"Meningitis & Encephalitis",channel:"Ninja Nerd",topic:"Neurology"},
  {id:"j_xPJBQYDy4",title:"Iron Deficiency Anaemia",channel:"Ninja Nerd",topic:"Haematology"},
  {id:"nKHMDLvTMFY",title:"Pancreatitis",channel:"Ninja Nerd",topic:"Gastroenterology"},
  {id:"LGkfqL5GIAM",title:"Deep Vein Thrombosis",channel:"Ninja Nerd",topic:"Vascular"},
  {id:"kBsWfEfQDIE",title:"Schizophrenia",channel:"Ninja Nerd",topic:"Psychiatry"},
  {id:"p8bX7c2QqEA",title:"Crohn's Disease & Ulcerative Colitis",channel:"Ninja Nerd",topic:"Gastroenterology"},
  {id:"BtGKsCEtDWs",title:"Osteoporosis",channel:"Ninja Nerd",topic:"Rheumatology"},
  {id:"NUKkYiCZhY4",title:"Atrial Fibrillation",channel:"Ninja Nerd",topic:"Cardiology"},
  {id:"7XGinepFdtY",title:"Epilepsy & Seizures",channel:"Ninja Nerd",topic:"Neurology"},
  {id:"6bCnSfJUPME",title:"Glomerulonephritis",channel:"Ninja Nerd",topic:"Nephrology"},
  {id:"hAhJoAzZQEc",title:"Addison's & Cushing's Disease",channel:"Ninja Nerd",topic:"Endocrinology"},
  {id:"FP8GHlkG2nQ",title:"Community Acquired Pneumonia",channel:"Ninja Nerd",topic:"Respiratory"},
  {id:"QV9TqnJL7gQ",title:"Sepsis Recognition & Management",channel:"Ninja Nerd",topic:"Emergency Medicine"},
];

// Stethoscope SVG logo
function StethoscopeSVG({size=40, light=true}) {
  const c1 = light ? "#0e8c8c" : "#1a2744";
  const c2 = light ? "#e8f0f5" : "#0e8c8c";
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      <path d="M10 8 C10 8 8 13 8 17 C8 21 11 23 14 23" stroke={c1} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M34 8 C34 8 36 13 36 17 C36 21 33 23 30 23" stroke={c1} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <circle cx="10" cy="7.5" r="2.5" fill={c1}/>
      <circle cx="34" cy="7.5" r="2.5" fill={c1}/>
      <path d="M14 23 C14 29 18 31 22 31 C26 31 30 29 30 23" stroke={c1} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <line x1="22" y1="31" x2="22" y2="37" stroke={c1} strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="22" cy="40" r="3.5" fill={c1}/>
      <circle cx="22" cy="40" r="1.8" fill={c2}/>
    </svg>
  );
}

function Logo({size="md"}) {
  const em = {sm:20,md:26,lg:38}[size]||26;
  const sv = {sm:30,md:40,lg:58}[size]||40;
  const sub = {sm:8,md:9,lg:11}[size]||9;
  return (
    <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
      <StethoscopeSVG size={sv}/>
      <div style={{borderLeft:"2px solid rgba(14,140,140,0.5)",paddingLeft:"10px"}}>
        <div style={{display:"flex",alignItems:"baseline",gap:"0px"}}>
          <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:em,fontWeight:600,color:"#e8f0f5",letterSpacing:"-0.01em"}}>EM</span>
          <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:em,fontWeight:300,color:"#14a8a8",letterSpacing:"-0.01em"}}>rzase</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"5px",marginTop:"1px"}}>
          <div style={{height:"1px",width:"12px",background:"rgba(14,140,140,0.5)"}}/>
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:sub,letterSpacing:"0.22em",textTransform:"uppercase",color:"#14a8a8"}}>Healthcare</span>
          <div style={{height:"1px",width:"12px",background:"rgba(14,140,140,0.5)"}}/>
        </div>
      </div>
    </div>
  );
}

// Storage helpers using window.storage API
async function storageGet(key) {
  try { const r = await window.storage.get(key); return r ? JSON.parse(r.value) : null; } catch { return null; }
}
async function storageSet(key, val) {
  try { await window.storage.set(key, JSON.stringify(val)); } catch {}
}

// Intersection observer fade
function useInView(t=0.1){const ref=useRef(null);const[v,sv]=useState(false);useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)sv(true);},{threshold:t});if(ref.current)o.observe(ref.current);return()=>o.disconnect();},[]);return[ref,v];}
function FadeIn({children,delay=0,style={}}){const[ref,v]=useInView();return(<div ref={ref} style={{opacity:v?1:0,transform:v?"translateY(0)":"translateY(20px)",transition:`opacity 0.6s ease ${delay}ms,transform 0.6s ease ${delay}ms`,...style}}>{children}</div>);}

const iStyle = {
  width:"100%",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(14,140,140,0.2)",
  padding:"12px 14px",fontFamily:"'DM Sans',sans-serif",fontSize:"14px",
  color:"#e8f0f5",outline:"none",transition:"border-color 0.3s",
};
const btnS = {background:"linear-gradient(135deg,#0e8c8c,#0a6666)",border:"none",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",letterSpacing:"0.14em",textTransform:"uppercase",cursor:"pointer",transition:"all 0.3s"};
const btnO = {background:"transparent",border:"1px solid #0e8c8c",color:"#14a8a8",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",letterSpacing:"0.14em",textTransform:"uppercase",cursor:"pointer",transition:"all 0.3s"};

// AUTH MODAL
function AuthModal({onClose,onAuth}) {
  const [mode,setMode]=useState("login");
  const [email,setEmail]=useState("");
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [err,setErr]=useState("");

  const submit = async () => {
    if(!email||!password){setErr("All fields required.");return;}
    if(mode==="register"){
      if(!username||username.length<3){setErr("Username must be 3+ characters.");return;}
      const ex = await storageGet("user:"+email.toLowerCase());
      if(ex){setErr("Email already registered.");return;}
      const u={email:email.toLowerCase(),username,ph:btoa(password),joined:new Date().toISOString(),watchedVideos:{},quizHistory:{}};
      await storageSet("user:"+email.toLowerCase(),u);
      await storageSet("session",u);
      onAuth(u); onClose();
    } else {
      const u = await storageGet("user:"+email.toLowerCase());
      if(!u){setErr("No account with this email.");return;}
      if(u.ph!==btoa(password)){setErr("Incorrect password.");return;}
      await storageSet("session",u);
      onAuth(u); onClose();
    }
  };

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}>
      <div style={{background:C.bgPanel,border:`1px solid ${C.border}`,padding:"40px 36px",width:"100%",maxWidth:"400px",position:"relative"}}>
        <button onClick={onClose} style={{position:"absolute",top:"14px",right:"14px",background:"none",border:"none",color:C.textDim,cursor:"pointer",fontSize:"18px"}}>✕</button>
        <div style={{marginBottom:"24px"}}><Logo size="sm"/></div>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"24px",fontWeight:300,marginBottom:"6px",color:C.text}}>{mode==="login"?"Welcome back":"Create account"}</h2>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.textDim,marginBottom:"24px"}}>{mode==="login"?"Sign in to access quizzes, track videos and join the leaderboard.":"Join to track your progress, take quizzes and compete globally."}</p>
        {err&&<div style={{background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.35)",padding:"9px 12px",marginBottom:"16px",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:"#fca5a5"}}>{err}</div>}
        <div style={{display:"flex",flexDirection:"column",gap:"14px"}}>
          <input value={email} onChange={e=>{setEmail(e.target.value);setErr("");}} placeholder="Email address" type="email" style={iStyle}/>
          {mode==="register"&&<input value={username} onChange={e=>{setUsername(e.target.value);setErr("");}} placeholder="Choose a username" style={iStyle}/>}
          <input value={password} onChange={e=>{setPassword(e.target.value);setErr("");}} placeholder="Password" type="password" style={iStyle} onKeyDown={e=>e.key==="Enter"&&submit()}/>
          <button onClick={submit} style={{...btnS,padding:"13px"}}>{mode==="login"?"Sign In":"Create Account"}</button>
        </div>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.textDim,marginTop:"18px",textAlign:"center"}}>
          {mode==="login"?"No account? ":"Already registered? "}
          <span onClick={()=>{setMode(mode==="login"?"register":"login");setErr("");}} style={{color:C.tealLight,cursor:"pointer",textDecoration:"underline"}}>
            {mode==="login"?"Register free":"Sign in"}
          </span>
        </p>
      </div>
    </div>
  );
}

// QUIZ
function Quiz({user,onScore}) {
  const [spec,setSpec]=useState(null);
  const [qs,setQs]=useState([]);
  const [qi,setQi]=useState(0);
  const [sel,setSel]=useState(null);
  const [score,setScore]=useState(0);
  const [done,setDone]=useState(false);
  const [exp,setExp]=useState(false);
  const [posted,setPosted]=useState(false);
  const [anonMsg,setAnonMsg]=useState("");
  const [usedIdx,setUsedIdx]=useState({});

  const start = useCallback((s) => {
    const pool = QUESTION_BANK[s]||[];
    const used = usedIdx[s]||[];
    let avail = pool.map((_,i)=>i).filter(i=>!used.includes(i));
    if(avail.length<10){ avail=pool.map((_,i)=>i); setUsedIdx(prev=>({...prev,[s]:[]})); }
    const shuffled=[...avail].sort(()=>Math.random()-0.5);
    const chosen=shuffled.slice(0,10);
    setUsedIdx(prev=>({...prev,[s]:[...(prev[s]||[]),...chosen]}));
    setQs(chosen.map(i=>pool[i]));
    setSpec(s); setQi(0); setSel(null); setScore(0); setDone(false); setExp(false); setPosted(false); setAnonMsg("");
  },[usedIdx]);

  const answer = (i) => {
    if(sel!==null)return;
    setSel(i); setExp(true);
    if(i===qs[qi].a) setScore(sc=>sc+1);
  };

  const next = () => {
    if(qi+1>=qs.length){setDone(true);return;}
    setQi(n=>n+1); setSel(null); setExp(false);
  };

  const post = async (anon) => {
    const name = anon?"Anonymous":(user?.username||"Anonymous");
    const entry={username:name,score,total:qs.length,pct:Math.round((score/qs.length)*100),date:new Date().toISOString(),specialty:spec};
    await onScore(spec,entry);
    setPosted(true);
    if(anon){
      setAnonMsg("Your score has been posted anonymously. No identifying information has been saved — your privacy is completely protected.");
    } else {
      setAnonMsg(`Your score has been posted as "${user?.username}". Your result is now live on the ${spec} leaderboard — great work!`);
    }
  };

  const ac = spec?(TOPIC_COLORS[spec]||C.teal):C.teal;

  if(!spec) return (
    <div>
      <p style={{fontFamily:"'DM Sans',sans-serif",color:C.textMid,marginBottom:"24px",fontSize:"13px",lineHeight:1.8}}>
        Choose a specialty below. Each quiz randomly draws 10 specialist-level questions. Questions rotate through the entire pool so you won't repeat the same question until you've answered every one.
      </p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:"9px"}}>
        {SPECIALTIES.map(s=>{
          const col=TOPIC_COLORS[s]||C.teal;
          const pool=(QUESTION_BANK[s]||[]).length;
          const answered=(usedIdx[s]||[]).length;
          return(
            <button key={s} onClick={()=>start(s)} style={{background:C.bgPanel,border:`1px solid ${col}28`,padding:"18px 14px",cursor:"pointer",textAlign:"left",transition:"all 0.22s",color:C.text,display:"flex",flexDirection:"column",gap:"7px"}}
              onMouseEnter={e=>{e.currentTarget.style.background=`${col}10`;e.currentTarget.style.borderColor=`${col}60`;}}
              onMouseLeave={e=>{e.currentTarget.style.background=C.bgPanel;e.currentTarget.style.borderColor=`${col}28`;}}>
              <div style={{width:"7px",height:"7px",background:col,borderRadius:"50%"}}/>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"15px",fontWeight:400,lineHeight:1.25}}>{s}</div>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:C.textDim}}>{pool} questions {answered>0&&<span style={{color:col}}>· {answered} done</span>}</div>
            </button>
          );
        })}
      </div>
    </div>
  );

  if(done){
    const pct=Math.round((score/qs.length)*100);
    const msg=pct>=90?"Outstanding — exceptional clinical knowledge":pct>=70?"Strong performance — review the explanations":pct>=50?"Good effort — focus on the areas you missed":"Keep studying — every attempt builds your knowledge";
    return(
      <div style={{textAlign:"center",padding:"28px 0"}}>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(52px,10vw,76px)",fontWeight:300,color:ac,letterSpacing:"-0.03em",lineHeight:1}}>{score}/{qs.length}</div>
        <div style={{width:"100%",height:"3px",background:"rgba(255,255,255,0.07)",margin:"18px 0",borderRadius:"2px"}}>
          <div style={{width:`${pct}%`,height:"100%",background:ac,borderRadius:"2px",transition:"width 1.2s ease"}}/>
        </div>
        <p style={{fontFamily:"'DM Sans',sans-serif",color:C.textMid,fontSize:"13px",marginBottom:"24px"}}>{msg}</p>
        {!posted?(
          <div style={{background:C.bgPanel,border:`1px solid ${C.border}`,padding:"22px 24px",maxWidth:"440px",margin:"0 auto 24px",textAlign:"left"}}>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",color:C.text,marginBottom:"16px"}}>Post your score of <span style={{color:ac,fontWeight:600}}>{score}/{qs.length} ({pct}%)</span> to the <strong>{spec}</strong> leaderboard?</p>
            <div style={{display:"flex",gap:"9px",flexWrap:"wrap"}}>
              {user?(
                <>
                  <button onClick={()=>post(false)} style={{...btnS,padding:"10px 20px"}}>Post as <strong style={{marginLeft:3}}>{user.username}</strong></button>
                  <button onClick={()=>post(true)} style={{...btnO,padding:"10px 18px"}}>Post Anonymously</button>
                </>
              ):(
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.textDim}}>Sign in to post your score to the leaderboard.</p>
              )}
            </div>
          </div>
        ):(
          <div style={{background:`${ac}10`,border:`1px solid ${ac}35`,padding:"16px 20px",maxWidth:"440px",margin:"0 auto 24px",textAlign:"left"}}>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",color:C.text,lineHeight:1.7}}>✓ {anonMsg}</p>
          </div>
        )}
        <div style={{display:"flex",gap:"9px",justifyContent:"center",flexWrap:"wrap"}}>
          <button onClick={()=>start(spec)} style={{...btnS,padding:"11px 22px"}}>Next Set</button>
          <button onClick={()=>setSpec(null)} style={{...btnO,padding:"11px 20px"}}>Change Specialty</button>
        </div>
      </div>
    );
  }

  const q=qs[qi];
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"6px"}}>
        <div style={{display:"flex",gap:"9px",alignItems:"center"}}>
          <button onClick={()=>setSpec(null)} style={{background:"none",border:"none",color:C.textDim,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",padding:0}}>← Back</button>
          <span style={{color:"rgba(255,255,255,0.1)"}}>|</span>
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:ac}}>{spec}</span>
        </div>
        <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:C.textDim}}>Q{qi+1}/{qs.length}</span>
      </div>
      <div style={{width:"100%",height:"2px",background:"rgba(255,255,255,0.06)",marginBottom:"24px"}}>
        <div style={{width:`${((qi+1)/qs.length)*100}%`,height:"100%",background:ac,transition:"width 0.35s ease"}}/>
      </div>
      <p style={{fontSize:"clamp(14px,2vw,17px)",lineHeight:1.7,marginBottom:"22px",fontWeight:300,color:C.text}}>{q.q}</p>
      <div style={{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"18px"}}>
        {q.o.map((opt,i)=>{
          let bg=C.bgPanel,bc="rgba(255,255,255,0.09)";
          if(sel!==null){if(i===q.a){bg="rgba(34,197,94,0.09)";bc="#22c55e";}else if(i===sel){bg="rgba(239,68,68,0.09)";bc="#ef4444";}}
          return(
            <button key={i} onClick={()=>answer(i)} style={{background:bg,border:`1px solid ${bc}`,padding:"13px 15px",textAlign:"left",cursor:sel!==null?"default":"pointer",color:C.text,fontFamily:"'DM Sans',sans-serif",fontSize:"13px",lineHeight:1.55,transition:"all 0.18s",display:"flex",gap:"9px",alignItems:"flex-start"}}
              onMouseEnter={e=>{if(sel===null){e.currentTarget.style.background=`${ac}0e`;e.currentTarget.style.borderColor=`${ac}55`;}}}
              onMouseLeave={e=>{if(sel===null){e.currentTarget.style.background=C.bgPanel;e.currentTarget.style.borderColor="rgba(255,255,255,0.09)";}}}> 
              <span style={{color:ac,fontFamily:"'Cormorant Garamond',serif",fontSize:"15px",lineHeight:1,minWidth:"15px",flexShrink:0,fontWeight:500}}>{String.fromCharCode(65+i)}.</span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
      {exp&&(
        <div style={{background:`${ac}0c`,border:`1px solid ${ac}28`,padding:"14px 18px",marginBottom:"16px"}}>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",letterSpacing:"0.18em",textTransform:"uppercase",color:ac,marginBottom:"6px"}}>Clinical Explanation</div>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",lineHeight:1.75,color:C.textMid}}>{q.exp}</p>
        </div>
      )}
      {sel!==null&&<button onClick={next} style={{...btnS,padding:"11px 26px"}}>{qi+1>=qs.length?"See Results →":"Next →"}</button>}
    </div>
  );
}

// LEADERBOARD
function Board() {
  const [spec,setSpec]=useState(SPECIALTIES[0]);
  const [rows,setRows]=useState([]);
  const [loading,setLoading]=useState(false);
  useEffect(()=>{setLoading(true);(async()=>{const d=await storageGet("lb:"+spec)||[];setRows([...d].sort((a,b)=>b.pct-a.pct||new Date(b.date)-new Date(a.date)).slice(0,25));setLoading(false);})();},[spec]);
  const medals=["🥇","🥈","🥉"];
  return(
    <div>
      <div style={{display:"flex",flexWrap:"wrap",gap:"7px",marginBottom:"24px"}}>
        {SPECIALTIES.map(s=>{const col=TOPIC_COLORS[s]||C.teal;const a=spec===s;return(<button key={s} onClick={()=>setSpec(s)} style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",letterSpacing:"0.1em",textTransform:"uppercase",padding:"6px 13px",border:`1px solid ${a?col:"rgba(255,255,255,0.09)"}`,background:a?`${col}16`:"transparent",color:a?col:C.textDim,cursor:"pointer",transition:"all 0.2s"}}>{s}</button>);})}
      </div>
      <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"20px",fontWeight:300,marginBottom:"18px",color:C.text}}>{spec} — Top Performers</h3>
      {loading?(<p style={{fontFamily:"'DM Sans',sans-serif",color:C.textDim,fontSize:"13px"}}>Loading...</p>):rows.length===0?(
        <div style={{background:C.bgPanel,border:`1px solid ${C.border}`,padding:"28px",textAlign:"center"}}>
          <p style={{fontFamily:"'DM Sans',sans-serif",color:C.textDim,fontSize:"13px"}}>No scores yet for {spec}. Be the first to complete the quiz!</p>
        </div>
      ):(
        <div style={{display:"flex",flexDirection:"column",gap:"7px"}}>
          {rows.map((e,i)=>{const col=TOPIC_COLORS[spec]||C.teal;const top=i<3;return(
            <div key={i} style={{background:top?`${col}0c`:C.bgPanel,border:`1px solid ${top?col+"28":C.border}`,padding:"13px 18px",display:"flex",alignItems:"center",gap:"14px"}}>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"18px",minWidth:"28px",textAlign:"center"}}>{medals[i]||`#${i+1}`}</div>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",color:C.text,fontWeight:500}}>{e.username}</div>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:C.textDim,marginTop:"2px"}}>{new Date(e.date).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"20px",color:col,fontWeight:300}}>{e.score}/{e.total}</div>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:C.textDim}}>{e.pct}%</div>
              </div>
            </div>
          );})}
        </div>
      )}
    </div>
  );
}

// MAIN APP
export default function App() {
  const [scrolled,setScrolled]=useState(false);
  const [user,setUser]=useState(null);
  const [showAuth,setShowAuth]=useState(false);
  const [form,setForm]=useState({name:"",email:"",message:""});
  const [sent,setSent]=useState(false);
  const [activeVid,setActiveVid]=useState(null);
  const [vFilter,setVFilter]=useState("All");
  const [watched,setWatched]=useState({});
  const [active,setActive]=useState("Home");

  useEffect(()=>{
    window.addEventListener("scroll",()=>setScrolled(window.scrollY>55));
    (async()=>{const s=await storageGet("session");if(s){setUser(s);setWatched(s.watchedVideos||{});}})();
  },[]);

  const login=(u)=>{setUser(u);setWatched(u.watchedVideos||{});};
  const logout=async()=>{await storageSet("session",null);setUser(null);setWatched({});};

  const markProg=async(vid,pct)=>{
    if(!user)return;
    const w={...watched,[vid]:Math.max(watched[vid]||0,pct)};
    setWatched(w);
    const u={...user,watchedVideos:w};
    setUser(u);
    await storageSet("user:"+user.email,u);
    await storageSet("session",u);
  };

  const onScore=async(spec,entry)=>{
    const key="lb:"+spec;
    const ex=await storageGet(key)||[];
    await storageSet(key,[...ex,entry]);
    if(user){
      const h={...(user.quizHistory||{}),[spec]:[...(user.quizHistory?.[spec]||[]),entry]};
      const u={...user,quizHistory:h};
      setUser(u);
      await storageSet("user:"+user.email,u);
      await storageSet("session",u);
    }
  };

  const scrollTo=(id)=>{setActive(id);document.getElementById(id.toLowerCase().replace(/[\s&]/g,""))?.scrollIntoView({behavior:"smooth"});};
  const topics=["All",...Array.from(new Set(VIDEOS.map(v=>v.topic))).sort()];
  const vids=vFilter==="All"?VIDEOS:VIDEOS.filter(v=>v.topic===vFilter);

  return(
    <div style={{fontFamily:"'Cormorant Garamond','Georgia',serif",background:C.bg,color:C.text,overflowX:"hidden",minHeight:"100vh"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:#0f1923}::-webkit-scrollbar-thumb{background:#0e8c8c;border-radius:2px}
        input,textarea{color:#e8f0f5!important;background:rgba(255,255,255,0.04)!important}
        input::placeholder,textarea::placeholder{color:rgba(232,240,245,0.3)!important}
        input:focus,textarea:focus{border-color:#0e8c8c!important;outline:none!important}
        .nl{cursor:pointer;font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(232,240,245,0.6);transition:color 0.3s}
        .nl:hover,.nl.on{color:#14a8a8}
        .sc{position:relative;overflow:hidden}.sc img{width:100%;height:320px;object-fit:cover;display:block;filter:brightness(0.38);transition:all 0.5s}
        .sc:hover img{transform:scale(1.04);filter:brightness(0.28)}
        .so{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;padding:26px;background:linear-gradient(to top,rgba(0,0,0,0.93) 0%,rgba(0,0,0,0.2) 55%,transparent 100%)}
        .vc{background:#162030;border:1px solid rgba(14,140,140,0.18);transition:all 0.3s;overflow:hidden}
        .vc:hover{border-color:rgba(14,140,140,0.4);background:#1c2a3a}
        @media(max-width:900px){.g2{grid-template-columns:1fr!important}.g3{grid-template-columns:1fr 1fr!important}.hm{display:none!important}.sp{padding:68px 20px!important}}
        @media(max-width:560px){.g3{grid-template-columns:1fr!important}}
      `}</style>

      {showAuth&&<AuthModal onClose={()=>setShowAuth(false)} onAuth={login}/>}

      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:99,height:"64px",padding:"0 44px",display:"flex",alignItems:"center",justifyContent:"space-between",background:scrolled?"rgba(10,15,22,0.97)":"rgba(10,15,22,0.8)",borderBottom:`1px solid ${scrolled?C.border:"transparent"}`,backdropFilter:"blur(18px)",transition:"all 0.4s"}}>
        <div style={{cursor:"pointer"}} onClick={()=>scrollTo("Home")}><Logo size="sm"/></div>
        <div className="hm" style={{display:"flex",gap:"26px",alignItems:"center"}}>
          {NAV.map(l=><span key={l} className={`nl${active===l?" on":""}`} onClick={()=>scrollTo(l)}>{l}</span>)}
          {user?(
            <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
              <div style={{width:"30px",height:"30px",background:"linear-gradient(135deg,#0e8c8c,#1a2744)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",fontWeight:600,color:"#fff"}}>{user.username[0].toUpperCase()}</div>
              <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.textMid}}>{user.username}</span>
              <button onClick={logout} style={{...btnO,padding:"6px 13px",fontSize:"10px"}}>Sign Out</button>
            </div>
          ):(
            <button onClick={()=>setShowAuth(true)} style={{...btnS,padding:"8px 18px"}}>Sign In</button>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section id="home" style={{position:"relative",height:"100vh",minHeight:"620px",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
        <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80" alt="" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 30%",filter:"brightness(0.18) saturate(0.5)"}}/>
        <div style={{position:"absolute",inset:0,background:`linear-gradient(to bottom,rgba(15,25,35,0.05) 0%,rgba(15,25,35,0.55) 60%,${C.bg} 100%)`}}/>
        <div style={{position:"relative",textAlign:"center",padding:"0 24px",maxWidth:"920px"}}>
          <div style={{marginBottom:"32px",display:"flex",justifyContent:"center"}}><Logo size="lg"/></div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"12px",marginBottom:"18px"}}>
            <div style={{width:"28px",height:"1px",background:C.teal}}/>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.3em",textTransform:"uppercase",color:C.teal}}>Blackburn, England · Est. October 2025 · Co. 16791155</span>
            <div style={{width:"28px",height:"1px",background:C.teal}}/>
          </div>
          <h1 style={{fontSize:"clamp(34px,6.5vw,78px)",fontWeight:300,lineHeight:1.05,letterSpacing:"-0.02em",marginBottom:"18px",color:C.text}}>General Medical Practice<br/><em style={{color:C.tealLight,fontStyle:"italic"}}>Care. Innovation. Trust.</em></h1>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"14px",lineHeight:1.85,color:C.textMid,maxWidth:"520px",margin:"0 auto 36px",fontWeight:300}}>A registered UK medical practice based in Blackburn — delivering high-quality clinical care, medical education and professional development.</p>
          <div style={{display:"flex",gap:"10px",justifyContent:"center",flexWrap:"wrap"}}>
            <button style={{...btnS,padding:"12px 26px"}} onClick={()=>scrollTo("Services")}>Our Services</button>
            <button style={{...btnO,padding:"12px 26px"}} onClick={()=>scrollTo("Videos")}>Medical Videos</button>
            <button style={{...btnO,padding:"12px 26px"}} onClick={()=>user?scrollTo("Quiz"):setShowAuth(true)}>Take the Quiz</button>
          </div>
        </div>
      </section>

      {/* COMPANY STRIP */}
      <section style={{background:C.bgCard,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`}}>
        <div style={{maxWidth:"1400px",margin:"0 auto",display:"flex",flexWrap:"wrap"}}>
          {[["Company No.","16791155"],["Status","Active ✓"],["Incorporated","16 Oct 2025"],["Address","Blackburn, BB1 1RB"],["SIC","86210 — General Medical Practice"]].map(([k,v],i)=>(
            <div key={k} style={{flex:"1 1 150px",padding:"20px 22px",borderLeft:i>0?`1px solid ${C.border}`:"none",minWidth:"130px"}}>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.18em",textTransform:"uppercase",color:C.textDim,marginBottom:"4px"}}>{k}</div>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.text}}>{v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{padding:"96px 48px",maxWidth:"1400px",margin:"0 auto"}} className="sp">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"60px",alignItems:"center"}} className="g2">
          <FadeIn>
            <div style={{position:"relative"}}>
              <img src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80" alt="Medical" style={{width:"100%",height:"480px",objectFit:"cover",display:"block",filter:"brightness(0.78) saturate(0.75)"}}/>
              <div style={{position:"absolute",bottom:"-16px",right:"-16px",background:"linear-gradient(135deg,#0e8c8c,#0a6666)",padding:"20px 24px"}}>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"32px",fontWeight:300,color:"#fff",lineHeight:1}}>SIC</div>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",color:"rgba(255,255,255,0.65)",marginTop:"3px"}}>86210 Medical Practice</div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={110}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"14px"}}>
                <div style={{width:"28px",height:"1.5px",background:C.teal}}/>
                <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.22em",textTransform:"uppercase",color:C.teal}}>About The Company</span>
              </div>
              <h2 style={{fontSize:"clamp(26px,4vw,44px)",fontWeight:300,lineHeight:1.15,marginBottom:"18px"}}>Registered UK Medical<br/><em style={{color:C.tealLight,fontStyle:"italic"}}>Practice in Blackburn</em></h2>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",lineHeight:1.85,color:C.textMid,marginBottom:"14px",fontWeight:300}}>Emrzase Hope Ltd (Co. 16791155) is a private limited company incorporated on 16 October 2025 at 28 Copperfield Street, Blackburn, BB1 1RB. Operating under SIC 86210 — General Medical Practice Activities.</p>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",lineHeight:1.85,color:C.textMid,marginBottom:"24px",fontWeight:300}}>Directed by Dr. Emad Elsayed Hassan Ali (appointed Oct 2025) and Dr. Mariam Mohamed Elmamoon Yehia Zakaria (appointed Jan 2026), both identity-verified via Companies House ACSP.</p>
              {["Companies House verified — Active","Two qualified medical directors","General medical practice (SIC 86210)","Registered in Blackburn, Lancashire"].map(item=>(
                <div key={item} style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"9px"}}>
                  <div style={{width:"5px",height:"5px",background:C.teal,borderRadius:"50%",flexShrink:0}}/>
                  <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.textMid}}>{item}</span>
                </div>
              ))}
              <div style={{marginTop:"24px"}}><button style={{...btnO,padding:"11px 26px"}} onClick={()=>scrollTo("Contact")}>Contact Us</button></div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* DIRECTORS */}
      <section style={{background:C.bgCard,padding:"60px 48px",borderTop:`1px solid ${C.border}`}} className="sp">
        <FadeIn>
          <div style={{textAlign:"center",marginBottom:"40px"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",marginBottom:"10px"}}>
              <div style={{width:"28px",height:"1px",background:C.teal}}/>
              <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.22em",textTransform:"uppercase",color:C.teal}}>Company Directors</span>
              <div style={{width:"28px",height:"1px",background:C.teal}}/>
            </div>
            <h2 style={{fontSize:"clamp(24px,4vw,40px)",fontWeight:300}}>Verified by <em style={{color:C.tealLight,fontStyle:"italic"}}>Companies House</em></h2>
          </div>
        </FadeIn>
        <div style={{maxWidth:"800px",margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"}} className="g2">
          {COMPANY.directors.map((d,i)=>(
            <FadeIn key={d.name} delay={i*90}>
              <div style={{background:C.bgPanel,border:`1px solid ${C.border}`,padding:"26px 22px"}}>
                <div style={{width:"38px",height:"38px",background:"linear-gradient(135deg,#0e8c8c,#1a2744)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:600,color:"#fff",marginBottom:"14px"}}>{d.name.split(" ").filter((_,j)=>j>0).map(n=>n[0]).slice(0,2).join("")}</div>
                <h3 style={{fontSize:"17px",fontWeight:400,marginBottom:"3px"}}>{d.name}</h3>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.14em",textTransform:"uppercase",color:C.teal,marginBottom:"14px"}}>{d.role}</div>
                <div style={{borderTop:`1px solid ${C.border}`,paddingTop:"12px",display:"flex",flexDirection:"column",gap:"6px"}}>
                  {[["Appointed",d.appointed],["Nationality","British"],["Residence","England"],["Identity","Verified ✓"]].map(([k,v])=>(
                    <div key={k} style={{display:"flex",justifyContent:"space-between"}}>
                      <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:C.textDim}}>{k}</span>
                      <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:v==="Verified ✓"?C.success:C.textMid}}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{padding:"96px 48px"}} className="sp">
        <FadeIn>
          <div style={{textAlign:"center",marginBottom:"48px"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",marginBottom:"10px"}}>
              <div style={{width:"28px",height:"1px",background:C.teal}}/>
              <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.22em",textTransform:"uppercase",color:C.teal}}>What We Offer</span>
              <div style={{width:"28px",height:"1px",background:C.teal}}/>
            </div>
            <h2 style={{fontSize:"clamp(26px,5vw,48px)",fontWeight:300,letterSpacing:"-0.02em"}}>Our <em style={{color:C.tealLight,fontStyle:"italic"}}>Services</em></h2>
          </div>
        </FadeIn>
        <div style={{maxWidth:"1400px",margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"2px"}} className="g2">
          {SERVICES.map((s,i)=>(
            <FadeIn key={s.title} delay={i*55}>
              <div className="sc">
                <img src={s.img} alt={s.title}/>
                <div className="so">
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"8px",letterSpacing:"0.18em",textTransform:"uppercase",color:C.tealLight,marginBottom:"8px",padding:"2px 8px",border:"1px solid rgba(14,140,140,0.4)",display:"inline-block"}}>{s.tag}</div>
                  <h3 style={{fontSize:"clamp(17px,2.5vw,24px)",fontWeight:300,marginBottom:"7px"}}>{s.title}</h3>
                  <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",lineHeight:1.65,color:"rgba(232,240,245,0.62)"}}>{s.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* VIDEOS */}
      <section id="videos" style={{padding:"96px 48px",background:C.bgCard,borderTop:`1px solid ${C.border}`}} className="sp">
        <FadeIn>
          <div style={{textAlign:"center",marginBottom:"36px"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",marginBottom:"10px"}}>
              <div style={{width:"28px",height:"1px",background:C.teal}}/>
              <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.22em",textTransform:"uppercase",color:C.teal}}>Medical Education</span>
              <div style={{width:"28px",height:"1px",background:C.teal}}/>
            </div>
            <h2 style={{fontSize:"clamp(26px,5vw,48px)",fontWeight:300,letterSpacing:"-0.02em",marginBottom:"10px"}}>Clinical <em style={{color:C.tealLight,fontStyle:"italic"}}>Learning Videos</em></h2>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.textDim,maxWidth:"380px",margin:"0 auto",lineHeight:1.7}}>30 videos across 13 specialties. {user?"Progress saved automatically.":"Sign in to track your watch progress."}</p>
          </div>
        </FadeIn>
        <div style={{maxWidth:"1400px",margin:"0 auto 24px",display:"flex",flexWrap:"wrap",gap:"6px",justifyContent:"center"}}>
          {topics.map(t=>{const col=TOPIC_COLORS[t]||C.teal;const on=vFilter===t;return(<button key={t} onClick={()=>{setVFilter(t);setActiveVid(null);}} style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.12em",textTransform:"uppercase",padding:"5px 12px",border:`1px solid ${on?col:"rgba(255,255,255,0.09)"}`,background:on?`${col}16`:"transparent",color:on?col:C.textDim,cursor:"pointer",transition:"all 0.2s"}}>{t}</button>);})}
        </div>
        {activeVid&&(
          <div style={{maxWidth:"840px",margin:"0 auto 36px"}}>
            <div style={{position:"relative",paddingBottom:"56.25%",height:0,background:"#000",border:`1px solid ${C.border}`}}>
              <iframe key={activeVid} src={`https://www.youtube-nocookie.com/embed/${activeVid}?autoplay=1&rel=0&modestbranding=1`} style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"none"}} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="Video"/>
            </div>
            <div style={{display:"flex",gap:"8px",marginTop:"9px",alignItems:"center",flexWrap:"wrap"}}>
              <button onClick={()=>setActiveVid(null)} style={{...btnO,padding:"6px 14px",fontSize:"10px"}}>✕ Close</button>
              <a href={`https://www.youtube.com/watch?v=${activeVid}`} target="_blank" rel="noreferrer" style={{...btnO,padding:"6px 14px",fontSize:"10px",textDecoration:"none",color:C.tealLight}}>YouTube ↗</a>
              {user&&(
                <div style={{display:"flex",gap:"6px",marginLeft:"auto",alignItems:"center"}}>
                  <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:C.textDim}}>Mark progress:</span>
                  {[25,50,75,100].map(p=>{const done=(watched[activeVid]||0)>=p;return(
                    <button key={p} onClick={()=>markProg(activeVid,p)} style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",padding:"4px 9px",background:done?`${C.teal}25`:"transparent",border:`1px solid ${done?C.teal:"rgba(255,255,255,0.1)"}`,color:done?C.tealLight:C.textDim,cursor:"pointer",transition:"all 0.2s"}}>{p}%</button>
                  );})}
                </div>
              )}
            </div>
          </div>
        )}
        <div style={{maxWidth:"1400px",margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"12px"}} className="g3">
          {vids.map((v,i)=>{
            const tc=TOPIC_COLORS[v.topic]||C.teal;
            const prog=watched[v.id]||0;
            const playing=activeVid===v.id;
            return(
              <FadeIn key={v.id} delay={(i%6)*35}>
                <div className="vc" style={{border:playing?`1px solid ${tc}`:`1px solid ${C.border}`,background:playing?`${tc}0c`:C.bgCard}}>
                  <div style={{padding:"18px 16px 12px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px"}}>
                      <div style={{width:"34px",height:"34px",background:`${tc}16`,border:`1px solid ${tc}32`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill={tc}><polygon points="5,3 19,12 5,21"/></svg>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
                        {user&&prog>0&&(
                          <div style={{position:"relative",width:"26px",height:"26px"}}>
                            <svg width="26" height="26" viewBox="0 0 26 26">
                              <circle cx="13" cy="13" r="10" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5"/>
                              <circle cx="13" cy="13" r="10" fill="none" stroke={tc} strokeWidth="2.5" strokeDasharray={62.8} strokeDashoffset={62.8-(prog/100)*62.8} strokeLinecap="round" transform="rotate(-90 13 13)"/>
                            </svg>
                            {prog>=98&&<div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"7px",height:"7px",background:tc,borderRadius:"50%"}}/>}
                          </div>
                        )}
                        <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"8px",letterSpacing:"0.16em",textTransform:"uppercase",color:tc,background:`${tc}10`,padding:"2px 7px",border:`1px solid ${tc}22`}}>{v.topic}</span>
                      </div>
                    </div>
                    <div style={{fontSize:"15px",fontWeight:400,lineHeight:1.3,marginBottom:"4px"}}>{v.title}</div>
                    <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:C.textDim}}>{v.channel}</div>
                    {user&&prog>0&&<div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",color:tc,marginTop:"6px"}}>{prog>=98?"✓ Watched":prog+"% watched"}</div>}
                  </div>
                  <div style={{borderTop:`1px solid ${C.border}`,display:"flex"}}>
                    <button onClick={()=>setActiveVid(playing?null:v.id)} style={{flex:1,padding:"9px",background:playing?`${tc}12`:"transparent",border:"none",color:playing?tc:C.textMid,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.1em",textTransform:"uppercase",transition:"all 0.2s",borderRight:`1px solid ${C.border}`}}
                      onMouseEnter={e=>{if(!playing){e.currentTarget.style.background=`${tc}0e`;e.currentTarget.style.color=tc;}}}
                      onMouseLeave={e=>{if(!playing){e.currentTarget.style.background="transparent";e.currentTarget.style.color=C.textMid;}}}>
                      {playing?"▶ Playing":"▶ Play"}
                    </button>
                    <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noreferrer" style={{flex:1,padding:"9px",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.1em",textTransform:"uppercase",color:C.textDim,textDecoration:"none",transition:"all 0.2s"}}
                      onMouseEnter={e=>{e.currentTarget.style.background=`${C.teal}0e`;e.currentTarget.style.color=C.tealLight;}}
                      onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=C.textDim;}}>
                      YouTube ↗
                    </a>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* QUIZ */}
      <section id="quiz" style={{padding:"96px 48px",background:C.bg,borderTop:`1px solid ${C.border}`}} className="sp">
        <div style={{maxWidth:"860px",margin:"0 auto"}}>
          <FadeIn>
            <div style={{textAlign:"center",marginBottom:"44px"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",marginBottom:"10px"}}>
                <div style={{width:"28px",height:"1px",background:C.teal}}/>
                <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.22em",textTransform:"uppercase",color:C.teal}}>Test Your Knowledge</span>
                <div style={{width:"28px",height:"1px",background:C.teal}}/>
              </div>
              <h2 style={{fontSize:"clamp(26px,5vw,48px)",fontWeight:300,letterSpacing:"-0.02em",marginBottom:"10px"}}>Medical <em style={{color:C.tealLight,fontStyle:"italic"}}>Specialist Quiz</em></h2>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.textDim,maxWidth:"460px",margin:"0 auto",lineHeight:1.75}}>Large question pools per specialty. Each session draws 10 randomised questions. Questions rotate through the entire pool — you'll never repeat the same question until you've answered every one.</p>
            </div>
          </FadeIn>
          {!user?(
            <FadeIn delay={70}>
              <div style={{background:C.bgCard,border:`1px solid ${C.border}`,padding:"44px",textAlign:"center"}}>
                <StethoscopeSVG size={50}/>
                <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"24px",fontWeight:300,margin:"14px 0 8px"}}>Sign in to take the quiz</h3>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",color:C.textMid,marginBottom:"24px",maxWidth:"340px",margin:"0 auto 24px",lineHeight:1.75}}>Create a free account to access specialist quizzes, post scores to the leaderboard and track your progress across all specialties.</p>
                <button style={{...btnS,padding:"12px 28px"}} onClick={()=>setShowAuth(true)}>Sign In or Register — Free</button>
              </div>
            </FadeIn>
          ):(
            <FadeIn delay={70}>
              <div style={{background:C.bgCard,border:`1px solid ${C.border}`,padding:"32px 28px"}}>
                <Quiz user={user} onScore={onScore}/>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* LEADERBOARD */}
      <section id="leaderboard" style={{padding:"96px 48px",background:C.bgCard,borderTop:`1px solid ${C.border}`}} className="sp">
        <div style={{maxWidth:"860px",margin:"0 auto"}}>
          <FadeIn>
            <div style={{textAlign:"center",marginBottom:"44px"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",marginBottom:"10px"}}>
                <div style={{width:"28px",height:"1px",background:C.teal}}/>
                <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.22em",textTransform:"uppercase",color:C.teal}}>Rankings</span>
                <div style={{width:"28px",height:"1px",background:C.teal}}/>
              </div>
              <h2 style={{fontSize:"clamp(26px,5vw,48px)",fontWeight:300,letterSpacing:"-0.02em"}}>Global <em style={{color:C.tealLight,fontStyle:"italic"}}>Leaderboard</em></h2>
            </div>
          </FadeIn>
          <FadeIn delay={70}>
            <div style={{background:C.bgPanel,border:`1px solid ${C.border}`,padding:"32px 28px"}}>
              <Board/>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* QUOTE */}
      <section style={{position:"relative",height:"300px",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
        <img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1600&q=80" alt="" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",filter:"brightness(0.14) saturate(0.4)"}}/>
        <div style={{position:"absolute",inset:0,background:"rgba(15,25,35,0.6)"}}/>
        <div style={{position:"relative",textAlign:"center",padding:"0 24px"}}>
          <h2 style={{fontSize:"clamp(22px,5vw,50px)",fontWeight:300,marginBottom:"14px",maxWidth:"680px"}}>
            "We don't just provide care —<br/><em style={{color:C.tealLight,fontStyle:"italic"}}>we transform lives."</em>
          </h2>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",letterSpacing:"0.18em",textTransform:"uppercase",color:C.textDim}}>— Emrzase Hope Ltd · Care. Innovation. Trust.</p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{padding:"96px 48px",background:C.bg,borderTop:`1px solid ${C.border}`}} className="sp">
        <div style={{maxWidth:"1060px",margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"60px",alignItems:"start"}} className="g2">
          <FadeIn>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"14px"}}>
                <div style={{width:"28px",height:"1px",background:C.teal}}/>
                <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.22em",textTransform:"uppercase",color:C.teal}}>Get In Touch</span>
              </div>
              <h2 style={{fontSize:"clamp(24px,4vw,42px)",fontWeight:300,lineHeight:1.2,marginBottom:"16px"}}>Contact<br/><em style={{color:C.tealLight,fontStyle:"italic"}}>Emrzase Hope Ltd</em></h2>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",lineHeight:1.85,color:C.textMid,marginBottom:"32px",fontWeight:300}}>To enquire about our medical practice services or get in touch with our directors, use the form or contact details below.</p>
              {[["📍","Registered Address","28 Copperfield Street, Blackburn, England, BB1 1RB"],["🏢","Company Number","16791155 (Companies House)"],["⚕️","Business Type","General Medical Practice (SIC 86210)"],["📅","Incorporated","16 October 2025"]].map(([ic,lb,vl])=>(
                <div key={lb} style={{display:"flex",gap:"12px",alignItems:"flex-start",marginBottom:"18px"}}>
                  <span style={{fontSize:"14px",marginTop:"1px"}}>{ic}</span>
                  <div>
                    <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.14em",textTransform:"uppercase",color:C.textDim,marginBottom:"2px"}}>{lb}</div>
                    <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.text}}>{vl}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={110}>
            {sent?(
              <div style={{textAlign:"center",padding:"48px 0"}}>
                <div style={{fontSize:"34px",color:C.teal,marginBottom:"12px"}}>✦</div>
                <h3 style={{fontSize:"24px",fontWeight:300,marginBottom:"8px"}}>Message sent.</h3>
                <p style={{fontFamily:"'DM Sans',sans-serif",color:C.textDim,fontSize:"13px"}}>We'll be in touch shortly.</p>
              </div>
            ):(
              <form onSubmit={e=>{e.preventDefault();setSent(true);}} style={{display:"flex",flexDirection:"column",gap:"20px"}}>
                <input style={iStyle} type="text" placeholder="Your Name" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
                <input style={iStyle} type="email" placeholder="Your Email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
                <textarea style={{...iStyle,resize:"none"}} rows="5" placeholder="Your Message" required value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/>
                <button type="submit" style={{...btnS,padding:"13px 32px",alignSelf:"flex-start"}}>Send Message</button>
              </form>
            )}
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{background:"#080d12",borderTop:`1px solid ${C.border}`,padding:"40px 48px"}}>
        <div style={{maxWidth:"1400px",margin:"0 auto"}}>
          <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-between",alignItems:"flex-start",gap:"24px",marginBottom:"24px"}}>
            <div>
              <div style={{marginBottom:"9px"}}><Logo size="sm"/></div>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:C.textDim,lineHeight:1.7,maxWidth:"250px"}}>Co. 16791155 · Registered in England<br/>28 Copperfield Street, Blackburn, BB1 1RB<br/>SIC 86210 — General Medical Practice</p>
            </div>
            <div style={{display:"flex",gap:"22px",flexWrap:"wrap",alignItems:"center"}}>
              {NAV.map(l=><span key={l} className="nl" onClick={()=>scrollTo(l)} style={{fontSize:"10px"}}>{l}</span>)}
            </div>
          </div>
          <div style={{borderTop:"1px solid rgba(255,255,255,0.05)",paddingTop:"16px",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"8px"}}>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:"rgba(232,240,245,0.18)"}}>© {new Date().getFullYear()} Emrzase Hope Ltd. All rights reserved. Care. Innovation. Trust.</p>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:"rgba(232,240,245,0.18)"}}>Incorporated 16 October 2025 · Active · Companies House Verified</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
