import { useContext, useState } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import { format } from 'date-fns';
import { TrendingUp, TrendingDown, IndianRupee, Calendar, Wallet, Edit2, Check, X } from 'lucide-react';

const DashboardSummary = () => {
    const { expenses, salary, updateSalary } = useContext(ExpenseContext);
    const [isEditingSalary, setIsEditingSalary] = useState(false);
    const [tempSalary, setTempSalary] = useState(salary);

    const total = expenses.reduce((acc, item) => acc + item.amount, 0);

    // Calculate category breakdown
    const categories = expenses.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + item.amount;
        return acc;
    }, {});

    const topCategory = Object.keys(categories).reduce((a, b) => categories[a] > categories[b] ? a : b, '');
    return (
        <div className="glass-panel p-6 rounded-2xl mb-8 transform transition-all hover:scale-[1.01]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Balance */}
                <div className="space-y-2">
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Total Spending</p>
                    <div className="flex items-center space-x-2">
                        <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                            <IndianRupee size={24} />
                        </div>
                        <h2 className="text-4xl font-bold text-slate-800">
                            ₹{total.toFixed(2)}
                        </h2>
                    </div>
                </div>

                {/* Top Category */}
                <div className="space-y-2">
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Top Category</p>
                    <div className="flex items-center space-x-2">
                        <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-800">{topCategory || 'N/A'}</h3>
                            <p className="text-slate-500 text-sm">Most spent on</p>
                        </div>
                    </div>
                </div>

                {/* Salary Input */}
                <div className="space-y-4 md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                    {/* Salary Input */}
                    <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                                <Wallet size={20} />
                            </div>
                            <div>
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Monthly Salary</p>
                                {isEditingSalary ? (
                                    <input
                                        type="number"
                                        value={tempSalary}
                                        onChange={(e) => setTempSalary(e.target.value)}
                                        className="font-bold text-slate-800 bg-white border border-slate-300 rounded px-2 py-1 w-32 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        autoFocus
                                    />
                                ) : (
                                    <h3 className="text-lg font-bold text-slate-800">₹{salary.toLocaleString()}</h3>
                                )}
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            {isEditingSalary ? (
                                <>
                                    <button
                                        onClick={() => {
                                            updateSalary(tempSalary);
                                            setIsEditingSalary(false);
                                        }}
                                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
                                    >
                                        <Check size={18} />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setTempSalary(salary);
                                            setIsEditingSalary(false);
                                        }}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                    >
                                        <X size={18} />
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => {
                                        setTempSalary(salary);
                                        setIsEditingSalary(true);
                                    }}
                                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                                >
                                    <Edit2 size={18} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DashboardSummary;
