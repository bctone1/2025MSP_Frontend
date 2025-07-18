'use client';
import { useState, useEffect } from 'react';
import { formatDate, storage, formatFileSize } from '@/utill/utill';

export default function Knowledge() {

    const knowledgeItems = [
        {
            id: 'kb_001',
            name: 'AI 개발 가이드.pdf',
            originalName: 'AI 개발 가이드.pdf',
            category: 'documents',
            size: 2450000,
            status: 'completed',
            uploadDate: '2024-06-20T09:00:00Z',
            processedDate: '2024-06-20T09:05:30Z',
            chunks: 145,
            vectorized: true,
            metadata: {
                author: 'AI Research Team',
                pages: 42,
                language: 'ko',
                topics: ['머신러닝', '딥러닝', 'AI 윤리']
            },
            embedding: {
                model: 'text-embedding-ada-002',
                dimensions: 1536,
                tokens: 12450
            },
            usage: {
                queries: 23,
                lastAccessed: '2024-06-24T15:20:00Z'
            },
            tags: ['가이드', 'AI', '개발'],
            description: 'AI 시스템 개발을 위한 종합 가이드 문서'
        },
        {
            id: 'kb_002',
            name: '마케팅 전략 데이터.xlsx',
            originalName: '2024년 Q2 마케팅 전략 분석 데이터.xlsx',
            category: 'spreadsheets',
            size: 1200000,
            status: 'completed',
            uploadDate: '2024-06-22T14:15:00Z',
            processedDate: '2024-06-22T14:18:45Z',
            chunks: 67,
            vectorized: true,
            metadata: {
                sheets: 5,
                rows: 1250,
                columns: 28,
                charts: 12
            },
            embedding: {
                model: 'text-embedding-ada-002',
                dimensions: 1536,
                tokens: 8750
            },
            usage: {
                queries: 15,
                lastAccessed: '2024-06-24T11:30:00Z'
            },
            tags: ['마케팅', '데이터', '분석'],
            description: '2024년 2분기 마케팅 전략 및 성과 분석 데이터'
        },
        {
            id: 'kb_003',
            name: 'API 문서.md',
            originalName: 'REST API Documentation.md',
            category: 'code',
            size: 350000,
            status: 'processing',
            uploadDate: '2024-06-24T16:00:00Z',
            processedDate: null,
            chunks: 0,
            vectorized: false,
            metadata: {
                lines: 890,
                language: 'markdown',
                endpoints: 47
            },
            embedding: null,
            usage: {
                queries: 0,
                lastAccessed: null
            },
            tags: ['API', '문서', '개발'],
            description: 'RESTful API 상세 문서 및 사용 예제'
        },
        {
            id: 'kb_004',
            name: '제품 프레젠테이션.pptx',
            originalName: '신제품 런칭 프레젠테이션.pptx',
            category: 'presentations',
            size: 4500000,
            status: 'failed',
            uploadDate: '2024-06-23T10:30:00Z',
            processedDate: null,
            chunks: 0,
            vectorized: false,
            metadata: {
                slides: 35,
                images: 18,
                animations: 12
            },
            embedding: null,
            usage: {
                queries: 0,
                lastAccessed: null
            },
            tags: ['제품', '프레젠테이션', '런칭'],
            description: '신제품 출시 전략 및 마케팅 계획 프레젠테이션',
            error: '파일 형식 오류: 지원되지 않는 차트 유형'
        },
        {
            id: 'kb_005',
            name: '사용자 매뉴얼.pdf',
            originalName: 'User Manual v2.1.pdf',
            category: 'documents',
            size: 1800000,
            status: 'indexing',
            uploadDate: '2024-06-24T13:45:00Z',
            processedDate: '2024-06-24T13:48:20Z',
            chunks: 89,
            vectorized: false,
            metadata: {
                pages: 28,
                language: 'ko',
                version: '2.1'
            },
            embedding: {
                model: 'text-embedding-ada-002',
                dimensions: 1536,
                tokens: 9200
            },
            usage: {
                queries: 2,
                lastAccessed: '2024-06-24T14:10:00Z'
            },
            tags: ['매뉴얼', '사용자', '가이드'],
            description: '제품 사용자 매뉴얼 최신 버전'
        }
    ];

    const processingStatus = {
        'pending': { label: '대기중', icon: '⏳', color: '#F59E0B' },
        'processing': { label: '처리중', icon: '⚙️', color: '#3B82F6' },
        'completed': { label: '완료', icon: '✅', color: '#10B981' },
        'failed': { label: '실패', icon: '❌', color: '#EF4444' },
        'indexing': { label: '인덱싱', icon: '🔍', color: '#8B5CF6' }
    }

    const categories = {
        'documents': {
            name: '문서',
            icon: '📄',
            color: '#3B82F6',
            extensions: ['.pdf', '.doc', '.docx', '.txt', '.md'],
            maxSize: 50 * 1024 * 1024 // 50MB
        },
        'presentations': {
            name: '프레젠테이션',
            icon: '📊',
            color: '#8B5CF6',
            extensions: ['.ppt', '.pptx', '.key'],
            maxSize: 100 * 1024 * 1024 // 100MB
        },
        'spreadsheets': {
            name: '스프레드시트',
            icon: '📈',
            color: '#10B981',
            extensions: ['.xls', '.xlsx', '.csv', '.tsv'],
            maxSize: 25 * 1024 * 1024 // 25MB
        },
        'code': {
            name: '코드',
            icon: '💻',
            color: '#F59E0B',
            extensions: ['.js', '.py', '.java', '.cpp', '.html', '.css', '.json', '.xml'],
            maxSize: 10 * 1024 * 1024 // 10MB
        },
        'images': {
            name: '이미지',
            icon: '🖼️',
            color: '#EF4444',
            extensions: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'],
            maxSize: 20 * 1024 * 1024 // 20MB
        },
        'audio': {
            name: '오디오',
            icon: '🎵',
            color: '#EC4899',
            extensions: ['.mp3', '.wav', '.m4a', '.flac'],
            maxSize: 100 * 1024 * 1024 // 100MB
        },
        'video': {
            name: '비디오',
            icon: '🎬',
            color: '#6366F1',
            extensions: ['.mp4', '.avi', '.mov', '.mkv', '.webm'],
            maxSize: 500 * 1024 * 1024 // 500MB
        },
        'other': {
            name: '기타',
            icon: '📎',
            color: '#6B7280',
            extensions: [],
            maxSize: 50 * 1024 * 1024 // 50MB
        }
    }

    const [viewMode, setViewMode] = useState('grid');
    const [filters, setfilters] = useState({
        category: 'all',
        status: 'all',
        search: '',
        dateRange: 'all'
    });




    return (
        <div className="app-container">
            <div className="container">

                <div className="header">
                    <div className="header-title">
                        <div>
                            <h1 className="page-title">지식베이스</h1>
                            <p className="page-subtitle">AI가 학습할 수 있는 파일들을 관리하세요</p>
                        </div>
                        <div className="header-controls">
                            <div className="storage-info">
                                <div className="storage-used">
                                    <span className="storage-icon">💾</span>
                                    <span className="storage-text">{getStorageUsage({ knowledgeItems })}</span>
                                </div>
                            </div>
                            <button className="primary-btn" id="upload-files-btn">
                                <span>📤</span>
                                <span>파일 업로드</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="knowledge-toolbar">
                    <div className="toolbar-left">
                        <div className="search-container">
                            <div className="search-input-wrapper">
                                <input type="text"
                                    className="search-input"
                                    placeholder="파일명, 내용, 태그로 검색..."
                                    id="knowledge-search" />
                                <div className="search-icon">🔍</div>
                            </div>
                        </div>

                        <div className="filter-group">
                            <select
                                className="filter-select"
                                id="category-filter"
                                value={filters.category}
                                onChange={(e) =>
                                    setfilters(prev => ({ ...prev, category: e.target.value }))
                                }
                            >
                                <option value="all">모든 카테고리</option>
                                {Object.entries(categories).map(([key, category]) => (
                                    <option key={key} value={key}>
                                        {category.icon} {category.name}
                                    </option>
                                ))}
                            </select>

                            <select
                                className="filter-select"
                                id="status-filter"
                                value={filters.status} // 현재 선택된 상태 반영
                                onChange={(e) =>
                                    setfilters(prev => ({ ...prev, status: e.target.value }))
                                }
                            >
                                <option value="all">모든 상태</option>
                                {Object.entries(processingStatus).map(([key, status]) => (
                                    <option key={key} value={key}>
                                        {status.icon} {status.label}
                                    </option>
                                ))}
                            </select>


                            <select className="filter-select" id="date-filter">
                                <option value="all">모든 기간</option>
                                <option value="today">오늘</option>
                                <option value="week">이번 주</option>
                                <option value="month">이번 달</option>
                                <option value="quarter">3개월</option>
                            </select>
                        </div>
                    </div>

                    <div className="toolbar-right">
                        <div className="sort-controls">
                            <select className="sort-select" id="sort-by">
                                <option value="created">업로드일</option>
                                <option value="name">이름</option>
                                <option value="size">파일크기</option>
                                <option value="usage">사용빈도</option>
                                <option value="status">상태</option>
                            </select>
                            <button className="sort-order-btn" id="sort-order">
                                <span id="sort-icon">↓</span>
                            </button>
                        </div>

                        <div className="view-toggle">
                            <button className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                data-view="grid" title="그리드 보기">⊞</button>
                            <button className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                                data-view="list" title="리스트 보기">☰</button>
                        </div>

                        <button className="tool-btn" id="batch-actions" title="일괄 작업">
                            <span>📋</span>
                            <span>일괄 작업</span>
                        </button>
                    </div>
                </div>


                <div className="knowledge-stats">
                    <div className="stat-card">
                        <div
                            className="stat-icon" style={{ background: "linear-gradient(135deg, #3B82F6, #1D4ED8)" }}>📚</div>
                        <div className="stat-content">
                            <div className="stat-value">{knowledgeItems.length}</div>
                            <div className="stat-label">총 파일</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div
                            className="stat-icon" style={{ background: "linear-gradient(135deg, #10B981, #059669)" }}>✅</div>
                        <div className="stat-content">
                            <div className="stat-value">{knowledgeItems.filter(item => item.status === 'completed').length}</div>
                            <div className="stat-label">처리 완료</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: "linear-gradient(135deg, #8B5CF6, #7C3AED)" }}>🔍</div>
                        <div className="stat-content">
                            <div className="stat-value">{knowledgeItems.reduce((sum, item) => sum + item.chunks, 0).toLocaleString()}</div>
                            <div className="stat-label">벡터 청크</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: "linear-gradient(135deg, #F59E0B, #D97706)" }}>🎯</div>
                        <div className="stat-content">
                            <div className="stat-value">{knowledgeItems.reduce((sum, item) => sum + item.usage.queries, 0)}</div>
                            <div className="stat-label">총 쿼리</div>
                        </div>
                    </div>
                </div>

                <div className="categories-overview">
                    <h3 className="section-title">
                        <span>📂</span>
                        <span>카테고리별 현황</span>
                    </h3>
                    <div className="categories-grid">
                        {renderCategoriesGrid({ categories, knowledgeItems, setfilters })}
                    </div>
                </div>

                <div className="knowledge-container" id="knowledge-container">
                    {/* 지식베이스 아이템들이 여기에 렌더링됩니다  */}
                    {renderKnowledgeItems({ knowledgeItems, filters, viewMode, categories, processingStatus })}
                </div>

                {/* 드래그 앤 드롭 영역  */}
                <div className="drop-zone" id="drop-zone" style={{ display: "none" }}>
                    <div className="drop-zone-content">
                        <div className="drop-icon">📤</div>
                        <h3>파일을 여기에 놓으세요</h3>
                        <p>지원 형식:{/* {allExtensions.slice(0, 8)} */}등</p>
                    </div>
                </div>







            </div>
        </div >
    );

}

function getStorageUsage({ knowledgeItems }) {
    try {
        const totalSize = knowledgeItems.reduce((sum, item) => sum + item.size, 0);
        const totalLimit = 10 * 1024 * 1024 * 1024; // 10GB
        const percentage = (totalSize / totalLimit * 100).toFixed(1);

        return `${formatFileSize(totalSize)} / 10GB (${percentage}%)`;

    } catch (error) {
        console.error('스토리지 사용량 계산 실패:', error);
        return '계산 오류';
    }
}


function renderCategoriesGrid({ categories, knowledgeItems, setfilters }) {
    try {
        return Object.entries(categories).map(([key, category]) => {
            const count = knowledgeItems.filter(item => item.category === key).length;
            const totalSize = knowledgeItems
                .filter(item => item.category === key)
                .reduce((sum, item) => sum + item.size, 0);

            return (
                <div className="category-card" data-category={key}
                    key={key}
                    // onClick={() => alert(category.name)}
                    onClick={(e) => setfilters(prev => ({ ...prev, category: key }))}
                >
                    <div className="category-header">
                        <div className="category-icon" style={{ background: `${category.color}20`, color: `${category.color}` }}>
                            {category.icon}
                        </div>
                        <div className="category-info">
                            <div className="category-name">{category.name}</div>
                            <div className="category-count">{count}개 파일</div>
                        </div>
                    </div>
                    <div className="category-size">{formatFileSize(totalSize)}</div>
                    <div className="category-progress">
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{
                                    width: `${Math.min((count / Math.max(knowledgeItems.length, 1)) * 100, 100)}%`,
                                    backgroundColor: category.color
                                }}
                            ></div>

                        </div>
                    </div>
                </div>
            );
        });
    } catch (error) {
        console.error('카테고리 그리드 렌더링 실패:', error);
        return <div className="error-message">카테고리를 불러올 수 없습니다.</div>;
    }
}


function renderKnowledgeItems({ knowledgeItems, filters, viewMode, categories, processingStatus }) {
    try {
        const filteredItems = getFilteredItems({ knowledgeItems, filters });
        if (filteredItems.length === 0) {
            return (
                <div className="empty-state">
                    <div className="empty-icon">📚</div>
                    <h3>지식베이스가 비어있습니다</h3>
                    <p>AI가 학습할 수 있도록 파일을 업로드해보세요.</p>
                    <button className="primary-btn"
                    //  onClick="KnowledgeManager.uploadFiles()"
                    >
                        첫 번째 파일 업로드
                    </button>
                </div>
            );
        }

        return (
            <>
                <div className={`knowledge-${viewMode}`}>
                    {filteredItems.map(item => (
                        viewMode === 'grid'
                            ? renderKnowledgeCard({ item, categories, processingStatus })
                            : renderKnowledgeRow(item)
                    ))}


                </div>
            </>
        );
    } catch (error) {
        console.error('지식베이스 아이템 렌더링 실패:', error);
        container.innerHTML = `
            <div className="error-state">
                <div className="error-icon">❌</div>
                <h3>아이템 로드 오류</h3>
                <p>지식베이스 아이템을 불러오는 중 오류가 발생했습니다.</p>
            </div>
        `;
    }
}

function getFilteredItems({ knowledgeItems, filters }) {
    try {
        let filtered = [...knowledgeItems];

        // 카테고리 필터
        if (filters.category !== 'all') {
            filtered = filtered.filter(item => item.category === filters.category);
        }

        // 상태 필터
        if (filters.status !== 'all') {
            filtered = filtered.filter(item => item.status === filters.status);
        }

        // 검색 필터
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(searchTerm) ||
                item.description.toLowerCase().includes(searchTerm) ||
                item.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
                (item.metadata?.topics && item.metadata.topics.some(topic => topic.toLowerCase().includes(searchTerm)))
            );
        }

        return filtered;
    } catch (error) {
        console.error('필터링 실패:', error);
        return knowledgeItems;
    }
}

function renderKnowledgeRow(item) {
    return '준비중'
}

function renderKnowledgeCard({ item, categories, processingStatus }) {
    try {
        const category = categories[item.category];
        const status = processingStatus[item.status];

        if (!category || !status) {
            console.error('카테고리 또는 상태 정보가 없습니다:', item);
            return '';
        }

        return (
            <div className={`knowledge-card ${item.status}`} data-item-id={item.id} key={item.id}>
                <div className="knowledge-header">
                    <div className="file-icon"
                        style={{ backgroundColor: `${category.color}20`, color: category.color }}
                    >
                        {category.icon}
                    </div>
                    <div className="file-status">
                        <div className={`status-indicator status-${item.status}`} title={status.label}>
                            {status.icon}
                        </div>
                        <div className="knowledge-menu">
                            <button className="menu-btn"
                            // onClick="KnowledgeManager.showItemMenu('${item.id}')"
                            >⋮</button>
                        </div>
                    </div>
                </div>

                <div className="knowledge-info">
                    <div className="file-name" title={item.originalName}>{item.name}</div>
                    <div className="file-description">{item.description}</div>
                    <div className="file-size">{formatFileSize(item.size)}</div>
                </div>

                {item.status === 'processing' ? (
                    <div className="processing-progress">
                        <div className="progress-bar">
                            <div className="progress-fill processing-animation"></div>
                        </div>
                        <div className="progress-text">파일 처리 중...</div>
                    </div>
                ) : ''}

                {item.status === 'completed' ? (
                    <div className="knowledge-stats">
                        <div className="stat-item">
                            <span className="stat-icon">🧩</span>
                            <span className="stat-value">{item.chunks}</span>
                            <span className="stat-label">청크</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-icon">🔍</span>
                            <span className="stat-value">{item.usage.queries}</span>
                            <span className="stat-label">쿼리</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-icon">🎯</span>
                            <span className="stat-value">{item.embedding?.tokens?.toLocaleString() || 0}</span>
                            <span className="stat-label">토큰</span>
                        </div>
                    </div>
                ) : ''}

                {item.status === 'failed' ? (
                    <div className="error-info">
                        <div className="error-icon">❌</div>
                        <div className="error-message">{item.error}</div>
                        <button className="retry-btn"
                        // onClick="KnowledgeManager.retryProcessing('${item.id}')"
                        >다시 시도</button>
                    </div>
                ) : ''}

                <div className="knowledge-tags">
                    {item.tags.map((tag, index) => (<span className="knowledge-tag" key={index}>{tag}</span>))}
                </div>

                <div className="knowledge-footer">
                    <div className="upload-date">
                        {formatDate(item.uploadDate, 'MM/DD HH:mm')}
                    </div>
                    <div className="knowledge-actions">
                        <button className="action-btn"
                            // onClick="KnowledgeManager.previewItem('${item.id}')"
                            title="미리보기">👁️</button>
                        <button className="action-btn"
                            // onClick="KnowledgeManager.searchInItem('${item.id}')"
                            title="검색">🔍</button>
                        <button className="action-btn"
                            // onClick="KnowledgeManager.downloadItem('${item.id}')"
                            title="다운로드">⬇️</button>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('지식베이스 카드 렌더링 실패:', error);
        return `<div className="error-card">카드 렌더링 오류</div>`;
    }
}