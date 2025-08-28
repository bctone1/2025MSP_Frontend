'use client';
import { useState, useEffect } from 'react';
import { formatDate, modalheader } from '@/utill/utill';
import "@/styles/projects.css"




export default function ProjectsPage({ onMenuClick, setprojectName }) {
  const [projects, setProjects] = useState([
    {
      id: "proj1",
      name: "파일분석하기",
      description: "PDF와 Excel 파일을 분석하여 인사이트 추출하는 AI 시스템",
      status: "진행중",
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

  const [newProject, setNewProject] = useState(false);


  return (
    <div className="app-container">
      <div className="container">

        <div className={`modal-overlay ${newProject ? 'active' : ''}`}>
          <NewProjectform setNewProject={setNewProject} />
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
                  onClick={() => { onMenuClick('assistant'), setprojectName("빠른대화") }}
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
                <button className={`filter-btn ${statusFilter === "active" ? "active" : ""}`} onClick={() => setStatusFilter("진행중")}>진행중</button>
                <button className={`filter-btn ${statusFilter === "planning" ? "active" : ""}`} onClick={() => setStatusFilter("계획중")}>계획중</button>
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
                  onClick={() => { onMenuClick('assistant'), setprojectName(selectedProject.name) }}
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

              <button className="new-conversation-btn"
                onClick={() => { onMenuClick('assistant'), setprojectName(selectedProject.name) }}
              >
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
            {/* <button
              className="action-btn"
              onClick={(e) => {
                e.stopPropagation();
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
            >🗑️</button> */}
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


function NewProjectform({ setNewProject }) {

  const llmList = [
    {
      id: 'gpt4',
      recommended: true,
      logo: '🧠',
      logoStyle: { background: 'linear-gradient(135deg, #10a37f, #1a7f64)', color: 'white' },
      name: 'GPT-4',
      desc: '강력한 추론 능력과 창의성을 가진 범용 모델. 복잡한 분석과 문제 해결에 최적화',
      features: ['강력한 추론', '창의적 사고', '범용성'],
    },
    {
      id: 'claude',
      logo: '📚',
      logoStyle: { background: 'linear-gradient(135deg, #cc785c, #b86647)', color: 'white' },
      name: 'Claude',
      desc: '긴 텍스트 처리와 정밀한 분석에 특화된 모델. 문서 작성과 상세한 분석 작업에 우수',
      features: ['긴 텍스트', '정밀 분석', '문서 작성'],
    },
    {
      id: 'gemini',
      logo: '💎',
      logoStyle: { background: 'linear-gradient(135deg, #4285f4, #34a853)', color: 'white' },
      name: 'Gemini Pro',
      desc: '코딩과 다국어 처리에 특화된 구글의 최신 모델. 멀티모달 데이터 처리 지원',
      features: ['코딩 특화', '다국어', '멀티모달'],
    },
    {
      id: 'custom',
      logo: '⚙️',
      logoStyle: { background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', color: 'white' },
      name: '커스텀 조합',
      desc: '작업별로 다른 모델을 조합하여 사용. 고급 사용자를 위한 맞춤형 설정',
      features: ['유연한 설정', '작업별 최적화', '고급 제어'],
    },
  ];

  const agentList = [
    { id: 'analyst', icon: '📊', name: '분석가', role: '데이터 분석 및 인사이트 도출' },
    { id: 'writer', icon: '✍️', name: '작성자', role: '문서 작성 및 내용 정리' },
    { id: 'reviewer', icon: '🔍', name: '검토자', role: '품질 검증 및 개선 제안' },
    { id: 'researcher', icon: '🔎', name: '연구원', role: '정보 수집 및 시장 조사' },
    { id: 'developer', icon: '💻', name: '개발자', role: '코드 작성 및 기술 구현' },
    { id: 'strategist', icon: '🎯', name: '전략가', role: '전략 수립 및 계획 설계' },
  ];

  const [selectedAgent, setselectedAgent] = useState('analyst');




  const [viewStatus, setViewStatus] = useState("section1");

  const handleNext = async () => {
    switch (viewStatus) {
      case "section1":
        alert("프로젝트 생성 백엔드로 요청");

        setNewProject(false);

        // setViewStatus("section2");
        break;
      case "section2":
        setViewStatus("section3");
        break;
      case "section3":
        setViewStatus("section4");
        break;
      case "section4":
        onMenuClick('dashboard');
        // try {
        //     const response = await axios.post("/api/create-project", {
        //         projectName: "새 프로젝트 이름",
        //         // 필요한 데이터 추가
        //     });
        //     console.log("서버 응답:", response.data);
        //     alert("프로젝트가 생성되었습니다! 🚀");
        // } catch (error) {
        //     console.error(error);
        //     alert("프로젝트 생성 중 오류가 발생했습니다.");
        // }
        break;
      default:
        break;
    }
  };

  const handlePrev = () => {
    switch (viewStatus) {
      case "section2":
        setViewStatus("section1");
        break;
      case "section3":
        setViewStatus("section2");
        break;
      case "section4":
        setViewStatus("section3");
        break;
      default:
        break;
    }
  };

  const renderNextButtonContent = () => {
    if (viewStatus === "section1") {
      return (
        <>
          <span>🚀</span>
          <span>프로젝트 생성</span>
        </>
      );
    } else {
      return (
        <>
          <span>다음</span>
          <span>→</span>
        </>
      );
    }
  };

  // const sectionOrder = ["section1", "section2", "section3", "section4"];
  const sectionOrder = ["section1"];
  const currentIndex = sectionOrder.indexOf(viewStatus);
  const progressPercent = ((currentIndex + 1) / sectionOrder.length) * 100;
  // const stepLabels = ["기본 정보", "AI 설정", "팀 구성", "지식베이스"];
  const stepLabels = ["기본 정보"];



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
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        {/* 단계 표시기 */}
        <div className="step-indicator">
          {sectionOrder.map((section, index) => {
            let stepClass = "inactive";
            if (index < currentIndex) stepClass = "completed";
            else if (index === currentIndex) stepClass = "active";

            return (
              <div className={`step ${stepClass}`} key={section}>
                <div className="step-number">{index + 1}</div>
                <span>{stepLabels[index]}</span>
              </div>
            );
          })}
        </div>

        {/* 모달 바디 */}
        <div className="modal-body">
          {/* 1단계: 기본 정보 */}
          <div className={`form-section ${viewStatus === 'section1' ? "active" : ""}`} id="section1">
            <h2 className="section-title">
              <span>📝</span>
              <span>기본 정보</span>
            </h2>
            <p className="section-subtitle">프로젝트의 이름과 목적을 설정해주세요</p>

            <div className="form-group">
              <label className="form-label">프로젝트 카테고리 (선택사항)</label>
              <select className="form-input" id="projectCategory">
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
              <input type="text" className="form-input" id="projectName" placeholder="예: Q4 매출 데이터 분석" maxLength="50" />
            </div>

            <div className="form-group">
              <label className="form-label">프로젝트 설명</label>
              <textarea className="form-input form-textarea" id="projectDescription" placeholder="프로젝트의 목적과 목표를 간단히 설명해주세요" maxLength="500"></textarea>
            </div>
          </div>

          {/* 2단계: AI 설정 */}
          <div className={`form-section ${viewStatus === 'section2' ? "active" : ""}`} id="section2">
            <h2 className="section-title">
              <span>🤖</span>
              <span>AI 모델 설정</span>
            </h2>
            <p className="section-subtitle">프로젝트에 적합한 AI 모델을 선택하세요</p>

            <div className="llm-grid">
              {llmList.map((llm) => (
                <div
                  key={llm.id}
                  className="llm-card"
                  onClick={() => selectLLM(llm.id)}
                >
                  {llm.recommended && <div className="llm-recommended">추천</div>}
                  <div className="llm-header">
                    <div className="llm-logo" style={llm.logoStyle}>{llm.logo}</div>
                    <div className="llm-name">{llm.name}</div>
                  </div>
                  <div className="llm-desc">{llm.desc}</div>
                  <div className="llm-features">
                    {llm.features.map((feature, idx) => (
                      <span key={idx} className="feature-tag">{feature}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="form-group">
              <label className="form-label">초기 시스템 프롬프트 (선택사항)</label>
              <textarea className="form-input form-textarea" id="systemPrompt" placeholder="AI에게 특별한 역할이나 작업 방식을 지시하고 싶다면 입력하세요"></textarea>
            </div>
          </div>

          {/* 3단계: 에이전트 팀 구성 */}
          <div className={`form-section ${viewStatus === 'section3' ? "active" : ""}`} id="section3">
            <h2 className="section-title">
              <span>👥</span>
              <span>에이전트 팀 구성</span>
            </h2>
            <p className="section-subtitle">프로젝트에 참여할 AI 에이전트들을 선택하세요</p>

            <div className="agent-grid">
              {agentList.map(agent => (
                <div
                  key={agent.id}
                  className={`agent-card ${selectedAgent === agent.id ? 'selected' : ''}`}
                  onClick={() => toggleAgent(agent.id)}
                >
                  <div className="agent-icon">{agent.icon}</div>
                  <div className="agent-name">{agent.name}</div>
                  <div className="agent-role">{agent.role}</div>
                </div>
              ))}
            </div>

            <div className="form-group">
              <label className="form-label">협업 방식 설정</label>
              <select className="form-input" id="collaborationMode">
                <option value="sequential">순차적 작업 (한 번에 하나씩)</option>
                <option value="parallel">병렬 작업 (동시 진행)</option>
                <option value="debate">토론 모드 (의견 교환 후 결정)</option>
                <option value="review">검토 체인 (단계별 검증)</option>
              </select>
            </div>
          </div>

          {/* 4단계: 지식베이스 설정 */}
          <div className={`form-section ${viewStatus === 'section4' ? "active" : ""}`} id="section4">
            <h2 className="section-title">
              <span>📚</span>
              <span>지식베이스 연결</span>
            </h2>
            <p className="section-subtitle">프로젝트에 필요한 문서나 데이터를 업로드하고 멀티모달 RAG로 처리하세요</p>

            <div className="upload-area"
              // onClick="document.getElementById('fileInput').click()" 
              id="uploadArea"
            >
              <div className="upload-icon">📁</div>
              <div className="upload-text">파일을 여기에 드래그하거나 클릭하여 업로드</div>
              <div className="upload-subtext">
                <strong>멀티모달 RAG 지원:</strong> PDF, Word, Excel, PowerPoint, 이미지 파일 (최대 50MB)
                <br />
                <span style={{
                  fontSize: "12px",
                  color: "var(--primary-blue)",
                  marginTop: "4px",
                  display: "block"
                }}>
                  🤖 자동으로 텍스트, 이미지, 표를 분리하여 벡터화 후 검색 가능한 지식베이스로 구축됩니다
                </span>
              </div>
              <input type="file" id="fileInput" multiple style={{ display: "none" }} accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.csv,.txt,.jpg,.jpeg,.png,.gif" />
            </div>




            {/* 파일 처리 상태 표시 */}
            <div
              className="file-processing-status"
              id="processingStatus"
              style={{ display: 'none' }}
            >
              <div
                style={{
                  background: 'rgba(59, 130, 246, 0.05)',
                  border: '1px solid rgba(59, 130, 246, 0.1)',
                  borderRadius: '12px',
                  padding: 'var(--spacing-4)',
                  marginBottom: 'var(--spacing-4)',
                }}
              >
                <h4
                  style={{
                    color: 'var(--primary-blue)',
                    marginBottom: 'var(--spacing-2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-2)',
                  }}
                >
                  <span>⚙️</span>
                  <span>멀티모달 RAG 처리 중...</span>
                </h4>

                <div
                  className="processing-steps-mini"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 'var(--spacing-2)',
                    marginBottom: 'var(--spacing-3)',
                  }}
                >
                  <div className="mini-step completed">
                    <div className="mini-step-icon">📄</div>
                    <div className="mini-step-text">파일 분석</div>
                  </div>
                  <div className="mini-step active">
                    <div className="mini-step-icon">🔍</div>
                    <div className="mini-step-text">콘텐츠 분리</div>
                  </div>
                  <div className="mini-step">
                    <div className="mini-step-icon">🧠</div>
                    <div className="mini-step-text">벡터 변환</div>
                  </div>
                  <div className="mini-step">
                    <div className="mini-step-icon">📚</div>
                    <div className="mini-step-text">RAG 등록</div>
                  </div>
                </div>

                <div
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--gray-600)',
                  }}
                >
                  • 텍스트 청킹: 45/67 완료 | 이미지 분석: 3/8 완료 | 표 구조화: 2/5 완료
                </div>
              </div>
            </div>






            <div className="file-list" id="fileList"></div>

            {/* RAG 처리 옵션 */}
            <div
              className="rag-options"
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '12px',
                padding: 'var(--spacing-4)',
                marginTop: 'var(--spacing-4)',
                border: '1px solid rgba(59, 130, 246, 0.1)',
              }}
            >
              <h4
                style={{
                  marginBottom: 'var(--spacing-3)',
                  color: 'var(--gray-700)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-2)',
                }}
              >
                <span>🎛️</span>
                <span>RAG 처리 설정</span>
              </h4>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 'var(--spacing-4)',
                  marginBottom: 'var(--spacing-3)',
                }}
              >
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: 'var(--text-sm)' }}>
                    청킹 전략
                  </label>
                  <select
                    className="form-input"
                    id="chunkingStrategy"
                    style={{
                      padding: 'var(--spacing-2)',
                      fontSize: 'var(--text-sm)',
                    }}
                  >
                    <option value="semantic">의미 기반 분할 (추천)</option>
                    <option value="fixed">고정 크기 분할</option>
                    <option value="adaptive">적응형 분할</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: 'var(--text-sm)' }}>
                    임베딩 모델
                  </label>
                  <select
                    className="form-input"
                    id="embeddingModel"
                    style={{
                      padding: 'var(--spacing-2)',
                      fontSize: 'var(--text-sm)',
                    }}
                  >
                    <option value="openai-ada">OpenAI Ada v2 (추천)</option>
                    <option value="sentence-transformers">
                      Sentence Transformers
                    </option>
                    <option value="cohere">Cohere Embed</option>
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: 'var(--text-sm)' }}>
                  <input
                    type="checkbox"
                    id="enableImageAnalysis"
                    defaultChecked
                    style={{ marginRight: 'var(--spacing-2)' }}
                  />
                  이미지 분석 활성화 (차트, 다이어그램, 표 등을 텍스트로 변환)
                </label>
              </div>
            </div>





            <div className="form-group">
              <label className="form-label">외부 데이터 소스 연결 (선택사항)</label>
              <input type="url" className="form-input" id="dataSource" placeholder="https://api.example.com 또는 데이터베이스 연결 정보" />
            </div>

            <div className="form-group">
              <label className="form-label">프로젝트 태그</label>
              <input type="text" className="form-input" id="projectTags" placeholder="태그를 쉼표로 구분하여 입력 (예: 데이터분석, Q4, 매출)" />
            </div>
          </div>
        </div>

        {/* 모달 푸터 */}
        <div className="modal-footer">
          <button
            className="btn-secondary"
            onClick={handlePrev}
            id="prevBtn"
            style={{ visibility: viewStatus === "section1" ? "hidden" : "visible" }}
          >
            <span>←</span>
            <span>이전</span>
          </button>

          <div style={{ display: "flex", gap: "1rem" }}>
            <button className="btn-secondary">
              <span>💾</span>
              <span>임시저장</span>
            </button>

            <button className="btn-primary" onClick={handleNext} id="nextBtn">
              {renderNextButtonContent()}
            </button>
          </div>
        </div>



      </div>


    </>
  );
}