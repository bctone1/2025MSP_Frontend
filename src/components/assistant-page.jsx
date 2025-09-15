'use client';
import { useState, useEffect, useRef } from 'react';
import { formatDate, storage, formatFileSize, modalheader } from '@/utill/utill';
import "@/styles/assistant-page.css"
import { useSession } from "next-auth/react";

export default function AssistantPage({ onMenuClick, currentProject, setcurrentProject, currentSession, setcurrentSession }) {
    const { data: session } = useSession();
    const hasFetched = useRef(false);

    // 에이전트 선택 모달 활성화
    const [Agent, setAgent] = useState(false);
    const [Knowledge, setKnowledge] = useState(false);

    const [conversations, setconversations] = useState([]);
    const fetchChatSessions = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/MSP_CHAT/msp_read_chat_session_by_user`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ user_id: session?.user?.id }),
                }
            );
            const data = await response.json();
            console.log("✅ API 응답:", data);
            setconversations(data.sessions);
        } catch (error) {
            console.error("❌ 네트워크 오류:", error);
        }
    };

    useEffect(() => {
        if (!session?.user?.id) return;
        if (hasFetched.current) return;
        hasFetched.current = true;
        fetchChatSessions();
    }, [session?.user?.id]);

    useEffect(() => {
        if (currentSession.id === 0) return;
        const fetchMessages = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/MSP_CHAT/msp_read_message_by_session`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ session_id: currentSession.id }),
                    }
                );
                const data = await response.json();
                setMessages(data);
            } catch (error) {
                console.error("❌ 네트워크 오류:", error);
            }
        };

        fetchMessages();
    }, [currentSession]);

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
            name: "exaone-3.5",
            desc: "LG AI Research의 최신 멀티모달 모델",
        },
        {
            name: "claude-3-sonnet",
            desc: "Anthropic의 고성능 대화 모델",
        },
        {
            name: "gpt-4o",
            desc: "OpenAI의 최신 멀티모달 모델",
        },
        {
            name: "gemini-1.5-flash",
            desc: "Google의 차세대 AI 모델",
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
                        className={`assistant-agent-card ${agent.active ? "active" : ""}`}
                        data-agent={agent.id}
                    >
                        <div className="assistant-agent-card-header">
                            <div
                                className="assistant-agent-card-avatar"
                                style={{ background: agent.avatarBg }}
                            >
                                {agent.avatar}
                            </div>
                            <div className="assistant-agent-card-info">
                                <h5>{agent.name}</h5>
                                <p>{agent.desc}</p>
                                <div className="assistant-agent-capabilities">
                                    {agent.capabilities.map((cap, idx) => (
                                        <span key={idx} className="assistant-capability-tag">
                                            {cap}
                                        </span>
                                    ))}
                                </div>
                                <div className="agent-model-info">모델: {agent.model}</div>
                            </div>
                            <div className="assistant-agent-toggle">
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

    const fetchKnowledges = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/MSP_KNOWLEDGE/msp_get_knowledge_by_user`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ user_id: session?.user?.id }),
                }
            );
            const data = await response.json();
            console.log("✅ 지식베이스:", data);
            if (data.kbowledges) setknowledgeFiles(data.kbowledges);
        } catch (error) {
            console.error("❌ 네트워크 오류:", error);
        }
    }
    useEffect(() => {
        if (!session?.user?.id) return;

        fetchKnowledges();
    }, [session?.user?.id])

    // 데이터에 있는 파일 목록
    const [knowledgeFiles, setknowledgeFiles] = useState([]);
    // 필터 적용된 파일 목록
    const filteredFiles = [...knowledgeFiles];
    // 세션에 저장된 파일
    const [selectedFiles, setSelectedFiles] = useState(new Set());
    // 임시 저장된 파일
    const [tempSelectedFiles, setTempSelectedFiles] = useState(new Set());

    const handleAddSelected = async () => {
        alert("세션에 지식 베이스 추가 요청");
        console.log(tempSelectedFiles);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/MSP_KNOWLEDGE/msp_add_session_knowledge_association`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_id: session?.user?.id,
                        session_id: currentSession?.id,
                        knowledge_ids: Array.from(tempSelectedFiles)
                    }),
                }
            );
            const data = await response.json();
            console.log("✅ 세션에 추가된 지식:", data);
            setSelectedFiles(new Set([...selectedFiles, ...tempSelectedFiles]));
            setKnowledge(false);
            fetchChatSessions();
            if (data.title) {
                setcurrentSession({ id: data.session_id, title: data.title });
            } else {
                setcurrentSession(prev => ({ ...prev, id: data.session_id }));
            }

            // if (data.kbowledges) setknowledgeFiles(data.kbowledges);
        } catch (error) {
            console.error("❌ 네트워크 오류:", error);
        }


    };

    const RenderKnowledgeFiles = () => {
        const toggleFileSelection = (fileId) => {
            setTempSelectedFiles(prev => {
                const newSet = new Set(prev);
                if (newSet.has(fileId)) newSet.delete(fileId);
                else newSet.add(fileId);
                return newSet;
            });
        };

        return (
            <>
                {filteredFiles.length === 0 && (
                    <div
                        style={{
                            gridColumn: "1/-1",
                            textAlign: "center",
                            padding: "var(--spacing-8)",
                            color: "var(--gray-500)",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "48px",
                                marginBottom: "var(--spacing-4)",
                            }}
                        >
                            📁
                        </div>
                        <p>검색 결과가 없습니다.</p>
                    </div>
                )}

                {filteredFiles.map((file) => {
                    const fileIcon = getKnowledgeFileIcon(file.type);
                    const isSelected = tempSelectedFiles.has(file.id);

                    return (
                        <div
                            key={file.id}
                            className={`assistant-knowledge-file-item ${isSelected ? "selected" : ""}`}
                            data-file-id={file.id}
                            onClick={() => toggleFileSelection(file.id)}
                            title={file.origin_name}
                        >
                            <input
                                type="checkbox"
                                className="assistant-file-checkbox"
                                checked={isSelected}
                                onChange={() => toggleFileSelection(file.id)}
                                onClick={(e) => e.stopPropagation()}
                            />

                            <div className={`assistant-file-type-icon ${file.type}`}>{fileIcon}</div>

                            <div className="assistant-knowledge-file-info">
                                <div className="assistant-knowledge-file-title">{file.origin_name}</div>

                                <div className="assistant-knowledge-file-meta">
                                    <span>{file.size}KB</span> <br />
                                    <span>{file.created_at?.split("T")[0]}</span>
                                </div>

                                <div className="assistant-knowledge-file-desc">{file.description}</div>

                                <div className="assistant-knowledge-file-tags">
                                    {/* <span className="assistant-knowledge-tag folder">{getFolderName(file.folder)}</span> */}
                                    {file.tags.map((tag, index) => (
                                        <span key={index} className="assistant-knowledge-tag">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </>
        );
    };

    const [Delete, setDelete] = useState(false);
    const [Setting, setSetting] = useState(false);

    const [messages, setMessages] = useState([]);

    const chatEndRef = useRef(null);
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const [userInput, setuserInput] = useState("");

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // textarea 줄바꿈 방지
            sendMessage();
        }
    };

    const [AssistantSettings, setAssistantSettings] = useState({
        LLM: "gemini-1.5-flash",
    });



    const sendMessage = async () => {
        if (!userInput.trim()) return;
        setuserInput("");
        const userMessage = {
            id: Date.now(), // 고유 ID
            type: "user",
            role: "user",
            created_at: new Date(),
            content: userInput
        };
        setMessages(prev => [...prev, userMessage]);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/MSP_CHAT/msp_request_message`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_input: userInput,
                chat_model: AssistantSettings.LLM,
                session_id: currentSession.id,
                user_id: session?.user?.id,
                role: "user",
                project_id: currentProject.id
            }),
        });
        const data = await response.json();
        if (response.ok) {
            console.log("API 응답:", data);
            fetchChatSessions();
            if (data.title) {
                setcurrentSession({ id: data.session_id, title: data.title });
            } else {
                setcurrentSession(prev => ({ ...prev, id: data.session_id }));
            }
            const Message = {
                id: Date.now() + 1,
                type: "agent",
                role: "assistant",
                // created_at: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                created_at: new Date(),
                content: JSON.stringify(data.response)
            };
            setMessages(prev => [...prev, Message]);
        }
    };

    const newChat = async () => {
        // alert("newchat");
        setcurrentProject({});
        setcurrentSession({ id: 0 });
        setMessages([]);
        setSelectedFiles(new Set());
    }

    const renderKnowledge = async (conv) => {
        if (currentSession.id === conv.id) return console.log("동일한 세션이라 요청 취소");
        // alert("knowledge 랜더링");
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/MSP_KNOWLEDGE/msp_get_session_knowledge_association`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ session_id: conv.id }),
                }
            );
            const data = await response.json();
            const ids = data.knowledge_ids || [];
            console.log("✅ API 응답:", data);
            setSelectedFiles(new Set(ids));
        } catch (error) {
            console.error("❌ 네트워크 오류:", error);
        }
    }

    const renderSession = async (conv) => {
        if (currentSession.id === conv.id) return console.log("동일한 세션이라 요청 취소");
        setcurrentSession({ id: conv.id, title: conv.title });

        conv.project_name
            ? setcurrentProject({ name: conv.project_name })
            : setcurrentProject({});

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/MSP_CHAT/msp_read_message_by_session`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ session_id: conv.id }),
                }
            );
            const data = await response.json();
            console.log("✅ API 응답:", data);
            setMessages(data)
        } catch (error) {
            console.error("❌ 네트워크 오류:", error);
        }
    }

    const fileInputRef = useRef(null);
    // 버튼 클릭 시 파일 선택창 열기
    const handleFileSelect = () => {
        fileInputRef.current.click();
    };
    // 파일 선택 후 동작
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // console.log("선택된 파일:", file.name);
            // 여기서 업로드 로직 추가 가능
        }
    };


    const UpdateAttachedFilesList = () => {
        // selectedFiles에 포함된 파일만 필터링
        const attachedFilesList = knowledgeFiles.filter((file) =>
            selectedFiles.has(file.id)
        );

        const handleRemoveFile = (fileId) => {
            const newSelectedFiles = new Set(selectedFiles);
            newSelectedFiles.delete(fileId);
            setSelectedFiles(newSelectedFiles);
        };

        return (
            <>
                {selectedFiles.size === 0 && (
                    <div className="empty-files">
                        <div className="empty-icon">📁</div>
                        <p>첨부된 파일이 없습니다</p>
                    </div>
                )}

                {attachedFilesList.map((file) => (
                    <div className="attached-file-item" key={file.id}>
                        <div className="file-icon">{getKnowledgeFileIcon(file.type)}</div>
                        <div className="file-info">
                            <div className="file-name" title={`${file.name}`}>{truncateFileName(file.origin_name)}</div>
                            <div className="file-size">{file.size}KB</div>
                        </div>
                        <button className="remove-file-btn" onClick={() => handleRemoveFile(file.id)}>
                            ✕
                        </button>
                    </div>
                ))}
            </>
        );
    };

    return (
        <>

            {/* 모달창 모음 */}
            <div className={`modal-overlay ${Agent ? 'active' : ''}`}>
                <AgentHandler
                    setAgent={setAgent}
                    AgentCards={<AgentCards agents={agents} setagents={setagents} />}
                />
            </div>

            <div className={`modal-overlay ${Knowledge ? 'active' : ''}`}>
                <KnowledgeHandler
                    setKnowledge={setKnowledge}
                    RenderKnowledgeFiles={<RenderKnowledgeFiles />}
                    selectedFiles={tempSelectedFiles}
                    handleAddSelected={handleAddSelected}
                />
            </div>

            <div className={`modal-overlay ${Delete ? 'active' : ''}`}>
                <ConfirmClearChat setDelete={setDelete} setMessages={setMessages} />
            </div>

            <div className={`modal-overlay ${Setting ? 'active' : ''}`}>
                <SettingChat setSetting={setSetting} />
            </div>




            <div className="assistant_container">
                {/* 좌측 채팅 사이드바 - 카드형 디자인 */}
                <div className="assistant-chat-sidebar">
                    {/* 최근 대화 카드 */}
                    <div className="sidebar-card conversations-card">
                        <div className="assistant-card-header">
                            <div className="assistant-card-title">💬 최근 대화</div>
                            <button className="assistant-primary-btn" id="assistant-new-chat-btn"
                                onClick={() => newChat()}
                                disabled={currentSession.id === 0}
                            >
                                <span>+</span>
                                <span>새 대화</span>
                            </button>
                        </div>

                        <div className="assistant-conversations-list" id="conversations-list">
                            {conversations.map((conv, index) => (
                                <div
                                    key={index}
                                    className={`conversation-item ${conv.id === currentSession.id ? "active" : ""}`}
                                    onClick={() => { renderSession(conv), renderKnowledge(conv) }}
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

                        <div className="files-count">📄 첨부된 파일 ({selectedFiles.size}개)</div>

                        <div className="knowledge-files" id="attached-files-list">
                            {<UpdateAttachedFilesList />}
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
                                <div className="chat-title" id="chat-title">
                                    {currentSession.title}
                                    {currentProject?.name && (
                                        <span className="project-name">( {currentProject.name} )</span>
                                    )}
                                </div>
                                <div className="chat-agents" id="chat-agents">
                                    {/* 활성 에이전트 뱃지들이 여기에 동적으로 추가됩니다 */}
                                    <UpdateChatAgentsBadges agents={agents} />
                                </div>
                            </div>

                            <div className="chat-controls">
                                <button className="control-btn" title="대화 지우기" onClick={() => setDelete(true)}>🗑️</button>
                                <button className="control-btn" title="설정" onClick={() => setSetting(true)}>⚙️</button>
                            </div>
                        </div>

                        {/* 채팅창 영역 */}
                        <div className="chat-messages" id="chat-messages">
                            {/* 초기 웰컴 메시지 */}
                            {messages.length === 0 && (
                                <div className="welcome-message" id="welcome-message">
                                    <div className="welcome-icon">💬</div>
                                    <div className="welcome-title">{session?.user?.name}님, 무엇을 도와드릴까요?</div>
                                    <div className="welcome-subtitle">멀티 에이전트와 함께 다양한 작업을 시작해보세요</div>
                                </div>
                            )}


                            {messages.map((msg) => {
                                const date = new Date(msg.created_at);
                                date.setHours(date.getHours() + 9);
                                return (
                                    <div
                                        key={msg.id}
                                        className={`message ${msg.role === "user" ? "user-message" : ""}`}
                                    >
                                        <div
                                            className={`message-avatar ${msg.role === "assistant" ? "agent-avatar-msg" : "user-avatar"}`}
                                            style={msg.avatarBg ? { background: msg.avatarBg } : {}}
                                        >
                                            {msg.role === "assistant" ? "🤖" : "👤"}
                                        </div>
                                        <div className="message-content">
                                            <div className={`message-header ${msg.role === "user" ? "user" : ""}`}>
                                                <div className="message-sender">{msg.role === "user" ? session?.user?.name : msg.role}</div>
                                                <div className="message-time">
                                                    {date.toLocaleString("ko-KR", {
                                                        month: "2-digit",
                                                        day: "2-digit",
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        hour12: false,
                                                    })}
                                                </div>
                                            </div>
                                            <div className="message-text">{msg.content}</div>
                                        </div>
                                    </div>
                                )
                            })}

                            {/* 마지막 메시지 참조 */}
                            <div ref={chatEndRef} />

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
                                            <div className="menu-item"
                                                onClick={() => { setKnowledge(true), setTempSelectedFiles(selectedFiles); }}
                                            >
                                                <div className="menu-item-icon">📚</div>
                                                <div className="menu-item-text">
                                                    <div className="menu-item-title">지식베이스 라이브러리</div>
                                                    <div className="menu-item-desc">저장된 지식베이스에서 선택</div>
                                                </div>
                                            </div>
                                            <div className="menu-item"
                                                onClick={handleFileSelect}
                                            >
                                                <div className="menu-item-icon">📎</div>
                                                <div className="menu-item-text">
                                                    <div className="menu-item-title">파일 첨부</div>
                                                    <div className="menu-item-desc">현재 대화에 파일 첨부</div>
                                                </div>

                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    style={{ display: "none" }}
                                                    onChange={handleFileChange}
                                                />

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
                                    value={userInput}
                                    onChange={(e) => setuserInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                ></textarea>

                                <div className="input-actions">
                                    {/* 모델 선택 버튼  */}
                                    <div className="model-selector-btn" id="model-selector-btn"
                                        onClick={() => setdropdown((prev) => !prev)}
                                    >
                                        {/* <span className="model-icon" id="model-icon">🧠</span> */}
                                        <span className="model-name" id="current-model-name">{AssistantSettings.LLM}</span>
                                        <span className="dropdown-arrow">▼</span>

                                        {/* 모델 선택 드롭다운 */}
                                        <div className={`model-dropdown-menu ${dropdown ? "open" : ""}`} id="model-dropdown-menu">
                                            {models.map((model) => (
                                                <div className="model-item" key={model.name}
                                                    onClick={() =>
                                                        setAssistantSettings({
                                                            ...AssistantSettings,
                                                            LLM: model.name
                                                        })
                                                    }
                                                >
                                                    <div className="model-item-info">
                                                        {/* <div className="model-item-icon">{model.icon}</div> */}
                                                        <div className="model-item-text">
                                                            <div className="model-item-title">{model.name}</div>
                                                            <div className="model-item-desc">{model.desc}</div>
                                                        </div>
                                                    </div>
                                                    <span
                                                        className={`model-check ${model.name === AssistantSettings.LLM ? "active" : ""}`}
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

function SettingChat({ setSetting }) {
    return (
        <>
            <div className="assistant-modal settings-modal">
                <div className="assistant-modal-header">
                    <h2 className="assistant-modal-title">설정</h2>
                    <button className="assistant-modal-close"
                        onClick={() => setSetting(false)}
                    >&times;</button>
                </div>
                <div className="assistant-modal-body">
                    {/* 자동저장 설정  */}
                    <div className="settings-section">
                        <h3 className="settings-section-title">대화 설정</h3>
                        <div className="setting-item">
                            <div className="setting-info">
                                <div className="setting-label">자동저장</div>
                                <div className="setting-desc">대화를 자동으로 저장합니다</div>
                            </div>
                            <div className="setting-toggle">
                                <input type="checkbox" id="auto-save-toggle" checked readOnly />
                            </div>
                        </div>
                    </div>

                    {/* 인터페이스 설정  */}
                    <div className="settings-section">
                        <h3 className="settings-section-title">인터페이스 설정</h3>
                        <div className="setting-item">
                            <div className="setting-info">
                                <div className="setting-label">다크모드</div>
                                <div className="setting-desc">어두운 테마로 전환합니다</div>
                            </div>
                            <div className="setting-toggle">
                                <input type="checkbox" id="dark-mode-toggle" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="assistant-modal-footer">
                    <button className="assistant-primary-btn"
                        onClick={() => setSetting(false)}
                    >확인</button>
                </div>
            </div>

        </>
    )
}

function ConfirmClearChat({ setDelete, setMessages }) {
    return (
        <>
            <div className="assistant-modal clear-chat-modal" style={{ maxWidth: "400px" }}>
                <div className="assistant-modal-header">
                    <h2 className="assistant-modal-title">대화 지우기</h2>
                    <button className="assistant-modal-close"
                        onClick={() => setDelete(false)}
                    >&times;</button>
                </div>
                <div className="assistant-modal-body">
                    <p style={{ color: "var(--gray-600)", textAlign: "center", marginBottom: "var(--spacing-4)" }}>
                        현재 대화의 모든 메시지와 첨부파일이 삭제됩니다.
                    </p>
                    <p style={{ color: "var(--danger-red)", textAlign: "center", fontWeight: "600" }}>
                        이 작업은 되돌릴 수 없습니다.
                    </p>
                </div>
                <div className="assistant-modal-footer">
                    <button className="assistant-secondary-btn"
                        onClick={() => setDelete(false)}
                    >취소</button>
                    <button className="assistant-primary-btn" style={{ background: "var(--danger-red)" }}
                        onClick={() => {
                            setMessages([]);
                            setDelete(false);
                        }}
                    >지우기</button>
                </div>
            </div >
        </>
    )
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
            <div className="assistant-modal assistant-agents-management">
                <div className="assistant-modal-header">
                    <h2 className="assistant-modal-title">에이전트 관리</h2>
                    <button className="assistant-modal-close"
                        onClick={() => setAgent(false)}
                    >&times;</button>
                </div>
                <div className="assistant-modal-body">
                    <p
                        style={{
                            color: "var(--gray-600)",
                            marginBottom: "var(--spacing-6)",
                            textAlign: "center",
                        }}
                    >
                        활성화할 에이전트를 선택하세요. 선택된 에이전트들이 대화에 참여합니다.
                    </p>
                    <div className="assistant-agents-grid" id="agents-grid">
                        {/* 에이전트 카드들이 여기에 동적으로 추가됩니다  */}
                        {AgentCards}
                    </div>
                </div>
                <div className="assistant-modal-footer">
                    <button className="assistant-secondary-btn"
                        onClick={() => setAgent(false)}
                    >취소</button>
                    <button className="assistant-primary-btn"
                        onClick={() => setAgent(false)}
                    >설정 저장</button>
                </div>
            </div>
        </>
    );
}

function KnowledgeHandler({ setKnowledge, RenderKnowledgeFiles, selectedFiles, handleAddSelected }) {
    const handle_knowledge = async () => {
        console.log(selectedFiles);
        setKnowledge(false);
    }
    return (
        <>
            <div className="modal knowledge-library-modal" style={{ maxWidth: "1000px", width: "95%" }}>
                <div className="assistant-modal-header">
                    <h2 className="assistant-modal-title">지식베이스 라이브러리</h2>
                    <button className="assistant-modal-close"
                        onClick={() => setKnowledge(false)}
                    >&times;</button>
                </div>
                <div className="assistant-modal-body">
                    <div className="assistant-knowledge-toolbar">
                        <div className="knowledge-search">
                            <input type="text" id="knowledge-search-input" placeholder="파일명, 태그, 내용 검색..." className="knowledge-search-input" />
                            <button className="knowledge-search-btn" >🔍</button>
                        </div>
                        <div className="knowledge-filters">
                            <select id="folder-filter" className="filter-select">
                                <option value="">모든 폴더</option>
                                <option value="projects">프로젝트별 문서</option>
                                <option value="reports">보고서</option>
                                <option value="references">참고 자료</option>
                                <option value="personal">개인 문서</option>
                            </select>
                            <select id="type-filter" className="filter-select">
                                <option value="">모든 파일</option>
                                <option value="pdf">PDF</option>
                                <option value="doc">문서</option>
                                <option value="excel">스프레드시트</option>
                                <option value="ppt">프레젠테이션</option>
                            </select>
                            <button className="view-toggle-btn" id="view-toggle" >📋</button>
                        </div>
                    </div>

                    <div className="knowledge-content">
                        <div className="knowledge-stats">
                            <span id="file-count">총 187개 파일</span>
                            <span id="selected-count">0개 선택됨</span>
                        </div>

                        <div className="assistant-knowledge-files-grid" id="knowledge-files-grid">
                            {/* 파일들이 동적으로 렌더링됩니다  */}
                            {RenderKnowledgeFiles}
                        </div>
                    </div>
                </div>
                <div className="assistant-modal-footer">
                    <div className="assistant-footer-left">
                        <button className="assistant-secondary-btn" >전체 선택</button>
                        <button className="assistant-secondary-btn" >선택 해제</button>
                    </div>
                    <div className="assistant-footer-right">
                        <button className="assistant-secondary-btn"
                            onClick={() => setKnowledge(false)}
                        >취소</button>
                        <button className="assistant-primary-btn" id="add-selected-btn" disabled={selectedFiles.size === 0}
                            // onClick={() => handle_knowledge()}
                            onClick={handleAddSelected}

                        >
                            선택된 파일 추가 (<span id="selected-file-count">{selectedFiles.size}</span>)
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

function getKnowledgeFileIcon(type) {
    const icons = {
        "application/pdf": '📄',
        doc: '📄',
        excel: '📊',
        ppt: '📽️'
    };
    return icons[type] || '📎';
}

function getFolderName(folder) {
    const folderNames = {
        projects: '프로젝트별 문서',
        reports: '보고서',
        references: '참고 자료',
        personal: '개인 문서'
    };
    return folderNames[folder] || folder;
}

// 파일명 자르기 함수
function truncateFileName(fileName, maxLength = 20) {
    if (fileName.length <= maxLength) return fileName;
    const extension = fileName.split('.').pop();
    const baseName = fileName.substring(0, fileName.lastIndexOf('.'));
    const truncatedBaseName = baseName.substring(0, maxLength - extension.length - 4);
    return `${truncatedBaseName}...${extension}`;
}