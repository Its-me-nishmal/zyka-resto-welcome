import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Search, RefreshCw, Table as TableIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface AdminDashboardProps {
    credentials: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ credentials }) => {
    const [submissions, setSubmissions] = useState<any[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Pagination & Sorting State
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [sortBy, setSortBy] = useState('createdAt');
    const [order, setOrder] = useState<'asc' | 'desc'>('desc');
    const limit = 10;

    const fetchData = async () => {
        setLoading(true);
        try {
            const [subData, statsData] = await Promise.all([
                api.getSubmissions(credentials, { page, limit, sort: sortBy, order, filter: searchTerm }),
                api.getStats(credentials)
            ]);
            setSubmissions(subData.data);
            setTotal(subData.total);
            setStats(statsData);
        } catch (error) {
            console.error('Error fetching data', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [credentials, page, sortBy, order]);

    // Handle debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (page !== 1) setPage(1);
            else fetchData();
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const handleSort = (field: string) => {
        if (sortBy === field) {
            setOrder(order === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setOrder('desc');
        }
    };

    return (
        <div className="flex-1 flex flex-col min-h-screen bg-[#f8faf9] p-4">
            <div className="max-w-6xl mx-auto w-full">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-secondary uppercase tracking-tight">Analytics Dashboard</h1>
                        <p className="text-secondary/60">Real-time insights and customer leads</p>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => window.open(api.getExcelUrl(credentials), '_blank')}
                            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-green-700 transition-colors"
                        >
                            <TableIcon className="w-4 h-4" />
                            Excel
                        </button>
                    </div>
                </header>

                {/* Stats Grid */}
                {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-primary/10">
                            <p className="text-xs font-bold text-secondary/40 uppercase mb-1">Total Visits</p>
                            <h3 className="text-3xl font-black text-secondary">{stats.totalVisits}</h3>
                            <div className="mt-2 text-[10px] text-green-600 font-bold bg-green-50 px-2 py-1 rounded-full inline-block">
                                Live Tracking
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-primary/10">
                            <p className="text-xs font-bold text-secondary/40 uppercase mb-1">Total Submissions</p>
                            <h3 className="text-3xl font-black text-primary">{stats.totalSubmissions}</h3>
                            <div className="mt-2 text-[10px] text-primary/60 font-bold bg-primary/5 px-2 py-1 rounded-full inline-block">
                                {((stats.totalSubmissions / stats.totalVisits) * 100 || 0).toFixed(1)}% Conversion
                            </div>
                        </div>
                        {stats.sourceData?.slice(2, 4).map((src: any) => (
                            <div key={src.name} className="bg-white p-6 rounded-3xl shadow-sm border border-primary/10">
                                <p className="text-xs font-bold text-secondary/40 uppercase mb-1">{src.name.replace('_', ' ')}</p>
                                <h3 className="text-3xl font-black text-secondary">{src.submissions}</h3>
                                <p className="text-[10px] text-secondary/40 font-medium">from {src.visits} visits</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Question Distributions */}
                {stats?.distributions && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {Object.entries(stats.distributions).map(([key, data]) => (
                            <div key={key} className="bg-white p-6 rounded-3xl shadow-sm border border-primary/10">
                                <h4 className="text-xs font-black text-secondary uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </h4>
                                <div className="space-y-3">
                                    {Object.entries(data as Record<string, number>).map(([option, count]) => (
                                        <div key={option}>
                                            <div className="flex justify-between text-[10px] font-bold mb-1">
                                                <span className="text-secondary/60 truncate max-w-[150px]">{option}</span>
                                                <span className="text-primary">{count}</span>
                                            </div>
                                            <div className="h-1.5 bg-primary/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(count / stats.totalSubmissions) * 100}%` }}
                                                    className="h-full bg-primary rounded-full"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Submissions Table Section */}
                <div className="bg-white rounded-3xl shadow-sm border border-primary/10 overflow-hidden">
                    <div className="p-6 border-b border-primary/5 flex flex-col md:flex-row justify-between gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary/30" />
                            <input
                                type="text"
                                placeholder="Search by name, mobile, place or source..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-primary/5 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                            />
                        </div>
                        <button
                            onClick={fetchData}
                            className="flex items-center gap-2 text-primary font-bold hover:bg-primary/5 px-6 py-3 rounded-2xl transition-all"
                        >
                            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                            Sync Data
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-primary/5 text-secondary/60 text-[10px] font-black uppercase tracking-widest cursor-pointer">
                                    <th className="px-6 py-4 hover:text-primary transition-colors" onClick={() => handleSort('name')}>Customer</th>
                                    <th className="px-6 py-4">Contact</th>
                                    <th className="px-6 py-4 hover:text-primary transition-colors" onClick={() => handleSort('place')}>Place</th>
                                    <th className="px-6 py-4 hover:text-primary transition-colors" onClick={() => handleSort('source')}>Source</th>
                                    <th className="px-6 py-4 hover:text-primary transition-colors" onClick={() => handleSort('createdAt')}>Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-primary/5">
                                {submissions.length > 0 ? submissions.map((sub, i) => (
                                    <motion.tr
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.03 }}
                                        key={sub._id}
                                        className="hover:bg-primary/5 transition-colors group"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-secondary group-hover:text-primary transition-colors">{sub.name}</div>
                                            <div className="text-[10px] text-secondary/40 font-medium">{sub.favoriteFood}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-secondary/70 font-medium">{sub.mobile}</td>
                                        <td className="px-6 py-4 text-sm text-secondary/70 font-medium">{sub.place}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${sub.source?.includes('qrcode') ? 'bg-indigo-50 text-indigo-600' :
                                                sub.source === 'whatsapp' ? 'bg-green-50 text-green-600' :
                                                    'bg-gray-50 text-gray-500'
                                                }`}>
                                                {sub.source || 'direct'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-[10px] text-secondary/40 font-bold tabular-nums">
                                            {new Date(sub.createdAt).toLocaleString()}
                                        </td>
                                    </motion.tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-secondary/30 italic">
                                            {loading ? 'Crunching data...' : 'No relevant records found'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="p-6 border-t border-primary/5 flex items-center justify-between">
                        <p className="text-xs text-secondary/40 font-medium">
                            Showing <span className="text-secondary font-bold">{submissions.length}</span> of <span className="text-secondary font-bold">{total}</span> records
                        </p>
                        <div className="flex gap-2">
                            <button
                                disabled={page === 1 || loading}
                                onClick={() => setPage(p => p - 1)}
                                className="px-4 py-2 rounded-xl border border-primary/10 text-xs font-bold text-secondary hover:bg-primary/5 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                            >
                                Previous
                            </button>
                            <button
                                disabled={page * limit >= total || loading}
                                onClick={() => setPage(p => p + 1)}
                                className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 disabled:opacity-30 transition-all"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
