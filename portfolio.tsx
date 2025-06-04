import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowUpRight,
  Award,
  Code,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  Smartphone,
  TrendingUp,
  Users,
} from "lucide-react"
import Link from "next/link"

export default function Component() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-green-100">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="text-2xl font-bold text-green-700">Zeina Zahoori</div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#about" className="text-gray-600 hover:text-green-700 transition-colors">
                About
              </Link>
              <Link href="#experience" className="text-gray-600 hover:text-green-700 transition-colors">
                Experience
              </Link>
              <Link href="#projects" className="text-gray-600 hover:text-green-700 transition-colors">
                Projects
              </Link>
              <Link href="#leadership" className="text-gray-600 hover:text-green-700 transition-colors">
                Leadership
              </Link>
              <Link href="#contact" className="text-gray-600 hover:text-green-700 transition-colors">
                Contact
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 auto-rows-fr">
          {/* Hero Section - Large */}
          <Card className="md:col-span-4 lg:col-span-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200 row-span-2">
            <CardContent className="p-8 h-full flex flex-col justify-center">
              <div className="space-y-6">
                <div>
                  <div className="text-lg text-green-600 mb-2">👋 Hi, I'm</div>
                  <h1 className="text-5xl md:text-6xl font-bold text-green-800 mb-4">Zeina Zahoori</h1>
                  <p className="text-2xl text-green-700 mb-6">Computer Science Student at UMass Amherst</p>
                  <p className="text-lg text-gray-700 max-w-2xl leading-relaxed">
                    Passionate about building thoughtful tech, designing intuitive user experiences, and bringing people
                    together through leadership and community. Currently exploring the intersection of product
                    management and software engineering.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-green-700 hover:bg-green-800 text-white">
                    <Mail className="w-4 h-4 mr-2" />
                    Get In Touch
                  </Button>
                  <Button variant="outline" className="border-green-700 text-green-700 hover:bg-green-50">
                    <ArrowUpRight className="w-4 h-4 mr-2" />
                    View Resume
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card className="md:col-span-2 lg:col-span-2 bg-white border-green-200">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-green-700" />
                  <h3 className="font-semibold text-green-800">Impact</h3>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-green-700">1,000+</div>
                    <div className="text-sm text-gray-600">App Users Reached</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-700">71%</div>
                    <div className="text-sm text-gray-600">ML Model Accuracy</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location & Education Card */}
          <Card className="md:col-span-2 lg:col-span-2 bg-green-700 text-white">
            <CardContent className="p-6 h-full flex flex-col justify-center">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  <div>
                    <div className="font-semibold">UMass Amherst</div>
                    <div className="text-green-100 text-sm">Computer Science</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <div>
                    <div className="font-semibold">Massachusetts</div>
                    <div className="text-green-100 text-sm">Open to opportunities</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About Section */}
          <Card className="md:col-span-4 lg:col-span-3 bg-white border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">💼 What I've Worked On</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-900">BlackRock (Summer 2024)</h3>
                  <p className="text-green-700 text-sm">Product Management Intern</p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Shaped the roadmap for Aladdin Studio's Data Cloud, collaborated with stakeholders, and improved
                    client reporting using SQL and Agile tools like Azure DevOps and Aha.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Liberty Mutual (Summer 2023)</h3>
                  <p className="text-green-700 text-sm">Data Analytics Intern</p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Created Power BI dashboards to visualize security threats and enhanced Jira tracking systems.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills Grid */}
          <Card className="md:col-span-4 lg:col-span-3 bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Technical Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <Badge variant="secondary" className="bg-white text-green-700 border-green-300">
                  SwiftUI
                </Badge>
                <Badge variant="secondary" className="bg-white text-green-700 border-green-300">
                  JavaScript
                </Badge>
                <Badge variant="secondary" className="bg-white text-green-700 border-green-300">
                  C#
                </Badge>
                <Badge variant="secondary" className="bg-white text-green-700 border-green-300">
                  TensorFlow
                </Badge>
                <Badge variant="secondary" className="bg-white text-green-700 border-green-300">
                  OpenCV
                </Badge>
                <Badge variant="secondary" className="bg-white text-green-700 border-green-300">
                  SQL
                </Badge>
                <Badge variant="secondary" className="bg-white text-green-700 border-green-300">
                  Power BI
                </Badge>
                <Badge variant="secondary" className="bg-white text-green-700 border-green-300">
                  Azure DevOps
                </Badge>
                <Badge variant="secondary" className="bg-white text-green-700 border-green-300">
                  Agile/Scrum
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Projects Section */}
          <Card className="md:col-span-4 lg:col-span-4 bg-white border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">🚀 Projects I'm Proud Of</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-green-700" />
                    <h3 className="font-semibold">Kashmiri Gathering App</h3>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Led full-stack development for an app used by 1,000+ event participants with networking portal,
                    interactive map, and live updates.
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">
                      SwiftUI
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      JavaScript
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      C#
                    </Badge>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-green-700" />
                    <h3 className="font-semibold">Gesture-Controlled System</h3>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Built real-time action recognition system using TensorFlow, OpenCV, and MediaPipe with 71% accuracy
                    for hand gesture identification.
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">
                      TensorFlow
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      OpenCV
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      MediaPipe
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Leadership Section */}
          <Card className="md:col-span-2 lg:col-span-3 bg-white border-green-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-green-700" />
                <CardTitle className="text-green-800">🎓 Leadership & Community</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">President</h3>
                <p className="text-green-700 text-sm">UMass Product Club</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Founder</h3>
                <p className="text-green-700 text-sm">Girls Who Code College Loops at UMass</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Black Belt Martial Artist 🥋</h3>
                <p className="text-gray-600 text-sm">Community leader and mentor</p>
              </div>
            </CardContent>
          </Card>

          {/* Awards Section */}
          <Card className="md:col-span-2 lg:col-span-3 bg-green-50 border-green-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-green-700" />
                <CardTitle className="text-green-800">Recognition & Awards</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">Grace Hopper Scholarship</h3>
                <p className="text-gray-600 text-sm">Recipient for excellence in computer science</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Lifetime Undergraduate Course Assistant Award</h3>
                <p className="text-gray-600 text-sm">Recognition for outstanding teaching assistance</p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="md:col-span-4 lg:col-span-2 bg-green-700 text-white">
            <CardHeader>
              <CardTitle>Let's Connect</CardTitle>
              <CardDescription className="text-green-100">
                Always excited to discuss new opportunities, collaborate on projects, or chat about tech and leadership.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span className="text-sm">zeina.zahoori@umass.edu</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4" />
                <span className="text-sm">linkedin.com/in/zeinazahoori</span>
              </div>
              <div className="flex items-center gap-3">
                <Code className="w-4 h-4" />
                <span className="text-sm">github.com/zeinazahoori</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
