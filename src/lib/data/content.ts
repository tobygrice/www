export type Bio = {
    name: string;
    role: string;
    introduction: string;
    location: string;
};

export type Contact = {
    email: string;
    github: string;
    linkedin: string;
    bluesky: string;
};

export type Project = {
    title: string;
    subtitle?: string;
    startdate: string;
    enddate: string;
    bullets: string[];
    link?: string;
};

export type Education = {
    institution: string;
    gpa: number;
    gpa_max: number;
    title: string;
    startdate: string;
    enddate: string;
    bullets: string[];
};

export type Skill = {
    name: string;
};

export const BIO: Bio = {
    name: 'Toby Grice',
    role: 'Software Engineer',
    introduction:
        'Recent computer science graduate with a passion for backend development and reliable software.',
    location: 'Adelaide, Australia'
};

export const CONTACT: Contact = {
    email: 'tobygrice@icloud.com',
    github: 'https://github.com/tobygrice',
    linkedin: 'https://www.linkedin.com/in/tobygrice',
    bluesky: 'https://bsky.app/profile/tobygrice.com'
};

export const EDUCATION: Education[] = [
    {
        institution: 'University of Adelaide',
        gpa: 6.4,
        gpa_max: 7.0,
        title: 'Bachelor of Computer Science (Distributed Systems & Networking)',
        startdate: 'Feb. 2022',
        enddate: 'Dec. 2025',
        bullets: [
            'Coursework included Algorithms & Data Structures, Operating Systems, Distributed Systems, Advanced Cyber Security, Parallel Computing, Artificial Intelligence, Computer Networks, Web & Database Computing.',
            'Tech eChallenge: team reached the final round (top 10 of 60+ teams) pitching a tech product to judges.',
            'Ravi\'s Study Program (RSP) 2026: three-month intensive DSA practice with live mock interviews.'
        ]
    }
];

export const SKILLS: Skill[] = [
    { name: 'C++' },
    { name: 'Rust' },
    { name: 'Python' },
    { name: 'Java' },
    { name: 'Bash' },
    { name: 'Svelte' },
    { name: 'JavaScript' },
    { name: 'TypeScript' },
    { name: 'SQL' },
    { name: 'Git' },
    { name: 'Docker' },
    { name: 'Vercel' }
];

export const PROJECTS: Project[] = [
    {
        title: 'Nintendo Entertainment System (NES) Emulator',
        subtitle: 'Concurrency, Low-Level Systems, Hardware Emulation, C++',
        startdate: 'Feb. 2025',
        enddate: 'Mar. 2026',
        bullets: [
            'Implemented core NES components (6502 CPU, memory map, bus) around a shared clock architecture.',
            'Parallelised the entire system with separate threads per component operating at single-tick granularity.',
            'Built and debugged a high-concurrency design with an emphasis on determinism and system stability.',
            'Analysed performance trade-offs of cycle-accurate emulation: context-switch overhead vs synchronisation costs.',
            'Strengthened low-level debugging skills: timing issues, race-prone logic, and system testing strategy.'
        ],
        link: ''
    },
    {
        title: 'Advanced Encryption Standard in Parallel (AESP)',
        subtitle: 'Parallelism, Applied Cryptography, API Design, Library Development, Rust',
        startdate: 'Jan. 2026',
        enddate: 'Feb. 2026',
        bullets: [
            'Developed and published a pure-software AES library in Rust, prioritising performance on multi-core CPUs.',
            'Benchmarked against serial implementations and achieved near-linear speedup across cores on larger inputs.',
            'Implemented multiple AES modes (ECB, CTR, GCM) and validated using NIST known-answer test vectors.',
            'Authored clear crate documentation and a thorough unit test suite to catch regressions early.',
            'Built a CLI for file encryption/decryption with practical flags, strict input validation, and structured error handling using idiomatic Rust patterns.'
        ],
        link: ''
    },
    {
        title: 'EchoPulse — Tech eChallenge',
        subtitle: 'UX Design, Market Research, Marketing, Teamwork, Public Speaking',
        startdate: 'Mar. 2025',
        enddate: 'Jul. 2025',
        bullets: [
            'Designed a mobile app concept to guide users through life-saving first aid when emergency services are unreachable, working in a team of four.',
            'Conducted interviews with industry professionals (medical, legal, and technical) to validate constraints and iterate on the product direction.',
            'Pitched the concept to a judging panel and progressed to the final round (top 10 of 60+ teams).'
        ],
        link: ''
    }
];
