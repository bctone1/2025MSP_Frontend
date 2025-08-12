'use client';
import { useState, useEffect } from 'react';
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


    return (
        <div className="app-container">
            <div>
                <div className={`modal-overlay ${AgentEdit ? 'active' : ''}`}>
                    <ManageAgents conversations={conversations} availableAgents={availableAgents} activeAgents={activeAgents} setAgentEdit={setAgentEdit} />
                </div>

                <div className={`modal-overlay ${RagEdit ? 'active' : ''}`}>
                    <ManageRags setRagEdit={setRagEdit} selectedKnowledgeItems={selectedKnowledgeItems} knowledgeItems={knowledgeItems} categoryIcons={categoryIcons} statusIcons={statusIcons} />
                </div>
            </div>

            <div className="container">
                <div className="header">
                    <div className="header-title">
                        <div>
                            <h1 className="page-title">AI 어시스턴트</h1>
                            <p className="page-subtitle">멀티 에이전트와 함께 협업하세요</p>
                        </div>
                        <div className="header-controls">
                            <div className="chat-mode-toggle">
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
                            </div>
                            <button className="primary-btn" id="new-conversation-btn">
                                <span>+</span>
                                <span>새 대화</span>
                            </button>
                        </div>
                    </div>
                </div>

                {chatMode === "multi" ? (
                    <div className="assistant-layout">
                        <div className="chat-sidebar">
                            <div className="sidebar-section">
                                <h3 className="sidebar-title">
                                    <span>💬</span>
                                    <span>대화 목록</span>
                                </h3>
                                <div className="conversations-list" id="conversations-list">
                                    {/* 대화 목록이 여기에 렌더링됩니다 */}
                                    {renderConversationsList({ conversations, currentConversationId, availableAgents })}
                                </div>
                            </div>

                            {/* 지식베이스 섹션  */}
                            <div className="sidebar-section">
                                <h3 className="sidebar-title">
                                    <span>📚</span>
                                    <span>지식베이스 (RAG)</span>
                                    <button className="manage-agents-btn"
                                        // onClick={() => setRagEdit(true)}
                                        onClick={() => alert("클릭")}
                                    >선택</button>
                                </h3>
                                <div className="card-content">
                                    <p className="knowledge-count">📁 선택된 파일 (<span id="selected-count">2</span>개)</p>

                                    <div className="knowledge-files" id="knowledge-files">
                                        {knowledgeItems
                                            .filter(item => selectedKnowledgeItems.includes(item.id))
                                            .map(item => (
                                                <div
                                                    key={item.id}
                                                    className={`knowledge-file ${item.status} selected`}
                                                    data-file-id={item.id}
                                                >
                                                    <div className="knowledge-file-header">
                                                        <div
                                                            className="file-icon"
                                                            style={{
                                                                backgroundColor: `${item.color}20`,
                                                                color: item.color
                                                            }}
                                                        >
                                                            {categoryIcons[item.category] || '📎'}
                                                        </div>
                                                        <div className={`file-status ${item.status}`}>
                                                            {statusIcons[item.status] || '⏳'}
                                                        </div>
                                                    </div>
                                                    <div className="knowledge-checkbox checked"></div>
                                                    <div className="file-name">{item.name}</div>
                                                    <div className="file-desc">{item.description}</div>
                                                    <div className="file-meta">
                                                        <span className="file-size">{(item.size / 1000000).toFixed(1)} MB</span>
                                                        <span className="file-chunks">{item.chunks} 청크</span>
                                                    </div>
                                                    <div className="knowledge-stats">
                                                        <div className="mini-stat">
                                                            <div className="mini-stat-value">{item.queries}</div>
                                                            <div className="mini-stat-label">쿼리</div>
                                                        </div>
                                                        <div className="mini-stat">
                                                            <div className="mini-stat-value">{(item.tokens / 1000).toFixed(1)}K</div>
                                                            <div className="mini-stat-label">토큰</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>


                                    <div className="knowledge-summary">
                                        <div className="summary-stats">
                                            <div className="summary-stat">
                                                <div className="summary-value" id="total-chunks">212</div>
                                                <div className="summary-label">총 청크</div>
                                            </div>
                                            <div className="summary-stat">
                                                <div className="summary-value" id="total-size">3.5MB</div>
                                                <div className="summary-label">전체 크기</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="sidebar-section">
                                <h3 className="sidebar-title">
                                    <span>🤖</span>
                                    <span>활성 에이전트</span>
                                    <button className="manage-agents-btn"
                                        // onClick={() => setAgentEdit(true)}
                                        onClick={() => alert("클릭")}
                                    >관리</button>
                                </h3>
                                <div className="active-agents-list" id="active-agents-list">
                                    {/* 활성 에이전트 목록이 여기에 렌더링됩니다 */}
                                    {renderActiveAgents({ activeAgents, availableAgents })}
                                </div>
                            </div>

                            <div className="sidebar-section">
                                <h3 className="sidebar-title">
                                    <span>⚙️</span>
                                    <span>채팅 설정</span>
                                </h3>
                                <div className="chat-settings">
                                    <div className="setting-item">
                                        <label htmlFor="max-tokens">최대 토큰</label>
                                        <input
                                            type="range"
                                            id="max-tokens"
                                            min="1000"
                                            max="8000"
                                            value={settings.maxTokens}
                                            step="100"
                                            onChange={(e) =>
                                                setSettings(prev => ({ ...prev, maxTokens: Number(e.target.value) }))
                                            }
                                        />
                                        <span className="setting-value">{settings.maxTokens}</span>
                                    </div>
                                    <div className="setting-item">
                                        <label htmlFor="temperature">창의성</label>
                                        <input
                                            type="range"
                                            id="temperature"
                                            min="0"
                                            max="1"
                                            value={settings.temperature}
                                            step="0.1"
                                            onChange={(e) =>
                                                setSettings(prev => ({ ...prev, temperature: Number(e.target.value) }))
                                            }
                                        />
                                        <span className="setting-value">{settings.temperature}</span>
                                    </div>
                                    <div className="setting-item">
                                        <label>
                                            <input
                                                type="checkbox"
                                                id="auto-save"
                                                checked={settings.autoSave}
                                                onChange={(e) =>
                                                    setSettings(prev => ({ ...prev, autoSave: e.target.checked }))
                                                }
                                            />

                                            자동 저장
                                        </label>
                                    </div>
                                    <div className="setting-item">
                                        <label>
                                            <input
                                                type="checkbox"
                                                id="show-typing"
                                                checked={settings.showTyping}
                                                onChange={(e) =>
                                                    setSettings(prev => ({ ...prev, showTyping: e.target.checked }))
                                                } />
                                            타이핑 표시
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="chat-main">
                            <div className="chat-header">
                                <div className="chat-info">
                                    <h3 className="chat-title" id="chat-title">
                                        {getCurrentConversation({ conversations, currentConversationId })?.title || '새 대화'}
                                    </h3>
                                    <div className="chat-agents" id="chat-agents">
                                        {/* 참여 에이전트가 여기에 표시됩니다 */}
                                        {chatagents({ conversations, availableAgents, currentConversationId })}
                                    </div>
                                </div>
                                <div className="chat-controls">
                                    <button className="control-btn"
                                        // onClick="AssistantManager.exportConversation()"
                                        title="대화 내보내기">📥</button>
                                    <button className="control-btn"
                                        // onClick="AssistantManager.clearConversation()"
                                        title="대화 지우기">🗑️</button>
                                    <button className="control-btn"
                                        // onClick="AssistantManager.showChatSettings()" 
                                        title="설정">⚙️</button>
                                </div>
                            </div>

                            <div className="chat-messages" id="chat-messages">
                                {/* 메시지들이 여기에 렌더링됩니다 */}
                                {chatmessages({ conversations, currentConversationId, availableAgents })}
                            </div>

                            <div className="chat-input-area">
                                <div className="attachment-preview" id="attachment-preview" style={{ display: 'none' }}>
                                    {/* 첨부파일 미리보기  */}
                                </div>

                                <div className="chat-input-wrapper">
                                    <button className="attachment-btn"
                                        //  onClick="AssistantManager.attachFile()" 
                                        title="파일 첨부">📎</button>
                                    <textarea className="chat-input"
                                        id="chat-input"
                                        placeholder="메시지를 입력하세요... (Shift+Enter로 줄바꿈, Enter로 전송)"
                                        rows="1"></textarea>
                                    <button className="send-btn" id="send-btn"
                                    //  onClick="AssistantManager.sendMessage()"
                                    >
                                        <span id="send-icon">➤</span>
                                    </button>
                                </div>

                                <div className="input-hints" id="input-hints">
                                    <div className="hint-item"
                                    // onClick="AssistantManager.insertHint('코드를 작성해주세요:')"
                                    >💻 코드 작성</div>
                                    <div className="hint-item"
                                    //  onClick="AssistantManager.insertHint('다음 내용을 요약해주세요:')"
                                    >📝 요약</div>
                                    <div className="hint-item"
                                    // onClick="AssistantManager.insertHint('다음을 번역해주세요:')"
                                    >🌐 번역</div>
                                    <div className="hint-item"
                                    // onClick="AssistantManager.insertHint('데이터를 분석해주세요:')"
                                    >📊 분석</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="single-chat-layout single-chat" id="single-chat-layout">
                        {/* 좌측 사이드바 */}
                        <div className="single-chat-sidebar">
                            {/* LLM 선택 섹션 */}
                            <div className="sidebar-section llm-selection">
                                <h3 className="sidebar-title">
                                    <span>🧠</span>
                                    <span>AI 모델</span>
                                </h3>
                                <select className="llm-selector" id="llm-selector">
                                    <option value="claude-3-opus">Claude 3 Opus</option>
                                    <option value="claude-3-sonnet" >Claude 3 Sonnet</option>
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

                            {/* AI 역량 안내 */}
                            <div className="sidebar-section">
                                <div className="ai-capabilities">
                                    <h4
                                        style={{
                                            fontSize: 'var(--text-sm)',
                                            fontWeight: 700,
                                            color: 'var(--gray-800)',
                                            marginBottom: 'var(--spacing-2)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 'var(--spacing-2)',
                                        }}
                                    >
                                        <span>💬</span>
                                        <span>자연스러운 대화</span>
                                    </h4>

                                    <p
                                        style={{
                                            fontSize: 'var(--text-xs)',
                                            color: 'var(--gray-600)',
                                            marginBottom: 'var(--spacing-3)',
                                            lineHeight: 1.4,
                                        }}
                                    >
                                        선택한 AI 모델과 자유롭게 대화하세요. 어떤 질문이든 환영합니다!
                                    </p>

                                    <div className="capability-grid">
                                        <div className="capability-item">
                                            <span className="capability-icon">❓</span>
                                            <span>질문 답변</span>
                                        </div>
                                        <div className="capability-item">
                                            <span className="capability-icon">💻</span>
                                            <span>코딩 도움</span>
                                        </div>
                                        <div className="capability-item">
                                            <span className="capability-icon">📚</span>
                                            <span>학습 지원</span>
                                        </div>
                                        <div className="capability-item">
                                            <span className="capability-icon">📝</span>
                                            <span>글쓰기 도움</span>
                                        </div>
                                        <div className="capability-item">
                                            <span className="capability-icon">🔍</span>
                                            <span>정보 검색</span>
                                        </div>
                                        <div className="capability-item">
                                            <span className="capability-icon">💡</span>
                                            <span>아이디어 제안</span>
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            marginTop: 'var(--spacing-3)',
                                            padding: 'var(--spacing-2)',
                                            background: 'rgba(59, 130, 246, 0.1)',
                                            border: '1px solid rgba(59, 130, 246, 0.2)',
                                            borderRadius: '8px',
                                        }}
                                    >
                                        <p
                                            style={{
                                                fontSize: 'var(--text-xs)',
                                                color: 'var(--secondary-blue)',
                                                fontWeight: 600,
                                                margin: 0,
                                                textAlign: 'center',
                                            }}
                                        >
                                            🤝 대규모 프로젝트는 멀티 에이전트 모드를 활용하세요!
                                        </p>
                                    </div>
                                </div>
                            </div>


                            {/* 지식베이스 섹션 */}
                            <div className="sidebar-section knowledge-section">
                                <h3 className="sidebar-title">
                                    <span>📚</span>
                                    <span>지식베이스</span>
                                    <button className="manage-knowledge-btn" onClick="attachKnowledgeFiles('single')">+ 첨부</button>
                                </h3>
                                <p className="knowledge-count" id="single-knowledge-count">📁 첨부된 파일 (0개)</p>

                                <div className="knowledge-files" id="single-knowledge-files">
                                    <div className="empty-knowledge">
                                        <div className="empty-icon">📚</div>
                                        <p>문서를 첨부하여 더 정확한<br />답변을 받아보세요</p>
                                        <button className="select-knowledge-btn"
                                        // onClick="attachKnowledgeFiles('single')"
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
                                            lineHeight: 1.4
                                        }}
                                    >
                                        💡 PDF, DOCX, TXT 등의 문서를 첨부하면
                                        <br />
                                        AI가 해당 내용을 참조하여 답변합니다
                                    </p>
                                </div>
                            </div>

                            {/* 대화 목록 */}
                            <div className="sidebar-section">
                                <h3 className="sidebar-title">
                                    <span>💬</span>
                                    <span>최근 대화</span>
                                </h3>
                                <div className="conversations-list" id="single-conversations-list">
                                    <div className="conversation-item active">
                                        <div className="conversation-header">
                                            <div className="conversation-title">현재 대화</div>
                                            <div className="conversation-time">진행중</div>
                                        </div>
                                        <div className="conversation-preview">새로운 대화를 시작해보세요...</div>
                                    </div>
                                    <div className="conversation-item">
                                        <div className="conversation-header">
                                            <div className="conversation-title">Python 데이터 분석</div>
                                            <div className="conversation-time">14:32</div>
                                        </div>
                                        <div className="conversation-preview">pandas를 사용한 데이터 전처리 방법...</div>
                                    </div>
                                    <div className="conversation-item">
                                        <div className="conversation-header">
                                            <div className="conversation-title">웹 디자인 아이디어</div>
                                            <div className="conversation-time">12:15</div>
                                        </div>
                                        <div className="conversation-preview">모던한 랜딩 페이지 디자인 요청...</div>
                                    </div>
                                </div>
                            </div>

                            {/* 설정 */}
                            <div className="sidebar-section">
                                <h3 className="sidebar-title">
                                    <span>⚙️</span>
                                    <span>설정</span>
                                </h3>
                                <div className="chat-settings">
                                    <div className="setting-item">
                                        <label htmlFor="single-max-tokens">최대 토큰</label>
                                        <input type="range" id="single-max-tokens" min="1000" max="8000" value="4000" step="100" readOnly />
                                        <span className="setting-value">4000</span>
                                    </div>
                                    <div className="setting-item">
                                        <label htmlFor="single-temperature">창의성</label>
                                        <input type="range" id="single-temperature" min="0" max="1" value="0.7" step="0.1" readOnly />
                                        <span className="setting-value">0.7</span>
                                    </div>
                                    <div className="setting-item">
                                        <label>
                                            <input type="checkbox" id="single-stream" />
                                            스트리밍 응답
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 채팅 영역 */}
                        <div className="chat-main">
                            <div className="chat-header">
                                <div className="chat-info">
                                    <div className="chat-title" id="single-chat-title">AI 어시스턴트</div>
                                    <div className="chat-model-badge" id="chat-model">
                                        <span>🤖</span>
                                        <span>Claude 3 Sonnet</span>
                                    </div>
                                </div>
                                <div className="chat-controls">
                                    <button className="control-btn" title="대화 지우기" onClick="clearChat('single')">🗑️</button>
                                    <button className="control-btn" title="설정">⚙️</button>
                                </div>
                            </div>

                            <div className="chat-messages" id="single-chat-messages">
                                {/* 시작 화면 */}
                                <div className="welcome-screen" id="single-welcome-screen">
                                    <div className="welcome-icon">💬</div>
                                    <div className="welcome-title">무엇이든 물어보세요!</div>
                                    <div className="welcome-subtitle">
                                        선택한 AI 모델과 자유롭게 대화할 수 있습니다.
                                    </div>
                                </div>
                            </div>

                            <div className="chat-input-area">
                                <div className="attachment-preview" id="single-attachment-preview">
                                    {/* 첨부파일 미리보기가 여기에 동적으로 추가됩니다 */}
                                </div>

                                <div className="chat-input-wrapper">
                                    <button className="attachment-btn" onClick="openFileAttachment('single')" title="파일 첨부">📎</button>
                                    <textarea className="chat-input"
                                        id="single-chat-input"
                                        placeholder="메시지를 입력하세요... (Shift+Enter로 줄바꿈, Enter로 전송)"
                                        rows="1"></textarea>
                                    <button className="send-btn" id="single-send-btn" onClick="sendMessage('single')">
                                        <span id="single-send-icon">➤</span>
                                    </button>
                                </div>

                                <div className="input-hints" id="single-input-hints">
                                    <div className="hint-item" onClick="insertHint('설명해줘', 'single')">❓ 설명 요청</div>
                                    <div className="hint-item" onClick="insertHint('코드 작성해줘', 'single')">💻 코딩</div>
                                    <div className="hint-item" onClick="insertHint('도움말', 'single')">💡 도움말</div>
                                    <div className="hint-item" onClick="insertHint('추천해줘', 'single')">⭐ 추천</div>
                                </div>
                            </div>
                        </div>
                    </div>

                )}






            </div>
        </div >
    );
}
function ManageRags({ setRagEdit, selectedKnowledgeItems, knowledgeItems, categoryIcons, statusIcons }) {
    const availableItems = knowledgeItems.filter(item =>
        item.status === 'completed' || item.status === 'indexing'
    );
    return (
        <>
            {/* <div className="modal-overlay active"> */}
            <div className="modal">
                {modalheader({ headerTitle: "지식베이스 파일 선택", setModalClose: setRagEdit })}

                <div className="modal-body">
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '1rem',
                            padding: '1rem',
                            background: 'rgba(99, 102, 241, 0.05)',
                            borderRadius: '8px'
                        }}
                    >
                        <div>
                            선택됨:{' '}
                            <span
                                id="modal-selected-count"
                                style={{
                                    fontWeight: 700,
                                    color: '#6366f1'
                                }}
                            >
                                {selectedKnowledgeItems.length}
                            </span>
                            개
                        </div>
                        <div>사용 가능: {availableItems.length}개</div>
                    </div>


                    <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: '12px', background: 'white' }}>
                        {availableItems.length > 0 ? (
                            availableItems.map(item => {
                                const isSelected = selectedKnowledgeItems.includes(item.id);
                                const icon = categoryIcons[item.category] || '📎';
                                const statusIcon = statusIcons[item.status] || '⏳';

                                return (
                                    <div
                                        key={item.id}
                                        className={`selector-item ${isSelected ? 'selected' : ''}`}
                                        data-item-id={item.id}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '1rem',
                                            padding: '1rem',
                                            borderBottom: '1px solid #f3f4f6',
                                            cursor: 'pointer',
                                            transition: 'all 0.15s ease'
                                        }}
                                    >
                                        <div style={{ flexShrink: 0, marginTop: '2px' }}>
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={() => handleSelectItem(item.id)} // 필요시 함수 정의
                                                style={{
                                                    width: '18px',
                                                    height: '18px',
                                                    accentColor: '#6366f1'
                                                }}
                                            />
                                        </div>

                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                                <div
                                                    style={{
                                                        width: '24px',
                                                        height: '24px',
                                                        borderRadius: '6px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        backgroundColor: `${item.color}20`,
                                                        color: item.color,
                                                        fontSize: '12px',
                                                        fontWeight: 700
                                                    }}
                                                >
                                                    {icon}
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontWeight: 600, color: '#1f2937', marginBottom: '2px', fontSize: '0.875rem' }}>
                                                        {item.name}
                                                    </div>
                                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                                        <span
                                                            style={{
                                                                padding: '2px 6px',
                                                                background: `${item.color}20`,
                                                                color: item.color,
                                                                borderRadius: '4px',
                                                                fontSize: '10px',
                                                                fontWeight: 600
                                                            }}
                                                        >
                                                            {item.category}
                                                        </span>
                                                        <span
                                                            style={{
                                                                padding: '2px 6px',
                                                                background: 'rgba(107, 114, 128, 0.1)',
                                                                color: '#6b7280',
                                                                borderRadius: '4px',
                                                                fontSize: '10px',
                                                                fontWeight: 600
                                                            }}
                                                        >
                                                            {statusIcon} {item.status}
                                                        </span>
                                                        <span style={{ fontSize: '10px', color: '#9ca3af' }}>
                                                            {formatFileSize(item.size)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                                                {item.description}
                                            </div>

                                            {item.status === 'completed' && (
                                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#6b7280' }}>
                                                        <span>🧩</span>
                                                        <span>{item.chunks} 청크</span>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#6b7280' }}>
                                                        <span>🔍</span>
                                                        <span>{item.queries} 쿼리</span>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#6b7280' }}>
                                                        <span>🎯</span>
                                                        <span>{(item.tokens / 1000).toFixed(1)}K 토큰</span>
                                                    </div>
                                                </div>
                                            )}

                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                                                {item.tags.map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        style={{
                                                            padding: '2px 6px',
                                                            background: 'rgba(99, 102, 241, 0.1)',
                                                            color: '#6366f1',
                                                            borderRadius: '8px',
                                                            fontSize: '10px',
                                                            fontWeight: 600
                                                        }}
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>📚</div>
                                <h4>사용 가능한 파일이 없습니다</h4>
                                <p>먼저 지식베이스 페이지에서 파일을 업로드하고 처리를 완료해주세요.</p>
                            </div>
                        )}
                    </div>

                </div>

                <div className="modal-footer">
                    <button type="button" className="secondary-btn"
                        onClick={() => setRagEdit(false)}
                    >취소</button>
                    <button type="button" className="primary-btn"
                        onClick={() => alert("저장누름")}
                    >저장</button>
                </div>

            </div>
            {/* </div> */}

        </>
    );
}

function ManageAgents({ conversations, availableAgents, activeAgents, setAgentEdit }) {

    return (
        <>
            {/* <div className="modal-overlay active"> */}
            <div className="modal">
                {modalheader({ headerTitle: "에이전트 관리", setModalClose: setAgentEdit })}

                <div className="modal-body">
                    <div className="agents-management">
                        <div className="available-agents">
                            <h4>사용 가능한 에이전트</h4>
                            <div className="agents-grid">
                                {Object.entries(availableAgents).map(([agentId, agent]) => (
                                    <div key={agentId} className={`agent-card ${activeAgents.includes(agentId) ? 'active' : ''}`} data-agent-id={agentId}>

                                        <div className="agent-header">
                                            <div className="agent-avatar" style={{ backgroundColor: `${agent.color}` }}>
                                                {agent.name.split(' ')[0]}
                                            </div>
                                            <div className="agent-toggle">
                                                <input
                                                    type="checkbox"
                                                    id={`agent-${agentId}`}
                                                    checked={activeAgents.includes(agentId)}
                                                    onChange={() => alert("버튼 누름")}
                                                />
                                                <label htmlFor={`agent-${agentId}`}></label>
                                            </div>
                                        </div>
                                        <div className="agent-info">
                                            <h5>{agent.name}</h5>
                                            <p>{agent.description}</p>
                                            <div className="agent-capabilities">
                                                {agent.capabilities.map((cap, index) => (<span key={index} className="capability-tag">{cap}</span>))}
                                            </div>
                                            <div className="agent-model">모델: {agent.model}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button type="button" className="secondary-btn"
                        onClick={() => setAgentEdit(false)}
                    >취소</button>
                    <button type="button" className="primary-btn"
                        onClick={() => alert("저장누름")}
                    >저장</button>
                </div>

            </div>
            {/* </div> */}
        </>
    );
}

function renderConversationsList({ conversations, currentConversationId, availableAgents }) {
    return (
        conversations.length === 0 ? (
            <div className="empty-conversations">
                <div className="empty-icon">💬</div>
                <p>아직 대화가 없습니다</p>
                <button
                    className="start-chat-btn"
                // onClick={() => AssistantManager.createNewConversation()}
                >
                    첫 대화 시작하기
                </button>
            </div>
        ) : conversations.map((conv, index) => {
            const lastMessage = conv.messages[conv.messages.length - 1];
            const preview = lastMessage
                ? (lastMessage.type === 'user' ? '나: ' : '🤖: ') + lastMessage.content.substring(0, 50) + (lastMessage.content.length > 50 ? '...' : '')
                : '대화를 시작해보세요';


            return (
                <div
                    key={conv.id || index}
                    className={`conversation-item ${conv.id === currentConversationId ? 'active' : ''}`}
                    data-conversation-id={conv.id}
                >
                    <div className="conversation-header">
                        <div className="conversation-title">{conv.title}</div>
                        <div className="conversation-time">
                            {formatDate(conv.updated, 'MM/DD HH:mm')}
                        </div>
                    </div>
                    <div className="conversation-preview">{preview}</div>
                    <div className="conversation-agents">
                        {conv.agents.map(agentId => {
                            const agent = availableAgents[agentId];
                            return agent ? (
                                <span
                                    key={agentId}
                                    className="agent-badge"
                                    style={{
                                        backgroundColor: `${agent.color}20`,
                                        color: agent.color,
                                    }}
                                >
                                    {agent.name.split(' ')[0]}
                                </span>
                            ) : null;
                        })}
                    </div>
                    <div className="conversation-menu">
                        <button
                            className="menu-btn"
                        // onClick={() => AssistantManager.showConversationMenu(conv.id)}
                        >
                            ⋮
                        </button>
                    </div>
                </div>
            );
        })
    );
}


function renderActiveAgents({ activeAgents, availableAgents }) {
    return (
        activeAgents.length === 0 ? (
            <div className="empty-agents">
                <div className="empty-icon">🤖</div>
                <p>활성 에이전트가 없습니다</p>
                <button className="add-agent-btn"
                // onClick={() => AssistantManager.manageAgents()}
                >
                    에이전트 추가
                </button>
            </div>
        ) : activeAgents.map(agentId => {
            const agent = availableAgents[agentId];
            if (!agent) return null;

            return (
                <div key={agentId} className="agent-item" data-agent-id={agentId}>
                    <div
                        className="agent-avatar"
                        style={{ backgroundColor: agent.color }}
                    >
                        {agent.name.split(' ')[0]}
                    </div>
                    <div className="agent-info">
                        <div className="agent-name">{agent.name}</div>
                        <div className="agent-description">{agent.description}</div>
                        <div className="agent-model">{agent.model}</div>
                    </div>
                    <div className="agent-status">
                        <div className="status-dot active"></div>
                    </div>
                </div>
            );
        })
    );
}

//현재대화 가져오기
function getCurrentConversation({ conversations, currentConversationId }) {
    return conversations.find(conv => conv.id === currentConversationId);
}


function chatagents({ conversations, availableAgents, currentConversationId }) {
    const conversation = getCurrentConversation({ conversations, currentConversationId });
    // console.log(conversation);
    if (!conversation || !Array.isArray(conversation.agents)) {
        return null;
    }
    return (
        <>
            {conversation.agents.map(agentId => {
                const agent = availableAgents[agentId];
                return agent ? (
                    <span
                        key={agentId}
                        className="chat-agent-badge"
                        style={{ backgroundColor: agent.color }}
                    >
                        {agent.name}
                    </span>
                ) : null;
            })}
        </>
    );
}

function chatmessages({ conversations, currentConversationId, availableAgents }) {
    const conversation = getCurrentConversation({ conversations, currentConversationId });
    if (!conversation) {
        return (
            <div className="welcome-message">
                <div className="welcome-icon">🤖</div>
                <h3>AI 어시스턴트에 오신 것을 환영합니다!</h3>
                <p>질문이나 요청사항을 입력해보세요. 전문 AI 에이전트들이 도와드리겠습니다.</p>
                <div className="example-prompts">
                    <div className="example-prompt"
                    //  onClick="AssistantManager.insertHint('Python으로 데이터 분석 코드를 작성해주세요')"
                    >
                        💻 Python 데이터 분석 코드 작성
                    </div>
                    <div className="example-prompt"
                    // onClick="AssistantManager.insertHint('마케팅 전략을 분석해주세요')"
                    >
                        📊 마케팅 전략 분석
                    </div>
                    <div className="example-prompt"
                    // onClick="AssistantManager.insertHint('블로그 글을 작성해주세요')"
                    >
                        ✍️ 블로그 콘텐츠 작성
                    </div>
                    <div className="example-prompt"
                    // onClick="AssistantManager.insertHint('영어 문서를 번역해주세요')"
                    >
                        🌐 문서 번역
                    </div>
                </div>
            </div>
        );
    }
    return (
        <>
            {conversation.messages.map((message) => renderMessage({ message, availableAgents }))}
        </>
    );
}


function renderMessage({ message, availableAgents }) {
    // console.log(message);
    // return"";
    const timestamp = formatDate(message.timestamp, 'HH:mm');


    if (message.type === 'user') {
        return (
            <div className="message user-message" data-message-id={message.id} key={message.id}>
                <div className="message-avatar user-avatar">👤</div>
                <div className="message-content">
                    <div className="message-header">
                        <span className="message-sender">나</span>
                        <span className="message-time">{timestamp}</span>
                    </div>
                    <div
                        className="message-text"
                        dangerouslySetInnerHTML={{ __html: formatMessageText(message.content) }}
                    ></div>
                    {message.attachments && message.attachments.length > 0 ? renderAttachments(message.attachments) : ''}
                </div>
                <div className="message-actions">
                    <button className="message-action"
                        // onClick="AssistantManager.editMessage('${message.id}')" 
                        title="편집">✏️</button>
                    <button className="message-action"
                        //  onClick="AssistantManager.deleteMessage('${message.id}')" 
                        title="삭제">🗑️</button>
                </div>
            </div>
        );
    } else {
        const agent = availableAgents[message.agentId];
        const agentName = agent ? agent.name : '🤖 AI';
        const agentColor = agent ? agent.color : '#6B7280';

        return (
            <div className="message agent-message" data-message-id={message.id} key={message.id}>
                <div className="message-avatar agent-avatar"
                    style={{ backgroundColor: agentColor }}
                >
                    {agentName.split(' ')[0]}
                </div>
                <div className="message-content">
                    <div className="message-header">
                        <span className="message-sender">{agentName}</span>
                        <span className="message-time">{timestamp}</span>
                    </div>
                    <div
                        className="message-text"
                        dangerouslySetInnerHTML={{ __html: formatMessageText(message.content) }}
                    ></div>

                    {message.attachments && message.attachments.length > 0 ? renderAttachments(message.attachments) : ''}
                </div>
                <div className="message-actions">
                    <button className="message-action"
                        // onClick="AssistantManager.copyMessage('${message.id}')" 
                        title="복사">📋</button>
                    <button className="message-action"
                        //  onClick="AssistantManager.regenerateMessage('${message.id}')" 
                        title="재생성">🔄</button>
                    <button className="message-action"
                        //  onClick="AssistantManager.likeMessage('${message.id}')" 
                        title="좋아요">👍</button>
                </div>
            </div>
        );
    }
}


function renderAttachments(attachments) {
    return (
        <div className="message-attachments">
            {attachments.map(att => (
                <div className="attachment-item">
                    <div className="attachment-icon">{getFileIcon(att.type)}</div>
                    <div className="attachment-info">
                        <div className="attachment-name">{att.name}</div>
                        <div className="attachment-size">{formatFileSize(att.size)}</div>
                    </div>
                    <button className="attachment-download"
                    //  onClick="AssistantManager.downloadAttachment('${att.id}')"
                    >⬇️</button>
                </div>
            ))}
        </div>
    );
}


function formatMessageText(text) {
    // text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    //     return <div className="code-block">
    //         <div className="code-header">
    //             <span className="code-lang">${lang || 'code'}</span>
    //             <button className="copy-code-btn"
    //             // onClick="AssistantManager.copyCode(this)"
    //             >📋</button>
    //         </div>
    //         <pre><code>${escapeHtml(code.trim())}</code></pre>
    //     </div>;
    // });

    // // 인라인 코드 처리
    // text = text.replace(/`([^`]+)`/g, <code className="inline-code">$1</code>);

    // // 링크 처리
    // text = text.replace(/(https?:\/\/[^\s]+)/g, <a href="$1" target="_blank" className="message-link">$1</a>);

    text = text.replace(/\n/g, '<br>');

    return text;
}

function getFileIcon(type) {
    const icons = {
        'image': '🖼️',
        'document': '📄',
        'spreadsheet': '📊',
        'presentation': '📋',
        'pdf': '📕',
        'code': '💻',
        'archive': '📦',
        'default': '📎'
    };
    return icons[type] || icons.default;
}