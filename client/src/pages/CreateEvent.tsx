import axios from 'axios'
import { useState } from 'react';
import { CalendarIcon, Plus } from "lucide-react"
import { format } from "date-fns"
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import useAppStore from "@/store/mainStore"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import AlertBox from '@/components/AlertBox';

const formSchema = z.object({
  eventName: z.string().min(2, {message: "Event name must be atleast 2 characters long"}).max(50, {message: "Event name cannot exceed 50 characters"}),
  startDate: z.date(),
  endDate: z.date().optional(),
}).refine((data) => data.endDate ? data.startDate < data.endDate : data.startDate, {
    message: "Start date must be before end date",
    path: ["endDate"]
})


export default function CreateEvent() {
  //TODO Handle loading on clicking submit
  const {user, addEvent} = useAppStore();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
          resolver: zodResolver(formSchema),
          defaultValues: {
              eventName: "",
              startDate: undefined,
              endDate: undefined
          }
      })


  const onFormSubmit = async (data: z.infer<typeof formSchema>) => {
    setMessage("");
    setError(false);
    const response = await axios.post('/api/v1/events/create', {
        eventName: data.eventName,
        startDate: data.startDate,
        endDate: data.endDate,
        user: user?.id,
    }, {withCredentials: true})
    if (response.data.success){
      addEvent(response.data.event);
      setMessage(response.data.message);
      form.reset({eventName: "", startDate: undefined, endDate: undefined});
    }else{
       setMessage(response.data.message);
       setError(true);
    }
  }

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
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6">
              <div className="space-y-2">
                <FormField
                    control={form.control}
                    name="eventName"
                    render={( {field }) => (
                        <FormItem>
                        <FormLabel>Event Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter Event Name" {...field} />
                        </FormControl>
                        <FormDescription>Enter an appropriate Event Name.</FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Start Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date.getUTCDate() < new Date().getUTCDate()
                                }
                                captionLayout="dropdown"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            Enter Start Date of your Event
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>

                <div className="space-y-2">
                  <FormField
                            control={form.control}
                            name="endDate"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>End Date (optional)</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-[240px] pl-3 text-left font-normal",
                                          !field.value && "text-muted-foreground"
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "PPP")
                                        ) : (
                                          <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      disabled={(date) =>
                                        date.getUTCDate() < new Date().getUTCDate()
                                      }
                                      captionLayout="dropdown"
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormDescription>
                                  Enter End Date of your Event. 
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1">
                  Submit
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.reset({eventName: "", startDate: undefined, endDate: undefined})
                    setMessage("");
                    setError(false);
                  }}
                >
                  Clear Form
                </Button>
              </div>
            </form>
            </Form>
          </CardContent>
        </Card>
        {message ? <AlertBox error={error} title={message}/> : null}
      </div>
    </div>
  )
}
