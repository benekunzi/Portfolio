'use client'

import { ProjectItem } from "@/components/project-item";
import { ProjectDetail } from "@/components/project-detail";
import { Project, PROJECTS } from "@/lib/data";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCursor } from "@/context/cursor-context";
import Link from "next/link";

export default function Home() {
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [showDetailPage, setShowDetailPage] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [isEmailHovered, setIsEmailHovered] = useState(false);

  const { setCursorType, setDimensions, resetCursor } = useCursor();

  return (
    <main className="flex min-h-screen flex-col md:flex-row relative">
      <motion.div
        layout
        className="w-full h-full relative"
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          key="bio"
          className="relative md:absolute left-0 md:left-1/2 top-0 md:-translate-x-1/2 flex flex-col justify-between p-6 md:p-24 z-20 pointer-events-none w-full md:w-[600px]"
          initial={{ opacity: 1 }}
          animate={{
            opacity: (isFocusMode || showDetailPage) ? 0 : 1,
            filter: isFocusMode ? 'blur(10px)' : 'blur(0px)'
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="pt-[30vh] pointer-events-auto w-full">
            <h1 className="text-[22px] font-bold leading-[1.4] tracking-tight text-black">
              Benedict Kunzmann,
              <br />
              software developer for <span className="text-[#EB3EA1] cursor-pointer">Mobile</span> and <span className="text-[#EB3EA1] cursor-pointer">Python</span>
            </h1>
          </div>

          <div className="flex gap-6 pb-24 pointer-events-auto pt-[2vh] items-center">
            <Link href="/about" passHref legacyBehavior>
              <motion.a
                className="text-[18px] leading-[22px] text-black/70 hover:opacity-100 transition-opacity p-2 -m-2 rounded-lg cursor-none"
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  setDimensions({ width: rect.width, height: rect.height, radius: "8px" })
                  setCursorType('link')
                }}
                onMouseLeave={() => {
                  resetCursor()
                  setDimensions(undefined)
                }}
              >
                About
              </motion.a>
            </Link>
            <a
              href="https://github.com/benekunzi"
              className="text-[18px] leading-[22px] text-black/70 hover:opacity-100 transition-opacity p-2 -m-2 rounded-lg cursor-none"
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                setDimensions({ width: rect.width, height: rect.height, radius: "8px" })
                setCursorType('link')
              }}
              onMouseLeave={() => {
                resetCursor()
                setDimensions(undefined)
              }}
            >
              GitHub
            </a>
            <div
              onMouseEnter={(e) => {
                setIsEmailHovered(true)
                const rect = e.currentTarget.getBoundingClientRect()
                // Add some padding visually if needed, but rect is precise
                setDimensions({ width: rect.width + 10, height: rect.height + 10, radius: "8px" })
                setCursorType('link')
              }}
              onMouseLeave={() => {
                setIsEmailHovered(false)
                resetCursor()
                setDimensions(undefined)
              }}
              className="flex items-center h-[26px] overflow-hidden relative cursor-none p-1 -m-1"
            >
              <AnimatePresence mode="wait">
                {!isEmailHovered ? (
                  <motion.a
                    key="email-text"
                    initial={{ opacity: 1, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 1, y: 40 }}
                    transition={{ duration: 0.3 }}
                    href="mailto:benedict.kunzmann@icloud.com"
                    className="text-[18px] leading-[22px] text-black/70 hover:opacity-100 transition-opacity whitespace-nowrap block cursor-none"
                  >
                    E-Mail
                  </motion.a>
                ) : (
                  <motion.div
                    key="email-address"
                    initial={{ opacity: 1, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 1, y: 40 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2"
                  >
                    <a
                      href="mailto:benedict.kunzmann@icloud.com"
                      className="text-[18px] leading-[22px] text-black/70 hover:opacity-100 transition-opacity whitespace-nowrap cursor-none"
                    >
                      benedict.kunzmann@icloud.com
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          <motion.div
            key="list"
            className="relative md:absolute left-0 md:left-[15%] top-0 pt-[10vh] md:pt-[30vh] z-20 px-6 md:px-0"
          >
            <div className="flex flex-col gap-1 w-full">
              {PROJECTS.map((project) => (
                <ProjectItem
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  year={project.year}
                  videoUrl={project.videoUrl}
                  aspectRatio={project.aspectRatio}
                  onHoverStart={() => setIsFocusMode(true)}
                  onHoverEnd={() => setIsFocusMode(false)}
                  onClick={() => {
                    setSelectedProject(project);
                    setShowDetailPage(true);
                  }}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {showDetailPage && (
            <ProjectDetail
              project={selectedProject}
              onClose={() => {
                setShowDetailPage(false);
                setSelectedProject(null);
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}
