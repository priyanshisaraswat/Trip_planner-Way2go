"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Plane, Users, Calendar, Languages, Shield, Heart, Mountain, Waves, Coffee } from "lucide-react"

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  if (!isAuthenticated) {
    return (
      <AuthPage
        onAuthenticated={(userData) => {
          setIsAuthenticated(true)
          setUser(userData)
        }}
      />
    )
  }

  return <DashboardPage user={user} />
}

function AuthPage({ onAuthenticated }: { onAuthenticated: (user: { name: string; email: string }) => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email && password) {
      onAuthenticated({ name: "User", email })
    }
    setIsLoading(false)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (name && email && password) {
      onAuthenticated({ name, email })
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-primary rounded-full p-3 shadow-lg">
              <Plane className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">TripPlanner</h1>
          <p className="text-muted-foreground">Plan your perfect journey with intelligent features</p>
        </div>

        <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to your account or create a new one to start planning</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Create Account</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-input border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-input border-border"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="bg-input border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email Address</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-input border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a secure password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-input border-border"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function DashboardPage({ user }: { user: { name: string; email: string } | null }) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)

  const moods = [
    {
      id: "adventure",
      name: "Adventure",
      icon: Mountain,
      color: "text-orange-600",
      description: "Thrilling experiences",
    },
    { id: "relaxation", name: "Relaxation", icon: Waves, color: "text-blue-600", description: "Peaceful getaways" },
    { id: "romance", name: "Romance", icon: Heart, color: "text-pink-600", description: "Romantic escapes" },
    { id: "culture", name: "Culture", icon: Coffee, color: "text-purple-600", description: "Cultural immersion" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-primary rounded-full p-2 shadow-md">
                <Plane className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">TripPlanner</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {user?.name || "Traveler"}</p>
              </div>
            </div>
            <Button variant="outline" className="border-border bg-transparent">
              Profile
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Plan Your Next Adventure
          </h2>
          <p className="text-muted-foreground text-lg">Choose how you'd like to start planning your perfect trip</p>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">What's your travel mood?</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {moods.map((mood) => (
              <Card
                key={mood.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedMood === mood.id ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
                }`}
                onClick={() => setSelectedMood(mood.id)}
              >
                <CardContent className="p-4 text-center">
                  <mood.icon className={`h-8 w-8 mx-auto mb-2 ${mood.color}`} />
                  <h4 className="font-semibold">{mood.name}</h4>
                  <p className="text-sm text-muted-foreground">{mood.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-all cursor-pointer border-primary/20 hover:border-primary/40">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Plan by Mood</CardTitle>
                  <CardDescription>AI-powered suggestions based on your feelings</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full shadow-md" disabled={!selectedMood}>
                {selectedMood
                  ? `Start ${moods.find((m) => m.id === selectedMood)?.name} Planning`
                  : "Select a Mood First"}
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all cursor-pointer border-accent/20 hover:border-accent/40">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="bg-accent/10 p-2 rounded-lg">
                  <Calendar className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <CardTitle>Direct Planning</CardTitle>
                  <CardDescription>Traditional planning with destination and dates</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
              >
                Start Direct Planning
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all cursor-pointer">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="bg-secondary/10 p-2 rounded-lg">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <CardTitle>Group Trip</CardTitle>
                  <CardDescription>Collaborative planning with expense splitting</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full bg-transparent">
                Plan Group Trip
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Recent Trips</span>
              </CardTitle>
              <CardDescription>Your latest travel plans and adventures</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Plane className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No trips planned yet.</p>
                <p className="text-sm text-muted-foreground">Start planning your first adventure!</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>Quick Tools</span>
              </CardTitle>
              <CardDescription>Essential travel utilities at your fingertips</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="ghost" className="w-full justify-start hover:bg-primary/5">
                <MapPin className="h-4 w-4 mr-3" />
                Weather Forecast
              </Button>
              <Button variant="ghost" className="w-full justify-start hover:bg-primary/5">
                <Languages className="h-4 w-4 mr-3" />
                Language Translator
              </Button>
              <Button variant="ghost" className="w-full justify-start hover:bg-primary/5">
                <Users className="h-4 w-4 mr-3" />
                Expense Calculator
              </Button>
              <Button variant="ghost" className="w-full justify-start hover:bg-primary/5">
                <Shield className="h-4 w-4 mr-3" />
                Safety Guidelines
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
