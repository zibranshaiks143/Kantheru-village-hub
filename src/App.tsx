import React from 'react';
import { BottomNav, CallModal, TopBar, VoiceNoticeBanner } from './components/CommonUI';
import { AppProvider, useApp } from './context/AppContext';
import { AdminDashboardPage, AdminLoginPage } from './pages/AdminPages';
import {
  ConsultConfirmedPage,
  ConsultDoctorPage,
  HealthAssistantPage,
  HealthHubPage,
  OrderConfirmedPage,
  OrderMedicinesPage,
} from './pages/HealthPages';
import { HelpPage, HomePage } from './pages/HomePage';
import {
  EligibilityPage,
  FamilySchemesPage,
  FarmerSchemesPage,
  HowToApplyPage,
  SchemeAlertsPage,
  SchemeAssistantPage,
  SchemesHubPage,
} from './pages/SchemePages';
import {
  ReportConfirmedPage,
  ReportWaterPage,
  WaterFairnessPage,
  WaterHubPage,
  WaterQualityPage,
  WaterSafetyPage,
} from './pages/WaterPages';

const AppShell: React.FC = () => {
  const { currentPage } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'help':
        return <HelpPage />;
      case 'water-hub':
        return <WaterHubPage />;
      case 'report-water':
        return <ReportWaterPage />;
      case 'report-confirmed':
        return <ReportConfirmedPage />;
      case 'water-quality':
        return <WaterQualityPage />;
      case 'water-safety':
        return <WaterSafetyPage />;
      case 'water-fairness':
        return <WaterFairnessPage />;
      case 'health-hub':
        return <HealthHubPage />;
      case 'consult-doctor':
        return <ConsultDoctorPage />;
      case 'consult-confirmed':
        return <ConsultConfirmedPage />;
      case 'order-medicines':
        return <OrderMedicinesPage />;
      case 'order-confirmed':
        return <OrderConfirmedPage />;
      case 'health-assistant':
        return <HealthAssistantPage />;
      case 'schemes-hub':
        return <SchemesHubPage />;
      case 'farmer-schemes':
        return <FarmerSchemesPage />;
      case 'family-schemes':
        return <FamilySchemesPage />;
      case 'eligibility':
        return <EligibilityPage />;
      case 'how-to-apply':
        return <HowToApplyPage />;
      case 'scheme-alerts':
        return <SchemeAlertsPage />;
      case 'scheme-assistant':
        return <SchemeAssistantPage />;
      case 'admin-login':
        return <AdminLoginPage />;
      case 'admin-dashboard':
        return <AdminDashboardPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-slate-900 flex flex-col">
      <TopBar />
      <main className="flex-1 w-full max-w-4xl mx-auto px-3 sm:px-6 pt-4 pb-20">
        <VoiceNoticeBanner />
        {renderPage()}
      </main>
      <BottomNav />
      <CallModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
