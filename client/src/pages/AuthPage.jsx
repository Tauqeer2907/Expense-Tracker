import { useState, useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import { LogIn, UserPlus, Wallet, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AuthPage = () => {
    const { login, register, loading, error } = useContext(ExpenseContext);
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const { username, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (isLogin) {
            await login(username, password);
        } else {
            await register(username, password);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full glass-panel p-8 rounded-3xl shadow-2xl relative overflow-hidden"
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-bl-full -mr-16 -mt-16 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-tr-full -ml-16 -mb-16 blur-2xl"></div>

                <div className="text-center mb-8 relative z-10">
                    <div className="bg-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-indigo-200">
                        <Wallet size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h1>
                    <p className="text-slate-500 mt-2 font-medium">
                        {isLogin ? 'Manage your expenses securely' : 'Start your financial journey today'}
                    </p>
                </div>

                <form onSubmit={onSubmit} className="space-y-5 relative z-10">
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-slate-700 ml-1">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={onChange}
                            className="w-full bg-white border border-slate-200 p-4 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-400 font-medium"
                            placeholder="Enter username"
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            className="w-full bg-white border border-slate-200 p-4 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-400 font-medium"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 hover:scale-[1.02] transition-all active:scale-95 shadow-xl shadow-indigo-100 disabled:opacity-50 disabled:scale-100"
                    >
                        {loading ? 'Processing...' : (
                            <>
                                {isLogin ? 'Login Now' : 'Join Now'}
                                <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center relative z-10">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-slate-500 hover:text-indigo-600 font-bold transition-colors text-sm underline underline-offset-4 decoration-slate-200 hover:decoration-indigo-200"
                    >
                        {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Log In'}
                    </button>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-slate-400 relative z-10">
                    <ShieldCheck size={16} />
                    <span className="text-xs font-bold uppercase tracking-widest">End-to-End Encryption</span>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthPage;
