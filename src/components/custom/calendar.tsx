"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

interface CalendarProps {
  onSelectRange: (start: Date, end: Date) => void
}

export function Calendar({ onSelectRange }: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date())
  const [selectedStartDate, setSelectedStartDate] = React.useState<Date | null>(null)
  const [selectedEndDate, setSelectedEndDate] = React.useState<Date | null>(null)

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const renderCalendar = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()

    let days = []
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="text-center py-2"></div>)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDateIter = new Date(year, month, i)
      const isStartDate = selectedStartDate?.getDate() === currentDateIter.getDate() && selectedStartDate.getMonth() === currentDateIter.getMonth() && selectedStartDate.getFullYear() === currentDateIter.getFullYear()
      const isEndDate = selectedEndDate?.getDate() === currentDateIter.getDate() && selectedEndDate.getMonth() === currentDateIter.getMonth() && selectedEndDate.getFullYear() === currentDateIter.getFullYear()
      const isInRange = selectedStartDate && selectedEndDate && currentDateIter >= selectedStartDate && currentDateIter <= selectedEndDate

      days.push(
        <div 
          key={i} 
          className={`text-center py-1.5 text-sm cursor-pointer rounded-full transition-colors
            ${isStartDate ? 'bg-[#5b06be] text-white' : isEndDate ? 'bg-[#5b06be] text-white' : isInRange ? 'bg-[#f0fdf4] text-[#5b06be]' : 'hover:bg-gray-100'}`}
          onClick={() => {
            if (!selectedStartDate) {
              setSelectedStartDate(currentDateIter)
            } else if (!selectedEndDate || currentDateIter < selectedStartDate) {
              setSelectedEndDate(currentDateIter)
              onSelectRange(selectedStartDate, currentDateIter)
            } else {
              setSelectedStartDate(currentDateIter)
              setSelectedEndDate(null)
            }
          }}
        >
          {i}
        </div>
      )
    }

    return days
  }

  const quickSelectButtons = [
    { label: "This Week", value: "This Week" },
    { label: "Last Week", value: "Last Week" },
    { label: "Last 7 Days", value: "Last 7 Days" },
    { label: "This Month", value: "This Month" },
    { label: "Last 14 Days", value: "Last 14 Days" },
    { label: "Last 30 Days", value: "Last 30 Days" },
  ]

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-4 rounded-none">
        <Button
          variant="ghost"
          className="w-full text-base font-semibold mb-2 hover:bg-gray-100"
          onClick={() => onSelectRange(new Date(0), new Date())}
        >
          All time
        </Button>
        <div className="grid grid-cols-2 gap-2">
          {[0, 1].map((offset) => {
            const displayDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1)
            return (
              <div key={offset}>
                <div className="flex justify-between items-center mb-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={offset === 0 ? goToPreviousMonth : goToNextMonth}
                    className="text-[#5b06be] hover:text-[#5b06be]/90 hover:bg-transparent"
                  >
                    {offset === 0 ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </Button>
                  <h2 className="text-base font-semibold">
                    {monthNames[displayDate.getMonth()]} {displayDate.getFullYear()}
                  </h2>
                  <div className="w-8"></div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-xs font-medium text-gray-500">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                    <div key={day} className="text-center">{day}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 mt-2">
                  {renderCalendar(displayDate.getFullYear(), displayDate.getMonth())}
                </div>
              </div>
            )
          })}
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {quickSelectButtons.map((button) => (
            <Button
              key={button.value}
              variant="outline"
              onClick={() => {
                const today = new Date()
                switch (button.value) {
                  case "This Week":
                    onSelectRange(
                      new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()),
                      new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 - today.getDay()))
                    )
                    break
                  case "Last Week":
                    onSelectRange(
                      new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() - 7),
                      new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() - 1)
                    )
                    break
                  case "Last 7 Days":
                    onSelectRange(
                      new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6),
                      today
                    )
                    break
                  case "This Month":
                    onSelectRange(
                      new Date(today.getFullYear(), today.getMonth(), 1),
                      new Date(today.getFullYear(), today.getMonth() + 1, 0)
                    )
                    break
                  case "Last 14 Days":
                    onSelectRange(
                      new Date(today.getFullYear(), today.getMonth(), today.getDate() - 13),
                      today
                    )
                    break
                  case "Last 30 Days":
                    onSelectRange(
                      new Date(today.getFullYear(), today.getMonth(), today.getDate() - 29),
                      today
                    )
                    break
                }
              }}
              className="w-full hover:bg-[#5b06be] hover:text-white transition-colors"
            >
              {button.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}