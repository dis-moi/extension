'use client';

import React, { useId, useState } from 'react';
import { shortDate, number, shortNumber } from './format';

// One series per chart, hence one hue and no legend. For several measures,
// small multiples each keeping their own scale: putting badge displays and
// outbound clicks on the same axis would flatten the second, and a second
// axis would be worse still.

export interface Point {
  readonly day: string;
  readonly value: number;
}

const ACCENT = '#1552b4';

const plot = (
  points: ReadonlyArray<Point>,
  width: number,
  height: number,
  topMargin: number,
  leftMargin: number,
) => {
  const max = Math.max(...points.map((point) => point.value), 1);
  const step = (width - leftMargin) / Math.max(points.length - 1, 1);

  const placed = points.map((point, i) => ({
    ...point,
    x: leftMargin + i * step,
    y: topMargin + (height - topMargin) * (1 - point.value / max),
  }));

  const line = placed
    .map(
      (place, i) =>
        `${i === 0 ? 'M' : 'L'}${place.x.toFixed(1)} ${place.y.toFixed(1)}`,
    )
    .join(' ');

  const last = placed[placed.length - 1];
  const first = placed[0];
  const area =
    last === undefined || first === undefined
      ? ''
      : `${line} L${last.x.toFixed(1)} ${height} L${first.x.toFixed(1)} ${height} Z`;

  return { line, area, placed, max };
};

export const Curve = ({
  points,
  description,
}: {
  readonly points: ReadonlyArray<Point>;
  readonly description: string;
}) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const titleId = useId();

  const WIDTH = 1160;
  const HEIGHT = 220;
  const { line, area, placed, max } = plot(points, 1150, 196, 12, 46);

  const gridLines = [0, 1, 2, 3].map((i) => {
    const y = 12 + (196 - 12) * (i / 3);
    return {
      y,
      value: (max / 3) * (3 - i),
    };
  });

  const ticks = [0, 0.25, 0.5, 0.75, 1].map((part) => {
    const i = Math.round((points.length - 1) * part);
    return { x: placed[i]?.x ?? 0, day: points[i]?.day ?? '' };
  });

  const marker = hovered === null ? null : placed[hovered];

  const follow = (event: React.MouseEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    const part = (event.clientX - box.left) / box.width;
    const i = Math.round(part * (points.length - 1));
    setHovered(Math.max(0, Math.min(points.length - 1, i)));
  };

  return (
    <div
      style={{ position: 'relative', cursor: 'crosshair' }}
      onMouseMove={follow}
      onMouseLeave={() => setHovered(null)}
    >
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-labelledby={titleId}
        style={{ display: 'block', width: '100%', height: HEIGHT }}
      >
        <title id={titleId}>{description}</title>

        {gridLines.map((gridLine) => (
          <g key={gridLine.y}>
            <line
              x1={46}
              x2={1150}
              y1={gridLine.y}
              y2={gridLine.y}
              stroke="#eeebe5"
              strokeWidth={1}
            />
            <text
              x={38}
              y={gridLine.y + 4}
              textAnchor="end"
              fontSize={11}
              fill="#5f656c"
            >
              {shortNumber(gridLine.value)}
            </text>
          </g>
        ))}

        <path d={area} fill={ACCENT} fillOpacity={0.08} />
        <path
          d={line}
          fill="none"
          stroke={ACCENT}
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {marker !== undefined && marker !== null && (
          <g>
            <line
              x1={marker.x}
              x2={marker.x}
              y1={12}
              y2={196}
              stroke="#2a1f1c"
              strokeWidth={1}
              strokeOpacity={0.28}
            />
            <circle
              cx={marker.x}
              cy={marker.y}
              r={5}
              fill={ACCENT}
              stroke="#ffffff"
              strokeWidth={2}
            />
          </g>
        )}

        {ticks.map((tick) => (
          <text
            key={tick.day}
            x={tick.x}
            y={213}
            textAnchor="middle"
            fontSize={11}
            fill="#5f656c"
          >
            {shortDate(tick.day)}
          </text>
        ))}
      </svg>

      {marker !== undefined && marker !== null && (
        <div
          role="status"
          style={{
            position: 'absolute',
            top: 10,
            [marker.x / 1150 > 0.72 ? 'right' : 'left']:
              `${(marker.x / 1150 > 0.72 ? 100 - (marker.x / 1150) * 100 : (marker.x / 1150) * 100).toFixed(1)}%`,
            marginLeft: marker.x / 1150 > 0.72 ? undefined : 12,
            marginRight: marker.x / 1150 > 0.72 ? 12 : undefined,
            background: '#2a1f1c',
            color: '#ffffff',
            padding: '8px 11px',
            borderRadius: 8,
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 14px rgba(42,31,28,0.22)',
          }}
        >
          <p style={{ margin: '0 0 2px', fontSize: 11, color: '#cfcac2' }}>
            {shortDate(marker.day)}
          </p>
          <p
            className="num"
            style={{ margin: 0, fontSize: 14, fontWeight: 600 }}
          >
            {number(marker.value)}
          </p>
        </div>
      )}
    </div>
  );
};

export const Sketch = ({
  points,
  description,
}: {
  readonly points: ReadonlyArray<Point>;
  readonly description: string;
}) => {
  const titleId = useId();
  const { line, area } = plot(points, 310, 48, 6, 6);

  return (
    <svg
      viewBox="0 0 320 54"
      role="img"
      aria-labelledby={titleId}
      style={{ display: 'block', width: '100%', height: 54 }}
    >
      <title id={titleId}>{description}</title>
      <path d={area} fill={ACCENT} fillOpacity={0.08} />
      <path
        d={line}
        fill="none"
        stroke={ACCENT}
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
};
