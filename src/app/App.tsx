import { useEffect, useRef, useState } from 'react';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollTop = containerRef.current.scrollTop;
      const scrollHeight =
        containerRef.current.scrollHeight - containerRef.current.clientHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      setScrollProgress(progress);
    };

    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const clamp = (value: number, min = 0, max = 1) =>
    Math.max(min, Math.min(max, value));

  const getSceneProgress = (start: number, end: number) => {
    const p = clamp(scrollProgress);
    if (p <= start) return 0;
    if (p >= end) return 1;
    return (p - start) / (end - start);
  };

  const getFadeInHoldOut = (
    progress: number,
    fadeInEnd = 0.2,
    fadeOutStart = 0.8
  ) => {
    if (progress <= 0) return 0;
    if (progress < fadeInEnd) return progress / fadeInEnd;
    if (progress > fadeOutStart) {
      return 1 - (progress - fadeOutStart) / (1 - fadeOutStart);
    }
    return 1;
  };

  const mapRange = (
    progress: number,
    start: number,
    end: number,
    outStart = 0,
    outEnd = 1
  ) => {
    const t = clamp((progress - start) / (end - start));
    return outStart + (outEnd - outStart) * t;
  };

const scene0Progress = getSceneProgress(0.00, 0.08); // intro video
const scene1Progress = getSceneProgress(0.08, 0.15); // wealth is not a portfolio
const scene2Progress = getSceneProgress(0.15, 0.23); // withdrawal strategy
const scene3Progress = getSceneProgress(0.23, 0.31); // the problem is not volatility
const scene4Progress = getSceneProgress(0.31, 0.39); // it is dependence
const scene5Progress = getSceneProgress(0.39, 0.49); // converge under stress + systems endure
const scene6Progress = getSceneProgress(0.49, 0.68); // EVF reveal (longer)
const scene7Progress = getSceneProgress(0.68, 0.86); // system absorbs stress
const scene8Progress = getSceneProgress(0.86, 0.94); // closing
const scene9Progress = getSceneProgress(0.94, 1.00); // final CTA

  const systemsEndureOpacity =
    scene5Progress > 0.58 ? Math.min((scene5Progress - 0.58) / 0.16, 1) : 0;

  const evfSceneOpacity = getFadeInHoldOut(scene6Progress, 0.08, 0.82);
  const stressSceneOpacity = getFadeInHoldOut(scene7Progress, 0.18, 0.88);

  const evfStage =
    scene6Progress < 0.20
      ? 0
      : scene6Progress < 0.40
      ? 1
      : scene6Progress < 0.65
      ? 2
      : scene6Progress < 0.85
      ? 3
      : 4;

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-y-scroll overflow-x-hidden text-white"
      style={{
        scrollBehavior: 'smooth',
        background: `
          radial-gradient(circle at 50% 35%, rgba(36, 92, 70, 0.18), transparent 42%),
          radial-gradient(circle at 82% 78%, rgba(22, 58, 45, 0.10), transparent 38%),
          radial-gradient(circle at 18% 20%, rgba(18, 34, 48, 0.12), transparent 34%),
          #000000
        `,
      }}
    >
      <div style={{ height: '1550vh' }}>
{/* SCENE 0 — INTRO VIDEO */}
<div className="sticky top-0 h-screen w-full overflow-hidden">
  <video
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
    className="absolute inset-0 w-full h-full object-cover"
    style={{
      opacity: 1 - scene0Progress * 1.05,
      filter: `blur(${scene0Progress * 5}px) brightness(${1 - scene0Progress * 0.22})`,
      transform: `scale(${1 + scene0Progress * 0.02})`,
    }}
  >
    <source src="/video/intro.mp4" type="video/mp4" />
  </video>

  <div
    className="absolute inset-0"
    style={{
      background:
        'linear-gradient(to bottom, rgba(0,0,0,0.16), rgba(0,0,0,0.28))',
      opacity: 1 - scene0Progress * 0.35,
    }}
  />

  <div
    className="absolute inset-0 bg-black"
    style={{
      opacity: scene0Progress * 0.82,
    }}
  />
</div>

        {/* SCENE 1 — HERO */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center">
          <div
            style={{
              opacity: getFadeInHoldOut(scene1Progress, 0.22, 0.70),
              transform: `translateY(${(1 - getFadeInHoldOut(scene1Progress, 0.22, 0.70)) * 20}px)`,
            }}
          >
            <h1
              className="text-5xl md:text-7xl max-w-5xl text-center px-8"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Wealth is not a portfolio.
            </h1>
          </div>
        </div>

        {/* SCENE 2 — WITHDRAWAL STRATEGY */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center">
          <div
            style={{
              opacity: getFadeInHoldOut(scene2Progress, 0.22, 0.72),
              transform: `translateY(${(1 - getFadeInHoldOut(scene2Progress, 0.22, 0.72)) * 20}px)`,
            }}
          >
            <h1
              className="text-4xl md:text-6xl max-w-5xl text-center px-8"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Most financial plans are portfolios with a withdrawal strategy.
            </h1>
          </div>
        </div>

        {/* SCENE 3 — VOLATILITY */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center">
          <div
            style={{
              opacity: getFadeInHoldOut(scene3Progress, 0.25, 0.72),
              transform: `translateY(${(1 - getFadeInHoldOut(scene3Progress, 0.25, 0.72)) * 18}px)`,
            }}
          >
            <h1
              className="text-4xl md:text-6xl max-w-4xl text-center px-8"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              The problem is not volatility.
            </h1>
          </div>
        </div>

        {/* SCENE 4 — DEPENDENCE */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center">
          <div
            style={{
              opacity: getFadeInHoldOut(scene4Progress, 0.25, 0.74),
              transform: `translateY(${(1 - getFadeInHoldOut(scene4Progress, 0.25, 0.74)) * 18}px)`,
            }}
          >
            <h1
              className="text-4xl md:text-6xl max-w-4xl text-center px-8"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              It is dependence.
            </h1>
          </div>
        </div>

        {/* SCENE 5 — CONVERGENCE UNDER STRESS */}
      <div
  className="text-center max-w-4xl px-8"
  style={{ fontFamily: 'Georgia, serif' }}
>
  <p
    className="text-3xl md:text-5xl"
    style={{
      opacity: getFadeInHoldOut(scene5Progress, 0.18, 0.48),
      transform: `translateY(${(1 - getFadeInHoldOut(scene5Progress, 0.18, 0.48)) * 15}px)`,
    }}
  >
    Traditional portfolios converge under stress.
  </p>

  <p
    className="mt-8 text-2xl md:text-4xl text-white/80"
    style={{
      opacity:
        scene5Progress > 0.42 && scene5Progress < 0.72
          ? Math.min((scene5Progress - 0.42) / 0.14, 1) *
            (1 - Math.max((scene5Progress - 0.60) / 0.12, 0))
          : 0,
      transform: `translateY(${
        scene5Progress > 0.42
          ? (1 -
              Math.min((scene5Progress - 0.42) / 0.14, 1) *
                (1 - Math.max((scene5Progress - 0.60) / 0.12, 0))) *
            10
          : 10
      }px)`,
    }}
  >
    Systems endure.
  </p>
</div>

        {/* SCENE 6 — EVF REVEAL */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center px-8">
          <div
            className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16"
            style={{
              opacity: evfSceneOpacity,
              transform: `translateY(${(1 - evfSceneOpacity) * 8}px)`,
            }}
          >
            {/* LEFT PANEL */}
            <div className="flex flex-col justify-center">
              <p
                className="text-[11px] uppercase text-white/30 mb-8"
                style={{ letterSpacing: '0.32em' }}
              >
                Enduring Value Framework™
              </p>

              <div
                className="transition-all duration-500 py-4"
                style={{
                  opacity: evfStage === 0 ? 1 : evfStage === 4 ? 0.8 : 0.4,
                  transform: evfStage === 0 ? 'scale(1.04)' : 'scale(1)',
                }}
              >
                <h3 className="text-2xl mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                  Foundation
                </h3>
                <p className="text-white/55 text-sm">Structural integrity and protected liquidity</p>
              </div>

              <div
                className="transition-all duration-500 py-4"
                style={{
                  opacity: evfStage === 1 ? 1 : evfStage === 4 ? 0.8 : 0.4,
                  transform: evfStage === 1 ? 'scale(1.04)' : 'scale(1)',
                }}
              >
                <h3 className="text-2xl mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                  Income
                </h3>
                <p className="text-white/55 text-sm">Stability and repeatable cash flow</p>
              </div>

              <div
                className="transition-all duration-500 py-4"
                style={{
                  opacity: evfStage === 2 ? 1 : evfStage === 4 ? 0.8 : 0.4,
                  transform: evfStage === 2 ? 'scale(1.04)' : 'scale(1)',
                }}
              >
                <h3 className="text-2xl mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                  Growth
                </h3>
                <p className="text-white/55 text-sm">Long-term expansion and compounding</p>
              </div>

              <div
                className="transition-all duration-500 py-4"
                style={{
                  opacity: evfStage === 3 ? 1 : evfStage === 4 ? 0.8 : 0.4,
                  transform: evfStage === 3 ? 'scale(1.04)' : 'scale(1)',
                }}
              >
                <h3 className="text-2xl mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                  Adaptive
                </h3>
                <p className="text-white/55 text-sm">Optionality across changing regimes</p>
              </div>

              <div
                className="transition-all duration-500 pt-6 mt-4 border-t border-white/10"
                style={{
                  opacity: evfStage === 4 ? 1 : 0,
                  transform: evfStage === 4 ? 'scale(1)' : 'scale(0.97)',
                }}
              >
                <p className="text-white/45 text-sm italic">
                  Every engine has a purpose. Every dollar has a job.
                </p>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="flex items-center justify-center">
              <svg width="320" height="540" viewBox="0 0 320 540">
                <defs>
                  <linearGradient id="growthGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#14492d" />
                    <stop offset="100%" stopColor="#2b7a52" />
                  </linearGradient>

                  <filter id="layerShadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.28" />
                  </filter>

                  <filter id="foundationShadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="8" stdDeviation="8" floodOpacity="0.4" />
                  </filter>
                </defs>

                {/* Foundation */}
                <rect
                  x="46"
                  y={468 - mapRange(scene6Progress, 0.0, 0.2, 0, 120)}
                  width="228"
                  height="120"
                  fill="#0d3a24"
                  stroke="#2f8158"
                  strokeWidth="1.5"
                  opacity={mapRange(scene6Progress, 0.0, 0.2)}
                  filter="url(#foundationShadow)"
                  rx="5"
                />
                <line
                  x1="52"
                  y1={472 - mapRange(scene6Progress, 0.0, 0.2, 0, 120)}
                  x2="268"
                  y2={472 - mapRange(scene6Progress, 0.0, 0.2, 0, 120)}
                  stroke="#61a885"
                  strokeWidth="1"
                  opacity={mapRange(scene6Progress, 0.08, 0.24, 0, 0.42)}
                />
                <text
                  x="160"
                  y={536 - mapRange(scene6Progress, 0.0, 0.2, 0, 120)}
                  textAnchor="middle"
                  fill="#a0bfaf"
                  fontSize="13"
                  opacity={mapRange(scene6Progress, 0.0, 0.2)}
                >
                  Foundation
                </text>

                {/* Income */}
                <rect
                  x="56"
                  y={352 - mapRange(scene6Progress, 0.2, 0.4, 0, 84)}
                  width="208"
                  height="84"
                  fill="#15452d"
                  stroke="#2f8158"
                  strokeWidth="1.5"
                  opacity={mapRange(scene6Progress, 0.2, 0.4)}
                  filter="url(#layerShadow)"
                  rx="8"
                />
                <line
                  x1="68"
                  y1={394 - mapRange(scene6Progress, 0.2, 0.4, 0, 84)}
                  x2="252"
                  y2={394 - mapRange(scene6Progress, 0.2, 0.4, 0, 84)}
                  stroke="#5d9f80"
                  strokeWidth="0.8"
                  opacity={mapRange(scene6Progress, 0.28, 0.44, 0, 0.3)}
                />
                <text
                  x="160"
                  y={401 - mapRange(scene6Progress, 0.2, 0.4, 0, 84)}
                  textAnchor="middle"
                  fill="#a0bfaf"
                  fontSize="13"
                  opacity={mapRange(scene6Progress, 0.2, 0.4)}
                >
                  Income
                </text>

                {/* Growth */}
                <rect
                  x="66"
                  y={264 - mapRange(scene6Progress, 0.4, 0.65, 0, 102)}
                  width="188"
                  height="102"
                  fill="url(#growthGradient)"
                  stroke="#2f8158"
                  strokeWidth="1.5"
                  opacity={mapRange(scene6Progress, 0.4, 0.65)}
                  filter="url(#layerShadow)"
                  rx="10"
                />
                <text
                  x="160"
                  y={318 - mapRange(scene6Progress, 0.4, 0.65, 0, 102)}
                  textAnchor="middle"
                  fill="#b4d1c2"
                  fontSize="13"
                  opacity={mapRange(scene6Progress, 0.4, 0.65)}
                >
                  Growth
                </text>

                {/* Adaptive */}
                <rect
                  x="76"
                  y={172 - mapRange(scene6Progress, 0.65, 0.85, 0, 72)}
                  width="168"
                  height="72"
                  fill="#1a5f3f"
                  stroke="#4c9c74"
                  strokeWidth="1.5"
                  opacity={mapRange(scene6Progress, 0.65, 0.85)}
                  filter="url(#layerShadow)"
                  rx="12"
                />
                <rect
                  x="82"
                  y={178 - mapRange(scene6Progress, 0.65, 0.85, 0, 72)}
                  width="156"
                  height="60"
                  fill="none"
                  stroke="#72b692"
                  strokeWidth="0.6"
                  opacity={mapRange(scene6Progress, 0.74, 0.88, 0, 0.32)}
                  rx="10"
                />
                <text
                  x="160"
                  y={214 - mapRange(scene6Progress, 0.65, 0.85, 0, 72)}
                  textAnchor="middle"
                  fill="#d1efe0"
                  fontSize="13"
                  opacity={mapRange(scene6Progress, 0.65, 0.85)}
                >
                  Adaptive
                </text>

                <line
                  x1="76"
                  y1="100"
                  x2="244"
                  y2="100"
                  stroke="#6fb08e"
                  strokeWidth="1"
                  opacity={mapRange(scene6Progress, 0.84, 1, 0, 0.5)}
                />
              </svg>
            </div>
          </div>
        </div>

{/* SCENE 7 — SYSTEM ABSORBS STRESS */}
<div className="sticky top-0 h-screen w-full flex items-center justify-center px-8">
  <div
    className="relative w-full max-w-5xl h-[700px] flex items-center justify-center"
    style={{
      opacity: stressSceneOpacity,
    }}
  >
    {/* Lifestyle */}
    <div
      className="absolute top-8 text-center"
      style={{
        opacity: scene7Progress > 0.10 ? 1 : 0,
      }}
    >
      <p
        className="text-[12px] uppercase text-white/30 mb-2"
        style={{ letterSpacing: '0.32em' }}
      >
        Lifestyle
      </p>

      <div
        className="mx-auto mt-2 w-24 h-24 rounded-full"
        style={{
          opacity: scene7Progress > 0.76 ? Math.min((scene7Progress - 0.76) / 0.08, 1) : 0,
          background:
            'radial-gradient(circle, rgba(120,210,255,0.26) 0%, rgba(120,210,255,0.12) 40%, rgba(120,210,255,0.00) 76%)',
          filter: 'blur(8px)',
          transform: `scale(${scene7Progress > 0.76 ? 1 + Math.sin(scene7Progress * 24) * 0.05 : 0.95})`,
        }}
      />
    </div>

    {/* Upward beam */}
    <div
      className="absolute top-[92px] h-[180px] w-[6px] rounded-full"
      style={{
        opacity: scene7Progress > 0.54 ? Math.min((scene7Progress - 0.54) / 0.10, 1) : 0,
        background:
          'linear-gradient(to bottom, rgba(120,210,255,0), rgba(120,210,255,0.95), rgba(120,210,255,0.18), rgba(120,210,255,0))',
        boxShadow:
          '0 0 28px rgba(120,210,255,0.50), 0 0 56px rgba(120,210,255,0.22)',
        transform: `scaleY(${scene7Progress > 0.62 ? 1 + Math.sin(scene7Progress * 22) * 0.05 : 1})`,
      }}
    />

    {/* Orb moving upward */}
    <div
      className="absolute left-1/2 -translate-x-1/2 rounded-full"
      style={{
        width: '20px',
        height: '20px',
        opacity: scene7Progress > 0.56 ? 1 : 0,
        background:
          'radial-gradient(circle, rgba(150,225,255,1) 0%, rgba(120,210,255,0.82) 45%, rgba(120,210,255,0) 72%)',
        boxShadow: '0 0 34px rgba(120,210,255,0.7)',
        top: `${
          scene7Progress < 0.56
            ? 382
            : 382 - Math.min((scene7Progress - 0.56) / 0.20, 1) * 190
        }px`,
      }}
    />

    {/* Stress wave 1 */}
    <div
      className="absolute left-[2%] top-1/2 -translate-y-1/2 h-[280px] w-[340px] rounded-full"
      style={{
        opacity: scene7Progress > 0.10 && scene7Progress < 0.70 ? 0.42 : 0,
        background:
          'radial-gradient(circle at 28% 50%, rgba(170,185,205,0.34), rgba(130,150,170,0.18) 38%, rgba(130,150,170,0.04) 58%, transparent 76%)',
        transform: `translateX(${scene7Progress * 460}px) translateY(-50%)`,
        filter: 'blur(22px)',
      }}
    />

    {/* Stress wave 2 */}
    <div
      className="absolute left-[-2%] top-1/2 -translate-y-1/2 h-[200px] w-[240px] rounded-full"
      style={{
        opacity: scene7Progress > 0.18 && scene7Progress < 0.62 ? 0.22 : 0,
        background:
          'radial-gradient(circle at 30% 50%, rgba(180,195,215,0.22), rgba(140,160,180,0.06) 44%, transparent 74%)',
        transform: `translateX(${scene7Progress * 390}px) translateY(-50%)`,
        filter: 'blur(16px)',
      }}
    />

    {/* System stack */}
    <div className="relative flex flex-col items-center gap-3">
      <div
        className="w-[164px] h-[72px] rounded-[12px] border border-emerald-700/70 bg-emerald-900/60"
        style={{
          transform: `translateX(${scene7Progress > 0.28 ? Math.sin(scene7Progress * 18) * 6 : 0}px) rotate(${scene7Progress > 0.28 ? Math.sin(scene7Progress * 11) * 0.4 : 0}deg)`,
          boxShadow:
            '0 8px 24px rgba(19, 79, 57, 0.22), inset 0 1px 0 rgba(130,220,180,0.16)',
        }}
      />

      <div
        className="w-[182px] h-[98px] rounded-[10px] border border-emerald-700/70"
        style={{
          background:
            'linear-gradient(to top, rgba(19,73,45,0.82), rgba(37,102,68,0.82))',
          transform: `translateX(${scene7Progress > 0.26 ? -Math.sin(scene7Progress * 12) * 4 : 0}px) scaleY(${scene7Progress > 0.30 ? 0.972 : 1})`,
          boxShadow:
            '0 8px 24px rgba(19, 79, 57, 0.22), inset 0 1px 0 rgba(130,220,180,0.14)',
        }}
      />

      <div
        className="w-[202px] h-[82px] rounded-[8px] border border-emerald-700/70 bg-emerald-950/75 relative overflow-hidden"
        style={{
          transform: `scaleX(${scene7Progress > 0.28 ? 0.986 : 1})`,
          boxShadow:
            '0 8px 24px rgba(19, 79, 57, 0.22), inset 0 1px 0 rgba(130,220,180,0.12)',
        }}
      >
        <div
          className="absolute inset-y-0 left-0"
          style={{
            width: '100%',
            background:
              'linear-gradient(to right, rgba(120,210,255,0.00), rgba(120,210,255,0.22), rgba(120,210,255,0.00))',
            transform: `translateX(${scene7Progress > 0.20 ? (scene7Progress - 0.20) * 300 : -300}px)`,
            opacity: scene7Progress > 0.20 && scene7Progress < 0.78 ? 1 : 0,
          }}
        />
      </div>

      <div
        className="w-[224px] h-[118px] rounded-[6px] border border-emerald-700/80 bg-[#0d3a24]"
        style={{
          transform: `translateY(${scene7Progress > 0.24 ? Math.sin(scene7Progress * 8) * 2.5 : 0}px)`,
          boxShadow:
            '0 12px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(130,220,180,0.12)',
        }}
      />
    </div>

    {/* Message */}
    <div
      className="absolute bottom-6 text-center px-8"
      style={{
        opacity: scene7Progress > 0.72 ? Math.min((scene7Progress - 0.72) / 0.10, 1) : 0,
        transform: `translateY(${scene7Progress > 0.72 ? (1 - Math.min((scene7Progress - 0.72) / 0.10, 1)) * 16 : 16}px)`,
      }}
    >
      <h2
        className="text-3xl md:text-5xl max-w-4xl"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        The system absorbs stress… so your life doesn’t have to.
      </h2>
    </div>
  </div>
</div>

        {/* SCENE 8 — CLOSING */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center">
          <div
            className="text-4xl md:text-6xl text-center max-w-4xl px-8"
            style={{
              fontFamily: 'Georgia, serif',
              opacity: getFadeInHoldOut(scene8Progress, 0.28, 0.78),
              transform: `translateY(${(1 - getFadeInHoldOut(scene8Progress, 0.28, 0.78)) * 20}px)`,
            }}
          >
            <p>A portfolio may recover.</p>
            <p className="mt-6">A system must endure.</p>
          </div>
        </div>

        {/* SCENE 9 — FINAL CTA */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center">
          <div
            className="text-center px-8"
            style={{
              opacity: getFadeInHoldOut(scene9Progress, 0.25, 0.98),
              transform: `translateY(${(1 - getFadeInHoldOut(scene9Progress, 0.25, 0.98)) * 24}px)`,
            }}
          >
            <a
              href="#"
              className="text-2xl md:text-4xl underline underline-offset-8 decoration-white/55 hover:decoration-white transition-colors"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Explore the Enduring Value Framework™
            </a>

            <p
              className="mt-5 text-sm md:text-base uppercase text-white/45"
              style={{ letterSpacing: '0.20em' }}
            >
              The architecture of usable wealth
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
