'use client';

import * as React from 'react';
import { Upload, X, File } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { formatFileSize } from '@/lib/utils';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onFileRemove?: () => void;
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
  disabled?: boolean;
  currentFile?: File | null;
}

export function FileUpload({
  onFileSelect,
  onFileRemove,
  accept = '.csv,.xlsx,.xls',
  maxSize = 50,
  className,
  disabled = false,
  currentFile,
}: FileUploadProps) {
  const [dragActive, setDragActive] = React.useState(false);
  const [error, setError] = React.useState<string>('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateFile = (file: File): string | null => {
    // Check file type
    const acceptedTypes = accept.split(',').map((type) => type.trim());
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

    if (!acceptedTypes.includes(fileExtension)) {
      return `File type not accepted. Please upload: ${accept}`;
    }

    // Check file size
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > maxSize) {
      return `File size exceeds ${maxSize}MB limit`;
    }

    return null;
  };

  const handleFile = (file: File) => {
    setError('');
    const validationError = validateFile(file);

    if (validationError) {
      setError(validationError);
      return;
    }

    onFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (disabled) return;

    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    setError('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    onFileRemove?.();
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className={cn('w-full', className)}>
      {!currentFile ? (
        <div
          className={cn(
            'relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors',
            dragActive
              ? 'border-primary bg-primary/5'
              : 'border-gray-300 hover:border-primary/50',
            disabled && 'cursor-not-allowed opacity-50',
            error && 'border-destructive'
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleChange}
            disabled={disabled}
            className="hidden"
          />

          <Upload className="mb-4 h-12 w-12 text-gray-400" />

          <div className="text-center">
            <p className="mb-2 text-sm font-medium">
              Drag and drop your file here, or{' '}
              <button
                type="button"
                onClick={handleButtonClick}
                disabled={disabled}
                className="text-primary underline hover:text-primary-600"
              >
                browse
              </button>
            </p>
            <p className="text-xs text-gray-500">
              Supported formats: {accept}
            </p>
            <p className="text-xs text-gray-500">
              Maximum file size: {maxSize}MB
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-gray-300 bg-gray-50 p-4">
          <div className="flex items-center space-x-3">
            <File className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm font-medium">{currentFile.name}</p>
              <p className="text-xs text-gray-500">
                {formatFileSize(currentFile.size)}
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleRemove}
            disabled={disabled}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}
