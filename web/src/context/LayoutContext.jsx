import { createContext, useContext, useState } from 'react';

const LayoutContext = createContext({
    isSidebarCollapsed: false,
    setSidebarCollapsed: () => { },
    toggleSidebar: () => { },
});

export const LayoutProvider = ({ children }) => {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [isChatOpen, setChatOpen] = useState(false); // Global chat state

    const toggleSidebar = () => setSidebarCollapsed(prev => !prev);
    const toggleChat = () => setChatOpen(prev => !prev);

    return (
        <LayoutContext.Provider value={{
            isSidebarCollapsed,
            setSidebarCollapsed,
            toggleSidebar,
            isChatOpen,
            setChatOpen,
            toggleChat
        }}>
            {children}
        </LayoutContext.Provider>
    );
};

export const useLayout = () => useContext(LayoutContext);
