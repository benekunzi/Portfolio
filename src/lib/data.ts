export interface Project {
    id: string;
    title: string;
    year: string;
    videoUrl: string;
    videoWidth: string;
    aspectRatio: "portrait" | "landscape";
    description: string;
    techStack: string[];
    showCases: string[];
    gitHubLink: string;
}

export const PROJECTS: Project[] = [
    {
        id: "social-media-app",
        title: "Social Media App",
        year: "2025",
        videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        videoWidth: "300px",
        aspectRatio: "portrait",
        description: "Is a new social app where users only on focusing on their friends instead of the whole world and giving their posts more love and focus.",
        techStack: ["Expo", "React Native", "Supabase", "Realtime", "App", "Typescript", "FullStack"],
        showCases: [],
        gitHubLink: "",
    },
    {
        id: "OneWord",
        title: "OneWord",
        year: "2025",
        videoUrl: "https://vz-f794a406-19c.b-cdn.net/b2646493-dc8b-4e32-b9fd-198a9ed3cfa2/playlist.m3u8",
        videoWidth: "300px",
        aspectRatio: "portrait",
        description: "OneWord is a revolutionary speed reading mobile application that helps users read faster and retain more through Rapid Serial Visual Presentation (RSVP) technology.",
        techStack: ["Expo", "React Native", "Firebase", "Typescript", "App"],
        showCases: [],
        gitHubLink: "https://github.com/benekunzi/OneWord",
    },
    {
        id: "anti-scam-app",
        title: "Anti Scam App - Ene",
        year: "2025",
        videoUrl: "https://vz-f794a406-19c.b-cdn.net/8ee926b5-466c-47c0-a6c4-1677689c5c68/playlist.m3u8",
        videoWidth: "300px",
        aspectRatio: "portrait",
        description: "Ene is a sophisticated mobile application designed to protect users from modern digital scams. By leveraging advanced AI analysis (powered by Google Gemini), Ene helps you identify phishing attempts and fraudulent content in real-time across multiple formats.",
        techStack: ["Expo", "React Native", "Typescript", "App", "AI"],
        showCases: [],
        gitHubLink: "https://github.com/benekunzi/Anti-Scam"
    },
    {
        id: "anti-scam-app-website",
        title: "Anti Scam App Website",
        year: "2025",
        videoUrl: "https://vz-f794a406-19c.b-cdn.net/e0112e85-6b5e-4581-a158-1481aff0a849/playlist.m3u8",
        videoWidth: "400px",
        aspectRatio: "landscape",
        description: "The website for the Anti Scam App Ene. It features an app feature overview and a waitlist connected to Firebase.",
        techStack: ["Next.js", "Firebase", "Cloudflare"],
        showCases: [],
        gitHubLink: "https://github.com/benekunzi/Ene-App-Website"
    },
    {
        id: "trackcloud",
        title: "Trackcloud",
        year: "2024",
        videoUrl: "https://vz-f794a406-19c.b-cdn.net/709f5d48-e2e7-4eda-853f-0252a5f3144e/playlist.m3u8",
        videoWidth: "300px",
        aspectRatio: "portrait",
        description: "TrackCloud is an advanced music discovery and analysis suite for macOS. It bridges the gap between major music platforms like Spotify, SoundCloud, and Beatport, providing DJs and music producers with powerful tools for track identification, metadata enrichment, and audio analysis.",
        techStack: ["Swift", "SwiftUI", "macOS", "Safari-Extension", "Audio-Analysis", "Firebase", "Web-Api-Integration",],
        showCases: [],
        gitHubLink: "https://github.com/benekunzi/TrackCloud"
    },
    {
        id: "event-app",
        title: "Event-App",
        year: "2024",
        videoUrl: "https://vz-f794a406-19c.b-cdn.net/640ba864-fef8-4f4a-94a0-089d78430d63/playlist.m3u8",
        videoWidth: "300px",
        aspectRatio: "portrait",
        description: "An Event App for showing the most important information on a day in your city. Build with a custom website for organizers to upload their events.",
        techStack: ["Swift", "SwiftUI", "Firebase", "FullStack"],
        showCases: [],
        gitHubLink: "https://github.com/benekunzi/event-app"
    }
];

export const JOBS = [
    {
        period: "2025 - Present",
        title: "Working Student - Software Maintenance Engineer",
        company: "Rohde & Schwarz",
        description: "Responsible for the maintenance and continuous improvement of automated testing systems for mobile applications and internal GUIs. Ensuring compatibility with newly released mobile features to maintain stable and reliable test environments. Collaborating in a small team to improve internal software and user interfaces. Leveraging Git, GitLab, and CI/CD pipelines to streamline development workflows, automate testing, and accelerate deployment.",
        stack: ["Python", "Git", "GitLab", "CI/CD"],
        image: "./RohdeSchwarz.png"
    },
    {
        period: "2022 - 2024",
        title: "Working Student - Machine Learning Engineer",
        company: "iFak - Magdeburg",
        description: "Developed InductivePosNet, a deep learning regression framework for predicting spatial coordinates from inductive sensor data. Implemented end-to-end machine learning pipelines, including CSV data processing, augmentation, model training, and evaluation. Designed and evaluated MLP and ResNet architectures for multi-sensor (x,y) regression, with custom metrics measuring accuracy in real-world units (mm). Integrated Weights & Biases for experiment tracking and optimized training on SLURM-based GPU clusters (e.g. NVIDIA DGX).",
        stack: ["Python", "Tensorflow", "Numpy", "Swift", "Git", "SLURM", "Weights & Biases"],
        image: "./iFak.png"
    },
    {
        period: "2021 - 2022",
        title: "Embedded Software Engineering Intern – EV Charging & V2G Systems",
        company: "StartUp Inc",
        description: "Designed and implemented a backend server for managing digital certificates on electric vehicle supply equipment (EVSE). Developed functionality to handle certificate storage, updates, and secure responses to installation requests for electric vehicle (EV) contract certificates. Worked within an embedded systems and IoT-focused environment, contributing to software solutions for Vehicle-to-Grid (V2G) communication and secure EV charging infrastructure.",
        stack: ["Python", "Git", "GitLab", "CI/CD"],
        image: "./Sevenstax.png"
    }
]

export const HOVER_IMAGES = [
    "https://portfolio-pull-zone.b-cdn.net/101_1295 2.JPG",
    "https://portfolio-pull-zone.b-cdn.net/image.jpg",
    "https://portfolio-pull-zone.b-cdn.net/IMG_3149.JPG",
    "https://portfolio-pull-zone.b-cdn.net/IMG_1189.jpeg",
    "https://portfolio-pull-zone.b-cdn.net/Bewerbungsbild2_B_Kunzmann.jpg",
]

export const PROFILE_IMAGE = "https://portfolio-pull-zone.b-cdn.net/101_1295 2.JPG"