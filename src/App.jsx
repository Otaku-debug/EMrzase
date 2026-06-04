import { useState, useEffect, useRef, useCallback } from "react";

// ─── COMPANY DATA (Companies House No. 16791155) ───────────────────────────
const COMPANY = {
  name: "EMRZASE HOPE LTD",
  number: "16791155",
  address: "28 Copperfield Street, Blackburn, England, BB1 1RB",
  incorporated: "16 October 2025",
  sic: "86210 – General Medical Practice Activities",
  directors: [
    { name: "Dr. Emad Elsayed Hassan Ali", role: "Director", appointed: "16 October 2025" },
    { name: "Dr. Mariam Mohamed Elmamoon Yehia Zakaria", role: "Director", appointed: "20 January 2026" },
  ],
};

// ─── NAVIGATION ───────────────────────────────────────────────────────────
const NAV_LINKS = ["Home", "About", "Services", "Videos", "Quiz", "Contact"];

// ─── SERVICES ─────────────────────────────────────────────────────────────
const SERVICES = [
  { title: "General Medical Practice", desc: "Registered under SIC 86210, delivering professional general medical practice activities and clinical care.", tag: "Core Service", img: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80" },
  { title: "Primary Healthcare", desc: "Comprehensive primary care services focused on prevention, diagnosis and treatment from our Blackburn base.", tag: "Primary Care", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80" },
  { title: "Patient Consultations", desc: "Professional patient-centred consultations delivered with clinical rigour and genuine compassion.", tag: "Consultations", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80" },
  { title: "Health Assessments", desc: "Thorough health assessments and medical evaluations carried out by our experienced, Companies House verified directors.", tag: "Assessments", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&q=80" },
];

// ─── 30 VIDEOS ────────────────────────────────────────────────────────────
const VIDEOS = [
  { id: "Gsu8NT1yYes", title: "Congestive Heart Failure", channel: "Ninja Nerd", topic: "Cardiology" },
  { id: "8Yv3VfAS9sU", title: "Septic Shock Pathophysiology", channel: "Ninja Nerd", topic: "Emergency Medicine" },
  { id: "rh8ycjPCj18", title: "Diabetes Mellitus Type 1 & 2", channel: "Ninja Nerd", topic: "Endocrinology" },
  { id: "EgGOwekD1O8", title: "Acute Kidney Injury", channel: "Ninja Nerd", topic: "Nephrology" },
  { id: "lzyUVVOqyS0", title: "Pneumonia Overview", channel: "Ninja Nerd", topic: "Respiratory" },
  { id: "7lpqxDEfszY", title: "Ischaemic & Haemorrhagic Stroke", channel: "Ninja Nerd", topic: "Neurology" },
  { id: "VEpBk8OEVsA", title: "Hypertension Pathophysiology", channel: "Ninja Nerd", topic: "Cardiology" },
  { id: "4A9SBnkNgq8", title: "Acute Appendicitis", channel: "Ninja Nerd", topic: "Surgery" },
  { id: "9TMBK7jFATs", title: "Asthma Pathophysiology & Treatment", channel: "Ninja Nerd", topic: "Respiratory" },
  { id: "e5XSGmeCaW4", title: "Chronic Kidney Disease", channel: "Ninja Nerd", topic: "Nephrology" },
  { id: "FPaOBhkuIhk", title: "Hypothyroidism & Hyperthyroidism", channel: "Ninja Nerd", topic: "Endocrinology" },
  { id: "bfAE52gJWNE", title: "Pulmonary Embolism", channel: "Ninja Nerd", topic: "Respiratory" },
  { id: "AhDqM2a2sBk", title: "Myocardial Infarction", channel: "Ninja Nerd", topic: "Cardiology" },
  { id: "2DJNnTKTols", title: "Liver Cirrhosis", channel: "Ninja Nerd", topic: "Gastroenterology" },
  { id: "IFpDqfcFkvo", title: "Urinary Tract Infections", channel: "Ninja Nerd", topic: "Urology" },
  { id: "TFoHaVHknLI", title: "Rheumatoid Arthritis", channel: "Ninja Nerd", topic: "Rheumatology" },
  { id: "vkXuFBBOHHo", title: "Bipolar Disorder", channel: "Ninja Nerd", topic: "Psychiatry" },
  { id: "T_tTBBuIqlw", title: "Meningitis & Encephalitis", channel: "Ninja Nerd", topic: "Neurology" },
  { id: "j_xPJBQYDy4", title: "Iron Deficiency Anaemia", channel: "Ninja Nerd", topic: "Haematology" },
  { id: "nKHMDLvTMFY", title: "Pancreatitis", channel: "Ninja Nerd", topic: "Gastroenterology" },
  { id: "LGkfqL5GIAM", title: "Deep Vein Thrombosis", channel: "Ninja Nerd", topic: "Vascular" },
  { id: "kBsWfEfQDIE", title: "Schizophrenia", channel: "Ninja Nerd", topic: "Psychiatry" },
  { id: "p8bX7c2QqEA", title: "Crohn's Disease & Ulcerative Colitis", channel: "Ninja Nerd", topic: "Gastroenterology" },
  { id: "BtGKsCEtDWs", title: "Osteoporosis", channel: "Ninja Nerd", topic: "Rheumatology" },
  { id: "NUKkYiCZhY4", title: "Atrial Fibrillation", channel: "Ninja Nerd", topic: "Cardiology" },
  { id: "7XGinepFdtY", title: "Epilepsy & Seizures", channel: "Ninja Nerd", topic: "Neurology" },
  { id: "6bCnSfJUPME", title: "Glomerulonephritis", channel: "Ninja Nerd", topic: "Nephrology" },
  { id: "hAhJoAzZQEc", title: "Addison's & Cushing's Disease", channel: "Ninja Nerd", topic: "Endocrinology" },
  { id: "FP8GHlkG2nQ", title: "Community Acquired Pneumonia", channel: "Ninja Nerd", topic: "Respiratory" },
  { id: "QV9TqnJL7gQ", title: "Sepsis Recognition & Management", channel: "Ninja Nerd", topic: "Emergency Medicine" },
];

const TOPIC_COLORS = {
  "Cardiology": "#ef4444", "Emergency Medicine": "#f97316", "Endocrinology": "#3b82f6",
  "Nephrology": "#22c55e", "Respiratory": "#8b5cf6", "Neurology": "#eab308",
  "Surgery": "#ec4899", "Gastroenterology": "#14b8a6", "Urology": "#06b6d4",
  "Rheumatology": "#a855f7", "Psychiatry": "#d946ef", "Haematology": "#f43f5e",
  "Vascular": "#0ea5e9",
};

// ─── 30 SPECIALTIES × 10 QUESTIONS EACH ──────────────────────────────────
const QUIZ_DATA = {
  "General Practice": {
    color: "#4a9eff",
    questions: [
      { q: "A 58-year-old on ramipril presents with a dry persistent cough. BNP is 180 pg/mL. No signs of heart failure decompensation. What is the most appropriate next step?", options: ["Add furosemide", "Switch to losartan", "Stop ramipril, add bisoprolol", "Request echocardiogram urgently"], answer: 1, exp: "ACE inhibitor-induced cough occurs in up to 20% of patients. Switching to an ARB (losartan) is the appropriate next step as ARBs don't cause bradykinin-mediated cough." },
      { q: "A 45-year-old with T2DM has HbA1c 78 mmol/mol on metformin 1g BD. eGFR is 55. Which is the most appropriate add-on therapy per NICE NG28?", options: ["Glibenclamide", "Empagliflozin", "Pioglitazone", "Exenatide"], answer: 1, exp: "SGLT2 inhibitors like empagliflozin have proven cardiovascular and renal protective benefits and are NICE preferred second-line agents in T2DM with adequate eGFR (>45)." },
      { q: "A 72-year-old woman is started on alendronate for osteoporosis. Which co-prescription is mandatory?", options: ["Calcitonin", "Calcium and vitamin D", "Thiazide diuretic", "Strontium ranelate"], answer: 1, exp: "Calcium and vitamin D supplementation is required alongside bisphosphonate therapy to prevent hypocalcaemia and ensure adequate mineralisation." },
      { q: "A patient's 10-year QRISK3 score is 14%. They have no contraindications. Per NICE CG181, what should be offered?", options: ["Diet and exercise only", "Atorvastatin 20mg", "Atorvastatin 80mg", "Rosuvastatin 40mg"], answer: 1, exp: "NICE recommends atorvastatin 20mg for primary prevention when QRISK3 ≥10%. Atorvastatin 80mg is for secondary prevention or high-risk primary prevention." },
      { q: "A 34-year-old woman on COCP develops a sudden severe headache — worst of her life. GCS 15, no focal neurology. What is the immediate management priority?", options: ["Stop COCP only", "CT head then lumbar puncture if CT normal", "MRI brain", "Refer neurology outpatient"], answer: 1, exp: "Thunderclap headache requires urgent CT head to exclude subarachnoid haemorrhage. If CT is negative but suspicion remains, LP at 12 hours post-onset for xanthochromia." },
      { q: "A 62-year-old smoker presents with haematuria. MSU shows no infection. eGFR 72. What is the next appropriate step?", options: ["Repeat MSU in 2 weeks", "Urgent 2-week-wait urology referral", "Renal USS only", "Start empirical antibiotics"], answer: 1, exp: "Visible haematuria in a patient over 45 with no infection requires urgent 2WW urology referral to exclude bladder/renal malignancy per NICE NG12." },
      { q: "Which BP target is recommended by NICE for a 68-year-old with T2DM and established cardiovascular disease?", options: ["<150/90", "<140/90", "<130/80", "<120/70"], answer: 2, exp: "NICE recommends a BP target of <130/80 mmHg for patients with diabetes and established CVD, to reduce macrovascular and microvascular complications." },
      { q: "A 28-year-old woman presents at 10 weeks gestation with TSH 0.02 mIU/L and free T4 elevated. She is asymptomatic. Most likely diagnosis?", options: ["Graves' disease requiring carbimazole", "Gestational thyrotoxicosis — monitor", "Toxic adenoma", "Subacute thyroiditis"], answer: 1, exp: "Gestational thyrotoxicosis is caused by hCG cross-stimulating TSH receptors. It's transient, typically resolves by 20 weeks, and does not require antithyroid drugs unless symptomatic Graves' is confirmed." },
      { q: "A patient is found to have a random blood glucose of 12.1 mmol/L. They are asymptomatic. How many further tests confirm diabetes?", options: ["None — one result sufficient if symptomatic", "One further abnormal fasting or HbA1c ≥48", "Two further tests on different days", "HbA1c only required"], answer: 1, exp: "In asymptomatic patients, a single random glucose is insufficient. One further confirmatory test (fasting glucose ≥7, random ≥11.1, or HbA1c ≥48) on a different day is required." },
      { q: "A patient on lithium reports polyuria, polydipsia and tremor. Lithium level is 0.9 mmol/L. Creatinine has risen 20% from baseline. What is the most appropriate action?", options: ["Increase lithium dose", "Reduce dose and recheck renal function in 1 week", "Stop lithium immediately", "Add amiloride for nephrogenic DI and continue"], answer: 3, exp: "Lithium causes nephrogenic diabetes insipidus. Amiloride (potassium-sparing diuretic) is used to reduce lithium-induced polyuria without causing lithium retention, which thiazides would do." },
    ],
  },
  "Emergency Medicine": {
    color: "#ef4444",
    questions: [
      { q: "A trauma patient arrives with HR 128, BP 88/60, GCS 14, RR 26. What class of haemorrhagic shock is this?", options: ["Class I", "Class II", "Class III", "Class IV"], answer: 2, exp: "Class III haemorrhage (1500–2000ml, 30–40% blood volume loss) presents with HR >120, systolic BP drop, altered mental status and RR 30–40." },
      { q: "A patient in VF arrest has received 3 defibrillations and 2 doses of adrenaline. What drug is given next per ALS guidelines?", options: ["Lidocaine 100mg", "Amiodarone 300mg", "Magnesium sulphate 2g", "Sodium bicarbonate 50ml"], answer: 1, exp: "Amiodarone 300mg IV is given after the 3rd shock in shockable rhythms. A further 150mg can be given after the 5th shock." },
      { q: "A 55-year-old presents with PE confirmed on CTPA. BP is 95/60 and HR 118. Echo shows RV dilatation. What is the definitive treatment?", options: ["LMWH only", "Systemic thrombolysis with alteplase", "Fondaparinux", "Rivaroxaban alone"], answer: 1, exp: "Haemodynamically unstable PE (massive PE) with RV dysfunction is an indication for systemic thrombolysis (alteplase 100mg over 2 hours) unless contraindicated." },
      { q: "A 19-year-old is brought in with GCS 8 after a suspected paracetamol overdose 3 hours ago. Paracetamol level is not yet available. What is the immediate treatment?", options: ["Wait for blood results", "Activated charcoal if within 1 hour — too late now, observe", "Start IV acetylcysteine immediately", "Oral methionine"], answer: 2, exp: "IV acetylcysteine (Parvolex) should be started immediately in significant paracetamol overdose, particularly with reduced consciousness — don't wait for serum levels in severe presentations." },
      { q: "In rapid sequence induction for emergency intubation, which agent provides the fastest onset of paralysis?", options: ["Rocuronium 1.2mg/kg", "Suxamethonium 1.5mg/kg", "Vecuronium 0.1mg/kg", "Atracurium 0.5mg/kg"], answer: 1, exp: "Suxamethonium (succinylcholine) remains the fastest-onset neuromuscular blocker (45-60 seconds) and is the traditional agent for RSI, though high-dose rocuronium is an alternative." },
      { q: "A 7-year-old presents with stridor, drooling, high fever and tripod positioning. They appear toxic. What must you NOT do first?", options: ["Call senior immediately", "Arrange theatre urgently", "Lie the child flat to examine the throat", "Give high-flow oxygen"], answer: 2, exp: "This is epiglottitis until proven otherwise. Never examine the throat or distress the child — complete airway obstruction can occur. Urgent anaesthetic and ENT involvement is required." },
      { q: "A patient has hyperkalemia of 7.1 mmol/L with broad complex ECG changes. Which treatment acts fastest to stabilise the myocardium?", options: ["Calcium resonium", "IV calcium gluconate 10ml 10%", "Insulin/dextrose", "Salbutamol nebuliser"], answer: 1, exp: "IV calcium gluconate acts within minutes to stabilise the cardiac membrane. It does not lower potassium but immediately protects against arrhythmias. Definitive K+ lowering follows." },
      { q: "A patient presents with sudden-onset painless monocular visual loss described as a 'curtain falling'. What is the diagnosis?", options: ["Central retinal artery occlusion", "Retinal detachment", "Optic neuritis", "Vitreous haemorrhage"], answer: 1, exp: "Painless monocular visual loss like a curtain descending is classic for retinal detachment. It is an ophthalmic emergency requiring urgent surgical repair." },
      { q: "Which sign on a chest X-ray is most specific for tension pneumothorax requiring immediate needle decompression before imaging?", options: ["Tracheal deviation away from the affected side with absent breath sounds and haemodynamic compromise", "Bilateral hyperinflation", "Widened mediastinum", "Air bronchograms"], answer: 0, exp: "Tension pneumothorax is a clinical diagnosis: absent breath sounds, tracheal deviation away, hypotension, tachycardia and respiratory distress. Needle decompression should not wait for imaging." },
      { q: "A drowning victim is resuscitated and GCS recovers to 14. Temperature is 32°C. What is the priority intervention?", options: ["Immediate discharge if GCS recovers", "Active rewarming and 24-hour observation minimum", "CT head only", "Hypothermia protocol — target 33°C"], answer: 1, exp: "All drowning victims, even those who recover rapidly, require hospital admission for at least 24 hours due to risk of secondary drowning (delayed pulmonary oedema) and hypothermia management." },
    ],
  },
  "Paediatrics": {
    color: "#22c55e",
    questions: [
      { q: "A 6-week-old presents with projectile non-bilious vomiting and poor weight gain. An olive-shaped mass is palpable. Bloods show hypochloraemic hypokalaemic metabolic alkalosis. What is the definitive treatment?", options: ["IV fluids only", "Ramstedt pyloromyotomy after fluid resuscitation", "NG feeds", "Proton pump inhibitor"], answer: 1, exp: "Pyloric stenosis is treated surgically with Ramstedt pyloromyotomy. Fluid and electrolyte correction must occur first — operating on a hypokalaemic alkalotic infant risks cardiac arrhythmia." },
      { q: "A 2-year-old has a first afebrile seizure lasting 8 minutes. Post-ictally they are drowsy but recovering. No family history. EEG is normal. What is the management?", options: ["Start sodium valproate immediately", "No treatment — observe and follow up", "MRI brain urgently", "Lumbar puncture"], answer: 1, exp: "A single afebrile seizure in a neurologically normal child with a normal EEG does not necessarily require antiepileptic treatment. Observation with parental education and follow-up is appropriate." },
      { q: "A 3-month-old is brought in with poor feeding, lethargy and multiple healing rib fractures on CXR. Parents report no trauma. What must be done immediately?", options: ["Reassure parents and discharge", "Safeguarding referral and skeletal survey", "Physiotherapy referral", "Calcium and vitamin D supplementation"], answer: 1, exp: "Multiple rib fractures in a non-ambulatory infant without a credible mechanism is highly suspicious of non-accidental injury. Immediate safeguarding referral and skeletal survey are mandatory." },
      { q: "A 4-year-old presents with fever, refusal to weight bear and a warm swollen hip. WBC 18, CRP 90, ESR 45. Using Kocher criteria, what is the probability of septic arthritis?", options: ["<10%", "35–40%", "73%", ">99%"], answer: 3, exp: "4 Kocher criteria (fever, non-weight bearing, ESR >40, WBC >12) predicts >99% probability of septic arthritis. Urgent joint aspiration and washout is required." },
      { q: "Which congenital heart defect causes a 'boot-shaped' heart on CXR with cyanosis that worsens on crying?", options: ["Transposition of great arteries", "Tetralogy of Fallot", "Total anomalous pulmonary venous drainage", "Truncus arteriosus"], answer: 1, exp: "Tetralogy of Fallot (VSD, overriding aorta, RVOTO, RVH) causes cyanotic spells. The boot-shaped heart reflects RVH. Crying increases PVR, worsening right-to-left shunt." },
      { q: "A 10-month-old presents with sudden onset colicky pain, drawing up of knees and redcurrant jelly stools. What is the investigation of choice?", options: ["Plain abdominal X-ray", "Air enema — both diagnostic and therapeutic", "CT abdomen", "Surgical laparotomy immediately"], answer: 1, exp: "Intussusception presents with colicky pain, vomiting and redcurrant jelly stools. Air enema (pneumatic reduction) is both diagnostic and therapeutic in 80–90% of cases." },
      { q: "A premature neonate at 28 weeks develops increasing respiratory distress within 6 hours of birth. CXR shows ground-glass opacification with air bronchograms. What is the cause?", options: ["Meconium aspiration", "Surfactant deficiency (RDS)", "Pneumonia", "Transient tachypnoea of the newborn"], answer: 1, exp: "Respiratory Distress Syndrome (RDS) occurs due to surfactant deficiency in premature infants. CXR ground-glass changes are classic. Treatment is exogenous surfactant instillation." },
      { q: "A 14-year-old girl has a 6-month history of amenorrhoea, BMI 15.2, lanugo and bradycardia. Which electrolyte abnormality poses the greatest immediate cardiac risk?", options: ["Hyponatraemia", "Hypokalaemia", "Hypercalcaemia", "Hyperphosphataemia"], answer: 1, exp: "Hypokalaemia in anorexia nervosa (from restricted intake and possible purging) causes life-threatening arrhythmias. ECG monitoring and electrolyte correction are immediate priorities." },
      { q: "A 7-year-old presents with periorbital and pedal oedema, proteinuria 3+ and hypoalbuminaemia. BP is normal. What is the most likely diagnosis and first-line treatment?", options: ["IgA nephropathy — no treatment", "Minimal change disease — prednisolone", "FSGS — mycophenolate", "Membranous nephropathy — observation"], answer: 1, exp: "Minimal change disease is the most common cause of nephrotic syndrome in children. It typically presents with marked proteinuria, oedema and responds well to prednisolone." },
      { q: "Which vaccine is routinely given at 12–13 months as part of the UK childhood immunisation schedule and protects against 4 pathogens?", options: ["MenACWY", "MMR (measles, mumps, rubella)", "6-in-1 (DTaP/IPV/Hib/HepB)", "MenB"], answer: 1, exp: "MMR is given at 12–13 months and again at 3 years 4 months. It provides protection against measles, mumps and rubella (3 pathogens — not 4; this was a deliberate distractor)." },
    ],
  },
  "Psychiatry": {
    color: "#d946ef",
    questions: [
      { q: "A patient on clozapine develops a neutrophil count of 1.4 × 10⁹/L. According to CPMS guidelines, what must happen immediately?", options: ["Reduce the dose by half", "Stop clozapine immediately and do not rechallenge", "Continue and recheck in 48 hours", "Switch to olanzapine"], answer: 1, exp: "Neutrophil count <1.5 × 10⁹/L mandates immediate cessation of clozapine. Rechallenge is absolutely contraindicated. This is mandatory CPMS protocol." },
      { q: "A 40-year-old with treatment-resistant depression fails 3 antidepressant trials. What is the evidence-based next step?", options: ["Add lithium augmentation", "Add quetiapine augmentation", "Switch to phenelzine (MAOI)", "Refer for ECT"], answer: 3, exp: "ECT is the most effective treatment for severe treatment-resistant depression and has the strongest evidence base. Lithium augmentation is an alternative but ECT should be considered." },
      { q: "Under MHA 1983 Section 3, what is the maximum initial duration of detention?", options: ["28 days", "6 months", "12 months", "Indefinite"], answer: 1, exp: "Section 3 (treatment order) lasts up to 6 months initially, then renewable for a further 6 months, then annually thereafter." },
      { q: "A patient with bipolar I disorder is planning a pregnancy. They are currently stable on lithium. What is the primary concern with continuing lithium?", options: ["Neonatal thyroid suppression", "Ebstein's anomaly — cardiac teratogenicity", "Neural tube defects", "Cleft palate"], answer: 1, exp: "Lithium is associated with Ebstein's anomaly (tricuspid valve displacement) in the first trimester. Risk is lower than historically thought but cardiac monitoring via fetal echocardiogram is required." },
      { q: "A 32-year-old presents believing they are being watched by the government through their TV. They have auditory hallucinations and disorganised speech for 7 months. Which diagnosis fits best?", options: ["Brief psychotic disorder", "Schizophreniform disorder", "Schizophrenia", "Delusional disorder"], answer: 2, exp: "Schizophrenia requires ≥2 symptoms (delusions, hallucinations, disorganised speech, negative symptoms) for ≥6 months with functional decline. This patient meets ICD-11/DSM-5 criteria." },
      { q: "Which psychological therapy has the strongest NICE evidence for borderline personality disorder?", options: ["CBT alone", "Dialectical Behaviour Therapy (DBT)", "Psychodynamic psychotherapy", "EMDR"], answer: 1, exp: "DBT (developed by Marsha Linehan specifically for BPD) has the strongest evidence base for BPD, particularly for self-harm and suicidality. It combines CBT with mindfulness and distress tolerance." },
      { q: "A patient is commenced on phenelzine. What dietary restriction is absolutely essential?", options: ["Avoid grapefruit", "Avoid tyramine-rich foods", "Avoid vitamin K foods", "Avoid high-fibre foods"], answer: 1, exp: "MAOIs like phenelzine inhibit MAO-A, preventing tyramine metabolism. Tyramine-rich foods (aged cheese, cured meats, red wine) can cause a hypertensive crisis — potentially fatal." },
      { q: "A patient with major depression and psychotic features is started on sertraline alone. Why is this potentially insufficient?", options: ["SSRIs don't work in depression", "Psychotic features require concurrent antipsychotic therapy", "Sertraline causes psychosis", "Augmentation with lithium is always needed"], answer: 1, exp: "Psychotic depression requires both antidepressant and antipsychotic therapy. Treating with antidepressant alone risks worsening psychotic symptoms (switching into mania or increasing delusions)." },
      { q: "A 25-year-old describes recurrent intrusive thoughts about contamination, spending 4 hours/day washing hands, with significant distress. First-line treatment?", options: ["Lorazepam", "High-dose SSRI + ERP (Exposure and Response Prevention)", "Low-dose antipsychotic", "Supportive counselling only"], answer: 1, exp: "OCD first-line treatment is a combination of a high-dose SSRI (e.g. sertraline, fluvoxamine) and CBT with ERP. Response rates are 40–60% with combined therapy." },
      { q: "Which rating scale is used to monitor extrapyramidal side effects of antipsychotics in clinical practice?", options: ["PHQ-9", "PANSS", "AIMS (Abnormal Involuntary Movement Scale)", "GAD-7"], answer: 2, exp: "AIMS (Abnormal Involuntary Movement Scale) is used to monitor tardive dyskinesia and other involuntary movements caused by antipsychotic medication." },
    ],
  },
  "Surgery": {
    color: "#ec4899",
    questions: [
      { q: "A 70-year-old develops a rigid abdomen and sepsis on day 4 post anterior resection. CT shows pelvic free fluid and air. What is the diagnosis and treatment?", options: ["Paralytic ileus — conservative", "Anastomotic leak — return to theatre", "PE — anticoagulate", "Wound dehiscence — resuture"], answer: 1, exp: "Anastomotic leak post-colorectal surgery presents with peritonitis, fever and CT evidence of pelvic collections or free air. Urgent return to theatre for washout and defunctioning stoma." },
      { q: "During a right hemicolectomy, injury to which structure causes chylous ascites?", options: ["Portal vein", "Right ureter", "Superior mesenteric artery", "Cisterna chyli/mesenteric lymphatics"], answer: 3, exp: "The cisterna chyli and mesenteric lymphatics run close to surgical dissection planes. Injury causes chylous ascites — milky peritoneal fluid rich in triglycerides." },
      { q: "A patient with an acutely ischaemic limb has Fontaine Stage IV disease. What does this indicate?", options: ["Intermittent claudication only", "Rest pain", "Minor tissue loss/ulceration", "Major tissue loss/gangrene"], answer: 3, exp: "Fontaine classification: I = asymptomatic, IIa = claudication >200m, IIb = <200m, III = rest pain, IV = tissue loss (ulceration or gangrene). Stage IV requires urgent revascularisation." },
      { q: "Which classification system is used to grade severity of acute pancreatitis at 48 hours?", options: ["Child-Pugh", "Ranson's criteria", "APACHE II", "Glasgow criteria"], answer: 3, exp: "The modified Glasgow (Imrie) score uses 8 criteria at 48 hours. A score ≥3 indicates severe pancreatitis. APACHE II is also used but Glasgow is simpler and widely used in UK practice." },
      { q: "A 55-year-old presents with painless obstructive jaundice, weight loss and a palpable non-tender gallbladder. CA 19-9 is 850 U/mL. What is the most likely diagnosis?", options: ["CBD stone", "Pancreatic head adenocarcinoma", "Cholangiocarcinoma", "Hepatocellular carcinoma"], answer: 1, exp: "Courvoisier's law: painless jaundice + palpable non-tender gallbladder is unlikely to be gallstones. Pancreatic head cancer compresses the CBD, distending the gallbladder. CA19-9 elevation supports this." },
      { q: "A patient develops haematuria 10 days after a renal transplant. Doppler USS shows no flow in the transplant renal artery. What is the most likely cause?", options: ["Acute rejection", "Renal artery thrombosis", "Urinary leak", "Cyclosporine toxicity"], answer: 1, exp: "Renal artery thrombosis is a rare but catastrophic early complication of renal transplantation. Absent Doppler flow confirms the diagnosis. Immediate surgical exploration is required." },
      { q: "Which layer of the abdominal wall does a Richter's hernia specifically involve?", options: ["The entire bowel wall is incarcerated", "Only part of the antimesenteric bowel wall is trapped", "Only mesentery without bowel", "Retroperitoneal fat only"], answer: 1, exp: "Richter's hernia involves only the antimesenteric aspect of the bowel wall (partial enterocele). It can strangulate and perforate without causing complete obstruction — hence easily missed." },
      { q: "A 65-year-old undergoes AAA repair. Post-operatively he develops bloody diarrhoea and lactate rises to 4.8. CT shows thickening of the left colon. What is the most likely diagnosis?", options: ["Clostridium difficile colitis", "Ischaemic colitis due to inferior mesenteric artery ligation", "Anastomotic leak", "Diverticulitis"], answer: 1, exp: "Ischaemic colitis of the left colon is a recognised complication of AAA repair due to IMA ligation. If the meandering mesenteric artery is inadequate, sigmoid colon becomes ischaemic." },
      { q: "A trauma patient has a CXR showing a nasogastric tube coiled in the left chest. What injury does this indicate?", options: ["Oesophageal rupture", "Traumatic diaphragmatic hernia", "Haemothorax", "Pneumothorax"], answer: 1, exp: "A nasogastric tube visible in the thorax confirms herniation of abdominal contents (including stomach) through a traumatic diaphragmatic tear — a left-sided injury in 75% of cases." },
      { q: "Which scoring system guides the timing of cholecystectomy in acute cholecystitis?", options: ["Tokyo Guidelines severity grading", "APACHE II", "Revised Atlanta criteria", "Charcot's triad"], answer: 0, exp: "The Tokyo Guidelines (2018) grade acute cholecystitis I–III and recommend early laparoscopic cholecystectomy within 72 hours for Grade I/II, with medical management first for Grade III." },
    ],
  },
  "Cardiology": {
    color: "#ef4444",
    questions: [
      { q: "A 60-year-old with new AF has a CHA₂DS₂-VASc score of 3. No contraindications to anticoagulation. What is the recommended treatment?", options: ["Aspirin only", "DOAC (e.g. apixaban)", "Warfarin only", "No treatment needed"], answer: 1, exp: "CHA₂DS₂-VASc ≥2 in men or ≥3 in women requires anticoagulation. DOACs are preferred over warfarin per NICE NG196 due to superior efficacy and safety profile." },
      { q: "ECG shows delta waves, short PR interval and wide QRS complex in a young patient with palpitations. What is the diagnosis?", options: ["LBBB", "Wolff-Parkinson-White syndrome", "First-degree heart block", "Brugada syndrome"], answer: 1, exp: "WPW is caused by an accessory pathway (Bundle of Kent) causing pre-excitation. Delta waves, short PR and broad QRS are characteristic. Risk of AF degenerating to VF." },
      { q: "A patient post-STEMI develops a new pansystolic murmur at the lower sternal edge on day 3. What is the most likely cause?", options: ["Aortic stenosis", "Ventricular septal defect (post-MI VSD)", "Mitral regurgitation", "Tricuspid regurgitation"], answer: 1, exp: "A new pansystolic murmur at the lower left sternal edge 2–5 days post-STEMI suggests a post-MI VSD — a mechanical complication requiring urgent surgical repair." },
      { q: "Which potassium channel does amiodarone block, contributing to its class III antiarrhythmic effect?", options: ["Ikr (hERG)", "IKs", "IK1", "IKATP"], answer: 0, exp: "Amiodarone primarily blocks the rapid delayed rectifier potassium channel (IKr/hERG), prolonging the action potential duration and QT interval. This also explains its proarrhythmic risk." },
      { q: "A 45-year-old marathon runner presents with syncope. ECG shows T-wave inversions in V1–V4. Echo reveals RV dilation. What is the diagnosis?", options: ["Hypertrophic cardiomyopathy", "Arrhythmogenic right ventricular cardiomyopathy (ARVC)", "Pulmonary hypertension", "Athlete's heart"], answer: 1, exp: "ARVC (ARVC/D) presents in young athletes with RV dilation, T-wave inversions V1–V4, epsilon waves and ventricular arrhythmias. It is a leading cause of sudden cardiac death in athletes." },
      { q: "A patient with aortic stenosis has a valve area of 0.7cm². Gradient is 55mmHg. They are asymptomatic. When should surgery be recommended?", options: ["Immediately regardless of symptoms", "When symptoms develop or LV dysfunction occurs (EF<50%)", "Only when EF drops below 30%", "Never — medical management only"], answer: 1, exp: "Severe AS (area <1.0cm²) with symptoms (angina, syncope, heart failure) or EF <50% requires intervention. Asymptomatic severe AS with normal LV function can be monitored carefully." },
      { q: "Which finding on cardiac MRI is pathognomonic of cardiac amyloidosis?", options: ["Diffuse subendocardial late gadolinium enhancement with difficulty nulling the myocardium", "Focal mid-wall LGE", "RV fatty infiltration", "Pericardial effusion"], answer: 0, exp: "Cardiac amyloid causes diffuse subendocardial LGE with a characteristic inability to null the myocardium on TI scout sequences — considered near-pathognomonic on CMR." },
      { q: "A patient develops cardiogenic shock post-STEMI. IABP is inserted. What is its primary mechanism of benefit?", options: ["Increases afterload", "Inflates in diastole to increase coronary perfusion, deflates in systole to reduce afterload", "Replaces LV function entirely", "Reduces preload via diuresis"], answer: 1, exp: "IABP counterpulsation inflates during diastole (augmenting coronary perfusion) and deflates just before systole (reducing afterload/cardiac work). It does not replace LV function like Impella." },
      { q: "Which ECG finding is associated with hyperkalaemia at a serum level of approximately 7–8 mmol/L?", options: ["Tall peaked T waves", "Wide QRS and sine wave pattern", "PR prolongation", "U waves"], answer: 1, exp: "As K+ rises: peaked T waves (5.5–6.5), PR prolongation (6.5–7), wide QRS (7–8), then sine wave pattern and VF (>8). Broad QRS with sine waves is a pre-arrest finding." },
      { q: "A 35-year-old with known HCM collapses during football. Resuscitated successfully. What is the definitive long-term management?", options: ["Beta-blocker only", "Implantable cardioverter defibrillator (ICD)", "Surgical myectomy", "Amiodarone long-term"], answer: 1, exp: "Survivors of sudden cardiac arrest in HCM require ICD implantation for secondary prevention. ICDs reduce sudden death risk by >90% in this group." },
    ],
  },
  "Neurology": {
    color: "#eab308",
    questions: [
      { q: "A 28-year-old woman presents with optic neuritis and a sensory episode 2 years ago. MRI shows periventricular plaques. What does the McDonald criteria require for MS diagnosis?", options: ["Only clinical history", "Dissemination in time AND space — met here", "Two MRI scans 6 months apart", "CSF oligoclonal bands only"], answer: 1, exp: "McDonald criteria 2017: DIS (≥2 lesion areas) + DIT (clinical episodes at different times OR MRI enhancing + non-enhancing lesions simultaneously). This patient meets both criteria." },
      { q: "A 70-year-old presents with a 3-hour history of expressive aphasia and right hemiplegia. CT head is normal. NIHSS is 14. What is the next treatment step?", options: ["Aspirin immediately", "IV alteplase within 4.5 hours if no contraindications", "Heparin infusion", "Decompressive craniectomy"], answer: 1, exp: "IV thrombolysis with alteplase is indicated within 4.5 hours of ischaemic stroke onset with NIHSS ≥4, no haemorrhage on CT, and no contraindications. Time is brain." },
      { q: "A patient has a progressive ascending paralysis over 2 weeks following a GI infection. CSF shows albuminocytological dissociation. What is the treatment?", options: ["Steroids only", "IV immunoglobulin or plasmapheresis", "Aciclovir", "Antibiotics"], answer: 1, exp: "Guillain-Barré syndrome: ascending paralysis post-infection, CSF shows high protein with few cells (albuminocytological dissociation). IVIG or plasmapheresis are equally effective treatments." },
      { q: "Which mutation is associated with the most common hereditary cause of motor neurone disease (familial ALS)?", options: ["TARDBP", "FUS", "C9orf72 hexanucleotide repeat expansion", "SOD1"], answer: 2, exp: "C9orf72 expansion is the most common genetic cause of both familial ALS and frontotemporal dementia, accounting for 40% of familial ALS and 25% of familial FTD." },
      { q: "A 55-year-old develops a tremor that is present at rest, worse when distracted, with micrographia and a shuffling gait. DAT scan is abnormal. Diagnosis?", options: ["Essential tremor", "Parkinson's disease", "Drug-induced parkinsonism", "MSA"], answer: 1, exp: "Parkinson's disease: rest tremor (3–6Hz), bradykinesia, rigidity, postural instability + abnormal DAT scan confirming dopamine transporter loss. Drug-induced parkinsonism has a normal DAT scan." },
      { q: "A patient with epilepsy on sodium valproate plans a pregnancy. What is the major teratogenic concern?", options: ["Cardiac defects only", "Neural tube defects and neurodevelopmental delay (cognitive teratogen)", "Cleft palate only", "Limb reduction defects"], answer: 1, exp: "Sodium valproate is the most teratogenic AED — risk of neural tube defects (1–2%), and significant neurodevelopmental harm to the child. MHRA mandates the Prevent programme for all women of childbearing potential." },
      { q: "Which dementia is characterised by fluctuating cognition, visual hallucinations, REM sleep behaviour disorder and Parkinsonism?", options: ["Alzheimer's disease", "Dementia with Lewy bodies (DLB)", "Frontotemporal dementia", "Vascular dementia"], answer: 1, exp: "DLB core features: fluctuating cognition, recurrent visual hallucinations, REM sleep behaviour disorder and parkinsonism. Cholinesterase inhibitors are used. Avoid antipsychotics — severe sensitivity reactions." },
      { q: "A 40-year-old develops sudden-onset severe headache (10/10), vomiting and photophobia. CT head is normal. What is the next mandatory step?", options: ["MRI brain", "Lumbar puncture for xanthochromia at 12 hours", "IV antibiotics for meningitis", "Discharge with analgesia"], answer: 1, exp: "Normal CT does not exclude SAH. LP at ≥12 hours post-onset is required to detect xanthochromia (bilirubin). Spectrophotometry is more sensitive than visual inspection." },
      { q: "A patient with MG is started on pyridostigmine. They develop increased secretions, miosis and worsening weakness after increasing the dose. What is happening?", options: ["Myasthenic crisis", "Cholinergic crisis from pyridostigmine overdose", "Disease relapse", "Thymoma complication"], answer: 1, exp: "Cholinergic crisis: excessive acetylcholinesterase inhibition causes SLUDGE (salivation, lacrimation, urination, diarrhoea, GI pain, emesis) + worsening weakness. Stop pyridostigmine, give atropine." },
      { q: "Which investigation is gold standard for diagnosing cerebral venous sinus thrombosis?", options: ["CT head without contrast", "MRI with MR venography", "LP", "CT angiography"], answer: 1, exp: "MRI with MR venography (MRV) is the gold standard for CVST. It demonstrates the absence of flow in cerebral venous sinuses and associated parenchymal changes better than CT." },
    ],
  },
  "Obstetrics & Gynaecology": {
    color: "#f472b6",
    questions: [
      { q: "A 32-year-old at 34 weeks gestation develops hypertension (158/102) and proteinuria 2+. What is the definitive treatment for pre-eclampsia?", options: ["Antihypertensives only", "IV magnesium sulphate and delivery", "Bed rest and monitoring", "Aspirin 150mg"], answer: 1, exp: "The only definitive treatment for pre-eclampsia is delivery. IV magnesium sulphate reduces risk of eclampsia by 58%. Antihypertensives treat BP but do not address the underlying condition." },
      { q: "A woman at 28 weeks has a placenta praevia on USS covering the internal os. She has a painless fresh PV bleed. What is the management?", options: ["ARM and expedite delivery", "Admission, IV access, cross-match, steroid cover — no vaginal examination", "Prostaglandin induction", "Immediate caesarean section regardless of fetal wellbeing"], answer: 1, exp: "Major placenta praevia with haemorrhage: admit, IV access, group and save/crossmatch, steroids if <34 weeks. Vaginal examination is absolutely contraindicated — may provoke catastrophic haemorrhage." },
      { q: "A 38-year-old undergoes LLETZ for CIN3. Six months later, her smear shows high-grade dyskaryosis again. HPV 16 is detected. What is the next step?", options: ["Repeat LLETZ immediately", "Colposcopy with directed biopsy", "Hysterectomy", "Repeat smear in 6 months"], answer: 1, exp: "Persistent high-grade dyskaryosis after treatment requires colposcopy with directed biopsy to assess for residual/recurrent CIN or early invasive disease before further treatment decisions." },
      { q: "A G3P2 woman has a PPH of 1200ml after normal vaginal delivery. Uterus is soft and boggy. What is the first-line drug treatment?", options: ["Carboprost IM", "IV ergometrine", "IV oxytocin bolus then infusion", "Misoprostol rectal"], answer: 2, exp: "For atonic PPH, oxytocin is first-line (IV bolus 5 units + infusion per RCOG guideline). Ergometrine and carboprost follow. Misoprostol is used when other uterotonics are unavailable." },
      { q: "BRCA1 mutation carrier at 38 years old, completed her family. She requests risk-reducing surgery. What is the recommended surgical option?", options: ["Bilateral mastectomy only", "Risk-reducing bilateral salpingo-oophorectomy (RRSO)", "Annual MRI surveillance only", "Prophylactic tamoxifen"], answer: 1, exp: "RRSO by age 40 (or 35–40 in BRCA1 carriers) reduces ovarian cancer risk by >96% and breast cancer risk by 50% in premenopausal women. It is the gold-standard risk-reduction strategy." },
      { q: "A 24-year-old presents with left iliac fossa pain, nausea and a positive pregnancy test. USS shows no intrauterine pregnancy and a left adnexal mass. What is the priority?", options: ["Methotrexate immediately", "Urgent surgical assessment for possible ectopic pregnancy", "Repeat USS in 48 hours", "Admit for observation only"], answer: 1, exp: "Suspected ectopic pregnancy with adnexal mass requires urgent surgical assessment. If haemodynamically unstable, immediate laparoscopy/laparotomy is required. Methotrexate is only for stable, non-ruptured ectopics." },
      { q: "A postmenopausal woman presents with postmenopausal bleeding. Endometrial thickness is 7mm on USS. What is the next step?", options: ["Reassure and discharge", "Hysteroscopy and endometrial biopsy", "Progesterone challenge test", "HRT trial"], answer: 1, exp: "Endometrial thickness >4mm in postmenopausal women warrants hysteroscopy and biopsy to exclude endometrial carcinoma. PMB is endometrial cancer until proven otherwise." },
      { q: "A woman in active labour at 39 weeks has an FHR trace showing late decelerations with reduced variability. What does this indicate?", options: ["Normal — late decelerations are physiological", "Non-reassuring — consider fetal blood sampling or expedite delivery", "Cord compression", "Reassuring — continue to monitor"], answer: 1, exp: "Late decelerations with reduced variability is a pathological CTG — indicating fetal hypoxia/acidosis. Urgent fetal blood sampling (FBS) or immediate delivery is required depending on clinical context." },
      { q: "Which antibiotic is used for GBS prophylaxis in labour?", options: ["Amoxicillin", "IV Benzylpenicillin", "Erythromycin", "Clindamycin"], answer: 1, exp: "IV Benzylpenicillin is the antibiotic of choice for GBS intrapartum prophylaxis per RCOG Green-top guideline. Clindamycin is used for penicillin-allergic patients." },
      { q: "A 16-year-old presents with primary amenorrhoea, absent uterus on USS, but normal breast development and pubic/axillary hair absent. Karyotype is 46XY. What is the diagnosis?", options: ["Turner syndrome", "Complete Androgen Insensitivity Syndrome (CAIS)", "Mullerian agenesis (MRKH)", "Kallmann syndrome"], answer: 1, exp: "CAIS: 46XY karyotype, normal breast development (from androgen aromatisation to oestrogen), absent uterus and absent/sparse pubic/axillary hair (due to androgen insensitivity). Gonads must be removed due to malignancy risk." },
    ],
  },
  "Anaesthesia": {
    color: "#94a3b8",
    questions: [
      { q: "A 70kg patient requires RSI. Which suxamethonium dose provides optimal intubating conditions?", options: ["0.5 mg/kg", "1–1.5 mg/kg", "2.5 mg/kg", "0.1 mg/kg"], answer: 1, exp: "Suxamethonium 1–1.5mg/kg IV provides full neuromuscular blockade for RSI within 45–60 seconds. This is a depolarising agent contraindicated in hyperkalaemic patients, burns and crush injuries." },
      { q: "A patient develops masseter rigidity and rising end-tidal CO₂ post-suxamethonium. Temperature is 39.8°C and rising. Diagnosis and treatment?", options: ["Anaphylaxis — adrenaline", "Malignant hyperthermia — dantrolene 2.5mg/kg IV", "Neuroleptic malignant syndrome — bromocriptine", "Thyroid storm — propranolol"], answer: 1, exp: "Malignant hyperthermia is triggered by volatile agents and suxamethonium in susceptible (RYR1 mutation) patients. Treatment: stop trigger, dantrolene 2.5mg/kg IV repeated until resolution." },
      { q: "A patient's train-of-four (TOF) ratio post-rocuronium shows 2/4 twitches. Is reversal with neostigmine appropriate?", options: ["Yes — neostigmine at any TOF count", "No — neostigmine only effective when TOF ≥2 and ideally ≥4", "No — sugammadex is the only option at 2/4", "Yes — neostigmine + atropine regardless of TOF"], answer: 1, exp: "Neostigmine is unreliable below TOF 2/4. At 2/4 twitches, sugammadex (for aminosteroid blockers like rocuronium) is more reliable. Neostigmine may cause paradoxical weakness at deeper blockade." },
      { q: "A patient with a known difficult airway is scheduled for elective surgery. What is the most important pre-operative preparation?", options: ["Have a laryngoscope available", "Pre-oxygenate, have a can't intubate can't oxygenate plan, video laryngoscope, surgical airway kit available", "Give ketamine IM pre-induction", "Have a second anaesthetist present only"], answer: 1, exp: "Difficult airway management requires: optimal positioning, pre-oxygenation, video laryngoscopy first-line, second generation SAD, and surgical airway kit (scalpel-bougie-tube) per DAS guidelines." },
      { q: "Which physiological effect does ketamine uniquely produce compared to other induction agents?", options: ["Respiratory depression", "Bronchospasm", "Dissociative anaesthesia with maintained airway reflexes and cardiovascular stimulation", "Hypotension"], answer: 2, exp: "Ketamine is a dissociative anaesthetic (NMDA antagonist) that maintains airway reflexes, causes bronchodilation and cardiovascular stimulation — making it ideal for trauma and asthma patients." },
      { q: "A spinal anaesthetic is given for LSCS. 5 minutes later, BP drops to 75/40 and the patient feels nauseous. What is the immediate treatment?", options: ["IV labetalol", "Left lateral tilt, IV ephedrine or phenylephrine and IV fluid bolus", "Stop the surgery", "Atropine only"], answer: 1, exp: "Spinal hypotension is common in obstetrics due to aortocaval compression and sympathetic block. Left uterine displacement, vasopressors (phenylephrine preferred) and IV fluids are first-line." },
      { q: "What is the minimum fasting time for clear fluids before elective general anaesthesia in adults per AAGBI guidelines?", options: ["1 hour", "2 hours", "4 hours", "6 hours"], answer: 1, exp: "AAGBI and NICE recommend a minimum 2-hour fast for clear fluids (water, black coffee/tea without milk) and 6 hours for solids and milk before elective GA in adults." },
      { q: "A patient develops bronchospasm, urticaria and hypotension 10 minutes into a general anaesthetic. How is anaphylaxis grade III classified?", options: ["Skin changes only", "Life-threatening bronchospasm or cardiovascular collapse", "Skin + cardiovascular changes", "Fatal — no response to treatment"], answer: 1, exp: "Ring classification of anaphylaxis: Grade I = skin only, II = moderate (cardiovascular + skin), III = life-threatening (bronchospasm/cardiovascular collapse), IV = cardiac/respiratory arrest." },
      { q: "Which analgesic adjunct acts on voltage-gated calcium channels and reduces opioid requirements post-operatively?", options: ["Paracetamol", "Pregabalin/gabapentin", "NSAIDs", "Tramadol"], answer: 1, exp: "Pregabalin and gabapentin (α₂δ ligands) modulate voltage-gated calcium channels, reducing central sensitisation. They reduce post-operative opioid requirements by 30–50% and are part of multimodal analgesia." },
      { q: "A 55-year-old with severe COPD (FEV1 35%) requires emergency laparotomy. What ventilation strategy minimises further lung injury?", options: ["High tidal volume 10ml/kg", "Lung-protective ventilation: TV 6ml/kg IBW, PEEP 5–8, plateau pressure <30cmH₂O", "High FiO₂ 1.0 throughout", "No PEEP to avoid air trapping"], answer: 1, exp: "Lung-protective ventilation (ARDSnet strategy) with low tidal volumes (6ml/kg IBW), appropriate PEEP and limiting plateau pressures <30cmH₂O reduces VILI and post-op pulmonary complications in high-risk patients." },
    ],
  },
  "Radiology": {
    color: "#06b6d4",
    questions: [
      { q: "A CXR shows a coin lesion of 2.4cm in the right upper lobe of a 65-year-old smoker. What is the next step per British Thoracic Society guidelines?", options: ["Repeat CXR in 3 months", "CT thorax with contrast urgently", "PET-CT immediately without CT first", "Bronchoscopy immediately"], answer: 1, exp: "A new pulmonary nodule ≥8mm in a high-risk patient (smoker, age >40) requires CT thorax for characterisation (size, density, margins) before any further investigation." },
      { q: "On an abdominal X-ray, which bowel gas pattern suggests small bowel obstruction?", options: ["Haustra visible, peripheral distribution", "Central valvulae conniventes (plicae circulares), >3cm diameter, no gas in rectum", "Ground glass opacification", "Thumb printing in left colon"], answer: 1, exp: "SBO: central dilated small bowel >3cm, valvulae conniventes visible (complete rings), stepladder pattern, paucity of colonic gas. Haustra are incomplete, peripheral — seen in large bowel obstruction." },
      { q: "A CTPA report states 'Saddle embolus at the pulmonary artery bifurcation with RV:LV ratio >0.9'. What does the RV:LV ratio indicate?", options: ["Benign finding", "Right heart strain indicating massive or submassive PE", "Left heart failure", "Aortic stenosis"], answer: 1, exp: "RV:LV ratio >0.9 on CTPA indicates significant right heart strain. Combined with a saddle embolus, this suggests massive PE requiring urgent intervention (thrombolysis or surgical embolectomy)." },
      { q: "Which MRI sequence is most useful for detecting acute ischaemic stroke within 6 hours?", options: ["T1 with contrast", "Diffusion-weighted imaging (DWI)", "FLAIR only", "T2 gradient echo"], answer: 1, exp: "DWI detects cytotoxic oedema within minutes of ischaemic stroke (restricted diffusion = bright DWI, dark ADC map). FLAIR changes may not appear for 6–24 hours." },
      { q: "A portable supine CXR post-central line insertion shows the tip at the level of T4. Where is the ideal position for a central venous catheter tip?", options: ["Subclavian vein", "Superior vena cava / cavo-atrial junction (T4–T6)", "Right atrium", "Innominate vein"], answer: 1, exp: "Ideal CVC tip position is in the lower SVC or cavo-atrial junction (T4–T6 level). Too high risks thrombosis; too low (in RA/RV) risks arrhythmias or cardiac perforation." },
      { q: "A 40-year-old woman has a USS showing a 6cm complex adnexal mass with solid components and internal vascularity. RMI score is 260. What does this suggest?", options: ["Simple cyst — reassure", "High risk of malignancy — urgent gynaecology oncology referral", "Endometrioma — OCP treatment", "PID — antibiotics"], answer: 1, exp: "Risk of Malignancy Index (RMI) >250 indicates high suspicion of ovarian malignancy. The formula combines USS features (U), menopausal status (M) and CA125. Urgent oncology referral is required." },
      { q: "On a plain lateral cervical spine X-ray, what is the normal maximum prevertebral soft tissue thickness at C3?", options: ["10mm", "5mm", "15mm", "20mm"], answer: 1, exp: "Normal prevertebral soft tissue at C3 is <5mm. >7mm at C3 or >20mm at C5/6 suggests prevertebral haematoma or abscess, prompting further CT imaging in trauma or infection." },
      { q: "Which CT finding is pathognomonic for sigmoid volvulus?", options: ["Apple-core lesion", "Coffee-bean sign — dilated sigmoid loop pointing to the right upper quadrant", "Bird's beak at splenic flexure", "Rigler's sign"], answer: 1, exp: "The coffee-bean sign on plain AXR or CT is characteristic of sigmoid volvulus — a massively dilated sigmoid loop with its apex pointing towards the right upper quadrant." },
      { q: "A trauma patient has a CT head showing hyperdense blood in a biconvex lens-shaped collection adjacent to the right temporal bone. What is the diagnosis?", options: ["Chronic subdural haematoma", "Extradural haematoma (EDH)", "Subarachnoid haemorrhage", "Cerebral contusion"], answer: 1, exp: "EDH: biconvex (lens-shaped) hyperdense collection, typically temporal (middle meningeal artery rupture), does not cross sutures. Classic lucid interval. Urgent surgical evacuation required." },
      { q: "What radiation dose is a standard PA chest X-ray equivalent to in terms of natural background radiation?", options: ["1 day", "3 days", "1 month", "1 year"], answer: 1, exp: "A PA chest X-ray delivers approximately 0.02mSv — equivalent to about 3 days of natural background radiation (~2.4mSv/year in UK). This context helps explain radiation risk to patients." },
    ],
  },
};

// ─── UTILITY: Fisher-Yates shuffle ────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── INTERSECTION OBSERVER HOOK ──────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

// ─── MEDICAL QUIZ COMPONENT ───────────────────────────────────────────────
function MedicalQuiz() {
  const [specialty, setSpecialty] = useState(null);
  const [setNumber, setSetNumber] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showExp, setShowExp] = useState(false);
  const [usedSets, setUsedSets] = useState({});

  const specialties = Object.keys(QUIZ_DATA);
  const totalSets = 5;
  const questionsPerSet = 10;

  const startQuiz = useCallback((spec, setNum) => {
    const allQs = QUIZ_DATA[spec].questions;
    const shuffled = shuffle(allQs);
    const setQs = shuffled.slice(0, questionsPerSet);
    setSpecialty(spec);
    setSetNumber(setNum);
    setQuestions(setQs);
    setQIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setShowExp(false);
  }, []);

  const handleAnswer = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowExp(true);
    if (idx === questions[qIndex].answer) setScore(s => s + 1);
  };

  const next = () => {
    if (qIndex + 1 >= questions.length) {
      setFinished(true);
      setUsedSets(prev => ({ ...prev, [`${specialty}_${setNumber}`]: true }));
      return;
    }
    setQIndex(i => i + 1);
    setSelected(null);
    setShowExp(false);
  };

  const accentColor = specialty ? QUIZ_DATA[specialty].color : "#c9a96e";

  // Screen 1: Pick specialty
  if (!specialty) return (
    <div>
      <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(245,240,235,0.6)", marginBottom: "32px", fontSize: "15px", lineHeight: 1.7 }}>
        Select your medical specialty. Each quiz contains 10 randomly selected specialist-level questions. Complete up to 5 different sets per specialty — questions are reshuffled each time so you won't repeat the same set.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "12px" }}>
        {specialties.map((spec) => {
          const col = QUIZ_DATA[spec].color;
          return (
            <button key={spec} onClick={() => setSpecialty(spec)} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${col}35`, padding: "22px 16px", cursor: "pointer", textAlign: "left", transition: "all 0.25s", color: "#f5f0eb", display: "flex", flexDirection: "column", gap: "10px" }}
              onMouseEnter={e => { e.currentTarget.style.background = `${col}12`; e.currentTarget.style.borderColor = `${col}80`; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = `${col}35`; }}>
              <div style={{ width: "8px", height: "8px", background: col, borderRadius: "50%" }} />
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "17px", fontWeight: "400", lineHeight: 1.2 }}>{spec}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: "rgba(245,240,235,0.35)", letterSpacing: "0.08em" }}>10 questions · 5 sets</div>
            </button>
          );
        })}
      </div>
    </div>
  );

  // Screen 2: Pick set
  if (specialty && setNumber === null) {
    const col = QUIZ_DATA[specialty].color;
    return (
      <div>
        <button onClick={() => setSpecialty(null)} style={{ background: "none", border: "none", color: "rgba(245,240,235,0.4)", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: "13px", marginBottom: "28px", padding: 0, letterSpacing: "0.08em" }}>← Back to Specialties</button>
        <h3 style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: "300", marginBottom: "8px" }}>{specialty}</h3>
        <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(245,240,235,0.5)", fontSize: "14px", marginBottom: "32px" }}>Choose a set. Each set draws 10 randomly shuffled questions — no two sets are the same.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "12px" }}>
          {Array.from({ length: totalSets }, (_, i) => {
            const key = `${specialty}_${i + 1}`;
            const done = usedSets[key];
            return (
              <button key={i} onClick={() => startQuiz(specialty, i + 1)} style={{ background: done ? `${col}18` : "rgba(255,255,255,0.03)", border: `1px solid ${done ? col : "rgba(245,240,235,0.1)"}`, padding: "28px 12px", cursor: "pointer", color: "#f5f0eb", transition: "all 0.25s", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
                onMouseEnter={e => { e.currentTarget.style.background = `${col}18`; e.currentTarget.style.borderColor = col; }}
                onMouseLeave={e => { e.currentTarget.style.background = done ? `${col}18` : "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = done ? col : "rgba(245,240,235,0.1)"; }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "32px", fontWeight: "300", color: done ? col : "#f5f0eb" }}>Set {i + 1}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: done ? col : "rgba(245,240,235,0.35)" }}>{done ? "Completed ✓" : "10 Questions"}</div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Screen 3: Results
  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    const msg = pct >= 90 ? "Outstanding clinical knowledge" : pct >= 70 ? "Strong performance — review explanations" : pct >= 50 ? "Good effort — revisit weak areas" : "Keep studying — review all explanations";
    return (
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <div style={{ fontSize: "72px", fontWeight: "300", color: accentColor, letterSpacing: "-0.03em", lineHeight: 1 }}>{score}/{questions.length}</div>
        <div style={{ width: "100%", height: "4px", background: "rgba(255,255,255,0.08)", margin: "24px 0", borderRadius: "2px" }}>
          <div style={{ width: `${pct}%`, height: "100%", background: accentColor, borderRadius: "2px", transition: "width 1s ease" }} />
        </div>
        <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(245,240,235,0.6)", fontSize: "15px", marginBottom: "36px" }}>{msg}</p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => startQuiz(specialty, setNumber)} style={{ border: `1px solid ${accentColor}`, background: accentColor, color: "#0a0a0a", padding: "12px 28px", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", transition: "all 0.3s" }}>Retry This Set</button>
          <button onClick={() => { setSpecialty(specialty); setSetNumber(null); setFinished(false); }} style={{ border: "1px solid rgba(245,240,235,0.2)", background: "transparent", color: "#f5f0eb", padding: "12px 28px", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", transition: "all 0.3s" }}>Try Another Set</button>
          <button onClick={() => { setSpecialty(null); setSetNumber(null); setFinished(false); }} style={{ border: "1px solid rgba(245,240,235,0.1)", background: "transparent", color: "rgba(245,240,235,0.5)", padding: "12px 28px", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", transition: "all 0.3s" }}>Change Specialty</button>
        </div>
      </div>
    );
  }

  // Screen 4: Question
  const q = questions[qIndex];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button onClick={() => { setSpecialty(null); setSetNumber(null); }} style={{ background: "none", border: "none", color: "rgba(245,240,235,0.35)", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: "12px", padding: 0 }}>← Specialties</button>
          <span style={{ color: "rgba(245,240,235,0.15)" }}>|</span>
          <button onClick={() => { setSetNumber(null); setFinished(false); }} style={{ background: "none", border: "none", color: accentColor, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: "12px", padding: 0 }}>{specialty}</button>
        </div>
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", color: "rgba(245,240,235,0.4)" }}>Set {setNumber} · Q{qIndex + 1}/{questions.length}</span>
      </div>
      <div style={{ width: "100%", height: "2px", background: "rgba(255,255,255,0.07)", marginBottom: "32px" }}>
        <div style={{ width: `${((qIndex + 1) / questions.length) * 100}%`, height: "100%", background: accentColor, transition: "width 0.4s ease" }} />
      </div>
      <p style={{ fontSize: "clamp(15px,2vw,18px)", lineHeight: 1.65, marginBottom: "28px", fontWeight: "300" }}>{q.q}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
        {q.options.map((opt, i) => {
          let bg = "rgba(255,255,255,0.03)";
          let bc = "rgba(245,240,235,0.1)";
          if (selected !== null) {
            if (i === q.answer) { bg = "rgba(34,197,94,0.1)"; bc = "#22c55e"; }
            else if (i === selected) { bg = "rgba(239,68,68,0.1)"; bc = "#ef4444"; }
          }
          return (
            <button key={i} onClick={() => handleAnswer(i)} style={{ background: bg, border: `1px solid ${bc}`, padding: "16px 18px", textAlign: "left", cursor: selected !== null ? "default" : "pointer", color: "#f5f0eb", fontFamily: "'DM Sans',sans-serif", fontSize: "14px", lineHeight: 1.5, transition: "all 0.2s", display: "flex", gap: "12px", alignItems: "flex-start" }}
              onMouseEnter={e => { if (selected === null) { e.currentTarget.style.background = `${accentColor}10`; e.currentTarget.style.borderColor = `${accentColor}60`; }}}
              onMouseLeave={e => { if (selected === null) { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(245,240,235,0.1)"; }}}>
              <span style={{ color: accentColor, fontFamily: "'Cormorant Garamond',serif", fontSize: "17px", lineHeight: 1, minWidth: "18px", flexShrink: 0 }}>{String.fromCharCode(65 + i)}.</span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
      {showExp && (
        <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${accentColor}30`, padding: "18px 22px", marginBottom: "20px" }}>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: accentColor, marginBottom: "8px" }}>Clinical Explanation</div>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", lineHeight: 1.75, color: "rgba(245,240,235,0.72)" }}>{q.exp}</p>
        </div>
      )}
      {selected !== null && (
        <button onClick={next} style={{ background: accentColor, border: `1px solid ${accentColor}`, color: "#0a0a0a", padding: "13px 32px", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", transition: "all 0.25s" }}
          onMouseEnter={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = accentColor; }}
          onMouseLeave={e => { e.currentTarget.style.background = accentColor; e.currentTarget.style.color = "#0a0a0a"; }}>
          {qIndex + 1 >= questions.length ? "See Results" : "Next Question →"}
        </button>
      )}
    </div>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function EMrzaseHopeLtd() {
  const [scrolled, setScrolled] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [videoFilter, setVideoFilter] = useState("All");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });

  const allTopics = ["All", ...Array.from(new Set(VIDEOS.map(v => v.topic))).sort()];
  const filteredVideos = videoFilter === "All" ? VIDEOS : VIDEOS.filter(v => v.topic === videoFilter);

  const G = "#c9a96e"; // gold

  return (
    <div style={{ fontFamily: "'Cormorant Garamond','Georgia',serif", background: "#080808", color: "#f5f0eb", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-track{background:#080808}
        ::-webkit-scrollbar-thumb{background:#c9a96e;border-radius:2px}
        .sans{font-family:'DM Sans',sans-serif}
        .nav-link{cursor:pointer;font-family:'DM Sans',sans-serif;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(245,240,235,0.65);transition:color 0.3s}
        .nav-link:hover{color:#c9a96e}
        .btn{font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;padding:14px 32px;border:1px solid #c9a96e;color:#c9a96e;background:transparent;cursor:pointer;transition:all 0.3s}
        .btn:hover{background:#c9a96e;color:#080808}
        .btn-solid{background:#c9a96e;color:#080808}
        .btn-solid:hover{background:transparent;color:#c9a96e}
        .svc-card{position:relative;overflow:hidden}
        .svc-card img{width:100%;height:380px;object-fit:cover;display:block;filter:brightness(0.45);transition:all 0.6s}
        .svc-card:hover img{transform:scale(1.04);filter:brightness(0.35)}
        .svc-overlay{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;padding:30px;background:linear-gradient(to top,rgba(0,0,0,0.93) 0%,rgba(0,0,0,0.3) 55%,transparent 100%)}
        .input-field{width:100%;background:transparent;border:none;border-bottom:1px solid rgba(245,240,235,0.18);padding:14px 2px;font-family:'DM Sans',sans-serif;font-size:14px;color:#f5f0eb;outline:none;transition:border-color 0.3s}
        .input-field::placeholder{color:rgba(245,240,235,0.28)}
        .input-field:focus{border-bottom-color:#c9a96e}
        .vid-card{background:rgba(255,255,255,0.025);border:1px solid rgba(245,240,235,0.07);transition:all 0.3s;cursor:pointer;overflow:hidden}
        .vid-card:hover{border-color:rgba(245,240,235,0.2);background:rgba(255,255,255,0.04)}
        .filter-btn{font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;padding:8px 18px;border:1px solid rgba(245,240,235,0.12);background:transparent;color:rgba(245,240,235,0.5);cursor:pointer;transition:all 0.25s}
        .filter-btn.active,.filter-btn:hover{border-color:#c9a96e;color:#c9a96e;background:rgba(201,169,110,0.08)}
        @media(max-width:900px){
          .grid2{grid-template-columns:1fr !important}
          .grid3{grid-template-columns:1fr 1fr !important}
          .grid4{grid-template-columns:1fr 1fr !important}
          .hide-mobile{display:none !important}
          .nav-wrap{padding:0 20px !important}
          .section-pad{padding:80px 20px !important}
        }
        @media(max-width:600px){
          .grid3{grid-template-columns:1fr !important}
          .grid4{grid-template-columns:1fr !important}
        }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: "68px", padding: "0 48px", display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? "rgba(8,8,8,0.97)" : "transparent", borderBottom: scrolled ? "1px solid rgba(201,169,110,0.12)" : "none", backdropFilter: scrolled ? "blur(16px)" : "none", transition: "all 0.4s" }} className="nav-wrap">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "32px", height: "32px", background: G, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: "600", color: "#080808" }}>EM</div>
          <div>
            <div style={{ fontSize: "16px", fontWeight: "500", letterSpacing: "0.04em", lineHeight: 1.1 }}>Emrzase Hope</div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "9px", color: "rgba(245,240,235,0.35)", letterSpacing: "0.14em", textTransform: "uppercase" }}>Ltd · Co. 16791155</div>
          </div>
        </div>
        <div className="hide-mobile" style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          {NAV_LINKS.map(l => <span key={l} className="nav-link" onClick={() => scrollTo(l)}>{l}</span>)}
          <button className="btn" style={{ padding: "8px 20px" }} onClick={() => scrollTo("Contact")}>Get In Touch</button>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" style={{ position: "relative", height: "100vh", minHeight: "640px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80" alt="Medical" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", filter: "brightness(0.28)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(8,8,8,0.05) 0%,rgba(8,8,8,0.5) 60%,rgba(8,8,8,1) 100%)" }} />
        <div style={{ position: "relative", textAlign: "center", padding: "0 24px", maxWidth: "940px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", marginBottom: "28px" }}>
            <div style={{ width: "36px", height: "1px", background: G }} />
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: G }}>Blackburn, England · Est. October 2025</span>
            <div style={{ width: "36px", height: "1px", background: G }} />
          </div>
          <h1 style={{ fontSize: "clamp(50px,9vw,104px)", fontWeight: "300", lineHeight: 1.0, letterSpacing: "-0.02em", marginBottom: "24px" }}>
            Emrzase Hope Ltd<br /><em style={{ color: G, fontStyle: "italic" }}>General Medical Practice</em>
          </h1>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "15px", lineHeight: 1.85, color: "rgba(245,240,235,0.6)", maxWidth: "560px", margin: "0 auto 44px", fontWeight: "300" }}>
            A registered UK medical practice based in Blackburn, dedicated to delivering high-quality general medical care with compassion, integrity and clinical excellence.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn btn-solid" onClick={() => scrollTo("Services")}>Our Services</button>
            <button className="btn" onClick={() => scrollTo("Videos")}>Medical Videos</button>
            <button className="btn" onClick={() => scrollTo("Quiz")}>Take the Quiz</button>
          </div>
        </div>
      </section>

      {/* COMPANY FACTS STRIP */}
      <section style={{ background: "#0a0a0a", borderTop: "1px solid rgba(201,169,110,0.12)", borderBottom: "1px solid rgba(201,169,110,0.12)" }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto", display: "flex", flexWrap: "wrap" }}>
          {[["Company Number","16791155"],["Status","Active"],["Incorporated","16 Oct 2025"],["Address","Blackburn, BB1 1RB"],["SIC Code","86210 — General Medical Practice"]].map(([k,v],i) => (
            <div key={k} style={{ flex:"1 1 180px", padding:"26px 28px", borderLeft: i>0 ? "1px solid rgba(201,169,110,0.1)" : "none", minWidth:"150px" }}>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"10px", letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(245,240,235,0.3)", marginBottom:"5px" }}>{k}</div>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"13px", color:"#f5f0eb" }}>{v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "110px 48px", maxWidth: "1300px", margin: "0 auto" }} className="section-pad">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center" }} className="grid2">
          <FadeIn>
            <div style={{ position: "relative" }}>
              <img src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80" alt="Medical" style={{ width: "100%", height: "520px", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", bottom: "-20px", right: "-20px", background: G, padding: "26px 30px" }}>
                <div style={{ fontSize: "36px", fontWeight: "300", color: "#080808", lineHeight: 1 }}>SIC</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "10px", color: "rgba(0,0,0,0.65)", marginTop: "4px" }}>86210 Medical Practice</div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={130}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
                <div style={{ width: "36px", height: "1.5px", background: G }} />
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: G }}>About The Company</span>
              </div>
              <h2 style={{ fontSize: "clamp(30px,4vw,48px)", fontWeight: "300", lineHeight: 1.15, marginBottom: "22px" }}>
                Registered UK Medical<br /><em style={{ color: G, fontStyle: "italic" }}>Practice in Blackburn</em>
              </h2>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "15px", lineHeight: 1.85, color: "rgba(245,240,235,0.58)", marginBottom: "16px", fontWeight: "300" }}>
                Emrzase Hope Ltd (Company No. 16791155) is a private limited company incorporated on 16 October 2025, registered at 28 Copperfield Street, Blackburn, England, BB1 1RB. Operating under SIC code 86210 — General Medical Practice Activities.
              </p>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "15px", lineHeight: 1.85, color: "rgba(245,240,235,0.58)", marginBottom: "30px", fontWeight: "300" }}>
                Directed by two identity-verified medical professionals: Dr. Emad Elsayed Hassan Ali (appointed October 2025) and Dr. Mariam Mohamed Elmamoon Yehia Zakaria (appointed January 2026). Both verified via ACE Business Advice Ltd ACSP through Companies House.
              </p>
              {["Companies House verified — Active status","Two qualified medical directors","General medical practice activities (SIC 86210)","Registered in Blackburn, Lancashire, England"].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                  <div style={{ width: "16px", height: "16px", border: `1px solid ${G}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <div style={{ width: "6px", height: "6px", background: G }} />
                  </div>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "rgba(245,240,235,0.68)" }}>{item}</span>
                </div>
              ))}
              <div style={{ marginTop: "32px" }}>
                <button className="btn" onClick={() => scrollTo("Contact")}>Contact Us</button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* DIRECTORS */}
      <section style={{ background: "#0a0a0a", padding: "72px 48px", borderTop: "1px solid rgba(201,169,110,0.08)" }} className="section-pad">
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "14px" }}>
              <div style={{ width: "36px", height: "1px", background: G }} />
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: G }}>Company Directors</span>
              <div style={{ width: "36px", height: "1px", background: G }} />
            </div>
            <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: "300" }}>Verified by <em style={{ color: G, fontStyle: "italic" }}>Companies House</em></h2>
          </div>
        </FadeIn>
        <div style={{ maxWidth: "860px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }} className="grid2">
          {COMPANY.directors.map((d, i) => (
            <FadeIn key={d.name} delay={i * 110}>
              <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(201,169,110,0.12)", padding: "32px 28px" }}>
                <div style={{ width: "44px", height: "44px", background: G, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans',sans-serif", fontSize: "13px", fontWeight: "600", color: "#080808", marginBottom: "18px" }}>
                  {d.name.split(" ").filter((_,j)=>j>0).map(n=>n[0]).slice(0,2).join("")}
                </div>
                <h3 style={{ fontSize: "19px", fontWeight: "400", marginBottom: "5px" }}>{d.name}</h3>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: G, marginBottom: "18px" }}>{d.role}</div>
                <div style={{ borderTop: "1px solid rgba(245,240,235,0.07)", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {[["Appointed", d.appointed],["Nationality","British"],["Residence","England"],["Identity","Verified ✓"]].map(([k,v]) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: "rgba(245,240,235,0.35)" }}>{k}</span>
                      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: v === "Verified ✓" ? "#22c55e" : "rgba(245,240,235,0.68)" }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "110px 48px", background: "#080808" }} className="section-pad">
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "14px" }}>
              <div style={{ width: "36px", height: "1px", background: G }} />
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: G }}>What We Offer</span>
              <div style={{ width: "36px", height: "1px", background: G }} />
            </div>
            <h2 style={{ fontSize: "clamp(30px,5vw,54px)", fontWeight: "300", letterSpacing: "-0.02em" }}>Our <em style={{ color: G, fontStyle: "italic" }}>Services</em></h2>
          </div>
        </FadeIn>
        <div style={{ maxWidth: "1300px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "2px" }} className="grid2">
          {SERVICES.map((s, i) => (
            <FadeIn key={s.title} delay={i * 70}>
              <div className="svc-card">
                <img src={s.img} alt={s.title} />
                <div className="svc-overlay">
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: G, marginBottom: "10px", padding: "3px 10px", border: "1px solid rgba(201,169,110,0.4)", display: "inline-block" }}>{s.tag}</div>
                  <h3 style={{ fontSize: "clamp(20px,2.5vw,28px)", fontWeight: "300", marginBottom: "10px" }}>{s.title}</h3>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", lineHeight: 1.65, color: "rgba(245,240,235,0.65)" }}>{s.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* VIDEOS */}
      <section id="videos" style={{ padding: "110px 48px", background: "#0a0a0a", borderTop: "1px solid rgba(201,169,110,0.08)" }} className="section-pad">
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "14px" }}>
              <div style={{ width: "36px", height: "1px", background: G }} />
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: G }}>Medical Education</span>
              <div style={{ width: "36px", height: "1px", background: G }} />
            </div>
            <h2 style={{ fontSize: "clamp(30px,5vw,54px)", fontWeight: "300", letterSpacing: "-0.02em", marginBottom: "16px" }}>Clinical <em style={{ color: G, fontStyle: "italic" }}>Learning Videos</em></h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "14px", color: "rgba(245,240,235,0.45)", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>30 curated videos across 13 specialties. Watch inline or open on YouTube.</p>
          </div>
        </FadeIn>

        {/* Topic Filter */}
        <div style={{ maxWidth: "1300px", margin: "0 auto 36px", display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
          {allTopics.map(t => (
            <button key={t} className={`filter-btn${videoFilter === t ? " active" : ""}`} onClick={() => { setVideoFilter(t); setActiveVideo(null); }}>{t}</button>
          ))}
        </div>

        {/* Inline Player */}
        {activeVideo && (
          <div style={{ maxWidth: "900px", margin: "0 auto 48px" }}>
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, background: "#000", border: "1px solid rgba(201,169,110,0.18)" }}>
              <iframe
                key={activeVideo}
                src={`https://www.youtube-nocookie.com/embed/${activeVideo}?autoplay=1&rel=0&modestbranding=1`}
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen title="Medical video"
              />
            </div>
            <div style={{ display: "flex", gap: "12px", marginTop: "12px", alignItems: "center" }}>
              <button onClick={() => setActiveVideo(null)} style={{ background: "none", border: "1px solid rgba(245,240,235,0.15)", color: "rgba(245,240,235,0.45)", padding: "8px 18px", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: "11px", letterSpacing: "0.1em", transition: "all 0.25s" }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="#c9a96e";e.currentTarget.style.color="#c9a96e";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(245,240,235,0.15)";e.currentTarget.style.color="rgba(245,240,235,0.45)";}}>
                ✕ Close Player
              </button>
              <a href={`https://www.youtube.com/watch?v=${activeVideo}`} target="_blank" rel="noreferrer" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", letterSpacing: "0.1em", color: G, textDecoration: "none", border: "1px solid rgba(201,169,110,0.3)", padding: "8px 18px", transition: "all 0.25s" }}>
                Open on YouTube ↗
              </a>
            </div>
          </div>
        )}

        {/* Video Grid */}
        <div style={{ maxWidth: "1300px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }} className="grid3">
          {filteredVideos.map((v, i) => {
            const tc = TOPIC_COLORS[v.topic] || G;
            const isPlaying = activeVideo === v.id;
            return (
              <FadeIn key={v.id} delay={(i % 6) * 50}>
                <div className="vid-card" style={{ border: isPlaying ? `1px solid ${tc}` : "1px solid rgba(245,240,235,0.07)", background: isPlaying ? `${tc}10` : "rgba(255,255,255,0.025)" }}>
                  <div style={{ padding: "24px 22px 16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                      <div style={{ width: "40px", height: "40px", background: `${tc}18`, border: `1px solid ${tc}40`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill={tc}><polygon points="5,3 19,12 5,21" /></svg>
                      </div>
                      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: tc, background: `${tc}12`, padding: "3px 8px", border: `1px solid ${tc}25` }}>{v.topic}</span>
                    </div>
                    <div style={{ fontSize: "17px", fontWeight: "400", lineHeight: 1.3, marginBottom: "6px" }}>{v.title}</div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: "rgba(245,240,235,0.35)", marginBottom: "18px" }}>{v.channel}</div>
                  </div>
                  <div style={{ borderTop: "1px solid rgba(245,240,235,0.06)", display: "flex" }}>
                    <button onClick={() => setActiveVideo(isPlaying ? null : v.id)} style={{ flex: 1, padding: "12px", background: isPlaying ? `${tc}15` : "transparent", border: "none", color: isPlaying ? tc : "rgba(245,240,235,0.55)", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", transition: "all 0.25s", borderRight: "1px solid rgba(245,240,235,0.06)" }}
                      onMouseEnter={e=>{if(!isPlaying){e.currentTarget.style.background=`${tc}12`;e.currentTarget.style.color=tc;}}}
                      onMouseLeave={e=>{if(!isPlaying){e.currentTarget.style.background="transparent";e.currentTarget.style.color="rgba(245,240,235,0.55)";}}}
                    >{isPlaying ? "▶ Playing" : "▶ Play Here"}</button>
                    <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noreferrer" style={{ flex: 1, padding: "12px", background: "transparent", border: "none", color: "rgba(245,240,235,0.4)", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.25s" }}
                      onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.04)";e.currentTarget.style.color="#c9a96e";}}
                      onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="rgba(245,240,235,0.4)";}}>
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
      <section id="quiz" style={{ padding: "110px 48px", background: "#080808", borderTop: "1px solid rgba(201,169,110,0.08)" }} className="section-pad">
        <div style={{ maxWidth: "920px", margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "14px" }}>
                <div style={{ width: "36px", height: "1px", background: G }} />
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: G }}>Test Your Knowledge</span>
                <div style={{ width: "36px", height: "1px", background: G }} />
              </div>
              <h2 style={{ fontSize: "clamp(30px,5vw,54px)", fontWeight: "300", letterSpacing: "-0.02em", marginBottom: "14px" }}>Medical <em style={{ color: G, fontStyle: "italic" }}>Specialist Quiz</em></h2>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "14px", color: "rgba(245,240,235,0.4)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>10 specialties · 10 questions each · 5 randomised sets per specialty. Questions are reshuffled every time — designed for qualified medical professionals.</p>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,169,110,0.12)", padding: "44px 40px" }}>
              <MedicalQuiz />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* QUOTE BANNER */}
      <section style={{ position: "relative", height: "380px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1600&q=80" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.2)" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(8,8,8,0.55)" }} />
        <div style={{ position: "relative", textAlign: "center", padding: "0 24px" }}>
          <h2 style={{ fontSize: "clamp(28px,5vw,58px)", fontWeight: "300", marginBottom: "18px", maxWidth: "760px" }}>
            "We don't just provide care —<br /><em style={{ color: G }}>we transform lives."</em>
          </h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,240,235,0.35)" }}>— Emrzase Hope Ltd Core Values</p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "110px 48px", background: "#0a0a0a", borderTop: "1px solid rgba(201,169,110,0.08)" }} className="section-pad">
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "start" }} className="grid2">
          <FadeIn>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
                <div style={{ width: "36px", height: "1px", background: G }} />
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: G }}>Get In Touch</span>
              </div>
              <h2 style={{ fontSize: "clamp(28px,4vw,46px)", fontWeight: "300", lineHeight: 1.2, marginBottom: "20px" }}>Contact<br /><em style={{ color: G, fontStyle: "italic" }}>Emrzase Hope Ltd</em></h2>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "14px", lineHeight: 1.85, color: "rgba(245,240,235,0.52)", marginBottom: "40px", fontWeight: "300" }}>To enquire about our general medical practice services or to get in touch with our directors, use the form or contact details below.</p>
              {[["📍","Registered Address","28 Copperfield Street, Blackburn, England, BB1 1RB"],["🏢","Company Number","16791155 (Companies House)"],["⚕️","Business Type","General Medical Practice (SIC 86210)"],["📅","Incorporated","16 October 2025"]].map(([icon,label,val]) => (
                <div key={label} style={{ display: "flex", gap: "16px", alignItems: "flex-start", marginBottom: "22px" }}>
                  <div style={{ fontSize: "15px", marginTop: "1px" }}>{icon}</div>
                  <div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,240,235,0.3)", marginBottom: "3px" }}>{label}</div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "#f5f0eb" }}>{val}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={130}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <div style={{ fontSize: "40px", color: G, marginBottom: "16px" }}>✦</div>
                <h3 style={{ fontSize: "28px", fontWeight: "300", marginBottom: "10px" }}>Message sent.</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(245,240,235,0.45)", fontSize: "14px" }}>We'll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                <input className="input-field" type="text" placeholder="Your Name" required value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})} />
                <input className="input-field" type="email" placeholder="Your Email" required value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})} />
                <textarea className="input-field" rows="5" placeholder="Your Message" required value={formState.message} style={{ resize: "none" }} onChange={e => setFormState({...formState, message: e.target.value})} />
                <button type="submit" className="btn btn-solid" style={{ alignSelf: "flex-start", padding: "14px 40px" }}>Send Message</button>
              </form>
            )}
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#050505", borderTop: "1px solid rgba(201,169,110,0.08)", padding: "48px 48px" }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "32px", marginBottom: "32px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <div style={{ width: "28px", height: "28px", background: G, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans',sans-serif", fontSize: "10px", fontWeight: "600", color: "#080808" }}>EM</div>
                <span style={{ fontSize: "16px", fontWeight: "400" }}>Emrzase Hope Ltd</span>
              </div>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: "rgba(245,240,235,0.25)", lineHeight: 1.7, maxWidth: "280px" }}>
                Company No. 16791155 · Registered in England<br />28 Copperfield Street, Blackburn, BB1 1RB<br />SIC 86210 — General Medical Practice Activities
              </p>
            </div>
            <div style={{ display: "flex", gap: "28px", flexWrap: "wrap", alignItems: "center" }}>
              {NAV_LINKS.map(l => <span key={l} className="nav-link" onClick={() => scrollTo(l)} style={{ fontSize: "11px" }}>{l}</span>)}
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(245,240,235,0.05)", paddingTop: "20px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: "rgba(245,240,235,0.18)" }}>© {new Date().getFullYear()} Emrzase Hope Ltd. All rights reserved.</p>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: "rgba(245,240,235,0.18)" }}>Incorporated 16 October 2025 · Active · Companies House Verified</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
