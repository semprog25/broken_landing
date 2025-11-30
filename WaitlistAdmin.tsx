import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Loader2, Users, RefreshCw } from 'lucide-react';
import { projectId } from '../../utils/supabase/info';
import { toast } from 'sonner';

export default function WaitlistAdmin() {
  const [emails, setEmails] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWaitlist = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-bf0073c5/waitlist`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setEmails(data.emails || []);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load waitlist');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWaitlist();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-xl">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Waitlist</h1>
              <p className="text-slate-500">Monitor signups</p>
            </div>
          </div>
          <Button onClick={fetchWaitlist} variant="outline" className="gap-2">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
            <div className="font-semibold text-slate-700">Total Signups</div>
            <div className="text-2xl font-bold text-purple-600">{emails.length}</div>
          </div>
          
          {loading && emails.length === 0 ? (
            <div className="p-12 flex justify-center text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : emails.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {emails.map((email, i) => (
                <div key={i} className="p-4 hover:bg-slate-50 transition-colors flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-medium text-slate-500">
                    {i + 1}
                  </div>
                  <div className="text-slate-700 font-medium">{email}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-slate-500">
              No signups yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
