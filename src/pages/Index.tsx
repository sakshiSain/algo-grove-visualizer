
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import GraphVisualizer from '@/components/GraphVisualizer';
import AlgorithmExplanation from '@/components/AlgorithmExplanation';
import ComparisonTable from '@/components/ComparisonTable';

// Sample graph data for demonstration
const sampleGraph = {
  nodes: [
    { id: 'A', x: 100, y: 80 },
    { id: 'B', x: 250, y: 60 },
    { id: 'C', x: 400, y: 100 },
    { id: 'D', x: 50, y: 200 },
    { id: 'E', x: 200, y: 180 },
    { id: 'F', x: 350, y: 220 },
    { id: 'G', x: 150, y: 300 },
    { id: 'H', x: 300, y: 320 },
    { id: 'I', x: 450, y: 280 },
    { id: 'J', x: 500, y: 150 }
  ],
  edges: [
    { from: 'A', to: 'B', weight: 4 },
    { from: 'A', to: 'D', weight: 2 },
    { from: 'B', to: 'C', weight: 3 },
    { from: 'B', to: 'E', weight: 6 },
    { from: 'C', to: 'F', weight: 5 },
    { from: 'C', to: 'J', weight: 7 },
    { from: 'D', to: 'E', weight: 1 },
    { from: 'D', to: 'G', weight: 8 },
    { from: 'E', to: 'F', weight: 4 },
    { from: 'E', to: 'G', weight: 9 },
    { from: 'E', to: 'H', weight: 3 },
    { from: 'F', to: 'H', weight: 2 },
    { from: 'F', to: 'I', weight: 6 },
    { from: 'F', to: 'J', weight: 4 },
    { from: 'G', to: 'H', weight: 7 },
    { from: 'H', to: 'I', weight: 5 },
    { from: 'I', to: 'J', weight: 3 }
  ]
};

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [primMST, setPrimMST] = useState<string[]>([]);
  const [kruskalMST, setKruskalMST] = useState<string[]>([]);
  const [primCost, setPrimCost] = useState(0);
  const [kruskalCost, setKruskalCost] = useState(0);
  const [primLog, setPrimLog] = useState<string[]>([]);
  const [kruskalLog, setKruskalLog] = useState<string[]>([]);
  const [graph] = useState(sampleGraph);
  const { toast } = useToast();

  const resetVisualization = useCallback(() => {
    setIsPlaying(false);
    setCurrentStep(0);
    setPrimMST([]);
    setKruskalMST([]);
    setPrimCost(0);
    setKruskalCost(0);
    setPrimLog([]);
    setKruskalLog([]);
  }, []);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && currentStep === 0) {
      toast({
        title: "Visualization Started",
        description: "Watch both algorithms find the MST step by step!",
      });
    }
  };

  // Prim's algorithm implementation
  const runPrimsStep = useCallback((step: number) => {
    if (step === 0) {
      setPrimMST([]);
      setPrimCost(0);
      setPrimLog(['Starting with vertex A']);
      return;
    }

    // Simplified Prim's algorithm steps for demonstration
    const primsSteps = [
      { edge: 'A-D', weight: 2, log: 'Added edge A-D (weight: 2)' },
      { edge: 'D-E', weight: 1, log: 'Added edge D-E (weight: 1)' },
      { edge: 'A-B', weight: 4, log: 'Added edge A-B (weight: 4)' },
      { edge: 'B-C', weight: 3, log: 'Added edge B-C (weight: 3)' },
      { edge: 'E-H', weight: 3, log: 'Added edge E-H (weight: 3)' },
      { edge: 'H-F', weight: 2, log: 'Added edge H-F (weight: 2)' },
      { edge: 'E-F', weight: 4, log: 'Skipped E-F (already connected)' },
      { edge: 'F-J', weight: 4, log: 'Added edge F-J (weight: 4)' },
      { edge: 'H-I', weight: 5, log: 'Added edge H-I (weight: 5)' },
      { edge: 'E-G', weight: 9, log: 'Added edge E-G (weight: 9)' }
    ];

    if (step <= primsSteps.length) {
      const currentStepData = primsSteps[step - 1];
      if (currentStepData && !currentStepData.log.includes('Skipped')) {
        setPrimMST(prev => [...prev, currentStepData.edge]);
        setPrimCost(prev => prev + currentStepData.weight);
      }
      setPrimLog(prev => [...prev, currentStepData?.log || '']);
    }
  }, []);

  // Kruskal's algorithm implementation
  const runKruskalsStep = useCallback((step: number) => {
    if (step === 0) {
      setKruskalMST([]);
      setKruskalCost(0);
      setKruskalLog(['Sorting edges by weight']);
      return;
    }

    // Simplified Kruskal's algorithm steps for demonstration
    const kruskalsSteps = [
      { edge: 'D-E', weight: 1, log: 'Added edge D-E (weight: 1)' },
      { edge: 'A-D', weight: 2, log: 'Added edge A-D (weight: 2)' },
      { edge: 'H-F', weight: 2, log: 'Added edge H-F (weight: 2)' },
      { edge: 'B-C', weight: 3, log: 'Added edge B-C (weight: 3)' },
      { edge: 'E-H', weight: 3, log: 'Added edge E-H (weight: 3)' },
      { edge: 'I-J', weight: 3, log: 'Added edge I-J (weight: 3)' },
      { edge: 'A-B', weight: 4, log: 'Added edge A-B (weight: 4)' },
      { edge: 'E-F', weight: 4, log: 'Skipped E-F (creates cycle)' },
      { edge: 'F-J', weight: 4, log: 'Added edge F-J (weight: 4)' },
      { edge: 'E-G', weight: 9, log: 'Added edge E-G (weight: 9)' }
    ];

    if (step <= kruskalsSteps.length) {
      const currentStepData = kruskalsSteps[step - 1];
      if (currentStepData && !currentStepData.log.includes('Skipped')) {
        setKruskalMST(prev => [...prev, currentStepData.edge]);
        setKruskalCost(prev => prev + currentStepData.weight);
      }
      setKruskalLog(prev => [...prev, currentStepData?.log || '']);
    }
  }, []);

  // Animation loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep(prev => {
          const nextStep = prev + 1;
          runPrimsStep(nextStep);
          runKruskalsStep(nextStep);
          
          if (nextStep >= 10) {
            setIsPlaying(false);
            toast({
              title: "Visualization Complete!",
              description: `Both algorithms found MST with cost ${primCost || kruskalCost}`,
            });
          }
          
          return nextStep;
        });
      }, 1500);
    }

    return () => clearInterval(interval);
  }, [isPlaying, runPrimsStep, runKruskalsStep, primCost, kruskalCost, toast]);

  // Initialize first step
  useEffect(() => {
    if (currentStep === 0) {
      runPrimsStep(0);
      runKruskalsStep(0);
    }
  }, [currentStep, runPrimsStep, runKruskalsStep]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in-up">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Minimum Spanning Tree Visualizer
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Prim's vs Kruskal's Algorithm Comparison
          </p>
          
          {/* Controls */}
          <div className="flex justify-center space-x-4">
            <Button
              onClick={togglePlayPause}
              className="flex items-center space-x-2"
              variant={isPlaying ? "secondary" : "default"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pause' : 'Start'}</span>
            </Button>
            
            <Button onClick={resetVisualization} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        {/* Main Visualization Panels */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Prim's Algorithm Panel */}
          <Card className="overflow-hidden shadow-lg border-prim-primary/20">
            <CardHeader className="bg-gradient-to-r from-prim-primary to-prim-secondary text-white">
              <CardTitle className="flex items-center justify-between">
                <span>Prim's Algorithm</span>
                <Badge variant="secondary" className="bg-white text-prim-primary">
                  Cost: {primCost}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <GraphVisualizer
                graph={graph}
                mstEdges={primMST}
                algorithmType="prim"
                currentStep={currentStep}
              />
              
              {/* Prim's Log */}
              <div className="mt-4 space-y-2">
                <h4 className="font-semibold text-prim-primary">Algorithm Steps:</h4>
                <div className="bg-gray-50 rounded-lg p-3 max-h-32 overflow-y-auto">
                  {primLog.map((log, index) => (
                    <div key={index} className="text-sm text-gray-700 py-1">
                      {index + 1}. {log}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Kruskal's Algorithm Panel */}
          <Card className="overflow-hidden shadow-lg border-kruskal-primary/20">
            <CardHeader className="bg-gradient-to-r from-kruskal-primary to-kruskal-secondary text-white">
              <CardTitle className="flex items-center justify-between">
                <span>Kruskal's Algorithm</span>
                <Badge variant="secondary" className="bg-white text-kruskal-primary">
                  Cost: {kruskalCost}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <GraphVisualizer
                graph={graph}
                mstEdges={kruskalMST}
                algorithmType="kruskal"
                currentStep={currentStep}
              />
              
              {/* Kruskal's Log */}
              <div className="mt-4 space-y-2">
                <h4 className="font-semibold text-kruskal-primary">Algorithm Steps:</h4>
                <div className="bg-gray-50 rounded-lg p-3 max-h-32 overflow-y-auto">
                  {kruskalLog.map((log, index) => (
                    <div key={index} className="text-sm text-gray-700 py-1">
                      {index + 1}. {log}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Algorithm Explanations */}
        <AlgorithmExplanation />

        {/* Comparison Table */}
        <ComparisonTable />

        {/* Legend */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Info className="w-5 h-5 mr-2" />
              Legend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-graph-node rounded-full"></div>
                <span className="text-sm">Graph Node</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-1 bg-graph-edge"></div>
                <span className="text-sm">Graph Edge</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-1 bg-mst-edge"></div>
                <span className="text-sm">MST Edge</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-1 bg-active-edge animate-pulse"></div>
                <span className="text-sm">Active Edge</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
