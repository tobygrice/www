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
    iconPack: 'simple-icons' | 'lucide';
    icon: string;
};

export const BIO: Bio = {
    name: 'Toby Grice',
    role: 'Software Engineer',
    introduction:
        'Recent computer science graduate with a passion for backend development and all things retro.',
    location: 'Adelaide, Australia'
};

export const CONTACT: Contact = {
    email: 'contact@tobygrice.com',
    github: 'https://github.com/tobygrice',
    linkedin: 'https://www.linkedin.com/in/tobygrice',
    bluesky: 'https://bsky.app/profile/tobygrice.com'
};

export const EDUCATION: Education[] = [
    {
        institution: 'University of Adelaide',
        gpa: 5.5,
        gpa_max: 7.0,
        title: 'Bachelor of Computer Science (Distributed Systems & Networking)',
        startdate: '2022',
        enddate: '2025',
        bullets: [

        ]
    }
];

export const SKILLS: Skill[] = [
    { name: 'C++', iconPack: 'simple-icons', icon: 'siCplusplus' },
    { name: 'Rust', iconPack: 'simple-icons', icon: 'siRust' },
    { name: 'Python', iconPack: 'simple-icons', icon: 'siPython' },
    { name: 'Java', iconPack: 'lucide', icon: 'Coffee' },
    { name: 'Bash', iconPack: 'lucide', icon: 'Terminal' },
    { name: 'Svelte', iconPack: 'simple-icons', icon: 'siSvelte' },
    { name: 'JavaScript', iconPack: 'simple-icons', icon: 'siJavascript' },
    { name: 'TypeScript', iconPack: 'simple-icons', icon: 'siTypescript' },
    { name: 'SQL', iconPack: 'lucide', icon: 'Database' },
    { name: 'Git', iconPack: 'simple-icons', icon: 'siGit' },
    { name: 'Docker', iconPack: 'simple-icons', icon: 'siDocker' },
    { name: 'Vercel', iconPack: 'simple-icons', icon: 'siVercel' }
];

export const PROJECTS: Project[] = [
    {
        title: 'Nintendo Entertainment System (NES) Emulator',
        subtitle: 'Concurrency, Low-Level Systems, Hardware Emulation, C++',
        startdate: 'Feb. 2025',
        enddate: 'Mar. 2026',
        bullets: [
            'Implemented core NES components (6502 CPU, PPU, cartridge, bus) around a shared clock.',
            'Designed CPU and PPU to operate at single-tick granularity to target cycle-accurate emulation.',
            'Experimented with a parallel design by running each component in a separate thread.',
            'Strengthened low-level debugging skills: timing issues, race-prone logic, and system testing strategy.',
            'Analysed performance and accuracy trade-offs of a parallel design and found a serial design to be more effective.',
        ],
        link: 'https://github.com/tobygrice/nes-emu'
    },
    {
        title: 'Advanced Encryption Standard in Parallel (AESP)',
        subtitle: 'Parallelism, Applied Cryptography, API Design, Library Development, Rust',
        startdate: 'Jan. 2026',
        enddate: 'Feb. 2026',
        bullets: [
            'Developed and published a pure-software AES library in Rust.',
            'Implemented multiple AES modes (ECB, CTR, GCM) and validated using known-answer test vectors.',
            'Authored clear crate documentation and a thorough unit test suite to catch regressions.',
            'Parallelised implementation and tested near-linear speedup across cores against serial design.',
            'Built a CLI for file encryption/decryption with practical flags, strict input validation, and structured error handling using idiomatic Rust patterns.'
        ],
        link: 'https://github.com/tobygrice/aesp'
    },
    {
        title: 'EchoPulse — Tech eChallenge',
        subtitle: 'UX Design, Market Research, Marketing, Teamwork, Public Speaking',
        startdate: 'Mar. 2025',
        enddate: 'Jul. 2025',
        bullets: [
            'Designed a mobile app concept to guide users through life-saving first aid when emergency services are unreachable, working in a team of four.',
            'Conducted interviews with industry professionals (medical, legal, and technical) to validate constraints and iterate on the product.',
            'Pitched the concept to a judging panel and progressed to the final round (top 10 of 60+ teams).'
        ],
        link: 'https://github.com/tobygrice/echopulse'
    }
];
