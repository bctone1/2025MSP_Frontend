'use client';
import "@/adminStyle/users.css";

import { useState, useMemo } from 'react';

export default function Users({ onMenuClick }) {

    const selectedUsers = new Set();

    const firstNames = ['김', '이', '박', '정', '최', '조', '윤', '장', '임', '한', '오', '서', '신', '권', '황'];
    const lastNames = ['민준', '서연', '예준', '하윤', '도윤', '시우', '주원', '지우', '지훈', '시은', '서준', '지호', '지민', '예린', '수빈'];
    const domains = ['gmail.com', 'naver.com', 'kakao.com', 'outlook.com', 'company.com'];
    const plans = ['free', 'pro', 'enterprise'];
    const statuses = ['active', 'inactive', 'suspended', 'pending'];
    const roles = ['user', 'admin', 'developer'];

    const generateAvatar = (name) => {
        return name.substring(0, 2).toUpperCase();
    };

    const getRandomCountry = () => {
        const countries = ['South Korea', 'USA', 'Germany', 'Japan', 'Canada', 'France'];
        return countries[Math.floor(Math.random() * countries.length)];
    };

    const generateIP = () => {
        return Array(4).fill(0).map(() => Math.floor(Math.random() * 256)).join('.');
    };

    const users = useMemo(() => {
        const tempUsers = [];

        for (let i = 1; i <= 147; i++) {
            const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            const name = firstName + lastName;
            const email = `${name.toLowerCase()}${i}@${domains[Math.floor(Math.random() * domains.length)]}`;
            const planRand = Math.random();
            const finalPlan = planRand > 0.875 ? 'pro' : (planRand > 0.95 ? 'enterprise' : 'free');
            const status = Math.random() > 0.3 ? 'active' : statuses[Math.floor(Math.random() * statuses.length)];
            const role = roles[Math.floor(Math.random() * roles.length)];

            tempUsers.push({
                id: i,
                name,
                email,
                plan: finalPlan,
                status,
                role,
                usage: Math.floor(Math.random() * 100),
                usageLimit: finalPlan === 'free' ? 1000 : finalPlan === 'pro' ? 10000 : 100000,
                apiCalls: Math.floor(Math.random() * 50000),
                lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
                created: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
                avatar: generateAvatar(name),
                country: getRandomCountry(),
                ipAddress: generateIP(),
                totalCost: parseFloat((Math.random() * 1000).toFixed(2)),
            });
        }

        return tempUsers;
    }, []);
    // console.log(users);

    // 사용자 통계 업데이트
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.status === 'active').length;
    const newUsers = users.filter(u => {
        const oneDay = 24 * 60 * 60 * 1000;
        return (Date.now() - u.created.getTime()) < oneDay;
    }).length;
    const proUsers = users.filter(u => u.plan === 'pro' || u.plan === 'enterprise').length;



    const [currentPage, setcurrentPage] = useState(1);
    const pageSize = 20;
    const [viewMode, setviewMode] = useState('table');

    const [sortBy, setsortBy] = useState('created');
    const [sortOrder, setsortOrder] = useState('desc');

    const [filters, setfilters] = useState({
        search: '',
        status: 'all',
        plan: 'all',
        role: 'all'
    });


    const filteredUsers = users.filter(user => {
        const matchesSearch =
            !filters.search ||
            user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            user.email.toLowerCase().includes(filters.search.toLowerCase());

        const matchesStatus = filters.status === 'all' || user.status === filters.status;
        const matchesPlan = filters.plan === 'all' || user.plan === filters.plan;
        const matchesRole = filters.role === 'all' || user.role === filters.role;

        return matchesSearch && matchesStatus && matchesPlan && matchesRole;
    }).sort((a, b) => {
        let valA = a[sortBy];
        let valB = b[sortBy];

        // 날짜 필드 처리
        if (sortBy === 'created' || sortBy === 'lastLogin') {
            valA = new Date(valA);
            valB = new Date(valB);
        }

        // 문자열 비교 처리
        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        // 숫자나 Date는 그대로 비교
        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });


    // sort-order 변경 핸들러
    const handleSortOrderToggle = () => {
        setsortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    };




    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageUsers = filteredUsers.slice(startIndex, endIndex);
    // console.log(pageUsers);


    const pendingUsers = [
        {
            id: "user1",
            name: "김관리",
            email: "kim.admin@company.com",
            avatar: "김",
            requestTime: "2024.08.04 14:30 신청",
            role: "관리자 권한 요청",
            phone: "01011111111",
            reason: "시스템 관리 업무를 담당하게 되어 관리자 권한이 필요합니다."
        },
        {
            id: "user2",
            name: "이개발",
            email: "lee.dev@company.com",
            avatar: "이",
            requestTime: "2024.08.04 11:15 신청",
            role: "관리자 권한 요청",
            phone: "01022222222",
            reason: "개발팀 리더로서 시스템 설정 및 사용자 관리가 필요합니다."
        },
        {
            id: "user3",
            name: "박매니저",
            email: "park.manager@company.com",
            avatar: "박",
            requestTime: "2024.08.04 09:45 신청",
            role: "관리자 권한 요청",
            phone: "01033333333",
            reason: "프로젝트 매니저로서 팀원들의 권한 관리가 필요합니다."
        },
    ];
    const [showModal, setShowModal] = useState(false);
    const [modalState, setmodalState] = useState("approval");
    const [pendingUser, setpendingUser] = useState("");



    return (
        <>
            <div className="page-container">

                <div className={`modal-overlay ${showModal ? 'active' : ''}`}>
                    <ShowPending setShowModal={setShowModal} modalState={modalState} pendingUser={pendingUser} />
                </div>


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

                <div className="approval-pending-section">
                    <div className="approval-section-header">
                        <div className="approval-section-title">
                            <div className="approval-icon">⏳</div>
                            <div className="approval-title-text">
                                <h3>관리자 승인 대기</h3>
                                <p>관리자 권한을 요청한 사용자들을 검토하고 승인하세요</p>
                            </div>
                        </div>
                        <div className="approval-badge">
                            <span>🔔</span>
                            <span id="pending-count">{pendingUsers.length}</span>명 대기
                        </div>
                    </div>

                    <div className="approval-list" id="approval-list">
                        {pendingUsers.map((user) => (
                            <div key={user.id} className="approval-item" data-user-id={user.id}>
                                <div className="approval-user-info">
                                    <div className="user-avatar">{user.avatar}</div>
                                    <div className="user-details">
                                        <div className="user-name">{user.name}</div>
                                        <div className="user-email">{user.email}</div>
                                        <div className="user-meta">
                                            <div className="request-time">
                                                <span>🕐</span>
                                                <span>{user.requestTime}</span>
                                            </div>
                                            <div className="admin-role-badge">
                                                <span>👑</span>
                                                <span>{user.role}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="approval-actions">
                                    <button
                                        className="btn btn-approve"
                                        onClick={() => { setShowModal(true), setmodalState("approve"), setpendingUser(user) }}
                                    >
                                        ✅ 승인
                                    </button>
                                    <button
                                        className="btn btn-reject"
                                        onClick={() => { setShowModal(true), setmodalState("reject"), setpendingUser(user) }}
                                    >
                                        ❌ 반려
                                    </button>
                                    <button
                                        className="btn btn-details"
                                        onClick={() => { setShowModal(true), setmodalState("detail"), setpendingUser(user) }}
                                    >
                                        📋 상세
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 승인 대기자가 없을 때 표시  */}
                    {pendingUsers.length === 0 && (
                        <div className="no-pending">
                            <div className="no-pending-icon">✅</div>
                            <div>승인 대기 중인 관리자가 없습니다.</div>
                        </div>
                    )}
                </div>


                {/* 사용자 통계 */}
                <div className="user-stats">
                    <div className="user-stat-card">
                        <div className="stat-icon users-total">👥</div>
                        <div className="stat-content">
                            <div className="stat-value" id="total-users">{totalUsers}</div>
                            <div className="stat-label">총 사용자</div>
                            <div className="stat-change positive">+24명 증가</div>
                        </div>
                    </div>

                    <div className="user-stat-card">
                        <div className="stat-icon users-active">⚡</div>
                        <div className="stat-content">
                            <div className="stat-value" id="active-users">{activeUsers}</div>
                            <div className="stat-label">활성 사용자</div>
                            <div className="stat-change positive">71.5% 활성화율</div>
                        </div>
                    </div>

                    <div className="user-stat-card">
                        <div className="stat-icon users-new">🆕</div>
                        <div className="stat-content">
                            <div className="stat-value" id="new-users">{newUsers}</div>
                            <div className="stat-label">오늘 신규</div>
                            <div className="stat-change positive">+15명 증가</div>
                        </div>
                    </div>

                    <div className="user-stat-card">
                        <div className="stat-icon users-pro">⭐</div>
                        <div className="stat-content">
                            <div className="stat-value" id="pro-users">{proUsers}</div>
                            <div className="stat-label">PRO 사용자</div>
                            <div className="stat-change positive">12.5% 전환율</div>
                        </div>
                    </div>
                </div>

                {/* 사용자 필터 및 검색 */}
                <div className="users-toolbar">
                    <div className="toolbar-left">
                        <div className="search-box">
                            <input type="text" id="user-search" placeholder="사용자 검색..." className="search-input" value={filters.search}
                                onChange={(e) =>
                                    setfilters((prev) => ({
                                        ...prev,
                                        search: e.target.value
                                    }))
                                }
                            />
                            <div className="search-icon">🔍</div>
                        </div>

                        <div className="filter-group">
                            <select id="status-filter" className="filter-select" value={filters.status}
                                onChange={(e) =>
                                    setfilters((prev) => ({
                                        ...prev,
                                        status: e.target.value
                                    }))
                                }
                            >
                                <option value="all">모든 상태</option>
                                <option value="active">활성</option>
                                <option value="inactive">비활성</option>
                                <option value="suspended">정지</option>
                                <option value="pending">대기</option>
                            </select>

                            <select id="plan-filter" className="filter-select" value={filters.plan}
                                onChange={(e) =>
                                    setfilters((prev) => ({
                                        ...prev,
                                        paln: e.target.value
                                    }))
                                }
                            >
                                <option value="all">모든 플랜</option>
                                <option value="free">무료</option>
                                <option value="pro">PRO</option>
                                <option value="enterprise">Enterprise</option>
                            </select>

                            <select id="role-filter" className="filter-select" value={filters.role}
                                onChange={(e) =>
                                    setfilters((prev) => ({
                                        ...prev,
                                        role: e.target.value
                                    }))
                                }
                            >
                                <option value="all">모든 역할</option>
                                <option value="user">일반 사용자</option>
                                <option value="admin">관리자</option>
                                <option value="developer">개발자</option>
                            </select>
                        </div>
                    </div>

                    <div className="toolbar-right">
                        <div className="sort-controls">
                            <select
                                id="sort-by"
                                className="sort-select"
                                value={sortBy}
                                onChange={(e) => setsortBy(e.target.value)}
                            >
                                <option value="created">가입일</option>
                                <option value="name">이름</option>
                                <option value="email">이메일</option>
                                <option value="lastLogin">마지막 로그인</option>
                                <option value="usage">사용량</option>
                                <option value="totalCost">총 비용</option>
                            </select>
                            <button className="sort-order-btn" onClick={handleSortOrderToggle}>
                                <span id="sort-icon">{sortOrder === 'asc' ? '↑' : '↓'}</span>
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
                                    {<RenderUsersTable pageUsers={pageUsers} selectedUsers={selectedUsers} />}

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
                        {<UpdatePagination filteredUsers={filteredUsers} currentPage={currentPage} pageSize={pageSize} setcurrentPage={setcurrentPage} />}
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
            </div >
        </>
    );
}

function ShowPending({ setShowModal, modalState, pendingUser }) {
    return (
        <>
            <div className="user-modal-content">
                <div className="modal-header">
                    <div className="modal-title" id="modal-title">
                        {/* <span id="modal-icon">{modalState === "approve" ? "✅" : "❌"}</span> */}
                        <span id="modal-title-text">관리자 승인요청</span>
                    </div>
                    <button className="modal-close" onClick={() => setShowModal(false)}>&times;</button>
                </div>

                <div className="modal-body">
                    <div className="user-info-section">
                        <div className="info-grid">
                            <div className="info-label">이름:</div>
                            <div className="info-value" id="detail-name">{pendingUser.name}</div>

                            <div className="info-label">이메일:</div>
                            <div className="info-value" id="detail-email">{pendingUser.email}</div>

                            <div className="info-label">사용자 ID:</div>
                            <div className="info-value" id="detail-userid">{pendingUser.id}</div>

                            <div className="info-label">휴대폰:</div>
                            <div className="info-value" id="detail-phone">{pendingUser.phone}</div>

                            <div className="info-label">신청일:</div>
                            <div className="info-value" id="detail-date">{pendingUser.requestTime}</div>

                            <div className="info-label">신청 사유:</div>
                            <div className="info-value" id="detail-reason">{pendingUser.reason}</div>
                        </div>
                    </div>

                    {modalState !== "detail" && (
                        <div className="reason-section">
                            <label className="reason-label" id="reason-label">승인 사유:</label>
                            <textarea className="reason-input" id="reason-input"
                                placeholder="승인/거부 사유를 입력하세요..."></textarea>
                        </div>
                    )}

                </div>

                <div className="modal-actions">
                    <button className="btn-modal btn-modal-cancel" onClick={() => setShowModal(false)}>취소</button>
                    <button className="btn-modal btn-modal-approve" id="confirm-approve" style={{ display: `${modalState === "approve" ? "" : "none"} ` }}
                        onClick={() => alert("백엔드서버 승인 요청")}
                    >
                        ✅ 승인 확정
                    </button>
                    <button className="btn-modal btn-modal-reject" id="confirm-reject" style={{ display: `${modalState === "reject" ? "" : "none"} ` }}
                        onClick={() => alert("백엔드서버 반려 요청")}
                    >
                        ❌ 반려 확정
                    </button>
                </div>
            </div>

        </>
    );
}

function UpdatePagination({ filteredUsers, currentPage, pageSize, setcurrentPage }) {
    const totalPages = Math.ceil(filteredUsers.length / pageSize);
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    const startIndex = (currentPage - 1) * pageSize + 1;
    const endIndex = Math.min(currentPage * pageSize, filteredUsers.length);
    return (<>
        <button
            className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={() => setcurrentPage(currentPage - 1)}
        >
            이전
        </button>

        {startPage > 1 && (
            <>
                <button className="pagination-btn" onClick={() => setcurrentPage(1)}>1</button>
                {startPage > 2 && (
                    <span className="pagination-ellipsis">...</span>
                )}
            </>
        )}

        {Array.from({ length: endPage - startPage + 1 }, (_, idx) => {
            const i = startPage + idx;
            return (
                <button
                    key={i}
                    className={`pagination-btn ${i === currentPage ? 'active' : ''}`}
                    onClick={() => setcurrentPage(i)}
                >
                    {i}
                </button>
            );
        })}

        {endPage < totalPages && (
            <>
                {endPage < totalPages - 1 && (
                    <span className="pagination-ellipsis">...</span>
                )}
                <button
                    className="pagination-btn"
                    onClick={() => setcurrentPage(totalPages)}
                >
                    {totalPages}
                </button>
            </>
        )}

        <button
            className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
            onClick={() => setcurrentPage(currentPage + 1)}
        >
            다음
        </button>

        <div className="pagination-info">
            {formatNumber(startIndex)}-{formatNumber(endIndex)} / {formatNumber(filteredUsers.length)}명
        </div>

    </>);
}

function formatNumber(num) {
    return new Intl.NumberFormat('ko-KR').format(num);
}


function RenderUsersTable({ pageUsers, selectedUsers }) {
    return (<>
        {pageUsers.map(user => (
            <tr key={user.id} data-user-id={user.id} className={`${selectedUsers.has(user.id) ? 'selected' : ''}`}>
                <td>
                    <input type="checkbox" className="checkbox user-checkbox"
                        data-user-id={user.id}
                    />
                </td>
                <td>
                    <div className="user-info">
                        <div className="user-avatar">{user.avatar}</div>
                        <div className="user-details">
                            <div className="user-name">{user.name}</div>
                            <div className="user-role">{getRoleText(user.role)}</div>
                        </div>
                    </div>
                </td>
                <td className="user-email">{user.email}</td>
                <td>
                    <span className={`plan-badge ${user.plan}`}>{getPlanText(user.plan)}</span>
                </td>
                <td>
                    <span className={`status-badge ${user.status}`}>
                        <span className="status-dot"></span>
                        {getStatusText(user.status)}
                    </span>
                </td>
                <td>
                    <div className="usage-bar">
                        <div className={`usage-fill ${getUsageLevel(user.usage)}`}
                            style={{ width: `${user.usage}%` }}></div>
                    </div>
                    <div className="usage-text">{user.usage}%</div>
                </td>
                <td className="date-cell">{formatDate(user.lastLogin)}</td>
                <td className="date-cell">{formatDate(user.created)}</td>
                <td>
                    <div className="user-actions">
                        <button className="action-btn" data-action="view" data-user-id={user.id} title="보기">👁️</button>
                        <button className="action-btn" data-action="edit" data-user-id={user.id} title="편집">✏️</button>
                        <button className="action-btn" data-action="suspend" data-user-id={user.id} title="정지">⏸️</button>
                        <button className="action-btn" data-action="delete" data-user-id={user.id} title="삭제">🗑️</button>
                    </div>
                </td>
            </tr>
        ))}
    </>);
}

function getRoleText(role) {
    const roleMap = {
        user: '일반 사용자',
        admin: '관리자',
        developer: '개발자'
    };
    return roleMap[role] || role;
}

function getPlanText(plan) {
    const planMap = {
        free: '무료',
        pro: 'PRO',
        enterprise: 'Enterprise'
    };
    return planMap[plan] || plan;
}

function getStatusText(status) {
    const statusMap = {
        active: '활성',
        inactive: '비활성',
        suspended: '정지',
        pending: '대기'
    };
    return statusMap[status] || status;
}

function getUsageLevel(usage) {
    if (usage < 50) return 'low';
    if (usage < 80) return 'medium';
    return 'high';
}

function formatDate(date, format = 'YYYY-MM-DD') {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');

    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes);
}
