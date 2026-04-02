import { useEffect, useState, useRef } from 'react';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollTop = containerRef.current.scrollTop;
        const scrollHeight = containerRef.current.scrollHeight - containerRef.current.clientHeight;
        const progress = scrollTop / scrollHeight;
        setScrollProgress(progress);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Calculate progress for each scene with entry/hold/exit phases
  const getSceneProgress = (start: number, end: number) => {
    const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
    if (clampedProgress < start) return 0;
    if (clampedProgress > end) return 1;
    return (clampedProgress - start) / (end - start);
  };

  // Helper for fade in/hold/fade out pattern
  const getFadeInHoldOut = (progress: number, fadeInEnd = 0.2, fadeOutStart = 0.8) => {
    if (progress < fadeInEnd) {
      return progress / fadeInEnd; // Fade in
    } else if (progress > fadeOutStart) {
      return 1 - ((progress - fadeOutStart) / (1 - fadeOutStart)); // Fade out
    }
    return 1; // Hold
  };

  const scene1Progress = getSceneProgress(0, 0.09);
  const scene2Progress = getSceneProgress(0.09, 0.18);
  const scene3Progress = getSceneProgress(0.18, 0.28);
  const scene4Progress = getSceneProgress(0.28, 0.38);
  const scene5Progress = getSceneProgress(0.38, 0.6);
  const scene6Progress = getSceneProgress(0.6, 0.72);
  const scene7Progress = getSceneProgress(0.72, 0.86);
  const scene8Progress = getSceneProgress(0.86, 1);

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-y-scroll overflow-x-hidden bg-black text-white"
      style={{ scrollBehavior: 'smooth' }}
    >
      <div style={{ height: '1200vh' }}>

        {/* SCENE 1 — HERO (FADE IN → HOLD → FADE OUT) */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center">
          <div
            style={{
              opacity: getFadeInHoldOut(scene1Progress, 0.3, 0.7),
              transform: `translateY(${(1 - getFadeInHoldOut(scene1Progress, 0.3, 0.7)) * 20}px)`,
            }}
          >
            <h1 className="text-5xl md:text-7xl max-w-4xl text-center px-8"
                style={{ fontFamily: 'Georgia, serif' }}>
              Wealth is not a portfolio.
            </h1>
          </div>
        </div>

        {/* SCENE 2 — FINANCIAL PLANS (FADE IN → HOLD → FADE OUT) */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center">
          <div
            style={{
              opacity: getFadeInHoldOut(scene2Progress, 0.3, 0.7),
              transform: `translateY(${(1 - getFadeInHoldOut(scene2Progress, 0.3, 0.7)) * 20}px)`,
            }}
          >
            <h1 className="text-4xl md:text-6xl max-w-5xl text-center px-8"
                style={{ fontFamily: 'Georgia, serif' }}>
              Most financial plans are portfolios with a withdrawal strategy.
            </h1>
          </div>
        </div>

        {/* SCENE 3 — EVF CONCEPT */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center">
          <div
            style={{
              opacity: getFadeInHoldOut(scene3Progress, 0.3, 0.7),
              transform: `translateY(${(1 - getFadeInHoldOut(scene3Progress, 0.3, 0.7)) * 20}px)`,
            }}
          >
            <h1 className="text-3xl md:text-5xl max-w-4xl text-center px-8"
                style={{ fontFamily: 'Georgia, serif' }}>
              We built a system instead.
            </h1>
          </div>
        </div>

        {/* SCENE 4 — TRADITIONAL ALLOCATION FAILURE (COMPRESSION) */}
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center">
          <div className="relative">
            <svg width="400" height="400" viewBox="0 0 400 400" className="mb-12"
                 style={{ opacity: getFadeInHoldOut(scene4Progress, 0.2, 0.8) }}>
              {/* Circles compressing inward toward center */}
              <circle
                cx="200"
                cy="200"
                r={Math.max(80 - scene4Progress * 50, 20)}
                fill="none"
                stroke="#1a5f3f"
                strokeWidth="2"
                opacity={Math.max(1 - scene4Progress * 0.5, 0.3)}
                style={{
                  transform: `translate(${-scene4Progress * 20}px, ${scene4Progress * 10}px)`,
                  transformOrigin: 'center',
                }}
              />
              <circle
                cx="200"
                cy="200"
                r={Math.max(120 - scene4Progress * 70, 30)}
                fill="none"
                stroke="#1a5f3f"
                strokeWidth="2"
                opacity={Math.max(0.7 - scene4Progress * 0.4, 0.3)}
                style={{
                  transform: `translate(${scene4Progress * 25}px, ${-scene4Progress * 15}px)`,
                  transformOrigin: 'center',
                }}
              />
              <circle
                cx="200"
                cy="200"
                r={Math.max(160 - scene4Progress * 90, 40)}
                fill="none"
                stroke="#1a5f3f"
                strokeWidth="2"
                opacity={Math.max(0.5 - scene4Progress * 0.3, 0.2)}
                style={{
                  transform: `translate(${-scene4Progress * 10}px, ${scene4Progress * 20}px)`,
                  transformOrigin: 'center',
                }}
              />
            </svg>

            <div className="text-3xl md:text-5xl max-w-3xl text-center px-8"
                 style={{ fontFamily: 'Georgia, serif' }}>
              <p
                style={{
                  opacity: getFadeInHoldOut(scene4Progress, 0.2, 0.7),
                  transform: `translateY(${(1 - getFadeInHoldOut(scene4Progress, 0.2, 0.7)) * 15}px)`,
                }}
              >
                Traditional portfolios converge under stress.
              </p>
            </div>
          </div>
        </div>

        {/* SCENE 5 — EVF BUILD (APPLE-STYLE SPLIT LAYOUT) */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center px-8">
          <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">

            {/* LEFT SIDE - CONTROL PANEL */}
            <div className="flex flex-col justify-center space-y-6">
              {/* Foundation */}
              <div
                className="transition-all duration-500"
                style={{
                  opacity: scene5Progress >= 0 && scene5Progress < 0.20 ? 1 : 0.4,
                  transform: scene5Progress >= 0 && scene5Progress < 0.20 ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                <h3 className="text-2xl mb-2" style={{ fontFamily: 'Georgia, serif' }}>Foundation</h3>
                <p className="text-gray-400 text-sm">Core stability and preservation</p>
              </div>

              {/* Income */}
              <div
                className="transition-all duration-500"
                style={{
                  opacity: scene5Progress >= 0.20 && scene5Progress < 0.40 ? 1 : 0.4,
                  transform: scene5Progress >= 0.20 && scene5Progress < 0.40 ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                <h3 className="text-2xl mb-2" style={{ fontFamily: 'Georgia, serif' }}>Income</h3>
                <p className="text-gray-400 text-sm">Sustainable cash flow generation</p>
              </div>

              {/* Growth */}
              <div
                className="transition-all duration-500"
                style={{
                  opacity: scene5Progress >= 0.40 && scene5Progress < 0.65 ? 1 : 0.4,
                  transform: scene5Progress >= 0.40 && scene5Progress < 0.65 ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                <h3 className="text-2xl mb-2" style={{ fontFamily: 'Georgia, serif' }}>Growth</h3>
                <p className="text-gray-400 text-sm">Long-term capital appreciation</p>
              </div>

              {/* Adaptive */}
              <div
                className="transition-all duration-500"
                style={{
                  opacity: scene5Progress >= 0.65 && scene5Progress < 0.85 ? 1 : 0.4,
                  transform: scene5Progress >= 0.65 && scene5Progress < 0.85 ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                <h3 className="text-2xl mb-2" style={{ fontFamily: 'Georgia, serif' }}>Adaptive</h3>
                <p className="text-gray-400 text-sm">Dynamic response to regimes</p>
              </div>

              {/* Full System Hold */}
              <div
                className="transition-all duration-500 pt-4 border-t border-gray-700"
                style={{
                  opacity: scene5Progress >= 0.85 ? 1 : 0,
                  transform: scene5Progress >= 0.85 ? 'scale(1)' : 'scale(0.95)',
                }}
              >
                <p className="text-gray-400 text-sm italic">The complete system</p>
              </div>
            </div>

            {/* RIGHT SIDE - PERSISTENT CUMULATIVE DIAGRAM */}
            <div className="flex items-center justify-center">
              <svg width="300" height="520" viewBox="0 0 300 520">
                <defs>
                  <linearGradient id="growthGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#1a5f3f" />
                    <stop offset="100%" stopColor="#2d7a4f" />
                  </linearGradient>
                  <filter id="layerShadow">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
                  </filter>
                  <filter id="bottomShadow">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.5" />
                  </filter>
                </defs>

                {/* Foundation - Wider, taller, darkest tone, bottom shadow */}
                <rect
                  x="40"
                  y={460 - Math.min(scene5Progress * 5, 1) * 120}
                  width="220"
                  height="120"
                  fill="#0d3a24"
                  stroke="#2d7a4f"
                  strokeWidth="1.5"
                  opacity={scene5Progress >= 0.20 ? 1 : scene5Progress * 5}
                  filter="url(#bottomShadow)"
                  rx="2"
                />
                <line
                  x1="40"
                  y1={460 - Math.min(scene5Progress * 5, 1) * 120 + 120}
                  x2="260"
                  y2={460 - Math.min(scene5Progress * 5, 1) * 120 + 120}
                  stroke="#2d7a4f"
                  strokeWidth="1"
                  opacity={scene5Progress >= 0.20 ? 0.6 : 0}
                />
                <text
                  x="150"
                  y={520 - Math.min(scene5Progress * 5, 1) * 120}
                  textAnchor="middle"
                  fill="#7a9a88"
                  fontSize="13"
                  opacity={scene5Progress >= 0.20 ? 1 : scene5Progress * 5}
                >
                  Foundation
                </text>

                {/* Income Layer - Consistent width, horizontal rhythm/sheen, softer edges */}
                <rect
                  x="50"
                  y={340 - (scene5Progress >= 0.20 && scene5Progress < 0.40 ? (scene5Progress - 0.20) * 5 * 80 : scene5Progress >= 0.40 ? 80 : 0)}
                  width="200"
                  height="80"
                  fill="#14492d"
                  stroke="#2d7a4f"
                  strokeWidth="1.5"
                  opacity={scene5Progress >= 0.40 ? 1 : scene5Progress >= 0.20 ? (scene5Progress - 0.20) * 5 : 0}
                  filter="url(#layerShadow)"
                  rx="3"
                />
                <line
                  x1="60"
                  y1={340 - (scene5Progress >= 0.20 && scene5Progress < 0.40 ? (scene5Progress - 0.20) * 5 * 80 : scene5Progress >= 0.40 ? 80 : 0) + 40}
                  x2="240"
                  y2={340 - (scene5Progress >= 0.20 && scene5Progress < 0.40 ? (scene5Progress - 0.20) * 5 * 80 : scene5Progress >= 0.40 ? 80 : 0) + 40}
                  stroke="#2d7a4f"
                  strokeWidth="1"
                  opacity={scene5Progress >= 0.40 ? 0.4 : 0}
                />
                <text
                  x="150"
                  y={380 - (scene5Progress >= 0.20 && scene5Progress < 0.40 ? (scene5Progress - 0.20) * 5 * 80 : scene5Progress >= 0.40 ? 80 : 0)}
                  textAnchor="middle"
                  fill="#7a9a88"
                  fontSize="13"
                  opacity={scene5Progress >= 0.40 ? 1 : scene5Progress >= 0.20 ? (scene5Progress - 0.20) * 5 : 0}
                >
                  Income
                </text>

                {/* Growth Layer - Taller than income, vertical gradient bottom to top lighter */}
                <rect
                  x="60"
                  y={260 - (scene5Progress >= 0.40 && scene5Progress < 0.65 ? (scene5Progress - 0.40) * 4 * 100 : scene5Progress >= 0.65 ? 100 : 0)}
                  width="180"
                  height="100"
                  fill="url(#growthGradient)"
                  stroke="#2d7a4f"
                  strokeWidth="1.5"
                  opacity={scene5Progress >= 0.65 ? 1 : scene5Progress >= 0.40 ? (scene5Progress - 0.40) * 4 : 0}
                  filter="url(#layerShadow)"
                  rx="3"
                />
                <text
                  x="150"
                  y={310 - (scene5Progress >= 0.40 && scene5Progress < 0.65 ? (scene5Progress - 0.40) * 4 * 100 : scene5Progress >= 0.65 ? 100 : 0)}
                  textAnchor="middle"
                  fill="#7a9a88"
                  fontSize="13"
                  opacity={scene5Progress >= 0.65 ? 1 : scene5Progress >= 0.40 ? (scene5Progress - 0.40) * 4 : 0}
                >
                  Growth
                </text>

                {/* Adaptive Layer - Lightest tone, softer corners, subtle internal glow */}
                <rect
                  x="70"
                  y={160 - (scene5Progress >= 0.65 && scene5Progress < 0.85 ? (scene5Progress - 0.65) * 5 * 70 : scene5Progress >= 0.85 ? 70 : 0)}
                  width="160"
                  height="70"
                  fill="#1a5f3f"
                  stroke="#3d8f63"
                  strokeWidth="1.5"
                  opacity={scene5Progress >= 0.85 ? 1 : scene5Progress >= 0.65 ? (scene5Progress - 0.65) * 5 : 0}
                  filter="url(#layerShadow)"
                  rx="5"
                />
                <rect
                  x="75"
                  y={165 - (scene5Progress >= 0.65 && scene5Progress < 0.85 ? (scene5Progress - 0.65) * 5 * 70 : scene5Progress >= 0.85 ? 70 : 0)}
                  width="150"
                  height="60"
                  fill="none"
                  stroke="#3d8f63"
                  strokeWidth="0.5"
                  opacity={scene5Progress >= 0.85 ? 0.3 : 0}
                  rx="4"
                />
                <text
                  x="150"
                  y={200 - (scene5Progress >= 0.65 && scene5Progress < 0.85 ? (scene5Progress - 0.65) * 5 * 70 : scene5Progress >= 0.85 ? 70 : 0)}
                  textAnchor="middle"
                  fill="#a0bfaf"
                  fontSize="13"
                  opacity={scene5Progress >= 0.85 ? 1 : scene5Progress >= 0.65 ? (scene5Progress - 0.65) * 5 : 0}
                >
                  Adaptive
                </text>

                {/* Top edge highlight - appears on full system */}
                <line
                  x1="70"
                  y1={90}
                  x2="230"
                  y2={90}
                  stroke="#4a9f70"
                  strokeWidth="1"
                  opacity={scene5Progress >= 0.85 ? 0.5 : 0}
                />
              </svg>
            </div>
          </div>
        </div>

        {/* SCENE 6 — INVERSE WATERFALL (SMOOTHER TRANSFORMATION) */}
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center">
          <svg width="400" height="450" viewBox="0 0 400 450" className="mb-8"
               style={{
                 opacity: getFadeInHoldOut(scene6Progress, 0.2, 0.85),
                 transition: 'all 0.3s ease-out',
               }}>
            <defs>
              <marker
                id="arrowDown"
                markerWidth="8"
                markerHeight="8"
                refX="4"
                refY="4"
                orient="auto"
              >
                <polygon points="0 0, 8 4, 0 8" fill="#2d7a4f" />
              </marker>
              <marker
                id="arrowUp"
                markerWidth="8"
                markerHeight="8"
                refX="4"
                refY="4"
                orient="auto"
              >
                <polygon points="8 0, 0 4, 8 8" fill="#2d7a4f" />
              </marker>
            </defs>

            {/* Top source/destination */}
            <rect
              x="150"
              y="50"
              width="100"
              height="40"
              fill="none"
              stroke="#2d7a4f"
              strokeWidth="1.5"
              rx="3"
              opacity={0.8}
            />
            <text x="200" y="75" textAnchor="middle" fill="#7a9a88" fontSize="13">
              {scene6Progress < 0.5 ? 'Growth' : 'Lifestyle'}
            </text>

            {/* Flow lines with smooth reversal */}
            <line
              x1="200"
              y1={scene6Progress < 0.5 ? 90 : 250}
              x2="200"
              y2={scene6Progress < 0.5 ? 140 : 200}
              stroke="#2d7a4f"
              strokeWidth="2"
              markerEnd={scene6Progress < 0.5 ? 'url(#arrowDown)' : 'url(#arrowUp)'}
              opacity={0.7}
              style={{ transition: 'all 0.6s ease-in-out' }}
            />

            {/* Middle node */}
            <circle
              cx="200"
              cy="170"
              r="8"
              fill="#1a5f3f"
              stroke="#2d7a4f"
              strokeWidth="2"
            />

            {/* Second flow line */}
            <line
              x1="200"
              y1={scene6Progress < 0.5 ? 200 : 370}
              x2="200"
              y2={scene6Progress < 0.5 ? 250 : 320}
              stroke="#2d7a4f"
              strokeWidth="2"
              markerEnd={scene6Progress < 0.5 ? 'url(#arrowDown)' : 'url(#arrowUp)'}
              opacity={0.7}
              style={{ transition: 'all 0.6s ease-in-out' }}
            />

            {/* Bottom destination/source */}
            <rect
              x="150"
              y="280"
              width="100"
              height="40"
              fill="none"
              stroke="#2d7a4f"
              strokeWidth="1.5"
              rx="3"
              opacity={0.8}
            />
            <text x="200" y="305" textAnchor="middle" fill="#7a9a88" fontSize="13">
              {scene6Progress < 0.5 ? 'Lifestyle' : 'Foundation'}
            </text>
          </svg>

          <div
            className="text-3xl md:text-4xl text-center px-8 max-w-2xl"
            style={{
              fontFamily: 'Georgia, serif',
              opacity: getFadeInHoldOut(scene6Progress, 0.3, 0.75),
              transform: `translateY(${(1 - getFadeInHoldOut(scene6Progress, 0.3, 0.75)) * 15}px)`,
            }}
          >
            Lifestyle is the last claimant.
          </div>
        </div>

        {/* SCENE 7 — CLOSING STATEMENT */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center">
          <div
            className="text-4xl md:text-6xl text-center max-w-4xl px-8"
            style={{
              fontFamily: 'Georgia, serif',
              opacity: getFadeInHoldOut(scene7Progress, 0.3, 0.75),
              transform: `translateY(${(1 - getFadeInHoldOut(scene7Progress, 0.3, 0.75)) * 20}px)`,
            }}
          >
            <p>A portfolio may recover.</p>
            <p className="mt-6">A system must endure.</p>
          </div>
        </div>

        {/* SCENE 8 — CTA (QUIET INVITATION) */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center">
          <div
            className="text-center"
            style={{
              opacity: getFadeInHoldOut(scene8Progress, 0.3, 0.95),
              transform: `translateY(${(1 - getFadeInHoldOut(scene8Progress, 0.3, 0.95)) * 30}px)`,
            }}
          >
            <p
              className="text-2xl md:text-3xl mb-8"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Explore the Framework
            </p>
            <div className="w-px h-16 bg-gradient-to-b from-gray-600 to-transparent mx-auto" />
          </div>
        </div>

      </div>
    </div>
  );
}
