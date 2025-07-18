'use client';

import React from 'react';

export default function Sidebar({ onMenuClick, currentPage }) {
  const handleClick = (e) => {
    const item = e.currentTarget;
    const page = item.getAttribute('data-page');
    onMenuClick(page);
  };

  return (
    <div className="sidebar" id="sidebar">
      <div className="logo">
        <div className="logo-icon">🤖</div>
        <div className="logo-text">
          <h1>META LLM MSP</h1>
          <p>PRO 플랜</p>
        </div>
      </div>

      <nav className="nav-menu">
        {[
          { page: 'dashboard', icon: '📊', title: '대시보드', desc: '전체 현황' },
          { page: 'projects', icon: '📁', title: '프로젝트 관리', desc: 'AI 프로젝트 관리' },
          { page: 'knowledge', icon: '📚', title: '지식베이스', desc: 'RAG 파일 관리' },
          { page: 'agents', icon: '🤖', title: 'AI Agent 관리', desc: '에이전트 생성 및 설정' },
          { page: 'workflow', icon: '🔀', title: '워크플로우 디자이너', desc: '에이전트 연결 설계' },
          { page: 'assistant', icon: '💬', title: 'AI 어시스턴트', desc: '멀티에이전트 대화' },
          { page: 'history', icon: '📈', title: '히스토리', desc: '작업 기록 및 분석' },
          { page: 'api-keys', icon: '🔗', title: 'API 키 관리', desc: 'API 연결 관리' },



          { page: 'mcp', icon: '🔌', title: 'MCP 관리', desc: 'Model Context Protocol' },
          
          
          
          
        ].map(({ page, icon, title, desc }) => (
          <div
            key={page}
            className={`nav-item ${currentPage === page ? 'active' : ''}`}
            data-page={page}
            onClick={handleClick}
          >
            <div className="nav-icon">{icon}</div>
            <div className="nav-text">
              <div className="nav-title">{title}</div>
              <div className="nav-desc">{desc}</div>
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}
