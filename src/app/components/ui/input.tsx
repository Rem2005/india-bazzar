'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
