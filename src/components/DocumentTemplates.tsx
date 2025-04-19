
import React from 'react';
import { format } from 'date-fns';
import { FileText, FileHeart, MessageCircle } from 'lucide-react';

interface DocumentData {
  name: string;
  dateFrom: Date;
  dateTo: Date;
  documentType: string;
  [key: string]: any;
}

interface TemplateProps {
  data: DocumentData;
}

export const MedicalCertificate: React.FC<TemplateProps> = ({ data }) => {
  const currentDate = new Date();
  return (
    <div className="document-template medical-certificate p-8 relative">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-blue-900 uppercase tracking-wide mb-1">MEDICAL CERTIFICATE</h1>
        <div className="border-b-2 border-blue-900 mx-auto w-32 mb-1"></div>
        <h2 className="text-lg font-semibold text-blue-800">{data.hospitalName}</h2>
        <p className="text-sm text-gray-600">Medical Registration No: MC-{Math.floor(10000 + Math.random() * 90000)}</p>
      </div>

      <div className="mb-6">
        <p className="mb-2">
          <span className="font-semibold">Date:</span>{" "}
          {format(currentDate, "dd MMMM yyyy")}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Patient Name:</span> {data.name}
        </p>
      </div>

      <div className="mb-6">
        <p className="mb-1">This is to certify that I have examined the above-named patient and found that:</p>
        <p className="mb-4 pl-4 font-medium">The patient is diagnosed with <span className="underline font-bold">{data.diagnosis}</span> and requires medical leave/rest.</p>
        
        <p className="mb-4">
          <span className="font-semibold">Period of Leave/Rest:</span> From{" "}
          <span className="underline">{format(data.dateFrom, "dd MMMM yyyy")}</span> to{" "}
          <span className="underline">{format(data.dateTo, "dd MMMM yyyy")}</span>
          {" "}(inclusive)
        </p>
      </div>

      <div className="mb-8">
        <p className="font-semibold mb-1">Recommendations:</p>
        <p className="pl-4">{data.recomendations}</p>
      </div>

      <div className="mt-12 text-right">
        <div className="mb-1">
          <div className="border-b border-black inline-block w-48 mb-1"></div>
          <p className="font-semibold">Dr. {data.doctorName}</p>
          <p className="text-sm">MBBS, MD</p>
        </div>
      </div>

      <div className="seal"></div>
    </div>
  );
};

export const MarriageCard: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="document-template marriage-card p-10 text-center relative overflow-hidden">
      <div className="border-4 border-amber-300 p-8 rounded-lg">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          zIndex: -1,
          opacity: 0.3
        }}></div>

        <h1 className="text-3xl font-serif text-amber-800 mb-2">Wedding Invitation</h1>
        <div className="w-32 h-1 bg-amber-600 mx-auto mb-6"></div>
        
        <p className="italic text-amber-700 mb-5">Together with their families</p>
        
        <div className="flex justify-center items-center mb-8">
          <div className="text-right pr-4 border-r-2 border-amber-300">
            <h2 className="text-2xl font-serif">{data.brideName}</h2>
            <p className="text-sm text-amber-700">Bride</p>
          </div>
          <div className="px-4 text-amber-800">&</div>
          <div className="text-left pl-4 border-l-2 border-amber-300">
            <h2 className="text-2xl font-serif">{data.groomName}</h2>
            <p className="text-sm text-amber-700">Groom</p>
          </div>
        </div>
        
        <p className="mb-6 font-medium">
          Request the pleasure of your company as we celebrate our marriage
        </p>
        
        <div className="bg-amber-50 p-4 rounded-lg mb-6 mx-auto max-w-xs">
          <p className="mb-2 font-medium">
            {format(data.dateFrom, "EEEE, MMMM dd, yyyy")}
          </p>
          <p className="mb-2 text-sm">at {format(data.dateFrom, "h:mm aaa")}</p>
          <p className="font-medium">{data.venue}</p>
        </div>
        
        <p className="italic text-amber-700 mb-2">RSVP by {format(new Date(data.dateFrom.getTime() - 7 * 24 * 60 * 60 * 1000), "MMMM dd, yyyy")}</p>
        <p className="text-sm">Contact: {data.name}</p>
        
        <div className="mt-8 italic text-amber-800">
          "{data.message}"
        </div>
      </div>
    </div>
  );
};

export const ChatScreenshot: React.FC<TemplateProps> = ({ data }) => {
  const currentDate = new Date();
  const getRandomTime = (hour: number) => {
    const minutes = Math.floor(Math.random() * 60);
    return `${hour}:${minutes < 10 ? '0' + minutes : minutes}`;
  };

  return (
    <div className="document-template chat-screenshot p-4 bg-gray-100 border border-gray-300 rounded-lg max-w-md mx-auto">
      <div className="bg-blue-600 text-white p-3 rounded-t-lg flex items-center">
        <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
        <div>
          <p className="font-medium">{data.contactName}</p>
          <p className="text-xs opacity-80">Online</p>
        </div>
      </div>
      
      <div className="bg-white px-4 py-3 flex flex-col space-y-2">
        <div className="text-center text-xs text-gray-500 my-2">
          {format(currentDate, "MMMM d, yyyy")}
        </div>
        
        <div className="chat-bubble sent">
          <p>Hi, are you there? I need help!</p>
          <div className="chat-time text-right text-white opacity-70">{getRandomTime(9)}</div>
        </div>
        
        <div className="chat-bubble received">
          <p>Yes, what's going on?</p>
          <div className="chat-time">{getRandomTime(9)}</div>
        </div>
        
        <div className="chat-bubble sent">
          <p>I'm having a {data.emergency} and I need immediate assistance.</p>
          <div className="chat-time text-right text-white opacity-70">{getRandomTime(9)}</div>
        </div>
        
        <div className="chat-bubble received">
          <p>Oh no! Where are you?</p>
          <div className="chat-time">{getRandomTime(9)}</div>
        </div>
        
        <div className="chat-bubble sent">
          <p>I'm at {data.location} right now. Please help!</p>
          <div className="chat-time text-right text-white opacity-70">{getRandomTime(9)}</div>
        </div>

        <div className="chat-bubble received">
          <p>I'm calling emergency services. Stay calm and don't move.</p>
          <div className="chat-time">{getRandomTime(10)}</div>
        </div>
        
        <div className="chat-bubble sent">
          <p>Thank you! Please hurry!</p>
          <div className="chat-time text-right text-white opacity-70">{getRandomTime(10)}</div>
        </div>
      </div>
    </div>
  );
};

export const DocumentIcon: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case 'medical':
      return <FileText className="h-5 w-5" />;
    case 'marriage':
      return <FileHeart className="h-5 w-5" />;
    case 'chat':
      return <MessageCircle className="h-5 w-5" />;
    default:
      return <FileText className="h-5 w-5" />;
  }
};

export const DocumentTemplate: React.FC<TemplateProps> = ({ data }) => {
  switch (data.documentType) {
    case 'medical':
      return <MedicalCertificate data={data} />;
    case 'marriage':
      return <MarriageCard data={data} />;
    case 'chat':
      return <ChatScreenshot data={data} />;
    default:
      return <div>Invalid document type</div>;
  }
};
