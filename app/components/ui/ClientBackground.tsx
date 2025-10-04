'use client';

export function ClientBackground() {
  return (
    <>
      {/* CSS-only Neural Background */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="neural-bg absolute inset-0" />
        <div className="particle-field absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-60" />
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-80" />
          <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse opacity-70" />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-pink-400 rounded-full animate-pulse opacity-50" />
          <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-60" />
        </div>
      </div>
      
      {/* CSS-only Floating Orbs */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-float" />
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/2 w-28 h-28 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }} />
      </div>
    </>
  );
}
