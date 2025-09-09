'use client';

import React from 'react';
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";


export default function Sidebar({ onMenuClick, currentPage, setcurrentProject, view, setcurrentSession }) {
  const { data: session } = useSession();
  // console.log(data);



  const handleClick = (e) => {
    const item = e.currentTarget;
    const page = item.getAttribute('data-page');

    if (page === view) return console.log("현재 페이지입니다.");
    onMenuClick(page);

    setcurrentProject({});
    setcurrentSession({ id: 0 });

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
        <div className="nav-section">
          {[
            // { page: 'dashboard', icon: '📊', title: '대시보드', desc: '전체 현황' },
            // { page: 'projects', icon: '📁', title: '프로젝트 관리', desc: 'AI 프로젝트 관리' },
            // { page: 'knowledge', icon: '📚', title: '지식베이스', desc: 'RAG 파일 관리' },
            // { page: 'agents', icon: '🤖', title: 'AI Agent 관리', desc: '에이전트 생성 및 설정' },
            // { page: 'workflow', icon: '🔀', title: '워크플로우 디자이너', desc: '에이전트 연결 설계' },
            // { page: 'assistant', icon: '💬', title: 'AI 어시스턴트', desc: '멀티에이전트 대화' },
            // { page: 'history', icon: '📈', title: '히스토리', desc: '작업 기록 및 분석' },
            // { page: 'api-keys', icon: '🔗', title: 'API 키 관리', desc: 'API 연결 관리' },
            // { page: 'mcp', icon: '🔌', title: 'MCP 관리', desc: 'Model Context Protocol' },



            // { page: 'dashboard', icon: '🏠', title: '홈', desc: '대시보드 및 전체 현황' },
            { page: 'assistant', icon: '💬', title: 'AI 어시스턴트', desc: '멀티에이전트 대화' },
            { page: 'projects', icon: '📁', title: '프로젝트', desc: '프로젝트 생성 및 관리' },
            { page: 'knowledge', icon: '📚', title: '지식베이스', desc: '지식베이스 관리' },
            { page: 'history', icon: '📈', title: '히스토리', desc: '대화 기록 및 분석' },

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
        </div>


        <div className="nav-divider"></div>

        <div className="nav-section">
          <div className="nav-section-label">관리</div>

          <div className={`nav-item settings-dropdown ${currentPage === "profile" || currentPage === "agents" || currentPage === "api-keys" || currentPage === "mcp" ? "active" : ""}`}>
            <div className="nav-icon">⚙️</div>
            <div className="nav-text"
              data-page={'mcp'}
              onClick={handleClick}
            >
              <div className="nav-title">설정 및 관리</div>
              <div className="nav-desc">모든 관리 메뉴</div>
            </div>

            <div className="dropdown-content">
              {/* <div className="dropdown-item"
                data-page={'agents'}
                onClick={handleClick}
              >
                <span className="icon">🤖</span>
                <span className="text">AI Agent 관리</span>
              </div> */}

              {/* <div className="dropdown-item"
                data-page={'knowledge'}
                onClick={handleClick}
              >
                <span className="icon">📚</span>
                <span className="text">지식베이스 관리</span>
              </div> */}

              {/* <div className="dropdown-item"
                data-page={'api-keys'}
                onClick={handleClick}
              >
                <span className="icon">🔗</span>
                <span className="text">API 키 관리</span>
              </div> */}

              <div className="dropdown-item"
                data-page={'mcp'}
                onClick={handleClick}
              >
                <span className="icon">🔌</span>
                <span className="text">MCP 관리</span>
              </div>

              <div className="dropdown-item"
                data-page={'profile'}
                onClick={handleClick}
              >
                <span clss="icon">👤</span>
                <span className="text">프로필</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="user-section">
        <div className="user-info">
          <div className="user-avatar">
            <span>👤</span>
          </div>
          <div className="user-details">
            <div className="user-name">{session?.user?.name}</div>
            <div className="user-email">{session?.user?.email}</div>
          </div>
        </div>
        <button className="logout-btn" title="로그아웃"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <span>🚪</span>
        </button>
      </div>

    </div>
  );
}
