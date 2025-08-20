'use client';

import "@/adminStyle/knowledge.css";

import { useState } from 'react';

export default function Knowledge() {

    const files = [
        {
            id: 'file_001',
            name: '2024년 사업계획서.pdf',
            description: '회사의 전략적 방향성과 목표를 담은 핵심 사업계획서',
            category: 'documents',
            type: 'pdf',
            size: 2456789,
            status: 'completed',
            progress: 100,
            chunks: 45,
            tokens: 12450,
            queries: 324,
            uploaded: new Date('2024-06-20T10:30:00Z'),
            processed: new Date('2024-06-20T10:45:00Z'),
            tags: ['사업계획', '전략', '2024'],
            embedding: true
        },
        {
            id: 'file_002',
            name: '직원 교육 매뉴얼.docx',
            description: '신입 직원을 위한 종합 교육 가이드라인',
            category: 'manuals',
            type: 'docx',
            size: 1834567,
            status: 'processing',
            progress: 67,
            chunks: 0,
            tokens: 0,
            queries: 0,
            uploaded: new Date('2024-06-24T14:15:00Z'),
            processed: null,
            tags: ['교육', '매뉴얼', '신입직원'],
            embedding: false
        },
        {
            id: 'file_003',
            name: 'Q2 매출 분석.xlsx',
            description: '2분기 매출 데이터 및 트렌드 분석 자료',
            category: 'spreadsheets',
            type: 'xlsx',
            size: 967834,
            status: 'completed',
            progress: 100,
            chunks: 23,
            tokens: 8920,
            queries: 156,
            uploaded: new Date('2024-06-22T09:45:00Z'),
            processed: new Date('2024-06-22T10:12:00Z'),
            tags: ['매출', '분석', 'Q2'],
            embedding: true
        },
        {
            id: 'file_004',
            name: '제품 발표 자료.pptx',
            description: '신제품 런칭을 위한 프레젠테이션 자료',
            category: 'presentations',
            type: 'pptx',
            size: 5234567,
            status: 'failed',
            progress: 0,
            chunks: 0,
            tokens: 0,
            queries: 0,
            uploaded: new Date('2024-06-23T16:20:00Z'),
            processed: null,
            tags: ['제품', '발표', '런칭'],
            embedding: false,
            error: 'PowerPoint 파일 파싱 오류'
        },
        {
            id: 'file_005',
            name: '개인정보보호 정책.pdf',
            description: '회사의 개인정보보호 정책 및 가이드라인',
            category: 'policies',
            type: 'pdf',
            size: 1123456,
            status: 'indexing',
            progress: 100,
            chunks: 28,
            tokens: 7890,
            queries: 89,
            uploaded: new Date('2024-06-21T11:30:00Z'),
            processed: new Date('2024-06-21T11:45:00Z'),
            tags: ['개인정보', '정책', '보안'],
            embedding: false
        },
        {
            id: 'file_006',
            name: 'API 개발 가이드.md',
            description: '개발자를 위한 API 사용법 및 예제',
            category: 'manuals',
            type: 'md',
            size: 234567,
            status: 'completed',
            progress: 100,
            chunks: 15,
            tokens: 4560,
            queries: 267,
            uploaded: new Date('2024-06-19T08:20:00Z'),
            processed: new Date('2024-06-19T08:25:00Z'),
            tags: ['API', '개발', '가이드'],
            embedding: true
        },
        {
            id: 'file_007',
            name: 'UX 리서치 보고서.pdf',
            description: '사용자 경험 개선을 위한 리서치 결과 보고서',
            category: 'research',
            type: 'pdf',
            size: 3456789,
            status: 'pending',
            progress: 0,
            chunks: 0,
            tokens: 0,
            queries: 0,
            uploaded: new Date('2024-06-24T15:45:00Z'),
            processed: null,
            tags: ['UX', '리서치', '사용자경험'],
            embedding: false
        },
        {
            id: 'file_008',
            name: '마케팅 전략.txt',
            description: '디지털 마케팅 전략 및 캠페인 계획서',
            category: 'documents',
            type: 'txt',
            size: 123456,
            status: 'completed',
            progress: 100,
            chunks: 8,
            tokens: 3240,
            queries: 78,
            uploaded: new Date('2024-06-18T13:10:00Z'),
            processed: new Date('2024-06-18T13:15:00Z'),
            tags: ['마케팅', '전략', '디지털'],
            embedding: true
        }
    ];

    const filters = {
        search: '',
        status: 'all',
        category: 'all',
        fileType: 'all'
    };

    const filteredFiles = files.filter(file => {
        const matchesSearch = !filters.search ||
            file.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            file.description.toLowerCase().includes(filters.search.toLowerCase()) ||
            file.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()));

        const matchesStatus = filters.status === 'all' || file.status === filters.status;
        const matchesCategory = filters.category === 'all' || file.category === filters.category;
        const matchesFileType = filters.fileType === 'all' || file.type === filters.fileType;

        return matchesSearch && matchesStatus && matchesCategory && matchesFileType;
    });



    const categories = [
        {
            id: 'documents',
            name: '문서',
            icon: '📄',
            count: 342,
            size: '4.2GB',
            growth: '+12%'
        },
        {
            id: 'presentations',
            name: '프레젠테이션',
            icon: '📊',
            count: 127,
            size: '1.8GB',
            growth: '+8%'
        },
        {
            id: 'spreadsheets',
            name: '스프레드시트',
            icon: '📈',
            count: 89,
            size: '856MB',
            growth: '+5%'
        },
        {
            id: 'manuals',
            name: '매뉴얼',
            icon: '📖',
            count: 234,
            size: '2.1GB',
            growth: '+15%'
        },
        {
            id: 'research',
            name: '연구자료',
            icon: '🔬',
            count: 178,
            size: '3.4GB',
            growth: '+22%'
        },
        {
            id: 'policies',
            name: '정책',
            icon: '⚖️',
            count: 67,
            size: '452MB',
            growth: '+3%'
        }
    ];



    return (
        <>
            <div className="page-container">
                {/* 페이지 헤더  */}
                <div className="page-header">
                    <div className="header-top">
                        <div className="header-info">
                            <h1 className="page-title">지식베이스 관리</h1>
                            <p className="page-subtitle">조직의 공유 지식베이스와 RAG 파일을 통합 관리하세요</p>
                        </div>
                        <div className="header-actions">
                            <button className="btn btn-secondary" id="sync-knowledge-base">
                                🔄 동기화
                            </button>
                            <button className="btn btn-secondary" id="bulk-operations">
                                📦 일괄 작업
                            </button>
                            <label htmlFor="file-upload" className="btn btn-primary">
                                ⬆️ 파일 업로드
                                <input type="file" id="file-upload" multiple accept=".pdf,.txt,.docx,.xlsx,.pptx,.md" style={{ display: "none" }} />
                            </label>
                        </div>
                    </div>
                </div>

                {/* 지식베이스 통계 */}
                <div className="knowledge-stats">
                    <div className="knowledge-stat-card">
                        <div className="stat-icon total-files">📄</div>
                        <div className="stat-content">
                            <div className="stat-value" id="total-files">1,247</div>
                            <div className="stat-label">총 파일 수</div>
                            <div className="knowledge-stat-change positive">+24개 이번 주</div>
                        </div>
                    </div>

                    <div className="knowledge-stat-card">
                        <div className="stat-icon processed-files">⚡</div>
                        <div className="stat-content">
                            <div className="stat-value" id="processed-files">1,189</div>
                            <div className="stat-label">처리 완료</div>
                            <div className="knowledge-stat-change positive">95.3% 완료율</div>
                        </div>
                    </div>

                    <div className="knowledge-stat-card">
                        <div className="stat-icon storage-usage">💾</div>
                        <div className="stat-content">
                            <div className="stat-value" id="storage-usage">12.8GB</div>
                            <div className="stat-label">스토리지 사용량</div>
                            <div className="knowledge-stat-change neutral">50GB 중 25.6%</div>
                        </div>
                    </div>

                    <div className="knowledge-stat-card">
                        <div className="stat-icon monthly-queries">🔍</div>
                        <div className="stat-content">
                            <div className="stat-value" id="monthly-queries">38.9K</div>
                            <div className="stat-label">이번 달 검색</div>
                            <div className="knowledge-stat-change positive">+32% 증가</div>
                        </div>
                    </div>

                    <div className="knowledge-stat-card">
                        <div className="stat-icon vector-chunks">📊</div>
                        <div className="stat-content">
                            <div className="stat-value" id="vector-chunks">156K</div>
                            <div className="stat-label">벡터 청크</div>
                            <div className="knowledge-stat-change positive">임베딩 완료</div>
                        </div>
                    </div>
                </div>

                {/* 카테고리 개요 */}
                <div className="categories-overview">
                    <div className="knowledge-section-header">
                        <h3 className="section-title">📂 카테고리별 현황</h3>
                        <button className="btn btn-secondary" id="manage-categories">카테고리 관리</button>
                    </div>
                    <div className="categories-grid" id="categories-grid">
                        {/* 카테고리 카드들이 여기에 동적으로 추가됩니다 */}
                        {<RenderCategories categories={categories} />}
                    </div>
                </div>

                {/* 파일 필터 및 검색 */}
                <div className="knowledge-toolbar">
                    <div className="toolbar-left">
                        <div className="search-box">
                            <input type="text" id="file-search" placeholder="파일 검색..." className="search-input" />
                            <div className="search-icon">🔍</div>
                        </div>

                        <div className="filter-group">
                            <select id="status-filter" className="filter-select">
                                <option value="all">모든 상태</option>
                                <option value="completed">처리 완료</option>
                                <option value="processing">처리 중</option>
                                <option value="pending">대기 중</option>
                                <option value="failed">실패</option>
                                <option value="indexing">인덱싱 중</option>
                            </select>

                            <select id="category-filter" className="filter-select">
                                <option value="all">모든 카테고리</option>
                                <option value="documents">문서</option>
                                <option value="presentations">프레젠테이션</option>
                                <option value="spreadsheets">스프레드시트</option>
                                <option value="manuals">매뉴얼</option>
                                <option value="research">연구자료</option>
                                <option value="policies">정책</option>
                            </select>

                            <select id="file-type-filter" className="filter-select">
                                <option value="all">모든 형식</option>
                                <option value="pdf">PDF</option>
                                <option value="docx">Word</option>
                                <option value="xlsx">Excel</option>
                                <option value="pptx">PowerPoint</option>
                                <option value="txt">텍스트</option>
                                <option value="md">Markdown</option>
                            </select>
                        </div>
                    </div>

                    <div className="toolbar-right">
                        <div className="sort-controls">
                            <select id="sort-by" className="sort-select">
                                <option value="uploaded">업로드일</option>
                                <option value="name">이름</option>
                                <option value="size">크기</option>
                                <option value="category">카테고리</option>
                                <option value="status">상태</option>
                                <option value="queries">검색 횟수</option>
                            </select>
                            <button className="sort-order-btn" id="sort-order">
                                <span id="sort-icon">↓</span>
                            </button>
                        </div>

                        <div className="view-toggle">
                            <button className="view-btn active" data-view="grid">⊞</button>
                            <button className="view-btn" data-view="list">📋</button>
                        </div>
                    </div>
                </div>

                {/* 파일 목록 */}
                <div className="knowledge-container">
                    {/* 그리드 뷰 */}
                    <div className="knowledge-grid-view active" id="knowledge-grid">
                        {/* 파일 카드들이 여기에 동적으로 추가됩니다 */}
                        {<RenderFilesGrid categories={categories} filteredFiles={filteredFiles} />}
                    </div>

                    {/* 리스트 뷰 */}
                    <div className="knowledge-list-view" id="knowledge-list">
                        <div className="table-container">
                            <table className="knowledge-table">
                                <thead>
                                    <tr>
                                        <th>
                                            <input type="checkbox" id="select-all" />
                                        </th>
                                        <th>파일명</th>
                                        <th>카테고리</th>
                                        <th>상태</th>
                                        <th>크기</th>
                                        <th>청크 수</th>
                                        <th>검색 횟수</th>
                                        <th>업로드일</th>
                                        <th>액션</th>
                                    </tr>
                                </thead>
                                <tbody id="knowledge-tbody">
                                    {/* 파일 데이터가 여기에 동적으로 추가됩니다 */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* 업로드 진행률 패널 */}
                <div className="upload-progress-panel" id="upload-progress-panel" style={{ display: "none" }}>
                    <div className="progress-header">
                        <h4>파일 업로드 진행 상황</h4>
                        <button className="close-panel-btn" id="close-progress-panel">✕</button>
                    </div>
                    <div className="progress-content" id="progress-content">
                        {/* 업로드 진행 상황이 여기에 표시됩니다 */}
                    </div>
                </div>

                {/* 드래그 앤 드롭 오버레이 */}
                <div className="drop-overlay" id="drop-overlay" style={{ display: "none" }}>
                    <div className="drop-content">
                        <div className="drop-icon">📁</div>
                        <h3>파일을 여기에 드롭하세요</h3>
                        <p>PDF, Word, Excel, PowerPoint, 텍스트 파일을 지원합니다</p>
                    </div>
                </div>
            </div>
        </>
    );
}
function getFileTypeIcon(type) {
    const icons = {
        pdf: 'PDF',
        docx: 'DOC',
        xlsx: 'XLS',
        pptx: 'PPT',
        txt: 'TXT',
        md: 'MD'
    };
    return icons[type] || 'FILE';
}
function getStatusText(status) {
    const statuses = {
        completed: '완료',
        processing: '처리 중',
        pending: '대기',
        failed: '실패',
        indexing: '인덱싱'
    };
    return statuses[status] || status;
}
function getCategoryText(categories, categoryId) {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
}
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function formatRelativeTime(date) {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) return `${diff}초 전`;
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    return `${Math.floor(diff / 86400)}일 전`;
}
function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}





function RenderFilesGrid({ categories, filteredFiles }) {
    return (
        <>
            {filteredFiles.length === 0 && (
                <div className="empty-state">
                    <div className="empty-icon">📚</div>
                    <h3>파일이 없습니다</h3>
                    <p>새 파일을 업로드하여 지식베이스를 구축하세요.</p>
                    <label for="file-upload" className="btn btn-primary">
                        파일 업로드
                    </label>
                </div>
            )}

            {filteredFiles.map(file => (
                <div className={`knowledge-card ${file.status}`} key={file.id}>
                    <div className="file-header">
                        <div className={`file-type-icon ${file.type}`}>
                            {getFileTypeIcon(file.type)}
                        </div>
                        <div className="file-status">
                            <div className={`knowledge-status-indicator ${file.status}`}></div>
                            <span className={`status-text ${file.status}`}>{getStatusText(file.status)}</span>
                        </div>
                        <div className="file-menu">
                            <button className="menu-btn">⋮</button>
                        </div>
                    </div>

                    <div className="file-info">
                        <div className="file-name">{file.name}</div>
                        <div className="file-description">{file.description}</div>
                        <div className="file-meta">
                            <span className="file-category">{getCategoryText(categories, file.category)}</span>
                            <span className="file-size">{formatFileSize(file.size)}</span>
                            <span className="file-uploaded">{formatRelativeTime(file.uploaded)}</span>
                        </div>
                    </div>

                    {file.status === 'processing' ? (
                        <div className="processing-progress">
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${file.progress}%` }}></div>
                            </div>
                            <div className="progress-text">처리 중... {file.progress}%</div>
                        </div>
                    ) : ("")}

                    {file.status === 'completed' ? (
                        <div className="file-stats">
                            <div className="stat-item">
                                <div className="stat-value">${file.chunks}</div>
                                <div className="stat-label">청크</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value">{formatNumber(file.tokens)}</div>
                                <div className="stat-label">토큰</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value">{file.queries}</div>
                                <div className="stat-label">검색</div>
                            </div>
                        </div>
                    ) : ("")}

                    {file.error ? (
                        <div className="error-info">
                            <div className="error-message">{file.error}</div>
                            <button className="retry-btn" data-file-id="${file.id}">다시 시도</button>
                        </div>
                    ) : ("")}

                    <div className="file-tags">
                        {file.tags.map(tag => (<span key={tag} className="file-tag">{tag}</span>))}
                    </div>

                    <div className="file-actions">
                        <button className="action-btn view" data-action="view">
                            👁️ 보기
                        </button>
                        <button className="action-btn download" data-action="download" >
                            ⬇️ 다운로드
                        </button>
                        <button className="action-btn delete" data-action="delete">
                            🗑️ 삭제
                        </button>
                    </div>
                </div>
            ))}



        </>
    );
}

function RenderCategories({ categories }) {
    return (
        <>
            {categories.map((category, index) => (
                <div className="category-card" key={index}>
                    <div className="category-header">
                        <div className={`category-icon ${category.id}`}>{category.icon}</div>
                        <div className="category-info">
                            <div className="category-name">{category.name}</div>
                            <div className="category-count">{category.count}개 파일</div>
                        </div>
                    </div >
                    <div className="category-stats">
                        <div className="category-size">{category.size}</div>
                        <div className="category-growth">{category.growth}</div>
                    </div>
                </div >
            ))
            }

        </>
    );
}