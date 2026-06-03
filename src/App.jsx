import { useState, useEffect, useRef } from "react";

// ── Real company data from Companies House (No. 16791155) ──────────────────
const COMPANY = {
  name: "EMRZASE HOPE LTD",
  number: "16791155",
  address: "28 Copperfield Street, Blackburn, England, BB1 1RB",
  status: "Active",
  incorporated: "16 October 2025",
  sic: "86210 – General Medical Practice Activities",
  directors: [
    { name: "Dr. Emad Elsayed Hassan Ali", role: "Director", dob: "January 1975", appointed: "16 October 2025" },
    { name: "Dr. Mariam Mohamed Elmamoon Yehia Zakaria", role: "Director", dob: "December 1977", appointed: "20 January 2026" },
  ],
};

const NAV_LINKS = ["Home", "About", "Services", "Videos", "Quiz", "Contact"];

const SERVICES = [
  {
    title: "General Medical Practice",
    desc: "Registered under SIC code 86210, Emrzase Hope Ltd delivers general medical practice activities — providing professional clinical care and health assessment services.",
    tag: "Core Service",
    img: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80",
  },
  {
    title: "Primary Healthcare",
    desc: "Comprehensive primary care services focused on prevention, diagnosis and treatment — delivered by qualified medical professionals from our Blackburn base.",
    tag: "Primary Care",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
  },
  {
    title: "Patient Consultations",
    desc: "Professional patient-centred consultations conducted with clinical rigour and compassion, ensuring every individual receives the attention and care they deserve.",
    tag: "Consultations",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80",
  },
  {
    title: "Health Assessments",
    desc: "Thorough health assessments and medical evaluations carried out by our experienced directors, both fully verified by Companies House identity checks.",
    tag: "Assessments",
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&q=80",
  },
];

// ── Medical quiz questions per specialty ─────────────────────────────────────
const QUIZ_DATA = {
  GP: {
    label: "General Practice",
    color: "#4a9eff",
    questions: [
      {
        q: "A 58-year-old presents with gradually worsening exertional dyspnoea and bilateral ankle oedema. BNP is 820 pg/mL. Which investigation is most appropriate next?",
        options: ["Chest X-ray", "Echocardiogram", "CT pulmonary angiogram", "Exercise stress test"],
        answer: 1,
        explanation: "Elevated BNP with clinical signs of heart failure warrants echocardiography to assess cardiac structure and function.",
      },
      {
        q: "A patient on warfarin for AF presents with an INR of 8.2 but no active bleeding. What is the most appropriate management?",
        options: ["Give IV vitamin K 10mg", "Withhold warfarin, give oral vitamin K 1–5mg", "Fresh frozen plasma immediately", "Continue warfarin, recheck in 48 hours"],
        answer: 1,
        explanation: "For supratherapeutic INR without bleeding, withholding warfarin and giving low-dose oral vitamin K is the NICE-recommended approach.",
      },
      {
        q: "Which criterion is NOT part of the NICE criteria for initiating statin therapy in primary prevention?",
        options: ["10-year cardiovascular risk ≥10%", "Age over 84 years", "Type 1 diabetes with nephropathy", "Chronic kidney disease with eGFR <60"],
        answer: 1,
        explanation: "Age alone is not a criterion. NICE recommends statins based on 10-year QRISK score ≥10%, or conditions like CKD and T1DM with complications.",
      },
      {
        q: "A 34-year-old woman on combined oral contraceptive pill develops a new focal neurological deficit lasting 20 minutes. What is the most important immediate action?",
        options: ["Refer to neurology outpatient", "Stop the COCP immediately", "Switch to progestogen-only pill", "Request urgent MRI brain"],
        answer: 1,
        explanation: "A focal neurological deficit consistent with TIA is an absolute contraindication (UKMEC 4) to COCP. It must be stopped immediately due to stroke risk.",
      },
      {
        q: "A patient with type 2 diabetes has an eGFR of 38 and HbA1c of 72 mmol/mol. Which glucose-lowering drug should be avoided?",
        options: ["Empagliflozin", "Linagliptin", "Metformin at full dose", "Sitagliptin at reduced dose"],
        answer: 2,
        explanation: "Metformin is contraindicated or should be stopped when eGFR falls below 30, and used with caution below 45. Full-dose metformin at eGFR 38 risks lactic acidosis.",
      },
    ],
  },
  Emergency: {
    label: "Emergency Medicine",
    color: "#ff4a4a",
    questions: [
      {
        q: "A patient arrives in cardiac arrest. After 2 minutes of CPR the rhythm is pulseless electrical activity (PEA). Which reversible cause should be considered first in a post-surgical patient?",
        options: ["Hypoxia", "Tension pneumothorax", "Hypovolaemia", "Hyperkalaemia"],
        answer: 2,
        explanation: "In a post-surgical patient, hypovolaemia (haemorrhage) is the most likely reversible cause of PEA. The 4Hs and 4Ts should all be considered but context guides priority.",
      },
      {
        q: "A 22-year-old presents with anaphylaxis following a bee sting. IM adrenaline is given. After 5 minutes there is no improvement. What is the next step?",
        options: ["IV chlorphenamine", "Repeat IM adrenaline and prepare IV access", "IV hydrocortisone", "Nebulised salbutamol"],
        answer: 1,
        explanation: "Per Resuscitation Council guidelines, a repeat dose of IM adrenaline can be given after 5 minutes if no improvement. IV access should also be established.",
      },
      {
        q: "Which scoring system is used to guide early sepsis recognition in the emergency department and triggers a senior review at a score ≥3?",
        options: ["SOFA", "qSOFA", "NEWS2", "SIRS criteria"],
        answer: 2,
        explanation: "NEWS2 (National Early Warning Score 2) is the standard used in UK emergency departments, with a score ≥5 or ≥7 triggering escalation.",
      },
      {
        q: "A 45-year-old male presents with a sudden tearing chest pain radiating to the back. BP is 160/90 in the right arm and 110/70 in the left arm. Which diagnosis must be excluded immediately?",
        options: ["STEMI", "Aortic dissection", "Pulmonary embolism", "Oesophageal rupture"],
        answer: 1,
        explanation: "Unequal blood pressures between arms combined with tearing back pain is the classic presentation of aortic dissection. CT aortography is the investigation of choice.",
      },
      {
        q: "In the management of diabetic ketoacidosis, at what serum potassium level should potassium replacement be added to IV fluids?",
        options: ["Below 6.0 mmol/L", "Below 5.5 mmol/L", "Below 5.0 mmol/L", "Below 3.5 mmol/L"],
        answer: 1,
        explanation: "Per JBDS DKA guidelines, potassium should be added to IV fluids when serum potassium is below 5.5 mmol/L to prevent dangerous hypokalaemia as insulin drives K+ into cells.",
      },
    ],
  },
  Paediatrics: {
    label: "Paediatrics",
    color: "#4ac97e",
    questions: [
      {
        q: "A 3-year-old presents with a barking cough, stridor at rest and sternal recession. Using the Westley Croup Score, this presentation is best classified as:",
        options: ["Mild croup", "Moderate croup", "Severe croup", "Impending respiratory failure"],
        answer: 2,
        explanation: "Stridor at rest combined with sternal recession indicates severe croup (Westley score 6–11). Nebulised adrenaline and dexamethasone are indicated.",
      },
      {
        q: "A 6-week-old infant presents with projectile non-bilious vomiting after every feed. The abdomen is soft and an olive-shaped mass is palpable. What is the most likely diagnosis?",
        options: ["Intussusception", "Pyloric stenosis", "Gastro-oesophageal reflux", "Duodenal atresia"],
        answer: 1,
        explanation: "Pyloric stenosis classically presents at 4–8 weeks with projectile non-bilious vomiting, a palpable pyloric 'olive' and hypochloraemic hypokalaemic metabolic alkalosis.",
      },
      {
        q: "Which vaccine is given at birth as part of the UK immunisation schedule only to babies born to hepatitis B positive mothers?",
        options: ["BCG", "Hepatitis B vaccine", "Rotavirus", "MenB"],
        answer: 1,
        explanation: "Babies born to hepatitis B positive mothers receive the hepatitis B vaccine at birth (alongside HBIG if mother is HBeAg positive), separate from the routine schedule.",
      },
      {
        q: "A 4-year-old presents with fever, refusal to weight bear and a painful swollen knee. WBC is 18 × 10⁹/L and CRP is 95 mg/L. Which Kocher criterion is NOT part of the original set?",
        options: ["Fever >38.5°C", "Non-weight bearing", "ESR >40 mm/hr", "WBC >12 × 10⁹/L"],
        answer: 2,
        explanation: "The original Kocher criteria are: fever, non-weight bearing, ESR >40, and WBC >12. CRP was added later in modified criteria. ESR, not CRP, is an original criterion.",
      },
      {
        q: "A 2-year-old is brought in with a 3-day history of bloody diarrhoea. Full blood count shows microangiopathic haemolytic anaemia and thrombocytopenia. Creatinine is raised. What is the most likely diagnosis?",
        options: ["Crohn's disease", "Haemolytic uraemic syndrome", "Intussusception", "Meckel's diverticulum"],
        answer: 1,
        explanation: "The triad of microangiopathic haemolytic anaemia, thrombocytopenia and acute kidney injury following bloody diarrhoea is classic for HUS, most commonly caused by E. coli O157:H7.",
      },
    ],
  },
  Psychiatry: {
    label: "Psychiatry",
    color: "#b44aff",
    questions: [
      {
        q: "A patient with bipolar disorder type I is started on lithium. Which monitoring parameter is most critical at 12 hours post-dose when establishing the therapeutic level?",
        options: ["Serum lithium level", "TSH and renal function", "ECG", "Full blood count"],
        answer: 0,
        explanation: "Lithium levels should be measured 12 hours post-dose (trough level). The therapeutic range for bipolar disorder is 0.6–1.0 mmol/L (NICE CG185).",
      },
      {
        q: "Under the Mental Health Act 1983, which section allows the police to remove a person from a public place to a place of safety for up to 24 hours?",
        options: ["Section 2", "Section 3", "Section 135", "Section 136"],
        answer: 3,
        explanation: "Section 136 allows police to remove a person from a public place to a place of safety. The maximum period of detention was reduced from 72 to 24 hours by the Policing and Crime Act 2017.",
      },
      {
        q: "A patient presents with pressured speech, grandiosity, decreased need for sleep and increased goal-directed activity lasting 4 days. There is no significant functional impairment. What is the most appropriate diagnosis?",
        options: ["Bipolar I disorder", "Bipolar II disorder", "Cyclothymia", "Hypomania not meeting bipolar criteria"],
        answer: 1,
        explanation: "Hypomania lasting ≥4 days without significant functional impairment, combined with a history of at least one major depressive episode, meets criteria for Bipolar II disorder.",
      },
      {
        q: "Which antipsychotic requires mandatory registration with the Clozaril Patient Monitoring Service (CPMS) due to the risk of agranulocytosis?",
        options: ["Olanzapine", "Risperidone", "Clozapine", "Quetiapine"],
        answer: 2,
        explanation: "Clozapine carries a risk of agranulocytosis in approximately 1–2% of patients. Mandatory blood monitoring via CPMS is required throughout treatment.",
      },
      {
        q: "In cognitive behavioural therapy for psychosis (CBTp), which technique is specifically used to challenge delusional beliefs by examining the evidence for and against them?",
        options: ["Thought records", "Socratic questioning", "Behavioural activation", "Graded exposure"],
        answer: 1,
        explanation: "Socratic questioning (guided discovery) is used in CBTp to collaboratively examine the evidence supporting delusional beliefs without direct confrontation.",
      },
    ],
  },
  Surgery: {
    label: "Surgery",
    color: "#ffa94a",
    questions: [
      {
        q: "A 70-year-old undergoes an elective right hemicolectomy. On day 3, he develops fever, tachycardia and a rigid abdomen. CT shows free intra-abdominal air. What is the most likely diagnosis?",
        options: ["Paralytic ileus", "Anastomotic leak", "Pulmonary embolism", "Wound infection"],
        answer: 1,
        explanation: "Free intra-abdominal air with peritonism on day 3 post-colectomy is anastomotic leak until proven otherwise. This requires urgent surgical exploration.",
      },
      {
        q: "Which nerve is at risk during a posterior approach to the hip in total hip replacement, presenting as foot drop post-operatively?",
        options: ["Femoral nerve", "Sciatic nerve", "Obturator nerve", "Superior gluteal nerve"],
        answer: 1,
        explanation: "The sciatic nerve is at risk during the posterior approach to the hip. Damage to its peroneal division causes foot drop, the most common neurological complication of THR.",
      },
      {
        q: "A 35-year-old male presents with an acutely ischaemic leg — the 6 Ps are present. Doppler signals are absent. CT angiography shows an embolus at the femoral bifurcation. What is the first-line treatment?",
        options: ["IV heparin only and observe", "Catheter-directed thrombolysis", "Surgical embolectomy", "Amputation"],
        answer: 2,
        explanation: "Acute limb ischaemia with complete occlusion and no Doppler signals (Rutherford IIb/III) requires emergency surgical embolectomy rather than thrombolysis.",
      },
      {
        q: "In the classification of surgical wounds, a colorectal operation for perforated diverticulitis with faecal contamination is classified as:",
        options: ["Clean", "Clean-contaminated", "Contaminated", "Dirty"],
        answer: 3,
        explanation: "Dirty wounds involve established infection or faecal/purulent contamination at the time of surgery. Perforated diverticulitis with faecal spillage is classified as dirty.",
      },
      {
        q: "What is the Courvoisier's law, and in which condition is it classically positive?",
        options: ["Palpable gallbladder with jaundice suggests gallstones", "Palpable non-tender gallbladder with painless jaundice suggests malignancy", "Tender gallbladder with fever suggests cholangitis", "Distended gallbladder with RUQ pain suggests cholecystitis"],
        answer: 1,
        explanation: "Courvoisier's law states that a palpable, non-tender gallbladder in the presence of painless jaundice is unlikely due to gallstones and suggests carcinoma of the pancreatic head.",
      },
    ],
  },
};

// ── Curated medical YouTube video IDs ────────────────────────────────────────
const VIDEOS = [
  { id: "VEFYV0IXHF8", title: "How the Heart Works", channel: "Osmosis from Elsevier", topic: "Cardiology" },
  { id: "q7T0ytDMGSo", title: "Sepsis: Pathophysiology & Management", channel: "Ninja Nerd", topic: "Emergency" },
  { id: "8LpnLkTdgF0", title: "Diabetes Mellitus Type 1 & 2", channel: "Osmosis from Elsevier", topic: "Endocrinology" },
  { id: "l-DPJM8ap1I", title: "Acute Kidney Injury (AKI)", channel: "Ninja Nerd", topic: "Nephrology" },
  { id: "OhJKm9uOwbE", title: "Pneumonia: Causes, Diagnosis & Treatment", channel: "Osmosis from Elsevier", topic: "Respiratory" },
  { id: "G9bSNc3V-to", title: "Stroke — Ischaemic & Haemorrhagic", channel: "Osmosis from Elsevier", topic: "Neurology" },
];

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
    }}>{children}</div>
  );
}

// ── QUIZ COMPONENT ────────────────────────────────────────────────────────────
function MedicalQuiz() {
  const [specialty, setSpecialty] = useState(null);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showExp, setShowExp] = useState(false);

  const startQuiz = (key) => {
    setSpecialty(key);
    setQIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setShowExp(false);
  };

  const handleAnswer = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowExp(true);
    if (idx === QUIZ_DATA[specialty].questions[qIndex].answer) setScore(s => s + 1);
  };

  const next = () => {
    const qs = QUIZ_DATA[specialty].questions;
    if (qIndex + 1 >= qs.length) { setFinished(true); return; }
    setQIndex(i => i + 1);
    setSelected(null);
    setShowExp(false);
  };

  const accentColor = specialty ? QUIZ_DATA[specialty].color : "#c9a96e";

  if (!specialty) return (
    <div>
      <p className="sans" style={{ color: "rgba(245,240,235,0.6)", marginBottom: "36px", fontSize: "15px", lineHeight: 1.7 }}>
        Select your medical specialty below. Questions are designed for qualified clinicians and medical professionals — they require specialist knowledge beyond general awareness.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
        {Object.entries(QUIZ_DATA).map(([key, val]) => (
          <button key={key} onClick={() => startQuiz(key)} style={{
            background: "rgba(255,255,255,0.04)", border: `1px solid ${val.color}40`,
            padding: "28px 20px", cursor: "pointer", textAlign: "left",
            transition: "all 0.3s", color: "#f5f0eb",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = `${val.color}15`; e.currentTarget.style.borderColor = val.color; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = `${val.color}40`; }}
          >
            <div style={{ width: "10px", height: "10px", background: val.color, marginBottom: "16px" }} />
            <div style={{ fontSize: "18px", fontWeight: "400", marginBottom: "6px" }}>{val.label}</div>
            <div className="sans" style={{ fontSize: "12px", color: "rgba(245,240,235,0.4)", letterSpacing: "0.05em" }}>5 specialist questions</div>
          </button>
        ))}
      </div>
    </div>
  );

  if (finished) {
    const total = QUIZ_DATA[specialty].questions.length;
    const pct = Math.round((score / total) * 100);
    return (
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <div style={{ fontSize: "64px", fontWeight: "300", color: accentColor, marginBottom: "8px" }}>{score}/{total}</div>
        <div className="sans" style={{ fontSize: "14px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,240,235,0.5)", marginBottom: "24px" }}>
          {pct >= 80 ? "Excellent clinical knowledge" : pct >= 60 ? "Good — review the explanations" : "Keep studying — review the notes"}
        </div>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => startQuiz(specialty)} style={{ border: `1px solid ${accentColor}`, background: "transparent", color: accentColor, padding: "12px 28px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", transition: "all 0.3s" }}>Retry</button>
          <button onClick={() => setSpecialty(null)} style={{ border: "1px solid rgba(245,240,235,0.25)", background: "transparent", color: "#f5f0eb", padding: "12px 28px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", transition: "all 0.3s" }}>Change Specialty</button>
        </div>
      </div>
    );
  }

  const q = QUIZ_DATA[specialty].questions[qIndex];
  const total = QUIZ_DATA[specialty].questions.length;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <span className="sans" style={{ fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", color: accentColor }}>{QUIZ_DATA[specialty].label}</span>
        <span className="sans" style={{ fontSize: "12px", color: "rgba(245,240,235,0.4)" }}>Question {qIndex + 1} of {total}</span>
      </div>
      <div style={{ width: "100%", height: "2px", background: "rgba(255,255,255,0.08)", marginBottom: "36px", borderRadius: "1px" }}>
        <div style={{ width: `${((qIndex + 1) / total) * 100}%`, height: "100%", background: accentColor, transition: "width 0.4s ease" }} />
      </div>
      <p style={{ fontSize: "clamp(16px, 2vw, 20px)", lineHeight: 1.6, marginBottom: "32px", fontWeight: "300" }}>{q.q}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
        {q.options.map((opt, i) => {
          let bg = "rgba(255,255,255,0.04)";
          let borderColor = "rgba(245,240,235,0.12)";
          if (selected !== null) {
            if (i === q.answer) { bg = "rgba(74,201,126,0.12)"; borderColor = "#4ac97e"; }
            else if (i === selected && i !== q.answer) { bg = "rgba(255,74,74,0.12)"; borderColor = "#ff4a4a"; }
          }
          return (
            <button key={i} onClick={() => handleAnswer(i)} style={{
              background: bg, border: `1px solid ${borderColor}`,
              padding: "18px 20px", textAlign: "left", cursor: selected !== null ? "default" : "pointer",
              color: "#f5f0eb", fontFamily: "'DM Sans', sans-serif", fontSize: "15px",
              transition: "all 0.25s", display: "flex", gap: "14px", alignItems: "flex-start",
            }}>
              <span style={{ color: accentColor, fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", lineHeight: 1, minWidth: "20px" }}>{String.fromCharCode(65 + i)}.</span>
              {opt}
            </button>
          );
        })}
      </div>
      {showExp && (
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(245,240,235,0.1)", padding: "20px 24px", marginBottom: "24px" }}>
          <div className="sans" style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: accentColor, marginBottom: "8px" }}>Clinical Note</div>
          <p className="sans" style={{ fontSize: "14px", lineHeight: 1.7, color: "rgba(245,240,235,0.75)" }}>{q.explanation}</p>
        </div>
      )}
      {selected !== null && (
        <button onClick={next} style={{
          border: `1px solid ${accentColor}`, background: accentColor, color: "#0a0a0a",
          padding: "14px 32px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
          fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", transition: "all 0.3s",
        }}>
          {qIndex + 1 >= total ? "See Results" : "Next Question"}
        </button>
      )}
    </div>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────
export default function EMrzaseHopeLtd() {
  const [scrolled, setScrolled] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif", background: "#0a0a0a", color: "#f5f0eb", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:#0a0a0a}
        ::-webkit-scrollbar-thumb{background:#c9a96e;border-radius:2px}
        .sans{font-family:'DM Sans',sans-serif}
        .gold{color:#c9a96e}
        .nav-link{cursor:pointer;font-family:'DM Sans',sans-serif;font-size:13px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(245,240,235,0.7);transition:color 0.3s}
        .nav-link:hover{color:#c9a96e}
        .btn{display:inline-block;font-family:'DM Sans',sans-serif;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;padding:15px 34px;border:1px solid #c9a96e;color:#c9a96e;background:transparent;cursor:pointer;transition:all 0.3s}
        .btn:hover{background:#c9a96e;color:#0a0a0a}
        .btn-solid{background:#c9a96e;color:#0a0a0a}
        .btn-solid:hover{background:transparent;color:#c9a96e}
        .service-card{position:relative;overflow:hidden}
        .service-card img{width:100%;height:400px;object-fit:cover;display:block;filter:brightness(0.5);transition:all 0.6s}
        .service-card:hover img{transform:scale(1.05);filter:brightness(0.4)}
        .svc-overlay{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;padding:32px;background:linear-gradient(to top,rgba(0,0,0,0.92) 0%,rgba(0,0,0,0.35) 55%,transparent 100%)}
        .input-field{width:100%;background:rgba(255,255,255,0.04);border:none;border-bottom:1px solid rgba(245,240,235,0.2);padding:15px 4px;font-family:'DM Sans',sans-serif;font-size:15px;color:#f5f0eb;outline:none;transition:border-color 0.3s}
        .input-field::placeholder{color:rgba(245,240,235,0.3)}
        .input-field:focus{border-bottom-color:#c9a96e}
        .vid-card{position:relative;cursor:pointer;overflow:hidden}
        .vid-card img{width:100%;height:200px;object-fit:cover;display:block;filter:brightness(0.7);transition:all 0.4s}
        .vid-card:hover img{filter:brightness(0.5);transform:scale(1.04)}
        .vid-play{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:52px;height:52px;background:rgba(201,169,110,0.9);border-radius:50%;display:flex;align-items:center;justify-content:center;transition:all 0.3s}
        .vid-card:hover .vid-play{background:#c9a96e;transform:translate(-50%,-50%) scale(1.1)}
        @media(max-width:768px){
          .grid2{grid-template-columns:1fr !important}
          .grid3{grid-template-columns:1fr !important}
          .grid4{grid-template-columns:1fr 1fr !important}
          .navlinks{display:none}
          .hero-h{font-size:clamp(48px,14vw,80px) !important}
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: "70px", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(10,10,10,0.96)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(201,169,110,0.15)" : "none",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        transition: "all 0.4s",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "34px", height: "34px", background: "#c9a96e", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: "600", color: "#0a0a0a", letterSpacing: "0.05em" }}>EM</div>
          <div>
            <div style={{ fontSize: "17px", fontWeight: "500", letterSpacing: "0.04em", lineHeight: 1.1 }}>Emrzase Hope</div>
            <div className="sans" style={{ fontSize: "9px", color: "rgba(245,240,235,0.4)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Ltd · Co. 16791155</div>
          </div>
        </div>
        <div className="navlinks" style={{ display: "flex", gap: "36px", alignItems: "center" }}>
          {NAV_LINKS.map(l => <span key={l} className="nav-link" onClick={() => scrollTo(l)}>{l}</span>)}
          <button className="btn" style={{ padding: "9px 22px", fontSize: "11px" }} onClick={() => scrollTo("Contact")}>Get In Touch</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="home" style={{ position: "relative", height: "100vh", minHeight: "680px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80" alt="Medical practice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", filter: "brightness(0.3)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(10,10,10,0.1) 0%,rgba(10,10,10,0.55) 65%,rgba(10,10,10,1) 100%)" }} />
        <div style={{ position: "relative", textAlign: "center", padding: "0 24px", maxWidth: "920px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", marginBottom: "28px" }}>
            <div style={{ width: "36px", height: "1px", background: "#c9a96e" }} />
            <span className="sans gold" style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase" }}>Blackburn, England · Incorporated 2025</span>
            <div style={{ width: "36px", height: "1px", background: "#c9a96e" }} />
          </div>
          <h1 className="hero-h" style={{ fontSize: "clamp(52px, 9vw, 100px)", fontWeight: "300", lineHeight: 1.0, letterSpacing: "-0.02em", marginBottom: "24px" }}>
            Emrzase Hope Ltd<br /><em style={{ color: "#c9a96e", fontStyle: "italic" }}>General Medical Practice</em>
          </h1>
          <p className="sans" style={{ fontSize: "16px", lineHeight: 1.8, color: "rgba(245,240,235,0.65)", maxWidth: "580px", margin: "0 auto 44px", fontWeight: "300" }}>
            A registered UK medical practice based in Blackburn, dedicated to delivering high-quality general medical care with compassion, integrity and clinical excellence.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn btn-solid sans" onClick={() => scrollTo("Services")}>Our Services</button>
            <button className="btn sans" onClick={() => scrollTo("Quiz")}>Medical Quiz</button>
          </div>
        </div>
      </section>

      {/* ── COMPANY FACTS STRIP ── */}
      <section style={{ background: "#0f0f0f", borderTop: "1px solid rgba(201,169,110,0.15)", borderBottom: "1px solid rgba(201,169,110,0.15)", padding: "0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap" }}>
          {[
            { label: "Company Number", val: "16791155" },
            { label: "Status", val: "Active" },
            { label: "Incorporated", val: "16 Oct 2025" },
            { label: "Registered Address", val: "Blackburn, BB1 1RB" },
            { label: "SIC Code", val: "86210 — General Medical Practice" },
          ].map((f, i) => (
            <div key={f.label} style={{ flex: "1 1 180px", padding: "28px 32px", borderLeft: i > 0 ? "1px solid rgba(201,169,110,0.12)" : "none", minWidth: "160px" }}>
              <div className="sans" style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,235,0.35)", marginBottom: "6px" }}>{f.label}</div>
              <div className="sans" style={{ fontSize: "14px", color: "#f5f0eb", fontWeight: "400" }}>{f.val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "110px 40px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center" }} className="grid2">
          <FadeIn>
            <div style={{ position: "relative" }}>
              <img src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80" alt="Medical team" style={{ width: "100%", height: "540px", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", bottom: "-20px", right: "-20px", background: "#c9a96e", padding: "28px 32px" }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "38px", fontWeight: "300", color: "#0a0a0a", lineHeight: 1 }}>SIC</div>
                <div className="sans" style={{ fontSize: "11px", letterSpacing: "0.08em", color: "rgba(0,0,0,0.65)", marginTop: "4px" }}>86210 — Medical Practice</div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={140}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <div style={{ width: "38px", height: "1.5px", background: "#c9a96e" }} />
                <span className="sans gold" style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase" }}>About The Company</span>
              </div>
              <h2 style={{ fontSize: "clamp(32px, 4vw, 50px)", fontWeight: "300", lineHeight: 1.15, marginBottom: "24px" }}>
                Registered UK Medical<br /><em style={{ color: "#c9a96e", fontStyle: "italic" }}>Practice in Blackburn</em>
              </h2>
              <p className="sans" style={{ fontSize: "15px", lineHeight: 1.85, color: "rgba(245,240,235,0.62)", marginBottom: "18px", fontWeight: "300" }}>
                Emrzase Hope Ltd (Company No. 16791155) is a private limited company incorporated on 16 October 2025, registered at 28 Copperfield Street, Blackburn, England, BB1 1RB. The company operates under SIC code 86210 — General Medical Practice Activities.
              </p>
              <p className="sans" style={{ fontSize: "15px", lineHeight: 1.85, color: "rgba(245,240,235,0.62)", marginBottom: "32px", fontWeight: "300" }}>
                The company is directed by two verified medical professionals: Dr. Emad Elsayed Hassan Ali, appointed on incorporation, and Dr. Mariam Mohamed Elmamoon Yehia Zakaria, appointed January 2026. Both directors are British nationals, resident in England, and identity-verified through Companies House via ACE Business Advice Ltd ACSP.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "36px" }}>
                {["Companies House verified — Active status", "Two qualified medical directors", "General medical practice activities (SIC 86210)", "Registered in Blackburn, Lancashire"].map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div style={{ width: "18px", height: "18px", border: "1px solid #c9a96e", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <div style={{ width: "7px", height: "7px", background: "#c9a96e" }} />
                    </div>
                    <span className="sans" style={{ fontSize: "14px", color: "rgba(245,240,235,0.72)" }}>{item}</span>
                  </div>
                ))}
              </div>
              <button className="btn sans" onClick={() => scrollTo("Contact")}>Contact Us</button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── DIRECTORS ── */}
      <section style={{ background: "#0d0d0d", padding: "80px 40px", borderTop: "1px solid rgba(201,169,110,0.1)" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{ width: "36px", height: "1px", background: "#c9a96e" }} />
              <span className="sans gold" style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase" }}>Company Directors</span>
              <div style={{ width: "36px", height: "1px", background: "#c9a96e" }} />
            </div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 46px)", fontWeight: "300" }}>
              Verified by <em style={{ color: "#c9a96e", fontStyle: "italic" }}>Companies House</em>
            </h2>
          </div>
        </FadeIn>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }} className="grid2">
          {COMPANY.directors.map((d, i) => (
            <FadeIn key={d.name} delay={i * 120}>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,169,110,0.15)", padding: "36px 32px" }}>
                <div style={{ width: "48px", height: "48px", background: "#c9a96e", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans',sans-serif", fontSize: "14px", fontWeight: "600", color: "#0a0a0a", marginBottom: "20px" }}>
                  {d.name.split(" ").filter((_, j) => j > 0).map(n => n[0]).slice(0, 2).join("")}
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: "400", marginBottom: "6px" }}>{d.name}</h3>
                <div className="sans" style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#c9a96e", marginBottom: "20px" }}>{d.role}</div>
                <div style={{ borderTop: "1px solid rgba(245,240,235,0.08)", paddingTop: "18px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {[["Appointed", d.appointed], ["Nationality", "British"], ["Residence", "England"], ["Identity", "Verified ✓"]].map(([k, v]) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between" }}>
                      <span className="sans" style={{ fontSize: "12px", color: "rgba(245,240,235,0.38)" }}>{k}</span>
                      <span className="sans" style={{ fontSize: "12px", color: v === "Verified ✓" ? "#4ac97e" : "rgba(245,240,235,0.72)" }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: "110px 40px", background: "#0a0a0a" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{ width: "36px", height: "1px", background: "#c9a96e" }} />
              <span className="sans gold" style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase" }}>What We Offer</span>
              <div style={{ width: "36px", height: "1px", background: "#c9a96e" }} />
            </div>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: "300", letterSpacing: "-0.02em" }}>
              Our <em style={{ color: "#c9a96e", fontStyle: "italic" }}>Services</em>
            </h2>
          </div>
        </FadeIn>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2px" }} className="grid2">
          {SERVICES.map((s, i) => (
            <FadeIn key={s.title} delay={i * 70}>
              <div className="service-card">
                <img src={s.img} alt={s.title} />
                <div className="svc-overlay">
                  <div className="sans" style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#c9a96e", marginBottom: "10px", padding: "4px 10px", border: "1px solid rgba(201,169,110,0.4)", display: "inline-block" }}>{s.tag}</div>
                  <h3 style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: "300", marginBottom: "10px" }}>{s.title}</h3>
                  <p className="sans" style={{ fontSize: "14px", lineHeight: 1.65, color: "rgba(245,240,235,0.68)", fontWeight: "300" }}>{s.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── MEDICAL VIDEOS ── */}
      <section id="videos" style={{ padding: "110px 40px", background: "#0d0d0d", borderTop: "1px solid rgba(201,169,110,0.1)" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{ width: "36px", height: "1px", background: "#c9a96e" }} />
              <span className="sans gold" style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase" }}>Medical Education</span>
              <div style={{ width: "36px", height: "1px", background: "#c9a96e" }} />
            </div>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: "300", letterSpacing: "-0.02em" }}>
              Clinical <em style={{ color: "#c9a96e", fontStyle: "italic" }}>Learning Videos</em>
            </h2>
            <p className="sans" style={{ fontSize: "15px", color: "rgba(245,240,235,0.5)", marginTop: "16px", maxWidth: "500px", margin: "16px auto 0", lineHeight: 1.7 }}>Curated educational content covering key topics in clinical medicine — ideal for students, trainees and qualified clinicians.</p>
          </div>
        </FadeIn>

        {activeVideo && (
          <div style={{ maxWidth: "860px", margin: "0 auto 48px" }}>
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, background: "#000" }}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo}?autoplay=1&rel=0`}
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Medical education video"
              />
            </div>
            <button onClick={() => setActiveVideo(null)} className="sans" style={{ marginTop: "12px", background: "none", border: "1px solid rgba(245,240,235,0.2)", color: "rgba(245,240,235,0.5)", padding: "8px 20px", cursor: "pointer", fontSize: "12px", letterSpacing: "0.1em" }}>✕ Close Video</button>
          </div>
        )}

        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }} className="grid3">
          {VIDEOS.map((v, i) => {
            const TOPIC_COLORS = { Cardiology: "#ff6b6b", Emergency: "#ff4a4a", Endocrinology: "#4a9eff", Nephrology: "#4ac97e", Respiratory: "#a78bfa", Neurology: "#fbbf24" };
            const tc = TOPIC_COLORS[v.topic] || "#c9a96e";
            return (
              <FadeIn key={v.id} delay={i * 60}>
                <div
                  onClick={() => setActiveVideo(v.id)}
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(245,240,235,0.08)", padding: "32px 28px", cursor: "pointer", transition: "all 0.3s", position: "relative", overflow: "hidden" }}
                  onMouseEnter={e => { e.currentTarget.style.border = `1px solid ${tc}50`; e.currentTarget.style.background = `${tc}08`; }}
                  onMouseLeave={e => { e.currentTarget.style.border = "1px solid rgba(245,240,235,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                >
                  <div style={{ width: "48px", height: "48px", background: `${tc}20`, border: `1px solid ${tc}40`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={tc}><polygon points="5,3 19,12 5,21" /></svg>
                  </div>
                  <div className="sans" style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: tc, marginBottom: "8px" }}>{v.topic}</div>
                  <div style={{ fontSize: "18px", fontWeight: "400", lineHeight: 1.3, marginBottom: "10px" }}>{v.title}</div>
                  <div className="sans" style={{ fontSize: "12px", color: "rgba(245,240,235,0.4)" }}>{v.channel}</div>
                  <div className="sans" style={{ fontSize: "11px", color: tc, marginTop: "20px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Watch on YouTube ↗</div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* ── MEDICAL QUIZ ── */}
      <section id="quiz" style={{ padding: "110px 40px", background: "#0a0a0a", borderTop: "1px solid rgba(201,169,110,0.1)" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "60px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "16px" }}>
                <div style={{ width: "36px", height: "1px", background: "#c9a96e" }} />
                <span className="sans gold" style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase" }}>Test Your Knowledge</span>
                <div style={{ width: "36px", height: "1px", background: "#c9a96e" }} />
              </div>
              <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: "300", letterSpacing: "-0.02em" }}>
                Medical <em style={{ color: "#c9a96e", fontStyle: "italic" }}>Specialist Quiz</em>
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(201,169,110,0.15)", padding: "48px 44px" }}>
              <MedicalQuiz />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "110px 40px", background: "#0d0d0d", borderTop: "1px solid rgba(201,169,110,0.1)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "start" }} className="grid2">
          <FadeIn>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <div style={{ width: "36px", height: "1px", background: "#c9a96e" }} />
                <span className="sans gold" style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase" }}>Get In Touch</span>
              </div>
              <h2 style={{ fontSize: "clamp(30px, 4vw, 48px)", fontWeight: "300", lineHeight: 1.2, marginBottom: "22px" }}>
                Contact<br /><em style={{ color: "#c9a96e", fontStyle: "italic" }}>Emrzase Hope Ltd</em>
              </h2>
              <p className="sans" style={{ fontSize: "15px", lineHeight: 1.85, color: "rgba(245,240,235,0.58)", marginBottom: "44px", fontWeight: "300" }}>
                To enquire about our general medical practice services or to get in touch with our directors, please use the form or contact details below.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "26px" }}>
                {[
                  { icon: "📍", label: "Registered Address", val: "28 Copperfield Street, Blackburn, England, BB1 1RB" },
                  { icon: "🏢", label: "Company Number", val: "16791155 (Companies House)" },
                  { icon: "⚕️", label: "Business Type", val: "General Medical Practice (SIC 86210)" },
                  { icon: "📅", label: "Incorporated", val: "16 October 2025" },
                ].map(c => (
                  <div key={c.label} style={{ display: "flex", gap: "18px", alignItems: "flex-start" }}>
                    <div style={{ fontSize: "16px", marginTop: "2px" }}>{c.icon}</div>
                    <div>
                      <div className="sans" style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,240,235,0.35)", marginBottom: "3px" }}>{c.label}</div>
                      <div className="sans" style={{ fontSize: "14px", color: "#f5f0eb" }}>{c.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={140}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <div style={{ fontSize: "44px", marginBottom: "18px", color: "#c9a96e" }}>✦</div>
                <h3 style={{ fontSize: "30px", fontWeight: "300", marginBottom: "10px" }}>Message sent.</h3>
                <p className="sans" style={{ color: "rgba(245,240,235,0.5)", fontSize: "14px" }}>We'll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                <input className="input-field sans" type="text" placeholder="Your Name" required value={formState.name} onChange={e => setFormState({ ...formState, name: e.target.value })} />
                <input className="input-field sans" type="email" placeholder="Your Email" required value={formState.email} onChange={e => setFormState({ ...formState, email: e.target.value })} />
                <textarea className="input-field sans" rows="5" placeholder="Your Message" required value={formState.message} style={{ resize: "none" }} onChange={e => setFormState({ ...formState, message: e.target.value })} />
                <button type="submit" className="btn btn-solid sans" style={{ alignSelf: "flex-start", padding: "15px 44px" }}>Send Message</button>
              </form>
            )}
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#080808", borderTop: "1px solid rgba(201,169,110,0.1)", padding: "52px 40px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "32px", marginBottom: "36px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <div style={{ width: "30px", height: "30px", background: "#c9a96e", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: "600", color: "#0a0a0a" }}>EM</div>
                <span style={{ fontSize: "17px", fontWeight: "400" }}>Emrzase Hope Ltd</span>
              </div>
              <p className="sans" style={{ fontSize: "12px", color: "rgba(245,240,235,0.3)", lineHeight: 1.6, maxWidth: "280px" }}>
                Company No. 16791155 · Registered in England and Wales<br />28 Copperfield Street, Blackburn, BB1 1RB<br />SIC 86210 — General Medical Practice Activities
              </p>
            </div>
            <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
              {NAV_LINKS.map(l => <span key={l} className="nav-link" onClick={() => scrollTo(l)} style={{ fontSize: "12px" }}>{l}</span>)}
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(245,240,235,0.06)", paddingTop: "24px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
            <p className="sans" style={{ fontSize: "11px", color: "rgba(245,240,235,0.2)" }}>© {new Date().getFullYear()} Emrzase Hope Ltd. All rights reserved.</p>
            <p className="sans" style={{ fontSize: "11px", color: "rgba(245,240,235,0.2)" }}>Incorporated 16 October 2025 · Active · Companies House Verified</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
