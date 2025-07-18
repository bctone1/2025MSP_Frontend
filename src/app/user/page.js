'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import ProjectsPage from '@/components/projects-page';
import AgentsPage from '@/components/agents-page';
import WorkflowPage from '@/components/workflow-page';
import McpPage from '@/components/mcp-page';
import ApikeysPage from '@/components/api-keys-page';
import AssistantPage from '@/components/assistant-page';
import KnowledgePage from '@/components/knowledge-page';
import HistoryPage from '@/components/history-page';

// 필요한 다른 페이지 컴포넌트들도 import

export default function HomePage() {
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
      case 'projects':
        return <ProjectsPage />;
      // 나머지 view도 아래에 추가
      case 'agents':
        return <AgentsPage />;
      case 'workflow':
        return <WorkflowPage />;
      case 'mcp':
        return <McpPage />;
      case 'api-keys':
        return <ApikeysPage />;
      case 'assistant':
        return <AssistantPage />;
      case 'knowledge':
        return <KnowledgePage />;
      case 'history':
        return <HistoryPage onMenuClick={handleMenuClick} />;

      default:
        return <div>준비 중입니다: {view}</div>;
    }
  };

  return (
    <div className="flex">
      <Sidebar onMenuClick={handleMenuClick} currentPage={view} />
      <div className="flex-1 relative">
        {loading && (
          <div className={`loading-overlay${loading ? ' active' : ''}`}>
            <div className="loading-spinner text-center text-white">
              <div className="spinner"></div>
              <p>로딩 중...</p>
            </div>
          </div>
        )}
        <div className="p-4">

          {renderView()}

        </div>
      </div>
    </div>
  );
}