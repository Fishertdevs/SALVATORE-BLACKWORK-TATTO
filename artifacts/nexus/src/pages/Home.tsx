import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "wouter";

const Ticker = () => {
  return (
    <div className="w-full overflow-hidden bg-primary/10 border-y border-primary/20 py-2 font-mono text-xs text-primary/80 uppercase tracking-widest relative">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />
      <div className="data-ticker flex gap-8 whitespace-nowrap px-4">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="flex items-center gap-4">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span>NEXUS ORBITAL // STATUS: NOMINAL</span>
            <span>UPLINK: 99.98%</span>
            <span>SECURE CHANNEL ACTIVE</span>
            <span>NEURAL MESH: SYNCHRONIZED</span>
          </span>
        ))}
      </div>
    </div>
  );
};

const GlitchText = ({ text, className }: { text: string; className?: string }) => {
  return (
    <span className={`glitch ${className}`} data-text={text}>
      {text}
    </span>
  );
};

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary">
      <div className="noise-overlay" />
      <div className="scanline" />

      {/* Grid background effect tied to mouse */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.15] transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle 800px at ${mousePos.x}px ${mousePos.y}px, hsl(var(--primary) / 0.15), transparent 80%)`,
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-primary/10 bg-background/80 backdrop-blur-md font-mono text-xs uppercase tracking-widest">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary" />
            <span className="font-bold text-primary tracking-[0.2em] text-sm">NEXUS</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-muted-foreground">
            <a href="#systems" className="hover:text-primary transition-colors">Systems</a>
            <a href="#mesh" className="hover:text-primary transition-colors">Neural Mesh</a>
            <a href="#orbital" className="hover:text-primary transition-colors">Orbital</a>
            <a href="#specs" className="hover:text-primary transition-colors">Specs</a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-primary/60 hidden sm:inline-block">AUTH_REQ</span>
            <button className="border border-primary/30 bg-primary/5 hover:bg-primary/20 text-primary px-4 py-2 transition-all duration-300">
              [ INITIATE ]
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-16 relative z-10">
        <Ticker />

        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex flex-col justify-center items-start px-6 md:px-12 lg:px-24 overflow-hidden border-b border-primary/10">
          <div className="absolute inset-0 z-[-1]">
            <div className="absolute inset-0 bg-background/80 z-10 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
            <img src="/hero-orbital.png" alt="Orbital Compute Infrastructure" className="w-full h-full object-cover object-center opacity-40 grayscale-[0.5] contrast-125 mix-blend-screen" />
          </div>

          <div className="max-w-4xl relative z-20 mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-8 h-[1px] bg-primary" />
              <span className="font-mono text-primary uppercase text-sm tracking-widest">Global Intelligence Infrastructure</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] mb-8 font-sans"
            >
              <GlitchText text="SYSTEMS" className="block text-foreground/90" />
              <GlitchText text="FOR THE" className="block text-foreground/70" />
              <span className="block text-primary">POST-HUMAN</span>
              <span className="block text-foreground/50">ERA.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground font-mono max-w-2xl leading-relaxed mb-12 border-l border-primary/30 pl-6"
            >
              NEXUS constructs the underlying substrate for autonomous logic.
              We build the orbital compute, neural mesh networks, and deep-system
              infrastructure that powers the world's most advanced synthetic entities.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 font-mono text-sm"
            >
              <button className="bg-primary text-background font-bold px-8 py-4 tracking-widest hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 group">
                <span className="w-2 h-2 bg-background rounded-full group-hover:animate-ping" />
                ACCESS_TERMINAL
              </button>
              <button className="border border-primary/30 px-8 py-4 tracking-widest hover:bg-primary/10 transition-colors text-primary/80">
                VIEW_SCHEMATICS
              </button>
            </motion.div>
          </div>
        </section>

        {/* Neural Mesh Section */}
        <section id="mesh" className="py-32 px-6 md:px-12 lg:px-24 border-b border-primary/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="font-mono text-primary text-xs tracking-widest bg-primary/10 px-3 py-1 border border-primary/20">MODULE_01</span>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight">
                GLOBAL NEURAL <br/>
                <span className="text-primary italic">MESH_NETWORK</span>
              </h2>
              <div className="space-y-6 font-mono text-sm text-muted-foreground border-l border-primary/20 pl-6">
                <p>
                  A decentralized, high-bandwidth communication substrate designed exclusively for machine-to-machine coordination.
                </p>
                <p>
                  Operating at sub-millisecond latencies, the mesh bypasses traditional internet protocols, utilizing quantum-entangled nodes for instantaneous global state synchronization.
                </p>
                <ul className="space-y-4 mt-8 pt-4">
                  <li className="flex items-start gap-4">
                    <span className="text-primary mt-1">{">>"}</span>
                    <div>
                      <span className="text-foreground block mb-1">ZERO-TRUST ARCHITECTURE</span>
                      <span>Cryptographically verifiable state transitions at the hardware level.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-primary mt-1">{">>"}</span>
                    <div>
                      <span className="text-foreground block mb-1">ADAPTIVE TOPOLOGY</span>
                      <span>Self-healing node connections that route around physical infrastructure damage.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="order-1 lg:order-2 relative aspect-square lg:aspect-auto lg:h-[600px] border border-primary/20 p-2 bg-background overflow-hidden group"
            >
              <div className="absolute inset-0 bg-primary/10 z-10 mix-blend-overlay transition-opacity group-hover:opacity-0" />
              <img src="/neural-mesh.png" alt="Neural Mesh Network" className="w-full h-full object-cover grayscale contrast-125 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
              
              <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-end font-mono text-[10px] text-primary/80 uppercase">
                <div className="bg-background/80 backdrop-blur-sm px-3 py-2 border border-primary/20">
                  <span className="block text-foreground mb-1">NODE_DENSITY</span>
                  <span>4.2M / km²</span>
                </div>
                <div className="bg-background/80 backdrop-blur-sm px-3 py-2 border border-primary/20 text-right">
                  <span className="block text-foreground mb-1">LATENCY_AVG</span>
                  <span>0.04ms</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Core Infrastructure / Stats */}
        <section id="systems" className="py-32 px-6 md:px-12 lg:px-24 border-b border-primary/10 bg-card">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20">
              <span className="font-mono text-primary text-xs tracking-widest block mb-4">SYSTEM_CAPABILITIES</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">INFRASTRUCTURE <span className="text-primary">AT SCALE</span></h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: "ORBITAL NODES", value: "8,402", unit: "ACTIVE SATELLITES", desc: "Low Earth Orbit constellation providing global unbroken coverage." },
                { label: "COMPUTE CAPACITY", value: "94.2", unit: "EXAFLOPS", desc: "Distributed processing power accessible across the entire mesh." },
                { label: "UPTIME", value: "99.9999%", unit: "GUARANTEED", desc: "Redundant power and routing systems ensuring continuous operation." }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="border border-primary/10 bg-background p-8 relative overflow-hidden group hover:border-primary/40 transition-colors"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  <div className="font-mono text-xs text-muted-foreground tracking-widest mb-8 pb-4 border-b border-primary/10 flex justify-between">
                    <span>{stat.label}</span>
                    <span className="text-primary">[{idx + 1}]</span>
                  </div>
                  <div className="mb-4">
                    <span className="text-5xl font-bold block mb-2">{stat.value}</span>
                    <span className="font-mono text-primary/80 text-xs tracking-widest">{stat.unit}</span>
                  </div>
                  <p className="font-mono text-sm text-muted-foreground mt-8">
                    {stat.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Machine Core Image Section */}
        <section className="py-24 relative overflow-hidden">
          <Ticker />
          <div className="w-full h-[60vh] mt-8 relative">
             <div className="absolute inset-0 bg-background/50 z-10" />
             <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-20" />
             <img src="/machine-core.png" alt="Machine Core" className="w-full h-full object-cover object-center opacity-80" />
             
             <div className="absolute inset-0 z-30 flex items-center justify-center">
               <div className="text-center font-mono">
                 <div className="w-16 h-16 border border-primary/50 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                   <div className="absolute inset-0 rounded-full border border-primary animate-ping opacity-20" />
                   <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                 </div>
                 <span className="text-xs text-primary tracking-[0.3em] block mb-2">RESTRICTED_AREA</span>
                 <span className="text-sm text-foreground tracking-widest uppercase">AUTONOMOUS CORE OBSERVATION</span>
               </div>
             </div>
          </div>
        </section>
        
        {/* Terminal Section */}
        <section id="specs" className="py-32 px-6 md:px-12 lg:px-24 border-b border-primary/10">
          <div className="max-w-4xl mx-auto border border-primary/30 bg-background/50 backdrop-blur font-mono text-sm shadow-2xl shadow-primary/5">
            <div className="flex items-center justify-between border-b border-primary/30 px-4 py-2 bg-primary/5">
              <div className="flex items-center gap-2">
                <span className="text-primary">nexus@sys:~$</span>
                <span className="animate-pulse w-2 h-4 bg-primary inline-block" />
              </div>
              <div className="text-muted-foreground text-xs">TERMINAL_v4.2.1</div>
            </div>
            <div className="p-6 text-muted-foreground space-y-4">
               <p><span className="text-primary">nexus@sys:~$</span> ./run_diagnostics.sh</p>
               <p className="pl-4">Initiating systemic scan...</p>
               <p className="pl-4 text-primary/80">[OK] Quantum routing algorithms valid</p>
               <p className="pl-4 text-primary/80">[OK] Cold storage integrity verified</p>
               <p className="pl-4 text-primary/80">[OK] Autonomous sub-routines active</p>
               <p className="pl-4 text-red-500">[WARN] Anomaly detected in sector 7G. Re-routing power...</p>
               <p className="pl-4 text-primary/80">[OK] Power re-routed successfully.</p>
               <p><span className="text-primary">nexus@sys:~$</span> cat /etc/motd</p>
               <div className="pl-4 text-foreground/80 pb-4">
                 <pre className="text-[10px] leading-tight text-primary/60 hidden sm:block">
{`
    _   _ _______   ___    _  _____ 
   | \\ | |  ___\ \ / / |  | |/ ____|
   |  \\| | |__  \\ V /| |  | | (___  
   | . \` |  __|  > < | |  | |\\___ \\ 
   | |\\  | |____/ . \\| |__| |____) |
   |_| \\_|_____/_/ \\_\\\\____/|_____/ 
`}
                 </pre>
                 <p className="mt-4">Welcome to the NEXUS Mainframe.</p>
                 <p>Unauthorized access is strictly prohibited and monitored.</p>
               </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t border-primary/20 bg-background py-12 px-6 md:px-12 lg:px-24 font-mono text-xs text-muted-foreground">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-primary" />
              <span className="font-bold text-primary tracking-widest">NEXUS_CORP</span>
            </div>
            <p className="max-w-xs">Building the substrate for the next epoch of intelligence.</p>
          </div>
          
          <div className="flex gap-12">
            <div className="flex flex-col gap-2">
              <span className="text-foreground tracking-widest mb-2">SYSTEMS</span>
              <a href="#" className="hover:text-primary transition-colors">Mesh Network</a>
              <a href="#" className="hover:text-primary transition-colors">Orbital Nodes</a>
              <a href="#" className="hover:text-primary transition-colors">Deep Compute</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-foreground tracking-widest mb-2">RESOURCES</span>
              <a href="#" className="hover:text-primary transition-colors">Documentation</a>
              <a href="#" className="hover:text-primary transition-colors">API Status</a>
              <a href="#" className="hover:text-primary transition-colors">Security</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-primary/10 flex justify-between items-center opacity-50">
          <span>&copy; {new Date().getFullYear()} NEXUS CORPORATION.</span>
          <span>SYS_ID: 9X4-AF2</span>
        </div>
      </footer>
    </div>
  );
}
