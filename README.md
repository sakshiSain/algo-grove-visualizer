# Welcome to my project: Minimum Spanning Tree Visualizer: Prim’s vs Kruskal’s Algorithm

## Project info
**Overview**
This project is an interactive web application that visually compares two classical algorithms for finding the Minimum Spanning Tree (MST) of a weighted graph: Prim’s Algorithm and Kruskal’s Algorithm.
The app provides step-by-step animated visualizations to demonstrate how each algorithm constructs the MST, helping users understand the core differences between them through an intuitive, educational interface.

**Features**
Side-by-side visualization of Prim’s and Kruskal’s algorithms on the same graph.
Dynamic graph rendering with nodes and weighted edges.
Stepwise animation of MST construction:
Prim’s grows the MST vertex by vertex, always choosing the smallest edge connecting to new nodes.
Kruskal’s adds edges in ascending order of weight while avoiding cycles using union-find.
Real-time display of current MST edges, total MST cost, and decision logs for each step.
Interactive UI that allows users to explore and understand MST algorithms visually.
Responsive and mobile-friendly design with clear legends and color coding.

**Technologies Used**
React and TypeScript for building a robust frontend.
Tailwind CSS and shadcn-ui for styling and UI components.
Vite as the build tool and development server.
Custom graph visualization and animation logic implemented with JavaScript and React hooks.

**Installation & Development**
To run the project locally:
git clone <REPO_URL>
cd <PROJECT_DIRECTORY>
npm install
npm run dev

The app can be deployed using any static hosting service that supports React apps (e.g., Vercel, Netlify). Build the production version with:
npm run build


