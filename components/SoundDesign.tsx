'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* ══════════════════════════════════════════════════════════════
   PROCEDURAL AUDIO — no audio files required
   All sounds are synthesized via the Web Audio API
   ══════════════════════════════════════════════════════════════ */

/* ── Brown noise buffer (4-second loopable) ── */
function buildBrownNoise(ctx: AudioContext, seconds = 4): AudioBuffer {
  const len = ctx.sampleRate * seconds;
  const buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      d[i] = (last + 0.02 * w) / 1.02;
      last = d[i];
      d[i] *= 3.5;
    }
  }
  return buf;
}

/* ── Forest ambience: looping brown noise + wind LFO ── */
function startAmbience(
  ctx: AudioContext,
  master: GainNode,
): () => void {
  const noiseBuf = buildBrownNoise(ctx, 8);

  const src = ctx.createBufferSource();
  src.buffer = noiseBuf;
  src.loop = true;

  // Low-pass to sound like wind / distant foliage
  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 700;

  // High-pass to cut sub-rumble
  const hp = ctx.createBiquadFilter();
  hp.type = 'highpass';
  hp.frequency.value = 45;

  // Ambience gain (fade in slowly)
  const ambiGain = ctx.createGain();
  ambiGain.gain.setValueAtTime(0, ctx.currentTime);
  ambiGain.gain.linearRampToValueAtTime(0.055, ctx.currentTime + 3);

  // Wind LFO — very slow swell
  const lfo = ctx.createOscillator();
  lfo.type = 'sine';
  lfo.frequency.value = 0.07;
  const lfoAmt = ctx.createGain();
  lfoAmt.gain.value = 0.02;
  lfo.connect(lfoAmt);
  lfoAmt.connect(ambiGain.gain);

  // Second, slightly detuned layer for richness
  const src2 = ctx.createBufferSource();
  src2.buffer = noiseBuf;
  src2.loop = true;
  src2.loopStart = 1.3;
  const lp2 = ctx.createBiquadFilter();
  lp2.type = 'lowpass';
  lp2.frequency.value = 500;
  const ambiGain2 = ctx.createGain();
  ambiGain2.gain.setValueAtTime(0, ctx.currentTime);
  ambiGain2.gain.linearRampToValueAtTime(0.025, ctx.currentTime + 4);

  src.connect(lp).connect(hp).connect(ambiGain).connect(master);
  src2.connect(lp2).connect(ambiGain2).connect(master);

  src.start();
  src2.start();
  lfo.start();

  // Return stop function
  return () => {
    try {
      const t = ctx.currentTime;
      ambiGain.gain.setValueAtTime(ambiGain.gain.value, t);
      ambiGain2.gain.setValueAtTime(ambiGain2.gain.value, t);
      ambiGain.gain.linearRampToValueAtTime(0, t + 0.8);
      ambiGain2.gain.linearRampToValueAtTime(0, t + 0.8);
      setTimeout(() => {
        try { src.stop(); src2.stop(); lfo.stop(); } catch {}
      }, 900);
    } catch {}
  };
}

/* ── Herb rustle: short burst of band-passed noise ── */
function playRustle(ctx: AudioContext, master: GainNode, intensity = 1) {
  const frames = Math.floor(ctx.sampleRate * 0.22);
  const buf = ctx.createBuffer(1, frames, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < frames; i++) d[i] = Math.random() * 2 - 1;

  const src = ctx.createBufferSource();
  src.buffer = buf;

  // Band-pass to isolate "leaf rustling" frequency band
  const bp1 = ctx.createBiquadFilter();
  bp1.type = 'bandpass';
  bp1.frequency.value = 3200;
  bp1.Q.value = 0.7;

  const bp2 = ctx.createBiquadFilter();
  bp2.type = 'bandpass';
  bp2.frequency.value = 1800;
  bp2.Q.value = 1.2;

  const gain = ctx.createGain();
  const peak = 0.055 * intensity;
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(peak, ctx.currentTime + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22);

  // Subtle pitch modulation via detune
  src.detune.value = (Math.random() - 0.5) * 400;

  src.connect(bp1).connect(gain).connect(master);

  // second softer layer thickens the rustle
  const src2 = ctx.createBufferSource();
  src2.buffer = buf;
  const gain2 = ctx.createGain();
  gain2.gain.setValueAtTime(0, ctx.currentTime);
  gain2.gain.linearRampToValueAtTime(peak * 0.4, ctx.currentTime + 0.025);
  gain2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
  src2.connect(bp2).connect(gain2).connect(master);

  src.start();
  src2.start();
}

/* ── Soft chime: pentatonic sine tones + shimmer harmonics ── */
// G major pentatonic across two octaves
const CHIME_FREQS = [783.99, 987.77, 1174.66, 1318.51, 1567.98, 659.25, 880.0];

function playChime(ctx: AudioContext, master: GainNode, idx: number) {
  const freq = CHIME_FREQS[idx % CHIME_FREQS.length];
  const t = ctx.currentTime;

  // Fundamental
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.value = freq;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(0.13, t + 0.015);
  g.gain.setValueAtTime(0.13, t + 0.05);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 2.8);

  // 2nd harmonic (thin bell shimmer)
  const osc2 = ctx.createOscillator();
  osc2.type = 'sine';
  osc2.frequency.value = freq * 2.756; // slightly inharmonic for bell quality
  const g2 = ctx.createGain();
  g2.gain.setValueAtTime(0, t);
  g2.gain.linearRampToValueAtTime(0.045, t + 0.015);
  g2.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);

  // Sub octave for warmth
  const osc3 = ctx.createOscillator();
  osc3.type = 'sine';
  osc3.frequency.value = freq * 0.5;
  const g3 = ctx.createGain();
  g3.gain.setValueAtTime(0, t);
  g3.gain.linearRampToValueAtTime(0.06, t + 0.02);
  g3.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);

  // Short echo (delay)
  const delay = ctx.createDelay(1);
  delay.delayTime.value = 0.28;
  const delayGain = ctx.createGain();
  delayGain.gain.value = 0.22;
  const delayFeedbackGain = ctx.createGain();
  delayFeedbackGain.gain.value = 0.18;
  delay.connect(delayGain).connect(master);
  delay.connect(delayFeedbackGain).connect(delay); // subtle feedback

  // Subtle reverb via convolver (short IR built from noise)
  const iLen = Math.floor(ctx.sampleRate * 0.9);
  const irBuf = ctx.createBuffer(2, iLen, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const ir = irBuf.getChannelData(ch);
    for (let i = 0; i < iLen; i++) {
      ir[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / iLen, 2.5);
    }
  }
  const conv = ctx.createConvolver();
  conv.buffer = irBuf;
  const convGain = ctx.createGain();
  convGain.gain.value = 0.18;

  osc.connect(g).connect(master);
  osc2.connect(g2).connect(master);
  osc3.connect(g3).connect(master);
  g.connect(delay);
  g.connect(conv).connect(convGain).connect(master);

  osc.start(t); osc.stop(t + 3);
  osc2.start(t); osc2.stop(t + 2);
  osc3.start(t); osc3.stop(t + 2.2);
}

/* ══════════════════════════════════════════════════════════════
   COMPONENT
   ══════════════════════════════════════════════════════════════ */

type SoundState = 'off' | 'on' | 'muted';

export default function SoundDesign() {
  const [state, setState] = useState<SoundState>('off');
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const stopAmbienceRef = useRef<(() => void) | null>(null);
  const lastRustleRef = useRef<number>(0);
  const chimesFiredRef = useRef<Set<number>>(new Set());

  /* ── Boot audio on first enable click ── */
  const enable = useCallback(() => {
    if (ctxRef.current) return;

    const ctx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const master = ctx.createGain();
    master.gain.value = 0.9;
    master.connect(ctx.destination);

    ctxRef.current = ctx;
    masterRef.current = master;

    stopAmbienceRef.current = startAmbience(ctx, master);
    setState('on');
  }, []);

  /* ── Mute / unmute ── */
  const toggleMute = useCallback(() => {
    if (!masterRef.current || !ctxRef.current) return;
    setState((prev) => {
      if (prev === 'on') {
        masterRef.current!.gain.linearRampToValueAtTime(0, ctxRef.current!.currentTime + 0.3);
        return 'muted';
      } else {
        masterRef.current!.gain.linearRampToValueAtTime(0.9, ctxRef.current!.currentTime + 0.3);
        return 'on';
      }
    });
  }, []);

  /* ── Scroll — herb rustle ── */
  useEffect(() => {
    const onScroll = () => {
      if (state !== 'on' || !ctxRef.current || !masterRef.current) return;
      const now = performance.now();
      if (now - lastRustleRef.current < 220) return; // throttle
      lastRustleRef.current = now;

      // Vary intensity slightly with scroll velocity
      const intensity = 0.6 + Math.random() * 0.7;
      playRustle(ctxRef.current, masterRef.current, intensity);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [state]);

  /* ── GSAP ScrollTrigger — chime per ingredient card ── */
  useEffect(() => {
    if (state !== 'on') return;

    gsap.registerPlugin(ScrollTrigger);

    const cards = document.querySelectorAll('.ingredient-card-item');
    const triggers: ScrollTrigger[] = [];

    cards.forEach((card, idx) => {
      const st = ScrollTrigger.create({
        trigger: card,
        start: 'top 82%',
        onEnter: () => {
          if (!ctxRef.current || !masterRef.current) return;
          if (chimesFiredRef.current.has(idx)) return;
          chimesFiredRef.current.add(idx);

          // Stagger chimes slightly
          setTimeout(() => {
            if (ctxRef.current && masterRef.current) {
              playChime(ctxRef.current, masterRef.current, idx);
            }
          }, idx * 160);
        },
      });
      triggers.push(st);
    });

    return () => triggers.forEach((t) => t.kill());
  }, [state]);

  /* ── Set CSS custom properties on eq bars after mount ── */
  useEffect(() => {
    if (state !== 'on') return;
    const HEIGHTS = [0.6, 1, 0.75, 0.9, 0.55];
    const bars = document.querySelectorAll<HTMLElement>('.eq-bar');
    bars.forEach((bar, i) => {
      bar.style.setProperty('--eq-h', `${HEIGHTS[i] * 14}px`);
      bar.style.setProperty('--eq-dur', `${0.6 + i * 0.1}s`);
      bar.style.setProperty('--eq-delay', `${i * 0.08}s`);
    });
  }, [state]);

  /* ── Cleanup on unmount ── */
  useEffect(() => {
    return () => {
      stopAmbienceRef.current?.();
      ctxRef.current?.close();
    };
  }, []);

  /* ══════════════════════════════════════════
     UI — floating button (bottom-left)
     ══════════════════════════════════════════ */
  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2">
      {/* Tooltip label */}
      {state === 'off' && (
        <span className="text-[10px] font-sans text-cream/40 tracking-[0.18em] uppercase ml-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
          Sound
        </span>
      )}

      {/* Main button */}
      <button
        onClick={state === 'off' ? enable : toggleMute}
        aria-label={
          state === 'off' ? 'Enable sound' : state === 'on' ? 'Mute sound' : 'Unmute sound'
        }
        className="group relative flex items-center justify-center w-11 h-11 transition-all duration-300"
      >
        {/* Pulsing ring when on */}
        {state === 'on' && (
          <>
            <span className="absolute inset-0 rounded-full border border-gold-500/30 animate-ping [animation-duration:2.5s]" />
            <span className="absolute inset-0 rounded-full border border-gold-500/20 animate-ping [animation-duration:3.5s] [animation-delay:0.8s]" />
          </>
        )}

        {/* Button face */}
        <div
          className={`relative w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
            state === 'on'
              ? 'bg-forest-800/90 border border-gold-500/50 shadow-[0_0_16px_rgba(255,255,255,0.18)]'
              : state === 'muted'
              ? 'bg-forest-900/80 border border-forest-700/60'
              : 'bg-forest-900/70 border border-forest-700/40 hover:border-gold-500/30'
          } backdrop-blur-md`}
        >
          {state === 'off' && <IconSoundOff />}
          {state === 'on' && <IconSoundOn />}
          {state === 'muted' && <IconMuted />}
        </div>

        {/* Active equaliser bars */}
        {state === 'on' && (
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-end gap-[2px] h-4">
            {[0.6, 1, 0.75, 0.9, 0.55].map((h, i) => (
              <span
                key={i}
                className="w-[2px] bg-gold-500/60 rounded-full eq-bar"
                data-h={h}
                data-i={i}
              />
            ))}
          </div>
        )}
      </button>

      {/* Inline keyframes for eq bars */}
      <style>{`
        @keyframes eqBar {
          from { transform: scaleY(0.35); opacity: 0.45; }
          to   { transform: scaleY(1);    opacity: 0.85; }
        }
        .eq-bar { animation: eqBar var(--eq-dur, 0.6s) ease-in-out infinite alternate; animation-delay: var(--eq-delay, 0s); height: var(--eq-h, 8px); }
      `}</style>
    </div>
  );
}

/* ── Icon sub-components ── */
function IconSoundOff() {
  return (
    <svg className="w-5 h-5 text-cream/35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M11 5L6 9H2v6h4l5 4V5z" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="23" y1="9" x2="17" y2="15" strokeLinecap="round" />
      <line x1="17" y1="9" x2="23" y2="15" strokeLinecap="round" />
    </svg>
  );
}

function IconSoundOn() {
  return (
    <svg className="w-5 h-5 text-gold-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M11 5L6 9H2v6h4l5 4V5z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" strokeLinecap="round" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" strokeLinecap="round" />
    </svg>
  );
}

function IconMuted() {
  return (
    <svg className="w-5 h-5 text-cream/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M11 5L6 9H2v6h4l5 4V5z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" strokeLinecap="round" strokeDasharray="2 2" />
    </svg>
  );
}
