import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, EyeOff, Eye, ArrowRight } from 'lucide-react';
import { Character, type FormState } from '../components/Character';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';

export default function Login() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState<FormState>('idle');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError(true);
      setFormState('angry');
      setTimeout(() => setFormState('idle'), 2000);
      return;
    }
    
    setFormState('celebration');
    setTimeout(() => {
      // Simulate login success navigation or similar action
      setFormState('idle');
    }, 2000);
  };

  const handleStateChange = (state: FormState) => {
    if (state === 'password' && showPassword) {
      setFormState('typing');
    } else {
      setFormState(state);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 lg:p-8 bg-background overflow-hidden relative">
      {/* Animated Background Decor */}
      <motion.div 
        animate={
          formState === 'password' ? { scale: 0.8, opacity: 0.4 } : 
          formState === 'angry' ? { scale: [1, 1.2, 1], backgroundColor: "#f87171" } : 
          formState === 'celebration' ? { scale: [1, 1.5, 1], rotate: 180, borderRadius: ["50%", "30%", "50%"] } : 
          { scale: 1, opacity: 0.8, rotate: 0, borderRadius: "50%", backgroundColor: "rgba(168, 85, 247, 0.1)" }
        }
        transition={{ duration: 0.8 }}
        className="absolute top-10 left-10 w-48 h-48 rounded-full blur-3xl pointer-events-none"
      />
      
      <motion.div 
        animate={
          formState === 'password' ? { scale: 0.5, opacity: 0.3, y: -40 } : 
          formState === 'angry' ? { x: [-10, 10, -10, 10, 0], backgroundColor: "#f87171" } : 
          formState === 'celebration' ? { scale: 1.5, rotate: -90, borderRadius: ["50%", "40%", "50%"] } : 
          { scale: 1, opacity: 0.6, x: 0, y: 0, borderRadius: "50%", backgroundColor: "rgba(249, 115, 22, 0.1)" }
        }
        transition={{ duration: 0.5 }}
        className="absolute bottom-10 right-10 w-80 h-80 rounded-full blur-3xl pointer-events-none"
      />

      <motion.div 
        animate={
          formState === 'typing' ? { scale: 1.2, rotate: 180 } :
          formState === 'celebration' ? { scale: [1, 1.3, 1], rotate: 360 } :
          { scale: 1, rotate: 0 }
        }
        transition={{ duration: 1.5 }}
        className="absolute top-1/4 right-1/4 w-40 h-40 bg-pink-400/10 rounded-full blur-3xl pointer-events-none" 
      />

      <motion.div 
        animate={
          formState === 'password' ? { scale: 1.5, opacity: 0.8 } : 
          formState === 'angry' ? { opacity: 0 } :
          { scale: 1, opacity: 0.3 }
        }
        transition={{ duration: 0.8 }}
        className="absolute bottom-1/4 left-1/4 w-60 h-60 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" 
      />
      <div className="absolute top-10 left-10 flex gap-2 items-center">
         <div className="flex -space-x-2">
            <div className="w-4 h-8 bg-purple rounded-full"></div>
            <div className="w-4 h-6 mt-2 bg-orange rounded-full"></div>
            <div className="w-4 h-4 mt-4 bg-black rounded-full z-10"></div>
         </div>
         <span className="font-bold text-xl ml-2 tracking-tight">GuidEx</span>
      </div>

      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Left Side - Mascots */}
        <div className="hidden lg:flex relative h-[600px] items-center justify-center pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Chat Bubble */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="absolute top-20 left-0 bg-white px-6 py-4 rounded-3xl rounded-bl-sm shadow-xl z-20"
            >
              <p className="text-purple font-bold text-sm">Hey there!</p>
              <p className="text-slate-700 font-medium text-sm mt-1">Welcome back 👋</p>
            </motion.div>

            {/* Back Character (Black) */}
            <Character 
              shape="square" 
              color="#1A1A2E" 
              formState={formState} 
              className="absolute left-[15%] bottom-[20%] w-40 h-48 -rotate-6 z-0"
              delay={0.2}
            />

            {/* Tall Character (Purple) */}
            <Character 
              shape="tall-rect" 
              color="#6C63FF" 
              formState={formState} 
              className="absolute left-[35%] bottom-[15%] w-48 rotate-6 z-10"
            />

            {/* Front Character (Orange) */}
            <Character 
              shape="circle" 
              color="#FF8A34" 
              formState={formState} 
              className="absolute left-[10%] bottom-[5%] w-56 h-56 z-20"
              delay={0.4}
              flipEyes
            />
          </motion.div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full max-w-md mx-auto z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-2xl shadow-purple/5"
          >
            <div className="mb-8">
              <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Welcome<br/>back!</h1>
              <p className="text-slate-500 font-medium flex items-center gap-2">
                Login to continue your learning adventure 🚀
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <InputField
                label="Email address"
                type="email"
                placeholder="Enter your email"
                icon={<Mail size={20} />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onStateChange={handleStateChange}
                error={error && !email ? "Email is required" : undefined}
              />

              <InputField
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                icon={<Lock size={20} />}
                rightIcon={showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                onRightIconClick={() => {
                  const el = document.activeElement as HTMLInputElement;
                  if (el?.type === 'password' || el?.type === 'text') {
                     setShowPassword(!showPassword);
                     if (!showPassword) {
                        setFormState('typing');
                     } else {
                        setFormState('password');
                     }
                  }
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onStateChange={handleStateChange}
                error={error && !password ? "Password is required" : undefined}
              />

              <div className="flex items-center justify-between text-sm font-semibold mt-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-5 h-5 rounded border-2 border-slate-300 flex items-center justify-center group-hover:border-purple transition-colors">
                    <input type="checkbox" className="opacity-0 absolute w-0 h-0" />
                    {/* Add a custom checkmark indicator here if desired */}
                  </div>
                  <span className="text-slate-600 group-hover:text-slate-800 transition-colors">Remember me</span>
                </label>
                <a href="#" className="text-purple hover:text-purple/80 transition-colors">Forgot password?</a>
              </div>

              <Button 
                type="submit" 
                className="mt-6 group"
                onMouseEnter={() => formState === 'idle' && setFormState('typing')}
                onMouseLeave={() => formState === 'typing' && setFormState('idle')}
              >
                Log in
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Button>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-slate-100"></div>
                </div>
                <div className="relative flex justify-center text-sm font-semibold">
                  <span className="px-4 bg-white text-slate-400">or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="social" type="button" 
                  onMouseEnter={() => setFormState('idle')}
                >
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                  Google
                </Button>
                <Button variant="social" type="button"
                  onMouseEnter={() => setFormState('idle')}
                >
                  <img src="https://www.svgrepo.com/show/512317/github-142.svg" className="w-5 h-5 opacity-80" alt="GitHub" />
                  GitHub
                </Button>
              </div>
            </form>

            <p className="mt-8 text-center text-sm font-semibold text-slate-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-purple hover:underline">Sign up</Link>
            </p>
          </motion.div>
        </div>
        
      </div>
      
      {/* Floating abstract shapes */}
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 40, ease: 'linear' }} className="absolute top-[20%] left-[5%] w-6 h-6 border-4 border-yellow rounded-sm hidden lg:block" />
      <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} className="absolute bottom-[10%] left-[40%] w-4 h-4 bg-pink rounded-full hidden lg:block" />
    </div>
  );
}
