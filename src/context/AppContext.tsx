import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import {
  BiString,
  ConsultationBooking,
  INITIAL_CONSULTATIONS,
  INITIAL_MEDICINE_ORDERS,
  INITIAL_MEDICINES,
  INITIAL_STREETS,
  INITIAL_WATER_REPORTS,
  LangMode,
  MedicineItem,
  MedicineOrder,
  StreetSchedule,
  WaterProblemType,
  WaterReport,
} from '../data/villageData';

export type PageId =
  | 'home'
  | 'water-hub'
  | 'report-water'
  | 'report-confirmed'
  | 'water-quality'
  | 'water-safety'
  | 'water-fairness'
  | 'health-hub'
  | 'consult-doctor'
  | 'consult-confirmed'
  | 'order-medicines'
  | 'order-confirmed'
  | 'health-assistant'
  | 'schemes-hub'
  | 'farmer-schemes'
  | 'family-schemes'
  | 'eligibility'
  | 'how-to-apply'
  | 'scheme-alerts'
  | 'scheme-assistant'
  | 'admin-login'
  | 'admin-dashboard'
  | 'help';

export interface CallModalInfo {
  title: BiString;
  phone: string;
  note?: BiString;
  isEmergency?: boolean;
}

interface NavigateOptions {
  schemeId?: string;
  problemType?: WaterProblemType;
  streetId?: string;
  schemeQuestionId?: string;
}

interface AppContextValue {
  langMode: LangMode;
  setLangMode: (mode: LangMode) => void;
  currentPage: PageId;
  navigate: (page: PageId, opts?: NavigateOptions) => void;
  goBack: () => void;

  selectedSchemeId: string;
  setSelectedSchemeId: (id: string) => void;
  preselectedProblem: WaterProblemType;
  setPreselectedProblem: (p: WaterProblemType) => void;
  preselectedStreetId: string;
  preselectedSchemeChatId: string | null;
  setPreselectedSchemeChatId: (id: string | null) => void;

  // Live shared village data (Admin edits reflect immediately for villagers)
  streets: StreetSchedule[];
  updateStreetSchedule: (streetId: string, day: BiString, timeSlot: BiString, makeNext?: boolean) => void;
  rotateWeeklyTimings: () => void;
  tankLevelPercent: number;

  waterReports: WaterReport[];
  addWaterReport: (report: Omit<WaterReport, 'id' | 'status' | 'timeLabel'>) => WaterReport;
  markReportResolved: (reportId: string) => void;
  latestReport: WaterReport | null;

  tankerDispatchedStreets: string[];
  dispatchTanker: (streetId: string) => void;

  medicines: MedicineItem[];
  toggleMedicineAvailability: (medId: string) => void;
  lastMedicineUpdated: BiString;

  consultations: ConsultationBooking[];
  addConsultation: (booking: Omit<ConsultationBooking, 'id' | 'status' | 'timeLabel'>) => ConsultationBooking;
  cycleConsultationStatus: (id: string) => void;
  latestBooking: ConsultationBooking | null;

  medicineOrders: MedicineOrder[];
  addMedicineOrder: (order: Omit<MedicineOrder, 'id' | 'status'>) => MedicineOrder;
  cycleOrderStatus: (id: string) => void;
  latestOrder: MedicineOrder | null;

  schemeAlertsEnabled: boolean;
  setSchemeAlertsEnabled: (v: boolean) => void;
  alertChannel: 'sms' | 'whatsapp';
  setAlertChannel: (c: 'sms' | 'whatsapp') => void;

  isAdminLoggedIn: boolean;
  loginAdmin: () => void;
  logoutAdmin: () => void;

  // Audio assist, Voice notice & Call modal
  isSpeaking: boolean;
  speakText: (textTe: string, textEn: string) => void;
  stopSpeaking: () => void;
  voiceNotice: BiString | null;
  setVoiceNotice: (notice: BiString | null) => void;
  callModal: CallModalInfo | null;
  openCallModal: (info: CallModalInfo) => void;
  closeCallModal: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [langMode, setLangMode] = useState<LangMode>('bi');
  const [history, setHistory] = useState<PageId[]>(['home']);
  const currentPage = history[history.length - 1];

  const [selectedSchemeId, setSelectedSchemeId] = useState<string>('rythu-bharosa');
  const [preselectedProblem, setPreselectedProblem] = useState<WaterProblemType>('no-water');
  const [preselectedStreetId, setPreselectedStreetId] = useState<string>('temple-street');
  const [preselectedSchemeChatId, setPreselectedSchemeChatId] = useState<string | null>(null);

  const [streets, setStreets] = useState<StreetSchedule[]>(INITIAL_STREETS);
  const [tankLevelPercent] = useState<number>(85);
  const [waterReports, setWaterReports] = useState<WaterReport[]>(INITIAL_WATER_REPORTS);
  const [latestReport, setLatestReport] = useState<WaterReport | null>(null);
  const [tankerDispatchedStreets, setTankerDispatchedStreets] = useState<string[]>(['farm-colony']);

  const [medicines, setMedicines] = useState<MedicineItem[]>(INITIAL_MEDICINES);
  const [lastMedicineUpdated, setLastMedicineUpdated] = useState<BiString>({
    te: 'ఈరోజు, ఉదయం 10 గం.',
    en: 'Today, 10:00 AM',
  });

  const [consultations, setConsultations] = useState<ConsultationBooking[]>(INITIAL_CONSULTATIONS);
  const [latestBooking, setLatestBooking] = useState<ConsultationBooking | null>(null);

  const [medicineOrders, setMedicineOrders] = useState<MedicineOrder[]>(INITIAL_MEDICINE_ORDERS);
  const [latestOrder, setLatestOrder] = useState<MedicineOrder | null>(null);

  const [schemeAlertsEnabled, setSchemeAlertsEnabled] = useState<boolean>(true);
  const [alertChannel, setAlertChannel] = useState<'sms' | 'whatsapp'>('sms');

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [voiceNotice, setVoiceNotice] = useState<BiString | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [callModal, setCallModal] = useState<CallModalInfo | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const loadVoices = () => {
      const list = window.speechSynthesis.getVoices();
      if (list.length > 0) setAvailableVoices(list);
    };
    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, []);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  const handleSetLangMode = useCallback(
    (mode: LangMode) => {
      stopSpeaking();
      setVoiceNotice(null);
      setLangMode(mode);
    },
    [stopSpeaking]
  );

  const speakText = useCallback(
    (textTe: string, textEn: string) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        setVoiceNotice({
          te: 'ఈ పరికరంలో వాయిస్ చదివే సదుపాయం అందుబాటులో లేదు.',
          en: 'Speech synthesis is not supported on this browser.',
        });
        return;
      }

      if (isSpeaking || window.speechSynthesis.speaking) {
        stopSpeaking();
        return;
      }

      const voices = window.speechSynthesis.getVoices();
      const voicePool = voices.length > 0 ? voices : availableVoices;

      if (langMode === 'en') {
        const enVoice =
          voicePool.find((v) => v.lang.toLowerCase() === 'en-in') ||
          voicePool.find((v) => v.lang.toLowerCase().startsWith('en-in')) ||
          voicePool.find((v) => v.lang.toLowerCase().startsWith('en'));

        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(textEn);
        utterance.lang = 'en-IN';
        if (enVoice) utterance.voice = enVoice;
        utterance.rate = 0.95;
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        setVoiceNotice(null);
        setIsSpeaking(true);
        window.speechSynthesis.speak(utterance);
        return;
      }

      // Telugu or Bilingual mode: strictly require a Telugu ("te") voice — never silently fall back to English
      const teVoice = voicePool.find((v) => v.lang.toLowerCase().startsWith('te'));
      if (!teVoice) {
        setIsSpeaking(false);
        setVoiceNotice({
          te: 'ఈ పరికరంలో తెలుగు వాయిస్ అందుబాటులో లేదు. దయచేసి మీ ఫోన్ సెట్టింగ్స్‌లో తెలుగు వాయిస్‌ని ఇన్‌స్టాల్ చేయండి.',
          en: 'Telugu voice is not available on this device. Please install the Telugu voice in your phone settings.',
        });
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textTe);
      utterance.lang = 'te-IN';
      utterance.voice = teVoice;
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setVoiceNotice(null);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    },
    [availableVoices, isSpeaking, langMode, stopSpeaking]
  );

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const navigate = useCallback(
    (page: PageId, opts?: NavigateOptions) => {
      stopSpeaking();
      if (opts?.schemeId) setSelectedSchemeId(opts.schemeId);
      if (opts?.problemType) setPreselectedProblem(opts.problemType);
      if (opts?.streetId) setPreselectedStreetId(opts.streetId);
      if (opts?.schemeQuestionId !== undefined) setPreselectedSchemeChatId(opts.schemeQuestionId);

      setHistory((prev) => {
        if (page === 'home') return ['home'];
        if (prev[prev.length - 1] === page) return prev;
        return [...prev, page];
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [stopSpeaking]
  );

  const goBack = useCallback(() => {
    stopSpeaking();
    setHistory((prev) => (prev.length > 1 ? prev.slice(0, -1) : ['home']));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [stopSpeaking]);

  const updateStreetSchedule = useCallback(
    (streetId: string, day: BiString, timeSlot: BiString, makeNext?: boolean) => {
      setStreets((prev) =>
        prev.map((s) => {
          if (s.id === streetId) {
            return { ...s, day, timeSlot, isNext: makeNext !== undefined ? makeNext : s.isNext };
          }
          return makeNext ? { ...s, isNext: false } : s;
        })
      );
    },
    []
  );

  const rotateWeeklyTimings = useCallback(() => {
    setStreets((prev) => {
      const nextIdx = prev.findIndex((s) => s.isNext);
      const targetIdx = nextIdx === -1 ? 0 : (nextIdx + 1) % prev.length;
      return prev.map((s, idx) => ({
        ...s,
        isNext: idx === targetIdx,
        timeSlot:
          s.timeSlot.en === '6:00 AM - 8:00 AM'
            ? { te: 'సాయంత్రం 5:00 - 7:00', en: '5:00 PM - 7:00 PM' }
            : { te: 'ఉదయం 6:00 - 8:00', en: '6:00 AM - 8:00 AM' },
      }));
    });
  }, []);

  const addWaterReport = useCallback(
    (input: Omit<WaterReport, 'id' | 'status' | 'timeLabel'>) => {
      const newReport: WaterReport = {
        ...input,
        id: `REP-${Math.floor(110 + Math.random() * 880)}`,
        status: 'new',
        timeLabel:
          input.when === 'today'
            ? { te: 'ఇప్పుడే నమోదైంది', en: 'Just now (Today)' }
            : input.when === 'yesterday'
            ? { te: 'నిన్న నమోదైంది', en: 'Reported for Yesterday' }
            : { te: 'ఇటీవల నమోదైంది', en: 'Other day' },
      };

      setWaterReports((prev) => {
        const updated = [newReport, ...prev];
        const activeCountForStreet = updated.filter(
          (r) => r.streetId === input.streetId && r.status === 'new'
        ).length;
        if (activeCountForStreet >= 3) {
          setTankerDispatchedStreets((tPrev) =>
            tPrev.includes(input.streetId) ? tPrev : [...tPrev, input.streetId]
          );
        }
        return updated;
      });
      setLatestReport(newReport);
      return newReport;
    },
    []
  );

  const markReportResolved = useCallback((reportId: string) => {
    setWaterReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: 'resolved' } : r))
    );
  }, []);

  const dispatchTanker = useCallback((streetId: string) => {
    setTankerDispatchedStreets((prev) =>
      prev.includes(streetId) ? prev : [...prev, streetId]
    );
  }, []);

  const toggleMedicineAvailability = useCallback((medId: string) => {
    setMedicines((prev) =>
      prev.map((m) => (m.id === medId ? { ...m, available: !m.available } : m))
    );
    setLastMedicineUpdated({ te: 'ఇప్పుడే అప్‌డేట్ అయింది', en: 'Updated just now' });
  }, []);

  const addConsultation = useCallback(
    (booking: Omit<ConsultationBooking, 'id' | 'status' | 'timeLabel'>) => {
      const created: ConsultationBooking = {
        ...booking,
        id: `CON-${Math.floor(210 + Math.random() * 700)}`,
        status: 'waiting',
        timeLabel:
          booking.mode === 'online'
            ? { te: 'వీడియో కాల్ • ఈరోజు 11:30 AM', en: 'Video Call • Today 11:30 AM' }
            : { te: 'క్లినిక్ సందర్శన • ఈరోజు 11:30 AM', en: 'Clinic Visit • Today 11:30 AM' },
      };
      setConsultations((prev) => [created, ...prev]);
      setLatestBooking(created);
      return created;
    },
    []
  );

  const cycleConsultationStatus = useCallback((id: string) => {
    setConsultations((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const nextStatus =
          c.status === 'waiting' ? 'attended' : c.status === 'attended' ? 'completed' : 'waiting';
        return { ...c, status: nextStatus };
      })
    );
  }, []);

  const addMedicineOrder = useCallback(
    (order: Omit<MedicineOrder, 'id' | 'status'>) => {
      const created: MedicineOrder = {
        ...order,
        id: `#${Math.floor(1040 + Math.random() * 890)}`,
        status: 'new',
      };
      setMedicineOrders((prev) => [created, ...prev]);
      setLatestOrder(created);
      return created;
    },
    []
  );

  const cycleOrderStatus = useCallback((id: string) => {
    setMedicineOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const nextStatus =
          o.status === 'new' ? 'on-way' : o.status === 'on-way' ? 'delivered' : 'new';
        return { ...o, status: nextStatus };
      })
    );
  }, []);

  const loginAdmin = useCallback(() => {
    setIsAdminLoggedIn(true);
    navigate('admin-dashboard');
  }, [navigate]);

  const logoutAdmin = useCallback(() => {
    setIsAdminLoggedIn(false);
    navigate('home');
  }, [navigate]);

  const openCallModal = useCallback((info: CallModalInfo) => setCallModal(info), []);
  const closeCallModal = useCallback(() => setCallModal(null), []);

  return (
    <AppContext.Provider
      value={{
        langMode,
        setLangMode: handleSetLangMode,
        currentPage,
        navigate,
        goBack,
        selectedSchemeId,
        setSelectedSchemeId,
        preselectedProblem,
        setPreselectedProblem,
        preselectedStreetId,
        preselectedSchemeChatId,
        setPreselectedSchemeChatId,
        streets,
        updateStreetSchedule,
        rotateWeeklyTimings,
        tankLevelPercent,
        waterReports,
        addWaterReport,
        markReportResolved,
        latestReport,
        tankerDispatchedStreets,
        dispatchTanker,
        medicines,
        toggleMedicineAvailability,
        lastMedicineUpdated,
        consultations,
        addConsultation,
        cycleConsultationStatus,
        latestBooking,
        medicineOrders,
        addMedicineOrder,
        cycleOrderStatus,
        latestOrder,
        schemeAlertsEnabled,
        setSchemeAlertsEnabled,
        alertChannel,
        setAlertChannel,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        isSpeaking,
        speakText,
        stopSpeaking,
        voiceNotice,
        setVoiceNotice,
        callModal,
        openCallModal,
        closeCallModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
