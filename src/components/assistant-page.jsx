'use client';
import { useState, useEffect, useRef } from 'react';
import { formatDate, storage, formatFileSize, modalheader } from '@/utill/utill';
import "@/styles/assistant-page.css"

export default function AssistantPage() {
    const [agents, setAgents] = useState(
        [
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
                avatar: "✍️",
                avatarBg: "#f59e0b",
                name: "작성 에이전트",
                desc: "문서 작성, 콘텐츠 제작, 번역, 교정 등 텍스트 관련 업무를 처리합니다.",
                capabilities: ["문서 작성", "콘텐츠 제작", "번역", "교정"],
                model: "Claude-3 Haiku",
                description: "데이터 분석 및 인사이트 도출"
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
                description: "데이터 분석 및 인사이트 도출"
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
                description: "데이터 분석 및 인사이트 도출"
            }
        ]
    );

    const [messages, setMessages] = useState(
        [
            // {
            //     id: 1,
            //     type: "user",
            //     avatar: "👤",
            //     sender: "사용자",
            //     time: "01:32",
            //     text: (
            //         <>
            //             주인 시스템의 성능을 위해서는 데이터 분석이 핵심입니다.
            //             <br /><br />
            //             보유한 데이터:
            //             <br />• 사용자 행동 데이터 (클릭, 구매, 체류시간)
            //             <br />• 상품 정보 (카테고리, 가격, 설명)
            //             <br />• 사용자 프로필 (연령, 성별, 지역)
            //             <br />• 계절성 및 트렌드 데이터
            //             <br /><br />
            //             성과 지표(KPI):
            //             <br />• CTR (Click-Through Rate)
            //             <br />• CVR (Conversion Rate)
            //             <br />• 평균 주문 금액
            //             <br />• 사용자 만족도
            //         </>
            //     )
            // },
            // {
            //     id: 2,
            //     type: "agent",
            //     avatar: "🔍",
            //     sender: "🔍 리서치 에이전트",
            //     time: "01:33",
            //     text: (
            //         <>
            //             네, 제공해주신 데이터와 KPI를 바탕으로 시장 조사를 진행했습니다.
            //             <br /><br />
            //             📚 참조 문서: 업로드된 지식베이스 파일을 기반으로 답변드리겠습니다.
            //             <br /><br />
            //             조사 결과:
            //             <br />1. 경쟁사 분석 및 시장 트렌드
            //             <br />2. 사용자 행동 패턴 연구
            //             <br />3. 업계 벤치마크 데이터 수집
            //             <br /><br />
            //             분석 전문가에게 데이터를 전달하겠습니다.
            //         </>
            //     )
            // },
            // {
            //     id: 3,
            //     type: "agent",
            //     avatar: "📊",
            //     sender: "📊 분석 에이전트",
            //     time: "01:34",
            //     text: (
            //         <>
            //             리서치 에이전트가 수집한 데이터를 분석했습니다.
            //             <br /><br />
            //             분석 결과:
            //             <br />1. 사용자 세그멘테이션 분석
            //             <br />2. 구매 패턴 및 행동 분석
            //             <br />3. 성과 지표 상관관계 분석
            //             <br />4. 계절성 및 트렌드 영향 분석
            //             <br /><br />
            //             코딩 에이전트에게 구현 요청을 보내겠습니다.
            //         </>
            //     )
            // },
            // {
            //     id: 4,
            //     type: "agent",
            //     avatar: "💻",
            //     sender: "💻 코딩 에이전트",
            //     time: "01:35",
            //     avatarBg: "#10b981",
            //     text: (
            //         <>
            //             분석 결과를 바탕으로 추천 시스템 코드를 구현했습니다.
            //             <br /><br />
            //             구현 내용:
            //             <br />• Python 기반 데이터 전처리 스크립트
            //             <br />• 머신러닝 모델 구현 (collaborative filtering)
            //             <br />• 성과 지표 모니터링 대시보드
            //             <br />• API 엔드포인트 설계
            //             <br /><br />
            //             모든 에이전트가 협업하여 완성된 솔루션입니다.
            //         </>
            //     )
            // }
        ]
    );

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

    // 에이전트 선택 모달 활성화
    const [Agent, setAgent] = useState(false);

    // 어시스턴트 기본세팅 값
    const [AssistantSettings, setAssistantSettings] = useState({
        LLM: "exaone-3.5",

    });


    // 채팅로직 시작
    const [userInput, setuserInput] = useState("");
    const sendMessage = async () => {
        if (!userInput.trim()) return;
        setuserInput(""); // userinput 초기화

        const userMessage = {
            id: Date.now(), // 고유 ID
            type: "user",
            avatar: "👤",
            sender: "사용자",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            text: userInput
        };
        setMessages(prev => [...prev, userMessage]);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/TEST/googletest`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                messageInput: userInput,
                selected_model: AssistantSettings.LLM

                // project_id: 102,
                // user_email: "dudqls327@naver.com",
                // session: "newSession_2025-08-19",
            }),
        });
        const data = await response.json();
        if (response.ok) {
            console.log("API 응답:", data);

            // 3. agent 메시지 추가
            const agentMessage = {
                id: Date.now() + 1,
                type: "agent",
                avatar: "🤖",
                sender: "AI 에이전트",
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                text: data.response // API가 주는 응답
            };

            setMessages(prev => [...prev, agentMessage]);

        }
    };

    const chatEndRef = useRef(null);
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);


    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // textarea 줄바꿈 방지
            sendMessage();
        }
    };








    return (
        <>
            <div className={`modal-overlay ${Agent ? 'active' : ''}`}>
                <AgentHandler setAgent={setAgent} agents={agents} setAgents={setAgents} />
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
                            <button className="primary-btn" id="new-conversation-btn">
                                <span>+</span>
                                <span>새 대화</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* 멀티 에이전트 모드 콘텐츠 */}
                <div className={`assistant-layout multi-agent`} id="multi-agent-layout">
                    {/* 좌측 통합 사이드바 */}
                    <div className="chat-sidebar">


                        <div className="sidebar-section">
                            <h3 className="sidebar-title">
                                <span>🧠</span>
                                <span>AI 모델</span>
                            </h3>
                            <select className="llm-selector" id="llm-selector" value={AssistantSettings.LLM}
                                onChange={(e) =>
                                    setAssistantSettings({
                                        ...AssistantSettings,
                                        LLM: e.target.value
                                    })
                                }
                            >
                                <option value="claude-3-opus">Claude 3 Opus</option>
                                <option value="claude-3-sonnet">Claude 3 Sonnet</option>
                                <option value="claude-3-haiku">Claude 3 Haiku</option>

                                <option value="gpt-4">GPT-4</option>
                                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>

                                <option value="exaone-3.5">Exaone-3.5</option>

                                <option value="gemini-2.5-pro">gemini-2.5-pro</option>
                                <option value="gemini-2.5-flash">gemini-2.5-flash</option>
                                <option value="gemini-2.5-flash-lite">gemini-2.5-flash-lite</option>
                                <option value="gemini-live-2.5-flash-preview">gemini-live-2.5-flash-preview</option>
                                <option value="gemini-2.5-flash-preview-native-audio-dialog & gemini-2.5-flash-exp-native-audio-thinking-dialog">gemini-2.5-flash-preview-native-audio-dialog & gemini-2.5-flash-exp-native-audio-thinking-dialog</option>
                                <option value="gemini-2.0-flash">gemini-2.0-flash</option>
                                <option value="gemini-2.0-flash-preview-image-generation">gemini-2.0-flash-preview-image-generation</option>
                                <option value="gemini-2.0-flash-lite">gemini-2.0-flash-lite</option>
                                <option value="gemini-2.0-flash-live-001">gemini-2.0-flash-live-001</option>
                                <option value="gemini-1.5-flash">gemini-1.5-flash</option>
                                <option value="gemini-1.5-flash-8b">gemini-1.5-flash-8b	</option>
                                <option value="gemini-1.5-pro">gemini-1.5-pro	</option>


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
                                {agents.filter(agent => agent.active).length === 0 ? (
                                    <div className="empty-agents">
                                        <div className="empty-icon">🤖</div>
                                        <p>활성 에이전트가 없습니다</p>
                                    </div>
                                ) : (
                                    agents
                                        .filter(agent => agent.active)
                                        .map(agent => (
                                            <div key={agent.id} className="agent-item">
                                                <div
                                                    className="agent-avatar"
                                                    style={{ background: agent.avatarBg }}
                                                >
                                                    {agent.avatar}
                                                </div>
                                                <div className="agent-info">
                                                    <div className="agent-name">📍 {agent.name}</div>
                                                    <div className="agent-description">{agent.description}</div>
                                                    <div className="agent-model">{agent.model}</div>
                                                </div>
                                                <div className="agent-status">
                                                    <div className="status-dot"></div>
                                                </div>
                                            </div>
                                        ))
                                )}
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

                        {/* 채팅창 영역 */}
                        <div className="chat-messages" id="multi-chat-messages">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`message ${msg.type === "user" ? "user-message" : ""}`}
                                >
                                    <div
                                        className={`message-avatar ${msg.type === "agent" ? "agent-avatar-msg" : "user-avatar"}`}
                                        style={msg.avatarBg ? { background: msg.avatarBg } : {}}
                                    >
                                        {msg.avatar}
                                    </div>
                                    <div className="message-content">
                                        <div className={`message-header ${msg.sender === "사용자" ? "user" : ""}`}>
                                            <div className="message-sender">{msg.sender}</div>
                                            <div className="message-time">{msg.time}</div>
                                        </div>
                                        <div className="message-text">{msg.text}</div>
                                    </div>
                                </div>
                            ))}

                            {/* 마지막 메시지 참조 */}
                            <div ref={chatEndRef} />
                        </div>

                        <div className="chat-input-area">
                            <div className="attachment-preview" id="multi-attachment-preview">
                                {/* 첨부파일 미리보기가 여기에 동적으로 추가됩니다 */}
                            </div>

                            <div className="chat-input-wrapper">
                                <button className="attachment-btn"
                                    // onClick="openFileAttachment('multi')"
                                    title="파일 첨부">📎</button>
                                <textarea
                                    className="chat-input"
                                    id="multi-chat-input"
                                    placeholder="메시지를 입력하세요... (Shift+Enter로 줄바꿈, Enter로 전송)"
                                    rows="1"
                                    value={userInput}
                                    onChange={(e) => setuserInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                ></textarea>



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

function AgentHandler({ setAgent, agents, setAgents }) {
    // 체크박스 토글 핸들러
    const handleToggle = (id) => {
        setAgents((prevAgents) =>
            prevAgents.map((agent) =>
                agent.id === id ? { ...agent, active: !agent.active } : agent
            )
        );
    };

    return (
        <div className="modal agents-management">
            <div className="modal-header">
                <h2 className="modal-title">에이전트 관리</h2>
                <button className="modal-close" onClick={() => setAgent(false)}>
                    &times;
                </button>
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
                                <div className="agent-toggle">
                                    <input
                                        type="checkbox"
                                        id={`${agent.id}-agent`}
                                        checked={agent.active}
                                        onChange={() => handleToggle(agent.id)}
                                    />
                                </div>
                            </div>
                            <div className="agent-card-info">
                                <h5>{agent.name}</h5>
                                <p>{agent.desc}</p>
                                <div className="agent-capabilities">
                                    {(agent.capabilities ?? []).map((cap, idx) => (
                                        <span key={idx} className="capability-tag">
                                            {cap}
                                        </span>
                                    ))}
                                </div>
                                <div className="agent-model-info">모델: {agent.model}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="modal-footer">
                <button className="secondary-btn">취소</button>
                <button className="primary-btn">설정 저장</button>
            </div>
        </div>
    );
}