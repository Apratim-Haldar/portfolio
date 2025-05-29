"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Brain,
  Code2,
  Zap,
  Eye,
  Trophy,
  Terminal,
  Microscope,
  Cpu,
  ChevronRight,
  MapPin,
  Star,
  Award,
  GraduationCap,
  Building,
  Lightbulb,
  Target,
  Download,
  ArrowDown,
  Server,
  Database,
  Globe,
  Layers,
  Phone,
} from "lucide-react"

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState<number | null>(null)
  const [activeSkill, setActiveSkill] = useState<number | null>(null)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [bootProgress, setBootProgress] = useState(0)
  const [showIntro, setShowIntro] = useState(true)
  const [introStep, setIntroStep] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [timelineProgress, setTimelineProgress] = useState(0)
  const [visibleSections, setVisibleSections] = useState({
    about: false,
    timeline: false,
    projects: false,
    skills: false,
    research: false,
    contact: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error'>('success')
  const [modalText, setModalText] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const aboutRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const skillsRef = useRef<HTMLElement>(null)
  const researchRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  const introSteps = [
    {
      title: "Hello World!",
      subtitle: "I'm Apratim Haldar",
      description:
        "A passionate Full Stack Developer with expertise in Generative AI and AI/ML, transforming ideas into impactful solutions.",
      icon: Code2,
      color: "from-emerald-400 to-cyan-400",
    },
    {
      title: "My Development Journey",
      subtitle: "From Student to Innovator",
      description:
        "Currently pursuing BTech in Computer Science while working as a Software Developer Intern at Swiftrinity, building enterprise-grade solutions.",
      icon: GraduationCap,
      color: "from-blue-400 to-purple-400",
    },
    {
      title: "Key Achievements",
      subtitle: "Recognition & Research",
      description:
        "2nd Prize winner at Binary Hackathon 2025 among 75+ teams, with published research in IEEE conferences on AI and Computer Vision.",
      icon: Trophy,
      color: "from-yellow-400 to-orange-400",
    },
    {
      title: "Let's Dive Into My Code",
      subtitle: "Explore My Projects",
      description:
        "Scroll through my portfolio to see my projects, skills, and journey as a developer. Each line of code tells a story of innovation.",
      icon: Terminal,
      color: "from-purple-400 to-pink-400",
    },
  ]

  const timeline = [
    {
      id: 1,
      year: "2022",
      title: "The Beginning",
      subtitle: "Started BTech Journey",
      description:
        "Embarked on my Computer Science and Engineering journey at Institute of Engineering and Management, Kolkata.",
      type: "education",
      icon: GraduationCap,
      color: "blue",
      achievements: ["Enrolled in BTech CSE", "Started programming journey", "Discovered passion for full stack development and generative AI"],
      location: "Kolkata, West Bengal",
    },
    {
      id: 2,
      year: "2023",
      title: "First Breakthrough",
      subtitle: "Deep Dive into AI/ML",
      description:
        "Developed expertise in machine learning and computer vision, starting my first major projects in AI.",
      type: "skill",
      icon: Brain,
      color: "purple",
      achievements: ["Mastered Python & ML libraries", "Built first AI models", "Started computer vision research"],
      location: "Remote Learning",
    },
    {
      id: 3,
      year: "2024",
      title: "Research Excellence",
      subtitle: "IEEE Publication Success",
      description:
        "Published research on Semantic Edge Detection using PSPNet, winning 1st Prize at IEEE AISC 2024 conference.",
      type: "achievement",
      icon: Award,
      color: "yellow",
      achievements: ["1st Prize IEEE AISC 2024", "Research paper published", "Recognition in academic community"],
      location: "B.P. Poddar Institute",
    },
    {
      id: 4,
      year: "2024",
      title: "Project Innovation",
      subtitle: "Building Real Solutions",
      description:
        "Developed multiple full-stack applications including DeepTruth, Heartify, and HireSight with cutting-edge AI integration.",
      type: "project",
      icon: Lightbulb,
      color: "emerald",
      achievements: ["4 major projects completed", "95% AI accuracy achieved", "Full-stack expertise gained"],
      location: "Personal Projects",
    },
    {
      id: 5,
      year: "2025",
      title: "Hackathon Victory",
      subtitle: "Agnarok Success",
      description:
        "Won 2nd Prize at Binary Hackathon 2025 with Agnarok - a revolutionary no-code AI agent builder platform.",
      type: "achievement",
      icon: Trophy,
      color: "orange",
      achievements: ["2nd Prize among 75+ teams", "Custom agents built with python and website using react and typescript", "Team leadership experience"],
      location: "Kalyani Government Engineering College",
    },
    {
      id: 6,
      year: "2025",
      title: "Professional Growth",
      subtitle: "Swiftrinity Internship",
      description:
        "Joined Swiftrinity as Software Developer Intern, working on enterprise-grade low-code application builder platforms.",
      type: "work",
      icon: Building,
      color: "cyan",
      achievements: [
        "Enterprise development experience",
        "GitHub OAuth integration",
        "Agile methodology",
        "Team collaboration",
      ],
      location: "Kolkata, India (Remote/Hybrid)",
    },
    {
      id: 7,
      year: "2025",
      title: "Future Vision",
      subtitle: "Continuing Innovation",
      description:
        "Currently working on full stack applications and generative AI integration for building real world problem solving applications.",
      type: "future",
      icon: Target,
      color: "pink",
      achievements: ["Ongoing research projects", "Advanced full stack application development", "Industry collaboration"],
      location: "The Future",
    },
  ]

  const projects = [
    {
      id: 1,
      name: "Heartify",
      type: "Health Monitoring",
      status: "Production",
      description:
        "One of the 14 Finalists chosen out of 1000+ teams in SIGHT 2.0, pan-India competition organized by UST Global. Heartify is a real-time cardiovascular risk prediction platform using machine learning and live vitals data with WebSocket integration.",
      achievement: "🏆 Finalist – SIGHT 2.0",
      icon: Zap,
      color: "from-red-500 to-orange-500",
      tech: ["React", "TypeScript", "Flask", "Socket.IO", "scikit-learn"],
      metrics: { accuracy: "94%", realtime: "100ms", users: "500+" },
      links: {
        live: "https://heartify-website.vercel.app/",
        source: "https://github.com/Apratim-Haldar/heartify_website",
      },
      codeSnippet: `// Real-time heart rate monitoring
socket.on('vitals_update', (data) => {
  const { heartRate, bloodPressure, activity } = data;
  
  // Update visualization
  updateCharts(data);
  
  // Run risk assessment
  const risk = assessCardiovascularRisk(
    heartRate, 
    bloodPressure,
    userProfile,
    activity
  );
  
  if (risk > THRESHOLD) {
    notifyUser('Warning: Elevated cardiovascular risk detected');
  }
});`,
    },
    {
      id: 2,
      name: "HireSight",
      type: "HR Automation",
      status: "Alpha",
      description:
        "A full-stack recruitment platform with intelligent job matching, automated screening, and context-aware AI assistant. Fully developed but awaiting deployment.",
      icon: Zap,
      color: "from-blue-500 to-cyan-500",
      tech: ["React", "Node.js", "MongoDB", "AWS S3", "Gemini AI"],
      metrics: { efficiency: "80%", time: "60%", accuracy: "92%" },
      links: {
        demo: "https://drive.google.com/file/d/1C_9TZPD6I365XwHfECtAjyQn6tdltHQ8/view",
        source: "https://github.com/Apratim-Haldar/RecruitAI",
      },
      codeSnippet: `// AI-powered candidate matching
async function matchCandidates(jobDescription, candidates) {
  const embeddings = await generateEmbeddings(jobDescription);
  
  return candidates
    .map(candidate => ({
      ...candidate,
      score: cosineSimilarity(embeddings, candidate.embeddings)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
}`,
    },
    {
      id: 3,
      name: "Agnarok",
      type: "AI Agent Builder",
      status: "Alpha",
      description:
        "A revolutionary platform enabling users to build custom AI agents using natural language prompts and tool integrations. Fully developed but awaiting deployment.",
      achievement: "🏆 2nd Prize among 75+ teams – Binary Hackathon 2025",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
      tech: ["React.js", "TypeScript", "AI Integration", "NLP"],
      metrics: { accuracy: "95%", platform: "No Code", integrations: "10+" },
      links: {
        demo: "https://youtu.be/5i1s0GiWL0w?si=VNcLRHE3yu1_WE1X",
      },
      codeSnippet: `// Agent creation with natural language
const createAgent = async (prompt, tools) => {
  const agent = await AgentBuilder.create({
    instructions: prompt,
    tools: tools.map(t => AVAILABLE_TOOLS[t]),
    model: "gpt-4o",
  });
  
  return agent;
};`,
    },
    {
      id: 4,
      name: "DeepTruth",
      type: "AI Content Detection",
      status: "Alpha",
      description:
        "An advanced ML-powered tool for detecting AI-generated content across images, videos, and audio with 95% accuracy. Fully developed but awaiting deployment.",
      icon: Eye,
      color: "from-emerald-500 to-teal-500",
      tech: ["Python", "Flask", "React.js", "ML", "Computer Vision"],
      metrics: { accuracy: "95%", speed: "5s", formats: "3" },
      links: {
        source: "https://github.com/srijitt/deeptruth-ai",
      },
      codeSnippet: `# Multi-modal AI detection
def detect_ai_content(content, content_type):
    if content_type == "image":
        return image_detector.predict(content)
    elif content_type == "text":
        return text_detector.predict(content)
    elif content_type == "audio":
        return audio_detector.predict(content)
    else:
        raise ValueError("Unsupported content type")`,
    },
  ]

  const skills = [
    {
      id: 1,
      name: "AI/ML",
      proficiency: "Expert",
      icon: Brain,
      color: "purple",
      description:
        "Specialized in neural networks, natural language processing, and computer vision with practical applications across multiple domains.",
      projects: ["Agnarok", "DeepTruth", "Heartify"],
      level: 60,
    },
    {
      id: 2,
      name: "React Ecosystem",
      proficiency: "Expert",
      icon: Code2,
      color: "cyan",
      description:
        "Advanced proficiency in React.js, TypeScript, Next.js, and related technologies for building complex, interactive web applications.",
      projects: ["Agnarok", "HireSight", "Heartify"],
      level: 95,
    },
    {
      id: 3,
      name: "Python Stack",
      proficiency: "Advanced",
      icon: Terminal,
      color: "blue",
      description:
        "Extensive experience with Python for data science, machine learning, and backend development using Flask, scikit-learn, and TensorFlow.",
      projects: ["DeepTruth", "Heartify"],
      level: 90,
    },
    {
      id: 4,
      name: "Computer Vision",
      proficiency: "Expert",
      icon: Eye,
      color: "green",
      description:
        "Specialized in image processing, object detection, and semantic segmentation with applications in satellite imagery and medical diagnostics.",
      projects: ["DeepTruth", "PSPNet Research"],
      level: 30,
    },
    {
      id: 5,
      name: "System Architecture",
      proficiency: "Advanced",
      icon: Layers,
      color: "amber",
      description:
        "Designing scalable, resilient systems with microservices, API integration, and cloud infrastructure.",
      projects: ["Agnarok", "HireSight"],
      level: 85,
    },
  ]

  const research = [
    {
      id: 1,
      title: "Semantic Edge Detection on Satellite Imagery Using PSPNet",
      status: "Published",
      achievement: "1st Prize – IEEE AISC 2024",
      description:
        "Advanced research utilizing Pyramid Scene Parsing Networks for semantic edge detection in satellite imagery, achieving superior performance over traditional methods.",
    },
    {
      id: 2,
      title: "PSPNet-Based Deep Segmentation for Remote Sensing Applications",
      status: "Under Review",
      description:
        "Ongoing research on advanced PSPNet architectures for high-resolution edge detection in remote sensing data, emphasizing ecological monitoring.",
    },
  ]

  useEffect(() => {
    // Boot up progress
    const powerInterval = setInterval(() => {
      setBootProgress((prev) => {
        if (prev >= 100) {
          clearInterval(powerInterval)
          return 100
        }
        return prev + 2
      })
    }, 50)

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
      setIsScrolling(true)

      // Clear previous timeout
      const timeoutId = setTimeout(() => {
        setIsScrolling(false)
      }, 150)

      // Check which sections are visible
      const checkVisibility = (ref: React.RefObject<HTMLElement>, sectionName: string) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect()
          const isVisible = rect.top < window.innerHeight * 0.75 && rect.bottom > window.innerHeight * 0.25

          setVisibleSections((prev) => ({
            ...prev,
            [sectionName]: isVisible,
          }))

          // Update timeline progress when timeline section is visible
          if (sectionName === "timeline" && isVisible) {
            const progress = Math.min(
              100,
              Math.max(0, ((window.innerHeight * 0.5 - rect.top) / (rect.height - window.innerHeight * 0.5)) * 100),
            )
            setTimelineProgress(progress)
          }
        }
      }

      checkVisibility(aboutRef, "about")
      checkVisibility(timelineRef, "timeline")
      checkVisibility(projectsRef, "projects")
      checkVisibility(skillsRef, "skills")
      checkVisibility(researchRef, "research")
      checkVisibility(contactRef, "contact")

      return () => clearTimeout(timeoutId)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    return () => {
      clearInterval(powerInterval)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Auto-advance intro steps
  useEffect(() => {
    if (showIntro && bootProgress >= 100) {
      const stepInterval = setInterval(() => {
        setIntroStep((prev) => {
          if (prev >= introSteps.length - 1) {
            clearInterval(stepInterval)
            return prev
          }
          return prev + 1
        })
      }, 3000)

      return () => clearInterval(stepInterval)
    }
  }, [showIntro, bootProgress, introSteps.length])

  const enterPortfolio = () => {
    setShowIntro(false)
  }

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  const getColorClass = (color: string) => {
    switch (color) {
      case "purple":
        return "bg-purple-500"
      case "cyan":
        return "bg-cyan-500"
      case "blue":
        return "bg-blue-500"
      case "green":
        return "bg-emerald-500"
      case "amber":
        return "bg-amber-500"
      case "yellow":
        return "bg-yellow-500"
      case "orange":
        return "bg-orange-500"
      case "pink":
        return "bg-pink-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTimelineColor = (type: string) => {
    switch (type) {
      case "education":
        return "from-blue-500 to-cyan-500"
      case "skill":
        return "from-purple-500 to-pink-500"
      case "achievement":
        return "from-yellow-500 to-orange-500"
      case "project":
        return "from-emerald-500 to-teal-500"
      case "work":
        return "from-cyan-500 to-blue-500"
      case "future":
        return "from-pink-500 to-purple-500"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  const validateForm = () => {
    return formData.name.trim() !== '' && 
           formData.email.trim() !== '' && 
           formData.message.trim() !== '' &&
           /\S+@\S+\.\S+/.test(formData.email)
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Validation checks
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setModalText("Please fill in all fields.")
      setSubmitStatus('error')
      setShowModal(true)
      return
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setModalText("Please enter a valid email address.")
      setSubmitStatus('error')
      setShowModal(true)
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("https://formsubmit.co/ajax/haldar.apratim005@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      })

      const data = await response.json()
      
      if (data.success === "true" || response.ok) {
        setSubmitStatus('success')
        setModalText("Message sent successfully! I'll get back to you within 24 hours.")
        setFormData({ name: '', email: '', message: '' })
      } else {
        setSubmitStatus('error')
        setModalText("Message failed to send. Please try again later.")
      }
    } catch (error) {
      setSubmitStatus('error')
      setModalText("Message failed to send. Please try again later.")
    } finally {
      setIsSubmitting(false)
      setShowModal(true)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  if (showIntro) {
    const currentStep = introSteps[introStep]

    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>

          {/* Code Matrix Background */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute text-emerald-500 font-mono text-xs"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.8,
                  animation: `fall ${5 + Math.random() * 10}s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              >
                {[...Array(10)].map((_, j) => (
                  <div key={j}>{Math.random() > 0.5 ? "1" : "0"}</div>
                ))}
              </div>
            ))}
          </div>

          {/* Particles */}
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.8,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-4xl relative z-10">
          {/* Main Intro Content */}
          <div className="mb-12">
            <div
              className={`w-32 h-32 mx-auto mb-8 bg-gradient-to-r ${currentStep.color} rounded-full flex items-center justify-center transform transition-all duration-1000 hover:scale-110`}
            >
              <currentStep.icon className="h-16 w-16 text-white" />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white transition-all duration-1000">
              {currentStep.title}
            </h1>

            <h2
              className={`text-2xl md:text-3xl mb-6 bg-gradient-to-r ${currentStep.color} bg-clip-text text-transparent font-semibold transition-all duration-1000`}
            >
              {currentStep.subtitle}
            </h2>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto transition-all duration-1000">
              {currentStep.description}
            </p>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center space-x-3 mb-8">
            {introSteps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  index === introStep
                    ? "bg-emerald-400 scale-125"
                    : index < introStep
                      ? "bg-emerald-600"
                      : "bg-gray-600"
                }`}
              />
            ))}
          </div>

          {/* Boot Progress */}
          <div className="mb-8">
            <div className="w-full max-w-md mx-auto bg-gray-800 rounded-full h-4 mb-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-4 rounded-full transition-all duration-300 relative"
                style={{ width: `${bootProgress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
            <p className="text-emerald-400 font-mono text-lg">
              {bootProgress < 100 ? `Compiling portfolio... ${bootProgress}%` : "$ ./portfolio --mode=interactive"}
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {bootProgress >= 100 && introStep >= introSteps.length - 1 && (
              <Button
                onClick={enterPortfolio}
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-black font-bold text-lg px-8 py-6 rounded-full transform hover:scale-105 transition-all duration-300"
              >
                <Terminal className="mr-2 h-6 w-6" />
                Explore My Work
              </Button>
            )}

            {bootProgress >= 100 && introStep < introSteps.length - 1 && (
              <Button
                onClick={() => setIntroStep(introStep + 1)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-lg px-8 py-6 rounded-full transform hover:scale-105 transition-all duration-300"
              >
                Continue
                <ChevronRight className="ml-2 h-6 w-6" />
              </Button>
            )}
          </div>

          {/* Quick Stats Preview */}
          {introStep >= 2 && (
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 opacity-80">
              <div className="text-center transform hover:scale-110 transition-all duration-300">
                <div className="text-3xl font-bold text-emerald-400">4+</div>
                <div className="text-sm text-gray-400">Major Projects</div>
              </div>
              <div className="text-center transform hover:scale-110 transition-all duration-300">
                <div className="text-3xl font-bold text-purple-400">2</div>
                <div className="text-sm text-gray-400">Research Papers</div>
              </div>
              <div className="text-center transform hover:scale-110 transition-all duration-300">
                <div className="text-3xl font-bold text-cyan-400">95%</div>
                <div className="text-sm text-gray-400">AI Accuracy</div>
              </div>
              <div className="text-center transform hover:scale-110 transition-all duration-300">
                <div className="text-3xl font-bold text-yellow-400">2nd</div>
                <div className="text-sm text-gray-400">Prize Winner</div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 text-white">
      {/* Fixed Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-emerald-500/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Terminal className="h-6 w-6 text-emerald-400" />
            <span className="text-xl font-bold text-white">Apratim.dev</span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => scrollToSection(aboutRef)}
              className={`text-sm ${visibleSections.about ? "text-emerald-400" : "text-gray-400 hover:text-white"} transition-colors`}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection(timelineRef)}
              className={`text-sm ${visibleSections.timeline ? "text-emerald-400" : "text-gray-400 hover:text-white"} transition-colors`}
            >
              Journey
            </button>
            <button
              onClick={() => scrollToSection(projectsRef)}
              className={`text-sm ${visibleSections.projects ? "text-emerald-400" : "text-gray-400 hover:text-white"} transition-colors`}
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection(skillsRef)}
              className={`text-sm ${visibleSections.skills ? "text-emerald-400" : "text-gray-400 hover:text-white"} transition-colors`}
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection(researchRef)}
              className={`text-sm ${visibleSections.research ? "text-emerald-400" : "text-gray-400 hover:text-white"} transition-colors`}
            >
              Research
            </button>
            <button
              onClick={() => scrollToSection(contactRef)}
              className={`text-sm ${visibleSections.contact ? "text-emerald-400" : "text-gray-400 hover:text-white"} transition-colors`}
            >
              Contact
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/apratim-haldar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-emerald-400 transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/apratim-haldar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-emerald-400 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
  href="https://drive.google.com/file/d/1H--z9HfD0Z4cgl2lcOw5lKtNWwTmgHuS/view?usp=sharing"
  target="_blank"
  download
  className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4 py-2 rounded-md flex items-center"
>
  <Download className="h-4 w-4 mr-2" />
  Resume
</a>
          </div>
        </div>
      </header>

      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Code Pattern */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute text-emerald-500 font-mono text-xs whitespace-pre"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.7,
              }}
            >
              {`function optimize() {\n  return solutions.map(s => {\n    return evaluate(s);\n  }).filter(score => score > threshold);\n}`}
            </div>
          ))}
        </div>

        {/* Cursor Gradient */}
        <div
          className="fixed w-[40vw] h-[40vw] rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 blur-3xl pointer-events-none transition-all duration-1000 ease-out"
          style={{
            left: `${cursorPosition.x - 400}px`,
            top: `${cursorPosition.y - 400}px`,
            opacity: isScrolling ? 0.3 : 0.6,
          }}
        />
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section
          ref={aboutRef}
          className="min-h-screen flex items-center justify-center px-6 pt-20"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 70%)",
          }}
        >
          <div className="max-w-6xl mx-auto w-full py-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 mb-4">
                    Software Developer & AI Architect
                  </Badge>
                  <h1 className="text-5xl md:text-7xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                      Apratim Haldar
                    </span>
                  </h1>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    Building intelligent systems and elegant solutions to complex problems. Specialized in AI, machine
                    learning, and full-stack development.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button
                    onClick={() => scrollToSection(projectsRef)}
                    className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-black px-6 py-3 rounded-full text-lg font-semibold hover:scale-105 transition-all duration-300"
                  >
                    <Code2 className="h-5 w-5 mr-2" />
                    View Projects
                  </Button>
                  <Button
                    onClick={() => scrollToSection(contactRef)}
                    variant="outline"
                    className="border-white/30 text-black hover:bg-white/10 px-6 py-3 rounded-full text-lg font-semibold hover:scale-105 transition-all duration-300"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    Contact Me
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center group hover:scale-110 transition-transform duration-300">
                    <div className="text-3xl font-bold text-emerald-400">4+</div>
                    <div className="text-sm text-gray-400">Major Projects</div>
                  </div>
                  <div className="text-center group hover:scale-110 transition-transform duration-300">
                    <div className="text-3xl font-bold text-pink-400">2</div>
                    <div className="text-sm text-gray-400">Research Papers</div>
                  </div>
                  <div className="text-center group hover:scale-110 transition-transform duration-300">
                    <div className="text-3xl font-bold text-cyan-400">95%</div>
                    <div className="text-sm text-gray-400">AI Accuracy</div>
                  </div>
                  <div className="text-center group hover:scale-110 transition-transform duration-300">
                    <div className="text-3xl font-bold text-yellow-400">2nd</div>
                    <div className="text-sm text-gray-400">Prize Winner</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm">
                  <div className="flex items-center space-x-2 border-b border-gray-700 pb-3 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="ml-2 text-sm text-gray-400">terminal</div>
                  </div>
                  <div className="font-mono text-sm space-y-2">
                    <div className="flex">
                      <span className="text-emerald-400 mr-2">$</span>
                      <span className="text-gray-300">whoami</span>
                    </div>
                    <div className="text-gray-300">apratim_haldar</div>

                    <div className="flex">
                      <span className="text-emerald-400 mr-2">$</span>
                      <span className="text-gray-300">cat about.txt</span>
                    </div>
                    <div className="text-gray-300">
                      BTech Computer Science student and Software Developer Intern at Swiftrinity. Passionate about AI,
                      machine learning, and building innovative solutions.
                    </div>

                    <div className="flex">
                      <span className="text-emerald-400 mr-2">$</span>
                      <span className="text-gray-300">ls -la projects/</span>
                    </div>
                    <div className="text-gray-300">
                      <div>drwxr-xr-x Agnarok/</div>
                      <div>drwxr-xr-x HireSight/</div>
                      <div>drwxr-xr-x DeepTruth/</div>
                      <div>drwxr-xr-x Heartify/</div>
                    </div>

                    <div className="flex">
                      <span className="text-emerald-400 mr-2">$</span>
                      <span className="text-gray-300">./view_portfolio.sh</span>
                    </div>
                    <div className="text-gray-300">Initializing portfolio view...</div>

                    <div className="flex items-center">
                      <span className="text-emerald-400 mr-2">$</span>
                      <span className="text-gray-300 animate-pulse">_</span>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <Cpu className="h-12 w-12 text-black" />
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-16">
              <button
                onClick={() => scrollToSection(timelineRef)}
                className="flex flex-col items-center text-gray-400 hover:text-emerald-400 transition-colors animate-bounce"
              >
                <span className="text-sm mb-2">Scroll to explore</span>
                <ArrowDown className="h-6 w-6" />
              </button>
            </div>
          </div>
        </section>

        {/* Journey Timeline */}
        <section ref={timelineRef} className="py-24 px-6 bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 mb-4">My Journey</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Development Timeline
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                The evolution of my career from student to professional developer and researcher.
              </p>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-purple-500 to-cyan-500 h-full"></div>

              {/* Timeline Progress Overlay */}
              <div
                className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-white/50 h-full top-0"
                style={{ height: `${100 - timelineProgress}%`, opacity: 0.6 }}
              ></div>

              {/* Timeline Items */}
              <div className="space-y-16">
                {timeline.map((item, index) => (
                  <div
                    key={item.id}
                    className={`relative flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                    style={{
                      opacity: timelineProgress > (index / timeline.length) * 100 ? 1 : 0.3,
                      transform:
                        timelineProgress > (index / timeline.length) * 100 ? "translateY(0)" : "translateY(20px)",
                      transition: "all 1s ease-out",
                      transitionDelay: `${index * 0.2}s`,
                    }}
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                      <div
                        className={`w-16 h-16 rounded-full bg-gradient-to-r ${getTimelineColor(item.type)} flex items-center justify-center border-4 border-gray-900 shadow-lg hover:scale-110 transition-transform duration-300`}
                      >
                        <item.icon className="h-8 w-8 text-white" />
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className={`w-full max-w-md ${index % 2 === 0 ? "mr-auto pr-16" : "ml-auto pl-16"}`}>
                      <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                        {/* Year Badge */}
                        <div className="flex items-center justify-between mb-4">
                          <Badge
                            className={`bg-gradient-to-r ${getTimelineColor(item.type)} text-white border-none px-3 py-1 text-sm font-bold`}
                          >
                            {item.year}
                          </Badge>
                          <div className="flex items-center space-x-2 text-gray-400">
                            <MapPin className="h-4 w-4" />
                            <span className="text-xs">{item.location}</span>
                          </div>
                        </div>

                        {/* Title & Subtitle */}
                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                        <h4 className="text-lg text-purple-400 mb-3">{item.subtitle}</h4>

                        {/* Description */}
                        <p className="text-gray-300 mb-4 leading-relaxed">{item.description}</p>

                        {/* Achievements */}
                        <div className="space-y-2">
                          <h5 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                            Key Achievements
                          </h5>
                          <div className="space-y-1">
                            {item.achievements.map((achievement, achIndex) => (
                              <div key={achIndex} className="flex items-center space-x-2">
                                <Star className="h-3 w-3 text-yellow-400" />
                                <span className="text-sm text-gray-300">{achievement}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section ref={projectsRef} className="py-24 px-6 bg-gradient-to-b from-gray-800 to-gray-900">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 mb-4">My Work</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Featured Projects
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                A showcase of my technical projects and applications.
              </p>
            </div>

            <div className="space-y-24">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
                >
                  {/* Project Info */}
                  <div className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <project.icon className="h-10 w-10 text-emerald-400" />
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                          {project.type}
                        </Badge>
                        <Badge
                          className={`
                          ${
                            project.status === "Production"
                              ? "bg-green-500/20 text-green-400 border-green-500/30"
                              : project.status === "Beta"
                                ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                          }
                        `}
                        >
                          {project.status}
                        </Badge>
                      </div>

                      <h3 className="text-4xl font-bold text-white">{project.name}</h3>

                      {project.achievement && (
                        <div className="flex items-center space-x-2 text-yellow-400">
                          <Trophy className="h-5 w-5" />
                          <span className="font-semibold">{project.achievement}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-xl text-gray-300 leading-relaxed">{project.description}</p>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} className="text-center p-4 bg-gray-800/50 rounded-lg backdrop-blur-sm">
                          <div className="text-2xl font-bold text-cyan-400">{value}</div>
                          <div className="text-sm text-gray-400 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:border-emerald-400 hover:text-emerald-400 transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex space-x-4">
                      {project.links?.live || project.links?.demo ? (
  <a
    href={project.links.live || project.links.demo}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-black hover:scale-105 transition-all duration-300">
      <ExternalLink className="h-4 w-4 mr-2" />
      View Project
    </Button>
  </a>
) : null}

{project.links?.source && (
  <a
    href={project.links.source}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Button
      variant="outline"
      className="border-gray-600 text-black hover:border-emerald-400 hover:text-emerald-400"
    >
      <Github className="h-4 w-4 mr-2" />
      Source Code
    </Button>
  </a>
)}
                    </div>
                  </div>

                  {/* Project Code */}
                  <div className={`${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300">
                      <div className="flex items-center space-x-2 border-b border-gray-700 p-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div className="ml-2 text-sm text-gray-400">
                          {project.name.toLowerCase()}.{project.tech[0].toLowerCase().includes("python") ? "py" : "js"}
                        </div>
                      </div>
                      <div className="p-6">
                        <pre className="text-sm font-mono overflow-x-auto whitespace-pre-wrap text-gray-300">
                          <code>{project.codeSnippet}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section ref={skillsRef} className="py-24 px-6 bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 mb-4">Tech Stack</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Skills & Expertise
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                The technologies and tools I use to bring ideas to life.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-12 h-12 rounded-lg ${getColorClass(skill.color)} flex items-center justify-center`}
                      >
                        <skill.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                        <p className="text-sm text-gray-400">{skill.proficiency}</p>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-cyan-400">{skill.level}%</span>
                  </div>

                  <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
                    <div
                      className={`${getColorClass(skill.color)} h-2 rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>

                  <p className="text-gray-300 mb-4">{skill.description}</p>

                  <div>
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Used In</h4>
                    <div className="flex flex-wrap gap-2">
                      {skill.projects.map((project) => (
                        <Badge key={project} className="bg-gray-700/50 text-gray-300 border-gray-600">
                          {project}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

            </div>

            {/* Additional Skills */}
            <div className="mt-16 bg-gray-800/30 border border-gray-700 rounded-xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-6">Additional Technologies</h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-cyan-400 flex items-center">
                    <Code2 className="h-5 w-5 mr-2" />
                    Frontend
                  </h4>
                  <div className="space-y-1 text-gray-300">
                    <div>TypeScript</div>
                    <div>Next.js</div>
                    <div>TailwindCSS</div>
                    <div>Redux</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-emerald-400 flex items-center">
                    <Server className="h-5 w-5 mr-2" />
                    Backend
                  </h4>
                  <div className="space-y-1 text-gray-300">
                    <div>Node.js</div>
                    <div>Express</div>
                    <div>Flask</div>
                    <div>REST APIs</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-purple-400 flex items-center">
                    <Database className="h-5 w-5 mr-2" />
                    Databases
                  </h4>
                  <div className="space-y-1 text-gray-300">
                    <div>MongoDB</div>
                    <div>PostgreSQL</div>
                    <div>Redis</div>
                    <div>Firebase</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-yellow-400 flex items-center">
                    <Globe className="h-5 w-5 mr-2" />
                    Other
                  </h4>
                  <div className="space-y-1 text-gray-300">
                    <div>Git/GitHub</div>
                    <div>Docker</div>
                    <div>AWS</div>
                    <div>CI/CD</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Research Section */}
        <section ref={researchRef} className="py-24 px-6 bg-gradient-to-b from-gray-800 to-gray-900">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 mb-4">Academic Work</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Research & Publications
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                My contributions to academic research and publications.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {research.map((paper) => (
                <div
                  key={paper.id}
                  className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    {paper.achievement ? (
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                        <Trophy className="h-4 w-4 mr-1" />
                        {paper.achievement}
                      </Badge>
                    ) : (
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">{paper.status}</Badge>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4">{paper.title}</h3>
                  <p className="text-gray-300 mb-6">{paper.description}</p>

                  <div className="flex space-x-4">
                    <Button 
                      disabled
                      className="bg-gray-600 text-gray-400 cursor-not-allowed"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Paper Coming Soon
                    </Button>
                    {paper.achievement ? (
                      <a
                        href="https://drive.google.com/file/d/1sVe9h0vXUdaVb8sT06LjqcMuJcjpxQmn/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          className="border-yellow-600 text-yellow-400 hover:border-yellow-400 hover:text-yellow-300"
                        >
                          <Award className="h-4 w-4 mr-2" />
                          View Certificate
                        </Button>
                      </a>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section ref={contactRef} className="py-24 px-6 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 mb-4">Get In Touch</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Let's Build Something Amazing
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Interested in working together? Let's connect and discuss your project.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>

                <div className="space-y-6">
                  <a
                    href="mailto:haldar.apratim005@gmail.com"
                    className="flex items-center space-x-4 p-4 bg-gray-700/30 rounded-lg hover:bg-emerald-900/30 transition-colors group"
                  >
                    <Mail className="h-6 w-6 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-white font-semibold">Email</div>
                      <div className="text-gray-300 text-sm">haldar.apratim005@gmail.com</div>
                    </div>
                  </a>

                  <a
                    href="tel:+919051113550"
                    className="flex items-center space-x-4 p-4 bg-gray-700/30 rounded-lg hover:bg-cyan-900/30 transition-colors group"
                  >
                    <Phone className="h-6 w-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-white font-semibold">Phone</div>
                      <div className="text-gray-300 text-sm">+91 9051113550</div>
                    </div>
                  </a>

                  <div className="flex items-center space-x-4 p-4 bg-gray-700/30 rounded-lg">
                    <MapPin className="h-6 w-6 text-purple-400" />
                    <div>
                      <div className="text-white font-semibold">Location</div>
                      <div className="text-gray-300 text-sm">Kolkata, West Bengal, India</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-700">
                  <h4 className="text-lg font-semibold text-white mb-4">Connect With Me</h4>
                  <div className="flex space-x-4">
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gray-700/50 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                    >
                      <Github className="h-6 w-6" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gray-700/50 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                    >
                      <Linkedin className="h-6 w-6" />
                    </a>
                    <a
                      href="mailto:haldar.apratim005@gmail.com"
                      className="w-12 h-12 bg-gray-700/50 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                    >
                      <Mail className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-6">Quick Message</h3>

                <form
                  className="space-y-6"
                  onSubmit={handleFormSubmit}
                >
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors ${
                        formData.name.trim() === '' && formData.name !== '' 
                          ? 'border-red-500' 
                          : 'border-gray-600'
                      }`}
                      placeholder="Your name"
                    />
                    {formData.name.trim() === '' && formData.name !== '' && (
                      <p className="text-red-400 text-xs mt-1">Name is required</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors ${
                        (formData.email.trim() === '' || !/\S+@\S+\.\S+/.test(formData.email)) && formData.email !== ''
                          ? 'border-red-500' 
                          : 'border-gray-600'
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {formData.email.trim() === '' && formData.email !== '' && (
                      <p className="text-red-400 text-xs mt-1">Email is required</p>
                    )}
                    {formData.email.trim() !== '' && !/\S+@\S+\.\S+/.test(formData.email) && (
                      <p className="text-red-400 text-xs mt-1">Please enter a valid email</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message" 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none transition-colors ${
                        formData.message.trim() === '' && formData.message !== '' 
                          ? 'border-red-500' 
                          : 'border-gray-600'
                      }`}
                      placeholder="Tell me about your project..."
                    />
                    {formData.message.trim() === '' && formData.message !== '' && (
                      <p className="text-red-400 text-xs mt-1">Message is required</p>
                    )}
                  </div>

                  <Button 
                    type="submit"
                    disabled={!validateForm() || isSubmitting}
                    className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-black font-semibold py-3 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-emerald-900/30 to-cyan-900/30 border border-emerald-500/30 rounded-xl p-8 backdrop-blur-sm">
                <h3 className="text-3xl font-bold text-white mb-4">Ready to Start Your Project?</h3>
                <p className="text-xl text-gray-300 mb-6">
                  Let's turn your ideas into reality with cutting-edge technology and innovative solutions.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-black font-bold px-8 py-4 rounded-full text-lg hover:scale-105 transition-all duration-300">
                    <Mail className="h-5 w-5 mr-2" />
                    Get In Touch
                  </Button>
                  <a href="https://drive.google.com/file/d/1H--z9HfD0Z4cgl2lcOw5lKtNWwTmgHuS/view?usp=sharing" target="_blank" rel="noopener noreferrer"
                  download>
                  <Button
                    variant="outline"
                    className="border-white/30 hover:bg-white/10 px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-all duration-300 text-black"
                  >
                    <Download className="h-5 text-black w-5 mr-2" />
                    Download Resume
                  </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Terminal className="h-6 w-6 text-emerald-400" />
                <span className="text-xl font-bold text-white">Apratim.dev</span>
              </div>
              <p className="text-gray-400 mb-4">Building the future with code, one project at a time.</p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="mailto:haldar.apratim005@gmail.com"
                  className="text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <div className="space-y-2">
                <button
                  onClick={() => scrollToSection(aboutRef)}
                  className="block text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection(projectsRef)}
                  className="block text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  Projects
                </button>
                <button
                  onClick={() => scrollToSection(skillsRef)}
                  className="block text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  Skills
                </button>
                <button
                  onClick={() => scrollToSection(contactRef)}
                  className="block text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  Contact
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Latest Updates</h4>
              <div className="space-y-3">
                <div className="text-sm">
                  <div className="text-emerald-400 font-semibold">New Project Launch</div>
                  <div className="text-gray-400">Agnarok AI Agent Builder</div>
                </div>
                <div className="text-sm">
                  <div className="text-purple-400 font-semibold">Research Published</div>
                  <div className="text-gray-400">IEEE AISC 2024 Conference</div>
                </div>
                <div className="text-sm">
                  <div className="text-cyan-400 font-semibold">Hackathon Victory</div>
                  <div className="text-gray-400">Binary Hackathon 2025</div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2025 Apratim Haldar. Built with passion and precision.</p>
          </div>
        </div>
      </footer>

      {/* Success/Error Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 max-w-md w-full mx-4 transform animate-in zoom-in duration-300">
            <div className="text-center">
              {submitStatus === 'success' ? (
                <>
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Message Sent Successfully!</h3>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ExternalLink className="h-8 w-8 text-white transform rotate-45" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {modalText.includes("fill in all fields") || modalText.includes("valid email") ? "Validation Error" : "Oops! Something Went Wrong"}
                  </h3>
                </>
              )}
              
              <p className="text-gray-300 mb-6">{modalText}</p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  onClick={() => setShowModal(false)}
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-black font-semibold px-6 py-2 rounded-lg hover:scale-105 transition-all duration-300"
                >
                  Close
                </Button>
                {submitStatus === 'error' && !modalText.includes("fill in all fields") && !modalText.includes("valid email") && (
                  <Button 
                    onClick={() => {
                      setShowModal(false)
                      contactRef.current?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:border-emerald-400 hover:text-emerald-400 px-6 py-2 rounded-lg hover:scale-105 transition-all duration-300"
                  >
                    Try Again
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
