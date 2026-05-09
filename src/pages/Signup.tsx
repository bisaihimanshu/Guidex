import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, EyeOff, Eye, ArrowRight } from 'lucide-react';
import { Character, type FormState } from '../components/Character';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';

export default function Signup() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [showPassword, setShowPassword] = useState(false);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);

  const calculateStrength = (pass: string) => {
    if (!pass) return undefined;
    if (pass.length < 5) return 'weak';
    if (pass.length < 8 || !/[0-9]/.test(pass)) return 'medium';
    return 'strong';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || password !== confirmPassword) {
      setError(true);
      setFormState('angry');
      setTimeout(() => setFormState('idle'), 2000);
      return;
    }
    
    setFormState('celebration');
    setTimeout(() => {
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

  const strength = calculateStrength(password);

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

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mt-10 lg:mt-0">
        
        {/* Left Side - Mascots */}
        <div className="hidden lg:flex relative h-[700px] items-center justify-center pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full h-full flex flex-col items-center justify-center gap-2"
          >
            {/* Chat Bubble */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="absolute top-[20%] left-[15%] bg-white px-6 py-4 rounded-3xl rounded-br-sm shadow-xl z-30"
            >
              <p className="text-purple font-bold text-sm">Let's create</p>
              <p className="text-slate-700 font-medium text-sm mt-1">something amazing! ✨</p>
            </motion.div>

            {/* Stacked Characters */}
            <Character 
              shape="circle" 
              color="#4ADE80" 
              formState={formState} 
              className="w-36 h-36 z-20"
            />
            
            <Character 
              shape="square" 
              color="#FF6FB5" 
              formState={formState} 
              className="w-40 h-32 z-10 -mt-8"
              delay={0.2}
              flipEyes
            />

            <Character 
              shape="arch" 
              color="#FFD93D" 
              formState={formState} 
              className="w-56 h-48 -mt-10 z-0"
              delay={0.4}
            />
          </motion.div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full max-w-xl mx-auto z-10 py-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-2xl shadow-purple/5"
          >
            <div className="mb-8">
              <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Create your<br/><span className="text-purple">account</span></h1>
              <p className="text-slate-500 font-medium flex items-center gap-2 mt-4">
                Join GuidEx and start your<br/>learning adventure 🚀
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <InputField
                label="Full name"
                type="text"
                placeholder="Enter your full name"
                icon={<User size={20} />}
                value={name}
                onChange={(e) => setName(e.target.value)}
                onStateChange={handleStateChange}
                error={error && !name ? "Name is required" : undefined}
              />

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
                placeholder="Create a password"
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
                showStrength={password.length > 0}
                passwordStrength={strength}
              />

              <InputField
                label="Confirm password"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onStateChange={handleStateChange}
                error={error && password !== confirmPassword ? "Passwords do not match" : undefined}
              />

              <div className="flex items-center gap-3 text-sm font-semibold mt-4 mb-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="w-5 h-5 mt-0.5 rounded border-2 border-slate-300 flex items-center justify-center group-hover:border-purple transition-colors shrink-0">
                    <input type="checkbox" className="opacity-0 absolute w-0 h-0" />
                  </div>
                  <span className="text-slate-600 leading-tight">
                    I agree to the <a href="#" className="text-purple hover:underline">Terms & Conditions</a> and <a href="#" className="text-purple hover:underline">Privacy Policy</a>
                  </span>
                </label>
              </div>

              <Button 
                type="submit" 
                className="mt-6 group"
                onMouseEnter={() => formState === 'idle' && setFormState('typing')}
                onMouseLeave={() => formState === 'typing' && setFormState('idle')}
              >
                Create account
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Button>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-slate-100"></div>
                </div>
                <div className="relative flex justify-center text-sm font-semibold">
                  <span className="px-4 bg-white text-slate-400">or sign up with</span>
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
              Already have an account?{' '}
              <Link to="/login" className="text-purple hover:underline">Log in</Link>
            </p>
          </motion.div>
        </div>
        
      </div>
      
      {/* Floating abstract shapes */}
      <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 30, ease: 'linear' }} className="absolute bottom-[20%] right-[10%] w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[20px] border-b-purple hidden lg:block" />
    </div>
  );
}
