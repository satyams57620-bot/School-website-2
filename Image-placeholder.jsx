import React from "react";

export function ImagePlaceholder({ 
  filename, 
  className, 
  text = "Image Placeholder" 
}: { 
  filename: string; 
  className?: string;
  text?: string;
}) {
  return (
    <div className={`flex flex-col items-center justify-center bg-muted border border-border text-muted-foreground p-4 text-center ${className || ''}`}>
      <span className="font-medium">{text}</span>
      <span className="text-xs opacity-75 mt-1 font-mono">{filename}</span>
    </div>
  );
}
