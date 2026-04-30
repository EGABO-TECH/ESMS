"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { TimetableSession } from '@/lib/types';
import { Clock, MapPin, BookOpen, Loader2, Calendar } from 'lucide-react';

interface TimetableGridProps {
  filterType: 'program' | 'faculty' | 'all';
  filterValue?: string;
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const TIME_SLOTS = [
  '08:00-10:00', '10:00-12:00', '12:00-14:00', 
  '14:00-16:00', '16:00-18:00', '18:00-20:00', '20:00-22:00'
];

const FACULTY_COLORS: Record<string, string> = {
  'FST': 'bg-blue-500/10 border-blue-500/30 text-blue-700',
  'BUS': 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700',
  'SES': 'bg-amber-500/10 border-amber-500/30 text-amber-700',
  'LAW': 'bg-rose-500/10 border-rose-500/30 text-rose-700',
  'General': 'bg-slate-500/10 border-slate-500/30 text-slate-700',
};

export default function TimetableGrid({ filterType, filterValue }: TimetableGridProps) {
  const [sessions, setSessions] = useState<TimetableSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTimetable() {
      setLoading(true);
      try {
        let query = supabase
          .from('timetable_sessions')
          .select('*, courses(*)');

        if (filterType === 'program' && filterValue) {
          query = query.ilike('programs', `%${filterValue}%`);
        } else if (filterType === 'faculty' && filterValue) {
          query = query.eq('faculty', filterValue);
        }

        const { data, error } = await query;
        
        if (error) throw error;
        setSessions(data || []);
      } catch (err) {
        console.error('Error fetching timetable:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchTimetable();
  }, [filterType, filterValue]);

  const getSessionAt = (day: string, time: string) => {
    return sessions.filter(s => s.day === day && s.time === time);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-slate-100">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-slate-500 font-medium animate-pulse">Synchronizing Schedule Data...</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
      {/* Header Info */}
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary shadow-inner">
            <Calendar size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Weekly Teaching Schedule</h3>
            <p className="text-sm text-slate-500 font-medium">
              {filterType === 'program' ? `Viewing schedule for: ${filterValue}` : 'Full University Timetable'}
            </p>
          </div>
        </div>
        <div className="px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Live Sync Enabled</span>
        </div>
      </div>

      {/* Grid Container */}
      <div className="overflow-x-auto">
        <div className="min-w-[1000px]">
          {/* Days Header */}
          <div className="grid grid-cols-[120px_repeat(7,1fr)] border-b border-slate-100 bg-slate-50/30">
            <div className="p-4 border-r border-slate-100" />
            {DAYS.map(day => (
              <div key={day} className="p-4 text-center font-bold text-slate-700 uppercase tracking-widest text-xs border-r border-slate-100 last:border-r-0">
                {day}
              </div>
            ))}
          </div>

          {/* Time Slots */}
          {TIME_SLOTS.map((time) => (
            <div key={time} className={`grid grid-cols-[120px_repeat(7,1fr)] border-b border-slate-50 last:border-b-0`}>
              <div className="p-6 border-r border-slate-100 flex flex-col items-center justify-center bg-slate-50/20">
                <Clock size={16} className="text-slate-400 mb-1" />
                <span className="text-[10px] font-bold text-slate-600 whitespace-nowrap">{time}</span>
              </div>

              {DAYS.map(day => {
                const daySessions = getSessionAt(day, time);
                return (
                  <div key={`${day}-${time}`} className="p-2 min-h-[140px] border-r border-slate-50 last:border-r-0 relative group">
                    {daySessions.map(session => (
                      <div 
                        key={session.id}
                        className={`p-3 rounded-2xl border mb-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer ${FACULTY_COLORS[session.faculty] || FACULTY_COLORS['General']}`}
                      >
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <BookOpen size={12} className="opacity-70" />
                          <span className="text-[10px] font-black tracking-wider uppercase">{session.course_code}</span>
                        </div>
                        <h4 className="text-xs font-bold leading-tight mb-2 line-clamp-2">
                          {session.courses?.name || 'Unknown Module'}
                        </h4>
                        <div className="flex flex-col gap-1 mt-auto">
                          <div className="flex items-center gap-1.5 text-[10px] opacity-80 font-bold">
                            <MapPin size={10} />
                            {session.room}
                          </div>
                        </div>
                        
                        {/* Tooltip on hover */}
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 w-48 bg-slate-900 text-white p-3 rounded-xl text-[10px] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10 shadow-2xl">
                          <p className="font-bold mb-1">Programs:</p>
                          <p className="text-slate-300 mb-2">{session.programs}</p>
                          <p className="font-bold mb-1 text-primary">Faculty:</p>
                          <p className="text-slate-300">{session.faculty}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
