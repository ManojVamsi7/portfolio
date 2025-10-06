"use client"

import type React from "react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import emailjs from "@emailjs/browser"
import { motion, useInView, useScroll } from "framer-motion"
import {
  AlertCircle,
  ArrowDown,
  Briefcase,
  Calendar,
  CheckCircle,
  Code,
  ExternalLink,
  FileText,
  Github,
  Loader2,
  Mail,
  Menu,
  Monitor,
  Moon,
  Server,
  Sun,
  X,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useRef, useState } from "react"

export default function Portfolio() {
  const { scrollYProgress } = useScroll()
  const heroRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const experienceRef = useRef<HTMLDivElement>(null) // New ref for experience section
  const projectsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const skillsInView = useInView(skillsRef, { once: true, amount: 0.3 })
  const experienceInView = useInView(experienceRef, { once: true, amount: 0.3 }) // New inView for experience
  const projectsInView = useInView(projectsRef, { once: true, amount: 0.3 })
  const contactInView = useInView(contactRef, { once: true, amount: 0.3 })

  // Add state for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme } = useTheme()

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [mobileMenuOpen])

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-teal-500 origin-left z-40"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-30 border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold dark:text-white"
          >
            Vamsi
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
              onClick={() => scrollToSection(experienceRef)}
              className="text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
            >
              Experience
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
      </header>

      {/* Simple Mobile Menu - No animations, just a basic overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div
            className="fixed inset-y-0 right-0 w-full max-w-sm overflow-y-auto"
            style={{
              backgroundColor: theme === "dark" ? "#111827" : "#ffffff",
              boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="text-xl font-bold dark:text-white">Vamsi</div>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>

            <div className="p-4">
              <nav className="flex flex-col space-y-4">
                <button
                  onClick={() => {
                    scrollToSection(heroRef)
                    setMobileMenuOpen(false)
                  }}
                  className="py-3 text-lg text-gray-800 dark:text-gray-200 hover:text-teal-500 dark:hover:text-teal-400"
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    scrollToSection(skillsRef)
                    setMobileMenuOpen(false)
                  }}
                  className="py-3 text-lg text-gray-800 dark:text-gray-200 hover:text-teal-500 dark:hover:text-teal-400"
                >
                  Skills
                </button>
                <button
                  onClick={() => {
                    scrollToSection(experienceRef)
                    setMobileMenuOpen(false)
                  }}
                  className="py-3 text-lg text-gray-800 dark:text-gray-200 hover:text-teal-500 dark:hover:text-teal-400"
                >
                  Experience
                </button>
                <button
                  onClick={() => {
                    scrollToSection(projectsRef)
                    setMobileMenuOpen(false)
                  }}
                  className="py-3 text-lg text-gray-800 dark:text-gray-200 hover:text-teal-500 dark:hover:text-teal-400"
                >
                  Projects
                </button>
                <button
                  onClick={() => {
                    scrollToSection(contactRef)
                    setMobileMenuOpen(false)
                  }}
                  className="py-3 text-lg text-gray-800 dark:text-gray-200 hover:text-teal-500 dark:hover:text-teal-400"
                >
                  Contact
                </button>
              </nav>

              <div className="mt-8 space-y-4">
                <Button
                  onClick={() => {
                    window.open("/Dakamarri Manoj Vamsi.pdf", "_blank")
                    setMobileMenuOpen(false)
                  }}
                  variant="outline"
                  className="w-full border-gray-300 dark:border-gray-700 flex items-center justify-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  <span>Resume</span>
                </Button>
                <Button
                  onClick={() => {
                    scrollToSection(contactRef)
                    setMobileMenuOpen(false)
                  }}
                  className="w-full bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700"
                >
                  Get in touch
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

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
              <span className="block">Hello, I'm Vamsi.</span>
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

      {/* Experience Section */}
      <section ref={experienceRef} className="py-20 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={experienceInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto mb-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">Work Experience</h2>
            <p className="text-gray-600 dark:text-gray-400">
              My professional journey and the companies I've had the privilege to work with.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <ExperienceTimeline inView={experienceInView} />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="py-20 bg-gray-50 dark:bg-gray-800">
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
              title="study-flow-tracker"
              description="A smart study timer and productivity tracker built with React and TailwindCSS, designed to help users manage focus sessions, breaks, and tasks seamlessly."
              tags={["Next.js", "TypeScript", "Tailwind"]}
              image="/E-C.png?height=400&width=600"
              projectUrl="https://study-flow-tracker.vercel.app/"
              delay={0}
              inView={projectsInView}
            />
            <ProjectCard
              title="Weather Dashboard"
              description="A weather application with location-based forecasts, interactive maps, and historical data visualization."
              tags={["React", "Chart.js", "Weather API", "Styled Components"]}
              image="/WD-1.svg?height=400&width=600"
              projectUrl="https://weather-dahboard-92wg.vercel.app/"
              delay={0.6}
              inView={projectsInView}
            />
          </div>
        </div>
      </section>

      {/* Contact Section with EmailJS Integration */}
      <section ref={contactRef} className="py-20 dark:bg-gray-900">
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
            <ContactForm inView={contactInView} />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contactInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 flex justify-center space-x-6"
            >
              <a
                href="https://github.com/Manojvamsi7"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
              >
                <Github size={24} />
              </a>
              <a
                href="mailto:manojvamsi.d07@gmail.com"
                aria-label="Email Me"
                className="text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
              >
                <Mail size={24} />
              </a>
              <a
                href="https://linkedin.com/in/manoj-vamsi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
              >
                <ExternalLink size={24} />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Manoj Vamsi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

// Experience Timeline Component
function ExperienceTimeline({ inView }: { inView: boolean }) {
  const experiences = [
    {
      title: "PoweBI & Tableau Intern",
      company: "OceanApps Techonlogies PVT LTD.",
      period: "Jan 2025 - Apr 2025",
      description:
        "Assisted in designing interactive dashboards and visual reports using Power BI and Tableau. Analyzed large datasets to extract actionable insights and supported data-driven decision-making for business operations.",
      skills: ["Power BI", "Tableau", "Data Visualization", "SQL", "Excel",]
    },
    {
      title: "QA Tester Intern",
      company: "Wyreflow Techonologies",
      period: "Oct 2024 - Nov 2024",
      description:
        "Performed manual and automated testing to identify bugs and ensure software quality across web and mobile applications. Collaborated with developers to reproduce issues, write test cases, and verify fixes for enhanced user experience.",
      skills: ["Manual Testing", "Automation Testing", "Test Cases", "Agile"],
    },
    {
      title: "AIML Intern",
      company: "Q-bits Learning",
      period: "jun 2024 - Aug 2024",
      description:
        "Worked on developing and training machine learning models for real-world applications. Assisted in data preprocessing, model evaluation, and implementation of AI solutions using Python.",
      skills: ["Python", "Machine Learning", "Deep Learning", "NumPy"],
    },
  ]

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gray-200 dark:bg-gray-700"></div>

      {/* Experience items */}
      {experiences.map((experience, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          className={`relative flex flex-col md:flex-row md:items-center mb-12 ${
            index % 2 === 0 ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Timeline dot */}
          <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-teal-500 border-4 border-white dark:border-gray-900 z-10"></div>

          {/* Content */}
          <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-2">
                <Briefcase className="h-5 w-5 text-teal-500 mr-2" />
                <h3 className="text-xl font-bold dark:text-white">{experience.title}</h3>
              </div>
              <div className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{experience.company}</div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                <Calendar className="h-4 w-4 mr-1" />
                {experience.period}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{experience.description}</p>
              <div className="flex flex-wrap gap-2">
                {experience.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="text-xs px-2 py-1 rounded-full bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Contact Form Component with EmailJS
function ContactForm({ inView }: { inView: boolean }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const formRef = useRef<HTMLFormElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Replace these with your actual EmailJS credentials
      const serviceId = "service_8cr17ko"
      const templateId = "template_4xgco5m"
      const publicKey = "UFBcwHkxmtXzXqvpT"

      await emailjs.sendForm(serviceId, templateId, formRef.current!, publicKey)

      setSubmitStatus("success")
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      console.error("Error sending email:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {submitStatus === "success" && (
        <Alert className="mb-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900">
          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription className="text-green-600 dark:text-green-400">
            Your message has been sent successfully! I'll get back to you soon.
          </AlertDescription>
        </Alert>
      )}

      {submitStatus === "error" && (
        <Alert className="mb-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900">
          <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
          <AlertDescription className="text-red-600 dark:text-red-400">
            There was an error sending your message. Please try again later.
          </AlertDescription>
        </Alert>
      )}

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium dark:text-gray-300">
              Name <span className="text-red-500">*</span>
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-teal-500 focus:ring-teal-500"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium dark:text-gray-300">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-teal-500 focus:ring-teal-500"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium dark:text-gray-300">
            Subject
          </label>
          <Input
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-teal-500 focus:ring-teal-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium dark:text-gray-300">
            Message <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message"
            rows={5}
            className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-teal-500 focus:ring-teal-500"
            required
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </motion.div>
  )
}

// ThemeToggle component
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

// ResumeButton component
function ResumeButton() {
  return (
    <Button
      variant="outline"
      className="border-gray-300 dark:border-gray-700 flex items-center gap-2"
      onClick={() => window.open("/Manoj Vamsi Dakamarri.pdf", "_blank")}
    >
      <FileText className="h-4 w-4" />
      <span>Resume</span>
    </Button>
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
  projectUrl: string
  delay: number
  inView: boolean
}

function ProjectCard({ title, description, tags, image, projectUrl, delay, inView }: ProjectCardProps) {
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
          <Button
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-teal-500"
            onClick={() => window.open(projectUrl, "_blank", "noopener noreferrer")}
            aria-label={`View ${title} project`}
          >
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
