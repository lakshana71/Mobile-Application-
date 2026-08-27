import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { SplashScreen } from './components/splash/SplashScreen';
import { LoginScreen } from './components/auth/LoginScreen';
import { QuestionnaireWizard } from './components/questionnaire/QuestionnaireWizard';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { MobileHeaderBar } from './components/layout/MobileHeaderBar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { MobileDrawer } from './components/layout/MobileDrawer';
import { MobileSimulatorWrapper } from './components/common/MobileSimulatorWrapper';


// Core Dashboard & Modules
import { DashboardView } from './components/dashboard/DashboardView';
import { CircularWorkflowWidget } from './components/dashboard/CircularWorkflowWidget';
import { PracticalAssessmentView } from './components/tools/PracticalAssessmentView';
import { ProjectAnalysisView } from './components/tools/ProjectAnalysisView';
import { SkillGapEngineView } from './components/tools/SkillGapEngineView';
import { SkillGenomeView } from './components/tools/SkillGenomeView';
import { SkillEvolutionEngineView } from './components/tools/SkillEvolutionEngineView';
import { AIShadowMentorView } from './components/tools/AIShadowMentorView';

// Tools & Drills
import { RoadmapView } from './components/roadmap/RoadmapView';
import { SkillGapMatrixView } from './components/skillGap/SkillGapMatrixView';
import { MentorChatView } from './components/mentor/MentorChatView';
import { ResumeAnalyzerView } from './components/tools/ResumeAnalyzerView';
import { GitHubAnalyzerView } from './components/tools/GitHubAnalyzerView';
import { MockInterviewView } from './components/tools/MockInterviewView';
import { DigitalTwinView } from './components/tools/DigitalTwinView';
import { CommunityView } from './components/community/CommunityView';
import { AchievementsView } from './components/achievements/AchievementsView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { SettingsView } from './components/settings/SettingsView';
import { ProfileView } from './components/profile/ProfileView';

const MainAppContent: React.FC = () => {
  const { screen, activeTab } = useApp();

  if (screen === 'splash') {
    return <SplashScreen />;
  }

  if (screen === 'login') {
    return <LoginScreen />;
  }

  if (screen === 'questionnaire') {
    return <QuestionnaireWizard />;
  }

  return (
    <MobileSimulatorWrapper>
      <div className="flex min-h-screen bg-[#F7F9FC] text-slate-900 font-sans antialiased">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Mobile Slide-out Drawer */}
        <MobileDrawer />

        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto pb-16 md:pb-0">
          {/* Top Bar for Desktop */}
          <div className="hidden md:block">
            <TopBar />
          </div>

          {/* Top Header Bar for Mobile Screens */}
          <div className="md:hidden">
            <MobileHeaderBar />
          </div>

          <main className="flex-1 pb-12">
            {activeTab === 'dashboard' && <DashboardView />}
            {activeTab === 'circular-workflow' && (
              <div className="p-4 sm:p-6 max-w-7xl mx-auto">
                <CircularWorkflowWidget />
              </div>
            )}
            {activeTab === 'practical-assessment' && <PracticalAssessmentView />}
            {activeTab === 'project-analysis' && <ProjectAnalysisView />}
            {activeTab === 'skill-gap-engine' && <SkillGapEngineView />}
            {activeTab === 'skill-genome' && <SkillGenomeView />}
            {activeTab === 'skill-evolution' && <SkillEvolutionEngineView />}
            {activeTab === 'ai-shadow-mentor' && <AIShadowMentorView />}

            {/* Secondary Tools */}
            {activeTab === 'skill-gap' && <SkillGapMatrixView />}
            {activeTab === 'roadmap' && <RoadmapView />}
            {activeTab === 'projects' && <DashboardView />}
            {activeTab === 'analytics' && <AnalyticsView />}
            {activeTab === 'mentor' && <MentorChatView />}
            {activeTab === 'career-goals' && <DashboardView />}
            {activeTab === 'resume-analyzer' && <ResumeAnalyzerView />}
            {activeTab === 'github-analyzer' && <GitHubAnalyzerView />}
            {activeTab === 'mock-interview' && <MockInterviewView />}
            {activeTab === 'digital-twin' && <DigitalTwinView />}
            {activeTab === 'ai-mentor' && <AIShadowMentorView />}
            {activeTab === 'community' && <CommunityView />}
            {activeTab === 'achievements' && <AchievementsView />}
            {activeTab === 'settings' && <SettingsView />}
            {activeTab === 'profile' && <ProfileView />}
          </main>

          {/* Touch-Friendly Bottom Nav Bar for Mobile Screens */}
          <div className="md:hidden">
            <MobileBottomNav />
          </div>
        </div>


      </div>
    </MobileSimulatorWrapper>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
