'use client';

import { useEffect, useRef } from 'react';

/**
 * ReactiveLines — a canvas fan of curved lines whose count and bias follow the
 * pointer. Renders as an absolutely positioned background layer inside a
 * `position: relative` host.
 *
 * The loop is paused when the host scrolls out of view or the tab is hidden.
 */

type Vec = { x: number; y: number };
const vec = (x: number, y: number): Vec => ({ x, y });
const vecAdd = (a: Vec, b: Vec): Vec => ({ x: a.x + b.x, y: a.y + b.y });
const vecSub = (a: Vec, b: Vec): Vec => ({ x: a.x - b.x, y: a.y - b.y });
const vecMult = (a: Vec, s: number): Vec => ({ x: a.x * s, y: a.y * s });
const vecLerp = (a: Vec, b: Vec, t: number): Vec => ({
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
});
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, mn: number, mx: number) => Math.max(mn, Math.min(mx, v));
const map = (v: number, a: number, b: number, c: number, d: number) => ((v - a) / (b - a)) * (d - c) + c;

function toRGB(str: string): { r: number; g: number; b: number } {
  if (str) {
    const m = str.match(/rgba?\(([^)]+)\)/);
    if (m) {
      const p = m[1].split(',').map((s) => parseFloat(s));
      return { r: p[0] || 0, g: p[1] || 0, b: p[2] || 0 };
    }
    const hex = str.replace('#', '');
    if (hex.length >= 6)
      return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16),
      };
    if (hex.length === 3)
      return {
        r: parseInt(hex[0] + hex[0], 16),
        g: parseInt(hex[1] + hex[1], 16),
        b: parseInt(hex[2] + hex[2], 16),
      };
  }
  return { r: 255, g: 255, b: 255 };
}

interface CanvasState {
  width: number;
  height: number;
  dpr: number;
  isVisible: boolean;
  isPageVisible: boolean;
  animationId: number;
}

function useCanvasAnimation({
  deferStart = false,
  onSetup,
  onDraw,
}: {
  deferStart?: boolean;
  onSetup?: (ctx: CanvasRenderingContext2D, state: CanvasState) => void;
  onDraw: (ctx: CanvasRenderingContext2D, state: CanvasState) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<CanvasState>({
    width: 0,
    height: 0,
    dpr: 1,
    isVisible: true,
    isPageVisible: true,
    animationId: 0,
  });

  const onDrawRef = useRef(onDraw);
  onDrawRef.current = onDraw;
  const onSetupRef = useRef(onSetup);
  onSetupRef.current = onSetup;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const st = stateRef.current;

    const setup = () => {
      // Cap DPR at 2 — beyond that the extra pixels cost more than they show.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = container.getBoundingClientRect();
      st.width = rect.width;
      st.height = rect.height;
      st.dpr = dpr;
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const loop = () => {
      onDrawRef.current(ctx, st);
      st.animationId = requestAnimationFrame(loop);
    };

    const start = () => {
      if (!st.animationId && st.isVisible && st.isPageVisible) {
        st.animationId = requestAnimationFrame(loop);
      }
    };

    const stop = () => {
      if (st.animationId) {
        cancelAnimationFrame(st.animationId);
        st.animationId = 0;
      }
    };

    setup();
    onSetupRef.current?.(ctx, st);
    // Always paint one frame so the canvas is never an empty black rect
    // (the 2d context is opaque) before the first pointer move.
    onDrawRef.current(ctx, st);

    if (!deferStart) start();

    let debTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(debTimer);
      debTimer = setTimeout(() => {
        stop();
        setup();
        onDrawRef.current(ctx, st);
        start();
      }, 100);
    };

    const onPageVis = () => {
      st.isPageVisible = document.visibilityState === 'visible';
      if (st.isPageVisible) start();
      else stop();
    };

    const io = new IntersectionObserver(
      (entries) => {
        st.isVisible = entries[0]?.isIntersecting ?? true;
        if (st.isVisible && st.isPageVisible) start();
        else stop();
      },
      { threshold: 0 }
    );

    io.observe(container);
    window.addEventListener('resize', onResize, { passive: true });
    document.addEventListener('visibilitychange', onPageVis);

    (canvas as HTMLCanvasElement & { __canvasStart?: () => void }).__canvasStart = start;

    return () => {
      stop();
      clearTimeout(debTimer);
      io.disconnect();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onPageVis);
    };
  }, [deferStart]);

  return { containerRef, canvasRef, stateRef };
}

interface ReactiveLinesProps {
  backgroundColor?: string;
  lineColor?: string;
  lineWidth?: number;
  minLines?: number;
  maxLines?: number;
  fade?: boolean;
  fadeIntensity?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function ReactiveLines({
  style,
  className,
  backgroundColor = '#FFFFFF',
  lineColor = 'rgba(26, 23, 23, 0.26)',
  lineWidth = 0.8,
  minLines = 108,
  maxLines = 15,
  fade = true,
  fadeIntensity = 8,
}: ReactiveLinesProps) {
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const cfgRef = useRef({ linesNum: 40, bias: 0.5 });

  const { containerRef, canvasRef, stateRef } = useCanvasAnimation({
    onSetup: (_ctx, state) => {
      mouseRef.current.targetX = state.width / 2;
      mouseRef.current.targetY = state.height / 2;
      mouseRef.current.x = state.width / 2;
      mouseRef.current.y = state.height / 2;
    },

    onDraw: (ctx, state) => {
      const { width: w, height: h } = state;
      const mouse = mouseRef.current;
      const cfg = cfgRef.current;

      mouse.x = mouse.x + (mouse.targetX - mouse.x) * 0.05;
      mouse.y = mouse.y + (mouse.targetY - mouse.y) * 0.1;

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.translate(w / 2, h / 2);

      const narrow = w < 500;
      const rise = narrow ? 0.8 * h : 0;
      const curveExp = narrow ? 1.5 : 0.7;

      const anchor = vec(w, -(1.1 * h) + rise);
      const base = vec(0, 2 * h);
      const tail = vec(-w, -h + rise);

      const lo = Math.min(minLines, maxLines);
      const hi = Math.max(minLines, maxLines);
      const targetCount = clamp(map(mouse.y, 0, h, lo, hi), lo, hi);
      cfg.linesNum = lerp(cfg.linesNum, targetCount, 0.1);

      const targetBias = clamp(map(mouse.x, 0, w, 0.6, 0.4), 0.4, 0.6);
      cfg.bias = lerp(cfg.bias, targetBias, 0.05);

      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineWidth;

      const drawCurve = (from: Vec, to: Vec, pull: Vec, bias: number, exp: number) => {
        const mid = vecLerp(from, to, 0.5);
        const offset = vecSub(pull, mid);

        ctx.beginPath();
        for (let i = 0; i <= 50; i++) {
          const t = i / 50;
          const point = vecLerp(from, to, t);
          const weight = 2 * Math.pow(t, exp * (1 - bias) * 2) * Math.pow(1 - t, exp * bias * 2);
          const curved = vecAdd(point, vecMult(offset, weight));
          if (i === 0) ctx.moveTo(curved.x, curved.y);
          else ctx.lineTo(curved.x, curved.y);
        }
        ctx.stroke();
      };

      for (let i = 0; i < cfg.linesNum; i++) {
        const t = i / (cfg.linesNum - 1);
        const lineEnd = vec(lerp(base.x, tail.x, 1 - t * t), lerp(base.y, tail.y, 1 - t * t));
        const mid = vecAdd(vecMult(anchor, 0.5), vecMult(lineEnd, 0.5));
        const pull = vecMult(vecAdd(base, mid), 0.5);
        drawCurve(anchor, lineEnd, pull, cfg.bias, curveExp);
      }

      ctx.restore();

      if (fade) {
        const bg = toRGB(backgroundColor);
        const rgba = (alpha: number) => `rgba(${bg.r}, ${bg.g}, ${bg.b}, ${alpha})`;
        const inner = clamp(map(fadeIntensity, 1, 50, 0.82, 0.25), 0.25, 0.82);
        const maxA = clamp(map(fadeIntensity, 1, 50, 0.35, 0.9), 0.35, 0.9);

        ctx.save();
        const cx = w / 2;
        const cy = h / 2;
        const r = Math.max(w, h) / 2;
        ctx.translate(cx, cy);
        ctx.scale(w / (2 * r), h / (2 * r));

        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
        grad.addColorStop(0, rgba(0));
        grad.addColorStop(inner, rgba(0));
        grad.addColorStop(lerp(inner, 1, 0.5), rgba(maxA * 0.3));
        grad.addColorStop(lerp(inner, 1, 0.8), rgba(maxA * 0.7));
        grad.addColorStop(1, rgba(maxA));
        ctx.fillStyle = grad;
        ctx.fillRect(-r, -r, 2 * r, 2 * r);
        ctx.restore();
      }
    },
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let rect = el.getBoundingClientRect();

    const onMove = (ev: MouseEvent) => {
      if (!stateRef.current.isVisible) return;
      mouseRef.current.targetX = ev.clientX - rect.left;
      mouseRef.current.targetY = ev.clientY - rect.top;
    };

    let rafId = 0;
    const remeasure = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rect = el.getBoundingClientRect();
        rafId = 0;
      });
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', remeasure, { passive: true });
    window.addEventListener('resize', remeasure, { passive: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', remeasure);
      window.removeEventListener('resize', remeasure);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [containerRef, stateRef]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={className}
      style={{
        ...style,
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
}
