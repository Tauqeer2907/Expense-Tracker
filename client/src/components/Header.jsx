import { Wallet, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import SyncSettings from './SyncSettings';

const Header = () => {
    const [showSync, setShowSync] = useState(false);

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
                    <button
                        onClick={() => setShowSync(!showSync)}
                        className={`p-2 rounded-full transition-all ${showSync ? 'bg-indigo-100 text-indigo-600' : 'text-slate-400 hover:bg-slate-100'}`}
                        title="Sync Devices"
                    >
                        <RefreshCw size={20} />
                    </button>
                    <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold text-xs shadow-inner">US</div>
                </div>
            </div>

            {showSync && (
                <div className="max-w-4xl mx-auto px-6 pb-6">
                    <SyncSettings />
                </div>
            )}
        </nav>
    );
};

export default Header;
