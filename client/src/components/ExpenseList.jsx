import { useContext, useEffect } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingBag, Coffee, Car, Zap, Heart, Film, HelpCircle } from 'lucide-react';
import { format } from 'date-fns';

const categoryIcons = {
    Food: <Coffee size={20} />,
    Transport: <Car size={20} />,
    Shopping: <ShoppingBag size={20} />,
    Bills: <Zap size={20} />,
    Entertainment: <Film size={20} />,
    Health: <Heart size={20} />,
    Other: <HelpCircle size={20} />,
};

const categoryColors = {
    Food: 'bg-orange-100 text-orange-600',
    Transport: 'bg-blue-100 text-blue-600',
    Shopping: 'bg-pink-100 text-pink-600',
    Bills: 'bg-red-100 text-red-600',
    Entertainment: 'bg-purple-100 text-purple-600',
    Health: 'bg-green-100 text-green-600',
    Other: 'bg-gray-100 text-gray-600',
};

const ExpenseList = () => {
    const { expenses, getExpenses, deleteExpense, loading } = useContext(ExpenseContext);

    useEffect(() => {
        getExpenses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return <div className="text-center py-10 text-slate-500">Loading expenses...</div>;
    }

    if (expenses.length === 0) {
        return (
            <div className="text-center py-12 glass-panel rounded-2xl">
                <div className="bg-slate-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="text-slate-400" size={32} />
                </div>
                <h3 className="text-lg font-medium text-slate-900">No expenses yet</h3>
                <p className="text-slate-500 mt-1">Add your first expense to get started!</p>
            </div>
        );
    }

    // Group expenses by Month -> Day
    const groupedExpenses = expenses.reduce((groups, expense) => {
        const date = new Date(expense.date);
        const monthYear = format(date, 'MMMM yyyy');
        const day = format(date, 'eeee, do');

        if (!groups[monthYear]) {
            groups[monthYear] = {};
        }
        if (!groups[monthYear][day]) {
            groups[monthYear][day] = [];
        }
        groups[monthYear][day].push(expense);
        return groups;
    }, {});

    // Helper to parse date keys for sorting
    const parseDateKey = (dateStr) => Function('return new Date("' + dateStr + '")')() || new Date(dateStr);

    const sortedMonths = Object.keys(groupedExpenses).sort((a, b) => {
        // "September 2026" -> Date
        return new Date(b) - new Date(a);
    });

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 px-1">Recent Transactions</h3>

            <div className="max-h-[500px] overflow-y-auto custom-scrollbar pr-2 space-y-6">
                <AnimatePresence>
                    {sortedMonths.map((monthYear) => {
                        const days = groupedExpenses[monthYear];
                        // Sort days descending
                        // Day format: "Friday, 12th" - this is hard to parse directly back to date without year/month context
                        // However, since we process expenses in order (date:-1), the array insertion order into 'days' object *should* be correct if we iterate expenses.
                        // But Object.keys() order isn't guaranteed.
                        // Better approach: filter expenses for this month, then group, or just rely on the original expenses array order.

                        // Let's re-sort based on the first expense of that day
                        const sortedDays = Object.keys(days).sort((a, b) => {
                            const dateA = new Date(days[a][0].date);
                            const dateB = new Date(days[b][0].date);
                            return dateB - dateA;
                        });

                        return (
                            <div key={monthYear} className="space-y-4">
                                <h3 className="text-xl font-bold text-slate-800 px-1 border-b border-slate-200 pb-2 sticky top-0 bg-slate-50 z-10">
                                    {monthYear}
                                </h3>

                                {sortedDays.map((day) => (
                                    <div key={day} className="space-y-3">
                                        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider px-1">
                                            {day}
                                        </h4>
                                        {days[day].map((expense) => (
                                            <motion.div
                                                key={expense._id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                className="glass-panel p-4 rounded-xl flex items-center justify-between group hover:shadow-md transition-shadow"
                                            >
                                                <div className="flex items-center space-x-4">
                                                    <div className={`p-3 rounded-full ${categoryColors[expense.category] || categoryColors.Other}`}>
                                                        {categoryIcons[expense.category] || categoryIcons.Other}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-slate-800">{expense.category}</h4>
                                                        <p className="text-xs text-slate-500">
                                                            {expense.description || 'No description'}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-4">
                                                    <span className="font-bold text-slate-800 text-lg">
                                                        -₹{expense.amount.toFixed(2)}
                                                    </span>
                                                    <button
                                                        onClick={() => deleteExpense(expense._id)}
                                                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ExpenseList;
