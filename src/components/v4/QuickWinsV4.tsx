/* Auto-ported from CDS Quick Wins.dc.html — visual fidelity port; do not redesign */
"use client";
import Expandable from "@/components/v4/Expandable";

export default function QuickWinsV4() {
  return (
    <Expandable>

<section data-screen-label="Opening band" style={{position:'relative',overflow:'hidden',textAlign:'center',padding:'clamp(150px,16vw,210px) clamp(20px,5vw,64px) clamp(50px,6vw,80px)'}}>
  <div style={{position:'absolute',top:'-20%',left:'50%',transform:'translateX(-50%)',width:'760px',height:'760px',maxWidth:'110vw',background:'radial-gradient(circle at center,rgba(0,212,255,.10),transparent 64%)',filter:'blur(28px)',pointerEvents:'none'}}></div>
  <div style={{position:'relative',zIndex:'1',maxWidth:'820px',margin:'0 auto',display:'flex',flexDirection:'column',alignItems:'center',gap:'20px'}}>
    <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'13px',letterSpacing:'3px',textTransform:'uppercase',color:'#00d4ff'}}>Start small. See it work.</div>
    <h1 style={{fontFamily:'\'Bebas Neue\',sans-serif',fontWeight:'400',textTransform:'uppercase',fontSize:'clamp(46px,5.6vw,92px)',lineHeight:'.9',letterSpacing:'1px',color:'#fafafa',margin:'0',textWrap:'balance'}}>Pick one problem. We fix it in days.</h1>
    <p style={{fontSize:'clamp(16px,1.25vw,18px)',color:'#c8c8c8',lineHeight:'1.7',margin:'0',maxWidth:'580px',textWrap:'pretty'}}>Not ready for a full monthly plan yet? Start here. Each of these solves one specific problem — fast — so you can see real results before you commit to anything bigger.</p>
  </div>
</section>


<section data-screen-label="Offer grid" style={{position:'relative',padding:'clamp(30px,4vw,60px) clamp(20px,5vw,64px) clamp(70px,8vw,110px)'}}>
  <div style={{maxWidth:'1180px',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,330px),1fr))',gap:'clamp(20px,2.2vw,26px)',alignItems:'stretch'}}>

    
    <div style={{background:'rgba(255,255,255,.025)',border:'1px solid rgba(255,255,255,.09)',borderRadius:'16px',padding:'30px 28px',display:'flex',flexDirection:'column',gap:'16px'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'12px'}}>
        <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'12px',letterSpacing:'2.5px',textTransform:'uppercase',color:'#00d4ff'}}>Diagnose &amp; plan</div>
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="1.6" style={{flex:'none',opacity:'.85'}}><circle cx="11" cy="11" r="7"></circle><path d="m21 21-4.35-4.35"></path><path d="M8 11h6"></path><path d="M11 8v6"></path></svg>
      </div>
      <h2 style={{fontFamily:'\'Inter\',sans-serif',fontWeight:'700',fontSize:'clamp(20px,1.7vw,25px)',lineHeight:'1.3',color:'#fafafa',margin:'0',textWrap:'balance'}}>Find out exactly where you're losing jobs.</h2>
      <div style={{display:'flex',alignItems:'baseline',gap:'6px'}}>
        <span style={{fontFamily:'\'Bebas Neue\',sans-serif',fontSize:'42px',lineHeight:'1',color:'#fafafa'}}>$497</span>
        <span style={{fontSize:'13.5px',color:'#7f8896'}}>one-time</span>
      </div>
      <p style={{fontSize:'14.5px',color:'#c8c8c8',lineHeight:'1.7',margin:'0',flex:'1',textWrap:'pretty'}}>We run a deep audit of your website, Google Business Profile, SEO, and online reputation — then hand you a written, specific action plan. Not a sales pitch. A map of what's broken and what to fix first.</p>
      <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
        <span style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'11px',color:'#c8c8c8',background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.14)',borderRadius:'999px',padding:'5px 11px',whiteSpace:'nowrap'}}>5 business days</span>
        <span style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'11px',color:'#c8c8c8',background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.14)',borderRadius:'999px',padding:'5px 11px',whiteSpace:'nowrap'}}>Walkthrough + written report</span>
      </div>
      <button data-expand-toggle="true" style={{display:'inline-flex',alignItems:'center',gap:'7px',background:'none',border:'none',padding:'0',fontFamily:'\'Inter\',sans-serif',fontSize:'13px',fontWeight:'600',color:'#8000ff',cursor:'pointer',textAlign:'left'}}><span style={{fontSize:'15px',lineHeight:'1'}}>⊕</span> How is this different from the free audit?</button>
      <div data-expand-panel="true" hidden style={{borderLeft:'2px solid #8000ff',padding:'4px 0 4px 16px',animation:'panelIn .35s cubic-bezier(.4,0,.2,1)'}}>
          <p style={{fontSize:'13.5px',color:'#c8c8c8',lineHeight:'1.7',margin:'0',textWrap:'pretty'}}>The free audit on our homepage tells you <i>if</i> you have a problem. Leak Finder tells you exactly <i>what</i> it is, <i>why</i> it's costing you jobs, and the specific order to fix it in.</p>
        </div>
      <a href="/contact" style={{display:'inline-flex',alignItems:'center',justifyContent:'center',gap:'9px',minHeight:'48px',fontFamily:'\'Inter\',sans-serif',fontSize:'15px',fontWeight:'600',color:'#fafafa',background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.2)',padding:'14px 22px',borderRadius:'11px',textDecoration:'none'}}>Get My Leak Finder Report</a>
    </div>

    
    <div id="bid-finder-ai" style={{position:'relative',scrollMarginTop:'110px',background:'linear-gradient(180deg,rgba(128,0,255,.12),rgba(128,0,255,.03)),rgba(255,255,255,.02)',border:'1px solid rgba(128,0,255,.45)',borderRadius:'16px',padding:'30px 28px',display:'flex',flexDirection:'column',gap:'16px',boxShadow:'0 0 60px rgba(128,0,255,.16)'}}>
      <div style={{position:'absolute',top:'-13px',left:'50%',transform:'translateX(-50%)',fontFamily:'\'JetBrains Mono\',monospace',fontSize:'11px',letterSpacing:'2px',textTransform:'uppercase',color:'#fff',background:'linear-gradient(135deg,#8000ff,#5600ab)',borderRadius:'999px',padding:'6px 16px',whiteSpace:'nowrap',boxShadow:'0 6px 20px rgba(128,0,255,.5)'}}>Most popular first step</div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'12px',marginTop:'4px'}}>
        <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'12px',letterSpacing:'2.5px',textTransform:'uppercase',color:'#b56bff'}}>Bid Finder AI</div>
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#b56bff" strokeWidth="1.6" style={{flex:'none',opacity:'.9'}}><path d="M3 8l9-5 9 5-9 5-9-5z"></path><path d="M3 8v8l9 5 9-5V8"></path><path d="M12 13v8"></path></svg>
      </div>
      <h2 style={{fontFamily:'\'Inter\',sans-serif',fontWeight:'700',fontSize:'clamp(20px,1.7vw,25px)',lineHeight:'1.3',color:'#fafafa',margin:'0',textWrap:'balance'}}>Stop hunting for bids. Let them find you.</h2>
      <div style={{display:'flex',alignItems:'baseline',gap:'6px'}}>
        <span style={{fontFamily:'\'Bebas Neue\',sans-serif',fontSize:'42px',lineHeight:'1',color:'#fafafa'}}>$497</span>
        <span style={{fontSize:'13.5px',color:'#7f8896'}}>/mo</span>
      </div>
      <p style={{fontSize:'14.5px',color:'#c8c8c8',lineHeight:'1.7',margin:'0',flex:'1',textWrap:'pretty'}}>The same AI that powers our top-tier clients' bid pipeline — monitoring thousands of public bid portals 24/7, filtered to your trade and geography, delivered straight to your inbox. This is the fastest way to see what Catalyst can do, because the results show up as literal opportunities in your inbox within days.</p>
      <button data-expand-toggle="true" style={{display:'inline-flex',alignItems:'center',gap:'7px',background:'none',border:'none',padding:'0',fontFamily:'\'Inter\',sans-serif',fontSize:'13px',fontWeight:'600',color:'#b56bff',cursor:'pointer',textAlign:'left'}}><span style={{fontSize:'15px',lineHeight:'1'}}>⊕</span> Is this the same as the Construction RFP AI on the pricing page?</button>
      <div data-expand-panel="true" hidden style={{borderLeft:'2px solid #8000ff',padding:'4px 0 4px 16px',animation:'panelIn .35s cubic-bezier(.4,0,.2,1)'}}>
          <p style={{fontSize:'13.5px',color:'#c8c8c8',lineHeight:'1.7',margin:'0',textWrap:'pretty'}}>Yes — same tool. This is the on-ramp; the <a href="/pricing" style={{color:'#00d4ff',textDecoration:'none',borderBottom:'1px solid rgba(0,212,255,.4)'}}>Domination tier</a> includes it free once you're ready to go all-in.</p>
        </div>
      <a href="/contact" style={{display:'inline-flex',alignItems:'center',justifyContent:'center',gap:'9px',minHeight:'48px',fontFamily:'\'Inter\',sans-serif',fontSize:'15px',fontWeight:'600',color:'#fff',background:'linear-gradient(135deg,#8000ff,#5600ab)',border:'none',padding:'14px 22px',borderRadius:'11px',boxShadow:'0 10px 34px rgba(128,0,255,.4)',textDecoration:'none'}}>Start Finding Bids</a>
    </div>

    
    <div style={{background:'rgba(255,255,255,.025)',border:'1px solid rgba(255,255,255,.09)',borderRadius:'16px',padding:'30px 28px',display:'flex',flexDirection:'column',gap:'16px'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'12px'}}>
        <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'12px',letterSpacing:'2.5px',textTransform:'uppercase',color:'#00d4ff'}}>Never lose a lead again</div>
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="1.6" style={{flex:'none',opacity:'.85'}}><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"></path></svg>
      </div>
      <h2 style={{fontFamily:'\'Inter\',sans-serif',fontWeight:'700',fontSize:'clamp(20px,1.7vw,25px)',lineHeight:'1.3',color:'#fafafa',margin:'0',textWrap:'balance'}}>Be the first call back. Every time.</h2>
      <div style={{display:'flex',alignItems:'baseline',gap:'6px'}}>
        <span style={{fontFamily:'\'Bebas Neue\',sans-serif',fontSize:'42px',lineHeight:'1',color:'#fafafa'}}>$1,997</span>
        <span style={{fontSize:'13.5px',color:'#7f8896'}}>one-time build</span>
      </div>
      <p style={{fontSize:'14.5px',color:'#c8c8c8',lineHeight:'1.7',margin:'0',flex:'1',textWrap:'pretty'}}>A done-for-you system that responds to every new lead automatically — so a slow callback never costs you a job again. One build. Yours to keep running.</p>
      <button data-expand-toggle="true" style={{display:'inline-flex',alignItems:'center',gap:'7px',background:'none',border:'none',padding:'0',fontFamily:'\'Inter\',sans-serif',fontSize:'13px',fontWeight:'600',color:'#8000ff',cursor:'pointer',textAlign:'left'}}><span style={{fontSize:'15px',lineHeight:'1'}}>⊕</span> What's included?</button>
      <div data-expand-panel="true" hidden style={{borderLeft:'2px solid #8000ff',padding:'4px 0 4px 16px',animation:'panelIn .35s cubic-bezier(.4,0,.2,1)'}}>
          <p style={{fontSize:'13.5px',color:'#c8c8c8',lineHeight:'1.7',margin:'0',textWrap:'pretty'}}>Automated first-response messaging, missed-call follow-up, and a structured follow-up sequence so leads don't go cold while you're on the jobsite.</p>
        </div>
      <a href="/contact" style={{display:'inline-flex',alignItems:'center',justifyContent:'center',gap:'9px',minHeight:'48px',fontFamily:'\'Inter\',sans-serif',fontSize:'15px',fontWeight:'600',color:'#fafafa',background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.2)',padding:'14px 22px',borderRadius:'11px',textDecoration:'none'}}>Build My Speed-to-Lead System</a>
    </div>

    
    <div style={{background:'rgba(255,255,255,.025)',border:'1px solid rgba(255,255,255,.09)',borderRadius:'16px',padding:'30px 28px',display:'flex',flexDirection:'column',gap:'16px'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'12px'}}>
        <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'12px',letterSpacing:'2.5px',textTransform:'uppercase',color:'#00d4ff'}}>Found money, no ad spend</div>
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="1.6" style={{flex:'none',opacity:'.85'}}><path d="M3 12a9 9 0 1 0 3-6.7"></path><path d="M3 4v5h5"></path></svg>
      </div>
      <h2 style={{fontFamily:'\'Inter\',sans-serif',fontWeight:'700',fontSize:'clamp(20px,1.7vw,25px)',lineHeight:'1.3',color:'#fafafa',margin:'0',textWrap:'balance'}}>The jobs you already lost might still be winnable.</h2>
      <div style={{display:'flex',alignItems:'baseline',gap:'6px'}}>
        <span style={{fontFamily:'\'Bebas Neue\',sans-serif',fontSize:'42px',lineHeight:'1',color:'#fafafa'}}>$1,497</span>
        <span style={{fontSize:'13.5px',color:'#7f8896'}}>one-time build</span>
      </div>
      <p style={{fontSize:'14.5px',color:'#c8c8c8',lineHeight:'1.7',margin:'0',flex:'1',textWrap:'pretty'}}>We build an automated outreach sequence to your past leads and old contacts — the ones who went quiet, not the ones who said no. Real revenue sitting in a contact list you already have.</p>
      <a href="/contact" style={{display:'inline-flex',alignItems:'center',justifyContent:'center',gap:'9px',minHeight:'48px',fontFamily:'\'Inter\',sans-serif',fontSize:'15px',fontWeight:'600',color:'#fafafa',background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.2)',padding:'14px 22px',borderRadius:'11px',textDecoration:'none'}}>Reactivate My Past Leads</a>
    </div>

    
    <div style={{background:'rgba(255,255,255,.025)',border:'1px solid rgba(255,255,255,.09)',borderRadius:'16px',padding:'30px 28px',display:'flex',flexDirection:'column',gap:'16px'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'12px'}}>
        <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'12px',letterSpacing:'2.5px',textTransform:'uppercase',color:'#00d4ff'}}>Get found on Google</div>
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="1.6" style={{flex:'none',opacity:'.85'}}><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
      </div>
      <h2 style={{fontFamily:'\'Inter\',sans-serif',fontWeight:'700',fontSize:'clamp(20px,1.7vw,25px)',lineHeight:'1.3',color:'#fafafa',margin:'0',textWrap:'balance'}}>Every finished job becomes a 5-star review — automatically.</h2>
      <div style={{display:'flex',alignItems:'baseline',gap:'6px'}}>
        <span style={{fontFamily:'\'Bebas Neue\',sans-serif',fontSize:'42px',lineHeight:'1',color:'#fafafa'}}>$1,497</span>
        <span style={{fontSize:'13.5px',color:'#7f8896'}}>one-time build</span>
      </div>
      <p style={{fontSize:'14.5px',color:'#c8c8c8',lineHeight:'1.7',margin:'0',flex:'1',textWrap:'pretty'}}>An automated system that asks happy clients for a review right after the job's done, when they're happiest. Set it up once. It runs forever.</p>
      <a href="/contact" style={{display:'inline-flex',alignItems:'center',justifyContent:'center',gap:'9px',minHeight:'48px',fontFamily:'\'Inter\',sans-serif',fontSize:'15px',fontWeight:'600',color:'#fafafa',background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.2)',padding:'14px 22px',borderRadius:'11px',textDecoration:'none'}}>Put My Reviews on Autopilot</a>
    </div>

  </div>
</section>


<section data-screen-label="ERP implementation" style={{position:'relative',overflow:'hidden',padding:'clamp(70px,9vw,120px) clamp(20px,5vw,64px)',borderTop:'1px solid rgba(255,255,255,.06)'}}>
  <div style={{position:'absolute',top:'-10%',right:'-8%',width:'560px',height:'560px',maxWidth:'90vw',background:'radial-gradient(circle at center,rgba(128,0,255,.12),transparent 64%)',filter:'blur(28px)',pointerEvents:'none'}}></div>
  <div style={{position:'relative',zIndex:'1',maxWidth:'1180px',margin:'0 auto'}}>
    <div style={{maxWidth:'760px'}}>
      <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'12px',letterSpacing:'2.5px',textTransform:'uppercase',color:'#b56bff',marginBottom:'14px'}}>Get your systems running right — for good</div>
      <h2 style={{fontFamily:'\'Bebas Neue\',sans-serif',fontWeight:'400',textTransform:'uppercase',fontSize:'clamp(34px,4vw,64px)',lineHeight:'.92',letterSpacing:'1px',color:'#fafafa',margin:'0',textWrap:'balance'}}>ERP setup &amp; data migration</h2>
      <p style={{fontSize:'clamp(15px,1.1vw,17px)',color:'#c8c8c8',lineHeight:'1.7',margin:'20px 0 0',maxWidth:'680px',textWrap:'pretty'}}>We stand up the system that runs your whole company — estimates and bids, submittals and RFIs, change orders, schedules, crews, billing, and cash flow — and migrate your data so it’s usable from day one: cost codes, cost centers, parts lists, the works. Not a login and a tutorial video. A full build-out so you’re running on it, not fighting it. We recommend the right platform for your growth stage and scope it with you.</p>
    </div>
    <div style={{display:'flex',flexWrap:'wrap',gap:'clamp(16px,2vw,22px)',marginTop:'clamp(36px,4vw,52px)',alignItems:'stretch'}}>
      <div style={{flex:'1 1 300px',minWidth:'260px',maxWidth:'360px',background:'rgba(255,255,255,.025)',border:'1px solid rgba(255,255,255,.09)',borderRadius:'16px',padding:'28px 26px',display:'flex',flexDirection:'column',gap:'14px'}}>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <div style={{width:'46px',height:'46px',borderRadius:'12px',background:'#00d4ff1e',border:'1px solid #00d4ff55',display:'flex',alignItems:'center',justifyContent:'center',flex:'none',fontFamily:'\'Bebas Neue\',sans-serif',fontSize:'22px',letterSpacing:'.5px',color:'#00d4ff'}}>BT</div>
          <div style={{fontFamily:'\'Inter\',sans-serif',fontWeight:'700',fontSize:'18px',color:'#fafafa'}}>BuilderTrend</div>
        </div>
        <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'11px',letterSpacing:'1.5px',textTransform:'uppercase',color:'#00d4ff'}}>Best for home builders &amp; remodelers</div>
        <div style={{display:'flex',flexDirection:'column',gap:'10px',flex:'1'}}><div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}><span style={{color:'#00d4ff',fontSize:'13px',lineHeight:'1.6',flex:'none'}}>✓</span><span style={{fontSize:'13.5px',color:'#c8c8c8',lineHeight:'1.6',textWrap:'pretty'}}>Client portal, selections, and change orders buyers actually use</span></div><div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}><span style={{color:'#00d4ff',fontSize:'13px',lineHeight:'1.6',flex:'none'}}>✓</span><span style={{fontSize:'13.5px',color:'#c8c8c8',lineHeight:'1.6',textWrap:'pretty'}}>Scheduling and daily logs built for residential crews</span></div><div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}><span style={{color:'#00d4ff',fontSize:'13px',lineHeight:'1.6',flex:'none'}}>✓</span><span style={{fontSize:'13.5px',color:'#c8c8c8',lineHeight:'1.6',textWrap:'pretty'}}>Simple to roll out to a small office fast</span></div></div>
        <a href="/contact" style={{display:'inline-flex',alignItems:'center',justifyContent:'center',gap:'9px',minHeight:'46px',fontFamily:'\'Inter\',sans-serif',fontSize:'14.5px',fontWeight:'600',color:'#fafafa',background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.2)',padding:'13px 20px',borderRadius:'11px',textDecoration:'none'}}>Get a Quote →</a>
      </div>
      <div style={{flex:'1 1 300px',minWidth:'260px',maxWidth:'360px',background:'rgba(255,255,255,.025)',border:'1px solid rgba(255,255,255,.09)',borderRadius:'16px',padding:'28px 26px',display:'flex',flexDirection:'column',gap:'14px'}}>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <div style={{width:'46px',height:'46px',borderRadius:'12px',background:'#b56bff1e',border:'1px solid #b56bff55',display:'flex',alignItems:'center',justifyContent:'center',flex:'none',fontFamily:'\'Bebas Neue\',sans-serif',fontSize:'22px',letterSpacing:'.5px',color:'#b56bff'}}>PC</div>
          <div style={{fontFamily:'\'Inter\',sans-serif',fontWeight:'700',fontSize:'18px',color:'#fafafa'}}>Procore</div>
        </div>
        <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'11px',letterSpacing:'1.5px',textTransform:'uppercase',color:'#b56bff'}}>Best for commercial GCs &amp; bigger crews</div>
        <div style={{display:'flex',flexDirection:'column',gap:'10px',flex:'1'}}><div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}><span style={{color:'#b56bff',fontSize:'13px',lineHeight:'1.6',flex:'none'}}>✓</span><span style={{fontSize:'13.5px',color:'#c8c8c8',lineHeight:'1.6',textWrap:'pretty'}}>Field-to-office on one platform: RFIs, submittals, drawings</span></div><div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}><span style={{color:'#b56bff',fontSize:'13px',lineHeight:'1.6',flex:'none'}}>✓</span><span style={{fontSize:'13.5px',color:'#c8c8c8',lineHeight:'1.6',textWrap:'pretty'}}>Handles larger jobs and multiple trades at once</span></div><div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}><span style={{color:'#b56bff',fontSize:'13px',lineHeight:'1.6',flex:'none'}}>✓</span><span style={{fontSize:'13.5px',color:'#c8c8c8',lineHeight:'1.6',textWrap:'pretty'}}>The name owners and architects already expect</span></div></div>
        <a href="/contact" style={{display:'inline-flex',alignItems:'center',justifyContent:'center',gap:'9px',minHeight:'46px',fontFamily:'\'Inter\',sans-serif',fontSize:'14.5px',fontWeight:'600',color:'#fafafa',background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.2)',padding:'13px 20px',borderRadius:'11px',textDecoration:'none'}}>Get a Quote →</a>
      </div>
      <div style={{flex:'1 1 300px',minWidth:'260px',maxWidth:'360px',background:'rgba(255,255,255,.025)',border:'1px solid rgba(255,255,255,.09)',borderRadius:'16px',padding:'28px 26px',display:'flex',flexDirection:'column',gap:'14px'}}>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <div style={{width:'46px',height:'46px',borderRadius:'12px',background:'#80ff801e',border:'1px solid #80ff8055',display:'flex',alignItems:'center',justifyContent:'center',flex:'none',fontFamily:'\'Bebas Neue\',sans-serif',fontSize:'22px',letterSpacing:'.5px',color:'#80ff80'}}>AC</div>
          <div style={{fontFamily:'\'Inter\',sans-serif',fontWeight:'700',fontSize:'18px',color:'#fafafa'}}>Acumatica</div>
        </div>
        <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'11px',letterSpacing:'1.5px',textTransform:'uppercase',color:'#80ff80'}}>Best for multi-entity firms needing true accounting</div>
        <div style={{display:'flex',flexDirection:'column',gap:'10px',flex:'1'}}><div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}><span style={{color:'#80ff80',fontSize:'13px',lineHeight:'1.6',flex:'none'}}>✓</span><span style={{fontSize:'13.5px',color:'#c8c8c8',lineHeight:'1.6',textWrap:'pretty'}}>Full construction accounting and job costing under one roof</span></div><div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}><span style={{color:'#80ff80',fontSize:'13px',lineHeight:'1.6',flex:'none'}}>✓</span><span style={{fontSize:'13.5px',color:'#c8c8c8',lineHeight:'1.6',textWrap:'pretty'}}>Scales across divisions, entities, and locations</span></div><div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}><span style={{color:'#80ff80',fontSize:'13px',lineHeight:'1.6',flex:'none'}}>✓</span><span style={{fontSize:'13.5px',color:'#c8c8c8',lineHeight:'1.6',textWrap:'pretty'}}>Deep reporting when spreadsheets finally break</span></div></div>
        <a href="/contact" style={{display:'inline-flex',alignItems:'center',justifyContent:'center',gap:'9px',minHeight:'46px',fontFamily:'\'Inter\',sans-serif',fontSize:'14.5px',fontWeight:'600',color:'#fafafa',background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.2)',padding:'13px 20px',borderRadius:'11px',textDecoration:'none'}}>Get a Quote →</a>
      </div>
    </div>
    <p style={{fontSize:'13.5px',color:'#7f8896',lineHeight:'1.6',margin:'clamp(28px,3vw,36px) 0 0',maxWidth:'680px',textWrap:'pretty'}}>A custom add-on, not part of a monthly program — a full build-out we scope with you. Every firm is different, so pricing is quoted per project.</p>
  </div>
</section>


<section data-screen-label="Credit mechanic" style={{position:'relative',overflow:'hidden',textAlign:'center',padding:'clamp(80px,10vw,130px) clamp(20px,5vw,64px)',borderTop:'1px solid rgba(255,255,255,.06)'}}>
  <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:'780px',height:'780px',maxWidth:'130vw',background:'radial-gradient(circle,rgba(128,0,255,.18),transparent 64%)',filter:'blur(24px)',pointerEvents:'none',animation:'floatY 12s ease-in-out infinite'}}></div>
  <div style={{position:'relative',zIndex:'1',maxWidth:'780px',margin:'0 auto',display:'flex',flexDirection:'column',alignItems:'center',gap:'22px'}}>
    <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'13px',letterSpacing:'3px',textTransform:'uppercase',color:'#b56bff'}}>Nothing you spend here is wasted</div>
    <h2 style={{fontFamily:'\'Bebas Neue\',sans-serif',fontWeight:'400',textTransform:'uppercase',fontSize:'clamp(40px,4.8vw,76px)',lineHeight:'.92',letterSpacing:'1px',color:'#fafafa',margin:'0',textWrap:'balance'}}>Every dollar credits toward the real thing.</h2>
    <p style={{fontSize:'clamp(16px,1.25vw,18px)',color:'#c8c8c8',lineHeight:'1.7',margin:'0',maxWidth:'620px',textWrap:'pretty'}}>If you like what a Quick Win does for your business, <span style={{color:'#80ff80',fontFamily:'\'JetBrains Mono\',monospace',fontSize:'.9em'}}>[X]%</span> of what you paid credits directly toward your first month on any monthly plan — or toward your custom website build — if you upgrade within <span style={{color:'#80ff80',fontFamily:'\'JetBrains Mono\',monospace',fontSize:'.9em'}}>[Y]</span> days. You're not starting over. You're picking up where you left off.</p>
    <p style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'12px',color:'#7f8896',margin:'6px 0 0'}}>[Placeholder — final credit % and window pending Mario's call. Do not publish as-is.]</p>
  </div>
</section>


<section data-screen-label="FAQ" style={{position:'relative',padding:'clamp(70px,8vw,110px) clamp(20px,5vw,64px)',borderTop:'1px solid rgba(255,255,255,.06)'}}>
  <div style={{maxWidth:'820px',margin:'0 auto'}}>
    <div style={{textAlign:'center',marginBottom:'clamp(40px,5vw,56px)'}}>
      <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'13px',letterSpacing:'3px',textTransform:'uppercase',color:'#00d4ff'}}>Straight answers</div>
      <h2 style={{fontFamily:'\'Bebas Neue\',sans-serif',fontWeight:'400',textTransform:'uppercase',fontSize:'clamp(38px,4.4vw,68px)',lineHeight:'.94',letterSpacing:'1px',color:'#fafafa',margin:'14px 0 0'}}>Before you ask</h2>
    </div>
    <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
      {[
        { q: "Are these one-time or recurring?", a: "Leak Finder, Speed-to-Lead, Lead Reactivation, and 5-Star Autopilot are one-time builds — you own the system after. Bid Finder AI is a monthly subscription, since bid monitoring only works while it's actively running." },
        { q: "Can I do more than one?", a: "Yes. Many owners pair Leak Finder (know what's broken) with one of the fix-it offers." },
        { q: "What happens after?", a: "Most clients who start with a Quick Win move to a full monthly plan within 90 days once they've seen it work. No pressure — we'll talk options when you're ready." },
        { q: "Do I need to be tech-savvy?", a: "No. Each offer needs about 30 minutes of your time for kickoff — access to your existing tools and a quick call. We handle the rest." },
      ].map((faq) => (
        <div key={faq.q} style={{background:'rgba(255,255,255,.025)',border:'1px solid rgba(255,255,255,.09)',borderRadius:'14px',overflow:'hidden'}}>
          <button type="button" data-expand-toggle="true" style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'16px',width:'100%',background:'none',border:'none',padding:'20px 24px',fontFamily:'\'Inter\',sans-serif',fontSize:'16px',fontWeight:'600',color:'#fafafa',textAlign:'left',cursor:'pointer'}}>
            <span style={{lineHeight:'1.5'}}>{faq.q}</span>
            <span style={{flex:'none',fontSize:'18px',color:'#b56bff',lineHeight:'1'}}>+</span>
          </button>
          <div data-expand-panel="true" hidden style={{padding:'0 24px 22px',animation:'panelIn .35s cubic-bezier(.4,0,.2,1)'}}>
            <p style={{fontSize:'15px',color:'#c8c8c8',lineHeight:'1.75',margin:'0',textWrap:'pretty'}}>{faq.a}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


<section data-screen-label="Final CTA" style={{position:'relative',textAlign:'center',padding:'clamp(70px,9vw,120px) clamp(20px,5vw,64px) clamp(90px,11vw,140px)'}}>
  <div style={{position:'relative',zIndex:'1',maxWidth:'620px',margin:'0 auto',display:'flex',flexDirection:'column',alignItems:'center',gap:'18px'}}>
    <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'13px',letterSpacing:'3px',textTransform:'uppercase',color:'#00d4ff'}}>No pressure</div>
    <h2 style={{fontFamily:'\'Inter\',sans-serif',fontWeight:'700',fontSize:'clamp(26px,2.6vw,36px)',lineHeight:'1.25',color:'#fafafa',margin:'0',textWrap:'balance'}}>Not sure which one's right for you?</h2>
    <p style={{fontSize:'clamp(15.5px,1.1vw,17px)',color:'#c8c8c8',lineHeight:'1.7',margin:'0',textWrap:'pretty'}}>Tell us your biggest problem right now. We'll tell you — straight — which Quick Win actually fixes it.</p>
    <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'16px',marginTop:'10px'}}>
      <a href="/contact" style={{display:'inline-flex',alignItems:'center',justifyContent:'center',gap:'10px',minHeight:'48px',fontFamily:'\'Inter\',sans-serif',fontSize:'16px',fontWeight:'600',color:'#fff',background:'linear-gradient(135deg,#8000ff,#5600ab)',border:'none',padding:'16px 30px',borderRadius:'11px',boxShadow:'0 10px 34px rgba(128,0,255,.4)',cursor:'pointer',textDecoration:'none'}}>Book a 15-Minute Call <span style={{fontSize:'18px'}}>→</span></a>
      <a href="/pricing" style={{display:'inline-flex',alignItems:'center',justifyContent:'center',gap:'10px',minHeight:'48px',fontFamily:'\'Inter\',sans-serif',fontSize:'16px',fontWeight:'600',color:'#fafafa',background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.18)',padding:'16px 28px',borderRadius:'11px',cursor:'pointer',textDecoration:'none'}}>See the Full Plans <span style={{fontSize:'18px'}}>→</span></a>
    </div>
  </div>
</section>



    </Expandable>
  );
}
