"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowUpRight, ArrowRight, Award, Code, Globe, GraduationCap, Mail, MapPin, Smartphone, Users, Brain, Database, Cloud, Users2, Github, Linkedin, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRef, MutableRefObject } from "react"

// Organize skills by category based on Aryan's resume
const skillsByCategory = {
  "Programming Languages": ["Python", "Java", "SQL", "C", "Javascript", "R"],
  "Frameworks & Libraries": ["TensorFlow", "PyTorch", "Keras", "React Native", "Kotlin", "Node.js", "React.js", "Django", "Springboot"],
  "Tools & Platforms": ["AWS", "GCP", "Langchain", "MySQL", "Terraform", "NumPy", "Docker", "Dagster", "n8n"] // removed Weights & Biases, scikit-learn
}

// Skill icon map
const skillIcons: Record<string, string> = {
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  Java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  SQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  C: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  // Use local asset for JavaScript
  Javascript: "/assets/javascript_logo.png",
  R: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg",
  TensorFlow: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  PyTorch: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  // Use local asset for Keras
  Keras: "/assets/keras_logo.png",
  "React Native": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  Kotlin: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "React.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  Django: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
  Springboot: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
  AWS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  GCP: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  // Use local asset for Langchain
  Langchain: "/assets/langchain_logo.png",
  MySQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  Terraform: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
  NumPy: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
  Docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  // Use local asset for Dagster (SVG)
  Dagster: "/assets/dagster_logo.svg",
  // Use local asset for n8n
  n8n: "/assets/n8n_logo.png"
};

// Add state for chat speech bubble and section tracking
const sectionIds = ["about", "experience", "projects", "skills", "contact"];
const sectionMessages: Record<string, string> = {
  about: "Welcome! Want to know more about Aryan? Just ask!",
  experience: "Curious about Aryan's experience? I can help!",
  projects: "Want to hear about Aryan's projects? Click to chat!",
  skills: "Let me tell you about Aryan's skills!",
  contact: "Need to reach Aryan? I can share his contact info!"
};

export default function Page() {
  // Place all hook calls at the top of the component
  const [visitedSections, setVisitedSections] = useState<Set<string>>(new Set());
  const [bubbleMessage, setBubbleMessage] = useState<string | null>(null);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const bubbleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRefs: Record<string, React.RefObject<HTMLDivElement | null>> = {
    about: useRef<HTMLDivElement | null>(null),
    experience: useRef<HTMLDivElement | null>(null),
    projects: useRef<HTMLDivElement | null>(null),
    skills: useRef<HTMLDivElement | null>(null),
    contact: useRef<HTMLDivElement | null>(null)
  };
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", content: `**Here's a quick overview of my background:**\n\n- **Education:** Cornell M.Eng, UMass Amherst B.S.\n- **Experience:** Simulacrum Inc., Gao Labs, Wearable Learning, Impactsure Technologies\n- **Skills:** Python, Java, SQL, TensorFlow, PyTorch, React Native, AWS, Docker, and more\n\nAsk me anything about my work, skills, or projects!` }
  ])
  const [chatInput, setChatInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const chatEndRef = useRef<HTMLDivElement | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const firstCardRef = useRef<HTMLDivElement | null>(null);
  // Add state for mobile text section
  const [mobileTextSection, setMobileTextSection] = useState(0);
  const mobileSections = [
    {
      title: 'The Problem',
      content: selectedProject?.fullDescription?.split('The Solution')[0]?.trim() || ''
    },
    {
      title: 'The Solution',
      content: selectedProject?.fullDescription?.split('The Solution')[1]?.split('How It Works')[0]?.trim() || ''
    },
    {
      title: 'How It Works',
      content: selectedProject?.fullDescription?.split('How It Works')[1]?.split('Gamification')[0]?.trim() || ''
    },
    {
      title: 'Gamification',
      content: selectedProject?.fullDescription?.split('Gamification')[1]?.split('Technical Implementation')[0]?.trim() || ''
    },
    {
      title: 'Technical Implementation',
      content: selectedProject?.fullDescription?.split('Technical Implementation')[1]?.split('Market Response')[0]?.trim() || ''
    },
    {
      title: 'Market Response',
      content: selectedProject?.fullDescription?.split('Market Response')[1]?.split('The Vision')[0]?.trim() || ''
    },
    {
      title: 'The Vision',
      content: selectedProject?.fullDescription?.split('The Vision')[1]?.trim() || ''
    },
  ];

  const resumeContext = `My Resume (condensed):
Education: Cornell University, M.Eng in Computer Science (GPA 3.8/4.0). University of Massachusetts Amherst, B.S. in Computer Science (GPA 3.63/4.0).
Experience: 
- Simulacrum Inc.: ML Engineering Intern (production benchmarking, async processing, GCP, Docker)
- Gao Labs: ML Engineering Intern (solar forecasting, wavelet transform, NY power plants)
- Wearable Learning: Software Engineering Intern, AI (math games, student dashboard, Kotlin, Firebase)
- Impactsure Technologies: Data Science Intern (Django microservice, OCR, Meta DETR, OpenCV, Spark-NLP)
Skills: Python, Java, SQL, C, JavaScript, R, TensorFlow, PyTorch, Keras, React Native, Kotlin, Node.js, Django, AWS, GCP, Docker, MySQL, Terraform, scikit-learn, NumPy, Dagster, n8n
Projects: EliteCode - Duolingo for Leetcode, Leadbank - Crowdsourced Lead Generation App, and more.
Leadership: Vice President, UMass Product; CRLA II Certified Tutor (tutored 400+ students at UMass Amherst)
Contact: nairaryan21@gmail.com | linkedin.com/in/nairaryan21 | github.com/aryan0821

Additional context:
- I am currently actively learning about large world models.
- I am skilled with time series forecasting and knowledgeable about time series forecasting models.
- I have been looking into ways to make time series models more explainable by incorporating text into time series models.
- I am passionate about edtech.
- AI Agents & Automation: I build real-world business workflows using LLMs and automation tools.
- Entrepreneurship: My long-term goal is to build a VC-backed edtech company focused on personalized learning.
- Human-Centered Computing: Inspired by Duolingo's UX; previously worked on wearable math games at HCI labs. Passionate about making tech visually engaging and user-first.
- Fun fact: I've tutored over 400 students over the course of 3 years as a certified peer tutor at UMass Amherst.
- Product/project highlights: EliteCode (Duolingo for Leetcode, AI chatbot, gamification), Leadbank (React Native app and Next.js CMS for M&M Marketing, UAE, crowdsourced leads, real-time tracking, custom payment gateway, saves agents 3+ hours/week), and more.

If the user asks about something completely unrelated to Aryan, his work, skills, or experience, respond with a relevant humorous joke and gently steer the conversation back to Aryan's background or projects. Maintain a personable, conversational tone.`;

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollPosition();
  }, []);

  // Prevent background scroll when any modal is open
  useEffect(() => {
    if (isResumeOpen || isProjectModalOpen || isChatOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isResumeOpen, isProjectModalOpen, isChatOpen]);

  async function sendChatMessage() {
    if (!chatInput.trim()) return;
    setIsLoading(true)
    const newMessages = [...chatMessages, { role: "user", content: chatInput }]
    setChatMessages(newMessages)
    setChatInput("")
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: `You are Aryan Nair, a helpful AI portfolio assistant. Your job is to answer questions about Aryan Nair, his work, skills, and experience, but always speak in the first person as if you are Aryan. Never refer to Aryan in the third person. Be concise and direct. Always respond in a structured, organized way using Markdown. Use bullets, bold for key points, and newlines for clarity. Use the following resume as your context.\n\n${resumeContext}` },
            ...newMessages
          ]
        })
      })
      
      if (!res.ok) throw new Error("API request failed")
      
      const data = await res.json()
      const response = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response."
      
      setChatMessages([...newMessages, { role: "assistant", content: response }])
    } catch (e) {
      setChatMessages([...newMessages, { role: "assistant", content: "Sorry, the AI is temporarily unavailable. Please try again later." }])
    }
    setIsLoading(false)
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
  }
  
  // Remove mobile modal logic and state

  // Sample questions for chatbot (move projects question to second)
  const sampleQuestions = [
    "What are your main skills?",
    "What projects are you most proud of?",
    "Tell me about your experience at Simulacrum Inc.",
    "What leadership roles have you held?",
    "What is your educational background?",
    "How can I contact you?",
    "Are you currently looking for opportunities?"
  ];

  // Add helper function for sending sample question
  function sendChatMessageWithContent(content: string, newMessages: any[]) {
    fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: `You are Aryan Nair, a helpful AI portfolio assistant. Your job is to answer questions about Aryan Nair, his work, skills, and experience, but always speak in the first person as if you are Aryan. Never refer to Aryan in the third person. Be concise and direct. Always respond in a structured, organized way using Markdown. Use bullets, bold for key points, and newlines for clarity. Use the following resume as your context.\n\n${resumeContext}` },
          ...newMessages
        ]
      })
    })
      .then(res => {
        if (!res.ok) throw new Error("API request failed");
        return res.json();
      })
      .then(data => {
        const response = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";
        setChatMessages([...newMessages, { role: "assistant", content: response }]);
        setIsLoading(false);
        setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      })
      .catch(() => {
        setChatMessages([...newMessages, { role: "assistant", content: "Sorry, the AI is temporarily unavailable. Please try again later." }]);
        setIsLoading(false);
        setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      });
  }

  // Prewritten answers for sample questions
  const presetAnswers: Record<string, string> = {
    "What are your main skills?": `**Technical Skills:**\n\n- **Programming Languages:** Python, Java, SQL, C, JavaScript, R\n- **Frameworks:** TensorFlow, PyTorch, Keras, React Native, Kotlin, Node.js, React.js, Django, Springboot\n- **Tools:** AWS, GCP, Langchain, MySQL, Terraform, Docker, Dagster, n8n, NumPy\n\nI have hands-on experience with cloud platforms, ML frameworks, and building scalable apps end-to-end.`,
    "Tell me about your experience at Simulacrum Inc.": `At Simulacrum Inc. (May 2025 – Present, New York, NY), I worked as a Machine Learning Engineering Intern.\n\n- Designed the **Tempus benchmarking framework** to compare performance of time-series foundation models in 12 forecasting scenarios.\n- Deployed Tempus using **Google Cloud Run, Docker, and FastAPI** for GPU-accelerated execution.\n- Reduced runtime by 89% (45→5 minutes) via asynchronous processing with **Redis Queue**.\n- Implemented 12 baseline models (ARIMAX, ETS, XGBoost, LSTM) using PyTorch with custom hyperparameter tuning.`,
    "What projects are you most proud of?": `**EliteCode Mobile App** (React Native, Node.js, Supabase, Typescript, Python)\n- Architected an iOS microlearning app for software interview prep, accumulating 600+ active users.\n- Integrated learning analytics for personalized pathway recommendations, boosting daily streak length from 2.3 to 5.5.\n\n**LeadBank Mobile App** (n8n, Swift, Typescript, SQL, Vgnet, Twilio, ChromaDB)\n- Engineered an affiliate marketing app for M&M Marketing, enabling crowdsourced referrals for credit cards.\n- Automated outbound sales outreach using Vgnet AI, scaling to 300+ monthly calls and 50+ qualified leads per month.`,
    "What leadership roles have you held?": `- Led engineering and analytics initiatives in multiple internships and projects.\n- Drove collaboration across teams and stakeholders, and mentored peers in technical and product roles.`,
    "What is your educational background?": `- **Cornell University:** Master of Engineering in Computer Science (GPA: 3.8/4.0, Expected Dec 2025)\n  - Relevant coursework: Cloud Computing & ML Hosting, Large Scale ML, NLP, Info Theory & Bayesian ML, AI Strategy\n- **UMass Amherst:** Bachelor of Science in Computer Science (GPA: 3.63/4.0, Graduated Dec 2024)`,
    "How can I contact you?": `You can reach me at:\n- **Email:** nairaryan21@gmail.com\n- **LinkedIn:** linkedin.com/in/nairaryan21\n- **GitHub:** github.com/aryan0821\n- **Phone:** 321-326-3477`,
    "Are you currently looking for opportunities?": `Yes, I'm currently looking for full-time opportunities in machine learning and software engineering. I'll be ready to start working after graduating in December 2025.`
  };

  // Add a state to track if a section prompt has been shown
  const [hasSectionPrompt, setHasSectionPrompt] = useState(false);

  // Show a default prompt on first load
  useEffect(() => {
    if (!hasSectionPrompt && !bubbleVisible && !isChatOpen) {
      setBubbleMessage('👋 Hi! I can answer questions about Aryan.');
      setBubbleVisible(true);
    }
  }, [hasSectionPrompt, bubbleVisible, isChatOpen]);

  // In the scroll detection effect, set hasSectionPrompt to true when a section prompt is shown
  useEffect(() => {
    function onScroll() {
      for (const id of sectionIds) {
        const ref = sectionRefs[id];
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.4 && rect.bottom > window.innerHeight * 0.2) {
            if (!visitedSections.has(id)) {
              setVisitedSections((prev: Set<string>) => new Set(prev).add(id));
              setBubbleMessage(sectionMessages[id]);
              setBubbleVisible(true);
              setHasSectionPrompt(true);
              if (bubbleTimeoutRef.current) clearTimeout(bubbleTimeoutRef.current);
              bubbleTimeoutRef.current = setTimeout(() => setBubbleVisible(false), 3500);
            }
            break;
          }
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [visitedSections]);

  // Hide bubble when chat is opened
  useEffect(() => {
    if (isChatOpen) setBubbleVisible(false);
  }, [isChatOpen]);

  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  // Hide scroll indicator when user scrolls down
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      }
    }
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide scroll indicator when clicked
  const handleScrollClick = () => {
    setShowScrollIndicator(false);
    document.querySelector('main')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="min-h-screen text-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-stone-200/50">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-4 md:py-6">
          <nav className="flex items-center justify-between">
            <div className="text-2xl md:text-3xl font-bold text-stone-800 hover:text-stone-900 transition-all duration-700 relative group">
              <span className="bg-gradient-to-r from-stone-800 via-gray-700 to-stone-800 bg-clip-text text-transparent tracking-tight lowercase">
                aryan nair
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
            <div className="hidden md:flex items-center space-x-8 lg:space-x-16">
              {["About", "Experience", "Projects", "Skills", "Contact"].map((item, index) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-stone-600 hover:text-stone-800 transition-all duration-700 hover:scale-105 relative group font-medium tracking-wide"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item}
                  <div className="absolute -bottom-1 left-0 w-0 h-px bg-stone-400 group-hover:w-full transition-all duration-500 ease-out"></div>
                </Link>
              ))}
              {/* Social Links */}
              <div className="flex items-center space-x-4 ml-8">
                <a
                  href="https://github.com/aryan0821"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-600 hover:text-stone-800 transition-all duration-700 hover:scale-105"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/nairaryan21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-600 hover:text-stone-800 transition-all duration-700 hover:scale-105"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section with Spline and Image */}
      <div className="w-full h-[100vh] relative overflow-visible">
        {/* Spline iframe container - truly full width on mobile */}
        <div className="absolute inset-0 top-[80px] md:top-[100px] left-0 right-0 w-screen md:w-full flex items-center justify-center pointer-events-none overflow-hidden p-0">
          <div className="relative w-screen h-[100vh] md:w-full md:h-full flex items-center justify-center overflow-hidden">
            <iframe 
              src='https://my.spline.design/creatorcafeheropage-lUhiy0IjH4D0qa4DZUJtcA13/'
              frameBorder='0' 
              width='100%'
              height='100%'
              className="w-screen h-[100vh] md:w-full md:h-full max-w-full max-h-full scale-[0.85] sm:scale-95 md:scale-105 transform-gpu pointer-events-auto"
              style={{ display: 'block', margin: '0', padding: '0' }}
            />
                  </div>
                  </div>

        {/* Aryan's image fixed to the bottom right of the hero section, no border/background, desktop only */}
        <img 
          src="/assets/aryan_image.png" 
          alt="Aryan Nair" 
          className="hidden md:block absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 object-contain z-20 pointer-events-none"
          style={{ maxWidth: '90vw', height: 'auto' }}
        />

        {/* Aryan's image fixed to the top right on mobile, only top part in a circle */}
        <div className="block md:hidden absolute top-28 right-4 z-30">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-stone-200 bg-white">
            <img src="/assets/aryan_image.png" alt="Aryan Nair" className="w-full h-full object-cover object-top" />
                </div>
        </div>

        {/* Resume Button and Modal + Aryan AI Button */}
        <div 
          className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-20 w-full px-4 md:px-0 md:w-auto flex flex-col md:flex-row items-center justify-center gap-4 pointer-events-auto"
        >
          {/* Resume Button and Modal */}
          <Dialog open={isResumeOpen} onOpenChange={setIsResumeOpen}>
            <DialogTrigger asChild>
                  <Button
                className="resume-button w-11/12 max-w-xs md:w-[260px] bg-gradient-to-r from-stone-800 via-stone-900 to-stone-800 hover:from-stone-900 hover:via-stone-800 hover:to-stone-900 text-white px-6 md:px-10 py-6 md:py-7 text-base md:text-lg tracking-wider font-light rounded-none border-2 border-stone-700/50 hover:border-stone-600 transform hover:scale-105 transition-all duration-500 group shadow-xl hover:shadow-2xl relative overflow-hidden flex justify-center"
                  >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 animate-shimmer"></span>
                <span className="relative z-10 flex items-center justify-center w-full">
                    View Resume
                  <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
                </span>
                  </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl w-[90vw] h-[85vh] p-0">
              <DialogTitle className="sr-only">Resume Preview</DialogTitle>
              <iframe
                src="/assets/aryan_resume.pdf"
                className="w-full h-full"
                style={{ border: 'none' }}
                title="Resume Preview"
              />
            </DialogContent>
          </Dialog>
          {/* Aryan AI Button */}
          {/* Remove this button from the hero section */}
        </div>

        {/* Scroll Indicator */}
        {showScrollIndicator && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bouncy-scroll">
            <button
              onClick={handleScrollClick}
              className="flex flex-col items-center text-stone-600 hover:text-stone-800 transition-colors duration-500 group"
              aria-label="Scroll to content"
            >
              <span className="text-xs font-light tracking-wider mb-2 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                SCROLL
              </span>
              <ChevronDown className="w-6 h-6 group-hover:translate-y-1 transition-transform duration-500" />
            </button>
          </div>
        )}
      </div>

      {/* Chatbot Dialog */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/30" onClick={() => setIsChatOpen(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md md:max-w-lg mx-auto mb-0 md:mb-8 p-0 flex flex-col max-h-[90vh] border border-stone-200" onClick={e => e.stopPropagation()} style={{ boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)' }}>
            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-4 rounded-t-2xl bg-gradient-to-r from-stone-100 via-stone-50 to-white border-b border-stone-200 relative">
              <div className="w-12 h-12 rounded-full border-2 border-stone-200 overflow-hidden flex items-center justify-center bg-white">
                <img src="/assets/aryan_image.png" alt="Aryan Nair" className="w-full h-full object-cover object-top" />
              </div>
              <div className="flex flex-col">
                <div className="font-bold text-stone-800 text-lg leading-tight">Aryan's AI Chatbot</div>
                <div className="text-xs text-stone-500 font-medium">MLE Intern at Simulacrum Inc.</div>
              </div>
              <span className="absolute top-4 left-16 w-2 h-2 bg-green-400 rounded-full border-2 border-white" title="Online"></span>
              <button className="ml-auto text-stone-400 hover:text-stone-700 text-xl" onClick={() => setIsChatOpen(false)} aria-label="Close">×</button>
            </div>
            {/* Chat area */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-2 px-4 py-4 bg-stone-50 rounded-b-2xl" style={{ minHeight: 200, maxHeight: 350 }}>
              {chatMessages.map((msg, i) => (
                <div key={i} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
                  <span className={msg.role === 'user' ? 'inline-block bg-blue-100 text-blue-900 rounded-2xl px-4 py-2 my-1 shadow-sm' : 'inline-block bg-white text-stone-800 rounded-2xl px-4 py-2 my-1 shadow-sm border border-stone-100'}>
                    {msg.role === 'assistant' ? (
                      <span dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\n- /g, '<br />• ') }} />
                    ) : (
                      msg.content
                    )}
                  </span>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            {/* Sample Questions */}
            <div className="w-full max-w-full px-4 pt-2 pb-1 overflow-x-auto scrollbar-hide">
              <div className="text-xs text-stone-500 font-semibold mb-1 ml-1">Try asking me:</div>
              <div className="flex whitespace-nowrap gap-2">
                {sampleQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    className="inline-block bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-full px-5 py-2 text-sm font-medium border border-stone-200 transition shadow-sm"
                    onClick={() => {
                      setChatInput("");
                      setIsLoading(true);
                      const newMessages = [...chatMessages, { role: "user", content: q }];
                      setChatMessages(newMessages);
                      if (presetAnswers[q]) {
                        setTimeout(() => {
                          setChatMessages([...newMessages, { role: "assistant", content: presetAnswers[q] }]);
                          setIsLoading(false);
                          setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
                        }, 400); // Simulate a short delay
                      } else {
                        sendChatMessageWithContent(q, newMessages);
                      }
                    }}
                    disabled={isLoading}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
            {/* Input area */}
            <form className="flex gap-2 px-4 pb-4 pt-2 bg-white rounded-b-2xl border-t border-stone-100 shadow-sm" onSubmit={e => { e.preventDefault(); sendChatMessage(); }}>
              <input
                className="flex-1 border border-stone-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                type="text"
                placeholder="Ask me about Aryan..."
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2 font-semibold shadow-md disabled:opacity-60"
                disabled={isLoading || !chatInput.trim()}
              >
                {isLoading ? '...' : 'Send'}
              </button>
            </form>
            <div className="text-xs text-stone-400 mt-1 px-4 pb-2">Powered by OpenAI. Answers are based on Aryan's resume.</div>
          </div>
        </div>
      )}

      {/* Project Modal */}
      {isProjectModalOpen && selectedProject && (
        selectedProject.title?.includes('EliteCode') ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadein" onClick={() => setIsProjectModalOpen(false)}>
            <div className="bg-gradient-to-br from-white via-stone-50 to-stone-200 border border-stone-300 rounded-3xl shadow-2xl w-full max-w-md md:max-w-7xl mx-2 max-h-[95vh] overflow-hidden flex flex-col relative animate-scalein" onClick={e => e.stopPropagation()}>
              {/* Modal content: mobile vertical, desktop side-by-side (text left, demo right) for EliteCode */}
              <div className="flex flex-col md:flex-row-reverse overflow-y-auto max-h-[95vh] w-full">
                {/* Video/Image: right on desktop, top on mobile */}
                <div className="relative w-full md:w-2/5 lg:w-1/3 flex-shrink-0 bg-black flex items-center justify-center"
                  style={{ height: '14rem', minHeight: '12rem', maxHeight: '18rem', ...(window.innerWidth >= 768 ? { height: '80vh', minHeight: '0', maxHeight: 'none' } : {}) }}>
                  {selectedProject.video && !isVideoPlaying ? (
                    <>
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full h-full object-contain rounded-t-2xl md:rounded-lg shadow-lg"
                        onError={e => {
                          e.currentTarget.src = "https://via.placeholder.com/600x360/64748b/ffffff?text=" + encodeURIComponent(selectedProject.title);
                        }}
                      />
                      <button
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-4 hover:bg-white transition-colors duration-300 shadow-lg"
                        onClick={() => setIsVideoPlaying(true)}
                        aria-label="Play Video"
                      >
                        <svg className="w-8 h-8 text-stone-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </button>
                    </>
                  ) : selectedProject.video && isVideoPlaying ? (
                    <video
                      src={selectedProject.video}
                      className="w-full h-full object-contain rounded-t-2xl md:rounded-lg shadow-lg"
                      style={window.innerWidth >= 768 ? { height: '80vh' } : { height: '14rem', minHeight: '12rem', maxHeight: '18rem' }}
                      autoPlay
                      controls
                      onEnded={() => setIsVideoPlaying(false)}
                      onError={() => setIsVideoPlaying(false)}
                    />
                  ) : (
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-contain rounded-t-2xl md:rounded-lg shadow-lg"
                      onError={e => {
                        e.currentTarget.src = "https://via.placeholder.com/600x360/64748b/ffffff?text=" + encodeURIComponent(selectedProject.title);
                      }}
                    />
                  )}
                </div>
                {/* Text content: left on desktop, below on mobile */}
                <div className="flex-1 p-4 md:p-8 lg:p-10 flex flex-col justify-start pt-4 md:pt-12 overflow-y-auto" style={{ maxHeight: 'calc(95vh - 4rem)' }}>
                  <h2 className="text-2xl md:text-3xl font-light text-stone-800 tracking-wide mb-4 md:mb-8">{selectedProject.title}</h2>
                  {/* About the Product section (rewrite for EliteCode) */}
                  <div className="mb-6 md:mb-8">
                    <h3 className="text-lg md:text-xl font-medium text-stone-800 mb-2 md:mb-4 tracking-wide">About the Product</h3>
                    <p className="text-stone-600 leading-relaxed text-base md:text-lg mb-2 md:mb-4">
                      As a master's student, I know firsthand how tough it is to balance coursework, research, and prepping for technical interviews. That's why I built EliteCode: a microlearning app designed for students like me who want to level up their coding interview skills without sacrificing their sanity. Instead of long, overwhelming lessons, EliteCode breaks down concepts into bite-sized, gamified challenges you can tackle between classes or during a quick study break. The app adapts to your strengths and weaknesses, so you get targeted practice where you need it most. I wanted something that would keep me motivated, so I added daily streaks, achievement badges, and a progress tracker that actually makes learning feel rewarding. EliteCode is my answer to the real struggles of being a student in tech today—fitting growth into a packed schedule, and making it fun along the way.
                    </p>
                  </div>
                  <div className="mt-auto pt-4 md:pt-6 border-t border-stone-200">
                    <h3 className="text-lg md:text-xl font-medium text-stone-800 mb-2 md:mb-4 tracking-wide">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {selectedProject.tags.map((tag: string, index: number) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs md:text-sm py-1.5 md:py-2 px-3 md:px-4 rounded border-stone-300 text-stone-700 font-light"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="absolute top-4 right-4 bg-white/95 border border-stone-300 backdrop-blur-sm rounded-full p-3 hover:bg-stone-100 transition-colors duration-300 z-50 shadow-lg text-xl font-bold text-stone-700"
                onClick={() => {
                  setIsProjectModalOpen(false);
                  setIsVideoPlaying(false);
                }}
                aria-label="Close"
              >
                ×
              </button>
            </div>
          </div>
        ) : (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadein" onClick={() => setIsProjectModalOpen(false)}>
            <div className="bg-gradient-to-br from-white via-stone-50 to-stone-200 border border-stone-300 rounded-3xl shadow-2xl w-full max-w-md md:max-w-2xl mx-2 max-h-[95vh] overflow-hidden flex flex-col relative animate-scalein" onClick={e => e.stopPropagation()}>
              {/* Leadbank: always vertical layout, demo on top, text below */}
              <div className="flex flex-col overflow-y-auto max-h-[95vh] w-full">
                {/* Video/Image at the top */}
                <div className="relative w-full flex-shrink-0 bg-black flex items-center justify-center" style={{ height: '14rem', minHeight: '12rem', maxHeight: '18rem', ...(window.innerWidth >= 768 ? { height: '22rem', minHeight: '0', maxHeight: 'none' } : {}) }}>
                  {selectedProject.video && !isVideoPlaying ? (
                    <>
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full h-full object-contain rounded-t-2xl shadow-lg"
                        onError={e => {
                          e.currentTarget.src = "https://via.placeholder.com/600x360/64748b/ffffff?text=" + encodeURIComponent(selectedProject.title);
                        }}
                      />
                      <button
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-4 hover:bg-white transition-colors duration-300 shadow-lg"
                        onClick={() => setIsVideoPlaying(true)}
                        aria-label="Play Video"
                      >
                        <svg className="w-8 h-8 text-stone-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </button>
                    </>
                  ) : selectedProject.video && isVideoPlaying ? (
                    <video
                      src={selectedProject.video}
                      className="w-full h-full object-contain rounded-t-2xl shadow-lg"
                      style={window.innerWidth >= 768 ? { height: '22rem' } : { height: '14rem', minHeight: '12rem', maxHeight: '18rem' }}
                      autoPlay
                      controls
                      onEnded={() => setIsVideoPlaying(false)}
                      onError={() => setIsVideoPlaying(false)}
                    />
                  ) : (
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-contain rounded-t-2xl shadow-lg"
                      onError={e => {
                        e.currentTarget.src = "https://via.placeholder.com/600x360/64748b/ffffff?text=" + encodeURIComponent(selectedProject.title);
                      }}
                    />
                  )}
                </div>
                {/* Text content below */}
                <div className="flex-1 p-4 md:p-8 lg:p-10 flex flex-col justify-start pt-4 md:pt-8 overflow-y-auto" style={{ maxHeight: 'calc(95vh - 4rem)' }}>
                  <h2 className="text-2xl md:text-3xl font-light text-stone-800 tracking-wide mb-4 md:mb-8">{selectedProject.title}</h2>
                  {/* About the Product section (original for Leadbank) */}
                  <div className="mb-6 md:mb-8">
                    <h3 className="text-lg md:text-xl font-medium text-stone-800 mb-2 md:mb-4 tracking-wide">About the Product</h3>
                    <p className="text-stone-600 leading-relaxed text-base md:text-lg mb-2 md:mb-4">{selectedProject.fullDescription}</p>
                  </div>
                  <div className="mt-auto pt-4 md:pt-6 border-t border-stone-200">
                    <h3 className="text-lg md:text-xl font-medium text-stone-800 mb-2 md:mb-4 tracking-wide">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {selectedProject.tags.map((tag: string, tagIndex: number) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs py-1.5 px-3 rounded-none border-stone-300 text-stone-700 font-light"
                          style={{ animationDelay: `${tagIndex * 50}ms` }}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="absolute top-4 right-4 bg-white/95 border border-stone-300 backdrop-blur-sm rounded-full p-3 hover:bg-stone-100 transition-colors duration-300 z-50 shadow-lg text-xl font-bold text-stone-700"
                onClick={() => {
                  setIsProjectModalOpen(false);
                  setIsVideoPlaying(false);
                }}
                aria-label="Close"
              >
                ×
              </button>
            </div>
          </div>
        )
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 md:px-8">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 mt-20">
          {/* About Section - Large */}
          <Card className="md:col-span-4 lg:col-span-4 border-none shadow-2xl hover:shadow-3xl transition-all duration-1000 hover:scale-[1.005] relative overflow-hidden group backdrop-blur-sm bg-white/5">
            <CardContent className="p-8 md:p-16 relative z-10">
              <div className="space-y-8 md:space-y-12">
                <div className="space-y-6 md:space-y-8">
                  <div className="text-lg md:text-xl text-stone-500 mb-4 md:mb-6 font-light tracking-[0.2em] uppercase animate-fade-in">
                    About Me
                  </div>
                  <p className="text-2xl md:text-4xl text-stone-700 leading-relaxed font-light tracking-wide max-w-3xl mb-4">
                    I'm a machine learning engineer with a strong foundation in building scalable data pipelines and forecasting systems. While my professional work dives deep into time series modeling, MLOps, and cloud infrastructure, my passion projects lean user-first.
                  </p>
                  <p className="text-2xl md:text-4xl text-stone-700 leading-relaxed font-light tracking-wide max-w-3xl">
                    I love crafting mobile and web experiences that are intuitive and impactful, using machine learning not as a buzzword, but as a tool to meaningfully enhance the user experience. I thrive at the intersection of data and design, where technical depth meets thoughtful product thinking.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location & Education Card */}
          <Card className="md:col-span-2 lg:col-span-2 border-none bg-gradient-to-br from-stone-900 via-gray-800 to-stone-800 text-white shadow-2xl hover:shadow-3xl transition-all duration-1000 hover:scale-105 relative overflow-hidden group">
            <CardContent className="p-12 relative z-10">
              <div className="space-y-10">
                <div className="flex items-start gap-5 transform group-hover:translate-x-2 transition-transform duration-700">
                  <GraduationCap className="w-8 h-8 mt-1 text-stone-300" />
                  <div>
                    <div className="font-light text-2xl text-white tracking-wide">Cornell University</div>
                    <div className="text-stone-300 font-light tracking-wide mt-2">M.Eng Computer Science</div>
                    <div className="text-stone-400 font-light text-sm mt-1">GPA: 3.8/4.0</div>
                  </div>
                </div>
                <div className="flex items-start gap-5 transform group-hover:translate-x-2 transition-transform duration-700 delay-150">
                  <MapPin className="w-8 h-8 mt-1 text-stone-300" />
                  <div>
                    <div className="font-light text-2xl text-white tracking-wide">New York, NY</div>
                    <div className="text-stone-300 font-light tracking-wide mt-2">Open to opportunities</div>
                  </div>
                </div>
                <div className="flex items-start gap-5 transform group-hover:translate-x-2 transition-transform duration-700 delay-300">
                  <Award className="w-8 h-8 mt-1 text-stone-300" />
                  <div>
                    <div className="font-light text-2xl text-white tracking-wide">Machine Learning Engineer Intern</div>
                    <div className="text-stone-300 font-light tracking-wide mt-2">Simulacrum Inc.</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Experience Section */}
          <Card ref={sectionRefs.experience} className="md:col-span-6 lg:col-span-6 border-none bg-gradient-to-r from-stone-50/80 to-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-1000 hover:scale-[1.002] relative overflow-hidden group" id="experience">
            <CardHeader className="relative z-10 pb-12 px-6 md:px-16 pt-16">
              <CardTitle className="text-4xl font-light text-stone-800 relative inline-block tracking-tight">
                Experience
                <div className="absolute -bottom-3 left-0 w-16 h-px bg-gradient-to-r from-stone-400 to-transparent"></div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 relative z-10 px-6 md:px-16 pb-16">
              <div className="relative">
                <div 
                  ref={scrollContainerRef}
                  className="flex overflow-x-auto gap-6 md:gap-8 pb-4 scrollbar-hide scroll-smooth"
                  onScroll={checkScrollPosition}
                >
                  <div className="flex gap-6 md:gap-8 min-w-max pl-4">
                {[
                  {
                    company: "Simulacrum Inc.",
                    logo: "/assets/simulacrum_logo.png",
                    period: "May 2025 - Present",
                    role: "Machine Learning Engineering Intern",
                    location: "New York, NY",
                    description:
                      "Designed a production-grade time-series benchmarking framework (Tempus) with CLI support, deployed using Google Cloud Run and Docker, reduced runtime by 89% through parallel processing.",
                  },
                  {
                    company: "Gao Labs, Cornell",
                    logo: "/assets/gao_logo.png",
                    period: "January 2025 - May 2025",
                    role: "Machine Learning Engineering Intern",
                    location: "Ithaca, NY",
                    description:
                      "Developed day-ahead forecasting models for solar electricity generation across 13 NY power plants to inform the charging schedules of NY MTA electric buses.",
                  },
                  {
                    company: "Wearable Learning",
                    logo: "/assets/wearable_learning_logo.png",
                    period: "December 2023 - September 2024",
                    role: "Software Engineering Intern, AI",
                    location: "Boston, MA",
                    description:
                      "Designed AI-based features for math games, engineered student performance dashboard using Kotlin and Firebase, cutting teacher intervention time by 4 hours/week.",
                      },
                  {
                    company: "Wireless and Sensor System Lab, UMass",
                    logo: "/assets/wssl_logo.jpg",
                    period: "May 2024 - Aug 2024",
                    role: "Research Assistant",
                    location: "Amherst, MA",
                    description:
                      "Built a React Native app for a blood pressure ring sensor, enabling Bluetooth data collection with 30ms latency. Explored and deployed Rank-N-Contrast models for water quality detection and age classification on GPU clusters."
                  },
                  {
                    company: "Impactsure Technologies",
                    logo: "/assets/impactsure_logo.png",
                    period: "June 2023 - August 2023",
                    role: "Data Science Intern",
                    location: "Mumbai, India",
                    description:
                      "Architected a Django microservice for extracting data from financial documents, fine-tuned Meta's DETR neural network (78% mean Average Precision), boosted OCR accuracy by 30% using OpenCV and Spark-NLP.",
                  },
                  
                ].map((job, index) => (
                  <div
                    key={job.company}
                    ref={index === 0 ? firstCardRef : undefined}
                    className="w-80 md:w-96 p-8 md:p-10 rounded-none bg-gradient-to-br from-stone-50/50 to-gray-50/50 hover:from-stone-100/50 hover:to-gray-100/50 transition-all duration-1000 transform hover:scale-102 hover:shadow-2xl border-l-2 border-stone-300 hover:border-stone-400 relative group flex-shrink-0"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-stone-400 to-transparent transform scale-y-0 group-hover:scale-y-100 transition-transform duration-1000 ease-out"></div>
                    <div className="flex items-center gap-6">
                      <img 
                        src={job.logo} 
                        alt={`${job.company} logo`}
                        className="w-10 h-10 object-contain"
                      />
                      <h3 className="font-light text-2xl text-stone-800 tracking-wide">{job.company}</h3>
                    </div>
                    <div className="text-stone-500 font-medium mt-4 mb-2 text-sm tracking-widest uppercase relative z-10">
                      {job.period}
                    </div>
                    <p className="text-stone-600 font-medium mb-4 text-lg tracking-wide relative z-10">{job.role}</p>
                    {job.location && (
                      <div className="flex items-center gap-2 text-stone-500 font-light text-sm mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                    )}
                    <p className="text-stone-600 leading-relaxed font-light tracking-wide relative z-10">{job.description}</p>
                  </div>
                ))}
                </div>
                </div>
                
                {/* Left Scroll Arrow */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-white via-white to-transparent w-16 h-full flex items-center justify-start pointer-events-none">
                  <button 
                    className={`bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg pointer-events-auto transition-colors duration-300 ${
                      canScrollLeft 
                        ? 'hover:bg-white cursor-pointer' 
                        : 'opacity-30 cursor-not-allowed'
                    }`}
                    onClick={() => {
                      if (canScrollLeft && scrollContainerRef.current) {
                        scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
                      }
                    }}
                    disabled={!canScrollLeft}
                    aria-label="Scroll left"
                  >
                    <ArrowRight className="w-6 h-6 text-stone-600 rotate-180" />
                  </button>
                </div>
                
                {/* Right Scroll Arrow */}
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-l from-white via-white to-transparent w-16 h-full flex items-center justify-end pointer-events-none">
                  <button 
                    className={`bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg pointer-events-auto transition-colors duration-300 ${
                      canScrollRight 
                        ? 'hover:bg-white cursor-pointer' 
                        : 'opacity-30 cursor-not-allowed'
                    }`}
                    onClick={() => {
                      if (canScrollRight && scrollContainerRef.current) {
                        if (typeof window !== 'undefined' && window.innerWidth < 768 && firstCardRef.current) {
                          // Mobile: scroll by the width of the first card (including margin)
                          const cardWidth = firstCardRef.current.offsetWidth;
                          const cardStyle = window.getComputedStyle(firstCardRef.current);
                          const marginRight = parseInt(cardStyle.marginRight) || 0;
                          scrollContainerRef.current.scrollBy({ left: cardWidth + marginRight, behavior: 'smooth' });
                        } else {
                          // Desktop: scroll by 400px
                          scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
                        }
                      }
                    }}
                    disabled={!canScrollRight}
                    aria-label="Scroll right"
                  >
                    <ArrowRight className="w-6 h-6 text-stone-600" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills Grid - Desktop Version */}
          <Card ref={sectionRefs.skills} className="md:col-span-6 lg:col-span-6 border-none bg-gradient-to-br from-stone-900 via-gray-800 to-stone-800 text-white shadow-2xl hover:shadow-3xl transition-all duration-1000 hover:scale-[1.002] relative overflow-hidden group hidden md:block">
            <CardHeader className="relative z-10 pb-12 px-16 pt-16">
              <CardTitle className="text-4xl font-light text-white relative inline-block tracking-tight">
                Skills & Expertise
                <div className="absolute -bottom-3 left-0 w-16 h-px bg-gradient-to-r from-white to-transparent"></div>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 px-16 pb-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {Object.entries(skillsByCategory).map(([category, skills]) => (
                  <div key={category} className="bg-white/5 rounded-2xl p-6 shadow-lg flex flex-col items-start animate-slide-up skill-category">
                    <h3 className="text-xl font-semibold text-white mb-4 tracking-wide flex items-center gap-2">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-4 justify-center w-full">
                      {skills.map(skill => (
                        <span key={skill} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-sm transition-all duration-300">
                          {skillIcons[skill] && (
                            <img src={skillIcons[skill]} alt={skill} className="w-5 h-5 object-contain filter brightness-0 invert" />
                          )}
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skills Section - Mobile Version */}
          <Card ref={sectionRefs.skills} className="md:col-span-6 lg:col-span-6 border-none bg-gradient-to-br from-stone-900 via-gray-800 to-stone-800 text-white shadow-2xl transition-all duration-1000 relative overflow-hidden md:hidden">
            <CardHeader className="relative z-10 pb-8 px-6 pt-10">
              <CardTitle className="text-3xl font-light text-white relative inline-block tracking-tight">
                Skills & Expertise
                <div className="absolute -bottom-3 left-0 w-12 h-px bg-gradient-to-r from-white to-transparent"></div>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 px-6 pb-10">
              <div className="space-y-8">
                {Object.entries(skillsByCategory).map(([category, skills]) => (
                  <div key={category} className="bg-white/5 rounded-xl p-4 shadow-md animate-slide-up skill-category">
                    <h3 className="text-lg font-semibold text-white mb-3 tracking-wide flex items-center gap-2">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-3 justify-center">
                      {skills.map(skill => (
                        <span key={skill} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-2.5 py-1.5 rounded-md text-xs font-medium shadow-sm transition-all duration-300">
                          {skillIcons[skill] && (
                            <img src={skillIcons[skill]} alt={skill} className="w-4 h-4 object-contain filter brightness-0 invert" />
                          )}
                    {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Projects Section - Desktop Version */}
          <Card ref={sectionRefs.projects} className="md:col-span-4 lg:col-span-6 bg-white/90 backdrop-blur-sm border-stone-200/60 shadow-xl hover:shadow-2xl transition-all duration-1000 hover:scale-[1.002] relative overflow-hidden group hidden md:block" id="projects">
            <div className="absolute inset-0 bg-gradient-to-r from-stone-50/20 to-gray-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>
            <CardHeader className="relative z-10 pb-16 px-16 pt-16">
              <CardTitle className="text-4xl font-light text-stone-800 relative inline-block tracking-tight">
                🚀 Projects I'm Proud Of
                <div className="absolute -bottom-3 left-0 w-20 h-px bg-gradient-to-r from-stone-400 to-transparent"></div>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 px-16 pb-20">
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: "EliteCode - Duolingo for Leetcode",
                    description: "Architected an iOS microlearning app for software interview prep, accumulating 600+ on waitlist. Features include RAG-based AI-chatbot, streaks, achievements, and pathway recommendations.",
                    image: "/assets/elitecode_image.png",
                    video: "/assets/elitecode_demo.mp4",
                    tags: ["React Native", "Node.js", "Supabase", "AWS", "Typescript", "Python"],
                    fullDescription: "So here's the thing - I was scrolling through LinkedIn one day (as we all do), and I kept seeing these posts from former classmates and colleagues landing these incredible new roles. Senior positions, better pay, cooler companies. And I'm sitting there thinking, 'Man, I need to level up my skills too.' But then reality hits: between my 9-5, family stuff, and just trying to have a life, when am I supposed to find time to learn?\n\nI'm sure you've been there. You sign up for a Coursera course, get excited for the first week, then life happens and suddenly you're three months behind. Or you try to watch those 2-hour YouTube tutorials, but by the time you get home from work, the last thing you want to do is sit at your laptop for another few hours.\n\nThat's when I had this idea: what if learning to code could be as addictive as scrolling through TikTok? What if instead of these massive time commitments, you could actually learn something useful in those random 5-minute pockets of time throughout your day?\n\nSo I built EliteCode. Think of it as Duolingo, but for coding interviews. Instead of sitting through hour-long lectures, you get these bite-sized lessons that actually stick. The app uses this cool mind-map interface where each bubble represents a coding concept - you start with the basics like arrays and hashing, then work your way up to the really fun stuff like dynamic programming.\n\nBut here's what really makes it work: the gamification is honestly addictive. I added daily streaks that you'll actually want to maintain, achievement badges that feel rewarding, and even cat videos as rewards when you hit milestones (because who doesn't love cats?). The progress tracking makes learning feel like a game rather than a chore. I've caught myself staying up late just to maintain my streak - which is exactly the kind of engagement I was going for.\n\nThe app tracks your progress and adapts to how you're doing. If you're struggling with recursion (who isn't?), it'll throw more practice problems at you. If you're crushing binary search, it'll push you toward more advanced topics. It's like having a really smart tutor who actually knows what you need.\n\nOn the tech side, I built this with React Native (so it works on both iOS and Android), Node.js for the backend, Supabase for the database (real-time features are a game-changer), and AWS for hosting.\n\nThe response has been wild - 600+ developers have already joined the waitlist. I think it really hit a nerve with people who are tired of the traditional learning model. We're not college students anymore with unlimited free time. We need something that fits into our actual lives.\n\nEliteCode isn't just another coding app. It's my attempt to solve a problem that I think a lot of us are facing - how do you keep growing professionally without losing your mind or your personal life? Hopefully, this is the answer."
                  },
                  {
                    title: "Leadbank - Crowdsourced Lead Generation App",
                    description: "Built a React Native app and Next.js CMS for M&M Marketing (UAE) to crowdsource qualified leads for credit cards/loans, with referral bonuses and real-time application tracking.",
                    image: "/assets/leadbank_image.png",
                    video: "/assets/m&m_presentation.mp4",
                    tags: ["React Native", "Supabase", "Node.js", "Next.js", "Urban Ledger"],
                    fullDescription: `Leadbank is a mobile-first platform built for M&M Marketing, a direct sales agency in the UAE, to revolutionize how they source and manage leads for financial products. The app enables users to crowdsource and submit qualified leads for credit cards and loans, track the status of their applications in real time, and withdraw referral bonuses through a custom payment gateway (built with Urban Ledger). The accompanying Next.js CMS empowers M&M agents to manage leads and update application statuses with ease. This product-focused solution saves sales agents over 3 hours a week in sourcing and managing leads, streamlining the entire process and driving measurable business impact. The app and CMS were sold as a turnkey solution to M&M Marketing, delivering a modern, scalable, and user-friendly experience for both agents and end users.`
                  },
                ].map((project, index) => (
                  <div
                    key={project.title}
                    className="relative group cursor-pointer overflow-hidden rounded-lg bg-stone-50 hover:bg-stone-100 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
                    onClick={() => {
                      setSelectedProject(project);
                      setIsProjectModalOpen(true);
                    }}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-stone-800/20 to-stone-900/40 z-10"></div>
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/400x192/64748b/ffffff?text=" + encodeURIComponent(project.title);
                        }}
                      />
                    </div>
                    
                    {/* Always Visible Content */}
                    <div className="p-6">
                      <h3 className="text-stone-800 text-xl font-light tracking-wide mb-3">{project.title}</h3>
                      <p className="text-stone-600 text-sm leading-relaxed mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag, tagIndex) => (
                        <Badge
                          key={tag}
                          variant="outline"
                            className="text-xs py-1 px-2 rounded border-stone-300 text-stone-700 font-light"
                        >
                          {tag}
                        </Badge>
                      ))}
                        {project.tags.length > 3 && (
                          <Badge
                            variant="outline"
                            className="text-xs py-1 px-2 rounded border-stone-300 text-stone-700 font-light"
                          >
                            +{project.tags.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    {/* Hover Overlay for Enhanced Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 via-stone-800/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-20"></div>
                    
                    {/* Click Indicator */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                      <ArrowUpRight className="w-4 h-4 text-stone-600" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Projects Section - Mobile Version */}
          <Card ref={sectionRefs.projects} className={`md:hidden col-span-1 bg-white/90 backdrop-blur-sm border-stone-200/60 shadow-xl transition-all duration-1000 relative overflow-hidden${isProjectModalOpen ? ' hidden' : ''}`} id="projects-mobile">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>
            <CardHeader className="relative z-10 pb-8 px-6 pt-10">
              <CardTitle className="text-3xl font-light text-stone-800 relative inline-block tracking-tight">
                🚀 Projects I'm Proud Of
                <div className="absolute -bottom-3 left-0 w-16 h-px bg-gradient-to-r from-stone-400 to-transparent"></div>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 px-6 pb-10">
              {[
                {
                  icon: Code,
                  title: "EliteCode - Duolingo for Leetcode",
                  description:
                    "Architected an iOS microlearning app for software interview prep, accumulating 600+ on waitlist. Features include RAG-based AI-chatbot, streaks, achievements, and pathway recommendations.",
                  image: "/assets/elitecode_image.png",
                  video: "/assets/elitecode_demo.mp4",
                  tags: ["React Native", "Node.js", "Supabase", "AWS", "Typescript", "Python"],
                  fullDescription: "So here's the thing - I was scrolling through LinkedIn one day (as we all do), and I kept seeing these posts from former classmates and colleagues landing these incredible new roles. Senior positions, better pay, cooler companies. And I'm sitting there thinking, 'Man, I need to level up my skills too.' But then reality hits: between my 9-5, family stuff, and just trying to have a life, when am I supposed to find time to learn?\n\nI'm sure you've been there. You sign up for a Coursera course, get excited for the first week, then life happens and suddenly you're three months behind. Or you try to watch those 2-hour YouTube tutorials, but by the time you get home from work, the last thing you want to do is sit at your laptop for another few hours.\n\nThat's when I had this idea: what if learning to code could be as addictive as scrolling through TikTok? What if instead of these massive time commitments, you could actually learn something useful in those random 5-minute pockets of time throughout your day?\n\nSo I built EliteCode. Think of it as Duolingo, but for coding interviews. Instead of sitting through hour-long lectures, you get these bite-sized lessons that actually stick. The app uses this cool mind-map interface where each bubble represents a coding concept - you start with the basics like arrays and hashing, then work your way up to the really fun stuff like dynamic programming.\n\nBut here's what really makes it work: the gamification is honestly addictive. I added daily streaks that you'll actually want to maintain, achievement badges that feel rewarding, and even cat videos as rewards when you hit milestones (because who doesn't love cats?). The progress tracking makes learning feel like a game rather than a chore. I've caught myself staying up late just to maintain my streak - which is exactly the kind of engagement I was going for.\n\nThe app tracks your progress and adapts to how you're doing. If you're struggling with recursion (who isn't?), it'll throw more practice problems at you. If you're crushing binary search, it'll push you toward more advanced topics. It's like having a really smart tutor who actually knows what you need.\n\nOn the tech side, I built this with React Native (so it works on both iOS and Android), Node.js for the backend, Supabase for the database (real-time features are a game-changer), and AWS for hosting.\n\nThe response has been wild - 600+ developers have already joined the waitlist. I think it really hit a nerve with people who are tired of the traditional learning model. We're not college students anymore with unlimited free time. We need something that fits into our actual lives.\n\nEliteCode isn't just another coding app. It's my attempt to solve a problem that I think a lot of us are facing - how do you keep growing professionally without losing your mind or your personal life? Hopefully, this is the answer."
                },
                {
                  icon: Code,
                  title: "Leadbank - Crowdsourced Lead Generation App",
                  description:
                    "Built a React Native app and Next.js CMS for M&M Marketing (UAE) to crowdsource qualified leads for credit cards/loans, with referral bonuses and real-time application tracking.",
                  image: "/assets/leadbank_image.png",
                  video: "/assets/m&m_presentation.mp4",
                  tags: ["React Native", "Supabase", "Node.js", "Next.js", "Urban Ledger"],
                  fullDescription: `Leadbank is a mobile-first platform built for M&M Marketing, a direct sales agency in the UAE, to revolutionize how they source and manage leads for financial products. The app enables users to crowdsource and submit qualified leads for credit cards and loans, track the status of their applications in real time, and withdraw referral bonuses through a custom payment gateway (built with Urban Ledger). The accompanying Next.js CMS empowers M&M agents to manage leads and update application statuses with ease. This product-focused solution saves sales agents over 3 hours a week in sourcing and managing leads, streamlining the entire process and driving measurable business impact. The app and CMS were sold as a turnkey solution to M&M Marketing, delivering a modern, scalable, and user-friendly experience for both agents and end users.`
                }
              ].map((project, index) => (
                <div
                  key={project.title}
                  className="mb-8 last:mb-0 p-8 rounded-none bg-gradient-to-br from-stone-50/50 to-gray-50/50 border-l-2 border-stone-300 relative cursor-pointer"
                  style={{ animationDelay: `${index * 200}ms` }}
                  onClick={() => {
                    setSelectedProject({
                      title: project.title,
                      description: project.description,
                      image: project.image,
                      video: project.video,
                      tags: project.tags,
                      fullDescription: project.fullDescription
                    });
                    setIsProjectModalOpen(true);
                  }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <project.icon className="w-8 h-8 text-stone-600" />
                    <h3 className="font-light text-xl text-stone-800 tracking-wide">{project.title}</h3>
                  </div>
                  <p className="text-stone-600 leading-relaxed font-light mb-6">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-sm py-1.5 px-3 rounded-none border-stone-300 text-stone-700 font-light"
                        style={{ animationDelay: `${tagIndex * 50}ms` }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Education Section */}
          <Card
            className="md:col-span-3 lg:col-span-3 bg-white/90 backdrop-blur-sm border-stone-200/60 shadow-xl hover:shadow-2xl transition-all duration-1000 hover:scale-[1.01] relative overflow-hidden group"
            id="education"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-stone-50/30 to-gray-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>
            <CardHeader className="relative z-10 pb-10 px-10 pt-10">
              <div className="flex items-center gap-5">
                <GraduationCap className="w-8 h-8 text-stone-600" />
                <CardTitle className="text-3xl font-light text-stone-800 relative inline-block tracking-tight">
                  Education
                  <div className="absolute -bottom-3 left-0 w-16 h-px bg-gradient-to-r from-stone-400 to-transparent"></div>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-8 relative z-10 px-10 pb-12">
              {[
                { 
                  school: "Cornell University", 
                  logo: "/assets/cornell_logo.png",
                  degree: "Master of Engineering in Computer Science",
                  details: "GPA: 3.8/4.0 • Expected: December 2025",
                  location: "Ithaca, NY"
                },
                { 
                  school: "University of Massachusetts Amherst", 
                  logo: "/assets/umass_logo.png",
                  degree: "Bachelor of Science in Computer Science",
                  details: "GPA: 3.63/4.0 • Graduated: December 2024",
                  location: "Amherst, MA"
                },
              ].map((edu, index) => (
                <div
                  key={edu.school}
                  className="p-8 rounded-none bg-gradient-to-r from-stone-50/50 to-gray-50/50 hover:from-stone-100/50 hover:to-gray-100/50 transition-all duration-700 transform hover:scale-[1.01] border-l-2 border-stone-300 hover:border-stone-400 relative group"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-stone-400 to-transparent transform scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-out"></div>
                  <div className="flex items-center gap-4 mb-3">
                    <img 
                      src={edu.logo} 
                      alt={`${edu.school} logo`}
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <h3 className="font-light text-xl text-stone-800 tracking-wide">{edu.school}</h3>
                  </div>
                  <p className="text-stone-700 font-light tracking-wide">{edu.degree}</p>
                  <p className="text-stone-600 font-light text-sm mt-1">{edu.details}</p>
                  <p className="text-stone-500 font-light text-sm">{edu.location}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Leadership Section */}
          <Card className="md:col-span-3 lg:col-span-3 bg-gradient-to-br from-stone-50/80 via-white to-gray-50/80 border-stone-200/60 shadow-xl hover:shadow-2xl transition-all duration-1000 hover:scale-[1.01] relative overflow-hidden group backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-stone-100/20 to-gray-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>
            <CardHeader className="relative z-10 pb-10 px-10 pt-10">
              <div className="flex items-center gap-5">
                <Users2 className="w-8 h-8 text-stone-600" />
                <CardTitle className="text-3xl font-light text-stone-800 relative inline-block tracking-tight">
                  Leadership
                  <div className="absolute -bottom-3 left-0 w-16 h-px bg-gradient-to-r from-stone-400 to-transparent"></div>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-8 relative z-10 px-10 pb-12">
              {[
                {
                  title: "Vice President - UMass Product",
                  description: "Led UMass' product management club where we discussed tech trends and developed product thinking skills among members.",
                },
                {
                  title: "CRLA II Certified Tutor",
                  description: "Taught over 500 students concepts including OOP, algorithms, discrete math and statistics with a 4.9/5 rating.",
                },
              ].map((leadership, index) => (
                <div
                  key={leadership.title}
                  className="p-8 rounded-none bg-white/70 hover:bg-white transition-all duration-700 transform hover:scale-[1.01] hover:shadow-lg border-l-2 border-stone-300 hover:border-stone-400 relative group"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-stone-400 to-transparent transform scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-out"></div>
                  <h3 className="font-light text-xl text-stone-800 mb-3 tracking-wide">{leadership.title}</h3>
                  <p className="text-stone-600 font-light tracking-wide">{leadership.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card ref={sectionRefs.contact} className="md:col-span-4 lg:col-span-6 bg-gradient-to-br from-stone-800 via-gray-800 to-stone-900 text-white shadow-2xl hover:shadow-3xl transition-all duration-1000 hover:scale-[1.002] relative overflow-hidden group" id="contact">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-stone-300/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-400 to-transparent"></div>
            <CardHeader className="relative z-10 pb-12 px-16 pt-16">
              <CardTitle className="text-4xl font-light text-white mb-6 tracking-tight">Let's Connect</CardTitle>
              <CardDescription className="text-stone-300 text-xl font-light leading-loose tracking-wide">
                Always excited to discuss new opportunities, collaborate on ML projects, or chat about AI and technology.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-10 relative z-10 px-16 pb-20">
              {[
                { icon: Mail, text: "nairaryan21@gmail.com" },
                { icon: Globe, text: "linkedin.com/in/nairaryan21" },
                { icon: Code, text: "github.com/aryan0821" },
              ].map((contact, index) => (
                <div
                  key={contact.text}
                  className="flex items-center gap-8 hover:translate-x-4 transition-all duration-700 cursor-pointer group/item p-6 rounded-none hover:bg-white/5"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <contact.icon className="w-7 h-7 text-stone-300 group-hover/item:text-white transition-colors duration-500" />
                  <span className="text-xl font-light text-white tracking-wide">{contact.text}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Floating Aryan AI Chat Button (add speech bubble above if bubbleVisible) */}
      <div className="fixed bottom-8 right-8 z-50" style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 50 }}>
        {bubbleVisible && bubbleMessage && (
          <div
            className="px-4 py-2 rounded-xl shadow-lg bg-white/90 text-stone-800 text-xs font-medium border border-stone-200 animate-fadein-bubble"
            style={{
              position: 'absolute',
              bottom: '80px',
              right: 0,
              marginBottom: 0,
              maxWidth: 320,
              minWidth: 180,
              textAlign: 'center',
              whiteSpace: 'pre-line',
              lineHeight: 1.4
            }}
          >
            {bubbleMessage}
          </div>
        )}
        <button
          className="flex flex-col items-center group outline-none"
          onClick={() => setIsChatOpen(true)}
          aria-label="Chat with Aryan AI!"
          style={{ background: 'none', border: 'none', padding: 0 }}
        >
          <div className="relative group/chat transition-transform duration-300 ease-out hover:scale-105">
            <div className="w-16 h-16 rounded-full border-4 border-white shadow-xl bg-white overflow-hidden flex items-center justify-center transition-shadow duration-300 group-hover/chat:shadow-2xl">
              <img
                src="/assets/aryan_image.png"
                alt="Aryan Nair"
                className="w-full h-full object-cover object-top"
              />
            </div>
            {/* Minimal chat icon overlay, moved outside the image circle */}
            <div className="absolute" style={{ bottom: '-14px', right: '-14px' }}>
              <div className="bg-white rounded-full p-2 shadow-md flex items-center justify-center" style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)' }}>
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
            </div>
          </div>
        </button>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes skillPopup {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes resume-appear {
          0% {
            opacity: 0;
            transform: translate(-50%, 30px) rotateX(-20deg);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, 0) rotateX(0);
          }
        }

        @keyframes skillCategoryFade {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-shimmer {
          animation: shimmer 2.5s infinite;
        }

        .animate-resume-appear {
          animation: resume-appear 1s cubic-bezier(0.23, 1, 0.32, 1) forwards;
          animation-delay: 0.5s;
          opacity: 0;
        }

        .animate-fade-in {
          animation: fade-in 1.5s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 1.8s ease-out;
        }

        .skill-card {
          backface-visibility: hidden;
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        .resume-button {
          backface-visibility: hidden;
          transform-style: preserve-3d;
        }

        .skill-category {
          backface-visibility: hidden;
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        @keyframes fadein {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scalein {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadein { animation: fadein 0.3s ease; }
        .animate-scalein { animation: scalein 0.4s cubic-bezier(0.16,1,0.3,1); }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow { animation: none; }
        .group:hover .animate-bounce-slow, .group:focus .animate-bounce-slow { animation: bounce-slow 2.2s infinite; }

        @keyframes fadein-bubble {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadein-bubble { animation: fadein-bubble 0.4s cubic-bezier(0.16,1,0.3,1); }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 1s ease-out; }

        @keyframes bouncy-scroll {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-15px);
          }
          60% {
            transform: translateY(-8px);
          }
        }
        .animate-bouncy-scroll { 
          animation: bouncy-scroll 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
