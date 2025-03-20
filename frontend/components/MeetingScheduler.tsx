"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface MeetingSchedulerProps {
  isOpen: boolean
  onClose: () => void
  clientName: string
  recentMeetings: Array<{ date: Date; title: string }>
  upcomingMeetings: Array<{ date: Date; title: string }>
  onScheduleMeeting: (date: Date, title: string, notes: string) => void
  onCancelMeeting: (index: number) => void
}

export function MeetingScheduler({
  isOpen,
  onClose,
  clientName,
  recentMeetings,
  upcomingMeetings,
  onScheduleMeeting,
  onCancelMeeting,
}: MeetingSchedulerProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState("09:00")
  const [meetingType, setMeetingType] = useState("Portfolio Review")
  const [notes, setNotes] = useState("")
  const [activeTab, setActiveTab] = useState("schedule")

  const handleSchedule = () => {
    if (date) {
      const [hours, minutes] = time.split(":").map(Number)
      const scheduledDate = new Date(date)
      scheduledDate.setHours(hours, minutes)
      onScheduleMeeting(scheduledDate, meetingType, notes)
      resetForm()
      onClose()
    }
  }

  const resetForm = () => {
    setDate(new Date())
    setTime("09:00")
    setMeetingType("Portfolio Review")
    setNotes("")
  }

  const timeOptions = []
  for (let hour = 8; hour <= 17; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour.toString().padStart(2, "0")
      const formattedMinute = minute.toString().padStart(2, "0")
      timeOptions.push(`${formattedHour}:${formattedMinute}`)
    }
  }

  const meetingTypes = [
    "Portfolio Review",
    "Financial Planning",
    "Tax Planning",
    "Retirement Planning",
    "Estate Planning",
    "Investment Strategy",
    "Risk Assessment",
    "General Check-in",
  ]

  // Custom date picker implementation
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const renderCalendar = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-9 h-9"></div>)
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i)
      const isToday = new Date().toDateString() === currentDate.toDateString()
      const isSelected = date?.toDateString() === currentDate.toDateString()
      const isPast = currentDate < new Date(new Date().setHours(0, 0, 0, 0))

      days.push(
        <button
          key={i}
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setDate(currentDate)
          }}
          disabled={isPast}
          className={cn(
            "w-9 h-9 rounded-md flex items-center justify-center text-sm",
            isToday && "bg-slate-700 text-white",
            isSelected && "bg-[#af2018] text-white",
            isPast && "text-slate-600 cursor-not-allowed",
            !isToday && !isSelected && !isPast && "hover:bg-slate-700",
          )}
        >
          {i}
        </button>,
      )
    }

    return days
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden flex flex-col bg-slate-900 text-white border-slate-800">
        <DialogHeader>
          <DialogTitle>Schedule Meeting with {clientName}</DialogTitle>
          <DialogDescription className="text-slate-400">
            Schedule a new meeting or manage existing appointments.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="grid grid-cols-2 mb-4 bg-slate-800">
            <TabsTrigger value="schedule" className="data-[state=active]:bg-[#af2018] data-[state=active]:text-white">
              Schedule New Meeting
            </TabsTrigger>
            <TabsTrigger value="manage" className="data-[state=active]:bg-[#af2018] data-[state=active]:text-white">
              Manage Meetings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="flex-1 overflow-auto">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="meeting-date" className="text-white">
                    Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="meeting-date"
                        variant="outline"
                        className="w-full justify-start text-left font-normal bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700" sideOffset={4}>
                      <div className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <button onClick={prevMonth} className="p-1 rounded-md hover:bg-slate-700">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="m15 18-6-6 6-6" />
                            </svg>
                          </button>
                          <div className="text-sm font-medium">{format(currentMonth, "MMMM yyyy")}</div>
                          <button onClick={nextMonth} className="p-1 rounded-md hover:bg-slate-700">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="m9 18 6-6-6-6" />
                            </svg>
                          </button>
                        </div>

                        <div className="grid grid-cols-7 gap-1 mb-2">
                          {daysOfWeek.map((day) => (
                            <div key={day} className="w-9 h-6 flex items-center justify-center text-xs text-slate-400">
                              {day}
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meeting-time" className="text-white">
                    Time
                  </Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger id="meeting-time" className="w-full bg-slate-800 border-slate-700 text-white">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 text-white">
                      {timeOptions.map((timeOption) => (
                        <SelectItem key={timeOption} value={timeOption} className="hover:bg-slate-700">
                          {timeOption}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meeting-type" className="text-white">
                  Meeting Type
                </Label>
                <Select value={meetingType} onValueChange={setMeetingType}>
                  <SelectTrigger id="meeting-type" className="w-full bg-slate-800 border-slate-700 text-white">
                    <SelectValue placeholder="Select meeting type" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    {meetingTypes.map((type) => (
                      <SelectItem key={type} value={type} className="hover:bg-slate-700">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meeting-notes" className="text-white">
                  Notes
                </Label>
                <Input
                  id="meeting-notes"
                  placeholder="Add meeting notes or agenda items"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="manage" className="flex-1 overflow-hidden flex flex-col">
            <ScrollArea className="flex-1">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2 text-white">Upcoming Meetings</h3>
                  {upcomingMeetings.length > 0 ? (
                    <div className="space-y-3">
                      {upcomingMeetings.map((meeting, index) => (
                        <div
                          key={index}
                          className="flex items-start justify-between p-3 rounded-md border border-slate-800 bg-slate-950"
                        >
                          <div className="flex items-start gap-3">
                            <CalendarIcon className="h-5 w-5 text-[#af2018] mt-0.5" />
                            <div>
                              <p className="font-medium text-white">{meeting.title}</p>
                              <p className="text-sm text-slate-400">
                                {format(meeting.date, "PPP")} at {format(meeting.date, "h:mm a")}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-100/10"
                            onClick={() => onCancelMeeting(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-400 text-sm">No upcoming meetings scheduled.</p>
                  )}
                </div>

                <Separator className="bg-slate-800" />

                <div>
                  <h3 className="text-lg font-medium mb-2 text-white">Recent Meetings</h3>
                  {recentMeetings.length > 0 ? (
                    <div className="space-y-3">
                      {recentMeetings.map((meeting, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 rounded-md border border-slate-800 bg-slate-950"
                        >
                          <CalendarIcon className="h-5 w-5 text-slate-400 mt-0.5" />
                          <div>
                            <p className="font-medium text-white">{meeting.title}</p>
                            <p className="text-sm text-slate-400">
                              {format(meeting.date, "PPP")} at {format(meeting.date, "h:mm a")}
                            </p>
                            <Badge variant="outline" className="mt-1 bg-slate-800 text-slate-300 border-slate-700">
                              Completed
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-400 text-sm">No recent meetings.</p>
                  )}
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <DialogFooter className="border-t border-slate-800 pt-4">
          {activeTab === "schedule" ? (
            <>
              <Button
                variant="outline"
                onClick={onClose}
                className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
              >
                Cancel
              </Button>
              <Button onClick={handleSchedule} className="bg-[#af2018] hover:bg-[#8a1a13] text-white">
                Schedule Meeting
              </Button>
            </>
          ) : (
            <Button onClick={onClose} className="bg-[#af2018] hover:bg-[#8a1a13] text-white">
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

