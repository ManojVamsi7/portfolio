"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView, useScroll } from "framer-motion"
import { ArrowDown, Code, ExternalLink, Github, Mail, Monitor, Server } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

// Add these imports at the top with the other imports
import { useState, useEffect } from "react"
import { Menu, Moon, Sun, FileText, X } from "lucide-react"
import { useTheme } from "next-themes"

export default function Portfolio() {
  const { scrollYProgress } = useScroll()
  const heroRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const skillsInView = useInView(skillsRef, { once: true, amount: 0.3 })
  const projectsInView = useInView(projectsRef, { once: true, amount: 0.3 })
  const contactInView = useInView(contactRef, { once: true, amount: 0.3 })

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Add state for mobile menu at the top of the component
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-teal-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-40 border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold dark:text-white"
          >
            Alex.Dev
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex space-x-8"
          >
            <button
              onClick={() => scrollToSection(heroRef)}
              className="text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection(skillsRef)}
              className="text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection(projectsRef)}
              className="text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection(contactRef)}
              className="text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
            >
              Contact
            </button>
          </motion.nav>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hidden md:flex items-center space-x-4"
          >
            <ThemeToggle />
            <ResumeButton />
            <Button
              onClick={() => scrollToSection(contactRef)}
              className="bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700"
            >
              Get in touch
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          onNavigate={(ref) => {
            scrollToSection(ref)
            setMobileMenuOpen(false)
          }}
          refs={{ heroRef, skillsRef, projectsRef, contactRef }}
        />
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center pt-20">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-sm font-medium text-teal-500 dark:text-teal-400 mb-4"
            >
              COMPUTER SCIENCE GRADUATE
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              <span className="block">Hello, I'm Alex.</span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="block mt-2"
              >
                I build <span className="text-teal-500 dark:text-teal-400">digital experiences</span> for the web.
              </motion.span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed"
            >
              A passionate full-stack developer specializing in creating elegant, user-friendly applications with clean
              code and modern technologies.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                onClick={() => scrollToSection(projectsRef)}
                className="bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700"
              >
                View my work
              </Button>
              <Button
                onClick={() => scrollToSection(contactRef)}
                variant="outline"
                className="border-gray-300 dark:border-gray-700"
              >
                Contact me
              </Button>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex justify-center mt-20"
          >
            <motion.button
              onClick={() => scrollToSection(skillsRef)}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
              className="text-gray-400 dark:text-gray-600 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
            >
              <ArrowDown size={24} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={skillsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto mb-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">Technical Skills</h2>
            <p className="text-gray-600 dark:text-gray-400">
              My expertise spans across various technologies and frameworks, allowing me to build complete solutions
              from front-end to back-end.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <SkillCard
              icon={<Monitor className="h-8 w-8 text-teal-500" />}
              title="Frontend Development"
              skills={["React", "Next.js", "TypeScript", "TailwindCSS", "Framer Motion"]}
              delay={0}
              inView={skillsInView}
            />
            <SkillCard
              icon={<Server className="h-8 w-8 text-teal-500" />}
              title="Backend Development"
              skills={["Node.js", "Express", "Python", "PostgreSQL", "MongoDB"]}
              delay={0.2}
              inView={skillsInView}
            />
            <SkillCard
              icon={<Code className="h-8 w-8 text-teal-500" />}
              title="Other Skills"
              skills={["Git", "Docker", "AWS", "CI/CD", "Testing"]}
              delay={0.4}
              inView={skillsInView}
            />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="py-20 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto mb-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">Featured Projects</h2>
            <p className="text-gray-600 dark:text-gray-400">
              A selection of my recent work, showcasing my skills and passion for building exceptional digital
              experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <ProjectCard
              title="E-commerce Platform"
              description="A full-featured online store with product management, cart functionality, and secure checkout process."
              tags={["Next.js", "TypeScript", "Stripe", "Tailwind"]}
              image="/placeholder.svg?height=400&width=600"
              delay={0}
              inView={projectsInView}
            />
            <ProjectCard
              title="Task Management App"
              description="A collaborative task management tool with real-time updates, drag-and-drop interface, and team collaboration features."
              tags={["React", "Firebase", "Framer Motion", "CSS Modules"]}
              image="/placeholder.svg?height=400&width=600"
              delay={0.2}
              inView={projectsInView}
            />
            <ProjectCard
              title="Portfolio Website"
              description="A responsive portfolio website with smooth animations and modern design principles."
              tags={["Next.js", "Framer Motion", "Tailwind CSS"]}
              image="/placeholder.svg?height=400&width=600"
              delay={0.4}
              inView={projectsInView}
            />
            <ProjectCard
              title="Weather Dashboard"
              description="A weather application with location-based forecasts, interactive maps, and historical data visualization."
              tags={["React", "Chart.js", "Weather API", "Styled Components"]}
              image="/placeholder.svg?height=400&width=600"
              delay={0.6}
              inView={projectsInView}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto mb-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">Get In Touch</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Have a project in mind or want to discuss potential opportunities? I'd love to hear from you.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={contactInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium dark:text-gray-300">
                    Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium dark:text-gray-300">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium dark:text-gray-300">
                  Subject
                </label>
                <Input
                  id="subject"
                  placeholder="Subject"
                  className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium dark:text-gray-300">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Your message"
                  rows={5}
                  className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700"
              >
                Send Message
              </Button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contactInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 flex justify-center space-x-6"
            >
              <a
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
              >
                <Github size={24} />
              </a>
              <a
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
              >
                <Mail size={24} />
              </a>
              <a
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
              >
                <ExternalLink size={24} />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-100 dark:border-gray-800 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Alex.Dev. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

// Add these new components before the SkillCard component

// Add ThemeToggle component
function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  )
}

// Add ResumeButton component
function ResumeButton() {
  return (
    <Button
      variant="outline"
      className="border-gray-300 dark:border-gray-700 flex items-center gap-2"
      onClick={() => window.open("/resume.pdf", "_blank")}
    >
      <FileText className="h-4 w-4" />
      <span>Resume</span>
    </Button>
  )
}

// Add MobileMenu component
interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  onNavigate: (ref: React.RefObject<HTMLDivElement>) => void
  refs: {
    heroRef: React.RefObject<HTMLDivElement>
    skillsRef: React.RefObject<HTMLDivElement>
    projectsRef: React.RefObject<HTMLDivElement>
    contactRef: React.RefObject<HTMLDivElement>
  }
}

function MobileMenu({ isOpen, onClose, onNavigate, refs }: MobileMenuProps) {
  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col"
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-800">
        <div className="text-xl font-bold dark:text-white">Alex.Dev</div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-6 w-6" />
        </Button>
      </div>
      <div className="flex flex-col p-4 space-y-6">
        <button
          onClick={() => onNavigate(refs.heroRef)}
          className="py-2 text-lg text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
        >
          Home
        </button>
        <button
          onClick={() => onNavigate(refs.skillsRef)}
          className="py-2 text-lg text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
        >
          Skills
        </button>
        <button
          onClick={() => onNavigate(refs.projectsRef)}
          className="py-2 text-lg text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
        >
          Projects
        </button>
        <button
          onClick={() => onNavigate(refs.contactRef)}
          className="py-2 text-lg text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
        >
          Contact
        </button>
        <div className="pt-4 flex flex-col space-y-4">
          <Button
            onClick={() => {
              window.open("/resume.pdf", "_blank")
              onClose()
            }}
            variant="outline"
            className="w-full border-gray-300 dark:border-gray-700 flex items-center justify-center gap-2"
          >
            <FileText className="h-4 w-4" />
            <span>Resume</span>
          </Button>
          <Button
            onClick={() => {
              onNavigate(refs.contactRef)
            }}
            className="w-full bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700"
          >
            Get in touch
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

interface SkillCardProps {
  icon: React.ReactNode
  title: string
  skills: string[]
  delay: number
  inView: boolean
}

function SkillCard({ icon, title, skills, delay, inView }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
        className="mb-4"
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-bold mb-3 dark:text-white">{title}</h3>
      <ul className="space-y-2">
        {skills.map((skill, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: delay + 0.3 + index * 0.1 }}
            className="text-gray-600 dark:text-gray-400"
          >
            {skill}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  image: string
  delay: number
  inView: boolean
}

function ProjectCard({ title, description, tags, image, delay, inView }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="group bg-white dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
    >
      <div className="relative overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-teal-500 bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-teal-500">
            View Project
          </Button>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors dark:text-white">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={cn(
                "text-xs px-2 py-1 rounded-full",
                index % 3 === 0
                  ? "bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300"
                  : index % 3 === 1
                    ? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    : "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// Update the contact section

// Update the footer
