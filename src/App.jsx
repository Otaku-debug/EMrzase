import { useState, useEffect, useRef, useCallback } from "react";
import { QUESTION_BANK, SPECIALTIES } from "./questions.js";

const C={bg:"#0f1923",bgCard:"#162030",bgPanel:"#1c2a3a",bgDeep:"#0a1018",teal:"#0e8c8c",tealLight:"#14a8a8",tealDim:"#0a6666",navy:"#1a2744",border:"rgba(14,140,140,0.18)",text:"#e8f0f5",textMid:"rgba(232,240,245,0.65)",textDim:"rgba(232,240,245,0.35)",success:"#22c55e",danger:"#ef4444",warn:"#f59e0b",gold:"#c9a96e"};
const SUPER_ADMIN="24abali@gmail.com";
const DIRS=[{name:"Dr. Emad Elsayed Hassan Ali",role:"Director",appointed:"16 Oct 2025"},{name:"Dr. Mariam Mohamed Elmamoon Yehia Zakaria",role:"Director",appointed:"20 Jan 2026"}];
const NAV=["Home","About","Services","Videos","Quiz","Leaderboard","Contact"];
const TC={"Cardiology":"#ef4444","Emergency Medicine":"#f97316","Endocrinology":"#3b82f6","Nephrology":"#22c55e","Respiratory":"#8b5cf6","Neurology":"#eab308","Surgery":"#ec4899","Gastroenterology":"#14b8a6","Urology":"#06b6d4","Rheumatology":"#a855f7","Psychiatry":"#d946ef","Haematology":"#f43f5e","Vascular":"#0ea5e9","General Practice":"#4a9eff","Paediatrics":"#22d37e","Anaesthesia":"#94a3b8","Radiology":"#38bdf8","Obstetrics & Gynaecology":"#f472b6"};
const DS=[{id:"s1",title:"General Medical Practice",desc:"Registered under SIC 86210, delivering professional general medical practice activities and clinical care.",tag:"Core Service",img:"https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80"},{id:"s2",title:"Primary Healthcare",desc:"Comprehensive primary care services focused on prevention, diagnosis and treatment from our Blackburn base.",tag:"Primary Care",img:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"},{id:"s3",title:"Patient Consultations",desc:"Professional patient-centred consultations delivered with clinical rigour and genuine compassion.",tag:"Consultations",img:"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80"},{id:"s4",title:"Health Assessments",desc:"Thorough health assessments carried out by our Companies House verified directors.",tag:"Assessments",img:"https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&q=80"}];
const SV=[{id:"Gsu8NT1yYes",title:"Congestive Heart Failure",channel:"Ninja Nerd",topic:"Cardiology",type:"youtube"},{id:"8Yv3VfAS9sU",title:"Septic Shock Pathophysiology",channel:"Ninja Nerd",topic:"Emergency Medicine",type:"youtube"},{id:"rh8ycjPCj18",title:"Diabetes Mellitus Type 1 & 2",channel:"Ninja Nerd",topic:"Endocrinology",type:"youtube"},{id:"EgGOwekD1O8",title:"Acute Kidney Injury",channel:"Ninja Nerd",topic:"Nephrology",type:"youtube"},{id:"lzyUVVOqyS0",title:"Pneumonia Overview",channel:"Ninja Nerd",topic:"Respiratory",type:"youtube"},{id:"7lpqxDEfszY",title:"Ischaemic & Haemorrhagic Stroke",channel:"Ninja Nerd",topic:"Neurology",type:"youtube"},{id:"VEpBk8OEVsA",title:"Hypertension Pathophysiology",channel:"Ninja Nerd",topic:"Cardiology",type:"youtube"},{id:"4A9SBnkNgq8",title:"Acute Appendicitis",channel:"Ninja Nerd",topic:"Surgery",type:"youtube"},{id:"9TMBK7jFATs",title:"Asthma Pathophysiology",channel:"Ninja Nerd",topic:"Respiratory",type:"youtube"},{id:"e5XSGmeCaW4",title:"Chronic Kidney Disease",channel:"Ninja Nerd",topic:"Nephrology",type:"youtube"},{id:"FPaOBhkuIhk",title:"Hypothyroidism & Hyperthyroidism",channel:"Ninja Nerd",topic:"Endocrinology",type:"youtube"},{id:"bfAE52gJWNE",title:"Pulmonary Embolism",channel:"Ninja Nerd",topic:"Respiratory",type:"youtube"},{id:"AhDqM2a2sBk",title:"Myocardial Infarction",channel:"Ninja Nerd",topic:"Cardiology",type:"youtube"},{id:"2DJNnTKTols",title:"Liver Cirrhosis",channel:"Ninja Nerd",topic:"Gastroenterology",type:"youtube"},{id:"IFpDqfcFkvo",title:"Urinary Tract Infections",channel:"Ninja Nerd",topic:"Urology",type:"youtube"},{id:"TFoHaVHknLI",title:"Rheumatoid Arthritis",channel:"Ninja Nerd",topic:"Rheumatology",type:"youtube"},{id:"vkXuFBBOHHo",title:"Bipolar Disorder",channel:"Ninja Nerd",topic:"Psychiatry",type:"youtube"},{id:"T_tTBBuIqlw",title:"Meningitis & Encephalitis",channel:"Ninja Nerd",topic:"Neurology",type:"youtube"},{id:"j_xPJBQYDy4",title:"Iron Deficiency Anaemia",channel:"Ninja Nerd",topic:"Haematology",type:"youtube"},{id:"nKHMDLvTMFY",title:"Pancreatitis",channel:"Ninja Nerd",topic:"Gastroenterology",type:"youtube"},{id:"LGkfqL5GIAM",title:"Deep Vein Thrombosis",channel:"Ninja Nerd",topic:"Vascular",type:"youtube"},{id:"kBsWfEfQDIE",title:"Schizophrenia",channel:"Ninja Nerd",topic:"Psychiatry",type:"youtube"},{id:"p8bX7c2QqEA",title:"Crohn's & Ulcerative Colitis",channel:"Ninja Nerd",topic:"Gastroenterology",type:"youtube"},{id:"BtGKsCEtDWs",title:"Osteoporosis",channel:"Ninja Nerd",topic:"Rheumatology",type:"youtube"},{id:"NUKkYiCZhY4",title:"Atrial Fibrillation",channel:"Ninja Nerd",topic:"Cardiology",type:"youtube"},{id:"7XGinepFdtY",title:"Epilepsy & Seizures",channel:"Ninja Nerd",topic:"Neurology",type:"youtube"},{id:"6bCnSfJUPME",title:"Glomerulonephritis",channel:"Ninja Nerd",topic:"Nephrology",type:"youtube"},{id:"hAhJoAzZQEc",title:"Addison's & Cushing's Disease",channel:"Ninja Nerd",topic:"Endocrinology",type:"youtube"},{id:"FP8GHlkG2nQ",title:"Community Acquired Pneumonia",channel:"Ninja Nerd",topic:"Respiratory",type:"youtube"},{id:"QV9TqnJL7gQ",title:"Sepsis Recognition & Management",channel:"Ninja Nerd",topic:"Emergency Medicine",type:"youtube"}];

// Storage
async function sGet(k){try{const r=await window.storage.get(k);return r?JSON.parse(r.value):null;}catch{return null;}}
async function sSet(k,v){try{await window.storage.set(k,JSON.stringify(v));return true;}catch{return false;}}
async function sDel(k){try{await window.storage.delete(k);}catch{}}

// Utilities
function useInView(t=0.1){const ref=useRef(null);const[v,sv]=useState(false);useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)sv(true);},{threshold:t});if(ref.current)o.observe(ref.current);return()=>o.disconnect();},[]);return[ref,v];}
function FadeIn({children,delay=0,st={}}){const[ref,v]=useInView();return <div ref={ref} style={{opacity:v?1:0,transform:v?"translateY(0)":"translateY(18px)",transition:`opacity 0.6s ease ${delay}ms,transform 0.6s ease ${delay}ms`,...st}}>{children}</div>;}

function checkPW(pw){
  const rules=[
    {id:"len",label:"At least 8 characters",ok:pw.length>=8},
    {id:"up",label:"At least one uppercase letter (A-Z)",ok:/[A-Z]/.test(pw)},
    {id:"lo",label:"At least one lowercase letter (a-z)",ok:/[a-z]/.test(pw)},
    {id:"num",label:"At least one number (0-9)",ok:/[0-9]/.test(pw)},
    {id:"sym",label:"At least one special character (!@#...)",ok:/[^A-Za-z0-9]/.test(pw)},
  ];
  const p=rules.filter(r=>r.ok).length;
  const col=p<=1?C.danger:p<=3?C.warn:p===4?"#60a5fa":C.success;
  return{rules,passed:p,strength:["","Weak","Weak","Fair","Good","Strong"][p],col,all:p===5};
}

async function genOTP(email){
  const code=String(Math.floor(100000+Math.random()*900000));
  await sSet("otp:"+email.toLowerCase(),{code,exp:Date.now()+600000});
  return code;
}
async function verifyOTP(email,input){
  const s=await sGet("otp:"+email.toLowerCase());
  if(!s)return{ok:false,msg:"No code found. Please request a new one."};
  if(Date.now()>s.exp)return{ok:false,msg:"Code expired. Request a new one."};
  if(s.code!==input.trim())return{ok:false,msg:"Incorrect code. Please try again."};
  await sDel("otp:"+email.toLowerCase());
  return{ok:true};
}

// Shared styles
const iS={width:"100%",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(14,140,140,0.22)",padding:"11px 13px",fontFamily:"'DM Sans',sans-serif",fontSize:"13px",color:C.text,outline:"none",transition:"border-color 0.3s"};
const bS={background:"linear-gradient(135deg,#0e8c8c,#0a6666)",border:"none",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",letterSpacing:"0.13em",textTransform:"uppercase",cursor:"pointer",transition:"all 0.3s"};
const bO={background:"transparent",border:"1px solid #0e8c8c",color:"#14a8a8",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",letterSpacing:"0.13em",textTransform:"uppercase",cursor:"pointer",transition:"all 0.3s"};
const bD={background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.4)",color:"#fca5a5",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",cursor:"pointer",transition:"all 0.3s"};

function Msg({type,text}){if(!text)return null;const ok=type==="ok";return <div style={{background:ok?"rgba(34,197,94,0.1)":"rgba(239,68,68,0.1)",border:`1px solid ${ok?"rgba(34,197,94,0.35)":"rgba(239,68,68,0.35)"}`,padding:"9px 13px",marginBottom:"12px",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:ok?"#86efac":"#fca5a5"}}>{ok?"✓ ":"✕ "}{text}</div>;}
function Eye({show,toggle}){return <button type="button" onClick={toggle} style={{position:"absolute",right:"10px",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:C.textDim,cursor:"pointer",fontSize:"15px",padding:"2px"}}>{show?"🙈":"👁"}</button>;}

// Logo
function Steth({size=40}){return <svg width={size} height={size} viewBox="0 0 44 44" fill="none"><path d="M10 8 C10 8 8 13 8 17 C8 21 11 23 14 23" stroke="#0e8c8c" strokeWidth="2.5" strokeLinecap="round" fill="none"/><path d="M34 8 C34 8 36 13 36 17 C36 21 33 23 30 23" stroke="#0e8c8c" strokeWidth="2.5" strokeLinecap="round" fill="none"/><circle cx="10" cy="7.5" r="2.5" fill="#0e8c8c"/><circle cx="34" cy="7.5" r="2.5" fill="#0e8c8c"/><path d="M14 23 C14 29 18 31 22 31 C26 31 30 29 30 23" stroke="#0e8c8c" strokeWidth="2.5" strokeLinecap="round" fill="none"/><line x1="22" y1="31" x2="22" y2="37" stroke="#0e8c8c" strokeWidth="2.5" strokeLinecap="round"/><circle cx="22" cy="40" r="3.5" fill="#0e8c8c"/><circle cx="22" cy="40" r="1.8" fill="#e8f0f5"/></svg>;}
function Logo({size="md"}){
  const em={sm:19,md:25,lg:36}[size]||25,sv={sm:28,md:38,lg:54}[size]||38,sub={sm:7,md:9,lg:11}[size]||9;
  return <div style={{display:"flex",alignItems:"center",gap:"9px"}}><Steth size={sv}/><div style={{borderLeft:"2px solid rgba(14,140,140,0.45)",paddingLeft:"9px"}}><div style={{display:"flex",alignItems:"baseline"}}><span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:em,fontWeight:600,color:C.text}}>EM</span><span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:em,fontWeight:300,color:C.tealLight}}>rzase</span></div><div style={{display:"flex",alignItems:"center",gap:"5px",marginTop:"1px"}}><div style={{height:"1px",width:"11px",background:"rgba(14,140,140,0.45)"}}/><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:sub,letterSpacing:"0.22em",textTransform:"uppercase",color:C.tealLight}}>Healthcare</span><div style={{height:"1px",width:"11px",background:"rgba(14,140,140,0.45)"}}/></div></div></div>;
}

// AUTH MODAL - 4 step registration: email -> OTP -> password -> username, or login
function AuthModal({onClose,onAuth}){
  const[step,setStep]=useState("email");
  const[email,setEmail]=useState("");
  const[otp,setOtp]=useState("");
  const[sentCode,setSentCode]=useState("");
  const[pw,setPw]=useState(""),  [pw2,setPw2]=useState("");
  const[showPw,setShowPw]=useState(false), [showPw2,setShowPw2]=useState(false);
  const[uname,setUname]=useState("");
  const[loginPw,setLoginPw]=useState(""), [showL,setShowL]=useState(false);
  const[msg,setMsg]=useState({t:"",s:""}), [busy,setBusy]=useState(false);
  const pwr=checkPW(pw);
  const sm=(t,s)=>setMsg({t,s}), cl=()=>setMsg({t:"",s:""});

  const stepOrder=["email","otp","pw","uname"];
  const idx=stepOrder.indexOf(step);

  const doEmail=async()=>{
    cl(); if(!email||!/\S+@\S+\.\S+/.test(email)){sm("e","Please enter a valid email."); return;}
    setBusy(true);
    const ex=await sGet("user:"+email.toLowerCase());
    setBusy(false);
    if(ex){setStep("login");}
    else{const c=await genOTP(email); setSentCode(c); setStep("otp");}
  };

  const doOTP=async()=>{
    cl(); if(otp.length!==6){sm("e","Enter the 6-digit code."); return;}
    setBusy(true);
    const r=await verifyOTP(email,otp);
    setBusy(false);
    if(r.ok){setStep("pw");}else{sm("e",r.msg);}
  };

  const doPW=()=>{
    cl();
    if(!pwr.all){sm("e","Please meet all password requirements."); return;}
    if(pw!==pw2){sm("e","Passwords do not match."); return;}
    setStep("uname");
  };

  const doUname=async()=>{
    cl();
    if(!uname||uname.length<3){sm("e","Username must be at least 3 characters."); return;}
    if(uname.length>20){sm("e","Max 20 characters."); return;}
    if(/\s/.test(uname)){sm("e","No spaces allowed."); return;}
    setBusy(true);
    const taken=await sGet("un:"+uname.toLowerCase());
    if(taken&&taken!==email.toLowerCase()){sm("e","Username already taken."); setBusy(false); return;}
    const admins=await sGet("adminList")||[SUPER_ADMIN];
    const isAdmin=admins.map(a=>a.toLowerCase()).includes(email.toLowerCase())||email.toLowerCase()===SUPER_ADMIN;
    const u={email:email.toLowerCase(),username:uname,ph:btoa(pw),joined:new Date().toISOString(),isAdmin,isSuperAdmin:email.toLowerCase()===SUPER_ADMIN,watchedVideos:{},quizHistory:{},profilePic:null};
    await sSet("user:"+email.toLowerCase(),u);
    await sSet("un:"+uname.toLowerCase(),email.toLowerCase());
    await sSet("session",u);
    setBusy(false); onAuth(u); onClose();
  };

  const doLogin=async()=>{
    cl(); if(!loginPw){sm("e","Enter your password."); return;}
    setBusy(true);
    const u=await sGet("user:"+email.toLowerCase());
    if(!u){sm("e","No account found."); setBusy(false); return;}
    if(u.ph!==btoa(loginPw)){sm("e","Incorrect password."); setBusy(false); return;}
    const admins=await sGet("adminList")||[SUPER_ADMIN];
    const isAdmin=admins.map(a=>a.toLowerCase()).includes(u.email)||u.email===SUPER_ADMIN;
    const updated={...u,isAdmin,isSuperAdmin:u.email===SUPER_ADMIN};
    await sSet("user:"+u.email,updated); await sSet("session",updated);
    setBusy(false); onAuth(updated); onClose();
  };

  const resend=async()=>{const c=await genOTP(email); setSentCode(c); sm("ok","New code generated."); setOtp("");};

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",overflowY:"auto"}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div style={{background:C.bgPanel,border:`1px solid ${C.border}`,padding:"34px 30px",width:"100%",maxWidth:"420px",position:"relative",margin:"auto"}}>
        <button onClick={onClose} style={{position:"absolute",top:"11px",right:"11px",background:"none",border:"none",color:C.textDim,cursor:"pointer",fontSize:"17px"}}>✕</button>
        <div style={{marginBottom:"18px"}}><Logo size="sm"/></div>
        {["otp","pw","uname"].includes(step)&&(
          <div style={{display:"flex",gap:"3px",marginBottom:"18px"}}>
            {stepOrder.map((s,i)=><div key={s} style={{flex:1,height:"3px",background:i<=idx?C.teal:"rgba(255,255,255,0.1)",borderRadius:"2px",transition:"background 0.3s"}}/>)}
          </div>
        )}
        <Msg type={msg.t==="ok"?"ok":"err"} text={msg.s}/>

        {step==="email"&&<>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"23px",fontWeight:300,marginBottom:"4px",color:C.text}}>Welcome</h2>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.textDim,marginBottom:"18px"}}>Enter your email to sign in or create an account.</p>
          <input value={email} onChange={e=>{setEmail(e.target.value);cl();}} placeholder="Email address" type="email" style={iS} onKeyDown={e=>e.key==="Enter"&&doEmail()}/>
          <button onClick={doEmail} disabled={busy} style={{...bS,padding:"11px",width:"100%",marginTop:"11px",opacity:busy?0.7:1}}>{busy?"Checking...":"Continue →"}</button>
        </>}

        {step==="otp"&&<>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"23px",fontWeight:300,marginBottom:"4px",color:C.text}}>Verify your email</h2>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.textDim,marginBottom:"4px"}}>Code sent to <strong style={{color:C.tealLight}}>{email}</strong></p>
          <div style={{background:"rgba(14,140,140,0.08)",border:"1px solid rgba(14,140,140,0.28)",padding:"10px 14px",marginBottom:"16px",borderRadius:"2px"}}>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:C.textDim,marginBottom:"3px"}}>Demo mode — code shown here (in production this is emailed):</p>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"24px",fontWeight:700,color:C.tealLight,letterSpacing:"0.25em"}}>{sentCode}</p>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:C.textDim,marginTop:"2px"}}>Valid for 10 minutes</p>
          </div>
          <input value={otp} onChange={e=>{setOtp(e.target.value.replace(/\D/g,"").slice(0,6));cl();}} placeholder="Enter 6-digit code" style={{...iS,letterSpacing:"0.25em",fontSize:"20px",textAlign:"center"}} maxLength={6} onKeyDown={e=>e.key==="Enter"&&doOTP()}/>
          <div style={{display:"flex",gap:"8px",marginTop:"11px"}}>
            <button onClick={()=>{setStep("email");cl();}} style={{...bO,padding:"10px 14px"}}>← Back</button>
            <button onClick={doOTP} disabled={busy} style={{...bS,padding:"10px",flex:1,opacity:busy?0.7:1}}>{busy?"Verifying...":"Verify →"}</button>
          </div>
          <button onClick={resend} style={{background:"none",border:"none",color:C.textDim,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",marginTop:"8px",textDecoration:"underline"}}>Resend code</button>
        </>}

        {step==="pw"&&<>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"23px",fontWeight:300,marginBottom:"4px",color:C.text}}>Create a password</h2>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.textDim,marginBottom:"16px"}}>For <strong style={{color:C.tealLight}}>{email}</strong></p>
          <div style={{position:"relative",marginBottom:"8px"}}>
            <input value={pw} onChange={e=>{setPw(e.target.value);cl();}} placeholder="Choose a strong password" type={showPw?"text":"password"} style={{...iS,paddingRight:"44px"}}/>
            <Eye show={showPw} toggle={()=>setShowPw(!showPw)}/>
          </div>
          {pw.length>0&&<>
            <div style={{display:"flex",gap:"3px",marginBottom:"6px"}}>{[1,2,3,4,5].map(i=><div key={i} style={{flex:1,height:"3px",background:i<=pwr.passed?pwr.col:"rgba(255,255,255,0.1)",borderRadius:"2px",transition:"all 0.3s"}}/>)}</div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:pwr.col,marginBottom:"8px"}}>{pwr.strength}</div>
            <div style={{background:C.bgCard,border:`1px solid ${C.border}`,padding:"10px 12px",marginBottom:"10px"}}>
              {pwr.rules.map(r=><div key={r.id} style={{display:"flex",alignItems:"center",gap:"7px",marginBottom:"4px",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:r.ok?C.success:C.textDim}}><span>{r.ok?"✓":"○"}</span>{r.label}</div>)}
            </div>
          </>}
          <div style={{position:"relative",marginBottom:"10px"}}>
            <input value={pw2} onChange={e=>{setPw2(e.target.value);cl();}} placeholder="Confirm password" type={showPw2?"text":"password"} style={{...iS,paddingRight:"44px"}}/>
            <Eye show={showPw2} toggle={()=>setShowPw2(!showPw2)}/>
          </div>
          {pw2.length>0&&<div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"11px",marginBottom:"8px",color:pw===pw2?C.success:C.danger}}>{pw===pw2?"✓ Passwords match":"✕ Passwords do not match"}</div>}
          <div style={{display:"flex",gap:"8px"}}>
            <button onClick={()=>{setStep("otp");cl();}} style={{...bO,padding:"10px 14px"}}>← Back</button>
            <button onClick={doPW} style={{...bS,padding:"10px",flex:1}}>Continue →</button>
          </div>
        </>}

        {step==="uname"&&<>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"23px",fontWeight:300,marginBottom:"4px",color:C.text}}>Choose a username</h2>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.textDim,marginBottom:"16px"}}>Shown on leaderboard and profile. No spaces. Must be unique.</p>
          <input value={uname} onChange={e=>{setUname(e.target.value.replace(/\s/g,""));cl();}} placeholder="Username (3–20 chars)" style={iS} maxLength={20} onKeyDown={e=>e.key==="Enter"&&doUname()}/>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:C.textDim,margin:"5px 0 11px"}}>{uname.length}/20 characters</div>
          <div style={{display:"flex",gap:"8px"}}>
            <button onClick={()=>{setStep("pw");cl();}} style={{...bO,padding:"10px 14px"}}>← Back</button>
            <button onClick={doUname} disabled={busy} style={{...bS,padding:"10px",flex:1,opacity:busy?0.7:1}}>{busy?"Creating account...":"Create Account →"}</button>
          </div>
        </>}

        {step==="login"&&<>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"23px",fontWeight:300,marginBottom:"4px",color:C.text}}>Welcome back</h2>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.textDim,marginBottom:"16px"}}>Signing in as <strong style={{color:C.tealLight}}>{email}</strong></p>
          <div style={{position:"relative",marginBottom:"11px"}}>
            <input value={loginPw} onChange={e=>{setLoginPw(e.target.value);cl();}} placeholder="Your password" type={showL?"text":"password"} style={{...iS,paddingRight:"44px"}} onKeyDown={e=>e.key==="Enter"&&doLogin()}/>
            <Eye show={showL} toggle={()=>setShowL(!showL)}/>
          </div>
          <div style={{display:"flex",gap:"8px"}}>
            <button onClick={()=>{setStep("email");cl();setLoginPw("");}} style={{...bO,padding:"10px 14px"}}>← Back</button>
            <button onClick={doLogin} disabled={busy} style={{...bS,padding:"10px",flex:1,opacity:busy?0.7:1}}>{busy?"Signing in...":"Sign In →"}</button>
          </div>
        </>}
      </div>
    </div>
  );
}

// PROFILE MODAL
function ProfileModal({user,onClose,onUpdate}){
  const[tab,setTab]=useState("overview");
  const[uname,setUname]=useState(user.username);
  const[cPw,setCPw]=useState(""), [nPw,setNPw]=useState(""), [nPw2,setNPw2]=useState("");
  const[sC,setSC]=useState(false), [sN,setSN]=useState(false), [sN2,setSN2]=useState(false);
  const[msg,setMsg]=useState({t:"",s:""}), [busy,setBusy]=useState(false);
  const picRef=useRef(null);
  const pwr=checkPW(nPw);
  const sm=(t,s)=>setMsg({t,s}), cl=()=>setMsg({t:"",s:""});

  const saveUname=async()=>{
    cl(); if(uname.trim()===user.username){sm("ok","Username unchanged."); return;}
    if(uname.length<3||uname.length>20){sm("e","3–20 characters required."); return;}
    if(/\s/.test(uname)){sm("e","No spaces allowed."); return;}
    setBusy(true);
    const taken=await sGet("un:"+uname.toLowerCase());
    if(taken&&taken!==user.email){sm("e","Username already taken."); setBusy(false); return;}
    await sDel("un:"+user.username.toLowerCase());
    const u={...user,username:uname.trim()};
    await sSet("user:"+user.email,u); await sSet("un:"+uname.toLowerCase(),user.email); await sSet("session",u);
    setBusy(false); sm("ok","Username updated."); onUpdate(u);
  };

  const savePw=async()=>{
    cl(); if(user.ph!==btoa(cPw)){sm("e","Current password incorrect."); return;}
    if(!pwr.all){sm("e","New password does not meet requirements."); return;}
    if(nPw!==nPw2){sm("e","Passwords do not match."); return;}
    setBusy(true);
    const u={...user,ph:btoa(nPw)};
    await sSet("user:"+user.email,u); await sSet("session",u);
    setBusy(false); setCPw(""); setNPw(""); setNPw2(""); sm("ok","Password updated."); onUpdate(u);
  };

  const uploadPic=(e)=>{
    const f=e.target.files[0]; if(!f)return;
    if(!f.type.startsWith("image/")){sm("e","Select an image file."); return;}
    if(f.size>2*1024*1024){sm("e","Image must be under 2MB."); return;}
    const r=new FileReader();
    r.onload=async ev=>{const u={...user,profilePic:ev.target.result}; await sSet("user:"+user.email,u); await sSet("session",u); sm("ok","Profile picture updated."); onUpdate(u);};
    r.readAsDataURL(f);
  };

  const hist=Object.entries(user.quizHistory||{}).flatMap(([sp,arr])=>arr.map(s=>({...s,specialty:sp})));
  const wv=user.watchedVideos||{};

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",overflowY:"auto"}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div style={{background:C.bgPanel,border:`1px solid ${C.border}`,padding:"32px 28px",width:"100%",maxWidth:"560px",position:"relative",margin:"auto"}}>
        <button onClick={onClose} style={{position:"absolute",top:"11px",right:"11px",background:"none",border:"none",color:C.textDim,cursor:"pointer",fontSize:"17px"}}>✕</button>
        <Msg type={msg.t==="ok"?"ok":"err"} text={msg.s}/>
        <div style={{display:"flex",alignItems:"center",gap:"14px",marginBottom:"20px"}}>
          <div style={{position:"relative"}}>
            <div style={{width:"58px",height:"58px",borderRadius:"50%",overflow:"hidden",border:`2px solid ${C.teal}`,background:"linear-gradient(135deg,#0e8c8c,#1a2744)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}} onClick={()=>picRef.current?.click()}>
              {user.profilePic?<img src={user.profilePic} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"20px",fontWeight:700,color:"#fff"}}>{user.username[0].toUpperCase()}</span>}
            </div>
            <div style={{position:"absolute",bottom:0,right:0,width:"18px",height:"18px",background:C.teal,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"10px",color:"#fff"}} onClick={()=>picRef.current?.click()}>✎</div>
            <input ref={picRef} type="file" accept="image/*" style={{display:"none"}} onChange={uploadPic}/>
          </div>
          <div>
            <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"21px",fontWeight:300,color:C.text,marginBottom:"2px"}}>{user.username}</h3>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:C.textDim}}>{user.email}</div>
            {user.isAdmin&&<span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.1em",textTransform:"uppercase",background:"rgba(201,169,110,0.14)",border:"1px solid rgba(201,169,110,0.3)",color:C.gold,padding:"2px 7px",marginTop:"4px",display:"inline-block"}}>{user.isSuperAdmin?"Super Admin":"Admin"}</span>}
          </div>
        </div>
        <div style={{display:"flex",borderBottom:`1px solid ${C.border}`,marginBottom:"18px"}}>
          {["overview","username","password"].map(t=>(
            <button key={t} onClick={()=>{setTab(t);cl();}} style={{padding:"9px 16px",background:"transparent",border:"none",borderBottom:tab===t?`2px solid ${C.teal}`:"2px solid transparent",color:tab===t?C.tealLight:C.textDim,fontFamily:"'DM Sans',sans-serif",fontSize:"10px",letterSpacing:"0.1em",textTransform:"uppercase",cursor:"pointer",transition:"all 0.2s",marginBottom:"-1px"}}>{t}</button>
          ))}
        </div>

        {tab==="overview"&&<>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginBottom:"14px"}}>
            {[["Joined",new Date(user.joined).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})],["Quizzes Taken",hist.length],["Videos Started",Object.keys(wv).length],["Completed",Object.values(wv).filter(v=>v>=98).length]].map(([k,v])=>(
              <div key={k} style={{background:C.bgCard,border:`1px solid ${C.border}`,padding:"12px 14px"}}>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.15em",textTransform:"uppercase",color:C.textDim,marginBottom:"3px"}}>{k}</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"22px",fontWeight:300,color:C.tealLight}}>{v}</div>
              </div>
            ))}
          </div>
          {hist.length>0&&<>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",letterSpacing:"0.13em",textTransform:"uppercase",color:C.textDim,marginBottom:"7px"}}>Recent Quiz Results</div>
            <div style={{display:"flex",flexDirection:"column",gap:"5px",maxHeight:"180px",overflowY:"auto"}}>
              {[...hist].reverse().slice(0,10).map((s,i)=>{const col=TC[s.specialty]||C.teal; return(
                <div key={i} style={{background:C.bgCard,border:`1px solid ${C.border}`,padding:"8px 12px",display:"flex",alignItems:"center",gap:"9px"}}>
                  <div style={{width:"5px",height:"5px",background:col,borderRadius:"50%",flexShrink:0}}/>
                  <div style={{flex:1,fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:C.text}}>{s.specialty}</div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"17px",color:col,fontWeight:300}}>{s.score}/{s.total}</div>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:C.textDim,minWidth:"30px"}}>{s.pct}%</div>
                </div>
              );})}
            </div>
          </>}
          {Object.keys(wv).length>0&&<>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",letterSpacing:"0.13em",textTransform:"uppercase",color:C.textDim,margin:"13px 0 7px"}}>Video Progress</div>
            <div style={{display:"flex",flexDirection:"column",gap:"4px",maxHeight:"140px",overflowY:"auto"}}>
              {Object.entries(wv).map(([vid,pct])=>{
                const found=SV.find(v=>v.id===vid); const title=found?found.title:vid;
                return(<div key={vid} style={{background:C.bgCard,border:`1px solid ${C.border}`,padding:"7px 12px",display:"flex",alignItems:"center",gap:"9px"}}>
                  <div style={{flex:1,fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{title}</div>
                  <div style={{width:"70px",height:"3px",background:"rgba(255,255,255,0.08)",borderRadius:"2px",flexShrink:0}}><div style={{width:`${pct}%`,height:"100%",background:C.teal,borderRadius:"2px"}}/></div>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",color:pct>=98?C.success:C.textDim,minWidth:"27px"}}>{pct>=98?"✓":pct+"%"}</div>
                </div>);
              })}
            </div>
          </>}
        </>}

        {tab==="username"&&<>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.textDim,marginBottom:"13px"}}>Current: <strong style={{color:C.tealLight}}>{user.username}</strong></p>
          <input value={uname} onChange={e=>{setUname(e.target.value.replace(/\s/g,""));cl();}} placeholder="New username" style={iS} maxLength={20}/>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:C.textDim,margin:"5px 0 11px"}}>{uname.length}/20 · No spaces</div>
          <button onClick={saveUname} disabled={busy} style={{...bS,padding:"10px 22px",opacity:busy?0.7:1}}>{busy?"Saving...":"Save Username"}</button>
        </>}

        {tab==="password"&&<>
          <div style={{position:"relative",marginBottom:"10px"}}>
            <input value={cPw} onChange={e=>{setCPw(e.target.value);cl();}} placeholder="Current password" type={sC?"text":"password"} style={{...iS,paddingRight:"44px"}}/>
            <Eye show={sC} toggle={()=>setSC(!sC)}/>
          </div>
          <div style={{position:"relative",marginBottom:"7px"}}>
            <input value={nPw} onChange={e=>{setNPw(e.target.value);cl();}} placeholder="New password" type={sN?"text":"password"} style={{...iS,paddingRight:"44px"}}/>
            <Eye show={sN} toggle={()=>setSN(!sN)}/>
          </div>
          {nPw.length>0&&<>
            <div style={{display:"flex",gap:"3px",marginBottom:"5px"}}>{[1,2,3,4,5].map(i=><div key={i} style={{flex:1,height:"3px",background:i<=pwr.passed?pwr.col:"rgba(255,255,255,0.1)",borderRadius:"2px"}}/>)}</div>
            <div style={{background:C.bgCard,border:`1px solid ${C.border}`,padding:"9px 11px",marginBottom:"9px"}}>
              {pwr.rules.map(r=><div key={r.id} style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"3px",fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:r.ok?C.success:C.textDim}}><span>{r.ok?"✓":"○"}</span>{r.label}</div>)}
            </div>
          </>}
          <div style={{position:"relative",marginBottom:"10px"}}>
            <input value={nPw2} onChange={e=>{setNPw2(e.target.value);cl();}} placeholder="Confirm new password" type={sN2?"text":"password"} style={{...iS,paddingRight:"44px"}}/>
            <Eye show={sN2} toggle={()=>setSN2(!sN2)}/>
          </div>
          {nPw2.length>0&&<div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"11px",marginBottom:"8px",color:nPw===nPw2?C.success:C.danger}}>{nPw===nPw2?"✓ Match":"✕ No match"}</div>}
          <button onClick={savePw} disabled={busy} style={{...bS,padding:"10px 22px",opacity:busy?0.7:1}}>{busy?"Saving...":"Update Password"}</button>
        </>}
      </div>
    </div>
  );
}

// ADMIN PANEL
function AdminPanel({user,onClose,onSiteUpdate}){
  const[tab,setTab]=useState("videos");
  const[msg,setMsg]=useState({t:"",s:""});
  const sm=(t,s)=>{setMsg({t,s});setTimeout(()=>setMsg({t:"",s:""}),4500);};
  const[videos,setVideos]=useState([]);
  const[services,setServices]=useState(DS);
  const[admins,setAdmins]=useState([SUPER_ADMIN]);
  const[hero,setHero]=useState({title:"General Medical Practice",subtitle:"Care. Innovation. Trust.",desc:"A registered UK medical practice based in Blackburn."});
  const[qSpec,setQSpec]=useState(SPECIALTIES[0]);
  const[customQs,setCustomQs]=useState([]);
  const[loading,setLoading]=useState(true);
  const[vTitle,setVTitle]=useState(""), [vTopic,setVTopic]=useState("Cardiology");
  const[vCh,setVCh]=useState(""), [vType,setVType]=useState("youtube");
  const[vYT,setVYT]=useState(""), [vFile,setVFile]=useState(null), [vURL,setVURL]=useState("");
  const[editVid,setEditVid]=useState(null);
  const vRef=useRef(null);
  const[editSvc,setEditSvc]=useState(null);
  const[newAdmin,setNewAdmin]=useState("");
  const[editQIdx,setEditQIdx]=useState(null);
  const[qForm,setQForm]=useState({q:"",o:["","","",""],a:0,exp:""});

  useEffect(()=>{load();},[]);
  useEffect(()=>{loadQs();},[qSpec]);

  const load=async()=>{
    setLoading(true);
    const v=await sGet("customVideos")||[];
    const s=await sGet("customServices")||DS;
    const a=await sGet("adminList")||[SUPER_ADMIN];
    const h=await sGet("heroText")||hero;
    setVideos(v); setServices(s); setAdmins(a); setHero(h); setLoading(false);
  };
  const loadQs=async()=>{setCustomQs(await sGet("cq:"+qSpec)||[]);};

  const saveVid=async()=>{
    if(!vTitle.trim()){sm("e","Title required."); return;}
    if(vType==="youtube"&&!vYT.trim()){sm("e","YouTube URL or ID required."); return;}
    if(vType==="upload"&&!vURL){sm("e","Please upload a file first."); return;}
    let yt=vYT.trim(); if(vType==="youtube"){const m=yt.match(/(?:v=|youtu\.be\/)([^&\s]+)/); if(m)yt=m[1];}
    const nv={id:editVid?editVid.id:"cv_"+Date.now(),title:vTitle.trim(),topic:vTopic,channel:vCh.trim()||"Emrzase Hope",type:vType,ytId:vType==="youtube"?yt:null,fileURL:vType==="upload"?vURL:null,addedBy:user.username,addedAt:new Date().toISOString()};
    const upd=editVid?videos.map(v=>v.id===editVid.id?nv:v):[...videos,nv];
    await sSet("customVideos",upd); setVideos(upd);
    setVTitle(""); setVCh(""); setVYT(""); setVFile(null); setVURL(""); setEditVid(null); setVTopic("Cardiology"); setVType("youtube");
    sm("ok",editVid?"Video updated.":"Video added."); onSiteUpdate();
  };
  const loadVidEdit=v=>{setEditVid(v); setVTitle(v.title); setVTopic(v.topic); setVCh(v.channel); setVType(v.type); setVYT(v.ytId||""); setVURL(v.fileURL||"");};
  const delVid=async id=>{const u=videos.filter(v=>v.id!==id); await sSet("customVideos",u); setVideos(u); sm("ok","Video removed."); onSiteUpdate();};
  const handleFile=e=>{
    const f=e.target.files[0]; if(!f)return;
    if(!f.type.startsWith("video/")){sm("e","Select a video file."); return;}
    if(f.size>5*1024*1024){sm("e","Max 5MB. Use YouTube for larger videos."); return;}
    const r=new FileReader(); r.onload=ev=>{setVFile(f); setVURL(ev.target.result); sm("ok",f.name+" ready.");}; r.readAsDataURL(f);
  };

  const saveSvc=async()=>{
    if(!editSvc?.title.trim()){sm("e","Title required."); return;}
    const u=services.map(s=>s.id===editSvc.id?editSvc:s);
    await sSet("customServices",u); setServices(u); setEditSvc(null); sm("ok","Service saved."); onSiteUpdate();
  };

  const saveHero=async()=>{await sSet("heroText",hero); sm("ok","Hero text saved."); onSiteUpdate();};

  const addAdmin=async()=>{
    const em=newAdmin.trim().toLowerCase();
    if(!em||!/\S+@\S+\.\S+/.test(em)){sm("e","Valid email required."); return;}
    if(admins.map(a=>a.toLowerCase()).includes(em)){sm("e","Already an admin."); return;}
    const u=[...admins,em]; await sSet("adminList",u); setAdmins(u);
    const usr=await sGet("user:"+em); if(usr)await sSet("user:"+em,{...usr,isAdmin:true});
    setNewAdmin(""); sm("ok",em+" granted admin access.");
  };
  const delAdmin=async em=>{
    if(em.toLowerCase()===SUPER_ADMIN){sm("e","Super admin cannot be removed."); return;}
    const u=admins.filter(a=>a.toLowerCase()!==em.toLowerCase()); await sSet("adminList",u); setAdmins(u);
    const usr=await sGet("user:"+em.toLowerCase()); if(usr)await sSet("user:"+em.toLowerCase(),{...usr,isAdmin:false});
    sm("ok",em+" removed.");
  };

  const saveQ=async()=>{
    if(!qForm.q.trim()||qForm.o.some(o=>!o.trim())||!qForm.exp.trim()){sm("e","All fields required."); return;}
    const existing=await sGet("cq:"+qSpec)||[];
    const upd=editQIdx!==null?existing.map((q,i)=>i===editQIdx?{...qForm}:q):[...existing,{...qForm}];
    await sSet("cq:"+qSpec,upd); setCustomQs(upd);
    setEditQIdx(null); setQForm({q:"",o:["","","",""],a:0,exp:""}); sm("ok","Question saved.");
  };
  const delQ=async idx=>{
    const existing=await sGet("cq:"+qSpec)||[];
    await sSet("cq:"+qSpec,existing.filter((_,i)=>i!==idx)); setCustomQs(existing.filter((_,i)=>i!==idx)); sm("ok","Removed.");
  };

  const topics=Object.keys(TC);
  const allQs=[...(QUESTION_BANK[qSpec]||[]),...customQs];

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.95)",zIndex:998,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <div style={{background:C.bgDeep,borderBottom:`1px solid ${C.border}`,padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:"11px"}}>
          <Logo size="sm"/>
          <div style={{width:"1px",height:"22px",background:C.border}}/>
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",color:C.text}}>Admin Panel</span>
          {user.isSuperAdmin&&<span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.1em",textTransform:"uppercase",background:"rgba(201,169,110,0.14)",border:"1px solid rgba(201,169,110,0.28)",color:C.gold,padding:"2px 7px"}}>Super Admin</span>}
        </div>
        <button onClick={onClose} style={{...bO,padding:"6px 14px",fontSize:"10px"}}>← Back to Site</button>
      </div>
      <div style={{display:"flex",flex:1,overflow:"hidden"}}>
        <div style={{width:"168px",background:C.bgCard,borderRight:`1px solid ${C.border}`,flexShrink:0,overflowY:"auto"}}>
          {[{id:"videos",icon:"📹",label:"Videos"},{id:"services",icon:"⚕️",label:"Services"},{id:"hero",icon:"🏠",label:"Hero Text"},{id:"questions",icon:"🧠",label:"Questions"},...(user.isSuperAdmin?[{id:"admins",icon:"👑",label:"Admins"}]:[])].map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"13px 14px",background:tab===t.id?C.bgPanel:"transparent",border:"none",borderLeft:tab===t.id?`3px solid ${C.teal}`:"3px solid transparent",color:tab===t.id?C.tealLight:C.textMid,fontFamily:"'DM Sans',sans-serif",fontSize:"12px",cursor:"pointer",textAlign:"left",transition:"all 0.2s",display:"flex",alignItems:"center",gap:"8px",width:"100%"}}>
              <span>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"20px"}}>
          <Msg type={msg.t==="ok"?"ok":"err"} text={msg.s}/>

          {tab==="videos"&&<>
            <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"19px",fontWeight:300,color:C.text,marginBottom:"14px"}}>{editVid?"Edit Video":"Add Video"}</h3>
            <div style={{background:C.bgCard,border:`1px solid ${C.border}`,padding:"16px",marginBottom:"18px"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginBottom:"8px"}}>
                <input value={vTitle} onChange={e=>setVTitle(e.target.value)} placeholder="Title *" style={iS}/>
                <input value={vCh} onChange={e=>setVCh(e.target.value)} placeholder="Channel" style={iS}/>
                <select value={vTopic} onChange={e=>setVTopic(e.target.value)} style={{...iS,cursor:"pointer"}}>{topics.map(t=><option key={t} value={t} style={{background:C.bgPanel}}>{t}</option>)}</select>
                <select value={vType} onChange={e=>{setVType(e.target.value);setVFile(null);setVURL("");setVYT("");}} style={{...iS,cursor:"pointer"}}>
                  <option value="youtube" style={{background:C.bgPanel}}>YouTube URL/ID</option>
                  <option value="upload" style={{background:C.bgPanel}}>Upload file</option>
                </select>
              </div>
              {vType==="youtube"?
                <input value={vYT} onChange={e=>setVYT(e.target.value)} placeholder="YouTube URL or video ID" style={{...iS,marginBottom:"8px"}}/>
              :<div style={{border:"2px dashed rgba(14,140,140,0.3)",padding:"14px",textAlign:"center",cursor:"pointer",marginBottom:"8px",background:vURL?"rgba(14,140,140,0.07)":"transparent"}} onClick={()=>vRef.current?.click()}>
                {vFile?<div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.success}}>✓ {vFile.name} <span style={{color:C.textDim}}>· Click to change</span></div>
                :<div><div style={{fontSize:"22px",marginBottom:"5px"}}>📹</div><p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.textDim}}>Click to upload · MP4/WebM · Max 5MB</p></div>}
                <input ref={vRef} type="file" accept="video/*" style={{display:"none"}} onChange={handleFile}/>
              </div>}
              <div style={{display:"flex",gap:"7px"}}>
                <button onClick={saveVid} style={{...bS,padding:"9px 18px"}}>{editVid?"Update":"Add Video"}</button>
                {editVid&&<button onClick={()=>{setEditVid(null);setVTitle("");setVCh("");setVYT("");setVFile(null);setVURL("");}} style={{...bO,padding:"9px 13px"}}>Cancel</button>}
              </div>
            </div>
            <h4 style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",letterSpacing:"0.12em",textTransform:"uppercase",color:C.textDim,marginBottom:"9px"}}>Custom Videos ({videos.length})</h4>
            {videos.length===0?<div style={{background:C.bgCard,border:`1px solid ${C.border}`,padding:"16px",textAlign:"center"}}><p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.textDim}}>No custom videos yet.</p></div>
            :<div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
              {videos.map(v=>{const col=TC[v.topic]||C.teal; return(
                <div key={v.id} style={{background:C.bgCard,border:`1px solid ${C.border}`,padding:"10px 13px",display:"flex",alignItems:"center",gap:"10px"}}>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{v.title}</div>
                    <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:C.textDim,marginTop:"1px"}}><span style={{color:col}}>{v.topic}</span> · {v.channel} · {v.type==="upload"?"Uploaded":"YouTube"}</div>
                  </div>
                  <button onClick={()=>loadVidEdit(v)} style={{...bO,padding:"5px 9px",fontSize:"9px"}}>Edit</button>
                  <button onClick={()=>delVid(v.id)} style={{...bD,padding:"5px 9px",fontSize:"9px",letterSpacing:"0.08em",textTransform:"uppercase"}}>Remove</button>
                </div>
              );})}
            </div>}
          </>}

          {tab==="services"&&<>
            <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"19px",fontWeight:300,color:C.text,marginBottom:"14px"}}>Edit Services</h3>
            {services.map(s=>(
              <div key={s.id} style={{background:C.bgCard,border:`1px solid ${editSvc?.id===s.id?C.teal:C.border}`,padding:"13px",marginBottom:"8px"}}>
                {editSvc?.id===s.id?(
                  <div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"7px",marginBottom:"7px"}}>
                      <input value={editSvc.title} onChange={e=>setEditSvc({...editSvc,title:e.target.value})} placeholder="Title" style={iS}/>
                      <input value={editSvc.tag} onChange={e=>setEditSvc({...editSvc,tag:e.target.value})} placeholder="Tag" style={iS}/>
                    </div>
                    <textarea value={editSvc.desc} onChange={e=>setEditSvc({...editSvc,desc:e.target.value})} rows={3} style={{...iS,resize:"vertical",marginBottom:"7px"}}/>
                    <input value={editSvc.img} onChange={e=>setEditSvc({...editSvc,img:e.target.value})} placeholder="Image URL" style={{...iS,marginBottom:"7px"}}/>
                    <div style={{display:"flex",gap:"7px"}}>
                      <button onClick={saveSvc} style={{...bS,padding:"8px 15px"}}>Save</button>
                      <button onClick={()=>setEditSvc(null)} style={{...bO,padding:"8px 12px"}}>Cancel</button>
                    </div>
                  </div>
                ):(
                  <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                    <div style={{flex:1}}>
                      <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",color:C.text,fontWeight:500}}>{s.title}</div>
                      <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:C.textDim,marginTop:"2px"}}>{s.desc.slice(0,65)}...</div>
                    </div>
                    <button onClick={()=>setEditSvc({...s})} style={{...bO,padding:"6px 11px",fontSize:"9px"}}>Edit</button>
                  </div>
                )}
              </div>
            ))}
          </>}

          {tab==="hero"&&<>
            <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"19px",fontWeight:300,color:C.text,marginBottom:"14px"}}>Edit Hero Section</h3>
            <div style={{background:C.bgCard,border:`1px solid ${C.border}`,padding:"16px"}}>
              <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                {[["Main Title","title"],["Italic Subtitle","subtitle"],["Description","desc"]].map(([lbl,key])=>(
                  <div key={key}>
                    <label style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.14em",textTransform:"uppercase",color:C.textDim,display:"block",marginBottom:"4px"}}>{lbl}</label>
                    {key==="desc"?<textarea value={hero[key]} onChange={e=>setHero({...hero,[key]:e.target.value})} rows={3} style={{...iS,resize:"vertical"}}/>:<input value={hero[key]} onChange={e=>setHero({...hero,[key]:e.target.value})} style={iS}/>}
                  </div>
                ))}
                <button onClick={saveHero} style={{...bS,padding:"10px 20px",alignSelf:"flex-start"}}>Save Hero Text</button>
              </div>
            </div>
          </>}

          {tab==="questions"&&<>
            <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"19px",fontWeight:300,color:C.text,marginBottom:"10px"}}>Question Bank</h3>
            <div style={{display:"flex",flexWrap:"wrap",gap:"5px",marginBottom:"14px"}}>
              {SPECIALTIES.map(s=>{const on=qSpec===s; return(<button key={s} onClick={()=>setQSpec(s)} style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.09em",textTransform:"uppercase",padding:"4px 9px",border:`1px solid ${on?C.teal:"rgba(255,255,255,0.09)"}`,background:on?"rgba(14,140,140,0.14)":"transparent",color:on?C.tealLight:C.textDim,cursor:"pointer",transition:"all 0.2s"}}>{s}</button>);})}
            </div>
            <div style={{background:C.bgCard,border:`1px solid ${editQIdx!==null?C.teal:C.border}`,padding:"15px",marginBottom:"14px"}}>
              <h4 style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",letterSpacing:"0.12em",textTransform:"uppercase",color:editQIdx!==null?C.tealLight:C.textDim,marginBottom:"10px"}}>{editQIdx!==null?"Editing Question":"Add New Question"} — {qSpec}</h4>
              <textarea value={qForm.q} onChange={e=>setQForm({...qForm,q:e.target.value})} placeholder="Question text *" rows={3} style={{...iS,resize:"vertical",marginBottom:"7px"}}/>
              {qForm.o.map((opt,i)=>(
                <div key={i} style={{display:"flex",gap:"7px",marginBottom:"5px",alignItems:"center"}}>
                  <div style={{width:"21px",height:"21px",background:qForm.a===i?C.teal:"rgba(255,255,255,0.05)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,fontSize:"10px",fontWeight:700,color:qForm.a===i?"#fff":C.textDim,border:`1px solid ${qForm.a===i?C.teal:C.border}`,transition:"all 0.2s"}} onClick={()=>setQForm({...qForm,a:i})}>{String.fromCharCode(65+i)}</div>
                  <input value={opt} onChange={e=>{const o=[...qForm.o]; o[i]=e.target.value; setQForm({...qForm,o});}} placeholder={`Option ${String.fromCharCode(65+i)}${qForm.a===i?" ← correct":""}`} style={{...iS,borderColor:qForm.a===i?C.teal:"rgba(14,140,140,0.22)"}}/>
                </div>
              ))}
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:C.textDim,marginBottom:"7px"}}>Click a letter to set the correct answer</p>
              <textarea value={qForm.exp} onChange={e=>setQForm({...qForm,exp:e.target.value})} placeholder="Clinical explanation *" rows={3} style={{...iS,resize:"vertical",marginBottom:"8px"}}/>
              <div style={{display:"flex",gap:"7px"}}>
                <button onClick={saveQ} style={{...bS,padding:"8px 16px"}}>{editQIdx!==null?"Update":"Add Question"}</button>
                {editQIdx!==null&&<button onClick={()=>{setEditQIdx(null);setQForm({q:"",o:["","","",""],a:0,exp:""}); }} style={{...bO,padding:"8px 12px"}}>Cancel</button>}
              </div>
            </div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",letterSpacing:"0.1em",textTransform:"uppercase",color:C.textDim,marginBottom:"8px"}}>{qSpec}: {(QUESTION_BANK[qSpec]||[]).length} built-in + {customQs.length} added = {allQs.length} total</div>
            <div style={{display:"flex",flexDirection:"column",gap:"5px",maxHeight:"380px",overflowY:"auto"}}>
              {allQs.map((q,i)=>{
                const isCustom=i>=(QUESTION_BANK[qSpec]||[]).length;
                const cIdx=isCustom?i-(QUESTION_BANK[qSpec]||[]).length:-1;
                return(
                  <div key={i} style={{background:isCustom?"rgba(14,140,140,0.06)":C.bgPanel,border:`1px solid ${isCustom?C.teal+"28":C.border}`,padding:"9px 12px",display:"flex",gap:"9px",alignItems:"flex-start"}}>
                    <div style={{flex:1,fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:C.textMid,lineHeight:1.5}}>{q.q.slice(0,100)}{q.q.length>100?"...":""}</div>
                    <div style={{display:"flex",gap:"4px",flexShrink:0}}>
                      {isCustom?<>
                        <button onClick={()=>{setEditQIdx(cIdx);setQForm({q:q.q,o:[...q.o],a:q.a,exp:q.exp});}} style={{...bO,padding:"4px 8px",fontSize:"9px"}}>Edit</button>
                        <button onClick={()=>delQ(cIdx)} style={{...bD,padding:"4px 8px",fontSize:"9px",letterSpacing:"0.06em",textTransform:"uppercase"}}>Del</button>
                      </>:<span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",color:C.textDim,padding:"4px 6px"}}>Built-in</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </>}

          {tab==="admins"&&user.isSuperAdmin&&<>
            <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"19px",fontWeight:300,color:C.text,marginBottom:"14px"}}>Manage Admins</h3>
            <div style={{background:C.bgCard,border:`1px solid ${C.border}`,padding:"15px",marginBottom:"15px"}}>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.textDim,marginBottom:"10px",lineHeight:1.65}}>Enter an email to grant admin access. They receive admin privileges automatically when they register or sign in.</p>
              <div style={{display:"flex",gap:"7px"}}>
                <input value={newAdmin} onChange={e=>setNewAdmin(e.target.value)} placeholder="Email address" type="email" style={{...iS,flex:1}} onKeyDown={e=>e.key==="Enter"&&addAdmin()}/>
                <button onClick={addAdmin} style={{...bS,padding:"9px 15px"}}>Grant</button>
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
              {admins.map(em=>{const isS=em.toLowerCase()===SUPER_ADMIN; return(
                <div key={em} style={{background:C.bgCard,border:`1px solid ${isS?"rgba(201,169,110,0.28)":C.border}`,padding:"11px 14px",display:"flex",alignItems:"center",gap:"10px"}}>
                  <div style={{width:"28px",height:"28px",background:isS?"rgba(201,169,110,0.1)":"rgba(14,140,140,0.1)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:700,color:isS?C.gold:C.tealLight,flexShrink:0}}>{em[0].toUpperCase()}</div>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.text}}>{em}</div>
                    <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",color:isS?C.gold:C.textDim,marginTop:"1px"}}>{isS?"Super Admin — cannot be removed":"Admin"}</div>
                  </div>
                  {!isS&&<button onClick={()=>delAdmin(em)} style={{...bD,padding:"5px 9px",fontSize:"9px",letterSpacing:"0.06em",textTransform:"uppercase"}}>Remove</button>}
                </div>
              );})}
            </div>
          </>}
        </div>
      </div>
    </div>
  );
}

// QUIZ
function Quiz({user,onScore}){
  const[spec,setSpec]=useState(null);const[qs,setQs]=useState([]);const[qi,setQi]=useState(0);
  const[sel,setSel]=useState(null);const[score,setScore]=useState(0);const[done,setDone]=useState(false);
  const[showExp,setShowExp]=useState(false);const[posted,setPosted]=useState(false);const[pMsg,setPMsg]=useState("");
  const[used,setUsed]=useState({});

  const start=useCallback(async s=>{
    const base=QUESTION_BANK[s]||[];
    const custom=await sGet("cq:"+s)||[];
    const pool=[...base,...custom];
    const u=used[s]||[];
    let avail=pool.map((_,i)=>i).filter(i=>!u.includes(i));
    if(avail.length<10){avail=pool.map((_,i)=>i); setUsed(p=>({...p,[s]:[]}))}
    const chosen=[...avail].sort(()=>Math.random()-0.5).slice(0,10);
    setUsed(p=>({...p,[s]:[...(p[s]||[]),...chosen]}));
    setQs(chosen.map(i=>pool[i]));
    setSpec(s);setQi(0);setSel(null);setScore(0);setDone(false);setShowExp(false);setPosted(false);setPMsg("");
  },[used]);

  const answer=i=>{if(sel!==null)return; setSel(i); setShowExp(true); if(i===qs[qi].a)setScore(sc=>sc+1);};
  const next=()=>{if(qi+1>=qs.length){setDone(true);return;} setQi(n=>n+1); setSel(null); setShowExp(false);};
  const post=async anon=>{
    const name=anon?"Anonymous":(user?.username||"Anonymous");
    const entry={username:name,score,total:qs.length,pct:Math.round((score/qs.length)*100),date:new Date().toISOString(),specialty:spec};
    await onScore(spec,entry); setPosted(true);
    setPMsg(anon?"Your score has been posted anonymously. No identifying information has been saved — your privacy is fully protected.":`Your score has been posted as "${user?.username}" on the ${spec} leaderboard. Well done!`);
  };
  const ac=spec?(TC[spec]||C.teal):C.teal;

  if(!spec)return(
    <div>
      <p style={{fontFamily:"'DM Sans',sans-serif",color:C.textMid,marginBottom:"16px",fontSize:"12px",lineHeight:1.8}}>Choose a specialty. Each session draws 10 randomly selected specialist-level questions. Questions rotate through the full pool so you never repeat one until every question has been answered.</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:"7px"}}>
        {SPECIALTIES.map(s=>{const col=TC[s]||C.teal;const p=(QUESTION_BANK[s]||[]).length;const a=(used[s]||[]).length; return(
          <button key={s} onClick={()=>start(s)} style={{background:C.bgPanel,border:`1px solid ${col}22`,padding:"14px 12px",cursor:"pointer",textAlign:"left",transition:"all 0.2s",color:C.text,display:"flex",flexDirection:"column",gap:"6px"}}
            onMouseEnter={e=>{e.currentTarget.style.background=`${col}0e`;e.currentTarget.style.borderColor=`${col}4f`;}}
            onMouseLeave={e=>{e.currentTarget.style.background=C.bgPanel;e.currentTarget.style.borderColor=`${col}22`;}}>
            <div style={{width:"6px",height:"6px",background:col,borderRadius:"50%"}}/>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"14px",fontWeight:400,lineHeight:1.2}}>{s}</div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",color:C.textDim}}>{p} questions{a>0&&<span style={{color:col}}> · {a} done</span>}</div>
          </button>
        );})}
      </div>
    </div>
  );

  if(done){
    const pct=Math.round((score/qs.length)*100);
    const msg=pct>=90?"Outstanding — exceptional clinical knowledge":pct>=70?"Strong performance — review explanations":pct>=50?"Good effort — focus on missed areas":"Keep studying — every session builds knowledge";
    return(
      <div style={{textAlign:"center",padding:"20px 0"}}>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(44px,10vw,66px)",fontWeight:300,color:ac,lineHeight:1}}>{score}/{qs.length}</div>
        <div style={{width:"100%",height:"3px",background:"rgba(255,255,255,0.07)",margin:"12px 0",borderRadius:"2px"}}><div style={{width:`${pct}%`,height:"100%",background:ac,borderRadius:"2px",transition:"width 1.2s ease"}}/></div>
        <p style={{fontFamily:"'DM Sans',sans-serif",color:C.textMid,fontSize:"12px",marginBottom:"16px"}}>{msg}</p>
        {!posted?(
          <div style={{background:C.bgPanel,border:`1px solid ${C.border}`,padding:"15px 17px",maxWidth:"380px",margin:"0 auto 16px",textAlign:"left"}}>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.text,marginBottom:"10px"}}>Post <span style={{color:ac,fontWeight:600}}>{score}/{qs.length} ({pct}%)</span> to <strong>{spec}</strong> leaderboard?</p>
            <div style={{display:"flex",gap:"7px",flexWrap:"wrap"}}>
              {user?(<>
                <button onClick={()=>post(false)} style={{...bS,padding:"8px 14px"}}>Post as {user.username}</button>
                <button onClick={()=>post(true)} style={{...bO,padding:"8px 12px"}}>Anonymously</button>
              </>):<p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:C.textDim}}>Sign in to post score.</p>}
            </div>
          </div>
        ):(
          <div style={{background:`${ac}0e`,border:`1px solid ${ac}2f`,padding:"11px 14px",maxWidth:"380px",margin:"0 auto 16px",textAlign:"left"}}>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.text,lineHeight:1.7}}>✓ {pMsg}</p>
          </div>
        )}
        <div style={{display:"flex",gap:"7px",justifyContent:"center",flexWrap:"wrap"}}>
          <button onClick={()=>start(spec)} style={{...bS,padding:"8px 15px"}}>Next Set</button>
          <button onClick={()=>setSpec(null)} style={{...bO,padding:"8px 13px"}}>Change Specialty</button>
        </div>
      </div>
    );
  }

  const q=qs[qi];
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"5px"}}>
        <div style={{display:"flex",gap:"7px",alignItems:"center"}}>
          <button onClick={()=>setSpec(null)} style={{background:"none",border:"none",color:C.textDim,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",padding:0}}>← Back</button>
          <span style={{color:"rgba(255,255,255,0.1)"}}>|</span>
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:ac}}>{spec}</span>
        </div>
        <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:C.textDim}}>Q{qi+1}/{qs.length}</span>
      </div>
      <div style={{width:"100%",height:"2px",background:"rgba(255,255,255,0.06)",marginBottom:"17px"}}><div style={{width:`${((qi+1)/qs.length)*100}%`,height:"100%",background:ac,transition:"width 0.35s ease"}}/></div>
      <p style={{fontSize:"clamp(13px,2vw,16px)",lineHeight:1.7,marginBottom:"16px",fontWeight:300,color:C.text}}>{q.q}</p>
      <div style={{display:"flex",flexDirection:"column",gap:"6px",marginBottom:"12px"}}>
        {q.o.map((opt,i)=>{
          let bg=C.bgPanel,bc="rgba(255,255,255,0.08)";
          if(sel!==null){if(i===q.a){bg="rgba(34,197,94,0.09)";bc=C.success;}else if(i===sel){bg="rgba(239,68,68,0.09)";bc=C.danger;}}
          return(<button key={i} onClick={()=>answer(i)} style={{background:bg,border:`1px solid ${bc}`,padding:"10px 13px",textAlign:"left",cursor:sel!==null?"default":"pointer",color:C.text,fontFamily:"'DM Sans',sans-serif",fontSize:"12px",lineHeight:1.5,transition:"all 0.18s",display:"flex",gap:"7px",alignItems:"flex-start"}}
            onMouseEnter={e=>{if(sel===null){e.currentTarget.style.background=`${ac}0d`;e.currentTarget.style.borderColor=`${ac}4f`;}}}
            onMouseLeave={e=>{if(sel===null){e.currentTarget.style.background=C.bgPanel;e.currentTarget.style.borderColor="rgba(255,255,255,0.08)";}}}>
            <span style={{color:ac,fontFamily:"'Cormorant Garamond',serif",fontSize:"14px",lineHeight:1,minWidth:"13px",flexShrink:0,fontWeight:500}}>{String.fromCharCode(65+i)}.</span>
            <span>{opt}</span>
          </button>);
        })}
      </div>
      {showExp&&<div style={{background:`${ac}0a`,border:`1px solid ${ac}24`,padding:"10px 14px",marginBottom:"10px"}}>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.17em",textTransform:"uppercase",color:ac,marginBottom:"4px"}}>Clinical Explanation</div>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",lineHeight:1.75,color:C.textMid}}>{q.exp}</p>
      </div>}
      {sel!==null&&<button onClick={next} style={{...bS,padding:"9px 19px"}}>{qi+1>=qs.length?"See Results →":"Next →"}</button>}
    </div>
  );
}

// LEADERBOARD
function Board(){
  const[spec,setSpec]=useState(SPECIALTIES[0]);const[rows,setRows]=useState([]);const[loading,setLoading]=useState(false);
  useEffect(()=>{setLoading(true);(async()=>{const d=await sGet("lb:"+spec)||[];setRows([...d].sort((a,b)=>b.pct-a.pct||new Date(b.date)-new Date(a.date)).slice(0,25));setLoading(false);})();},[spec]);
  const medals=["🥇","🥈","🥉"];
  return(<div>
    <div style={{display:"flex",flexWrap:"wrap",gap:"4px",marginBottom:"16px"}}>{SPECIALTIES.map(s=>{const col=TC[s]||C.teal;const on=spec===s;return(<button key={s} onClick={()=>setSpec(s)} style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.09em",textTransform:"uppercase",padding:"4px 9px",border:`1px solid ${on?col:"rgba(255,255,255,0.08)"}`,background:on?`${col}12`:"transparent",color:on?col:C.textDim,cursor:"pointer",transition:"all 0.2s"}}>{s}</button>);})}</div>
    <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"18px",fontWeight:300,color:C.text,marginBottom:"11px"}}>{spec} — Top Performers</h3>
    {loading?<p style={{fontFamily:"'DM Sans',sans-serif",color:C.textDim,fontSize:"12px"}}>Loading...</p>
    :rows.length===0?<div style={{background:C.bgPanel,border:`1px solid ${C.border}`,padding:"18px",textAlign:"center"}}><p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.textDim}}>No scores yet. Be the first!</p></div>
    :<div style={{display:"flex",flexDirection:"column",gap:"5px"}}>
      {rows.map((e,i)=>{const col=TC[spec]||C.teal;const top=i<3;return(
        <div key={i} style={{background:top?`${col}0a`:C.bgPanel,border:`1px solid ${top?col+"22":C.border}`,padding:"10px 13px",display:"flex",alignItems:"center",gap:"10px"}}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"16px",minWidth:"23px",textAlign:"center"}}>{medals[i]||`#${i+1}`}</div>
          <div style={{flex:1}}><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.text,fontWeight:500}}>{e.username}</div><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",color:C.textDim,marginTop:"1px"}}>{new Date(e.date).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</div></div>
          <div style={{textAlign:"right"}}><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"17px",color:col,fontWeight:300}}>{e.score}/{e.total}</div><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",color:C.textDim}}>{e.pct}%</div></div>
        </div>
      );})}
    </div>}
  </div>);
}

// MAIN APP
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
    sDel("session"); // clear all previous sessions on load
    window.addEventListener("scroll",()=>setScrolled(window.scrollY>55));
    loadSite();
  },[]);

  const loadSite=async()=>{
    const cv=await sGet("customVideos")||[];
    const sv=await sGet("customServices")||DS;
    const ht=await sGet("heroText")||null;
    setCustomVids(cv); setServices(sv); if(ht)setHero(ht);
  };
  const onSiteUpdate=()=>loadSite();
  const allVids=[...SV,...customVids];
  const login=async u=>{setUser(u); setWatched(u.watchedVideos||{});};
  const logout=async()=>{await sDel("session"); setUser(null); setWatched({});};
  const updateUser=u=>{setUser(u); setWatched(u.watchedVideos||{});};

  const markProg=async(vid,pct)=>{
    if(!user)return;
    const w={...watched,[vid]:Math.max(watched[vid]||0,pct)}; setWatched(w);
    const u={...user,watchedVideos:w}; setUser(u);
    await sSet("user:"+user.email,u); await sSet("session",u);
  };

  const onScore=async(spec,entry)=>{
    const key="lb:"+spec; const ex=await sGet(key)||[]; await sSet(key,[...ex,entry]);
    if(user){const h={...(user.quizHistory||{}),[spec]:[...(user.quizHistory?.[spec]||[]),entry]};const u={...user,quizHistory:h};setUser(u);await sSet("user:"+user.email,u);await sSet("session",u);}
  };

  const scrollTo=id=>{setActiveNav(id); document.getElementById(id.toLowerCase().replace(/[\s&]/g,""))?.scrollIntoView({behavior:"smooth"});};
  const topics=["All",...Array.from(new Set(allVids.map(v=>v.topic))).sort()];
  const vids=vFilter==="All"?allVids:allVids.filter(v=>v.topic===vFilter);

  return(
    <div style={{fontFamily:"'Cormorant Garamond','Georgia',serif",background:C.bg,color:C.text,overflowX:"hidden",minHeight:"100vh"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:#0f1923}::-webkit-scrollbar-thumb{background:#0e8c8c;border-radius:2px}
        input,textarea,select{color:#e8f0f5!important}input::placeholder,textarea::placeholder{color:rgba(232,240,245,0.3)!important}
        input:focus,textarea:focus,select:focus{border-color:#0e8c8c!important;outline:none!important}
        .nl{cursor:pointer;font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(232,240,245,0.6);transition:color 0.3s;white-space:nowrap}.nl:hover,.nl.on{color:#14a8a8}
        .sc{position:relative;overflow:hidden}.sc img{width:100%;height:300px;object-fit:cover;display:block;filter:brightness(0.38);transition:all 0.5s}.sc:hover img{transform:scale(1.04);filter:brightness(0.28)}
        .so{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;padding:24px;background:linear-gradient(to top,rgba(0,0,0,0.93) 0%,rgba(0,0,0,0.2) 55%,transparent 100%)}
        .vc{background:#162030;border:1px solid rgba(14,140,140,0.18);transition:all 0.3s;overflow:hidden}.vc:hover{border-color:rgba(14,140,140,0.4);background:#1c2a3a}
        @media(max-width:900px){.g2{grid-template-columns:1fr!important}.g3{grid-template-columns:1fr 1fr!important}.hm{display:none!important}.sp{padding:60px 20px!important}}
        @media(max-width:560px){.g3{grid-template-columns:1fr!important}}
      `}</style>

      {showAuth&&<AuthModal onClose={()=>setShowAuth(false)} onAuth={login}/>}
      {showProfile&&user&&<ProfileModal user={user} onClose={()=>setShowProfile(false)} onUpdate={updateUser}/>}
      {showAdmin&&user?.isAdmin&&<AdminPanel user={user} onClose={()=>{setShowAdmin(false);onSiteUpdate();}} onSiteUpdate={onSiteUpdate}/>}

      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:97,height:"62px",padding:"0 40px",display:"flex",alignItems:"center",justifyContent:"space-between",background:scrolled?"rgba(10,15,22,0.97)":"rgba(10,15,22,0.82)",borderBottom:`1px solid ${scrolled?C.border:"transparent"}`,backdropFilter:"blur(18px)",transition:"all 0.4s"}}>
        <div style={{cursor:"pointer"}} onClick={()=>scrollTo("Home")}><Logo size="sm"/></div>
        <div className="hm" style={{display:"flex",gap:"20px",alignItems:"center"}}>
          {NAV.map(l=><span key={l} className={`nl${activeNav===l?" on":""}`} onClick={()=>scrollTo(l)}>{l}</span>)}
          {user?.isAdmin&&<button onClick={()=>setShowAdmin(true)} style={{background:"rgba(201,169,110,0.11)",border:"1px solid rgba(201,169,110,0.32)",color:C.gold,fontFamily:"'DM Sans',sans-serif",fontSize:"10px",letterSpacing:"0.12em",textTransform:"uppercase",cursor:"pointer",padding:"5px 12px",transition:"all 0.3s"}}>⚙ Admin</button>}
          {user?(
            <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
              <div onClick={()=>setShowProfile(true)} style={{width:"30px",height:"30px",borderRadius:"50%",overflow:"hidden",border:`2px solid ${C.teal}`,background:"linear-gradient(135deg,#0e8c8c,#1a2744)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}}>
                {user.profilePic?<img src={user.profilePic} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:700,color:"#fff"}}>{user.username[0].toUpperCase()}</span>}
              </div>
              <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:C.textMid,maxWidth:"70px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",cursor:"pointer"}} onClick={()=>setShowProfile(true)}>{user.username}</span>
              <button onClick={logout} style={{...bO,padding:"5px 11px",fontSize:"9px"}}>Sign Out</button>
            </div>
          ):(
            <button onClick={()=>setShowAuth(true)} style={{...bS,padding:"7px 15px"}}>Sign In</button>
          )}
        </div>
      </nav>

      <section id="home" style={{position:"relative",height:"100vh",minHeight:"600px",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
        <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80" alt="" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 30%",filter:"brightness(0.17) saturate(0.5)"}}/>
        <div style={{position:"absolute",inset:0,background:`linear-gradient(to bottom,rgba(15,25,35,0.05) 0%,rgba(15,25,35,0.55) 60%,${C.bg} 100%)`}}/>
        <div style={{position:"relative",textAlign:"center",padding:"0 24px",maxWidth:"900px"}}>
          <div style={{marginBottom:"28px",display:"flex",justifyContent:"center"}}><Logo size="lg"/></div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"11px",marginBottom:"15px"}}>
            <div style={{width:"24px",height:"1px",background:C.teal}}/><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.28em",textTransform:"uppercase",color:C.teal}}>Blackburn, England · Est. October 2025 · Co. 16791155</span><div style={{width:"24px",height:"1px",background:C.teal}}/>
          </div>
          <h1 style={{fontSize:"clamp(30px,6vw,72px)",fontWeight:300,lineHeight:1.05,letterSpacing:"-0.02em",marginBottom:"13px",color:C.text}}>{hero.title}<br/><em style={{color:C.tealLight,fontStyle:"italic"}}>{hero.subtitle}</em></h1>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"14px",lineHeight:1.85,color:C.textMid,maxWidth:"500px",margin:"0 auto 28px",fontWeight:300}}>{hero.desc}</p>
          <div style={{display:"flex",gap:"8px",justifyContent:"center",flexWrap:"wrap"}}>
            <button style={{...bS,padding:"11px 22px"}} onClick={()=>scrollTo("Services")}>Our Services</button>
            <button style={{...bO,padding:"11px 22px"}} onClick={()=>scrollTo("Videos")}>Medical Videos</button>
            <button style={{...bO,padding:"11px 22px"}} onClick={()=>user?scrollTo("Quiz"):setShowAuth(true)}>Take the Quiz</button>
          </div>
        </div>
      </section>

      <section style={{background:C.bgCard,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`}}>
        <div style={{maxWidth:"1400px",margin:"0 auto",display:"flex",flexWrap:"wrap"}}>
          {[["Company No.","16791155"],["Status","Active ✓"],["Incorporated","16 Oct 2025"],["Address","Blackburn, BB1 1RB"],["SIC","86210 — General Medical Practice"]].map(([k,v],i)=>(
            <div key={k} style={{flex:"1 1 140px",padding:"17px 18px",borderLeft:i>0?`1px solid ${C.border}`:"none",minWidth:"120px"}}>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.16em",textTransform:"uppercase",color:C.textDim,marginBottom:"3px"}}>{k}</div>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.text}}>{v}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="about" style={{padding:"80px 48px",maxWidth:"1400px",margin:"0 auto"}} className="sp">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"50px",alignItems:"center"}} className="g2">
          <FadeIn>
            <div style={{position:"relative"}}>
              <img src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80" alt="Medical" style={{width:"100%",height:"440px",objectFit:"cover",display:"block",filter:"brightness(0.78) saturate(0.75)"}}/>
              <div style={{position:"absolute",bottom:"-13px",right:"-13px",background:"linear-gradient(135deg,#0e8c8c,#0a6666)",padding:"16px 19px"}}>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"28px",fontWeight:300,color:"#fff",lineHeight:1}}>SIC</div>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",color:"rgba(255,255,255,0.65)",marginTop:"3px"}}>86210 Medical Practice</div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={90}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:"9px",marginBottom:"12px"}}><div style={{width:"22px",height:"1.5px",background:C.teal}}/><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.2em",textTransform:"uppercase",color:C.teal}}>About The Company</span></div>
              <h2 style={{fontSize:"clamp(22px,4vw,40px)",fontWeight:300,lineHeight:1.15,marginBottom:"13px"}}>Registered UK Medical<br/><em style={{color:C.tealLight,fontStyle:"italic"}}>Practice in Blackburn</em></h2>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",lineHeight:1.85,color:C.textMid,marginBottom:"12px",fontWeight:300}}>Emrzase Hope Ltd (Co. 16791155) incorporated 16 October 2025 at 28 Copperfield Street, Blackburn, BB1 1RB. SIC 86210 — General Medical Practice Activities.</p>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",lineHeight:1.85,color:C.textMid,marginBottom:"20px",fontWeight:300}}>Directed by Dr. Emad Elsayed Hassan Ali (Oct 2025) and Dr. Mariam Mohamed Elmamoon Yehia Zakaria (Jan 2026), both identity-verified via Companies House ACSP.</p>
              {["Companies House verified — Active","Two qualified medical directors","SIC 86210 — General Medical Practice","Registered in Blackburn, Lancashire"].map(item=>(
                <div key={item} style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"7px"}}><div style={{width:"5px",height:"5px",background:C.teal,borderRadius:"50%",flexShrink:0}}/><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.textMid}}>{item}</span></div>
              ))}
              <div style={{marginTop:"20px"}}><button style={{...bO,padding:"10px 22px"}} onClick={()=>scrollTo("Contact")}>Contact Us</button></div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section style={{background:C.bgCard,padding:"50px 48px",borderTop:`1px solid ${C.border}`}} className="sp">
        <FadeIn>
          <div style={{textAlign:"center",marginBottom:"32px"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"9px",marginBottom:"9px"}}><div style={{width:"22px",height:"1px",background:C.teal}}/><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.2em",textTransform:"uppercase",color:C.teal}}>Company Directors</span><div style={{width:"22px",height:"1px",background:C.teal}}/></div>
            <h2 style={{fontSize:"clamp(20px,4vw,36px)",fontWeight:300}}>Verified by <em style={{color:C.tealLight,fontStyle:"italic"}}>Companies House</em></h2>
          </div>
        </FadeIn>
        <div style={{maxWidth:"760px",margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}} className="g2">
          {DIRS.map((d,i)=>(
            <FadeIn key={d.name} delay={i*75}>
              <div style={{background:C.bgPanel,border:`1px solid ${C.border}`,padding:"21px 17px"}}>
                <div style={{width:"33px",height:"33px",background:"linear-gradient(135deg,#0e8c8c,#1a2744)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:700,color:"#fff",marginBottom:"11px"}}>{d.name.split(" ").filter((_,j)=>j>0).map(n=>n[0]).slice(0,2).join("")}</div>
                <h3 style={{fontSize:"15px",fontWeight:400,marginBottom:"2px"}}>{d.name}</h3>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.12em",textTransform:"uppercase",color:C.teal,marginBottom:"11px"}}>{d.role}</div>
                <div style={{borderTop:`1px solid ${C.border}`,paddingTop:"9px",display:"flex",flexDirection:"column",gap:"5px"}}>
                  {[["Appointed",d.appointed],["Nationality","British"],["Residence","England"],["Identity","Verified ✓"]].map(([k,v])=>(
                    <div key={k} style={{display:"flex",justifyContent:"space-between"}}><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:C.textDim}}>{k}</span><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:v==="Verified ✓"?C.success:C.textMid}}>{v}</span></div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section id="services" style={{padding:"80px 48px"}} className="sp">
        <FadeIn>
          <div style={{textAlign:"center",marginBottom:"38px"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"9px",marginBottom:"9px"}}><div style={{width:"22px",height:"1px",background:C.teal}}/><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.2em",textTransform:"uppercase",color:C.teal}}>What We Offer</span><div style={{width:"22px",height:"1px",background:C.teal}}/></div>
            <h2 style={{fontSize:"clamp(22px,5vw,44px)",fontWeight:300,letterSpacing:"-0.02em"}}>Our <em style={{color:C.tealLight,fontStyle:"italic"}}>Services</em></h2>
          </div>
        </FadeIn>
        <div style={{maxWidth:"1400px",margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"2px"}} className="g2">
          {services.map((s,i)=>(
            <FadeIn key={s.id||i} delay={i*45}>
              <div className="sc"><img src={s.img} alt={s.title}/><div className="so">
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"8px",letterSpacing:"0.16em",textTransform:"uppercase",color:C.tealLight,marginBottom:"7px",padding:"2px 7px",border:"1px solid rgba(14,140,140,0.38)",display:"inline-block"}}>{s.tag}</div>
                <h3 style={{fontSize:"clamp(15px,2.5vw,21px)",fontWeight:300,marginBottom:"5px"}}>{s.title}</h3>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",lineHeight:1.65,color:"rgba(232,240,245,0.62)"}}>{s.desc}</p>
              </div></div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section id="videos" style={{padding:"80px 48px",background:C.bgCard,borderTop:`1px solid ${C.border}`}} className="sp">
        <FadeIn>
          <div style={{textAlign:"center",marginBottom:"24px"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"9px",marginBottom:"9px"}}><div style={{width:"22px",height:"1px",background:C.teal}}/><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.2em",textTransform:"uppercase",color:C.teal}}>Medical Education</span><div style={{width:"22px",height:"1px",background:C.teal}}/></div>
            <h2 style={{fontSize:"clamp(22px,5vw,44px)",fontWeight:300,letterSpacing:"-0.02em",marginBottom:"8px"}}>Clinical <em style={{color:C.tealLight,fontStyle:"italic"}}>Learning Videos</em></h2>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.textDim,maxWidth:"330px",margin:"0 auto",lineHeight:1.7}}>{allVids.length} videos. {user?"Progress saved.":"Sign in to track progress."}</p>
          </div>
        </FadeIn>
        <div style={{maxWidth:"1400px",margin:"0 auto 16px",display:"flex",flexWrap:"wrap",gap:"4px",justifyContent:"center"}}>
          {topics.map(t=>{const col=TC[t]||C.teal;const on=vFilter===t;return(<button key={t} onClick={()=>{setVFilter(t);setActiveVid(null);}} style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.09em",textTransform:"uppercase",padding:"4px 9px",border:`1px solid ${on?col:"rgba(255,255,255,0.08)"}`,background:on?`${col}12`:"transparent",color:on?col:C.textDim,cursor:"pointer",transition:"all 0.2s"}}>{t}</button>);})}
        </div>
        {activeVid&&(()=>{const v=allVids.find(x=>x.id===activeVid);if(!v)return null;return(
          <div style={{maxWidth:"800px",margin:"0 auto 24px"}}>
            <div style={{position:"relative",paddingBottom:"56.25%",height:0,background:"#000",border:`1px solid ${C.border}`}}>
              {v.type==="upload"&&v.fileURL?<video controls autoPlay src={v.fileURL} style={{position:"absolute",top:0,left:0,width:"100%",height:"100%"}}/>
              :<iframe key={activeVid} src={`https://www.youtube-nocookie.com/embed/${v.ytId||v.id}?autoplay=1&rel=0&modestbranding=1`} style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"none"}} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="Video"/>}
            </div>
            <div style={{display:"flex",gap:"6px",marginTop:"7px",alignItems:"center",flexWrap:"wrap"}}>
              <button onClick={()=>setActiveVid(null)} style={{...bO,padding:"5px 11px",fontSize:"9px"}}>✕ Close</button>
              {v.type!=="upload"&&<a href={`https://www.youtube.com/watch?v=${v.ytId||v.id}`} target="_blank" rel="noreferrer" style={{...bO,padding:"5px 11px",fontSize:"9px",textDecoration:"none",color:C.tealLight}}>YouTube ↗</a>}
              {user&&<div style={{display:"flex",gap:"4px",marginLeft:"auto",alignItems:"center"}}><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",color:C.textDim}}>Mark:</span>{[25,50,75,100].map(p=>{const done=(watched[activeVid]||0)>=p;return(<button key={p} onClick={()=>markProg(activeVid,p)} style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",padding:"3px 7px",background:done?`${C.teal}20`:"transparent",border:`1px solid ${done?C.teal:"rgba(255,255,255,0.08)"}`,color:done?C.tealLight:C.textDim,cursor:"pointer",transition:"all 0.2s"}}>{p}%</button>);})}</div>}
            </div>
          </div>
        );})()}
        <div style={{maxWidth:"1400px",margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"10px"}} className="g3">
          {vids.map((v,i)=>{
            const tc=TC[v.topic]||C.teal,prog=watched[v.id]||0,playing=activeVid===v.id,r=10,circ=2*Math.PI*r;
            return(<FadeIn key={v.id} delay={(i%6)*25}>
              <div className="vc" style={{border:playing?`1px solid ${tc}`:`1px solid rgba(14,140,140,0.18)`,background:playing?`${tc}0a`:C.bgCard}}>
                <div style={{padding:"14px 13px 10px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"10px"}}>
                    <div style={{width:"29px",height:"29px",background:`${tc}12`,border:`1px solid ${tc}24`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      {v.type==="upload"?<span style={{fontSize:"11px"}}>📹</span>:<svg width="8" height="8" viewBox="0 0 24 24" fill={tc}><polygon points="5,3 19,12 5,21"/></svg>}
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:"4px"}}>
                      {user&&prog>0&&<svg width="21" height="21" viewBox="0 0 21 21"><circle cx="10.5" cy="10.5" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="2"/><circle cx="10.5" cy="10.5" r={r} fill="none" stroke={tc} strokeWidth="2" strokeDasharray={circ} strokeDashoffset={circ-(prog/100)*circ} strokeLinecap="round" transform="rotate(-90 10.5 10.5)"/>{prog>=98&&<circle cx="10.5" cy="10.5" r="3" fill={tc}/>}</svg>}
                      <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"8px",letterSpacing:"0.12em",textTransform:"uppercase",color:tc,background:`${tc}0d`,padding:"2px 5px",border:`1px solid ${tc}1c`}}>{v.topic}</span>
                    </div>
                  </div>
                  <div style={{fontSize:"13px",fontWeight:400,lineHeight:1.3,marginBottom:"2px"}}>{v.title}</div>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:C.textDim}}>{v.channel}</div>
                  {user&&prog>0&&<div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",color:tc,marginTop:"4px"}}>{prog>=98?"✓ Watched":prog+"% watched"}</div>}
                </div>
                <div style={{borderTop:`1px solid rgba(14,140,140,0.1)`,display:"flex"}}>
                  <button onClick={()=>setActiveVid(playing?null:v.id)} style={{flex:1,padding:"7px",background:playing?`${tc}0d`:"transparent",border:"none",color:playing?tc:C.textMid,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.09em",textTransform:"uppercase",transition:"all 0.2s",borderRight:`1px solid rgba(14,140,140,0.1)`}}
                    onMouseEnter={e=>{if(!playing){e.currentTarget.style.background=`${tc}0a`;e.currentTarget.style.color=tc;}}}
                    onMouseLeave={e=>{if(!playing){e.currentTarget.style.background="transparent";e.currentTarget.style.color=C.textMid;}}}>
                    {playing?"▶ Playing":"▶ Play"}
                  </button>
                  {v.type==="upload"?<div style={{flex:1,padding:"7px",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans',sans-serif",fontSize:"9px",color:C.textDim}}>Uploaded</div>
                  :<a href={`https://www.youtube.com/watch?v=${v.ytId||v.id}`} target="_blank" rel="noreferrer" style={{flex:1,padding:"7px",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.09em",textTransform:"uppercase",color:C.textDim,textDecoration:"none",transition:"all 0.2s"}}
                    onMouseEnter={e=>{e.currentTarget.style.background=`${C.teal}0a`;e.currentTarget.style.color=C.tealLight;}}
                    onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=C.textDim;}}>YouTube ↗</a>}
                </div>
              </div>
            </FadeIn>);
          })}
        </div>
      </section>

      <section id="quiz" style={{padding:"80px 48px",background:C.bg,borderTop:`1px solid ${C.border}`}} className="sp">
        <div style={{maxWidth:"820px",margin:"0 auto"}}>
          <FadeIn>
            <div style={{textAlign:"center",marginBottom:"32px"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"9px",marginBottom:"9px"}}><div style={{width:"22px",height:"1px",background:C.teal}}/><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.2em",textTransform:"uppercase",color:C.teal}}>Test Your Knowledge</span><div style={{width:"22px",height:"1px",background:C.teal}}/></div>
              <h2 style={{fontSize:"clamp(22px,5vw,44px)",fontWeight:300,letterSpacing:"-0.02em",marginBottom:"8px"}}>Medical <em style={{color:C.tealLight,fontStyle:"italic"}}>Specialist Quiz</em></h2>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.textDim,maxWidth:"400px",margin:"0 auto",lineHeight:1.75}}>Large question pools per specialty. 10 randomised questions per session — questions rotate through the full bank so you never repeat.</p>
            </div>
          </FadeIn>
          {!user?(
            <FadeIn delay={55}><div style={{background:C.bgCard,border:`1px solid ${C.border}`,padding:"34px",textAlign:"center"}}>
              <Steth size={44}/><h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"20px",fontWeight:300,margin:"11px 0 6px"}}>Sign in to take the quiz</h3>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.textMid,marginBottom:"18px",maxWidth:"290px",margin:"0 auto 18px",lineHeight:1.75}}>Create a free account to access specialist quizzes, post scores to the leaderboard and track your progress.</p>
              <button style={{...bS,padding:"10px 22px"}} onClick={()=>setShowAuth(true)}>Sign In or Register — Free</button>
            </div></FadeIn>
          ):(
            <FadeIn delay={55}><div style={{background:C.bgCard,border:`1px solid ${C.border}`,padding:"24px 22px"}}><Quiz user={user} onScore={onScore}/></div></FadeIn>
          )}
        </div>
      </section>

      <section id="leaderboard" style={{padding:"80px 48px",background:C.bgCard,borderTop:`1px solid ${C.border}`}} className="sp">
        <div style={{maxWidth:"820px",margin:"0 auto"}}>
          <FadeIn>
            <div style={{textAlign:"center",marginBottom:"32px"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"9px",marginBottom:"9px"}}><div style={{width:"22px",height:"1px",background:C.teal}}/><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.2em",textTransform:"uppercase",color:C.teal}}>Rankings</span><div style={{width:"22px",height:"1px",background:C.teal}}/></div>
              <h2 style={{fontSize:"clamp(22px,5vw,44px)",fontWeight:300,letterSpacing:"-0.02em"}}>Global <em style={{color:C.tealLight,fontStyle:"italic"}}>Leaderboard</em></h2>
            </div>
          </FadeIn>
          <FadeIn delay={55}><div style={{background:C.bgPanel,border:`1px solid ${C.border}`,padding:"24px 22px"}}><Board/></div></FadeIn>
        </div>
      </section>

      <section style={{position:"relative",height:"250px",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
        <img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1600&q=80" alt="" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",filter:"brightness(0.12) saturate(0.4)"}}/>
        <div style={{position:"absolute",inset:0,background:"rgba(15,25,35,0.6)"}}/>
        <div style={{position:"relative",textAlign:"center",padding:"0 24px"}}>
          <h2 style={{fontSize:"clamp(18px,5vw,44px)",fontWeight:300,marginBottom:"11px",maxWidth:"620px"}}>"We don't just provide care —<br/><em style={{color:C.tealLight,fontStyle:"italic"}}>we transform lives."</em></h2>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.17em",textTransform:"uppercase",color:C.textDim}}>— Emrzase Hope Ltd · Care. Innovation. Trust.</p>
        </div>
      </section>

      <section id="contact" style={{padding:"80px 48px",background:C.bg,borderTop:`1px solid ${C.border}`}} className="sp">
        <div style={{maxWidth:"1020px",margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"50px",alignItems:"start"}} className="g2">
          <FadeIn>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:"9px",marginBottom:"12px"}}><div style={{width:"22px",height:"1px",background:C.teal}}/><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.2em",textTransform:"uppercase",color:C.teal}}>Get In Touch</span></div>
              <h2 style={{fontSize:"clamp(20px,4vw,38px)",fontWeight:300,lineHeight:1.2,marginBottom:"12px"}}>Contact<br/><em style={{color:C.tealLight,fontStyle:"italic"}}>Emrzase Hope Ltd</em></h2>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",lineHeight:1.85,color:C.textMid,marginBottom:"24px",fontWeight:300}}>To enquire about our services or reach our directors, please use the form or contact details below.</p>
              {[["📍","Registered Address","28 Copperfield Street, Blackburn, England, BB1 1RB"],["🏢","Company Number","16791155 (Companies House)"],["⚕️","Business Type","General Medical Practice (SIC 86210)"],["📅","Incorporated","16 October 2025"]].map(([ic,lb,vl])=>(
                <div key={lb} style={{display:"flex",gap:"10px",alignItems:"flex-start",marginBottom:"14px"}}>
                  <span style={{fontSize:"13px",marginTop:"1px"}}>{ic}</span>
                  <div><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.12em",textTransform:"uppercase",color:C.textDim,marginBottom:"2px"}}>{lb}</div><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:C.text}}>{vl}</div></div>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={90}>
            {sent?(
              <div style={{textAlign:"center",padding:"40px 0"}}>
                <div style={{fontSize:"28px",color:C.teal,marginBottom:"9px"}}>✦</div>
                <h3 style={{fontSize:"20px",fontWeight:300,marginBottom:"6px"}}>Message sent.</h3>
                <p style={{fontFamily:"'DM Sans',sans-serif",color:C.textDim,fontSize:"12px"}}>We'll be in touch shortly.</p>
              </div>
            ):(
              <form onSubmit={e=>{e.preventDefault();setSent(true);}} style={{display:"flex",flexDirection:"column",gap:"15px"}}>
                <input style={iS} type="text" placeholder="Your Name" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
                <input style={iS} type="email" placeholder="Your Email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
                <textarea style={{...iS,resize:"none"}} rows="5" placeholder="Your Message" required value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})}/>
                <button type="submit" style={{...bS,padding:"11px 26px",alignSelf:"flex-start"}}>Send Message</button>
              </form>
            )}
          </FadeIn>
        </div>
      </section>

      <footer style={{background:"#080d12",borderTop:`1px solid ${C.border}`,padding:"30px 48px"}}>
        <div style={{maxWidth:"1400px",margin:"0 auto"}}>
          <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-between",alignItems:"flex-start",gap:"18px",marginBottom:"18px"}}>
            <div><div style={{marginBottom:"7px"}}><Logo size="sm"/></div><p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:C.textDim,lineHeight:1.7,maxWidth:"220px"}}>Co. 16791155 · Registered in England<br/>28 Copperfield Street, Blackburn, BB1 1RB<br/>SIC 86210 — General Medical Practice</p></div>
            <div style={{display:"flex",gap:"16px",flexWrap:"wrap",alignItems:"center"}}>{NAV.map(l=><span key={l} className="nl" onClick={()=>scrollTo(l)} style={{fontSize:"10px"}}>{l}</span>)}</div>
          </div>
          <div style={{borderTop:"1px solid rgba(255,255,255,0.05)",paddingTop:"12px",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"6px"}}>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:"rgba(232,240,245,0.16)"}}>© {new Date().getFullYear()} Emrzase Hope Ltd. All rights reserved. Care. Innovation. Trust.</p>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:"rgba(232,240,245,0.16)"}}>Incorporated 16 October 2025 · Active · Companies House Verified</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
