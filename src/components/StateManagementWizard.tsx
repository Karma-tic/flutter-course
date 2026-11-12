import React, { useState } from 'react';
import { Layers, Sparkles, CheckCircle2, RotateCcw, Copy, Check, ArrowRight } from 'lucide-react';
import { CodeBlock } from './CodeBlock';

interface DecisionResult {
  title: string;
  badge: string;
  description: string;
  installCommand: string;
  whyFit: string;
  codeSnippet: string;
}

export const StateManagementWizard: React.FC = () => {
  const [appSize, setAppSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [preference, setPreference] = useState<'simple' | 'compileSafe' | 'strict'>('compileSafe');
  const [copied, setCopied] = useState(false);

  const getRecommendation = (): DecisionResult => {
    if (appSize === 'small' && preference === 'simple') {
      return {
        title: 'setState & ValueNotifier',
        badge: 'Zero Packages Needed • Built Into Flutter',
        description: 'For simple forms, toggle switches, counter widgets, and local UI state confined to a single screen.',
        installCommand: '# No packages needed! Built directly into Flutter SDK',
        whyFit: 'You do not need to introduce third-party libraries for local UI state. Over-engineering with BLoC or Redux on simple widgets causes unnecessary boilerplate.',
        codeSnippet: `// Simple local state
ValueNotifier<int> counter = ValueNotifier(0);

ValueListenableBuilder<int>(
  valueListenable: counter,
  builder: (context, value, child) {
    return Text('Count: $value');
  },
);`,
      };
    }

    if (preference === 'strict' || appSize === 'large') {
      return {
        title: 'flutter_bloc (BLoC / Cubit)',
        badge: 'Enterprise Standard • Predictable Unidirectional',
        description: 'The #1 architectural choice in banking, fintech, healthcare, and enterprise teams requiring strict event-driven state.',
        installCommand: 'flutter pub add flutter_bloc',
        whyFit: 'Every user action is dispatched as an explicit Event, generating an immutable State. This makes tracking bugs, event analytics, and unit testing 100% deterministic.',
        codeSnippet: `// 1. Dispatch an Event
context.read<AuthBloc>().add(SubmitLogin(email, password));

// 2. Rebuild strictly on emitted States
BlocBuilder<AuthBloc, AuthState>(
  builder: (context, state) {
    if (state is AuthLoading) return const CircularProgressIndicator();
    if (state is AuthSuccess) return HomeScreen(user: state.user);
    return LoginForm();
  },
);`,
      };
    }

    if (preference === 'compileSafe' || appSize === 'medium') {
      return {
        title: 'flutter_riverpod (Modern Flutter Standard)',
        badge: 'Compile-Safe • No BuildContext Needed',
        description: 'A revolutionary reactive caching and state framework that works completely outside the widget tree.',
        installCommand: 'flutter pub add flutter_riverpod',
        whyFit: 'Catches provider bugs at compile time instead of throwing runtime exceptions. Provides automatic caching, loading/error states (AsyncValue), and effortless testing without BuildContext mocks.',
        codeSnippet: `// Define a global compile-safe provider
final weatherProvider = FutureProvider<WeatherData>((ref) async {
  return apiService.getWeather();
});

// Consume in any ConsumerWidget
ref.watch(weatherProvider).when(
  data: (data) => Text('\${data.temp}°C'),
  loading: () => const CircularProgressIndicator(),
  error: (err, stack) => Text('Error: $err'),
);`,
      };
    }

    // Default to Provider
    return {
      title: 'provider (ChangeNotifier)',
      badge: 'Beginner Friendly • Official Google Favorite',
      description: 'The classic, official Google-endorsed state management package based on InheritedWidget.',
      installCommand: 'flutter pub add provider',
      whyFit: 'Very gentle learning curve for beginners. Call notifyListeners() on your model class and use context.watch() to repaint listening widgets.',
      codeSnippet: `class CartModel extends ChangeNotifier {
  final List<Item> items = [];
  void add(Item item) {
    items.add(item);
    notifyListeners(); // Repaints listening widgets!
  }
}

// Read in UI
final cart = context.watch<CartModel>();`,
    };
  };

  const recommendation = getRecommendation();

  const handleCopy = () => {
    navigator.clipboard.writeText(recommendation.installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-sky-500/20 bg-gradient-to-br from-[#0c1322] via-[#0f172a] to-[#1e1e38] p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sky-500/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-sky-400 font-mono">
              Interactive Architectural Tool
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white">
              Which State Management Should You Use?
            </h3>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Interactive Questions */}
        <div className="lg:col-span-5 space-y-6">
          {/* Question 1: App Size */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 block mb-2">
              1. What size is your app?
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'small', label: 'Small', desc: '1-3 screens' },
                { id: 'medium', label: 'Medium', desc: '4-15 screens' },
                { id: 'large', label: 'Large', desc: 'Enterprise' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setAppSize(item.id as any)}
                  className={`p-3 rounded-xl border text-center transition ${
                    appSize === item.id
                      ? 'border-sky-500 bg-sky-950/80 text-white ring-1 ring-sky-500 shadow-xs'
                      : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="font-bold text-xs">{item.label}</div>
                  <div className="text-[10px] opacity-70 mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Architectural Preference */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 block mb-2">
              2. What is your engineering priority?
            </label>
            <div className="space-y-2">
              {[
                {
                  id: 'simple',
                  label: 'Simple & Quick',
                  desc: 'Minimal boilerplate, easy for beginners to understand',
                },
                {
                  id: 'compileSafe',
                  label: 'Modern & Compile-Safe',
                  desc: 'Catch errors at compile-time, zero BuildContext dependency (Riverpod style)',
                },
                {
                  id: 'strict',
                  label: 'Strict Enterprise & Banking',
                  desc: 'Unidirectional data flow with explicit event streams (BLoC style)',
                },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setPreference(item.id as any)}
                  className={`w-full text-left p-3 rounded-xl border transition ${
                    preference === item.id
                      ? 'border-sky-500 bg-sky-950/80 text-white ring-1 ring-sky-500 shadow-xs'
                      : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="font-bold text-xs">{item.label}</div>
                  <div className="text-[10px] opacity-70 mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Instant Recommendation Output */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-sky-400/30 bg-[#0b1120] p-6 space-y-4 shadow-lg">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-sky-500/20 border border-sky-500/30 px-3 py-0.5 text-[10px] font-bold text-sky-300">
                {recommendation.badge}
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Optimal Match</span>
              </span>
            </div>

            <h4 className="text-xl font-black text-white">
              {recommendation.title}
            </h4>

            <p className="text-xs text-neutral-300 leading-relaxed">
              {recommendation.description}
            </p>
          </div>

          {/* Why it fits box */}
          <div className="rounded-xl border border-sky-900/60 bg-sky-950/30 p-3 text-xs text-sky-200 leading-relaxed">
            <span className="font-bold text-white">Why this fits your answers: </span>
            {recommendation.whyFit}
          </div>

          {/* Quick Copy Command */}
          {recommendation.installCommand.startsWith('flutter') && (
            <div className="flex items-center justify-between rounded-xl bg-neutral-950 px-3 py-2 border border-neutral-800 font-mono text-xs text-neutral-300">
              <span className="truncate">{recommendation.installCommand}</span>
              <button
                onClick={handleCopy}
                className="ml-2 flex items-center gap-1 text-[11px] font-sans font-semibold text-sky-400 hover:text-sky-300 shrink-0"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          )}

          {/* Code Template */}
          <div className="pt-2">
            <CodeBlock code={recommendation.codeSnippet} language="dart" title="quick_example.dart" />
          </div>
        </div>
      </div>
    </div>
  );
};
