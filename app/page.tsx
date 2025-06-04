"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowUpRight, Award, Code, Globe, GraduationCap, Mail, MapPin, Smartphone, Users } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Organize skills by category
const skillsByCategory = {
  "Languages & Frameworks": ["SwiftUI", "JavaScript", "C#", "Python", "React"],
  "Data & ML": ["TensorFlow", "OpenCV", "SQL", "Data Analysis"],
  "Tools & Platforms": ["Power BI", "Azure DevOps", "Git", "Docker"],
  "Methodologies": ["Agile/Scrum", "UI/UX Design", "Test-Driven Development"]
}

export default function Page() {
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  
  return (
    <div className="min-h-screen text-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-stone-200/50">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-4 md:py-6">
          <nav className="flex items-center justify-between">
            <div className="text-2xl md:text-3xl font-bold text-stone-800 hover:text-stone-900 transition-all duration-700 relative group">
              <span className="bg-gradient-to-r from-stone-800 via-gray-700 to-stone-800 bg-clip-text text-transparent tracking-tight lowercase">
                zeina zahoori
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
            <div className="hidden md:flex items-center space-x-8 lg:space-x-16">
              {["About", "Experience", "Projects", "Leadership", "Contact"].map((item, index) => (
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
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section with Spline */}
      <div className="w-full h-[100vh] relative overflow-visible">
        <div className="absolute inset-0 top-[80px] md:top-[100px] flex items-center justify-center pointer-events-none">
          <div className="relative w-[90%] sm:w-[100%] h-full items-center justify-center">
            <iframe 
              src='https://my.spline.design/creatorcafeheropage-lUhiy0IjH4D0qa4DZUJtcA13/'
              frameBorder='0' 
              width='100%' 
              height='100%'
              className="w-full scale-[1.0] sm:scale-120 md:scale-125 transform-gpu pointer-events-auto"
            />
          </div>
        </div>

        {/* Resume Button and Modal */}
        <div 
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 animate-resume-appear w-full px-4 md:px-0 md:w-auto pointer-events-auto"
          style={{ perspective: '1000px' }}
        >
          <Dialog open={isResumeOpen} onOpenChange={setIsResumeOpen}>
            <DialogTrigger asChild>
              <Button 
                className="resume-button w-full md:w-auto bg-gradient-to-r from-stone-800 via-stone-900 to-stone-800 hover:from-stone-900 hover:via-stone-800 hover:to-stone-900 text-white px-6 md:px-10 py-6 md:py-7 text-base md:text-lg tracking-wider font-light rounded-none border-2 border-stone-700/50 hover:border-stone-600 transform hover:scale-105 transition-all duration-500 group shadow-xl hover:shadow-2xl relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 animate-shimmer"></span>
                <span className="relative z-10 flex items-center">
                  View Resume
                  <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl w-[90vw] h-[85vh] p-0">
              <DialogTitle className="sr-only">Resume Preview</DialogTitle>
              <iframe
                src="/assets/zeina_resume.pdf"
                className="w-full h-full"
                style={{ border: 'none' }}
                title="Resume Preview"
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

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
                  <p className="text-2xl md:text-4xl text-stone-700 leading-relaxed font-light tracking-wide max-w-3xl">
                    Passionate about building thoughtful tech, designing intuitive user experiences, and bringing people
                    together through leadership and community.
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
                    <div className="font-light text-2xl text-white tracking-wide">UMass Amherst</div>
                    <div className="text-stone-300 font-light tracking-wide mt-2">Computer Science</div>
                  </div>
                </div>
                <div className="flex items-start gap-5 transform group-hover:translate-x-2 transition-transform duration-700 delay-150">
                  <MapPin className="w-8 h-8 mt-1 text-stone-300" />
                  <div>
                    <div className="font-light text-2xl text-white tracking-wide">New York City</div>
                    <div className="text-stone-300 font-light tracking-wide mt-2">Open to opportunities</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Experience Section */}
          <Card
            className="md:col-span-6 lg:col-span-6 border-none bg-gradient-to-r from-stone-50/80 to-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-1000 hover:scale-[1.002] relative overflow-hidden group"
            id="experience"
          >
            <CardHeader className="relative z-10 pb-12 px-6 md:px-16 pt-16">
              <CardTitle className="text-4xl font-light text-stone-800 relative inline-block tracking-tight">
                Experience
                <div className="absolute -bottom-3 left-0 w-16 h-px bg-gradient-to-r from-stone-400 to-transparent"></div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 relative z-10 px-6 md:px-16 pb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {[
                  {
                    company: "BlackRock",
                    period: "Summer 2024",
                    role: "Product Management Intern",
                    description:
                      "Shaped the roadmap for Aladdin Studio's Data Cloud, collaborated with stakeholders, and improved client reporting using SQL and Agile tools like Azure DevOps and Aha.",
                  },
                  {
                    company: "Liberty Mutual",
                    period: "Summer 2023",
                    role: "Data Analytics Intern",
                    description:
                      "Created Power BI dashboards to visualize security threats and enhanced Jira tracking systems.",
                  },
                  {
                    company: "Mediafly",
                    period: "2022",
                    role: "Data Analyst",
                    description:
                      "Analyzed large datasets, built predictive models, and helped navigate M&A transitions.",
                  },
                ].map((job, index) => (
                  <div
                    key={job.company}
                    className="p-8 md:p-10 rounded-none bg-gradient-to-br from-stone-50/50 to-gray-50/50 hover:from-stone-100/50 hover:to-gray-100/50 transition-all duration-1000 transform hover:scale-102 hover:shadow-2xl border-l-2 border-stone-300 hover:border-stone-400 relative group"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-stone-400 to-transparent transform scale-y-0 group-hover:scale-y-100 transition-transform duration-1000 ease-out"></div>
                    <div className="flex items-center gap-6">
                      <Code className="w-10 h-10 text-stone-600" />
                      <h3 className="font-light text-2xl text-stone-800 tracking-wide">{job.company}</h3>
                    </div>
                    <div className="text-stone-500 font-medium mt-4 mb-2 text-sm tracking-widest uppercase relative z-10">
                      {job.period}
                    </div>
                    <p className="text-stone-600 font-medium mb-4 text-lg tracking-wide relative z-10">{job.role}</p>
                    <p className="text-stone-600 leading-relaxed font-light tracking-wide relative z-10">{job.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skills Grid - Desktop Version */}
          <Card className="md:col-span-6 lg:col-span-6 border-none bg-gradient-to-br from-stone-900 via-gray-800 to-stone-800 text-white shadow-2xl hover:shadow-3xl transition-all duration-1000 hover:scale-[1.002] relative overflow-hidden group hidden md:block">
            <CardHeader className="relative z-10 pb-12 px-16 pt-16">
              <CardTitle className="text-4xl font-light text-white relative inline-block tracking-tight">
                Skills & Expertise
                <div className="absolute -bottom-3 left-0 w-16 h-px bg-gradient-to-r from-white to-transparent"></div>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 px-16 pb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.entries(skillsByCategory).map(([category, skills], categoryIndex) => (
                  <div 
                    key={category}
                    className="skill-category p-8 border border-white/10 bg-white/5 rounded-none relative overflow-hidden"
                    style={{ 
                      animationDelay: `${categoryIndex * 200}ms`,
                      animation: 'skillCategoryFade 0.8s ease-out backwards'
                    }}
                  >
                    <h3 className="text-xl font-light tracking-wide text-stone-200 mb-6 relative">
                      {category}
                      <div className="absolute -bottom-2 left-0 w-12 h-px bg-gradient-to-r from-stone-400 to-transparent"></div>
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {skills.map((skill, skillIndex) => (
                        <div
                          key={skill}
                          className="skill-card p-4 border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-500 hover:scale-105 group/skill relative overflow-hidden"
                          style={{ 
                            animationDelay: `${categoryIndex * 200 + skillIndex * 100}ms`,
                            animation: 'skillPopup 0.6s cubic-bezier(0.16, 1, 0.3, 1) backwards'
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover/skill:opacity-100 transition-opacity duration-500"></div>
                          <div className="text-base font-light tracking-wide group-hover/skill:translate-x-2 transition-transform duration-500 relative z-10">
                            {skill}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skills Section - Mobile Version */}
          <Card className="md:col-span-6 lg:col-span-6 border-none bg-gradient-to-br from-stone-900 via-gray-800 to-stone-800 text-white shadow-2xl transition-all duration-1000 relative overflow-hidden md:hidden">
            <CardHeader className="relative z-10 pb-8 px-6 pt-10">
              <CardTitle className="text-3xl font-light text-white relative inline-block tracking-tight">
                Skills & Expertise
                <div className="absolute -bottom-3 left-0 w-12 h-px bg-gradient-to-r from-white to-transparent"></div>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 px-6 pb-10">
              {Object.entries(skillsByCategory).map(([category, skills], categoryIndex) => (
                <div 
                  key={category}
                  className="mb-8 last:mb-0"
                  style={{ 
                    animationDelay: `${categoryIndex * 150}ms`,
                    animation: 'skillCategoryFade 0.8s ease-out backwards'
                  }}
                >
                  <h3 className="text-lg font-light tracking-wide text-stone-200 mb-3 pb-2 border-b border-white/10">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, skillIndex) => (
                      <Badge
                        key={skill}
                        className="bg-white/10 hover:bg-white/20 text-white border-none py-1.5 px-3 text-sm font-light"
                        style={{ 
                          animationDelay: `${categoryIndex * 150 + skillIndex * 50}ms`,
                          animation: 'skillPopup 0.6s cubic-bezier(0.16, 1, 0.3, 1) backwards'
                        }}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Projects Section - Desktop Version */}
          <Card
            className="md:col-span-4 lg:col-span-6 bg-white/90 backdrop-blur-sm border-stone-200/60 shadow-xl hover:shadow-2xl transition-all duration-1000 hover:scale-[1.002] relative overflow-hidden group hidden md:block"
            id="projects"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-stone-50/20 to-gray-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>
            <CardHeader className="relative z-10 pb-16 px-16 pt-16">
              <CardTitle className="text-4xl font-light text-stone-800 relative inline-block tracking-tight">
                🚀 Projects I'm Proud Of
                <div className="absolute -bottom-3 left-0 w-20 h-px bg-gradient-to-r from-stone-400 to-transparent"></div>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 px-16 pb-20">
              <div className="grid md:grid-cols-2 gap-16">
                {[
                  {
                    icon: Smartphone,
                    title: "Kashmiri Gathering App",
                    description:
                      "Led full-stack development for an app used by 1,000+ event participants with networking portal, interactive map, and live updates.",
                    tags: ["SwiftUI", "JavaScript", "C#"],
                  },
                  {
                    icon: Code,
                    title: "Gesture-Controlled System",
                    description:
                      "Built real-time action recognition system using TensorFlow, OpenCV, and MediaPipe with 71% accuracy for hand gesture identification.",
                    tags: ["TensorFlow", "OpenCV", "MediaPipe"],
                  },
                ].map((project, index) => (
                  <div
                    key={project.title}
                    className="space-y-8 p-12 rounded-none bg-gradient-to-br from-stone-50/50 to-gray-50/50 hover:from-stone-100/50 hover:to-gray-100/50 transition-all duration-1000 transform hover:scale-102 hover:shadow-2xl border-l-2 border-stone-300 hover:border-stone-400 relative group"
                    style={{ animationDelay: `${index * 300}ms` }}
                  >
                    <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-stone-400 to-transparent transform scale-y-0 group-hover:scale-y-100 transition-transform duration-1000 ease-out"></div>
                    <div className="flex items-center gap-6">
                      <project.icon className="w-10 h-10 text-stone-600" />
                      <h3 className="font-light text-2xl text-stone-800 tracking-wide">{project.title}</h3>
                    </div>
                    <p className="text-stone-600 leading-loose font-light text-lg tracking-wide">
                      {project.description}
                    </p>
                    <div className="flex gap-4 pt-4">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-sm hover:scale-105 transition-transform duration-500 py-3 px-5 rounded-none border-stone-300 text-stone-700 font-light tracking-wide"
                          style={{ animationDelay: `${tagIndex * 100}ms` }}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Projects Section - Mobile Version */}
          <Card
            className="md:hidden col-span-1 bg-white/90 backdrop-blur-sm border-stone-200/60 shadow-xl transition-all duration-1000 relative overflow-hidden"
            id="projects-mobile"
          >
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
                  icon: Smartphone,
                  title: "Kashmiri Gathering App",
                  description:
                    "Led full-stack development for an app used by 1,000+ event participants with networking portal, interactive map, and live updates.",
                  tags: ["SwiftUI", "JavaScript", "C#"],
                },
                {
                  icon: Code,
                  title: "Gesture-Controlled System",
                  description:
                    "Built real-time action recognition system using TensorFlow, OpenCV, and MediaPipe with 71% accuracy for hand gesture identification.",
                  tags: ["TensorFlow", "OpenCV", "MediaPipe"],
                },
              ].map((project, index) => (
                <div
                  key={project.title}
                  className="mb-8 last:mb-0 p-8 rounded-none bg-gradient-to-br from-stone-50/50 to-gray-50/50 border-l-2 border-stone-300 relative"
                  style={{ animationDelay: `${index * 200}ms` }}
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

          {/* Leadership Section */}
          <Card
            className="md:col-span-3 lg:col-span-3 bg-white/90 backdrop-blur-sm border-stone-200/60 shadow-xl hover:shadow-2xl transition-all duration-1000 hover:scale-[1.01] relative overflow-hidden group"
            id="leadership"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-stone-50/30 to-gray-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>
            <CardHeader className="relative z-10 pb-10 px-10 pt-10">
              <div className="flex items-center gap-5">
                <Users className="w-8 h-8 text-stone-600" />
                <CardTitle className="text-3xl font-light text-stone-800 relative inline-block tracking-tight">
                  🎓 Leadership & Community
                  <div className="absolute -bottom-3 left-0 w-16 h-px bg-gradient-to-r from-stone-400 to-transparent"></div>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-8 relative z-10 px-10 pb-12">
              {[
                { role: "President", org: "UMass Product Club" },
                { role: "Founder", org: "Girls Who Code College Loops at UMass" },
                { role: "Black Belt Martial Artist 🥋", org: "Community leader and mentor" },
              ].map((item, index) => (
                <div
                  key={item.role}
                  className="p-8 rounded-none bg-gradient-to-r from-stone-50/50 to-gray-50/50 hover:from-stone-100/50 hover:to-gray-100/50 transition-all duration-700 transform hover:scale-[1.01] border-l-2 border-stone-300 hover:border-stone-400 relative group"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-stone-400 to-transparent transform scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-out"></div>
                  <h3 className="font-light text-xl text-stone-800 tracking-wide">{item.role}</h3>
                  <p className="text-stone-700 font-light tracking-wide">{item.org}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Awards Section */}
          <Card className="md:col-span-3 lg:col-span-3 bg-gradient-to-br from-stone-50/80 via-white to-gray-50/80 border-stone-200/60 shadow-xl hover:shadow-2xl transition-all duration-1000 hover:scale-[1.01] relative overflow-hidden group backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-stone-100/20 to-gray-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>
            <CardHeader className="relative z-10 pb-10 px-10 pt-10">
              <div className="flex items-center gap-5">
                <Award className="w-8 h-8 text-stone-600" />
                <CardTitle className="text-3xl font-light text-stone-800 relative inline-block tracking-tight">
                  Recognition & Awards
                  <div className="absolute -bottom-3 left-0 w-16 h-px bg-gradient-to-r from-stone-400 to-transparent"></div>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-8 relative z-10 px-10 pb-12">
              {[
                {
                  title: "Grace Hopper Scholarship",
                  description: "Recipient for excellence in computer science",
                },
                {
                  title: "Lifetime Undergraduate Course Assistant Award",
                  description: "Recognition for outstanding teaching assistance",
                },
              ].map((award, index) => (
                <div
                  key={award.title}
                  className="p-8 rounded-none bg-white/70 hover:bg-white transition-all duration-700 transform hover:scale-[1.01] hover:shadow-lg border-l-2 border-stone-300 hover:border-stone-400 relative group"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-stone-400 to-transparent transform scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-out"></div>
                  <h3 className="font-light text-xl text-stone-800 mb-3 tracking-wide">{award.title}</h3>
                  <p className="text-stone-600 font-light tracking-wide">{award.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card
            className="md:col-span-4 lg:col-span-6 bg-gradient-to-br from-stone-800 via-gray-800 to-stone-900 text-white shadow-2xl hover:shadow-3xl transition-all duration-1000 hover:scale-[1.002] relative overflow-hidden group"
            id="contact"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-stone-300/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-400 to-transparent"></div>
            <CardHeader className="relative z-10 pb-12 px-16 pt-16">
              <CardTitle className="text-4xl font-light text-white mb-6 tracking-tight">Let's Connect</CardTitle>
              <CardDescription className="text-stone-300 text-xl font-light leading-loose tracking-wide">
                Always excited to discuss new opportunities, collaborate on projects, or chat about tech and leadership.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-10 relative z-10 px-16 pb-20">
              {[
                { icon: Mail, text: "zeina.zahoori@umass.edu" },
                { icon: Globe, text: "linkedin.com/in/zeinazahoori" },
                { icon: Code, text: "github.com/zeinazahoori" },
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

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
      `}</style>
    </div>
  )
}
