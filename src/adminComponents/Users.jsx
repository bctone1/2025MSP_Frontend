'use client';
import "@/adminStyle/users.css";
import "@/adminStyle/common.css";

import { useState } from 'react';

export default function Users({ onMenuClick }) {
    return (
        <>
            <div className="page-container">
                {/* 페이지 헤더 */}
                <div className="page-header">
                    <div className="header-top">
                        <div className="header-info">
                            <h1 className="page-title">사용자 관리</h1>
                            <p className="page-subtitle">플랫폼 사용자 계정 및 권한을 관리하세요</p>
                        </div>
                        <div className="header-actions">
                            <button className="btn btn-secondary" id="export-users">
                                📤 내보내기
                            </button>
                            <button className="btn btn-primary" id="add-user">
                                ➕ 사용자 추가
                            </button>
                        </div>
                    </div>
                </div>

                {/* 사용자 통계 */}
                <div className="user-stats">
                    <div className="stat-card">
                        <div className="stat-icon users-total">👥</div>
                        <div className="stat-content">
                            <div className="stat-value" id="total-users">1,247</div>
                            <div className="stat-label">총 사용자</div>
                            <div className="stat-change positive">+24명 증가</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon users-active">⚡</div>
                        <div className="stat-content">
                            <div className="stat-value" id="active-users">892</div>
                            <div className="stat-label">활성 사용자</div>
                            <div className="stat-change positive">71.5% 활성화율</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon users-new">🆕</div>
                        <div className="stat-content">
                            <div className="stat-value" id="new-users">43</div>
                            <div className="stat-label">오늘 신규</div>
                            <div className="stat-change positive">+15명 증가</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon users-pro">⭐</div>
                        <div className="stat-content">
                            <div className="stat-value" id="pro-users">156</div>
                            <div className="stat-label">PRO 사용자</div>
                            <div className="stat-change positive">12.5% 전환율</div>
                        </div>
                    </div>
                </div>

                {/* 사용자 필터 및 검색 */}
                <div className="users-toolbar">
                    <div className="toolbar-left">
                        <div className="search-box">
                            <input type="text" id="user-search" placeholder="사용자 검색..." className="search-input" />
                            <div className="search-icon">🔍</div>
                        </div>

                        <div className="filter-group">
                            <select id="status-filter" className="filter-select">
                                <option value="all">모든 상태</option>
                                <option value="active">활성</option>
                                <option value="inactive">비활성</option>
                                <option value="suspended">정지</option>
                                <option value="pending">대기</option>
                            </select>

                            <select id="plan-filter" className="filter-select">
                                <option value="all">모든 플랜</option>
                                <option value="free">무료</option>
                                <option value="pro">PRO</option>
                                <option value="enterprise">Enterprise</option>
                            </select>

                            <select id="role-filter" className="filter-select">
                                <option value="all">모든 역할</option>
                                <option value="user">일반 사용자</option>
                                <option value="admin">관리자</option>
                                <option value="developer">개발자</option>
                            </select>
                        </div>
                    </div>

                    <div className="toolbar-right">
                        <div className="sort-controls">
                            <select id="sort-by" className="sort-select">
                                <option value="created">가입일</option>
                                <option value="name">이름</option>
                                <option value="email">이메일</option>
                                <option value="lastLogin">마지막 로그인</option>
                                <option value="usage">사용량</option>
                            </select>
                            <button className="sort-order-btn" id="sort-order">
                                <span id="sort-icon">↓</span>
                            </button>
                        </div>

                        <div className="view-toggle">
                            <button className="view-btn active" data-view="table">📋</button>
                            <button className="view-btn" data-view="grid">⊞</button>
                        </div>
                    </div>
                </div>

                {/* 사용자 목록 */}
                <div className="users-container">
                    {/* 테이블 뷰 */}
                    <div className="users-table-view active" id="users-table">
                        <div className="table-container">
                            <table className="users-table">
                                <thead>
                                    <tr>
                                        <th>
                                            <input type="checkbox" id="select-all" className="checkbox" />
                                        </th>
                                        <th>사용자</th>
                                        <th>이메일</th>
                                        <th>플랜</th>
                                        <th>상태</th>
                                        <th>사용량</th>
                                        <th>마지막 로그인</th>
                                        <th>가입일</th>
                                        <th>액션</th>
                                    </tr>
                                </thead>
                                <tbody id="users-tbody">
                                    {/* 사용자 데이터가 여기에 동적으로 추가됩니다 */}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* 그리드 뷰 */}
                    <div className="users-grid-view" id="users-grid">
                        {/* 사용자 카드들이 여기에 동적으로 추가됩니다 */}
                    </div>

                    {/* 페이지네이션 */}
                    <div className="pagination" id="pagination">
                        {/* 페이지네이션이 여기에 동적으로 추가됩니다 */}
                    </div>
                </div>

                {/* 선택된 사용자 액션 */}
                <div className="bulk-actions" id="bulk-actions" style={{ display: 'none' }}>
                    <div className="bulk-actions-content">
                        <div className="selected-count">
                            <span id="selected-count">0</span>명 선택됨
                        </div>
                        <div className="bulk-buttons">
                            <button className="btn btn-secondary" id="bulk-email">📧 이메일 발송</button>
                            <button className="btn btn-secondary" id="bulk-suspend">⏸️ 계정 정지</button>
                            <button className="btn btn-secondary" id="bulk-activate">✅ 계정 활성화</button>
                            <button className="btn btn-danger" id="bulk-delete">🗑️ 계정 삭제</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}