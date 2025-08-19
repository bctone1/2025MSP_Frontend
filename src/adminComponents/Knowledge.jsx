'use client';

import "@/adminStyle/knowledge.css";

import { useState } from 'react';

export default function Knowledge() {
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
                    <div className="stat-card">
                        <div className="stat-icon total-files">📄</div>
                        <div className="stat-content">
                            <div className="stat-value" id="total-files">1,247</div>
                            <div className="stat-label">총 파일 수</div>
                            <div className="stat-change positive">+24개 이번 주</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon processed-files">⚡</div>
                        <div className="stat-content">
                            <div className="stat-value" id="processed-files">1,189</div>
                            <div className="stat-label">처리 완료</div>
                            <div className="stat-change positive">95.3% 완료율</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon storage-usage">💾</div>
                        <div className="stat-content">
                            <div className="stat-value" id="storage-usage">12.8GB</div>
                            <div className="stat-label">스토리지 사용량</div>
                            <div className="stat-change neutral">50GB 중 25.6%</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon monthly-queries">🔍</div>
                        <div className="stat-content">
                            <div className="stat-value" id="monthly-queries">38.9K</div>
                            <div className="stat-label">이번 달 검색</div>
                            <div className="stat-change positive">+32% 증가</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon vector-chunks">📊</div>
                        <div className="stat-content">
                            <div className="stat-value" id="vector-chunks">156K</div>
                            <div className="stat-label">벡터 청크</div>
                            <div className="stat-change positive">임베딩 완료</div>
                        </div>
                    </div>
                </div>

                {/* 카테고리 개요 */}
                <div className="categories-overview">
                    <div className="section-header">
                        <h3 className="section-title">📂 카테고리별 현황</h3>
                        <button className="btn btn-secondary" id="manage-categories">카테고리 관리</button>
                    </div>
                    <div className="categories-grid" id="categories-grid">
                        {/* 카테고리 카드들이 여기에 동적으로 추가됩니다 */}
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