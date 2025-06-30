import type React from "react"
import axios from 'axios'
import { useState } from "react"
import { CalendarIcon, Plus } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import useAppStore from "@/store/mainStore"

export default function CreateEvent() {
  const [eventName, setEventName] = useState("")
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const {user, addEvent} = useAppStore();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const response = await axios.post('/api/v1/events/create', {
        eventName,
        user: user?.id,
        startDate: format(startDate!, "dd-MM-yyyy"),
        endDate: endDate ? format(endDate, "dd-MM-yyyy") : "",
    })
    if (response.data.success){
        setEventName("")
        setStartDate(undefined)
        setEndDate(undefined)
        setIsSubmitting(false)
        addEvent(response.data.event)
    }else{
        console.log("Error creating the event")
        setErrorMessage("Error creating the event")
        setEventName("")
        setStartDate(undefined)
        setEndDate(undefined)
        setIsSubmitting(false)
    }
  }

  const isFormValid = eventName.trim() && startDate && (endDate != undefined && startDate < endDate)

  return (
    <div className="w-full flex justify-center items-center">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Create New Event</h1>
          <p className="mt-2 text-gray-600">Set up a new event to manage its inventory</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Event Details
            </CardTitle>
            <CardDescription>
              Enter the basic information for your event. Start date is required, end date is optional.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="eventName">Event Name *</Label>
                <Input
                  id="eventName"
                  placeholder="Enter event name"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="w-full"
                />
                <p className="text-sm text-gray-500">Choose a descriptive name for your event</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Start Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "dd-MM-yyyy") : "Pick start date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={(date) => {
                                if (date) {
                                    setStartDate(date);
                                }
                                }}
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>End Date (Optional)</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "dd-MM-yyyy") : "Pick end date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={(date) => {
                            if (date){
                                setEndDate(date);
                            }
                        }}
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      />
                    </PopoverContent>
                  </Popover>
                  <p className="text-sm text-gray-500">Leave empty for single-day events</p>
                </div>
              </div>
              {endDate != undefined && startDate != undefined ? (startDate > endDate ? <span className="text-red-500 font-bold text-sm">*Start date is before End Date</span> : null ): null}
              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={!isFormValid || isSubmitting} className="flex-1">
                  {isSubmitting ? "Creating Event..." : "Create Event"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEventName("")
                    setStartDate(undefined)
                    setEndDate(undefined)
                  }}
                  disabled={isSubmitting}
                >
                  Clear Form
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <div>
            <span className="text-red-500 font-bold text-sm">{errorMessage}</span>
        </div>
      </div>
    </div>
  )
}
