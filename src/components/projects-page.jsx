'use client';
import { useState, useEffect } from 'react';
import { formatDate, modalheader } from '@/utill/utill';



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

  const [newProject, setNewProject] = useState(false);




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
              <button className="primary-btn" id="create-project-btn"
                onClick={() => setNewProject(true)}
              >
                <span>+</span>
                <span>새 프로젝트</span>
              </button>
            </div>
          </div>
        </div>

        <div className={`modal-overlay ${newProject ? 'active' : ''}`}>
          <NewProjectform setNewProject={setNewProject} />
        </div>
        {/* {newProject && (<NewProjectform setNewProject={setNewProject} />)} */}


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
          <div className={viewMode === 'list' ? 'projects-list' : 'projects-grid'}>
            {filteredProjects.map((p) => (
              <ProjectRow
                key={p.id}
                viewMode={viewMode}
                project={p}
              />
            ))}

          </div>

        </div>

      </div>
    </div>
  );
}

function NewProjectform({ setNewProject }) {
  return (
    <>
      {/* <div className="modal-overlay active"> */}
      <div className="modal">
        {modalheader({ headerTitle: "새 프로젝트 생성", setModalClose: setNewProject })}

        <div className="modal-body">
          <form id="new-project-form" className="project-form">
            <div className="form-group">
              <label htmlFor="project-name">프로젝트 이름 *</label>
              <input type="text" id="project-name" name="name" required placeholder="프로젝트 이름을 입력하세요" />
            </div>

            <div className="form-group">
              <label htmlFor="project-description">설명</label>
              <textarea id="project-description" name="description" placeholder="프로젝트 설명을 입력하세요" rows="3"></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="project-model">AI 모델 *</label>
                <select id="project-model" name="model" required>
                  <option value="">모델 선택</option>
                  <option value="claude-3-opus">Claude 3 Opus</option>
                  <option value="claude-3-sonnet">Claude 3 Sonnet</option>
                  <option value="claude-3-haiku">Claude 3 Haiku</option>
                  <option value="gpt-4">GPT-4</option>
                  <option value="gpt-4-vision">GPT-4 Vision</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="project-budget">예상 예산 ($)</label>
                <input type="number" id="project-budget" name="budget" placeholder="0.00" step="0.01" min="0" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="project-tags">태그 (쉼표로 구분)</label>
              <input type="text" id="project-tags" name="tags" placeholder="예: 데이터분석, 자동화, 테스트" />
            </div>

            <div className="form-group">
              <label>
                <input type="checkbox" id="auto-start" name="autoStart" />
                프로젝트 생성 후 자동 시작
              </label>
            </div>
          </form>

        </div>


        <div className="modal-footer">
          <button type="button" className="secondary-btn" onClick={() => setNewProject(false)}>취소</button>
          <button type="button" className="primary-btn"
          //  onClick="ProjectManager.saveNewProject()"
          >생성</button>
        </div>


      </div>
      {/* </div> */}
    </>
  );
}



const getStatusInfo = (status) => {
  const statusMap = {
    active: { label: '진행중', color: '#10b981' },
    planning: { label: '계획중', color: '#f59e0b' },
    completed: { label: '완료', color: '#6366f1' },
    paused: { label: '일시정지', color: '#6b7280' }
  };
  return statusMap[status] || statusMap.planning;
}





function ProjectRow({ viewMode, project }) {
  const statusInfo = getStatusInfo(project.status);
  const [onview, setonView] = useState(false);
  const [onEdit, setonEdit] = useState(false);
  const [onDuplicate, setonDuplicate] = useState(false);
  const [onDelete, setonDelete] = useState(false);

  if (viewMode === 'list') {
    return (
      <>

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
                  onClick={() => setonView(true)}
                  // onClick={() => viewProject()}
                  title="보기"
                >
                  👁️
                </button>

                <button
                  className="action-btn"
                  onClick={() => setonEdit(true)}
                  title="편집"
                >
                  ✏️
                </button>
                <button
                  className="action-btn"
                  onClick={() => setonDuplicate(true)}
                  title="복제"
                >
                  📋
                </button>
                <button
                  className="action-btn"
                  onClick={() => setonDelete(true)}
                  title="삭제"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        </div>


        <div className={`modal-overlay ${onview ? 'active' : ''}`}>
          <ViewProject setonEdit={setonEdit} setonView={setonView} project={project} />
        </div>

        <div className={`modal-overlay ${onEdit ? 'active' : ''}`}>
          <ViewEdit setonEdit={setonEdit} project={project} />
        </div>
      </>
    )
  }

  return (
    <>

      <div className="project-card" data-project-id={project.id}>
        <div className="project-header">
          <div className="project-title">
            <h3>{project.name}</h3>
            <div className={`status-pill status-${project.status}`}>{statusInfo.label}</div>
          </div>
          <div className="project-actions">
            <button
              className="action-btn"
              onClick={() => setonView(true)}
              // onClick={() => viewProject()}
              title="보기"
            >
              👁️
            </button>

            <button
              className="action-btn"
              onClick={() => setonEdit(true)}
              title="편집"
            >
              ✏️
            </button>
            <button
              className="action-btn"
              onClick={() => setonDuplicate(true)}
              title="복제"
            >
              📋
            </button>
            <button
              className="action-btn"
              onClick={() => setonDelete(true)}
              title="삭제"
            >
              🗑️
            </button>
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


      <div className={`modal-overlay ${onview ? 'active' : ''}`}>
        <ViewProject setonEdit={setonEdit} setonView={setonView} project={project} />
      </div>

      <div className={`modal-overlay ${onEdit ? 'active' : ''}`}>
        <ViewEdit setonEdit={setonEdit} project={project} />
      </div>
    </>

  );


}




function ViewEdit({ setonEdit, project }) {
  const [formData, setFormData] = useState(project);
  return (
    <>
      {/* <div className="modal-overlay active"> */}
      <div className="modal">
        {modalheader({ headerTitle: "프로젝트 편집", setModalClose: setonEdit })}

        <div className="modal-body">
          <form id="edit-project-form" className="project-form">
            <div className="form-group">
              <label htmlFor="edit-project-name">프로젝트 이름 *</label>
              <input type="text" id="edit-project-name" name="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>

            <div className="form-group">
              <label htmlFor="edit-project-description">설명</label>
              <textarea
                id="edit-project-description"
                name="description"
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="edit-project-model">AI 모델 *</label>
                <select id="edit-project-model" name="model" required value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                >
                  <option value="claude-3-opus">Claude 3 Opus</option>
                  <option value="claude-3-sonnet">Claude 3 Sonnet</option>
                  <option value="claude-3-haiku">Claude 3 Haiku</option>
                  <option value="gpt-4">GPT-4</option>
                  <option value="gpt-4-vision">GPT-4 Vision</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="edit-project-status">상태</label>
                <select id="edit-project-status" name="status" required value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="planning">계획중</option>
                  <option value="active">진행중</option>
                  <option value="paused">일시정지</option>
                  <option value="completed">완료</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="edit-project-budget">예상 예산 ($)</label>
              <input type="number" id="edit-project-budget" name="budget" value={formData.estimatedCost} step="0.01" min="0"
                onChange={(e) => setFormData({ ...formData, estimatedCost: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-project-tags">태그 (쉼표로 구분)</label>
              <input type="text" id="edit-project-tags" name="tags" value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
            </div>
          </form>
        </div>


        <div className="modal-footer">
          <button type="button" className="secondary-btn" onClick={() => setonEdit(false)}>취소</button>
          <button type="button" className="primary-btn"
          // onClick="ProjectManager.saveEditedProject('${project.id}')"
          >저장</button>
        </div>


      </div>
      {/* </div> */}

    </>
  );
}


function ViewProject({ setonEdit, setonView, project }) {
  return (
    // <div className="modal-overlay active">
    <div className="modal">

      {modalheader({ headerTitle: "프로젝트 상세", setModalClose: setonView })}

      <div className="modal-body">
        <div className="project-detail">
          <div className="project-detail-header">
            <div className="project-title">
              <h2>{project.name}</h2>
              <div className={`status-pill status-${project.status}`}>{getStatusInfo(project.status).label}</div>
            </div>
            <div className="project-meta">
              <span>생성: {formatDate(project.created, 'YYYY-MM-DD HH:mm')}</span>
              <span>수정: {formatDate(project.updated, 'YYYY-MM-DD HH:mm')}</span>
            </div>
          </div>

          <div className="project-description">
            <h4>설명</h4>
            <p>${project.description || '설명이 없습니다.'}</p>
          </div>

          <div className="project-progress-detail">
            <h4>진행 상황</h4>
            <div className="progress-bar large">
              <div className="progress-fill" style={{ width: `${project.progress}%` }}></div>
            </div>
            <div className="progress-stats">
              <div className="stat">
                <span className="stat-label">전체 작업</span>
                <span className="stat-value">{project.tasks.total}</span>
              </div>
              <div className="stat">
                <span className="stat-label">완료</span>
                <span className="stat-value">{project.tasks.completed}</span>
              </div>
              <div className="stat">
                <span className="stat-label">남은 작업</span>
                <span className="stat-value">{project.tasks.remaining}</span>
              </div>
            </div>
          </div>

          <div className="project-info-grid">
            <div className="info-item">
              <h4>AI 모델</h4>
              <p>{project.model}</p>
            </div>
            <div className="info-item">
              <h4>사용 에이전트</h4>
              <div className="agents-list">
                {project.agents.length > 0 ? (
                  project.agents.map(agent => (
                    <span className="agent-tag" key={agent}>{agent}</span>
                  ))
                ) : (
                  <span className="no-data">설정된 에이전트가 없습니다</span>
                )}
              </div>

            </div>
            <div className="info-item">
              <h4>예산 및 비용</h4>
              <div className="cost-info">
                <div>예상: ${project.estimatedCost}</div>
                <div>실제: ${project.actualCost}</div>
              </div>
            </div>
            <div className="info-item">
              <h4>태그</h4>
              <div className="tags-list">
                {project.tags.length > 0 ?
                  project.tags.map(tag => (<span className="tag" key={tag}>{tag}</span>)) : (<span className="no-data">태그가 없습니다</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <button type="button" className="secondary-btn"
          onClick={() => setonEdit(true)}
        >편집</button>
        <button type="button" className="secondary-btn"
          onClick={() => setonView(false)}
        >닫기</button>
        <button type="button" className="primary-btn"
        // onClick="ProjectManager.manageProject('${project.id}')"
        >관리</button>
      </div>
    </div>
    // </div>
  );
}
