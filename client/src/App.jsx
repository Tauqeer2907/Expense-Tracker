import { useState } from 'react';
import Header from './components/Header';
import DashboardSummary from './components/DashboardSummary';
import ExpenseList from './components/ExpenseList';
import MonthlyExpenseTables from './components/MonthlyExpenseTables';
import YearlyExpenseChart from './components/YearlyExpenseChart';
import DownloadExpenses from './components/DownloadExpenses';
import AddExpenseModal from './components/AddExpenseModal';
import { ExpenseProvider } from './context/ExpenseContext';
import { ToastContainer } from 'react-toastify';
import { Plus } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ExpenseProvider>
      <div className="min-h-screen bg-slate-50 pb-20 relative">
        <Header />

        <main className="max-w-4xl mx-auto px-6 space-y-8">
          <DashboardSummary />
          <ExpenseList />
          <MonthlyExpenseTables />
          <YearlyExpenseChart />
          <DownloadExpenses />
        </main>

        <div className="fixed bottom-8 right-8 z-50 flex items-center justify-center group">
          {/* Circular Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none -m-4">
            <svg className="w-28 h-28 animate-[spin_8s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500" viewBox="0 0 100 100">
              <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
              <text className="fill-indigo-600 font-bold text-[11px] uppercase tracking-widest">
                <textPath href="#circlePath">
                  ADD EXPENSES • ADD EXPENSES •
                </textPath>
              </text>
            </svg>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 text-white p-4 rounded-full shadow-xl hover:bg-indigo-700 hover:scale-110 transition-all active:scale-95 relative z-10"
            aria-label="Add Expense"
          >
            <Plus size={32} />
          </button>
        </div>

        <AddExpenseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <ToastContainer position="bottom-right" theme="colored" />
      </div>
    </ExpenseProvider>
  );
}

export default App;
