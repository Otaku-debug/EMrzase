import { useState, useEffect, useRef, useCallback } from "react";
import { QUESTION_BANK, SPECIALTIES } from "./questions.js";

const C={bg:"#0f1923",bgCard:"#162030",bgPanel:"#1c2a3a",bgDeep:"#0a1018",teal:"#0e8c8c",tealLight:"#14a8a8",border:"rgba(14,140,140,0.18)",text:"#e8f0f5",textMid:"rgba(232,240,245,0.65)",textDim:"rgba(232,240,245,0.35)",success:"#22c55e",danger:"#ef4444",warn:"#f59e0b",gold:"#c9a96e"};
const SUPER_ADMIN="24abali@gmail.com";
const DIRS=[{name:"Dr. Emad Elsayed Hassan Ali",role:"Director",appointed:"16 Oct 2025"},{name:"Dr. Mariam Mohamed Elmamoon Yehia Zakaria",role:"Director",appointed:"20 Jan 2026"}];
const NAV=["Home","About","Services","Videos","Quiz","Leaderboard","Contact"];
const TC={"Cardiology":"#ef4444","Emergency Medicine":"#f97316","Endocrinology":"#3b82f6","Nephrology":"#22c55e","Respiratory":"#8b5cf6","Neurology":"#eab308","Surgery":"#ec4899","Gastroenterology":"#14b8a6","Urology":"#06b6d4","Rheumatology":"#a855f7","Psychiatry":"#d946ef","Haematology":"#f43f5e","Vascular":"#0ea5e9","General Practice":"#4a9eff","Paediatrics":"#22d37e","Anaesthesia":"#94a3b8","Radiology":"#38bdf8","Obstetrics & Gynaecology":"#f472b6"};
const DS=[{id:"s1",title:"General Medical Practice",desc:"Registered under SIC 86210, delivering professional general medical practice activities and clinical care.",tag:"Core Service",img:"https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80"},{id:"s2",title:"Primary Healthcare",desc:"Comprehensive primary care services focused on prevention, diagnosis and treatment from our Blackburn base.",tag:"Primary Care",img:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"},{id:"s3",title:"Patient Consultations",desc:"Professional patient-centred consultations delivered with clinical rigour and genuine compassion.",tag:"Consultations",img:"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80"},{id:"s4",title:"Health Assessments",desc:"Thorough health assessments carried out by our Companies House verified directors.",tag:"Assessments",img:"https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&q=80"}];
const SV=[{id:"Gsu8NT1yYes",title:"Congestive Heart Failure",channel:"Ninja Nerd",topic:"Cardiology",type:"youtube"},{id:"8Yv3VfAS9sU",title:"Septic Shock Pathophysiology",channel:"Ninja Nerd",topic:"Emergency Medicine",type:"youtube"},{id:"rh8ycjPCj18",title:"Diabetes Mellitus Type 1 & 2",channel:"Ninja Nerd",topic:"Endocrinology",type:"youtube"},{id:"EgGOwekD1O8",title:"Acute Kidney Injury",channel:"Ninja Nerd",topic:"Nephrology",type:"youtube"},{id:"lzyUVVOqyS0",title:"Pneumonia Overview",channel:"Ninja Nerd",topic:"Respiratory",type:"youtube"},{id:"7lpqxDEfszY",title:"Ischaemic & Haemorrhagic Stroke",channel:"Ninja Nerd",topic:"Neurology",type:"youtube"},{id:"VEpBk8OEVsA",title:"Hypertension Pathophysiology",channel:"Ninja Nerd",topic:"Cardiology",type:"youtube"},{id:"4A9SBnkNgq8",title:"Acute Appendicitis",channel:"Ninja Nerd",topic:"Surgery",type:"youtube"},{id:"9TMBK7jFATs",title:"Asthma Pathophysiology",channel:"Ninja Nerd",topic:"Respiratory",type:"youtube"},{id:"e5XSGmeCaW4",title:"Chronic Kidney Disease",channel:"Ninja Nerd",topic:"Nephrology",type:"youtube"},{id:"FPaOBhkuIhk",title:"Hypothyroidism & Hyperthyroidism",channel:"Ninja Nerd",topic:"Endocrinology",type:"youtube"},{id:"bfAE52gJWNE",title:"Pulmonary Embolism",channel:"Ninja Nerd",topic:"Respiratory",type:"youtube"},{id:"AhDqM2a2sBk",title:"Myocardial Infarction",channel:"Ninja Nerd",topic:"Cardiology",type:"youtube"},{id:"2DJNnTKTols",title:"Liver Cirrhosis",channel:"Ninja Nerd",topic:"Gastroenterology",type:"youtube"},{id:"IFpDqfcFkvo",title:"Urinary Tract Infections",channel:"Ninja Nerd",topic:"Urology",type:"youtube"},{id:"TFoHaVHknLI",title:"Rheumatoid Arthritis",channel:"Ninja Nerd",topic:"Rheumatology",type:"youtube"},{id:"vkXuFBBOHHo",title:"Bipolar Disorder",channel:"Ninja Nerd",topic:"Psychiatry",type:"youtube"},{id:"T_tTBBuIqlw",title:"Meningitis & Encephalitis",channel:"Ninja Nerd",topic:"Neurology",type:"youtube"},{id:"j_xPJBQYDy4",title:"Iron Deficiency Anaemia",channel:"Ninja Nerd",topic:"Haematology",type:"youtube"},{id:"nKHMDLvTMFY",title:"Pancreatitis",channel:"Ninja Nerd",topic:"Gastroenterology",type:"youtube"},{id:"LGkfqL5GIAM",title:"Deep Vein Thrombosis",channel:"Ninja Nerd",topic:"Vascular",type:"youtube"},{id:"kBsWfEfQDIE",title:"Schizophrenia",channel:"Ninja Nerd",topic:"Psychiatry",type:"youtube"},{id:"p8bX7c2QqEA",title:"Crohn's & Ulcerative Colitis",channel:"Ninja Nerd",topic:"Gastroenterology",type:"youtube"},{id:"BtGKsCEtDWs",title:"Osteoporosis",channel:"Ninja Nerd",topic:"Rheumatology",type:"youtube"},{id:"NUKkYiCZhY4",title:"Atrial Fibrillation",channel:"Ninja Nerd",topic:"Cardiology",type:"youtube"},{id:"7XGinepFdtY",title:"Epilepsy & Seizures",channel:"Ninja Nerd",topic:"Neurology",type:"youtube"},{id:"6bCnSfJUPME",title:"Glomerulonephritis",channel:"Ninja Nerd",topic:"Nephrology",type:"youtube"},{id:"hAhJoAzZQEc",title:"Addison's & Cushing's Disease",channel:"Ninja Nerd",topic:"Endocrinology",type:"youtube"},{id:"FP8GHlkG2nQ",title:"Community Acquired Pneumonia",channel:"Ninja Nerd",topic:"Respiratory",type:"youtube"},{id:"QV9TqnJL7gQ",title:"Sepsis Recognition & Management",channel:"Ninja Nerd",topic:"Emergency Medicine",type:"youtube"}];

async function sGet(k){try{const r=await window.storage.get(k);return r?JSON.parse(r.value):null;}catch{return null;}}
async function sSet(k,v){try{await window.storage.set(k,JSON.stringify(v));return true;}catch{return false;}}
async function sDel(k){try{await window.storage.delete(k);}catch{}}

function useInView(t=0.1){const ref=useRef(null);const[v,sv]=useState(false);useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)sv(true);},{threshold:t});if(ref.current)o.observe(ref.current);return()=>o.disconnect();},[]);return[ref,v];}
function FadeIn({children,delay=0,st={}}){const[ref,v]=useInView();return <div ref={ref} style={{opacity:v?1:0,transform:v?"translateY(0)":"translateY(20px)",transition:`opacity 0.65s ease ${delay}ms,transform 0.65s ease ${delay}ms`,...st}}>{children}</div>;}

function checkPW(pw){
  const rules=[
    {id:"len",label:"At least 8 characters",ok:pw.length>=8},
    {id:"up",label:"One uppercase letter (A-Z)",ok:/[A-Z]/.test(pw)},
    {id:"lo",label:"One lowercase letter (a-z)",ok:/[a-z]/.test(pw)},
    {id:"num",label:"One number (0-9)",ok:/[0-9]/.test(pw)},
    {id:"sym",label:"One special character (!@#...)",ok:/[^A-Za-z0-9]/.test(pw)},
  ];
  const p=rules.filter(r=>r.ok).length;
  const col=p<=1?C.danger:p<=3?C.warn:p===4?"#60a5fa":C.success;
  return{rules,passed:p,strength:["","Weak","Weak","Fair","Good","Strong"][p]||"Strong",col,all:p===5};
}

const iS={width:"100%",background:"rgba(255,255,255,0.045)",border:"1px solid rgba(14,140,140,0.25)",padding:"11px 14px",fontFamily:"'DM Sans',sans-serif",fontSize:"13px",color:C.text,outline:"none",transition:"border-color 0.25s",borderRadius:"2px"};
const bS={background:"linear-gradient(135deg,#0e8c8c,#0a6666)",border:"none",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",letterSpacing:"0.13em",textTransform:"uppercase",cursor:"pointer",transition:"all 0.25s",borderRadius:"2px"};
const bO={background:"transparent",border:"1px solid #0e8c8c",color:"#14a8a8",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",letterSpacing:"0.13em",textTransform:"uppercase",cursor:"pointer",transition:"all 0.25s",borderRadius:"2px"};
const bD={background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.35)",color:"#fca5a5",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",cursor:"pointer",transition:"all 0.25s",borderRadius:"2px"};

function Msg({type,text}){if(!text)return null;const ok=type==="ok";return <div style={{background:ok?"rgba(34,197,94,0.08)":"rgba(239,68,68,0.08)",border:`1px solid ${ok?"rgba(34,197,94,0.3)":"rgba(239,68,68,0.3)"}`,padding:"10px 14px",marginBottom:"14px",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:ok?"#86efac":"#fca5a5",borderRadius:"2px"}}>{ok?"✓  ":"✕  "}{text}</div>;}
function Eye({show,toggle}){return <button type="button" onClick={toggle} style={{position:"absolute",right:"11px",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:C.textDim,cursor:"pointer",fontSize:"15px",padding:"2px",lineHeight:1}}>{show?"🙈":"👁"}</button>;}

function Steth({size=40}){return <svg width={size} height={size} viewBox="0 0 44 44" fill="none"><path d="M10 8 C10 8 8 13 8 17 C8 21 11 23 14 23" stroke="#0e8c8c" strokeWidth="2.5" strokeLinecap="round" fill="none"/><path d="M34 8 C34 8 36 13 36 17 C36 21 33 23 30 23" stroke="#0e8c8c" strokeWidth="2.5" strokeLinecap="round" fill="none"/><circle cx="10" cy="7.5" r="2.5" fill="#0e8c8c"/><circle cx="34" cy="7.5" r="2.5" fill="#0e8c8c"/><path d="M14 23 C14 29 18 31 22 31 C26 31 30 29 30 23" stroke="#0e8c8c" strokeWidth="2.5" strokeLinecap="round" fill="none"/><line x1="22" y1="31" x2="22" y2="37" stroke="#0e8c8c" strokeWidth="2.5" strokeLinecap="round"/><circle cx="22" cy="40" r="3.5" fill="#0e8c8c"/><circle cx="22" cy="40" r="1.8" fill="#e8f0f5"/></svg>;}
function Logo({size="md"}){
  const em={sm:19,md:25,lg:36}[size]||25,sv={sm:28,md:38,lg:54}[size]||38,sub={sm:7,md:9,lg:11}[size]||9;
  return <div style={{display:"flex",alignItems:"center",gap:"9px"}}><Steth size={sv}/><div style={{borderLeft:"2px solid rgba(14,140,140,0.4)",paddingLeft:"10px"}}><div style={{display:"flex",alignItems:"baseline"}}><span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:em,fontWeight:600,color:C.text,letterSpacing:"-0.01em"}}>EM</span><span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:em,fontWeight:300,color:C.tealLight,letterSpacing:"-0.01em"}}>rzase</span></div><div style={{display:"flex",alignItems:"center",gap:"5px",marginTop:"1px"}}><div style={{height:"1px",width:"11px",background:"rgba(14,140,140,0.4)"}}/><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:sub,letterSpacing:"0.22em",textTransform:"uppercase",color:C.tealLight}}>Healthcare</span><div style={{height:"1px",width:"11px",background:"rgba(14,140,140,0.4)"}}/></div></div></div>;
}

function AuthModal({onClose,onAuth}){
  const[step,setStep]=useState("email");
  const[email,setEmail]=useState("");
  const[pw,setPw]=useState(""),  [pw2,setPw2]=useState("");
  const[showPw,setShowPw]=useState(false),[showPw2,setShowPw2]=useState(false);
  const[uname,setUname]=useState("");
  const[loginPw,setLoginPw]=useState(""),[showL,setShowL]=useState(false);
  const[msg,setMsg]=useState({t:"",s:""}),[busy,setBusy]=useState(false);
  const pwr=checkPW(pw);
  const sm=(t,s)=>setMsg({t,s}),cl=()=>setMsg({t:"",s:""});
  const steps=["email","pw","uname"],idx=steps.indexOf(step);

  const doEmail=async()=>{
    cl();if(!email||!/\S+@\S+\.\S+/.test(email)){sm("e","Please enter a valid email address.");return;}
    setBusy(true);const ex=await sGet("user:"+email.toLowerCase());setBusy(false);
    setStep(ex?"login":"pw");
  };
  const doPW=()=>{
    cl();if(!pwr.all){sm("e","Please meet all password requirements.");return;}
    if(pw!==pw2){sm("e","Passwords do not match.");return;}setStep("uname");
  };
  const doUname=async()=>{
    cl();if(!uname||uname.length<3){sm("e","Username must be at least 3 characters.");return;}
    if(uname.length>20){sm("e","Max 20 characters.");return;}
    if(/\s/.test(uname)){sm("e","No spaces allowed.");return;}
    setBusy(true);const taken=await sGet("un:"+uname.toLowerCase());
    if(taken&&taken!==email.toLowerCase()){sm("e","Username already taken.");setBusy(false);return;}
    const admins=await sGet("adminList")||[SUPER_ADMIN];
    const isSA=email.toLowerCase()===SUPER_ADMIN;
    const isA=isSA||admins.map(a=>a.toLowerCase()).includes(email.toLowerCase());
    const u={email:email.toLowerCase(),username:uname,ph:btoa(pw),joined:new Date().toISOString(),isAdmin:isA,isSuperAdmin:isSA,watchedVideos:{},quizHistory:{},profilePic:null};
    await sSet("user:"+email.toLowerCase(),u);await sSet("un:"+uname.toLowerCase(),email.toLowerCase());await sSet("session",u);
    setBusy(false);onAuth(u);onClose();
  };
  const doLogin=async()=>{
    cl();if(!loginPw){sm("e","Please enter your password.");return;}
    setBusy(true);const u=await sGet("user:"+email.toLowerCase());
    if(!u){sm("e","No account found.");setBusy(false);return;}
    if(u.ph!==btoa(loginPw)){sm("e","Incorrect password.");setBusy(false);return;}
    const admins=await sGet("adminList")||[SUPER_ADMIN];
    const isSA=u.email===SUPER_ADMIN;
    const isA=isSA||admins.map(a=>a.toLowerCase()).includes(u.email);
    const upd={...u,isAdmin:isA,isSuperAdmin:isSA};
    await sSet("user:"+u.email,upd);await sSet("session",upd);
    setBusy(false);onAuth(upd);onClose();
  };

  const overlay={position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center",padding:"20px",overflowY:"auto"};
  const box={background:C.bgPanel,border:`1px solid ${C.border}`,padding:"36px 32px",width:"100%",maxWidth:"430px",position:"relative",margin:"auto",borderRadius:"3px"};

  return(
    <div style={overlay} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div style={box}>
        <button onClick={onClose} style={{position:"absolute",top:"13px",right:"14px",background:"none",border:"none",color:C.textDim,cursor:"pointer",fontSize:"18px",lineHeight:1}}>✕</button>
        <div style={{marginBottom:"20px"}}><Logo size="sm"/></div>
        {["pw","uname"].includes(step)&&<div style={{display:"flex",gap:"3px",marginBottom:"20px"}}>{steps.map((s,i)=><div key={s} style={{flex:1,height:"3px",background:i<=idx?C.teal:"rgba(255,255,255,0.1)",borderRadius:"2px",transition:"background 0.3s"}}/>)}</div>}
        <Msg type={msg.t==="ok"?"ok":"err"} text={msg.s}/>

        {step==="email"&&<>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"24px",fontWeight:300,marginBottom:"5px",color:C.text}}>Welcome</h2>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.textDim,marginBottom:"20px",lineHeight:1.6}}>Enter your email to sign in or create a new account.</p>
          <input value={email} onChange={e=>{setEmail(e.target.value);cl();}} placeholder="Email address" type="email" style={iS} onKeyDown={e=>e.key==="Enter"&&doEmail()}/>
          <button onClick={doEmail} disabled={busy} style={{...bS,padding:"12px",width:"100%",marginTop:"12px",fontSize:"12px",opacity:busy?0.7:1}}>{busy?"Checking...":"Continue  →"}</button>
        </>}

        {step==="pw"&&<>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"24px",fontWeight:300,marginBottom:"5px",color:C.text}}>Create a password</h2>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.textDim,marginBottom:"18px"}}>For <strong style={{color:C.tealLight}}>{email}</strong></p>
          <div style={{position:"relative",marginBottom:"9px"}}>
            <input value={pw} onChange={e=>{setPw(e.target.value);cl();}} placeholder="Choose a strong password" type={showPw?"text":"password"} style={{...iS,paddingRight:"44px"}}/>
            <Eye show={showPw} toggle={()=>setShowPw(p=>!p)}/>
          </div>
          {pw.length>0&&<>
            <div style={{display:"flex",gap:"3px",marginBottom:"7px"}}>{[1,2,3,4,5].map(i=><div key={i} style={{flex:1,height:"3px",background:i<=pwr.passed?pwr.col:"rgba(255,255,255,0.1)",borderRadius:"2px",transition:"all 0.3s"}}/>)}</div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:pwr.col,marginBottom:"9px",letterSpacing:"0.05em"}}>{pwr.strength}</div>
            <div style={{background:"rgba(255,255,255,0.03)",border:`1px solid ${C.border}`,padding:"11px 13px",marginBottom:"11px",borderRadius:"2px"}}>
              {pwr.rules.map(r=><div key={r.id} style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"5px",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:r.ok?C.success:C.textDim}}><span style={{fontSize:"12px"}}>{r.ok?"✓":"○"}</span>{r.label}</div>)}
            </div>
          </>}
          <div style={{position:"relative",marginBottom:"11px"}}>
            <input value={pw2} onChange={e=>{setPw2(e.target.value);cl();}} placeholder="Confirm password" type={showPw2?"text":"password"} style={{...iS,paddingRight:"44px"}}/>
            <Eye show={showPw2} toggle={()=>setShowPw2(p=>!p)}/>
          </div>
          {pw2.length>0&&<div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"11px",marginBottom:"10px",color:pw===pw2?C.success:C.danger}}>{pw===pw2?"✓  Passwords match":"✕  Passwords do not match"}</div>}
          <div style={{display:"flex",gap:"9px"}}>
            <button onClick={()=>{setStep("email");cl();}} style={{...bO,padding:"10px 16px"}}>← Back</button>
            <button onClick={doPW} style={{...bS,padding:"10px",flex:1}}>Continue  →</button>
          </div>
        </>}

        {step==="uname"&&<>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"24px",fontWeight:300,marginBottom:"5px",color:C.text}}>Choose a username</h2>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.textDim,marginBottom:"18px",lineHeight:1.6}}>Displayed on your profile and the leaderboard. No spaces. Must be unique.</p>
          <input value={uname} onChange={e=>{setUname(e.target.value.replace(/\s/g,""));cl();}} placeholder="Username (3–20 characters)" style={iS} maxLength={20} onKeyDown={e=>e.key==="Enter"&&doUname()}/>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:C.textDim,margin:"6px 0 14px"}}>{uname.length}/20</div>
          <div style={{display:"flex",gap:"9px"}}>
            <button onClick={()=>{setStep("pw");cl();}} style={{...bO,padding:"10px 16px"}}>← Back</button>
            <button onClick={doUname} disabled={busy} style={{...bS,padding:"10px",flex:1,opacity:busy?0.7:1}}>{busy?"Creating account...":"Create Account  →"}</button>
          </div>
        </>}

        {step==="login"&&<>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"24px",fontWeight:300,marginBottom:"5px",color:C.text}}>Welcome back</h2>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.textDim,marginBottom:"18px"}}>Signing in as <strong style={{color:C.tealLight}}>{email}</strong></p>
          <div style={{position:"relative",marginBottom:"13px"}}>
            <input value={loginPw} onChange={e=>{setLoginPw(e.target.value);cl();}} placeholder="Your password" type={showL?"text":"password"} style={{...iS,paddingRight:"44px"}} onKeyDown={e=>e.key==="Enter"&&doLogin()}/>
            <Eye show={showL} toggle={()=>setShowL(p=>!p)}/>
          </div>
          <div style={{display:"flex",gap:"9px"}}>
            <button onClick={()=>{setStep("email");cl();setLoginPw("");}} style={{...bO,padding:"10px 16px"}}>← Back</button>
            <button onClick={doLogin} disabled={busy} style={{...bS,padding:"10px",flex:1,opacity:busy?0.7:1}}>{busy?"Signing in...":"Sign In  →"}</button>
          </div>
        </>}
      </div>
    </div>
  );
}

function ProfileModal({user,onClose,onUpdate}){
  const[tab,setTab]=useState("overview");
  const[uname,setUname]=useState(user.username);
  const[cPw,setCPw]=useState(""),[nPw,setNPw]=useState(""),[nPw2,setNPw2]=useState("");
  const[sC,setSC]=useState(false),[sN,setSN]=useState(false),[sN2,setSN2]=useState(false);
  const[msg,setMsg]=useState({t:"",s:""}),[busy,setBusy]=useState(false);
  const picRef=useRef(null);
  const pwr=checkPW(nPw);
  const sm=(t,s)=>setMsg({t,s}),cl=()=>setMsg({t:"",s:""});

  const saveUname=async()=>{
    cl();if(uname.trim()===user.username){sm("ok","Username unchanged.");return;}
    if(uname.length<3||uname.length>20){sm("e","Username must be 3–20 characters.");return;}
    if(/\s/.test(uname)){sm("e","No spaces allowed.");return;}
    setBusy(true);const taken=await sGet("un:"+uname.toLowerCase());
    if(taken&&taken!==user.email){sm("e","Username already taken.");setBusy(false);return;}
    await sDel("un:"+user.username.toLowerCase());
    const u={...user,username:uname.trim()};
    await sSet("user:"+user.email,u);await sSet("un:"+uname.toLowerCase(),user.email);await sSet("session",u);
    setBusy(false);sm("ok","Username updated successfully.");onUpdate(u);
  };

  const savePw=async()=>{
    cl();if(user.ph!==btoa(cPw)){sm("e","Current password is incorrect.");return;}
    if(!pwr.all){sm("e","New password does not meet all requirements.");return;}
    if(nPw!==nPw2){sm("e","Passwords do not match.");return;}
    setBusy(true);const u={...user,ph:btoa(nPw)};
    await sSet("user:"+user.email,u);await sSet("session",u);
    setBusy(false);setCPw("");setNPw("");setNPw2("");sm("ok","Password updated successfully.");onUpdate(u);
  };

  const uploadPic=e=>{
    const f=e.target.files[0];if(!f)return;
    if(!f.type.startsWith("image/")){sm("e","Please select an image file.");return;}
    if(f.size>2*1024*1024){sm("e","Image must be under 2MB.");return;}
    const r=new FileReader();r.onload=async ev=>{const u={...user,profilePic:ev.target.result};await sSet("user:"+user.email,u);await sSet("session",u);sm("ok","Profile picture updated.");onUpdate(u);};r.readAsDataURL(f);
  };

  const hist=Object.entries(user.quizHistory||{}).flatMap(([sp,arr])=>arr.map(s=>({...s,specialty:sp})));
  const wv=user.watchedVideos||{};

  const overlay={position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center",padding:"20px",overflowY:"auto"};
  const box={background:C.bgPanel,border:`1px solid ${C.border}`,padding:"32px 30px",width:"100%",maxWidth:"580px",position:"relative",margin:"auto",borderRadius:"3px"};

  return(
    <div style={overlay} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div style={box}>
        <button onClick={onClose} style={{position:"absolute",top:"13px",right:"14px",background:"none",border:"none",color:C.textDim,cursor:"pointer",fontSize:"18px",lineHeight:1}}>✕</button>
        <Msg type={msg.t==="ok"?"ok":"err"} text={msg.s}/>
        <div style={{display:"flex",alignItems:"center",gap:"16px",marginBottom:"22px"}}>
          <div style={{position:"relative",flexShrink:0}}>
            <div style={{width:"60px",height:"60px",borderRadius:"50%",overflow:"hidden",border:`2px solid ${C.teal}`,background:"linear-gradient(135deg,#0e8c8c,#1a2744)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}} onClick={()=>picRef.current?.click()}>
              {user.profilePic?<img src={user.profilePic} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"22px",fontWeight:700,color:"#fff"}}>{user.username[0].toUpperCase()}</span>}
            </div>
            <div style={{position:"absolute",bottom:0,right:0,width:"19px",height:"19px",background:C.teal,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"10px",color:"#fff"}} onClick={()=>picRef.current?.click()}>✎</div>
            <input ref={picRef} type="file" accept="image/*" style={{display:"none"}} onChange={uploadPic}/>
          </div>
          <div>
            <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"22px",fontWeight:300,color:C.text,marginBottom:"2px"}}>{user.username}</h3>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.textDim}}>{user.email}</div>
            {user.isAdmin&&<span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.11em",textTransform:"uppercase",background:"rgba(201,169,110,0.12)",border:"1px solid rgba(201,169,110,0.28)",color:C.gold,padding:"2px 8px",marginTop:"5px",display:"inline-block",borderRadius:"2px"}}>{user.isSuperAdmin?"Super Admin":"Admin"}</span>}
          </div>
        </div>
        <div style={{display:"flex",borderBottom:`1px solid ${C.border}`,marginBottom:"22px"}}>
          {["overview","username","password"].map(t=>(
            <button key={t} onClick={()=>{setTab(t);cl();}} style={{padding:"9px 18px",background:"transparent",border:"none",borderBottom:tab===t?`2px solid ${C.teal}`:"2px solid transparent",color:tab===t?C.tealLight:C.textDim,fontFamily:"'DM Sans',sans-serif",fontSize:"10px",letterSpacing:"0.12em",textTransform:"uppercase",cursor:"pointer",transition:"all 0.2s",marginBottom:"-1px",flexShrink:0}}>
              {t}
            </button>
          ))}
        </div>

        {tab==="overview"&&<>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"9px",marginBottom:"18px"}}>
            {[["Joined",new Date(user.joined).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})],["Quizzes Taken",hist.length],["Videos Started",Object.keys(wv).length],["Completed",Object.values(wv).filter(v=>v>=98).length]].map(([k,v])=>(
              <div key={k} style={{background:C.bgCard,border:`1px solid ${C.border}`,padding:"13px 15px",borderRadius:"2px"}}>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.16em",textTransform:"uppercase",color:C.textDim,marginBottom:"4px"}}>{k}</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"24px",fontWeight:300,color:C.tealLight}}>{v}</div>
              </div>
            ))}
          </div>
          {hist.length>0&&<>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",letterSpacing:"0.14em",textTransform:"uppercase",color:C.textDim,marginBottom:"9px"}}>Recent Quiz Results</div>
            <div style={{display:"flex",flexDirection:"column",gap:"5px",maxHeight:"190px",overflowY:"auto",marginBottom:"16px"}}>
              {[...hist].reverse().slice(0,10).map((s,i)=>{const col=TC[s.specialty]||C.teal;return(
                <div key={i} style={{background:C.bgCard,border:`1px solid ${C.border}`,padding:"9px 13px",display:"flex",alignItems:"center",gap:"10px",borderRadius:"2px"}}>
                  <div style={{width:"5px",height:"5px",background:col,borderRadius:"50%",flexShrink:0}}/>
                  <div style={{flex:1,fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.text}}>{s.specialty}</div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"18px",color:col,fontWeight:300}}>{s.score}/{s.total}</div>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:C.textDim,minWidth:"32px",textAlign:"right"}}>{s.pct}%</div>
                </div>
              );})}
            </div>
          </>}
          {Object.keys(wv).length>0&&<>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",letterSpacing:"0.14em",textTransform:"uppercase",color:C.textDim,marginBottom:"9px"}}>Video Progress</div>
            <div style={{display:"flex",flexDirection:"column",gap:"5px",maxHeight:"150px",overflowY:"auto"}}>
              {Object.entries(wv).map(([vid,pct])=>{const found=SV.find(v=>v.id===vid);return(
                <div key={vid} style={{background:C.bgCard,border:`1px solid ${C.border}`,padding:"8px 13px",display:"flex",alignItems:"center",gap:"10px",borderRadius:"2px"}}>
                  <div style={{flex:1,fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{found?found.title:vid}</div>
                  <div style={{width:"70px",height:"3px",background:"rgba(255,255,255,0.08)",borderRadius:"2px",flexShrink:0}}><div style={{width:`${pct}%`,height:"100%",background:C.teal,borderRadius:"2px"}}/></div>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",color:pct>=98?C.success:C.textDim,minWidth:"28px",textAlign:"right"}}>{pct>=98?"✓":pct+"%"}</div>
                </div>
              );})}
            </div>
          </>}
        </>}

        {tab==="username"&&<>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.textDim,marginBottom:"15px"}}>Current: <strong style={{color:C.tealLight}}>{user.username}</strong></p>
          <input value={uname} onChange={e=>{setUname(e.target.value.replace(/\s/g,""));cl();}} placeholder="New username" style={iS} maxLength={20}/>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:C.textDim,margin:"6px 0 14px"}}>{uname.length}/20 · No spaces</div>
          <button onClick={saveUname} disabled={busy} style={{...bS,padding:"10px 24px",opacity:busy?0.7:1}}>{busy?"Saving...":"Save Username"}</button>
        </>}

        {tab==="password"&&<>
          <div style={{position:"relative",marginBottom:"11px"}}>
            <input value={cPw} onChange={e=>{setCPw(e.target.value);cl();}} placeholder="Current password" type={sC?"text":"password"} style={{...iS,paddingRight:"44px"}}/>
            <Eye show={sC} toggle={()=>setSC(p=>!p)}/>
          </div>
          <div style={{position:"relative",marginBottom:"8px"}}>
            <input value={nPw} onChange={e=>{setNPw(e.target.value);cl();}} placeholder="New password" type={sN?"text":"password"} style={{...iS,paddingRight:"44px"}}/>
            <Eye show={sN} toggle={()=>setSN(p=>!p)}/>
          </div>
          {nPw.length>0&&<>
            <div style={{display:"flex",gap:"3px",marginBottom:"6px"}}>{[1,2,3,4,5].map(i=><div key={i} style={{flex:1,height:"3px",background:i<=pwr.passed?pwr.col:"rgba(255,255,255,0.1)",borderRadius:"2px"}}/>)}</div>
            <div style={{background:"rgba(255,255,255,0.03)",border:`1px solid ${C.border}`,padding:"10px 12px",marginBottom:"10px",borderRadius:"2px"}}>
              {pwr.rules.map(r=><div key={r.id} style={{display:"flex",alignItems:"center",gap:"7px",marginBottom:"4px",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:r.ok?C.success:C.textDim}}><span>{r.ok?"✓":"○"}</span>{r.label}</div>)}
            </div>
          </>}
          <div style={{position:"relative",marginBottom:"11px"}}>
            <input value={nPw2} onChange={e=>{setNPw2(e.target.value);cl();}} placeholder="Confirm new password" type={sN2?"text":"password"} style={{...iS,paddingRight:"44px"}}/>
            <Eye show={sN2} toggle={()=>setSN2(p=>!p)}/>
          </div>
          {nPw2.length>0&&<div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"11px",marginBottom:"10px",color:nPw===nPw2?C.success:C.danger}}>{nPw===nPw2?"✓  Passwords match":"✕  Passwords do not match"}</div>}
          <button onClick={savePw} disabled={busy} style={{...bS,padding:"10px 24px",opacity:busy?0.7:1}}>{busy?"Saving...":"Update Password"}</button>
        </>}
      </div>
    </div>
  );
}

function AdminPanel({user,onClose,onSiteUpdate}){
  const[tab,setTab]=useState("videos");
  const[msg,setMsg]=useState({t:"",s:""});
  const sm=(t,s)=>{setMsg({t,s});setTimeout(()=>setMsg({t:"",s:""}),4000);};
  const[videos,setVideos]=useState([]);
  const[services,setServices]=useState(DS);
  const[admins,setAdmins]=useState([SUPER_ADMIN]);
  const[hero,setHero]=useState({title:"General Medical Practice",subtitle:"Care. Innovation. Trust.",desc:"A registered UK medical practice based in Blackburn — delivering high-quality clinical care, medical education and professional development."});
  const[qSpec,setQSpec]=useState(SPECIALTIES[0]);
  const[customQs,setCustomQs]=useState([]);
  const[vTitle,setVTitle]=useState(""),  [vTopic,setVTopic]=useState("Cardiology");
  const[vCh,setVCh]=useState(""),  [vType,setVType]=useState("youtube");
  const[vYT,setVYT]=useState(""),  [vFile,setVFile]=useState(null),  [vURL,setVURL]=useState("");
  const[editVid,setEditVid]=useState(null);
  const[editSvc,setEditSvc]=useState(null);
  const[newAdmin,setNewAdmin]=useState("");
  const[editQIdx,setEditQIdx]=useState(null);
  const[qForm,setQForm]=useState({q:"",o:["","","",""],a:0,exp:""});
  const vRef=useRef(null);

  useEffect(()=>{loadAll();},[]);
  useEffect(()=>{(async()=>setCustomQs(await sGet("cq:"+qSpec)||[]))();},[qSpec]);

  const loadAll=async()=>{
    const v=await sGet("customVideos")||[];
    const s=await sGet("customServices")||DS;
    const aRaw=await sGet("adminList")||[SUPER_ADMIN];
    const a=aRaw.map(x=>x.toLowerCase()).includes(SUPER_ADMIN)?aRaw:[SUPER_ADMIN,...aRaw];
    const h=await sGet("heroText")||hero;
    setVideos(v);setServices(s);setAdmins(a);setHero(h);
  };

  const saveVid=async()=>{
    if(!vTitle.trim()){sm("e","Title required.");return;}
    if(vType==="youtube"&&!vYT.trim()){sm("e","YouTube URL or ID required.");return;}
    if(vType==="upload"&&!vURL){sm("e","Upload a file first.");return;}
    let yt=vYT.trim();if(vType==="youtube"){const m=yt.match(/(?:v=|youtu\.be\/)([^&\s]+)/);if(m)yt=m[1];}
    const nv={id:editVid?editVid.id:"cv_"+Date.now(),title:vTitle.trim(),topic:vTopic,channel:vCh.trim()||"Emrzase Hope",type:vType,ytId:vType==="youtube"?yt:null,fileURL:vType==="upload"?vURL:null};
    const upd=editVid?videos.map(v=>v.id===editVid.id?nv:v):[...videos,nv];
    await sSet("customVideos",upd);setVideos(upd);
    setVTitle("");setVCh("");setVYT("");setVFile(null);setVURL("");setEditVid(null);setVTopic("Cardiology");setVType("youtube");
    sm("ok",editVid?"Video updated.":"Video added.");onSiteUpdate();
  };
  const loadVidEdit=v=>{setEditVid(v);setVTitle(v.title);setVTopic(v.topic);setVCh(v.channel);setVType(v.type);setVYT(v.ytId||"");setVURL(v.fileURL||"");};
  const delVid=async id=>{const u=videos.filter(v=>v.id!==id);await sSet("customVideos",u);setVideos(u);sm("ok","Removed.");onSiteUpdate();};
  const handleFile=e=>{const f=e.target.files[0];if(!f)return;if(!f.type.startsWith("video/")){sm("e","Select a video file.");return;}if(f.size>5*1024*1024){sm("e","Max 5MB. Use YouTube for larger videos.");return;}const r=new FileReader();r.onload=ev=>{setVFile(f);setVURL(ev.target.result);};r.readAsDataURL(f);};
  const saveSvc=async()=>{if(!editSvc?.title.trim()){sm("e","Title required.");return;}const u=services.map(s=>s.id===editSvc.id?editSvc:s);await sSet("customServices",u);setServices(u);setEditSvc(null);sm("ok","Service saved.");onSiteUpdate();};
  const saveHero=async()=>{await sSet("heroText",hero);sm("ok","Hero section saved.");onSiteUpdate();};
  const addAdmin=async()=>{const em=newAdmin.trim().toLowerCase();if(!em||!/\S+@\S+\.\S+/.test(em)){sm("e","Valid email required.");return;}if(admins.map(a=>a.toLowerCase()).includes(em)){sm("e","Already an admin.");return;}const u=[...admins,em];await sSet("adminList",u);setAdmins(u);const usr=await sGet("user:"+em);if(usr)await sSet("user:"+em,{...usr,isAdmin:true});setNewAdmin("");sm("ok",em+" is now an admin.");};
  const delAdmin=async em=>{if(em.toLowerCase()===SUPER_ADMIN){sm("e","Super admin cannot be removed.");return;}const u=admins.filter(a=>a.toLowerCase()!==em.toLowerCase());await sSet("adminList",u);setAdmins(u);const usr=await sGet("user:"+em.toLowerCase());if(usr)await sSet("user:"+em.toLowerCase(),{...usr,isAdmin:false});sm("ok","Admin removed.");};
  const saveQ=async()=>{
    if(!qForm.q.trim()||qForm.o.some(o=>!o.trim())||!qForm.exp.trim()){sm("e","All fields are required.");return;}
    const existing=await sGet("cq:"+qSpec)||[];
    const upd=editQIdx!==null?existing.map((q,i)=>i===editQIdx?{...qForm}:q):[...existing,{...qForm}];
    await sSet("cq:"+qSpec,upd);setCustomQs(upd);setEditQIdx(null);setQForm({q:"",o:["","","",""],a:0,exp:""});sm("ok","Question saved.");
  };
  const delQ=async idx=>{const ex=await sGet("cq:"+qSpec)||[];const u=ex.filter((_,i)=>i!==idx);await sSet("cq:"+qSpec,u);setCustomQs(u);sm("ok","Removed.");};

  const topics=Object.keys(TC);
  const allQs=[...(QUESTION_BANK[qSpec]||[]),...customQs];

  const sidebar=[{id:"videos",icon:"📹",label:"Videos"},{id:"services",icon:"⚕️",label:"Services"},{id:"hero",icon:"🏠",label:"Hero Text"},{id:"questions",icon:"🧠",label:"Questions"},...(user.isSuperAdmin?[{id:"admins",icon:"👑",label:"Admins"}]:[])];

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.96)",zIndex:998,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <div style={{background:C.bgDeep,borderBottom:`1px solid ${C.border}`,padding:"0 24px",height:"58px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:"14px"}}>
          <Logo size="sm"/>
          <div style={{width:"1px",height:"24px",background:C.border}}/>
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",color:C.textMid,fontWeight:400}}>Admin Panel</span>
          {user.isSuperAdmin&&<span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.12em",textTransform:"uppercase",background:"rgba(201,169,110,0.12)",border:"1px solid rgba(201,169,110,0.28)",color:C.gold,padding:"3px 9px",borderRadius:"2px"}}>Super Admin</span>}
        </div>
        <button onClick={onClose} style={{...bO,padding:"7px 16px",fontSize:"10px"}}>← Back to Site</button>
      </div>
      <div style={{display:"flex",flex:1,overflow:"hidden"}}>
        <div style={{width:"172px",background:C.bgCard,borderRight:`1px solid ${C.border}`,flexShrink:0,overflowY:"auto",paddingTop:"8px"}}>
          {sidebar.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"13px 16px",background:tab===t.id?"rgba(14,140,140,0.12)":"transparent",border:"none",borderLeft:tab===t.id?`3px solid ${C.teal}`:"3px solid transparent",color:tab===t.id?C.tealLight:C.textMid,fontFamily:"'DM Sans',sans-serif",fontSize:"12px",cursor:"pointer",textAlign:"left",transition:"all 0.2s",display:"flex",alignItems:"center",gap:"9px",width:"100%",letterSpacing:"0.03em"}}>
              <span style={{fontSize:"15px"}}>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"26px 28px"}}>
          <Msg type={msg.t==="ok"?"ok":"err"} text={msg.s}/>

          {tab==="videos"&&<>
            <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"21px",fontWeight:300,color:C.text,marginBottom:"18px"}}>{editVid?"Edit Video":"Add New Video"}</h3>
            <div style={{background:C.bgCard,border:`1px solid ${C.border}`,padding:"20px",marginBottom:"22px",borderRadius:"3px"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginBottom:"10px"}}>
                <input value={vTitle} onChange={e=>setVTitle(e.target.value)} placeholder="Title *" style={iS}/>
                <input value={vCh} onChange={e=>setVCh(e.target.value)} placeholder="Channel / Presenter" style={iS}/>
                <select value={vTopic} onChange={e=>setVTopic(e.target.value)} style={{...iS,cursor:"pointer"}}>{topics.map(t=><option key={t} value={t} style={{background:C.bgPanel}}>{t}</option>)}</select>
                <select value={vType} onChange={e=>{setVType(e.target.value);setVFile(null);setVURL("");setVYT("");}} style={{...iS,cursor:"pointer"}}>
                  <option value="youtube" style={{background:C.bgPanel}}>YouTube URL or ID</option>
                  <option value="upload" style={{background:C.bgPanel}}>Upload video file</option>
                </select>
              </div>
              {vType==="youtube"?<input value={vYT} onChange={e=>setVYT(e.target.value)} placeholder="Paste YouTube URL or video ID" style={{...iS,marginBottom:"12px"}}/>
              :<div style={{border:"2px dashed rgba(14,140,140,0.28)",padding:"18px",textAlign:"center",cursor:"pointer",marginBottom:"12px",background:vURL?"rgba(14,140,140,0.06)":"transparent",borderRadius:"2px",transition:"all 0.2s"}} onClick={()=>vRef.current?.click()}>
                {vFile?<div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.success}}>✓  {vFile.name} <span style={{color:C.textDim}}>· Click to change</span></div>
                :<><div style={{fontSize:"24px",marginBottom:"6px"}}>📹</div><p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.textDim}}>Click to upload · MP4 / WebM · Max 5 MB</p></>}
                <input ref={vRef} type="file" accept="video/*" style={{display:"none"}} onChange={handleFile}/>
              </div>}
              <div style={{display:"flex",gap:"9px"}}>
                <button onClick={saveVid} style={{...bS,padding:"10px 22px"}}>{editVid?"Update Video":"Add Video"}</button>
                {editVid&&<button onClick={()=>{setEditVid(null);setVTitle("");setVCh("");setVYT("");setVFile(null);setVURL("");}} style={{...bO,padding:"10px 16px"}}>Cancel</button>}
              </div>
            </div>
            <h4 style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",letterSpacing:"0.15em",textTransform:"uppercase",color:C.textDim,marginBottom:"11px"}}>Custom Videos ({videos.length})</h4>
            {videos.length===0?<div style={{background:C.bgCard,border:`1px solid ${C.border}`,padding:"20px",textAlign:"center",borderRadius:"3px"}}><p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.textDim}}>No custom videos yet. Add one above.</p></div>
            :<div style={{display:"flex",flexDirection:"column",gap:"7px"}}>
              {videos.map(v=>{const col=TC[v.topic]||C.teal;return(
                <div key={v.id} style={{background:C.bgCard,border:`1px solid ${C.border}`,padding:"12px 16px",display:"flex",alignItems:"center",gap:"12px",borderRadius:"3px"}}>
                  <div style={{width:"30px",height:"30px",background:`${col}14`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    {v.type==="upload"?<span style={{fontSize:"12px"}}>📹</span>:<svg width="9" height="9" viewBox="0 0 24 24" fill={col}><polygon points="5,3 19,12 5,21"/></svg>}
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{v.title}</div>
                    <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:C.textDim,marginTop:"2px"}}><span style={{color:col}}>{v.topic}</span> · {v.channel}</div>
                  </div>
                  <button onClick={()=>loadVidEdit(v)} style={{...bO,padding:"6px 12px",fontSize:"9px"}}>Edit</button>
                  <button onClick={()=>delVid(v.id)} style={{...bD,padding:"6px 12px",fontSize:"9px",letterSpacing:"0.08em",textTransform:"uppercase"}}>Remove</button>
                </div>
              );})}
            </div>}
          </>}

          {tab==="services"&&<>
            <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"21px",fontWeight:300,color:C.text,marginBottom:"18px"}}>Edit Services</h3>
            {services.map(s=>(
              <div key={s.id} style={{background:C.bgCard,border:`1px solid ${editSvc?.id===s.id?C.teal:C.border}`,padding:"16px",marginBottom:"10px",borderRadius:"3px",transition:"border-color 0.2s"}}>
                {editSvc?.id===s.id?(
                  <div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"9px",marginBottom:"9px"}}>
                      <input value={editSvc.title} onChange={e=>setEditSvc({...editSvc,title:e.target.value})} placeholder="Title" style={iS}/>
                      <input value={editSvc.tag} onChange={e=>setEditSvc({...editSvc,tag:e.target.value})} placeholder="Tag (e.g. Core Service)" style={iS}/>
                    </div>
                    <textarea value={editSvc.desc} onChange={e=>setEditSvc({...editSvc,desc:e.target.value})} rows={3} style={{...iS,resize:"vertical",marginBottom:"9px"}}/>
                    <input value={editSvc.img} onChange={e=>setEditSvc({...editSvc,img:e.target.value})} placeholder="Image URL (Unsplash link etc.)" style={{...iS,marginBottom:"10px"}}/>
                    <div style={{display:"flex",gap:"9px"}}>
                      <button onClick={saveSvc} style={{...bS,padding:"9px 18px"}}>Save</button>
                      <button onClick={()=>setEditSvc(null)} style={{...bO,padding:"9px 14px"}}>Cancel</button>
                    </div>
                  </div>
                ):(
                  <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
                    <div style={{flex:1}}>
                      <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",color:C.text,fontWeight:500}}>{s.title}</div>
                      <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:C.textDim,marginTop:"3px"}}>{s.desc.slice(0,70)}…</div>
                    </div>
                    <button onClick={()=>setEditSvc({...s})} style={{...bO,padding:"7px 14px",fontSize:"9px"}}>Edit</button>
                  </div>
                )}
              </div>
            ))}
          </>}

          {tab==="hero"&&<>
            <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"21px",fontWeight:300,color:C.text,marginBottom:"18px"}}>Edit Hero Section</h3>
            <div style={{background:C.bgCard,border:`1px solid ${C.border}`,padding:"20px",borderRadius:"3px"}}>
              {[["Main Title","title"],["Italic Subtitle","subtitle"],["Description Paragraph","desc"]].map(([lbl,key])=>(
                <div key={key} style={{marginBottom:"14px"}}>
                  <label style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",letterSpacing:"0.14em",textTransform:"uppercase",color:C.textDim,display:"block",marginBottom:"6px"}}>{lbl}</label>
                  {key==="desc"?<textarea value={hero[key]} onChange={e=>setHero({...hero,[key]:e.target.value})} rows={3} style={{...iS,resize:"vertical"}}/>:<input value={hero[key]} onChange={e=>setHero({...hero,[key]:e.target.value})} style={iS}/>}
                </div>
              ))}
              <button onClick={saveHero} style={{...bS,padding:"10px 24px"}}>Save Hero Text</button>
            </div>
          </>}

          {tab==="questions"&&<>
            <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"21px",fontWeight:300,color:C.text,marginBottom:"13px"}}>Question Bank</h3>
            <div style={{display:"flex",flexWrap:"wrap",gap:"5px",marginBottom:"18px"}}>
              {SPECIALTIES.map(s=>{const on=qSpec===s;return(<button key={s} onClick={()=>setQSpec(s)} style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.09em",textTransform:"uppercase",padding:"5px 11px",border:`1px solid ${on?C.teal:"rgba(255,255,255,0.09)"}`,background:on?"rgba(14,140,140,0.14)":"transparent",color:on?C.tealLight:C.textDim,cursor:"pointer",transition:"all 0.2s",borderRadius:"2px"}}>{s}</button>);})}
            </div>
            <div style={{background:C.bgCard,border:`1px solid ${editQIdx!==null?C.teal:C.border}`,padding:"18px",marginBottom:"18px",borderRadius:"3px",transition:"border-color 0.2s"}}>
              <h4 style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",letterSpacing:"0.13em",textTransform:"uppercase",color:editQIdx!==null?C.tealLight:C.textDim,marginBottom:"13px"}}>{editQIdx!==null?"Editing Question":"Add New Question"} — {qSpec}</h4>
              <textarea value={qForm.q} onChange={e=>setQForm({...qForm,q:e.target.value})} placeholder="Question text *" rows={3} style={{...iS,resize:"vertical",marginBottom:"9px"}}/>
              {qForm.o.map((opt,i)=>(
                <div key={i} style={{display:"flex",gap:"8px",marginBottom:"6px",alignItems:"center"}}>
                  <div style={{width:"24px",height:"24px",background:qForm.a===i?C.teal:"rgba(255,255,255,0.05)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,fontSize:"10px",fontWeight:700,color:qForm.a===i?"#fff":C.textDim,border:`2px solid ${qForm.a===i?C.teal:C.border}`,transition:"all 0.2s"}} onClick={()=>setQForm({...qForm,a:i})}>{String.fromCharCode(65+i)}</div>
                  <input value={opt} onChange={e=>{const o=[...qForm.o];o[i]=e.target.value;setQForm({...qForm,o});}} placeholder={`Option ${String.fromCharCode(65+i)}${qForm.a===i?" ← correct answer":""}`} style={{...iS,borderColor:qForm.a===i?C.teal:"rgba(14,140,140,0.25)"}}/>
                </div>
              ))}
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:C.textDim,marginBottom:"9px"}}>Click a letter to mark the correct answer</p>
              <textarea value={qForm.exp} onChange={e=>setQForm({...qForm,exp:e.target.value})} placeholder="Clinical explanation / rationale *" rows={3} style={{...iS,resize:"vertical",marginBottom:"11px"}}/>
              <div style={{display:"flex",gap:"9px"}}>
                <button onClick={saveQ} style={{...bS,padding:"9px 20px"}}>{editQIdx!==null?"Update Question":"Add Question"}</button>
                {editQIdx!==null&&<button onClick={()=>{setEditQIdx(null);setQForm({q:"",o:["","","",""],a:0,exp:""});}} style={{...bO,padding:"9px 14px"}}>Cancel</button>}
              </div>
            </div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",letterSpacing:"0.12em",textTransform:"uppercase",color:C.textDim,marginBottom:"10px"}}>{qSpec} — {(QUESTION_BANK[qSpec]||[]).length} built-in · {customQs.length} added · {allQs.length} total</div>
            <div style={{display:"flex",flexDirection:"column",gap:"6px",maxHeight:"400px",overflowY:"auto"}}>
              {allQs.map((q,i)=>{const isCustom=i>=(QUESTION_BANK[qSpec]||[]).length;const cIdx=isCustom?i-(QUESTION_BANK[qSpec]||[]).length:-1;return(
                <div key={i} style={{background:isCustom?"rgba(14,140,140,0.06)":C.bgPanel,border:`1px solid ${isCustom?C.teal+"28":C.border}`,padding:"10px 14px",display:"flex",gap:"10px",alignItems:"flex-start",borderRadius:"2px"}}>
                  <div style={{flex:1,fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:C.textMid,lineHeight:1.55}}>{q.q.slice(0,110)}{q.q.length>110?"…":""}</div>
                  <div style={{display:"flex",gap:"5px",flexShrink:0}}>
                    {isCustom&&<><button onClick={()=>{setEditQIdx(cIdx);setQForm({q:q.q,o:[...q.o],a:q.a,exp:q.exp});}} style={{...bO,padding:"5px 9px",fontSize:"9px"}}>Edit</button><button onClick={()=>delQ(cIdx)} style={{...bD,padding:"5px 9px",fontSize:"9px",letterSpacing:"0.06em",textTransform:"uppercase"}}>Del</button></>}
                    {!isCustom&&<span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",color:C.textDim,padding:"5px 8px"}}>Built-in</span>}
                  </div>
                </div>
              );})}
            </div>
          </>}

          {tab==="admins"&&user.isSuperAdmin&&<>
            <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"21px",fontWeight:300,color:C.text,marginBottom:"18px"}}>Manage Admins</h3>
            <div style={{background:C.bgCard,border:`1px solid ${C.border}`,padding:"18px",marginBottom:"18px",borderRadius:"3px"}}>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.textDim,marginBottom:"13px",lineHeight:1.7}}>Enter an email to grant admin access. The user automatically receives admin privileges when they sign in with this email.</p>
              <div style={{display:"flex",gap:"9px"}}>
                <input value={newAdmin} onChange={e=>setNewAdmin(e.target.value)} placeholder="Email address" type="email" style={{...iS,flex:1}} onKeyDown={e=>e.key==="Enter"&&addAdmin()}/>
                <button onClick={addAdmin} style={{...bS,padding:"10px 18px"}}>Grant Access</button>
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"7px"}}>
              {admins.map(em=>{const isS=em.toLowerCase()===SUPER_ADMIN;return(
                <div key={em} style={{background:C.bgCard,border:`1px solid ${isS?"rgba(201,169,110,0.28)":C.border}`,padding:"13px 16px",display:"flex",alignItems:"center",gap:"12px",borderRadius:"3px"}}>
                  <div style={{width:"32px",height:"32px",background:isS?"rgba(201,169,110,0.1)":"rgba(14,140,140,0.1)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",fontWeight:700,color:isS?C.gold:C.tealLight,flexShrink:0}}>{em[0].toUpperCase()}</div>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",color:C.text}}>{em}</div>
                    <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:isS?C.gold:C.textDim,marginTop:"2px"}}>{isS?"Super Admin — permanent, cannot be removed":"Admin"}</div>
                  </div>
                  {!isS&&<button onClick={()=>delAdmin(em)} style={{...bD,padding:"6px 12px",fontSize:"9px",letterSpacing:"0.08em",textTransform:"uppercase"}}>Remove</button>}
                </div>
              );})}
            </div>
          </>}
        </div>
      </div>
    </div>
  );
}

function Quiz({user,onScore}){
  const[spec,setSpec]=useState(null);const[qs,setQs]=useState([]);const[qi,setQi]=useState(0);
  const[sel,setSel]=useState(null);const[score,setScore]=useState(0);const[done,setDone]=useState(false);
  const[showExp,setShowExp]=useState(false);const[posted,setPosted]=useState(false);const[pMsg,setPMsg]=useState("");
  const[used,setUsed]=useState({});
  const start=useCallback(async s=>{
    const base=QUESTION_BANK[s]||[];const custom=await sGet("cq:"+s)||[];const pool=[...base,...custom];
    const u=used[s]||[];let avail=pool.map((_,i)=>i).filter(i=>!u.includes(i));
    if(avail.length<10){avail=pool.map((_,i)=>i);setUsed(p=>({...p,[s]:[]}))}
    const chosen=[...avail].sort(()=>Math.random()-0.5).slice(0,10);
    setUsed(p=>({...p,[s]:[...(p[s]||[]),...chosen]}));setQs(chosen.map(i=>pool[i]));
    setSpec(s);setQi(0);setSel(null);setScore(0);setDone(false);setShowExp(false);setPosted(false);setPMsg("");
  },[used]);
  const answer=i=>{if(sel!==null)return;setSel(i);setShowExp(true);if(i===qs[qi].a)setScore(sc=>sc+1);};
  const next=()=>{if(qi+1>=qs.length){setDone(true);return;}setQi(n=>n+1);setSel(null);setShowExp(false);};
  const post=async anon=>{
    const name=anon?"Anonymous":(user?.username||"Anonymous");
    const entry={username:name,score,total:qs.length,pct:Math.round((score/qs.length)*100),date:new Date().toISOString(),specialty:spec};
    await onScore(spec,entry);setPosted(true);
    setPMsg(anon?`Score posted anonymously — your privacy is fully protected.`:`Score posted as "${user?.username}" on the ${spec} leaderboard!`);
  };
  const ac=spec?(TC[spec]||C.teal):C.teal;

  if(!spec)return(
    <div>
      <p style={{fontFamily:"'DM Sans',sans-serif",color:C.textMid,marginBottom:"18px",fontSize:"13px",lineHeight:1.8}}>Choose a specialty below. Each session draws 10 random questions from the full pool — questions rotate so you won't repeat any until you've answered every one.</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(155px,1fr))",gap:"8px"}}>
        {SPECIALTIES.map(s=>{const col=TC[s]||C.teal;const p=(QUESTION_BANK[s]||[]).length;const a=(used[s]||[]).length;return(
          <button key={s} onClick={()=>start(s)} style={{background:C.bgPanel,border:`1px solid ${col}22`,padding:"16px 13px",cursor:"pointer",textAlign:"left",transition:"all 0.2s",color:C.text,display:"flex",flexDirection:"column",gap:"7px",borderRadius:"3px"}}
            onMouseEnter={e=>{e.currentTarget.style.background=`${col}0e`;e.currentTarget.style.borderColor=`${col}50`;}}
            onMouseLeave={e=>{e.currentTarget.style.background=C.bgPanel;e.currentTarget.style.borderColor=`${col}22`;}}>
            <div style={{width:"7px",height:"7px",background:col,borderRadius:"50%"}}/>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"15px",fontWeight:400,lineHeight:1.25}}>{s}</div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:C.textDim}}>{p} questions{a>0&&<span style={{color:col}}> · {a} done</span>}</div>
          </button>
        );})}
      </div>
    </div>
  );

  if(done){
    const pct=Math.round((score/qs.length)*100);
    const msg=pct>=90?"Outstanding — exceptional clinical knowledge":pct>=70?"Strong performance — review missed answers":pct>=50?"Good effort — focus on weaker areas":"Keep studying — every session builds your knowledge";
    return(
      <div style={{textAlign:"center",padding:"22px 0"}}>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(50px,10vw,72px)",fontWeight:300,color:ac,lineHeight:1}}>{score}/{qs.length}</div>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.textDim,margin:"6px 0 4px"}}>{pct}%</div>
        <div style={{width:"100%",height:"4px",background:"rgba(255,255,255,0.07)",margin:"10px 0 14px",borderRadius:"2px"}}><div style={{width:`${pct}%`,height:"100%",background:ac,borderRadius:"2px",transition:"width 1.2s ease"}}/></div>
        <p style={{fontFamily:"'DM Sans',sans-serif",color:C.textMid,fontSize:"12px",marginBottom:"20px",lineHeight:1.7}}>{msg}</p>
        {!posted?(
          <div style={{background:C.bgPanel,border:`1px solid ${C.border}`,padding:"18px 20px",maxWidth:"400px",margin:"0 auto 20px",textAlign:"left",borderRadius:"3px"}}>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.text,marginBottom:"13px"}}>Post <span style={{color:ac,fontWeight:600}}>{score}/{qs.length} ({pct}%)</span> to the <strong>{spec}</strong> leaderboard?</p>
            <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
              {user?(<><button onClick={()=>post(false)} style={{...bS,padding:"9px 16px"}}>Post as {user.username}</button><button onClick={()=>post(true)} style={{...bO,padding:"9px 14px"}}>Post Anonymously</button></>)
              :<p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:C.textDim}}>Sign in to post your score.</p>}
            </div>
          </div>
        ):(
          <div style={{background:`${ac}0d`,border:`1px solid ${ac}30`,padding:"13px 16px",maxWidth:"400px",margin:"0 auto 20px",textAlign:"left",borderRadius:"3px"}}>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.text,lineHeight:1.7}}>✓  {pMsg}</p>
          </div>
        )}
        <div style={{display:"flex",gap:"9px",justifyContent:"center",flexWrap:"wrap"}}>
          <button onClick={()=>start(spec)} style={{...bS,padding:"9px 18px"}}>Next Set</button>
          <button onClick={()=>setSpec(null)} style={{...bO,padding:"9px 16px"}}>Change Specialty</button>
        </div>
      </div>
    );
  }

  const q=qs[qi];
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"6px"}}>
        <div style={{display:"flex",gap:"8px",alignItems:"center"}}>
          <button onClick={()=>setSpec(null)} style={{background:"none",border:"none",color:C.textDim,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",padding:0}}>← Back</button>
          <span style={{color:"rgba(255,255,255,0.1)"}}>|</span>
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:ac,letterSpacing:"0.05em"}}>{spec}</span>
        </div>
        <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:C.textDim}}>Q{qi+1} / {qs.length}</span>
      </div>
      <div style={{width:"100%",height:"3px",background:"rgba(255,255,255,0.06)",marginBottom:"20px",borderRadius:"2px"}}><div style={{width:`${((qi+1)/qs.length)*100}%`,height:"100%",background:ac,borderRadius:"2px",transition:"width 0.35s ease"}}/></div>
      <p style={{fontSize:"clamp(13px,2vw,16px)",lineHeight:1.75,marginBottom:"18px",fontWeight:300,color:C.text}}>{q.q}</p>
      <div style={{display:"flex",flexDirection:"column",gap:"7px",marginBottom:"14px"}}>
        {q.o.map((opt,i)=>{
          let bg=C.bgPanel,bc="rgba(255,255,255,0.09)";
          if(sel!==null){if(i===q.a){bg="rgba(34,197,94,0.09)";bc=C.success;}else if(i===sel){bg="rgba(239,68,68,0.09)";bc=C.danger;}}
          return(<button key={i} onClick={()=>answer(i)} style={{background:bg,border:`1px solid ${bc}`,padding:"12px 15px",textAlign:"left",cursor:sel!==null?"default":"pointer",color:C.text,fontFamily:"'DM Sans',sans-serif",fontSize:"13px",lineHeight:1.55,transition:"all 0.18s",display:"flex",gap:"9px",alignItems:"flex-start",borderRadius:"2px"}}
            onMouseEnter={e=>{if(sel===null){e.currentTarget.style.background=`${ac}0d`;e.currentTarget.style.borderColor=`${ac}50`;}}}
            onMouseLeave={e=>{if(sel===null){e.currentTarget.style.background=C.bgPanel;e.currentTarget.style.borderColor="rgba(255,255,255,0.09)";}}}> 
            <span style={{color:ac,fontFamily:"'Cormorant Garamond',serif",fontSize:"15px",lineHeight:1,minWidth:"15px",flexShrink:0,fontWeight:500}}>{String.fromCharCode(65+i)}.</span>
            <span>{opt}</span>
          </button>);
        })}
      </div>
      {showExp&&<div style={{background:`${ac}0a`,border:`1px solid ${ac}24`,padding:"13px 16px",marginBottom:"13px",borderRadius:"2px"}}>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.2em",textTransform:"uppercase",color:ac,marginBottom:"5px"}}>Clinical Explanation</div>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",lineHeight:1.8,color:C.textMid}}>{q.exp}</p>
      </div>}
      {sel!==null&&<button onClick={next} style={{...bS,padding:"10px 22px"}}>{qi+1>=qs.length?"See Results  →":"Next  →"}</button>}
    </div>
  );
}

function Board(){
  const[spec,setSpec]=useState(SPECIALTIES[0]);const[rows,setRows]=useState([]);const[loading,setLoading]=useState(false);
  useEffect(()=>{setLoading(true);(async()=>{const d=await sGet("lb:"+spec)||[];setRows([...d].sort((a,b)=>b.pct-a.pct||new Date(b.date)-new Date(a.date)).slice(0,25));setLoading(false);})();},[spec]);
  const medals=["🥇","🥈","🥉"];
  return(<div>
    <div style={{display:"flex",flexWrap:"wrap",gap:"5px",marginBottom:"20px"}}>
      {SPECIALTIES.map(s=>{const col=TC[s]||C.teal;const on=spec===s;return(<button key={s} onClick={()=>setSpec(s)} style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.09em",textTransform:"uppercase",padding:"5px 10px",border:`1px solid ${on?col:"rgba(255,255,255,0.09)"}`,background:on?`${col}14`:"transparent",color:on?col:C.textDim,cursor:"pointer",transition:"all 0.2s",borderRadius:"2px"}}>{s}</button>);})}</div>
    <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"19px",fontWeight:300,color:C.text,marginBottom:"13px"}}>{spec} — Top Performers</h3>
    {loading?<p style={{fontFamily:"'DM Sans',sans-serif",color:C.textDim,fontSize:"12px"}}>Loading…</p>
    :rows.length===0?<div style={{background:C.bgPanel,border:`1px solid ${C.border}`,padding:"22px",textAlign:"center",borderRadius:"3px"}}><p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.textDim}}>No scores yet. Be the first to post!</p></div>
    :<div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
      {rows.map((e,i)=>{const col=TC[spec]||C.teal;const top=i<3;return(
        <div key={i} style={{background:top?`${col}0a`:C.bgPanel,border:`1px solid ${top?col+"24":C.border}`,padding:"11px 16px",display:"flex",alignItems:"center",gap:"13px",borderRadius:"2px"}}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"18px",minWidth:"26px",textAlign:"center"}}>{medals[i]||`#${i+1}`}</div>
          <div style={{flex:1}}>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",color:C.text,fontWeight:500}}>{e.username}</div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:C.textDim,marginTop:"1px"}}>{new Date(e.date).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"19px",color:col,fontWeight:300}}>{e.score}/{e.total}</div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:C.textDim}}>{e.pct}%</div>
          </div>
        </div>
      );})}
    </div>}
  </div>);
}

export default function App(){
  const[scrolled,setScrolled]=useState(false);
  const[user,setUser]=useState(null);
  const[showAuth,setShowAuth]=useState(false);
  const[showAdmin,setShowAdmin]=useState(false);
  const[showProfile,setShowProfile]=useState(false);
  const[form,setForm]=useState({name:"",email:"",msg:""});
  const[sent,setSent]=useState(false);
  const[activeVid,setActiveVid]=useState(null);
  const[vFilter,setVFilter]=useState("All");
  const[watched,setWatched]=useState({});
  const[activeNav,setActiveNav]=useState("Home");
  const[customVids,setCustomVids]=useState([]);
  const[services,setServices]=useState(DS);
  const[hero,setHero]=useState({title:"General Medical Practice",subtitle:"Care. Innovation. Trust.",desc:"A registered UK medical practice based in Blackburn — delivering high-quality clinical care, medical education and professional development."});

  useEffect(()=>{
    const onScroll=()=>setScrolled(window.scrollY>55);
    window.addEventListener("scroll",onScroll);
    loadSite();
    restoreSession();
    return()=>window.removeEventListener("scroll",onScroll);
  },[]);

  const restoreSession=async()=>{
    const s=await sGet("session");
    if(!s)return;
    const admins=await sGet("adminList")||[SUPER_ADMIN];
    const isSA=s.email===SUPER_ADMIN;
    const isA=isSA||admins.map(a=>a.toLowerCase()).includes(s.email);
    const refreshed={...s,isAdmin:isA,isSuperAdmin:isSA};
    setUser(refreshed);
    setWatched(refreshed.watchedVideos||{});
    if(isA!==s.isAdmin||isSA!==s.isSuperAdmin){
      await sSet("user:"+s.email,refreshed);
      await sSet("session",refreshed);
    }
  };

  const loadSite=async()=>{
    const cv=await sGet("customVideos")||[];
    const sv=await sGet("customServices")||DS;
    const ht=await sGet("heroText")||null;
    setCustomVids(cv);setServices(sv);if(ht)setHero(ht);
  };

  const onSiteUpdate=()=>loadSite();
  const allVids=[...SV,...customVids];
  const login=async u=>{setUser(u);setWatched(u.watchedVideos||{});};
  const logout=async()=>{await sDel("session");setUser(null);setWatched({});};
  const updateUser=u=>{setUser(u);setWatched(u.watchedVideos||{});};

  const markProg=async(vid,pct)=>{
    if(!user)return;
    const w={...watched,[vid]:Math.max(watched[vid]||0,pct)};setWatched(w);
    const u={...user,watchedVideos:w};setUser(u);
    await sSet("user:"+user.email,u);await sSet("session",u);
  };

  const onScore=async(spec,entry)=>{
    const key="lb:"+spec;const ex=await sGet(key)||[];await sSet(key,[...ex,entry]);
    if(user){const h={...(user.quizHistory||{}),[spec]:[...(user.quizHistory?.[spec]||[]),entry]};const u={...user,quizHistory:h};setUser(u);await sSet("user:"+user.email,u);await sSet("session",u);}
  };

  const scrollTo=id=>{setActiveNav(id);document.getElementById(id.toLowerCase().replace(/[\s&]/g,""))?.scrollIntoView({behavior:"smooth"});};
  const topics=["All",...Array.from(new Set(allVids.map(v=>v.topic))).sort()];
  const vids=vFilter==="All"?allVids:allVids.filter(v=>v.topic===vFilter);

  const CSS=`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    ::-webkit-scrollbar{width:4px}
    ::-webkit-scrollbar-track{background:#0f1923}
    ::-webkit-scrollbar-thumb{background:#0e8c8c;border-radius:2px}
    input,textarea,select{color:#e8f0f5!important}
    input::placeholder,textarea::placeholder{color:rgba(232,240,245,0.28)!important}
    input:focus,textarea:focus,select:focus{border-color:#0e8c8c!important;outline:none!important;box-shadow:0 0 0 2px rgba(14,140,140,0.12)!important}
    .nl{cursor:pointer;font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(232,240,245,0.55);transition:color 0.25s;white-space:nowrap;padding:4px 0}
    .nl:hover,.nl.on{color:#14a8a8}
    .sc{position:relative;overflow:hidden;border-radius:2px}
    .sc img{width:100%;height:310px;object-fit:cover;display:block;filter:brightness(0.35);transition:all 0.5s}
    .sc:hover img{transform:scale(1.04);filter:brightness(0.25)}
    .so{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;padding:28px;background:linear-gradient(to top,rgba(0,0,0,0.94) 0%,rgba(0,0,0,0.15) 55%,transparent 100%)}
    .vc{background:#162030;border:1px solid rgba(14,140,140,0.16);transition:all 0.25s;overflow:hidden;border-radius:3px}
    .vc:hover{border-color:rgba(14,140,140,0.42);background:#1a2640;transform:translateY(-1px);box-shadow:0 4px 24px rgba(0,0,0,0.3)}
    .nav-inner{max-width:1400px;margin:0 auto;width:100%;display:flex;align-items:center;justify-content:space-between}
    @media(max-width:900px){.g2{grid-template-columns:1fr!important}.g3{grid-template-columns:1fr 1fr!important}.hm{display:none!important}.sp{padding:60px 22px!important}}
    @media(max-width:560px){.g3{grid-template-columns:1fr!important}}
    @media(min-width:1440px){.g3{grid-template-columns:repeat(4,1fr)!important}}
  `;

  const SH=({label,title,em})=>(
    <div style={{textAlign:"center",marginBottom:"40px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",marginBottom:"10px"}}>
        <div style={{width:"26px",height:"1px",background:C.teal}}/><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.24em",textTransform:"uppercase",color:C.teal}}>{label}</span><div style={{width:"26px",height:"1px",background:C.teal}}/>
      </div>
      <h2 style={{fontSize:"clamp(22px,5vw,44px)",fontWeight:300,letterSpacing:"-0.02em"}}>{title}{em&&<><br/><em style={{color:C.tealLight,fontStyle:"italic"}}>{em}</em></>}</h2>
    </div>
  );

  return(
    <div style={{fontFamily:"'Cormorant Garamond','Georgia',serif",background:C.bg,color:C.text,overflowX:"hidden",minHeight:"100vh"}}>
      <style>{CSS}</style>

      {showAuth&&<AuthModal onClose={()=>setShowAuth(false)} onAuth={login}/>}
      {showProfile&&user&&<ProfileModal user={user} onClose={()=>setShowProfile(false)} onUpdate={updateUser}/>}
      {showAdmin&&user?.isAdmin&&<AdminPanel user={user} onClose={()=>{setShowAdmin(false);onSiteUpdate();}} onSiteUpdate={onSiteUpdate}/>}

      {/* ── NAV ── */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:97,height:"64px",padding:"0 40px",display:"flex",alignItems:"center",justifyContent:"center",background:scrolled?"rgba(9,14,21,0.97)":"rgba(9,14,21,0.8)",borderBottom:`1px solid ${scrolled?C.border:"transparent"}`,backdropFilter:"blur(20px)",transition:"all 0.35s"}}>
        <div className="nav-inner">
          <div style={{cursor:"pointer",flexShrink:0}} onClick={()=>scrollTo("Home")}><Logo size="sm"/></div>
          <div className="hm" style={{display:"flex",gap:"22px",alignItems:"center"}}>
            {NAV.map(l=><span key={l} className={`nl${activeNav===l?" on":""}`} onClick={()=>scrollTo(l)}>{l}</span>)}
            {user?.isAdmin&&<button onClick={()=>setShowAdmin(true)} style={{background:"rgba(201,169,110,0.1)",border:"1px solid rgba(201,169,110,0.3)",color:C.gold,fontFamily:"'DM Sans',sans-serif",fontSize:"10px",letterSpacing:"0.12em",textTransform:"uppercase",cursor:"pointer",padding:"6px 13px",transition:"all 0.25s",borderRadius:"2px"}}>⚙ Admin</button>}
            {user?(
              <div style={{display:"flex",alignItems:"center",gap:"9px"}}>
                <div onClick={()=>setShowProfile(true)} style={{width:"32px",height:"32px",borderRadius:"50%",overflow:"hidden",border:`2px solid ${C.teal}`,background:"linear-gradient(135deg,#0e8c8c,#1a2744)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,transition:"box-shadow 0.2s"}}
                  onMouseEnter={e=>e.currentTarget.style.boxShadow="0 0 0 3px rgba(14,140,140,0.3)"}
                  onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                  {user.profilePic?<img src={user.profilePic} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",fontWeight:700,color:"#fff"}}>{user.username[0].toUpperCase()}</span>}
                </div>
                <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.textMid,maxWidth:"80px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",cursor:"pointer"}} onClick={()=>setShowProfile(true)}>{user.username}</span>
                <button onClick={logout} style={{...bO,padding:"5px 12px",fontSize:"9px"}}>Sign Out</button>
              </div>
            ):(
              <button onClick={()=>setShowAuth(true)} style={{...bS,padding:"8px 18px",fontSize:"12px"}}>Sign In</button>
            )}
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="home" style={{position:"relative",height:"100vh",minHeight:"620px",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
        <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80" alt="" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 30%",filter:"brightness(0.15) saturate(0.45)"}}/>
        <div style={{position:"absolute",inset:0,background:`linear-gradient(to bottom,rgba(15,25,35,0.1) 0%,rgba(15,25,35,0.5) 60%,${C.bg} 100%)`}}/>
        <div style={{position:"relative",textAlign:"center",padding:"0 28px",maxWidth:"920px"}}>
          <div style={{marginBottom:"30px",display:"flex",justifyContent:"center"}}><Logo size="lg"/></div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"12px",marginBottom:"16px"}}>
            <div style={{width:"26px",height:"1px",background:C.teal}}/>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.3em",textTransform:"uppercase",color:C.teal}}>Blackburn, England · Est. October 2025 · Co. 16791155</span>
            <div style={{width:"26px",height:"1px",background:C.teal}}/>
          </div>
          <h1 style={{fontSize:"clamp(32px,6vw,74px)",fontWeight:300,lineHeight:1.05,letterSpacing:"-0.02em",marginBottom:"14px",color:C.text}}>
            {hero.title}<br/><em style={{color:C.tealLight,fontStyle:"italic"}}>{hero.subtitle}</em>
          </h1>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"14px",lineHeight:1.9,color:C.textMid,maxWidth:"520px",margin:"0 auto 32px",fontWeight:300}}>{hero.desc}</p>
          <div style={{display:"flex",gap:"10px",justifyContent:"center",flexWrap:"wrap"}}>
            <button style={{...bS,padding:"12px 24px",fontSize:"12px"}} onClick={()=>scrollTo("Services")}>Our Services</button>
            <button style={{...bO,padding:"12px 24px",fontSize:"12px"}} onClick={()=>scrollTo("Videos")}>Medical Videos</button>
            <button style={{...bO,padding:"12px 24px",fontSize:"12px"}} onClick={()=>user?scrollTo("Quiz"):setShowAuth(true)}>Take the Quiz</button>
          </div>
        </div>
      </section>

      {/* ── COMPANY STRIP ── */}
      <section style={{background:C.bgCard,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`}}>
        <div style={{maxWidth:"1400px",margin:"0 auto",display:"flex",flexWrap:"wrap"}}>
          {[["Company No.","16791155"],["Status","Active ✓"],["Incorporated","16 Oct 2025"],["Address","Blackburn, BB1 1RB"],["SIC","86210 — General Medical Practice"]].map(([k,v],i)=>(
            <div key={k} style={{flex:"1 1 140px",padding:"18px 22px",borderLeft:i>0?`1px solid ${C.border}`:"none",minWidth:"130px"}}>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.18em",textTransform:"uppercase",color:C.textDim,marginBottom:"4px"}}>{k}</div>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.text,fontWeight:400}}>{v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{padding:"88px 48px",maxWidth:"1400px",margin:"0 auto"}} className="sp">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"56px",alignItems:"center"}} className="g2">
          <FadeIn>
            <div style={{position:"relative"}}>
              <img src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80" alt="Medical" style={{width:"100%",height:"460px",objectFit:"cover",display:"block",filter:"brightness(0.75) saturate(0.7)",borderRadius:"2px"}}/>
              <div style={{position:"absolute",bottom:"-14px",right:"-14px",background:"linear-gradient(135deg,#0e8c8c,#0a6666)",padding:"18px 22px",borderRadius:"2px"}}>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"30px",fontWeight:300,color:"#fff",lineHeight:1}}>SIC</div>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",color:"rgba(255,255,255,0.6)",marginTop:"4px",letterSpacing:"0.08em"}}>86210 Medical Practice</div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"14px"}}><div style={{width:"24px",height:"1.5px",background:C.teal}}/><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.22em",textTransform:"uppercase",color:C.teal}}>About The Company</span></div>
              <h2 style={{fontSize:"clamp(22px,4vw,42px)",fontWeight:300,lineHeight:1.15,marginBottom:"14px"}}>Registered UK Medical<br/><em style={{color:C.tealLight,fontStyle:"italic"}}>Practice in Blackburn</em></h2>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",lineHeight:1.9,color:C.textMid,marginBottom:"13px",fontWeight:300}}>Emrzase Hope Ltd (Co. 16791155) was incorporated on 16 October 2025 at 28 Copperfield Street, Blackburn, BB1 1RB, under SIC 86210 — General Medical Practice Activities.</p>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",lineHeight:1.9,color:C.textMid,marginBottom:"22px",fontWeight:300}}>Directed by Dr. Emad Elsayed Hassan Ali (appointed Oct 2025) and Dr. Mariam Mohamed Elmamoon Yehia Zakaria (appointed Jan 2026), both identity-verified via Companies House ACSP.</p>
              {["Companies House verified — Active status","Two qualified medical directors","SIC 86210 — General Medical Practice","Registered in Blackburn, Lancashire"].map(item=>(
                <div key={item} style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"8px"}}><div style={{width:"5px",height:"5px",background:C.teal,borderRadius:"50%",flexShrink:0}}/><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.textMid}}>{item}</span></div>
              ))}
              <div style={{marginTop:"24px"}}><button style={{...bO,padding:"11px 24px",fontSize:"12px"}} onClick={()=>scrollTo("Contact")}>Contact Us</button></div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── DIRECTORS ── */}
      <section style={{background:C.bgCard,padding:"56px 48px",borderTop:`1px solid ${C.border}`}} className="sp">
        <FadeIn><SH label="Company Directors" title="Verified by " em="Companies House"/></FadeIn>
        <div style={{maxWidth:"780px",margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px"}} className="g2">
          {DIRS.map((d,i)=>(
            <FadeIn key={d.name} delay={i*80}>
              <div style={{background:C.bgPanel,border:`1px solid ${C.border}`,padding:"24px 20px",borderRadius:"3px"}}>
                <div style={{width:"36px",height:"36px",background:"linear-gradient(135deg,#0e8c8c,#1a2744)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",fontWeight:700,color:"#fff",marginBottom:"13px",borderRadius:"2px"}}>{d.name.split(" ").filter((_,j)=>j>0).map(n=>n[0]).slice(0,2).join("")}</div>
                <h3 style={{fontSize:"16px",fontWeight:400,marginBottom:"3px",lineHeight:1.3}}>{d.name}</h3>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.14em",textTransform:"uppercase",color:C.teal,marginBottom:"13px"}}>{d.role}</div>
                <div style={{borderTop:`1px solid ${C.border}`,paddingTop:"11px",display:"flex",flexDirection:"column",gap:"6px"}}>
                  {[["Appointed",d.appointed],["Nationality","British"],["Residence","England"],["Identity","Verified ✓"]].map(([k,v])=>(
                    <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:C.textDim}}>{k}</span><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:v==="Verified ✓"?C.success:C.textMid}}>{v}</span></div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{padding:"88px 48px"}} className="sp">
        <FadeIn><SH label="What We Offer" title="Our " em="Services"/></FadeIn>
        <div style={{maxWidth:"1400px",margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"3px"}} className="g2">
          {services.map((s,i)=>(
            <FadeIn key={s.id||i} delay={i*50}>
              <div className="sc"><img src={s.img} alt={s.title}/><div className="so">
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"8px",letterSpacing:"0.18em",textTransform:"uppercase",color:C.tealLight,marginBottom:"8px",padding:"3px 8px",border:"1px solid rgba(14,140,140,0.4)",display:"inline-block",borderRadius:"2px"}}>{s.tag}</div>
                <h3 style={{fontSize:"clamp(16px,2.5vw,22px)",fontWeight:300,marginBottom:"6px"}}>{s.title}</h3>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",lineHeight:1.7,color:"rgba(232,240,245,0.6)"}}>{s.desc}</p>
              </div></div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── VIDEOS ── */}
      <section id="videos" style={{padding:"88px 48px",background:C.bgCard,borderTop:`1px solid ${C.border}`}} className="sp">
        <FadeIn>
          <div style={{textAlign:"center",marginBottom:"28px"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",marginBottom:"10px"}}>
              <div style={{width:"26px",height:"1px",background:C.teal}}/><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.24em",textTransform:"uppercase",color:C.teal}}>Medical Education</span><div style={{width:"26px",height:"1px",background:C.teal}}/>
            </div>
            <h2 style={{fontSize:"clamp(22px,5vw,44px)",fontWeight:300,letterSpacing:"-0.02em",marginBottom:"9px"}}>Clinical <em style={{color:C.tealLight,fontStyle:"italic"}}>Learning Videos</em></h2>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.textDim,maxWidth:"360px",margin:"0 auto",lineHeight:1.75}}>{allVids.length} videos across {topics.length-1} specialties. {user?"Your progress is saved.":"Sign in to track your progress."}</p>
          </div>
        </FadeIn>
        <div style={{maxWidth:"1400px",margin:"0 auto 20px",display:"flex",flexWrap:"wrap",gap:"5px",justifyContent:"center"}}>
          {topics.map(t=>{const col=TC[t]||C.teal;const on=vFilter===t;return(<button key={t} onClick={()=>{setVFilter(t);setActiveVid(null);}} style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.1em",textTransform:"uppercase",padding:"5px 11px",border:`1px solid ${on?col:"rgba(255,255,255,0.09)"}`,background:on?`${col}14`:"transparent",color:on?col:C.textDim,cursor:"pointer",transition:"all 0.2s",borderRadius:"2px"}}>{t}</button>);})}
        </div>
        {activeVid&&(()=>{const v=allVids.find(x=>x.id===activeVid);if(!v)return null;return(
          <div style={{maxWidth:"820px",margin:"0 auto 30px"}}>
            <div style={{position:"relative",paddingBottom:"56.25%",height:0,background:"#000",border:`1px solid ${C.border}`,borderRadius:"3px",overflow:"hidden"}}>
              {v.type==="upload"&&v.fileURL?<video controls autoPlay src={v.fileURL} style={{position:"absolute",top:0,left:0,width:"100%",height:"100%"}}/>
              :<iframe key={activeVid} src={`https://www.youtube-nocookie.com/embed/${v.ytId||v.id}?autoplay=1&rel=0&modestbranding=1`} style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"none"}} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="Video"/>}
            </div>
            <div style={{display:"flex",gap:"7px",marginTop:"8px",alignItems:"center",flexWrap:"wrap"}}>
              <button onClick={()=>setActiveVid(null)} style={{...bO,padding:"6px 13px",fontSize:"9px"}}>✕  Close</button>
              {v.type!=="upload"&&<a href={`https://www.youtube.com/watch?v=${v.ytId||v.id}`} target="_blank" rel="noreferrer" style={{...bO,padding:"6px 13px",fontSize:"9px",textDecoration:"none",color:C.tealLight}}>Open in YouTube ↗</a>}
              {user&&<div style={{display:"flex",gap:"5px",marginLeft:"auto",alignItems:"center"}}>
                <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",color:C.textDim,marginRight:"2px"}}>Mark progress:</span>
                {[25,50,75,100].map(p=>{const done=(watched[activeVid]||0)>=p;return(<button key={p} onClick={()=>markProg(activeVid,p)} style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",padding:"4px 8px",background:done?`${C.teal}22`:"transparent",border:`1px solid ${done?C.teal:"rgba(255,255,255,0.09)"}`,color:done?C.tealLight:C.textDim,cursor:"pointer",transition:"all 0.2s",borderRadius:"2px"}}>{p}%</button>);})}
              </div>}
            </div>
          </div>
        );})()}
        <div style={{maxWidth:"1400px",margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"11px"}} className="g3">
          {vids.map((v,i)=>{
            const tc=TC[v.topic]||C.teal,prog=watched[v.id]||0,playing=activeVid===v.id,r=10,circ=2*Math.PI*r;
            return(<FadeIn key={v.id} delay={(i%6)*25}>
              <div className="vc" style={{border:playing?`1px solid ${tc}`:`1px solid rgba(14,140,140,0.16)`,background:playing?`${tc}0a`:C.bgCard}}>
                <div style={{padding:"15px 14px 11px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"11px"}}>
                    <div style={{width:"30px",height:"30px",background:`${tc}14`,border:`1px solid ${tc}26`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      {v.type==="upload"?<span style={{fontSize:"13px"}}>📹</span>:<svg width="9" height="9" viewBox="0 0 24 24" fill={tc}><polygon points="5,3 19,12 5,21"/></svg>}
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:"5px"}}>
                      {user&&prog>0&&<svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="2.2"/><circle cx="11" cy="11" r={r} fill="none" stroke={tc} strokeWidth="2.2" strokeDasharray={circ} strokeDashoffset={circ-(prog/100)*circ} strokeLinecap="round" transform="rotate(-90 11 11)"/>{prog>=98&&<circle cx="11" cy="11" r="3.2" fill={tc}/>}</svg>}
                      <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"8px",letterSpacing:"0.13em",textTransform:"uppercase",color:tc,background:`${tc}0e`,padding:"2px 6px",border:`1px solid ${tc}1e`,borderRadius:"2px"}}>{v.topic}</span>
                    </div>
                  </div>
                  <div style={{fontSize:"13px",fontWeight:400,lineHeight:1.35,marginBottom:"3px"}}>{v.title}</div>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:C.textDim}}>{v.channel}</div>
                  {user&&prog>0&&<div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",color:tc,marginTop:"5px"}}>{prog>=98?"✓  Watched":prog+"% watched"}</div>}
                </div>
                <div style={{borderTop:`1px solid rgba(14,140,140,0.1)`,display:"flex"}}>
                  <button onClick={()=>setActiveVid(playing?null:v.id)} style={{flex:1,padding:"8px",background:playing?`${tc}0d`:"transparent",border:"none",color:playing?tc:C.textMid,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.1em",textTransform:"uppercase",transition:"all 0.2s",borderRight:`1px solid rgba(14,140,140,0.1)`}}
                    onMouseEnter={e=>{if(!playing){e.currentTarget.style.background=`${tc}0a`;e.currentTarget.style.color=tc;}}}
                    onMouseLeave={e=>{if(!playing){e.currentTarget.style.background="transparent";e.currentTarget.style.color=C.textMid;}}}>
                    {playing?"▶  Playing":"▶  Play"}
                  </button>
                  {v.type==="upload"
                    ?<div style={{flex:1,padding:"8px",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans',sans-serif",fontSize:"9px",color:C.textDim}}>Uploaded</div>
                    :<a href={`https://www.youtube.com/watch?v=${v.ytId||v.id}`} target="_blank" rel="noreferrer" style={{flex:1,padding:"8px",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.1em",textTransform:"uppercase",color:C.textDim,textDecoration:"none",transition:"all 0.2s"}}
                      onMouseEnter={e=>{e.currentTarget.style.background=`${C.teal}0a`;e.currentTarget.style.color=C.tealLight;}}
                      onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=C.textDim;}}>YouTube ↗</a>}
                </div>
              </div>
            </FadeIn>);
          })}
        </div>
      </section>

      {/* ── QUIZ ── */}
      <section id="quiz" style={{padding:"88px 48px",background:C.bg,borderTop:`1px solid ${C.border}`}} className="sp">
        <div style={{maxWidth:"840px",margin:"0 auto"}}>
          <FadeIn><SH label="Test Your Knowledge" title="Medical " em="Specialist Quiz"/></FadeIn>
          <FadeIn delay={60}>
            {!user?(
              <div style={{background:C.bgCard,border:`1px solid ${C.border}`,padding:"40px",textAlign:"center",borderRadius:"3px"}}>
                <Steth size={46}/>
                <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"22px",fontWeight:300,margin:"13px 0 7px"}}>Sign in to take the quiz</h3>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",color:C.textMid,marginBottom:"22px",maxWidth:"320px",margin:"0 auto 22px",lineHeight:1.8}}>Create a free account to access specialist quizzes, post scores to the leaderboard and track your progress.</p>
                <button style={{...bS,padding:"11px 26px",fontSize:"12px"}} onClick={()=>setShowAuth(true)}>Sign In or Register — Free</button>
              </div>
            ):(
              <div style={{background:C.bgCard,border:`1px solid ${C.border}`,padding:"28px 26px",borderRadius:"3px"}}><Quiz user={user} onScore={onScore}/></div>
            )}
          </FadeIn>
        </div>
      </section>

      {/* ── LEADERBOARD ── */}
      <section id="leaderboard" style={{padding:"88px 48px",background:C.bgCard,borderTop:`1px solid ${C.border}`}} className="sp">
        <div style={{maxWidth:"840px",margin:"0 auto"}}>
          <FadeIn><SH label="Rankings" title="Global " em="Leaderboard"/></FadeIn>
          <FadeIn delay={60}><div style={{background:C.bgPanel,border:`1px solid ${C.border}`,padding:"28px 26px",borderRadius:"3px"}}><Board/></div></FadeIn>
        </div>
      </section>

      {/* ── QUOTE ── */}
      <section style={{position:"relative",height:"260px",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
        <img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1600&q=80" alt="" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",filter:"brightness(0.1) saturate(0.35)"}}/>
        <div style={{position:"absolute",inset:0,background:"rgba(15,25,35,0.55)"}}/>
        <div style={{position:"relative",textAlign:"center",padding:"0 28px"}}>
          <h2 style={{fontSize:"clamp(19px,5vw,46px)",fontWeight:300,marginBottom:"13px",maxWidth:"660px"}}>"We don't just provide care —<br/><em style={{color:C.tealLight,fontStyle:"italic"}}>we transform lives."</em></h2>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.2em",textTransform:"uppercase",color:C.textDim}}>— Emrzase Hope Ltd · Care. Innovation. Trust.</p>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{padding:"88px 48px",background:C.bg,borderTop:`1px solid ${C.border}`}} className="sp">
        <div style={{maxWidth:"1040px",margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"56px",alignItems:"start"}} className="g2">
          <FadeIn>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"14px"}}><div style={{width:"24px",height:"1px",background:C.teal}}/><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.22em",textTransform:"uppercase",color:C.teal}}>Get In Touch</span></div>
              <h2 style={{fontSize:"clamp(22px,4vw,40px)",fontWeight:300,lineHeight:1.2,marginBottom:"14px"}}>Contact<br/><em style={{color:C.tealLight,fontStyle:"italic"}}>Emrzase Hope Ltd</em></h2>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",lineHeight:1.9,color:C.textMid,marginBottom:"28px",fontWeight:300}}>To enquire about our services or reach our directors, please use the form or the contact details below.</p>
              {[["📍","Registered Address","28 Copperfield Street, Blackburn, England, BB1 1RB"],["🏢","Company Number","16791155 (Companies House)"],["⚕️","Business Type","General Medical Practice (SIC 86210)"],["📅","Incorporated","16 October 2025"]].map(([ic,lb,vl])=>(
                <div key={lb} style={{display:"flex",gap:"13px",alignItems:"flex-start",marginBottom:"16px"}}>
                  <span style={{fontSize:"14px",marginTop:"1px",flexShrink:0}}>{ic}</span>
                  <div><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.14em",textTransform:"uppercase",color:C.textDim,marginBottom:"3px"}}>{lb}</div><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.text,lineHeight:1.5}}>{vl}</div></div>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            {sent?(
              <div style={{textAlign:"center",padding:"48px 0"}}>
                <div style={{fontSize:"32px",color:C.teal,marginBottom:"12px"}}>✦</div>
                <h3 style={{fontSize:"22px",fontWeight:300,marginBottom:"8px"}}>Message sent.</h3>
                <p style={{fontFamily:"'DM Sans',sans-serif",color:C.textDim,fontSize:"13px"}}>Thank you — we'll be in touch shortly.</p>
              </div>
            ):(
              <form onSubmit={e=>{e.preventDefault();setSent(true);}} style={{display:"flex",flexDirection:"column",gap:"14px"}}>
                <input style={iS} type="text" placeholder="Your Name" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
                <input style={iS} type="email" placeholder="Your Email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
                <textarea style={{...iS,resize:"none",minHeight:"140px",lineHeight:1.7}} rows="5" placeholder="Your Message" required value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})}/>
                <button type="submit" style={{...bS,padding:"12px 30px",alignSelf:"flex-start",fontSize:"12px"}}>Send Message</button>
              </form>
            )}
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{background:"#070c12",borderTop:`1px solid ${C.border}`,padding:"34px 48px"}}>
        <div style={{maxWidth:"1400px",margin:"0 auto"}}>
          <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-between",alignItems:"flex-start",gap:"22px",marginBottom:"22px"}}>
            <div>
              <div style={{marginBottom:"10px"}}><Logo size="sm"/></div>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:C.textDim,lineHeight:1.8,maxWidth:"230px"}}>Co. 16791155 · Registered in England<br/>28 Copperfield Street, Blackburn, BB1 1RB<br/>SIC 86210 — General Medical Practice</p>
            </div>
            <div style={{display:"flex",gap:"20px",flexWrap:"wrap",alignItems:"center"}}>
              {NAV.map(l=><span key={l} className="nl" onClick={()=>scrollTo(l)} style={{fontSize:"10px"}}>{l}</span>)}
            </div>
          </div>
          <div style={{borderTop:"1px solid rgba(255,255,255,0.05)",paddingTop:"14px",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"7px"}}>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:"rgba(232,240,245,0.14)"}}>© {new Date().getFullYear()} Emrzase Hope Ltd. All rights reserved. Care. Innovation. Trust.</p>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:"rgba(232,240,245,0.14)"}}>Incorporated 16 October 2025 · Active · Companies House Verified</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
