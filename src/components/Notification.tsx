// import React from 'react'
import api, { notificationsRoute } from "@/api/axiosConfig";
import { BellIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { NotificationItem } from "./notifications/NotificationItem";

interface Notification {
  id: string
  title: string
  message: string
  status: boolean
  userId: string
  offerId: string[]
  createdAt: string
  updatedAt: string
}

function Notification() {
  const [notify, setNotify] = useState<Notification[]>([])
  // const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const fetchNotifications = async () => {
    try {
      const response = await api.get(`${notificationsRoute}`);
      setNotify(response.data);
      //
      console.log("Notifications:", response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await api.patch(`/api/v1/myNotifications/`, { status: true })
      setNotify(notify.map(notif => 
        notif.id === id ? { ...notif, status: true } : notif
      ))
      toast({
        title: 'Success',
        description: 'Notification marked as read.',
      })
    } catch (error) {
      console.error('Error marking notification as read:', error)
      toast({
        title: 'Error',
        description: 'Failed to mark notification as read. Please try again.',
        variant: 'destructive',
      })
    }
  }
  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <BellIcon />
          {notify.length}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[40rem]">
        {notify.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} onMarkAsRead={markAsRead} />
        ))}
      </PopoverContent>
      < Toaster />
    </Popover>
  );
}

export default Notification;
