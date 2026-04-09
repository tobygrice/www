export type Bio = {
    forename: string;
    surname: string;
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
    id: number;
    title: string;
    subtitle?: string;
    startdate: string;
    enddate: string;
    bullets: string[];
    link?: string;
};

export const BIO: Bio = {
    forename: 'Toby',
    surname: 'Grice',
    role: 'Software Engineer',
    introduction: 'Recent computer science graduate with a passion for software development and network design.',
    location: 'Adelaide, Australia'
};

export const CONTACT: Contact = {
    email: 'tobygrice@icloud.com',
    github: 'https://github.com/tobygrice',
    linkedin: 'https://www.linkedin.com/in/tobygrice',
    bluesky: 'https://bsky.app/profile/tobygrice.com'
};

export const PROJECTS: Project[] = [
    {
        id: 1,
        title: 'Advanced Encryption Standard in Parallel (AESP) Library',
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
        id: 2,
        title: 'Nintendo Entertainment System (NES) Emulator',
        subtitle: 'Concurrency, Low-Level Systems, Hardware Emulation, C++',
        startdate: 'Feb. 2025',
        enddate: 'Apr. 2025',
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
        id: 3,
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
