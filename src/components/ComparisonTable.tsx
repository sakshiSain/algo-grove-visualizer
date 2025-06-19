
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Target, Clock, Database } from 'lucide-react';

const ComparisonTable = () => {
  const comparisons = [
    {
      aspect: 'Approach',
      icon: <Target className="w-4 h-4" />,
      prim: 'Vertex-based (grows from a starting vertex)',
      kruskal: 'Edge-based (considers edges globally)',
      primColor: 'bg-prim-primary/10 text-prim-primary',
      kruskalColor: 'bg-kruskal-primary/10 text-kruskal-primary'
    },
    {
      aspect: 'Data Structure',
      icon: <Database className="w-4 h-4" />,
      prim: 'Priority Queue (Min-Heap)',
      kruskal: 'Union-Find (Disjoint Set)',
      primColor: 'bg-blue-50 text-blue-700',
      kruskalColor: 'bg-green-50 text-green-700'
    },
    {
      aspect: 'Time Complexity',
      icon: <Clock className="w-4 h-4" />,
      prim: 'O(E log V) with priority queue',
      kruskal: 'O(E log E) dominated by sorting',
      primColor: 'bg-purple-50 text-purple-700',
      kruskalColor: 'bg-orange-50 text-orange-700'
    },
    {
      aspect: 'Best for',
      icon: <Zap className="w-4 h-4" />,
      prim: 'Dense graphs (many edges)',
      kruskal: 'Sparse graphs (few edges)',
      primColor: 'bg-indigo-50 text-indigo-700',
      kruskalColor: 'bg-teal-50 text-teal-700'
    }
  ];

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Algorithm Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-semibold">Aspect</th>
                <th className="text-left p-4 font-semibold text-prim-primary">Prim's Algorithm</th>
                <th className="text-left p-4 font-semibold text-kruskal-primary">Kruskal's Algorithm</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((comparison, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {comparison.icon}
                      <span className="font-medium">{comparison.aspect}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="secondary" className={`${comparison.primColor} border-0`}>
                      {comparison.prim}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Badge variant="secondary" className={`${comparison.kruskalColor} border-0`}>
                      {comparison.kruskal}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Key Differences Summary */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-prim-primary/5 p-4 rounded-lg border border-prim-primary/20">
            <h4 className="font-semibold text-prim-primary mb-2">Choose Prim's when:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Graph is dense (lots of edges)</li>
              <li>• You want to see the tree grow from a specific vertex</li>
              <li>• Memory is limited (doesn't need to store all edges)</li>
            </ul>
          </div>
          
          <div className="bg-kruskal-primary/5 p-4 rounded-lg border border-kruskal-primary/20">
            <h4 className="font-semibold text-kruskal-primary mb-2">Choose Kruskal's when:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Graph is sparse (few edges)</li>
              <li>• Edges are already sorted</li>
              <li>• You need to understand the global edge structure</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComparisonTable;
