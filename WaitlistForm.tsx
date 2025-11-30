import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Loader2, Check, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { projectId } from '../../utils/supabase/info';

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-bf0073c5/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to join waitlist');
      }

      setSubmitted(true);
      toast.success("You've been added to the waitlist!");
      setEmail('');
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
      toast.error('Failed to join waitlist');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center gap-2 p-4 bg-green-50/80 backdrop-blur-sm text-green-700 rounded-xl border border-green-200 animate-in fade-in slide-in-from-bottom-2">
        <Check className="w-5 h-5" />
        <span className="font-medium">Thanks! We'll be in touch soon.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto w-full relative z-20">
      <div className="w-full relative">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 bg-white/80 backdrop-blur-sm border-purple-200 focus:border-purple-500 focus:ring-purple-200 text-gray-900 placeholder:text-gray-400 rounded-xl shadow-sm transition-all"
          required
        />
      </div>
      <Button 
        type="submit" 
        disabled={loading}
        className="h-12 px-8 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-500/20 transition-all hover:shadow-purple-500/30 hover:scale-105"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Get Notified'}
      </Button>
      {error && (
        <div className="absolute -bottom-8 left-0 flex items-center gap-1 text-red-500 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </form>
  );
}
