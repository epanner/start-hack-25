"use client"

import { useState } from "react"
import { Bell, Calendar, DollarSign, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

interface Notification {
  id: string
  title: string
  description: string
  time: string
  read: boolean
  type: "meeting" | "risk" | "tax"
}

export function NotificationsPopover() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Portfolio Risk Alert",
      description: "Technology sector exposure exceeding target allocation by 7% for John Doe",
      time: "10 minutes ago",
      read: false,
      type: "risk",
    },
    {
      id: "2",
      title: "Tax Optimization Opportunity",
      description: "Tax-loss harvesting opportunity identified for Alice Smith, potential savings of $32,800",
      time: "2 hours ago",
      read: false,
      type: "tax",
    },
    {
      id: "3",
      title: "Upcoming Client Meeting",
      description: "Portfolio Review with Robert Johnson scheduled for tomorrow at 2:00 PM",
      time: "Yesterday",
      read: false,
      type: "meeting",
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:hover:bg-slate-700 light:bg-white light:border-slate-200 light:text-slate-900 light:hover:bg-slate-100"
        >
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
          {unreadCount > 0 && (
            <Badge className="absolute -right-1 -top-1 h-4 w-4 rounded-full p-0 text-[10px] bg-[#af2018]">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 dark:bg-slate-800 dark:border-slate-700 dark:text-white light:bg-white light:text-slate-900 light:border-slate-200">
        <div className="flex items-center justify-between p-4">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs h-7 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-700 light:text-slate-500 light:hover:text-slate-900 light:hover:bg-slate-100"
            >
              Mark all as read
            </Button>
          )}
        </div>
        <Separator className="dark:bg-slate-700 light:bg-slate-200" />
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">No new notifications</div>
          ) : (
            <div>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 relative ${notification.read ? "opacity-70" : ""} hover:bg-slate-700/20`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex gap-3">
                    <div className="mt-0.5">
                      {notification.type === "risk" && (
                        <div className="rounded-full bg-amber-500/20 p-1.5">
                          <ShieldAlert className="h-4 w-4 text-amber-500" />
                        </div>
                      )}
                      {notification.type === "tax" && (
                        <div className="rounded-full bg-emerald-500/20 p-1.5">
                          <DollarSign className="h-4 w-4 text-emerald-500" />
                        </div>
                      )}
                      {notification.type === "meeting" && (
                        <div className="rounded-full bg-blue-500/20 p-1.5">
                          <Calendar className="h-4 w-4 text-blue-500" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{notification.title}</h4>
                      <p className="text-xs text-slate-400 mt-1">{notification.description}</p>
                      <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
                    </div>
                  </div>
                  {!notification.read && <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-[#af2018]" />}
                </div>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

