"use client";

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BaseEvent {
  id: string;
  type: string;
  title?: string;
  date: string;
  startTime: string;
  endTime: string;
  description?: string;
  notification?: boolean;
  isRecurring?: boolean;
  recurrencePattern?: string;
}

interface EventFormData extends BaseEvent {
  location?: string;
  property?: string;
  staff?: string[];
  additionalAttendees?: string[];
  isPrivate?: boolean;
  contact?: string;
  letting?: string;
  inspectionStatus?: string;
  inspectionBy?: string[];
  supplierInspectionBy?: string;
  tenantConfirmed?: boolean;
  maintenanceJob?: string;
  virtualViewing?: boolean;
  secondViewing?: boolean;
  viewingStatus?: string;
  arrangements?: string;
  feedback?: string;
  internalNotes?: string;
  followUpDate?: string;
  isClosed?: boolean;
}

const EVENT_TYPES = [
  'Appointment',
  'Callback',
  'Inspection',
  'Maintenance',
  'Note',
  'Public Holiday',
  'Sick Leave',
  'Staff Holiday',
  'Staff Meeting',
  'Training',
  'Valuation',
  'Viewing'
];

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [events, setEvents] = useState<EventFormData[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<{
    date: string;
    time: string;
  } | null>(null);
  const [showEventTypeSelect, setShowEventTypeSelect] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState<string>('');
  const [eventFormData, setEventFormData] = useState<EventFormData>({
    id: '',
    type: '',
    date: '',
    startTime: '',
    endTime: '',
  });

  // Time slots generation (same as before)
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    return `${String(i).padStart(2, '0')}:00`;
  });

  // Calendar navigation functions (same as before)
  const getWeekDates = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const current = new Date(startOfWeek);
      current.setDate(startOfWeek.getDate() + i);
      return current.toISOString().split('T')[0];
    });
  };

  const weekDates = getWeekDates(new Date(currentDate));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return {
      day: days[date.getDay()],
      date: date.getDate()
    };
  };

  const handleTimeSlotClick = (date: string, time: string) => {
    setSelectedSlot({ date, time });
    setShowEventTypeSelect(true);
    setEventFormData({
      ...eventFormData,
      date,
      startTime: time,
      endTime: `${String(parseInt(time.split(':')[0]) + 1).padStart(2, '0')}:00`,
    });
  };

  const handleEventTypeSelect = (type: string) => {
    setSelectedEventType(type);
    setShowEventTypeSelect(false);
    setEventFormData({
      ...eventFormData,
      type,
      id: Math.random().toString(36).substr(2, 9),
    });
  };

  const renderEventForm = () => {
    switch (selectedEventType) {
      case 'Appointment':
        return (
          <div className="space-y-4">
            <Select onValueChange={(value) => setEventFormData({ ...eventFormData, title: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Appointment Type" />
              </SelectTrigger>
              <SelectContent>
                {['Initial', 'Follow-up', 'Final'].map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Title"
              value={eventFormData.title || ''}
              onChange={(e) => setEventFormData({ ...eventFormData, title: e.target.value })}
            />
            <Input
              placeholder="Location"
              value={eventFormData.location || ''}
              onChange={(e) => setEventFormData({ ...eventFormData, location: e.target.value })}
            />
            <Input
              placeholder="Property"
              value={eventFormData.property || ''}
              onChange={(e) => setEventFormData({ ...eventFormData, property: e.target.value })}
            />
            <Textarea
              placeholder="Description"
              value={eventFormData.description || ''}
              onChange={(e) => setEventFormData({ ...eventFormData, description: e.target.value })}
            />
            <div className="flex items-center space-x-2">
              <Checkbox
                id="private"
                checked={eventFormData.isPrivate}
                onCheckedChange={(checked) => 
                  setEventFormData({ ...eventFormData, isPrivate: checked as boolean })}
              />
              <label htmlFor="private">Private</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="notification"
                checked={eventFormData.notification}
                onCheckedChange={(checked) => 
                  setEventFormData({ ...eventFormData, notification: checked as boolean })}
              />
              <label htmlFor="notification">Notification</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="recurring"
                checked={eventFormData.isRecurring}
                onCheckedChange={(checked) => 
                  setEventFormData({ ...eventFormData, isRecurring: checked as boolean })}
              />
              <label htmlFor="recurring">Is Recurring</label>
            </div>
            {eventFormData.isRecurring && (
              <Input
                placeholder="Recurrence Pattern"
                value={eventFormData.recurrencePattern || ''}
                onChange={(e) => setEventFormData({ ...eventFormData, recurrencePattern: e.target.value })}
              />
            )}
          </div>
        );
      
      // Similar form structures for other event types...
      // You can add cases for 'Callback', 'Inspection', etc.
      
      default:
        return (
          <div className="space-y-4">
            <Input
              placeholder="Title"
              value={eventFormData.title || ''}
              onChange={(e) => setEventFormData({ ...eventFormData, title: e.target.value })}
            />
            <Textarea
              placeholder="Description"
              value={eventFormData.description || ''}
              onChange={(e) => setEventFormData({ ...eventFormData, description: e.target.value })}
            />
          </div>
        );
    }
  };

  const handleCreateEvent = () => {
    if (selectedSlot && eventFormData.type) {
      setEvents([...events, eventFormData]);
      setSelectedSlot(null);
      setSelectedEventType('');
      setEventFormData({
        id: '',
        type: '',
        date: '',
        startTime: '',
        endTime: '',
      });
    }
  };

  return (
    <Card className="p-4 w-full max-w-6xl mx-auto">
      {/* Calendar header and navigation (same as before) */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <div className="flex gap-4 items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const previousWeek = new Date(currentDate);
              previousWeek.setDate(previousWeek.getDate() - 7);
              setCurrentDate(previousWeek.toISOString().split('T')[0]);
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="font-semibold">
            {new Date(currentDate).toLocaleString('default', { month: 'long', year: 'numeric' })}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const nextWeek = new Date(currentDate);
              nextWeek.setDate(nextWeek.getDate() + 7);
              setCurrentDate(nextWeek.toISOString().split('T')[0]);
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calendar grid (same as before) */}
      <div className="grid grid-cols-8 gap-1">
        {/* Time column */}
        <div className="pt-16">
          {timeSlots.map(time => (
            <div key={time} className="h-16 text-sm text-gray-500 pr-2 text-right">
              {time}
            </div>
          ))}
        </div>

        {/* Days columns */}
        {weekDates.map(date => (
          <div key={date} className="min-w-[120px]">
            <div className="text-center pb-2 pt-4 border-b">
              <div className="text-sm text-gray-500">{formatDate(date).day}</div>
              <div className="text-lg font-semibold">{formatDate(date).date}</div>
            </div>

            {timeSlots.map(time => (
              <div
                key={`${date}-${time}`}
                className="h-16 border-b border-r relative hover:bg-gray-50 cursor-pointer"
                onClick={() => handleTimeSlotClick(date, time)}
              >
                {events
                  .filter(event => 
                    event.date === date && 
                    event.startTime <= time && 
                    event.endTime > time
                  )
                  .map(event => (
                    <div
                      key={event.id}
                      className="absolute left-0 right-0 bg-blue-100 border border-blue-200 p-1 text-xs overflow-hidden"
                      style={{
                        top: '0',
                        height: '100%'
                      }}
                    >
                      {event.title || event.type}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Event Type Selection Dialog */}
      <Dialog open={showEventTypeSelect} onOpenChange={setShowEventTypeSelect}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Event Type</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-2">
            {EVENT_TYPES.map(type => (
              <Button
                key={type}
                variant="outline"
                onClick={() => handleEventTypeSelect(type)}
              >
                {type}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Event Creation Dialog */}
      <Dialog 
        open={Boolean(selectedEventType)} 
        onOpenChange={() => {
          setSelectedEventType('');
          setEventFormData({
            id: '',
            type: '',
            date: '',
            startTime: '',
            endTime: '',
          });
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create {selectedEventType}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Start Time</label>
                <Input
                  type="time"
                  value={eventFormData.startTime}
                  onChange={(e) => setEventFormData({ ...eventFormData, startTime: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">End Time</label>
                <Input
                  type="time"
                  value={eventFormData.endTime}
                  onChange={(e) => setEventFormData({ ...eventFormData, endTime: e.target.value })}
                />
              </div>
            </div>
            
            {renderEventForm()}

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedEventType('');
                  setEventFormData({
                    id: '',
                    type: '',
                    date: '',
                    startTime: '',
                    endTime: '',
                  });
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateEvent}
                disabled={!eventFormData.type}
              >
                Create Event
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default Calendar;