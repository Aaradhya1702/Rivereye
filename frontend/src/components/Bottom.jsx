/*
RiverEyeLanding.jsx
Single-file React component (uses styled-components + framer-motion)

How to use:
1. Create a new CRA or Next project.
   - npx create-react-app my-app
   - cd my-app
2. Install dependencies:
   - npm install styled-components framer-motion
3. Put this file in src/ as RiverEyeLanding.jsx
4. In src/index.js or App.js import and render:
   import RiverEyeLanding from './RiverEyeLanding';
   <RiverEyeLanding />

Notes:
- The file is intentionally self-contained and uses inline SVG for visuals.
- Replace mockStationData with real API calls when available.

*/

import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import FAQ from './faq'

// ---------------- Styled Components ----------------
const Page = styled.div`
  font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
  color: #0f1724;
  background: linear-gradient(180deg, #eaf6fb 0%, #f6fbff 40%, #e6f6ff 100%);
  min-height: 100vh;
`;

const Hero = styled.section`
  display: grid;
  grid-template-columns: 1fr 560px;
  gap: 48px;
  align-items: center;
  padding: 64px 80px;
  position: relative;
  overflow: hidden;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    padding: 48px 28px;
  }
`;

const Left = styled.div`
  z-index: 3;
`;

const Ticker = styled.div`
  display: inline-flex;
  gap: 24px;
  align-items: center;
  background: rgba(7, 89, 133, 0.06);
  padding: 8px 12px;
  border-radius: 12px;
  font-weight: 600;
  color: #04607a;
  margin-bottom: 18px;
`;

const Title = styled.h1`
  font-size: 48px;
  line-height: 1.03;
  margin: 8px 0 18px;
  background: linear-gradient(90deg,#014f74,#00a7d1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Tagline = styled.p`
  color: #08414f;
  font-size: 18px;
  max-width: 620px;
  margin-bottom: 22px;
`;

const CTAGroup = styled.div`
  display:flex;
  gap: 12px;
  margin-top: 16px;
`;

const Button = styled.a`
  display:inline-flex;
  align-items:center;
  gap:10px;
  padding: 12px 18px;
  border-radius: 12px;
  font-weight:700;
  cursor:pointer;
  text-decoration:none;
  color: ${p => p.primary ? '#fff' : '#04607a'};
  background: ${p => p.primary ? 'linear-gradient(90deg,#0077b6,#48cae4)' : 'transparent'};
  box-shadow: ${p => p.primary ? '0 12px 30px rgba(4,96,122,0.18)' : 'none'};
  border: ${p => p.primary ? 'none' : '2px solid rgba(4,96,122,0.08)'};
`;

const Right = styled.div`
  position: relative;
  z-index: 2;
`;

const MapFrame = styled.div`
  width:100%;
  height:420px;
  border-radius:20px;
  overflow:hidden;
  background: linear-gradient(180deg,#0b2230 0%, #06242b 100%);
  box-shadow: 0 30px 60px rgba(4,96,122,0.18);
  display:flex;
  align-items:center;
  justify-content:center;
  padding: 20px;
`;

const RiverSvg = styled.svg`
  width:100%;
  height:100%;
  display:block;
`;

const GlowPulse = keyframes`
  0% { transform: scale(0.9); opacity: 0.7 }
  50% { transform: scale(1.2); opacity: 0.25 }
  100% { transform: scale(0.9); opacity: 0.7 }
`;

const Station = styled.div`
  position:absolute;
  transform: translate(-50%,-50%);
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:6px;
  pointer-events:auto;
`;

const StationDot = styled.div`
  width:14px;
  height:14px;
  border-radius:50%;
  background: ${p => p.color || '#00d1ff'};
  box-shadow: 0 6px 18px rgba(0,172,214,0.18), 0 0 18px ${p => p.color || '#00d1ff'};
`;

const Pulse = styled.div`
  position:absolute;
  width:32px; height:32px; border-radius:50%;
  left:50%; top:50%; transform:translate(-50%,-50%);
  background: ${p => p.color || '#00d1ff'}; opacity:0.12;
  animation: ${GlowPulse} 2.6s infinite;
`;

const DataPanel = styled(motion.div)`
  position:absolute;
  bottom: 24px;
  left: 24px;
  width: 320px;
  backdrop-filter: blur(8px);
  background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
  border-radius: 14px;
  padding: 16px;
  color: #e6fbff;
  box-shadow: 0 10px 30px rgba(4,96,122,0.12);
`;

const MetricRow = styled.div`
  display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;
`;

const Footer = styled.footer`
  padding: 48px 80px;
  display:flex; justify-content:space-between; align-items:center;
  gap:20px;
  @media (max-width:980px){ padding: 28px; flex-direction:column; gap:12px }
`;

const Logo = styled.div`
  font-weight:800; color:#00607f; font-size:18px; display:flex; gap:10px; align-items:center;
`;

const Small = styled.small`
  color:#23474f;`;

// ---------------- Mock Data & Helpers ----------------
const mockStationData = [
  { id: 'S1', name: 'Varanasi', lat: 25.3176, lon: 82.9739, do: 6.9, bod: 2.8, ph: 7.1, x: '78%', y: '42%', risk: 'medium' },
  { id: 'S2', name: 'Kanpur', lat: 26.4499, lon: 80.3319, do: 4.1, bod: 6.2, ph: 6.8, x: '60%', y: '68%', risk: 'high' },
  { id: 'S3', name: 'Allahabad', lat: 25.4358, lon: 81.8463, do: 7.5, bod: 1.9, ph: 7.4, x: '42%', y: '58%', risk: 'good' }
];

function riskToColor(risk){
  if(risk === 'high') return '#ff3b30';
  if(risk === 'medium') return '#ffb020';
  return '#00e5b4';
}

// ---------------- Main Component ----------------
export default function RiverEyeLanding(){
  const [stations, setStations] = useState(mockStationData);
  const [ticker, setTicker] = useState({ do: 7.5, bod: 3.1, ph: 7.2 });

  // simulate live updates
  useEffect(()=>{
    const t = setInterval(()=>{
      // random minor jitter for demo
      setTicker(prev => ({
        do: +(prev.do + (Math.random()-0.5)*0.2).toFixed(2),
        bod: +(prev.bod + (Math.random()-0.5)*0.15).toFixed(2),
        ph: +(prev.ph + (Math.random()-0.5)*0.03).toFixed(2)
      }))

      // also randomly change one station
      setStations(prev => prev.map(s => {
        if(Math.random() > 0.8){
          const newDo = +(s.do + (Math.random()-0.5)*0.9).toFixed(2);
          const newBod = +(s.bod + (Math.random()-0.5)*0.8).toFixed(2);
          const risk = newBod > 5 ? 'high' : newDo < 5 ? 'high' : (newBod > 3 ? 'medium' : 'good');
          return {...s, do: newDo, bod: newBod, risk };
        }
        return s;
      }))
    }, 2500);

    return ()=> clearInterval(t);
  },[])

  return (
    <Page>
      <Hero>
        <Left>
          <motion.div initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} transition={{duration:0.6}}>
            <Ticker>Live • <strong style={{marginLeft:6}}>{new Date().toLocaleTimeString()}</strong> • Auto refresh</Ticker>
            <Title>See the Ganga’s Pulse. Live. Anytime.</Title>
            <Tagline>RiverEye provides real-time quality metrics, hyperlocal forecasts and instant alerts so communities and authorities can act faster.</Tagline>

            <CTAGroup>
              <Button primary href="#dashboard">View Live Dashboard</Button>
              <Button href="#alerts">Get Alerts</Button>
            </CTAGroup>
          </motion.div>

          <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{amount:0.2}} style={{marginTop:22}}>
            <Small>Collected datapoints: <strong>254,312</strong> — Stations: <strong>{stations.length}</strong></Small>
          </motion.div>
        </Left>

        <Right>
          <MapFrame>
            <RiverSvg viewBox="0 0 1200 600" preserveAspectRatio="none">
              <defs>
                <linearGradient id="riverGrad" x1="0" x2="1">
                  <stop offset="0%" stopColor="#0077b6" stopOpacity="1"/>
                  <stop offset="100%" stopColor="#48cae4" stopOpacity="1"/>
                </linearGradient>
                <filter id="blurMe" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="18" />
                </filter>
              </defs>

              {/* Background subtle pattern */}
              <rect x="0" y="0" width="1200" height="600" fill="url(#riverGrad)" opacity="0.06" />

              {/* stylized river path */}
              <path d="M0 260 C 240 220, 360 300, 520 270 C 680 240, 720 320, 900 300 C 1060 280, 1200 320, 1200 320 L1200 600 L0 600 Z"
                fill="url(#riverGrad)" opacity="0.95"/>

              {/* wave overlay for movement illusion */}
              <g opacity="0.24">
                <path d="M0 260 C 240 260, 360 280, 520 270 C 680 260, 720 280, 900 270 C 1060 260, 1200 300, 1200 300" fill="none" stroke="#ffffff" strokeOpacity="0.06" strokeWidth="22" filter="url(#blurMe)"/>
              </g>

            </RiverSvg>

            {/* station markers positioned absolutely */}
            {stations.map(s => (
              <Station key={s.id} style={{ left: s.x, top: s.y }} title={`${s.name} • DO:${s.do} • BOD:${s.bod}`}>
                <div style={{ position:'relative' }}>
                  <Pulse color={riskToColor(s.risk)} />
                  <StationDot color={riskToColor(s.risk)} />
                </div>
                <div style={{ fontSize:12, color:'#d7fbff', background:'rgba(0,0,0,0.14)', padding:'6px 8px', borderRadius:8, marginTop:6 }}>{s.name}</div>
              </Station>
            ))}

            <DataPanel initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} transition={{delay:0.2}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
                <div style={{fontWeight:800}}>Live Snapshot</div>
                <div style={{fontSize:12, opacity:0.9}}>Updated just now</div>
              </div>

              <MetricRow>
                <div>DO (mg/L)</div>
                <div style={{fontWeight:800}}>{ticker.do}</div>
              </MetricRow>
              <MetricRow>
                <div>BOD (mg/L)</div>
                <div style={{fontWeight:800}}>{ticker.bod}</div>
              </MetricRow>
              <MetricRow>
                <div>pH</div>
                <div style={{fontWeight:800}}>{ticker.ph}</div>
              </MetricRow>

              <div style={{height:8, background:'rgba(255,255,255,0.04)', borderRadius:8, marginTop:12}}>
                <div style={{ width: `${Math.min(90, (10 - (ticker.bod||3))*9)}%`, height:'100%', background:'linear-gradient(90deg,#00e5b4,#48cae4)', borderRadius:8 }} />
              </div>

            </DataPanel>

          </MapFrame>
        </Right>
      </Hero>

      {/* Secondary section with animated cards */}
      <section style={{padding:'36px 80px 48px'}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20}}>
          {[
            {title:'Forecast', desc:'3-day trend with modeled risk levels', cta:'View Forecast'},
            {title:'Alerts', desc:'Instant SMS/Email/push when thresholds hit', cta:'Set Alerts'},
            {title:'Community', desc:'Share clean-up requests & reports', cta:'Get Involved'}
          ].map((c)=> (
            <motion.div key={c.title} whileHover={{y:-6}} style={{background:'#fff', borderRadius:12, padding:18, boxShadow:'0 10px 30px rgba(10,30,40,0.04)'}}>
              <div style={{fontSize:14, fontWeight:800, color:'#00607f'}}>{c.title}</div>
              <div style={{marginTop:8, color:'#164b56'}}>{c.desc}</div>
              <div style={{marginTop:12}}><Button href="#" style={{padding:'8px 12px', fontSize:13}}>{c.cta}</Button></div>
            </motion.div>
          ))}
        </div>
      </section>
      <FAQ />
      <Footer>
        <Logo>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="#00a7d1"/><path d="M6 14c12-6 6 6 12 0" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          RiverEye
        </Logo>
        <div style={{display:'flex', gap:12, alignItems:'center'}}>
          <Small>© {new Date().getFullYear()} RiverEye</Small>
          <Small style={{opacity:0.6}}>Privacy • Terms</Small>
        </div>
      </Footer>

    </Page>
  );
}
