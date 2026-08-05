'use client';

import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
} from 'framer-motion';
import { useCursor } from '@/components/site/cursor/CursorProvider';

/**
 * UserCursor — a custom cursor follower that replaces the OS cursor across the
 * whole site. An arrow glyph tracks the pointer with spring physics; a colored
 * label pill trails behind on a laggier spring, rocking with motion and scaling
 * while pressed.
 *
 * The layer is fixed to the viewport and `pointer-events: none`, so clicks pass
 * straight through. The pill text is driven by CursorProvider, so any element
 * can change it on hover via useCursorTarget(). Skipped on coarse-pointer
 * (touch) devices, where the native cursor is left alone.
 */

type ClassNames = {
  cursor?: string;
  arrow?: string;
  label?: string;
  labelText?: string;
};

type Props = {
  // Visual / content
  arrow?: React.ReactNode | ((color: string) => React.ReactNode);
  color?: string;
  textColor?: string;
  size?: number;
  labelTiltStrength?: number;

  // Behavior
  showLabel?: boolean;
  zIndex?: number;

  // Offsets
  offsetX?: number;
  offsetY?: number;
  labelOffsetUseDefault?: boolean;
  labelOffsetX?: number;
  labelOffsetY?: number;

  // Press feedback
  pressScale?: number;

  classNames?: ClassNames;
};

const COMPONENT_DEFAULTS = {
  color: '#FE7700',
  textColor: '#FFFFFF',
  size: 30,
  pressScale: 0.92,
  offsetX: 0,
  offsetY: 0,
  showLabel: true,
  labelTiltStrength: 25,
  labelOffsetUseDefault: true,
  labelOffsetX: 25,
  labelOffsetY: 12,
  zIndex: 9999,
} satisfies Required<
  Pick<
    Props,
    | 'color'
    | 'textColor'
    | 'size'
    | 'pressScale'
    | 'offsetX'
    | 'offsetY'
    | 'showLabel'
    | 'labelTiltStrength'
    | 'labelOffsetUseDefault'
    | 'labelOffsetX'
    | 'labelOffsetY'
    | 'zIndex'
  >
>;

export default function UserCursor(userProps: Props = {}) {
  const props = { ...COMPONENT_DEFAULTS, ...userProps };
  const {
    arrow,
    color,
    textColor,
    size,
    labelTiltStrength,
    showLabel,
    offsetX,
    offsetY,
    labelOffsetX,
    labelOffsetY,
    labelOffsetUseDefault,
    pressScale,
    zIndex,
    classNames,
  } = props;

  const { label } = useCursor();

  // --- touch detection -----------------------------------------------------
  const [isTouchDevice, setIsTouchDevice] = useState(true); // assume touch until proven otherwise
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia('(pointer: coarse)');
    const sync = () => setIsTouchDevice(!!mql.matches);
    sync();
    if (mql.addEventListener) {
      mql.addEventListener('change', sync);
      return () => mql.removeEventListener('change', sync);
    }
    const legacy = mql as MediaQueryList & {
      addListener?: (l: (e: MediaQueryListEvent) => void) => void;
      removeListener?: (l: (e: MediaQueryListEvent) => void) => void;
    };
    legacy.addListener?.(sync);
    return () => legacy.removeListener?.(sync);
  }, []);

  // Hide the native cursor document-wide only once a fine pointer is present.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (isTouchDevice) {
      root.classList.remove('xerebo-cursor');
      return;
    }
    root.classList.add('xerebo-cursor');
    return () => root.classList.remove('xerebo-cursor');
  }, [isTouchDevice]);

  // --- visible state -------------------------------------------------------
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  // Arrow is snappier; label trails.
  const arrowSpring = useMemo<SpringOptions>(() => ({ stiffness: 380, damping: 32, mass: 0.6 }), []);
  const labelSpringCfg = useMemo<SpringOptions>(() => ({ stiffness: 220, damping: 26, mass: 0.7 }), []);

  const resolvedOffset = useMemo(() => ({ x: offsetX, y: offsetY }), [offsetX, offsetY]);

  const resolvedLabelOffset = useMemo(() => {
    if (labelOffsetUseDefault) return { x: size * 0.9, y: size * 0.2 + 6 };
    return { x: labelOffsetX, y: labelOffsetY };
  }, [labelOffsetUseDefault, labelOffsetX, labelOffsetY, size]);

  // --- motion values -------------------------------------------------------
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  const arrowX = useSpring(mouseX, arrowSpring);
  const arrowY = useSpring(mouseY, arrowSpring);
  const labelX = useSpring(mouseX, labelSpringCfg);
  const labelY = useSpring(mouseY, labelSpringCfg);

  const scaleMV = useMotionValue(1);
  useEffect(() => {
    const controls = animate(scaleMV, pressed ? pressScale : 1, {
      type: 'spring',
      stiffness: 500,
      damping: 28,
      mass: 0.5,
    });
    return () => controls.stop();
  }, [pressed, pressScale, scaleMV]);

  // Tilt derived from velocity, capped at ±labelTiltStrength, signed by the
  // horizontal component so the pill rocks as the cursor reverses direction.
  const labelTiltTarget = useMotionValue(0);
  const labelRotation = useSpring(labelTiltTarget, { stiffness: 200, damping: 24, mass: 0.6 });

  // --- pointer listeners ---------------------------------------------------
  const lastSampleRef = useRef<{ x: number; y: number; t: number } | null>(null);

  useEffect(() => {
    if (isTouchDevice || typeof window === 'undefined') return;

    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
      const last = lastSampleRef.current;
      let vx = 0;
      let vy = 0;
      if (last) {
        const dt = Math.max(1, now - last.t); // ms, avoid div-by-zero
        vx = ((x - last.x) / dt) * 1000; // px/sec
        vy = ((y - last.y) / dt) * 1000;
      }
      lastSampleRef.current = { x, y, t: now };

      mouseX.set(x + resolvedOffset.x);
      mouseY.set(y + resolvedOffset.y);

      const speed = Math.hypot(vx, vy);
      const norm = Math.min(1, speed / 1500);
      const sign = vx === 0 ? 0 : vx > 0 ? 1 : -1;
      labelTiltTarget.set(sign * norm * labelTiltStrength);

      setHovering(true);
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    // Leaving the window (not just crossing between elements) hides the cursor.
    const onDocLeave = (e: MouseEvent) => {
      if (e.relatedTarget === null) {
        setHovering(false);
        lastSampleRef.current = null;
        labelTiltTarget.set(0);
      }
    };
    const onBlur = () => {
      setHovering(false);
      setPressed(false);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseout', onDocLeave);
    window.addEventListener('blur', onBlur);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseout', onDocLeave);
      window.removeEventListener('blur', onBlur);
      setPressed(false);
    };
  }, [isTouchDevice, labelTiltStrength, resolvedOffset.x, resolvedOffset.y, mouseX, mouseY, labelTiltTarget]);

  // --- transform composition ----------------------------------------------
  const labelTranslateX = useTransform(labelX, (v) => v + resolvedLabelOffset.x);
  const labelTranslateY = useTransform(labelY, (v) => v + resolvedLabelOffset.y);

  // --- arrow content -------------------------------------------------------
  const arrowContent: React.ReactNode = useMemo(() => {
    if (typeof arrow === 'function') {
      try {
        return (arrow as (c: string) => React.ReactNode)(color);
      } catch {
        return null;
      }
    }
    if (arrow !== undefined && arrow !== null) return arrow as React.ReactNode;
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', overflow: 'visible' }}
      >
        <path
          d="M5 3 L23 14 L14 16 L11 24 Z"
          fill={color}
          stroke="rgba(0,0,0,0.18)"
          strokeWidth={0.6}
          strokeLinejoin="round"
        />
      </svg>
    );
  }, [arrow, color, size]);

  if (isTouchDevice) return null;

  const layerStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    pointerEvents: 'none',
    zIndex,
  };

  return (
    <div style={layerStyle} aria-hidden="true">
      {/* Label trails behind, rendered first so the arrow tip stays on top. */}
      {showLabel && (
        <motion.div
          className={classNames?.label}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            x: labelTranslateX,
            y: labelTranslateY,
            rotate: labelRotation,
            scale: scaleMV,
            background: color,
            borderRadius: 999,
            padding: `${size * 0.18}px ${size * 0.36}px`,
            boxShadow: '0 4px 12px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
            opacity: hovering ? 1 : 0,
            transformOrigin: '0% 50%',
            transition: 'opacity 140ms ease',
            willChange: 'transform, opacity',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.14 }}
              className={classNames?.labelText}
              style={{
                color: textColor,
                fontSize: Math.max(7, size * 0.43),
                lineHeight: 1.1,
                fontWeight: 600,
                fontFamily: 'var(--font-secondary), system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
                whiteSpace: 'nowrap',
                letterSpacing: 0.1,
              }}
            >
              {label}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      <motion.div
        className={classNames?.cursor}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          x: arrowX,
          y: arrowY,
          scale: scaleMV,
          width: size,
          height: size,
          opacity: hovering ? 1 : 0,
          transformOrigin: '0% 0%', // anchor at arrow tip
          transition: 'opacity 140ms ease',
          willChange: 'transform, opacity',
          pointerEvents: 'none',
        }}
      >
        <div className={classNames?.arrow} style={{ width: size, height: size }}>
          {arrowContent}
        </div>
      </motion.div>
    </div>
  );
}
