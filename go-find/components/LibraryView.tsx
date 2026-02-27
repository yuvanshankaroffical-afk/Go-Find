
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  BookOpen, 
  Users, 
  Database, 
  FileText, 
  Wrench, 
  Layout, 
  Bookmark, 
  MoreHorizontal, 
  Plus, 
  ArrowUpRight,
  Filter,
  ChevronRight,
  Star,
  Clock,
  ExternalLink,
  FolderPlus
} from 'lucide-react';
import { LibraryItem, ViewType } from '../types';

const DUMMY_LIBRARY: LibraryItem[] = [
  // Papers
  {
    id: 'p1',
    type: 'paper',
    title: 'Attention Is All You Need',
    description: 'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks...',
    tags: ['AI', 'NLP', 'Transformers'],
    meta: { year: 2017, venue: 'NeurIPS', citations: 105000, rating: 4.9 },
    saved: true,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10'
  },
  {
    id: 'p2',
    type: 'paper',
    title: 'BERT: Pre-training of Deep Bidirectional Transformers',
    description: 'We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers.',
    tags: ['AI', 'NLP', 'BERT'],
    meta: { year: 2018, venue: 'NAACL', citations: 85000, rating: 4.8 },
    saved: false,
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12'
  },
  {
    id: 'p3',
    type: 'paper',
    title: 'ResNet: Deep Residual Learning for Image Recognition',
    description: 'Deeper neural networks are more difficult to train. We present a residual learning framework to ease the training of networks that are substantially deeper.',
    tags: ['Computer Vision', 'Deep Learning'],
    meta: { year: 2015, venue: 'CVPR', citations: 150000, rating: 4.9 },
    saved: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: 'p4',
    type: 'paper',
    title: 'Generative Adversarial Nets',
    description: 'We propose a new framework for estimating generative models via an adversarial process, in which we simultaneously train two models.',
    tags: ['AI', 'Generative Models', 'GANs'],
    meta: { year: 2014, venue: 'NeurIPS', citations: 60000, rating: 4.7 },
    saved: false,
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20'
  },
  {
    id: 'p5',
    type: 'paper',
    title: 'Language Models are Few-Shot Learners',
    description: 'We demonstrate that scaling up language models greatly improves task-agnostic, few-shot performance, sometimes even reaching competitiveness with prior state-of-the-art.',
    tags: ['AI', 'NLP', 'GPT-3'],
    meta: { year: 2020, venue: 'NeurIPS', citations: 25000, rating: 4.9 },
    saved: true,
    createdAt: '2024-02-01',
    updatedAt: '2024-02-01'
  },
  {
    id: 'p6',
    type: 'paper',
    title: 'Adam: A Method for Stochastic Optimization',
    description: 'We introduce Adam, an algorithm for first-order gradient-based optimization of stochastic objective functions, based on adaptive estimates of lower-order moments.',
    tags: ['Optimization', 'Deep Learning'],
    meta: { year: 2014, venue: 'ICLR', citations: 120000, rating: 4.8 },
    saved: true,
    createdAt: '2024-02-05',
    updatedAt: '2024-02-05'
  },
  {
    id: 'p7',
    type: 'paper',
    title: 'YOLOv3: An Incremental Improvement',
    description: 'We present some updates to YOLO! We made a bunch of little design changes to make it better. We also trained this new network that’s pretty swell.',
    tags: ['Computer Vision', 'Object Detection'],
    meta: { year: 2018, venue: 'arXiv', citations: 35000, rating: 4.6 },
    saved: false,
    createdAt: '2024-02-10',
    updatedAt: '2024-02-10'
  },
  {
    id: 'p8',
    type: 'paper',
    title: 'AlphaGo: Mastering the game of Go with deep neural networks',
    description: 'The game of Go has long been viewed as the most challenging of classic games for artificial intelligence due to its enormous search space.',
    tags: ['AI', 'Reinforcement Learning', 'Games'],
    meta: { year: 2016, venue: 'Nature', citations: 15000, rating: 5.0 },
    saved: true,
    createdAt: '2024-02-15',
    updatedAt: '2024-02-15'
  },

  // Experts
  {
    id: 'e1',
    type: 'expert',
    title: 'Dr. Aris Xanthos',
    description: 'Specialist in Computational Linguistics and Digital Humanities. Focus on statistical analysis of literary texts.',
    tags: ['NLP', 'Linguistics', 'Statistics'],
    meta: { affiliation: 'University of Lausanne', focusArea: 'Computational Linguistics', rating: 4.9 },
    saved: true,
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05'
  },
  {
    id: 'e2',
    type: 'expert',
    title: 'Prof. Yann LeCun',
    description: 'Chief AI Scientist at Meta and Professor at NYU. Known for work on convolutional neural networks and deep learning.',
    tags: ['Deep Learning', 'Computer Vision', 'AI'],
    meta: { affiliation: 'NYU / Meta', focusArea: 'Deep Learning', rating: 5.0 },
    saved: true,
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08'
  },
  {
    id: 'e3',
    type: 'expert',
    title: 'Dr. Fei-Fei Li',
    description: 'Professor of Computer Science at Stanford University. Co-Director of the Stanford Institute for Human-Centered AI.',
    tags: ['Computer Vision', 'AI Ethics', 'ImageNet'],
    meta: { affiliation: 'Stanford University', focusArea: 'Computer Vision', rating: 4.9 },
    saved: false,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: 'e4',
    type: 'expert',
    title: 'Andrew Ng',
    description: 'Co-founder of Coursera and Google Brain. Adjunct Professor at Stanford University. Pioneer in online education and AI.',
    tags: ['Machine Learning', 'AI Education', 'Deep Learning'],
    meta: { affiliation: 'Stanford / DeepLearning.AI', focusArea: 'Machine Learning', rating: 4.9 },
    saved: true,
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20'
  },
  {
    id: 'e5',
    type: 'expert',
    title: 'Dr. Timnit Gebru',
    description: 'Founder and Executive Director of the Distributed AI Research Institute (DAIR). Specialist in AI ethics and algorithmic bias.',
    tags: ['AI Ethics', 'Computer Vision', 'Algorithmic Bias'],
    meta: { affiliation: 'DAIR Institute', focusArea: 'AI Ethics', rating: 4.8 },
    saved: false,
    createdAt: '2024-01-25',
    updatedAt: '2024-01-25'
  },
  {
    id: 'e6',
    type: 'expert',
    title: 'Prof. Yoshua Bengio',
    description: 'Professor at the University of Montreal and Scientific Director of Mila. One of the "Godfathers of AI".',
    tags: ['Deep Learning', 'AI Safety', 'Neural Networks'],
    meta: { affiliation: 'Mila / UMontreal', focusArea: 'Deep Learning', rating: 4.9 },
    saved: true,
    createdAt: '2024-02-01',
    updatedAt: '2024-02-01'
  },

  // Datasets
  {
    id: 'd1',
    type: 'dataset',
    title: 'ImageNet',
    description: 'A large-scale hierarchical image database, organized according to the WordNet hierarchy.',
    tags: ['Computer Vision', 'Classification', 'Benchmark'],
    meta: { size: '150GB', license: 'Custom', modality: 'Images', rating: 5.0 },
    saved: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'd2',
    type: 'dataset',
    title: 'SQuAD 2.0',
    description: 'Stanford Question Answering Dataset (SQuAD) is a reading comprehension dataset, consisting of questions posed by crowdworkers.',
    tags: ['NLP', 'Question Answering', 'Benchmark'],
    meta: { size: '40MB', license: 'CC BY-SA 4.0', modality: 'Text', rating: 4.8 },
    saved: false,
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05'
  },
  {
    id: 'd3',
    type: 'dataset',
    title: 'Common Crawl',
    description: 'A massive corpus of web crawl data composed of over 250 billion pages collected over the last 12 years.',
    tags: ['NLP', 'Web Data', 'Large Scale'],
    meta: { size: 'PB Scale', license: 'Terms of Use', modality: 'Web Content', rating: 4.7 },
    saved: true,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10'
  },
  {
    id: 'd4',
    type: 'dataset',
    title: 'CIFAR-10',
    description: 'The CIFAR-10 dataset consists of 60,000 32x32 color images in 10 classes, with 6,000 images per class.',
    tags: ['Computer Vision', 'Small Scale', 'Education'],
    meta: { size: '160MB', license: 'MIT', modality: 'Images', rating: 4.6 },
    saved: false,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: 'd5',
    type: 'dataset',
    title: 'GLUE Benchmark',
    description: 'General Language Understanding Evaluation benchmark is a collection of resources for training, evaluating, and analyzing NLP systems.',
    tags: ['NLP', 'Benchmark', 'Evaluation'],
    meta: { size: 'Various', license: 'Various', modality: 'Text', rating: 4.9 },
    saved: true,
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20'
  },
  {
    id: 'd6',
    type: 'dataset',
    title: 'COCO Dataset',
    description: 'Common Objects in Context is a large-scale object detection, segmentation, and captioning dataset.',
    tags: ['Computer Vision', 'Segmentation', 'Object Detection'],
    meta: { size: '25GB', license: 'CC BY 4.0', modality: 'Images', rating: 4.9 },
    saved: true,
    createdAt: '2024-01-25',
    updatedAt: '2024-01-25'
  },

  // Notes
  {
    id: 'n1',
    type: 'note',
    title: 'Transformer Architecture Summary',
    description: 'Key takeaways from the "Attention Is All You Need" paper. Focus on Multi-head attention and Positional encoding.',
    tags: ['NLP', 'Transformers', 'Study Notes'],
    meta: { workspaceName: 'My Research', updatedAt: '2024-02-18', rating: 4.5 },
    saved: true,
    createdAt: '2024-02-18',
    updatedAt: '2024-02-18'
  },
  {
    id: 'n2',
    type: 'note',
    title: 'Ethics in AI: Discussion points',
    description: 'Notes from the seminar on algorithmic bias. Key points from Dr. Gebru\'s talk.',
    tags: ['AI Ethics', 'Bias', 'Seminar'],
    meta: { workspaceName: 'Ethics Course', updatedAt: '2024-02-15', rating: 4.2 },
    saved: false,
    createdAt: '2024-02-15',
    updatedAt: '2024-02-15'
  },
  {
    id: 'n3',
    type: 'note',
    title: 'PyTorch vs TensorFlow for RL',
    description: 'Comparison of library features for reinforcement learning projects. Performance benchmarks on simple environments.',
    tags: ['RL', 'Frameworks', 'Comparison'],
    meta: { workspaceName: 'RL Project', updatedAt: '2024-02-10', rating: 4.0 },
    saved: true,
    createdAt: '2024-02-10',
    updatedAt: '2024-02-10'
  },
  {
    id: 'n4',
    type: 'note',
    title: 'Literature Review: Object Detection',
    description: 'Summary of evolution from R-CNN to YOLOv8. Comparison of speed vs accuracy.',
    tags: ['Computer Vision', 'Object Detection', 'Lit Review'],
    meta: { workspaceName: 'Capstone', updatedAt: '2024-02-05', rating: 4.7 },
    saved: true,
    createdAt: '2024-02-05',
    updatedAt: '2024-02-05'
  },
  {
    id: 'n5',
    type: 'note',
    title: 'Data Preprocessing Pipeline',
    description: 'Steps for cleaning noisy text data for sentiment analysis. Handling emojis and special characters.',
    tags: ['NLP', 'Data Cleaning', 'Preprocessing'],
    meta: { workspaceName: 'NLP Project', updatedAt: '2024-02-01', rating: 4.3 },
    saved: false,
    createdAt: '2024-02-01',
    updatedAt: '2024-02-01'
  },
  {
    id: 'n6',
    type: 'note',
    title: 'Meeting Notes: Team Alpha',
    description: 'Discussion on project milestones and task allocation for the final prototype.',
    tags: ['Teamwork', 'Management', 'Meeting'],
    meta: { workspaceName: 'Final Year Project', updatedAt: '2024-01-28', rating: 3.8 },
    saved: true,
    createdAt: '2024-01-28',
    updatedAt: '2024-01-28'
  },

  // Templates
  {
    id: 't1',
    type: 'template',
    title: 'Research Paper Outline',
    description: 'Standard structure for academic papers including Abstract, Intro, Methodology, Results, and Discussion.',
    tags: ['Academic Writing', 'Structure'],
    meta: { type: 'Document', sections: ['Abstract', 'Introduction', 'Methodology', 'Results', 'Discussion'], rating: 4.8 },
    saved: true,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10'
  },
  {
    id: 't2',
    type: 'template',
    title: 'Literature Review Matrix',
    description: 'A spreadsheet template for comparing multiple papers across key themes, methods, and findings.',
    tags: ['Research Tools', 'Organization'],
    meta: { type: 'Spreadsheet', sections: ['Author/Year', 'Method', 'Key Findings', 'Limitations'], rating: 4.9 },
    saved: true,
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12'
  },
  {
    id: 't3',
    type: 'template',
    title: 'Project Proposal Deck',
    description: 'Presentation template for pitching research projects to faculty or stakeholders.',
    tags: ['Presentation', 'Pitching'],
    meta: { type: 'Presentation', sections: ['Problem', 'Solution', 'Timeline', 'Budget'], rating: 4.7 },
    saved: false,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: 't4',
    type: 'template',
    title: 'Case Study Report',
    description: 'Detailed template for documenting case studies in social sciences or business research.',
    tags: ['Case Study', 'Qualitative'],
    meta: { type: 'Document', sections: ['Background', 'Case Description', 'Analysis', 'Recommendations'], rating: 4.6 },
    saved: true,
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20'
  },

  // Tools
  {
    id: 'tl1',
    type: 'tool',
    title: 'Zotero',
    description: 'A free, easy-to-use tool to help you collect, organize, cite, and share research.',
    tags: ['Reference Management', 'Software'],
    meta: { license: 'Open Source', rating: 4.9 },
    saved: true,
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05'
  },
  {
    id: 'tl2',
    type: 'tool',
    title: 'Overleaf',
    description: 'An online LaTeX editor that’s easy to use. No installation, real-time collaboration, version control.',
    tags: ['LaTeX', 'Writing', 'Collaboration'],
    meta: { license: 'Freemium', rating: 5.0 },
    saved: true,
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08'
  },
  {
    id: 'tl3',
    type: 'tool',
    title: 'Google Scholar',
    description: 'Provides a simple way to broadly search for scholarly literature across many disciplines and sources.',
    tags: ['Search Engine', 'Academic'],
    meta: { license: 'Free', rating: 4.8 },
    saved: true,
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12'
  },
  {
    id: 'tl4',
    type: 'tool',
    title: 'Connected Papers',
    description: 'A unique, visual tool to help researchers and applied scientists find and explore papers relevant to their field of study.',
    tags: ['Visualization', 'Discovery'],
    meta: { license: 'Freemium', rating: 4.7 },
    saved: false,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  }
];

const TABS = [
  { id: 'all', label: 'Top Picks', icon: Star },
  { id: 'paper', label: 'Papers', icon: BookOpen },
  { id: 'expert', label: 'Experts', icon: Users },
  { id: 'dataset', label: 'Datasets', icon: Database },
  { id: 'note', label: 'Notes', icon: FileText },
  { id: 'tool', label: 'Methods & Tools', icon: Wrench },
  { id: 'template', label: 'Templates', icon: Layout },
];

export const LibraryView: React.FC = () => {
  const [items, setItems] = useState<LibraryItem[]>(() => {
    const saved = localStorage.getItem('library_items');
    return saved ? JSON.parse(saved) : DUMMY_LIBRARY;
  });
  
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedItem, setSelectedItem] = useState<LibraryItem | null>(null);
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem('library_items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesTab = activeTab === 'all' || item.type === activeTab;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesTab && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      if (sortBy === 'rating') return (b.meta.rating || 0) - (a.meta.rating || 0);
      if (sortBy === 'saved') return (b.saved ? 1 : 0) - (a.saved ? 1 : 0);
      return 0;
    });
  }, [items, activeTab, searchQuery, sortBy]);

  const featuredItems = useMemo(() => {
    return items.filter(item => item.meta.rating && item.meta.rating >= 4.9).slice(0, 4);
  }, [items]);

  const handleToggleSave = (id: string) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const newSaved = !item.saved;
        if (newSaved) {
          // Mock toast
          console.log('Saved to Library');
        }
        return { ...item, saved: newSaved };
      }
      return item;
    }));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'paper': return <BookOpen className="w-5 h-5 text-blue-400" />;
      case 'expert': return <Users className="w-5 h-5 text-emerald-400" />;
      case 'dataset': return <Database className="w-5 h-5 text-amber-400" />;
      case 'note': return <FileText className="w-5 h-5 text-purple-400" />;
      case 'tool': return <Wrench className="w-5 h-5 text-rose-400" />;
      case 'template': return <Layout className="w-5 h-5 text-indigo-400" />;
      default: return <Bookmark className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pb-20">
      {/* Header Block */}
      <section className="max-w-4xl mx-auto pt-20 pb-12 px-6 text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-black tracking-tighter">Library</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover and organize papers, experts, datasets, notes, and reports for your projects.
          </p>
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <Search className="w-6 h-6 text-gray-500 group-focus-within:text-indigo-400 transition-colors mt-0.5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search papers, experts, datasets..."
            className="w-full bg-[#111] border border-[#222] rounded-[2rem] py-6 pl-16 pr-8 text-xl text-white focus:outline-none focus:border-indigo-500/30 transition-all placeholder:text-gray-700 shadow-2xl shadow-black/50"
          />
        </div>

        <div className="flex items-center justify-center space-x-4">
          <button 
            onClick={() => setShowImportModal(true)}
            className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all shadow-xl shadow-white/5"
          >
            <Plus className="w-4 h-4" />
            <span>Import from External Source</span>
          </button>
          <button className="flex items-center space-x-2 bg-[#111] text-white border border-[#222] px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#1a1a1a] transition-all">
            <FolderPlus className="w-4 h-4" />
            <span>New Collection</span>
          </button>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="sticky top-0 z-30 bg-[#050505]/80 backdrop-blur-xl border-b border-[#1a1a1a] mb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide py-4">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                    activeTab === tab.id 
                      ? 'bg-white text-black' 
                      : 'text-gray-500 hover:text-white hover:bg-[#111]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Featured Section */}
        {activeTab === 'all' && !searchQuery && (
          <section className="space-y-8">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Featured</h2>
                <p className="text-gray-500 text-sm">Curated picks for your domain this week</p>
              </div>
              <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center space-x-1">
                <span>View all</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredItems.map((item, idx) => (
                <FeaturedCard 
                  key={item.id} 
                  item={item} 
                  idx={idx} 
                  onOpen={() => setSelectedItem(item)}
                  onToggleSave={() => handleToggleSave(item.id)}
                  getTypeIcon={getTypeIcon}
                />
              ))}
            </div>
          </section>
        )}

        {/* Main Results Grid */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-[#1a1a1a] pb-6">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-bold">
                {activeTab === 'all' ? 'All Results' : TABS.find(t => t.id === activeTab)?.label}
              </h3>
              <span className="text-xs text-gray-600 font-mono">{filteredItems.length} items</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Filter className="w-3 h-3" />
                <span>Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border-none text-white font-bold focus:ring-0 cursor-pointer"
                >
                  <option value="recent">Recent</option>
                  <option value="rating">Highest Rated</option>
                  <option value="saved">Saved First</option>
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-[#111] rounded-[1.5rem]"></div>
              ))}
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, idx) => (
                <LibraryCard 
                  key={item.id} 
                  item={item} 
                  idx={idx}
                  onOpen={() => setSelectedItem(item)}
                  onToggleSave={() => handleToggleSave(item.id)}
                  onAddToWorkspace={() => setShowWorkspaceModal(true)}
                  getTypeIcon={getTypeIcon}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-4 opacity-50">
              <div className="w-16 h-16 bg-[#111] rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold">No results found</h3>
              <p className="text-sm text-gray-500 max-w-xs mx-auto">
                Try broader keywords or switch to a different category.
              </p>
            </div>
          )}

          {filteredItems.length > 6 && !loading && (
            <div className="pt-12 flex justify-center">
              <button className="px-8 py-3 rounded-xl bg-[#111] border border-[#222] text-sm font-bold text-gray-400 hover:text-white hover:border-white/30 transition-all">
                Load More Results
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <DetailModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
          getTypeIcon={getTypeIcon}
        />
      )}

      {/* Workspace Picker Modal */}
      {showWorkspaceModal && (
        <WorkspaceModal onClose={() => setShowWorkspaceModal(false)} />
      )}

      {/* Import Modal */}
      {showImportModal && (
        <ImportModal onClose={() => setShowImportModal(false)} onImport={(item) => {
          setItems(prev => [item, ...prev]);
          setShowImportModal(false);
        }} />
      )}
    </div>
  );
};

const FeaturedCard = ({ item, idx, onOpen, onToggleSave, getTypeIcon }: any) => (
  <div
    onClick={onOpen}
    className="group relative bg-gradient-to-br from-[#111] to-[#080808] border border-[#222] rounded-[2rem] p-8 flex items-start space-x-6 cursor-pointer hover:border-white/20 transition-all hover:shadow-2xl hover:shadow-white/5"
  >
    <div className="w-16 h-16 rounded-2xl bg-[#050505] border border-[#222] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
      {getTypeIcon(item.type)}
    </div>
    <div className="flex-1 space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">{item.title}</h3>
          <p className="text-xs text-gray-500 font-medium mt-1">
            {item.type === 'paper' && `${item.meta.year} • ${item.meta.venue}`}
            {item.type === 'expert' && `${item.meta.affiliation}`}
            {item.type === 'dataset' && `${item.meta.size} • ${item.meta.license}`}
            {item.type === 'note' && `${item.meta.workspaceName}`}
            {item.type === 'template' && `${item.meta.type}`}
            {item.type === 'tool' && `${item.meta.license}`}
          </p>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleSave(); }}
          className={`p-2 rounded-xl transition-all ${item.saved ? 'text-white bg-white/10' : 'text-gray-600 hover:text-white hover:bg-white/5'}`}
        >
          <Bookmark className={`w-5 h-5 ${item.saved ? 'fill-current' : ''}`} />
        </button>
      </div>
      <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">{item.description}</p>
      <div className="flex flex-wrap gap-2 pt-2">
        {item.tags.slice(0, 3).map((tag: string) => (
          <span key={tag} className="px-3 py-1 rounded-full bg-[#050505] border border-[#222] text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const LibraryCard = ({ item, idx, onOpen, onToggleSave, onAddToWorkspace, getTypeIcon }: any) => (
  <div
    onClick={onOpen}
    className="group bg-[#0c0c0c] border border-[#1a1a1a] rounded-[1.5rem] p-6 space-y-4 cursor-pointer hover:border-white/20 transition-all hover:shadow-xl hover:shadow-black/50"
  >
    <div className="flex items-start justify-between">
      <div className="w-12 h-12 rounded-xl bg-[#050505] border border-[#222] flex items-center justify-center flex-shrink-0">
        {getTypeIcon(item.type)}
      </div>
      <div className="flex items-center space-x-1">
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleSave(); }}
          className={`p-2 rounded-lg transition-all ${item.saved ? 'text-white bg-white/10' : 'text-gray-700 hover:text-white hover:bg-white/5'}`}
        >
          <Bookmark className={`w-4 h-4 ${item.saved ? 'fill-current' : ''}`} />
        </button>
        <button className="p-2 text-gray-700 hover:text-white hover:bg-white/5 rounded-lg transition-all">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>

    <div className="space-y-2">
      <h3 className="font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">{item.title}</h3>
      <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
        {item.type === 'paper' && `${item.meta.year} • ${item.meta.venue} • ${item.meta.citations?.toLocaleString()} Citations`}
        {item.type === 'expert' && `${item.meta.affiliation} • ${item.meta.focusArea}`}
        {item.type === 'dataset' && `${item.meta.size} • ${item.meta.license} • ${item.meta.modality}`}
        {item.type === 'note' && `${item.meta.workspaceName} • ${item.meta.updatedAt}`}
        {item.type === 'template' && `${item.meta.type} • ${item.meta.sections?.length} Sections`}
        {item.type === 'tool' && `${item.meta.license}`}
      </p>
      <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">{item.description}</p>
    </div>

    <div className="flex items-center justify-between pt-4 border-t border-[#1a1a1a]">
      <div className="flex -space-x-1">
        {item.tags.slice(0, 2).map((tag: string) => (
          <div key={tag} className="px-2 py-0.5 rounded-md bg-[#111] border border-[#222] text-[9px] font-bold text-gray-500 uppercase">
            {tag}
          </div>
        ))}
      </div>
      <button 
        onClick={(e) => { e.stopPropagation(); onAddToWorkspace(); }}
        className="flex items-center space-x-1.5 text-[10px] font-bold text-gray-500 hover:text-white transition-colors"
      >
        <Plus className="w-3 h-3" />
        <span>Add to Workspace</span>
      </button>
    </div>
  </div>
);

const DetailModal = ({ item, onClose, getTypeIcon }: any) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div
      onClick={onClose}
      className="absolute inset-0 bg-black/90 backdrop-blur-md"
    />
    <div
      className="relative bg-[#0c0c0c] border border-[#1a1a1a] rounded-[2.5rem] w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
    >
      <div className="p-8 border-b border-[#1a1a1a] flex items-start justify-between bg-gradient-to-br from-[#111] to-transparent">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 rounded-3xl bg-[#050505] border border-[#222] flex items-center justify-center flex-shrink-0">
            {getTypeIcon(item.type)}
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="px-2 py-0.5 rounded bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest">
                {item.type}
              </span>
              <div className="flex items-center text-amber-400 text-xs">
                <Star className="w-3 h-3 fill-current mr-1" />
                <span className="font-bold">{item.meta.rating}</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">{item.title}</h2>
            <p className="text-gray-500 text-sm">
              {item.type === 'paper' && `${item.meta.year} • ${item.meta.venue}`}
              {item.type === 'expert' && `${item.meta.affiliation}`}
              {item.type === 'dataset' && `${item.meta.size} • ${item.meta.license}`}
              {item.type === 'note' && `Workspace: ${item.meta.workspaceName}`}
              {item.type === 'template' && `${item.meta.type}`}
              {item.type === 'tool' && `${item.meta.license}`}
            </p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 text-gray-500 hover:text-white transition-colors">
          <MoreHorizontal className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide">
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Description</h4>
          <p className="text-gray-300 leading-relaxed">{item.description}</p>
        </div>

        {item.type === 'paper' && (
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Key Takeaways</h4>
              <ul className="space-y-2">
                {['Novel attention mechanism', 'State-of-the-art performance', 'Parallelizable training'].map((point, i) => (
                  <li key={i} className="flex items-center space-x-2 text-sm text-gray-400">
                    <ChevronRight className="w-3 h-3 text-indigo-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Stats</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#111] rounded-2xl border border-[#222]">
                  <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Citations</p>
                  <p className="text-xl font-bold text-white">{item.meta.citations?.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-[#111] rounded-2xl border border-[#222]">
                  <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Impact</p>
                  <p className="text-xl font-bold text-white">High</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {item.type === 'template' && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Sections Included</h4>
            <div className="flex flex-wrap gap-2">
              {item.meta.sections?.map((section: string) => (
                <div key={section} className="px-4 py-2 rounded-xl bg-[#111] border border-[#222] text-xs text-gray-300">
                  {section}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag: string) => (
              <span key={tag} className="px-4 py-1.5 rounded-full bg-[#111] border border-[#222] text-xs font-bold text-gray-500">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-8 border-t border-[#1a1a1a] bg-[#080808] flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-gray-200 transition-all">
            <ExternalLink className="w-4 h-4" />
            <span>Open Original</span>
          </button>
          <button className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#111] border border-[#222] text-white font-bold text-sm hover:bg-[#1a1a1a] transition-all">
            <Plus className="w-4 h-4" />
            <span>Add to Workspace</span>
          </button>
        </div>
        <button className="text-gray-500 hover:text-white transition-colors">
          <ArrowUpRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  </div>
);

const ImportModal = ({ onClose, onImport }: any) => {
  const [url, setUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  const handleImport = () => {
    if (!url.trim()) return;
    setIsImporting(true);
    // Mock import logic
    setTimeout(() => {
      const newItem: LibraryItem = {
        id: Date.now().toString(),
        type: url.includes('arxiv') ? 'paper' : 'tool',
        title: url.split('/').pop() || 'Imported Resource',
        description: `Resource imported from ${url}. Automatically summarized by Go_find AI.`,
        tags: ['Imported', 'External'],
        meta: { year: 2024, rating: 4.5 },
        saved: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      onImport(newItem);
      setIsImporting(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div className="relative bg-[#0c0c0c] border border-[#1a1a1a] rounded-3xl w-full max-w-lg p-8 space-y-8 shadow-2xl">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">Import External Resource</h3>
          <p className="text-sm text-gray-500">Paste a link from arXiv, Google Scholar, GitHub, or any research portal.</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <ExternalLink className="w-5 h-5 text-gray-600" />
            </div>
            <input 
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://arxiv.org/abs/..."
              className="w-full bg-[#050505] border border-[#222] rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500/30 transition-all"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {['arXiv', 'Scholar', 'GitHub'].map(portal => (
              <div key={portal} className="p-3 bg-[#111] border border-[#222] rounded-xl flex flex-col items-center space-y-1 opacity-50">
                <span className="text-[10px] font-bold uppercase tracking-widest">{portal}</span>
                <Clock className="w-3 h-3 text-emerald-500" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-[#222] text-sm font-bold text-gray-500 hover:text-white transition-all">
            Cancel
          </button>
          <button 
            onClick={handleImport}
            disabled={!url.trim() || isImporting}
            className="flex-1 py-3 rounded-xl bg-white text-black text-sm font-bold hover:bg-gray-200 transition-all disabled:opacity-30 flex items-center justify-center space-x-2"
          >
            {isImporting ? (
              <>
                <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                <span>Importing...</span>
              </>
            ) : (
              <>
                <ArrowUpRight className="w-4 h-4" />
                <span>Import Now</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const WorkspaceModal = ({ onClose }: any) => (
  <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
    <div
      onClick={onClose}
      className="absolute inset-0 bg-black/90 backdrop-blur-md"
    />
    <div
      className="relative bg-[#0c0c0c] border border-[#1a1a1a] rounded-[2rem] p-8 max-w-md w-full shadow-2xl space-y-8"
    >
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-white tracking-tight">Add to Workspace</h3>
        <p className="text-gray-500 text-sm">Select a workspace to link this research artifact.</p>
      </div>

      <div className="space-y-3">
        {['My Research', 'Final Year Project', 'AI Ethics Paper', 'Quantum Computing'].map((ws) => (
          <button 
            key={ws}
            onClick={onClose}
            className="w-full flex items-center justify-between p-4 bg-[#111] border border-[#222] rounded-2xl hover:border-white/30 transition-all group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-[#050505] border border-[#222] flex items-center justify-center group-hover:bg-indigo-500/10 transition-all">
                <Layout className="w-5 h-5 text-gray-600 group-hover:text-indigo-400" />
              </div>
              <span className="font-bold text-gray-300 group-hover:text-white transition-colors">{ws}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-white" />
          </button>
        ))}
        <button className="w-full flex items-center space-x-4 p-4 border border-dashed border-[#222] rounded-2xl hover:border-white/30 transition-all text-gray-600 hover:text-white">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center">
            <Plus className="w-5 h-5" />
          </div>
          <span className="font-bold">Create New Workspace</span>
        </button>
      </div>

      <button 
        onClick={onClose}
        className="w-full bg-white text-black py-4 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all"
      >
        Cancel
      </button>
    </div>
  </div>
);
