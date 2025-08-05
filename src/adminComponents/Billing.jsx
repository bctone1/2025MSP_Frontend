'use client';

import "@/adminStyle/billing.css";

import { useState, useEffect, useMemo } from 'react';

export default function Billing() {
    return (
        <>
            <div className="page-container">
                {/* 페이지 헤더  */}
                <div className="page-header">
                    <div className="header-top">
                        <div className="header-info">
                            <h1 className="page-title">과금 관리</h1>
                            <p className="page-subtitle">사용자 요금제와 결제 내역을 관리하세요</p>
                        </div>
                        <div className="header-actions">
                            <button className="btn btn-secondary" id="export-billing">
                                📊 청구서 내보내기
                            </button>
                            <button className="btn btn-primary" id="create-invoice">
                                ➕ 청구서 생성
                            </button>
                        </div>
                    </div>
                </div>

                {/* 과금 통계 */}
                <div className="billing-stats">
                    <div className="stat-card revenue">
                        <div className="stat-icon revenue">💰</div>
                        <div className="stat-content">
                            <div className="stat-value" id="total-revenue">$47,832</div>
                            <div className="stat-label">이번 달 수익</div>
                            <div className="stat-change positive">+24% 증가</div>
                        </div>
                    </div>

                    <div className="stat-card subscription">
                        <div className="stat-icon subscription">📋</div>
                        <div className="stat-content">
                            <div className="stat-value" id="total-subscriptions">1,247</div>
                            <div className="stat-label">활성 구독</div>
                            <div className="stat-change positive">+87 신규</div>
                        </div>
                    </div>

                    <div className="stat-card arpu">
                        <div className="stat-icon arpu">📈</div>
                        <div className="stat-content">
                            <div className="stat-value" id="arpu">$38.36</div>
                            <div className="stat-label">사용자당 평균 수익</div>
                            <div className="stat-change positive">+5.2% 증가</div>
                        </div>
                    </div>

                    <div className="stat-card churn">
                        <div className="stat-icon churn">📉</div>
                        <div className="stat-content">
                            <div className="stat-value" id="churn-rate">2.4%</div>
                            <div className="stat-label">이탈률</div>
                            <div className="stat-change negative">-0.8% 개선</div>
                        </div>
                    </div>

                    <div className="stat-card outstanding">
                        <div className="stat-icon outstanding">⏰</div>
                        <div className="stat-content">
                            <div className="stat-value" id="outstanding-amount">$8,432</div>
                            <div className="stat-label">미납 금액</div>
                            <div className="stat-change warning">23건 미납</div>
                        </div>
                    </div>
                </div>

                {/* 메인 대시보드 */}
                <div className="billing-dashboard">
                    <div className="dashboard-main">
                        {/* 수익 차트 */}
                        <div className="chart-section">
                            <div className="section-header">
                                <h3 className="section-title">
                                    <div className="section-icon revenue">💰</div>
                                    수익 트렌드
                                </h3>
                                <div className="chart-controls">
                                    <select id="revenue-period" className="filter-select">
                                        <option value="week">7일</option>
                                        <option value="month">30일</option>
                                        <option value="quarter">3개월</option>
                                        <option value="year">1년</option>
                                    </select>
                                </div>
                            </div>
                            <div className="chart-container" id="revenue-chart">
                                <div className="chart-placeholder">
                                    💹 수익 차트 (Chart.js 연동 예정)
                                    <div className="chart-demo">
                                        <div className="chart-bars revenue">
                                            <div className="chart-bar" style={{ height: '45%' }}></div>
                                            <div className="chart-bar" style={{ height: '60%' }}></div>
                                            <div className="chart-bar" style={{ height: '55%' }}></div>
                                            <div className="chart-bar" style={{ height: '45%' }}></div>
                                            <div className="chart-bar" style={{ height: '80%' }}></div>
                                            <div className="chart-bar" style={{ height: '90%' }}></div>
                                            <div className="chart-bar" style={{ height: '95%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 구독 현황 */}
                        <div className="subscription-overview">
                            <div className="section-header">
                                <h3 className="section-title">
                                    <div className="section-icon subscription">📋</div>
                                    구독 현황
                                </h3>
                                <button className="btn btn-secondary" id="manage-plans">
                                    ⚙️ 요금제 관리
                                </button>
                            </div>

                            <div className="plan-distribution">
                                <div className="plan-item">
                                    <div className="plan-info">
                                        <div className="plan-name">FREE</div>
                                        <div className="plan-price">$0/월</div>
                                    </div>
                                    <div className="plan-stats">
                                        <div className="plan-users">842명</div>
                                        <div className="plan-percentage">67.5%</div>
                                    </div>
                                    <div className="plan-bar">
                                        <div className="plan-fill" style={{ width: '67.5%' }}></div>
                                    </div>
                                </div>

                                <div className="plan-item">
                                    <div className="plan-info">
                                        <div className="plan-name">PRO</div>
                                        <div className="plan-price">$29/월</div>
                                    </div>
                                    <div className="plan-stats">
                                        <div className="plan-users">298명</div>
                                        <div className="plan-percentage">23.9%</div>
                                    </div>
                                    <div className="plan-bar">
                                        <div className="plan-fill" style={{ width: '23.9%' }}></div>
                                    </div>
                                </div>

                                <div className="plan-item">
                                    <div className="plan-info">
                                        <div className="plan-name">ENTERPRISE</div>
                                        <div className="plan-price">$99/월</div>
                                    </div>
                                    <div className="plan-stats">
                                        <div className="plan-users">87명</div>
                                        <div className="plan-percentage">7.0%</div>
                                    </div>
                                    <div className="plan-bar">
                                        <div className="plan-fill" style={{ width: '6.9%' }}></div>
                                    </div>
                                </div>

                                <div className="plan-item">
                                    <div className="plan-info">
                                        <div className="plan-name">CUSTOM</div>
                                        <div className="plan-price">협의</div>
                                    </div>
                                    <div className="plan-stats">
                                        <div className="plan-users">20명</div>
                                        <div className="plan-percentage">1.6%</div>
                                    </div>
                                    <div className="plan-bar">
                                        <div className="plan-fill" style={{ width: '1.6%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 사이드바 정보 */}
                    <div className="dashboard-sidebar">
                        {/* 최근 거래 */}
                        <div className="sidebar-section">
                            <div className="section-header">
                                <h4 className="section-title">최근 거래</h4>
                                <button className="refresh-btn" id="refresh-transactions">🔄</button>
                            </div>
                            <div className="transactions-list" id="recent-transactions">
                                {/* 거래 내역이 여기에 동적으로 추가됩니다 */}
                            </div>
                        </div>

                        {/* 미납 알림 */}
                        <div className="sidebar-section">
                            <div className="section-header">
                                <h4 className="section-title">⚠️ 미납 알림</h4>
                                <span className="notification-count">23</span>
                            </div>
                            <div className="overdue-list" id="overdue-payments">
                                {/* 미납 내역이 여기에 동적으로 추가됩니다 */}
                            </div>
                        </div>

                        {/* 결제 방법 */}
                        <div className="sidebar-section">
                            <div className="section-header">
                                <h4 className="section-title">결제 방법</h4>
                            </div>
                            <div className="payment-methods">
                                <div className="payment-method">
                                    <div className="payment-icon">💳</div>
                                    <div className="payment-info">
                                        <div className="payment-name">신용카드</div>
                                        <div className="payment-count">892명 (71.5%)</div>
                                    </div>
                                </div>
                                <div className="payment-method">
                                    <div className="payment-icon">🏦</div>
                                    <div className="payment-info">
                                        <div className="payment-name">계좌이체</div>
                                        <div className="payment-count">245명 (19.6%)</div>
                                    </div>
                                </div>
                                <div className="payment-method">
                                    <div className="payment-icon">💰</div>
                                    <div className="payment-info">
                                        <div className="payment-name">전자결제</div>
                                        <div className="payment-count">110명 (8.9%)</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 세부 관리 탭 */}
                <div className="billing-tabs">
                    <div className="tab-navigation">
                        <button className="tab-btn active" data-tab="invoices">📄 청구서</button>
                        <button className="tab-btn" data-tab="subscriptions">🔔 구독 관리</button>
                        <button className="tab-btn" data-tab="transactions">💳 거래 내역</button>
                        <button className="tab-btn" data-tab="plans">📋 요금제</button>
                        <button className="tab-btn" data-tab="reports">📊 재무 보고서</button>
                    </div>

                    <div className="tab-content">
                        {/* 청구서 탭 */}
                        <div className="tab-pane active" id="invoices-tab">
                            <div className="invoices-section">
                                <div className="invoices-toolbar">
                                    <div className="toolbar-left">
                                        <div className="search-box">
                                            <input type="text" id="invoice-search" placeholder="청구서 검색..."
                                                className="search-input" />
                                            <div className="search-icon">🔍</div>
                                        </div>
                                        <div className="filter-group">
                                            <select id="invoice-status" className="filter-select">
                                                <option value="all">모든 상태</option>
                                                <option value="paid">결제 완료</option>
                                                <option value="pending">결제 대기</option>
                                                <option value="overdue">연체</option>
                                                <option value="cancelled">취소</option>
                                            </select>
                                            <select id="invoice-period" className="filter-select">
                                                <option value="month">이번 달</option>
                                                <option value="quarter">최근 3개월</option>
                                                <option value="year">올해</option>
                                                <option value="all">전체</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="toolbar-right">
                                        <button className="btn btn-secondary" id="bulk-send">📧 일괄 발송</button>
                                    </div>
                                </div>

                                <div className="invoices-table-container">
                                    <table className="invoices-table">
                                        <thead>
                                            <tr>
                                                <th><input type="checkbox" id="select-all-invoices" /></th>
                                                <th>청구서 번호</th>
                                                <th>고객</th>
                                                <th>금액</th>
                                                <th>발행일</th>
                                                <th>만료일</th>
                                                <th>상태</th>
                                                <th>액션</th>
                                            </tr>
                                        </thead>
                                        <tbody id="invoices-tbody">
                                            {/* 청구서 데이터가 여기에 동적으로 추가됩니다 */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* 구독 관리 탭 */}
                        <div className="tab-pane" id="subscriptions-tab">
                            <div className="subscriptions-section">
                                <div className="subscriptions-toolbar">
                                    <div className="toolbar-left">
                                        <div className="search-box">
                                            <input type="text" id="subscription-search" placeholder="구독 검색..."
                                                className="search-input" />
                                            <div className="search-icon">🔍</div>
                                        </div>
                                        <div className="filter-group">
                                            <select id="subscription-status" className="filter-select">
                                                <option value="all">모든 상태</option>
                                                <option value="active">활성</option>
                                                <option value="cancelled">취소</option>
                                                <option value="expired">만료</option>
                                                <option value="trial">체험</option>
                                            </select>
                                            <select id="subscription-plan" className="filter-select">
                                                <option value="all">모든 요금제</option>
                                                <option value="free">FREE</option>
                                                <option value="pro">PRO</option>
                                                <option value="enterprise">ENTERPRISE</option>
                                                <option value="custom">CUSTOM</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="subscriptions-grid" id="subscriptions-grid">
                                    {/* 구독 카드들이 여기에 동적으로 추가됩니다 */}
                                </div>
                            </div>
                        </div>

                        {/* 거래 내역 탭 */}
                        <div className="tab-pane" id="transactions-tab">
                            <div className="transactions-section">
                                <div className="transactions-toolbar">
                                    <div className="toolbar-left">
                                        <div className="search-box">
                                            <input type="text" id="transaction-search" placeholder="거래 검색..."
                                                className="search-input" />
                                            <div className="search-icon">🔍</div>
                                        </div>
                                        <div className="filter-group">
                                            <select id="transaction-type" className="filter-select">
                                                <option value="all">모든 유형</option>
                                                <option value="payment">결제</option>
                                                <option value="refund">환불</option>
                                                <option value="chargeback">지불거절</option>
                                            </select>
                                            <select id="transaction-method" className="filter-select">
                                                <option value="all">모든 결제수단</option>
                                                <option value="card">신용카드</option>
                                                <option value="bank">계좌이체</option>
                                                <option value="paypal">페이팔</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="toolbar-right">
                                        <button className="btn btn-secondary" id="export-transactions">📊 내보내기</button>
                                    </div>
                                </div>

                                <div className="transactions-table-container">
                                    <table className="transactions-table">
                                        <thead>
                                            <tr>
                                                <th>거래 ID</th>
                                                <th>고객</th>
                                                <th>유형</th>
                                                <th>금액</th>
                                                <th>결제수단</th>
                                                <th>상태</th>
                                                <th>일시</th>
                                                <th>액션</th>
                                            </tr>
                                        </thead>
                                        <tbody id="transactions-tbody">
                                            {/* 거래 데이터가 여기에 동적으로 추가됩니다 */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* 요금제 탭 */}
                        <div className="tab-pane" id="plans-tab">
                            <div className="plans-section">
                                <div className="plans-toolbar">
                                    <div className="toolbar-left">
                                        <h3>요금제 관리</h3>
                                    </div>
                                    <div className="toolbar-right">
                                        <button className="btn btn-primary" id="add-plan">➕ 요금제 추가</button>
                                    </div>
                                </div>

                                <div className="plans-grid" id="plans-grid">
                                    {/* 요금제 카드들이 여기에 동적으로 추가됩니다 */}
                                </div>
                            </div>
                        </div>

                        {/* 재무 보고서 탭 */}
                        <div className="tab-pane" id="reports-tab">
                            <div className="reports-section">
                                <div className="reports-toolbar">
                                    <div className="toolbar-left">
                                        <h3>재무 보고서</h3>
                                    </div>
                                    <div className="toolbar-right">
                                        <select id="report-type" className="filter-select">
                                            <option value="revenue">수익 보고서</option>
                                            <option value="subscription">구독 보고서</option>
                                            <option value="churn">이탈 분석</option>
                                            <option value="forecast">수익 예측</option>
                                        </select>
                                        <button className="btn btn-secondary" id="generate-report">📊 보고서 생성</button>
                                    </div>
                                </div>

                                <div className="reports-content" id="reports-content">
                                    {/* 보고서 내용이 여기에 동적으로 추가됩니다 */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}