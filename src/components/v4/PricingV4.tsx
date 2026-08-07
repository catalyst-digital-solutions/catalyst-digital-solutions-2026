/* Auto-ported from CDS Pricing.dc.html — visual fidelity port; do not redesign */
"use client";
import Expandable from "@/components/v4/Expandable";

export default function PricingV4() {
  return (
    <Expandable>

<section data-screen-label="Pricing hero" style={{position:'relative',overflow:'hidden',textAlign:'center',padding:'clamp(150px,16vw,210px) clamp(20px,5vw,64px) clamp(50px,6vw,80px)'}}>
  <div style={{position:'absolute',top:'-20%',left:'50%',transform:'translateX(-50%)',width:'760px',height:'760px',maxWidth:'110vw',background:'radial-gradient(circle at center,rgba(128,0,255,.15),transparent 64%)',filter:'blur(28px)',pointerEvents:'none'}}></div>
  <div style={{position:'relative',zIndex:'1',maxWidth:'820px',margin:'0 auto',display:'flex',flexDirection:'column',alignItems:'center',gap:'20px'}}>
    <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'13px',letterSpacing:'3px',textTransform:'uppercase',color:'#00d4ff'}}>Pricing</div>
    <h1 style={{fontFamily:'\'Bebas Neue\',sans-serif',fontWeight:'400',textTransform:'uppercase',fontSize:'clamp(46px,5.6vw,92px)',lineHeight:'.9',letterSpacing:'1px',color:'#fafafa',margin:'0',textWrap:'balance'}}>Transparent pricing. Measurable results.</h1>
    <p style={{fontSize:'clamp(16px,1.25vw,18px)',color:'#c8c8c8',lineHeight:'1.7',margin:'0',maxWidth:'560px',textWrap:'pretty'}}>No discovery fees. No hidden costs. No contracts you can't get out of. Just a clear program that pays for itself.</p>
  </div>
</section>


<section id="tiers" data-screen-label="Tier comparison" style={{position:'relative',padding:'clamp(30px,4vw,60px) clamp(20px,5vw,64px) clamp(50px,6vw,80px)'}}>
  <div style={{maxWidth:'1180px',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,310px),1fr))',gap:'clamp(20px,2.2vw,26px)',alignItems:'stretch'}}>

    
    <div id="foundation" style={{background:'rgba(255,255,255,.025)',border:'1px solid rgba(255,255,255,.10)',borderRadius:'18px',padding:'34px 30px',display:'flex',flexDirection:'column',gap:'0',scrollMarginTop:'100px'}}>
      <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'12px',letterSpacing:'2.5px',textTransform:'uppercase',color:'#00d4ff'}}>Tier 1</div>
      <h2 style={{fontFamily:'\'Bebas Neue\',sans-serif',fontWeight:'400',textTransform:'uppercase',fontSize:'40px',lineHeight:'1',letterSpacing:'1px',color:'#fafafa',margin:'10px 0 0'}}>Foundation</h2>
      <div style={{display:'flex',alignItems:'baseline',gap:'6px',marginTop:'16px'}}>
        <span style={{fontFamily:'\'Bebas Neue\',sans-serif',fontSize:'52px',lineHeight:'1',color:'#fafafa'}}>$1,497</span>
        <span style={{fontSize:'14px',color:'#7f8896'}}>/mo</span>
      </div>
      <p style={{fontSize:'14.5px',fontStyle:'italic',color:'#9aa3b0',margin:'12px 0 0'}}>"Get found. Look professional."</p>
      <div style={{width:'100%',height:'1px',background:'rgba(255,255,255,.08)',margin:'24px 0'}}></div>
      <div style={{display:'flex',flexDirection:'column',gap:'12px',flex:'1'}}>
        <div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}><span style={{color:'#00d4ff',fontSize:'14px',lineHeight:'1.6',flex:'none'}}>✓</span><span style={{fontSize:'14px',lineHeight:'1.6',color:'#c8c8c8'}}>Custom Next.js website on Vercel</span></div>
        <div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}><span style={{color:'#00d4ff',fontSize:'14px',lineHeight:'1.6',flex:'none'}}>✓</span><span style={{fontSize:'14px',lineHeight:'1.6',color:'#c8c8c8'}}>On-page SEO + technical optimization</span></div>
        <div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}><span style={{color:'#00d4ff',fontSize:'14px',lineHeight:'1.6',flex:'none'}}>✓</span><span style={{fontSize:'14px',lineHeight:'1.6',color:'#c8c8c8'}}>Google Business Profile setup &amp; management</span></div>
        <div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}><span style={{color:'#00d4ff',fontSize:'14px',lineHeight:'1.6',flex:'none'}}>✓</span><span style={{fontSize:'14px',lineHeight:'1.6',color:'#c8c8c8'}}>GA4 analytics + conversion tracking</span></div>
        <div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}><span style={{color:'#00d4ff',fontSize:'14px',lineHeight:'1.6',flex:'none'}}>✓</span><span style={{fontSize:'14px',lineHeight:'1.6',color:'#c8c8c8'}}>Monthly maintenance + performance reporting</span></div>
      </div>
      <a href="/contact" style={{display:'inline-flex',alignItems:'center',justifyContent:'center',gap:'9px',minHeight:'48px',fontFamily:'\'Inter\',sans-serif',fontSize:'15px',fontWeight:'600',color:'#fafafa',background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.2)',padding:'14px 24px',borderRadius:'11px',marginTop:'28px',textDecoration:'none'}}>Start With Foundation</a>
    </div>

    
    <div id="framework" style={{position:'relative',background:'linear-gradient(180deg,rgba(128,0,255,.12),rgba(128,0,255,.03)),rgba(255,255,255,.02)',border:'1px solid rgba(128,0,255,.55)',borderRadius:'18px',padding:'34px 30px',display:'flex',flexDirection:'column',boxShadow:'0 0 60px rgba(128,0,255,.16)',scrollMarginTop:'100px'}}>
      <div style={{position:'absolute',top:'-13px',left:'50%',transform:'translateX(-50%)',fontFamily:'\'JetBrains Mono\',monospace',fontSize:'11px',letterSpacing:'2px',textTransform:'uppercase',color:'#fff',background:'linear-gradient(135deg,#8000ff,#5600ab)',borderRadius:'999px',padding:'6px 16px',whiteSpace:'nowrap',boxShadow:'0 6px 20px rgba(128,0,255,.5)'}}>Most Popular</div>
      <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'12px',letterSpacing:'2.5px',textTransform:'uppercase',color:'#b56bff'}}>Tier 2</div>
      <h2 style={{fontFamily:'\'Bebas Neue\',sans-serif',fontWeight:'400',textTransform:'uppercase',fontSize:'40px',lineHeight:'1',letterSpacing:'1px',color:'#fafafa',margin:'10px 0 0'}}>Framework</h2>
      <div style={{display:'flex',alignItems:'baseline',gap:'6px',marginTop:'16px'}}>
        <span style={{fontFamily:'\'Bebas Neue\',sans-serif',fontSize:'52px',lineHeight:'1',color:'#fafafa'}}>$2,997</span>
        <span style={{fontSize:'14px',color:'#7f8896'}}>/mo</span>
      </div>
      <p style={{fontSize:'14.5px',fontStyle:'italic',color:'#c8a8ff',margin:'12px 0 0'}}>"Become the contractor they call first."</p>
      <div style={{width:'100%',height:'1px',background:'rgba(128,0,255,.3)',margin:'24px 0'}}></div>
      <div style={{display:'flex',flexDirection:'column',gap:'12px',flex:'1'}}>
        <div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}><span style={{color:'#b56bff',fontSize:'14px',lineHeight:'1.6',flex:'none'}}>✓</span><span style={{fontSize:'14px',lineHeight:'1.6',color:'#fafafa',fontWeight:'600'}}>Everything in Foundation, plus:</span></div>
        <div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}><span style={{color:'#b56bff',fontSize:'14px',lineHeight:'1.6',flex:'none'}}>✓</span><span style={{fontSize:'14px',lineHeight:'1.6',color:'#c8c8c8'}}>12–16 AI-generated videos/month</span></div>
        <div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}><span style={{color:'#b56bff',fontSize:'14px',lineHeight:'1.6',flex:'none'}}>✓</span><span style={{fontSize:'14px',lineHeight:'1.6',color:'#c8c8c8'}}>36–96 short-form clips/month auto-distributed to YouTube, TikTok, IG Reels, LinkedIn</span></div>
        <div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}><span style={{color:'#b56bff',fontSize:'14px',lineHeight:'1.6',flex:'none'}}>✓</span><span style={{fontSize:'14px',lineHeight:'1.6',color:'#c8c8c8'}}>Advanced SEO + keyword tracking + competitor analysis</span></div>
        <div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}><span style={{color:'#b56bff',fontSize:'14px',lineHeight:'1.6',flex:'none'}}>✓</span><span style={{fontSize:'14px',lineHeight:'1.6',color:'#c8c8c8'}}>Local SEO + citations</span></div>
        <div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}><span style={{color:'#b56bff',fontSize:'14px',lineHeight:'1.6',flex:'none'}}>✓</span><span style={{fontSize:'14px',lineHeight:'1.6',color:'#c8c8c8'}}>Programmatic SEO — dozens of location + service pages</span></div>
        <div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}><span style={{color:'#b56bff',fontSize:'14px',lineHeight:'1.6',flex:'none'}}>✓</span><span style={{fontSize:'14px',lineHeight:'1.6',color:'#c8c8c8'}}>GEO/AEO optimization</span></div>
        <div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}><span style={{color:'#b56bff',fontSize:'14px',lineHeight:'1.6',flex:'none'}}>✓</span><span style={{fontSize:'14px',lineHeight:'1.6',color:'#c8c8c8'}}>Call tracking with source attribution</span></div>
        <div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}><span style={{color:'#b56bff',fontSize:'14px',lineHeight:'1.6',flex:'none'}}>✓</span><span style={{fontSize:'14px',lineHeight:'1.6',color:'#c8c8c8'}}>CRM setup with basic automation</span></div>
      </div>
      <div style={{background:'rgba(128,0,255,.10)',border:'1px solid rgba(128,0,255,.35)',borderRadius:'11px',padding:'14px 16px',marginTop:'20px'}}>
        <p style={{fontSize:'13px',color:'#d9c2ff',lineHeight:'1.6',margin:'0',textWrap:'pretty'}}>For $1,500 more than Tier 1, this includes an entire AI content factory (48–112 pieces/month) plus programmatic SEO that alone costs $3,000+ elsewhere.</p>
      </div>
      <a href="/contact" style={{display:'inline-flex',alignItems:'center',justifyContent:'center',gap:'9px',minHeight:'48px',fontFamily:'\'Inter\',sans-serif',fontSize:'15px',fontWeight:'600',color:'#fff',background:'linear-gradient(135deg,#8000ff,#5600ab)',border:'none',padding:'14px 24px',borderRadius:'11px',marginTop:'20px',boxShadow:'0 10px 34px rgba(128,0,255,.4)',textDecoration:'none'}}>Get Framework</a>
    </div>

    
    <div id="landmark" style={{background:'rgba(255,255,255,.025)',border:'1px solid rgba(0,212,255,.3)',borderRadius:'18px',padding:'34px 30px',display:'flex',flexDirection:'column',scrollMarginTop:'100px'}}>
      <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'12px',letterSpacing:'2.5px',textTransform:'uppercase',color:'#00d4ff'}}>Tier 3</div>
      <h2 style={{fontFamily:'\'Bebas Neue\',sans-serif',fontWeight:'400',textTransform:'uppercase',fontSize:'40px',lineHeight:'1',letterSpacing:'1px',color:'#fafafa',margin:'10px 0 0'}}>Landmark</h2>
      <div style={{display:'flex',alignItems:'baseline',gap:'6px',marginTop:'16px'}}>
        <span style={{fontFamily:'\'Bebas Neue\',sans-serif',fontSize:'52px',lineHeight:'1',color:'#fafafa'}}>$7,997</span>
        <span style={{fontSize:'14px',color:'#7f8896'}}>/mo</span>
      </div>
      <p style={{fontSize:'14.5px',fontStyle:'italic',color:'#8fdcff',margin:'12px 0 0'}}>"The obvious choice in every market you enter."</p>
      <div style={{width:'100%',height:'1px',background:'rgba(0,212,255,.25)',margin:'24px 0'}}></div>
      <div style={{display:'flex',flexDirection:'column',gap:'12px',flex:'1'}}>
        <div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}><span style={{color:'#00d4ff',fontSize:'14px',lineHeight:'1.6',flex:'none'}}>✓</span><span style={{fontSize:'14px',lineHeight:'1.6',color:'#fafafa',fontWeight:'600'}}>Everything in Framework, plus:</span></div>
        <div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}><span style={{color:'#00d4ff',fontSize:'14px',lineHeight:'1.6',flex:'none'}}>✓</span><span style={{fontSize:'14px',lineHeight:'1.6',color:'#c8c8c8'}}>20–30 AI videos/month + 60–180 short-form clips</span></div>
        <div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}><span style={{color:'#00d4ff',fontSize:'14px',lineHeight:'1.6',flex:'none'}}>✓</span><span style={{fontSize:'14px',lineHeight:'1.6',color:'#c8c8c8'}}>24/7 AI Voice Agent</span></div>
        <div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}><span style={{color:'#00d4ff',fontSize:'14px',lineHeight:'1.6',flex:'none'}}>✓</span><span style={{fontSize:'14px',lineHeight:'1.6',color:'#c8c8c8'}}>AI website chatbot (RAG-powered)</span></div>
        <div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}><span style={{color:'#00d4ff',fontSize:'14px',lineHeight:'1.6',flex:'none'}}>✓</span><span style={{fontSize:'14px',lineHeight:'1.6',color:'#c8c8c8'}}>Construction RFP AI included free <span style={{color:'#80ff80'}}>(worth $497/mo standalone)</span></span></div>
        <div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}><span style={{color:'#00d4ff',fontSize:'14px',lineHeight:'1.6',flex:'none'}}>✓</span><span style={{fontSize:'14px',lineHeight:'1.6',color:'#c8c8c8'}}>AI review generation</span></div>
        <div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}><span style={{color:'#00d4ff',fontSize:'14px',lineHeight:'1.6',flex:'none'}}>✓</span><span style={{fontSize:'14px',lineHeight:'1.6',color:'#c8c8c8'}}>Fractional CTO/CMO strategy sessions</span></div>
        <div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}><span style={{color:'#00d4ff',fontSize:'14px',lineHeight:'1.6',flex:'none'}}>✓</span><span style={{fontSize:'14px',lineHeight:'1.6',color:'#c8c8c8'}}>Competitive intelligence monitoring</span></div>
        <div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}><span style={{color:'#00d4ff',fontSize:'14px',lineHeight:'1.6',flex:'none'}}>✓</span><span style={{fontSize:'14px',lineHeight:'1.6',color:'#c8c8c8'}}>Full automation suite</span></div>
        <div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}><span style={{color:'#00d4ff',fontSize:'14px',lineHeight:'1.6',flex:'none'}}>✓</span><span style={{fontSize:'14px',lineHeight:'1.6',color:'#c8c8c8'}}>Priority support with dedicated Slack</span></div>
      </div>
      <div style={{background:'rgba(0,212,255,.06)',border:'1px solid rgba(0,212,255,.25)',borderRadius:'11px',padding:'14px 16px',marginTop:'20px'}}>
        <p style={{fontSize:'13px',color:'#9fdfff',lineHeight:'1.6',margin:'0',textWrap:'pretty'}}>RFP AI alone: comparable tools (Loopio) cost $20,000–$55,000/yr; AutoRFP starts at $899/mo. Included free here.</p>
      </div>
      <a href="/contact" style={{display:'inline-flex',alignItems:'center',justifyContent:'center',gap:'9px',minHeight:'48px',fontFamily:'\'Inter\',sans-serif',fontSize:'15px',fontWeight:'600',color:'#fafafa',background:'rgba(0,212,255,.08)',border:'1px solid rgba(0,212,255,.4)',padding:'14px 24px',borderRadius:'11px',marginTop:'20px',textDecoration:'none'}}>Let's Talk Landmark</a>
    </div>
  </div>
</section>


<section data-screen-label="RFP AI standalone" style={{position:'relative',padding:'clamp(40px,5vw,70px) clamp(20px,5vw,64px) clamp(70px,8vw,110px)'}}>
  <div style={{maxWidth:'1180px',margin:'0 auto'}}>
    <div style={{textAlign:'center',marginBottom:'clamp(28px,3.4vw,44px)'}}>
      <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'13px',letterSpacing:'3px',textTransform:'uppercase',color:'#80ff80'}}>A different path</div>
      <h2 style={{fontFamily:'\'Bebas Neue\',sans-serif',fontWeight:'400',textTransform:'uppercase',fontSize:'clamp(34px,3.8vw,58px)',lineHeight:'.94',letterSpacing:'1px',color:'#fafafa',margin:'14px 0 0',textWrap:'balance'}}>Just want the bids?</h2>
    </div>
    <div style={{position:'relative',background:'linear-gradient(120deg,rgba(128,255,128,.06),rgba(0,212,255,.04) 60%,transparent),rgba(255,255,255,.02)',border:'1px solid rgba(128,255,128,.3)',borderRadius:'20px',padding:'clamp(30px,4vw,52px)',display:'flex',flexWrap:'wrap',gap:'clamp(28px,4vw,56px)',alignItems:'center'}}>
      <div style={{flex:'1 1 420px',minWidth:'290px'}}>
        <div style={{display:'flex',flexWrap:'wrap',alignItems:'center',gap:'14px'}}>
          <h3 style={{fontFamily:'\'Bebas Neue\',sans-serif',fontWeight:'400',textTransform:'uppercase',fontSize:'clamp(30px,2.8vw,42px)',lineHeight:'1',letterSpacing:'1px',color:'#fafafa',margin:'0'}}>Construction RFP AI</h3>
          <span style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'11.5px',color:'#80ff80',background:'rgba(128,255,128,.08)',border:'1px solid rgba(128,255,128,.35)',borderRadius:'999px',padding:'5px 12px',whiteSpace:'nowrap'}}>Standalone add-on</span>
        </div>
        <p style={{fontSize:'15.5px',color:'#c8c8c8',lineHeight:'1.7',margin:'16px 0 0',maxWidth:'520px',textWrap:'pretty'}}>Already using another agency? Fine. Add this to any existing setup — no retainer required.</p>
        <div style={{display:'flex',flexDirection:'column',gap:'11px',marginTop:'22px'}}>
          <div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}><span style={{color:'#80ff80',fontSize:'14px',lineHeight:'1.6',flex:'none'}}>✓</span><span style={{fontSize:'14.5px',lineHeight:'1.6',color:'#c8c8c8'}}>Monitors thousands of public bid portals 24/7</span></div>
          <div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}><span style={{color:'#80ff80',fontSize:'14px',lineHeight:'1.6',flex:'none'}}>✓</span><span style={{fontSize:'14.5px',lineHeight:'1.6',color:'#c8c8c8'}}>Filters by trade, license, and geography</span></div>
          <div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}><span style={{color:'#80ff80',fontSize:'14px',lineHeight:'1.6',flex:'none'}}>✓</span><span style={{fontSize:'14.5px',lineHeight:'1.6',color:'#c8c8c8'}}>Delivers relevant RFPs directly to your inbox</span></div>
          <div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}><span style={{color:'#80ff80',fontSize:'14px',lineHeight:'1.6',flex:'none'}}>✓</span><span style={{fontSize:'14.5px',lineHeight:'1.6',color:'#c8c8c8'}}>Competitor bid tracking</span></div>
          <div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}><span style={{color:'#80ff80',fontSize:'14px',lineHeight:'1.6',flex:'none'}}>✓</span><span style={{fontSize:'14.5px',lineHeight:'1.6',color:'#c8c8c8'}}>Saves 15+ hours/week on opportunity discovery</span></div>
        </div>
      </div>
      <div style={{flex:'1 1 280px',minWidth:'260px',maxWidth:'380px',display:'flex',flexDirection:'column',gap:'18px'}}>
        <div style={{textAlign:'center',background:'rgba(8,11,15,.6)',border:'1px solid rgba(255,255,255,.1)',borderRadius:'16px',padding:'28px 24px'}}>
          <div style={{display:'flex',justifyContent:'center',alignItems:'baseline',gap:'6px'}}>
            <span style={{fontFamily:'\'Bebas Neue\',sans-serif',fontSize:'64px',lineHeight:'1',color:'#80ff80'}}>$497</span>
            <span style={{fontSize:'15px',color:'#7f8896'}}>/mo</span>
          </div>
          <div style={{fontSize:'13px',color:'#9aa3b0',lineHeight:'1.65',marginTop:'14px',textWrap:'pretty'}}>Comparable tools: Loopio ($20,000–$55,000/yr) · AutoRFP ($899–$1,299/mo)</div>
        </div>
        <a href="/contact" style={{display:'inline-flex',alignItems:'center',justifyContent:'center',gap:'9px',minHeight:'48px',fontFamily:'\'Inter\',sans-serif',fontSize:'15px',fontWeight:'600',color:'#080b0f',background:'#80ff80',border:'none',padding:'14px 24px',borderRadius:'11px',boxShadow:'0 10px 34px rgba(128,255,128,.25)',textDecoration:'none'}}>Add RFP AI to My Stack</a>
      </div>
    </div>
  </div>
</section>


<section data-screen-label="Client results" style={{position:'relative',overflow:'hidden',padding:'clamp(70px,8vw,110px) clamp(20px,5vw,64px)',borderTop:'1px solid rgba(255,255,255,.06)'}}>
  <div style={{position:'absolute',bottom:'-24%',right:'-10%',width:'640px',height:'640px',maxWidth:'90vw',background:'radial-gradient(circle at center,rgba(0,212,255,.10),transparent 64%)',filter:'blur(28px)',pointerEvents:'none'}}></div>
  <div style={{position:'relative',zIndex:'1',maxWidth:'1180px',margin:'0 auto'}}>
    <div style={{textAlign:'center',maxWidth:'640px',margin:'0 auto clamp(44px,5vw,64px)'}}>
      <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'13px',letterSpacing:'3px',textTransform:'uppercase',color:'#00d4ff'}}>Client results</div>
      <h2 style={{fontFamily:'\'Bebas Neue\',sans-serif',fontWeight:'400',textTransform:'uppercase',fontSize:'clamp(38px,4.4vw,68px)',lineHeight:'.94',letterSpacing:'1px',color:'#fafafa',margin:'14px 0 0',textWrap:'balance'}}>Don't take our word for it</h2>
    </div>

    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,380px),1fr))',gap:'clamp(20px,2.4vw,28px)',alignItems:'stretch'}}>
      <figure style={{background:'rgba(255,255,255,.025)',border:'1px solid rgba(255,255,255,.09)',borderRadius:'18px',padding:'clamp(28px,3vw,40px)',margin:'0',display:'flex',flexDirection:'column',gap:'22px'}}>
        <div style={{fontFamily:'\'Bebas Neue\',sans-serif',fontSize:'64px',lineHeight:'.5',color:'rgba(0,212,255,.5)',marginTop:'14px'}}>"</div>
        <blockquote style={{margin:'0',fontSize:'15.5px',lineHeight:'1.75',color:'#c8c8c8',textWrap:'pretty'}}>Before Catalyst, I was spending hours every week hunting for bids on government portals and still missing half of them. Within 30 days of turning on their RFP AI, I had a pipeline full of opportunities I never would have found on my own. In the first quarter, we submitted 40% more bids than the same period last year — and won three projects that more than covered the entire annual cost of the program. Mario doesn't sell you 'marketing.' He builds you infrastructure that scales your company to the 9-digit mark!</blockquote>
        <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
          <span style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'11.5px',color:'#00d4ff',background:'rgba(0,212,255,.07)',border:'1px solid rgba(0,212,255,.3)',borderRadius:'999px',padding:'5px 12px',whiteSpace:'nowrap'}}>+40% bids submitted Q1</span>
          <span style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'11.5px',color:'#80ff80',background:'rgba(128,255,128,.07)',border:'1px solid rgba(128,255,128,.3)',borderRadius:'999px',padding:'5px 12px',whiteSpace:'nowrap'}}>3 projects won from RFP AI</span>
          <span style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'11.5px',color:'#b56bff',background:'rgba(128,0,255,.08)',border:'1px solid rgba(128,0,255,.3)',borderRadius:'999px',padding:'5px 12px',whiteSpace:'nowrap'}}>ROI in first 90 days</span>
        </div>
        <figcaption style={{marginTop:'auto',paddingTop:'6px'}}>
          <div style={{fontWeight:'700',fontSize:'15px',color:'#fafafa'}}>Scott Baxter</div>
          <div style={{fontSize:'13px',color:'#7f8896',marginTop:'3px'}}>Freedom Engineering, Inc. — Commercial GC, Bakersfield, CA</div>
        </figcaption>
      </figure>

      <figure style={{background:'rgba(255,255,255,.025)',border:'1px solid rgba(255,255,255,.09)',borderRadius:'18px',padding:'clamp(28px,3vw,40px)',margin:'0',display:'flex',flexDirection:'column',gap:'22px'}}>
        <div style={{fontFamily:'\'Bebas Neue\',sans-serif',fontSize:'64px',lineHeight:'.5',color:'rgba(181,107,255,.5)',marginTop:'14px'}}>"</div>
        <blockquote style={{margin:'0',fontSize:'15.5px',lineHeight:'1.75',color:'#c8c8c8',textWrap:'pretty'}}>We came to Mario needing a website. What we left with was an entirely different operation. He built us a professional site that actually converts, set up an AI content system that keeps our name in front of clients without us lifting a finger, and then built our entire Digital Operations Hub — our internal intranet — from scratch. Our team went from using a dozen disconnected tools to having everything in one place. The website alone paid for itself in the first month.</blockquote>
        <figcaption style={{marginTop:'auto',paddingTop:'6px'}}>
          <div style={{fontWeight:'700',fontSize:'15px',color:'#fafafa'}}>Evert Calderon</div>
          <div style={{fontSize:'13px',color:'#7f8896',marginTop:'3px'}}>Mesa Group Consulting — Founder/CEO, Bakersfield, CA</div>
        </figcaption>
      </figure>
    </div>
  </div>
</section>


<section data-screen-label="FAQ" style={{position:'relative',padding:'clamp(70px,8vw,110px) clamp(20px,5vw,64px)',borderTop:'1px solid rgba(255,255,255,.06)'}}>
  <div style={{maxWidth:'820px',margin:'0 auto'}}>
    <div style={{textAlign:'center',marginBottom:'clamp(40px,5vw,56px)'}}>
      <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'13px',letterSpacing:'3px',textTransform:'uppercase',color:'#00d4ff'}}>Straight answers</div>
      <h2 style={{fontFamily:'\'Bebas Neue\',sans-serif',fontWeight:'400',textTransform:'uppercase',fontSize:'clamp(38px,4.4vw,68px)',lineHeight:'.94',letterSpacing:'1px',color:'#fafafa',margin:'14px 0 0'}}>Questions we actually get</h2>
    </div>
    <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
      {[
        { q: "Do you require long-term contracts?", a: "No. Month-to-month. We keep clients because of results, not contract lock-in." },
        { q: "What's the realistic timeline to see results?", a: "Most clients see measurable improvement in call volume and search ranking within 60–90 days. Content distribution starts immediately. SEO shows meaningful movement by month 3." },
        { q: "Do I need to be tech-savvy?", a: "No. About 3 hours of your time in the first two weeks, ~30 minutes/month after." },
        { q: "How is this different from an in-house hire?", a: "A competent in-house digital marketer costs $65,000–$85,000/year and doesn't come with AI video pipelines, programmatic SEO, or RFP monitoring." },
        { q: "Can I start at Tier 1 and upgrade?", a: "Yes — seamless, no rebuild required." },
        { q: "What trades do you work with?", a: "General contractors, commercial builders, specialty trades (electrical, plumbing, HVAC, roofing), civil contractors, demolition companies." },
        { q: "What happens if I cancel?", a: "Your content, analytics, and accounts are yours from day one. Your website becomes fully yours after six months with us — after that, cancel anything you want and keep the site for just the cost of hosting. Larger custom builds vest on a schedule we agree on upfront, in writing." },
        { q: "Is there a setup fee?", a: "Not on our three programs — your first month covers onboarding, deployment, and configuration. Standalone website builds and ad campaigns are priced separately, and we'll quote those numbers before you sign anything." },
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


<section data-screen-label="Final CTA" style={{position:'relative',overflow:'hidden',textAlign:'center',padding:'clamp(70px,9vw,120px) clamp(20px,5vw,64px) clamp(90px,11vw,140px)'}}>
  <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:'700px',height:'700px',maxWidth:'120vw',background:'radial-gradient(circle,rgba(128,0,255,.16),transparent 64%)',filter:'blur(24px)',pointerEvents:'none',animation:'floatY 12s ease-in-out infinite'}}></div>
  <div style={{position:'relative',zIndex:'1',maxWidth:'620px',margin:'0 auto',display:'flex',flexDirection:'column',alignItems:'center',gap:'18px'}}>
    <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'13px',letterSpacing:'3px',textTransform:'uppercase',color:'#00d4ff'}}>No pressure</div>
    <h2 style={{fontFamily:'\'Inter\',sans-serif',fontWeight:'700',fontSize:'clamp(26px,2.6vw,36px)',lineHeight:'1.25',color:'#fafafa',margin:'0',textWrap:'balance'}}>Not sure which fits? Fifteen minutes settles it.</h2>
    <p style={{fontSize:'clamp(15.5px,1.1vw,17px)',color:'#c8c8c8',lineHeight:'1.7',margin:'0',textWrap:'pretty'}}>Tell me where you're losing jobs. I'll tell you — straight — whether we can fix it, and which plan actually makes sense for you.</p>
    <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'16px',marginTop:'10px'}}>
      <a href="/contact" style={{display:'inline-flex',alignItems:'center',justifyContent:'center',gap:'10px',minHeight:'48px',fontFamily:'\'Inter\',sans-serif',fontSize:'16px',fontWeight:'600',color:'#fff',background:'linear-gradient(135deg,#8000ff,#5600ab)',border:'none',padding:'16px 30px',borderRadius:'11px',boxShadow:'0 10px 34px rgba(128,0,255,.4)',cursor:'pointer',textDecoration:'none'}}>Book a 15-Minute Call <span style={{fontSize:'18px'}}>→</span></a>
      <a href="tel:+16618884837" style={{display:'inline-flex',alignItems:'center',justifyContent:'center',gap:'10px',minHeight:'48px',fontFamily:'\'Inter\',sans-serif',fontSize:'16px',fontWeight:'600',color:'#fafafa',background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.18)',padding:'16px 28px',borderRadius:'11px',cursor:'pointer',textDecoration:'none'}}>Call (661) 888-4837</a>
    </div>
    <p style={{fontSize:'13px',color:'#7f8896',margin:'4px 0 0'}}>Month-to-month. No long-term contracts. Six months in, the website we built you is yours to keep.</p>
  </div>
</section>



    </Expandable>
  );
}
