'use client';

import * as React from 'react';
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

type CursorState = {
  label: string;
  setLabel: (label: string | null) => void;
  resetLabel: () => void;
};

const CursorContext = createContext<CursorState | null>(null);

export const DEFAULT_CURSOR_LABEL = 'Xerebo';

export function CursorProvider({
  children,
  defaultLabel = DEFAULT_CURSOR_LABEL,
}: {
  children: React.ReactNode;
  defaultLabel?: string;
}) {
  const [label, setLabelState] = useState(defaultLabel);
  const defaultRef = useRef(defaultLabel);
  defaultRef.current = defaultLabel;

  const setLabel = useCallback((next: string | null) => {
    setLabelState(next && next.trim() ? next : defaultRef.current);
  }, []);

  const resetLabel = useCallback(() => setLabelState(defaultRef.current), []);

  const value = useMemo<CursorState>(() => ({ label, setLabel, resetLabel }), [label, setLabel, resetLabel]);

  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
}

export function useCursor(): CursorState {
  const ctx = useContext(CursorContext);
  // Rendering outside the provider is allowed; the cursor simply stays idle.
  return (
    ctx ?? {
      label: DEFAULT_CURSOR_LABEL,
      setLabel: () => {},
      resetLabel: () => {},
    }
  );
}

/**
 * Spread onto any element to swap the cursor pill text while it is hovered.
 * Preferred over the wrapper component when the target already has layout
 * styles you do not want to nest inside another box.
 *
 *   <button {...useCursorTarget('Products')}>Products</button>
 */
export function useCursorTarget(label: string) {
  const { setLabel, resetLabel } = useCursor();

  return useMemo(
    () => ({
      onMouseEnter: () => setLabel(label),
      onMouseLeave: () => resetLabel(),
      onFocus: () => setLabel(label),
      onBlur: () => resetLabel(),
    }),
    [label, setLabel, resetLabel]
  );
}

/**
 * Wrapper form for markup where spreading handlers is awkward.
 */
export function CursorTarget({
  label,
  children,
  className,
  as: Tag = 'span',
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  as?: 'span' | 'div' | 'li';
}) {
  const handlers = useCursorTarget(label);
  return (
    <Tag className={className} {...handlers}>
      {children}
    </Tag>
  );
}
