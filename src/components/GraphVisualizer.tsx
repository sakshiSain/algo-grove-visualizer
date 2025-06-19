
import React, { useEffect, useRef } from 'react';

interface Node {
  id: string;
  x: number;
  y: number;
}

interface Edge {
  from: string;
  to: string;
  weight: number;
}

interface Graph {
  nodes: Node[];
  edges: Edge[];
}

interface GraphVisualizerProps {
  graph: Graph;
  mstEdges: string[];
  algorithmType: 'prim' | 'kruskal';
  currentStep: number;
}

const GraphVisualizer: React.FC<GraphVisualizerProps> = ({
  graph,
  mstEdges,
  algorithmType,
  currentStep
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const getEdgeId = (from: string, to: string) => {
    return [from, to].sort().join('-');
  };

  const isEdgeInMST = (edge: Edge) => {
    const edgeId = getEdgeId(edge.from, edge.to);
    return mstEdges.includes(edgeId);
  };

  const drawGraph = (ctx: CanvasRenderingContext2D, timestamp: number) => {
    const canvas = ctx.canvas;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    graph.edges.forEach((edge, index) => {
      const fromNode = graph.nodes.find(n => n.id === edge.from);
      const toNode = graph.nodes.find(n => n.id === edge.to);
      
      if (!fromNode || !toNode) return;

      const isInMST = isEdgeInMST(edge);
      const isActive = isInMST && Math.sin(timestamp * 0.005) > 0;

      // Edge line
      ctx.beginPath();
      ctx.moveTo(fromNode.x, fromNode.y);
      ctx.lineTo(toNode.x, toNode.y);
      
      if (isInMST) {
        ctx.strokeStyle = isActive ? '#ef4444' : '#f59e0b';
        ctx.lineWidth = isActive ? 4 : 3;
      } else {
        ctx.strokeStyle = '#d1d5db';
        ctx.lineWidth = 2;
      }
      
      ctx.stroke();

      // Edge weight
      const midX = (fromNode.x + toNode.x) / 2;
      const midY = (fromNode.y + toNode.y) / 2;
      
      ctx.fillStyle = isInMST ? '#ffffff' : '#374151';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Background circle for weight
      ctx.beginPath();
      ctx.arc(midX, midY, 12, 0, 2 * Math.PI);
      ctx.fillStyle = isInMST ? '#f59e0b' : '#ffffff';
      ctx.fill();
      ctx.strokeStyle = isInMST ? '#d97706' : '#d1d5db';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Weight text
      ctx.fillStyle = isInMST ? '#ffffff' : '#374151';
      ctx.fillText(edge.weight.toString(), midX, midY);
    });

    // Draw nodes
    graph.nodes.forEach((node, index) => {
      const isConnectedToMST = graph.edges.some(edge => 
        (edge.from === node.id || edge.to === node.id) && isEdgeInMST(edge)
      );

      // Node circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
      
      if (isConnectedToMST) {
        const pulse = Math.sin(timestamp * 0.01) * 0.2 + 0.8;
        ctx.fillStyle = algorithmType === 'prim' ? `rgba(59, 130, 246, ${pulse})` : `rgba(16, 185, 129, ${pulse})`;
      } else {
        ctx.fillStyle = '#6b7280';
      }
      
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Node label
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.id, node.x, node.y);
    });
  };

  const animate = (timestamp: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (ctx) {
      drawGraph(ctx, timestamp);
    }
    
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 500;
    canvas.height = 350;

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [graph, mstEdges, algorithmType, currentStep]);

  return (
    <div className="flex justify-center">
      <canvas
        ref={canvasRef}
        className="border border-gray-200 rounded-lg shadow-sm bg-white"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
};

export default GraphVisualizer;
