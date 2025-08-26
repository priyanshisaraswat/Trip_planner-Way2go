"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Languages, Heart, Volume2, Copy, Shield, AlertTriangle, Phone, MapPin, Info } from "lucide-react"

interface TranslationPhrase {
  id: string
  category: string
  english: string
  local: string
  pronunciation: string
  isFavorite: boolean
}

interface SafetyTip {
  id: string
  category: "emergency" | "health" | "cultural" | "transportation" | "general"
  title: string
  description: string
  priority: "high" | "medium" | "low"
}

interface EmergencyContact {
  service: string
  number: string
  description: string
}

const mockPhrases: TranslationPhrase[] = [
  // Greetings
  { id: "1", category: "Greetings", english: "Hello", local: "Halo", pronunciation: "HAH-loh", isFavorite: false },
  {
    id: "2",
    category: "Greetings",
    english: "Good morning",
    local: "Selamat pagi",
    pronunciation: "seh-LAH-maht PAH-gee",
    isFavorite: true,
  },
  {
    id: "3",
    category: "Greetings",
    english: "Thank you",
    local: "Terima kasih",
    pronunciation: "teh-REE-mah KAH-see",
    isFavorite: true,
  },
  { id: "4", category: "Greetings", english: "Please", local: "Tolong", pronunciation: "TOH-long", isFavorite: false },
  {
    id: "5",
    category: "Greetings",
    english: "Excuse me",
    local: "Permisi",
    pronunciation: "per-MEE-see",
    isFavorite: false,
  },

  // Directions
  {
    id: "6",
    category: "Directions",
    english: "Where is...?",
    local: "Di mana...?",
    pronunciation: "dee MAH-nah",
    isFavorite: true,
  },
  {
    id: "7",
    category: "Directions",
    english: "How much?",
    local: "Berapa harga?",
    pronunciation: "beh-RAH-pah HAR-gah",
    isFavorite: true,
  },
  {
    id: "8",
    category: "Directions",
    english: "I'm lost",
    local: "Saya tersesat",
    pronunciation: "SAH-yah ter-seh-SAHT",
    isFavorite: false,
  },
  {
    id: "9",
    category: "Directions",
    english: "Can you help me?",
    local: "Bisakah Anda membantu saya?",
    pronunciation: "bee-SAH-kah AHN-dah mem-BAHN-too SAH-yah",
    isFavorite: false,
  },

  // Food & Dining
  {
    id: "10",
    category: "Food & Dining",
    english: "I would like...",
    local: "Saya mau...",
    pronunciation: "SAH-yah mah-OO",
    isFavorite: true,
  },
  {
    id: "11",
    category: "Food & Dining",
    english: "The bill, please",
    local: "Bon, tolong",
    pronunciation: "bone TOH-long",
    isFavorite: true,
  },
  {
    id: "12",
    category: "Food & Dining",
    english: "Is this spicy?",
    local: "Apakah ini pedas?",
    pronunciation: "ah-PAH-kah EE-nee peh-DAHS",
    isFavorite: false,
  },
  {
    id: "13",
    category: "Food & Dining",
    english: "No meat, please",
    local: "Tidak pakai daging",
    pronunciation: "TEE-dahk pah-KAI DAH-ging",
    isFavorite: false,
  },

  // Emergency
  { id: "14", category: "Emergency", english: "Help!", local: "Tolong!", pronunciation: "TOH-long", isFavorite: true },
  {
    id: "15",
    category: "Emergency",
    english: "Call the police",
    local: "Panggil polisi",
    pronunciation: "PAHNG-geel poh-LEE-see",
    isFavorite: true,
  },
  {
    id: "16",
    category: "Emergency",
    english: "I need a doctor",
    local: "Saya perlu dokter",
    pronunciation: "SAH-yah per-LOO DOHK-ter",
    isFavorite: true,
  },
  {
    id: "17",
    category: "Emergency",
    english: "Where is the hospital?",
    local: "Di mana rumah sakit?",
    pronunciation: "dee MAH-nah ROO-mah sah-KEET",
    isFavorite: false,
  },
]

const safetyTips: SafetyTip[] = [
  {
    id: "1",
    category: "emergency",
    title: "Emergency Numbers",
    description:
      "Police: 110, Medical Emergency: 118, Fire Department: 113. Save these numbers in your phone immediately upon arrival.",
    priority: "high",
  },
  {
    id: "2",
    category: "health",
    title: "Water Safety",
    description:
      "Only drink bottled or properly filtered water. Avoid ice in drinks and raw vegetables that may have been washed in tap water.",
    priority: "high",
  },
  {
    id: "3",
    category: "cultural",
    title: "Temple Etiquette",
    description:
      "Dress modestly when visiting temples. Cover shoulders and knees. Remove shoes before entering sacred areas.",
    priority: "medium",
  },
  {
    id: "4",
    category: "transportation",
    title: "Taxi Safety",
    description:
      "Use official taxi services or ride-sharing apps. Agree on the fare before starting your journey or ensure the meter is running.",
    priority: "medium",
  },
  {
    id: "5",
    category: "general",
    title: "Bargaining Culture",
    description:
      "Bargaining is expected in markets and with street vendors. Start at 30-50% of the asking price and negotiate respectfully.",
    priority: "low",
  },
  {
    id: "6",
    category: "health",
    title: "Sun Protection",
    description:
      "UV levels are high year-round. Use SPF 30+ sunscreen, wear a hat, and seek shade during peak hours (10 AM - 4 PM).",
    priority: "medium",
  },
  {
    id: "7",
    category: "cultural",
    title: "Tipping Guidelines",
    description:
      "Tipping is not mandatory but appreciated. 10% at restaurants, round up for taxi fares, and small tips for hotel staff.",
    priority: "low",
  },
  {
    id: "8",
    category: "emergency",
    title: "Embassy Contact",
    description:
      "Register with your embassy and keep their contact information handy. They can assist with lost passports and emergencies.",
    priority: "high",
  },
]

const emergencyContacts: EmergencyContact[] = [
  { service: "Police", number: "110", description: "For crimes, accidents, and general emergencies" },
  { service: "Medical Emergency", number: "118", description: "Ambulance and medical emergencies" },
  { service: "Fire Department", number: "113", description: "Fire emergencies and rescue services" },
  { service: "Tourist Police", number: "+62 21 570 8600", description: "Specialized police for tourist assistance" },
  { service: "US Embassy", number: "+62 21 3435 9000", description: "US citizens emergency assistance" },
  { service: "UK Embassy", number: "+62 21 2356 5200", description: "UK citizens emergency assistance" },
]

export default function TranslatorPage() {
  const [phrases, setPhrases] = useState<TranslationPhrase[]>(mockPhrases)
  const [activeTab, setActiveTab] = useState("translator")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [customText, setCustomText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("indonesian")

  const categories = ["All", ...Array.from(new Set(phrases.map((p) => p.category)))]
  const filteredPhrases = phrases.filter((phrase) => {
    const matchesCategory = selectedCategory === "All" || phrase.category === selectedCategory
    const matchesSearch =
      phrase.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phrase.local.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const favoritePhrases = phrases.filter((p) => p.isFavorite)

  const toggleFavorite = (phraseId: string) => {
    setPhrases((prev) => prev.map((p) => (p.id === phraseId ? { ...p, isFavorite: !p.isFavorite } : p)))
  }

  const playPronunciation = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "id-ID"
      speechSynthesis.speak(utterance)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const translateCustomText = () => {
    // Simulate translation - in real app, this would call a translation API
    setTranslatedText("Terjemahan akan muncul di sini")
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
      case "medium":
        return "text-orange-600 bg-orange-50 border-orange-200"
      case "low":
        return "text-blue-600 bg-blue-50 border-blue-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "emergency":
        return <AlertTriangle className="h-4 w-4" />
      case "health":
        return <Shield className="h-4 w-4" />
      case "cultural":
        return <Info className="h-4 w-4" />
      case "transportation":
        return <MapPin className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-2">
              <Languages className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Translation & Safety</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="translator">Translator</TabsTrigger>
            <TabsTrigger value="phrases">Common Phrases</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="safety">Safety Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="translator" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Custom Translation</CardTitle>
                <CardDescription>Translate any text to the local language</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Language</Label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="indonesian">Indonesian (Bahasa Indonesia)</SelectItem>
                      <SelectItem value="javanese">Javanese</SelectItem>
                      <SelectItem value="balinese">Balinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>English Text</Label>
                    <Textarea
                      placeholder="Enter text to translate..."
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Translation</Label>
                    <Textarea
                      placeholder="Translation will appear here..."
                      value={translatedText}
                      readOnly
                      className="min-h-[100px] bg-muted"
                    />
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button onClick={translateCustomText} disabled={!customText.trim()}>
                    Translate
                  </Button>
                  <Button variant="outline" onClick={() => copyToClipboard(translatedText)} disabled={!translatedText}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Translation
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => playPronunciation(translatedText)}
                    disabled={!translatedText}
                  >
                    <Volume2 className="h-4 w-4 mr-2" />
                    Play Audio
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="phrases" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Common Travel Phrases</CardTitle>
                <CardDescription>Essential phrases for your trip to Bali</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search phrases..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="md:w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4">
                  {filteredPhrases.map((phrase) => (
                    <Card key={phrase.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant="outline">{phrase.category}</Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleFavorite(phrase.id)}
                                className="p-1"
                              >
                                <Heart
                                  className={`h-4 w-4 ${phrase.isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                                />
                              </Button>
                            </div>
                            <div className="space-y-1">
                              <p className="font-medium">{phrase.english}</p>
                              <p className="text-lg text-primary">{phrase.local}</p>
                              <p className="text-sm text-muted-foreground italic">{phrase.pronunciation}</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => copyToClipboard(phrase.local)}>
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => playPronunciation(phrase.local)}>
                              <Volume2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Favorite Phrases</CardTitle>
                <CardDescription>Your saved phrases for quick access</CardDescription>
              </CardHeader>
              <CardContent>
                {favoritePhrases.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No favorite phrases yet</p>
                    <p className="text-sm text-muted-foreground">
                      Add phrases to favorites from the Common Phrases tab
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {favoritePhrases.map((phrase) => (
                      <Card key={phrase.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge variant="outline">{phrase.category}</Badge>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleFavorite(phrase.id)}
                                  className="p-1"
                                >
                                  <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                                </Button>
                              </div>
                              <div className="space-y-1">
                                <p className="font-medium">{phrase.english}</p>
                                <p className="text-lg text-primary">{phrase.local}</p>
                                <p className="text-sm text-muted-foreground italic">{phrase.pronunciation}</p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" onClick={() => copyToClipboard(phrase.local)}>
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => playPronunciation(phrase.local)}>
                                <Volume2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="safety" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Emergency Contacts</CardTitle>
                <CardDescription>Important numbers to save in your phone</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">{contact.service}</p>
                          <p className="text-sm text-muted-foreground">{contact.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-bold text-lg">{contact.number}</span>
                        <Button variant="outline" size="sm" onClick={() => copyToClipboard(contact.number)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Safety Guidelines</CardTitle>
                <CardDescription>Important safety tips and cultural guidelines for Bali</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {safetyTips.map((tip) => (
                    <Card key={tip.id} className={`border ${getPriorityColor(tip.priority)}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-1">{getCategoryIcon(tip.category)}</div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold">{tip.title}</h3>
                              <Badge variant="outline" className="capitalize">
                                {tip.priority} Priority
                              </Badge>
                              <Badge variant="secondary" className="capitalize">
                                {tip.category}
                              </Badge>
                            </div>
                            <p className="text-sm">{tip.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
