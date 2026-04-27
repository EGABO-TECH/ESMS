"use client";

import React, { useState, useEffect } from 'react';
import { X, Calendar as CalendarIcon, Clock, Link as LinkIcon, Plus, Save, Loader2 } from 'lucide-react';
import type { SchoolEvent } from '@/lib/types';

interface GlobalCalendarWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  readOnly?: boolean;
}

export default function GlobalCalendarWidget({ isOpen, onClose, readOnly = false }: GlobalCalendarWidgetProps) {
  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<SchoolEvent>>({});

  // Mock events fetch
  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    setTimeout(() => {
      setEvents([
        { id: "1", title: "Mid-Semester Exams Begin", event_date: "2024-03-10T00:00:00Z", description: "All faculties", created_at: "" },
        { id: "2", title: "Cultural Gala", event_date: "2024-03-25T00:00:00Z", description: "Main Campus", created_at: "" },
        { id: "3", title: "Career Fair", event_date: "2024-04-05T00:00:00Z", description: "Open to all students", created_at: "" }
      ] as SchoolEvent[]);
      setLoading(false);
    }, 500);
  }, [isOpen]);

  const handleAddEvent = async () => {
    if (!newEvent.title || !newEvent.event_date) return;
    setSaving(true);
    setTimeout(() => {
      setEvents([...events, {
        id: Math.random().toString(),
        title: newEvent.title!,
        event_date: newEvent.event_date!,
        event_time: newEvent.event_time || null,
        description: newEvent.description || null,
        created_at: new Date().toISOString()
      } as SchoolEvent]);
      setIsAdding(false);
      setNewEvent({});
      setSaving(false);
    }, 500);
  };

  const generateGoogleCalendarLink = (event: SchoolEvent) => {
    const text = encodeURIComponent(event.title);
    const details = encodeURIComponent(event.description ?? '');
    const dateStr = event.event_date.replace(/-/g, '');
    const dates = `${dateStr}T090000Z/${dateStr}T100000Z`;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&details=${details}&dates=${dates}`;
  };

  const downloadICS = (event: SchoolEvent) => {
    const dateStr = event.event_date.replace(/-/g, '');
    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Cavendish University Uganda//School Management System//EN\nBEGIN:VEVENT\nUID:${event.id}@cavendish.ac.ug\nDTSTAMP:${dateStr}T000000Z\nDTSTART:${dateStr}T090000Z\nDTEND:${dateStr}T100000Z\nSUMMARY:${event.title}\nDESCRIPTION:${event.description ?? ''}\nEND:VEVENT\nEND:VCALENDAR`;
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.title.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative w-full max-w-md bg-surface-bg h-full shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-subtle bg-white">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg text-primary">
              <CalendarIcon size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">School Calendar</h2>
              {readOnly && <p className="text-xs text-slate-400">View only — contact admin to add events</p>}
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Add Button (admin/staff only) */}
          {!readOnly && !isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              className="w-full py-3 bg-primary text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Plus size={18} />
              Add School Event
            </button>
          )}

          {/* Add Event Form */}
          {!readOnly && isAdding && (
            <div className="bg-white p-4 rounded-xl border border-primary/30 shadow-sm space-y-4">
              <h3 className="font-semibold text-slate-900">New Event</h3>
              <input
                type="text"
                placeholder="Event Title"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/50"
                value={newEvent.title || ''}
                onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
              />
              <div className="flex gap-2">
                <input
                  type="date"
                  className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/50"
                  value={newEvent.event_date || ''}
                  onChange={e => setNewEvent({ ...newEvent, event_date: e.target.value })}
                />
                <input
                  type="time"
                  className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/50"
                  value={newEvent.event_time || ''}
                  onChange={e => setNewEvent({ ...newEvent, event_time: e.target.value })}
                />
              </div>
              <textarea
                placeholder="Description"
                rows={2}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/50"
                value={newEvent.description || ''}
                onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
              />
              <div className="flex gap-2 pt-2">
                <button onClick={() => setIsAdding(false)} className="flex-1 py-2 text-slate-600 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">
                  Cancel
                </button>
                <button onClick={handleAddEvent} disabled={saving} className="flex-1 py-2 bg-primary text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-60">
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  {saving ? 'Saving...' : 'Save Event'}
                </button>
              </div>
            </div>
          )}

          {/* Event List */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-500 text-sm uppercase tracking-wider">Upcoming Events</h3>

            {loading && (
              <div className="text-center py-8">
                <Loader2 className="animate-spin mx-auto text-primary" size={32} />
                <p className="text-sm text-slate-400 mt-2">Loading events...</p>
              </div>
            )}

            {!loading && events.map(event => (
              <div key={event.id} className="bg-white p-4 rounded-xl border border-border-subtle shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-slate-900 mb-1">{event.title}</h4>
                <p className="text-sm text-slate-600 mb-4">{event.description}</p>

                <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-4">
                  <div className="flex items-center gap-1">
                    <CalendarIcon size={14} />
                    {new Date(event.event_date).toLocaleDateString('en-UG', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  {event.event_time && (
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {event.event_time}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                  <a
                    href={generateGoogleCalendarLink(event)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 text-xs font-semibold text-primary bg-primary/5 hover:bg-primary/10 rounded-lg flex items-center justify-center gap-1 transition-colors"
                  >
                    <LinkIcon size={12} />
                    Google Calendar
                  </a>
                  <button
                    onClick={() => downloadICS(event)}
                    className="flex-1 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center gap-1 transition-colors"
                  >
                    Apple Calendar (.ics)
                  </button>
                </div>
              </div>
            ))}

            {!loading && events.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                <CalendarIcon className="mx-auto mb-2 opacity-20" size={48} />
                <p>No upcoming events.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
