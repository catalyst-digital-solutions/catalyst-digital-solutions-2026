/* Auto-ported from CDS Homepage v4.dc.html — visual fidelity port; do not redesign */
"use client";
import { Globe, Award, Star, ShieldCheck, PhoneCall } from "lucide-react";
import Expandable from "@/components/v4/Expandable";
import MockSearchBar from "@/components/v4/MockSearchBar";
import CoverflowCarousel from "@/components/v4/CoverflowCarousel";

const BAD_PRESENCE_SLIDES = [
  { src: "/assets/01-bad-google-search-result-page.jpeg", alt: "Bad Google search result — buried below competitors" },
  { src: "/assets/02-bad-google-business-profile-page.jpeg", alt: "Bad Google Business profile — no reviews, no website" },
  { src: "/assets/03-bad-google-maps-result-page.jpeg", alt: "Bad Google Maps result — unverified, sparse listing" },
  { src: "/assets/04-bad-mobile-website-design.jpeg", alt: "Bad mobile website — cluttered and dated" },
  { src: "/assets/05-bad-facebook-page.jpeg", alt: "Bad Facebook page — few followers, no recent posts" },
] as const;

const GOOD_PRESENCE_SLIDES = [
  { src: "/assets/01-good-google-search-result-page.jpeg", alt: "Good Google search result — top spot, rich profile, many reviews" },
  { src: "/assets/02-good-google-business-profile-page.jpeg", alt: "Good Google Business profile — verified, 5 stars, complete" },
  { src: "/assets/03-good-google-maps-result-page.jpeg", alt: "Good Google Maps result — verified with photos and reviews" },
  { src: "/assets/04-good-mobile-website-design.jpeg", alt: "Good mobile website — clean, modern, fast" },
  { src: "/assets/05-good-facebook-page.jpeg", alt: "Good Facebook page — active, polished, thousands of followers" },
] as const;

const gText = {
  background: "linear-gradient(90deg,#b56bff,#00d4ff)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
} as const;

const PROSPECT_ITEMS = [
  { text: "A website that earns their trust in a few seconds", Icon: Globe },
  { text: "Branding that looks established and serious", Icon: Award },
  { text: "Proof of similar jobs done well — real reviews", Icon: Star },
  { text: "Clear signs you’re licensed, bonded, and safe to hire", Icon: ShieldCheck },
  { text: "An easy way to reach a real person fast", Icon: PhoneCall },
] as const;

export default function HomeV4() {
  return (
    <Expandable>
<div data-screen-label="Hero" style={{position:'relative',minHeight:'100vh',display:'flex',flexDirection:'column',background:'#080b0f',fontFamily:'\'Inter\',sans-serif',color:'#c8c8c8',overflow:'hidden'}}>

  

  <div style={{position:'absolute',inset:'0',zIndex:'0',background:'#0a0d12'}}>
    <img src="/assets/hero-owner-commercial-site.jpg" alt="Construction company owner in a hi-vis vest at a commercial glass high-rise build under a clear blue sky" style={{position:'absolute',inset:'0',width:'100%',height:'100%',objectFit:'cover',objectPosition:'center'}} />
  </div>
  <div style={{position:'absolute',inset:'0',zIndex:'1',background:'linear-gradient(90deg,rgba(8,11,15,.95) 0%,rgba(8,11,15,.88) 28%,rgba(8,11,15,.55) 54%,rgba(8,11,15,.12) 78%,rgba(8,11,15,0) 100%)',pointerEvents:'none'}}></div>
  <div style={{position:'absolute',inset:'0',zIndex:'1',background:'linear-gradient(180deg,rgba(8,11,15,.55) 0%,transparent 24%,transparent 68%,rgba(8,11,15,.72) 100%)',pointerEvents:'none'}}></div>

  <main style={{position:'relative',zIndex:'2',flex:'1',display:'flex',flexDirection:'column',alignItems:'flex-start',justifyContent:'center',textAlign:'left',padding:'clamp(120px,14vw,180px) clamp(20px,5vw,64px) clamp(60px,8vw,110px)'}}>
    <div style={{maxWidth:'700px',display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
      <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'13px',fontWeight:'500',letterSpacing:'3px',textTransform:'uppercase',color:'#00d4ff',marginBottom:'22px',animation:'fadeUp .7s ease both'}}>Construction websites, SEO &amp; AI systems</div>
      <h1 style={{fontFamily:'\'Bebas Neue\',sans-serif',fontWeight:'400',textTransform:'uppercase',fontSize:'clamp(50px,6.2vw,104px)',lineHeight:'.9',letterSpacing:'1px',color:'#fafafa',margin:'0',textWrap:'balance',animation:'fadeUp .7s ease both',animationDelay:'.1s'}}>We don’t do <span style={{color:'#7f8896'}}>“marketing.”</span> We do <span style={gText}>better jobs</span> and <span style={gText}>bigger margins</span>.</h1>
      <p style={{fontSize:'clamp(17px,1.4vw,21px)',color:'#c8c8c8',lineHeight:'1.6',margin:'26px 0 0',maxWidth:'560px',textWrap:'pretty',animation:'fadeUp .7s ease both',animationDelay:'.2s'}}>We make your company the obvious choice, then build the systems to handle the work. You charge a premium and take only the work you want.</p>
      <div style={{display:'flex',flexWrap:'wrap',gap:'16px',marginTop:'38px',animation:'fadeUp .7s ease both',animationDelay:'.3s'}}>
        <a href="https://cal.com/catalystdigitalsolutions/20min" target="_blank" rel="noopener" className="cta-full" style={{display:'inline-flex',alignItems:'center',justifyContent:'center',gap:'10px',minHeight:'52px',fontFamily:'\'Inter\',sans-serif',fontSize:'17px',fontWeight:'700',color:'#fff',background:'linear-gradient(135deg,#8000ff,#5600ab)',border:'none',padding:'18px 34px',borderRadius:'11px',boxShadow:'0 10px 34px rgba(128,0,255,.42)',cursor:'pointer',textDecoration:'none'}}>Book a 20-Minute Call <span style={{fontSize:'18px'}}>→</span></a>
        <a href="/services/websites" style={{display:'inline-flex',alignItems:'center',gap:'10px',minHeight:'52px',fontFamily:'\'Inter\',sans-serif',fontSize:'16px',fontWeight:'600',color:'#fafafa',background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.24)',padding:'17px 30px',borderRadius:'11px',cursor:'pointer',textDecoration:'none'}}>See our work <span style={{fontSize:'16px'}}>→</span></a>
      </div>
      <div style={{display:'flex',flexWrap:'wrap',gap:'12px 26px',marginTop:'30px',fontSize:'14px',color:'#c2ccd6',animation:'fadeUp .7s ease both',animationDelay:'.4s'}}>
        <span style={{display:'inline-flex',alignItems:'center',gap:'8px'}}><span style={{color:'#80ff80'}}>✓</span> Construction-only</span><span style={{display:'inline-flex',alignItems:'center',gap:'8px'}}><span style={{color:'#80ff80'}}>✓</span> No long-term contracts</span><span style={{display:'inline-flex',alignItems:'center',gap:'8px'}}><span style={{color:'#80ff80'}}>✓</span> Results in 90 days</span>
      </div>
    </div>
  </main>
</div>


<section data-screen-label="Thesis" style={{position:'relative',background:'#080b0f',fontFamily:'\'Inter\',sans-serif',color:'#c8c8c8',overflow:'hidden',padding:'clamp(80px,10vw,150px) clamp(20px,5vw,64px)'}}>
  <div style={{maxWidth:'1180px',margin:'0 auto',display:'flex',flexWrap:'wrap',alignItems:'center',gap:'clamp(40px,5vw,72px)'}}>
    <div style={{flex:'1 1 440px',minWidth:'300px'}}>
      <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'13px',fontWeight:'500',letterSpacing:'3px',textTransform:'uppercase',color:'#00d4ff',marginBottom:'18px'}}>What we actually do</div>
      <h2 style={{fontFamily:'\'Bebas Neue\',sans-serif',fontWeight:'400',textTransform:'uppercase',fontSize:'clamp(42px,5vw,82px)',lineHeight:'.9',letterSpacing:'1px',color:'#fafafa',margin:'0',textWrap:'balance'}}>Your online image <span style={{background:'linear-gradient(90deg,#b56bff,#00d4ff)',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>is</span> your image.</h2>
      <p style={{fontSize:'clamp(17px,1.3vw,20px)',fontWeight:'600',color:'#fafafa',lineHeight:'1.5',margin:'24px 0 0',maxWidth:'520px',textWrap:'pretty'}}>Before a client ever sees your trucks, your crew, or your finished work, they see you online. That first look decides whether you’re the pro they call...or the one they skip.</p>
      <p style={{fontSize:'clamp(15.5px,1.1vw,17px)',color:'#c8c8c8',lineHeight:'1.7',margin:'18px 0 0',maxWidth:'520px',textWrap:'pretty'}}>We make you look like the company that should win the job, then we build the systems to back it up. So you charge more, take the work you want, and stop bidding low just to stay busy.</p>
      <button data-expand-toggle="true" style={{display:'inline-flex',alignItems:'center',gap:'8px',marginTop:'26px',background:'none',border:'none',cursor:'pointer',fontFamily:'\'Inter\',sans-serif',fontSize:'13px',fontWeight:'600',color:'#8000ff',padding:'0'}}><span style={{fontSize:'16px',lineHeight:'1'}}>⊕</span> What that actually means</button>
      <div data-expand-panel="true" hidden style={{marginTop:'16px',maxWidth:'520px',borderLeft:'2px solid #8000ff',padding:'6px 0 6px 20px',animation:'panelIn .42s ease'}}>
          <p style={{fontSize:'14.5px',color:'#c8c8c8',lineHeight:'1.65',margin:'0',textWrap:'pretty'}}>When you look like the obvious choice, three things change: clients stop haggling on price, the better jobs start coming to you, and the systems we build absorb the extra work. So growing doesn’t cost you your nights and weekends.</p>
        </div>
    </div>
    <div style={{flex:'1 1 420px',minWidth:'300px',position:'relative'}}>
      <div style={{position:'absolute',inset:'-6%',background:'radial-gradient(circle at 60% 45%,rgba(0,212,255,.18),transparent 62%)',filter:'blur(26px)',pointerEvents:'none'}}></div>
      <img src="/assets/online-image-is-your-image.jpeg" alt="A contractor on the jobsite beside his company website on a laptop and phone" style={{position:'relative',zIndex:'1',display:'block',width:'100%',height:'auto',borderRadius:'18px',boxShadow:'0 40px 100px rgba(0,0,0,.6)'}} />
    </div>
  </div>
</section>


<section data-screen-label="Which one are you" style={{position:'relative',background:'#080b0f',fontFamily:'\'Inter\',sans-serif',color:'#c8c8c8',overflow:'hidden',padding:'clamp(80px,10vw,150px) clamp(20px,5vw,64px)'}}>
  <div style={{maxWidth:'1180px',margin:'0 auto'}}>
    <div style={{textAlign:'center',maxWidth:'720px',margin:'0 auto'}}>
      <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'13px',fontWeight:'500',letterSpacing:'3px',textTransform:'uppercase',color:'#00d4ff',marginBottom:'16px'}}>Big Shop or Small Shop?</div>
      <h2 style={{fontFamily:'\'Bebas Neue\',sans-serif',fontWeight:'400',textTransform:'uppercase',fontSize:'clamp(42px,5vw,82px)',lineHeight:'.9',letterSpacing:'1px',color:'#fafafa',margin:'0'}}>Which one are you?</h2>
      <p style={{fontSize:'clamp(16px,1.2vw,19px)',color:'#c8c8c8',lineHeight:'1.6',margin:'20px 0 0'}}>Every company has struggles. Which one sounds like your company?</p>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,340px),1fr))',gap:'clamp(18px,2vw,26px)',marginTop:'clamp(40px,5vw,64px)',alignItems:'stretch'}}>
      <div style={{background:'rgba(255,255,255,.025)',border:'1px solid rgba(255,255,255,.09)',borderRadius:'16px',padding:'clamp(28px,3vw,40px)'}}>
        <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'12px',letterSpacing:'2.5px',textTransform:'uppercase',color:'#b56bff'}}>Big shops</div>
        <div style={{fontFamily:'\'Bebas Neue\',sans-serif',fontSize:'clamp(28px,2.6vw,38px)',letterSpacing:'.5px',lineHeight:'1',color:'#fafafa',margin:'12px 0 22px'}}>Drowning in work. Still stuck.</div>
        <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
          <div style={{display:'flex',gap:'12px',alignItems:'flex-start'}}><span style={{color:'#b56bff',fontSize:'15px',lineHeight:'1.5',flex:'none'}}>—</span><span style={{fontSize:'15px',color:'#c8c8c8',lineHeight:'1.55',textWrap:'pretty'}}>The whole thing runs through you.</span></div><div style={{display:'flex',gap:'12px',alignItems:'flex-start'}}><span style={{color:'#b56bff',fontSize:'15px',lineHeight:'1.5',flex:'none'}}>—</span><span style={{fontSize:'15px',color:'#c8c8c8',lineHeight:'1.55',textWrap:'pretty'}}>You take jobs you don’t want just to stay busy.</span></div><div style={{display:'flex',gap:'12px',alignItems:'flex-start'}}><span style={{color:'#b56bff',fontSize:'15px',lineHeight:'1.5',flex:'none'}}>—</span><span style={{fontSize:'15px',color:'#c8c8c8',lineHeight:'1.55',textWrap:'pretty'}}>Newer/smaller companies are winning work you wanted.</span></div><div style={{display:'flex',gap:'12px',alignItems:'flex-start'}}><span style={{color:'#b56bff',fontSize:'15px',lineHeight:'1.5',flex:'none'}}>—</span><span style={{fontSize:'15px',color:'#c8c8c8',lineHeight:'1.55',textWrap:'pretty'}}>Team members quit and take clients with them.</span></div><div style={{display:'flex',gap:'12px',alignItems:'flex-start'}}><span style={{color:'#b56bff',fontSize:'15px',lineHeight:'1.5',flex:'none'}}>—</span><span style={{fontSize:'15px',color:'#c8c8c8',lineHeight:'1.55',textWrap:'pretty'}}>You’re running on phone calls, texts, and spreadsheets.</span></div>
        </div>
      </div>
      <div style={{background:'rgba(255,255,255,.025)',border:'1px solid rgba(255,255,255,.09)',borderRadius:'16px',padding:'clamp(28px,3vw,40px)'}}>
        <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'12px',letterSpacing:'2.5px',textTransform:'uppercase',color:'#00d4ff'}}>Smaller shops</div>
        <div style={{fontFamily:'\'Bebas Neue\',sans-serif',fontSize:'clamp(28px,2.6vw,38px)',letterSpacing:'.5px',lineHeight:'1',color:'#fafafa',margin:'12px 0 22px'}}>Quality work. But fighting to get it.</div>
        <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
          <div style={{display:'flex',gap:'12px',alignItems:'flex-start'}}><span style={{color:'#00d4ff',fontSize:'15px',lineHeight:'1.5',flex:'none'}}>—</span><span style={{fontSize:'15px',color:'#c8c8c8',lineHeight:'1.55',textWrap:'pretty'}}>Margins suffer because you bid low just to win.</span></div><div style={{display:'flex',gap:'12px',alignItems:'flex-start'}}><span style={{color:'#00d4ff',fontSize:'15px',lineHeight:'1.5',flex:'none'}}>—</span><span style={{fontSize:'15px',color:'#c8c8c8',lineHeight:'1.55',textWrap:'pretty'}}>Work comes from referrals — packed one month, empty the next.</span></div><div style={{display:'flex',gap:'12px',alignItems:'flex-start'}}><span style={{color:'#00d4ff',fontSize:'15px',lineHeight:'1.5',flex:'none'}}>—</span><span style={{fontSize:'15px',color:'#c8c8c8',lineHeight:'1.55',textWrap:'pretty'}}>You lose jobs to more established companies.</span></div><div style={{display:'flex',gap:'12px',alignItems:'flex-start'}}><span style={{color:'#00d4ff',fontSize:'15px',lineHeight:'1.5',flex:'none'}}>—</span><span style={{fontSize:'15px',color:'#c8c8c8',lineHeight:'1.55',textWrap:'pretty'}}>You look small next to the companies you’re bidding against.</span></div><div style={{display:'flex',gap:'12px',alignItems:'flex-start'}}><span style={{color:'#00d4ff',fontSize:'15px',lineHeight:'1.5',flex:'none'}}>—</span><span style={{fontSize:'15px',color:'#c8c8c8',lineHeight:'1.55',textWrap:'pretty'}}>You miss calls while you’re on the job.</span></div>
        </div>
      </div>
    </div>
    <p style={{textAlign:'center',fontSize:'clamp(17px,1.4vw,21px)',fontWeight:'600',color:'#fafafa',lineHeight:'1.5',margin:'clamp(36px,4vw,52px) auto 0',maxWidth:'680px',textWrap:'balance'}}>Recognizing the problems is the first step. Now we can solve them. And there’s good news.</p>
    <p style={{textAlign:'center',fontFamily:'\'Bebas Neue\',sans-serif',fontWeight:'400',textTransform:'uppercase',fontSize:'clamp(38px,4.6vw,74px)',lineHeight:'.92',letterSpacing:'1px',color:'#fafafa',margin:'clamp(18px,2vw,26px) auto 0',maxWidth:'900px'}}>The solutions are the <span style={{background:'linear-gradient(90deg,#b56bff,#00d4ff)',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>same</span>.</p>
  </div>
</section>


<section data-screen-label="Different sizes same solutions" style={{position:'relative',background:'#080b0f',fontFamily:'\'Inter\',sans-serif',color:'#c8c8c8',overflow:'hidden'}}>
  <div style={{position:'relative',width:'100%'}}>
    <img src="/assets/different-sizes-same-solutions.jpeg" alt="Left: a commercial contractor at a high-rise build. Right: a residential builder at a finished custom home." style={{display:'block',width:'100%',height:'clamp(360px,42vw,600px)',objectFit:'cover',objectPosition:'center'}} />
    <div style={{position:'absolute',inset:'0',background:'linear-gradient(180deg,rgba(8,11,15,.9) 0%,rgba(8,11,15,.55) 26%,rgba(8,11,15,0) 52%,rgba(8,11,15,.35) 100%)',pointerEvents:'none'}}></div>
    <div style={{position:'absolute',top:'0',left:'0',right:'0',padding:'clamp(40px,6vw,80px) clamp(20px,5vw,64px) 0'}}>
      <h2 style={{maxWidth:'1180px',margin:'0 auto',textAlign:'center',fontFamily:'\'Bebas Neue\',sans-serif',fontWeight:'400',textTransform:'uppercase',fontSize:'clamp(38px,4.8vw,84px)',lineHeight:'.9',letterSpacing:'1px',color:'#fafafa',textShadow:'0 4px 30px rgba(0,0,0,.5)',textWrap:'balance'}}>Different sizes, different battles.<br /><span style={{background:'linear-gradient(90deg,#b56bff,#00d4ff)',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>Same solutions.</span></h2>
    </div>
  </div>
  <div style={{maxWidth:'1180px',margin:'0 auto',padding:'clamp(48px,6vw,80px) clamp(20px,5vw,64px) clamp(72px,9vw,120px)'}}>
    <p style={{fontSize:'clamp(17px,1.4vw,21px)',fontWeight:'600',color:'#fafafa',lineHeight:'1.5',margin:'0 auto',maxWidth:'820px',textAlign:'center',textWrap:'pretty'}}>No matter the size of your company, the move is the same.<br /><span style={gText}>Become the obvious choice.</span></p>
    <p style={{textAlign:'center',fontFamily:'\'Bebas Neue\',sans-serif',fontWeight:'400',textTransform:'uppercase',fontSize:'clamp(32px,3.8vw,60px)',lineHeight:'.95',letterSpacing:'1px',color:'#fafafa',margin:'clamp(38px,4vw,56px) auto 0'}}>The benefits</p>
    <p style={{textAlign:'center',fontStyle:'italic',fontSize:'clamp(16px,1.2vw,18px)',color:'#c8c8c8',lineHeight:'1.6',margin:'14px auto 0',maxWidth:'560px'}}>It pays off a little differently depending on your size.</p>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,360px),1fr))',gap:'clamp(28px,4vw,64px)',marginTop:'clamp(40px,5vw,64px)'}}>
      <div>
        <div style={{fontFamily:'\'Bebas Neue\',sans-serif',fontSize:'clamp(26px,2.4vw,34px)',letterSpacing:'1px',textTransform:'uppercase',color:'#b56bff',marginBottom:'16px'}}>Big Shops</div>
        <p style={{fontSize:'clamp(15.5px,1.1vw,17px)',color:'#c8c8c8',lineHeight:'1.7',margin:'0 0 20px',textWrap:'pretty'}}>When you look like the clear leader — sharp brand, top-notch systems, a name known industry-wide — you stop being one of ten bids. You become the obvious choice. And <em style={{fontStyle:'italic'}}>you</em> set the price.</p>
        <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
          <div style={{display:'flex',gap:'12px',alignItems:'flex-start'}}><span style={{color:'#b56bff',fontSize:'15px',lineHeight:'1.5',flex:'none'}}>✓</span><span style={{fontSize:'15px',color:'#c8c8c8',lineHeight:'1.6',textWrap:'pretty'}}>Charge premium prices, because there’s no viable competitor.</span></div><div style={{display:'flex',gap:'12px',alignItems:'flex-start'}}><span style={{color:'#b56bff',fontSize:'15px',lineHeight:'1.5',flex:'none'}}>✓</span><span style={{fontSize:'15px',color:'#c8c8c8',lineHeight:'1.6',textWrap:'pretty'}}>Systems in place: organized, not stressed, job done right. The premium gets earned here.</span></div><div style={{display:'flex',gap:'12px',alignItems:'flex-start'}}><span style={{color:'#b56bff',fontSize:'15px',lineHeight:'1.5',flex:'none'}}>✓</span><span style={{fontSize:'15px',color:'#c8c8c8',lineHeight:'1.6',textWrap:'pretty'}}>Higher margins buy a better team. That hard-to-find skilled labor comes to you.</span></div><div style={{display:'flex',gap:'12px',alignItems:'flex-start'}}><span style={{color:'#b56bff',fontSize:'15px',lineHeight:'1.5',flex:'none'}}>✓</span><span style={{fontSize:'15px',color:'#c8c8c8',lineHeight:'1.6',textWrap:'pretty'}}>More operating capital buys reach. People see your name everywhere, so the next big job knows you <em style={{fontStyle:'italic'}}>before</em> you bid.</span></div>
        </div>
      </div>
      <div>
        <div style={{fontFamily:'\'Bebas Neue\',sans-serif',fontSize:'clamp(26px,2.4vw,34px)',letterSpacing:'1px',textTransform:'uppercase',color:'#00d4ff',marginBottom:'16px'}}>Small Shops</div>
        <p style={{fontSize:'clamp(15.5px,1.1vw,17px)',color:'#c8c8c8',lineHeight:'1.7',margin:'0 0 20px',textWrap:'pretty'}}>When you look as legit as the big guys — clean site, real reviews, licenses, bonding, and certifications in plain sight — the prospect elevates you in their mind. They can’t tell you’re smaller. They just see a pro.</p>
        <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
          <div style={{display:'flex',gap:'12px',alignItems:'flex-start'}}><span style={{color:'#00d4ff',fontSize:'15px',lineHeight:'1.5',flex:'none'}}>✓</span><span style={{fontSize:'15px',color:'#c8c8c8',lineHeight:'1.6',textWrap:'pretty'}}>Stop being the cheap bid, so you finally charge what your work is worth.</span></div><div style={{display:'flex',gap:'12px',alignItems:'flex-start'}}><span style={{color:'#00d4ff',fontSize:'15px',lineHeight:'1.5',flex:'none'}}>✓</span><span style={{fontSize:'15px',color:'#c8c8c8',lineHeight:'1.6',textWrap:'pretty'}}>Pick the jobs that show off your best work, instead of taking whatever pays the guys this week.</span></div><div style={{display:'flex',gap:'12px',alignItems:'flex-start'}}><span style={{color:'#00d4ff',fontSize:'15px',lineHeight:'1.5',flex:'none'}}>✓</span><span style={{fontSize:'15px',color:'#c8c8c8',lineHeight:'1.6',textWrap:'pretty'}}>Run on the same systems the big guys use, so you can grow without feeling overwhelmed.</span></div><div style={{display:'flex',gap:'12px',alignItems:'flex-start'}}><span style={{color:'#00d4ff',fontSize:'15px',lineHeight:'1.5',flex:'none'}}>✓</span><span style={{fontSize:'15px',color:'#c8c8c8',lineHeight:'1.6',textWrap:'pretty'}}>Look like a company people want to work for. You get dibs on the best subs and employees.</span></div>
        </div>
      </div>
    </div>
    <p style={{textAlign:'center',fontSize:'clamp(18px,1.5vw,23px)',fontWeight:'600',color:'#fafafa',lineHeight:'1.45',margin:'clamp(44px,5vw,64px) auto 0',maxWidth:'720px',textWrap:'balance'}}>Big or small, it begins with how people perceive you when they look you up.</p>
    <div style={{display:'flex',justifyContent:'center',marginTop:'34px'}}><a href="https://cal.com/catalystdigitalsolutions/20min" target="_blank" rel="noopener" className="cta-full" style={{display:'inline-flex',alignItems:'center',justifyContent:'center',gap:'10px',minHeight:'52px',fontFamily:'\'Inter\',sans-serif',fontSize:'17px',fontWeight:'700',color:'#04222b',background:'linear-gradient(135deg,#00d4ff,#12a8cf)',border:'none',padding:'18px 34px',borderRadius:'11px',boxShadow:'0 10px 34px rgba(0,212,255,.42)',cursor:'pointer',textDecoration:'none'}}>See what this looks like for you <span style={{fontSize:'18px'}}>→</span></a></div>
  </div>
</section>



<section data-screen-label="What prospects want" style={{position:'relative',background:'#080b0f',fontFamily:'\'Inter\',sans-serif',color:'#c8c8c8',overflow:'hidden',padding:'clamp(56px,7vw,96px) clamp(20px,5vw,64px)'}}>
  <div style={{position:'relative',maxWidth:'1180px',margin:'0 auto',borderRadius:'26px',overflow:'hidden',boxShadow:'0 40px 100px rgba(0,0,0,.55)',border:'1px solid rgba(255,255,255,.1)'}}>
    <img src="/assets/professional-vetting-general-contractors-for-a-major-job.jpg" alt="A professional vetting general contractors online for a major job" style={{position:'absolute',inset:'0',width:'100%',height:'100%',objectFit:'cover',objectPosition:'center'}} />
    <div style={{position:'absolute',inset:'0',background:'linear-gradient(90deg,rgba(0,0,0,.90) 0%,rgba(0,0,0,.80) 25%,rgba(0,0,0,.70) 50%,rgba(0,0,0,.0) 100%)'}}></div>
    <div style={{position:'relative',zIndex:'1',padding:'clamp(36px,5vw,68px) clamp(28px,5vw,72px)'}}>
      <p style={{fontSize:'clamp(20px,2vw,30px)',fontWeight:'700',color:'#fafafa',lineHeight:'1.35',margin:'0 0 clamp(22px,2.6vw,30px)',maxWidth:'640px',textWrap:'balance'}}>What are your prospects really looking for?</p>
      <div style={{display:'flex',flexDirection:'column',gap:'16px',maxWidth:'620px'}}>
        {PROSPECT_ITEMS.map(({ text, Icon }) => (
          <div key={text} style={{display:'flex',gap:'14px',alignItems:'flex-start'}}>
            <span
              style={{
                flex: 'none',
                width: 36,
                height: 36,
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,212,255,.1)',
                border: '1px solid rgba(0,212,255,.28)',
                boxShadow: '0 0 20px rgba(0,212,255,.12)',
              }}
              aria-hidden
            >
              <Icon size={18} strokeWidth={2.25} color="#00d4ff" />
            </span>
            <span style={{fontSize:'clamp(15.5px,1.2vw,18px)',color:'#e6eaef',lineHeight:'1.55',paddingTop:7,textWrap:'pretty'}}>{text}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>


<section data-screen-label="Self audit" style={{position:'relative',background:'#080b0f',fontFamily:'\'Inter\',sans-serif',color:'#c8c8c8',overflow:'hidden',padding:'clamp(80px,10vw,150px) clamp(20px,5vw,64px)'}}>
  <div style={{maxWidth:'1180px',margin:'0 auto'}}>
    <div style={{textAlign:'center',maxWidth:'760px',margin:'0 auto'}}>
      <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'13px',fontWeight:'500',letterSpacing:'3px',textTransform:'uppercase',color:'#00d4ff',marginBottom:'16px'}}>Before they ever call</div>
      <h2 style={{fontFamily:'\'Bebas Neue\',sans-serif',fontWeight:'400',textTransform:'uppercase',fontSize:'clamp(42px,5vw,82px)',lineHeight:'.9',letterSpacing:'1px',color:'#fafafa',margin:'0',textWrap:'balance'}}>When they <span style={gText}>look you up</span>, do you <span style={gText}>look the part?</span></h2>
      <p style={{fontSize:'clamp(17px,1.3vw,20px)',fontWeight:'600',color:'#fafafa',lineHeight:'1.5',margin:'22px 0 0',textWrap:'pretty'}}>Before anyone hires you, they Google you. What they find decides whether they call you...or a competitor.</p>
      <p style={{fontSize:'clamp(15.5px,1.1vw,17px)',color:'#c8c8c8',lineHeight:'1.7',margin:'16px 0 0',textWrap:'pretty'}}>Your work might be the best in town, but a dead website and one old Google review will keep prospects from ever finding that out. If you look small online, you lose jobs you never even knew about.</p>
    </div>

    <div style={{display:'flex',flexDirection:'column',gap:'clamp(40px,5vw,72px)',marginTop:'clamp(44px,5vw,64px)'}}>
      <div style={{width:'100%',textAlign:'center'}}>
        <p style={{fontFamily:'\'Bebas Neue\',sans-serif',fontWeight:400,textTransform:'uppercase',fontSize:'clamp(34px,4vw,64px)',lineHeight:'.95',letterSpacing:'1px',color:'#ff6b6b',margin:'0 0 8px'}}>Bad presence</p>
        <CoverflowCarousel slides={[...BAD_PRESENCE_SLIDES]} label="Bad online presence examples" />
      </div>
      <div style={{width:'100%',textAlign:'center'}}>
        <p style={{fontFamily:'\'Bebas Neue\',sans-serif',fontWeight:400,textTransform:'uppercase',fontSize:'clamp(34px,4vw,64px)',lineHeight:'.95',letterSpacing:'1px',color:'#80ff80',margin:'0 0 8px'}}>Good presence</p>
        <CoverflowCarousel slides={[...GOOD_PRESENCE_SLIDES]} label="Good online presence examples" />
      </div>
    </div>
    <div style={{textAlign:'center',margin:'clamp(20px,2.4vw,30px) auto 0'}}>
      <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'12px',letterSpacing:'2.5px',textTransform:'uppercase',color:'#7f8896'}}>↑ Comparing the two above ↑</div>
      <p style={{fontFamily:'\'Bebas Neue\',sans-serif',fontWeight:'400',textTransform:'uppercase',fontSize:'clamp(34px,4vw,64px)',lineHeight:'.95',letterSpacing:'1px',color:'#fafafa',margin:'8px 0 0'}}>Which one would you hire?</p>
    </div>

    
    <div style={{maxWidth:'720px',margin:'clamp(52px,6vw,80px) auto 0',textAlign:'center',background:'linear-gradient(180deg,#0d1622,#0a1119)',border:'1px solid rgba(0,212,255,.16)',borderRadius:'22px',padding:'clamp(30px,4vw,52px) clamp(22px,4vw,52px)',boxShadow:'0 30px 80px rgba(0,0,0,.45)'}}>
      <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'12px',letterSpacing:'2.5px',textTransform:'uppercase',color:'#00d4ff',marginBottom:'20px'}}>Now do it yourself</div>
      <MockSearchBar />
      <p style={{fontSize:'15px',color:'#c8c8c8',lineHeight:'1.6',margin:'22px 0 0'}}>Now try your own. Search your trade and your city.</p>
      <p style={{fontSize:'clamp(16px,1.3vw,19px)',fontWeight:'600',color:'#fafafa',lineHeight:'1.45',margin:'12px auto 0',maxWidth:'520px',textWrap:'balance'}}>Are you in the top three? If not, that’s who your next customer is calling.</p>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'0'}}>
        <button data-expand-toggle="true" style={{display:'inline-flex',alignItems:'center',gap:'8px',marginTop:'26px',background:'none',border:'none',cursor:'pointer',fontFamily:'\'Inter\',sans-serif',fontSize:'13px',fontWeight:'600',color:'#8000ff',padding:'0'}}><span style={{fontSize:'16px',lineHeight:'1'}}>⊕</span> What are they even checking?</button>
      <div data-expand-panel="true" hidden style={{marginTop:'16px',maxWidth:'600px',borderLeft:'2px solid #8000ff',padding:'6px 0 6px 20px',animation:'panelIn .42s ease'}}><p style={{fontSize:'14.5px',color:'#c8c8c8',lineHeight:'1.65',margin:'0',textWrap:'pretty'}}>Five places, 20 seconds: your Google search result, your Google Business Profile, the local map pack, your website on their phone, and your Facebook. That’s the whole interview. Most contractors never know that their lack of presence cost them the job.</p></div>
      </div>
      <div style={{display:'flex',justifyContent:'center',marginTop:'32px'}}><a href="https://cal.com/catalystdigitalsolutions/20min" target="_blank" rel="noopener" className="cta-full" style={{display:'inline-flex',alignItems:'center',justifyContent:'center',gap:'10px',minHeight:'52px',fontFamily:'\'Inter\',sans-serif',fontSize:'17px',fontWeight:'700',color:'#04222b',background:'linear-gradient(135deg,#00d4ff,#12a8cf)',border:'none',padding:'18px 34px',borderRadius:'11px',boxShadow:'0 10px 34px rgba(0,212,255,.42)',cursor:'pointer',textDecoration:'none'}}>Fix what they’re seeing <span style={{fontSize:'18px'}}>→</span></a></div>
    </div>
  </div>
</section>


<section data-screen-label="Complete presence" style={{position:'relative',background:'#080b0f',fontFamily:'\'Inter\',sans-serif',color:'#c8c8c8',overflow:'hidden',padding:'clamp(80px,10vw,150px) clamp(20px,5vw,64px)'}}>
  <div style={{position:'absolute',top:'-8%',left:'-8%',width:'600px',height:'600px',maxWidth:'90vw',background:'radial-gradient(circle at center,rgba(0,212,255,.1),transparent 64%)',filter:'blur(28px)',pointerEvents:'none'}}></div>
  <div style={{position:'relative',zIndex:'1',maxWidth:'1180px',margin:'0 auto'}}>
    <div style={{textAlign:'center',maxWidth:'760px',margin:'0 auto'}}>
      <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'13px',fontWeight:'500',letterSpacing:'3px',textTransform:'uppercase',color:'#00d4ff',marginBottom:'16px'}}>The fix</div>
      <h2 style={{fontFamily:'\'Bebas Neue\',sans-serif',fontWeight:'400',textTransform:'uppercase',fontSize:'clamp(42px,5vw,82px)',lineHeight:'.9',letterSpacing:'1px',color:'#fafafa',margin:'0',textWrap:'balance'}}>This is what “the pro” looks like online.</h2>
      <p style={{fontSize:'clamp(16px,1.2vw,19px)',color:'#c8c8c8',lineHeight:'1.6',margin:'20px auto 0',maxWidth:'600px',textWrap:'pretty'}}>We build the whole picture. Everywhere they check, you look like the company that should win the job.</p>
    </div>

    <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'clamp(20px,2.5vw,28px)',marginTop:'clamp(44px,5vw,64px)'}}>
      <a href="https://construction2.catalyst-demos.com" target="_blank" rel="noopener" className="demo-card" style={{flex:'1 1 380px',minWidth:'280px',maxWidth:'480px',display:'block',textDecoration:'none',background:'linear-gradient(180deg,#0c1016,#090c11)',border:'1px solid rgba(255,255,255,.09)',borderRadius:'16px',overflow:'hidden',boxShadow:'0 24px 60px rgba(0,0,0,.45)',transition:'transform .35s ease,box-shadow .35s ease,border-color .35s ease'}}>
      <div style={{display:'flex',alignItems:'center',gap:'14px',padding:'13px 16px',background:'rgba(255,255,255,.03)',borderBottom:'1px solid rgba(255,255,255,.07)'}}>
        <div style={{display:'flex',gap:'7px',flex:'none'}}><span style={{width:'11px',height:'11px',borderRadius:'50%',background:'#ff5f57'}}></span><span style={{width:'11px',height:'11px',borderRadius:'50%',background:'#febc2e'}}></span><span style={{width:'11px',height:'11px',borderRadius:'50%',background:'#28c840'}}></span></div>
        <div style={{flex:'1',display:'flex',alignItems:'center',gap:'8px',background:'rgba(0,0,0,.35)',border:'1px solid rgba(255,255,255,.08)',borderRadius:'8px',padding:'6px 12px',minWidth:'0'}}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#80ff80" strokeWidth="2" style={{flex:'none'}}><rect x="5" y="11" width="14" height="10" rx="2"></rect><path d="M8 11V7a4 4 0 0 1 8 0v4"></path></svg><span style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'12.5px',color:'#d6dae0',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>construction2.catalyst-demos.com</span></div>
      </div>
      <div style={{position:'relative',aspectRatio:'1920/1300',overflow:'hidden',containerType:'size',background:'#0a0d12'}}>
        <img className="demo-thumb-img" src="/assets/demo-full-holloway.jpeg" alt="Holloway demo site" style={{position:'absolute',top:'0',left:'0',width:'100%',height:'auto',minHeight:'100%',objectFit:'cover',objectPosition:'top',transition:'transform 11.1s linear'}} />
      </div>
      <div style={{padding:'18px 20px 20px',borderTop:'1px solid rgba(255,255,255,.07)'}}><div style={{display:'flex',alignItems:'baseline',justifyContent:'space-between',gap:'12px'}}><div style={{fontFamily:'\'Bebas Neue\',sans-serif',fontSize:'24px',letterSpacing:'1.5px',color:'#fafafa'}}>Holloway</div><div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'10.5px',letterSpacing:'1.5px',color:'#00d4ff',whiteSpace:'nowrap'}}>LIVE →</div></div><p style={{fontSize:'13.5px',color:'#9aa3b0',lineHeight:'1.55',margin:'8px 0 0',textWrap:'pretty'}}>Employee-owned Colorado builder. Red, human,<br />people-first.</p></div>
    </a>
      <a href="https://construction3.catalyst-demos.com" target="_blank" rel="noopener" className="demo-card" style={{flex:'1 1 380px',minWidth:'280px',maxWidth:'480px',display:'block',textDecoration:'none',background:'linear-gradient(180deg,#0c1016,#090c11)',border:'1px solid rgba(255,255,255,.09)',borderRadius:'16px',overflow:'hidden',boxShadow:'0 24px 60px rgba(0,0,0,.45)',transition:'transform .35s ease,box-shadow .35s ease,border-color .35s ease'}}>
      <div style={{display:'flex',alignItems:'center',gap:'14px',padding:'13px 16px',background:'rgba(255,255,255,.03)',borderBottom:'1px solid rgba(255,255,255,.07)'}}>
        <div style={{display:'flex',gap:'7px',flex:'none'}}><span style={{width:'11px',height:'11px',borderRadius:'50%',background:'#ff5f57'}}></span><span style={{width:'11px',height:'11px',borderRadius:'50%',background:'#febc2e'}}></span><span style={{width:'11px',height:'11px',borderRadius:'50%',background:'#28c840'}}></span></div>
        <div style={{flex:'1',display:'flex',alignItems:'center',gap:'8px',background:'rgba(0,0,0,.35)',border:'1px solid rgba(255,255,255,.08)',borderRadius:'8px',padding:'6px 12px',minWidth:'0'}}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#80ff80" strokeWidth="2" style={{flex:'none'}}><rect x="5" y="11" width="14" height="10" rx="2"></rect><path d="M8 11V7a4 4 0 0 1 8 0v4"></path></svg><span style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'12.5px',color:'#d6dae0',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>construction3.catalyst-demos.com</span></div>
      </div>
      <div style={{position:'relative',aspectRatio:'1920/1300',overflow:'hidden',containerType:'size',background:'#0a0d12'}}>
        <img className="demo-thumb-img" src="/assets/demo-full-monolith.jpeg" alt="Monolith demo site" style={{position:'absolute',top:'0',left:'0',width:'100%',height:'auto',minHeight:'100%',objectFit:'cover',objectPosition:'top',transition:'transform 12s linear'}} />
      </div>
      <div style={{padding:'18px 20px 20px',borderTop:'1px solid rgba(255,255,255,.07)'}}><div style={{display:'flex',alignItems:'baseline',justifyContent:'space-between',gap:'12px'}}><div style={{fontFamily:'\'Bebas Neue\',sans-serif',fontSize:'24px',letterSpacing:'1.5px',color:'#fafafa'}}>Monolith</div><div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'10.5px',letterSpacing:'1.5px',color:'#00d4ff',whiteSpace:'nowrap'}}>LIVE →</div></div><p style={{fontSize:'13.5px',color:'#9aa3b0',lineHeight:'1.55',margin:'8px 0 0',textWrap:'pretty'}}>Earthwork and heavy civil. Blunt type, dirt-and-orange.</p></div>
    </a>
    </div>
    <p style={{textAlign:'center',fontSize:'14.5px',color:'#9aa3b0',lineHeight:'1.6',margin:'26px auto 0',maxWidth:'640px',textWrap:'pretty'}}>Custom sites built for contractors. No templates. They load fast, look expensive, and turn visitors into calls.</p>
    <div style={{display:'flex',justifyContent:'center',marginTop:'28px'}}>
      <a href="/services/websites" className="cta-full" style={{display:'inline-flex',alignItems:'center',justifyContent:'center',gap:'10px',minHeight:'52px',fontFamily:'\'Inter\',sans-serif',fontSize:'17px',fontWeight:'700',color:'#fff',background:'linear-gradient(135deg,#8000ff,#5600ab)',border:'none',padding:'18px 34px',borderRadius:'11px',boxShadow:'0 10px 34px rgba(128,0,255,.42)',cursor:'pointer',textDecoration:'none'}}>See more of our website work <span style={{fontSize:'18px'}}>→</span></a>
    </div>
    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
      <button data-expand-toggle="true" style={{display:'inline-flex',alignItems:'center',gap:'8px',marginTop:'26px',background:'none',border:'none',cursor:'pointer',fontFamily:'\'Inter\',sans-serif',fontSize:'13px',fontWeight:'600',color:'#8000ff',padding:'0'}}><span style={{fontSize:'16px',lineHeight:'1'}}>⊕</span> Are these WordPress sites/templates?</button>
      <div data-expand-panel="true" hidden style={{marginTop:'16px',maxWidth:'600px',borderLeft:'2px solid #8000ff',padding:'6px 0 6px 20px',animation:'panelIn .42s ease'}}><p style={{fontSize:'14.5px',color:'#c8c8c8',lineHeight:'1.65',margin:'0',textWrap:'pretty'}}>No. Our websites are built on Next.js/React, the same tech behind the biggest names on the web, like Nike, Netflix, and Uber. Next.js loads faster and ranks better. When you hire Catalyst, your website will never look like a template someone bought for $50.</p></div>
    </div>

    <h3 style={{textAlign:'center',fontFamily:'\'Bebas Neue\',sans-serif',fontWeight:'400',textTransform:'uppercase',fontSize:'clamp(28px,3vw,42px)',letterSpacing:'1px',color:'#fafafa',lineHeight:'1',margin:'clamp(52px,6vw,76px) 0 0'}}>We ensure you’re…</h3>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,300px),1fr))',gap:'clamp(16px,2vw,22px)',marginTop:'clamp(22px,2.5vw,30px)'}}>
      <div style={{background:'rgba(255,255,255,.025)',border:'1px solid rgba(255,255,255,.09)',borderRadius:'16px',padding:'clamp(26px,3vw,34px)',display:'flex',flexDirection:'column',gap:'12px'}}><div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'12px',letterSpacing:'2.5px',textTransform:'uppercase',color:'#00d4ff'}}>Found first</div><p style={{fontSize:'14.5px',color:'#c8c8c8',lineHeight:'1.65',margin:'0',flex:'1',textWrap:'pretty'}}>When someone searches your trade in your town, you’re at the top. The next job finds you before it finds your competitor.</p></div>
      <div style={{background:'rgba(255,255,255,.025)',border:'1px solid rgba(255,255,255,.09)',borderRadius:'16px',padding:'clamp(26px,3vw,34px)',display:'flex',flexDirection:'column',gap:'12px'}}><div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'12px',letterSpacing:'2.5px',textTransform:'uppercase',color:'#b56bff'}}>Trusted at a glance</div><p style={{fontSize:'14.5px',color:'#c8c8c8',lineHeight:'1.65',margin:'0',flex:'1',textWrap:'pretty'}}>A filled-out Google profile and a steady stream of real reviews. Proof you’re the safe bet, right where they’re looking.</p></div>
      <div style={{background:'rgba(255,255,255,.025)',border:'1px solid rgba(255,255,255,.09)',borderRadius:'16px',padding:'clamp(26px,3vw,34px)',display:'flex',flexDirection:'column',gap:'12px'}}><div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'12px',letterSpacing:'2.5px',textTransform:'uppercase',color:'#80ff80'}}>Always visible</div><p style={{fontSize:'14.5px',color:'#c8c8c8',lineHeight:'1.65',margin:'0',flex:'1',textWrap:'pretty'}}>Fresh posts and videos every week keep your name in front of buyers, so you’re already the one they know when it’s time to build.</p><div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'10.5px',letterSpacing:'1px',color:'#7f8896'}}>Framework tier and up</div></div>
    </div>
    <p style={{textAlign:'center',fontSize:'clamp(17px,1.4vw,21px)',fontWeight:'600',color:'#fafafa',lineHeight:'1.45',margin:'clamp(40px,4vw,56px) auto 0',maxWidth:'720px',textWrap:'balance'}}>If you look like the clear choice, the competition disappears.</p>
    <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'14px',marginTop:'30px'}}>
      <a href="https://cal.com/catalystdigitalsolutions/20min" target="_blank" rel="noopener" className="cta-full" style={{display:'inline-flex',alignItems:'center',justifyContent:'center',gap:'10px',minHeight:'52px',fontFamily:'\'Inter\',sans-serif',fontSize:'17px',fontWeight:'700',color:'#04222b',background:'linear-gradient(135deg,#00d4ff,#12a8cf)',border:'none',padding:'18px 34px',borderRadius:'11px',boxShadow:'0 10px 34px rgba(0,212,255,.42)',cursor:'pointer',textDecoration:'none'}}>Let’s talk about your website <span style={{fontSize:'18px'}}>→</span></a>
    </div>
  </div>
</section>


<section data-screen-label="The systems" style={{position:'relative',background:'#080b0f',fontFamily:'\'Inter\',sans-serif',color:'#c8c8c8',overflow:'hidden',padding:'clamp(80px,10vw,150px) clamp(20px,5vw,64px)'}}>
  <div style={{maxWidth:'1180px',margin:'0 auto'}}>
    <div style={{maxWidth:'820px'}}>
      <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'13px',fontWeight:'500',letterSpacing:'3px',textTransform:'uppercase',color:'#00d4ff',marginBottom:'16px'}}>The systems</div>
      <h2 style={{fontFamily:'\'Bebas Neue\',sans-serif',fontWeight:'400',textTransform:'uppercase',fontSize:'clamp(42px,5vw,82px)',lineHeight:'.9',letterSpacing:'1px',color:'#fafafa',margin:'0',textWrap:'balance'}}><span style={gText}>Lots of work</span> is great.<br />Until it buries you.</h2>
      <p style={{fontSize:'clamp(17px,1.3vw,20px)',fontWeight:'600',color:'#fafafa',lineHeight:'1.5',margin:'22px 0 0',maxWidth:'640px',textWrap:'pretty'}}>We build the systems that streamline your company, so you can stop working nights and weekends.</p>
    </div>

    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,420px),1fr))',gap:'clamp(18px,2vw,24px)',marginTop:'clamp(44px,5vw,64px)',alignItems:'start'}}>

      
      <div style={{background:'rgba(255,255,255,.025)',border:'1px solid rgba(255,255,255,.09)',borderRadius:'18px',padding:'clamp(26px,3vw,34px)'}}>
        <div style={{fontFamily:'\'Inter\',sans-serif',fontWeight:'700',fontSize:'clamp(18px,1.6vw,22px)',letterSpacing:'.2px',color:'#00d4ff'}}>AI Phone Agent</div>
        <div style={{margin:'16px 0 18px',padding:'6px 2px 2px',display:'flex',flexDirection:'column',gap:'16px'}}>
          <div style={{position:'relative',alignSelf:'flex-start',maxWidth:'88%',background:'rgba(255,255,255,.07)',border:'1px solid rgba(255,255,255,.08)',borderRadius:'24px 24px 24px 6px',padding:'12px 18px',fontSize:'12.5px',color:'#e6eaef',lineHeight:'1.5'}}>“Hi, my name is Mike Gentry. I’m wondering if you guys do bathroom remodels?”<span style={{position:'absolute',bottom:'-7px',left:'16px',width:'0',height:'0',borderStyle:'solid',borderWidth:'9px 11px 0 0',borderColor:'rgba(255,255,255,.07) transparent transparent transparent'}}></span></div>
          <div style={{position:'relative',alignSelf:'flex-end',maxWidth:'90%',background:'linear-gradient(135deg,#8000ff,#5600ab)',borderRadius:'24px 24px 6px 24px',padding:'12px 18px',fontSize:'12.5px',color:'#fff',lineHeight:'1.5',boxShadow:'0 8px 22px rgba(128,0,255,.28)'}}>“Hello, Mike. We do. I can book your free call on Friday at 10. Does that work?”<span style={{position:'absolute',bottom:'-7px',right:'16px',width:'0',height:'0',borderStyle:'solid',borderWidth:'9px 11px 0 0',borderColor:'transparent #5f0fb0 transparent transparent'}}></span></div>
          <div style={{position:'relative',alignSelf:'flex-start',maxWidth:'88%',background:'rgba(255,255,255,.07)',border:'1px solid rgba(255,255,255,.08)',borderRadius:'24px 24px 24px 6px',padding:'12px 18px',fontSize:'12.5px',color:'#e6eaef',lineHeight:'1.5'}}>“Yes! Thank you!”<span style={{position:'absolute',bottom:'-7px',left:'16px',width:'0',height:'0',borderStyle:'solid',borderWidth:'9px 11px 0 0',borderColor:'rgba(255,255,255,.07) transparent transparent transparent'}}></span></div>
          <div style={{position:'relative',alignSelf:'flex-end',maxWidth:'90%',background:'linear-gradient(135deg,#8000ff,#5600ab)',borderRadius:'24px 24px 6px 24px',padding:'12px 18px',fontSize:'12.5px',color:'#fff',lineHeight:'1.5',boxShadow:'0 8px 22px rgba(128,0,255,.28)'}}>“My pleasure! Anthony will give you a call then.”<span style={{position:'absolute',bottom:'-7px',right:'16px',width:'0',height:'0',borderStyle:'solid',borderWidth:'9px 11px 0 0',borderColor:'transparent #5f0fb0 transparent transparent'}}></span></div>
          <div style={{display:'flex',alignItems:'center',gap:'9px',alignSelf:'center',background:'rgba(128,255,128,.08)',border:'1px solid rgba(128,255,128,.3)',borderRadius:'100px',padding:'9px 16px',marginTop:'4px'}}><span style={{color:'#80ff80',fontSize:'13px',lineHeight:'1'}}>✓</span><span style={{fontSize:'12.5px',fontWeight:'600',color:'#80ff80'}}>Call scheduled — Friday • 10:00 AM</span></div>
        </div>
        <p style={{fontSize:'14.5px',color:'#c8c8c8',lineHeight:'1.65',margin:'0',textWrap:'pretty'}}>Our AI answers every call — day, night, weekends. It talks like a person, figures out the job, and books the good ones straight to your calendar. A missed call is a missed job. Now you miss neither.</p>
        <div style={{display:'flex',flexDirection:'column'}}><button data-expand-toggle="true" style={{display:'inline-flex',alignItems:'center',gap:'8px',marginTop:'26px',background:'none',border:'none',cursor:'pointer',fontFamily:'\'Inter\',sans-serif',fontSize:'13px',fontWeight:'600',color:'#8000ff',padding:'0'}}><span style={{fontSize:'16px',lineHeight:'1'}}>⊕</span> Does speed really matter that much?</button>
      <div data-expand-panel="true" hidden style={{marginTop:'16px',maxWidth:'600px',borderLeft:'2px solid #8000ff',padding:'6px 0 6px 20px',animation:'panelIn .42s ease'}}><p style={{fontSize:'14.5px',color:'#c8c8c8',lineHeight:'1.65',margin:'0',textWrap:'pretty'}}>Roughly 78% of buyers hire the first company that responds. The average business takes 42 hours to call a lead back. Studies show: answer in 5 minutes instead of 30 and you’re 21× more likely to get the job.</p></div></div>
      </div>

      
      <div style={{background:'rgba(255,255,255,.025)',border:'1px solid rgba(255,255,255,.09)',borderRadius:'18px',padding:'clamp(26px,3vw,34px)'}}>
        <div style={{fontFamily:'\'Inter\',sans-serif',fontWeight:'700',fontSize:'clamp(18px,1.6vw,22px)',letterSpacing:'.2px',color:'#00d4ff'}}>Automatic RFPs to Your Inbox</div>
        <div style={{margin:'16px 0 18px',background:'#0c1016',border:'1px solid rgba(255,255,255,.07)',borderRadius:'14px',padding:'14px',display:'flex',flexDirection:'column',gap:'9px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px',background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.07)',borderRadius:'10px',padding:'9px 11px'}}><span style={{width:'8px',height:'8px',borderRadius:'50%',background:'#80ff80',boxShadow:'0 0 8px #80ff80',flex:'none'}}></span><div style={{flex:'1'}}><div style={{fontSize:'12.5px',fontWeight:'600',color:'#fafafa'}}>School District Reroof</div><div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'10px',color:'#7f8896',marginTop:'2px'}}>Public bid · fits your profile</div></div></div><div style={{display:'flex',alignItems:'center',gap:'10px',background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.07)',borderRadius:'10px',padding:'9px 11px'}}><span style={{width:'8px',height:'8px',borderRadius:'50%',background:'#80ff80',boxShadow:'0 0 8px #80ff80',flex:'none'}}></span><div style={{flex:'1'}}><div style={{fontSize:'12.5px',fontWeight:'600',color:'#fafafa'}}>City Parking Structure</div><div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'10px',color:'#7f8896',marginTop:'2px'}}>Public bid · fits your profile</div></div></div><div style={{display:'flex',alignItems:'center',gap:'10px',background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.07)',borderRadius:'10px',padding:'9px 11px'}}><span style={{width:'8px',height:'8px',borderRadius:'50%',background:'#80ff80',boxShadow:'0 0 8px #80ff80',flex:'none'}}></span><div style={{flex:'1'}}><div style={{fontSize:'12.5px',fontWeight:'600',color:'#fafafa'}}>Community Center HVAC</div><div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'10px',color:'#7f8896',marginTop:'2px'}}>Public bid · fits your profile</div></div></div>
        </div>
        <p style={{fontSize:'14.5px',color:'#c8c8c8',lineHeight:'1.65',margin:'0',textWrap:'pretty'}}>Stop spending 3 hours a day digging through bid portals. Our AI scans for jobs that fit your budget, licensing, and other requirements, and drops them in your inbox, ready to bid.<br /><span style={{color:'#80ff80',fontWeight:'600'}}>15+ hours back every week.</span></p>
        <div style={{display:'flex',flexDirection:'column'}}><button data-expand-toggle="true" style={{display:'inline-flex',alignItems:'center',gap:'8px',marginTop:'26px',background:'none',border:'none',cursor:'pointer',fontFamily:'\'Inter\',sans-serif',fontSize:'13px',fontWeight:'600',color:'#8000ff',padding:'0'}}><span style={{fontSize:'16px',lineHeight:'1'}}>⊕</span> How does it know what fits?</button>
        <div data-expand-panel="true" hidden style={{marginTop:'16px',maxWidth:'600px',borderLeft:'2px solid #8000ff',padding:'6px 0 6px 20px',animation:'panelIn .42s ease'}}><p style={{fontSize:'14.5px',color:'#c8c8c8',lineHeight:'1.65',margin:'0',textWrap:'pretty'}}>We set it up with your trade, licenses, bonding capacities, service areas, and more. It only surfaces jobs that clear all of it — so you’re not sifting through hundreds of listings that were never a fit in the first place.</p></div></div>
      </div>

      
      <div style={{background:'rgba(255,255,255,.025)',border:'1px solid rgba(255,255,255,.09)',borderRadius:'18px',padding:'clamp(26px,3vw,34px)'}}>
        <div style={{fontFamily:'\'Inter\',sans-serif',fontWeight:'700',fontSize:'clamp(18px,1.6vw,22px)',letterSpacing:'.2px',color:'#00d4ff'}}>AI Chatbot Trained on Your Company</div>
        <div style={{margin:'16px 0 18px',background:'#0c1016',border:'1px solid rgba(255,255,255,.07)',borderRadius:'14px',padding:'14px',display:'flex',flexDirection:'column',gap:'9px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'8px'}}><span style={{width:'26px',height:'26px',borderRadius:'50%',background:'linear-gradient(135deg,#8000ff,#5600ab)',display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></span><span style={{fontSize:'12px',color:'#9aa3b0'}}>Chat · <span style={{color:'#80ff80'}}>online</span></span><span style={{marginLeft:'auto',fontFamily:'\'JetBrains Mono\',monospace',fontSize:'10px',color:'#7f8896'}}>11:04 PM</span></div>
          <div style={{alignSelf:'flex-start',maxWidth:'84%',background:'rgba(255,255,255,.06)',borderRadius:'12px 12px 12px 4px',padding:'9px 12px',fontSize:'12.5px',color:'#d6dae0',lineHeight:'1.45'}}>“Do you handle commercial tenant improvements?”</div>
          <div style={{alignSelf:'flex-end',maxWidth:'88%',background:'linear-gradient(135deg,#8000ff,#5600ab)',borderRadius:'12px 12px 4px 12px',padding:'9px 12px',fontSize:'12.5px',color:'#fff',lineHeight:'1.45'}}>“We do — retail, office, and restaurant TIs across Kern County, including permits and after-hours work to keep tenants open.”</div>
          <div style={{alignSelf:'flex-start',maxWidth:'84%',background:'rgba(255,255,255,.06)',borderRadius:'12px 12px 12px 4px',padding:'9px 12px',fontSize:'12.5px',color:'#d6dae0',lineHeight:'1.45'}}>“Do you self-perform framing, or sub it out?”</div>
          <div style={{alignSelf:'flex-end',maxWidth:'88%',background:'linear-gradient(135deg,#8000ff,#5600ab)',borderRadius:'12px 12px 4px 12px',padding:'9px 12px',fontSize:'12.5px',color:'#fff',lineHeight:'1.45'}}>“Framing and drywall we self-perform; MEP runs through licensed subs we’ve worked with for years.”</div>
          <div style={{alignSelf:'flex-start',maxWidth:'84%',background:'rgba(255,255,255,.06)',borderRadius:'12px 12px 12px 4px',padding:'9px 12px',fontSize:'12.5px',color:'#d6dae0',lineHeight:'1.45'}}>“Okay. Can someone call me Monday morning?”</div>
          <div style={{alignSelf:'flex-end',maxWidth:'88%',background:'linear-gradient(135deg,#8000ff,#5600ab)',borderRadius:'12px 12px 4px 12px',padding:'9px 12px',fontSize:'12.5px',color:'#fff',lineHeight:'1.45'}}>“Absolutely. What’s the best number? I’ll lock in Monday at 9 AM right now.”</div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',background:'rgba(128,255,128,.08)',border:'1px solid rgba(128,255,128,.3)',borderRadius:'10px',padding:'9px 12px',marginTop:'2px'}}><span style={{fontSize:'12.5px',fontWeight:'600',color:'#80ff80'}}>✓ Call booked</span><span style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'11px',color:'#c8c8c8'}}>MON · 9:00 AM</span></div>
        </div>
        <p style={{fontSize:'14.5px',color:'#c8c8c8',lineHeight:'1.65',margin:'0',textWrap:'pretty'}}>A chatbot that knows your business specifics, such as services, build processes, and policies. It answers real questions, captures the lead, and books the call — even at 11 p.m. on a Sunday.</p>
        <div style={{display:'flex',flexDirection:'column'}}><button data-expand-toggle="true" style={{display:'inline-flex',alignItems:'center',gap:'8px',marginTop:'26px',background:'none',border:'none',cursor:'pointer',fontFamily:'\'Inter\',sans-serif',fontSize:'13px',fontWeight:'600',color:'#8000ff',padding:'0'}}><span style={{fontSize:'16px',lineHeight:'1'}}>⊕</span> Does it ever just make things up?</button>
        <div data-expand-panel="true" hidden style={{marginTop:'16px',maxWidth:'600px',borderLeft:'2px solid #8000ff',padding:'6px 0 6px 20px',animation:'panelIn .42s ease'}}><p style={{fontSize:'14.5px',color:'#c8c8c8',lineHeight:'1.65',margin:'0',textWrap:'pretty'}}>No. We load your real company details — your services, past jobs, service area, and licensing — into a private knowledge base the chatbot reads from. It only answers from what’s actually true about you, and it never invents capabilities or commits you to anything it shouldn’t. It has one goal: answer fast and book the call, so the customer never calls a competitor.</p></div></div>
      </div>

      
      <div style={{background:'rgba(255,255,255,.025)',border:'1px solid rgba(255,255,255,.09)',borderRadius:'18px',padding:'clamp(26px,3vw,34px)'}}>
        <div style={{fontFamily:'\'Inter\',sans-serif',fontWeight:'700',fontSize:'clamp(18px,1.6vw,22px)',letterSpacing:'.2px',color:'#00d4ff'}}>ERP Systems Implemented</div>
        <div style={{margin:'16px 0 18px',background:'#0c1016',border:'1px solid rgba(255,255,255,.07)',borderRadius:'14px',padding:'14px'}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'8px'}}>
            <div style={{background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.07)',borderRadius:'9px',padding:'10px'}}><div style={{width:'22px',height:'22px',borderRadius:'6px',background:'#00d4ff22',border:'1px solid #00d4ff66',marginBottom:'8px'}}></div><div style={{fontSize:'11.5px',fontWeight:'600',color:'#c8c8c8'}}>Bids</div><div style={{height:'3px',width:'70%',background:'#00d4ff55',borderRadius:'2px',marginTop:'6px'}}></div></div><div style={{background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.07)',borderRadius:'9px',padding:'10px'}}><div style={{width:'22px',height:'22px',borderRadius:'6px',background:'#b56bff22',border:'1px solid #b56bff66',marginBottom:'8px'}}></div><div style={{fontSize:'11.5px',fontWeight:'600',color:'#c8c8c8'}}>Jobs</div><div style={{height:'3px',width:'70%',background:'#b56bff55',borderRadius:'2px',marginTop:'6px'}}></div></div><div style={{background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.07)',borderRadius:'9px',padding:'10px'}}><div style={{width:'22px',height:'22px',borderRadius:'6px',background:'#80ff8022',border:'1px solid #80ff8066',marginBottom:'8px'}}></div><div style={{fontSize:'11.5px',fontWeight:'600',color:'#c8c8c8'}}>Billing</div><div style={{height:'3px',width:'70%',background:'#80ff8055',borderRadius:'2px',marginTop:'6px'}}></div></div><div style={{background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.07)',borderRadius:'9px',padding:'10px'}}><div style={{width:'22px',height:'22px',borderRadius:'6px',background:'#b56bff22',border:'1px solid #b56bff66',marginBottom:'8px'}}></div><div style={{fontSize:'11.5px',fontWeight:'600',color:'#c8c8c8'}}>Crews</div><div style={{height:'3px',width:'70%',background:'#b56bff55',borderRadius:'2px',marginTop:'6px'}}></div></div><div style={{background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.07)',borderRadius:'9px',padding:'10px'}}><div style={{width:'22px',height:'22px',borderRadius:'6px',background:'#00d4ff22',border:'1px solid #00d4ff66',marginBottom:'8px'}}></div><div style={{fontSize:'11.5px',fontWeight:'600',color:'#c8c8c8'}}>Cash</div><div style={{height:'3px',width:'70%',background:'#00d4ff55',borderRadius:'2px',marginTop:'6px'}}></div></div><div style={{background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.07)',borderRadius:'9px',padding:'10px'}}><div style={{width:'22px',height:'22px',borderRadius:'6px',background:'#7f889622',border:'1px solid #7f889666',marginBottom:'8px'}}></div><div style={{fontSize:'11.5px',fontWeight:'600',color:'#c8c8c8'}}>Docs</div><div style={{height:'3px',width:'70%',background:'#7f889655',borderRadius:'2px',marginTop:'6px'}}></div></div>
          </div>
        </div>
        <p style={{fontSize:'14.5px',color:'#c8c8c8',lineHeight:'1.65',margin:'0',textWrap:'pretty'}}>Stop running your company on spreadsheets, texts, and sticky notes. We put in the system that ties it all together — estimates and bids, submittals and RFIs, change orders, schedules, crews, billing, and cash flow, all in one place. So everyone’s working off the same numbers, from field to office.</p>
        <div style={{display:'flex',flexDirection:'column'}}><button data-expand-toggle="true" style={{display:'inline-flex',alignItems:'center',gap:'8px',marginTop:'26px',background:'none',border:'none',cursor:'pointer',fontFamily:'\'Inter\',sans-serif',fontSize:'13px',fontWeight:'600',color:'#8000ff',padding:'0'}}><span style={{fontSize:'16px',lineHeight:'1'}}>⊕</span> What is this, exactly?</button>
      <div data-expand-panel="true" hidden style={{marginTop:'16px',maxWidth:'600px',borderLeft:'2px solid #8000ff',padding:'6px 0 6px 20px',animation:'panelIn .42s ease'}}><p style={{fontSize:'14.5px',color:'#c8c8c8',lineHeight:'1.65',margin:'0',textWrap:'pretty'}}>A full construction operating system (ERP such as BuilderTrend, Procore, or Acumatica). We recommend the best fit for your growth stage and budget, set it up, connect it, and teach your team. We build the whole thing around how you already work. <em style={{fontStyle:'italic',color:'#00d4ff'}}>This is a custom add-on, not part of a monthly program. The full build-out is scoped to your needs exactly.</em></p></div></div>
      </div>
    </div>

    <p style={{fontSize:'clamp(17px,1.4vw,21px)',fontWeight:'600',color:'#fafafa',lineHeight:'1.5',margin:'clamp(40px,4vw,56px) 0 0',maxWidth:'760px',textWrap:'pretty'}}>The leads come in. The systems catch them. And you get to take lunch without being interrupted.</p>
    <div style={{marginTop:'34px'}}><a href="https://cal.com/catalystdigitalsolutions/20min" target="_blank" rel="noopener" className="cta-full" style={{display:'inline-flex',alignItems:'center',justifyContent:'center',gap:'10px',minHeight:'52px',fontFamily:'\'Inter\',sans-serif',fontSize:'17px',fontWeight:'700',color:'#04222b',background:'linear-gradient(135deg,#00d4ff,#12a8cf)',border:'none',padding:'18px 34px',borderRadius:'11px',boxShadow:'0 10px 34px rgba(0,212,255,.42)',cursor:'pointer',textDecoration:'none'}}>Put these to work for me <span style={{fontSize:'18px'}}>→</span></a></div>
  </div>
</section>



<section data-screen-label="Programs" style={{position:'relative',background:'#080b0f',fontFamily:'\'Inter\',sans-serif',color:'#c8c8c8',overflow:'hidden',padding:'clamp(80px,10vw,150px) clamp(20px,5vw,64px)'}}>
  <div style={{position:'absolute',top:'6%',left:'50%',transform:'translateX(-50%)',width:'760px',height:'520px',maxWidth:'100vw',background:'radial-gradient(circle at center,rgba(128,0,255,.12),transparent 66%)',filter:'blur(30px)',pointerEvents:'none'}}></div>
  <div style={{position:'relative',zIndex:'1',maxWidth:'1180px',margin:'0 auto'}}>
    <div style={{textAlign:'center',maxWidth:'760px',margin:'0 auto'}}>
      <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'13px',fontWeight:'500',letterSpacing:'3px',textTransform:'uppercase',color:'#00d4ff',marginBottom:'16px'}}>How we work together</div>
      <h2 style={{fontFamily:'\'Bebas Neue\',sans-serif',fontWeight:'400',textTransform:'uppercase',fontSize:'clamp(42px,5vw,82px)',lineHeight:'.9',letterSpacing:'1px',color:'#fafafa',margin:'0',textWrap:'balance'}}>Three programs to streamline and scale. Pick the one that fits.</h2>
      <p style={{fontSize:'clamp(16px,1.2vw,19px)',color:'#c8c8c8',lineHeight:'1.6',margin:'20px auto 0',maxWidth:'640px',textWrap:'pretty'}}>Three separate monthly options, depending on how fast you want to scale (and your budget). Each improves upon the previous program.</p>
    </div>
    <div style={{display:'flex',flexWrap:'wrap',alignItems:'stretch',gap:'clamp(16px,2vw,24px)',marginTop:'clamp(48px,6vw,72px)'}}>
      <a href="/pricing#tiers" style={{flex:'1 1 300px',minWidth:'270px',display:'flex',flexDirection:'column',textDecoration:'none',background:'linear-gradient(180deg,#0c1016,#090c11)',border:'1px solid rgba(255,255,255,.1)',borderRadius:'20px',padding:'clamp(26px,2.8vw,38px)',boxShadow:'0 24px 60px rgba(0,0,0,.4)',transition:'transform .3s ease,border-color .3s ease,box-shadow .3s ease'}}>
        <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'11px',letterSpacing:'2px',color:'#7f8896',marginBottom:'14px'}}>STAGE 1</div>
        <div style={{fontFamily:'\'Bebas Neue\',sans-serif',fontSize:'clamp(28px,2.6vw,38px)',letterSpacing:'1.5px',textTransform:'uppercase',color:'#fafafa',lineHeight:'1'}}>Foundation</div>
        <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'13px',letterSpacing:'1px',color:'#00d4ff',marginTop:'10px'}}>$1,497/mo</div>
        <p style={{fontSize:'15px',color:'#c8c8c8',lineHeight:'1.65',margin:'18px 0 0',textWrap:'pretty'}}>For the shop that needs to look legit and get found.</p>
      </a>
      <a href="/pricing#tiers" style={{flex:'1 1 300px',minWidth:'270px',display:'flex',flexDirection:'column',textDecoration:'none',position:'relative',background:'linear-gradient(135deg,rgba(128,0,255,.16),rgba(12,16,22,.92) 60%),linear-gradient(180deg,#0c1016,#090c11)',border:'1px solid rgba(128,0,255,.5)',borderRadius:'20px',padding:'clamp(26px,2.8vw,38px)',boxShadow:'0 30px 80px rgba(0,0,0,.5),0 0 50px rgba(128,0,255,.16)',transition:'transform .3s ease,border-color .3s ease,box-shadow .3s ease'}}>
        <div style={{position:'absolute',top:'-13px',left:'50%',transform:'translateX(-50%)',fontFamily:'\'JetBrains Mono\',monospace',fontSize:'10.5px',letterSpacing:'2px',textTransform:'uppercase',color:'#fff',background:'linear-gradient(135deg,#8000ff,#5600ab)',borderRadius:'100px',padding:'6px 16px',whiteSpace:'nowrap',boxShadow:'0 8px 24px rgba(128,0,255,.4)'}}>★ Most builders start here</div>
        <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'11px',letterSpacing:'2px',color:'#b56bff',marginBottom:'14px'}}>STAGE 2</div>
        <div style={{fontFamily:'\'Bebas Neue\',sans-serif',fontSize:'clamp(28px,2.6vw,38px)',letterSpacing:'1.5px',textTransform:'uppercase',color:'#fafafa',lineHeight:'1'}}>Framework</div>
        <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'13px',letterSpacing:'1px',color:'#00d4ff',marginTop:'10px'}}>$2,997/mo</div>
        <p style={{fontSize:'15px',color:'#c8c8c8',lineHeight:'1.65',margin:'18px 0 0',textWrap:'pretty'}}>For the shop ready to fill its own pipeline instead of waiting on referrals.</p>
      </a>
      <a href="/pricing#tiers" style={{flex:'1 1 300px',minWidth:'270px',display:'flex',flexDirection:'column',textDecoration:'none',background:'linear-gradient(180deg,#0c1016,#090c11)',border:'1px solid rgba(255,255,255,.1)',borderRadius:'20px',padding:'clamp(26px,2.8vw,38px)',boxShadow:'0 24px 60px rgba(0,0,0,.4)',transition:'transform .3s ease,border-color .3s ease,box-shadow .3s ease'}}>
        <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'11px',letterSpacing:'2px',color:'#7f8896',marginBottom:'14px'}}>STAGE 3</div>
        <div style={{fontFamily:'\'Bebas Neue\',sans-serif',fontSize:'clamp(28px,2.6vw,38px)',letterSpacing:'1.5px',textTransform:'uppercase',color:'#fafafa',lineHeight:'1'}}>Landmark</div>
        <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'13px',letterSpacing:'1px',color:'#00d4ff',marginTop:'10px'}}>$7,997/mo</div>
        <p style={{fontSize:'15px',color:'#c8c8c8',lineHeight:'1.65',margin:'18px 0 0',textWrap:'pretty'}}>For the shop that wants to own its market and run as hands-off as possible.</p>
      </a>
    </div>
    <div style={{display:'flex',flexWrap:'wrap',alignItems:'center',justifyContent:'space-between',gap:'18px',marginTop:'clamp(28px,3.5vw,40px)'}}>
      <p style={{fontSize:'clamp(15.5px,1.2vw,18px)',fontWeight:'600',color:'#fafafa',margin:'0',textWrap:'pretty'}}>Not sure which fits? Give us a call at <a href="tel:+16618884837" style={{color:'#00d4ff',textDecoration:'none'}}>(661) 888-4837</a>.</p>
      <div style={{display:'flex',flexWrap:'wrap',alignItems:'center',gap:'12px'}}>
        <a href="/pricing#tiers" style={{display:'inline-flex',alignItems:'center',gap:'10px',minHeight:'48px',fontFamily:'\'Inter\',sans-serif',fontSize:'16px',fontWeight:'600',color:'#fafafa',background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.18)',padding:'14px 28px',borderRadius:'11px',cursor:'pointer',textDecoration:'none'}}>See all programs and features <span style={{fontSize:'18px'}}>→</span></a>
        <a href="https://cal.com/catalystdigitalsolutions/20min" target="_blank" rel="noopener" className="cta-full" style={{display:'inline-flex',alignItems:'center',gap:'10px',minHeight:'48px',fontFamily:'\'Inter\',sans-serif',fontSize:'16px',fontWeight:'700',color:'#fff',background:'linear-gradient(135deg,#8000ff,#5600ab)',border:'none',padding:'14px 28px',borderRadius:'11px',boxShadow:'0 8px 28px rgba(128,0,255,.35)',cursor:'pointer',textDecoration:'none'}}>Book a short meeting <span style={{fontSize:'18px'}}>→</span></a>
      </div>
    </div>
  </div>
</section>


<section data-screen-label="Why now" style={{position:'relative',background:'#080b0f',fontFamily:'\'Inter\',sans-serif',color:'#c8c8c8',overflow:'hidden',minHeight:'clamp(440px,56vw,620px)',display:'flex',alignItems:'center'}}>
  <div style={{position:'absolute',inset:'0',zIndex:'0',background:'#0a0d12'}}>
    <img src="/assets/why-now-highrise.jpg" alt="High-rise construction at golden hour" style={{position:'absolute',inset:'0',width:'100%',height:'100%',objectFit:'cover',objectPosition:'center'}} />
  </div>
  <div style={{position:'absolute',inset:'0',zIndex:'1',background:'linear-gradient(90deg,rgba(8,11,15,.95) 0%,rgba(8,11,15,.82) 34%,rgba(8,11,15,.4) 62%,rgba(8,11,15,.05) 100%)',pointerEvents:'none'}}></div>
  <div style={{position:'relative',zIndex:'2',maxWidth:'1180px',margin:'0 auto',width:'100%',padding:'clamp(60px,8vw,110px) clamp(20px,5vw,64px)'}}>
    <div style={{maxWidth:'600px'}}>
      <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'13px',fontWeight:'500',letterSpacing:'3px',textTransform:'uppercase',color:'#00d4ff',marginBottom:'18px'}}>Why now</div>
      <h2 style={{fontFamily:'\'Bebas Neue\',sans-serif',fontWeight:'400',textTransform:'uppercase',fontSize:'clamp(40px,5vw,88px)',lineHeight:'.9',letterSpacing:'1px',color:'#fafafa',margin:'0',textShadow:'0 4px 30px rgba(0,0,0,.5)',textWrap:'balance'}}>You adapted to the internet. Now get ahead of AI.</h2>
      <p style={{fontSize:'clamp(17px,1.35vw,21px)',fontWeight:'600',color:'#fafafa',lineHeight:'1.5',margin:'24px 0 0',textWrap:'pretty'}}>The contractors who move first will own the next ten years. The ones who wait will spend them catching up.</p>
      <p style={{fontSize:'clamp(15.5px,1.1vw,17px)',color:'#dfe4ea',lineHeight:'1.7',margin:'16px 0 0',textWrap:'pretty'}}>You didn’t skip having a website, and it paid off. AI is the next evolution. The tools are here, they’re affordable, and most of your competitors are still ignoring them. But that window won’t stay open long.</p>
      <div style={{marginTop:'34px'}}><a href="https://cal.com/catalystdigitalsolutions/20min" target="_blank" rel="noopener" className="cta-full" style={{display:'inline-flex',alignItems:'center',justifyContent:'center',gap:'10px',minHeight:'52px',fontFamily:'\'Inter\',sans-serif',fontSize:'17px',fontWeight:'700',color:'#fff',background:'linear-gradient(135deg,#8000ff,#5600ab)',border:'none',padding:'18px 34px',borderRadius:'11px',boxShadow:'0 10px 34px rgba(128,0,255,.42)',cursor:'pointer',textDecoration:'none'}}>Get ahead of it <span style={{fontSize:'18px'}}>→</span></a></div>
    </div>
  </div>
</section>


<section data-screen-label="FAQ" style={{position:'relative',background:'#0a0e13',fontFamily:'\'Inter\',sans-serif',color:'#c8c8c8',overflow:'hidden',padding:'clamp(80px,10vw,150px) clamp(20px,5vw,64px)',borderTop:'1px solid rgba(255,255,255,.06)'}}>
  <div style={{maxWidth:'860px',margin:'0 auto'}}>
    <div style={{textAlign:'center',maxWidth:'700px',margin:'0 auto clamp(40px,5vw,60px)'}}>
      <div style={{fontFamily:'\'JetBrains Mono\',monospace',fontSize:'13px',fontWeight:'500',letterSpacing:'3px',textTransform:'uppercase',color:'#00d4ff',marginBottom:'16px'}}>Straight answers</div>
      <h2 style={{fontFamily:'\'Bebas Neue\',sans-serif',fontWeight:'400',textTransform:'uppercase',fontSize:'clamp(42px,5vw,82px)',lineHeight:'.9',letterSpacing:'1px',color:'#fafafa',margin:'0'}}>Questions builders ask us</h2>
      <p style={{fontSize:'clamp(16px,1.2vw,19px)',color:'#c8c8c8',lineHeight:'1.6',margin:'18px auto 0'}}>The stuff you’re already thinking. Here’s where we stand.</p>
    </div>
    <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
      <details open style={{background:'#0c1016',border:'1px solid rgba(255,255,255,.09)',borderRadius:'14px',padding:'0',overflow:'hidden'}}>
        <summary style={{listStyle:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'16px',padding:'20px 24px',fontSize:'clamp(15.5px,1.2vw,18px)',fontWeight:'600',color:'#fafafa'}}>“We get all our work through referrals.”<span style={{flex:'none',color:'#8000ff',fontSize:'20px',lineHeight:'1'}}>+</span></summary>
        <div style={{padding:'0 24px 22px'}}><p style={{fontSize:'15px',color:'#c8c8c8',lineHeight:'1.72',margin:'0',textWrap:'pretty'}}>Word of mouth is a blessing, but it’s not a growth engine. You can’t schedule word-of-mouth. You can’t turn it up during the slow season. And it never reaches the millions of people outside of your network.<br /><br />We build an inbound lead engine that <em style={{fontStyle:'italic'}}>you control</em>, so the good jobs come regardless of whether somebody remembers to mention you at dinner. Referrals got you here. They can’t get you there. We build predictability.</p></div>
      </details><details  style={{background:'#0c1016',border:'1px solid rgba(255,255,255,.09)',borderRadius:'14px',padding:'0',overflow:'hidden'}}>
        <summary style={{listStyle:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'16px',padding:'20px 24px',fontSize:'clamp(15.5px,1.2vw,18px)',fontWeight:'600',color:'#fafafa'}}>“I’m already too busy.”<span style={{flex:'none',color:'#8000ff',fontSize:'20px',lineHeight:'1'}}>+</span></summary>
        <div style={{padding:'0 24px 22px'}}><p style={{fontSize:'15px',color:'#c8c8c8',lineHeight:'1.72',margin:'0',textWrap:'pretty'}}>Excellent! But “busy” isn’t the goal. Better is. Higher-ticket is. When you’re the obvious choice, you can stop taking every job just to pay your crew and start picking the ideal ones, at the ideal price. “Busy” is very often how companies stay stuck.</p></div>
      </details><details  style={{background:'#0c1016',border:'1px solid rgba(255,255,255,.09)',borderRadius:'14px',padding:'0',overflow:'hidden'}}>
        <summary style={{listStyle:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'16px',padding:'20px 24px',fontSize:'clamp(15.5px,1.2vw,18px)',fontWeight:'600',color:'#fafafa'}}>“I got burned by a marketing company before.”<span style={{flex:'none',color:'#8000ff',fontSize:'20px',lineHeight:'1'}}>+</span></summary>
        <div style={{padding:'0 24px 22px'}}><p style={{fontSize:'15px',color:'#c8c8c8',lineHeight:'1.72',margin:'0',textWrap:'pretty'}}>Most of our clients have. They sold you “marketing” — reports, clicks, buzzwords — and no jobs. We don’t sell “marketing.” We sell better jobs and bigger margins. That’s why our plans are structured the way they are, and why we’ll never remove features from any of them to “save you money.” Each part is necessary to the success of the client. And with Catalyst, there’s no long contract holding you if we somehow miss the mark.</p></div>
      </details><details  style={{background:'#0c1016',border:'1px solid rgba(255,255,255,.09)',borderRadius:'14px',padding:'0',overflow:'hidden'}}>
        <summary style={{listStyle:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'16px',padding:'20px 24px',fontSize:'clamp(15.5px,1.2vw,18px)',fontWeight:'600',color:'#fafafa'}}>“What’s it going to cost?”<span style={{flex:'none',color:'#8000ff',fontSize:'20px',lineHeight:'1'}}>+</span></summary>
        <div style={{padding:'0 24px 22px'}}><p style={{fontSize:'15px',color:'#c8c8c8',lineHeight:'1.72',margin:'0',textWrap:'pretty'}}>Programs start at $1,497/mo, with no long contracts. But the real question is, what’s one extra job a month worth to your business? For most shops, the ROI math makes it a no-brainer.</p></div>
      </details><details  style={{background:'#0c1016',border:'1px solid rgba(255,255,255,.09)',borderRadius:'14px',padding:'0',overflow:'hidden'}}>
        <summary style={{listStyle:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'16px',padding:'20px 24px',fontSize:'clamp(15.5px,1.2vw,18px)',fontWeight:'600',color:'#fafafa'}}>“Won’t the AI make my company sound fake?”<span style={{flex:'none',color:'#8000ff',fontSize:'20px',lineHeight:'1'}}>+</span></summary>
        <div style={{padding:'0 24px 22px'}}><p style={{fontSize:'15px',color:'#c8c8c8',lineHeight:'1.72',margin:'0',textWrap:'pretty'}}>No. Our AIs are trained on your business, your jobs, your policies, your way of talking. Customers will just remember somebody picked up, knew their stuff, and booked them in. The alternatives are call trees—“press 1 for English”—and voicemail. Those lose jobs.</p></div>
      </details><details  style={{background:'#0c1016',border:'1px solid rgba(255,255,255,.09)',borderRadius:'14px',padding:'0',overflow:'hidden'}}>
        <summary style={{listStyle:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'16px',padding:'20px 24px',fontSize:'clamp(15.5px,1.2vw,18px)',fontWeight:'600',color:'#fafafa'}}>“I’m not a tech guy.”<span style={{flex:'none',color:'#8000ff',fontSize:'20px',lineHeight:'1'}}>+</span></summary>
        <div style={{padding:'0 24px 22px'}}><p style={{fontSize:'15px',color:'#c8c8c8',lineHeight:'1.72',margin:'0',textWrap:'pretty'}}>You don’t have to be. You didn’t build the engine in your truck. You bought it from a company that makes engines. That’s what Catalyst does. We build the engine. We make sure it stays running. You just enjoy driving it.</p></div>
      </details><details  style={{background:'#0c1016',border:'1px solid rgba(255,255,255,.09)',borderRadius:'14px',padding:'0',overflow:'hidden'}}>
        <summary style={{listStyle:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'16px',padding:'20px 24px',fontSize:'clamp(15.5px,1.2vw,18px)',fontWeight:'600',color:'#fafafa'}}>“How fast will I see something?”<span style={{flex:'none',color:'#8000ff',fontSize:'20px',lineHeight:'1'}}>+</span></summary>
        <div style={{padding:'0 24px 22px'}}><p style={{fontSize:'15px',color:'#c8c8c8',lineHeight:'1.72',margin:'0',textWrap:'pretty'}}>Your site and presence go live in weeks, not months. Leads build as the search and content compound. We aim to show real movement inside 90 days, and there’s nothing locking you in if we don’t.</p></div>
      </details>
    </div>
  </div>
</section>


<section data-screen-label="Final CTA" style={{position:'relative',background:'#080b0f',fontFamily:'\'Inter\',sans-serif',color:'#c8c8c8',overflow:'hidden',textAlign:'center',padding:'clamp(90px,12vw,170px) clamp(20px,5vw,64px)'}}>
  <div style={{position:'absolute',top:'44%',left:'50%',transform:'translate(-50%,-50%)',width:'760px',height:'760px',maxWidth:'130%',background:'radial-gradient(circle at center,rgba(128,0,255,.32),transparent 62%)',filter:'blur(30px)',animation:'glowPulse 9s ease-in-out infinite',pointerEvents:'none'}}></div>
  <div style={{position:'relative',zIndex:'1',maxWidth:'720px',margin:'0 auto',display:'flex',flexDirection:'column',alignItems:'center'}}>
    <h2 style={{fontFamily:'\'Bebas Neue\',sans-serif',fontWeight:'400',textTransform:'uppercase',fontSize:'clamp(48px,6.4vw,108px)',lineHeight:'.9',letterSpacing:'1px',color:'#fafafa',margin:'0',textWrap:'balance'}}>Let’s take the weight off.</h2>
    <p style={{fontSize:'clamp(17px,1.4vw,21px)',fontWeight:'600',color:'#fafafa',lineHeight:'1.5',margin:'26px 0 0',maxWidth:'600px',textWrap:'pretty'}}>One 20-minute call. We look at your company today and show you what it could be in 90 days. You decide if it’s what you want. No pitch, no pressure.</p>
    <p style={{fontSize:'clamp(15px,1.1vw,17px)',color:'#c8c8c8',lineHeight:'1.7',margin:'16px 0 0',maxWidth:'560px',textWrap:'pretty'}}>Worst case? You walk away with a clear read on your online presence and a couple of things you can fix yourself.</p>
    <div style={{marginTop:'40px'}}><a href="https://cal.com/catalystdigitalsolutions/20min" target="_blank" rel="noopener" className="cta-full" style={{display:'inline-flex',alignItems:'center',justifyContent:'center',gap:'12px',minHeight:'60px',fontFamily:'\'Inter\',sans-serif',fontSize:'clamp(18px,1.6vw,21px)',fontWeight:'700',color:'#fff',background:'linear-gradient(135deg,#8000ff,#5600ab)',border:'none',padding:'22px 44px',borderRadius:'13px',cursor:'pointer',textDecoration:'none',animation:'ctaPulse 3.4s ease-in-out infinite'}}>Book a 20-Minute Call <span style={{fontSize:'22px'}}>→</span></a></div>
    <p style={{fontSize:'13.5px',color:'#7f8896',lineHeight:'1.7',margin:'22px 0 0',maxWidth:'560px',textWrap:'pretty'}}>No long contracts · Construction-only · You talk to the person who’ll actually build it.</p>
  </div>
</section>



    </Expandable>
  );
}
