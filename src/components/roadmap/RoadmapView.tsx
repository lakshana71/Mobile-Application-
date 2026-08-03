import React, { useState } from 'react';
import {
  Plus,
  CheckCircle2,
  Trash2,
  Edit3,
  ExternalLink,
  Clock,
  Award,
  Sparkles,
  MapPin,
  Filter,
  Check,
  X,
  RotateCcw,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RoadmapStep, DifficultyLevel } from '../../types';

export const RoadmapView: React.FC = () => {
  const { roadmap, toggleStepCompleted, addRoadmapStep, deleteRoadmapStep, editRoadmapStep, regenerateRoadmap, userProfile } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStep, setEditingStep] = useState<RoadmapStep | null>(null);

  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<RoadmapStep['category']>('Core Skill');
  const [newDifficulty, setNewDifficulty] = useState<DifficultyLevel>('Intermediate');
  const [newHours, setNewHours] = useState('20');

  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');

  const filteredRoadmap = roadmap.filter((step) => {
    if (filterDifficulty === 'All') return true;
    return step.difficulty === filterDifficulty;
  });

  const completedCount = roadmap.filter((s) => s.completed).length;
  const progressPercent = roadmap.length > 0 ? Math.round((completedCount / roadmap.length) * 100) : 0;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addRoadmapStep({
      title: newTitle,
      description: newDesc,
      category: newCategory,
      difficulty: newDifficulty,
      estimatedHours: parseInt(newHours) || 20,
      resources: [{ title: 'Resource Documentation', url: 'https://docs.dev', type: 'Article' }],
      completed: false,
      skillsAcquired: [newTitle],
    });

    setNewTitle('');
    setNewDesc('');
    setShowAddModal(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStep) return;

    editRoadmapStep(editingStep);
    setEditingStep(null);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card p-6 rounded-3xl border border-white/80">
        <div>
          <div className="flex items-center space-x-2 text-brand-primary mb-1">
            <MapPin className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Dynamic Learning Path</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Roadmap for <span className="gradient-text">{userProfile.dreamCareer}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Completed {completedCount} of {roadmap.length} steps ({progressPercent}%) • Estimated total: {roadmap.reduce((acc, s) => acc + s.estimatedHours, 0)} hours
          </p>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button
            onClick={regenerateRoadmap}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-all flex items-center space-x-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Regenerate Roadmap</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-brand-primary text-white text-xs font-bold shadow-md hover:bg-indigo-600 transition-all flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom Step</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex items-center justify-between text-xs text-slate-600 bg-white/60 p-3 rounded-2xl border border-slate-200">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="font-semibold">Filter by Difficulty:</span>
          {['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilterDifficulty(lvl)}
              className={`px-3 py-1 rounded-lg transition-all ${
                filterDifficulty === lvl
                  ? 'bg-brand-primary text-white font-bold'
                  : 'hover:bg-slate-100 text-slate-600'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        <span className="text-slate-400 font-medium">Showing {filteredRoadmap.length} steps</span>
      </div>

      {/* Timeline Steps Stack */}
      <div className="space-y-4 relative">
        <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-slate-200 pointer-events-none hidden sm:block" />

        {filteredRoadmap.map((step, idx) => (
          <div
            key={step.id}
            className={`relative glass-card p-6 rounded-3xl border transition-all ${
              step.completed
                ? 'bg-emerald-50/40 border-emerald-200/80'
                : 'bg-white/90 border-white hover:border-brand-primary/30'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
              
              <div className="flex items-start space-x-4">
                <button
                  onClick={() => toggleStepCompleted(step.id)}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all flex-shrink-0 mt-0.5 ${
                    step.completed
                      ? 'bg-emerald-500 text-white shadow-md'
                      : 'border-2 border-slate-300 hover:border-brand-primary bg-white'
                  }`}
                >
                  {step.completed ? <Check className="w-5 h-5" /> : <span className="text-xs font-bold text-slate-400">{step.order}</span>}
                </button>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-extrabold uppercase">
                      {step.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                      {step.difficulty}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{step.estimatedHours} Hours</span>
                    </span>
                  </div>

                  <h3 className={`text-lg font-bold ${step.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">{step.description}</p>

                  {/* Skills Acquired */}
                  {step.skillsAcquired.length > 0 && (
                    <div className="flex items-center space-x-2 pt-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Skills Acquired:</span>
                      {step.skillsAcquired.map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-semibold text-slate-700">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Resources Links */}
                  {step.resources.length > 0 && (
                    <div className="pt-2 flex flex-wrap items-center gap-2">
                      {step.resources.map((res, rIdx) => (
                        <a
                          key={rIdx}
                          href={res.url}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-brand-primary/10 hover:text-brand-primary text-[11px] font-semibold text-slate-700 flex items-center space-x-1 transition-all"
                        >
                          <span>{res.title}</span>
                          <ExternalLink className="w-3 h-3 text-slate-400" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 self-end sm:self-start">
                <button
                  onClick={() => setEditingStep(step)}
                  className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-brand-primary hover:bg-slate-100 transition-colors"
                  title="Edit Step"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteRoadmapStep(step.id)}
                  className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete Step"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Add Step Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-md p-6 rounded-3xl shadow-2xl border border-white/80 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-base">Add New Roadmap Step</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Step Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master PyTorch Neural Networks"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  placeholder="Module learning goals..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-primary h-20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Difficulty</label>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value as DifficultyLevel)}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Estimated Hours</label>
                  <input
                    type="number"
                    value={newHours}
                    onChange={(e) => setNewHours(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-indigo-600"
                >
                  Save Step
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Step Modal */}
      {editingStep && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-md p-6 rounded-3xl shadow-2xl border border-white/80 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-base">Edit Step: {editingStep.title}</h3>
              <button onClick={() => setEditingStep(null)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editingStep.title}
                  onChange={(e) => setEditingStep({ ...editingStep, title: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  value={editingStep.description}
                  onChange={(e) => setEditingStep({ ...editingStep, description: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs h-20"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingStep(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-primary text-white text-xs font-bold"
                >
                  Update Step
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
