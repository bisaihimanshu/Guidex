import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../lib/utils';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'social';
  icon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', icon, className, ...props }, ref) => {
    
    const variants = {
      primary: "bg-purple text-white hover:bg-purple/90 shadow-lg shadow-purple/25 border-none",
      secondary: "bg-orange text-white hover:bg-orange/90 shadow-lg shadow-orange/25 border-none",
      outline: "bg-transparent border-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50",
      social: "bg-white border-2 border-slate-100 text-slate-700 hover:border-slate-200 hover:bg-slate-50 shadow-sm flex items-center justify-center gap-3",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -2, scale: 1.01 }}
        whileTap={{ y: 1, scale: 0.98 }}
        className={cn(
          "w-full py-3.5 px-6 rounded-2xl font-bold transition-colors flex items-center justify-center gap-2",
          variants[variant],
          className
        )}
        {...props}
      >
        {icon}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
