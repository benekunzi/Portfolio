'use client'

import { motion } from 'framer-motion'
import { Project } from '@/lib/data'
import { useEffect } from 'react'

interface ProjectDetailProps {
    project: Project | null
    onClose: () => void
}

export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
    // Prevent body scroll when detail view is open
    useEffect(() => {
        document.documentElement.style.overflow = 'hidden'
        document.body.style.overflow = 'hidden'

        return () => {
            document.documentElement.style.overflow = ''
            document.body.style.overflow = ''
        }
    }, [])

    if (!project) {
        return null;
    }

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-white overflow-auto"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="min-h-screen p-12 lg:p-24 pt-12">
                {/* Back Link (Hidden in Header now, but kept as alternative) */}
                <motion.button
                    className="mb-8 text-black/70 hover:text-black font-medium cursor-none"
                    onClick={onClose}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    &larr; Back to projects
                </motion.button>

                {/* Title */}
                <motion.h1
                    className="text-[48px] font-bold leading-tight mb-12 tracking-tight"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {project.title}
                </motion.h1>

                <div className="flex flex-col-reverse lg:flex-row gap-12 mb-16">
                    <div className="w-full lg:w-1/3 pt-4">
                        <div className="mb-12">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-black/40 mb-4">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech, i) => (
                                    <motion.span
                                        key={tech}
                                        className="px-3 py-1 bg-gray-100 rounded-full text-sm text-black/70"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.4 + (i * 0.1) }}
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                            </div>
                        </div>

                        <motion.p
                            className="text-[18px] leading-[1.6] text-black/80 font-[system-ui]"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {project.description}
                        </motion.p>
                    </div>

                    <div className="flex-1 flex justify-center items-start">
                        <motion.div
                            layoutId={`video-${project.id}`}
                            className={`rounded-xl overflow-hidden shadow-2xl relative
                                ${project.aspectRatio === 'landscape'
                                    ? 'w-full aspect-video md:w-auto md:h-[70vh] md:aspect-auto'
                                    : 'h-[60vh] md:h-[70vh] aspect-[9/16] w-auto'
                                }`}
                            transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        >
                            <motion.video
                                layoutId={`video-playback-${project.id}`}
                                src={project.videoUrl}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="h-full w-full object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
                {project.gitHubLink && (
                    <div className="flex justify-center mt-12">
                        <a href={project.gitHubLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 border border-black rounded-full hover:bg-black hover:text-white transition-colors">
                            <span>View on GitHub</span>
                        </a>
                    </div>
                )}
            </div>
        </motion.div>
    )
}
