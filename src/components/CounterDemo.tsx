import { useState } from 'react';
import { Plus, Zap } from 'lucide-react';

// A faithful, interactive recreation of the Flutter starter app (`flutter create`).
// "Hot reload" swaps the seed colour while keeping the counter state, just like real hot reload.
const SEEDS = [
  { name: 'deepPurple', bar: '#d6c7ff', fab: '#eaddff', onFab: '#21005d', accent: '#6750a4' },
  { name: 'blue', bar: '#b9dcff', fab: '#d3e4ff', onFab: '#001c38', accent: '#0061a4' },
  { name: 'teal', bar: '#a6f0e3', fab: '#c2f1e9', onFab: '#00201c', accent: '#006a60' },
  { name: 'orange', bar: '#ffd6b8', fab: '#ffdcc3', onFab: '#2f1500', accent: '#8b5000' },
];

export function CounterDemo() {
  const [count, setCount] = useState(0);
  const [seed, setSeed] = useState(0);
  const [flash, setFlash] = useState(false);
  const s = SEEDS[seed];

  const hotReload = () => {
    setSeed((i) => (i + 1) % SEEDS.length);
    setFlash(true);
    window.setTimeout(() => setFlash(false), 700);
  };

  return (
    <div className="mx-auto w-full max-w-[320px]">
      {/* Phone */}
      <div className="relative rounded-[2.4rem] border border-neutral-700 bg-neutral-900 p-2.5 shadow-[0_40px_90px_-40px_rgba(19,185,253,.45)]">
        <div className="relative overflow-hidden rounded-[1.9rem] bg-[#fef7ff]" style={{ height: 440 }}>
          <div className="flex h-7 items-center justify-between px-5 text-[11px] font-semibold text-neutral-900" aria-hidden="true">
            <span>9:41</span><span className="h-3 w-14 rounded-full bg-neutral-900/90" /><span>100%</span>
          </div>
          <div className="flex h-14 items-center px-4 transition-colors duration-500" style={{ background: s.bar }}>
            <p className="text-[19px] font-normal text-[#1d1b20]" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>Flutter Demo Home Page</p>
          </div>
          <div className="flex h-[calc(100%-7rem)] flex-col items-center justify-center px-6 text-center" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>
            <p className="text-[14px] text-[#1d1b20]">You have pushed the button this many times:</p>
            <p className="mt-1 text-[45px] leading-tight text-[#1d1b20]" aria-live="polite">{count}</p>
          </div>
          <button
            type="button"
            onClick={() => setCount((c) => c + 1)}
            aria-label="Increment"
            className="absolute bottom-5 right-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl shadow-[0_3px_6px_rgba(0,0,0,.18)] transition-[background-color,scale] duration-300 active:scale-95"
            style={{ background: s.fab, color: s.onFab }}
          >
            <Plus className="h-6 w-6" />
          </button>
          {flash && <div className="pointer-events-none absolute inset-0 bg-[#13b9fd]/15 motion-safe:animate-pulse" aria-hidden="true" />}
        </div>
      </div>

      {/* Code + hot reload */}
      <div className="mt-4 rounded-xl border border-neutral-800 bg-neutral-900 p-3">
        <pre className="overflow-x-auto font-mono text-[12px] leading-relaxed text-neutral-400"><code>
<span className="text-ember-soft">colorScheme</span>: ColorScheme.fromSeed(
{'\n'}  seedColor: Colors.<span className="font-semibold transition-colors" style={{ color: s.accent === '#6750a4' ? '#c6b6ff' : '#9fdfff' }}>{s.name}</span>,
{'\n'}),</code></pre>
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-xs text-neutral-500">Count stays at {count}. That is hot reload.</p>
          <button type="button" onClick={hotReload} className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full bg-ember px-3.5 text-sm font-semibold text-ember-ink transition-colors hover:bg-ember-soft">
            <Zap className="h-4 w-4" />Hot reload
          </button>
        </div>
      </div>
    </div>
  );
}
