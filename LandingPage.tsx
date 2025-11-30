import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Heart, Users, Trophy, BookOpen, Flame, Sparkles,
  Wind
} from 'lucide-react';
import { Button } from '../ui/button';
import logoBlack from 'figma:asset/4ac94cc5a7686ac83a5d50b3ef4e3eec49375f54.png';
import BubblesBackground from './BubblesBackground';
import { WaitlistForm } from './WaitlistForm';

interface LandingPageProps {
  onEnterApp?: () => void;
}

export default function LandingPage({ onEnterApp }: LandingPageProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Wind,
      title: 'Panic Attack Help',
      description: 'Immediate calming techniques with guided breathing and grounding exercises.',
      color: 'text-red-500',
      bg: 'bg-red-50',
      border: 'border-red-100'
    },
    {
      icon: Heart,
      title: 'Daily Check-Ins',
      description: 'Track your emotional progress and build streaks.',
      color: 'text-pink-500',
      bg: 'bg-pink-50',
      border: 'border-pink-100'
    },
    {
      icon: Trophy,
      title: 'Gamified Healing',
      description: 'Earn XP, level up, and unlock achievements as you heal.',
      color: 'text-yellow-500',
      bg: 'bg-yellow-50',
      border: 'border-yellow-100'
    },
    {
      icon: Users,
      title: 'Match & Connect',
      description: 'Find peers at similar healing stages for support.',
      color: 'text-blue-500',
      bg: 'bg-blue-50',
      border: 'border-blue-100'
    },
    {
      icon: BookOpen,
      title: 'Journaling',
      description: 'Private, secure space to express your thoughts.',
      color: 'text-purple-500',
      bg: 'bg-purple-50',
      border: 'border-purple-100'
    },
    {
      icon: Flame,
      title: 'Photo Burn',
      description: 'Symbolic closure rituals to help you let go.',
      color: 'text-orange-500',
      bg: 'bg-orange-50',
      border: 'border-orange-100'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-purple-100">
      <BubblesBackground />

      {/* Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 20 ? 'bg-white/80 backdrop-blur-md border-b border-slate-200/50 py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-center relative">
          <div className="flex items-center gap-3">
            <img src={logoBlack} alt="Broken Logo" className="h-8 w-auto" />
            <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Broken
            </span>
          </div>
          <div className="absolute right-6 hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-purple-600 transition-colors">Features</a>
            <a href="#stories" className="text-sm font-medium text-slate-600 hover:text-purple-600 transition-colors">Stories</a>
            {onEnterApp && (
              <Button 
                variant="ghost"
                className="text-slate-600 hover:text-purple-600"
                onClick={onEnterApp}
              >
                Login
              </Button>
            )}
            <Button 
              variant="outline" 
              className="rounded-full border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800"
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Join Waitlist
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-purple-100 text-purple-700 text-sm font-medium shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span>The #1 App for Breakup Recovery</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              You're Not Broken. <br />
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                You're Breaking Through.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Transform heartbreak into healing with our gamified recovery journey. 
              Connect with peers, track your progress, and find your strength again.
            </p>

            <div id="waitlist" className="pt-8 max-w-md mx-auto">
              <WaitlistForm />
              <p className="text-xs text-slate-400 mt-3">
                Join 10,000+ others on the waitlist. Early access soon.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white/50 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything You Need to Heal</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              A complete toolkit combining psychology, community, and gamification.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white ${feature.border}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.bg} ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / Social Proof */}
      <section id="stories" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Users Waiting', value: '10k+' },
              { label: 'Panic Attacks Calmed', value: '50k+' },
              { label: 'Daily Check-ins', value: '1M+' },
              { label: 'App Store Rating', value: '4.9' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-200 bg-white">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <img src={logoBlack} alt="Broken Logo" className="h-6 w-auto opacity-80" />
            <span className="font-semibold text-slate-700">Broken</span>
          </div>
          <div className="text-sm text-slate-500">
            © 2024 Broken App. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-purple-600">Privacy</a>
            <a href="#" className="hover:text-purple-600">Terms</a>
            <a href="#" className="hover:text-purple-600">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
