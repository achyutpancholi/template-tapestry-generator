
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface DocumentFormProps {
  onSubmit: (formData: any) => void;
}

const DOCUMENT_TYPES = [
  {
    value: "medical",
    label: "Medical Certificate",
    extraFields: [
      { name: "doctorName", label: "Doctor Name", type: "text" },
      { name: "hospitalName", label: "Hospital Name", type: "text" },
      { name: "diagnosis", label: "Diagnosis/Disease", type: "text" },
      { name: "recomendations", label: "Recommendations", type: "text" },
    ],
  },
  {
    value: "marriage",
    label: "Marriage Card",
    extraFields: [
      { name: "brideName", label: "Bride's Name", type: "text" },
      { name: "groomName", label: "Groom's Name", type: "text" },
      { name: "venue", label: "Venue", type: "text" },
      { name: "message", label: "Special Message", type: "text" },
    ],
  },
  {
    value: "chat",
    label: "Emergency Chat Screenshot",
    extraFields: [
      { name: "contactName", label: "Contact Name", type: "text" },
      { name: "emergency", label: "Emergency Description", type: "text" },
      { name: "location", label: "Location", type: "text" },
    ],
  },
];

const DocumentForm: React.FC<DocumentFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);
  const [documentType, setDocumentType] = useState<string>('');
  const [extraFields, setExtraFields] = useState<Record<string, string>>({});
  const [step, setStep] = useState(1);

  const handleExtraFieldChange = (fieldName: string, value: string) => {
    setExtraFields((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Only proceed if all required fields are filled
    if (!name || !dateFrom || !dateTo || !documentType) {
      alert("Please fill all required fields");
      return;
    }

    const selectedDocType = DOCUMENT_TYPES.find(dt => dt.value === documentType);
    if (!selectedDocType) return;

    // Check extra fields are filled
    const allExtraFieldsFilled = selectedDocType.extraFields.every(
      field => extraFields[field.name]
    );

    if (!allExtraFieldsFilled) {
      alert("Please fill all document-specific fields");
      return;
    }

    // Submit form data
    onSubmit({
      name,
      dateFrom,
      dateTo,
      documentType,
      ...extraFields,
    });
  };

  const handleNext = () => {
    if (step === 1 && name && dateFrom && dateTo && documentType) {
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateFrom">Date From</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateFrom && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFrom ? format(dateFrom, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateFrom}
                      onSelect={setDateFrom}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateTo">Date To</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateTo && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateTo ? format(dateTo, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateTo}
                      onSelect={setDateTo}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="documentType">Document Type</Label>
                <Select
                  value={documentType}
                  onValueChange={(value) => {
                    setDocumentType(value);
                    setExtraFields({});
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    {DOCUMENT_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="button" 
                onClick={handleNext}
                disabled={!name || !dateFrom || !dateTo || !documentType}
                className="w-full"
              >
                Next
              </Button>
            </>
          ) : (
            <>
              <h3 className="text-lg font-medium">
                {DOCUMENT_TYPES.find(dt => dt.value === documentType)?.label} Details
              </h3>
              
              {DOCUMENT_TYPES.find(dt => dt.value === documentType)?.extraFields.map(field => (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <Input
                    id={field.name}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    value={extraFields[field.name] || ''}
                    onChange={(e) => handleExtraFieldChange(field.name, e.target.value)}
                    required
                  />
                </div>
              ))}

              <div className="flex space-x-2">
                <Button type="button" variant="outline" onClick={handleBack} className="flex-1">
                  Back
                </Button>
                <Button type="submit" className="flex-1">
                  Generate Document
                </Button>
              </div>
            </>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default DocumentForm;
