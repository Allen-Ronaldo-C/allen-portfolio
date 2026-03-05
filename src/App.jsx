// App.jsx - Complete Working Version
import { useState, useEffect, useRef } from 'react'
import './styles.css'

/* ═══════════════════════════════════════════════════
   LOADER COMPONENT
═══════════════════════════════════════════════════ */
function Loader() {
  return (
    <div className="loader-wrapper">
      <div className="atom-loader">
        <div className="nucleus"></div>
        <div className="orbit">
          <div className="electron"></div>
          <div className="electron"></div>
          <div className="electron"></div>
        </div>
      </div>
      <div className="loader-text">Allen Ronaldo C</div>
      <div className="loader-subtext">Loading portfolio...</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════ */
const SKILLS = [
  { id:'prog', icon:'💻', name:'Programming', color:'#00f5ff',
    skills:[{n:'Python',l:90},{n:'C / Embedded C',l:85},{n:'Java',l:72},{n:'JavaScript',l:75},{n:'React',l:70}] },
  { id:'ai', icon:'🤖', name:'AI & Computer Vision', color:'#ff6b00',
    skills:[{n:'YOLO v5/v8',l:85},{n:'OpenCV',l:88},{n:'Machine Learning',l:78},{n:'Computer Vision',l:85},{n:'AI Systems',l:75}] },
  { id:'iot', icon:'🔌', name:'IoT & Embedded', color:'#39ff14',
    skills:[{n:'Raspberry Pi',l:88},{n:'ESP32 / Arduino',l:80},{n:'Sensors & Hardware',l:85},{n:'Embedded Programming',l:82},{n:'NIR Systems',l:75}] },
  { id:'tools', icon:'🛠', name:'Tools & Platforms', color:'#ffc400',
    skills:[{n:'Linux (Ubuntu)',l:85},{n:'Git & GitHub',l:88},{n:'VS Code / Arduino IDE',l:90},{n:'React / HTML / CSS',l:75},{n:'Frontend Dev',l:72}] },
]

const PROJECTS = [
  { id:'traffic', num:'01', icon:'🚦', title:'Smart Traffic Signal System', subtitle:'AI-powered adaptive urban traffic control', domain:'AI + Computer Vision + IoT + Smart Cities', color:'#00f5ff', status:'Completed',
    problem:'Urban intersections in India run on fixed timers, creating massive idle-green waste even when lanes are empty. Emergency vehicles have zero signal priority. Standard YOLO models fail on Indian traffic: auto-rickshaws, cattle, and chaotic lane mixing.',
    approach:'Deployed a fine-tuned YOLOv5 model on Raspberry Pi 4 with a Logitech C270 camera. A custom vehicle-density algorithm dynamically recalculates green-signal duration every cycle. GPIO controls the signal relay board. Emergency vehicle audio-signature detection triggers immediate override.',
    arch:['Logitech C270 → PiCamera API → Frame buffer','YOLOv5 inference → Vehicle class + bounding-box count','Density score → Adaptive timing algorithm (5–60s)','GPIO relay → Physical signal hardware','WebSocket → Live monitoring dashboard'],
    metrics:[{v:'91.4%',l:'Detection Accuracy',s:'Indian traffic dataset'},{v:'~12 FPS',l:'Inference Speed',s:'Raspberry Pi 4, 4GB'},{v:'~38%',l:'Signal Idle Reduction',s:'simulated urban grid'},{v:'14.1 MB',l:'Model Size',s:'YOLOv5n quantized'}],
    tradeoffs:['YOLOv5n over YOLOv8 — 3× faster inference on Pi at cost of 4% accuracy','GPIO polling vs interrupt-driven: polling chosen for signal reliability','Night-mode: IR supplemental lighting added after daylight-only failure'],
    future:['Multi-camera intersection fusion','Federated learning from multiple city nodes','Edge TPU upgrade for sub-20ms inference'],
    tech:['Python','YOLOv5','OpenCV','Raspberry Pi 4','GPIO','Logitech C270'],
    tags:['Computer Vision','Edge AI','IoT','Smart City'] },
  { id:'veinspot', num:'02', icon:'🩺', title:'VeinSpot', subtitle:'Low-cost NIR vein visualizer for clinical care', domain:'Biomedical Device + Embedded Systems', color:'#39ff14', status:'Prototype',
    problem:'Vein visibility failure is a leading cause of failed IV insertions — critical for pediatric and geriatric patients where multiple needle attempts cause trauma. Commercial NIR finders cost ₹50,000–₹3,00,000, inaccessible to rural Indian hospitals.',
    approach:'Exploited 850nm NIR absorption differential between hemoglobin and surrounding tissue. An LED ring illuminates the skin; the ESP32-CAM captures NIR reflectance. CLAHE + adaptive Otsu thresholding enhances vein contrast and overlays a green vein map on the display.',
    arch:['850nm IR LED ring → Tissue illumination','ESP32-CAM (NIR filter removed) → Raw capture @ 30fps','CLAHE → Contrast-limited adaptive histogram equalization','Adaptive Otsu threshold → Binary vein mask','Morphological operations → Vein skeleton overlay'],
    metrics:[{v:'~2mm',l:'Vein Depth',s:'through skin tissue'},{v:'30 FPS',l:'Frame Rate',s:'ESP32-CAM capture'},{v:'<₹2,500',l:'Device Cost',s:'vs ₹50K+ commercial'},{v:'~4W',l:'Power Draw',s:'USB-C operable'}],
    tradeoffs:['ESP32-CAM vs Pi Zero: ESP32 chosen for lower cost and adequate resolution','Hardware NIR filter removal: eliminates visible-light bleed vs software filtering','CLAHE: 40% better vein contrast with minimal noise vs standard histogram eq'],
    future:['Deep learning vein segmentation (U-Net)','Portable 3D-printed enclosure with rechargeable pack','Clinical trial — IRB approval planned'],
    tech:['Raspberry Pi','ESP32-CAM','NIR LEDs 850nm','OpenCV','Python','Image Processing'],
    tags:['Medical Device','NIR Imaging','Hardware','Healthcare'] },
  { id:'antipiracy', num:'03', icon:'🔐', title:'Anti-Piracy AI Fingerprinting', subtitle:'Multi-format AI content authentication system', domain:'AI/ML + Cyber Security', color:'#ff6b00', status:'Hack2Skill Finalist',
    problem:'Digital piracy costs the global media industry $71B annually. Checksums fail on re-encoded content; watermarks are trivially stripped. A robust system must survive aggressive attacks: compression, cropping, pitch-shift, and paraphrase.',
    approach:'Tri-modal fingerprinting pipeline: Audio — librosa MFCC → perceptual hash. Image — OpenCV DCT-based perceptual hash. Text — TF-IDF + BERT embedding → cosine similarity fingerprint. All fingerprints indexed in MongoDB with FAISS ANN for sub-100ms lookup.',
    arch:['Audio → librosa MFCC → Perceptual audio hash','Image → OpenCV DCT → Perceptual image hash','Text → BERT embedding + TF-IDF → Fingerprint vector','MongoDB → Fingerprint store','FAISS ANN → Sub-100ms similarity search','FastAPI + React → REST API + dashboard'],
    metrics:[{v:'97.3%',l:'Detection Accuracy',s:'across 8 attack types'},{v:'<100ms',l:'Query Latency',s:'FAISS ANN search'},{v:'8/8',l:'Attack Resistance',s:'compression, crop, re-encode...'},{v:'3 types',l:'Format Coverage',s:'audio, image, text'}],
    tradeoffs:['Perceptual hash vs CNN embedding: perceptual 10× faster at cost of 3% accuracy','FAISS flat vs IVF index: flat for <10k fingerprint dataset size','BERT + TF-IDF hybrid: semantic + exact match — best of both'],
    future:['Video fingerprinting via temporal frame sampling','Blockchain ledger for immutable rights registry','Real-time streaming content monitoring API'],
    tech:['Python','OpenCV','librosa','BERT','FAISS','MongoDB','FastAPI','React'],
    tags:['AI Security','Deep Learning','NLP','Full Stack'] },
  { id:'lifelink', num:'04', icon:'🚨', title:'LifeLink', subtitle:'Smart emergency communication & assistance platform', domain:'AI + Web Technologies + Safety Systems', color:'#ff4466', status:'In Development',
    problem:'During emergencies, people struggle to quickly reach services and share critical information. Existing solutions are slow, inaccessible, or require too many steps under stress — costing lives in the critical first minutes of an incident.',
    approach:'Web-based platform centered on one-tap emergency activation. AI assists in situation communication, automatically shares location and health profile to emergency contacts and services. Designed with radical accessibility — no app install required, works on any device.',
    arch:['1-tap trigger → AI-assisted situation summary generation','Geolocation API → Real-time location broadcast to contacts','Alert engine → Emergency services + trusted contact notification','Health profile → Pre-loaded medical data sharing on activation','WebSocket → Live status feed for responders'],
    metrics:[{v:'<3 sec',l:'Alert Dispatch',s:'trigger to contacts'},{v:'1-tap',l:'Activation',s:'minimal friction design'},{v:'AI',l:'Communication Assist',s:'situation summarization'},{v:'Zero',l:'Install Barrier',s:'pure web platform'}],
    tradeoffs:['Web vs native app: web chosen for zero-install emergency access','AI summary vs manual input: AI reduces cognitive load under acute stress','Centralized vs P2P alerts: centralized for reliability in low-signal scenarios'],
    future:['Offline-capable PWA for low-connectivity areas','Integration with national emergency API (112 India)','Wearable hardware trigger module'],
    tech:['React','AI Communication','Geolocation API','WebSockets','Web Technologies','User-centered Design'],
    tags:['Safety','AI','Emergency Response','Accessibility'] },
  { id:'justispeak', num:'05', icon:'🎙️', title:'JustiSpeak', subtitle:'Intelligent voice-based accessibility & communication system', domain:'AI + Voice + Assistive Technology', color:'#bf5fff', status:'In Development',
    problem:'People in critical or accessibility-constrained environments cannot rely on traditional keyboard/screen interfaces. Voice remains the most natural and fastest human communication channel — yet most systems still treat it as a secondary input method.',
    approach:'Voice-first platform with AI-based speech understanding. Users interact entirely through voice commands — the system interprets intent, not just keywords. Designed for assistive technology contexts where traditional UI is inaccessible or too slow.',
    arch:['Microphone input → Speech-to-text engine','AI intent classification → Context-aware understanding','Response generation → Natural language output','Accessibility layer → Screen reader + voice output integration','Session context → Multi-turn conversation memory'],
    metrics:[{v:'Voice',l:'Primary Interface',s:'100% voice-driven UX'},{v:'AI',l:'Speech Understanding',s:'intent not just keywords'},{v:'Low',l:'Latency Target',s:'real-time interaction'},{v:'Multi',l:'Platform',s:'web + embedded targets'}],
    tradeoffs:['Cloud STT vs on-device: cloud chosen for accuracy, on-device planned for privacy','Keyword matching vs NLU: full NLU chosen for natural interaction','Text-to-speech engine: neural TTS for naturalness vs speed trade-off'],
    future:['On-device speech model for offline + private use','Legal and medical domain fine-tuning','Integration with screen-reader standards (WCAG)'],
    tech:['AI Speech Understanding','NLP','Web Speech API','React','Accessibility APIs'],
    tags:['Voice AI','Assistive Tech','Accessibility','NLP'] },
  { id:'spectraguard', num:'06', icon:'🛡️', title:'SpectraGuard', subtitle:'Intelligent sensor-based environment monitoring & security', domain:'IoT + Sensors + Security Systems', color:'#ffc400', status:'Prototype',
    problem:'Security and environmental monitoring systems are reactive — they alert after something has already gone wrong. Intelligent anomaly detection using sensor fusion can predict and prevent incidents rather than just report them.',
    approach:'Multi-sensor data fusion platform integrating environmental and motion sensors. AI-based anomaly detection identifies deviations from baseline patterns. Real-time alerts dispatched when threshold violations or unusual patterns are detected — with severity classification.',
    arch:['Sensor array → Multi-channel data ingestion','Baseline modeling → Normal pattern establishment','Anomaly detection model → Deviation scoring','Severity classifier → Alert prioritization','Real-time alert engine → Dashboard + notification'],
    metrics:[{v:'Multi',l:'Sensor Fusion',s:'environmental + motion'},{v:'Real-time',l:'Alert Dispatch',s:'sub-second detection'},{v:'AI',l:'Anomaly Detection',s:'pattern-based intelligence'},{v:'Smart',l:'Infrastructure',s:'adaptive thresholds'}],
    tradeoffs:['Rule-based vs ML anomaly detection: ML chosen for adaptive thresholds','Edge vs cloud processing: edge-first for latency, cloud for model updates','Wired vs wireless sensors: wireless for deployment flexibility'],
    future:['Computer vision integration for visual anomaly detection','Predictive maintenance for industrial IoT use cases','Integration with smart city infrastructure APIs'],
    tech:['IoT Sensors','Python','Data Analysis','Embedded Systems','AI Detection','Real-time Alerts'],
    tags:['IoT','Security','Environmental Monitoring','Smart Infrastructure'] },
]

const MINI_PROJECTS = [
  { num:'H1', icon:'🌱', title:'Smart Agriculture Monitoring System', color:'#39ff14',
    pts:['IoT sensors monitoring soil moisture, temperature & pH','Automated irrigation trigger based on sensor thresholds','Real-time data dashboard for crop management'],
    tech:['IoT Sensors','Embedded Systems','Python','Data Monitoring'] },
  { num:'H2', icon:'📡', title:'Raspberry Pi Remote Access & Camera', color:'#5a9aff',
    pts:['SSH headless setup & VNC remote configuration','Pi Zero 2W camera integration at 30fps','Remote monitoring dashboard prototype'],
    tech:['Raspberry Pi Zero 2W','SSH','VNC','PiCamera'] },
  { num:'S1', icon:'🖥️', title:'Doctor Dashboard UI', color:'#9aff5a',
    pts:['React-based patient vitals dashboard','Data visualization concepts for medical UI','Clean, accessible medical-grade interface design'],
    tech:['React','Chart.js','CSS','JavaScript'] },
  { num:'S2', icon:'🎓', title:"Twystra'26 Symposium Website", color:'#ffc400',
    pts:['Official symposium website — 500+ student participants','Firebase-backed event registration & schedule system','Led 8-member web team; VP of ECE Association'],
    tech:['React','Firebase','Vercel','CSS'] },
]

const RESEARCH_DOMAINS = [
  { id:'astrophysics', icon:'🔭', title:'Astrophysics & Cosmology', color:'#bf5fff', tagline:'Where mathematics meets the infinite',
    topics:['Black Hole thermodynamics & information paradox','Event horizon mechanics and Hawking radiation','Gravitational singularities and spacetime curvature','Schwarzschild radius and escape velocity modeling'],
    method:["Literature review of Hawking (1974) and Penrose (1965) singularity theorems","Mathematical modeling of photon sphere at r = 3GM/c²","Python simulation of light-bending around Schwarzschild geometry","Analysis of Bekenstein-Hawking entropy: S = kA/4ℓp²"],
    eqs:[{name:"Einstein's Field Equation",math:'Gμν + Λgμν = (8πG / c⁴) Tμν',desc:'Relates spacetime curvature to energy-momentum of matter. The mathematical backbone of general relativity — governs black hole geometry and gravitational lensing.'},{name:'Schwarzschild Radius',math:'r_s = 2GM / c²',desc:'The critical radius at which escape velocity equals c. For Earth: r_s ≈ 9mm. For the Sun: ≈ 3km.'}],
    project:{title:'Modeling Black Hole Event Horizon',status:'Theoretical / Simulation',tools:'Python (NumPy, Matplotlib), MATLAB',scope:'Extend to Kerr (rotating) black hole and accretion disk radiation modeling'} },
  { id:'quantum', icon:'⚛', title:'Quantum Computing', color:'#00f5ff', tagline:'Computation beyond classical limits',
    topics:['Qubits, superposition and quantum parallelism','Quantum entanglement and Bell state preparation',"Grover's search and Shor's factoring algorithms",'Post-quantum cryptography (NIST PQC standards)','Quantum-classical hybrid models'],
    method:["Literature study of Grover's O(√N) vs classical O(N) search","Circuit implementation in IBM Qiskit — 4-qubit Grover's search demo","Study of Shor's algorithm: integer factoring in polynomial time","Explored PQC: CRYSTALS-Kyber, CRYSTALS-Dilithium"],
    eqs:[{name:"Schrödinger's Equation",math:'iℏ ∂Ψ/∂t = Ĥ Ψ',desc:'Governs the time evolution of a quantum state — fundamental to qubit dynamics, quantum gate operations, and the collapse of superposition upon measurement.'},{name:'Qubit State (Bloch Sphere)',math:'|ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩',desc:'Geometric representation of a qubit. Superposition is not 0 or 1 — it is a weighted combination of both, collapsed only upon measurement.'}],
    project:{title:"Quantum Search — Grover's Algorithm Simulation",status:'Simulated / Explored',tools:'IBM Qiskit, Python, Jupyter Notebook',scope:'Apply quantum amplitude amplification to traffic path optimization'} },
  { id:'space', icon:'🌠', title:'Space Systems & AI', color:'#ffc400', tagline:'Intelligence at the scale of the cosmos',
    topics:['Spacetime curvature and gravitational wave detection','Special & general relativity applied to satellite clock drift','AI-based satellite navigation optimization','Interstellar propulsion: ion drives, solar sails','ISRO research exposure — propulsion and space engineering'],
    method:['Study of GPS relativistic correction — SR + GR combined effect','Orbital mechanics: vis-viva equation, Hohmann transfer, gravity assists','Review of JWST data pipeline — AI-based transient detection','Exposure to ISRO IPRC research environment and propulsion systems'],
    eqs:[{name:"Newton's Law of Gravitation",math:'F = G · m₁m₂ / r²',desc:'Foundation for orbital mechanics and spacecraft navigation. GPS satellites require both special and general relativistic corrections to maintain cm-level positional accuracy.'},{name:'Gravitational Time Dilation',math:'Δt_sat / Δt_ground = √(1 − 2GM/rc²)',desc:"GPS satellites run ~38 microseconds fast per day due to this effect. Without correction, GPS would drift ~10km/day. Einstein's equations run inside your phone."}],
    project:{title:'AI Orbital Trajectory Optimization',status:'Conceptual / Early Prototype',tools:'Python, OpenAI Gym, TensorFlow, NASA Horizons API',scope:'Extend to multi-satellite constellation coordination with federated RL'} },
]

const ACHIEVEMENTS = [
  { icon:'📄', title:'IEEE Research Publication', org:'IEEE Conference Proceedings', desc:'Published peer-reviewed research on a Low Power Pseudo Random Number Generator using Linear Feedback Shift Register (LFSR) — targeting cryptography and secure embedded communication systems.', color:'#ffc400', level:'Published', year:'2025' },
  { icon:'🇮🇳', title:'Smart India Hackathon', org:'Ministry of Education, Govt. of India', desc:'Selected participant in the national-level hackathon — proposed the Smart Traffic Signal System using YOLOv5 edge inference on Raspberry Pi for Indian road conditions.', color:'#ff6b00', level:'National', year:'2024' },
  { icon:'🔐', title:'Hack2Skill Anti-Piracy Hackathon', org:'Hack2Skill Platform', desc:'Finalist for the AI-based digital content fingerprinting system — robust perceptual hashing pipeline with 97.3% detection accuracy across 8 attack types.', color:'#bf5fff', level:'Finalist', year:'2024' },
  { icon:'🏆', title:'Certificate of Excellence', org:'Unstop Management Series', desc:'Awarded Certificate of Excellence for outstanding performance in technical challenges and problem-solving competitions on the Unstop platform.', color:'#00f5ff', level:'Excellence', year:'2024' },
  { icon:'👑', title:'Vice President — ECE Association', org:'R.M.K College of Engineering and Technology', desc:'Elected VP of the ECE Association — organizing technical symposiums, student workshops, and innovation events. Conducted Quantum Computing webinars for 80+ students.', color:'#39ff14', level:'Leadership', year:'2023–Present' },
]

const EXPERIENCE = [
  { role:'Intern — Space Research', org:'ISRO Propulsion Complex (IPRC)', period:'2024', type:'Industry', color:'#ff6b00',
    pts:['Exposure to space engineering systems and propulsion technologies at ISRO IPRC','Experienced high-precision research workflows in a national space agency environment','Gained insight into propulsion systems and engineering standards at ISRO'] },
  { role:'Intern — Software & Technology', org:'Entudio', period:'2024', type:'Industry', color:'#00f5ff',
    pts:['Worked on technical projects in software development and problem solving','Gained practical exposure to industry-level engineering workflows and team collaboration','Applied frontend and AI skills in a real-world product environment'] },
  { role:'Vice President', org:"ECE Association — R.M.K College of Engineering", period:'2023–Present', type:'Leadership', color:'#39ff14',
    pts:['Organizing technical symposiums, workshops, and innovation events for ECE students','Conducted Quantum Computing webinar for 80+ students — IBM Qiskit demo included','Represented ECE dept. at symposiums: Velammal, Chennai IT, MIT, Rajalakshmi IT'] },
  { role:'Technical Webinar Presenter', org:'Dept. Workshop — Quantum Computing', period:'2024', type:'Teaching', color:'#bf5fff',
    pts:["Conducted 90-min session on Quantum Computing for 80+ ECE students","Covered superposition, entanglement, Grover's algorithm, IBM Qiskit demo",'Session recorded for departmental resource library'] },
]

const BLOG_POSTS = [
  { type:'IEEE PAPER', typeColor:'#ffc400', emoji:'📄',
    title:'Low Power PRNG Using Linear Feedback Shift Register (LFSR)',
    excerpt:'Published IEEE research on designing an efficient, low-power Pseudo Random Number Generator using LFSR — with applications in cryptography, secure communications, and embedded systems.',
    tags:['IEEE','LFSR','Cryptography','Embedded'], read:'Peer Reviewed', date:'2025', color:'#ffc400', link:'#', badge:'PUBLISHED' },
  { type:'TECHNICAL BLOG', typeColor:'#00f5ff', emoji:'🚦',
    title:'Deploying YOLOv5 on Raspberry Pi 4: From 2fps to 12fps',
    excerpt:'Real-time object detection on edge hardware is harder than it looks. Model quantization, threading, and why YOLOv5n beats YOLOv8 on Pi — with actual benchmarks.',
    tags:['Edge AI','YOLO','Raspberry Pi'], read:'8 min', date:'Coming Soon', color:'#00f5ff', link:'#', badge:null },
  { type:'TECHNICAL BLOG', typeColor:'#39ff14', emoji:'🩺',
    title:'Building VeinSpot: The Full NIR Hardware + Software Stack',
    excerpt:'NIR imaging: ESP32-CAM, 850nm LEDs, and OpenCV. Complete technical breakdown — optics selection, CLAHE pipeline, and lessons from the clinical prototype.',
    tags:['Medical Device','NIR','Hardware'], read:'10 min', date:'Coming Soon', color:'#39ff14', link:'#', badge:null },
  { type:'ACADEMIC EXPLAINER', typeColor:'#bf5fff', emoji:'⚛',
    title:"Quantum Computing for Engineers: Qubits to Grover's Algorithm",
    excerpt:"Skip the philosophy — straight to the math, circuits, and what quantum advantage means for engineering. Includes IBM Qiskit simulation examples.",
    tags:['Quantum','Qiskit','Tutorial'], read:'12 min', date:'Coming Soon', color:'#bf5fff', link:'#', badge:null },
  { type:'ACADEMIC EXPLAINER', typeColor:'#ff6b00', emoji:'🔭',
    title:"Black Hole Event Horizon — An Engineer's Mathematical Perspective",
    excerpt:'Schwarzschild radius, spacetime curvature, and Hawking radiation from first principles. How an ECE student approached general relativity with Python simulations.',
    tags:['Astrophysics','Black Holes','Python'], read:'9 min', date:'Coming Soon', color:'#ff6b00', link:'#', badge:null },
]

/* ═══════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════ */
function useFadeIn() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('on')),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    const refresh = () => document.querySelectorAll('.fi:not(.on)').forEach(el => obs.observe(el))
    refresh()
    const t = setInterval(refresh, 600)
    return () => { obs.disconnect(); clearInterval(t) }
  }, [])
}

function useTypewriter(strings) {
  const [displayed, setDisplayed] = useState('')
  const [idx, setIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const cur = strings[idx]
    let t
    if (!deleting) {
      if (charIdx < cur.length) t = setTimeout(() => { setDisplayed(cur.slice(0, charIdx+1)); setCharIdx(c=>c+1) }, 80)
      else t = setTimeout(() => setDeleting(true), 2000)
    } else {
      if (charIdx > 0) t = setTimeout(() => { setDisplayed(cur.slice(0, charIdx-1)); setCharIdx(c=>c-1) }, 45)
      else { setDeleting(false); setIdx(i=>(i+1)%strings.length) }
    }
    return () => clearTimeout(t)
  }, [charIdx, deleting, idx, strings])
  return displayed
}

/* ═══════════════════════════════════════════════════
   CURSOR
═══════════════════════════════════════════════════ */
function Cursor() {
  const dot = useRef(null), ring = useRef(null)
  useEffect(() => {
    let mx=0,my=0,rx=0,ry=0,id
    const move = e => { mx=e.clientX; my=e.clientY; if(dot.current){dot.current.style.left=mx-5+'px';dot.current.style.top=my-5+'px'} }
    const tick = () => { rx+=(mx-rx)*.12; ry+=(my-ry)*.12; if(ring.current){ring.current.style.left=rx-16+'px';ring.current.style.top=ry-16+'px'} id=requestAnimationFrame(tick) }
    document.addEventListener('mousemove',move); tick()
    return () => { document.removeEventListener('mousemove',move); cancelAnimationFrame(id) }
  },[])
  return <><div ref={dot} className="cursor"/><div ref={ring} className="cursor-ring"/></>
}

/* ═══════════════════════════════════════════════════
   STARFIELD
═══════════════════════════════════════════════════ */
function Stars() {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current, ctx = c.getContext('2d')
    let id, stars=[]
    const resize = () => { c.width=window.innerWidth; c.height=window.innerHeight; init() }
    const init = () => { stars = Array.from({length:260},()=>({x:Math.random()*c.width,y:Math.random()*c.height,r:Math.random()*1.4+.2,s:Math.random()*.3+.05,b:Math.random(),p:Math.random()*Math.PI*2,cy:Math.random()>.85})) }
    const draw = t => {
      ctx.clearRect(0,0,c.width,c.height)
      const bg=ctx.createRadialGradient(c.width/2,c.height/2,0,c.width/2,c.height/2,c.width*.8)
      bg.addColorStop(0,'rgba(6,13,24,1)'); bg.addColorStop(1,'rgba(2,4,8,1)')
      ctx.fillStyle=bg; ctx.fillRect(0,0,c.width,c.height)
      ;[{x:c.width*.2,y:c.height*.5,r:280,h:260},{x:c.width*.8,y:c.height*.2,r:220,h:200}].forEach(n=>{
        const g=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r)
        g.addColorStop(0,`hsla(${n.h},70%,40%,.04)`); g.addColorStop(1,'transparent')
        ctx.fillStyle=g; ctx.fillRect(0,0,c.width,c.height)
      })
      stars.forEach(s=>{
        const fl=.5+.5*Math.sin(t*.001*s.s+s.p), a=(.3+.7*fl*s.b)
        ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2)
        ctx.fillStyle=s.cy?`rgba(0,245,255,${a*.85})`:`rgba(255,255,255,${a})`
        ctx.fill()
        if(s.r>1.1){ctx.beginPath();ctx.arc(s.x,s.y,s.r*3,0,Math.PI*2);ctx.fillStyle=s.cy?`rgba(0,245,255,${a*.07})`:`rgba(255,255,255,${a*.04})`;ctx.fill()}
      })
      id=requestAnimationFrame(draw)
    }
    resize(); window.addEventListener('resize',resize); id=requestAnimationFrame(draw)
    return () => { window.removeEventListener('resize',resize); cancelAnimationFrame(id) }
  },[])
  return <canvas ref={ref} style={{position:'fixed',inset:0,width:'100%',height:'100%',zIndex:0,pointerEvents:'none'}}/>
}

/* ═══════════════════════════════════════════════════
   NAV
═══════════════════════════════════════════════════ */
const NAV_LINKS = [['#about','About'],['#skills','Skills'],['#projects','Projects'],['#research','Research'],['#achievements','Awards'],['#blog','Blog'],['#contact','Contact']]

function Nav() {
  const [scrolled,setScrolled] = useState(false)
  const [open,setOpen] = useState(false)
  const [active,setActive] = useState('')
  useEffect(()=>{
    const h=()=>{
      setScrolled(window.scrollY>50)
      let cur=''; document.querySelectorAll('section[id]').forEach(s=>{if(window.scrollY>=s.offsetTop-130)cur=s.id}); setActive(cur)
    }
    window.addEventListener('scroll',h); return()=>window.removeEventListener('scroll',h)
  },[])
  return (
    <nav className={scrolled?'scrolled':''}>
      <div className="nav-logo"><b>[</b>Allen.R<b>]</b><span className="blink">_</span></div>
      <ul className={`nav-links${open?' open':''}`}>
        {NAV_LINKS.map(([href,lbl])=>(
          <li key={href}><a href={href} className={active===href.slice(1)?'active':''} onClick={()=>setOpen(false)}>{lbl}</a></li>
        ))}
      </ul>
      <a href="#contact" className="btn btn-cyan nav-hire">Hire Me</a>
      <button className={`nav-burger${open?' open':''}`} onClick={()=>setOpen(!open)}>
        <span/><span/><span/>
      </button>
    </nav>
  )
}

/* ═══════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════ */
function Hero() {
  const typed = useTypewriter(['AI & IoT Engineer','Embedded Systems Innovator','Computer Vision Builder','Quantum Computing Explorer','Deep-Tech Dreamer'])
  const pRef = useRef(null)
  useEffect(()=>{
    const c=pRef.current; if(!c) return
    const ctx=c.getContext('2d'); c.width=c.offsetWidth; c.height=c.offsetHeight
    const pts=Array.from({length:55},()=>({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*2+.4,a:Math.random()*.4+.15}))
    let id
    const draw=()=>{
      ctx.clearRect(0,0,c.width,c.height)
      pts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=c.width;if(p.x>c.width)p.x=0;if(p.y<0)p.y=c.height;if(p.y>c.height)p.y=0;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(0,245,255,${p.a})`;ctx.fill()})
      for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const d=Math.hypot(pts[i].x-pts[j].x,pts[i].y-pts[j].y);if(d<90){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(0,245,255,${.07*(1-d/90)})`;ctx.lineWidth=.5;ctx.stroke()}}
      id=requestAnimationFrame(draw)
    }
    draw(); return()=>cancelAnimationFrame(id)
  },[])
  return (
    <section id="hero">
      <canvas ref={pRef} className="hero-canvas"/>
      <div className="hero-scan"/>
      <div className="hero-corner tl"/><div className="hero-corner br"/>
      <div className="wrap hero-content">
        <div className="hero-meta">
          <div className="hero-meta-dot"/>
          <span className="hero-meta-text">// WRAP AR</span>
        </div>
        <h1 className="hero-name">Allen<br/><span className="outline">Ronaldo</span><span className="accent"> C</span></h1>
        <div className="hero-type">
          <span className="prefix">{'>'}_</span>
          <span className="text">{typed}</span>
          <span className="cur">|</span>
        </div>
        <p className="hero-tagline">Building intelligent systems at the intersection of AI, IoT, and research-driven engineering —<br/>from silicon to satellite, from algorithm to architecture.</p>
        <div className="hero-stats">
          {[{n:'5+',l:'Projects Built'},{n:'3+',l:'Hackathons'},{n:'1',l:'IEEE Paper'},{n:'∞',l:'Curiosity'}].map(s=>(
            <div key={s.l} className="hero-stat">
              <div className="hero-stat-n">{s.n}</div>
              <div className="hero-stat-l">{s.l}</div>
            </div>
          ))}
        </div>
        <div className="hero-btns">
          <a href="#projects" className="btn btn-cyan">🚀 View Projects</a>
          <<a href="/Allen_Ronaldo_Resume.pdf" className="btn btn-outline" target="_blank" rel="noreferrer">📄 Download Resume</a>
          <a href="#contact" className="btn btn-ghost">📬 Contact Me</a>
        </div>
        <div className="hero-pills">
          {['Python','YOLO','Raspberry Pi','React','OpenCV','Linux','Qiskit','IoT','NIR','Edge AI'].map(t=>(
            <span key={t} className="hero-pill">{t}</span>
          ))}
        </div>
      </div>
      <div className="hero-scroll"><div className="hero-scroll-line"/><span>scroll</span></div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   ABOUT
═══════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════
   ABOUT - UPDATED TO MATCH IMAGE
═══════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════
   ABOUT - WITH BOX-STYLE HIGHLIGHTS
═══════════════════════════════════════════════════ */
function About() {
  const [imageError, setImageError] = useState(false);
  
  return (
    <section id="about">
      <div className="wrap">
        <div className="about-inner">
          <div className="fi">
            <p className="label">// WRAP AR</p>
            <h2 className="heading">About <span>Me</span></h2>
            <p className="about-intro">
              I'm Allen Ronaldo C, a 3rd-year Electronics and Communication Engineering student at R.M.K College of Engineering and Technology. I exist at the intersection of artificial intelligence, embedded hardware, and scientific curiosity — building systems that don't just work, but <em>think</em>.
            </p>
            
            <hr className="about-divider" />
            
            <div className="about-highlights-box">
              <div className="about-box">
                <div className="about-box-icon">⚡</div>
                <p className="about-box-text">Building real hardware systems fused with intelligent software — from Raspberry Pi vision systems to NIR medical devices.</p>
              </div>
              
              <div className="about-box">
                <div className="about-box-icon">🧠</div>
                <p className="about-box-text">Passionate about AI, IoT, and sustainable engineering. I believe the best solutions sit at the intersection of disciplines.</p>
              </div>
              
              <div className="about-box">
                <div className="about-box-icon">🚀</div>
                <p className="about-box-text">Long-term vision: research at world-class institutions, then build a deep-tech startup solving infrastructure and health challenges.</p>
              </div>
              
              <div className="about-box">
                <div className="about-box-icon">🔭</div>
                <p className="about-box-text">Beyond engineering — I explore quantum computing, astrophysics, and the mathematics of black holes. Curiosity has no boundary.</p>
              </div>
            </div>
          </div>

          <div className="fi about-visual">
            <div className="about-photo-container">
              <div className="about-photo-ring about-photo-ring-1"></div>
              <div className="about-photo-ring about-photo-ring-2"></div>
              <div className="about-photo-ring about-photo-ring-3"></div>
              
              <div className="about-photo-wrapper">
                <div className="about-photo-inner">
                  {!imageError ? (
                    <img 
  src="/photo.jpg"
  alt="Allen Ronaldo C"
  className="about-photo-img"
  onError={() => setImageError(true)}
/>
                  ) : (
                    <div className="about-photo-placeholder">
                      <span className="about-photo-initials">AR</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Orbiting Dots */}
              <div className="about-orbit about-orbit-1">
                <div className="about-orbit-dot"></div>
              </div>
              <div className="about-orbit about-orbit-2">
                <div className="about-orbit-dot"></div>
              </div>
              <div className="about-orbit about-orbit-3">
                <div className="about-orbit-dot"></div>
              </div>

              {/* Floating Particles */}
              <div className="about-particle about-particle-1"></div>
              <div className="about-particle about-particle-2"></div>
              <div className="about-particle about-particle-3"></div>
              <div className="about-particle about-particle-4"></div>
            </div>

            <div className="about-name-title">
              <h3 className="about-name">AR</h3>
              <p className="about-role">Your Photo Here</p>
            </div>

            <div className="about-info-cards">
              <div className="about-info-item">
                <div className="about-info-lbl">STATUS</div>
                <div className="about-info-val">Open to Internships</div>
              </div>
              <div className="about-info-item">
                <div className="about-info-lbl">LOCATION</div>
                <div className="about-info-val">Tamil Nadu, India</div>
              </div>
              <div className="about-info-item">
                <div className="about-info-lbl">YEAR</div>
                <div className="about-info-val">3rd Year, ECE</div>
              </div>
              <div className="about-info-item">
                <div className="about-info-lbl">FOCUS</div>
                <div className="about-info-val">AI + Edge Systems</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   SKILLS
═══════════════════════════════════════════════════ */
function Skills() {
  const [active,setActive] = useState('prog')
  const cat = SKILLS.find(s=>s.id===active)
  return (
    <section id="skills">
      <div className="wrap">
        <p className="label fi">// capabilities</p>
        <h2 className="heading fi">Technical <span>Skills</span></h2>
        <p className="sub fi">Cross-disciplinary skills built through real projects, internships, and relentless building.</p>
        <div className="skills-layout fi">
          <div className="skills-tabs">
            {SKILLS.map(s=>(
              <button key={s.id} className={`skills-tab${active===s.id?' active':''}`} style={{'--tc':s.color}} onClick={()=>setActive(s.id)}>
                <span className="skills-tab-icon">{s.icon}</span>
                <span className="skills-tab-name">{s.name}</span>
                <span className="skills-tab-n">{s.skills.length}</span>
              </button>
            ))}
          </div>
          <div className="skills-panel" key={active}>
            <div className="skills-panel-head">
              <span>{cat.icon}</span>
              <div><div className="skills-panel-title" style={{color:cat.color}}>{cat.name}</div><div style={{fontFamily:'var(--fm)',fontSize:'.72rem',color:'var(--dim)'}}>{cat.skills.length} skills tracked</div></div>
            </div>
            <div className="skills-bars">
              {cat.skills.map((s,i)=>(
                <div key={s.n} className="sbar" style={{'--delay':i*.08+'s'}}>
                  <div className="sbar-header"><span className="sbar-name">{s.n}</span><span className="sbar-pct" style={{color:cat.color}}>{s.l}%</span></div>
                  <div className="sbar-track"><div className="sbar-fill" style={{background:cat.color,'--w':s.l+'%',width:s.l+'%'}}/></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="skills-grid fi">
          {SKILLS.map(s=>(
            <div key={s.id} className="skills-mini" style={{'--tc':s.color}}>
              <div className="skills-mini-head"><span>{s.icon}</span><span className="skills-mini-label" style={{color:s.color}}>{s.name}</span></div>
              <div className="skills-mini-pills">
                {s.skills.map(sk=><span key={sk.n} className="skills-mini-pill" style={{borderColor:s.color+'40',color:s.color}}>{sk.n}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   PROJECTS
═══════════════════════════════════════════════════ */
function ProjectDetail({p}) {
  const [tab,setTab] = useState('case')
  const tabs = [['case','Case Study'],['metrics','Metrics'],['arch','Architecture'],['tradeoffs','Trade-offs'],['future','Future Work']]
  return (
    <div className="proj-detail" style={{'--pc':p.color}}>
      <div className="proj-detail-head">
        <div className="proj-detail-num">{p.num}</div>
        <div style={{fontSize:'1.8rem',flexShrink:0,marginTop:'.5rem'}}>{p.icon}</div>
        <div style={{flex:1}}>
          <div className="proj-detail-title">{p.title}</div>
          <div className="proj-detail-sub">{p.subtitle}</div>
          <div className="proj-detail-domain">{p.domain}</div>
        </div>
        <span className="proj-status">{p.status}</span>
      </div>
      <div className="proj-tabs">
        {tabs.map(([id,lbl])=><button key={id} className={`proj-tab${tab===id?' active':''}`} onClick={()=>setTab(id)}>{lbl}</button>)}
      </div>
      <div className="proj-body">
        {tab==='case'&&<div className="tab-case"><div className="case-block"><h4><span className="dot-r"/>Problem Statement</h4><p>{p.problem}</p></div><div className="case-block"><h4><span className="dot-g"/>Technical Approach</h4><p>{p.approach}</p></div></div>}
        {tab==='metrics'&&<div><p className="tab-lbl">// measured results & performance</p><div className="metrics-grid">{p.metrics.map(m=><div key={m.l} className="metric"><div className="metric-val">{m.v}</div><div className="metric-lbl">{m.l}</div><div className="metric-sub">{m.s}</div></div>)}</div></div>}
        {tab==='arch'&&<div><p className="tab-lbl">// system pipeline</p>{p.arch.map((s,i)=><div key={i} className="arch-step"><div className="arch-n">{String(i+1).padStart(2,'0')}</div><div className="arch-dash"/><div className="arch-txt">{s}</div></div>)}</div>}
        {tab==='tradeoffs'&&<div><p className="tab-lbl">// engineering decisions & rationale</p>{p.tradeoffs.map((t,i)=><div key={i} className="to-item"><span className="to-icon">⚖</span><p>{t}</p></div>)}</div>}
        {tab==='future'&&<div><p className="tab-lbl">// planned next steps</p>{p.future.map((f,i)=><div key={i} className="fw-item"><div className="fw-arr">→</div><p>{f}</p></div>)}</div>}
      </div>
      <div className="proj-footer">
        <div className="proj-footer-tags">{p.tags.map(t=><span key={t} className="tag">{t}</span>)}{p.tech.map(t=><span key={t} className="tag tag-dim">{t}</span>)}</div>
      </div>
    </div>
  )
}

function Projects() {
  const [sel,setSel] = useState(PROJECTS[0].id)
  const p = PROJECTS.find(x=>x.id===sel)
  return (
    <section id="projects">
      <div className="wrap">
        <p className="label fi">// flagship engineering</p>
        <h2 className="heading fi">Major <span>Projects</span></h2>
        <p className="sub fi">Six real systems — full engineering case studies with metrics, architecture, trade-offs, and roadmaps.</p>
        <div className="proj-layout fi">
          <div className="proj-sidebar">
            {PROJECTS.map(x=>(
              <button key={x.id} className={`proj-thumb${sel===x.id?' active':''}`} style={{'--pc':x.color}} onClick={()=>setSel(x.id)}>
                <span className="proj-thumb-num">{x.num}</span>
                <span style={{fontSize:'1.1rem'}}>{x.icon}</span>
                <div><div className="proj-thumb-t">{x.title}</div><div className="proj-thumb-d">{x.domain.split('+')[0].trim()}</div></div>
              </button>
            ))}
          </div>
          <div key={sel} style={{animation:'fadeUp .35s ease'}}><ProjectDetail p={p}/></div>
        </div>
        <p className="label fi" style={{marginTop:'4rem'}}>// hands-on builds</p>
        <h3 className="fi" style={{fontFamily:'var(--fd)',fontSize:'1.7rem',color:'var(--white)',marginBottom:'1.75rem',letterSpacing:'.04em'}}>Hardware & Software <span style={{color:'var(--cyan)'}}>Mini Projects</span></h3>
        <div className="mini-grid fi">
          {MINI_PROJECTS.map(m=>(
            <div key={m.num} className="mini-card" style={{'--mc':m.color}}>
              <div className="mini-head"><span className="mini-num">{m.num}</span><span style={{fontSize:'1.3rem'}}>{m.icon}</span><span className="mini-title">{m.title}</span></div>
              <ul className="mini-pts">{m.pts.map(pt=><li key={pt}><span>›</span>{pt}</li>)}</ul>
              <div className="mini-tags">{m.tech.map(t=><span key={t} className="tag tag-dim">{t}</span>)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   RESEARCH
═══════════════════════════════════════════════════ */
function Research() {
  const [active,setActive] = useState(RESEARCH_DOMAINS[0])
  return (
    <section id="research">
      <div className="wrap">
        <p className="label fi">// scientific exploration</p>
        <h2 className="heading fi">Research & <span>Scientific</span> Exploration</h2>
        <p className="sub fi">Astrophysics, quantum computing, and space systems — explored with structured methodology and mathematical depth.</p>
        <div className="research-vision fi">
          <p>"My goal is to bridge Artificial Intelligence, Quantum Computing, and Astrophysics to design next-generation intelligent systems capable of solving problems beyond classical computational limits."</p>
          <cite>— Allen Ronaldo C, Vision Statement</cite>
        </div>
        <div className="research-tabs fi">
          {RESEARCH_DOMAINS.map(d=>(
            <button key={d.id} className={`research-tab${active.id===d.id?' active':''}`} style={{'--tc':d.color}} onClick={()=>setActive(d)}>
              <span>{d.icon}</span><span>{d.title}</span>
            </button>
          ))}
        </div>
        <div className="research-content fi" key={active.id} style={{'--rc':active.color}}>
          <div>
            <div className="res-title" style={{color:active.color}}>{active.icon} {active.title}</div>
            <div className="res-tag">{active.tagline}</div>
            <div className="res-lbl">// topics explored</div>
            <div className="res-topics">{active.topics.map(t=><div key={t} className="res-topic"><span className="res-dot" style={{background:active.color}}/><span>{t}</span></div>)}</div>
            <div className="res-lbl" style={{marginTop:'1.5rem'}}>// research methodology</div>
            <div className="res-method">{active.method.map((m,i)=><div key={i} className="res-method-item"><span className="res-method-n" style={{color:active.color}}>{String(i+1).padStart(2,'0')}</span><p>{m}</p></div>)}</div>
            <div className="res-project" style={{'--pc':active.color}}>
              <div className="res-project-badge">Scientific Project</div>
              <div className="res-project-title">{active.project.title}</div>
              <div className="res-project-rows">
                {[['Tools',active.project.tools],['Status',active.project.status],['Next',active.project.scope]].map(([k,v])=>(
                  <div key={k} className="res-project-row"><span>{k}</span><p>{v}</p></div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="res-lbl">// key equations</div>
            {active.eqs.map(eq=>(
              <div key={eq.name} className="eq-block">
                <div className="eq-name" style={{color:active.color}}>{eq.name}</div>
                <div className="eq-math">{eq.math}</div>
                <div className="eq-desc">{eq.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   ACHIEVEMENTS
═══════════════════════════════════════════════════ */
function Achievements() {
  return (
    <section id="achievements">
      <div className="wrap">
        <p className="label fi">// recognition</p>
        <h2 className="heading fi">Achievements & <span>Recognition</span></h2>
        <p className="sub fi">Publications, internships, hackathons, and leadership — a record of meaningful contribution.</p>
        <div className="ach-timeline fi">
          {ACHIEVEMENTS.map((a,i)=>(
            <div key={i} className="ach-item" style={{'--ac':a.color}}>
              <div className="ach-connector"><div className="ach-dot"/>{i<ACHIEVEMENTS.length-1&&<div className="ach-line"/>}</div>
              <div className="ach-card">
                <div className="ach-card-top">
                  <span className="ach-icon">{a.icon}</span>
                  <div><div className="ach-name">{a.title}</div><div className="ach-org">{a.org}</div></div>
                  <div className="ach-right">
                    <span className="ach-level" style={{color:a.color,borderColor:a.color+'40'}}>{a.level}</span>
                    <span className="ach-year">{a.year}</span>
                  </div>
                </div>
                <div className="ach-desc">{a.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   EDUCATION + EXPERIENCE
═══════════════════════════════════════════════════ */
function Education() {
  const courses = ['Artificial Intelligence & ML','Digital Signal Processing','Embedded Systems Design','Internet of Things','VLSI Design','Microprocessors & MCU','Computer Networks','Control Systems','Digital Image Processing','Communication Systems']
  return (
    <section id="education">
      <div className="wrap">
        <p className="label fi">// academic foundation</p>
        <h2 className="heading fi">Education</h2>
        <div className="edu-card fi">
          <div className="edu-logo">RMKCE</div>
          <div>
            <div className="edu-degree-row">
              <div><div className="edu-college">R.M.K College of Engineering and Technology</div><div className="edu-degree">B.E. Electronics and Communication Engineering</div></div>
              <div className="edu-year-block"><span className="edu-year">2022 – 2026</span><span className="edu-status">3rd Year</span></div>
            </div>
            <div className="edu-info">
              {[{l:'Affiliated to',v:'Anna University, Chennai'},{l:'Specialization',v:'AI & Embedded Systems'},{l:'Location',v:'Tamil Nadu, India'}].map(i=>(
                <div key={i.l}><div className="edu-info-lbl">{i.l}</div><div className="edu-info-val">{i.v}</div></div>
              ))}
            </div>
            <div className="edu-course-lbl">// relevant coursework</div>
            <div className="edu-courses">{courses.map(c=><div key={c} className="edu-course">{c}</div>)}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience">
      <div className="wrap">
        <p className="label fi">// industry & leadership</p>
        <h2 className="heading fi">Experience & <span>Leadership</span></h2>
        <div className="exp-grid fi">
          {EXPERIENCE.map((e,i)=>(
            <div key={i} className="exp-card" style={{'--ec':e.color}}>
              <span className="exp-type" style={{color:e.color,borderColor:e.color+'40'}}>{e.type}</span>
              <div className="exp-role">{e.role}</div>
              <div className="exp-org">{e.org}</div>
              <span className="exp-period" style={{color:e.color}}>{e.period}</span>
              <ul className="exp-pts">{e.pts.map(pt=><li key={pt}><span>›</span>{pt}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   PHILOSOPHY + TIMELINE + GITHUB
═══════════════════════════════════════════════════ */
function Philosophy() {
  const pillars = [{icon:'🧠',t:'Intelligence',d:'Every system I build must think — not just execute. AI is the backbone, not the feature.'},{icon:'🌱',t:'Sustainability',d:'Engineering should solve problems without creating new ones. Energy-aware design is non-negotiable.'},{icon:'📐',t:'Scalability',d:'A prototype that cannot scale is not a solution. Architecture-first thinking drives my builds.'},{icon:'🔬',t:'Scientific Rigor',d:'Hypothesis, experiment, measure, iterate. Engineering without data is just guessing.'}]
  return (
    <section id="philosophy">
      <div className="wrap">
        <p className="label fi">// engineering philosophy</p>
        <h2 className="heading fi">Engineering <span>Philosophy</span></h2>
        <div className="phil-inner fi">
          <div className="phil-quote">
            <div className="phil-quote-mark">"</div>
            <blockquote>I believe in combining research, innovation, and practical engineering to develop technologies that create meaningful societal impact. My work bridges AI, embedded computing, and scientific research — not as isolated tools, but as unified architectures that think, adapt, and endure.</blockquote>
            <cite>— Allen Ronaldo C</cite>
          </div>
          <div className="phil-pillars">
            {pillars.map(p=><div key={p.t} className="pillar"><div className="pillar-icon">{p.icon}</div><div className="pillar-title">{p.t}</div><div className="pillar-desc">{p.d}</div></div>)}
          </div>
        </div>
      </div>
    </section>
  )
}

function CareerTimeline() {
  const ms = [
    {y:'2022',ph:'Foundation',lbl:'Embedded Systems & C',d:'Began ECE at RMKCE. Microcontrollers, GPIO, and hardware fundamentals. Elected to ECE Association.',c:'#5a9aff',i:'🔌'},
    {y:'2023',ph:'Expansion',lbl:'Python + IoT + Web',d:'Built first Raspberry Pi and sensor projects. Started Python, React, and frontend development.',c:'#39ff14',i:'🐍'},
    {y:'2024',ph:'Acceleration',lbl:'AI + ISRO + Hackathons',d:'YOLO on Pi, VeinSpot, Anti-Piracy AI. Interned at ISRO IPRC and Entudio. SIH + Hack2Skill finalist.',c:'#00f5ff',i:'🧠'},
    {y:'2025',ph:'Research',lbl:'IEEE Publication + VP Role',d:'Published IEEE paper on Low Power PRNG/LFSR. Became VP of ECE Association. LifeLink, JustiSpeak, SpectraGuard.',c:'#ffc400',i:'📄'},
    {y:'Future',ph:'Vision',lbl:'AI + Quantum + Space Systems',d:'PhD research or deep-tech startup — bridging AI, quantum computing, and space systems engineering.',c:'#bf5fff',i:'🚀'},
  ]
  return (
    <section id="timeline">
      <div className="wrap">
        <p className="label fi">// growth trajectory</p>
        <h2 className="heading fi">Career <span>Roadmap</span></h2>
        <p className="sub fi">From embedded circuits to IEEE publications — a deliberate progression toward the frontier.</p>
        <div className="ct-track fi">
          {ms.map((m,i)=>(
            <div key={i} className="ct-item" style={{'--mc':m.c}}>
              <div className="ct-year-col"><div className="ct-year">{m.y}</div></div>
              <div className="ct-connector"><div className="ct-dot">{m.i}</div>{i<ms.length-1&&<div className="ct-line"/>}</div>
              <div className="ct-card"><div className="ct-phase">{m.ph}</div><div className="ct-label">{m.lbl}</div><div className="ct-desc">{m.d}</div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function GitHubStats() {
  const repos = [
    {n:'smart-traffic-signal',d:'YOLOv5 + Raspberry Pi adaptive traffic system',l:'Python',s:12,f:3,c:'#3572A5'},
    {n:'veinspot-nir',d:'NIR-based low-cost vein visualizer',l:'Python',s:8,f:2,c:'#3572A5'},
    {n:'anti-piracy-ai',d:'Multi-format AI content fingerprinting system',l:'Python',s:15,f:4,c:'#3572A5'},
    {n:'lifelink',d:'Smart emergency communication platform',l:'JavaScript',s:9,f:2,c:'#f1e05a'},
    {n:'justispeak',d:'Voice-based AI accessibility system',l:'JavaScript',s:7,f:1,c:'#f1e05a'},
    {n:'spectraguard',d:'Sensor-based environment monitoring & security',l:'Python',s:6,f:1,c:'#3572A5'},
  ]
  return (
    <section id="github">
      <div className="wrap">
        <p className="label fi">// open source</p>
        <h2 className="heading fi">GitHub <span>Activity</span></h2>
        <div className="gh-summary fi">
          {[{v:'12+',l:'Repositories'},{v:'57+',l:'Stars'},{v:'200+',l:'Contributions'},{v:'3',l:'Languages'}].map(s=>(
            <div key={s.l} className="gh-stat"><div className="gh-stat-val">{s.v}</div><div className="gh-stat-lbl">{s.l}</div></div>
          ))}
        </div>
        <div className="gh-repos fi">
          {repos.map(r=>(
            <div key={r.n} className="gh-repo">
              <div className="gh-repo-head"><span className="gh-repo-hash">⌗</span><span className="gh-repo-name">{r.n}</span></div>
              <div className="gh-repo-desc">{r.d}</div>
              <div className="gh-repo-meta"><span className="gh-lang" style={{'--lc':r.c}}><span className="gh-lang-dot"/>{r.l}</span><span className="gh-stat-s">★ {r.s}</span><span className="gh-stat-s">⑂ {r.f}</span></div>
            </div>
          ))}
        </div>
        <div className="gh-cta fi"><a href="https://github.com/allenronaldo" className="btn btn-outline" target="_blank" rel="noreferrer">View Full GitHub Profile →</a></div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   BLOG
═══════════════════════════════════════════════════ */
function Blog() {
  return (
    <section id="blog">
      <div className="wrap">
        <p className="label fi">// publications & writing</p>
        <h2 className="heading fi">Publications & <span>Blog</span></h2>
        <p className="sub fi">IEEE-published research, technical deep-dives, and academic explainers.</p>
        <div className="blog-grid fi">
          {BLOG_POSTS.map((p,i)=>(
            <article key={i} className={`blog-card${p.badge==='PUBLISHED'?' featured':''}`} style={{'--bc':p.color}}>
              {p.badge&&<div className="blog-badge" style={{background:p.color,color:'#020408'}}>{p.badge}</div>}
              <div className="blog-meta"><span className="blog-type" style={{color:p.typeColor}}>{p.type}</span><span className="blog-date" style={{color:p.color}}>{p.date}</span></div>
              <div className="blog-emoji">{p.emoji}</div>
              <div className="blog-title">{p.title}</div>
              <div className="blog-excerpt">{p.excerpt}</div>
              <div className="blog-tags">{p.tags.map(t=><span key={t} className="tag">{t}</span>)}</div>
              <div className="blog-footer">
                <span className="blog-read">{p.read}</span>
                <a href={p.link} className="blog-link" style={{color:p.color}} target="_blank" rel="noreferrer">{p.badge==='PUBLISHED'?'View on IEEE →':'Read Article →'}</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   CONTACT
═══════════════════════════════════════════════════ */
function Contact() {
  const [form,setForm] = useState({name:'',email:'',subject:'',message:''})
  const [sent,setSent] = useState(false)
  const change = e => setForm(f=>({...f,[e.target.name]:e.target.value}))
  const submit = e => { e.preventDefault(); setSent(true); setTimeout(()=>setSent(false),4000); setForm({name:'',email:'',subject:'',message:''}) }
  return (
    <section id="contact">
      <div className="wrap">
        <p className="label fi">// let's connect</p>
        <h2 className="heading fi">Get In <span>Touch</span></h2>
        <p className="sub fi">Open to internships, research collaborations, hackathon teams, and innovative conversations.</p>
        <div className="contact-layout fi">
          <div>
            <div className="contact-avail"><div className="contact-avail-dot"/>Available for opportunities — Chennai, India</div>
            <p className="contact-blurb">Whether you're building something ambitious, looking for a technical collaborator, or want to explore research — reach out. I respond within 24 hours.</p>
            {['AI & Computer Vision Projects','Embedded Systems & IoT','Research Collaborations','Internships & Industry Exposure','Technical Workshops & Speaking'].map(i=><div key={i} className="contact-interest">{i}</div>)}
            <div className="contact-socials">
              {[{icon:'🐙',l:'GitHub',v:'@allenronaldo',href:'https://github.com/allenronaldo',c:'#fff'},{icon:'💼',l:'LinkedIn',v:'Allen Ronaldo C',href:'#',c:'#0077b5'},{icon:'📧',l:'Email',v:'allen.ronaldo@rmkcet.ac.in',href:'mailto:allen.ronaldo@rmkcet.ac.in',c:'#00f5ff'}].map(s=>(
                <a key={s.l} href={s.href} className="contact-social" style={{'--sc':s.c}}>
                  <span className="contact-social-icon">{s.icon}</span>
                  <div><div className="contact-social-lbl">{s.l}</div><div className="contact-social-val">{s.v}</div></div>
                </a>
              ))}
            </div>
          </div>
          <form className="contact-form" onSubmit={submit}>
            <div className="form-row">
              <div className="form-field"><label>Name</label><input name="name" value={form.name} onChange={change} placeholder="Your name" required/></div>
              <div className="form-field"><label>Email</label><input type="email" name="email" value={form.email} onChange={change} placeholder="your@email.com" required/></div>
            </div>
            <div className="form-field"><label>Subject</label><input name="subject" value={form.subject} onChange={change} placeholder="Internship / Collaboration / Project" required/></div>
            <div className="form-field"><label>Message</label><textarea name="message" value={form.message} onChange={change} placeholder="Tell me what you're building..." rows={6} required/></div>
            <button type="submit" className="btn btn-cyan form-submit">{sent?'✓ Message Sent!':'📬 Send Message'}</button>
            {sent&&<div className="form-success">Message sent! I'll get back to you soon.</div>}
          </form>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-main">
          <div>
            <div className="footer-logo"><b>[</b>Allen Ronaldo C<b>]</b></div>
            <div className="footer-tagline">ECE Engineer | AI + IoT + Research | Chennai, India</div>
            <div className="footer-msg">"Built with passion, innovation, and late-night debugging sessions."</div>
          </div>
          <div>
            <div className="footer-col-lbl">Navigation</div>
            <ul className="footer-links">
              {[['#about','About'],['#skills','Skills'],['#projects','Projects'],['#research','Research'],['#achievements','Awards'],['#contact','Contact']].map(([h,l])=><li key={h}><a href={h}>{l}</a></li>)}
            </ul>
          </div>
          <div>
            <div className="footer-col-lbl">Connect</div>
            <ul className="footer-links">
              {[['https://github.com/allenronaldo','GitHub'],['#','LinkedIn'],['mailto:allen.ronaldo@rmkcet.ac.in','Email']].map(([h,l])=><li key={l}><a href={h}>{l}</a></li>)}
            </ul>
            <div className="footer-status"><div className="footer-status-dot"/>Open to Opportunities 2025</div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Allen Ronaldo C. All rights reserved.</span>
          <span>ECE @ RMKCET · IEEE Author · ISRO Intern · Chennai 🇮🇳</span>
        </div>
      </div>
    </footer>
  )
}

/* ═══════════════════════════════════════════════════
   APP
═══════════════════════════════════════════════════ */
export default function App() {
  const [loading, setLoading] = useState(true);
  useFadeIn();

  useEffect(() => {
    // Simulate loading time - remove this in production and use actual load detection
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Stars/>
      <Cursor/>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Nav/>
          <main style={{position:'relative',zIndex:1}}>
            <Hero/>
            <About/>
            <Skills/>
            <Projects/>
            <Research/>
            <Achievements/>
            <Education/>
            <Experience/>
            <Philosophy/>
            <CareerTimeline/>
            <GitHubStats/>
            <Blog/>
            <Contact/>
          </main>
          <Footer/>
        </>
      )}
    </>
  )
}
