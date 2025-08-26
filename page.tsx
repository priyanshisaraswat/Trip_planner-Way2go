"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ArrowLeft,
  MapPin,
  Cloud,
  Sun,
  CloudRain,
  Thermometer,
  Wind,
  Plus,
  Star,
  Wifi,
  Car,
  Utensils,
  AlertTriangle,
  Snowflake,
  Eye,
  Droplets,
  Activity,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react"

interface WeatherData {
  day: string
  date: string
  condition: "sunny" | "cloudy" | "rainy" | "stormy" | "snowy"
  high: number
  low: number
  humidity: number
  windSpeed: number
  visibility: number
  uvIndex: number
  alerts?: string[]
  activitySuitability: {
    outdoor: "excellent" | "good" | "fair" | "poor"
    indoor: "excellent" | "good" | "fair" | "poor"
    water: "excellent" | "good" | "fair" | "poor"
  }
}

interface ItineraryDay {
  day: number
  date: string
  activities: {
    time: string
    activity: string
    location: string
    duration: string
    notes?: string
    weatherSuitability?: "excellent" | "good" | "fair" | "poor"
    alternativeActivity?: string
  }[]
  weather: WeatherData
}

interface Accommodation {
  id: string
  name: string
  type: "hotel" | "hostel" | "apartment" | "resort"
  rating: number
  pricePerNight: number
  amenities: string[]
  image: string
  location: string
  description: string
}

const defaultPackingList = [
  { category: "Clothing", items: ["T-shirts", "Shorts", "Underwear", "Socks", "Pajamas"] },
  { category: "Toiletries", items: ["Toothbrush", "Toothpaste", "Shampoo", "Soap", "Deodorant"] },
  { category: "Electronics", items: ["Phone charger", "Camera", "Power bank", "Headphones"] },
  { category: "Documents", items: ["Passport", "Travel insurance", "Flight tickets", "Hotel bookings"] },
]

const mockWeatherData: WeatherData[] = [
  {
    day: "Monday",
    date: "Dec 15",
    condition: "sunny",
    high: 28,
    low: 22,
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    uvIndex: 8,
    activitySuitability: {
      outdoor: "excellent",
      indoor: "good",
      water: "excellent",
    },
  },
  {
    day: "Tuesday",
    date: "Dec 16",
    condition: "cloudy",
    high: 26,
    low: 20,
    humidity: 70,
    windSpeed: 15,
    visibility: 8,
    uvIndex: 4,
    alerts: ["Light rain expected in the evening"],
    activitySuitability: {
      outdoor: "good",
      indoor: "excellent",
      water: "fair",
    },
  },
  {
    day: "Wednesday",
    date: "Dec 17",
    condition: "rainy",
    high: 24,
    low: 18,
    humidity: 85,
    windSpeed: 20,
    visibility: 5,
    uvIndex: 2,
    alerts: ["Heavy rain warning", "Outdoor activities not recommended", "Flash flood watch in effect"],
    activitySuitability: {
      outdoor: "poor",
      indoor: "excellent",
      water: "poor",
    },
  },
]

const mockItinerary: ItineraryDay[] = [
  {
    day: 1,
    date: "Dec 15, 2024",
    weather: mockWeatherData[0],
    activities: [
      {
        time: "09:00",
        activity: "Arrival & Hotel Check-in",
        location: "Seminyak Beach Resort",
        duration: "1 hour",
        notes: "Early check-in available",
        weatherSuitability: "excellent",
      },
      {
        time: "11:00",
        activity: "Beach Walk & Orientation",
        location: "Seminyak Beach",
        duration: "2 hours",
        notes: "Perfect weather for beach activities",
        weatherSuitability: "excellent",
      },
      {
        time: "14:00",
        activity: "Local Lunch",
        location: "Warung Sunset",
        duration: "1.5 hours",
        weatherSuitability: "excellent",
      },
      {
        time: "16:00",
        activity: "Spa & Relaxation",
        location: "Hotel Spa",
        duration: "2 hours",
        weatherSuitability: "excellent",
      },
      {
        time: "19:00",
        activity: "Welcome Dinner",
        location: "Beachfront Restaurant",
        duration: "2 hours",
        weatherSuitability: "excellent",
      },
    ],
  },
  {
    day: 2,
    date: "Dec 16, 2024",
    weather: mockWeatherData[1],
    activities: [
      {
        time: "08:00",
        activity: "Temple Visit",
        location: "Tanah Lot Temple",
        duration: "3 hours",
        notes: "Bring umbrella - rain expected later",
        weatherSuitability: "good",
        alternativeActivity: "Museum Visit (if weather worsens)",
      },
      {
        time: "12:00",
        activity: "Traditional Lunch",
        location: "Local Village",
        duration: "1.5 hours",
        weatherSuitability: "excellent",
      },
      {
        time: "15:00",
        activity: "Art Market Shopping",
        location: "Ubud Art Market",
        duration: "2 hours",
        notes: "Indoor activity due to weather",
        weatherSuitability: "excellent",
      },
      {
        time: "18:00",
        activity: "Cultural Show",
        location: "Cultural Center",
        duration: "2 hours",
        weatherSuitability: "excellent",
      },
    ],
  },
  {
    day: 3,
    date: "Dec 17, 2024",
    weather: mockWeatherData[2],
    activities: [
      {
        time: "09:00",
        activity: "Cooking Class",
        location: "Culinary School",
        duration: "3 hours",
        notes: "Indoor activity - perfect for rainy weather",
        weatherSuitability: "excellent",
        alternativeActivity: "Originally planned: Volcano Hike (moved due to weather)",
      },
      {
        time: "13:00",
        activity: "Lunch at Cooking Class",
        location: "Culinary School",
        duration: "1 hour",
        weatherSuitability: "excellent",
      },
      {
        time: "15:00",
        activity: "Traditional Massage",
        location: "Wellness Center",
        duration: "2 hours",
        notes: "Relaxing indoor activity",
        weatherSuitability: "excellent",
      },
      {
        time: "18:00",
        activity: "Indoor Market & Souvenir Shopping",
        location: "Covered Market",
        duration: "2 hours",
        weatherSuitability: "excellent",
        alternativeActivity: "Originally planned: Sunset Beach Walk",
      },
    ],
  },
]

const mockAccommodations: Accommodation[] = [
  {
    id: "1",
    name: "Seminyak Beach Resort",
    type: "resort",
    rating: 9.2,
    pricePerNight: 180,
    amenities: ["Pool", "Spa", "Beach Access", "WiFi", "Restaurant"],
    image: "/luxury-beach-resort.png",
    location: "Seminyak, Bali",
    description: "Luxury beachfront resort with stunning ocean views and world-class amenities.",
  },
  {
    id: "2",
    name: "Ubud Jungle Lodge",
    type: "hotel",
    rating: 8.7,
    pricePerNight: 120,
    amenities: ["Pool", "Restaurant", "WiFi", "Yoga Studio"],
    image: "/jungle-lodge-hotel.png",
    location: "Ubud, Bali",
    description: "Eco-friendly lodge surrounded by lush tropical rainforest.",
  },
  {
    id: "3",
    name: "Canggu Surf Hostel",
    type: "hostel",
    rating: 7.8,
    pricePerNight: 35,
    amenities: ["WiFi", "Shared Kitchen", "Surf Board Rental"],
    image: "/surf-hostel.png",
    location: "Canggu, Bali",
    description: "Budget-friendly hostel perfect for surfers and backpackers.",
  },
  {
    id: "4",
    name: "Sanur Family Apartment",
    type: "apartment",
    rating: 8.1,
    pricePerNight: 85,
    amenities: ["Kitchen", "WiFi", "Parking", "Beach Access"],
    image: "/cozy-family-apartment.png",
    location: "Sanur, Bali",
    description: "Spacious apartment ideal for families with kitchen facilities.",
  },
]

export default function ItineraryPage() {
  const [activeTab, setActiveTab] = useState("itinerary")
  const [packingList, setPackingList] = useState(defaultPackingList)
  const [newItem, setNewItem] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Clothing")
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())
  const [showWeatherAlerts, setShowWeatherAlerts] = useState(true)

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="h-5 w-5 text-yellow-500" />
      case "cloudy":
        return <Cloud className="h-5 w-5 text-gray-500" />
      case "rainy":
        return <CloudRain className="h-5 w-5 text-blue-500" />
      case "stormy":
        return <CloudRain className="h-5 w-5 text-purple-500" />
      case "snowy":
        return <Snowflake className="h-5 w-5 text-blue-300" />
      default:
        return <Sun className="h-5 w-5" />
    }
  }

  const getSuitabilityDisplay = (suitability: string) => {
    switch (suitability) {
      case "excellent":
        return { color: "text-green-600", icon: <CheckCircle className="h-4 w-4" />, label: "Excellent" }
      case "good":
        return { color: "text-green-500", icon: <CheckCircle className="h-4 w-4" />, label: "Good" }
      case "fair":
        return { color: "text-yellow-500", icon: <Clock className="h-4 w-4" />, label: "Fair" }
      case "poor":
        return { color: "text-red-500", icon: <XCircle className="h-4 w-4" />, label: "Poor" }
      default:
        return { color: "text-gray-500", icon: <Activity className="h-4 w-4" />, label: "Unknown" }
    }
  }

  const addPackingItem = () => {
    if (newItem.trim()) {
      setPackingList((prev) =>
        prev.map((category) =>
          category.category === selectedCategory
            ? { ...category, items: [...category.items, newItem.trim()] }
            : category,
        ),
      )
      setNewItem("")
    }
  }

  const toggleItemCheck = (item: string) => {
    setCheckedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(item)) {
        newSet.delete(item)
      } else {
        newSet.add(item)
      }
      return newSet
    })
  }

  const getPackingProgress = () => {
    const totalItems = packingList.reduce((sum, category) => sum + category.items.length, 0)
    const checkedCount = checkedItems.size
    return totalItems > 0 ? (checkedCount / totalItems) * 100 : 0
  }

  useEffect(() => {
    const weatherConditions = mockWeatherData.map((w) => w.condition)
    const hasRain = weatherConditions.includes("rainy")
    const hasCold = mockWeatherData.some((w) => w.low < 20)

    setPackingList((prev) => {
      const updated = [...prev]

      if (hasRain) {
        const clothingIndex = updated.findIndex((cat) => cat.category === "Clothing")
        if (clothingIndex !== -1 && !updated[clothingIndex].items.includes("Rain jacket")) {
          updated[clothingIndex] = {
            ...updated[clothingIndex],
            items: [...updated[clothingIndex].items, "Rain jacket", "Umbrella"],
          }
        }
      }

      if (hasCold) {
        const clothingIndex = updated.findIndex((cat) => cat.category === "Clothing")
        if (clothingIndex !== -1 && !updated[clothingIndex].items.includes("Warm jacket")) {
          updated[clothingIndex] = {
            ...updated[clothingIndex],
            items: [...updated[clothingIndex].items, "Warm jacket", "Long pants"],
          }
        }
      }

      return updated
    })
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Planning
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Your Bali Adventure</h1>
                <p className="text-muted-foreground">Dec 15-17, 2024 • 3 days</p>
              </div>
            </div>
            <Button>Export Itinerary</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {showWeatherAlerts && mockWeatherData.some((w) => w.alerts && w.alerts.length > 0) && (
          <Alert className="mb-6 border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <div className="flex items-center justify-between">
                <span>Weather alerts active for your trip. Check the Weather & Alerts tab for details.</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowWeatherAlerts(false)}
                  className="text-orange-600 hover:text-orange-700"
                >
                  Dismiss
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
            <TabsTrigger value="weather">Weather & Alerts</TabsTrigger>
            <TabsTrigger value="packing">Smart Checklist</TabsTrigger>
            <TabsTrigger value="accommodations">Accommodations</TabsTrigger>
          </TabsList>

          <TabsContent value="itinerary" className="space-y-6">
            <div className="grid gap-6">
              {mockItinerary.map((day) => (
                <Card key={day.day}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Day {day.day}</CardTitle>
                        <CardDescription>{day.date}</CardDescription>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          {getWeatherIcon(day.weather.condition)}
                          <span className="text-sm text-muted-foreground">
                            {day.weather.high}°/{day.weather.low}°C
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground">Activity Conditions</div>
                          <div className="flex space-x-1">
                            <Badge
                              variant="outline"
                              className={`text-xs ${getSuitabilityDisplay(day.weather.activitySuitability.outdoor).color}`}
                            >
                              Outdoor: {getSuitabilityDisplay(day.weather.activitySuitability.outdoor).label}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    {day.weather.alerts && day.weather.alerts.length > 0 && (
                      <Alert className="mt-4 border-orange-200 bg-orange-50">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                        <AlertDescription className="text-orange-800">
                          <div className="space-y-1">
                            {day.weather.alerts.map((alert, index) => (
                              <div key={index} className="text-sm">
                                {alert}
                              </div>
                            ))}
                          </div>
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {day.activities.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-16 text-sm font-medium text-muted-foreground">
                            {activity.time}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium">{activity.activity}</h4>
                              <Badge variant="outline">{activity.duration}</Badge>
                              {activity.weatherSuitability && (
                                <div
                                  className={`flex items-center space-x-1 ${getSuitabilityDisplay(activity.weatherSuitability).color}`}
                                >
                                  {getSuitabilityDisplay(activity.weatherSuitability).icon}
                                  <span className="text-xs">
                                    {getSuitabilityDisplay(activity.weatherSuitability).label}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-1">
                              <MapPin className="h-3 w-3" />
                              <span>{activity.location}</span>
                            </div>
                            {activity.notes && <p className="text-sm text-muted-foreground italic">{activity.notes}</p>}
                            {activity.alternativeActivity && (
                              <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-sm">
                                <div className="flex items-center space-x-1 text-blue-700">
                                  <Activity className="h-3 w-3" />
                                  <span className="font-medium">Alternative:</span>
                                </div>
                                <p className="text-blue-600 mt-1">{activity.alternativeActivity}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="weather" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>3-Day Weather Forecast</CardTitle>
                <CardDescription>Detailed weather conditions and activity recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {mockWeatherData.map((weather, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            {getWeatherIcon(weather.condition)}
                            <div>
                              <h3 className="font-semibold">{weather.day}</h3>
                              <p className="text-sm text-muted-foreground">{weather.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2">
                              <Thermometer className="h-4 w-4 text-muted-foreground" />
                              <span className="font-semibold">
                                {weather.high}°/{weather.low}°C
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <Droplets className="h-4 w-4 text-blue-500" />
                            <div>
                              <div className="text-xs text-muted-foreground">Humidity</div>
                              <div className="text-sm font-medium">{weather.humidity}%</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Wind className="h-4 w-4 text-gray-500" />
                            <div>
                              <div className="text-xs text-muted-foreground">Wind</div>
                              <div className="text-sm font-medium">{weather.windSpeed} km/h</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Eye className="h-4 w-4 text-green-500" />
                            <div>
                              <div className="text-xs text-muted-foreground">Visibility</div>
                              <div className="text-sm font-medium">{weather.visibility} km</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Sun className="h-4 w-4 text-orange-500" />
                            <div>
                              <div className="text-xs text-muted-foreground">UV Index</div>
                              <div className="text-sm font-medium">{weather.uvIndex}/10</div>
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="font-medium mb-2">Activity Suitability</h4>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="flex items-center space-x-2">
                              <div className={getSuitabilityDisplay(weather.activitySuitability.outdoor).color}>
                                {getSuitabilityDisplay(weather.activitySuitability.outdoor).icon}
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground">Outdoor</div>
                                <div
                                  className={`text-sm font-medium ${getSuitabilityDisplay(weather.activitySuitability.outdoor).color}`}
                                >
                                  {getSuitabilityDisplay(weather.activitySuitability.outdoor).label}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className={getSuitabilityDisplay(weather.activitySuitability.indoor).color}>
                                {getSuitabilityDisplay(weather.activitySuitability.indoor).icon}
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground">Indoor</div>
                                <div
                                  className={`text-sm font-medium ${getSuitabilityDisplay(weather.activitySuitability.indoor).color}`}
                                >
                                  {getSuitabilityDisplay(weather.activitySuitability.indoor).label}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className={getSuitabilityDisplay(weather.activitySuitability.water).color}>
                                {getSuitabilityDisplay(weather.activitySuitability.water).icon}
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground">Water</div>
                                <div
                                  className={`text-sm font-medium ${getSuitabilityDisplay(weather.activitySuitability.water).color}`}
                                >
                                  {getSuitabilityDisplay(weather.activitySuitability.water).label}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {weather.alerts && weather.alerts.length > 0 && (
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <AlertTriangle className="h-4 w-4 text-orange-500" />
                              <span className="text-sm font-medium text-orange-500">Weather Alerts</span>
                            </div>
                            {weather.alerts.map((alert, alertIndex) => (
                              <div key={alertIndex} className="bg-orange-50 border border-orange-200 rounded p-2">
                                <p className="text-sm text-orange-800">{alert}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="packing" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Smart Packing Checklist</CardTitle>
                    <CardDescription>Customized based on your activities and weather forecast</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{Math.round(getPackingProgress())}%</div>
                    <div className="text-sm text-muted-foreground">Complete</div>
                  </div>
                </div>
                <Progress value={getPackingProgress()} className="w-full" />
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add new item"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addPackingItem()}
                  />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-border rounded-md bg-background"
                  >
                    {packingList.map((category) => (
                      <option key={category.category} value={category.category}>
                        {category.category}
                      </option>
                    ))}
                  </select>
                  <Button onClick={addPackingItem}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {packingList.map((category) => (
                  <div key={category.category}>
                    <h3 className="font-semibold mb-3 flex items-center space-x-2">
                      <span>{category.category}</span>
                      <Badge variant="secondary">
                        {category.items.filter((item) => checkedItems.has(item)).length}/{category.items.length}
                      </Badge>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {category.items.map((item) => (
                        <div key={item} className="flex items-center space-x-2">
                          <Checkbox
                            id={item}
                            checked={checkedItems.has(item)}
                            onCheckedChange={() => toggleItemCheck(item)}
                          />
                          <Label
                            htmlFor={item}
                            className={`flex-1 ${checkedItems.has(item) ? "line-through text-muted-foreground" : ""}`}
                          >
                            {item}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accommodations" className="space-y-6">
            <div className="grid gap-6">
              {mockAccommodations.map((accommodation) => (
                <Card key={accommodation.id}>
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                      <div className="md:col-span-1">
                        <img
                          src={accommodation.image || "/placeholder.svg"}
                          alt={accommodation.name}
                          className="w-full h-48 md:h-full object-cover rounded-l-lg"
                        />
                      </div>
                      <div className="md:col-span-2 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold mb-1">{accommodation.name}</h3>
                            <div className="flex items-center space-x-2 mb-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{accommodation.location}</span>
                              <Badge variant="outline" className="capitalize">
                                {accommodation.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">{accommodation.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-1 mb-2">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold">{accommodation.rating}/10</span>
                            </div>
                            <div className="text-lg font-bold">${accommodation.pricePerNight}</div>
                            <div className="text-sm text-muted-foreground">per night</div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {accommodation.amenities.map((amenity) => (
                            <Badge key={amenity} variant="secondary" className="text-xs">
                              {amenity === "WiFi" && <Wifi className="h-3 w-3 mr-1" />}
                              {amenity === "Parking" && <Car className="h-3 w-3 mr-1" />}
                              {amenity === "Restaurant" && <Utensils className="h-3 w-3 mr-1" />}
                              {amenity}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex space-x-2">
                          <Button className="flex-1">Book Now</Button>
                          <Button variant="outline">View Details</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
