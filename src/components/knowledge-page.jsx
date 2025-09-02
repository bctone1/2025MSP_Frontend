'use client';
import { useState, useEffect, useRef } from 'react';
// import { formatDate, storage, formatFileSize } from '@/utill/utill';
import "@/styles/knowledge.css";
// import History from "@/components/history-component";


export default function Knowledge({onMenuClick}) {

    const filesData = [
        {
            id: 1,
            project: "파일분석하기",
            icon: "📄",
            bgColor: "#ef4444",
            name: "2024_사업계획서.pdf",
            meta: "2.5MB • 2시간 전",
            preview: "2024년 사업 계획은 다음과 같은 핵심 목표를 바탕으로 수립되었습니다. 디지털 전환을 통한 업무 효율성 증대...",
            tags: ["파일분석하기", "사업계획", "2024", "전략"],
            chunks: "127개 청크",
            connection: { status: "active", text: "3개 대화 연결" }
        },
        {
            id: 2,
            project: "파일분석하기",
            icon: "📊",
            bgColor: "#10b981",
            name: "매출분석_Q4.xlsx",
            meta: "1.8MB • 1일 전",
            preview: "Q4 매출 현황: 총 매출 250억원, 전년 동기 대비 15% 증가. 주요 성장 동력은 온라인 채널...",
            tags: ["파일분석하기", "매출", "분석", "Q4"],
            chunks: "89개 청크",
            connection: { status: "active", text: "2개 대화 연결" }
        },
        {
            id: 3,
            project: "마케팅 캠페인 분석",
            icon: "📈",
            bgColor: "#8b5cf6",
            name: "마케팅전략_2024.pptx",
            meta: "3.2MB • 3일 전",
            preview: "2024년 마케팅 전략: 타겟 고객층 확대, 디지털 마케팅 강화, 브랜드 인지도 향상...",
            tags: ["마케팅 캠페인 분석", "마케팅", "전략", "브랜딩"],
            chunks: "156개 청크",
            connection: { status: "inactive", text: "연결 가능" }
        },
        {
            id: 4,
            project: "코드 리뷰 자동화",
            icon: "💻",
            bgColor: "#f59e0b",
            name: "기술문서_API.docx",
            meta: "0.9MB • 1주 전",
            preview: "REST API 설계 문서: 엔드포인트 구조, 인증 방식, 응답 형식에 대한 상세 가이드...",
            tags: ["코드 리뷰 자동화", "API", "기술문서", "개발"],
            chunks: "67개 청크",
            connection: { status: "active", text: "5개 대화 연결" }
        },
        {
            id: 5,
            project: "전체",
            icon: "📊",
            bgColor: "#0078d4",
            name: "Q4_재무보고서.xlsx",
            meta: "3.2MB • SharePoint • 1시간 전",
            preview: "SharePoint에서 동기화된 Q4 재무 보고서입니다. 매출, 비용, 수익성 지표를 포함...",
            tags: [
                { label: "SharePoint", style: { background: "rgba(0, 120, 212, 0.1)", color: "#0078d4" } },
                "재무",
                "Q4"
            ],
            chunks: "156개 청크",
            connection: { status: "active", text: "실시간 동기화" },
            source: "sharepoint"
        },
        {
            id: 6,
            project: "전체",
            icon: "📝",
            bgColor: "#4285f4",
            name: "제품로드맵_2024.gdoc",
            meta: "1.8MB • Google Drive • 30분 전",
            preview: "Google Drive에서 실시간 동기화된 2024년 제품 로드맵 문서입니다...",
            tags: [
                { label: "Google Drive", style: { background: "rgba(66, 133, 244, 0.1)", color: "#4285f4" } },
                "제품기획",
                "로드맵"
            ],
            chunks: "89개 청크",
            connection: { status: "active", text: "실시간 동기화" },
            source: "gdrive"
        }
    ];

    const [viewMode, setViewMode] = useState('grid');
    const [filters, setfilters] = useState({
        category: 'all',
        status: 'all',
        search: '',
        dateRange: 'all'
    });

    const filteredKnowledge = filesData.filter((p) => {
        const matchesSearch = !filters.search ||
            p.project.toLowerCase().includes(filters.search.toLowerCase()) ||
            p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            p.preview.toLowerCase().includes(filters.search.toLowerCase());
        return matchesSearch;
    });

    const fileInputRef = useRef(null);

    const handleFileSelect = async (e) => {
        alert("파일업로드 클릭됨");
        console.log("이벤트 객체:", e);
        console.log("파일 배열:", e.target.files);
        const selectedFile = e.target.files[0];
        console.log("선택된 파일:", selectedFile);

        if (!selectedFile) return;
        const formData = new FormData();
        formData.append("file", selectedFile);
        // formData.append("project_id", 102);
        // formData.append("user_email", "dudqls327@naver.com");
        // formData.append("session_id", 120157);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/MSP_USER/uploadRAG`, {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        console.log(data);

    };









    return (
        <>
            <div className="knowledge_container">
                <div className="header">
                    <h1 className="page-title">지식베이스 관리</h1>
                    <p className="page-subtitle">프로젝트별 문서를 관리하고 AI 어시스턴트에 연결하세요</p>
                </div>

                <div className="knowledge-layout">
                    {/* 필터 사이드바 */}
                    <div className="knowledge_filter-sidebar">
                        {/* 통계 */}
                        <div className="sidebar-section">
                            <h3 className="section-title">
                                <span>📊</span>
                                <span>통계</span>
                            </h3>
                            <div className="stats-card">
                                <div className="knowledge_stat-item">
                                    <span>활성 문서</span>
                                    <span className="knowledge_stat-value" id="active-docs">187개</span>
                                </div>
                                <div className="knowledge_stat-item">
                                    <span>대화 연결</span>
                                    <span className="knowledge_stat-value" id="connected-chats">45개</span>
                                </div>
                                <div className="knowledge_stat-item">
                                    <span>벡터 청크</span>
                                    <span className="knowledge_stat-value" id="vector-chunks">15,342개</span>
                                </div>
                                <div className="knowledge_stat-item">
                                    <span>총 용량</span>
                                    <span className="knowledge_stat-value" id="total-size">2.4GB</span>
                                </div>
                            </div>
                        </div>

                        {/* 필터 */}
                        <div className="sidebar-section">
                            <h3 className="section-title">
                                <span>🗂️</span>
                                <span>필터</span>
                            </h3>

                            <div className="knowledge_filter-group">
                                <label className="knowledge_filter-label">프로젝트</label>
                                <select className="knowledge_filter-select" id="project-filter"
                                // onchange="filterByProject(this.value)"
                                >
                                    <option value="all">🌟 전체 문서 (231개)</option>
                                    <option value="파일분석하기">📊 파일분석하기 (89개)</option>
                                    <option value="사업계획서 작성">📋 사업계획서 작성 (42개)</option>
                                    <option value="코드 리뷰 자동화">💻 코드 리뷰 자동화 (67개)</option>
                                    <option value="마케팅 캠페인 분석">📈 마케팅 캠페인 분석 (33개)</option>
                                </select>
                            </div>

                            {/* <div className="knowledge_filter-group">
                                <label className="knowledge_filter-label">데이터 소스</label>
                                <select className="knowledge_filter-select" id="source-filter"
                                >
                                    <option value="">전체</option>
                                    <option value="upload">직접 업로드</option>
                                    <option value="sharepoint">SharePoint</option>
                                    <option value="gdrive">Google Drive</option>
                                    <option value="notion">Notion</option>
                                    <option value="dms">사내 DMS</option>
                                </select>
                            </div> */}

                            <div className="knowledge_filter-group">
                                <label className="knowledge_filter-label">파일 타입</label>
                                <select className="knowledge_filter-select" id="type-filter" >
                                    <option value="">전체</option>
                                    <option value="pdf">PDF</option>
                                    <option value="docx">Word</option>
                                    <option value="xlsx">Excel</option>
                                    <option value="pptx">PowerPoint</option>
                                    <option value="image">이미지</option>
                                </select>
                            </div>

                            <div className="knowledge_filter-group">
                                <label className="knowledge_filter-label">연결 상태</label>
                                <select className="knowledge_filter-select" id="connection-filter" >
                                    <option value="">전체</option>
                                    <option value="connected">대화 연결됨</option>
                                    <option value="available">연결 가능</option>
                                    <option value="inactive">비활성화됨</option>
                                </select>
                            </div>
                        </div>

                        {/* 외부 연동 상태 */}
                        {/* <div className="sidebar-section">
                            <h3 className="section-title">
                                <span>🔗</span>
                                <span>외부 연동 상태</span>
                            </h3>
                            <div className="stats-card">
                                <div className="knowledge_stat-item">
                                    <span>📊 SharePoint</span>
                                    <span className="knowledge_stat-value" style={{ color: "var(--success-green)" }}>연결됨</span>
                                </div>
                                <div className="knowledge_stat-item">
                                    <span>📁 Google Drive</span>
                                    <span className="knowledge_stat-value" style={{ color: "var(--success-green)" }}>연결됨</span>
                                </div>
                                <div className="knowledge_stat-item">
                                    <span>📋 Notion</span>
                                    <span className="knowledge_stat-value" style={{ color: "var(--warning-orange)" }}>대기중</span>
                                </div>
                                <div className="knowledge_stat-item">
                                    <span>🏢 사내 DMS</span>
                                    <span className="knowledge_stat-value" style={{ color: "var(--success-green)" }}>연결됨</span>
                                </div>
                            </div>
                        </div> */}
                    </div>

                    {/* 메인 콘텐츠 */}
                    <div className="main-content">
                        <div className="content-header">
                            <div className="search-bar">
                                <span className="search-icon">🔍</span>
                                <input type="text" className="knowledge_search-input" placeholder="문서명, 내용, 태그로 검색..."
                                    onChange={(e) =>
                                        setfilters((prev) => ({
                                            ...prev,
                                            search: e.target.value
                                        }))
                                    }
                                />
                            </div>
                            <div className="header-actions">
                                <button className="btn btn-chat"
                                    onClick={() => onMenuClick('assistant')}
                                >💬 AI 어시스턴트</button>
                                <button className="btn btn-primary"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    📤 파일 업로드
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={handleFileSelect}
                                />
                                {/* <button className="btn btn-secondary" >🔗 외부 연동</button> */}
                                {/* <button className="btn btn-secondary" >📁 새 폴더</button> */}
                            </div>
                        </div>

                        <div className="content-body">
                            <div className="view-tabs">

                                <button className={`knowledge_tab-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                    onClick={() => setViewMode('grid')}
                                >
                                    🔳 그리드
                                </button>

                                <button className={`knowledge_tab-btn ${viewMode === 'list' ? 'active' : ''}`}
                                    onClick={() => setViewMode('list')}
                                >
                                    📋 목록
                                </button>

                                {/* <button className={`knowledge_tab-btn ${viewMode === 'history' ? 'active' : ''}`}
                                    onClick={() => setViewMode('history')}
                                >
                                    📈 히스토리
                                </button> */}

                            </div>

                            {/* 히스토리 임포트 */}
                            {/* <div style={{ display: `${viewMode === "history" ? "" : "none"}` }}>
                                {<History />}
                            </div> */}




                            {/* 그리드 뷰 */}
                            <div className="files-grid" id="grid-view" style={{ display: `${viewMode === "grid" ? "grid" : "none"}` }}>
                                {filteredKnowledge.map((file) => (
                                    <div
                                        key={file.id}
                                        className="file-card"
                                        data-file-id={file.id}
                                        data-project={file.project}
                                        data-source={file.source || undefined}
                                    >
                                        {/* 액션 버튼 */}
                                        <div className="file-actions">
                                            <button className="action-btn chat-btn" title="AI 대화에 첨부">💬</button>
                                            {file.source ? (
                                                <>
                                                    <button className="action-btn" title="원본 동기화">🔄</button>
                                                    <button className="action-btn" title="원본에서 열기">🔗</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button className="action-btn" title="편집">✏️</button>
                                                    <button className="action-btn" title="삭제">🗑️</button>
                                                </>
                                            )}
                                        </div>

                                        {/* 파일 헤더 */}
                                        <div className="file-header">
                                            <div className="file-icon" style={{ background: file.bgColor }}>
                                                {file.icon}
                                            </div>
                                            <div className="file-info">
                                                <div className="file-name">{file.name}</div>
                                                <div className="file-meta">{file.meta}</div>
                                            </div>
                                        </div>

                                        {/* 파일 내용 */}
                                        <div className="file-content">
                                            <div className="content-preview">{file.preview}</div>
                                            <div className="file-tags">
                                                {file.tags.map((tag, idx) =>
                                                    typeof tag === "string" ? (
                                                        <span
                                                            key={idx}
                                                            className={`tag ${idx === 0 ? "project-tag" : ""}`}
                                                        >
                                                            {tag}
                                                        </span>
                                                    ) : (
                                                        <span
                                                            key={idx}
                                                            className="tag"
                                                            style={tag.style}
                                                        >
                                                            {tag.label}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        {/* 파일 통계 */}
                                        <div className="file-stats">
                                            <span>{file.chunks}</span>
                                            <div className="connection-status">
                                                <div
                                                    className={`connection-dot ${file.connection.status === "inactive" ? "inactive" : ""
                                                        }`}
                                                ></div>
                                                <span>{file.connection.text}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* 리스트 뷰 */}
                            <div className={`files-list ${viewMode === 'list' ? 'active' : ''}`} id="list-view">
                                {filteredKnowledge.map((file) => (
                                    <div className="list-item" data-file-id={file.id} key={file.id}>
                                        <input type="checkbox" />
                                        <div className="file-icon" style={{ background: file.bgColor }}>
                                            {file.icon}
                                        </div>
                                        <div className="file-info" style={{ flex: 1 }}>
                                            <div className="file-name">{file.name}</div>
                                            <div className="file-meta">
                                                {file.meta}
                                                {/* 청크 정보가 meta에 없으면 표시하기 */}
                                                {!file.meta.includes("청크") && file.chunks ? ` • ${file.chunks}` : ""}
                                            </div>
                                        </div>
                                        <div className="file-tags">
                                            {file.tags.map((tag, idx) =>
                                                typeof tag === "string" ? (
                                                    <span
                                                        key={idx}
                                                        className={`tag ${idx === 0 ? "project-tag" : ""}`}
                                                    >
                                                        {tag}
                                                    </span>
                                                ) : (
                                                    <span key={idx} className="tag" style={tag.style}>
                                                        {tag.label}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                        <div className="connection-status">
                                            <div
                                                className={`connection-dot ${file.connection.status === "inactive" ? "inactive" : ""
                                                    }`}
                                            ></div>
                                            <span>
                                                {file.connection.text.includes("대화")
                                                    ? file.connection.text.replace("대화", "연결")
                                                    : file.connection.text}
                                            </span>
                                        </div>
                                        <button className="action-btn chat-btn" title="AI 대화에 첨부">
                                            💬
                                        </button>
                                    </div>
                                ))}
                            </div>



                        </div>
                    </div>
                </div>
            </div >

        </>
    );
}

