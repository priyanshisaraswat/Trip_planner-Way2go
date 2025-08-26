"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ArrowLeft,
  CalendarIcon,
  MapPin,
  Users,
  DollarSign,
  Mountain,
  Waves,
  TreePine,
  Camera,
  Utensils,
  Music,
} from "lucide-react"
import { format } from "date-fns"

type PlanningStep = "mode" | "mood" | "destination" | "duration" | "activities" | "budget" | "summary"

const moods = [
  { id: "adventure", label: "Adventure", icon: Mountain, color: "bg-orange-500" },
  { id: "relaxation", label: "Relaxation", icon: Waves, color: "bg-blue-500" },
  { id: "nature", label: "Nature", icon: TreePine, color: "bg-green-500" },
  { id: "culture", label: "Culture", icon: Camera, color: "bg-purple-500" },
  { id: "food", label: "Food & Drink", icon: Utensils, color: "bg-red-500" },
  { id: "nightlife", label: "Nightlife", icon: Music, color: "bg-pink-500" },
]

const activities = [
  "Hiking",
  "Trekking",
  "Swimming",
  "Snorkeling",
  "Sightseeing",
  "Museums",
  "Food Tours",
  "Shopping",
  "Photography",
  "Beach Activities",
  "Water Sports",
  "Cultural Events",
  "Nightlife",
  "Adventure Sports",
]

export default function PlanningPage() {
  const [currentStep, setCurrentStep] = useState<PlanningStep>("mode")
  const [planningMode, setPlanningMode] = useState<"mood" | "direct">("mood")
  const [selectedMoods, setSelectedMoods] = useState<string[]>([])
  const [destination, setDestination] = useState("")
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [wakeTime, setWakeTime] = useState("08:00")
  const [sleepTime, setSleepTime] = useState("22:00")
  const [selectedActivities, setSelectedActivities] = useState<string[]>([])
  const [customActivity, setCustomActivity] = useState("")
  const [budget, setBudget] = useState([1000])
  const [groupSize, setGroupSize] = useState(1)

  const handleNext = () => {
    const steps: PlanningStep[] =
      planningMode === "mood"
        ? ["mode", "mood", "destination", "duration", "activities", "budget", "summary"]
        : ["mode", "destination", "duration", "activities", "budget", "summary"]

    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1])
    }
  }

  const handleBack = () => {
    const steps: PlanningStep[] =
      planningMode === "mood"
        ? ["mode", "mood", "destination", "duration", "activities", "budget", "summary"]
        : ["mode", "destination", "duration", "activities", "budget", "summary"]

    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1])
    }
  }

  const toggleMood = (moodId: string) => {
    setSelectedMoods((prev) => (prev.includes(moodId) ? prev.filter((id) => id !== moodId) : [...prev, moodId]))
  }

  const toggleActivity = (activity: string) => {
    setSelectedActivities((prev) =>
      prev.includes(activity) ? prev.filter((a) => a !== activity) : [...prev, activity],
    )
  }

  const addCustomActivity = () => {
    if (customActivity.trim() && !selectedActivities.includes(customActivity.trim())) {
      setSelectedActivities((prev) => [...prev, customActivity.trim()])
      setCustomActivity("")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold">Trip Planning</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {currentStep === "mode" && (
          <Card>
            <CardHeader>
              <CardTitle>Choose Planning Mode</CardTitle>
              <CardDescription>How would you like to plan your trip?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card
                  className={`cursor-pointer transition-all ${planningMode === "mood" ? "ring-2 ring-primary" : ""}`}
                  onClick={() => setPlanningMode("mood")}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">Plan by Mood</CardTitle>
                    <CardDescription>Tell us how you're feeling and we'll suggest destinations</CardDescription>
                  </CardHeader>
                </Card>

                <Card
                  className={`cursor-pointer transition-all ${planningMode === "direct" ? "ring-2 ring-primary" : ""}`}
                  onClick={() => setPlanningMode("direct")}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">Direct Planning</CardTitle>
                    <CardDescription>Start with a specific destination in mind</CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <Button onClick={handleNext} className="w-full">
                Continue
              </Button>
            </CardContent>
          </Card>
        )}

        {currentStep === "mood" && planningMode === "mood" && (
          <Card>
            <CardHeader>
              <CardTitle>What's Your Travel Mood?</CardTitle>
              <CardDescription>Select all that apply to help us find the perfect destination</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {moods.map((mood) => {
                  const Icon = mood.icon
                  const isSelected = selectedMoods.includes(mood.id)
                  return (
                    <Card
                      key={mood.id}
                      className={`cursor-pointer transition-all ${isSelected ? "ring-2 ring-primary" : ""}`}
                      onClick={() => toggleMood(mood.id)}
                    >
                      <CardContent className="p-4 text-center">
                        <div className={`${mood.color} rounded-full p-3 mx-auto mb-2 w-fit`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <p className="font-medium">{mood.label}</p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              <Button onClick={handleNext} className="w-full" disabled={selectedMoods.length === 0}>
                Continue ({selectedMoods.length} selected)
              </Button>
            </CardContent>
          </Card>
        )}

        {currentStep === "destination" && (
          <Card>
            <CardHeader>
              <CardTitle>{planningMode === "mood" ? "Confirm Destination" : "Choose Destination"}</CardTitle>
              <CardDescription>
                {planningMode === "mood"
                  ? "Based on your mood, we suggest these destinations"
                  : "Where would you like to go?"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {planningMode === "mood" && (
                <div className="space-y-2">
                  <Label>Suggested Destinations</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {["Bali, Indonesia", "Costa Rica", "New Zealand", "Japan"].map((dest) => (
                      <Card
                        key={dest}
                        className={`cursor-pointer transition-all ${destination === dest ? "ring-2 ring-primary" : ""}`}
                        onClick={() => setDestination(dest)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span>{dest}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="custom-destination">Or enter your own destination</Label>
                <Input
                  id="custom-destination"
                  placeholder="Enter destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>

              <Button onClick={handleNext} className="w-full" disabled={!destination}>
                Continue
              </Button>
            </CardContent>
          </Card>
        )}

        {currentStep === "duration" && (
          <Card>
            <CardHeader>
              <CardTitle>Trip Duration & Schedule</CardTitle>
              <CardDescription>When are you traveling and what's your daily schedule?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="wake-time">Wake Up Time</Label>
                  <Input id="wake-time" type="time" value={wakeTime} onChange={(e) => setWakeTime(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sleep-time">Sleep Time</Label>
                  <Input id="sleep-time" type="time" value={sleepTime} onChange={(e) => setSleepTime(e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Group Size</Label>
                <Select value={groupSize.toString()} onValueChange={(value) => setGroupSize(Number.parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
                      <SelectItem key={size} value={size.toString()}>
                        {size} {size === 1 ? "person" : "people"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleNext} className="w-full" disabled={!startDate || !endDate}>
                Continue
              </Button>
            </CardContent>
          </Card>
        )}

        {currentStep === "activities" && (
          <Card>
            <CardHeader>
              <CardTitle>Activities & Interests</CardTitle>
              <CardDescription>What would you like to do during your trip?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {activities.map((activity) => (
                  <div key={activity} className="flex items-center space-x-2">
                    <Checkbox
                      id={activity}
                      checked={selectedActivities.includes(activity)}
                      onCheckedChange={() => toggleActivity(activity)}
                    />
                    <Label htmlFor={activity} className="text-sm">
                      {activity}
                    </Label>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label>Add Custom Activity</Label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter custom activity"
                    value={customActivity}
                    onChange={(e) => setCustomActivity(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addCustomActivity()}
                  />
                  <Button onClick={addCustomActivity} variant="outline">
                    Add
                  </Button>
                </div>
              </div>

              {selectedActivities.length > 0 && (
                <div className="space-y-2">
                  <Label>Selected Activities</Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedActivities.map((activity) => (
                      <Badge key={activity} variant="secondary">
                        {activity}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <Button onClick={handleNext} className="w-full">
                Continue
              </Button>
            </CardContent>
          </Card>
        )}

        {currentStep === "budget" && (
          <Card>
            <CardHeader>
              <CardTitle>Budget Planning</CardTitle>
              <CardDescription>Set your budget and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Total Budget: ${budget[0]}</Label>
                  <Slider
                    value={budget}
                    onValueChange={setBudget}
                    max={10000}
                    min={100}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>$100</span>
                    <span>$10,000+</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <span className="font-medium">Per Person</span>
                      </div>
                      <p className="text-2xl font-bold">${Math.round(budget[0] / groupSize)}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="font-medium">Group Size</span>
                      </div>
                      <p className="text-2xl font-bold">{groupSize}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Button onClick={handleNext} className="w-full">
                Continue to Summary
              </Button>
            </CardContent>
          </Card>
        )}

        {currentStep === "summary" && (
          <Card>
            <CardHeader>
              <CardTitle>Trip Summary</CardTitle>
              <CardDescription>Review your trip details before we create your itinerary</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Destination</h3>
                  <p className="text-muted-foreground">{destination}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Dates</h3>
                  <p className="text-muted-foreground">
                    {startDate && endDate
                      ? `${format(startDate, "PPP")} - ${format(endDate, "PPP")}`
                      : "Dates not selected"}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Daily Schedule</h3>
                  <p className="text-muted-foreground">
                    Wake up: {wakeTime} | Sleep: {sleepTime}
                  </p>
                </div>

                {planningMode === "mood" && selectedMoods.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Travel Mood</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMoods.map((moodId) => {
                        const mood = moods.find((m) => m.id === moodId)
                        return mood ? (
                          <Badge key={moodId} variant="secondary">
                            {mood.label}
                          </Badge>
                        ) : null
                      })}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold mb-2">Activities</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedActivities.slice(0, 5).map((activity) => (
                      <Badge key={activity} variant="outline">
                        {activity}
                      </Badge>
                    ))}
                    {selectedActivities.length > 5 && (
                      <Badge variant="outline">+{selectedActivities.length - 5} more</Badge>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Budget</h3>
                  <p className="text-muted-foreground">
                    ${budget[0]} total (${Math.round(budget[0] / groupSize)} per person)
                  </p>
                </div>
              </div>

              <Button className="w-full" size="lg" onClick={() => (window.location.href = "/itinerary")}>
                Create My Itinerary
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
