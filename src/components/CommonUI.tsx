import React, { useState } from 'react';
import {
  ArrowLeft,
  Bell,
  Building2,
  Home,
  Megaphone,
  Phone,
  ShieldCheck,
  User,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BiString } from '../data/villageData';

export const Bi: React.FC<{
  te: string;
  en: string;
  sep?: string;
  className?: string;
}> = ({ te, en, sep = ' / ', className = '' }) => {
  const { langMode } = useApp();
  if (langMode === 'te') return <span className={className}>{te}</span>;
  if (langMode === 'en') return <span className={className}>{en}</span>;
  return (
    <span className={className}>
      {te}
      {sep}
      {en}
    </span>
  );
};

export const BiStack: React.FC<{
  te: string;
  en: string;
  teClass?: string;
  enClass?: string;
  className?: string;
}> = ({
  te,
  en,
  teClass = 'font-bold text-slate-900 leading-snug',
  enClass = 'text-xs text-slate-500 font-medium leading-snug',
  className = '',
}) => {
  const { langMode } = useApp();
  if (langMode === 'te') {
    return <div className={`${teClass} ${className}`}>{te}</div>;
  }
  if (langMode === 'en') {
    return <div className={`${teClass} ${className}`}>{en}</div>;
  }
  return (
    <div className={className}>
      <div className={teClass}>{te}</div>
      <div className={enClass}>{en}</div>
    </div>
  );
};

export const ListenButton: React.FC<{
  te: string;
  en: string;
  variant?: 'light' | 'green' | 'blue';
  compact?: boolean;
}> = ({ te, en, variant = 'light', compact = false }) => {
  const { isSpeaking, speakText, langMode } = useApp();

  const styles =
    variant === 'green'
      ? 'bg-[#1B6B2F] text-white hover:bg-[#155724]'
      : variant === 'blue'
      ? 'bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100'
      : 'bg-slate-100 text-slate-800 border border-slate-200 hover:bg-slate-200';

  return (
    <button
      type="button"
      onClick={() => speakText(te, en)}
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
        compact ? 'px-2.5 py-1.5 text-xs' : 'px-3 py-1.5 text-xs min-h-[36px]'
      } ${styles}`}
      aria-label="Listen audio summary"
    >
      {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
      <span>
        {isSpeaking
          ? langMode === 'en'
            ? 'Stop'
            : langMode === 'te'
            ? 'ఆపు'
            : 'ఆపు / Stop'
          : langMode === 'en'
          ? 'Listen'
          : langMode === 'te'
          ? 'వినండి'
          : 'వినండి / Listen'}
      </span>
    </button>
  );
};

export const SafeImage: React.FC<{
  src?: string;
  alt: string;
  className?: string;
  fallbackTitle?: BiString;
}> = ({ src, alt, className = '', fallbackTitle }) => {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50 border border-emerald-100 text-emerald-800 p-4 text-center ${className}`}
      >
        <Building2 className="w-8 h-8 mb-1.5 text-emerald-700" />
        {fallbackTitle && (
          <div className="text-xs font-semibold text-emerald-900">
            <Bi te={fallbackTitle.te} en={fallbackTitle.en} />
          </div>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
};

export const TopBar: React.FC = () => {
  const {
    currentPage,
    goBack,
    navigate,
    langMode,
    setLangMode,
    isAdminLoggedIn,
    logoutAdmin,
    schemeAlertsEnabled,
  } = useApp();

  const isHome = currentPage === 'home';
  const isAdminPage = currentPage === 'admin-dashboard' || currentPage === 'admin-login';
  const showBell =
    currentPage === 'schemes-hub' ||
    currentPage === 'farmer-schemes' ||
    currentPage === 'family-schemes' ||
    currentPage === 'eligibility' ||
    currentPage === 'how-to-apply';

  const pageTitleMap: Record<string, BiString> = {
    home: { te: 'కాంతేరు గ్రామ సేవ', en: 'Kantheru Hub • Home' },
    'water-hub': { te: 'కాంతేరు గ్రామ సేవ', en: 'Kantheru Hub • Water' },
    'report-water': { te: 'కాంతేరు గ్రామ సేవ', en: 'Kantheru Hub • Report' },
    'report-confirmed': { te: 'ఫిర్యాదు నమోదైంది', en: 'Report Submitted' },
    'water-quality': { te: 'కాంతేరు గ్రామ సేవ', en: 'Kantheru Hub • Water Quality' },
    'water-safety': { te: 'కాంతేరు గ్రామ సేవ', en: 'Kantheru Hub • Water Safety' },
    'water-fairness': { te: 'కాంతేరు గ్రామ సేవ', en: 'Kantheru Hub • Fairness' },
    'health-hub': { te: 'కాంతేరు గ్రామ సేవ', en: 'Kantheru Hub • Health' },
    'consult-doctor': { te: 'కాంతేరు గ్రామ సేవ', en: 'Kantheru Hub • Doctor' },
    'consult-confirmed': { te: 'కాంతేరు గ్రామ సేవ', en: 'Kantheru Hub • Confirmed' },
    'order-medicines': { te: 'కాంతేరు గ్రామ సేవ', en: 'Kantheru Hub • Pharmacy' },
    'order-confirmed': { te: 'ఆర్డర్ నిర్ధారణ', en: 'Order Confirmed' },
    'health-assistant': { te: 'కాంతేరు గ్రామ సేవ', en: 'Health Assistant' },
    'schemes-hub': { te: 'పథకాలు', en: 'Schemes Hub' },
    'farmer-schemes': { te: 'రైతు పథకాలు', en: 'Farmer Schemes' },
    'family-schemes': { te: 'కుటుంబ పథకాలు', en: 'Family Schemes' },
    eligibility: { te: 'అర్హత తనిఖీ', en: 'Eligibility Check' },
    'how-to-apply': { te: 'దరఖాస్తు విధానం', en: 'How To Apply' },
    'scheme-alerts': { te: 'పథకాల అలర్ట్‌లు', en: 'Scheme Alerts' },
    'scheme-assistant': { te: 'పథకాల సహాయకుడు', en: 'Scheme Assistant' },
    'admin-login': { te: 'అధికారి ప్రవేశం', en: 'Admin Login' },
    'admin-dashboard': { te: 'గ్రామ పంచాయతీ అధికారి', en: 'Admin Dashboard' },
    help: { te: 'గ్రామ సహాయ కేంద్రం', en: 'Village Helpdesk' },
  };

  const title = pageTitleMap[currentPage] || pageTitleMap.home;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs">
      <div className="max-w-5xl mx-auto px-3 sm:px-5 h-14 flex items-center justify-between gap-2">
        {/* Left: Brand or Back */}
        <div className="flex items-center gap-2 min-w-0">
          {isHome ? (
            <button
              type="button"
              onClick={() => navigate('home')}
              className="w-8 h-8 rounded-full bg-[#1B6B2F] text-white flex items-center justify-center shrink-0 cursor-pointer"
              aria-label="Kantheru Home"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={goBack}
              className="w-9 h-9 rounded-full hover:bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 cursor-pointer"
              aria-label="Go Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          <div className="min-w-0">
            <div className="text-sm sm:text-base font-bold text-slate-900 truncate leading-tight">
              {langMode === 'en' ? title.en : title.te}
            </div>
            {langMode === 'bi' && (
              <div className="text-[11px] text-slate-500 font-medium truncate leading-tight">
                {title.en}
              </div>
            )}
          </div>
        </div>

        {/* Right: Bell + Language Toggle (తెలుగు | English | Bi) + Admin/Logout */}
        <div className="flex items-center gap-1.5 shrink-0">
          {showBell && (
            <button
              type="button"
              onClick={() => navigate('scheme-alerts')}
              className="relative w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 cursor-pointer"
              aria-label="Scheme Alerts"
            >
              <Bell className="w-4 h-4" />
              {schemeAlertsEnabled && (
                <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-red-600" />
              )}
            </button>
          )}

          {/* Language Toggle Pill: తెలుగు | EN (+ Both option) */}
          <div
            className="inline-flex items-center bg-slate-100 border border-slate-200 rounded-full p-0.5 text-[11px] font-bold"
            role="group"
            aria-label="Language Switcher"
          >
            <button
              type="button"
              onClick={() => setLangMode(langMode === 'te' ? 'bi' : 'te')}
              className={`px-2 py-1 rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                langMode === 'te'
                  ? 'bg-[#1B6B2F] text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
              title="Telugu only"
            >
              తెలుగు
            </button>
            <button
              type="button"
              onClick={() => setLangMode(langMode === 'bi' ? 'bi' : 'bi')}
              className={`px-1.5 py-1 rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                langMode === 'bi'
                  ? 'bg-white text-[#1B6B2F] shadow-xs border border-slate-200'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Bilingual (Telugu + English)"
            >
              |
            </button>
            <button
              type="button"
              onClick={() => setLangMode(langMode === 'en' ? 'bi' : 'en')}
              className={`px-2 py-1 rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                langMode === 'en'
                  ? 'bg-[#1B6B2F] text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
              title="English only"
            >
              English
            </button>
          </div>

          {currentPage === 'admin-dashboard' ? (
            <button
              type="button"
              onClick={logoutAdmin}
              className="px-2.5 py-1.5 rounded-full bg-red-50 text-red-700 border border-red-200 text-xs font-bold hover:bg-red-100 cursor-pointer whitespace-nowrap"
            >
              <Bi te="లాగ్‌అవుట్" en="Logout" />
            </button>
          ) : !isAdminPage ? (
            <button
              type="button"
              onClick={() => navigate(isAdminLoggedIn ? 'admin-dashboard' : 'admin-login')}
              className="w-8 h-8 rounded-full bg-[#1B6B2F] text-white flex items-center justify-center shrink-0 hover:bg-[#155724] cursor-pointer"
              aria-label="Admin Portal"
              title="Admin Portal"
            >
              <User className="w-4 h-4" />
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export const BottomNav: React.FC = () => {
  const { currentPage, navigate } = useApp();

  if (currentPage === 'admin-login' || currentPage === 'admin-dashboard') {
    return null;
  }

  const isHomeActive =
    currentPage === 'home' ||
    currentPage.startsWith('water') ||
    currentPage.startsWith('health') ||
    currentPage.startsWith('consult') ||
    currentPage.startsWith('order') ||
    currentPage.includes('scheme') ||
    currentPage === 'eligibility' ||
    currentPage === 'how-to-apply';

  const isReportActive = currentPage === 'report-water' || currentPage === 'report-confirmed';
  const isHelpActive = currentPage === 'help';

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-lg"
      aria-label="Primary Village Navigation"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-3 h-16">
        <button
          type="button"
          onClick={() => navigate('home')}
          className={`flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-colors ${
            isHomeActive && !isReportActive && !isHelpActive
              ? 'text-[#1B6B2F] bg-emerald-50/50'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[11px] font-bold">
            <Bi te="హోమ్" en="Home" />
          </span>
        </button>

        <button
          type="button"
          onClick={() => navigate('report-water')}
          className={`flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-colors ${
            isReportActive
              ? 'text-[#1B6B2F] bg-emerald-50/50'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Megaphone className="w-5 h-5" />
          <span className="text-[11px] font-bold">
            <Bi te="సమస్య" en="Report" />
          </span>
        </button>

        <button
          type="button"
          onClick={() => navigate('help')}
          className={`flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-colors ${
            isHelpActive
              ? 'text-[#1B6B2F] bg-emerald-50/50'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Phone className="w-5 h-5" />
          <span className="text-[11px] font-bold">
            <Bi te="సహాయం" en="Help" />
          </span>
        </button>
      </div>
    </nav>
  );
};

export const VoiceNoticeBanner: React.FC = () => {
  const { voiceNotice, setVoiceNotice } = useApp();
  if (!voiceNotice) return null;

  return (
    <div
      role="status"
      className="mb-3 bg-amber-50 border border-amber-300 text-amber-950 rounded-2xl p-3.5 flex items-start justify-between gap-3 shadow-xs"
    >
      <div className="flex items-start gap-2.5 text-xs leading-relaxed">
        <VolumeX className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <div className="font-extrabold">{voiceNotice.te}</div>
          <div className="font-semibold text-amber-900">{voiceNotice.en}</div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setVoiceNotice(null)}
        className="w-7 h-7 rounded-full hover:bg-amber-200/60 flex items-center justify-center text-amber-900 shrink-0 cursor-pointer"
        aria-label="Dismiss voice message"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export const CallModal: React.FC = () => {
  const { callModal, closeCallModal } = useApp();
  if (!callModal) return null;

  const cleanTel = callModal.phone.replace(/[^0-9+]/g, '');

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-4"
      onClick={closeCallModal}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                callModal.isEmergency ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-[#1B6B2F]'
              }`}
            >
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                <Bi te={callModal.title.te} en={callModal.title.en} />
              </h3>
              <p className="text-sm font-bold text-[#1B6B2F] tabular-nums mt-0.5">
                {callModal.phone}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeCallModal}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {callModal.note && (
          <p className="text-xs text-slate-600 bg-slate-50 rounded-xl p-3 border border-slate-200">
            <Bi te={callModal.note.te} en={callModal.note.en} />
          </p>
        )}

        <div className="flex items-center gap-2 text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-xl p-3">
          <ShieldCheck className="w-4 h-4 shrink-0 text-amber-700" />
          <Bi
            te="గమనిక: ఇది నమూనా (SAMPLE) ఫోన్ నంబర్. అత్యవసర పరిస్థితుల్లో 108 కి కాల్ చేయండి."
            en="Note: Sample contact number for demo. For real emergencies, dial 108."
          />
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            onClick={closeCallModal}
            className="py-3 px-4 rounded-xl border border-slate-200 font-bold text-sm text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            <Bi te="మూసివేయండి" en="Close" />
          </button>
          <a
            href={`tel:${cleanTel}`}
            onClick={closeCallModal}
            className={`py-3 px-4 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 ${
              callModal.isEmergency ? 'bg-red-700 hover:bg-red-800' : 'bg-[#1B6B2F] hover:bg-[#155724]'
            }`}
          >
            <Phone className="w-4 h-4" />
            <Bi te="కాల్ చేయండి" en="Call Now" />
          </a>
        </div>
      </div>
    </div>
  );
};
