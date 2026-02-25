import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen bg-[#f8faf9] flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-primary/10 flex flex-col min-h-[600px]">
                <header className="bg-white p-6 pb-2 text-center flex flex-col items-center">
                    <img src="/logo.jpeg" alt="ZYKA Logo" className="h-20 w-auto object-contain" />
                </header>
                <main className="flex-1 p-6 pt-0 flex flex-col">
                    {children}
                </main>
                <footer className="p-4 text-center text-xs text-secondary/30">
                    © 2026 ZYKA Resto Café. All rights reserved.
                </footer>
            </div>
        </div>
    );
};

export default Layout;
