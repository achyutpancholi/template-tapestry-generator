
import React, { useState, useRef } from 'react';
import DocumentForm from '@/components/DocumentForm';
import { DocumentTemplate, DocumentIcon } from '@/components/DocumentTemplates';
import { convertToImage, downloadImage } from '@/utils/imageConverter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Loader2, Image } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [formData, setFormData] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [converting, setConverting] = useState(false);
  const documentRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleFormSubmit = (data: any) => {
    setFormData(data);
    setImageUrl(null);
  };

  const handleConvertToImage = async () => {
    if (!documentRef.current) return;
    
    setConverting(true);
    try {
      const dataUrl = await convertToImage('document-output');
      setImageUrl(dataUrl);
      toast({
        title: "Success!",
        description: "Document converted to image. You can download it now.",
      });
    } catch (error) {
      console.error('Error converting to image:', error);
      toast({
        title: "Error",
        description: "Failed to convert document to image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setConverting(false);
    }
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    
    const filename = `${formData.documentType}-document.png`;
    downloadImage(imageUrl, filename);
    toast({
      title: "Download started",
      description: "Your document is being downloaded.",
    });
  };

  const getDocumentTypeName = (type: string) => {
    switch (type) {
      case 'medical': return 'Medical Certificate';
      case 'marriage': return 'Marriage Card';
      case 'chat': return 'Emergency Chat';
      default: return 'Document';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Generator</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Generate realistic documents by filling in your information and selecting a template.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            {!formData ? (
              <DocumentForm onSubmit={handleFormSubmit} />
            ) : (
              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <DocumentIcon type={formData.documentType} />
                      <h2 className="text-xl font-semibold">{getDocumentTypeName(formData.documentType)}</h2>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Button 
                          onClick={handleConvertToImage} 
                          disabled={converting} 
                          className="w-full"
                        >
                          {converting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Converting...
                            </>
                          ) : (
                            <>
                              <Image className="mr-2 h-4 w-4" />
                              Convert to Image
                            </>
                          )}
                        </Button>
                        
                        {imageUrl && (
                          <Button 
                            onClick={handleDownload} 
                            variant="outline" 
                            className="w-full"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download Image
                          </Button>
                        )}
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        className="w-full"
                        onClick={() => setFormData(null)}
                      >
                        Create Another Document
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {imageUrl && (
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-medium mb-3">Preview</h3>
                      <div className="border rounded-md overflow-hidden">
                        <img src={imageUrl} alt="Document Preview" className="w-full" />
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
          
          <div>
            {formData && (
              <div 
                id="document-output" 
                ref={documentRef}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <DocumentTemplate data={formData} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
