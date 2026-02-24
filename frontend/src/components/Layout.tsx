import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-orange-100 flex flex-col min-h-[600px]">
                <header className="bg-primary p-6 text-center">
                    <h1 className="text-3xl font-bold text-white tracking-widest font-display italic">ZYKA</h1>
                    <p className="text-orange-100 text-sm mt-1 uppercase tracking-tighter">Resto Café</p>
                </header>
                <main className="flex-1 p-6 flex flex-col">
                    {children}
                </main>
                <footer className="p-4 text-center text-xs text-secondary/40">
                    © 2026 ZYKA Resto Café. All rights reserved.
                </footer>
            </div>
        </div>
    );
};

export default Layout;
