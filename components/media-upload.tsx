"use client"

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, ImageIcon, Bot } from 'lucide-react'

interface MediaUploadProps {
  onUpload: (files: File[]) => void
}

const MediaUpload = ({ onUpload }: MediaUploadProps) => {
  const [files, setFiles] = useState<any[]>([])
  const [progress, setProgress] = useState(0)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
    onUpload(acceptedFiles);

    // Simulate upload progress
    setProgress(0)
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 10 })

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Media
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div {...getRootProps()} className={`border-2 border-dashed rounded-2xl p-12 text-center transition-colors cursor-pointer ${isDragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/30 hover:border-primary/50'}`}>
          <input {...getInputProps()} />
          <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-medium text-gray-700 mb-2">Drag & drop files here, or click to select files</p>
          <p className="text-gray-500 mb-4">Max 10 files</p>
        </div>
        <div className="mt-4 space-y-2">
            {files.map(file => (
                <div key={file.name} className="flex items-center gap-4">
                    <img src={file.preview} className="h-10 w-10 object-cover rounded-md" />
                    <div className="flex-1">
                        <p className="text-sm font-medium">{file.name}</p>
                        <Progress value={progress} className="w-full" />
                    </div>
                </div>
            ))}
        </div>
        <Button variant="outline" className="w-full mt-4">
          <Bot className="mr-2 h-4 w-4" />
          Generate Image with AI
        </Button>
      </CardContent>
    </Card>
  )
}

export default MediaUpload
