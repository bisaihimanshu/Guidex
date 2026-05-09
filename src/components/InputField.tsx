import { InputHTMLAttributes, forwardRef, useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import type { FormState } from './Character';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onStateChange?: (state: FormState) => void;
  error?: string;
  showStrength?: boolean;
  passwordStrength?: 'weak' | 'medium' | 'strong';
  onRightIconClick?: () => void;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, icon, rightIcon, onStateChange, error, className, onFocus, onBlur, onChange, type, showStrength, passwordStrength, onRightIconClick, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (e.target.value === '') {
        onStateChange?.('confused');
      } else if (type === 'password') {
        onStateChange?.(showStrength && passwordStrength === 'strong' ? 'happy' : 'password');
      } else if (type === 'email') {
        onStateChange?.('excited');
      } else {
        onStateChange?.('typing');
      }
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onStateChange?.('idle');
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === '') {
        onStateChange?.('confused');
      } else if (error) {
        onStateChange?.('error');
      } else if (type === 'password') {
        // Will be handled by useEffect for strength changes, but set default here
        onStateChange?.('password');
      } else if (type === 'email') {
        onStateChange?.('excited');
      } else {
        onStateChange?.('typing');
      }
      onChange?.(e);
    };

    useEffect(() => {
      if (isFocused && type === 'password' && showStrength) {
        if (passwordStrength === 'strong') {
          onStateChange?.('happy');
        } else if (props.value !== '') {
          onStateChange?.('password');
        }
      }
    }, [passwordStrength, isFocused, type, showStrength, props.value]);

    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        <label className="text-sm font-semibold text-slate-700 ml-1">{label}</label>
        <div className={cn(
          "relative flex items-center bg-white border-2 rounded-2xl overflow-hidden transition-all duration-300",
          isFocused ? "border-purple shadow-md shadow-purple/10" : error ? "border-red-400" : "border-slate-200 hover:border-slate-300"
        )}>
          {icon && (
            <div className="pl-4 text-slate-400 flex items-center justify-center">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            className="w-full py-3.5 px-4 outline-none bg-transparent text-slate-800 placeholder:text-slate-400 font-medium"
            {...props}
          />
          {rightIcon && (
            <div 
              className="pr-4 text-slate-400 flex items-center justify-center cursor-pointer hover:text-slate-600 transition-colors"
              onClick={onRightIconClick}
            >
              {rightIcon}
            </div>
          )}
        </div>
        {error && <span className="text-xs font-medium text-red-500 ml-2 mt-1">{error}</span>}
        
        {showStrength && (
          <div className="flex items-center gap-1.5 mt-2 ml-1">
            <div className="flex-1 h-1.5 rounded-full bg-slate-200 overflow-hidden flex gap-1">
              <div className={cn("h-full w-1/3 rounded-full transition-colors duration-500", passwordStrength === 'weak' || passwordStrength === 'medium' || passwordStrength === 'strong' ? "bg-red-400" : "bg-transparent")} />
              <div className={cn("h-full w-1/3 rounded-full transition-colors duration-500", passwordStrength === 'medium' || passwordStrength === 'strong' ? "bg-yellow" : "bg-transparent")} />
              <div className={cn("h-full w-1/3 rounded-full transition-colors duration-500", passwordStrength === 'strong' ? "bg-green-400" : "bg-transparent")} />
            </div>
            <span className={cn(
              "text-[10px] font-bold uppercase tracking-wider w-12 text-right",
              passwordStrength === 'weak' ? "text-red-400" :
              passwordStrength === 'medium' ? "text-yellow" :
              passwordStrength === 'strong' ? "text-green-500" : "text-transparent"
            )}>
              {passwordStrength}
            </span>
          </div>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';
