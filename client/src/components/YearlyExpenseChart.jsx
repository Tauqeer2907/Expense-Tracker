import { useContext, useMemo } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { format, startOfYear, endOfYear, eachMonthOfInterval } from 'date-fns';

const YearlyExpenseChart = () => {
    const { expenses } = useContext(ExpenseContext);

    const data = useMemo(() => {
        const now = new Date();
        const start = startOfYear(now);
        const end = endOfYear(now);

        // Generate all months for the current year
        const months = eachMonthOfInterval({ start, end });

        // Initialize data structure with 0 for all months
        const monthlyData = months.map(date => ({
            name: format(date, 'MMM'),
            fullDate: format(date, 'MMMM yyyy'),
            amount: 0,
            dateObj: date
        }));

        // Fill in actual expense data
        expenses.forEach(expense => {
            const expenseDate = new Date(expense.date);
            // Only include expenses from current year
            if (expenseDate.getFullYear() === now.getFullYear()) {
                const monthIndex = expenseDate.getMonth();
                monthlyData[monthIndex].amount += expense.amount;
            }
        });

        return monthlyData;
    }, [expenses]);

    // Calculate max amount for domain scaling
    const maxAmount = Math.max(...data.map(d => d.amount), 1000);

    return (
        <div className="glass-panel p-6 rounded-2xl mt-8">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Yearly Expenses Overview</h2>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            hide
                            domain={[0, maxAmount * 1.2]} // Add some headroom
                        />
                        <Tooltip
                            cursor={{ fill: '#f1f5f9', radius: 4 }}
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-white p-3 shadow-lg rounded-xl border border-slate-100">
                                            <p className="font-bold text-slate-800">{payload[0].payload.fullDate}</p>
                                            <p className="text-indigo-600 font-bold text-lg">
                                                ₹{payload[0].value.toFixed(2)}
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar
                            dataKey="amount"
                            radius={[6, 6, 6, 6]}
                            barSize={32}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.amount > 0 ? '#6366f1' : '#e2e8f0'}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default YearlyExpenseChart;
