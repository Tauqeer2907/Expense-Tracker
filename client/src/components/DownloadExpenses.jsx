import { useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import * as XLSX from 'xlsx';
import { Download } from 'lucide-react';
import { format } from 'date-fns';

const DownloadExpenses = () => {
    const { expenses } = useContext(ExpenseContext);

    const handleDownload = () => {
        if (!expenses || expenses.length === 0) {
            alert("No expenses to download.");
            return;
        }

        // Prepare data for Excel
        const data = expenses.map(expense => ({
            Date: format(new Date(expense.date), 'yyyy-MM-dd'),
            Category: expense.category,
            Description: expense.description || '',
            'Amount (₹)': expense.amount
        }));

        // Create a new workbook and worksheet
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);

        // Adjust column widths (optional but good for UX)
        const wscols = [
            { wch: 15 }, // Date
            { wch: 15 }, // Category
            { wch: 30 }, // Description
            { wch: 10 }  // Amount (₹)
        ];
        ws['!cols'] = wscols;

        // Add worksheet to workbook
        XLSX.utils.book_append_sheet(wb, ws, "Expenses");

        // Generate Excel file
        XLSX.writeFile(wb, `Expenses_${format(new Date(), 'yyyy-MM-dd')}.xlsx`);
    };

    return (
        <div className="flex justify-center mt-8 mb-12">
            <button
                onClick={handleDownload}
                className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition hover:scale-105 active:scale-95"
            >
                <Download size={20} />
                <span>Download Expenses (Excel)</span>
            </button>
        </div>
    );
};

export default DownloadExpenses;
