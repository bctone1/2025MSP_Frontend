'use client';
import { useState, useEffect, useRef } from 'react';
import { formatDate, storage, formatFileSize, modalheader } from '@/utill/utill';
import "@/styles/assistant-page.css"

export default function AssistantPage() {
    const [chatMode, setChatMode] = useState('multi');
    const [settings, setSettings] = useState({
        maxTokens: 4000,
        temperature: 0.7,
        autoSave: true,
        showTyping: true,
        soundEnabled: true
    });
    const [currentConversationId, setCurrentConversationId] = useState(null);

    const [conversations, setConversations] = useState([
        {
            id: 'conv_001',
            title: '프로젝트 기획 논의',
            agents: ['researcher', 'analyst'],
            messages: [
                {
                    id: 'msg_001',
                    type: 'user',
                    content: 'AI 기반 쇼핑몰 추천 시스템을 만들고 싶어요. 어떻게 시작해야 할까요?',
                    timestamp: '2024-06-24T16:30:00Z',
                    attachments: []
                },
                {
                    id: 'msg_002',
                    type: 'agent',
                    agentId: 'researcher',
                    content: '훌륭한 아이디어네요! AI 추천 시스템 개발을 위해 먼저 시장 조사를 해보겠습니다.\n\n현재 인기 있는 추천 알고리즘:\n1. 협업 필터링 (Collaborative Filtering)\n2. 콘텐츠 기반 필터링\n3. 하이브리드 방식\n4. 딥러닝 기반 추천\n\n먼저 어떤 종류의 상품을 다루실 예정인가요?',
                    timestamp: '2024-06-24T16:31:15Z',
                    attachments: []
                },
                {
                    id: 'msg_003',
                    type: 'agent',
                    agentId: 'analyst',
                    content: '추천 시스템의 성공을 위해서는 데이터 분석이 핵심입니다.\n\n필요한 데이터:\n• 사용자 행동 데이터 (클릭, 구매, 체류시간)\n• 상품 정보 (카테고리, 가격, 설명)\n• 사용자 프로필 (연령, 성별, 지역)\n• 계절성 및 트렌드 데이터\n\n성과 지표(KPI):\n• CTR (Click-Through Rate)\n• CVR (Conversion Rate)\n• 평균 주문 금액\n• 사용자 만족도',
                    timestamp: '2024-06-24T16:32:30Z',
                    attachments: []
                }
            ],
            created: '2024-06-24T16:30:00Z',
            updated: '2024-06-24T16:32:30Z',
            tags: ['프로젝트', 'AI', '추천시스템']
        }
    ]);

    const availableAgents = {
        'researcher': {
            name: '🔍 리서치 에이전트',
            description: '웹 검색 및 데이터 수집 전문',
            color: '#3B82F6',
            capabilities: ['웹검색', '데이터수집', '정보분석'],
            model: 'claude-3-haiku',
            systemPrompt: '당신은 정확한 정보 검색과 분석을 전문으로 하는 AI 어시스턴트입니다.'
        },
        'coder': {
            name: '💻 코딩 에이전트',
            description: '프로그래밍 및 코드 최적화',
            color: '#10B981',
            capabilities: ['코드생성', '디버깅', '리팩토링', '코드리뷰'],
            model: 'claude-3-sonnet',
            systemPrompt: '당신은 다양한 프로그래밍 언어와 프레임워크에 능숙한 개발 전문 AI입니다.'
        },
        'analyst': {
            name: '📊 분석 에이전트',
            description: '데이터 분석 및 시각화',
            color: '#8B5CF6',
            capabilities: ['데이터분석', '통계처리', '시각화', '보고서작성'],
            model: 'claude-3-opus',
            systemPrompt: '당신은 데이터 분석과 인사이트 도출을 전문으로 하는 AI 어시스턴트입니다.'
        },
        'writer': {
            name: '✍️ 작성 에이전트',
            description: '콘텐츠 작성 및 편집',
            color: '#F59E0B',
            capabilities: ['글쓰기', '편집', '번역', '요약'],
            model: 'claude-3-sonnet',
            systemPrompt: '당신은 창의적이고 정확한 글쓰기를 전문으로 하는 AI 어시스턴트입니다.'
        },
        'translator': {
            name: '🌐 번역 에이전트',
            description: '다국어 번역 및 언어 분석',
            color: '#EF4444',
            capabilities: ['번역', '언어분석', '문화적맥락', '다국어지원'],
            model: 'claude-3-haiku',
            systemPrompt: '당신은 정확하고 자연스러운 번역을 제공하는 다국어 전문 AI입니다.'
        },
        'creative': {
            name: '🎨 창작 에이전트',
            description: '창의적 콘텐츠 생성',
            color: '#EC4899',
            capabilities: ['창작', '아이디어', '스토리텔링', '디자인제안'],
            model: 'claude-3-opus',
            systemPrompt: '당신은 창의적이고 독창적인 아이디어를 생성하는 AI 어시스턴트입니다.'
        }
    }

    const [activeAgents, setActiveAgents] = useState([]);

    useEffect(() => {
        const saved = storage.get('active_agents', ['researcher', 'coder']);
        const filtered = saved.filter(agentId => availableAgents[agentId]);
        setActiveAgents(filtered);
    }, []);

    useEffect(() => {
        if (conversations.length > 0 && currentConversationId === null) {
            setCurrentConversationId(conversations[0].id);
        }
    }, [conversations, currentConversationId]);


    const knowledgeItems = [
        {
            id: 'kb_001',
            name: 'AI 개발 가이드.pdf',
            description: 'AI 시스템 개발을 위한 종합 가이드 문서',
            category: 'documents',
            size: 2450000,
            status: 'completed',
            chunks: 145,
            queries: 23,
            tokens: 12450,
            tags: ['가이드', 'AI', '개발'],
            color: '#3b82f6'
        },
        {
            id: 'kb_002',
            name: '마케팅 전략 데이터.xlsx',
            description: '2024년 2분기 마케팅 전략 및 성과 분석 데이터',
            category: 'spreadsheets',
            size: 1200000,
            status: 'completed',
            chunks: 67,
            queries: 15,
            tokens: 8750,
            tags: ['마케팅', '데이터', '분석'],
            color: '#10b981'
        },
        {
            id: 'kb_003',
            name: 'API 문서.md',
            description: 'RESTful API 상세 문서 및 사용 예제',
            category: 'code',
            size: 350000,
            status: 'processing',
            chunks: 0,
            queries: 0,
            tokens: 0,
            tags: ['API', '문서', '개발'],
            color: '#f59e0b'
        },
        {
            id: 'kb_004',
            name: '제품 프레젠테이션.pptx',
            description: '신제품 출시 전략 및 마케팅 계획 프레젠테이션',
            category: 'presentations',
            size: 4500000,
            status: 'failed',
            chunks: 0,
            queries: 0,
            tokens: 0,
            tags: ['제품', '프레젠테이션', '런칭'],
            color: '#8b5cf6'
        },
        {
            id: 'kb_005',
            name: '사용자 매뉴얼.pdf',
            description: '제품 사용자 매뉴얼 최신 버전',
            category: 'documents',
            size: 1800000,
            status: 'indexing',
            chunks: 89,
            queries: 2,
            tokens: 9200,
            tags: ['매뉴얼', '사용자', '가이드'],
            color: '#3b82f6'
        }
    ];
    const selectedKnowledgeItems = ['kb_001', 'kb_002'];

    // 카테고리 아이콘 맵핑
    const categoryIcons = {
        'documents': '📄',
        'presentations': '📊',
        'spreadsheets': '📈',
        'code': '💻',
        'images': '🖼️',
        'audio': '🎵',
        'video': '🎬',
        'other': '📎'
    };

    // 상태 아이콘 맵핑
    const statusIcons = {
        'completed': '✅',
        'processing': '⚙️',
        'failed': '❌',
        'pending': '⏳',
        'indexing': '🔍'
    };
    const [AgentEdit, setAgentEdit] = useState(false);
    const [RagEdit, setRagEdit] = useState(false);

    const fileInputRef = useRef(null);

    // 버튼 클릭 시 파일 선택창 열기
    const handleFileSelect = () => {
        fileInputRef.current.click();
    };

    // 파일 선택 후 동작
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log("선택된 파일:", file.name);
            // 여기서 업로드 로직 추가 가능
        }
    };

    const [Agent, setAgent] = useState(false);

    return (
        <>
            <div className={`modal-overlay ${Agent ? 'active' : ''}`}>
                <AgentHandler setAgent={setAgent} />
            </div>



            <div className="assistant_container">
                {/* 헤더 */}
                <div className="header">
                    <div className="header-title">
                        <div>
                            <h1 className="page-title">AI 어시스턴트</h1>
                            <p className="page-subtitle" id="page-subtitle">멀티 에이전트와 함께 협업하세요</p>
                        </div>
                        <div className="header-controls">
                            {/* <div className="chat-mode-toggle">
                                <button className={`mode-btn ${chatMode === 'single' ? 'active' : ''}`}
                                    data-mode="single"
                                    onClick={() => setChatMode("single")}
                                >
                                    단일 대화
                                </button>
                                <button className={`mode-btn ${chatMode === 'multi' ? 'active' : ''}`}
                                    onClick={() => setChatMode("multi")}
                                    data-mode="multi"
                                >
                                    멀티 에이전트
                                </button>
                            </div> */}
                            <button className="primary-btn" id="new-conversation-btn">
                                <span>+</span>
                                <span>새 대화</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* 멀티 에이전트 모드 콘텐츠 */}
                <div className={`assistant-layout multi-agent ${chatMode === "multi" ? "" : "hidden"}`} id="multi-agent-layout">
                    {/* 좌측 통합 사이드바 */}
                    <div className="chat-sidebar">


                        <div className="sidebar-section">
                            <h3 className="sidebar-title">
                                <span>🧠</span>
                                <span>AI 모델</span>
                            </h3>
                            <select className="llm-selector" id="llm-selector">
                                <option value="claude-3-opus">Claude 3 Opus</option>
                                <option value="claude-3-sonnet">Claude 3 Sonnet</option>
                                <option value="claude-3-haiku">Claude 3 Haiku</option>
                                <option value="gpt-4">GPT-4</option>
                                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                                <option value="gemini-pro">Gemini Pro</option>
                            </select>
                            <div className="llm-info" id="llm-info">
                                <div className="llm-name">Claude 3 Sonnet</div>
                                <div className="llm-description">균형잡힌 성능과 속도로 대부분의 작업에 적합한 모델입니다.</div>
                            </div>
                        </div>

                        <div className="sidebar-section">
                            <h3 className="sidebar-title">
                                <span>💬</span>
                                <span>대화 목록</span>
                            </h3>
                            <div className="conversations-list" id="multi-conversations-list">
                                <div className="conversation-item">
                                    <div className="conversation-header">
                                        <div className="conversation-title">프로젝트 기획 논의</div>
                                        <div className="conversation-time">01:32</div>
                                    </div>
                                    <div className="conversation-preview">주인 시스템의 성능을 위해서는 데이터 ...</div>
                                </div>
                            </div>
                        </div>

                        {/* 지식베이스 섹션 */}
                        <div className="sidebar-section knowledge-section">
                            <h3 className="sidebar-title">
                                <span>📚</span>
                                <span>지식베이스</span>
                                <button className="manage-knowledge-btn"
                                    onClick={handleFileSelect}
                                >첨부</button>

                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                    onChange={handleFileChange}
                                />
                            </h3>
                            <p className="knowledge-count">📁 첨부된 파일 (0개)</p>

                            <div className="knowledge-files">
                                <div className="empty-knowledge">
                                    <div className="empty-icon">📚</div>
                                    <p>이 대화에 지식베이스 파일을 첨부하여<br />더 정확한 답변을 받아보세요</p>
                                    <button className="select-knowledge-btn"
                                        onClick={handleFileSelect}
                                    >
                                        파일 첨부하기
                                    </button>
                                </div>
                            </div>

                            <div className="knowledge-help">
                                <p
                                    style={{
                                        fontSize: "var(--text-xs)",
                                        color: "var(--gray-500)",
                                        marginTop: "var(--spacing-3)",
                                        textAlign: "center",
                                        lineHeight: 1.4,
                                    }}
                                >
                                    💡 PDF, DOCX, TXT 등의 문서를 첨부하면<br />
                                    에이전트들이 해당 내용을 참조하여 답변합니다
                                </p>
                            </div>
                        </div>

                        <div className="sidebar-section">
                            <h3 className="sidebar-title">
                                <span>🤖</span>
                                <span>활성 에이전트</span>
                                <button className="manage-agents-btn"
                                    onClick={() => setAgent(true)}
                                >관리</button>
                            </h3>
                            <div className="active-agents-list" id="active-agents-list">
                                <div className="agent-item">
                                    <div className="agent-avatar" style={{ background: "#3b82f6" }}>🔍</div>
                                    <div className="agent-info">
                                        <div className="agent-name">📍 리서치 에이전트</div>
                                        <div className="agent-description">웹 검색 및 데이터 수집 전문</div>
                                        <div className="agent-model">claude-3-haiku</div>
                                    </div>
                                    <div className="agent-status">
                                        <div className="status-dot"></div>
                                    </div>
                                </div>

                                <div className="agent-item">
                                    <div className="agent-avatar" style={{ background: "#10b981" }}>💻</div>
                                    <div className="agent-info">
                                        <div className="agent-name">📍 코딩 에이전트</div>
                                        <div className="agent-description">프로그래밍 및 코드 최적화</div>
                                        <div className="agent-model">claude-3-sonnet</div>
                                    </div>
                                    <div className="agent-status">
                                        <div className="status-dot"></div>
                                    </div>
                                </div>

                                <div className="agent-item">
                                    <div className="agent-avatar" style={{ background: "#8b5cf6" }}>📊</div>
                                    <div className="agent-info">
                                        <div className="agent-name">📍 분석 에이전트</div>
                                        <div className="agent-description">데이터 분석 및 인사이트 도출</div>
                                        <div className="agent-model">claude-3-sonnet</div>
                                    </div>
                                    <div className="agent-status">
                                        <div className="status-dot"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 채팅 영역 */}
                    <div className="chat-main">
                        <div className="chat-header">
                            <div className="chat-info">
                                <div className="chat-title" id="multi-chat-title">멀티 에이전트 협업</div>
                                <div className="chat-agents" id="chat-agents">
                                    <div className="chat-agent-badge" style={{ background: "#3b82f6" }}>🔍 리서치 에이전트</div>
                                    <div className="chat-agent-badge" style={{ background: "#10b981" }}>💻 코딩 에이전트</div>
                                    <div className="chat-agent-badge" style={{ background: "#8b5cf6" }}>📊 분석 에이전트</div>
                                </div>
                            </div>
                            <div className="chat-controls">
                                <button className="control-btn" title="대화 지우기">🗑️</button>
                                <button className="control-btn" title="설정">⚙️</button>
                            </div>
                        </div>

                        <div className="chat-messages" id="multi-chat-messages">
                            <div className="message user-message">
                                <div className="message-avatar user-avatar">👤</div>
                                <div className="message-content">
                                    <div className="message-header">
                                        <div className="message-sender">사용자</div>
                                        <div className="message-time">01:32</div>
                                    </div>
                                    <div className="message-text">
                                        주인 시스템의 성능을 위해서는 데이터 분석이 핵심입니다.
                                        <br /><br />
                                        보유한 데이터:
                                        <br />• 사용자 행동 데이터 (클릭, 구매, 체류시간)
                                        <br />• 상품 정보 (카테고리, 가격, 설명)
                                        <br />• 사용자 프로필 (연령, 성별, 지역)
                                        <br />• 계절성 및 트렌드 데이터
                                        <br /><br />
                                        성과 지표(KPI):
                                        <br />• CTR (Click-Through Rate)
                                        <br />• CVR (Conversion Rate)
                                        <br />• 평균 주문 금액
                                        <br />• 사용자 만족도
                                    </div>
                                </div>
                            </div>

                            <div className="message">
                                <div className="message-avatar agent-avatar-msg">🔍</div>
                                <div className="message-content">
                                    <div className="message-header">
                                        <div className="message-sender">🔍 리서치 에이전트</div>
                                        <div className="message-time">01:33</div>
                                    </div>
                                    <div className="message-text">
                                        네, 제공해주신 데이터와 KPI를 바탕으로 시장 조사를 진행했습니다.
                                        <br /><br />
                                        📚 참조 문서: 업로드된 지식베이스 파일을 기반으로 답변드리겠습니다.
                                        <br /><br />
                                        조사 결과:
                                        <br />1. 경쟁사 분석 및 시장 트렌드
                                        <br />2. 사용자 행동 패턴 연구
                                        <br />3. 업계 벤치마크 데이터 수집
                                        <br /><br />
                                        분석 전문가에게 데이터를 전달하겠습니다.
                                    </div>
                                </div>
                            </div>

                            <div className="message">
                                <div className="message-avatar agent-avatar-msg">📊</div>
                                <div className="message-content">
                                    <div className="message-header">
                                        <div className="message-sender">📊 분석 에이전트</div>
                                        <div className="message-time">01:34</div>
                                    </div>
                                    <div className="message-text">
                                        리서치 에이전트가 수집한 데이터를 분석했습니다.
                                        <br /><br />
                                        분석 결과:
                                        <br />1. 사용자 세그멘테이션 분석
                                        <br />2. 구매 패턴 및 행동 분석
                                        <br />3. 성과 지표 상관관계 분석
                                        <br />4. 계절성 및 트렌드 영향 분석
                                        <br /><br />
                                        코딩 에이전트에게 구현 요청을 보내겠습니다.
                                    </div>
                                </div>
                            </div>

                            <div className="message">
                                <div className="message-avatar" style={{ background: "#10b981" }}>💻</div>
                                <div className="message-content">
                                    <div className="message-header">
                                        <div className="message-sender">💻 코딩 에이전트</div>
                                        <div className="message-time">01:35</div>
                                    </div>
                                    <div className="message-text">
                                        분석 결과를 바탕으로 추천 시스템 코드를 구현했습니다.
                                        <br /><br />
                                        구현 내용:
                                        <br />• Python 기반 데이터 전처리 스크립트
                                        <br />• 머신러닝 모델 구현 (collaborative filtering)
                                        <br />• 성과 지표 모니터링 대시보드
                                        <br />• API 엔드포인트 설계
                                        <br /><br />
                                        모든 에이전트가 협업하여 완성된 솔루션입니다.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="chat-input-area">
                            <div className="attachment-preview" id="multi-attachment-preview">
                                {/* 첨부파일 미리보기가 여기에 동적으로 추가됩니다 */}
                            </div>

                            <div className="chat-input-wrapper">
                                <button className="attachment-btn"
                                    // onClick="openFileAttachment('multi')"
                                    title="파일 첨부">📎</button>
                                <textarea className="chat-input"
                                    id="multi-chat-input"
                                    placeholder="메시지를 입력하세요... (Shift+Enter로 줄바꿈, Enter로 전송)"
                                    rows="1"></textarea>
                                <button className="send-btn" id="multi-send-btn"
                                >
                                    <span id="multi-send-icon">➤</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        </>
    );
}

function AgentHandler({ setAgent }) {
    return (
        <>

            {/* {modalheader({ headerTitle: "에이전트 관리", setModalClose: setAgent })} */}

            <div className="modal agents-management">
                <div className="modal-header">
                    <h2 className="modal-title">에이전트 관리</h2>
                    <button className="modal-close"
                        onClick={() => setAgent(false)}>&times;</button>
                </div>
                <div className="modal-body">
                    <p
                        style={{
                            color: "var(--gray-600)",
                            marginBottom: "var(--spacing-6)",
                            textAlign: "center",
                        }}
                    >
                        활성화할 에이전트를 선택하세요. 선택된 에이전트들이 대화에 참여합니다.
                    </p>
                    <div className="agents-grid">
                        <div className="agent-card active" data-agent="research">
                            <div className="agent-card-header">
                                <div className="agent-card-avatar" style={{ background: "#3b82f6" }}>🔍</div>
                                <div className="agent-toggle">
                                    <input type="checkbox" id="research-agent" />
                                </div>
                            </div>
                            <div className="agent-card-info">
                                <h5>리서치 에이전트</h5>
                                <p>웹 검색, 자료 조사, 시장 분석 등 다양한 정보 수집과 연구 업무를 담당합니다.</p>
                                <div className="agent-capabilities">
                                    <span className="capability-tag">웹 검색</span>
                                    <span className="capability-tag">데이터 수집</span>
                                    <span className="capability-tag">시장 분석</span>
                                    <span className="capability-tag">보고서 작성</span>
                                </div>
                                <div className="agent-model-info">모델: Claude-3 Haiku</div>
                            </div>
                        </div>

                        <div className="agent-card active" data-agent="coding">
                            <div className="agent-card-header">
                                <div className="agent-card-avatar" style={{ background: "#10b981" }}>💻</div>
                                <div className="agent-toggle">
                                    <input type="checkbox" id="coding-agent" />
                                </div>
                            </div>
                            <div className="agent-card-info">
                                <h5>코딩 에이전트</h5>
                                <p>프로그래밍, 코드 리뷰, 디버깅, 시스템 설계 등 모든 개발 관련 업무를 처리합니다.</p>
                                <div className="agent-capabilities">
                                    <span className="capability-tag">코드 작성</span>
                                    <span className="capability-tag">디버깅</span>
                                    <span className="capability-tag">리팩토링</span>
                                    <span className="capability-tag">아키텍처</span>
                                </div>
                                <div className="agent-model-info">모델: Claude-3 Sonnet</div>
                            </div>
                        </div>

                        <div className="agent-card active" data-agent="analysis">
                            <div className="agent-card-header">
                                <div className="agent-card-avatar" style={{ background: "#8b5cf6" }}>📊</div>
                                <div className="agent-toggle">
                                    <input type="checkbox" id="analysis-agent" />
                                </div>
                            </div>
                            <div className="agent-card-info">
                                <h5>분석 에이전트</h5>
                                <p>데이터 분석, 통계 처리, 인사이트 도출, 시각화 등 분석 업무를 전담합니다.</p>
                                <div className="agent-capabilities">
                                    <span className="capability-tag">데이터 분석</span>
                                    <span className="capability-tag">통계 처리</span>
                                    <span className="capability-tag">시각화</span>
                                    <span className="capability-tag">예측 모델</span>
                                </div>
                                <div className="agent-model-info">모델: Claude-3 Sonnet</div>
                            </div>
                        </div>

                        <div className="agent-card" data-agent="writer">
                            <div className="agent-card-header">
                                <div className="agent-card-avatar" style={{ background: "#f59e0b" }}>✍️</div>
                                <div className="agent-toggle">
                                    <input type="checkbox" id="writer-agent" />
                                </div>
                            </div>
                            <div className="agent-card-info">
                                <h5>작성 에이전트</h5>
                                <p>문서 작성, 콘텐츠 제작, 번역, 교정 등 텍스트 관련 업무를 처리합니다.</p>
                                <div className="agent-capabilities">
                                    <span className="capability-tag">문서 작성</span>
                                    <span className="capability-tag">콘텐츠 제작</span>
                                    <span className="capability-tag">번역</span>
                                    <span className="capability-tag">교정</span>
                                </div>
                                <div className="agent-model-info">모델: Claude-3 Haiku</div>
                            </div>
                        </div>

                        <div className="agent-card" data-agent="creative">
                            <div className="agent-card-header">
                                <div className="agent-card-avatar" style={{ background: "#ec4899" }}>🎨</div>
                                <div className="agent-toggle">
                                    <input type="checkbox" id="creative-agent" />
                                </div>
                            </div>
                            <div className="agent-card-info">
                                <h5>창작 에이전트</h5>
                                <p>창의적 아이디어 발굴, 브레인스토밍, 디자인 기획 등 창작 업무를 담당합니다.</p>
                                <div className="agent-capabilities">
                                    <span className="capability-tag">아이디어 발굴</span>
                                    <span className="capability-tag">브레인스토밍</span>
                                    <span className="capability-tag">기획</span>
                                    <span className="capability-tag">스토리텔링</span>
                                </div>
                                <div className="agent-model-info">모델: Claude-3 Opus</div>
                            </div>
                        </div>

                        <div className="agent-card" data-agent="translator">
                            <div className="agent-card-header">
                                <div className="agent-card-avatar" style={{ background: "#06b6d4" }}>🌐</div>
                                <div className="agent-toggle">
                                    <input type="checkbox" id="translator-agent" />
                                </div>
                            </div>
                            <div className="agent-card-info">
                                <h5>번역 에이전트</h5>
                                <p>다국어 번역, 현지화, 문화적 맥락 고려 등 언어 관련 업무를 전문으로 합니다.</p>
                                <div className="agent-capabilities">
                                    <span className="capability-tag">다국어 번역</span>
                                    <span className="capability-tag">현지화</span>
                                    <span className="capability-tag">문화 적응</span>
                                    <span className="capability-tag">언어 교정</span>
                                </div>
                                <div className="agent-model-info">모델: Claude-3 Sonnet</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="secondary-btn" >취소</button>
                    <button className="primary-btn" >설정 저장</button>
                </div>
            </div>



        </>
    );
}