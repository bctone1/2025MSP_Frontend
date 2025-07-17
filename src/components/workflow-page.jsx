'use client';
import { useState, useEffect } from 'react';
import { generateId } from '@/utill/utill';

export default function WorkflowPage() {

    const templates = [
        {
            id: 'data-analysis',
            name: '데이터 분석 플로우',
            description: '데이터 수집 → 분석 → 시각화',
            icon: '📊',
            nodes: [
                { id: 'collect', type: 'collector', x: 100, y: 100 },
                { id: 'analyze', type: 'analyzer', x: 300, y: 100 },
                { id: 'visualize', type: 'visualizer', x: 500, y: 100 }
            ],
            connections: [
                { from: 'collect', to: 'analyze' },
                { from: 'analyze', to: 'visualize' }
            ]
        },
        {
            id: 'content-creation',
            name: '콘텐츠 생성 플로우',
            description: '리서치 → 작성 → 검토',
            icon: '📝',
            nodes: [
                { id: 'research', type: 'researcher', x: 100, y: 100 },
                { id: 'write', type: 'writer', x: 300, y: 100 },
                { id: 'review', type: 'reviewer', x: 500, y: 100 }
            ],
            connections: [
                { from: 'research', to: 'write' },
                { from: 'write', to: 'review' }
            ]
        },
        {
            id: 'code-development',
            name: '코드 개발 플로우',
            description: '계획 → 코딩 → 테스트 → 배포',
            icon: '💻',
            nodes: [
                { id: 'plan', type: 'planner', x: 100, y: 100 },
                { id: 'code', type: 'coder', x: 300, y: 100 },
                { id: 'test', type: 'tester', x: 500, y: 100 },
                { id: 'deploy', type: 'deployer', x: 700, y: 100 }
            ],
            connections: [
                { from: 'plan', to: 'code' },
                { from: 'code', to: 'test' },
                { from: 'test', to: 'deploy' }
            ]
        }
    ]

    const [workflowstatus, setworkflowstatus] = useState(null);

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
                        <div className="workflow-canvas">
                            {workflowstatus && (
                                <LoadTemplate template={workflowstatus} templates={templates} />
                            )}

                        </div>

                        <div className="workflow-sidebar">
                            <div className="workflow-sidebar-section">
                                <h3 className="workflow-sidebar-title">템플릿 워크플로우</h3>
                                {/* 템플릿들이 여기에 렌더링됩니다 */}
                                {/* {renderTemplates({ templates })} */}
                                {templates.map(template => (
                                    <div
                                        key={template.id}
                                        className="workflow-template"
                                        data-template-id={template.id}
                                        onClick={() => setworkflowstatus(template)}
                                    >
                                        <div className="workflow-template-icon">{template.icon}</div>
                                        <div className="workflow-template-info">
                                            <div className="workflow-template-name">{template.name}</div>
                                            <div className="workflow-template-desc">{template.description}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}



function LoadTemplate({ template }) {
    if (!template || !template.nodes) return null;
    const [nodes, setnodes] = useState([]);

    return (
        <>
            {template.nodes.map((nodeData) => (
                <CreateNode
                    key={nodeData.id}
                    type={nodeData.type}
                    x={nodeData.x}
                    y={nodeData.y}
                    id={nodeData.id}
                    setnodes={setnodes}
                />
            ))}

            {template.connections.map((connData) => {
                const fromNode = nodes.find(n => n.id === connData.from);
                const toNode = nodes.find(n => n.id === connData.to);
                if (fromNode && toNode) {
                    createConnection({ fromNode, toNode });
                }
            })}
        </>
    );
}

function createConnection({ fromNode, toNode }) {
    console.log(fromNode);
    console.log(toNode);
    

}

function CreateNode({ type, x, y, id, setnodes }) {
    const nodeTypes = {
        collector: { name: '데이터 수집기', icon: '📥', color: '#3b82f6' },
        analyzer: { name: '분석기', icon: '📊', color: '#8b5cf6' },
        visualizer: { name: '시각화기', icon: '📈', color: '#10b981' },
        researcher: { name: '리서처', icon: '🔍', color: '#f59e0b' },
        writer: { name: '작성기', icon: '✍️', color: '#ef4444' },
        reviewer: { name: '검토기', icon: '👀', color: '#06b6d4' },
        planner: { name: '계획기', icon: '📋', color: '#8b5cf6' },
        coder: { name: '코더', icon: '💻', color: '#10b981' },
        tester: { name: '테스터', icon: '🧪', color: '#f59e0b' },
        deployer: { name: '배포기', icon: '🚀', color: '#ef4444' }
    };

    const nodeId = id || generateId();
    const nodeType = nodeTypes[type];

    useEffect(() => {
        const node = {
            id: nodeId,
            type: type,
            x: x,
            y: y,
            element: null // React에서는 DOM element를 직접 넣지 않아도 됩니다
        };
        setnodes(prev => [...prev, node]);
    }, [nodeId, type, x, y, setnodes]);


    if (!nodeType) {
        console.error('알 수 없는 노드 타입:', type);
        return null;
    }

    return (
        <div
            key={nodeId}
            className="workflow-node"
            style={{ left: `${x}px`, top: `${y}px`, position: 'absolute' }}
        >
            <div className="workflow-node-header" style={{ background: nodeType.color }}>
                <span className="workflow-node-icon">{nodeType.icon}</span>
                <span className="workflow-node-title">{nodeType.name}</span>
            </div>

            <div className="workflow-node-body">
                <div className="workflow-node-description">
                    {getNodeDescription(type)}
                </div>
                <div className="workflow-node-ports">
                    <div className="workflow-port input-port" data-port="input"></div>
                    <div className="workflow-port output-port" data-port="output"></div>
                </div>
            </div>
        </div>
    );
}


function getNodeDescription(type) {
    const descriptions = {
        collector: '데이터를 수집하고 정리합니다',
        analyzer: '수집된 데이터를 분석합니다',
        visualizer: '분석 결과를 시각화합니다',
        researcher: '주제에 대해 리서치합니다',
        writer: '콘텐츠를 작성합니다',
        reviewer: '작성된 콘텐츠를 검토합니다',
        planner: '개발 계획을 수립합니다',
        coder: '코드를 작성합니다',
        tester: '코드를 테스트합니다',
        deployer: '애플리케이션을 배포합니다'
    };
    return descriptions[type] || '작업을 수행합니다';
}