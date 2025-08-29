'use client';
import { useState, useEffect, useRef } from 'react';
import { formatDate, storage, formatFileSize, modalheader } from '@/utill/utill';
import "@/styles/assistant-page.css"
import { useSession } from "next-auth/react";

export default function AssistantPage({ onMenuClick, projectName }) {
    const { data: session } = useSession();

    // 에이전트 선택 모달 활성화
    const [Agent, setAgent] = useState(false);

    const conversations = [
        {
            title: "현재 대화",
            time: "진행중",
            preview: "새로운 대화를 시작해보세요...",
            active: true,
        },
        {
            title: "프로젝트 기획 논의",
            time: "01:32",
            preview: "주요 시스템의 성능을 위해서는 데이터 처리 최적화가 필요합니다...",
            active: false,
        },
        {
            title: "Python 데이터 분석",
            time: "14:32",
            preview: "pandas를 사용한 데이터 전처리 방법에 대해 알아보겠습니다...",
            active: false,
        },
    ];
    const [agents, setagents] = useState([
        {
            id: "research",
            active: true,
            avatar: "🔍",
            avatarBg: "#3b82f6",
            name: "리서치 에이전트",
            desc: "웹 검색, 자료 조사, 시장 분석 등 다양한 정보 수집과 연구 업무를 담당합니다.",
            capabilities: ["웹 검색", "데이터 수집", "시장 분석", "보고서 작성"],
            model: "Claude-3 Haiku",
            description: "웹 검색 및 데이터 수집 전문"
        },
        {
            id: "coding",
            active: true,
            avatar: "💻",
            avatarBg: "#10b981",
            name: "코딩 에이전트",
            desc: "프로그래밍, 코드 리뷰, 디버깅, 시스템 설계 등 모든 개발 관련 업무를 처리합니다.",
            capabilities: ["코드 작성", "디버깅", "리팩토링", "아키텍처"],
            model: "Claude-3 Sonnet",
            description: "프로그래밍 및 코드 최적화"
        },
        {
            id: "analysis",
            active: true,
            avatar: "📊",
            avatarBg: "#8b5cf6",
            name: "분석 에이전트",
            desc: "데이터 분석, 통계 처리, 인사이트 도출, 시각화 등 분석 업무를 전담합니다.",
            capabilities: ["데이터 분석", "통계 처리", "시각화", "예측 모델"],
            model: "Claude-3 Sonnet",
            description: "데이터 분석 및 인사이트 도출"
        },
        {
            id: "writer",
            active: false,
            avatar: "✏️",
            avatarBg: "#f59e0b",
            name: "작성 에이전트",
            desc: "문서 작성, 콘텐츠 제작, 번역, 교정 등 텍스트 관련 업무를 처리합니다.",
            capabilities: ["문서 작성", "콘텐츠 제작", "번역", "교정"],
            model: "Claude-3 Haiku",
            description: "문서 작성 및 콘텐츠 제작"
        },
        {
            id: "creative",
            active: false,
            avatar: "🎨",
            avatarBg: "#ec4899",
            name: "창작 에이전트",
            desc: "창의적 아이디어 발굴, 브레인스토밍, 디자인 기획 등 창작 업무를 담당합니다.",
            capabilities: ["아이디어 발굴", "브레인스토밍", "기획", "스토리텔링"],
            model: "Claude-3 Opus",
            description: "창의적 아이디어 및 기획"
        },
        {
            id: "translator",
            active: false,
            avatar: "🌐",
            avatarBg: "#06b6d4",
            name: "번역 에이전트",
            desc: "다국어 번역, 현지화, 문화적 맥락 고려 등 언어 관련 업무를 전문으로 합니다.",
            capabilities: ["다국어 번역", "현지화", "문화 적응", "언어 교정"],
            model: "Claude-3 Sonnet",
            description: "다국어 번역 및 현지화"
        }
    ]);

    const models = [
        {
            id: "check-exaone-4",
            icon: "🧠",
            title: "EXAONE 4.0",
            desc: "LG AI Research의 최신 멀티모달 모델",
            active: true,
        },
        {
            id: "check-claude-3.5-sonnet",
            icon: "🤖",
            title: "Claude 3.5 Sonnet",
            desc: "Anthropic의 고성능 대화 모델",
            active: false,
        },
        {
            id: "check-gpt-4o",
            icon: "🚀",
            title: "GPT-4o",
            desc: "OpenAI의 최신 멀티모달 모델",
            active: false,
        },
        {
            id: "check-gemini-2.0-flash",
            icon: "⚡",
            title: "Gemini 2.0 Flash",
            desc: "Google의 차세대 AI 모델",
            active: false,
        },
    ];
    const [dropdown, setdropdown] = useState(false);
    const [plusmenu, setplusmenu] = useState(false);

    const AgentCards = ({ agents, setagents }) => {
        const toggleAgent = (id, isActive) => {
            setagents((prev) =>
                prev.map((agent) =>
                    agent.id === id ? { ...agent, active: isActive } : agent
                )
            );
        };

        return (
            <>
                {agents.map((agent) => (
                    <div
                        key={agent.id}
                        className={`agent-card ${agent.active ? "active" : ""}`}
                        data-agent={agent.id}
                    >
                        <div className="agent-card-header">
                            <div
                                className="agent-card-avatar"
                                style={{ background: agent.avatarBg }}
                            >
                                {agent.avatar}
                            </div>
                            <div className="agent-card-info">
                                <h5>{agent.name}</h5>
                                <p>{agent.desc}</p>
                                <div className="agent-capabilities">
                                    {agent.capabilities.map((cap, idx) => (
                                        <span key={idx} className="capability-tag">
                                            {cap}
                                        </span>
                                    ))}
                                </div>
                                <div className="agent-model-info">모델: {agent.model}</div>
                            </div>
                            <div className="agent-toggle">
                                <input
                                    type="checkbox"
                                    checked={agent.active}
                                    onChange={(e) => toggleAgent(agent.id, e.target.checked)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </>
        );
    };




    return (
        <>
            <div className={`modal-overlay ${Agent ? 'active' : ''}`}>
                <AgentHandler
                    setAgent={setAgent}
                    AgentCards={<AgentCards agents={agents} setagents={setagents} />}
                />

            </div>

            <div className="assistant_container">
                {/* 좌측 채팅 사이드바 - 카드형 디자인 */}
                <div className="assistant-chat-sidebar">
                    {/* 최근 대화 카드 */}
                    <div className="sidebar-card conversations-card">
                        <div className="assistant-card-header">
                            <div className="assistant-card-title">💬 최근 대화</div>
                            <button className="assistant-primary-btn" >
                                <span>+</span>
                                <span>새 대화</span>
                            </button>
                        </div>

                        <div className="conversations-list" id="conversations-list">
                            {conversations.map((conv, index) => (
                                <div
                                    key={index}
                                    className={`conversation-item ${conv.active ? "active" : ""}`}
                                >
                                    <div className="conversation-header">
                                        <div className="assistant-conversation-title">{conv.title}</div>
                                        <div className="conversation-time">{conv.time}</div>
                                    </div>
                                    <div className="assistant-conversation-preview">{conv.preview}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 첨부파일 카드 */}
                    <div className="sidebar-card files-card">
                        <div className="assistant-card-header">
                            <div className="assistant-card-title">📎 첨부파일</div>
                        </div>

                        <div className="files-count">📄 첨부된 파일 (0개)</div>

                        <div className="knowledge-files" id="attached-files-list">
                            <div className="empty-files">
                                <div className="empty-icon">📁</div>
                                <p>첨부된 파일이 없습니다</p>
                            </div>
                        </div>

                        <div className="files-help">
                            <p>💡 + 버튼에서 파일을 첨부하거나<br />
                                입력창에 파일을 드래그놓으세요</p>
                        </div>
                    </div>
                </div>

                {/* 채팅 영역 */}
                <div className="assistant-chat-main">
                    <div className="chat-card">
                        <div className="chat-header">
                            <div className="chat-info">
                                <div className="chat-title" id="chat-title">{projectName}</div>
                                <div className="chat-agents" id="chat-agents">
                                    {/* 활성 에이전트 뱃지들이 여기에 동적으로 추가됩니다 */}
                                    {<UpdateChatAgentsBadges agents={agents} />}
                                </div>
                            </div>

                            <div className="chat-controls">
                                <button className="control-btn" title="대화 지우기" >🗑️</button>
                                <button className="control-btn" title="설정" >⚙️</button>
                            </div>
                        </div>

                        {/* 채팅창 영역 */}
                        <div className="chat-messages" id="chat-messages">
                            {/* 초기 웰컴 메시지 */}
                            <div className="welcome-message" id="welcome-message">
                                <div className="welcome-icon">💬</div>
                                <div className="welcome-title">{session?.user?.name}님, 무엇을 도와드릴까요?</div>
                                <div className="welcome-subtitle">멀티 에이전트와 함께 다양한 작업을 시작해보세요</div>
                            </div>
                        </div>

                        <div className="chat-input-area">
                            <div className="chat-input-wrapper">
                                {/* + 버튼 */}
                                <div className="plus-btn" id="plus-btn"
                                    onClick={() => setplusmenu((prev) => !prev)}
                                >
                                    +
                                    {/* 통합 팝업 메뉴 */}
                                    <div className={`plus-menu ${plusmenu ? "open" : ""}`} id="plus-menu">
                                        <div className="menu-section"
                                            onClick={() => setAgent(true)}
                                        >
                                            <div className="menu-section-title">AI 에이전트</div>
                                            <div className="menu-item" >
                                                <div className="menu-item-icon">👥</div>
                                                <div className="menu-item-text">
                                                    <div className="menu-item-title">에이전트</div>
                                                    <div className="menu-item-desc">AI 에이전트 선택 및 관리</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="menu-section">
                                            <div className="menu-section-title">지식베이스</div>
                                            <div className="menu-item" >
                                                <div className="menu-item-icon">📚</div>
                                                <div className="menu-item-text">
                                                    <div className="menu-item-title">지식베이스 라이브러리</div>
                                                    <div className="menu-item-desc">저장된 지식베이스에서 선택</div>
                                                </div>
                                            </div>
                                            <div className="menu-item" >
                                                <div className="menu-item-icon">📎</div>
                                                <div className="menu-item-text">
                                                    <div className="menu-item-title">파일 첨부</div>
                                                    <div className="menu-item-desc">현재 대화에 파일 첨부</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="menu-section">
                                            <div className="menu-section-title">외부 연동</div>
                                            <div className="menu-item" >
                                                <div className="menu-item-icon">💾</div>
                                                <div className="menu-item-text">
                                                    <div className="menu-item-title">Google Drive</div>
                                                    <div className="menu-item-desc">클라우드 파일 연동</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <textarea
                                    className="chat-input"
                                    id="chat-input"
                                    placeholder="메시지를 입력하세요... (Shift+Enter로 줄바꿈, Enter로 전송)"
                                    rows="1"
                                ></textarea>

                                <div className="input-actions">
                                    {/* 모델 선택 버튼  */}
                                    <div className="model-selector-btn" id="model-selector-btn"
                                        onClick={() => setdropdown((prev) => !prev)}
                                    >
                                        <span className="model-icon" id="model-icon">🧠</span>
                                        <span className="model-name" id="current-model-name">EXAONE 4.0</span>
                                        <span className="dropdown-arrow">▼</span>

                                        {/* 모델 선택 드롭다운 */}
                                        <div className={`model-dropdown-menu ${dropdown ? "open" : ""}`} id="model-dropdown-menu">
                                            {models.map((model) => (
                                                <div className="model-item" key={model.id}>
                                                    <div className="model-item-info">
                                                        <div className="model-item-icon">{model.icon}</div>
                                                        <div className="model-item-text">
                                                            <div className="model-item-title">{model.title}</div>
                                                            <div className="model-item-desc">{model.desc}</div>
                                                        </div>
                                                    </div>
                                                    <span
                                                        className={`model-check ${model.active ? "active" : ""}`}
                                                        id={model.id}
                                                    >
                                                        ✓
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <button className="send-btn" id="send-btn" >
                                        <span id="send-icon">➤</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

function UpdateChatAgentsBadges({ agents }) {
    const activeAgents = agents.filter(agent => agent.active);

    return (
        <>
            {activeAgents.map(agent => (
                <div key={agent.id} className="chat-agent-badge" style={{ background: `${agent.avatarBg}` }}>
                    {agent.avatar} {agent.name}
                </div>
            ))}
        </>
    );
}

function AgentHandler({ setAgent, AgentCards }) {
    return (
        <>
            <div className="modal agents-management">
                <div className="modal-header">
                    <h2 className="modal-title">에이전트 관리</h2>
                    <button className="modal-close"
                        onClick={() => setAgent(false)}
                    >&times;</button>
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
                    <div className="agents-grid" id="agents-grid">
                        {/* 에이전트 카드들이 여기에 동적으로 추가됩니다  */}
                        {AgentCards}
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

