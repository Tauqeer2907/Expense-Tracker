import { useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

const MonthlyExpenseTables = () => {
    const { expenses, salary } = useContext(ExpenseContext);

    // Group expenses by Month -> Year
    const expensesByMonth = expenses.reduce((groups, expense) => {
        const date = new Date(expense.date);
        const monthYear = format(date, 'MMMM yyyy');

        if (!groups[monthYear]) {
            groups[monthYear] = [];
        }
        groups[monthYear].push(expense);
        return groups;
    }, {});

    // Sort months (newest first)
    const sortedMonths = Object.keys(expensesByMonth).sort((a, b) => {
        return new Date(b) - new Date(a); // This might need better parsing if format is just "Month Year"
    });

    // Helper to parse "Month Year" back to date for sorting
    const parseMonthYear = (str) => new Date(str);

    const sortedMonthKeys = Object.keys(expensesByMonth).sort((a, b) =>
        parseMonthYear(b) - parseMonthYear(a)
    );

    return (
        <div className="space-y-8 mt-12">
            <h2 className="text-2xl font-bold text-slate-800 border-b border-slate-200 pb-4">
                Monthly Expense Breakdown
            </h2>

            {sortedMonthKeys.length === 0 && (
                <p className="text-slate-500 italic">No expenses to display.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedMonthKeys.map((month) => {
                    const monthlyExpenses = expensesByMonth[month];
                    const monthlyTotal = monthlyExpenses.reduce((sum, item) => sum + item.amount, 0);
                    const remainingBalance = salary - monthlyTotal;

                    return (
                        <motion.div
                            key={month}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="glass-panel p-6 rounded-2xl overflow-hidden h-full flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
                                    <h3 className="text-lg font-bold text-indigo-600">{month}</h3>
                                    <div className="text-slate-800 font-bold bg-slate-100 px-3 py-1 rounded-full text-sm">
                                        Total: ₹{monthlyTotal.toFixed(2)}
                                    </div>
                                </div>

                                <div className="overflow-x-auto max-h-[300px] overflow-y-auto custom-scrollbar">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider sticky top-0 bg-white/80 backdrop-blur-sm">
                                                <th className="py-2 px-1 font-medium">Date</th>
                                                <th className="py-2 px-1 font-medium">Cat.</th>
                                                <th className="py-2 px-1 font-medium">Desc.</th>
                                                <th className="py-2 px-1 font-medium text-right">Amt. (₹)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-slate-700 text-sm">
                                            {monthlyExpenses.map((expense) => (
                                                <tr key={expense._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                                    <td className="py-2 px-1 whitespace-nowrap text-xs">
                                                        {format(new Date(expense.date), 'dd MMM')}
                                                    </td>
                                                    <td className="py-2 px-1">
                                                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-medium uppercase">
                                                            {expense.category.slice(0, 3)}
                                                        </span>
                                                    </td>
                                                    <td className="py-2 px-1 text-slate-500 truncate max-w-[80px] text-xs">
                                                        {expense.description || '-'}
                                                    </td>
                                                    <td className="py-2 px-1 text-right font-medium text-slate-900 text-xs">
                                                        ₹{expense.amount.toFixed(0)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Remaining Balance Footer */}
                            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center bg-slate-50 p-3 rounded-xl">
                                <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Remaining Balance</span>
                                <span className={`text-lg font-bold ${remainingBalance >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                                    ₹{remainingBalance.toFixed(2)}
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default MonthlyExpenseTables;
