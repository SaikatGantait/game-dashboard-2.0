import React, { useState, useRef, useEffect } from "react";
import bgImage from "../assets/controller.jpg";

const LoginPage = ({ onLogin, isSignUp, setIsSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [activeInput, setActiveInput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hologramActive, setHologramActive] = useState(false);
  const formRef = useRef(null);
  const particlesRef = useRef([]);
  const audioRef = useRef(null);

  // Advanced particle animation with connections
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '0';
    canvas.style.opacity = '0.8';
    document.querySelector('.login-container').appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create intelligent particles with physics
    for (let i = 0; i < 200; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 1,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        color: `hsla(${Math.random() * 60 + 200}, 100%, 50%, ${Math.random() * 0.5 + 0.3})`,
        connections: []
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections first (behind particles)
      particlesRef.current.forEach((particle, index) => {
        particle.connections = [];
        for (let j = index + 1; j < particlesRef.current.length; j++) {
          const otherParticle = particlesRef.current[j];
          const distance = Math.sqrt(
            Math.pow(particle.x - otherParticle.x, 2) + 
            Math.pow(particle.y - otherParticle.y, 2)
          );
          
          if (distance < 150) {
            const opacity = 1 - distance / 150;
            ctx.strokeStyle = `hsla(200, 100%, 50%, ${opacity * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            particle.connections.push(j);
          }
        }
      });
      
      // Draw particles
      particlesRef.current.forEach(particle => {
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Advanced movement with acceleration
        particle.speedX += (Math.random() * 0.2 - 0.1);
        particle.speedY += (Math.random() * 0.2 - 0.1);
        
        // Limit speed
        const speed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
        if (speed > 2) {
          particle.speedX = (particle.speedX / speed) * 2;
          particle.speedY = (particle.speedY / speed) * 2;
        }
        
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges with damping
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -0.9;
          particle.x = particle.x < 0 ? 0 : canvas.width;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -0.9;
          particle.y = particle.y < 0 ? 0 : canvas.height;
        }
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.remove();
    };
  }, []);

  // Hologram sound effect
  useEffect(() => {
    audioRef.current = new Audio('/sounds/hologram-activate.mp3');
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password && (!isSignUp || username)) {
      setIsLoading(true);
      setHologramActive(true);
      
      // Play hologram sound
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      
      // Advanced transition effects
      formRef.current.style.transform = "scale(0.95) rotateX(5deg)";
      formRef.current.style.opacity = "0.8";
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      formRef.current.style.transform = "scale(0.9) rotateX(10deg)";
      formRef.current.style.opacity = "0";
      formRef.current.style.filter = "blur(5px)";
      
      setTimeout(() => {
        onLogin();
        setIsLoading(false);
        setHologramActive(false);
      }, 500);
    }
  };

  const handleInputFocus = (inputName) => {
    setActiveInput(inputName);
    
    // Play subtle sound effect
    const sound = new Audio('/sounds/interface-click.wav');
    sound.volume = 0.2;
    sound.play();
  };

  const handleInputBlur = () => {
    setActiveInput(null);
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setHologramActive(true);
    setTimeout(() => setHologramActive(false), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center login-container relative overflow-hidden">
      {/* Enhanced background with parallax layers */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${bgImage})`,
            filter: "brightness(0.2) contrast(1.3)",
            transform: "scale(1.1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70" />
      </div>
      
      {/* Hexagonal grid overlay with animation */}
      <div className="absolute inset-0 bg-hexagon-pattern opacity-10 animate-grid-flow" />

      {/* Main login card with holographic effect */}
      <div 
        ref={formRef}
        className={`relative z-10 bg-gray-900 bg-opacity-90 backdrop-blur-lg p-12 rounded-3xl shadow-2xl w-full max-w-lg border-2 border-teal-400 border-opacity-30 transition-all duration-500 transform hover:border-opacity-100 hover:shadow-teal-500/30 ${hologramActive ? 'hologram-active' : ''}`}
        style={{
          boxShadow: "0 0 60px rgba(20, 255, 236, 0.3)",
          transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        }}
      >
        {/* Holographic header with animated scan line */}
        <div className="relative mb-10 overflow-hidden">
          <h2 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-2 relative z-10">
            {isSignUp ? "CREATE PROFILE" : "SYSTEM LOGIN"}
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 animate-scanline" />
          </h2>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-70" />
          <div className="absolute -bottom-1 left-1/4 right-1/4 h-0.5 bg-teal-400 blur-sm" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {isSignUp && (
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-t-lg opacity-0 group-hover:opacity-50 blur transition duration-500" />
              <div className="relative">
                <input
                  type="text"
                  placeholder="USERNAME"
                  className="w-full px-6 py-4 bg-gray-800 bg-opacity-70 border-b-2 border-teal-400 rounded-t-lg text-white placeholder-gray-400 focus:outline-none focus:bg-gray-800 focus:border-teal-300 transition-all duration-300 tracking-wider"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => handleInputFocus('username')}
                  onBlur={handleInputBlur}
                  style={{
                    borderBottom: activeInput === 'username' ? 
                      '2px solid rgba(34, 211, 238, 0.8)' : 
                      '2px solid rgba(34, 211, 238, 0.3)',
                    boxShadow: activeInput === 'username' ? 
                      '0 10px 30px rgba(34, 211, 238, 0.25)' : 'none'
                  }}
                />
                <div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400 opacity-30"
                  style={{
                    transform: activeInput === 'username' ? 'scaleX(1)' : 'scaleX(0)',
                    transition: 'transform 0.3s ease'
                  }}
                />
              </div>
            </div>
          )}

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-t-lg opacity-0 group-hover:opacity-50 blur transition duration-500" />
            <div className="relative">
              <input
                type="email"
                placeholder="EMAIL"
                className="w-full px-6 py-4 bg-gray-800 bg-opacity-70 border-b-2 border-teal-400 rounded-t-lg text-white placeholder-gray-400 focus:outline-none focus:bg-gray-800 focus:border-teal-300 transition-all duration-300 tracking-wider"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => handleInputFocus('email')}
                onBlur={handleInputBlur}
                style={{
                  borderBottom: activeInput === 'email' ? 
                    '2px solid rgba(34, 211, 238, 0.8)' : 
                    '2px solid rgba(34, 211, 238, 0.3)',
                  boxShadow: activeInput === 'email' ? 
                    '0 10px 30px rgba(34, 211, 238, 0.25)' : 'none'
                }}
              />
              <div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400 opacity-30"
                style={{
                  transform: activeInput === 'email' ? 'scaleX(1)' : 'scaleX(0)',
                  transition: 'transform 0.3s ease'
                }}
              />
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-t-lg opacity-0 group-hover:opacity-50 blur transition duration-500" />
            <div className="relative">
              <input
                type="password"
                placeholder="PASSWORD"
                className="w-full px-6 py-4 bg-gray-800 bg-opacity-70 border-b-2 border-teal-400 rounded-t-lg text-white placeholder-gray-400 focus:outline-none focus:bg-gray-800 focus:border-teal-300 transition-all duration-300 tracking-wider"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => handleInputFocus('password')}
                onBlur={handleInputBlur}
                style={{
                  borderBottom: activeInput === 'password' ? 
                    '2px solid rgba(34, 211, 238, 0.8)' : 
                    '2px solid rgba(34, 211, 238, 0.3)',
                  boxShadow: activeInput === 'password' ? 
                    '0 10px 30px rgba(34, 211, 238, 0.25)' : 'none'
                }}
              />
              <div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400 opacity-30"
                style={{
                  transform: activeInput === 'password' ? 'scaleX(1)' : 'scaleX(0)',
                  transition: 'transform 0.3s ease'
                }}
              />
            </div>
          </div>

          {!isSignUp && (
            <div className="text-right">
              <button
                type="button"
                className="text-xs text-teal-300 hover:text-teal-100 uppercase tracking-wider transition-all duration-300 flex items-center ml-auto"
              >
                <span className="mr-2">FORGOT CREDENTIALS?</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {/* Advanced submit button with loading state */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 rounded-lg text-lg font-bold text-white uppercase tracking-wider relative overflow-hidden group transition-all duration-500 ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
            style={{
              background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.2) 0%, rgba(124, 58, 237, 0.2) 100%)',
              boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)'
            }}
          >
            <span className="relative z-10 flex items-center justify-center">
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  PROCESSING...
                </>
              ) : (
                <>
                  {isSignUp ? "ACTIVATE PROFILE" : "ACCESS SYSTEM"}
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </span>
            <span 
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-all duration-500"
              style={{
                maskImage: 'linear-gradient(135deg, #000 50%, transparent 100%)'
              }}
            />
            <span className="absolute inset-0 border-2 border-cyan-400 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
            {isLoading && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-cyan-400 animate-progress" />
            )}
          </button>
        </form>

        {/* Toggle between Login and Sign Up with animation */}
        <div className="text-center text-sm text-gray-400 mt-8 uppercase tracking-wider">
          {isSignUp ? (
            <>
              EXISTING OPERATOR?{" "}
              <button
                onClick={toggleAuthMode}
                className="text-cyan-300 hover:text-cyan-100 ml-2 transition-all duration-300 flex items-center justify-center mx-auto"
              >
                REQUEST ACCESS
                <svg className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </>
          ) : (
            <>
              NEW OPERATOR?{" "}
              <button
                onClick={toggleAuthMode}
                className="text-cyan-300 hover:text-cyan-100 ml-2 transition-all duration-300 flex items-center justify-center mx-auto"
              >
                INITIALIZE PROFILE
                <svg className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Enhanced footer with digital rain effect */}
        <div className="mt-10 pt-4 border-t border-gray-700 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-teal-400 to-transparent opacity-50" />
          <div className="absolute top-0 left-0 h-full w-1 bg-teal-400 animate-scan" style={{
            animation: 'scan 3s linear infinite',
            boxShadow: '0 0 15px 3px rgba(34, 211, 238, 0.8)'
          }} />
          <p className="text-xs text-gray-500 text-center tracking-widest relative z-10">
            <span className="text-cyan-400">CYBERSECURITY PROTOCOL v2.0</span> © 2025 SAIKAT SYSTEMS
          </p>
          <div className="digital-rain absolute inset-0 opacity-10" />
        </div>
      </div>

      {/* Floating tech elements with animation */}
      <div className="absolute top-10 right-10 w-16 h-16 rounded-full bg-cyan-400 opacity-10 blur-xl animate-float" />
      <div className="absolute bottom-20 left-20 w-24 h-24 rounded-full bg-purple-500 opacity-10 blur-xl animate-float-delay" />
      <div className="absolute top-1/3 left-1/4 w-8 h-8 rounded-full bg-teal-400 opacity-20 blur-md animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/3 w-12 h-12 rounded-full bg-indigo-500 opacity-15 blur-lg animate-float" />

      {/* Holographic projection effect */}
      {hologramActive && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="hologram-effect" />
        </div>
      )}

      {/* CSS for advanced animations */}
      <style jsx>{`
        @keyframes scan {
          0% { left: 0; opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes scanline {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float-delay {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(15px) translateX(-10px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        @keyframes progress {
          0% { width: 0; opacity: 1; }
          100% { width: 100%; opacity: 0; }
        }
        @keyframes grid-flow {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }
        .bg-hexagon-pattern {
          background-image: 
            radial-gradient(circle at center, rgba(34, 211, 238, 0.05) 0%, transparent 70%),
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2334d3ee' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          background-size: 100px 100px;
        }
        .animate-grid-flow {
          animation: grid-flow 20s linear infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float-delay 8s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-scanline {
          animation: scanline 2s linear infinite;
        }
        .animate-progress {
          animation: progress 1.5s ease-out infinite;
        }
        .hologram-effect {
          position: absolute;
          width: 120%;
          height: 120%;
          background: radial-gradient(circle at center, 
            rgba(34, 211, 238, 0.2) 0%, 
            transparent 70%);
          opacity: 0;
          animation: hologram-appear 1s forwards;
        }
        .hologram-active {
          position: relative;
        }
        .hologram-active::before {
          content: '';
          position: absolute;
          top: -5px;
          left: -5px;
          right: -5px;
          bottom: -5px;
          background: linear-gradient(45deg, 
            rgba(34, 211, 238, 0.3) 0%, 
            rgba(124, 58, 237, 0.3) 100%);
          z-index: -1;
          filter: blur(20px);
          opacity: 0;
          animation: hologram-glow 1s forwards;
        }
        @keyframes hologram-appear {
          0% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 0.8; }
          100% { opacity: 0; transform: scale(1.2); }
        }
        @keyframes hologram-glow {
          0% { opacity: 0; }
          50% { opacity: 0.7; }
          100% { opacity: 0; }
        }
        .digital-rain {
          background: linear-gradient(transparent 80%, rgba(34, 211, 238, 0.1) 100%);
          background-size: 2px 10px;
          animation: digitalRain 0.5s linear infinite;
        }
        @keyframes digitalRain {
          0% { background-position: 0 0; }
          100% { background-position: 0 10px; }
        }
        input::placeholder {
          letter-spacing: 2px;
          font-size: 0.9em;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;