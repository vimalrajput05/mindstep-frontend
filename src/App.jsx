import { useState } from 'react';
import { Brain, Target, CheckCircle, Sparkles, ArrowRight, Menu, X, Upload, BarChart3, Users } from 'lucide-react';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-indigo-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                MindStep
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-700 hover:text-indigo-600 transition">Features</a>
              <a href="#pricing" className="text-gray-700 hover:text-indigo-600 transition">Pricing</a>
              <a href="#how" className="text-gray-700 hover:text-indigo-600 transition">How It Works</a>
              <button className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition">
                Login
              </button>
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-md">
                Start Free
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block py-2 text-gray-700">Features</a>
              <a href="#pricing" className="block py-2 text-gray-700">Pricing</a>
              <a href="#how" className="block py-2 text-gray-700">How It Works</a>
              <button className="w-full py-2 text-indigo-600 border border-indigo-600 rounded-lg">
                Login
              </button>
              <button className="w-full py-2 bg-indigo-600 text-white rounded-lg">
                Start Free
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            AI-Powered Career Guidance
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
            Career Confusion?
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI Se Clarity Pao
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Skills test karein, AI analysis paayen, aur apne liye perfect career path discover karein.
            <br />
            10,000+ students ne apna career path already dhund liya hai! 🚀
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition shadow-lg hover:shadow-xl flex items-center gap-2 text-lg font-semibold">
              Start Free Test
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>
            <button className="px-8 py-4 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition shadow-md border border-gray-200 text-lg font-semibold">
              Watch Demo
            </button>
          </div>

          <div className="flex items-center justify-center gap-8 pt-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>No Credit Card</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Free Forever Plan</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>5 Min Setup</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Kyun MindStep Choose Karein?
          </h2>
          <p className="text-xl text-gray-600">
            AI-powered features jo aapko sahi career decision lene me help karein
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition group">
            <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition">
              <Brain className="w-7 h-7 text-indigo-600 group-hover:text-white transition" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Analysis</h3>
            <p className="text-gray-600 leading-relaxed">
              Advanced AI jo aapke skills, personality, aur academic performance analyze karke best career paths suggest karta hai.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition group">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition">
              <Upload className="w-7 h-7 text-purple-600 group-hover:text-white transition" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Marksheet Scan</h3>
            <p className="text-gray-600 leading-relaxed">
              10th/12th marksheet upload karein, OCR technology automatically subjects analyze karti hai aur strengths batati hai.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition group">
            <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-pink-600 transition">
              <Target className="w-7 h-7 text-pink-600 group-hover:text-white transition" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Skill Verification</h3>
            <p className="text-gray-600 leading-relaxed">
              Apne skills ko mini-quizzes se verify karein. Self-reporting nahi, real assessment milta hai aapko.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition group">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition">
              <BarChart3 className="w-7 h-7 text-green-600 group-hover:text-white transition" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Career Roadmap</h3>
            <p className="text-gray-600 leading-relaxed">
              Step-by-step learning roadmap milta hai. Kya seekhna hai, kab seekhna hai - sab clear ho jata hai.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition group">
            <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-600 transition">
              <Users className="w-7 h-7 text-yellow-600 group-hover:text-white transition" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Peer Comparison</h3>
            <p className="text-gray-600 leading-relaxed">
              Top 10% students kya kar rahe hain? Successful students ki journey se seekhein aur improve karein.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition group">
            <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-600 transition">
              <Sparkles className="w-7 h-7 text-red-600 group-hover:text-white transition" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Mentor</h3>
            <p className="text-gray-600 leading-relaxed">
              24/7 AI chatbot mentor jo career doubts solve karta hai, resources suggest karta hai aur motivate karta hai.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Kaise Kaam Karta Hai?
            </h2>
            <p className="text-xl text-gray-600">
              Sirf 4 simple steps me apna career path discover karein
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Register Karein', desc: 'Email se free account banayein' },
              { step: '02', title: 'Tests Complete Karein', desc: 'Skill + Psychometric tests complete karein' },
              { step: '03', title: 'AI Analysis Paayen', desc: 'Personalized career recommendations milenge' },
              { step: '04', title: 'Roadmap Follow Karein', desc: 'Step-by-step learning path follow karein' }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple Pricing, Maximum Value
          </h2>
          <p className="text-xl text-gray-600">
            Free me start karein, jab chahein upgrade karein
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
            <div className="text-4xl font-bold text-gray-900 mb-6">
              ₹0<span className="text-lg text-gray-600 font-normal">/forever</span>
            </div>
            <ul className="space-y-4 mb-8">
              {[
                'Basic skill tests',
                '3 AI career suggestions',
                'Psychometric test',
                'Marksheet upload',
                '5 skills verification',
                'Basic dashboard'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <button className="w-full py-3 border-2 border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-50 transition font-semibold">
              Start Free
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-8 rounded-2xl shadow-2xl relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-400 text-yellow-900 rounded-full text-sm font-bold">
              MOST POPULAR
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
            <div className="text-4xl font-bold text-white mb-6">
              ₹99<span className="text-lg text-indigo-200 font-normal">/one-time</span>
            </div>
            <ul className="space-y-4 mb-8">
              {[
                'Everything in Free',
                'Unlimited skill verification',
                'Detailed AI analysis',
                'Interactive career roadmap',
                'Downloadable PDF report',
                'Learning tracker',
                'AI mentor chatbot',
                'Peer comparison insights',
                'Job recommendations',
                'Lifetime access'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white">{item}</span>
                </li>
              ))}
            </ul>
            <button className="w-full py-3 bg-white text-indigo-600 rounded-xl hover:bg-gray-100 transition font-semibold shadow-lg">
              Upgrade Now - ₹99
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Apne Career Ki Clarity Paayen
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join 10,000+ students jo already apna perfect career path dhund chuke hain
          </p>
          <button className="px-8 py-4 bg-white text-indigo-600 rounded-xl hover:bg-gray-100 transition shadow-xl text-lg font-semibold">
            Start Your Journey - It's Free! 🚀
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-6 h-6 text-indigo-400" />
                <span className="text-xl font-bold text-white">MindStep</span>
              </div>
              <p className="text-sm">
                AI-powered career guidance platform for smart students.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Email: support@mindstep.com</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
            <p>© 2024 MindStep. Made with ❤️ for students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}