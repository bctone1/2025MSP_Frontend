'use client';
import { useState, useEffect } from 'react';

export default function WorkflowPage() {

    return (
        <div className="app-container">
            <div className="container">

                <div className="header">
                    <div className="header-title">
                        <div>
                            <h1 className="page-title">워크플로우 디자이너</h1>
                            <p className="page-subtitle">AI 에이전트 간의 작업 흐름을 설계하세요</p>
                        </div>
                        <div className="header-controls">
                            <div className="status-badge status-active">
                                <span>🔀</span>
                                <span>2개 워크플로우 실행중</span>
                            </div>
                            <button
                                className="action-btn"
                            // onclick="WorkflowDesigner.runWorkflow()"
                            >
                                <span>▶️</span>
                                <span>실행</span>
                            </button>
                        </div>
                    </div>
                </div>


                <div className="workflow-designer">
                    <div className="workflow-toolbar">
                        <div className="workflow-tools">
                            <button className="workflow-tool" data-tool="select">
                                <span>👆</span>
                                <span>선택</span>
                            </button>
                            <button className="workflow-tool" data-tool="node">
                                <span>🔲</span>
                                <span>노드</span>
                            </button>
                            <button className="workflow-tool" data-tool="connect">
                                <span>🔗</span>
                                <span>연결</span>
                            </button>
                        </div>

                        <div className="workflow-tools">
                            <button
                                className="workflow-tool"
                            // onclick="WorkflowDesigner.saveWorkflow()"
                            >
                                <span>💾</span>
                                <span>저장</span>
                            </button>
                            <button
                                className="workflow-tool"
                            // onclick="WorkflowDesigner.clearCanvas()"
                            >
                                <span>🗑️</span>
                                <span>초기화</span>
                            </button>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flex: 1 }}>
                        <div className="workflow-canvas"></div>

                        <div className="workflow-sidebar">
                            <div className="workflow-sidebar-section">
                                <h3 className="workflow-sidebar-title">템플릿 워크플로우</h3>
                                {/* 템플릿들이 여기에 렌더링됩니다 */}
                            </div>

                            <div className="workflow-sidebar-section">
                                <h3 className="workflow-sidebar-title">노드 타입</h3>
                                <div
                                    className="workflow-template"
                                // onclick="WorkflowDesigner.createNode('collector', 200, 200)"
                                >
                                    <div className="workflow-template-icon">📥</div>
                                    <div className="workflow-template-info">
                                        <div className="workflow-template-name">데이터 수집기</div>
                                    </div>
                                </div>
                                <div
                                    className="workflow-template"
                                // onclick="WorkflowDesigner.createNode('analyzer', 200, 200)"
                                >
                                    <div className="workflow-template-icon">📊</div>
                                    <div className="workflow-template-info">
                                        <div className="workflow-template-name">분석기</div>
                                    </div>
                                </div>
                                <div
                                    className="workflow-template"
                                // onclick="WorkflowDesigner.createNode('visualizer', 200, 200)"
                                >
                                    <div className="workflow-template-icon">📈</div>
                                    <div className="workflow-template-info">
                                        <div className="workflow-template-name">시각화기</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>





            </div>
        </div>
    );
}