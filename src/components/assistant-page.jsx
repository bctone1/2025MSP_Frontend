'use client';
import { useState, useEffect } from 'react';
import { formatDate, storage, formatFileSize } from '@/utill/utill';

export default function AssistantPage() {
    const [chatMode, setChatMode] = useState('single');
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


    return (
        <div className="app-container">
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
                                    data-mode="single">단일 대화</button>
                                <button className={`mode-btn ${chatMode === 'multi' ? 'active' : ''}`}
                                    data-mode="multi">멀티 에이전트</button>
                            </div>
                            <button className="primary-btn" id="new-conversation-btn">
                                <span>+</span>
                                <span>새 대화</span>
                            </button>
                        </div>
                    </div>
                </div>

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

                        <div className="sidebar-section">
                            <h3 className="sidebar-title">
                                <span>🤖</span>
                                <span>활성 에이전트</span>
                                <button className="manage-agents-btn"
                                // onClick="AssistantManager.manageAgents()"
                                >관리</button>
                            </h3>
                            <div className="active-agents-list" id="active-agents-list">
                                {/* 활성 에이전트 목록이 여기에 렌더링됩니다 */}
                                {renderActiveAgents({ activeAgents, availableAgents })}
                            </div>
                        </div>

                        {/* 지식베이스 섹션  */}
                        <div className="sidebar-section">
                            <h3 className="sidebar-title">
                                <span>📚</span>
                                <span>지식베이스 (RAG)</span>
                                <button className="manage-agents-btn"
                                // onClick="openKnowledgeSelector()"
                                >선택</button>
                            </h3>


                            <div className="card-content">
                                <p className="knowledge-count">📁 선택된 파일 (<span id="selected-count">2</span>개)</p>

                                <div className="knowledge-files" id="knowledge-files">
                                    {/* 선택된 지식베이스 파일들  */}
                                    <div className="knowledge-file completed selected" data-file-id="kb_001">
                                        <div className="knowledge-file-header">
                                            <div className="file-icon" style={{ backgroundColor: "#3b82f620", color: "#3b82f6" }}>📄</div>
                                            <div className="file-status completed">✅</div>
                                        </div>
                                        <div className="knowledge-checkbox checked"></div>
                                        <div className="file-name">AI 개발 가이드.pdf</div>
                                        <div className="file-desc">AI 시스템 개발을 위한 종합 가이드 문서</div>
                                        <div className="file-meta">
                                            <span className="file-size">2.3 MB</span>
                                            <span className="file-chunks">145 청크</span>
                                        </div>
                                        <div className="knowledge-stats">
                                            <div className="mini-stat">
                                                <div className="mini-stat-value">23</div>
                                                <div className="mini-stat-label">쿼리</div>
                                            </div>
                                            <div className="mini-stat">
                                                <div className="mini-stat-value">12.4K</div>
                                                <div className="mini-stat-label">토큰</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="knowledge-file completed selected" data-file-id="kb_002">
                                        <div className="knowledge-file-header">
                                            <div className="file-icon" style={{ backgroundColor: '#10b98120', color: '#10b981' }}>📈</div>
                                            <div className="file-status completed">✅</div>
                                        </div>
                                        <div className="knowledge-checkbox checked"></div>
                                        <div className="file-name">마케팅 전략 데이터.xlsx</div>
                                        <div className="file-desc">2024년 2분기 마케팅 전략 및 성과 분석 데이터</div>
                                        <div className="file-meta">
                                            <span className="file-size">1.2 MB</span>
                                            <span className="file-chunks">67 청크</span>
                                        </div>
                                        <div className="knowledge-stats">
                                            <div className="mini-stat">
                                                <div className="mini-stat-value">15</div>
                                                <div className="mini-stat-label">쿼리</div>
                                            </div>
                                            <div className="mini-stat">
                                                <div className="mini-stat-value">8.7K</div>
                                                <div className="mini-stat-label">토큰</div>
                                            </div>
                                        </div>
                                    </div>
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
            </div>
        </div >
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