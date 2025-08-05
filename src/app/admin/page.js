'use client';
import { useState } from 'react';

// import "@/adminStyle/agents.css";
// import "@/adminStyle/analytics.css";
// import "@/adminStyle/billing.css";
// import "@/adminStyle/common.css";
// import "@/adminStyle/dashboard.css";
// import "@/adminStyle/history.css";
// import "@/adminStyle/knowledge.css";
// import "@/adminStyle/logs.css";
// import "@/adminStyle/mcp.css";
// import "@/adminStyle/providers.css";
import "@/adminStyle/settings.css";
// import "@/adminStyle/users.css";

import Sidebar from '@/adminComponents/Sidebar';
import Dashboard from '@/adminComponents/Dashboard';
import Users from '@/adminComponents/Users';
import Providers from '@/adminComponents/Providers';
import Agents from '@/adminComponents/Agent';
import Mcp from '@/adminComponents/Mcp';
import History from '@/adminComponents/History';
import Billing from '@/adminComponents/Billing';

export default function AdminPage() {
    const [view, setView] = useState('dashboard');
    const [loading, setLoading] = useState(false);
    const handleMenuClick = (newView) => {
        if (view === newView) return; // 동일한 뷰 클릭 시 무시
        setLoading(true);
        setTimeout(() => {
            setView(newView);
            setLoading(false);
        }, 500);
    };

    const renderView = () => {
        switch (view) {
            case 'dashboard':
                return <Dashboard onMenuClick={handleMenuClick} />;
            case 'users':
                return <Users />;
            case 'providers':
                return <Providers />;
            case 'agents':
                return <Agents />;
            case 'mcp':
                return <Mcp />;
            case 'history':
                return <History />;
            case 'billing':
                return <Billing />;
            // case 'agents':
            //     return <AgentsPage />;
            // case 'workflow':
            //     return <WorkflowPage />;
            // case 'mcp':
            //     return <McpPage />;
            // case 'api-keys':
            //     return <ApikeysPage />;
            // case 'assistant':
            //     return <AssistantPage />;
            // case 'knowledge':
            //     return <KnowledgePage />;
            // case 'history':
            //     return <HistoryPage onMenuClick={handleMenuClick} />;

            default:
                return <div>준비 중입니다: {view}</div>;
        }
    };

    return (
        <div className="admin-container">
            <div className="sidebar">
                <Sidebar onMenuClick={handleMenuClick} currentPage={view} />
            </div>

            {loading && (

                <div className={`loading-overlay${loading ? ' active' : ''}`}>
                    <div className="loading-spinner text-center text-white">
                        <div className="spinner"></div>
                        <p>로딩 중...</p>
                    </div>
                </div>
            )}


            <div className="main-content">
                {renderView()}
            </div>
        </div>
    );
}