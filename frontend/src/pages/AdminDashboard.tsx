import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Search, RefreshCw, FileText, Table as TableIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface AdminDashboardProps {
    credentials: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ credentials }) => {
    const [submissions, setSubmissions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchSubmissions = async () => {
        setLoading(true);
        try {
            const data = await api.getSubmissions(credentials);
            setSubmissions(data);
        } catch (error) {
            console.error('Error fetching submissions', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, [credentials]);

    const filteredSubmissions = submissions.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.mobile.includes(searchTerm) ||
        s.place.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex-1 flex flex-col min-h-screen bg-orange-50/50 p-4">
            <div className="max-w-6xl mx-auto w-full">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-secondary uppercase tracking-tight">Admin Dashboard</h1>
                        <p className="text-secondary/60">Manage and export customer leads</p>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => window.open(api.getExcelUrl(credentials), '_blank')}
                            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-green-700 transition-colors"
                        >
                            <TableIcon className="w-4 h-4" />
                            Excel
                        </button>
                        <button
                            onClick={() => window.open(api.getPDFUrl(credentials), '_blank')}
                            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-red-700 transition-colors"
                        >
                            <FileText className="w-4 h-4" />
                            PDF
                        </button>
                    </div>
                </header>

                <div className="bg-white rounded-3xl shadow-sm border border-orange-100 overflow-hidden">
                    <div className="p-6 border-b border-orange-50 flex flex-col md:flex-row justify-between gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary/30" />
                            <input
                                type="text"
                                placeholder="Search by name, mobile or place..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-orange-50/50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        </div>
                        <button
                            onClick={fetchSubmissions}
                            className="flex items-center gap-2 text-primary font-bold hover:bg-orange-50 px-4 py-2 rounded-2xl transition-all"
                        >
                            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                            Refresh
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-orange-50/30 text-secondary/60 text-xs font-bold uppercase tracking-wider">
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4">Contact</th>
                                    <th className="px-6 py-4">Place</th>
                                    <th className="px-6 py-4">Favorite</th>
                                    <th className="px-6 py-4">Reward</th>
                                    <th className="px-6 py-4">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-orange-50">
                                {filteredSubmissions.length > 0 ? filteredSubmissions.map((sub, i) => (
                                    <motion.tr
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        key={sub._id || i}
                                        className="hover:bg-orange-50/20 transition-colors"
                                    >
                                        <td className="px-6 py-4 font-bold text-secondary">{sub.name}</td>
                                        <td className="px-6 py-4 text-secondary/70">{sub.mobile}</td>
                                        <td className="px-6 py-4 text-secondary/70">{sub.place}</td>
                                        <td className="px-6 py-4 text-secondary/70">{sub.favoriteFood}</td>
                                        <td className="px-6 py-4">
                                            <span className="bg-orange-100 text-primary px-3 py-1 rounded-full text-xs font-black uppercase">
                                                {sub.reward}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-secondary/40 whitespace-nowrap">
                                            {new Date(sub.createdAt).toLocaleDateString()}
                                        </td>
                                    </motion.tr>
                                )) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-secondary/30 italic">
                                            {loading ? 'Crunching data...' : 'No submissions found'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
