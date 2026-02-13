import { Wallet, LogOut, User } from 'lucide-react';
import { useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';

const Header = () => {
    const { user, logout } = useContext(ExpenseContext);

    return (
        <nav className="glass-panel sticky top-0 z-50 mb-8 rounded-b-2xl">
            <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="bg-indigo-600 p-2 rounded-lg text-white">
                        <Wallet size={24} />
                    </div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        ExpenseTracker
                    </h1>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                        <div className="w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md">
                            {user?.username?.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-bold text-slate-700 mr-1">{user?.username}</span>
                    </div>

                    <button
                        onClick={logout}
                        className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all border border-transparent hover:border-red-100"
                        title="Logout Securely"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Header;
