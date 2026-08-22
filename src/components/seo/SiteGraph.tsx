import React, { createContext, useContext, useLayoutEffect, useMemo, useState } from 'react';
import { JsonLd } from './JsonLd';
import { siteGraph } from './siteGraph';

type GraphNode = Record<string, unknown>;

const SiteGraphContext = createContext<{
  register: (id: string, nodes: GraphNode[]) => void;
} | null>(null);

export function SiteGraphProvider({ children }: { children: React.ReactNode }) {
  const [extras, setExtras] = useState<Record<string, GraphNode[]>>({});

  const register = React.useCallback((id: string, nodes: GraphNode[]) => {
    setExtras((prev) => {
      const current = prev[id];
      if (
        current &&
        current.length === nodes.length &&
        JSON.stringify(current) === JSON.stringify(nodes)
      ) {
        return prev;
      }
      if (nodes.length === 0) {
        if (!(id in prev)) return prev;
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: nodes };
    });
  }, []);

  const data = useMemo(
    () => siteGraph(Object.values(extras).flat()),
    [extras]
  );

  const value = useMemo(() => ({ register }), [register]);

  return (
    <SiteGraphContext.Provider value={value}>
      <JsonLd data={data} />
      {children}
    </SiteGraphContext.Provider>
  );
}

export function GraphNodes({
  id,
  nodes,
}: {
  id: string;
  nodes: GraphNode[];
}) {
  const ctx = useContext(SiteGraphContext);
  const serialized = JSON.stringify(nodes);
  useLayoutEffect(() => {
    if (!ctx) return;
    ctx.register(id, JSON.parse(serialized) as GraphNode[]);
    return () => ctx.register(id, []);
  }, [ctx, id, serialized]);
  return null;
}
