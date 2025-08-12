'use client';

import { useState } from 'react';
// import "@/styles/newproject.css"

export default function Newproject({ onMenuClick }) {
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

    return (
        <>
            <div className="modal-overlay active">
                <div className="modal-container">
                    {/* 모달 헤더 */}
                    <div className="modal-header">
                        <h1 className="modal-title">새 프로젝트 생성</h1>
                        <p className="modal-subtitle">AI 프로젝트를 설정하고 시작하세요</p>
                        <button className="close-btn"
                        // onClick="closeModal()"
                        >×</button>
                    </div>

                    {/* 진행률 표시 */}
                    <div className="progress-bar">
                        <div className="progress-fill" id="progressFill" style={{ width: "25%" }}></div>
                    </div>

                    {/* 단계 표시기 */}
                    <div className="step-indicator">
                        <div className="step active" id="step1">
                            <div className="step-number">1</div>
                            <span>기본 정보</span>
                        </div>
                        <div className="step inactive" id="step2">
                            <div className="step-number">2</div>
                            <span>AI 설정</span>
                        </div>
                        <div className="step inactive" id="step3">
                            <div className="step-number">3</div>
                            <span>팀 구성</span>
                        </div>
                        <div className="step inactive" id="step4">
                            <div className="step-number">4</div>
                            <span>지식베이스</span>
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
                        <div className="form-section" id="section2">
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
                        <div className="form-section" id="section3">
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
                        <div className="form-section" id="section4">
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
                            // onClick={previousStep}
                            id="prevBtn"
                            style={{ visibility: 'hidden' }}
                        >
                            <span>←</span>
                            <span>이전</span>
                        </button>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button className="btn-secondary"
                            // onClick={saveAsDraft}
                            >
                                <span>💾</span>
                                <span>임시저장</span>
                            </button>
                            <button className="btn-primary"
                                // onClick={nextStep}
                                id="nextBtn"
                            >
                                <span>다음</span>
                                <span>→</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>



        </>
    );
}