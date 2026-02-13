import { useState, useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import { Copy, RefreshCw, Key, HelpCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const SyncSettings = () => {
    const { userId, updateUserId } = useContext(ExpenseContext);
    const [newKey, setNewKey] = useState('');
    const [showInstructions, setShowInstructions] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(userId);
        toast.info('Sync Key copied to clipboard!');
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        if (window.confirm('Adding a new Sync Key will replace your current data on this device with the data linked to that key. Proceed?')) {
            updateUserId(newKey);
            setNewKey('');
        }
    };

    return (
        <div className="glass-panel p-6 rounded-2xl space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Key size={20} className="text-indigo-600" />
                    Data Sync Settings
                </h3>
                <button
                    onClick={() => setShowInstructions(!showInstructions)}
                    className="text-slate-400 hover:text-indigo-600 transition-colors"
                >
                    <HelpCircle size={20} />
                </button>
            </div>

            {showInstructions && (
                <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl text-sm text-indigo-800 space-y-2">
                    <p><strong>How to Sync across devices:</strong></p>
                    <ol className="list-decimal list-inside space-y-1">
                        <li>Copy the <strong>Current Key</strong> from your main device.</li>
                        <li>Open this app on your other device (e.g., smartphone).</li>
                        <li>Paste the key into the <strong>Enter New Key</strong> field below and click Update.</li>
                    </ol>
                </div>
            )}

            <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Your Current Sync Key</label>
                <div className="flex gap-2">
                    <code className="flex-1 bg-slate-100 p-3 rounded-xl text-xs text-slate-600 break-all border border-slate-200">
                        {userId}
                    </code>
                    <button
                        onClick={handleCopy}
                        className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors"
                        title="Copy Key"
                    >
                        <Copy size={18} />
                    </button>
                </div>
            </div>

            <form onSubmit={handleUpdate} className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Link to another Device (Enter Key)</label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newKey}
                        onChange={(e) => setNewKey(e.target.value)}
                        placeholder="Paste key here..."
                        className="flex-1 bg-white border border-slate-200 p-3 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-200"
                    >
                        <RefreshCw size={18} />
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SyncSettings;
