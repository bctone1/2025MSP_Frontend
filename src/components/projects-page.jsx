'use client';
import { useState, useEffect } from 'react';
import { formatDate } from '@/utill/utill';



export default function ProjectsPage() {

  const [viewMode, setviewMode] = useState('list');

  const [projects, setProjects] = useState([
    {
      id: 'proj_001',
      name: '파일분석하기',
      description: 'PDF와 Excel 파일을 분석하여 인사이트 추출',
      status: 'active',
      progress: 75,
      tasks: {
        total: 12,
        completed: 9,
        remaining: 3
      },
      model: 'claude-3-haiku',
      created: '2024-06-20T09:00:00Z',
      updated: '2024-06-24T14:30:00Z',
      agents: ['🔍 리서치 에이전트', '📊 분석 에이전트'],
      tags: ['데이터분석', '자동화'],
      estimatedCost: 15.50,
      actualCost: 12.75
    },
    {
      id: 'proj_002',
      name: '파일업로드 test',
      description: '다양한 파일 형식 업로드 및 처리 테스트',
      status: 'active',
      progress: 50,
      tasks: {
        total: 8,
        completed: 4,
        remaining: 4
      },
      model: 'claude-3-sonnet',
      created: '2024-06-22T10:15:00Z',
      updated: '2024-06-24T11:45:00Z',
      agents: ['💻 코딩 에이전트'],
      tags: ['테스트', '파일처리'],
      estimatedCost: 8.00,
      actualCost: 4.25
    },
    {
      id: 'proj_003',
      name: '사업계획서 작성',
      description: 'AI 기반 사업계획서 자동 생성 시스템',
      status: 'planning',
      progress: 20,
      tasks: {
        total: 15,
        completed: 3,
        remaining: 12
      },
      model: 'gpt-4',
      created: '2024-06-24T08:00:00Z',
      updated: '2024-06-24T16:20:00Z',
      agents: ['📝 작성 에이전트', '📊 분석 에이전트'],
      tags: ['문서작성', '비즈니스'],
      estimatedCost: 25.00,
      actualCost: 5.50
    },
    {
      id: 'proj_004',
      name: '고객 상담 봇',
      description: '24시간 고객 응대가 가능한 AI 챗봇 개발',
      status: 'completed',
      progress: 100,
      tasks: {
        total: 20,
        completed: 20,
        remaining: 0
      },
      model: 'claude-3-opus',
      created: '2024-06-10T14:00:00Z',
      updated: '2024-06-18T17:30:00Z',
      agents: ['💬 대화 에이전트', '🧠 추론 에이전트'],
      tags: ['고객서비스', '챗봇'],
      estimatedCost: 45.00,
      actualCost: 42.30
    },
    {
      id: 'proj_005',
      name: '이미지 분류 시스템',
      description: '제품 이미지를 자동으로 분류하는 AI 시스템',
      status: 'paused',
      progress: 35,
      tasks: {
        total: 18,
        completed: 6,
        remaining: 12
      },
      model: 'gpt-4-vision',
      created: '2024-06-15T16:30:00Z',
      updated: '2024-06-20T10:15:00Z',
      agents: ['👁️ 비전 에이전트', '🏷️ 분류 에이전트'],
      tags: ['이미지분석', '분류'],
      estimatedCost: 35.00,
      actualCost: 18.75
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [modelFilter, setModelFilter] = useState('all');

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchesModel = modelFilter === 'all' || p.model === modelFilter;

    return matchesSearch && matchesStatus && matchesModel;
  });




  return (
    <div className="app-container">
      <div className="container">

        <div className="header">
          <div className="header-title">
            <div>
              <h1 className="page-title">프로젝트 관리</h1>
              <p className="page-subtitle">AI 프로젝트를 생성하고 관리하세요</p>
            </div>
            <div className="header-controls">
              <button className="primary-btn" id="create-project-btn">
                <span>+</span>
                <span>새 프로젝트</span>
              </button>
            </div>
          </div>
        </div>


        <div className="projects-toolbar">
          <div className="toolbar-left">
            <div className="search-container">
              <div className="search-input-wrapper">
                <input
                  type="text"
                  className="search-input"
                  placeholder="프로젝트 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="search-icon">🔍</div>
              </div>
            </div>

            <div className="filter-group">
              <select
                className="filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">모든 상태</option>
                <option value="active">진행중</option>
                <option value="planning">계획중</option>
                <option value="completed">완료</option>
                <option value="paused">일시정지</option>
              </select>


              <select
                className="filter-select"
                value={modelFilter}
                onChange={(e) => setModelFilter(e.target.value)}
              >
                <option value="all">모든 모델</option>
                <option value="claude-3-opus">Claude 3 Opus</option>
                <option value="claude-3-sonnet">Claude 3 Sonnet</option>
                <option value="claude-3-haiku">Claude 3 Haiku</option>
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-4-vision">GPT-4 Vision</option>
              </select>

            </div>
          </div>

          <div className="toolbar-right">
            <div className="sort-controls">
              <select className="sort-select" id="sort-by">
                <option value="created">생성일</option>
                <option value="updated">수정일</option>
                <option value="name">이름</option>
                <option value="progress">진행률</option>
                <option value="cost">비용</option>
              </select>
              <button className="sort-order-btn" id="sort-order">
                <span id="sort-icon">↓</span>
              </button>
            </div>

            <div className="view-toggle">
              <button className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                data-view="list" title="리스트 보기"
                onClick={() => setviewMode('list')}
              >☰</button>
              <button className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                data-view="grid" title="그리드 보기"
                onClick={() => setviewMode('grid')}
              >⊞</button>
            </div>
          </div>
        </div>



        <div className="projects-stats">
          <div className="stat-item">
            <span className="stat-label">전체</span>
            <span className="stat-value">{projects.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">진행중</span>
            <span className="stat-value">{projects.filter(p => p.status === 'active').length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">완료</span>
            <span className="stat-value">{projects.filter(p => p.status === 'completed').length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">총 비용</span>
            <span className="stat-value">${projects.reduce((sum, p) => sum + p.actualCost, 0).toFixed(2)}</span>
          </div>
        </div>

        <div className="projects-container" id="projects-container">
          {viewMode === 'list' ? (
            <div className="projects-list">
              {filteredProjects.map((p) => (
                <ProjectRow
                  key={p.id}
                  project={p}
                  onEdit={(id) => console.log('편집:', id)}
                  onDuplicate={(id) => console.log('복제:', id)}
                  onDelete={(id) => console.log('삭제:', id)}
                />
              ))}
            </div>
          ) : (
            <div className="projects-grid">
              {filteredProjects.map((p) => (
                <Projectcard
                  key={p.id}
                  project={p}
                  onEdit={(id) => console.log('편집:', id)}
                  onDuplicate={(id) => console.log('복제:', id)}
                  onDelete={(id) => console.log('삭제:', id)}
                />
              ))}
            </div>
          )}

        </div>




      </div>
    </div>
  );
}

const getStatusInfo = (status) => {
  const map = {
    active: { label: '진행중' },
    planning: { label: '계획중' },
    completed: { label: '완료' },
    paused: { label: '일시정지' }
  };
  return map[status] || { label: '알수없음' };
};



function Projectcard({ project, onEdit, onDuplicate, onDelete }) {
  const statusInfo = getStatusInfo(project.status);

  return (
    <div className="project-card" data-project-id={project.id}>
      <div className="project-header">
        <div className="project-title">
          <h3>{project.name}</h3>
          <div className={`status-pill status-${project.status}`}>{statusInfo.label}</div>
        </div>
        <div className="project-actions">
          <button className="action-btn" onClick={() => onEdit(project.id)} title="편집">✏️</button>
          <button className="action-btn" onClick={() => onDuplicate(project.id)} title="복제">📋</button>
          <button className="action-btn" onClick={() => onDelete(project.id)} title="삭제">🗑️</button>
        </div>
      </div>

      <div className="project-description">{project.description}</div>

      <div className="project-progress">
        <div className="progress-header">
          <span>진행률</span>
          <span>{project.progress}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${project.progress}%` }}></div>
        </div>
        <div className="progress-tasks">
          {project.tasks.completed}/{project.tasks.total} 작업 완료
        </div>
      </div>

      <div className="project-meta">
        <div className="meta-item">
          <span className="meta-label">모델</span>
          <span className="meta-value">{project.model}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">비용</span>
          <span className="meta-value">${project.actualCost}</span>
        </div>
      </div>

      <div className="project-agents">
        {project.agents.map((agent, i) => (
          <span className="agent-tag" key={i}>{agent}</span>
        ))}
      </div>

      <div className="project-footer">
        <div className="project-tags">
          {project.tags.map((tag, i) => (
            <span className="tag" key={i}>{tag}</span>
          ))}
        </div>
        <div className="project-date">
          {formatDate(project.updated, 'MM/DD HH:mm')}
        </div>
      </div>
    </div>
  );
}

function ProjectRow({ project, onEdit, onDuplicate, onDelete }) {
  const statusInfo = getStatusInfo(project.status);

  return (
    // < div className='projects-list'></div>
    <div className="project-row" data-project-id={project.id}>
      <div className="row-main">
        <div className="row-left">
          <div className="project-info">
            <div className="project-name">
              <h3>{project.name}</h3>
              <div className={`status-pill status-${project.status}`}>
                {statusInfo.label}
              </div>
            </div>
            <div className="project-description">{project.description}</div>
            <div className="project-meta-inline">
              <span className="meta-item">📊 {project.model}</span>
              <span className="meta-item">👥 {project.agents.length}개 에이전트</span>
              <span className="meta-item">💰 ${project.actualCost}</span>
              <span className="meta-item">🕒 {formatDate(project.updated, 'MM/DD HH:mm')}</span>
            </div>
          </div>
        </div>

        <div className="row-center">
          <div className="progress-section">
            <div className="progress-info">
              <span className="progress-percentage">{project.progress}%</span>
              <span className="progress-tasks">
                {project.tasks.completed}/{project.tasks.total}
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="row-right">
          <div className="project-tags">
            {project.tags.map((tag, i) => (
              <span key={i} className="tag">
                {tag}
              </span>
            ))}
          </div>
          <div className="project-actions">
            <button
              className="action-btn"
              onClick={() => onView(project.id)}
              title="보기"
            >
              👁️
            </button>
            <button
              className="action-btn"
              onClick={() => onEdit(project.id)}
              title="편집"
            >
              ✏️
            </button>
            <button
              className="action-btn"
              onClick={() => onDuplicate(project.id)}
              title="복제"
            >
              📋
            </button>
            <button
              className="action-btn"
              onClick={() => onDelete(project.id)}
              title="삭제"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  )

}

