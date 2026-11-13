import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  Building2,
  Calendar,
  CheckCircle2,
  Droplets,
  Eye,
  EyeOff,
  HelpCircle,
  Info,
  Lock,
  LogIn,
  Pill,
  RefreshCw,
  ShieldCheck,
  Stethoscope,
  Truck,
} from 'lucide-react';
import { Bi, BiStack, ListenButton, SafeImage } from '../components/CommonUI';
import { useApp } from '../context/AppContext';
import { PROBLEM_TYPES, SAMPLE_CONTACTS } from '../data/villageData';

export const AdminLoginPage: React.FC = () => {
  const { loginAdmin, navigate, openCallModal } = useApp();
  const [email, setEmail] = useState('admin@kantheru.sample');
  const [password, setPassword] = useState('kantheru123');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('దయచేసి ఇమెయిల్/ఐడి మరియు పాస్‌వర్డ్ నమోదు చేయండి / Please enter email and password.');
      return;
    }
    loginAdmin();
  };

  return (
    <div className="space-y-4 pb-8 max-w-lg mx-auto">
      {/* Audio Guide Bar */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 flex items-center justify-between gap-2">
        <span className="text-xs font-bold text-blue-950">
          🔊 <Bi te="ఆడియో సహాయం" en="Voice Guide" />
        </span>
        <ListenButton
          te="అధికారి ప్రవేశం. గ్రామ వాలంటీర్లు మరియు సచివాలయ సిబ్బంది మీ ఐడి మరియు పాస్‌వర్డ్‌తో లాగిన్ అవ్వండి."
          en="Admin and Staff Portal. Enter your Village Secretariat email or ID and password to log in."
          variant="green"
          compact
        />
      </div>

      {/* Lock Icon + Title */}
      <div className="text-center space-y-2 pt-1">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#1B6B2F] flex items-center justify-center mx-auto border-4 border-emerald-50">
          <Lock className="w-7 h-7" />
        </div>
        <BiStack
          te="అధికారి ప్రవేశం"
          en="Admin & Staff Portal"
          teClass="text-2xl font-extrabold text-slate-900"
          enClass="text-sm font-bold text-slate-600"
        />
        <p className="text-xs text-slate-500">
          <Bi
            te="గ్రామ వాలంటీర్లు మరియు సచివాలయ సిబ్బంది కొరకు మాత్రమే"
            en="For authorized Panchayat personnel only"
          />
        </p>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700">
          <Building2 className="w-3.5 h-3.5 text-[#1B6B2F]" />
          <Bi te="కాంతేరు గ్రామ పంచాయతీ" en="Kantheru Grama Sachivalayam" />
        </div>
      </div>

      {/* Secretariat Banner */}
      <div className="relative rounded-2xl overflow-hidden h-32 border border-slate-200">
        <SafeImage
          src=""
          alt="Kantheru Grama Sachivalayam"
          className="w-full h-full"
          fallbackTitle={{
            te: 'కాంతేరు గ్రామ సచివాలయం • సురక్షిత పోర్టల్',
            en: 'Kantheru Grama Sachivalayam • Staff Portal',
          }}
        />
        <span className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-[#1B6B2F] text-white text-[10px] font-bold">
          Active
        </span>
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-2xs"
      >
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-extrabold text-slate-900">
              <Bi te="ఇమెయిల్ / ఉద్యోగి ఐడి" en="Email / Username" />
            </label>
            <span className="text-[10px] font-bold text-slate-400">SAMPLE LOGIN</span>
          </div>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            placeholder="admin@kantheru.sample"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1B6B2F]"
          />
          <p className="text-[11px] text-slate-500">
            <Bi
              te="సచివాలయ ఐడి లేదా ఇమెయిల్ నమోదు చేయండి (డెమో కోసం సిద్ధంగా ఉంది)"
              en="Pre-filled for quick demo access; any email & password works"
            />
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-extrabold text-slate-900 block">
            <Bi te="పాస్‌వర్డ్" en="Password" />
          </label>
          <div className="relative">
            <input
              type={showPwd ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-3.5 pr-11 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1B6B2F]"
            />
            <button
              type="button"
              onClick={() => setShowPwd(!showPwd)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800 cursor-pointer"
              aria-label="Toggle password visibility"
            >
              {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-start gap-2 text-xs text-slate-600">
          <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <Bi
            te="లాగిన్ వివరాలు ఎవరితోనూ పంచుకోవద్దు."
            en="Do not share OTP or staff credentials."
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs font-bold text-red-800">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-[#1B6B2F] hover:bg-[#155724] text-white rounded-full py-3.5 px-5 font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer"
        >
          <LogIn className="w-4 h-4" />
          <Bi te="లాగిన్" en="Login" />
        </button>
      </form>

      {/* Support Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <HelpCircle className="w-5 h-5 text-blue-700 shrink-0" />
          <BiStack
            te="పాస్‌వర్డ్ మర్చిపోయారా?"
            en="Forgot password? Contact Village Secretariat Officer"
            teClass="text-xs font-extrabold text-slate-900"
            enClass="text-[11px] text-slate-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between gap-3">
        <BiStack
          te="సహాయ కేంద్రం హెల్ప్‌లైన్"
          en={SAMPLE_CONTACTS.adminHelpline.phone}
          teClass="text-xs font-extrabold text-slate-900"
          enClass="text-xs font-bold text-[#1B6B2F] tabular-nums"
        />
        <button
          type="button"
          onClick={() =>
            openCallModal({
              title: SAMPLE_CONTACTS.adminHelpline.name,
              phone: SAMPLE_CONTACTS.adminHelpline.phone,
              note: SAMPLE_CONTACTS.adminHelpline.note,
            })
          }
          className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-extrabold text-slate-800 cursor-pointer"
        >
          <Bi te="కాల్ చేయండి" en="Call" />
        </button>
      </div>

      <button
        type="button"
        onClick={() => navigate('home')}
        className="w-full py-2.5 text-center text-xs font-extrabold text-slate-700 hover:text-slate-900 flex items-center justify-center gap-1.5 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <Bi te="హోమ్‌కు తిరిగి వెళ్ళండి" en="Back to Home" />
      </button>
    </div>
  );
};

export const AdminDashboardPage: React.FC = () => {
  const {
    streets,
    waterReports,
    markReportResolved,
    tankerDispatchedStreets,
    dispatchTanker,
    updateStreetSchedule,
    rotateWeeklyTimings,
    medicines,
    toggleMedicineAvailability,
    consultations,
    cycleConsultationStatus,
    medicineOrders,
    cycleOrderStatus,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'reports' | 'water' | 'medicines'>('reports');

  // Schedule editor state
  const [editStreetId, setEditStreetId] = useState<string>(streets[3]?.id || streets[0].id);
  const [editDayEn, setEditDayEn] = useState<string>('Monday');
  const [editSlotEn, setEditSlotEn] = useState<string>('6:00 AM - 8:00 AM');
  const [makeNext, setMakeNext] = useState<boolean>(true);
  const [savedToast, setSavedToast] = useState<string>('');

  const activeReportsCount = waterReports.filter((r) => r.status === 'new').length;
  const outOfStockCount = medicines.filter((m) => !m.available).length;

  const dayOptions = [
    { te: 'సోమవారం', en: 'Monday' },
    { te: 'మంగళవారం', en: 'Tuesday' },
    { te: 'బుధవారం', en: 'Wednesday' },
    { te: 'గురువారం', en: 'Thursday' },
    { te: 'శుక్రవారం', en: 'Friday' },
    { te: 'శనివారం', en: 'Saturday' },
  ];

  const slotOptions = [
    { te: 'ఉదయం 6:00 - 8:00', en: '6:00 AM - 8:00 AM' },
    { te: 'ఉదయం 7:00 - 9:00', en: '7:00 AM - 9:00 AM' },
    { te: 'సాయంత్రం 5:00 - 7:00', en: '5:00 PM - 7:00 PM' },
  ];

  const handleSaveSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    const dayObj = dayOptions.find((d) => d.en === editDayEn) || dayOptions[0];
    const slotObj = slotOptions.find((s) => s.en === editSlotEn) || slotOptions[0];
    updateStreetSchedule(editStreetId, dayObj, slotObj, makeNext);
    setSavedToast('సరఫరా సమయాలు సేవ్ చేయబడ్డాయి! / Water schedule updated for villagers.');
    setTimeout(() => setSavedToast(''), 3000);
  };

  return (
    <div className="space-y-4 pb-10">
      {/* Active Hub Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-[#1B6B2F] mb-1">
            <span className="w-2 h-2 rounded-full bg-[#1B6B2F]" />
            <Bi te="లైవ్ కనెక్ట్" en="ACTIVE HUB" />
          </span>
          <BiStack
            te="కాంతేరు గ్రామ సచివాలయం"
            en="Kantheru Grama Sachivalayam • Staff Control"
            teClass="text-lg font-extrabold text-slate-900"
            enClass="text-xs text-slate-500"
          />
        </div>
        <ListenButton
          te={`అధికారి డాష్‌బోర్డ్. ప్రస్తుతం ${activeReportsCount} నీటి ఫిర్యాదులు మరియు ${outOfStockCount} మందులు స్టాక్‌లో లేవు.`}
          en={`Admin Dashboard. ${activeReportsCount} active water reports and ${outOfStockCount} medicines out of stock.`}
          compact
        />
      </div>

      {/* 3 KPI Summary Cards */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="bg-white rounded-2xl border border-slate-200 p-3.5">
          <div className="text-[11px] font-bold text-slate-500">
            <Bi te="నీటి సమస్యలు" en="Active Reports" />
          </div>
          <div className="text-2xl font-extrabold text-red-700 tabular-nums mt-1">
            {activeReportsCount}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5">
          <div className="text-[11px] font-bold text-slate-500">
            <Bi te="స్టాక్ లేని మందులు" en="Out of Stock" />
          </div>
          <div className="text-2xl font-extrabold text-amber-700 tabular-nums mt-1">
            {outOfStockCount}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5">
          <div className="text-[11px] font-bold text-slate-500">
            <Bi te="నవీకరణ" en="Last Sync" />
          </div>
          <div className="text-lg sm:text-xl font-extrabold text-[#1B6B2F] mt-1">
            <Bi te="నేడు" en="Live" />
          </div>
        </div>
      </div>

      {/* Reports by Street Overview */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <BiStack
            te="వీధుల వారీ నివేదికలు"
            en="Reports by street overview"
            teClass="text-base font-extrabold text-slate-900"
            enClass="text-xs text-slate-500"
          />
          <Droplets className="w-4 h-4 text-blue-700" />
        </div>

        <div className="space-y-3">
          {streets.map((street) => {
            const count = waterReports.filter(
              (r) => r.streetId === street.id && r.status === 'new'
            ).length;
            const isHigh = count >= 3;
            const isWatch = count >= 1 && count < 3;
            const tankerSent = tankerDispatchedStreets.includes(street.id);
            const pct = Math.min(100, Math.max(12, count * 25));

            return (
              <div
                key={street.id}
                className={`rounded-xl p-3 border ${
                  isHigh ? 'bg-red-50/70 border-red-200' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-900">
                    {isHigh && <AlertTriangle className="w-3.5 h-3.5 inline text-red-700 mr-1" />}
                    <Bi te={street.name.te} en={street.name.en} />
                  </span>
                  <span
                    className={`tabular-nums ${
                      isHigh ? 'text-red-700' : isWatch ? 'text-blue-700' : 'text-[#1B6B2F]'
                    }`}
                  >
                    {count}{' '}
                    {isHigh ? (
                      <Bi te="నివేదికలు (తక్షణ అవసరం)" en="reports (Urgent)" />
                    ) : isWatch ? (
                      <Bi te="నివేదికలు (గమనించాలి)" en="reports (Watch)" />
                    ) : (
                      <Bi te="నివేదికలు (సాధారణం)" en="reports (Normal)" />
                    )}
                  </span>
                </div>

                <div className="w-full h-2 bg-white rounded-full overflow-hidden border border-slate-200">
                  <div
                    className={`h-full rounded-full ${
                      isHigh ? 'bg-red-700' : isWatch ? 'bg-blue-600' : 'bg-[#1B6B2F]'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>

                {isHigh && (
                  <div className="mt-2.5 flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-[11px] font-semibold text-red-900">
                      {tankerSent ? (
                        <Bi
                          te="✓ వాటర్ ట్యాంకర్ పంపబడింది (బోర్డులో అప్‌డేట్ అయింది)"
                          en="✓ Tanker dispatched on Fairness Board"
                        />
                      ) : (
                        <Bi
                          te="3 లేదా అంతకంటే ఎక్కువ ఫిర్యాదులు — ట్యాంకర్ పంపండి"
                          en="3+ reports reached — send free water tanker"
                        />
                      )}
                    </span>
                    {!tankerSent && (
                      <button
                        type="button"
                        onClick={() => dispatchTanker(street.id)}
                        className="px-3.5 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs font-extrabold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <Bi te="వాటర్ ట్యాంకర్ పంపండి" en="Send tanker" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3 Tabs: Reports | Water | Medicines */}
      <div className="bg-white rounded-2xl border border-slate-200 p-1.5 grid grid-cols-3 gap-1">
        <button
          type="button"
          onClick={() => setActiveTab('reports')}
          className={`py-2.5 px-2 rounded-xl text-xs font-extrabold transition-colors cursor-pointer ${
            activeTab === 'reports'
              ? 'bg-[#1B6B2F] text-white'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Bi te={`రిపోర్టులు (${activeReportsCount})`} en={`Reports (${activeReportsCount})`} />
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('water')}
          className={`py-2.5 px-2 rounded-xl text-xs font-extrabold transition-colors cursor-pointer ${
            activeTab === 'water'
              ? 'bg-[#1B6B2F] text-white'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Bi te="నీటి సరఫరా" en="Water" />
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('medicines')}
          className={`py-2.5 px-2 rounded-xl text-xs font-extrabold transition-colors cursor-pointer ${
            activeTab === 'medicines'
              ? 'bg-[#1B6B2F] text-white'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Bi te="మందుల నిల్వ" en="Medicines" />
        </button>
      </div>

      {savedToast && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl p-3 text-xs font-extrabold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#1B6B2F]" />
          <span>{savedToast}</span>
        </div>
      )}

      {/* TAB 1: REPORTS */}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <BiStack
              te="గ్రామ సమస్యల నమోదు"
              en="Village Issue Reports"
              teClass="text-base font-extrabold text-slate-900"
              enClass="text-xs text-slate-500"
            />
            <span className="text-xs font-bold text-slate-500 tabular-nums">
              {waterReports.length} <Bi te="మొత్తం" en="total" />
            </span>
          </div>

          <div className="space-y-2.5">
            {waterReports.map((rep) => {
              const street = streets.find((s) => s.id === rep.streetId) || streets[0];
              const prob = PROBLEM_TYPES.find((p) => p.id === rep.problemType) || PROBLEM_TYPES[0];
              const isResolved = rep.status === 'resolved';

              return (
                <div
                  key={rep.id}
                  className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[11px] font-bold text-slate-500">
                        <Bi te={street.name.te} en={street.name.en} /> · {rep.id}
                      </div>
                      <div className="text-sm font-extrabold text-slate-900 mt-0.5">
                        <Bi te={prob.label.te} en={prob.label.en} />
                      </div>
                      {rep.note && (
                        <div className="text-xs text-slate-600 italic mt-0.5">“{rep.note}”</div>
                      )}
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold shrink-0 ${
                        isResolved
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {isResolved ? (
                        <Bi te="పరిష్కారమైంది" en="Resolved" />
                      ) : (
                        <Bi te="కొత్తది" en="New" />
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <span className="text-[11px] text-slate-500 font-semibold">
                      🕒 <Bi te={rep.timeLabel.te} en={rep.timeLabel.en} />
                    </span>

                    {isResolved ? (
                      <span className="text-xs font-bold text-emerald-700">
                        ✓ <Bi te="పూర్తయింది" en="Done" />
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => markReportResolved(rep.id)}
                        className="px-3.5 py-2 rounded-full bg-[#1B6B2F] hover:bg-[#155724] text-white text-xs font-extrabold cursor-pointer"
                      >
                        <Bi te="పరిష్కరించండి" en="Mark resolved" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: WATER SCHEDULE */}
      {activeTab === 'water' && (
        <form
          onSubmit={handleSaveSchedule}
          className="bg-white rounded-2xl border border-slate-200 p-4 space-y-4"
        >
          <div className="flex items-center justify-between">
            <BiStack
              te="నీటి సరఫరా వేళల సవరణ"
              en="Water supply schedule management"
              teClass="text-base font-extrabold text-slate-900"
              enClass="text-xs text-slate-500"
            />
            <Calendar className="w-4 h-4 text-blue-700" />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              <Bi te="వీధిని ఎంచుకోండి" en="Select Street" />
            </label>
            <select
              value={editStreetId}
              onChange={(e) => setEditStreetId(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1B6B2F]"
            >
              {streets.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name.te} / {s.name.en} ({s.day.en})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                <Bi te="రోజు" en="Day" />
              </label>
              <select
                value={editDayEn}
                onChange={(e) => setEditDayEn(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-bold text-slate-900"
              >
                {dayOptions.map((d) => (
                  <option key={d.en} value={d.en}>
                    {d.te} / {d.en}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                <Bi te="సమయం" en="Time Slot" />
              </label>
              <select
                value={editSlotEn}
                onChange={(e) => setEditSlotEn(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-bold text-slate-900"
              >
                {slotOptions.map((s) => (
                  <option key={s.en} value={s.en}>
                    {s.te} / {s.en}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <label className="flex items-center gap-2.5 text-xs font-bold text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200 cursor-pointer">
            <input
              type="checkbox"
              checked={makeNext}
              onChange={(e) => setMakeNext(e.target.checked)}
              className="w-4 h-4 accent-[#1B6B2F]"
            />
            <Bi
              te="ఈ వీధిని హోమ్ పేజీలో 'తదుపరి సరఫరా' గా చూపించండి"
              en="Highlight as NEXT supply on Home & Water Hub"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-[#1B6B2F] hover:bg-[#155724] text-white rounded-xl py-3.5 font-extrabold text-sm cursor-pointer"
          >
            <Bi te="సమయాలు సేవ్ చేయండి" en="Save Schedule" />
          </button>

          <div className="border-t border-slate-200 pt-3 flex items-center justify-between gap-3">
            <BiStack
              te="ఈ వారం సమయాలను మార్చండి (రొటేషన్)"
              en="Rotate timings across all streets this week"
              teClass="text-xs font-extrabold text-slate-900"
              enClass="text-[11px] text-slate-500"
            />
            <button
              type="button"
              onClick={() => {
                rotateWeeklyTimings();
                setSavedToast('వారపు సరఫరా సమయాలు రొటేట్ చేయబడ్డాయి! / Weekly timings rotated.');
                setTimeout(() => setSavedToast(''), 3000);
              }}
              className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 text-xs font-extrabold flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <Bi te="రొటేట్" en="Rotate" />
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: MEDICINES */}
      {activeTab === 'medicines' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <BiStack
              te="ప్రాథమిక ఆరోగ్య కేంద్రం - మందుల నిల్వ"
              en="PHC Medicine Stock Availability"
              teClass="text-base font-extrabold text-slate-900"
              enClass="text-xs text-slate-500"
            />
            <Pill className="w-4 h-4 text-[#1B6B2F]" />
          </div>

          <div className="space-y-2.5">
            {medicines.map((med) => (
              <div
                key={med.id}
                className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="text-sm font-extrabold text-slate-900">{med.name}</div>
                  <div
                    className={`text-xs font-bold mt-0.5 ${
                      med.available ? 'text-emerald-700' : 'text-red-700'
                    }`}
                  >
                    {med.available ? (
                      <Bi te="లభ్యత ఉంది • Available" en="Available" />
                    ) : (
                      <Bi te="అందుబాటులో లేదు • Not available" en="Not available" />
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={med.available}
                  onClick={() => toggleMedicineAvailability(med.id)}
                  className={`w-14 h-8 rounded-full p-1 transition-colors cursor-pointer shrink-0 flex items-center ${
                    med.available ? 'bg-[#1B6B2F] justify-end' : 'bg-slate-300 justify-start'
                  }`}
                >
                  <span className="w-6 h-6 rounded-full bg-white shadow-sm" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Doctor Consultations List (Always visible on Dashboard) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <BiStack
            te="నేటి డాక్టర్ సంప్రదింపులు"
            en="Doctor Consultations Today"
            teClass="text-base font-extrabold text-slate-900"
            enClass="text-xs text-slate-500"
          />
          <Stethoscope className="w-4 h-4 text-blue-700" />
        </div>

        <div className="space-y-2.5">
          {consultations.map((c) => (
            <div
              key={c.id}
              className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 flex items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <div className="text-sm font-extrabold text-slate-900 truncate">
                  <Bi te={c.patientName.te} en={c.patientName.en} />
                </div>
                <div className="text-xs text-slate-600 mt-0.5">
                  <Bi te={c.timeLabel.te} en={c.timeLabel.en} /> · {c.age}y · {c.temp}
                </div>
              </div>

              <button
                type="button"
                onClick={() => cycleConsultationStatus(c.id)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold shrink-0 cursor-pointer ${
                  c.status === 'completed'
                    ? 'bg-emerald-100 text-emerald-800'
                    : c.status === 'attended'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
                title="Tap to update status"
              >
                {c.status === 'completed' ? (
                  <Bi te="పూర్తయింది" en="Completed" />
                ) : c.status === 'attended' ? (
                  <Bi te="చూడబడింది" en="Attended" />
                ) : (
                  <Bi te="వేచి ఉన్నారు" en="Waiting" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Medicine Delivery Orders List (Always visible on Dashboard) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <BiStack
            te="ఔషధ డెలివరీ ఆర్డర్లు"
            en="Medicine Delivery Orders"
            teClass="text-base font-extrabold text-slate-900"
            enClass="text-xs text-slate-500"
          />
          <Truck className="w-4 h-4 text-[#1B6B2F]" />
        </div>

        <div className="space-y-2.5">
          {medicineOrders.map((ord) => {
            const street = streets.find((s) => s.id === ord.streetId) || streets[0];
            return (
              <div
                key={ord.id}
                className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="text-xs font-extrabold text-slate-500 tabular-nums">
                    {ord.id} · {ord.recipientName}
                  </div>
                  <div className="text-sm font-extrabold text-slate-900">
                    <Bi te={street.name.te} en={street.name.en} />
                  </div>
                  <div className="text-xs text-slate-600">
                    <Bi te={ord.itemsSummary.te} en={ord.itemsSummary.en} />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => cycleOrderStatus(ord.id)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold shrink-0 cursor-pointer ${
                    ord.status === 'delivered'
                      ? 'bg-emerald-100 text-emerald-800'
                      : ord.status === 'on-way'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                  title="Tap to update delivery status"
                >
                  {ord.status === 'delivered' ? (
                    <Bi te="డెలివరీ అయింది" en="Delivered" />
                  ) : ord.status === 'on-way' ? (
                    <Bi te="రవాణాలో ఉంది" en="On way" />
                  ) : (
                    <Bi te="కొత్తది" en="New" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Sync Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-2.5 text-xs text-blue-950 font-semibold">
        <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
        <Bi
          te="గమనిక: ఇక్కడ చేసే మార్పులు వెంటనే గ్రామస్తుల పేజీలలో కనిపిస్తాయి."
          en="Live Sync Active: Any updates to schedules, water, or medicine stock reflect immediately across villager views."
        />
      </div>
    </div>
  );
};
