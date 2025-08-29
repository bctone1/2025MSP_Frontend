'use client';
import { useState, useEffect, useRef } from 'react';
import { formatDate, storage, formatFileSize, modalheader } from '@/utill/utill';
import "@/styles/assistant-page.css"

export default function AssistantPage({ onMenuClick, projectName }) {
    // 에이전트 선택 모달 활성화
    const [Agent, setAgent] = useState(false);

    return (
        <>
            <div className={`modal-overlay ${Agent ? 'active' : ''}`}>
                <AgentHandler />
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
                            <div className="conversation-item active">
                                <div className="conversation-header">
                                    <div className="assistant-conversation-title">현재 대화</div>
                                    <div className="conversation-time">진행중</div>
                                </div>
                                <div className="assistant-conversation-preview">새로운 대화를 시작해보세요...</div>
                            </div>
                            <div className="conversation-item">
                                <div className="conversation-header">
                                    <div className="assistant-conversation-title">프로젝트 기획 논의</div>
                                    <div className="conversation-time">01:32</div>
                                </div>
                                <div className="assistant-conversation-preview">주요 시스템의 성능을 위해서는 데이터 처리 최적화가 필요합니다...</div>
                            </div>
                            <div className="conversation-item">
                                <div className="conversation-header">
                                    <div className="assistant-conversation-title">Python 데이터 분석</div>
                                    <div className="conversation-time">14:32</div>
                                </div>
                                <div className="assistant-conversation-preview">pandas를 사용한 데이터 전처리 방법에 대해 알아보겠습니다...</div>
                            </div>
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
                                <div className="chat-title" id="chat-title">프로젝트명 / 대화명</div>
                                <div className="chat-agents" id="chat-agents">
                                    {/* 활성 에이전트 뱃지들이 여기에 동적으로 추가됩니다 */}
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
                                <div className="welcome-title">김개발자님, 무엇을 도와드릴까요?</div>
                                <div className="welcome-subtitle">멀티 에이전트와 함께 다양한 작업을 시작해보세요</div>
                            </div>
                        </div>

                        <div className="chat-input-area">
                            <div className="chat-input-wrapper">
                                {/* + 버튼 */}
                                <div className="plus-btn" id="plus-btn" >
                                    +
                                    {/* 통합 팝업 메뉴 */}
                                    <div className="plus-menu" id="plus-menu">
                                        <div className="menu-section">
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
                                    <div className="model-selector-btn" id="model-selector-btn" >
                                        <span className="model-icon" id="model-icon">🧠</span>
                                        <span className="model-name" id="current-model-name">EXAONE 4.0</span>
                                        <span className="dropdown-arrow">▼</span>

                                        {/* 모델 선택 드롭다운 */}
                                        <div className="model-dropdown-menu" id="model-dropdown-menu">
                                            <div className="model-item" >
                                                <div className="model-item-info">
                                                    <div className="model-item-icon">🧠</div>
                                                    <div className="model-item-text">
                                                        <div className="model-item-title">EXAONE 4.0</div>
                                                        <div className="model-item-desc">LG AI Research의 최신 멀티모달 모델</div>
                                                    </div>
                                                </div>
                                                <span className="model-check active" id="check-exaone-4">✓</span>
                                            </div>
                                            <div className="model-item" >
                                                <div className="model-item-info">
                                                    <div className="model-item-icon">🤖</div>
                                                    <div className="model-item-text">
                                                        <div className="model-item-title">Claude 3.5 Sonnet</div>
                                                        <div className="model-item-desc">Anthropic의 고성능 대화 모델</div>
                                                    </div>
                                                </div>
                                                <span className="model-check" id="check-claude-3.5-sonnet">✓</span>
                                            </div>
                                            <div className="model-item" >
                                                <div className="model-item-info">
                                                    <div className="model-item-icon">🚀</div>
                                                    <div className="model-item-text">
                                                        <div className="model-item-title">GPT-4o</div>
                                                        <div className="model-item-desc">OpenAI의 최신 멀티모달 모델</div>
                                                    </div>
                                                </div>
                                                <span className="model-check" id="check-gpt-4o">✓</span>
                                            </div>
                                            <div className="model-item" >
                                                <div className="model-item-info">
                                                    <div className="model-item-icon">⚡</div>
                                                    <div className="model-item-text">
                                                        <div className="model-item-title">Gemini 2.0 Flash</div>
                                                        <div className="model-item-desc">Google의 차세대 AI 모델</div>
                                                    </div>
                                                </div>
                                                <span className="model-check" id="check-gemini-2.0-flash">✓</span>
                                            </div>
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

function AgentHandler({ }) {
    return (
        <>
            dkdk
        </>
    );
}