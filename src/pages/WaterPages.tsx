import React, { useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Droplets,
  Filter,
  FlaskConical,
  Gauge,
  GraduationCap,
  Landmark,
  Mic,
  Phone,
  Scale,
  Send,
  ShieldCheck,
  Tractor,
  Truck,
  Waves,
} from 'lucide-react';
import { Bi, BiStack, ListenButton, SafeImage } from '../components/CommonUI';
import { useApp } from '../context/AppContext';
import { useSpeechInput } from '../hooks/useSpeechInput';
import {
  ASSETS,
  HIGH_PPM_SOLUTIONS,
  PROBLEM_TYPES,
  SAMPLE_CONTACTS,
  WATER_SAFETY_TIPS,
  WaterProblemType,
} from '../data/villageData';

const StreetIcon: React.FC<{ icon: string; active?: boolean }> = ({ icon, active }) => {
  const cls = `w-5 h-5 ${active ? 'text-[#1B6B2F]' : 'text-slate-600'}`;
  if (icon === 'school') return <GraduationCap className={cls} />;
  if (icon === 'temple') return <Landmark className={cls} />;
  if (icon === 'farm') return <Tractor className={cls} />;
  return <Waves className={cls} />;
};

export const WaterHubPage: React.FC = () => {
  const { navigate, streets, tankLevelPercent, openCallModal } = useApp();
  const nextStreet = streets.find((s) => s.isNext) || streets[0];

  return (
    <div className="space-y-4 pb-6">
      {/* Upcoming Supply Blue Card */}
      <div className="bg-[#E6F0FD] border border-blue-200 rounded-2xl p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center shrink-0">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-blue-800 uppercase tracking-wide">
                <Bi te="రాబోయే సరఫరా" en="UPCOMING" />
              </div>
              <BiStack
                te={`తదుపరి నీటి సరఫరా: ${nextStreet.day.te}`}
                en={`Next supply: ${nextStreet.day.en}, ${nextStreet.timeSlot.en}`}
                teClass="text-base sm:text-lg font-extrabold text-slate-900 leading-snug"
                enClass="text-xs font-semibold text-blue-900 mt-0.5"
              />
            </div>
          </div>
          <ListenButton
            te={`తదుపరి నీటి సరఫరా ${nextStreet.day.te}, ${nextStreet.timeSlot.te}, ${nextStreet.name.te} లో ఉంటుంది.`}
            en={`Next water supply is ${nextStreet.day.en}, ${nextStreet.timeSlot.en} for ${nextStreet.name.en}.`}
            variant="blue"
            compact
          />
        </div>

        {/* Overhead Tank Level */}
        <div className="bg-white/90 border border-blue-100 rounded-xl px-3.5 py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <Gauge className="w-4 h-4 text-blue-700 shrink-0" />
            <div className="text-xs font-semibold text-slate-800 truncate">
              <Bi te="గ్రామ ట్యాంక్ స్థాయి" en="Overhead Tank" /> ·{' '}
              <span className="text-emerald-700 font-bold">
                {tankLevelPercent}% <Bi te="నిండింది (స్వచ్ఛమైన నీరు)" en="Full • Clean Water" />
              </span>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-extrabold tabular-nums shrink-0">
            {tankLevelPercent}%
          </span>
        </div>
      </div>

      {/* Timetable Section */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#1B6B2F]" />
            <BiStack
              te="సరఫరా ప్రణాళిక"
              en="Timetable"
              teClass="text-base font-extrabold text-slate-900"
              enClass="text-xs font-semibold text-slate-500"
            />
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#1B6B2F] text-xs font-bold">
            <Bi te="ఈ వారం" en="This Week" />
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {streets.map((street) => (
            <div
              key={street.id}
              className={`rounded-2xl border p-3.5 flex items-center justify-between gap-3 transition-colors ${
                street.isNext
                  ? 'bg-[#1B6B2F] border-[#1B6B2F] text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    street.isNext ? 'bg-white text-[#1B6B2F]' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <StreetIcon icon={street.icon} active={street.isNext} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-sm sm:text-base truncate">
                      <Bi te={street.name.te} en={street.name.en} />
                    </span>
                    {street.isNext && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-300 text-emerald-950 text-[10px] font-extrabold uppercase">
                        <Bi te="తదుపరి" en="NEXT" />
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className={`text-xs font-extrabold ${street.isNext ? 'text-white' : 'text-slate-900'}`}>
                  <Bi te={street.day.te} en={street.day.en} />
                </div>
                <div
                  className={`text-[11px] font-medium tabular-nums ${
                    street.isNext ? 'text-emerald-100' : 'text-slate-500'
                  }`}
                >
                  <Bi te={street.timeSlot.te} en={street.timeSlot.en} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Water Services Links */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <BiStack
            te="సహాయక సమాచారం"
            en="Water Services"
            teClass="text-base font-extrabold text-slate-900"
            enClass="text-xs font-semibold text-slate-500"
          />
          <span className="text-xs text-slate-500 font-medium">
            <Bi te="3 సేవలు అందుబాటులో ఉన్నాయి" en="3 services available" />
          </span>
        </div>

        <div className="space-y-2.5">
          <button
            type="button"
            onClick={() => navigate('water-quality')}
            className="w-full bg-white border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between gap-3 hover:bg-slate-50 cursor-pointer text-left"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <FlaskConical className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-extrabold text-slate-900">
                    <Bi te="నీటి నాణ్యత పరీక్షించండి" en="Check Water Quality" />
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    TDS: 142 (Safe)
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  <Bi te="PPM రీడింగ్ తనిఖీ చేయండి" en="Check TDS / PPM reading now" />
                </div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
          </button>

          <button
            type="button"
            onClick={() => navigate('water-safety')}
            className="w-full bg-white border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between gap-3 hover:bg-slate-50 cursor-pointer text-left"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <BiStack
                  te="నీటి భద్రతా సూచనలు"
                  en="Water Safety Tips • క్లోరినేషన్ & జాగ్రత్తలు"
                  teClass="text-sm font-extrabold text-slate-900"
                  enClass="text-xs text-slate-500 mt-0.5"
                />
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
          </button>

          <button
            type="button"
            onClick={() => navigate('water-fairness')}
            className="w-full bg-white border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between gap-3 hover:bg-slate-50 cursor-pointer text-left"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                <Scale className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <BiStack
                  te="నీటి పంపిణీ సమతుల్యత"
                  en="Water Fairness Board • అందరికీ సమాన నీరు"
                  teClass="text-sm font-extrabold text-slate-900"
                  enClass="text-xs text-slate-500 mt-0.5"
                />
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
          </button>
        </div>
      </div>

      {/* Emergency Tanker Info */}
      <button
        type="button"
        onClick={() =>
          openCallModal({
            title: SAMPLE_CONTACTS.tankerTollFree.name,
            phone: SAMPLE_CONTACTS.tankerTollFree.phone,
            note: SAMPLE_CONTACTS.tankerTollFree.note,
          })
        }
        className="w-full bg-slate-100 border border-slate-200 rounded-2xl p-3.5 flex items-center gap-3 text-left hover:bg-slate-200/70 cursor-pointer"
      >
        <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-slate-700 shrink-0">
          <Truck className="w-4 h-4" />
        </div>
        <div className="min-w-0 flex-1">
          <BiStack
            te="బోరు లేదా ట్యాంకర్ అవసరమా?"
            en={`Emergency Tanker Available: ${SAMPLE_CONTACTS.tankerTollFree.phone}`}
            teClass="text-xs font-extrabold text-slate-900"
            enClass="text-xs text-slate-600 tabular-nums"
          />
        </div>
        <Phone className="w-4 h-4 text-slate-500 shrink-0" />
      </button>

      {/* Primary Action Buttons */}
      <div className="space-y-2.5 pt-1">
        <button
          type="button"
          onClick={() => navigate('report-water', { problemType: 'no-water' })}
          className="w-full bg-[#C62828] hover:bg-[#B71C1C] text-white rounded-2xl p-4 flex items-center gap-3 shadow-sm cursor-pointer text-left"
        >
          <AlertCircle className="w-6 h-6 shrink-0" />
          <BiStack
            te="నీరు రాలేదు"
            en="Water Did Not Come — 1-క్లిక్ ఫిర్యాదు నమోదు చేయండి"
            teClass="text-base font-extrabold text-white"
            enClass="text-xs text-red-100"
          />
        </button>

        <button
          type="button"
          onClick={() =>
            openCallModal({
              title: SAMPLE_CONTACTS.waterLineman.name,
              phone: SAMPLE_CONTACTS.waterLineman.phone,
              note: SAMPLE_CONTACTS.waterLineman.note,
            })
          }
          className="w-full bg-[#1B6B2F] hover:bg-[#155724] text-white rounded-2xl p-4 flex items-center gap-3 shadow-sm cursor-pointer text-left"
        >
          <Phone className="w-6 h-6 shrink-0" />
          <BiStack
            te="నీటి లైన్‌మ్యాన్‌కు కాల్ చేయండి"
            en={`Call Water Lineman (${SAMPLE_CONTACTS.waterLineman.phone})`}
            teClass="text-base font-extrabold text-white"
            enClass="text-xs text-emerald-100 tabular-nums"
          />
        </button>
      </div>
    </div>
  );
};

export const ReportWaterPage: React.FC = () => {
  const { streets, preselectedProblem, preselectedStreetId, addWaterReport, navigate } = useApp();

  const [streetId, setStreetId] = useState<string>(preselectedStreetId || streets[0].id);
  const [problemType, setProblemType] = useState<WaterProblemType>(preselectedProblem || 'no-water');
  const [when, setWhen] = useState<'today' | 'yesterday' | 'other'>('today');
  const [note, setNote] = useState<string>('');
  const { isListening: recording, toggleListening: handleVoiceToggle } = useSpeechInput(
    (transcript) => {
      setNote(transcript);
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addWaterReport({
      streetId,
      problemType,
      when,
      note: note.trim() || undefined,
    });
    navigate('report-confirmed');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pb-6">
      {/* Header Progress Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-800 text-white text-sm font-extrabold flex items-center justify-center shrink-0">
              3
            </div>
            <BiStack
              te="నీటి సమస్య నివేదిక"
              en="Report Water Supply Issue"
              teClass="text-base font-extrabold text-slate-900"
              enClass="text-xs text-slate-500"
            />
          </div>
          <ListenButton
            te="నీటి సమస్య నివేదిక. వీధిని, ఏమి జరిగింది మరియు ఎప్పుడు జరిగింది అనే వివరాలను ఎంచుకోండి."
            en="Report Water Supply Issue. Choose your village street, exact problem, and when it happened."
            compact
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full bg-[#1B6B2F]" />
          <div className="flex-1 h-1.5 rounded-full bg-[#1B6B2F]" />
          <div className="flex-1 h-1.5 rounded-full bg-[#1B6B2F]" />
          <span className="text-xs font-bold text-[#1B6B2F] tabular-nums ml-1">3 / 3</span>
        </div>
      </div>

      {/* Step 1: Choose Street */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[#1B6B2F] text-white text-xs font-extrabold flex items-center justify-center">
            1
          </span>
          <BiStack
            te="వీధిని ఎంచుకోండి"
            en="Choose Village Area / Street"
            teClass="text-sm font-extrabold text-slate-900"
            enClass="text-xs text-slate-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {streets.map((s) => {
            const selected = streetId === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setStreetId(s.id)}
                className={`rounded-2xl border p-3.5 text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                  selected
                    ? 'bg-[#A7F3D0]/50 border-[#1B6B2F] ring-2 ring-[#1B6B2F]/20'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <StreetIcon icon={s.icon} active={selected} />
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                      selected
                        ? 'bg-[#1B6B2F] border-[#1B6B2F] text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {selected && <Check className="w-3 h-3" />}
                  </span>
                </div>
                <BiStack
                  te={s.name.te}
                  en={s.name.en}
                  teClass="text-sm font-extrabold text-slate-900"
                  enClass="text-xs text-slate-600"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Problem Type */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[#1B6B2F] text-white text-xs font-extrabold flex items-center justify-center">
            2
          </span>
          <BiStack
            te="ఏమి జరిగింది?"
            en="What is the exact problem?"
            teClass="text-sm font-extrabold text-slate-900"
            enClass="text-xs text-slate-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {PROBLEM_TYPES.map((p) => {
            const selected = problemType === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setProblemType(p.id)}
                className={`rounded-2xl border p-3.5 text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                  selected
                    ? 'bg-[#A7F3D0]/50 border-[#1B6B2F] ring-2 ring-[#1B6B2F]/20'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      selected ? 'bg-[#1B6B2F] text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Droplets className="w-4 h-4" />
                  </div>
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                      selected
                        ? 'bg-[#1B6B2F] border-[#1B6B2F] text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {selected && <Check className="w-3 h-3" />}
                  </span>
                </div>
                <BiStack
                  te={p.label.te}
                  en={p.label.en}
                  teClass="text-sm font-extrabold text-slate-900"
                  enClass="text-xs text-slate-600"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 3: When */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[#1B6B2F] text-white text-xs font-extrabold flex items-center justify-center">
            3
          </span>
          <BiStack
            te="ఎప్పుడు జరిగింది?"
            en="When did this happen?"
            teClass="text-sm font-extrabold text-slate-900"
            enClass="text-xs text-slate-500"
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'today' as const, te: 'ఈరోజు', en: 'Today' },
            { id: 'yesterday' as const, te: 'నిన్న', en: 'Yesterday' },
            { id: 'other' as const, te: 'మరో రోజు', en: 'Other day' },
          ].map((d) => {
            const active = when === d.id;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setWhen(d.id)}
                className={`rounded-full py-2.5 px-3 border text-center cursor-pointer transition-colors ${
                  active
                    ? 'bg-[#1B6B2F] border-[#1B6B2F] text-white shadow-xs'
                    : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                }`}
              >
                <div className="text-xs font-extrabold">{d.te}</div>
                <div className={`text-[10px] ${active ? 'text-emerald-100' : 'text-slate-500'}`}>
                  {d.en}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Optional Note & Voice */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <BiStack
            te="అదనపు సమాచారం (ఐచ్ఛికం)"
            en="Optional Note / Voice details"
            teClass="text-sm font-extrabold text-slate-900"
            enClass="text-xs text-slate-500"
          />
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
            <Bi te="ఐచ్ఛికం" en="Optional" />
          </span>
        </div>

        <button
          type="button"
          onClick={handleVoiceToggle}
          className={`w-full rounded-xl p-3 flex items-center justify-between gap-3 text-left cursor-pointer transition-colors ${
            recording
              ? 'bg-red-700 text-white'
              : 'bg-[#2B5884] hover:bg-[#1E4469] text-white'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0">
              <Mic className="w-4 h-4" />
            </div>
            <BiStack
              te={recording ? 'వింటున్నాము... మాట్లాడండి' : 'వాయిస్ నోట్ రికార్డ్ చేయండి'}
              en={recording ? 'Listening... Tap to stop' : 'Tap to speak Telugu or English'}
              teClass="text-xs sm:text-sm font-extrabold text-white"
              enClass="text-[11px] text-blue-100"
            />
          </div>
          <span className="text-xs font-bold bg-white/15 px-2.5 py-1 rounded-full">
            {recording ? 'REC' : '🎙️'}
          </span>
        </button>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          placeholder="ఇక్కడ మాట్లాడండి లేదా టైప్ చేయండి (ఐచ్ఛికం)... / Type note here (optional)"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1B6B2F]"
        />
        {note && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setNote('')}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              <Bi te="క్లియర్" en="Clear" />
            </button>
          </div>
        )}
      </div>

      {/* Panchayat Dispatch Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3.5 flex items-start gap-2.5 text-xs text-blue-900">
        <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
        <Bi
          te="మీ ఫిర్యాదు నేరుగా కాంతేరు పంచాయతీ కార్యదర్శికి చేరుతుంది. తగిన చర్యలు తీసుకోబడతాయి."
          en="Your report is sent directly to the Kantheru Panchayat Secretary dashboard for prompt action."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[#1B6B2F] hover:bg-[#155724] text-white rounded-2xl py-4 px-5 flex items-center justify-center gap-3 shadow-sm cursor-pointer"
      >
        <Send className="w-5 h-5" />
        <BiStack
          te="రిపోర్ట్ పంపండి"
          en="Submit Report Now"
          teClass="text-base font-extrabold text-white"
          enClass="text-xs text-emerald-100"
        />
      </button>
    </form>
  );
};

export const ReportConfirmedPage: React.FC = () => {
  const { latestReport, streets, tankerDispatchedStreets, navigate } = useApp();
  const street = streets.find((s) => s.id === latestReport?.streetId) || streets[0];
  const problem =
    PROBLEM_TYPES.find((p) => p.id === latestReport?.problemType) || PROBLEM_TYPES[0];
  const tankerActive = tankerDispatchedStreets.includes(street.id);

  return (
    <div className="space-y-4 pb-6 pt-2">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-[#1B6B2F] text-white flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <BiStack
          te="ధన్యవాదాలు! మీ ఫిర్యాదు నమోదైంది"
          en="Thank You! Your Water Report is Submitted"
          teClass="text-xl font-extrabold text-slate-900"
          enClass="text-sm font-semibold text-slate-600"
        />
        <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-extrabold text-[#1B6B2F] tabular-nums">
          Ticket ID: {latestReport?.id || 'REP-112'}
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left space-y-2 mt-2">
          <div className="flex justify-between text-xs">
            <span className="text-slate-500 font-semibold">
              <Bi te="వీధి" en="Street" />:
            </span>
            <span className="font-bold text-slate-900">
              <Bi te={street.name.te} en={street.name.en} />
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-500 font-semibold">
              <Bi te="సమస్య" en="Issue" />:
            </span>
            <span className="font-bold text-slate-900">
              <Bi te={problem.label.te} en={problem.label.en} />
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-500 font-semibold">
              <Bi te="స్థితి" en="Status" />:
            </span>
            <span className="font-bold text-amber-700">
              <Bi te="అధికారులకు పంపబడింది" en="Sent to Panchayat Secretary" />
            </span>
          </div>
        </div>

        {tankerActive && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-left flex items-start gap-2.5 text-xs text-blue-900">
            <Truck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
            <Bi
              te="ఈ వీధిలో 3 లేదా అంతకంటే ఎక్కువ ఫిర్యాదులు నమోదైనందున ఉచిత వాటర్ ట్యాంకర్ అభ్యర్థన సక్రియమైంది."
              en="3+ reports recorded for this street — automatic free water tanker dispatch is active."
            />
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => navigate('water-fairness')}
        className="w-full bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 rounded-2xl p-4 font-extrabold text-sm flex items-center justify-between cursor-pointer"
      >
        <Bi te="నీటి పంపిణీ సమతుల్యత బోర్డు చూడండి" en="View Water Fairness Board" />
        <ArrowRight className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={() => navigate('home')}
        className="w-full bg-[#1B6B2F] hover:bg-[#155724] text-white rounded-2xl p-4 font-extrabold text-sm cursor-pointer"
      >
        <Bi te="హోమ్‌కి వెళ్ళండి" en="Back to Home" />
      </button>
    </div>
  );
};

interface PpmLevelInfo {
  zone: number;
  label: { te: string; en: string };
  badgeBg: string;
  summary: { te: string; en: string };
  drinking: boolean;
  cooking: boolean;
  washing: boolean;
  farm: boolean;
}

function getPpmDetails(ppm: number): PpmLevelInfo {
  if (ppm < 300) {
    return {
      zone: 1,
      label: { te: 'అద్భుతమైనది', en: 'EXCELLENT' },
      badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      summary: {
        te: 'త్రాగడానికి మరియు వంటకు అత్యుత్తమ సురక్షిత నీరు.',
        en: 'Excellent quality for drinking, cooking, and all household uses.',
      },
      drinking: true,
      cooking: true,
      washing: true,
      farm: true,
    };
  }
  if (ppm <= 600) {
    return {
      zone: 2,
      label: { te: 'మంచిది', en: 'GOOD' },
      badgeBg: 'bg-green-100 text-green-900 border-green-300',
      summary: {
        te: 'త్రాగడానికి సురక్షితమైన నాణ్యత. గృహ అవసరాలకు మంచిది.',
        en: 'Safe quality for drinking and household use.',
      },
      drinking: true,
      cooking: true,
      washing: true,
      farm: true,
    };
  }
  if (ppm <= 900) {
    return {
      zone: 3,
      label: { te: 'మధ్యస్థం', en: 'FAIR' },
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
      summary: {
        te: 'సాధారణ వినియోగానికి పర్వాలేదు. త్రాగడానికి RO నీరు మంచిది.',
        en: 'Acceptable for household use; RO filtered water preferred for daily drinking.',
      },
      drinking: false,
      cooking: true,
      washing: true,
      farm: true,
    };
  }
  if (ppm <= 1200) {
    return {
      zone: 4,
      label: { te: 'తక్కువ నాణ్యత', en: 'POOR' },
      badgeBg: 'bg-orange-100 text-orange-900 border-orange-300',
      summary: {
        te: 'లవణాలు ఎక్కువగా ఉన్నాయి. నేరుగా త్రాగరాదు; బట్టలు/వ్యవసాయానికి మాత్రమే.',
        en: 'High dissolved salts. Not recommended for drinking; suitable for washing & farm use.',
      },
      drinking: false,
      cooking: false,
      washing: true,
      farm: true,
    };
  }
  return {
    zone: 5,
    label: { te: 'తాగరాదు', en: 'NOT SUITABLE' },
    badgeBg: 'bg-red-100 text-red-900 border-red-300',
    summary: {
      te: 'చాలా అధిక లవణాలు! త్రాగడానికి మరియు వంటకు సురక్షితం కాదు. RO నీరు వాడండి.',
      en: 'Unsafe for drinking or cooking due to very high minerals. Use Panchayat RO water.',
    },
    drinking: false,
    cooking: false,
    washing: false,
    farm: true,
  };
}

export const WaterQualityPage: React.FC = () => {
  const { navigate } = useApp();
  const [ppmInput, setPpmInput] = useState<string>('450');
  const [checkedPpm, setCheckedPpm] = useState<number>(450);

  const info = getPpmDetails(checkedPpm);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const val = Math.max(0, Math.min(5000, Number(ppmInput) || 0));
    setCheckedPpm(val);
  };

  const levels = [
    { zone: 1, range: 'Below 300 PPM', te: 'అద్భుతమైనది', en: 'Excellent', dot: 'bg-emerald-400' },
    { zone: 2, range: '300 - 600 PPM', te: 'మంచిది', en: 'Good', dot: 'bg-green-700' },
    { zone: 3, range: '600 - 900 PPM', te: 'మధ్యస్థం', en: 'Fair', dot: 'bg-amber-400' },
    { zone: 4, range: '900 - 1200 PPM', te: 'తక్కువ నాణ్యత', en: 'Poor', dot: 'bg-orange-500' },
    { zone: 5, range: 'Above 1200 PPM', te: 'తాగరాదు', en: 'Not suitable', dot: 'bg-red-700' },
  ];

  const uses = [
    { te: 'త్రాగడానికి', en: 'Drinking', ok: info.drinking },
    { te: 'వంట చేయడానికి', en: 'Cooking', ok: info.cooking },
    { te: 'బట్టలు ఉతకడానికి', en: 'Washing', ok: info.washing },
    { te: 'వ్యవసాయానికి', en: 'Farm Use', ok: info.farm },
  ];

  return (
    <div className="space-y-4 pb-6">
      <div className="flex items-center justify-between gap-2 bg-white rounded-2xl border border-slate-200 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <Droplets className="w-5 h-5" />
          </div>
          <BiStack
            te="నీటి నాణ్యత తనిఖీ"
            en="TDS / PPM Water Quality Check"
            teClass="text-base font-extrabold text-slate-900"
            enClass="text-xs text-slate-500"
          />
        </div>
        <ListenButton
          te={`నీటి నాణ్యత తనిఖీ. ప్రస్తుతం ${checkedPpm} పీపీఎం స్థాయి ${info.label.te}.`}
          en={`Water quality check. ${checkedPpm} PPM is rated ${info.label.en}. Boiling kills germs but does not reduce PPM.`}
          variant="blue"
          compact
        />
      </div>

      {/* PPM Input Card */}
      <form
        onSubmit={handleCheck}
        className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3"
      >
        <BiStack
          te="PPM రీడింగ్ నమోదు చేయండి"
          en="Enter TDS meter PPM number"
          teClass="text-sm font-extrabold text-slate-900"
          enClass="text-xs text-slate-500"
        />

        <div className="relative">
          <input
            type="number"
            min={0}
            max={5000}
            value={ppmInput}
            onChange={(e) => {
              setPpmInput(e.target.value);
              const n = Number(e.target.value);
              if (!Number.isNaN(n) && e.target.value !== '') {
                setCheckedPpm(Math.max(0, Math.min(5000, n)));
              }
            }}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-xl font-extrabold text-slate-900 tabular-nums focus:outline-none focus:ring-2 focus:ring-[#1B6B2F]"
            placeholder="450"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
            PPM
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-[#1B6B2F] hover:bg-[#155724] text-white rounded-xl py-3 font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <CheckCircle2 className="w-4 h-4" />
          <Bi te="తనిఖీ" en="Check" />
        </button>
      </form>

      {/* Result Status Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase">
              <Bi te="ఫలితం" en="RESULT STATUS" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 tabular-nums mt-0.5">
              {checkedPpm} <span className="text-sm font-bold text-slate-600">PPM</span>
            </div>
          </div>
          <div
            className={`px-3 py-1.5 rounded-full border text-xs font-extrabold ${info.badgeBg}`}
          >
            <Bi te={info.label.te} en={info.label.en} />
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm font-semibold text-slate-800">
          <Bi te={info.summary.te} en={info.summary.en} />
        </div>

        {/* 5-Zone Meter */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
            <Bi te="పరిశుభ్రత సూచిక" en="Quality Meter" />
            <span className="tabular-nums">Zone {info.zone} / 5</span>
          </div>
          <div className="grid grid-cols-5 gap-1.5 h-2.5">
            {[
              'bg-emerald-400',
              'bg-green-700',
              'bg-amber-400',
              'bg-orange-500',
              'bg-red-700',
            ].map((color, idx) => (
              <div
                key={idx}
                className={`rounded-full transition-opacity ${color} ${
                  info.zone === idx + 1 ? 'opacity-100 ring-2 ring-slate-900 ring-offset-1' : 'opacity-25'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Level Guide */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2.5">
        <BiStack
          te="PPM స్థాయిల వివరాలు"
          en="PPM Level Guide"
          teClass="text-sm font-extrabold text-slate-900"
          enClass="text-xs text-slate-500"
        />
        <div className="space-y-1.5">
          {levels.map((lv) => {
            const active = info.zone === lv.zone;
            return (
              <div
                key={lv.zone}
                className={`rounded-xl px-3 py-2 flex items-center justify-between text-xs border ${
                  active
                    ? 'bg-emerald-50 border-emerald-300 font-extrabold text-slate-900'
                    : 'bg-slate-50 border-slate-100 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${lv.dot}`} />
                  <span className="tabular-nums font-bold">{lv.range}</span>
                </div>
                <span>
                  <Bi te={lv.te} en={lv.en} />
                  {active ? ' ✓' : ''}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Good For? */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2.5">
        <BiStack
          te="దేనికి మంచిది?"
          en="Good For?"
          teClass="text-sm font-extrabold text-slate-900"
          enClass="text-xs text-slate-500"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {uses.map((u, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 flex items-center justify-between"
            >
              <BiStack
                te={u.te}
                en={u.en}
                teClass="text-xs font-extrabold text-slate-900"
                enClass="text-[11px] text-slate-500"
              />
              <span
                className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold ${
                  u.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {u.ok ? <Bi te="మంచిది ✓" en="Yes ✓" /> : <Bi te="వద్దు ✕" en="Avoid ✕" />}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mandatory Boiling Note */}
      <div className="bg-[#E8F1FC] border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-blue-950 font-semibold leading-relaxed">
          <div className="font-extrabold mb-0.5">
            <Bi te="ముఖ్యమైన గమనిక" en="Important Note" />:
          </div>
          <Bi
            te="నీటిని మరిగించడం వల్ల క్రిములు నశిస్తాయి కానీ PPM (లవణాలు) తగ్గవు."
            en="Boiling kills germs and bacteria, but it does NOT reduce PPM (dissolved salts)."
          />
        </div>
      </div>

      {/* How to improve water */}
      <button
        type="button"
        onClick={() => navigate('water-safety')}
        className="w-full bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-2xl p-4 flex items-center justify-center gap-2 text-sm font-extrabold text-slate-800 cursor-pointer"
      >
        <Filter className="w-4 h-4 text-blue-700" />
        <Bi te="నీటిని ఎలా శుద్ధి చేయాలి" en="How to improve water" />
      </button>
    </div>
  );
};

export const WaterSafetyPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="space-y-4 pb-6">
      {/* Audio Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center justify-between gap-3">
        <BiStack
          te="వినండి / Audio Guide"
          en="ధ్వని రూపంలో సూచనలు వినండి"
          teClass="text-sm font-extrabold text-slate-900"
          enClass="text-xs text-slate-600"
        />
        <ListenButton
          te="సురక్షిత నీటి కోసం 5 జాగ్రత్తలు. నీటిని మూత ఉన్న శుభ్రమైన పాత్రలలో ఉంచండి. మరిగించడం వల్ల క్రిములు నశిస్తాయి కానీ PPM తగ్గదు."
          en="5 precautions for safe drinking water. Store water in clean covered pots. Boiling kills germs but does not reduce PPM."
          variant="blue"
        />
      </div>

      {/* Key Precautions */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <BiStack
            te="ముఖ్య జాగ్రత్తలు"
            en="Key Precautions for Safe Water"
            teClass="text-base font-extrabold text-slate-900"
            enClass="text-xs text-slate-500"
          />
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#1B6B2F] text-xs font-bold">
            <Bi te="5 నియమాలు" en="5 Rules" />
          </span>
        </div>

        <div className="space-y-2.5">
          {WATER_SAFETY_TIPS.map((tip) => (
            <div
              key={tip.num}
              className="bg-white rounded-2xl border border-slate-200 p-4 flex items-start gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#1B6B2F] font-extrabold text-sm flex items-center justify-center shrink-0">
                {tip.num}
              </div>
              <div className="space-y-1">
                <div className="text-[11px] font-bold text-[#1B6B2F]">
                  <Bi te={tip.tag.te} en={tip.tag.en} />
                </div>
                <BiStack
                  te={tip.title.te}
                  en={tip.title.en}
                  teClass="text-sm font-extrabold text-slate-900"
                  enClass="text-xs text-slate-600"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Critical Note */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs sm:text-sm text-red-950 font-semibold">
          <div className="font-extrabold uppercase text-red-800 text-xs">
            <Bi te="గమనిక" en="CRITICAL NOTE" />
          </div>
          <Bi
            te="నీటిని మరిగించడం వల్ల క్రిములు నశిస్తాయి కానీ PPM (లవణాలు) తగ్గవు."
            en="Boiling kills bacterial germs but does NOT reduce dissolved salts / high PPM."
          />
        </div>
      </div>

      {/* How to Reduce High PPM */}
      <div className="space-y-2.5">
        <BiStack
          te="అధిక PPM తగ్గించే మార్గాలు"
          en="How to Reduce High PPM Minerals"
          teClass="text-base font-extrabold text-slate-900"
          enClass="text-xs text-slate-500"
        />
        <div className="space-y-2">
          {HIGH_PPM_SOLUTIONS.map((sol, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-3.5 flex items-start gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                <Filter className="w-4 h-4" />
              </div>
              <BiStack
                te={sol.title.te}
                en={sol.title.en}
                teClass="text-sm font-extrabold text-slate-900"
                enClass="text-xs text-slate-600"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Village Safe Water Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3.5 flex items-center gap-3">
        <SafeImage
          src={ASSETS.waterTanker}
          alt="Kantheru Safe Water"
          className="w-16 h-16 rounded-xl object-cover shrink-0"
          fallbackTitle={{ te: 'రక్షిత నీరు', en: 'Safe Water' }}
        />
        <BiStack
          te="కాంతేరు గ్రామ రక్షిత నీరు"
          en="మన గ్రామంలో 2 శుద్ధి జల కేంద్రాలు ప్రతిరోజూ అందుబాటులో ఉన్నాయి. / 2 purified water centers open daily."
          teClass="text-sm font-extrabold text-slate-900"
          enClass="text-xs text-slate-600"
        />
      </div>

      <button
        type="button"
        onClick={() => navigate('report-water', { problemType: 'dirty-water' })}
        className="w-full bg-[#C62828] hover:bg-[#B71C1C] text-white rounded-2xl p-4 flex items-center justify-between gap-3 cursor-pointer"
      >
        <div className="flex items-center gap-3 text-left">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <BiStack
            te="మురికి నీటి సమస్యను తెలపండి"
            en="Report dirty water - 24-hr resolution"
            teClass="text-sm font-extrabold text-white"
            enClass="text-xs text-red-100"
          />
        </div>
        <ArrowRight className="w-5 h-5 shrink-0" />
      </button>
    </div>
  );
};

export const WaterFairnessPage: React.FC = () => {
  const { streets, waterReports, tankerDispatchedStreets, navigate, openCallModal } = useApp();

  const totalReports = waterReports.length;
  const pressureReports = waterReports.filter((r) => r.problemType === 'low-pressure').length;
  const pressurePct = totalReports > 0 ? Math.round((pressureReports / totalReports) * 100) : 70;

  return (
    <div className="space-y-4 pb-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#1B6B2F] text-[11px] font-extrabold">
            <Bi te="పారదర్శక పర్యవేక్షణ" en="LIVE TRANSPARENCY" />
          </span>
          <ListenButton
            te="గ్రామ నీటి పంపిణీ నివేదిక. 3 లేదా అంతకంటే ఎక్కువ సమస్యలు నమోదైన వీధులకు ఉచిత వాటర్ ట్యాంకర్ పంపబడుతుంది."
            en="Village Water Fairness Board. Streets with 3 or more reports get an automatic free water tanker dispatch."
            compact
          />
        </div>
        <BiStack
          te="గ్రామ నీటి పంపిణీ నివేదిక"
          en="Village Water Fairness Board"
          teClass="text-lg font-extrabold text-slate-900"
          enClass="text-xs text-slate-500"
        />
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Clock className="w-3.5 h-3.5" />
          <Bi te="చివరి నవీకరణ: నేడు" en="Updated: Today" />
        </div>
      </div>

      {/* Fair Rule Blue Banner */}
      <div className="bg-[#E8F1FC] border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-white text-blue-700 flex items-center justify-center shrink-0">
          <Truck className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <div className="text-[11px] font-extrabold text-blue-800">
            <Bi te="పంచాయతీ నిబంధన • Fair Rule" en="Panchayat Rule • Fair Rule" />
          </div>
          <BiStack
            te="గమనిక: 3 లేదా అంతకంటే ఎక్కువ సమస్యలు నమోదైన వీధులకు ఉచిత వాటర్ ట్యాంకర్ పంపబడుతుంది."
            en="Streets with 3 or more reports get an automatic free water tanker dispatch within 4 hours."
            teClass="text-xs sm:text-sm font-bold text-slate-900"
            enClass="text-xs text-blue-900"
          />
        </div>
      </div>

      {/* Trend Insight */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2.5">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-blue-700">
            <Bi te="సాధారణ సమస్య" en="TREND INSIGHT" />
          </span>
          <span className="text-slate-700 tabular-nums">
            {totalReports} <Bi te="మొత్తం ఫిర్యాదులు" en="total reports" />
          </span>
        </div>
        <BiStack
          te="ఈ వారం ప్రధాన సమస్య: ఉదయం తక్కువ ఒత్తిడి"
          en="Most common issue: Low pressure in morning supply lines"
          teClass="text-sm font-extrabold text-slate-900"
          enClass="text-xs text-slate-600"
        />
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
          <div className="bg-blue-700 h-full" style={{ width: `${pressurePct}%` }} />
          <div className="bg-emerald-500 h-full" style={{ width: `${100 - pressurePct}%` }} />
        </div>
        <div className="flex justify-between text-[11px] font-semibold text-slate-500 tabular-nums">
          <span>
            <Bi te="ఒత్తిడి సమస్యలు" en="Pressure" />: {pressurePct}%
          </span>
          <span>
            <Bi te="ఇతర/సరఫరా" en="Other/Supply" />: {100 - pressurePct}%
          </span>
        </div>
      </div>

      {/* Street Wise Status */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <BiStack
            te="వీధుల స్థితిగతులు"
            en="Street Wise Status"
            teClass="text-base font-extrabold text-slate-900"
            enClass="text-xs text-slate-500"
          />
          <span className="text-xs font-bold text-slate-500">
            <Bi te="4 విభాగాలు" en="4 Wards" />
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {streets.map((street) => {
            const activeCount = waterReports.filter(
              (r) => r.streetId === street.id && r.status === 'new'
            ).length;
            const totalForStreet = waterReports.filter((r) => r.streetId === street.id).length;
            const isAlert = activeCount >= 3 || tankerDispatchedStreets.includes(street.id);
            const isWatch = !isAlert && activeCount >= 1;

            return (
              <div
                key={street.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                      <StreetIcon icon={street.icon} />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-slate-900">
                        <Bi te={street.name.te} en={street.name.en} />
                      </div>
                      <div className="text-[11px] text-slate-500 font-semibold">Ward {street.ward}</div>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold ${
                      isAlert
                        ? 'bg-red-100 text-red-800'
                        : isWatch
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {isAlert ? (
                      <Bi te="తక్షణ అవసరం • Alert" en="Alert" />
                    ) : isWatch ? (
                      <Bi te="గమనించాలి • Watch" en="Watch" />
                    ) : (
                      <Bi te="సాధారణం • Good" en="Good" />
                    )}
                  </span>
                </div>

                <div className="bg-slate-50 rounded-xl px-3 py-2 flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">
                    <Bi te="ఈ వారం నివేదికలు" en="Active reports" />:
                  </span>
                  <span className="font-extrabold text-slate-900 tabular-nums">
                    {activeCount} (<Bi te="మొత్తం" en="total" /> {totalForStreet})
                  </span>
                </div>

                {isAlert ? (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 space-y-1">
                    <div className="text-[11px] font-extrabold text-red-800">
                      <Bi te="సత్వర చర్య • Action Triggered" en="Action Triggered" />
                    </div>
                    <div className="text-xs font-extrabold text-slate-900">
                      🚚 <Bi te="వాటర్ ట్యాంకర్ పంపబడుతోంది" en="Water tanker requested and dispatched" />
                    </div>
                    <div className="text-[11px] text-slate-600">
                      <Bi te="డ్రైవర్ రాజు (SAMPLE) • ETA: 45 నిమిషాలు" en="Driver Raju (SAMPLE) • ETA: 45 mins" />
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-600 font-medium">
                    {isWatch ? (
                      <Bi
                        te={`ఇంకో ${Math.max(1, 3 - activeCount)} రిపోర్ట్ నమోదైతే ఉచిత ట్యాంకర్ పంపబడుతుంది.`}
                        en={`${Math.max(1, 3 - activeCount)} more report(s) triggers free Tanker dispatch`}
                      />
                    ) : (
                      <Bi te="సరఫరా సమయానికి సరిగ్గా ఉంది (Normal Flow)" en="Normal Flow • On Schedule" />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Tanker Verification Photo */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2.5">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
          <Bi te="క్షేత్రస్థాయి స్థితి • Live Tanker Verification" en="Live Tanker Verification" />
          <span className="text-emerald-700">✓ <Bi te="ధృవీకరించబడింది" en="Verified" /></span>
        </div>
        <div className="relative rounded-xl overflow-hidden h-40 border border-slate-200">
          <SafeImage
            src={ASSETS.waterTanker}
            alt="Water Tanker Spot"
            className="w-full h-full object-cover"
            fallbackTitle={{ te: 'వాటర్ ట్యాంకర్ రీఫిల్', en: 'Water Tanker Verification' }}
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3 text-white text-xs font-bold">
            <Bi te="రైతు కాలనీ వద్ద ట్యాంకర్ రీఫిల్" en="Water Tanker Refill • Farm Colony Spot" />
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => navigate('report-water')}
          className="w-full bg-[#1B6B2F] hover:bg-[#155724] text-white rounded-2xl p-4 font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <Bi te="మీ వీధిలో సమస్యను నివేదించండి" en="Report Water Issue in Your Street" />
        </button>
        <button
          type="button"
          onClick={() =>
            openCallModal({
              title: SAMPLE_CONTACTS.tankerTollFree.name,
              phone: SAMPLE_CONTACTS.tankerTollFree.phone,
              note: SAMPLE_CONTACTS.tankerTollFree.note,
            })
          }
          className="w-full text-center text-xs font-bold text-slate-600 hover:text-slate-900 py-1 cursor-pointer tabular-nums"
        >
          <Bi te="ఉచిత సహాయ నంబర్" en="Toll Free" />: {SAMPLE_CONTACTS.tankerTollFree.phone}
        </button>
      </div>
    </div>
  );
};
