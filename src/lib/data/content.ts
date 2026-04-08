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
    startdate: string;
    enddate: string;
    description: string;
    link: string;
};

export const BIO: Bio = {
    forename: 'Toby',
    surname: 'Grice',
    role: 'Software Engineer',
    introduction: '',
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
        title: '',
        startdate: '',
        enddate: '',
        description: '',
        link: ''
    }
];
