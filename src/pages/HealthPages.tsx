import React, { useState } from 'react';
import {
  AlertTriangle,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  FileUp,
  MapPin,
  MessageSquare,
  Mic,
  Minus,
  Phone,
  Pill,
  Plus,
  Search,
  Send,
  ShieldAlert,
  Stethoscope,
  Truck,
  Video,
} from 'lucide-react';
import { Bi, BiStack, ListenButton, SafeImage } from '../components/CommonUI';
import { useApp } from '../context/AppContext';
import { useSpeechInput } from '../hooks/useSpeechInput';
import {
  ASSETS,
  ChatQA,
  CONSULT_SYMPTOMS,
  HEALTH_CHAT_QA,
  SAMPLE_CONTACTS,
  SAMPLE_DOCTOR,
} from '../data/villageData';

export const HealthHubPage: React.FC = () => {
  const { navigate, medicines, lastMedicineUpdated, openCallModal } = useApp();
  const [search, setSearch] = useState('');

  const filteredMeds = medicines.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.purpose.te.includes(search) ||
      m.purpose.en.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 pb-6">
      {/* Top PHC Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-full bg-emerald-100 text-[#1B6B2F] flex items-center justify-center shrink-0">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full mb-1">
                ● <Bi te="ఓపెన్ ఉంది" en="Open Now" />
              </span>
              <BiStack
                te="కాంతేరు ప్రాథమిక ఆరోగ్య కేంద్రం"
                en="Kantheru Primary Health Centre (PHC)"
                teClass="text-base font-extrabold text-slate-900"
                enClass="text-xs text-slate-600"
              />
            </div>
          </div>
          <ListenButton
            te="కాంతేరు ప్రాథమిక ఆరోగ్య కేంద్రం ఉదయం 8 నుండి సాయంత్రం 5 వరకు తెరిచి ఉంటుంది. డాక్టర్ సంప్రదింపులు మరియు మందుల ఆర్డర్ అందుబాటులో ఉన్నాయి."
            en="Kantheru Primary Health Centre is open from 8 AM to 5 PM. Doctor consultation and medicine ordering are available."
            compact
          />
        </div>

        <div className="relative rounded-xl overflow-hidden h-36 sm:h-44 border border-slate-200">
          <SafeImage
            src={ASSETS.phcClinic}
            alt="Kantheru Primary Health Centre"
            className="w-full h-full object-cover"
            fallbackTitle={{ te: 'కాంతేరు ప్రాథమిక ఆరోగ్య కేంద్రం', en: 'Kantheru PHC' }}
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3 text-white text-xs font-bold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <Bi te="ఉదయం 8:00 - సాయంత్రం 5:00" en="8:00 AM - 5:00 PM • Morning to Evening" />
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            openCallModal({
              title: SAMPLE_CONTACTS.phc104.name,
              phone: SAMPLE_CONTACTS.phc104.phone,
              note: SAMPLE_CONTACTS.phc104.note,
            })
          }
          className="w-full bg-[#1B6B2F] hover:bg-[#155724] text-white rounded-xl py-3 px-4 font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <Phone className="w-4 h-4" />
          <Bi te="ఆరోగ్య కేంద్రానికి కాల్ చేయండి (104 SAMPLE)" en="Call Health Centre (104 SAMPLE)" />
        </button>
      </div>

      {/* 3 Primary Health Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Consult a Doctor */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <Stethoscope className="w-5 h-5" />
            </div>
            <BiStack
              te="డాక్టర్ సంప్రదింపులు"
              en="Consult a Doctor"
              teClass="text-base font-extrabold text-slate-900"
              enClass="text-xs font-semibold text-slate-600"
            />
          </div>
          <div className="bg-slate-50 rounded-xl p-2.5 text-xs text-slate-600 font-medium">
            <Bi te="వీడియో కాల్ లేదా క్లినిక్ సందర్శన" en="Video call or clinic visit" />
          </div>
          <button
            type="button"
            onClick={() => navigate('consult-doctor')}
            className="w-full bg-[#1E4E79] hover:bg-[#163B5C] text-white rounded-xl py-3 px-4 text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <Bi te="బుకింగ్ ప్రారంభించండి" en="Book Now" />
          </button>
        </div>

        {/* Order Medicines */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#1B6B2F] flex items-center justify-center shrink-0">
              <Pill className="w-5 h-5" />
            </div>
            <BiStack
              te="మందులు ఆర్డర్ చేయండి"
              en="Order Medicines"
              teClass="text-base font-extrabold text-slate-900"
              enClass="text-xs font-semibold text-slate-600"
            />
          </div>
          <div className="bg-slate-50 rounded-xl p-2.5 text-xs text-slate-600 font-medium">
            <Bi te="ఇంటికే ఉచిత డెలివరీ" en="Home delivery to your doorstep" />
          </div>
          <button
            type="button"
            onClick={() => navigate('order-medicines')}
            className="w-full bg-[#1B6B2F] hover:bg-[#155724] text-white rounded-xl py-3 px-4 text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer"
          >
            <Truck className="w-4 h-4" />
            <Bi te="మందుల ఆర్డర్" en="Order Now" />
          </button>
        </div>

        {/* Ask Health Assistant */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <BiStack
              te="ఆరోగ్య సహాయకుడిని అడగండి"
              en="Ask Health Assistant"
              teClass="text-base font-extrabold text-slate-900"
              enClass="text-xs font-semibold text-slate-600"
            />
          </div>
          <div className="bg-slate-50 rounded-xl p-2.5 text-xs text-slate-600 font-medium">
            <Bi te="తెలుగులో సాధారణ ఆరోగ్య సమాధానాలు" en="General guidance in Telugu & English" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => navigate('health-assistant')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl py-2.5 px-3 text-xs font-extrabold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Mic className="w-3.5 h-3.5 text-[#1B6B2F]" />
              <Bi te="మాట్లాడండి" en="Speak" />
            </button>
            <button
              type="button"
              onClick={() => navigate('health-assistant')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl py-2.5 px-3 text-xs font-extrabold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-blue-700" />
              <Bi te="చాట్" en="Chat" />
            </button>
          </div>
        </div>
      </div>

      {/* Live Medicine Availability & Search */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Pill className="w-4 h-4 text-[#1B6B2F]" />
            <BiStack
              te="మందుల లభ్యత"
              en="Live Medicine Availability & Inventory"
              teClass="text-base font-extrabold text-slate-900"
              enClass="text-xs text-slate-500"
            />
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl px-3 py-2 text-xs text-slate-600 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 shrink-0" />
          <span>
            <Bi te="చివరిగా అప్‌డేట్ చేయబడింది" en="Last updated" />:{' '}
            <strong className="text-slate-800">
              <Bi te={lastMedicineUpdated.te} en={lastMedicineUpdated.en} />
            </strong>
          </span>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="మందు పేరు వెతకండి / Search medicine (Paracetamol, జ్వరం...)"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1B6B2F]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {filteredMeds.map((med) => (
            <div
              key={med.id}
              className={`rounded-xl border p-3 flex items-center justify-between gap-2 ${
                med.available ? 'bg-white border-slate-200' : 'bg-red-50/40 border-red-200'
              }`}
            >
              <div className="min-w-0">
                <div className="text-sm font-extrabold text-slate-900 truncate">{med.name}</div>
                <div className="text-xs text-slate-500">
                  <Bi te={med.purpose.te} en={med.purpose.en} />
                </div>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold shrink-0 ${
                  med.available
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                ●{' '}
                {med.available ? (
                  <Bi te="అందుబాటులో ఉంది" en="Available" />
                ) : (
                  <Bi te="ప్రస్తుతానికి లేదు" en="Not available" />
                )}
              </span>
            </div>
          ))}
          {filteredMeds.length === 0 && (
            <div className="col-span-full text-center text-xs text-slate-500 py-4">
              <Bi te="మందులు కనుగొనబడలేదు" en="No matching medicines found" />
            </div>
          )}
        </div>
      </div>

      {/* Emergency 108 Banner */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-700 text-white flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <BiStack
            te="అత్యవసర ఆంబులెన్స్ • 108"
            en="Emergency Medical Ambulance"
            teClass="text-sm font-extrabold text-red-900"
            enClass="text-xs text-red-700"
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
          className="px-4 py-2.5 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs font-extrabold flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <Phone className="w-3.5 h-3.5" />
          <Bi te="కాల్ 108" en="Call 108" />
        </button>
      </div>
    </div>
  );
};

export const ConsultDoctorPage: React.FC = () => {
  const { addConsultation, navigate, openCallModal } = useApp();

  const [mode, setMode] = useState<'online' | 'clinic'>('online');
  const [patientName, setPatientName] = useState<string>('');
  const [age, setAge] = useState<number>(42);
  const [temp, setTemp] = useState<number>(100.4);
  const [feverDays, setFeverDays] = useState<number>(2);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(['Cough', 'Headache', 'Body pain']);
  const [allergies, setAllergies] = useState<string>('');

  const toggleSymptom = (symEn: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symEn) ? prev.filter((s) => s !== symEn) : [...prev, symEn]
    );
  };

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    const displayName = patientName.trim() || 'గ్రామస్థుడు / Villager (SAMPLE)';
    addConsultation({
      patientName: { te: displayName, en: displayName },
      mode,
      age,
      temp: `${temp.toFixed(1)}°F`,
      feverDays,
      symptoms: selectedSymptoms,
      allergies: allergies.trim() || 'None',
    });
    navigate('consult-confirmed');
  };

  return (
    <form onSubmit={handleBook} className="space-y-4 pb-6">
      {/* Emergency 108 Card at Top */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2.5">
            <ShieldAlert className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
            <BiStack
              te="అత్యవసర పరిస్థితి?"
              en="Emergency? Call immediately for help"
              teClass="text-base font-extrabold text-red-900"
              enClass="text-xs font-semibold text-red-800"
            />
          </div>
          <ListenButton
            te="శ్వాస తీసుకోవడంలో ఇబ్బంది, మూర్ఛ, తలతిరగడం లేదా తీవ్ర రక్తస్రావం ఉంటే వెంటనే 108 కి కాల్ చేయండి."
            en="If you have breathing trouble, fits, confusion, or heavy bleeding, call 108 immediately."
            compact
          />
        </div>
        <p className="text-xs text-red-900 font-medium">
          <Bi
            te="శ్వాస తీసుకోవడంలో ఇబ్బంది, ఫిట్స్, తలతిరగడం, తీవ్ర రక్తస్రావం"
            en="Breathing trouble, fits, confusion, heavy bleeding."
          />
        </p>
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
          className="w-full bg-red-700 hover:bg-red-800 text-white rounded-xl py-3 px-4 font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <Phone className="w-4 h-4" />
          <Bi te="వెంటనే 108 కి కాల్ చేయండి" en="Call 108 Now" />
        </button>
      </div>

      {/* Step 1: Consultation Type */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-slate-500">STEP 1 • దశ 1</div>
            <BiStack
              te="సంప్రదింపు రకం"
              en="Consultation Type"
              teClass="text-base font-extrabold text-slate-900"
              enClass="text-xs text-slate-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setMode('online')}
            className={`rounded-2xl border p-4 text-left flex items-start justify-between gap-3 cursor-pointer ${
              mode === 'online'
                ? 'bg-emerald-50/70 border-[#1B6B2F] ring-2 ring-[#1B6B2F]/20'
                : 'bg-white border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <BiStack
                  te="ఆన్‌లైన్ సంప్రదింపులు"
                  en="Online consultation"
                  teClass="text-sm font-extrabold text-slate-900"
                  enClass="text-xs font-bold text-slate-700"
                />
                <div className="text-[11px] text-slate-500 mt-1">
                  <Bi te="తేలికపాటి సమస్యలు, వీడియో కాల్" en="Mild problems, video call" />
                </div>
              </div>
            </div>
            <span
              className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                mode === 'online' ? 'bg-[#1B6B2F] border-[#1B6B2F] text-white' : 'border-slate-300'
              }`}
            >
              {mode === 'online' && <Check className="w-3 h-3" />}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMode('clinic')}
            className={`rounded-2xl border p-4 text-left flex items-start justify-between gap-3 cursor-pointer ${
              mode === 'clinic'
                ? 'bg-emerald-50/70 border-[#1B6B2F] ring-2 ring-[#1B6B2F]/20'
                : 'bg-white border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1B6B2F] flex items-center justify-center shrink-0">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <BiStack
                  te="క్లినిక్ సందర్శన"
                  en="Clinic visit"
                  teClass="text-sm font-extrabold text-slate-900"
                  enClass="text-xs font-bold text-slate-700"
                />
                <div className="text-[11px] text-slate-500 mt-1">
                  <Bi te="ప్రత్యక్ష తనిఖీ మరియు చికిత్స" en="Proper checking and treatment" />
                </div>
              </div>
            </div>
            <span
              className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                mode === 'clinic' ? 'bg-[#1B6B2F] border-[#1B6B2F] text-white' : 'border-slate-300'
              }`}
            >
              {mode === 'clinic' && <Check className="w-3 h-3" />}
            </span>
          </button>
        </div>
      </div>

      {/* Step 2: Patient Form */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-4">
        <div>
          <div className="text-[11px] font-bold text-slate-500">STEP 2 • వివరాలు</div>
          <BiStack
            te="వైద్యుడికి చెప్పండి"
            en="Tell the doctor"
            teClass="text-base font-extrabold text-slate-900"
            enClass="text-xs text-slate-500"
          />
        </div>

        {/* Optional Patient Name */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 block">
            <Bi te="రోగి పేరు (ఐచ్ఛికం)" en="Patient Name (Optional)" />
          </label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="ఉదా: రమేష్ బాబు / Ramesh Babu"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1B6B2F]"
          />
        </div>

        {/* Steppers: Age, Temp, Fever Days */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Age */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
            <div className="text-xs font-bold text-slate-700 text-center">
              <Bi te="వయస్సు" en="Age" />
            </div>
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setAge((a) => Math.max(1, a - 1))}
                className="w-9 h-9 rounded-full bg-white border border-slate-300 flex items-center justify-center text-slate-800 font-bold cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-xl font-extrabold text-slate-900 tabular-nums">{age}</span>
              <button
                type="button"
                onClick={() => setAge((a) => Math.min(110, a + 1))}
                className="w-9 h-9 rounded-full bg-white border border-slate-300 flex items-center justify-center text-slate-800 font-bold cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Temperature */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
            <div className="text-xs font-bold text-slate-700 text-center">
              <Bi te="శరీర ఉష్ణోగ్రత" en="Temp (°F)" />
            </div>
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setTemp((t) => Math.max(96, Number((t - 0.5).toFixed(1))))}
                className="w-9 h-9 rounded-full bg-white border border-slate-300 flex items-center justify-center text-slate-800 font-bold cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-xl font-extrabold text-red-700 tabular-nums">
                {temp.toFixed(1)}°F
              </span>
              <button
                type="button"
                onClick={() => setTemp((t) => Math.min(106, Number((t + 0.5).toFixed(1))))}
                className="w-9 h-9 rounded-full bg-white border border-slate-300 flex items-center justify-center text-slate-800 font-bold cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Fever Days */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
            <div className="text-xs font-bold text-slate-700 text-center">
              <Bi te="జ్వరం రోజులు" en="Days of fever" />
            </div>
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setFeverDays((d) => Math.max(0, d - 1))}
                className="w-9 h-9 rounded-full bg-white border border-slate-300 flex items-center justify-center text-slate-800 font-bold cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-xl font-extrabold text-slate-900 tabular-nums">
                {feverDays} <span className="text-xs font-semibold">{feverDays === 1 ? 'day' : 'days'}</span>
              </span>
              <button
                type="button"
                onClick={() => setFeverDays((d) => Math.min(30, d + 1))}
                className="w-9 h-9 rounded-full bg-white border border-slate-300 flex items-center justify-center text-slate-800 font-bold cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Symptoms */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold text-slate-900">
              <Bi te="లక్షణాలు ఎంచుకోండి" en="Select Symptoms" />
            </span>
            <span className="text-slate-500 font-semibold tabular-nums">
              {selectedSymptoms.length} <Bi te="ఎంచుకున్నారు" en="selected" />
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {CONSULT_SYMPTOMS.map((sym) => {
              const active = selectedSymptoms.includes(sym.en);
              return (
                <button
                  key={sym.en}
                  type="button"
                  onClick={() => toggleSymptom(sym.en)}
                  className={`px-3.5 py-2 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#1B6B2F] border-[#1B6B2F] text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {active ? '✓ ' : '+ '}
                  <Bi te={sym.te} en={sym.en} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Allergies */}
        <div className="space-y-1.5">
          <label className="text-xs font-extrabold text-slate-900 block">
            ⚠ <Bi te="ఎలర్జీలు లేదా పడని మందులు" en="Allergies" />
          </label>
          <input
            type="text"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            placeholder="ఉదా: పెన్సిలిన్, సల్ఫా మందులు (ఏమీ లేవు) / e.g. Penicillin or None"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1B6B2F]"
          />
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-900 font-medium">
          <Bi
            te="కాల్‌కు ముందు ఆశా కార్యకర్త లేదా హెల్త్ వర్కర్ ఉష్ణోగ్రత చూడటంలో సహాయం చేస్తారు."
            en="A village health worker (ASHA) can help you measure temperature before the call."
          />
        </div>
      </div>

      {/* Duty Doctor Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-500 uppercase">
            DUTY DOCTOR • <Bi te="అందుబాటులో ఉన్న డాక్టర్" en="Available" />
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
            ● <Bi te="ఆన్‌లైన్‌లో ఉన్నారు" en="Online" />
          </span>
        </div>

        <div className="flex items-center gap-3">
          <SafeImage
            src={ASSETS.doctorPortrait}
            alt="Doctor Portrait"
            className="w-14 h-14 rounded-full object-cover border border-slate-200 shrink-0"
            fallbackTitle={{ te: 'డాక్టర్', en: 'Doctor' }}
          />
          <div>
            <div className="text-sm sm:text-base font-extrabold text-slate-900">
              <Bi te={SAMPLE_DOCTOR.name.te} en={SAMPLE_DOCTOR.name.en} />
            </div>
            <div className="text-xs text-slate-600 font-semibold">
              Reg No: {SAMPLE_DOCTOR.regNo}
            </div>
            <div className="text-xs text-slate-500">
              <Bi te={SAMPLE_DOCTOR.clinic.te} en={SAMPLE_DOCTOR.clinic.en} />
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#1B6B2F]" />
          <Bi te={SAMPLE_DOCTOR.hours.te} en={SAMPLE_DOCTOR.hours.en} />
        </div>
      </div>

      {/* Submit Book Button */}
      <button
        type="submit"
        className="w-full bg-[#1B6B2F] hover:bg-[#155724] text-white rounded-2xl py-4 px-5 font-extrabold text-base flex items-center justify-between gap-3 shadow-sm cursor-pointer"
      >
        <span className="flex items-center gap-2.5">
          <Calendar className="w-5 h-5" />
          <Bi te="బుక్ చేయండి" en="Book Consultation" />
        </span>
        <span className="text-xs font-semibold bg-white/15 px-3 py-1 rounded-full">
          <Bi te="ఉచిత సంప్రదింపు" en="Free Service" />
        </span>
      </button>

      <div className="text-center text-xs text-slate-500">
        <Bi
          te="2 రోజుల్లో తగ్గకపోతే, వెంటనే క్లినిక్ సందర్శన బుక్ చేసుకోండి."
          en="If you don't feel better in 2 days, book a clinic visit."
        />
      </div>
    </form>
  );
};

export const ConsultConfirmedPage: React.FC = () => {
  const { latestBooking, navigate, openCallModal } = useApp();
  const isOnline = (latestBooking?.mode || 'online') === 'online';

  return (
    <div className="space-y-4 pb-6 pt-2">
      <div className="bg-white rounded-2xl border border-slate-200 p-5 text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-[#1B6B2F] text-white flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <div className="flex justify-center">
          <ListenButton
            te="మీ సంప్రదింపు నిర్ధారించబడింది. డాక్టర్ రాధిక ఈరోజు ఉదయం 11:30 గంటలకు అందుబాటులో ఉంటారు."
            en="Your consultation is booked successfully with Dr. K. Radhika at 11:30 AM today."
          />
        </div>
        <BiStack
          te="మీ సంప్రదింపు నిర్ధారించబడింది"
          en="Your consultation is booked successfully"
          teClass="text-xl font-extrabold text-slate-900"
          enClass="text-sm text-slate-600 font-medium"
        />

        {/* Doctor & Appointment Summary */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-3 mt-2">
          <div className="flex items-center gap-3">
            <SafeImage
              src={ASSETS.doctorPortrait}
              alt="Doctor"
              className="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0"
              fallbackTitle={{ te: 'డాక్టర్', en: 'Doctor' }}
            />
            <div>
              <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold mb-0.5">
                {isOnline ? (
                  <Bi te="వీడియో సంప్రదింపు" en="Video Consultation" />
                ) : (
                  <Bi te="క్లినిక్ సందర్శన" en="Clinic Visit" />
                )}
              </span>
              <div className="text-sm font-extrabold text-slate-900">
                <Bi te={SAMPLE_DOCTOR.name.te} en={SAMPLE_DOCTOR.name.en} />
              </div>
              <div className="text-[11px] text-slate-500">Reg No: {SAMPLE_DOCTOR.regNo}</div>
            </div>
          </div>

          <div className="space-y-2 border-t border-slate-200 pt-3 text-xs">
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-blue-700 shrink-0" />
              <div>
                <div className="text-slate-500">
                  <Bi te="సమయం" en="Time Scheduled" />
                </div>
                <div className="font-extrabold text-slate-900">
                  <Bi te="ఈరోజు ఉదయం 11:30 AM" en="Today at 11:30 AM" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#1B6B2F] shrink-0" />
              <div>
                <div className="text-slate-500">
                  <Bi te="కేంద్రం" en="Location" />
                </div>
                <div className="font-extrabold text-slate-900">
                  <Bi te="కాంతేరు పీహెచ్‌సీ టెలి-క్లినిక్" en="Kantheru PHC Tele-clinic (Room No. 3)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2.5">
        <BiStack
          te="కాల్‌కు ముందు సిద్ధం చేసుకోండి"
          en="Checklist before starting your call"
          teClass="text-sm font-extrabold text-slate-900"
          enClass="text-xs text-slate-500"
        />
        {[
          {
            te: 'థర్మామీటర్ రీడింగ్ సిద్ధంగా ఉంచుకోండి',
            en: 'Keep thermometer reading & blood pressure note ready',
          },
          {
            te: 'పాత ప్రిస్క్రిప్షన్లు సిద్ధంగా ఉంచండి',
            en: 'Keep your old medical prescriptions & lab reports ready',
          },
          {
            te: 'సరైన నెట్‌వర్క్ ఉన్న నిశ్శబ్ద ప్రదేశంలో ఉండండి',
            en: 'Stay in a well-lit, quiet place with good phone network',
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-2"
          >
            <BiStack
              te={item.te}
              en={item.en}
              teClass="text-xs font-extrabold text-slate-900"
              enClass="text-[11px] text-slate-500"
            />
            <CheckCircle2 className="w-5 h-5 text-[#1B6B2F] shrink-0" />
          </div>
        ))}
      </div>

      {/* Emergency 108 */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center justify-between gap-3">
        <BiStack
          te="లక్షణాలు తీవ్రమైతే వెంటనే 108 కి కాల్ చేయండి."
          en="If symptoms get worse, call 108 immediately for an ambulance."
          teClass="text-xs font-extrabold text-red-900"
          enClass="text-[11px] text-red-700"
        />
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
          className="px-4 py-2.5 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs font-extrabold flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>108</span>
        </button>
      </div>

      {/* Actions */}
      <div className="space-y-2.5">
        <button
          type="button"
          onClick={() => navigate('order-medicines')}
          className="w-full bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 rounded-2xl py-3.5 px-4 font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <Pill className="w-4 h-4" />
          <Bi te="మందులు ఆర్డర్ చేయండి" en="Order medicines" />
        </button>

        <button
          type="button"
          onClick={() => navigate('home')}
          className="w-full bg-[#1B6B2F] hover:bg-[#155724] text-white rounded-2xl py-3.5 px-4 font-extrabold text-sm cursor-pointer"
        >
          <Bi te="హోమ్‌కి వెళ్ళండి" en="Back to Home" />
        </button>
      </div>
    </div>
  );
};

export const OrderMedicinesPage: React.FC = () => {
  const { medicines, streets, addMedicineOrder, navigate } = useApp();

  const [search, setSearch] = useState('');
  const { isListening: isSearchingByVoice, toggleListening: toggleSearchVoice } = useSpeechInput(
    (transcript) => {
      setSearch(transcript);
    }
  );
  const [quantities, setQuantities] = useState<Record<string, number>>({
    paracetamol: 1,
    cetirizine: 1,
    ors: 2,
  });
  const [prescriptionFile, setPrescriptionFile] = useState<string>('');
  const [recipientName, setRecipientName] = useState('రమేష్ బాబు / Ramesh Babu');
  const [streetId, setStreetId] = useState(streets[2]?.id || streets[0].id);
  const [phone, setPhone] = useState('98765 43210 (SAMPLE)');
  const [error, setError] = useState('');

  const availableCount = medicines.filter((m) => m.available).length;
  const filtered = medicines.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.purpose.te.includes(search) ||
      m.purpose.en.toLowerCase().includes(search.toLowerCase())
  );

  const changeQty = (id: string, delta: number) => {
    setQuantities((prev) => {
      const next = Math.max(0, (prev[id] || 0) + delta);
      return { ...prev, [id]: next };
    });
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const chosen = medicines.filter((m) => m.available && (quantities[m.id] || 0) > 0);
    if (chosen.length === 0) {
      setError('కనీసం ఒక మందును ఎంచుకోండి / Please select at least one medicine.');
      return;
    }
    if (!recipientName.trim() || !phone.trim()) {
      setError('పేరు మరియు ఫోన్ నంబర్ నమోదు చేయండి / Please enter name and mobile number.');
      return;
    }

    const totalItems = chosen.reduce((sum, m) => sum + (quantities[m.id] || 0), 0);
    addMedicineOrder({
      recipientName: recipientName.trim(),
      streetId,
      phone: phone.trim(),
      itemsSummary: {
        te: `${totalItems} మందులు • హోమ్ డెలివరీ`,
        en: `${totalItems} item(s) • Home Delivery`,
      },
      prescriptionFile: prescriptionFile || undefined,
    });
    navigate('order-confirmed');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pb-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#1B6B2F] flex items-center justify-center shrink-0">
            <Pill className="w-5 h-5" />
          </div>
          <BiStack
            te="గ్రామ ఔషధ సేవ"
            en="Village Pharmacy & Home Delivery • కాంతేరు పీహెచ్‌సీ ద్వారా నేరుగా ఇంటికే మందులు."
            teClass="text-base font-extrabold text-slate-900"
            enClass="text-xs text-slate-500"
          />
        </div>
        <ListenButton
          te="కావలసిన మందుల పరిమాణం ఎంచుకుని, చిరునామా నమోదు చేసి ఆర్డర్ చేయండి."
          en="Select medicine quantities, optionally upload prescription, enter address and place order."
          compact
        />
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="మందు పేరు వెతకండి / Search medicine..."
          className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-12 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1B6B2F]"
        />
        <button
          type="button"
          onClick={toggleSearchVoice}
          className={`w-9 h-9 rounded-lg flex items-center justify-center absolute right-1.5 top-1/2 -translate-y-1/2 cursor-pointer transition-colors ${
            isSearchingByVoice
              ? 'bg-red-600 text-white'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
          aria-label="Speak medicine name"
          title="Speak medicine name in Telugu or English"
        >
          <Mic className="w-4 h-4" />
        </button>
      </div>

      {/* Medicines List */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <BiStack
            te="మందుల జాబితా"
            en="Medicines"
            teClass="text-base font-extrabold text-slate-900"
            enClass="text-xs text-slate-500"
          />
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#1B6B2F] text-xs font-bold tabular-nums">
            {availableCount} <Bi te="అందుబాటులో ఉన్నాయి" en="available" />
          </span>
        </div>

        <div className="space-y-2.5">
          {filtered.map((med) => {
            const qty = quantities[med.id] || 0;
            return (
              <div
                key={med.id}
                className={`bg-white rounded-2xl border p-4 space-y-3 ${
                  med.available ? 'border-slate-200' : 'border-red-200 opacity-75'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        med.available ? 'bg-emerald-50 text-[#1B6B2F]' : 'bg-red-50 text-red-700'
                      }`}
                    >
                      <Pill className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-slate-900">{med.name}</div>
                      <div className="text-xs text-slate-500">
                        {med.dosage} · <Bi te={med.purpose.te} en={med.purpose.en} />
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold shrink-0 ${
                      med.available
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    ●{' '}
                    {med.available ? (
                      <Bi te="అందుబాటులో ఉంది" en="Available" />
                    ) : (
                      <Bi te="ప్రస్తుతానికి లేదు" en="Out of stock" />
                    )}
                  </span>
                </div>

                <div className="bg-slate-50 rounded-xl px-3 py-2 flex items-center justify-between">
                  <div className="text-xs font-semibold text-slate-600">
                    <Bi te="పరిమాణం" en="Qty" />:{' '}
                    <strong className="text-slate-900 tabular-nums">
                      {qty} <Bi te={med.unitLabel.te} en={med.unitLabel.en} />
                    </strong>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={!med.available || qty === 0}
                      onClick={() => changeQty(med.id, -1)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-slate-800 disabled:opacity-40 cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center text-sm font-extrabold tabular-nums">
                      {qty}
                    </span>
                    <button
                      type="button"
                      disabled={!med.available}
                      onClick={() => changeQty(med.id, 1)}
                      className="w-8 h-8 rounded-lg bg-[#1B6B2F] text-white flex items-center justify-center disabled:opacity-40 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Prescription Upload */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2.5">
        <div className="flex items-center justify-between">
          <BiStack
            te="డాక్టర్ ప్రిస్క్రిప్షన్"
            en="Prescription"
            teClass="text-sm font-extrabold text-slate-900"
            enClass="text-xs text-slate-500"
          />
          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold">
            <Bi te="ఐచ్ఛికం" en="Optional" />
          </span>
        </div>

        <label className="w-full rounded-xl border border-dashed border-blue-300 bg-blue-50/50 hover:bg-blue-50 p-3.5 flex items-center justify-center gap-2.5 cursor-pointer text-xs font-bold text-blue-900">
          <FileUp className="w-4 h-4 text-blue-700" />
          <span>
            {prescriptionFile ? (
              <>✓ {prescriptionFile}</>
            ) : (
              <Bi te="ప్రిస్క్రిప్షన్ ఫోటో అప్‌లోడ్ చేయండి" en="Upload prescription photo" />
            )}
          </span>
          <input
            type="file"
            accept="image/*,.pdf"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setPrescriptionFile(file.name);
            }}
          />
        </label>

        <p className="text-[11px] text-red-700 font-medium">
          ⓘ{' '}
          <Bi
            te="కొన్ని మందులకు డాక్టర్ ప్రిస్క్రిప్షన్ తప్పనిసరి."
            en="Some medicines need a doctor's prescription."
          />
        </p>
      </div>

      {/* Delivery Address Form */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#1B6B2F]" />
          <BiStack
            te="డెలివరీ చిరునామా"
            en="Delivery Address"
            teClass="text-sm font-extrabold text-slate-900"
            enClass="text-xs text-slate-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 block">
            <Bi te="పేరు" en="Recipient Name" />
          </label>
          <input
            type="text"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1B6B2F]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 block">
            <Bi te="వీధి" en="Street Name" />
          </label>
          <select
            value={streetId}
            onChange={(e) => setStreetId(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1B6B2F]"
          >
            {streets.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name.te} / {s.name.en}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 block">
            <Bi te="ఫోన్ నంబర్ (SAMPLE)" en="Mobile Number (SAMPLE)" />
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 tabular-nums focus:outline-none focus:ring-2 focus:ring-[#1B6B2F]"
          />
        </div>
      </div>

      {/* Assurance Card */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-950 font-medium space-y-1">
        <div className="font-extrabold text-[#1B6B2F]">
          ✓ <Bi te="నమ్మకమైన గ్రామ సేవ" en="Village Assurance" />
        </div>
        <Bi
          te="కాంతేరు ప్రాథమిక ఆరోగ్య కేంద్రం / భాగస్వామ్య ఫార్మసీ నుండి సరఫరా చేయబడుతుంది."
          en="Delivered directly from Kantheru PHC / partner pharmacy."
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs font-bold text-red-800">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-[#1B6B2F] hover:bg-[#155724] text-white rounded-2xl py-4 px-5 font-extrabold text-base flex items-center justify-center gap-2 shadow-sm cursor-pointer"
      >
        <Truck className="w-5 h-5" />
        <Bi te="ఆర్డర్ చేయండి" en="Place Order" />
      </button>
    </form>
  );
};

export const OrderConfirmedPage: React.FC = () => {
  const { latestOrder, streets, navigate } = useApp();
  const street = streets.find((s) => s.id === latestOrder?.streetId) || streets[0];

  return (
    <div className="space-y-4 pb-6 pt-2">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-[#1B6B2F] text-white flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <BiStack
          te="మీ మందుల ఆర్డర్ నిర్ధారించబడింది"
          en="Your Medicine Order is Confirmed!"
          teClass="text-xl font-extrabold text-slate-900"
          enClass="text-sm text-slate-600 font-semibold"
        />
        <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-extrabold text-[#1B6B2F] tabular-nums">
          Order ID: {latestOrder?.id || '#1045'}
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500">
              <Bi te="పేరు" en="Recipient" />:
            </span>
            <span className="font-bold text-slate-900">{latestOrder?.recipientName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">
              <Bi te="వీధి" en="Street" />:
            </span>
            <span className="font-bold text-slate-900">
              <Bi te={street.name.te} en={street.name.en} />
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">
              <Bi te="వివరాలు" en="Items" />:
            </span>
            <span className="font-bold text-slate-900">
              <Bi
                te={latestOrder?.itemsSummary.te || 'మందులు'}
                en={latestOrder?.itemsSummary.en || 'Medicines'}
              />
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => navigate('home')}
        className="w-full bg-[#1B6B2F] hover:bg-[#155724] text-white rounded-2xl py-4 font-extrabold text-sm cursor-pointer"
      >
        <Bi te="హోమ్‌కి వెళ్ళండి" en="Back to Home" />
      </button>
    </div>
  );
};

interface HealthMessage {
  id: string;
  sender: 'user' | 'bot';
  textTe: string;
  textEn: string;
  qa?: ChatQA;
}

export const HealthAssistantPage: React.FC = () => {
  const { openCallModal } = useApp();
  const [input, setInput] = useState('');
  const { isListening, toggleListening } = useSpeechInput((transcript) => {
    setInput(transcript);
  });
  const [messages, setMessages] = useState<HealthMessage[]>([
    {
      id: 'init-user',
      sender: 'user',
      textTe: HEALTH_CHAT_QA[0].chip.te,
      textEn: HEALTH_CHAT_QA[0].chip.en,
    },
    {
      id: 'init-bot',
      sender: 'bot',
      textTe: HEALTH_CHAT_QA[0].title.te,
      textEn: HEALTH_CHAT_QA[0].title.en,
      qa: HEALTH_CHAT_QA[0],
    },
  ]);

  const askQA = (qa: ChatQA) => {
    const uid = `u-${Date.now()}`;
    const bid = `b-${Date.now() + 1}`;
    setMessages((prev) => [
      ...prev,
      { id: uid, sender: 'user', textTe: qa.chip.te, textEn: qa.chip.en },
      { id: bid, sender: 'bot', textTe: qa.title.te, textEn: qa.title.en, qa },
    ]);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    setInput('');

    const lower = q.toLowerCase();
    const matched =
      HEALTH_CHAT_QA.find((item) => item.keywords.some((kw) => lower.includes(kw))) ||
      HEALTH_CHAT_QA[3];

    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, sender: 'user', textTe: q, textEn: q },
      {
        id: `b-${Date.now() + 1}`,
        sender: 'bot',
        textTe: matched.title.te,
        textEn: matched.title.en,
        qa: matched,
      },
    ]);
  };

  return (
    <div className="space-y-3 pb-6">
      {/* Assistant Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <SafeImage
            src={ASSETS.doctorPortrait}
            alt="Arogya Mitra"
            className="w-11 h-11 rounded-full object-cover border border-emerald-200 shrink-0"
            fallbackTitle={{ te: 'ఆరోగ్య మిత్ర', en: 'Arogya Mitra' }}
          />
          <div>
            <BiStack
              te="ఆరోగ్య మిత్ర (Arogya Mitra)"
              en="ఆన్‌లైన్ • సిద్ధంగా ఉన్నాను (Online)"
              teClass="text-sm font-extrabold text-slate-900"
              enClass="text-xs font-semibold text-emerald-700"
            />
          </div>
        </div>
        <ListenButton
          te="నమస్కారం! నేను ఆరోగ్య మిత్ర. సాధారణ ఆరోగ్య సందేహాలకు సహాయం చేస్తాను. ఇది సాధారణ సమాచారం మాత్రమే, వైద్యుడిని తప్పక కలవండి."
          en="Hello, I am Arogya Mitra. I provide general guidance only and am not a doctor."
          compact
        />
      </div>

      {/* Greeting + Mandatory Safety Disclaimer */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
        <div className="text-[11px] font-bold text-slate-500 uppercase">
          <Bi te="గ్రామ సహాయక్" en="HEALTH ASSISTANT" />
        </div>
        <BiStack
          te="నమస్కారం! చిన్న ఆరోగ్య సందేహాలకు నేను సహాయం చేస్తాను."
          en="Hello! I can help you with minor health queries and general self-care advice."
          teClass="text-base font-extrabold text-slate-900"
          enClass="text-xs text-slate-600"
        />
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-900 font-bold flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
          <Bi
            te="గమనిక: ఇది సాధారణ సమాచారం కోసం మాత్రమే. నేను వైద్యుడిని కాదు. దయచేసి డాక్టర్‌ను కలవండి లేదా పంచాయతీ ఆరోగ్య కేంద్రంలో సంప్రదించండి."
            en="General guidance only. I am not a doctor — please see a doctor or confirm at the PHC / Panchayat office."
          />
        </div>
      </div>

      {/* Quick Questions Chips */}
      <div className="space-y-2">
        <div className="text-xs font-extrabold text-slate-600">
          ⚡ <Bi te="త్వరిత ప్రశ్నలు" en="QUICK QUESTIONS" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {HEALTH_CHAT_QA.map((qa) => (
            <button
              key={qa.id}
              type="button"
              onClick={() => askQA(qa)}
              className="bg-white hover:bg-emerald-50 border border-slate-200 hover:border-[#1B6B2F] rounded-xl px-3.5 py-2.5 text-left flex items-center justify-between gap-2 cursor-pointer transition-colors"
            >
              <BiStack
                te={qa.chip.te}
                en={qa.chip.en}
                teClass="text-xs font-extrabold text-slate-900"
                enClass="text-[11px] text-slate-500"
              />
              <span className="text-[#1B6B2F] font-bold text-sm">›</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Thread */}
      <div className="space-y-3">
        {messages.map((m) =>
          m.sender === 'user' ? (
            <div key={m.id} className="flex justify-end">
              <div className="bg-[#1B6B2F] text-white rounded-2xl rounded-tr-xs px-4 py-3 max-w-[85%] shadow-xs">
                <div className="text-sm font-extrabold">{m.textTe}</div>
                {m.textEn !== m.textTe && (
                  <div className="text-xs text-emerald-100 mt-0.5">{m.textEn}</div>
                )}
              </div>
            </div>
          ) : (
            <div
              key={m.id}
              className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs p-4 space-y-3 shadow-2xs"
            >
              <div className="flex items-center justify-between gap-2">
                <BiStack
                  te={m.textTe}
                  en={m.textEn}
                  teClass="text-sm font-extrabold text-slate-900"
                  enClass="text-xs font-semibold text-slate-500"
                />
                {m.qa && (
                  <ListenButton
                    te={m.qa.steps.map((s) => s.te).join(' ')}
                    en={m.qa.steps.map((s) => s.en).join(' ')}
                    compact
                  />
                )}
              </div>

              {m.qa && (
                <div className="space-y-2">
                  {m.qa.steps.map((st, idx) => (
                    <div
                      key={idx}
                      className={`rounded-xl p-3 flex items-start gap-2.5 border ${
                        idx === m.qa!.steps.length - 1
                          ? 'bg-red-50/70 border-red-200'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-full text-white text-xs font-extrabold flex items-center justify-center shrink-0 ${
                          idx === m.qa!.steps.length - 1 ? 'bg-red-700' : 'bg-[#1B6B2F]'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <BiStack
                        te={st.te}
                        en={st.en}
                        teClass="text-xs sm:text-sm font-bold text-slate-900"
                        enClass="text-xs text-slate-600 mt-0.5"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* PHC Call row inside guidance */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-2">
                <BiStack
                  te="కాంతేరు ప్రభుత్వ ఆరోగ్య కేంద్రం (PHC)"
                  en={`${SAMPLE_DOCTOR.name.en} • 9 AM - 1 PM`}
                  teClass="text-xs font-extrabold text-slate-900"
                  enClass="text-[11px] text-slate-500"
                />
                <button
                  type="button"
                  onClick={() =>
                    openCallModal({
                      title: SAMPLE_CONTACTS.phc104.name,
                      phone: SAMPLE_CONTACTS.phc104.phone,
                      note: SAMPLE_CONTACTS.phc104.note,
                    })
                  }
                  className="px-3 py-1.5 rounded-lg bg-[#1B6B2F] text-white text-xs font-bold flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  <Phone className="w-3 h-3" />
                  <Bi te="కాల్" en="Call" />
                </button>
              </div>
            </div>
          )
        )}
      </div>

      {/* Emergency 108 Bar */}
      <div className="bg-red-700 text-white rounded-2xl p-3.5 flex items-center justify-between gap-3">
        <BiStack
          te="తీవ్రమైన లక్షణాలు ఉంటే? వెంటనే 108 కి కాల్ చేయండి"
          en="Serious symptoms? Call 108 immediately"
          teClass="text-xs sm:text-sm font-extrabold text-white"
          enClass="text-[11px] text-red-100"
        />
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
          className="px-3.5 py-2 rounded-xl bg-white text-red-800 text-xs font-extrabold flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>108</span>
        </button>
      </div>

      {/* Input Bar */}
      <form
        onSubmit={handleSend}
        className="bg-white border border-slate-200 rounded-2xl p-2 flex items-center gap-2"
      >
        <button
          type="button"
          onClick={toggleListening}
          className={`w-10 h-10 rounded-full text-white flex items-center justify-center shrink-0 cursor-pointer transition-colors ${
            isListening ? 'bg-red-600 animate-pulse' : 'bg-[#1B6B2F] hover:bg-[#155724]'
          }`}
          aria-label="Speak in Telugu"
          title={isListening ? 'Stop listening' : 'Speak in Telugu'}
        >
          <Mic className="w-4 h-4" />
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            isListening
              ? 'వింటున్నాము... తెలుగులో మాట్లాడండి / Listening...'
              : 'మాట్లాడండి లేదా టైప్ చేయండి (తెలుగు / English)...'
          }
          className="flex-1 text-sm text-slate-900 px-2 py-2 focus:outline-none"
        />
        <button
          type="submit"
          className="w-10 h-10 rounded-xl bg-[#1B6B2F] hover:bg-[#155724] text-white flex items-center justify-center shrink-0 cursor-pointer"
          aria-label="Send"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
