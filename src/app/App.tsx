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

  const scene0Progress = getSceneProgress(0.00, 0.07); // intro video
  const scene1Progress = getSceneProgress(0.07, 0.13); // wealth is not a portfolio
  const scene2Progress = getSceneProgress(0.13, 0.21); // withdrawal strategy
  const scene3Progress = getSceneProgress(0.21, 0.28); // volatility
  const scene4Progress = getSceneProgress(0.28, 0.35); // dependence
  const scene5Progress = getSceneProgress(0.35, 0.44); // traditional portfolios...
  const scene6Progress = getSceneProgress(0.44, 0.52); // systems endure
  const scene7Progress = getSceneProgress(0.52, 0.74); // EVF reveal
  const scene8Progress = getSceneProgress(0.74, 0.90); // stress absorption
  const scene9Progress = getSceneProgress(0.90, 0.96); // closing
  const scene10Progress = getSceneProgress(0.96, 1.00); // CTA

  const evfSceneOpacity = getFadeInHoldOut(scene7Progress, 0.08, 0.90);
  const stressSceneOpacity = getFadeInHoldOut(scene8Progress, 0.10, 0.96);

  const evfStage =
    scene7Progress < 0.18
      ? 0
      : scene7Progress < 0.38
      ? 1
      : scene7Progress < 0.58
      ? 2
      : scene7Progress < 0.78
      ? 3
      : 4;

  const systemsEndureSceneOpacity = getFadeInHoldOut(scene6Progress, 0.22, 0.78);
  const systemsEndureScale =
    0.98 + Math.min(mapRange(scene6Progress, 0.18, 0.42, 0, 1), 1) * 0.02;

  const finalLifestyleGlowOpacity =
    scene8Progress > 0.82 ? Math.min((scene8Progress - 0.82) / 0.10, 1) : 0;

  const stressMessageOpacity =
    scene8Progress < 0.70
      ? scene8Progress > 0.48
        ? Math.min((scene8Progress - 0.48) / 0.12, 1)
        : 0
      : Math.max(1 - (scene8Progress - 0.70) / 0.12, 0);

  const stressSystemOpacity =
    scene8Progress < 0.80 ? 1 : Math.max(1 - (scene8Progress - 0.80) / 0.12, 0.25);

  const ctaOpacity = Math.min(scene10Progress / 0.25, 1);

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-y-scroll overflow-x-hidden text-white"
      style={{
        scrollBehavior: 'smooth',
        background: `
          radial-gradient(circle at 50% 34%, rgba(36, 92, 70, 0.18), transparent 40%),
          radial-gradient(circle at 82% 78%, rgba(22, 58, 45, 0.10), transparent 36%),
          radial-gradient(circle at 18% 20%, rgba(18, 34, 48, 0.12), transparent 34%),
          #000000
        `,
      }}
    >
      <div style={{ height: '1700vh' }}>
        {/* SCENE 0 — INTRO VIDEO */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              opacity: 1 - scene0Progress * 1.02,
              filter: `blur(${scene0Progress * 4}px) brightness(${1 - scene0Progress * 0.18})`,
              transform: `scale(${1 + scene0Progress * 0.02})`,
            }}
          >
            <source
              src={`${import.meta.env.BASE_URL}intro.mp4`}
              type="video/mp4"
            />
          </video>

          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.12), rgba(0,0,0,0.24))',
              opacity: 1 - scene0Progress * 0.35,
            }}
          />

          <div
            className="absolute inset-0 bg-black"
            style={{
              opacity: scene0Progress * 0.78,
            }}
          />
        </div>

        {/* SCENE 1 — HERO */}
        <div className="sticky top-0 flex h-screen w-full items-center justify-center">
          <div
            style={{
              opacity: getFadeInHoldOut(scene1Progress, 0.22, 0.72),
              transform: `translateY(${(1 - getFadeInHoldOut(scene1Progress, 0.22, 0.72)) * 20}px)`,
            }}
          >
            <h1
              className="max-w-5xl px-8 text-center text-5xl md:text-7xl"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Wealth is not a portfolio.
            </h1>
          </div>
        </div>

        {/* SCENE 2 — WITHDRAWAL STRATEGY */}
        <div className="sticky top-0 flex h-screen w-full items-center justify-center">
          <div
            style={{
              opacity: getFadeInHoldOut(scene2Progress, 0.22, 0.76),
              transform: `translateY(${(1 - getFadeInHoldOut(scene2Progress, 0.22, 0.76)) * 18}px)`,
            }}
          >
            <h1
              className="max-w-5xl px-8 text-center text-4xl md:text-6xl"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Most financial plans are portfolios with a withdrawal strategy.
            </h1>
          </div>
        </div>

        {/* SCENE 3 — VOLATILITY */}
        <div className="sticky top-0 flex h-screen w-full items-center justify-center">
          <div
            style={{
              opacity: getFadeInHoldOut(scene3Progress, 0.25, 0.74),
              transform: `translateY(${(1 - getFadeInHoldOut(scene3Progress, 0.25, 0.74)) * 16}px)`,
            }}
          >
            <h1
              className="max-w-4xl px-8 text-center text-4xl md:text-6xl"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              The problem is not volatility.
            </h1>
          </div>
        </div>

        {/* SCENE 4 — DEPENDENCE */}
        <div className="sticky top-0 flex h-screen w-full items-center justify-center">
          <div
            style={{
              opacity: getFadeInHoldOut(scene4Progress, 0.25, 0.76),
              transform: `translateY(${(1 - getFadeInHoldOut(scene4Progress, 0.25, 0.76)) * 16}px)`,
            }}
          >
            <h1
              className="max-w-4xl px-8 text-center text-4xl md:text-6xl"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              It is dependence.
            </h1>
          </div>
        </div>

        {/* SCENE 5 — TRADITIONAL PORTFOLIOS */}
        <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center">
          <div className="relative">
            <svg
              width="440"
              height="440"
              viewBox="0 0 440 440"
              className="mb-12"
              style={{ opacity: getFadeInHoldOut(scene5Progress, 0.10, 0.78) }}
            >
              <circle
                cx="220"
                cy="220"
                r={Math.max(92 - scene5Progress * 56, 24)}
                fill="none"
                stroke="#1a5f3f"
                strokeWidth="2"
                opacity={Math.max(1 - scene5Progress * 0.5, 0.28)}
                style={{
                  transform: `translate(${-scene5Progress * 26}px, ${scene5Progress * 14}px)`,
                  transformOrigin: 'center',
                }}
              />
              <circle
                cx="220"
                cy="220"
                r={Math.max(136 - scene5Progress * 80, 34)}
                fill="none"
                stroke="#1a5f3f"
                strokeWidth="2"
                opacity={Math.max(0.7 - scene5Progress * 0.35, 0.20)}
                style={{
                  transform: `translate(${scene5Progress * 30}px, ${-scene5Progress * 18}px)`,
                  transformOrigin: 'center',
                }}
              />
              <circle
                cx="220"
                cy="220"
                r={Math.max(180 - scene5Progress * 104, 44)}
                fill="none"
                stroke="#1a5f3f"
                strokeWidth="2"
                opacity={Math.max(0.44 - scene5Progress * 0.24, 0.14)}
                style={{
                  transform: `translate(${-scene5Progress * 12}px, ${scene5Progress * 22}px)`,
                  transformOrigin: 'center',
                }}
              />
            </svg>

            <div
              className="max-w-5xl px-8 text-center"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              <p
                className="text-4xl md:text-6xl"
                style={{
                  opacity: getFadeInHoldOut(scene5Progress, 0.18, 0.58),
                  transform: `translateY(${(1 - getFadeInHoldOut(scene5Progress, 0.18, 0.58)) * 14}px)`,
                }}
              >
                Traditional portfolios converge under stress.
              </p>
            </div>
          </div>
        </div>

        {/* SCENE 6 — SYSTEMS ENDURE */}
        <div className="sticky top-0 flex h-screen w-full items-center justify-center">
          <div
            className="px-8 text-center"
            style={{
              opacity: systemsEndureSceneOpacity,
              transform: `scale(${systemsEndureScale}) translateY(${(1 - systemsEndureSceneOpacity) * 10}px)`,
            }}
          >
            <h1
              className="text-5xl md:text-7xl"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Systems endure.
            </h1>
          </div>
        </div>

        {/* SCENE 7 — EVF REVEAL */}
        <div className="sticky top-0 flex h-screen w-full items-center justify-center px-10">
          <div
            className="grid w-full max-w-[1500px] grid-cols-1 gap-16 md:grid-cols-2 md:gap-28"
            style={{
              opacity: evfSceneOpacity,
              transform: `translateY(${(1 - evfSceneOpacity) * 8}px)`,
            }}
          >
            {/* LEFT PANEL */}
            <div className="flex flex-col justify-center">
              <p
                className="mb-10 text-[12px] uppercase text-white/32"
                style={{ letterSpacing: '0.34em' }}
              >
                Enduring Value Framework™
              </p>

              <div
                className="py-5 transition-all duration-500"
                style={{
                  opacity: evfStage === 0 ? 1 : evfStage === 4 ? 0.82 : 0.38,
                  transform: evfStage === 0 ? 'scale(1.04)' : 'scale(1)',
                }}
              >
                <h3
                  className="mb-3 text-3xl md:text-4xl"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  Foundation
                </h3>
                <p className="text-base text-white/58 md:text-lg">
                  Structural integrity and protected liquidity
                </p>
              </div>

              <div
                className="py-5 transition-all duration-500"
                style={{
                  opacity: evfStage === 1 ? 1 : evfStage === 4 ? 0.82 : 0.38,
                  transform: evfStage === 1 ? 'scale(1.04)' : 'scale(1)',
                }}
              >
                <h3
                  className="mb-3 text-3xl md:text-4xl"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  Income
                </h3>
                <p className="text-base text-white/58 md:text-lg">
                  Stability and repeatable cash flow
                </p>
              </div>

              <div
                className="py-5 transition-all duration-500"
                style={{
                  opacity: evfStage === 2 ? 1 : evfStage === 4 ? 0.82 : 0.38,
                  transform: evfStage === 2 ? 'scale(1.04)' : 'scale(1)',
                }}
              >
                <h3
                  className="mb-3 text-3xl md:text-4xl"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  Growth
                </h3>
                <p className="text-base text-white/58 md:text-lg">
                  Long-term expansion and compounding
                </p>
              </div>

              <div
                className="py-5 transition-all duration-500"
                style={{
                  opacity: evfStage === 3 ? 1 : evfStage === 4 ? 0.82 : 0.38,
                  transform: evfStage === 3 ? 'scale(1.04)' : 'scale(1)',
                }}
              >
                <h3
                  className="mb-3 text-3xl md:text-4xl"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  Adaptive
                </h3>
                <p className="text-base text-white/58 md:text-lg">
                  Optionality across changing regimes
                </p>
              </div>

              <div
                className="mt-10 pt-8 transition-all duration-500"
                style={{
                  opacity:
                    scene7Progress > 0.84
                      ? Math.min((scene7Progress - 0.84) / 0.08, 1)
                      : 0,
                  transform: `translateY(${
                    scene7Progress > 0.84
                      ? (1 - Math.min((scene7Progress - 0.84) / 0.08, 1)) * 10
                      : 10
                  }px)`,
                }}
              >
                <p className="text-lg italic text-white/52 md:text-xl">
                  Every engine has a purpose. Every dollar has a job.
                </p>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="flex items-center justify-center">
              <svg width="420" height="680" viewBox="0 0 420 680">
                <defs>
                  <linearGradient
                    id="growthGradient"
                    x1="0%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#14492d" />
                    <stop offset="100%" stopColor="#2b7a52" />
                  </linearGradient>

                  <filter
                    id="layerShadow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feDropShadow
                      dx="0"
                      dy="5"
                      stdDeviation="6"
                      floodOpacity="0.28"
                    />
                  </filter>

                  <filter
                    id="foundationShadow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feDropShadow
                      dx="0"
                      dy="10"
                      stdDeviation="10"
                      floodOpacity="0.42"
                    />
                  </filter>
                </defs>

                {/* Foundation */}
                <rect
                  x="70"
                  y={560 - mapRange(scene7Progress, 0.0, 0.18, 0, 130)}
                  width="280"
                  height="130"
                  fill="#0d3a24"
                  stroke="#2f8158"
                  strokeWidth="1.6"
                  opacity={mapRange(scene7Progress, 0.0, 0.18)}
                  filter="url(#foundationShadow)"
                  rx="6"
                />
                <line
                  x1="78"
                  y1={566 - mapRange(scene7Progress, 0.0, 0.18, 0, 130)}
                  x2="342"
                  y2={566 - mapRange(scene7Progress, 0.0, 0.18, 0, 130)}
                  stroke="#61a885"
                  strokeWidth="1"
                  opacity={mapRange(scene7Progress, 0.06, 0.20, 0, 0.42)}
                />
                <text
                  x="210"
                  y={635 - mapRange(scene7Progress, 0.0, 0.18, 0, 130)}
                  textAnchor="middle"
                  fill="#a0bfaf"
                  fontSize="16"
                  opacity={mapRange(scene7Progress, 0.0, 0.18)}
                >
                  Foundation
                </text>

                {/* Income */}
                <rect
                  x="84"
                  y={400 - mapRange(scene7Progress, 0.18, 0.38, 0, 100)}
                  width="252"
                  height="100"
                  fill="#15452d"
                  stroke="#2f8158"
                  strokeWidth="1.6"
                  opacity={mapRange(scene7Progress, 0.18, 0.38)}
                  filter="url(#layerShadow)"
                  rx="10"
                />
                <line
                  x1="102"
                  y1={450 - mapRange(scene7Progress, 0.18, 0.38, 0, 100)}
                  x2="318"
                  y2={450 - mapRange(scene7Progress, 0.18, 0.38, 0, 100)}
                  stroke="#5d9f80"
                  strokeWidth="0.9"
                  opacity={mapRange(scene7Progress, 0.26, 0.42, 0, 0.32)}
                />
                <text
                  x="210"
                  y={456 - mapRange(scene7Progress, 0.18, 0.38, 0, 100)}
                  textAnchor="middle"
                  fill="#a0bfaf"
                  fontSize="16"
                  opacity={mapRange(scene7Progress, 0.18, 0.38)}
                >
                  Income
                </text>

                {/* Growth */}
                <rect
                  x="100"
                  y={255 - mapRange(scene7Progress, 0.38, 0.58, 0, 116)}
                  width="220"
                  height="116"
                  fill="url(#growthGradient)"
                  stroke="#2f8158"
                  strokeWidth="1.6"
                  opacity={mapRange(scene7Progress, 0.38, 0.58)}
                  filter="url(#layerShadow)"
                  rx="12"
                />
                <text
                  x="210"
                  y={318 - mapRange(scene7Progress, 0.38, 0.58, 0, 116)}
                  textAnchor="middle"
                  fill="#b4d1c2"
                  fontSize="16"
                  opacity={mapRange(scene7Progress, 0.38, 0.58)}
                >
                  Growth
                </text>

                {/* Adaptive */}
                <rect
                  x="116"
                  y={95 - mapRange(scene7Progress, 0.58, 0.78, 0, 82)}
                  width="188"
                  height="82"
                  fill="#1a5f3f"
                  stroke="#4c9c74"
                  strokeWidth="1.6"
                  opacity={mapRange(scene7Progress, 0.58, 0.78)}
                  filter="url(#layerShadow)"
                  rx="14"
                />
                <rect
                  x="123"
                  y={102 - mapRange(scene7Progress, 0.58, 0.78, 0, 82)}
                  width="174"
                  height="68"
                  fill="none"
                  stroke="#72b692"
                  strokeWidth="0.7"
                  opacity={mapRange(scene7Progress, 0.68, 0.84, 0, 0.30)}
                  rx="12"
                />
                <text
                  x="210"
                  y={142 - mapRange(scene7Progress, 0.58, 0.78, 0, 82)}
                  textAnchor="middle"
                  fill="#d1efe0"
                  fontSize="16"
                  opacity={mapRange(scene7Progress, 0.58, 0.78)}
                >
                  Adaptive
                </text>

                <line
                  x1="116"
                  y1="58"
                  x2="304"
                  y2="58"
                  stroke="#6fb08e"
                  strokeWidth="1"
                  opacity={mapRange(scene7Progress, 0.84, 1, 0, 0.5)}
                />
              </svg>
            </div>
          </div>
        </div>

        {/* SCENE 8 — SYSTEM ABSORBS STRESS */}
        <div className="sticky top-0 flex h-screen w-full items-center justify-center px-8">
          <div
            className="relative flex h-[720px] w-full max-w-5xl items-center justify-center"
            style={{
              opacity: stressSceneOpacity,
            }}
          >
            {/* Lifestyle label / close loop */}
            <div
              className="absolute top-6 text-center"
              style={{
                opacity: scene8Progress > 0.10 ? 1 : 0,
              }}
            >
              <p
                className="mb-2 text-3xl text-white/70 md:text-5xl"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Lifestyle
              </p>

              <div
                className="mx-auto mt-2 h-28 w-28 rounded-full"
                style={{
                  opacity: finalLifestyleGlowOpacity,
                  background:
                    'radial-gradient(circle, rgba(120,210,255,0.30) 0%, rgba(120,210,255,0.14) 40%, rgba(120,210,255,0.00) 76%)',
                  filter: 'blur(8px)',
                  transform: `scale(${1 + finalLifestyleGlowOpacity * 0.12})`,
                }}
              />
            </div>

            {/* Upward beam */}
            <div
              className="absolute top-[96px] h-[200px] w-[6px] rounded-full"
              style={{
                opacity:
                  scene8Progress > 0.52
                    ? Math.min((scene8Progress - 0.52) / 0.10, 1)
                    : 0,
                background:
                  'linear-gradient(to bottom, rgba(120,210,255,0), rgba(120,210,255,0.95), rgba(120,210,255,0.18), rgba(120,210,255,0))',
                boxShadow:
                  '0 0 28px rgba(120,210,255,0.50), 0 0 56px rgba(120,210,255,0.22)',
                transform: `scaleY(${
                  scene8Progress > 0.62
                    ? 1 + Math.sin(scene8Progress * 22) * 0.05
                    : 1
                })`,
              }}
            />

            {/* Orb moving upward */}
            <div
              className="absolute left-1/2 -translate-x-1/2 rounded-full"
              style={{
                width: '20px',
                height: '20px',
                opacity: scene8Progress > 0.54 ? 1 : 0,
                background:
                  'radial-gradient(circle, rgba(150,225,255,1) 0%, rgba(120,210,255,0.82) 45%, rgba(120,210,255,0) 72%)',
                boxShadow: '0 0 34px rgba(120,210,255,0.7)',
                top: `${
                  scene8Progress < 0.54
                    ? 404
                    : 404 - Math.min((scene8Progress - 0.54) / 0.22, 1) * 225
                }px`,
              }}
            />

            {/* Stress wave 1 */}
            <div
              className="absolute left-[2%] top-1/2 h-[300px] w-[360px] -translate-y-1/2 rounded-full"
              style={{
                opacity:
                  scene8Progress > 0.10 && scene8Progress < 0.72 ? 0.42 : 0,
                background:
                  'radial-gradient(circle at 28% 50%, rgba(170,185,205,0.34), rgba(130,150,170,0.18) 38%, rgba(130,150,170,0.04) 58%, transparent 76%)',
                transform: `translateX(${scene8Progress * 460}px) translateY(-50%)`,
                filter: 'blur(22px)',
              }}
            />

            {/* Stress wave 2 */}
            <div
              className="absolute left-[-2%] top-1/2 h-[220px] w-[260px] -translate-y-1/2 rounded-full"
              style={{
                opacity:
                  scene8Progress > 0.18 && scene8Progress < 0.62 ? 0.22 : 0,
                background:
                  'radial-gradient(circle at 30% 50%, rgba(180,195,215,0.22), rgba(140,160,180,0.06) 44%, transparent 74%)',
                transform: `translateX(${scene8Progress * 390}px) translateY(-50%)`,
                filter: 'blur(16px)',
              }}
            />

            {/* System stack */}
            <div
              className="relative flex flex-col items-center gap-4"
              style={{ opacity: stressSystemOpacity }}
            >
              <div
                className="h-[78px] w-[180px] rounded-[12px] border border-emerald-700/70 bg-emerald-900/60"
                style={{
                  transform: `translateX(${
                    scene8Progress > 0.28
                      ? Math.sin(scene8Progress * 18) * 6
                      : 0
                  }px) rotate(${
                    scene8Progress > 0.28
                      ? Math.sin(scene8Progress * 11) * 0.4
                      : 0
                  }deg)`,
                  boxShadow:
                    '0 8px 24px rgba(19, 79, 57, 0.22), inset 0 1px 0 rgba(130,220,180,0.16)',
                }}
              />

              <div
                className="h-[104px] w-[198px] rounded-[10px] border border-emerald-700/70"
                style={{
                  background:
                    'linear-gradient(to top, rgba(19,73,45,0.82), rgba(37,102,68,0.82))',
                  transform: `translateX(${
                    scene8Progress > 0.26
                      ? -Math.sin(scene8Progress * 12) * 4
                      : 0
                  }px) scaleY(${scene8Progress > 0.30 ? 0.972 : 1})`,
                  boxShadow:
                    '0 8px 24px rgba(19, 79, 57, 0.22), inset 0 1px 0 rgba(130,220,180,0.14)',
                }}
              />

              <div
                className="relative h-[88px] w-[222px] overflow-hidden rounded-[8px] border border-emerald-700/70 bg-emerald-950/75"
                style={{
                  transform: `scaleX(${scene8Progress > 0.28 ? 0.986 : 1})`,
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
                    transform: `translateX(${
                      scene8Progress > 0.20
                        ? (scene8Progress - 0.20) * 300
                        : -300
                    }px)`,
                    opacity:
                      scene8Progress > 0.20 && scene8Progress < 0.80 ? 1 : 0,
                  }}
                />
              </div>

              <div
                className="h-[126px] w-[246px] rounded-[6px] border border-emerald-700/80 bg-[#0d3a24]"
                style={{
                  transform: `translateY(${
                    scene8Progress > 0.24
                      ? Math.sin(scene8Progress * 8) * 2.5
                      : 0
                  }px)`,
                  boxShadow:
                    '0 12px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(130,220,180,0.12)',
                }}
              />
            </div>

            {/* Message */}
            <div
              className="absolute bottom-8 px-8 text-center"
              style={{
                opacity: stressMessageOpacity,
                transform: `translateY(${(1 - Math.max(stressMessageOpacity, 0)) * 12}px)`,
              }}
            >
              <h2
                className="max-w-5xl text-3xl md:text-5xl"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                The system absorbs stress… so your life doesn’t have to.
              </h2>
            </div>
          </div>
        </div>

        {/* SCENE 9 — CLOSING */}
        <div className="sticky top-0 flex h-screen w-full items-center justify-center">
          <div
            className="max-w-4xl px-8 text-center text-4xl md:text-6xl"
            style={{
              fontFamily: 'Georgia, serif',
              opacity: getFadeInHoldOut(scene9Progress, 0.24, 0.82),
              transform: `translateY(${(1 - getFadeInHoldOut(scene9Progress, 0.24, 0.82)) * 18}px)`,
            }}
          >
            <p>A portfolio may recover.</p>
            <p className="mt-6">A system must endure.</p>
          </div>
        </div>

        {/* SCENE 10 — FINAL CTA */}
        <div className="sticky top-0 flex h-screen w-full items-center justify-center">
          <div
            className="px-8 text-center"
            style={{
              opacity: ctaOpacity,
              transform: `translateY(${(1 - ctaOpacity) * 24}px)`,
            }}
          >
            <a
              href="#"
              className="text-2xl underline underline-offset-8 decoration-white/55 transition-colors hover:decoration-white md:text-4xl"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Explore the Enduring Value Framework™
            </a>

            <p
              className="mt-5 text-sm uppercase text-white/45 md:text-base"
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
