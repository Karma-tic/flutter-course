export interface JargonTerm {
  term: string;
  simpleMeaning: string;
  funAnalogy: string;
  scaryRating: 'Easy' | 'Medium' | 'Sounds Scary But Simple';
}

export const jargonDictionary: Record<string, JargonTerm> = {
  sdk: {
    term: 'SDK (Software Development Kit)',
    simpleMeaning: 'A ready-to-use digital toolbox containing compilers, code libraries, and tools to build apps.',
    funAnalogy: 'Like an IKEA furniture box: it has the wooden pieces, screws, Allen wrench, and instruction manual all in one package.',
    scaryRating: 'Sounds Scary But Simple',
  },
  path: {
    term: 'PATH (Environment Variable)',
    simpleMeaning: 'A list of folders your computer checks whenever you type a command in your terminal.',
    funAnalogy: 'Your phone’s speed-dial list: instead of dialing an 11-digit number every time, you just press "1" to call home.',
    scaryRating: 'Sounds Scary But Simple',
  },
  terminal: {
    term: 'Terminal / Command Line',
    simpleMeaning: 'A text-only window where you type direct instructions to your computer instead of clicking with a mouse.',
    funAnalogy: 'Texting your computer directly instead of tapping app icons on a screen.',
    scaryRating: 'Easy',
  },
  widget: {
    term: 'Widget',
    simpleMeaning: 'The fundamental building block of everything you see on a Flutter screen (text, button, image, space).',
    funAnalogy: 'A single LEGO brick. Stack small bricks together to build a towering spaceship.',
    scaryRating: 'Easy',
  },
  state: {
    term: 'State',
    simpleMeaning: 'Any data inside your app that can change over time (like a score, text typed in a box, or a dark mode toggle).',
    funAnalogy: 'A basketball scoreboard: the points change during the game, and the screen repaints the new numbers.',
    scaryRating: 'Medium',
  },
  'null safety': {
    term: 'Sound Null Safety',
    simpleMeaning: 'A strict rule in Dart that prevents variables from being accidentally empty (null) to stop app crashes.',
    funAnalogy: 'A mandatory seatbelt law: every box is guaranteed to contain a toy unless you put a "?" tag saying it might be empty.',
    scaryRating: 'Sounds Scary But Simple',
  },
  'build context': {
    term: 'BuildContext',
    simpleMeaning: 'A location locator telling Flutter exactly where a widget sits in the grand widget family tree.',
    funAnalogy: 'Your home mailing address: it tells the delivery driver which house, street, and city you belong to.',
    scaryRating: 'Sounds Scary But Simple',
  },
  'hot reload': {
    term: 'Hot Reload',
    simpleMeaning: 'A superpower feature that updates your running app in less than 1 second when you save your code without resetting what you were doing.',
    funAnalogy: 'Changing the paint color of a car while it is cruising down the highway without turning off the engine or music.',
    scaryRating: 'Easy',
  },
  'hot restart': {
    term: 'Hot Restart',
    simpleMeaning: 'Recompiles code and resets the app state completely back to the starting splash screen in 2 seconds.',
    funAnalogy: 'Pressing the restart button on a Nintendo console: it reboots fresh from the title screen.',
    scaryRating: 'Easy',
  },
  async: {
    term: 'Async / Await',
    simpleMeaning: 'A way to do long-running work (like downloading a photo) in the background without freezing the screen.',
    funAnalogy: 'Ordering coffee at a cafe: the barista gives you a numbered receipt and calls you when ready, rather than forcing the entire line to stand frozen.',
    scaryRating: 'Medium',
  },
  future: {
    term: 'Future',
    simpleMeaning: 'A promise for a value that is not ready yet, but will arrive later (or fail with an error).',
    funAnalogy: 'A vibrating buzzer at Shake Shack: it buzzes in your hand when your burger is ready to pick up.',
    scaryRating: 'Medium',
  },
  stream: {
    term: 'Stream',
    simpleMeaning: 'A continuous pipe of data events arriving over time, one after another.',
    funAnalogy: 'A water faucet turned on, or a luggage carousel at an airport dropping bags one by one.',
    scaryRating: 'Sounds Scary But Simple',
  },
  'pubspec.yaml': {
    term: 'pubspec.yaml',
    simpleMeaning: 'The configuration manifest of your Flutter app where you list its name, fonts, assets, and third-party packages.',
    funAnalogy: 'Your app’s birth certificate and grocery shopping list combined into a single text file.',
    scaryRating: 'Easy',
  },
  'method channel': {
    term: 'MethodChannel',
    simpleMeaning: 'A communication bridge allowing Flutter (Dart) to send a message to native Android (Kotlin) or iOS (Swift) code.',
    funAnalogy: 'A walkie-talkie connecting two crew members on different decks of a ship speaking through a translator.',
    scaryRating: 'Sounds Scary But Simple',
  },
  'activity': {
    term: 'Android Activity',
    simpleMeaning: 'A single, focused window or screen that a user interacts with in a native Android application.',
    funAnalogy: 'A single theatrical scene on stage. When a new scene starts, the curtains close on the old one.',
    scaryRating: 'Medium',
  },
  'broadcast receiver': {
    term: 'BroadcastReceiver',
    simpleMeaning: 'An Android component that sleeps quietly until a system announcement happens (like Battery Low or Airplane Mode On).',
    funAnalogy: 'An emergency battery-powered radio that only beeps when the weather service broadcasts a hurricane alert.',
    scaryRating: 'Sounds Scary But Simple',
  },
  'foreground service': {
    term: 'Foreground Service',
    simpleMeaning: 'A long-running background task that MUST display an ongoing notification so the user knows it is running.',
    funAnalogy: 'A music player or workout tracker: the phone shows a little media card on the lock screen while playing music.',
    scaryRating: 'Sounds Scary But Simple',
  },
  'api': {
    term: 'API (Application Programming Interface)',
    simpleMeaning: 'A digital waiter that takes your request to a server (like "give me the weather in Paris") and brings back the answer.',
    funAnalogy: 'The restaurant waiter who takes your order to the kitchen and returns with your food on a tray.',
    scaryRating: 'Easy',
  },
  'json': {
    term: 'JSON',
    simpleMeaning: 'A clean, standardized text format made of key-value pairs used to exchange data between apps and web servers.',
    funAnalogy: 'A universal shipping container that fits cleanly onto any ship, train, or truck in the world.',
    scaryRating: 'Easy',
  },
  'git': {
    term: 'Git',
    simpleMeaning: 'A time-machine version control system that records every snapshot of your code so you can never lose your work.',
    funAnalogy: 'Checkpoints in a video game: if your character falls into lava, you reload from your last save point without losing the whole game.',
    scaryRating: 'Easy',
  },
};

