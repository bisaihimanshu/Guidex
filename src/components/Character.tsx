import { motion, AnimatePresence } from 'framer-motion';
import { useMousePosition } from '../hooks/useMousePosition';
import { cn } from '../lib/utils';

export type FormState = 'idle' | 'excited' | 'confused' | 'angry' | 'happy' | 'celebration' | 'password' | 'typing' | 'error' | 'success';

interface CharacterProps {
  className?: string;
  shape: 'circle' | 'square' | 'tall-rect' | 'arch';
  color: string;
  formState: FormState;
  delay?: number;
  flipEyes?: boolean;
}

function ArchPath({ fill }: { fill: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
      <path d="M100 100V50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50V100H30V50C30 38.9543 38.9543 30 50 30C61.0457 30 70 38.9543 70 50V100H100Z" fill={fill} />
    </svg>
  );
}

export function Character({ className, shape, color, formState, delay = 0, flipEyes = false }: CharacterProps) {
  const mousePosition = useMousePosition();
  
  // Calculate eye movement based on form state and mouse position
  let eyeX = 0;
  let eyeY = 0;
  
  if (formState === 'idle' || formState === 'celebration' || formState === 'happy' || formState === 'confused' || formState === 'angry') {
    eyeX = mousePosition.x * 10;
    eyeY = mousePosition.y * 10;
  } else if (formState === 'excited' || formState === 'typing') {
    // Look down and slightly left/right as if following typing
    eyeX = Math.sin(Date.now() / 300) * 8;
    eyeY = 12;
  } else if (formState === 'password') {
    // Look away/down
    eyeX = flipEyes ? -15 : 15;
    eyeY = 5;
  }

  // Animation variants
  const floatingVariants = {
    idle: { y: [0, -10, 0], rotate: [0, 2, -2, 0], transition: { repeat: Infinity, duration: 4, delay, ease: 'easeInOut' } },
    typing: { y: [0, -4, 0], transition: { repeat: Infinity, duration: 1, ease: 'easeInOut' } },
    excited: { y: [0, -15, 0], scale: [1, 1.02, 1], transition: { repeat: Infinity, duration: 0.8, ease: 'easeInOut' } },
    confused: { rotate: [0, 10, -5, 0], transition: { duration: 0.8 } },
    angry: { x: [0, -5, 5, -5, 5, 0], transition: { duration: 0.4 } },
    happy: { y: [0, -5, 0], transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' } },
    celebration: { y: [0, -30, 0], scale: [1, 1.1, 1], transition: { repeat: Infinity, duration: 0.6 } },
    password: { y: 0, rotate: flipEyes ? 10 : -10, transition: { type: 'spring' } },
    success: { y: [0, -20, 0], scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 0.6 } },
    error: { x: [0, -10, 10, -10, 10, 0], transition: { duration: 0.5 } }
  };

  const getShapeClass = () => {
    switch (shape) {
      case 'circle': return 'rounded-full';
      case 'square': return 'rounded-3xl';
      case 'tall-rect': return 'rounded-[2rem] aspect-[1/2.2]';
      case 'arch': return 'rounded-t-full bg-transparent';
      default: return 'rounded-full';
    }
  };

  return (
    <motion.div
      variants={floatingVariants}
      initial="idle"
      animate={formState}
      className={cn(
        "relative flex items-center justify-center shadow-2xl",
        getShapeClass(),
        className
      )}
      style={{ backgroundColor: shape !== 'arch' ? color : 'transparent' }}
    >
      {shape === 'arch' && (
        <div className="absolute inset-0 w-full h-full">
          <ArchPath fill={color} />
        </div>
      )}

      {/* Face Container */}
      <motion.div 
        className="absolute w-2/3 h-1/2 flex flex-col items-center justify-center gap-2 z-10"
        style={{
          transform: `translate(${eyeX}px, ${eyeY}px)`
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="flex gap-4">
          <Eye state={formState} isLeft={true} />
          <Eye state={formState} isLeft={false} />
        </div>
        
        <Mouth state={formState} />
        
        {/* Hands covering eyes during password */}
        <AnimatePresence>
          {formState === 'password' && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0 }}
              animate={{ opacity: 1, y: -25, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0 }}
              className="absolute top-0 w-full flex justify-between px-2"
            >
              <div className="w-6 h-6 rounded-full bg-white/40 shadow-inner" style={{ backgroundColor: color, filter: 'brightness(0.9)' }} />
              <div className="w-6 h-6 rounded-full bg-white/40 shadow-inner" style={{ backgroundColor: color, filter: 'brightness(0.9)' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function Eye({ state, isLeft }: { state: FormState; isLeft: boolean }) {
  if (state === 'error' || state === 'angry') {
    return (
      <div className="w-4 h-4 bg-white rounded-full flex justify-center overflow-hidden relative">
        <div className={cn("w-full h-2 bg-black/80 absolute top-0", isLeft ? "rotate-[25deg] -left-1" : "-rotate-[25deg] -right-1")} />
        <div className="w-2 h-2 rounded-full bg-black absolute bottom-1" />
      </div>
    );
  }
  
  if (state === 'success' || state === 'happy' || state === 'celebration') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 15s4-6 10-6 10 6 10 6" />
      </svg>
    );
  }

  if (state === 'confused') {
    return (
      <div className={cn("bg-white rounded-full flex items-center justify-center shadow-inner relative overflow-hidden", isLeft ? "w-5 h-5" : "w-3 h-3 mt-1")}>
        <div className={cn("bg-slate-900 rounded-full", isLeft ? "w-2.5 h-2.5" : "w-1.5 h-1.5")} />
      </div>
    );
  }

  if (state === 'excited') {
    return (
      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-inner relative overflow-hidden">
        <motion.div 
          className="w-3.5 h-3.5 bg-slate-900 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
        <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white rounded-full" />
      </div>
    );
  }

  // default / idle / typing
  return (
    <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-inner relative overflow-hidden">
      <motion.div 
        className="w-2.5 h-2.5 bg-slate-900 rounded-full"
        animate={{
          scaleY: [1, 0.1, 1], // Blink
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: Math.random() * 3 + 2,
        }}
      />
    </div>
  );
}

function Mouth({ state }: { state: FormState }) {
  if (state === 'error' || state === 'angry') {
    return (
      <div className="w-4 h-2 mt-2 rounded-full border-t-2 border-white/80" />
    );
  }
  
  if (state === 'success' || state === 'happy') {
    return (
      <div className="w-5 h-3 mt-1 bg-white/90 rounded-b-full rounded-t-sm" />
    );
  }

  if (state === 'celebration' || state === 'excited') {
    return (
      <motion.div 
        className="w-6 h-5 mt-1 bg-white/90 rounded-b-full rounded-t-sm overflow-hidden flex justify-center"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 0.6 }}
      >
        <div className="w-4 h-2 bg-pink-400 rounded-t-full absolute bottom-0" />
      </motion.div>
    );
  }

  if (state === 'confused') {
    return (
      <svg width="16" height="8" viewBox="0 0 24 12" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="3" strokeLinecap="round" className="mt-2">
        <path d="M2 6 Q 7 0, 12 6 T 22 6" />
      </svg>
    );
  }

  if (state === 'typing') {
    return (
      <motion.div 
        className="w-3 h-3 bg-white/90 rounded-full mt-2"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 0.5 }}
      />
    );
  }

  // default / idle
  return (
    <div className="w-4 h-2 mt-2 border-b-2 border-white/80 rounded-full" />
  );
}
