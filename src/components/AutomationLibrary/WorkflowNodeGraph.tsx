import React, { useMemo } from 'react';
import type { AutomationEntry } from '../../data/automationsData';

interface WorkflowNodeGraphProps {
  automation: AutomationEntry;
  className?: string;
}

/** Deterministic PRNG from string seed (mulberry32). */
function seedFrom(id: string): () => number {
  let h = 2166136261;
  for (let i = 0; i < id.length; i += 1) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  let t = h >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function buildNodes(automation: AutomationEntry) {
  const rand = seedFrom(automation.id);
  const labels: string[] = [];

  if (automation.triggerType === 'webhook') labels.push('Webhook');
  else if (automation.triggerType === 'scheduled') labels.push('Schedule');
  else if (automation.triggerType === 'chat') labels.push('Chat');
  else if (automation.triggerType === 'sub-workflow') labels.push('Subflow');
  else labels.push('Trigger');

  const ints = automation.integrations.slice(0, 5);
  if (ints.length) labels.push(...ints);
  else {
    const fallback = ['Set', 'IF', 'HTTP', 'Code', 'Notify'];
    const n = 3 + Math.floor(rand() * 3);
    for (let i = 0; i < n; i += 1) labels.push(fallback[i % fallback.length]);
  }

  if (!labels.includes('Output') && labels.length < 7) labels.push('Output');

  const W = 640;
  const H = 280;
  const padX = 48;
  const padY = 40;
  const cols = Math.min(labels.length, 4);
  const rows = Math.ceil(labels.length / cols);

  return labels.map((label, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const cellW = (W - padX * 2) / Math.max(cols - 1, 1);
    const cellH = (H - padY * 2) / Math.max(rows - 1, 1);
    const jitterX = (rand() - 0.5) * 18;
    const jitterY = (rand() - 0.5) * 14;
    const x = cols === 1 ? W / 2 : padX + col * cellW + jitterX;
    const y = rows === 1 ? H / 2 : padY + row * cellH + jitterY;
    const isTrigger = i === 0;
    const isAi = /ai|agent|openai|gemini|anthropic/i.test(label);
    return { label, x, y, isTrigger, isAi, i };
  });
}

export function WorkflowNodeGraph({ automation, className = '' }: WorkflowNodeGraphProps) {
  const nodes = useMemo(() => buildNodes(automation), [automation]);
  const W = 640;
  const H = 280;

  const edges = nodes.slice(0, -1).map((n, i) => ({
    from: n,
    to: nodes[i + 1],
  }));

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-purple-200/60 bg-gradient-to-br from-purple-50 via-white to-amber-50 ${className}`}
      aria-hidden="true"
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full min-h-[180px] sm:min-h-[220px]">
        <defs>
          <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7e22ce" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#eab308" stopOpacity="0.45" />
          </linearGradient>
          <filter id="nodeShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#6b21a8" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* soft grid */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={(i + 1) * (W / 9)}
            y1={0}
            x2={(i + 1) * (W / 9)}
            y2={H}
            stroke="#a855f7"
            strokeOpacity="0.06"
          />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1={0}
            y1={(i + 1) * (H / 5)}
            x2={W}
            y2={(i + 1) * (H / 5)}
            stroke="#a855f7"
            strokeOpacity="0.05"
          />
        ))}

        {edges.map(({ from, to }, i) => {
          const mx = (from.x + to.x) / 2;
          const my = (from.y + to.y) / 2 - 20;
          return (
            <path
              key={i}
              d={`M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}`}
              fill="none"
              stroke="url(#edgeGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          );
        })}

        {nodes.map((n) => {
          const w = Math.max(72, Math.min(130, n.label.length * 8 + 28));
          const h = 34;
          const fill = n.isTrigger
            ? '#7e22ce'
            : n.isAi
              ? '#a855f7'
              : '#ffffff';
          const stroke = n.isTrigger || n.isAi ? '#6b21a8' : '#e9d5ff';
          const textFill = n.isTrigger || n.isAi ? '#ffffff' : '#4c1d95';
          return (
            <g key={n.i} filter="url(#nodeShadow)">
              <rect
                x={n.x - w / 2}
                y={n.y - h / 2}
                width={w}
                height={h}
                rx={10}
                fill={fill}
                stroke={stroke}
                strokeWidth="1.5"
              />
              <text
                x={n.x}
                y={n.y + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={textFill}
                fontSize="11"
                fontWeight="600"
                fontFamily="ui-sans-serif, system-ui, sans-serif"
              >
                {n.label.length > 16 ? `${n.label.slice(0, 14)}…` : n.label}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="absolute bottom-2 right-3 text-[10px] font-semibold uppercase tracking-wider text-purple-400/80">
        n8n canvas preview
      </div>
    </div>
  );
}
