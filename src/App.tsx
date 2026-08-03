import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { SplashScreen } from './components/splash/SplashScreen';
import { LoginScreen } from './components/auth/LoginScreen';
import { QuestionnaireWizard } from './components/questionnaire/QuestionnaireWizard';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';

// Views
import { DashboardView } from './components/dashboard/DashboardView';
import { RoadmapView } from './components/roadmap/RoadmapView';
import { SkillGapMatrixView } from './components/skillGap/SkillGapMatrixView';
import { MentorChatView } from './components/mentor/MentorChatView';
import { ResumeAnalyzerView } from './components/tools/ResumeAnalyzerView';
import { GitHubAnalyzerView } from './components/tools/GitHubAnalyzerView';
import { MockInterviewView } from './components/tools/MockInterviewView';
import { InternshipsView } from './components/tools/InternshipsView';
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
    <div className="flex min-h-screen bg-[#F7F9FC]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <TopBar />
        <main className="flex-1 pb-12">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'roadmap' && <RoadmapView />}
          {activeTab === 'skill-gap' && <SkillGapMatrixView />}
          {activeTab === 'projects' && <DashboardView />}
          {activeTab === 'analytics' && <AnalyticsView />}
          {activeTab === 'mentor' && <MentorChatView />}
          {activeTab === 'career-goals' && <DashboardView />}
          {activeTab === 'resume-analyzer' && <ResumeAnalyzerView />}
          {activeTab === 'github-analyzer' && <GitHubAnalyzerView />}
          {activeTab === 'mock-interview' && <MockInterviewView />}
          {activeTab === 'internships' && <InternshipsView />}
          {activeTab === 'community' && <CommunityView />}
          {activeTab === 'achievements' && <AchievementsView />}
          {activeTab === 'settings' && <SettingsView />}
          {activeTab === 'profile' && <ProfileView />}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
