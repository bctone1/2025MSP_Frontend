'use client';
import { useState, useEffect } from 'react';
import { formatDate, modalheader } from '@/utill/utill';
import "@/styles/projects.css"



export default function ProjectsPage({ onMenuClick }) {
  const [projects, setProjects] = useState([
    {
      id: "proj1",
      name: "파일분석하기",
      description: "PDF와 Excel 파일을 분석하여 인사이트 추출하는 AI 시스템",
      status: "진행중",
      sessions: 8,
      cost: "$12.75",
      conversations: [
        {
          id: "conv1",
          title: "Q4 매출 데이터 심화 분석",
          status: "active",
          date: "2시간 전",
          preview: "Q4 매출 데이터를 업로드하여 트렌드 분석과 예측 모델링을 진행하고 있습니다. 특히 지역별 성과 차이가 흥미롭네요...",
          messages: 24
        },
        {
          id: "conv2",
          title: "경쟁사 비교 분석 요청",
          status: "completed",
          date: "어제",
          preview: "업계 주요 경쟁사 3곳의 재무제표를 비교 분석하여 우리 회사의 포지셔닝을 확인했습니다.",
          messages: 18
        },
        {
          id: "conv3",
          title: "초기 데이터 업로드 및 분석",
          status: "completed",
          date: "3일 전",
          preview: "첫 번째 Excel 파일을 업로드하고 기본적인 데이터 구조 분석을 수행했습니다.",
          messages: 12
        }
      ],
      knowledge: [
        { id: "kb1", name: "Q4_Sales_Report.xlsx", type: "Excel", size: "2.4MB", uploaded: "2일 전" },
        { id: "kb2", name: "Market_Analysis.pdf", type: "PDF", size: "1.8MB", uploaded: "1주 전" },
        { id: "kb3", name: "Competitor_Data.csv", type: "CSV", size: "856KB", uploaded: "3일 전" }
      ]
    },
    {
      id: "proj2",
      name: "파일업로드 test",
      description: "다양한 파일 형식 업로드 및 처리 테스트",
      status: "진행중",
      sessions: 3,
      cost: "$4.25",
      conversations: [
        {
          id: "conv1",
          title: "이미지 파일 업로드 테스트",
          status: "active",
          date: "30분 전",
          preview: "PNG, JPG, SVG 파일들의 업로드 테스트를 진행하고 있습니다. 파일 크기 제한과 변환 옵션을 확인 중...",
          messages: 8
        },
        {
          id: "conv2",
          title: "대용량 파일 처리 개선",
          status: "completed",
          date: "2일 전",
          preview: "100MB 이상의 대용량 파일 처리 성능을 개선하기 위한 청크 업로드 방식을 구현했습니다.",
          messages: 15
        }
      ],
      knowledge: [
        { id: "kb1", name: "test_image.png", type: "Image", size: "3.2MB", uploaded: "1시간 전" },
        { id: "kb2", name: "large_dataset.zip", type: "Archive", size: "45MB", uploaded: "2일 전" }
      ]
    },
    {
      id: "proj3",
      name: "사업계획서 작성",
      description: "AI 기반 사업계획서 자동 생성 시스템",
      status: "계획중",
      sessions: 1,
      cost: "$5.50",
      conversations: [
        {
          id: "conv1",
          title: "사업계획서 초안 작성",
          status: "completed",
          date: "1시간 전",
          preview: "AI 스타트업을 위한 사업계획서 초안을 작성했습니다. 시장 분석, 비즈니스 모델, 재무 계획이 포함되어 있습니다.",
          messages: 22
        }
      ],
      knowledge: [
        { id: "kb1", name: "Business_Template.docx", type: "Document", size: "1.2MB", uploaded: "2시간 전" },
        { id: "kb2", name: "Market_Research.pdf", type: "PDF", size: "4.1MB", uploaded: "1일 전" }
      ]
    }
  ]);


  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [modelFilter, setModelFilter] = useState('all');

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchesModel = modelFilter === 'all' || (p.model && p.model === modelFilter);

    return matchesSearch && matchesStatus && matchesModel;
  });

  const [viewStatus, setviewStatus] = useState("block");
  const [currentPorject, setcurrentPorject] = useState('');

  const selectedProject = projects.find(p => p.id === currentPorject);

  return (
    <div className="app-container">
      <div className="container">



        <div className="projects-container" id="projects-container" style={{ display: viewStatus }}>
          <div className="header">
            <div className="header-title">
              <div>
                <h1 className="page-title">프로젝트 관리</h1>
                <p className="page-subtitle">AI 프로젝트를 생성하고 대화 히스토리를 관리하세요</p>
              </div>
              <div className="header-controls">
                <button className="primary-btn" onClick={() => onMenuClick('newproject')}>
                  <span>+</span>
                  <span>새 프로젝트</span>
                </button>
                <button className="quick-chat-btn">
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
                <button className={`filter-btn ${statusFilter === "active" ? "active" : ""}`} onClick={() => setStatusFilter("active")}>진행중</button>
                <button className={`filter-btn ${statusFilter === "planning" ? "active" : ""}`} onClick={() => setStatusFilter("planning")}>계획중</button>
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
                    <span className="stat-value" id="detail-sessions">{selectedProject ? selectedProject.sessions : "프로젝트 세션"}회</span>
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
                //  onclick="startNewConversation()"
                >
                  <span>💬</span>
                  <span>새 대화 시작</span>
                </button>
                <button className="action-btn-detail"
                // onclick="editCurrentProject()"
                >
                  <span>✏️</span>
                  <span>프로젝트 편집</span>
                </button>
                <button className="action-btn-detail"
                // onclick="manageKnowledge()"
                >
                  <span>📚</span>
                  <span>지식베이스 관리</span>
                </button>
                <button className="action-btn-detail"
                // onclick="exportProject()"
                >
                  <span>📤</span>
                  <span>프로젝트 내보내기</span>
                </button>
              </div>
            </div>
          </div>

          <div className="content-section">
            <div className="main-content">
              <h2 className="section-title">
                <span>💬</span>
                <span>대화 히스토리</span>
              </h2>

              <button className="new-conversation-btn" >
                <span>💬</span>
                <span>새 대화 시작</span>
              </button>

              <div className="conversations-list" id="conversations-list">
                {/* 대화 목록이 여기에 동적으로 삽입됩니다 */}
                {<RenderConversations conversations={selectedProject?.conversations || []} />}
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

function RenderConversations({ conversations }) {
  return (
    <>
      {!conversations && (
        <div className="empty-state">
          <div className="empty-icon">💬</div>
          <div className="empty-title">아직 대화가 없습니다</div>
          <div className="empty-description">새 대화를 시작하여 AI와 프로젝트에 대해 이야기해보세요.</div>
        </div>
      )}

      {conversations.map((conv, index) => (
        <div className="conversation-item" key={index}>
          <div className="conversation-header">
            <div>
              <div className="conversation-title">{conv.title}</div>
              <div className="conversation-meta">
                <span>{conv.messages}개 메시지</span>
                <span>•</span>
                <span>{conv.date}</span>
              </div>
            </div>
            <div className={`conversation-status ${conv.status}`}>
              {conv.status === 'active' ? '진행중' : '완료'}
            </div>
          </div>
          <div className="conversation-preview">{conv.preview}</div>
        </div >
      ))
      }

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
            <button
              className="action-btn"
              onClick={(e) => {
                e.stopPropagation();  // 이벤트 버블링 막기
                setonEdit(true);
              }}
              title="편집"
            >✏️</button>

            <button
              className="action-btn"
              onClick={(e) => {
                e.stopPropagation();
                setonDelete(true);
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
            <span className="meta-value">{project.sessions}</span>
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