'use client';
import { useState, useEffect, useRef } from 'react';
import { formatDate, modalheader } from '@/utill/utill';
import "@/styles/projects.css"
import { useSession } from "next-auth/react";

export default function ProjectsPage({ onMenuClick, setcurrentProject, setcurrentSession }) {
  const { data: session } = useSession();
  const [projects, setProjects] = useState([]);
  const hasFetched = useRef(false); // 한번 호출했는지 체크


  const fetchProjects = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/MSP_PROJECT/msp_read_user_project`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: session?.user?.id }),
    });
    const data = await response.json();
    if (response.ok) {
      setProjects(data.projects);
      console.log(data);
    } else {
      alert("프로젝트 오류발생");
    }
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchProjects();
  }, [session]);


  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const [viewStatus, setviewStatus] = useState("block");
  const [currentPorject, setcurrentPorject] = useState('');
  const selectedProject = projects.find(p => p.id === currentPorject);
  const [newProject, setNewProject] = useState(false);


  return (

    <div className="container">

      <div className={`modal-overlay ${newProject ? 'active' : ''}`}>
        <NewProjectform setNewProject={setNewProject} fetchProjects={fetchProjects} />
      </div>



      <div className="projects-container" id="projects-container" style={{ display: viewStatus }}>
        <div className="header">
          <div className="header-title">
            <div>
              <h1 className="page-title">프로젝트 관리</h1>
              <p className="page-subtitle">AI 프로젝트를 생성하고 대화 히스토리를 관리하세요</p>
            </div>
            <div className="header-controls">
              <button className="primary-btn"
                // onClick={() => onMenuClick('newproject')}
                onClick={() => setNewProject(true)}
              >
                <span>+</span>
                <span>새 프로젝트</span>
              </button>
              <button
                className="quick-chat-btn"
                onClick={() => { onMenuClick('assistant'), setcurrentProject({ name: "빠른대화" }) }}
              >
                <span>💬</span>
                <span>빠른 대화</span>
              </button>
            </div>
          </div>
        </div>


        {/* 검색 및 필터 섹션  */}
        <div className="search-filter-section">
          <div className="search-controls">
            <div className="projects-search-box">
              <span className="search-icon">🔍</span>
              <input type="text" className="projects-search-input" placeholder="프로젝트 이름, 설명으로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="filter-buttons">
              <button className={`filter-btn ${statusFilter === "all" ? "active" : ""}`} onClick={() => setStatusFilter("all")}>전체</button>
              <button className={`filter-btn ${statusFilter === "active" ? "active" : ""}`} onClick={() => setStatusFilter("active")}>active</button>
              <button className={`filter-btn ${statusFilter === "deactive" ? "active" : ""}`} onClick={() => setStatusFilter("deactive")}>deactive</button>
            </div>
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((p) => (
            <ProjectRow
              key={p.id}
              project={p}
              setviewStatus={setviewStatus}
              setcurrentPorject={setcurrentPorject}
            />
          ))}
        </div>
      </div>




      <div id="project-detail-view" className={`project-detail-view ${viewStatus === "block" ? "" : "active"}`}>
        <button className="back-btn" onClick={() => setviewStatus("block")}>
          <span>←</span>
          <span>프로젝트 목록으로</span>
        </button>

        <div className="project-detail-header">
          <div className="re-project-info">
            <div className="project-details">
              <h1 className="project-name" id="detail-project-name">{selectedProject ? selectedProject.name : "프로젝트 이름"}</h1>
              <p className="project-desc" id="detail-project-desc">{selectedProject ? selectedProject.description : "프로젝트 설명"}</p>
              <div className="project-stats">
                <div className="stat-item">
                  <span className="stat-label">대화 세션</span>
                  <span className="stat-value" id="detail-sessions">{selectedProject ? selectedProject.conversations.length : "프로젝트 세션"}회</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">총 비용</span>
                  <span className="stat-value" id="detail-cost">{selectedProject ? selectedProject.cost : "프로젝트 비용"}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">상태</span>
                  <span className="stat-value" id="detail-status">{selectedProject ? selectedProject.status : "프로젝트 상태"}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">지식베이스</span>
                  <span className="stat-value" id="detail-knowledge">{selectedProject ? selectedProject.knowledge.length : "프로젝트 지식베이스"}개</span>
                </div>
              </div>
            </div>
            <div className="project-actions-detail">
              <button className="action-btn-detail primary"
                onClick={() => { onMenuClick('assistant'), setcurrentProject(selectedProject) }}
              >
                <span>💬</span>
                <span>새 대화 시작</span>
              </button>
              <button className="action-btn-detail"
                onClick={() => alert("프로젝트 편집 시작")}
              >
                <span>✏️</span>
                <span>프로젝트 편집</span>
              </button>
              <button className="action-btn-detail"
                onClick={() => onMenuClick('knowledge')}
              >
                <span>📚</span>
                <span>지식베이스 관리</span>
              </button>
              {/* <button className="action-btn-detail">
                  <span>📤</span>
                  <span>프로젝트 내보내기</span>
                </button> */}
            </div>
          </div>
        </div>

        <div className="content-section">
          <div className="main-content">
            <h2 className="section-title">
              <span>💬</span>
              <span>대화 히스토리</span>
            </h2>

            <button className="new-conversation-btn"
              onClick={() => { onMenuClick('assistant'), setcurrentProject(selectedProject) }}
            >
              <span>💬</span>
              <span>새 대화 시작</span>
            </button>

            <div className="conversations-list" id="conversations-list">
              {/* 대화 목록이 여기에 동적으로 삽입됩니다 */}
              {/* {<RenderConversations conversations={selectedProject?.conversations || []} setcurrentProject={setcurrentProject} onMenuClick={onMenuClick} />} */}
              {<RenderConversations selectedProject={selectedProject} setcurrentProject={setcurrentProject} onMenuClick={onMenuClick} setcurrentSession={setcurrentSession} />}
            </div>
          </div>

          <div className="sidebar-content">
            <h3 className="section-title">
              <span>📚</span>
              <span>지식베이스</span>
            </h3>

            <div className="knowledge-base" id="knowledge-base">
              {/* 지식베이스 항목들이 여기에 동적으로 삽입됩니다 */}
              {<RenderKnowledgeBase knowledge={selectedProject?.knowledge || []} />}
            </div>

            <button className="add-knowledge-btn"
            // onclick="addKnowledge()"
            >
              <span>+</span>
              <span>지식베이스 추가</span>
            </button>
          </div>
        </div>
      </div>

    </div>

  );
}

function RenderKnowledgeBase({ knowledge }) {
  return (
    <>
      {!knowledge && (
        <div className="empty-state">
          <div className="empty-icon">📚</div>
          <div className="empty-title">지식베이스가 비어있습니다</div>
          <div className="empty-description">파일을 업로드하여 AI가 참조할 수 있도록 하세요.</div>
        </div>
      )}

      {knowledge.map((item, index) => (
        <div className="knowledge-item" key={index}>
          <div className="knowledge-header">
            <div className="knowledge-icon">{getFileIcon(item.type)}</div>
            <div className="knowledge-name">{item.name}</div>
            <div className="knowledge-type">{item.type}</div>
          </div>
          <div className="knowledge-details">
            <span>{item.size}</span>
            <span>•</span>
            <span>{item.uploaded}</span>
          </div>
        </div>
      ))}

    </>
  );
}

function RenderConversations({ selectedProject, setcurrentProject, onMenuClick, setcurrentSession }) {
  const conversations = selectedProject?.conversations || []
  return (
    <>
      {!conversations && (
        <div className="empty-state">
          <div className="empty-icon">💬</div>
          <div className="empty-title">아직 대화가 없습니다</div>
          <div className="empty-description">새 대화를 시작하여 AI와 프로젝트에 대해 이야기해보세요.</div>
        </div>
      )}

      {conversations.map((conv, index) => {
        const date = new Date(conv.date);
        date.setHours(date.getHours() + 9);
        return (
          <div className="conversation-item" key={index}
            onClick={() => { onMenuClick('assistant'), setcurrentProject(selectedProject), setcurrentSession(conv.id) }}
          >
            <div className="conversation-header">
              <div className="conversation-title">{conv.title}</div>
              <div className="conversation-meta">
                <span>{conv.messages}개 메시지</span>
                <span>•</span>
                <span>
                  {date.toLocaleString("ko-KR", {
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </span>
              </div>
            </div>
            <div className="conversation-preview">{conv.preview}</div>
          </div >
        )
      })}

    </>
  );
}

function ProjectRow({ project, setviewStatus, setcurrentPorject }) {
  const status = getStatusInfo(project.status);
  return (
    <>
      <div className="project-card" data-project-id={project.id}
        onClick={() => {
          setviewStatus("none");
          setcurrentPorject(project.id);
        }}
      >
        <div className="project-header">
          <div className="msp-project-title">
            <h3>{project.name}</h3>
            <div className={`status-pill status-${status}`}>{project.status}</div>
          </div>
          <div className="project-actions">
            {/* <button
              className="action-btn"
              onClick={(e) => {
                e.stopPropagation();
                setonEdit(true);
              }}
              title="편집"
            >✏️</button> */}
            <button
              className="action-btn"
              onClick={(e) => {
                e.stopPropagation();
                alert("삭제요청")
              }}
              title="삭제"
            >🗑️</button>
          </div>
        </div>

        <div className="project-description">
          {project.description}
        </div>

        <div className="msp-project-meta">
          <div className="msp-meta-item">
            <span className="meta-label">대화 세션</span>
            <span className="meta-value">{project.conversations.length}</span>
          </div>
          <div className="msp-meta-item">
            <span className="meta-label">총 비용</span>
            <span className="meta-value">{project.cost}</span>
          </div>
        </div>
      </div>
    </>
  );
}



const getStatusInfo = (status) => {
  const statusMap = {
    active: 'active',
    deactive: 'paused',
    planning: 'planning',
    completed: 'completed',
    paused: 'paused',
    진행중: 'active',
    계획중: 'planning',
    완료: 'completed',
    일시정지: 'paused'
  };
  return statusMap[status] || 'planning';
};



function getFileIcon(type) {
  const icons = {
    'Excel': '📊',
    'PDF': '📄',
    'CSV': '📈',
    'Image': '🖼️',
    'Document': '📝',
    'Archive': '🗜️'
  };
  return icons[type] || '📎';
}


function NewProjectform({ setNewProject, fetchProjects }) {
  const { data: session } = useSession();

  const [newPrfSetting, setnewPrfSetting] = useState({
    // user_id: 1,
    name: "",
    category: "",
    description: "",
    status: "진행",
    cost: "",
  });
  const handleCreate = async () => {
    console.log(session);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/MSP_PROJECT/msp_create_project`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: session?.user?.id,
          name: newPrfSetting.name,
          category: newPrfSetting.category,
          description: newPrfSetting.description,
          status: newPrfSetting.status,
          cost: newPrfSetting.cost,
        }),
      });
      const data = await response.json();
      if (data.status) {
        alert(data.response);
        fetchProjects();
        setNewProject(false);
      }


    } catch (error) {
      console.error(error);
      alert("프로젝트 생성 중 오류가 발생했습니다.");
    }
  };


  return (
    <>
      <div className="modal-container">
        {/* 모달 헤더 */}
        <div className="new-modal-header">
          <h1 className="modal-title">새 프로젝트 생성</h1>
          <p className="modal-subtitle">AI 프로젝트를 설정하고 시작하세요</p>
          <button className="close-btn"
            onClick={() => setNewProject(false)}
          >×</button>
        </div>

        {/* 진행률 표시 */}
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: "100%" }}
          ></div>
        </div>

        {/* 단계 표시기 */}
        <div className="step-indicator">
          <div className="step active">
            <div className="step-number">1</div>
            <span>기본 정보</span>
          </div>
        </div>

        {/* 모달 바디 */}
        <div className="modal-body">
          {/* 1단계: 기본 정보 */}
          <div className="form-section active" id="section1">
            <h2 className="section-title">
              <span>📝</span>
              <span>기본 정보</span>
            </h2>
            <p className="section-subtitle">프로젝트의 이름과 목적을 설정해주세요</p>

            <div className="form-group">
              <label className="form-label">프로젝트 카테고리 (선택사항)</label>
              <select className="form-input" id="projectCategory" value={newPrfSetting.category}
                onChange={(e) =>
                  setnewPrfSetting((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
              >
                <option value="">카테고리를 선택하세요</option>
                <option value="data-analysis">📊 데이터 분석</option>
                <option value="document-writing">📝 문서 작성</option>
                <option value="research">🔍 리서치</option>
                <option value="coding">💻 코딩</option>
                <option value="business">💼 비즈니스</option>
                <option value="creative">🎨 창작</option>
                <option value="education">📚 교육</option>
                <option value="other">🔧 기타</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">프로젝트명</label>
              <input type="text" className="form-input" id="projectName" placeholder="예: Q4 매출 데이터 분석" maxLength="50" value={newPrfSetting.name}
                onChange={(e) =>
                  setnewPrfSetting((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
            </div>

            <div className="form-group">
              <label className="form-label">프로젝트 설명</label>
              <textarea className="form-input form-textarea" id="projectDescription" placeholder="프로젝트의 목적과 목표를 간단히 설명해주세요" maxLength="500" value={newPrfSetting.description}
                onChange={(e) =>
                  setnewPrfSetting((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              ></textarea>
            </div>
          </div>
        </div>

        {/* 모달 푸터 */}
        <div className="modal-footer">
          <button className="btn-primary" onClick={handleCreate} id="nextBtn">
            <span>🚀</span>
            <span>프로젝트 생성</span>
          </button>
        </div>

      </div>


    </>
  );
}