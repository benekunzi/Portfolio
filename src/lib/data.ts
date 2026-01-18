export interface Project {
    id: string;
    title: string;
    year: string;
    videoUrl: string;
    videoWidth: string;
    aspectRatio: "portrait" | "landscape";
    description: string;
    techStack: string[];
}

export const PROJECTS: Project[] = [
    {
        id: "social-media-app",
        title: "Social Media App",
        year: "2025",
        videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        videoWidth: "300px",
        aspectRatio: "portrait",
        description: "A seamless way to reshare content directly in direct messages, focusing on fluidity and reduced friction. Implemented with optimistic UI updates for instant feedback.",
        techStack: ["React", "TypeScript", "Node.js", "WebSocket"]
    },
    {
        id: "anti-scam-app",
        title: "Anti Scam App - Ene",
        year: "2025",
        videoUrl: "https://vz-f794a406-19c.b-cdn.net/8ee926b5-466c-47c0-a6c4-1677689c5c68/playlist.m3u8",
        videoWidth: "300px",
        aspectRatio: "portrait",
        description: "High-performance media viewer supporting 8K images and 4K HDR videos. Features distinct gestures for dismissal and zoom, mimicking native OS behaviors on the web.",
        techStack: ["WebGL", "Vue.js", "Pointer Events API"]
    },
    {
        id: "anti-scam-app-website",
        title: "Anti Scam App Website",
        year: "2025",
        videoUrl: "https://vz-f794a406-19c.b-cdn.net/e0112e85-6b5e-4581-a158-1481aff0a849/playlist.m3u8",
        videoWidth: "400px",
        aspectRatio: "landscape",
        description: "Synchronization of haptic feedback with audio rhythms. Uses the Web Vibration API to create immersive tactile experiences for mobile web users.",
        techStack: ["Web Audio API", "Vibration API", "Next.js"]
    },
    {
        id: "trackcloud",
        title: "Trackcloud",
        year: "2024",
        videoUrl: "https://vz-f794a406-19c.b-cdn.net/709f5d48-e2e7-4eda-853f-0252a5f3144e/playlist.m3u8",
        videoWidth: "300px",
        aspectRatio: "portrait",
        description: "Recreating the native Apple Music experience on the web. Focus on accessibility, keyboard navigation, and pixel-perfect replication of macOS design patterns.",
        techStack: ["Ember.js", "MusicKit JS", "SASS"]
    },
    {
        id: "event-app",
        title: "Event-App",
        year: "2024",
        videoUrl: "https://vz-f794a406-19c.b-cdn.net/640ba864-fef8-4f4a-94a0-089d78430d63/playlist.m3u8",
        videoWidth: "300px",
        aspectRatio: "portrait",
        description: "Interactive promotional site for WWDC19. Featured complex 3D scroll animations and neon aesthetic using pure CSS and minimal JS for performance.",
        techStack: ["HTML5", "CSS Variables", "Three.js"]
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