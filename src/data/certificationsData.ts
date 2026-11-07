import { CertificationItem } from '../types';

export const googleCertificationTruth = `### The Truth About "Google Flutter Certification"
> [!IMPORTANT]
> **Does Google currently offer an official "Google Certified Flutter Developer" exam?**
> **NO.** As of 2026, Google does **NOT** offer an official direct certification for Flutter.
> Furthermore, Google's older *Associate Android Developer* certification was officially **retired and discontinued**.
>
> Any website claiming to sell you an "Official Google Flutter Developer Certificate" is misleading you. Do not pay hundreds of dollars for third-party certificates claiming official Google endorsement.`;

export const certificationsData: CertificationItem[] = [
  {
    id: 'cert-1',
    title: 'Google Developer Program Profile & Skill Badges',
    provider: 'Google Developers / Google Cloud Skills Boost',
    cost: 'Free',
    isCertificateFree: true,
    timeEstimate: '2 - 6 hours per badge',
    recognition: 'High (Verified Google public profile badge)',
    link: 'https://developers.google.com/profile',
    verdict: 'Genuine and verifiable. You earn digital badges displayed on your official public Google Developer profile for completing Codelabs and workshops.',
  },
  {
    id: 'cert-2',
    title: 'GitHub Foundations & GitHub Skills Badges',
    provider: 'GitHub Skills',
    cost: 'Free',
    isCertificateFree: true,
    timeEstimate: '1 - 3 hours per topic',
    recognition: 'High (Verified GitHub profile badge)',
    link: 'https://skills.github.com',
    verdict: 'Excellent for proving version control, GitHub Actions CI/CD, and collaboration skills to recruiters.',
  },
  {
    id: 'cert-3',
    title: 'Meta / University Mobile Specializations on Coursera',
    provider: 'Coursera (Meta / IBM / Universities)',
    cost: 'Free to Audit ($49/mo for certificate, Financial Aid available)',
    isCertificateFree: false,
    timeEstimate: '1 - 3 months',
    recognition: 'Medium to High',
    link: 'https://www.coursera.org',
    verdict: 'You can audit 100% of the video content and readings for free. If you need the certificate for your university, apply for Coursera Financial Aid.',
  },
  {
    id: 'cert-4',
    title: 'Great Learning Academy Free Flutter Courses',
    provider: 'Great Learning Academy',
    cost: '100% Free',
    isCertificateFree: true,
    timeEstimate: '3 - 6 hours',
    recognition: 'Low to Medium (Demonstrates self-learning)',
    link: 'https://www.mygreatlearning.com/academy',
    verdict: 'Completely free completion certificate. Good for beginners building their first resume, but employers value code more than this certificate.',
  },
  {
    id: 'cert-5',
    title: 'Simplilearn SkillUp Free Mobile Development Courses',
    provider: 'Simplilearn',
    cost: '100% Free',
    isCertificateFree: true,
    timeEstimate: '4 - 8 hours',
    recognition: 'Low to Medium',
    link: 'https://www.simplilearn.com/skillup-free-online-courses',
    verdict: 'Free certificate upon completing all lessons and passing the quiz. Decent for college credit or foundational proof.',
  },
  {
    id: 'cert-6',
    title: 'NPTEL / SWAYAM Mobile Computing Certifications',
    provider: 'Government of India / IITs',
    cost: 'Free learning (Nominal exam fee ~$12 for proctored IIT certificate)',
    isCertificateFree: false,
    timeEstimate: '8 - 12 weeks',
    recognition: 'High in India (IIT / Government accredited)',
    link: 'https://swayam.gov.in',
    verdict: 'Highly respected across Indian academia and companies for foundational computer science and Android coursework.',
  },
  {
    id: 'cert-7',
    title: 'freeCodeCamp (General Coding & Responsive Web)',
    provider: 'freeCodeCamp',
    cost: '100% Free',
    isCertificateFree: true,
    timeEstimate: '300 hours per curriculum',
    recognition: 'Medium (High respect for portfolio projects)',
    link: 'https://www.freecodecamp.org',
    verdict: 'Note: freeCodeCamp does NOT offer a dedicated Flutter certificate, but their free video bootcamps and general programming tracks are gold standard.',
  },
];

export const portfolioChecklist = [
  {
    id: 'port-1',
    item: 'At least ONE live published app on Google Play Store (or downloadable APK release on GitHub)',
    importance: 'Critical',
    why: 'Recruiters and technical leads care 10x more about seeing an app running on their phone than any piece of paper.',
  },
  {
    id: 'port-2',
    item: 'Public GitHub repository with a clean, formatted README.md',
    importance: 'Critical',
    why: 'Include a high-resolution demo GIF / screenshot, bulleted features list, architecture overview (e.g. MVVM + Provider), and instructions to run locally.',
  },
  {
    id: 'port-3',
    item: 'The Student Details Exam App (The Core Project from this course)',
    importance: 'Critical',
    why: 'Demonstrates complete mastery of forms, input validation, grade calculation, and Android/Flutter architectural mapping.',
  },
  {
    id: 'port-4',
    item: 'At least one app making real REST API calls with error boundaries',
    importance: 'High',
    why: 'Shows you can parse JSON, handle slow network states with FutureBuilder, and handle HTTP 404/500 errors gracefully.',
  },
  {
    id: 'port-5',
    item: 'Unit and Widget test suites included in your repository',
    importance: 'High',
    why: 'Less than 5% of junior applicants write tests; having green passing tests in your repo instantly puts you in the top 5% of candidates.',
  },
];

