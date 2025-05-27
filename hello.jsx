"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Calendar, CheckCircle } from "lucide-react"

interface Treatment {
  id: string
  treatment: string
  description: string
}

export default function Component() {
  const [formData, setFormData] = useState({
    bloodPressure: "80/120",
    weight: "40kg",
    prescription: "Panadol",
    followupDate: "30-05-2025",
    diagnosis: "Lungs Issue",
    tokenNumber: "2",
    charges: "2000",
  })

  const [treatments, setTreatments] = useState<Treatment[]>([{ id: "1", treatment: "", description: "" }])

  const treatmentOptions = [
    "Medication",
    "Physical Therapy",
    "Surgery",
    "Consultation",
    "Lab Tests",
    "X-Ray",
    "Blood Test",
    "Follow-up Visit",
  ]

  const addTreatment = () => {
    const newTreatment: Treatment = {
      id: Date.now().toString(),
      treatment: "",
      description: "",
    }
    setTreatments([...treatments, newTreatment])
  }

  const removeTreatment = (id: string) => {
    if (treatments.length > 1) {
      setTreatments(treatments.filter((t) => t.id !== id))
    }
  }

  const updateTreatment = (id: string, field: keyof Treatment, value: string) => {
    setTreatments(treatments.map((t) => (t.id === id ? { ...t, [field]: value } : t)))
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm mb-6 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">1</span>
                <span className="text-xl">Ali Raza</span>
              </div>
              <span className="text-lg">30</span>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>12-01-2025</span>
              </div>
              <span>Community Medical Center</span>
              <span>Dr. Ayesha Khan</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full">
              <CheckCircle className="w-4 h-4" />
              <span>Successful</span>
            </div>
          </div>
        </div>

        {/* Patient Information Form */}
        <Card>
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="bloodPressure" className="text-gray-600">
                  Blood Pressure :
                </Label>
                <Input
                  id="bloodPressure"
                  value={formData.bloodPressure}
                  onChange={(e) => handleInputChange("bloodPressure", e.target.value)}
                  className="border-0 border-b border-gray-300 rounded-none focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-gray-600">
                  Weight :
                </Label>
                <Input
                  id="weight"
                  value={formData.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                  className="border-0 border-b border-gray-300 rounded-none focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prescription" className="text-gray-600">
                  Prescription :
                </Label>
                <Input
                  id="prescription"
                  value={formData.prescription}
                  onChange={(e) => handleInputChange("prescription", e.target.value)}
                  className="border-0 border-b border-gray-300 rounded-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="followupDate" className="text-gray-600">
                  Followup Date :
                </Label>
                <Input
                  id="followupDate"
                  value={formData.followupDate}
                  onChange={(e) => handleInputChange("followupDate", e.target.value)}
                  className="border-0 border-b border-gray-300 rounded-none focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="diagnosis" className="text-gray-600">
                  Diagnosis :
                </Label>
                <Input
                  id="diagnosis"
                  value={formData.diagnosis}
                  onChange={(e) => handleInputChange("diagnosis", e.target.value)}
                  className="border-0 border-b border-gray-300 rounded-none focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tokenNumber" className="text-gray-600">
                  Token Number :
                </Label>
                <Input
                  id="tokenNumber"
                  value={formData.tokenNumber}
                  onChange={(e) => handleInputChange("tokenNumber", e.target.value)}
                  className="border-0 border-b border-gray-300 rounded-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Third Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="charges" className="text-gray-600">
                  Charges :
                </Label>
                <Input
                  id="charges"
                  value={formData.charges}
                  onChange={(e) => handleInputChange("charges", e.target.value)}
                  className="border-0 border-b border-gray-300 rounded-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Dynamic Treatments Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-gray-600 text-lg">Treatments :</Label>
                <Button
                  type="button"
                  onClick={addTreatment}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Treatment
                </Button>
              </div>

              {treatments.map((treatment, index) => (
                <div key={treatment.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Treatment {index + 1}</h4>
                    {treatments.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeTreatment(treatment.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-600">Select Treatment</Label>
                      <Select
                        value={treatment.treatment}
                        onValueChange={(value) => updateTreatment(treatment.id, "treatment", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose treatment type" />
                        </SelectTrigger>
                        <SelectContent>
                          {treatmentOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-600">Description</Label>
                      <Textarea
                        value={treatment.description}
                        onChange={(e) => updateTreatment(treatment.id, "description", e.target.value)}
                        placeholder="Enter treatment description..."
                        className="min-h-[40px]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <Button className="bg-blue-600 hover:bg-blue-700 px-8">Save Patient Information</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
