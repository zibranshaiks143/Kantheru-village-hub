import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  Building2,
  Droplets,
  FileText,
  Headphones,
  Hospital,
  Lock,
  Megaphone,
  MessageSquare,
  Phone,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { Bi, BiStack, ListenButton, SafeImage } from '../components/CommonUI';
import { useApp } from '../context/AppContext';
import { ASSETS, SAMPLE_CONTACTS } from '../data/villageData';

export const HomePage: React.FC = () => {
  const { navigate, streets, isAdminLoggedIn, openCallModal } = useApp();
  const nextStreet = streets.find((s) => s.isNext) || streets[0];

  return (
    <div className="space-y-4 pb-6">
      {/* Top Water Bulletin Card */}
      <div className="bg-[#E8F1FC] border border-blue-200 rounded-2xl p-4 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Droplets className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-blue-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
              <Bi te="నీటి సమాచారం" en="Water Bulletin" />
            </div>
            <BiStack
              te={`తదుపరి నీటి సరఫరా: ${nextStreet.day.te}, ${nextStreet.timeSlot.te} (${nextStreet.name.te})`}
              en={`Next water supply: ${nextStreet.day.en}, ${nextStreet.timeSlot.en} (${nextStreet.name.en})`}
              teClass="text-sm sm:text-base font-extrabold text-slate-900 leading-snug"
              enClass="text-xs font-semibold text-slate-600 mt-0.5"
            />
          </div>
        </div>
        <ListenButton
          te={`నీటి సమాచారం. తదుపరి నీటి సరఫరా ${nextStreet.day.te} ${nextStreet.timeSlot.te} ${nextStreet.name.te} లో ఉంటుంది.`}
          en={`Water Bulletin. Next water supply is on ${nextStreet.day.en} ${nextStreet.timeSlot.en} in ${nextStreet.name.en}.`}
          variant="blue"
          compact
        />
      </div>

      {/* Village Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xs h-44 sm:h-52">
        <SafeImage
          src={ASSETS.villageBanner}
          alt="Kantheru Village View"
          className="w-full h-full object-cover"
          fallbackTitle={{ te: 'కాంతేరు గ్రామ వేదిక', en: 'Kantheru Citizen Services Portal' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent flex items-end justify-between p-4 gap-3">
          <div className="text-white">
            <BiStack
              te="కాంతేరు గ్రామ వేదిక"
              en="Kantheru Citizen Services Portal"
              teClass="text-lg sm:text-xl font-extrabold text-white leading-tight"
              enClass="text-xs sm:text-sm font-medium text-white/90"
            />
          </div>
          <div className="bg-white/95 backdrop-blur-xs rounded-xl px-3 py-2 text-center shadow-sm shrink-0">
            <div className="text-[10px] font-bold text-emerald-700">
              <Bi te="ఈరోజు" en="Today" />
            </div>
            <div className="text-xs font-extrabold text-slate-900">
              <Bi te="నిరంతర సేవలు" en="Services Open" />
            </div>
          </div>
        </div>
      </div>

      {/* Essential Grama Services Section Header */}
      <div className="flex items-center justify-between pt-1">
        <BiStack
          te="ప్రధాన సేవలు"
          en="Essential Grama Services"
          teClass="text-base sm:text-lg font-extrabold text-slate-900"
          enClass="text-xs font-semibold text-slate-500"
        />
        <span className="text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-full px-3 py-1">
          AP • <Bi te="ఆంధ్రప్రదేశ్" en="Andhra Pradesh" />
        </span>
      </div>

      {/* 3 Essential Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* 1. Water Card */}
        <div
          onClick={() => navigate('water-hub')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && navigate('water-hub')}
          className="bg-white rounded-2xl border border-slate-200 border-l-4 border-l-blue-600 p-4 shadow-2xs hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between gap-3"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                <Droplets className="w-6 h-6" />
              </div>
              <div>
                <span className="inline-block text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md mb-1">
                  <Bi te="తాగునీరు" en="Potable Water" />
                </span>
                <BiStack
                  te="నీరు"
                  en="Water"
                  teClass="text-lg font-extrabold text-slate-900"
                  enClass="text-sm font-bold text-slate-700"
                />
              </div>
            </div>
          </div>

          <BiStack
            te="సమయాలు, నాణ్యత & సమస్యలు"
            en="Timings, quality & reports"
            teClass="text-xs font-semibold text-slate-700"
            enClass="text-xs text-slate-500"
          />

          <div className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 flex items-center justify-between text-xs font-bold text-slate-800">
            <Bi te="వివరాలు చూడండి" en="View Schedule" />
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </div>
        </div>

        {/* 2. Health Card */}
        <div
          onClick={() => navigate('health-hub')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && navigate('health-hub')}
          className="bg-white rounded-2xl border border-slate-200 border-l-4 border-l-red-600 p-4 shadow-2xs hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between gap-3"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100">
                <Hospital className="w-6 h-6" />
              </div>
              <div>
                <span className="inline-block text-[11px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-md mb-1">
                  <Bi te="ప్రాథమిక కేంద్రం" en="PHC Clinic" />
                </span>
                <BiStack
                  te="ఆరోగ్యం"
                  en="Health"
                  teClass="text-lg font-extrabold text-slate-900"
                  enClass="text-sm font-bold text-slate-700"
                />
              </div>
            </div>
          </div>

          <BiStack
            te="డాక్టర్ సంప్రదింపులు, మందులు"
            en="Doctor consult & medicines"
            teClass="text-xs font-semibold text-slate-700"
            enClass="text-xs text-slate-500"
          />

          <div className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 flex items-center justify-between text-xs font-bold text-slate-800">
            <Bi te="వైద్యుల జాబితా" en="Clinic Hours" />
            <ArrowRight className="w-4 h-4 text-red-600" />
          </div>
        </div>

        {/* 3. Schemes Card */}
        <div
          onClick={() => navigate('schemes-hub')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && navigate('schemes-hub')}
          className="bg-white rounded-2xl border border-slate-200 border-l-4 border-l-[#1B6B2F] p-4 shadow-2xs hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between gap-3"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#1B6B2F] flex items-center justify-center shrink-0 border border-emerald-100">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <span className="inline-block text-[11px] font-bold text-[#1B6B2F] bg-emerald-50 px-2 py-0.5 rounded-md mb-1">
                  <Bi te="ప్రభుత్వ సేవలు" en="Welfare" />
                </span>
                <BiStack
                  te="పథకాలు"
                  en="Schemes"
                  teClass="text-lg font-extrabold text-slate-900"
                  enClass="text-sm font-bold text-slate-700"
                />
              </div>
            </div>
          </div>

          <BiStack
            te="రైతు భరోసా, పెన్షన్ & రేషన్ కార్డు"
            en="Farmer & welfare benefits"
            teClass="text-xs font-semibold text-slate-700"
            enClass="text-xs text-slate-500"
          />

          <div className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 flex items-center justify-between text-xs font-bold text-slate-800">
            <Bi te="దరఖాస్తు & అర్హతలు" en="Check Status" />
            <ArrowRight className="w-4 h-4 text-[#1B6B2F]" />
          </div>
        </div>
      </div>

      {/* Report a Problem Red CTA */}
      <button
        type="button"
        onClick={() => navigate('report-water')}
        className="w-full bg-[#C62828] hover:bg-[#B71C1C] text-white rounded-2xl px-5 py-4 flex items-center justify-between gap-3 shadow-sm cursor-pointer transition-colors"
      >
        <div className="flex items-center gap-3 text-left">
          <AlertTriangle className="w-6 h-6 shrink-0" />
          <BiStack
            te="సమస్యను తెలపండి"
            en="Report a Problem / Grievance"
            teClass="text-base font-extrabold text-white"
            enClass="text-xs font-medium text-red-100"
          />
        </div>
        <Megaphone className="w-5 h-5 shrink-0" />
      </button>

      {/* Grama Sabha / Notice Row */}
      <button
        type="button"
        onClick={() => navigate('scheme-alerts')}
        className="w-full bg-white border border-slate-200 rounded-2xl p-3.5 flex items-center gap-3 text-left hover:bg-slate-50 cursor-pointer"
      >
        <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
          <Bell className="w-4 h-4" />
        </div>
        <div className="min-w-0 flex-1">
          <BiStack
            te="గ్రామ సభ సమావేశం: ఈ శనివారం"
            en="Grama Sabha meeting this Saturday at Panchayat Office"
            teClass="text-xs sm:text-sm font-bold text-slate-900"
            enClass="text-xs text-slate-500 truncate"
          />
        </div>
        <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
      </button>

      {/* Emergency 108 quick reminder */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-3.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <ShieldAlert className="w-5 h-5 text-red-700 shrink-0" />
          <BiStack
            te="అత్యవసర పరిస్థితుల్లో వెంటనే 108 కి కాల్ చేయండి"
            en="For medical emergencies, always call 108"
            teClass="text-xs font-bold text-red-900"
            enClass="text-[11px] text-red-700"
          />
        </div>
        <button
          type="button"
          onClick={() =>
            openCallModal({
              title: SAMPLE_CONTACTS.emergency108.name,
              phone: SAMPLE_CONTACTS.emergency108.phone,
              note: SAMPLE_CONTACTS.emergency108.note,
              isEmergency: true,
            })
          }
          className="px-3 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs font-extrabold shrink-0 cursor-pointer flex items-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>108</span>
        </button>
      </div>

      {/* Admin Login Footer Button */}
      <div className="flex justify-center pt-1">
        <button
          type="button"
          onClick={() => navigate(isAdminLoggedIn ? 'admin-dashboard' : 'admin-login')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-2xs cursor-pointer"
        >
          <Lock className="w-3.5 h-3.5 text-amber-600" />
          <Bi te="అధికారి ప్రవేశం" en={isAdminLoggedIn ? 'Admin Dashboard' : 'Admin Login'} />
        </button>
      </div>
    </div>
  );
};

export const HelpPage: React.FC = () => {
  const { navigate, openCallModal } = useApp();

  const helplines = [
    {
      ...SAMPLE_CONTACTS.emergency108,
      isEmergency: true,
      color: 'bg-red-50 border-red-200',
      btn: 'bg-red-700 hover:bg-red-800 text-white',
    },
    {
      ...SAMPLE_CONTACTS.phc104,
      isEmergency: false,
      color: 'bg-white border-slate-200',
      btn: 'bg-[#1B6B2F] hover:bg-[#155724] text-white',
    },
    {
      ...SAMPLE_CONTACTS.sachivalayam,
      isEmergency: false,
      color: 'bg-white border-slate-200',
      btn: 'bg-[#1D4ED8] hover:bg-blue-800 text-white',
    },
    {
      ...SAMPLE_CONTACTS.waterLineman,
      isEmergency: false,
      color: 'bg-white border-slate-200',
      btn: 'bg-slate-800 hover:bg-slate-900 text-white',
    },
  ];

  return (
    <div className="space-y-4 pb-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-emerald-100 text-[#1B6B2F] flex items-center justify-center shrink-0">
            <Headphones className="w-5 h-5" />
          </div>
          <BiStack
            te="కాంతేరు గ్రామ సహాయ కేంద్రం"
            en="Kantheru Village Helplines & Assistants"
            teClass="text-base font-extrabold text-slate-900"
            enClass="text-xs text-slate-500"
          />
        </div>
        <ListenButton
          te="కాంతేరు గ్రామ సహాయ కేంద్రం. అత్యవసరమైతే 108 కి కాల్ చేయండి."
          en="Kantheru Village Helplines. Call 108 for emergencies."
          compact
        />
      </div>

      {/* Helpline Cards */}
      <div className="space-y-3">
        {helplines.map((item, i) => (
          <div
            key={i}
            className={`rounded-2xl border p-4 flex items-center justify-between gap-3 ${item.color}`}
          >
            <div className="space-y-1 min-w-0">
              <BiStack
                te={item.name.te}
                en={item.name.en}
                teClass="text-sm font-extrabold text-slate-900"
                enClass="text-xs text-slate-600"
              />
              <div className="text-xs font-bold text-slate-700 tabular-nums">{item.phone}</div>
            </div>
            <button
              type="button"
              onClick={() =>
                openCallModal({
                  title: item.name,
                  phone: item.phone,
                  note: item.note,
                  isEmergency: item.isEmergency,
                })
              }
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shrink-0 cursor-pointer ${item.btn}`}
            >
              <Phone className="w-3.5 h-3.5" />
              <Bi te="కాల్" en="Call" />
            </button>
          </div>
        ))}
      </div>

      {/* Assistant shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <button
          type="button"
          onClick={() => navigate('health-assistant')}
          className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-3 text-left hover:bg-slate-50 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <BiStack
            te="ఆరోగ్య సహాయకుడు"
            en="Open Health Assistant"
            teClass="text-sm font-extrabold text-slate-900"
            enClass="text-xs text-slate-500"
          />
        </button>

        <button
          type="button"
          onClick={() => navigate('scheme-assistant')}
          className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-3 text-left hover:bg-slate-50 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1B6B2F] flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <BiStack
            te="పథకాల సహాయకుడు"
            en="Open Scheme Assistant"
            teClass="text-sm font-extrabold text-slate-900"
            enClass="text-xs text-slate-500"
          />
        </button>
      </div>

      <div className="bg-slate-100 border border-slate-200 rounded-2xl p-3.5 flex items-center gap-3 text-xs text-slate-700">
        <Building2 className="w-5 h-5 text-slate-600 shrink-0" />
        <Bi
          te="గమనిక: అన్ని ఫోన్ నంబర్లు నమూనా (SAMPLE). సందేహాల కోసం గ్రామ సచివాలయంలో సంప్రదించండి."
          en="Note: All contact numbers are SAMPLE. Please confirm official details at Kantheru Panchayat Office."
        />
      </div>
    </div>
  );
};
