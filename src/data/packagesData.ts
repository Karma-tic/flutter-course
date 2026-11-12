export interface FlutterPackage {
  id: string;
  name: string;
  command: string;
  category: 'State Management' | 'Networking & APIs' | 'Local Storage & DB' | 'UI & Styling' | 'Routing & Navigation' | 'Utilities';
  popularity: string;
  whatItDoes: string;
  whyYouNeedIt: string;
  pubUrl: string;
  codeSnippet: string;
}

export const topFlutterPackages: FlutterPackage[] = [
  {
    id: 'pkg-provider',
    name: 'provider',
    command: 'flutter pub add provider',
    category: 'State Management',
    popularity: '100% Popularity • Official Google Favorite',
    whatItDoes: 'Wraps InheritedWidget into an easy-to-use dependency injection and state management system using ChangeNotifier.',
    whyYouNeedIt: 'The beginner-friendly industry standard. Eliminates "prop drilling" so any widget in your app can read and update shared data with context.watch() or context.read().',
    pubUrl: 'https://pub.dev/packages/provider',
    codeSnippet: `// 1. Define Model with ChangeNotifier
class CounterModel extends ChangeNotifier {
  int count = 0;
  void increment() {
    count++;
    notifyListeners(); // Tells listening widgets to rebuild!
  }
}

// 2. Consume anywhere in widget tree
context.watch<CounterModel>().count;`,
  },
  {
    id: 'pkg-riverpod',
    name: 'flutter_riverpod',
    command: 'flutter pub add flutter_riverpod',
    category: 'State Management',
    popularity: 'Modern Standard • Compile-Safe',
    whatItDoes: 'A complete rewrite of Provider by the same creator that works completely outside the Flutter widget tree without needing BuildContext.',
    whyYouNeedIt: 'Catches state errors at compile-time instead of runtime crashes. Easily handles async caching (AsyncValue), auto-dispose memory cleanups, and testing.',
    pubUrl: 'https://pub.dev/packages/flutter_riverpod',
    codeSnippet: `// Global compile-safe provider
final userProvider = FutureProvider<User>((ref) async {
  return fetchUserData(); // Auto-handles loading, error, and data!
});

// Inside a ConsumerWidget
ref.watch(userProvider).when(
  data: (user) => Text(user.name),
  loading: () => const CircularProgressIndicator(),
  error: (err, stack) => Text('Error: $err'),
);`,
  },
  {
    id: 'pkg-bloc',
    name: 'flutter_bloc',
    command: 'flutter pub add flutter_bloc',
    category: 'State Management',
    popularity: 'Enterprise Standard • Unidirectional',
    whatItDoes: 'Implements BLoC (Business Logic Component) separating presentation from logic through Streams, Events, and States.',
    whyYouNeedIt: 'The #1 requested architecture in banking, fintech, and enterprise Flutter job interviews. Every action is a predictable event producing an immutable state.',
    pubUrl: 'https://pub.dev/packages/flutter_bloc',
    codeSnippet: `// Trigger an event
context.read<AuthBloc>().add(LoginRequested(email, password));

// Rebuild UI strictly based on state
BlocBuilder<AuthBloc, AuthState>(
  builder: (context, state) {
    if (state is AuthLoading) return const CircularProgressIndicator();
    if (state is AuthSuccess) return const HomeScreen();
    return const LoginForm();
  },
);`,
  },
  {
    id: 'pkg-dio',
    name: 'dio',
    command: 'flutter pub add dio',
    category: 'Networking & APIs',
    popularity: 'Powerhouse HTTP Client',
    whatItDoes: 'A powerful HTTP networking client for Dart supporting Interceptors, Global Configuration, FormData, Request Cancellation, and File Downloading.',
    whyYouNeedIt: 'Standard http package requires manual headers and status code parsing. Dio handles automatic JSON decoding, base URLs, auth token refreshing via interceptors, and timeout protection.',
    pubUrl: 'https://pub.dev/packages/dio',
    codeSnippet: `final dio = Dio(BaseOptions(baseUrl: 'https://api.example.com/v1'));

// Add Auth Interceptor (Auto-attaches JWT token to all requests)
dio.interceptors.add(InterceptorsWrapper(
  onRequest: (options, handler) {
    options.headers['Authorization'] = 'Bearer $savedToken';
    return handler.next(options);
  },
));

final response = await dio.get('/products'); // Auto-parsed to Map/List!`,
  },
  {
    id: 'pkg-go-router',
    name: 'go_router',
    command: 'flutter pub add go_router',
    category: 'Routing & Navigation',
    popularity: 'Official Google Routing Package',
    whatItDoes: 'Declarative routing library that unifies URL path-based navigation with deep linking, nested tabs, and auth redirection.',
    whyYouNeedIt: 'Essential for Flutter Web, deep links, and modern mobile apps. Replaces messy Navigator.push() with clean URL routes like context.go("/product/42").',
    pubUrl: 'https://pub.dev/packages/go_router',
    codeSnippet: `final router = GoRouter(
  routes: [
    GoRoute(path: '/', builder: (context, state) => const HomeScreen()),
    GoRoute(
      path: '/details/:id',
      builder: (context, state) => DetailsScreen(id: state.pathParameters['id']!),
    ),
  ],
);

// Navigate cleanly
context.go('/details/42');`,
  },
  {
    id: 'pkg-shared-preferences',
    name: 'shared_preferences',
    command: 'flutter pub add shared_preferences',
    category: 'Local Storage & DB',
    popularity: 'Flutter Favorite • Key-Value',
    whatItDoes: 'Wraps platform-specific persistent storage (NSUserDefaults on iOS, SharedPreferences on Android) for lightweight data.',
    whyYouNeedIt: 'Perfect for saving user preferences, dark mode toggles, onboarded flags, and auth session tokens across app restarts.',
    pubUrl: 'https://pub.dev/packages/shared_preferences',
    codeSnippet: `final prefs = await SharedPreferences.getInstance();

// Save
await prefs.setBool('isDarkMode', true);
await prefs.setString('authToken', 'xyz123');

// Read
final isDark = prefs.getBool('isDarkMode') ?? false;`,
  },
  {
    id: 'pkg-hive',
    name: 'hive_flutter',
    command: 'flutter pub add hive_flutter',
    category: 'Local Storage & DB',
    popularity: 'Ultra-Fast Pure Dart NoSQL',
    whatItDoes: 'Lightweight, blazing-fast key-value database written in pure Dart with zero native dependencies.',
    whyYouNeedIt: 'Much faster than SQLite for storing offline lists, objects, and JSON data. Does not require SQL tables or schema migrations.',
    pubUrl: 'https://pub.dev/packages/hive_flutter',
    codeSnippet: `await Hive.initFlutter();
final box = await Hive.openBox('tasks');

// Store key-value or custom objects
await box.put('current_task', {'title': 'Master Flutter', 'done': false});

// Read instantly from memory
final task = box.get('current_task');`,
  },
  {
    id: 'pkg-sqflite',
    name: 'sqflite',
    command: 'flutter pub add sqflite path',
    category: 'Local Storage & DB',
    popularity: 'Relational SQLite Standard',
    whatItDoes: 'Embeds a full SQLite SQL database engine inside your Flutter application.',
    whyYouNeedIt: 'Compulsory for company exam projects, relational queries (JOINs, GROUP BY), offline-first apps, and handling thousands of records with indexing.',
    pubUrl: 'https://pub.dev/packages/sqflite',
    codeSnippet: `final db = await openDatabase('app.db', version: 1,
  onCreate: (db, version) {
    return db.execute('CREATE TABLE tasks(id TEXT PRIMARY KEY, title TEXT, is_done INTEGER)');
  },
);

await db.insert('tasks', {'id': '1', 'title': 'Complete CRUD Lab', 'is_done': 1});
final List<Map<String, dynamic>> results = await db.query('tasks');`,
  },
  {
    id: 'pkg-cached-network-image',
    name: 'cached_network_image',
    command: 'flutter pub add cached_network_image',
    category: 'UI & Styling',
    popularity: 'Essential Production Asset',
    whatItDoes: 'Loads images from the internet, saves them to device disk cache, and provides shimmer loading placeholders and error fallbacks.',
    whyYouNeedIt: 'Standard Image.network() re-downloads the same image on every rebuild, wasting user mobile data. This package caches automatically.',
    pubUrl: 'https://pub.dev/packages/cached_network_image',
    codeSnippet: `CachedNetworkImage(
  imageUrl: 'https://images.unsplash.com/photo-flutter',
  placeholder: (context, url) => const CircularProgressIndicator(),
  errorWidget: (context, url, error) => const Icon(Icons.error),
  fit: BoxFit.cover,
)`,
  },
  {
    id: 'pkg-google-fonts',
    name: 'google_fonts',
    command: 'flutter pub add google_fonts',
    category: 'UI & Styling',
    popularity: '1,000+ Typography Styles',
    whatItDoes: 'Allows using any of the 1,000+ Google Fonts directly in your Flutter widgets without downloading and configuring .ttf files in pubspec.yaml.',
    whyYouNeedIt: 'Instantly modernizes app aesthetics with Inter, Roboto, Poppins, or JetBrains Mono with automatic runtime caching and asset bundling.',
    pubUrl: 'https://pub.dev/packages/google_fonts',
    codeSnippet: `Text(
  'Build Beautiful Flutter Apps',
  style: GoogleFonts.poppins(
    fontSize: 22,
    fontWeight: FontWeight.w700,
    letterSpacing: -0.5,
  ),
)`,
  },
  {
    id: 'pkg-flutter-animate',
    name: 'flutter_animate',
    command: 'flutter pub add flutter_animate',
    category: 'UI & Styling',
    popularity: 'Declarative Fluid Animations',
    whatItDoes: 'Add fluid micro-interactions and animations to any Flutter widget using a clean, chainable declarative syntax.',
    whyYouNeedIt: 'Traditional Flutter animations require AnimationController, TickerProvider, and dispose() boilerplate. flutter_animate does it in 1 line.',
    pubUrl: 'https://pub.dev/packages/flutter_animate',
    codeSnippet: `Text('Hello World!')
  .animate()
  .fadeIn(duration: 500.ms)
  .scale(delay: 200.ms)
  .shimmer(blendMode: BlendMode.srcOver);`,
  },
  {
    id: 'pkg-intl',
    name: 'intl',
    command: 'flutter pub add intl',
    category: 'Utilities',
    popularity: 'Official Internationalization',
    whatItDoes: 'Provides internationalization (i18n) and localization facilities, including message translation, date/time formatting, and currency numbers.',
    whyYouNeedIt: 'Crucial for commercial billing, invoice calculations, and rendering dates as "Nov 12, 2026" or currency as "₹1,499.00" / "$1,499.00".',
    pubUrl: 'https://pub.dev/packages/intl',
    codeSnippet: `final currency = NumberFormat.currency(symbol: '₹', decimalDigits: 2);
print(currency.format(1499.5)); // ₹1,499.50

final formattedDate = DateFormat.yMMMMd().format(DateTime.now());
print(formattedDate); // November 12, 2026`,
  },
  {
    id: 'pkg-flutter-svg',
    name: 'flutter_svg',
    command: 'flutter pub add flutter_svg',
    category: 'UI & Styling',
    popularity: 'Vector Graphics Standard',
    whatItDoes: 'Parses and renders SVG (Scalable Vector Graphics) files and asset strings as crisp Flutter widgets.',
    whyYouNeedIt: 'PNG and JPG icons get blurry on high-density phone screens. SVG scales infinitely and reduces app bundle download size.',
    pubUrl: 'https://pub.dev/packages/flutter_svg',
    codeSnippet: `SvgPicture.asset(
  'assets/icons/logo.svg',
  width: 32,
  height: 32,
  colorFilter: const ColorFilter.mode(Colors.blue, BlendMode.srcIn),
)`,
  },
  {
    id: 'pkg-url-launcher',
    name: 'url_launcher',
    command: 'flutter pub add url_launcher',
    category: 'Utilities',
    popularity: 'Official Device Intents',
    whatItDoes: 'Opens URLs, phone dialers (tel:), SMS messages (sms:), and email clients (mailto:) from your Flutter application.',
    whyYouNeedIt: 'Every production app needs to link to external websites, customer support emails, or trigger phone calls on iOS and Android.',
    pubUrl: 'https://pub.dev/packages/url_launcher',
    codeSnippet: `final uri = Uri.parse('https://karmatix.in');
if (await canLaunchUrl(uri)) {
  await launchUrl(uri, mode: LaunchMode.externalApplication);
}`,
  },
];
