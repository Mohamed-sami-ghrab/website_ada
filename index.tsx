import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis, ReferenceArea,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ComposedChart, Area
} from 'recharts';
import { ChevronRight, Share2, Menu, Github, BookOpen, Activity, Zap, ShieldAlert } from 'lucide-react';

// --- Mock Data derived from story descriptions ---

const timeData = Array.from({ length: 24 }, (_, i) => ({
  time: `Day ${i + 1}`,
  titles: Math.floor(Math.random() * 5000) + (i % 8 === 0 ? 8000 : 2000),
  body: Math.floor(Math.random() * 3000) + (i % 8 === 0 ? 5000 : 1000),
}));

const topSourcesData = [
  { name: 'r/subredditdrama', count: 12500, type: 'Meta' },
  { name: 'r/circlebroke', count: 9800, type: 'Meta' },
  { name: 'r/outoftheloop', count: 8500, type: 'Meta' },
  { name: 'r/bestof', count: 7200, type: 'Curation' },
  { name: 'r/the_donald', count: 6500, type: 'Political' },
  { name: 'r/politics', count: 5900, type: 'Political' },
  { name: 'r/askreddit', count: 5400, type: 'General' },
  { name: 'r/gaming', count: 4800, type: 'Hobby' },
  { name: 'r/worldnews', count: 4200, type: 'News' },
  { name: 'r/news', count: 3900, type: 'News' },
];

const sentimentPieData = [
  { name: 'Positive', value: 65, color: '#10b981' },
  { name: 'Neutral', value: 25, color: '#94a3b8' },
  { name: 'Negative', value: 10, color: '#ef4444' },
];

const subSentimentData = [
  { name: 'r/writingprompts', positive: 92, negative: 8 },
  { name: 'r/aww', positive: 88, negative: 12 },
  { name: 'r/askscience', positive: 85, negative: 15 },
  { name: 'r/outoftheloop', positive: 65, negative: 35 },
  { name: 'r/circlebroke', positive: 45, negative: 55 },
  { name: 'r/subredditdrama', positive: 38, negative: 62 },
];

const pcaData = [
  ...Array.from({ length: 40 }, () => ({ x: Math.random() * 40 + 10, y: Math.random() * 40 + 40, cluster: 'C1', name: 'Standard' })),
  ...Array.from({ length: 30 }, () => ({ x: Math.random() * 30 + 50, y: Math.random() * 30 + 10, cluster: 'C3', name: 'Analytical' })),
  ...Array.from({ length: 20 }, () => ({ x: Math.random() * 20 + 70, y: Math.random() * 20 + 60, cluster: 'C4', name: 'Toxic' })),
];

const clusterFeatureData = [
  { subject: 'Readability', C1: 80, C3: 40, C4: 90, fullMark: 100 },
  { subject: 'Complexity', C1: 50, C3: 90, C4: 20, fullMark: 100 },
  { subject: 'Swearing', C1: 10, C3: 5, C4: 95, fullMark: 100 },
  { subject: 'Positivity', C1: 85, C3: 60, C4: 15, fullMark: 100 },
  { subject: 'Prepositions', C1: 40, C3: 95, C4: 30, fullMark: 100 },
  { subject: 'Pronouns', C1: 70, C3: 30, C4: 85, fullMark: 100 },
];

// --- Components ---

const Navbar = () => (
  <nav className="sticky-nav px-6 py-4 flex justify-between items-center bg-white/90">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">R</div>
      <span className="font-bold text-lg tracking-tight hidden sm:inline">Hivemind Labs</span>
    </div>
    <div className="flex gap-6 text-sm font-medium text-gray-600">
      <a href="#part1" className="hover:text-orange-500 transition-colors">Pulse</a>
      <a href="#part2" className="hover:text-orange-500 transition-colors">Dialects</a>
      <a href="#part3" className="hover:text-orange-500 transition-colors">Geography</a>
    </div>
    <div className="flex gap-4">
      <Share2 className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
      <Github className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
    </div>
  </nav>
);

const SectionHeader = ({ id, title, subtitle }: { id: string, title: string, subtitle: string }) => (
  <header id={id} className="mt-16 mb-8 scroll-mt-24">
    <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{title}</h2>
    <p className="text-xl text-gray-500 font-light max-w-2xl">{subtitle}</p>
    <div className="w-20 h-1 bg-orange-500 mt-6 rounded-full" />
  </header>
);

const App = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="prose-container">
        {/* Title Section */}
        <section className="py-16 text-center border-b border-gray-100 mb-16">
          <p className="text-orange-600 font-bold uppercase tracking-widest text-xs mb-4">A Data Journalism Inquiry</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 italic">The Grammar of the Hivemind</h1>
          <p className="text-2xl text-gray-600 font-light mb-8 italic">Mapping the Hidden Structure of Reddit</p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-400 font-medium">
            <span>By the ApesStrongTogether Team</span>
            <span>•</span>
            <span>March 2024</span>
          </div>
        </section>

        {/* Introduction */}
        <div className="space-y-6 text-lg leading-relaxed text-gray-700 mb-20">
          <p>
            Reddit is often described as a collection of silos—thousands of distinct communities (subreddits) dedicated to everything from <span className="bg-orange-50 text-orange-700 px-1 rounded">r/aww</span> to <span className="bg-orange-50 text-orange-700 px-1 rounded">r/dataisbeautiful</span>. But these silos aren't hermetically sealed. They leak. They link. They argue.
          </p>
          <p>
            In this project, we analyzed the Reddit Hyperlink Network—a massive graph of over 850,000 connections where one subreddit links to another. By analyzing the language of these links, we set out to answer a fundamental question: <strong>Does the way a community speaks determine who they talk to?</strong>
          </p>
        </div>

        {/* Part 1 */}
        <SectionHeader 
          id="part1" 
          title="Part 1: Taking the Pulse of the Network" 
          subtitle="Before analyzing language styles, we looked at the raw heartbeat of Reddit's 'Meta-Layer'—the network of cross-posts and mentions."
        />

        <div className="space-y-6 text-lg leading-relaxed text-gray-700">
          <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4 flex items-center gap-2">
            <Activity className="text-orange-500" /> 1.1 The Volume of Conversation
          </h3>
          <p>
            Activity on the network is consistent, punctuated by spikes of high activity. Interestingly, we found that the volume of "Body" hyperlinks (links inside the text of a post) tracks closely with "Title" hyperlinks, though titles are more frequent.
          </p>

          <div className="plot-container h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} 
                />
                <Legend iconType="circle" />
                <Line type="monotone" dataKey="titles" stroke="#f97316" strokeWidth={3} dot={false} activeDot={{ r: 6 }} name="Title Hyperlinks" />
                <Line type="monotone" dataKey="body" stroke="#6366f1" strokeWidth={3} dot={false} activeDot={{ r: 6 }} name="Body Hyperlinks" />
              </LineChart>
            </ResponsiveContainer>
            <p className="caption">Figure 1: The heartbeat of Reddit interactions over time.</p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4 flex items-center gap-2">
            <Zap className="text-yellow-500" /> 1.2 Who dominates the conversation?
          </h3>
          <p>
            When we count who originates the most links, a clear pattern emerges. The network is dominated by "Meta" subreddits—communities whose entire purpose is to talk about other communities.
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>r/subredditdrama:</strong> The town square for observing fights.</li>
            <li><strong>r/circlebroke:</strong> Meta-commentary on Reddit culture.</li>
            <li><strong>r/outoftheloop:</strong> Users asking for context on other threads.</li>
          </ul>

          <div className="plot-container h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topSourcesData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={120} axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 11}} />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} name="Outbound Links" />
              </BarChart>
            </ResponsiveContainer>
            <p className="caption">Figure 2: The biggest gossipers. Subreddits that link out the most.</p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4 flex items-center gap-2">
            <Share2 className="text-emerald-500" /> 1.3 The Default Sentiment is... Positive?
          </h3>
          <p>
            Despite Reddit's reputation for toxicity, the baseline of the network is overwhelmingly positive. Whether we look at the body text or the titles, roughly 90% of all cross-links carry a positive or neutral sentiment.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="plot-container h-[300px] m-0">
               <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentPieData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sentimentPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
              <p className="text-center text-xs text-gray-400 mt-2">Sentiment Distribution (Body)</p>
            </div>
            <div className="plot-container h-[300px] m-0">
               <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentPieData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    startAngle={90}
                    endAngle={450}
                  >
                    {sentimentPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
              <p className="text-center text-xs text-gray-400 mt-2">Sentiment Distribution (Title)</p>
            </div>
          </div>
          <p className="caption">Figure 3: The overwhelming positivity of the baseline network.</p>

          <p className="mt-8">
            However, when we break this down by specific communities, the nuance appears. While <span className="text-emerald-600 font-semibold">r/writingprompts</span> (a creative community) is almost entirely positive, meta-subs like <span className="text-red-500 font-semibold">r/subredditdrama</span> and <span className="text-red-500 font-semibold">r/circlebroke</span> have a much higher ratio of negative links. They are the critics of the platform.
          </p>

          <div className="plot-container h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subSentimentData} stackOffset="expand">
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <YAxis hide />
                <Tooltip />
                <Legend />
                <Bar dataKey="positive" stackId="a" fill="#10b981" name="Positive %" />
                <Bar dataKey="negative" stackId="a" fill="#ef4444" name="Negative %" />
              </BarChart>
            </ResponsiveContainer>
            <p className="caption">Figure 4: Positivity vs. Negativity in the top active communities.</p>
          </div>
        </div>

        {/* Part 2 */}
        <SectionHeader 
          id="part2" 
          title="Part 2: The Five Dialects of Reddit" 
          subtitle="We engineered over 86 linguistic features—ranging from sentence complexity and readability to usage of swear words and pronouns—and applied K-Means Clustering."
        />

        <div className="space-y-6 text-lg leading-relaxed text-gray-700">
          <p>
            We discovered that Reddit communities fall into distinctive <strong>"Linguistic Clusters."</strong> By projecting these complex features into 2D space, we can see the "continents" of Reddit's language.
          </p>

          <div className="plot-container h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="x" name="PCA Component 1" unit="" axisLine={false} tick={false} label={{ value: 'Broad Linguistic Variance', position: 'bottom', offset: 0 }} />
                <YAxis type="number" dataKey="y" name="PCA Component 2" unit="" axisLine={false} tick={false} label={{ value: 'Emotional Intensity', angle: -90, position: 'left' }} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Standard (C1)" data={pcaData.filter(d => d.cluster === 'C1')} fill="#6366f1" />
                <Scatter name="Analytical (C3)" data={pcaData.filter(d => d.cluster === 'C3')} fill="#f97316" />
                <Scatter name="Toxic (C4)" data={pcaData.filter(d => d.cluster === 'C4')} fill="#ef4444" />
                <Legend />
              </ScatterChart>
            </ResponsiveContainer>
            <p className="caption">Figure 5: The Linguistic Map. Each point is a post; colors represent the dialect style.</p>
          </div>

          <p className="mt-8 italic font-serif text-xl border-l-4 border-orange-500 pl-6 py-2 bg-orange-50/50">
            "Our analysis identified distinct styles: The Standard (glue), Analytical (explainers), and Toxic (aggressive)."
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { id: 'C1', name: 'The Standard', desc: 'Balanced, positive, standard grammar. The "glue" of Reddit.', color: 'bg-indigo-500' },
              { id: 'C3', name: 'Analytical', desc: 'High use of long words, articles, and prepositions. These are the debaters.', color: 'bg-orange-500' },
              { id: 'C4', name: 'Toxic/Emotive', desc: 'Defined by high anxiety, anger, and swearing. Short, aggressive bursts.', color: 'bg-red-500' }
            ].map(c => (
              <div key={c.id} className="p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 ${c.color} rounded-lg flex items-center justify-center text-white font-bold mb-4`}>{c.id}</div>
                <h4 className="font-bold text-gray-900 mb-2">{c.name}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="plot-container h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={clusterFeatureData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="C1 (Standard)" dataKey="C1" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
                <Radar name="C3 (Analytical)" dataKey="C3" stroke="#f97316" fill="#f97316" fillOpacity={0.2} />
                <Radar name="C4 (Toxic)" dataKey="C4" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
            <p className="caption">Figure 6: What makes a cluster unique? Comparing linguistic features across groups.</p>
          </div>
        </div>

        {/* Part 3 */}
        <SectionHeader 
          id="part3" 
          title="Part 3: The Geography of Conflict" 
          subtitle="Finally, we overlapped our 'Linguistic Map' with the 'Interaction Network.' Do people only talk to those who speak their language?"
        />

        <div className="space-y-6 text-lg leading-relaxed text-gray-700">
          <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4 flex items-center gap-2">
            <ShieldAlert className="text-red-500" /> 3.1 The Isolation of Toxicity
          </h3>
          <p>
            The most striking finding involves <strong>Cluster C4 (The Toxic/Emotive group)</strong>. While the "Standard" and "Analytical" clusters act as busy hubs, trading ideas and users, the "Toxic" cluster exists in a self-imposed quarantine.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
            <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
              <span className="text-red-600 font-bold text-xs uppercase tracking-widest">Finding A</span>
              <h4 className="text-xl font-bold text-red-900 mt-2">Low In-Degree</h4>
              <p className="text-red-700 text-sm mt-2">Very few communities link to the toxic cluster. They are effectively ignored by the broader hivemind.</p>
            </div>
            <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
              <span className="text-red-600 font-bold text-xs uppercase tracking-widest">Finding B</span>
              <h4 className="text-xl font-bold text-red-900 mt-2">Low Out-Degree</h4>
              <p className="text-red-700 text-sm mt-2">They rarely link out to others, preferring to loop within their own echo chambers of high emotion.</p>
            </div>
          </div>

          <div className="plot-container p-0 overflow-hidden">
            <div className="bg-gray-50 p-8 flex flex-col items-center">
               <h4 className="font-bold text-gray-400 uppercase text-xs mb-8 tracking-widest">Simplified Interaction Matrix</h4>
               <div className="grid grid-cols-4 grid-rows-4 gap-2 w-full max-w-md">
                  <div className="text-center text-xs font-bold text-gray-400">Target →</div>
                  <div className="text-center text-xs font-bold text-gray-400">C1</div>
                  <div className="text-center text-xs font-bold text-gray-400">C3</div>
                  <div className="text-center text-xs font-bold text-gray-400">C4</div>
                  
                  <div className="text-right text-xs font-bold text-gray-400 pr-2">C1 (S)</div>
                  <div className="h-16 bg-indigo-500 rounded-sm flex items-center justify-center text-white text-xs">High</div>
                  <div className="h-16 bg-indigo-300 rounded-sm flex items-center justify-center text-white text-xs">Med</div>
                  <div className="h-16 bg-indigo-100 rounded-sm flex items-center justify-center text-gray-400 text-xs">Low</div>

                  <div className="text-right text-xs font-bold text-gray-400 pr-2">C3 (A)</div>
                  <div className="h-16 bg-orange-400 rounded-sm flex items-center justify-center text-white text-xs">Med</div>
                  <div className="h-16 bg-orange-600 rounded-sm flex items-center justify-center text-white text-xs">High</div>
                  <div className="h-16 bg-orange-200 rounded-sm flex items-center justify-center text-white text-xs">Low</div>

                  <div className="text-right text-xs font-bold text-gray-400 pr-2">C4 (T)</div>
                  <div className="h-16 bg-red-400 rounded-sm flex items-center justify-center text-white text-xs">Med*</div>
                  <div className="h-16 bg-red-200 rounded-sm flex items-center justify-center text-white text-xs">Low</div>
                  <div className="h-16 bg-red-100 rounded-sm flex items-center justify-center text-red-300 text-xs">Sparse</div>
               </div>
               <p className="mt-8 text-xs text-gray-400">*Punching Up: C4 links to C1 are 85% negative.</p>
            </div>
            <p className="caption pb-4">Figure 7: Who talks to whom? Darker squares indicate higher volume of cross-links.</p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">3.2 The Direction Pattern</h3>
          <p>
            When the Toxic cluster (C4) does interact, it <strong>punches up</strong>. The majority of their outgoing links are directed at the Positive/Standard cluster (C1), and these links are disproportionately negative.
          </p>
          <p>
            In contrast, the "Analytical" cluster (C3) acts as a bridge, interacting with both the "Standard" users and themselves, often mediating the conversation with high-complexity language.
          </p>
        </div>

        {/* Conclusion */}
        <section className="mt-24 mb-32 p-10 bg-gray-900 text-white rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 blur-3xl -mr-32 -mt-32 rounded-full" />
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-8">Conclusion</h2>
            <div className="space-y-6 text-xl text-gray-300 leading-relaxed font-light">
              <p>
                Our journey through the data reveals that Reddit is not just divided by topic, but by style. 
              </p>
              <ul className="space-y-4 mt-8 border-l-2 border-orange-500/50 pl-8">
                <li><span className="text-orange-400 font-bold">The Meta-Layer drives the network:</span> A few massive communities curate the content for everyone else.</li>
                <li><span className="text-emerald-400 font-bold">Positivity is the norm:</span> Despite the noise, 90% of connections are constructive.</li>
                <li><span className="text-indigo-400 font-bold">Language creates walls:</span> "Toxic" dialects isolate communities, cutting them off from the wider network.</li>
              </ul>
              <p className="pt-8 text-white font-medium italic">
                To build a stronger community, it seems, you don't just need shared interests. You need a shared tongue.
              </p>
            </div>
          </div>
        </section>

        <footer className="py-20 border-t border-gray-100 text-center text-gray-400 text-sm">
           <div className="flex justify-center gap-6 mb-8">
              <Github className="w-5 h-5 hover:text-gray-900 transition-colors cursor-pointer" />
              <Share2 className="w-5 h-5 hover:text-gray-900 transition-colors cursor-pointer" />
              <BookOpen className="w-5 h-5 hover:text-gray-900 transition-colors cursor-pointer" />
           </div>
           <p>© 2024 ApesStrongTogether Team. Data sourced from the Reddit Hyperlink Network.</p>
        </footer>
      </main>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);