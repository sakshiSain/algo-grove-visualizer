
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TreePine, Network, Info } from 'lucide-react';

const AlgorithmExplanation = () => {
  return (
    <div className="space-y-6">
      {/* What is MST */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Info className="w-5 h-5 mr-2" />
            What is a Minimum Spanning Tree (MST)?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">
            A Minimum Spanning Tree is a subset of edges in a weighted, connected graph that connects all vertices 
            with the minimum total edge weight possible, without forming any cycles. It contains exactly 
            <span className="font-semibold"> n-1 edges</span> for a graph with <span className="font-semibold">n vertices</span>.
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Connected</h4>
              <p className="text-sm text-blue-700">All vertices are reachable</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Acyclic</h4>
              <p className="text-sm text-green-700">No cycles are formed</p>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg">
              <h4 className="font-semibold text-amber-800 mb-2">Minimum</h4>
              <p className="text-sm text-amber-700">Lowest total weight possible</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Algorithm Explanations */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Prim's Algorithm */}
        <Card className="shadow-lg border-prim-primary/20">
          <CardHeader className="bg-gradient-to-r from-prim-primary/10 to-prim-secondary/10">
            <CardTitle className="flex items-center text-prim-primary">
              <TreePine className="w-5 h-5 mr-2" />
              Prim's Algorithm
              <Badge variant="outline" className="ml-auto">Vertex-Based</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Prim's algorithm builds the MST by starting from an arbitrary vertex and growing the tree 
              one edge at a time, always adding the minimum weight edge that connects a vertex in the 
              MST to a vertex outside the MST.
            </p>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-prim-primary">How it works:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                <li>Start with any vertex (usually the first one)</li>
                <li>Add the vertex to the MST set</li>
                <li>Find the minimum weight edge connecting MST to non-MST vertices</li>
                <li>Add the edge and new vertex to MST</li>
                <li>Repeat until all vertices are included</li>
              </ol>
            </div>

            <div className="bg-prim-primary/5 p-3 rounded-lg">
              <h5 className="font-semibold text-prim-primary text-sm">Time Complexity:</h5>
              <p className="text-sm text-gray-600">O(V²) with adjacency matrix</p>
              <p className="text-sm text-gray-600">O(E log V) with priority queue</p>
            </div>
          </CardContent>
        </Card>

        {/* Kruskal's Algorithm */}
        <Card className="shadow-lg border-kruskal-primary/20">
          <CardHeader className="bg-gradient-to-r from-kruskal-primary/10 to-kruskal-secondary/10">
            <CardTitle className="flex items-center text-kruskal-primary">
              <Network className="w-5 h-5 mr-2" />
              Kruskal's Algorithm
              <Badge variant="outline" className="ml-auto">Edge-Based</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Kruskal's algorithm builds the MST by sorting all edges by weight and adding them one by one 
              to the MST, as long as they don't create a cycle. It uses a Union-Find data structure to 
              efficiently detect cycles.
            </p>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-kruskal-primary">How it works:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                <li>Sort all edges by weight in ascending order</li>
                <li>Initialize each vertex as its own component</li>
                <li>For each edge, check if it connects different components</li>
                <li>If yes, add edge to MST and merge components</li>
                <li>If no, skip edge (would create cycle)</li>
              </ol>
            </div>

            <div className="bg-kruskal-primary/5 p-3 rounded-lg">
              <h5 className="font-semibold text-kruskal-primary text-sm">Time Complexity:</h5>
              <p className="text-sm text-gray-600">O(E log E) for sorting edges</p>
              <p className="text-sm text-gray-600">O(E α(V)) for Union-Find operations</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AlgorithmExplanation;
