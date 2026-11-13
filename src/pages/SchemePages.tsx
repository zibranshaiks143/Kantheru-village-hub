import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Bot,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  FileText,
  GraduationCap,
  HeartPulse,
  Info,
  Landmark,
  Mic,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Sprout,
  Tractor,
  User,
  Users,
} from 'lucide-react';
import { Bi, BiStack, ListenButton, SafeImage } from '../components/CommonUI';
import { useApp } from '../context/AppContext';
import { useSpeechInput } from '../hooks/useSpeechInput';
import {
  ASSETS,
  ChatQA,
  SAMPLE_CONTACTS,
  SCHEME_ALERTS,
  SCHEME_CHAT_QA,
  SCHEMES,
  SchemeItem,
} from '../data/villageData';

const SchemeIcon: React.FC<{ type: SchemeItem['iconType'] }> = ({ type }) => {
  switch (type) {
    case 'sprout':
      return <Sprout className="w-5 h-5 text-[#1B6B2F]" />;
    case 'shield':
      return <ShieldCheck className="w-5 h-5 text-blue-700" />;
    case 'seed':
      return <Sparkles className="w-5 h-5 text-amber-700" />;
    case 'tractor':
      return <Tractor className="w-5 h-5 text-emerald-700" />;
    case 'pension':
      return <Users className="w-5 h-5 text-indigo-700" />;
    case 'ration':
      return <FileText className="w-5 h-5 text-orange-700" />;
    case 'health':
      return <HeartPulse className="w-5 h-5 text-red-700" />;
    case 'edu':
      return <GraduationCap className="w-5 h-5 text-sky-700" />;
  }
};

export const SchemesHubPage: React.FC = () => {
  const { navigate, openCallModal } = useApp();

  return (
    <div className="space-y-4 pb-6">
      {/* Audio Guide Bar */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 flex items-center justify-between gap-2">
        <BiStack
          te="ఆడియో గైడ్ / Audio Guide"
          en="ఈ పేజీని విని అర్థం చేసుకోండి"
          teClass="text-xs font-extrabold text-slate-900"
          enClass="text-[11px] text-slate-600"
        />
        <ListenButton
          te="కాంతేరు గ్రామ పథకాల విభాగం. మీ అర్హతను తనిఖీ చేయండి లేదా రైతు లేదా కుటుంబ పథకాలను చూడండి."
          en="Kantheru Village Schemes Hub. Check your eligibility, browse farmer or family schemes, or ask the Scheme Assistant."
          variant="green"
          compact
        />
      </div>

      {/* Hero Photo */}
      <div className="relative rounded-2xl overflow-hidden h-40 border border-slate-200">
        <SafeImage
          src={ASSETS.villageBanner}
          alt="Kantheru Schemes Banner"
          className="w-full h-full object-cover"
          fallbackTitle={{ te: 'కాంతేరు గ్రామ పథకాలు', en: 'Kantheru Welfare Hub' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent flex flex-col justify-end p-4 text-white">
          <span className="text-[11px] font-bold text-emerald-300 mb-0.5">
            ● <Bi te="గ్రామ సేవలు" en="Village Hub" />
          </span>
          <BiStack
            te="కాంతేరు గ్రామ పథకాలు"
            en="Kantheru Welfare & Citizen Empowerment"
            teClass="text-lg font-extrabold text-white"
            enClass="text-xs text-white/90"
          />
        </div>
      </div>

      {/* Check Eligibility Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#1B6B2F] text-[11px] font-bold">
              <Bi te="అర్హత పరిశీలన" en="Eligibility Check" />
            </span>
            <BiStack
              te="మీ అర్హత తెలుసుకోండి"
              en="Check what you can claim"
              teClass="text-lg font-extrabold text-slate-900"
              enClass="text-xs font-bold text-slate-600"
            />
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#1B6B2F] flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
        <p className="text-xs text-slate-600">
          <Bi
            te="మీ కుటుంబానికి వర్తించే ప్రభుత్వ పథకాల వివరాలు సులభంగా పొందండి."
            en="Find welfare schemes tailored for your household."
          />
        </p>
        <button
          type="button"
          onClick={() => navigate('eligibility')}
          className="w-full bg-[#1B6B2F] hover:bg-[#155724] text-white rounded-xl py-3.5 px-4 font-extrabold text-sm flex items-center justify-between cursor-pointer"
        >
          <Bi te="అర్హత చూడండి" en="Check Eligibility" />
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Scheme Assistant Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <Bot className="w-6 h-6" />
          </div>
          <BiStack
            te="దరఖాస్తుకు AI సహాయం"
            en="Ask AI to help you apply"
            teClass="text-base font-extrabold text-slate-900"
            enClass="text-xs text-slate-500"
          />
        </div>
        <p className="text-xs text-slate-600">
          <Bi
            te="సులువుగా మాట్లాడి దరఖాస్తు చేయండి. మీ భాషలో సాధారణ సమాచారం పొందండి."
            en="Chat in Telugu or English for step-by-step general guidance."
          />
        </p>
        <button
          type="button"
          onClick={() => navigate('scheme-assistant')}
          className="w-full bg-[#1E4E79] hover:bg-[#163B5C] text-white rounded-xl py-3.5 px-4 font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <Mic className="w-4 h-4" />
          <Bi te="ప్రారంభించండి" en="Start Scheme Assistant" />
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Citizen Category Selection */}
      <div className="space-y-2.5">
        <BiStack
          te="మీ రకం ఎంచుకోండి"
          en="Choose your citizen category"
          teClass="text-base font-extrabold text-slate-900"
          enClass="text-xs text-slate-500"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => navigate('farmer-schemes')}
            className="bg-white hover:bg-emerald-50/40 border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-3 text-left cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#1B6B2F] flex items-center justify-center shrink-0">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <BiStack
                  te="నేను రైతును"
                  en="I am a farmer"
                  teClass="text-base font-extrabold text-slate-900"
                  enClass="text-xs font-bold text-slate-700"
                />
                <div className="text-[11px] text-slate-500 mt-0.5">
                  <Bi te="రైతుల కోసం పథకాలు" en="Schemes for farmers & crops" />
                </div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
          </button>

          <button
            type="button"
            onClick={() => navigate('family-schemes')}
            className="bg-white hover:bg-blue-50/40 border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-3 text-left cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                <User className="w-6 h-6" />
              </div>
              <div>
                <BiStack
                  te="నేను రైతును కాదు"
                  en="I am not a farmer"
                  teClass="text-base font-extrabold text-slate-900"
                  enClass="text-xs font-bold text-slate-700"
                />
                <div className="text-[11px] text-slate-500 mt-0.5">
                  <Bi te="కుటుంబాలు మరియు వ్యక్తుల కోసం" en="For families & individuals" />
                </div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
          </button>
        </div>
      </div>

      {/* Scheme Alerts Shortcut */}
      <button
        type="button"
        onClick={() => navigate('scheme-alerts')}
        className="w-full bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-3 text-left cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <Bell className="w-5 h-5" />
          </div>
          <BiStack
            te="పథకాల అలర్ట్‌లు & నోటిఫికేషన్లు"
            en="Scheme Alerts & Notifications"
            teClass="text-sm font-extrabold text-slate-900"
            enClass="text-xs text-slate-500"
          />
        </div>
        <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
      </button>

      {/* Village Secretariat Helpdesk */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#1B6B2F] flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <BiStack
            te="గ్రామ సచివాలయం సహాయం"
            en="Village Secretariat Helpdesk (1902 SAMPLE)"
            teClass="text-sm font-extrabold text-slate-900"
            enClass="text-xs text-slate-500"
          />
        </div>
        <button
          type="button"
          onClick={() =>
            openCallModal({
              title: SAMPLE_CONTACTS.sachivalayam.name,
              phone: SAMPLE_CONTACTS.sachivalayam.phone,
              note: SAMPLE_CONTACTS.sachivalayam.note,
            })
          }
          className="px-4 py-2.5 rounded-xl bg-[#1B6B2F] hover:bg-[#155724] text-white text-xs font-extrabold shrink-0 cursor-pointer"
        >
          <Bi te="కాల్ చేయండి" en="Call" />
        </button>
      </div>

      {/* Confirmation Disclaimer */}
      <div className="bg-slate-100 border border-slate-200 rounded-2xl p-3.5 flex items-start gap-2.5 text-xs text-slate-700">
        <Landmark className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
        <Bi
          te="నమ్మకమైన సమాచారం: అన్ని దరఖాస్తులను మరియు అర్హతలను కాంతేరు గ్రామ సచివాలయంలో ధృవీకరించుకోవచ్చు."
          en="All applications and eligibility details should be confirmed at Kantheru Village Secretariat."
        />
      </div>
    </div>
  );
};

export const FarmerSchemesPage: React.FC = () => {
  const { navigate, openCallModal } = useApp();
  const farmerSchemes = SCHEMES.filter((s) => s.category === 'farmer');

  return (
    <div className="space-y-4 pb-6">
      <div className="flex items-center justify-between gap-2">
        <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#1B6B2F] text-xs font-extrabold">
          🌾 <Bi te="రైతుల కోసం పథకాలు" en="Schemes for farmers" />
        </span>
        <ListenButton
          te="రైతుల కోసం పథకాలు. రైతు భరోసా, పంట బీమా, విత్తన సబ్సిడీ మరియు కౌలు రైతు సహాయం వివరాలు చూడండి."
          en="Schemes for farmers: Rythu Bharosa, Crop Insurance, Seed Subsidy, and Tenant Farmer Support."
          compact
        />
      </div>

      <div className="relative rounded-2xl overflow-hidden h-36 border border-slate-200">
        <SafeImage
          src={ASSETS.villageBanner}
          alt="Farmer Care"
          className="w-full h-full object-cover"
          fallbackTitle={{ te: 'వ్యవసాయ సహాయ కేంద్రం', en: 'Farmer Care' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent flex items-end p-3.5 text-white">
          <BiStack
            te="గ్రామ సచివాలయ వ్యవసాయ సహాయ కేంద్రం"
            en="Village Secretariat Farmer Care"
            teClass="text-sm font-extrabold text-white"
            enClass="text-xs text-white/90"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => navigate('eligibility')}
        className="w-full bg-[#1B6B2F] hover:bg-[#155724] text-white rounded-2xl p-4 font-extrabold text-sm flex items-center justify-between cursor-pointer"
      >
        <Bi te="అర్హత చూడండి" en="Check Your Eligibility" />
        <ArrowRight className="w-5 h-5" />
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {farmerSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                  <SchemeIcon type={scheme.iconType} />
                </div>
                <BiStack
                  te={scheme.name.te}
                  en={scheme.name.en}
                  teClass="text-base font-extrabold text-slate-900"
                  enClass="text-xs font-bold text-slate-600"
                />
              </div>
              <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-700 font-medium">
                <Bi te={scheme.shortDesc.te} en={scheme.shortDesc.en} />
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('how-to-apply', { schemeId: scheme.id })}
              className="w-full bg-slate-100 hover:bg-emerald-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs font-extrabold text-slate-900 flex items-center justify-between cursor-pointer"
            >
              <Bi te="ఎలా దరఖాస్తు చేయాలి" en="How to apply" />
              <ChevronRight className="w-4 h-4 text-[#1B6B2F]" />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between gap-3">
        <BiStack
          te="సహాయం కావాలా? / Need Help?"
          en="గ్రామ వ్యవసాయ సహాయకుడిని (VAA) సంప్రదించండి (1902 SAMPLE)"
          teClass="text-sm font-extrabold text-slate-900"
          enClass="text-xs text-slate-500"
        />
        <button
          type="button"
          onClick={() =>
            openCallModal({
              title: SAMPLE_CONTACTS.sachivalayam.name,
              phone: SAMPLE_CONTACTS.sachivalayam.phone,
              note: SAMPLE_CONTACTS.sachivalayam.note,
            })
          }
          className="w-10 h-10 rounded-full bg-[#1B6B2F] text-white flex items-center justify-center shrink-0 cursor-pointer"
          aria-label="Call VAA Helpdesk"
        >
          <Phone className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export const FamilySchemesPage: React.FC = () => {
  const { navigate } = useApp();
  const familySchemes = SCHEMES.filter((s) => s.category === 'family');

  return (
    <div className="space-y-4 pb-6">
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3.5 flex items-center justify-between gap-3">
        <BiStack
          te="కుటుంబాలు మరియు వ్యక్తుల కోసం పథకాలు"
          en="Schemes for families and individuals"
          teClass="text-sm font-extrabold text-blue-950"
          enClass="text-xs text-blue-800"
        />
        <ListenButton
          te="కుటుంబాలు మరియు వ్యక్తుల కోసం పథకాలు. పింఛను కానుక, రేషన్ కార్డు, ఆరోగ్య రక్షణ మరియు విద్యా సహాయం."
          en="Schemes for families and individuals: Pension Scheme, Ration Card Benefits, Health Insurance, and Education Support."
          variant="blue"
          compact
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {familySchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <SchemeIcon type={scheme.iconType} />
                </div>
                <BiStack
                  te={scheme.name.te}
                  en={scheme.name.en}
                  teClass="text-base font-extrabold text-slate-900"
                  enClass="text-xs font-bold text-slate-600"
                />
              </div>
              <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-700 font-medium">
                <Bi te={scheme.shortDesc.te} en={scheme.shortDesc.en} />
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('how-to-apply', { schemeId: scheme.id })}
              className="w-full bg-slate-100 hover:bg-emerald-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs font-extrabold text-slate-900 flex items-center justify-between cursor-pointer"
            >
              <Bi te="ఎలా దరఖాస్తు చేయాలి" en="How to apply" />
              <ArrowRight className="w-4 h-4 text-[#1B6B2F]" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => navigate('eligibility')}
        className="w-full bg-[#1B6B2F] hover:bg-[#155724] text-white rounded-2xl p-4 font-extrabold text-sm flex items-center justify-between cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5" />
          <Bi te="అర్హత చూడండి" en="Check Eligibility" />
        </span>
        <ArrowRight className="w-5 h-5" />
      </button>

      <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-start gap-3">
        <Building2 className="w-6 h-6 text-[#1B6B2F] shrink-0 mt-0.5" />
        <BiStack
          te="గ్రామ సచివాలయం సహాయం"
          en="సహాయం లేదా సందేహాల కోసం మీ సచివాలయాన్ని సందర్శించండి. / Village Secretariat Helpdesk Open"
          teClass="text-sm font-extrabold text-slate-900"
          enClass="text-xs text-slate-600"
        />
      </div>
    </div>
  );
};

export const EligibilityPage: React.FC = () => {
  const { navigate, openCallModal } = useApp();

  const [step, setStep] = useState<'q1' | 'q2-farmer' | 'q2-family' | 'result'>('q1');
  const [isFarmer, setIsFarmer] = useState<boolean>(true);
  const [landStatus, setLandStatus] = useState<'own' | 'rent' | 'both'>('own');
  const [hasRationCard, setHasRationCard] = useState<boolean>(true);

  const matchedSchemes: SchemeItem[] = (() => {
    if (isFarmer) {
      if (landStatus === 'own') {
        return SCHEMES.filter((s) =>
          ['rythu-bharosa', 'crop-insurance', 'seed-subsidy'].includes(s.id)
        );
      }
      if (landStatus === 'rent') {
        return SCHEMES.filter((s) => ['tenant-farmer', 'crop-insurance'].includes(s.id));
      }
      return SCHEMES.filter((s) => s.category === 'farmer');
    } else {
      if (hasRationCard) {
        return SCHEMES.filter((s) => s.category === 'family');
      }
      return SCHEMES.filter((s) => ['ration-card', 'education-support'].includes(s.id));
    }
  })();

  if (step === 'q1') {
    return (
      <div className="space-y-4 pb-6">
        {/* Progress */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-800">
              <Bi te="ప్రశ్న 1 / 2" en="Question 1 of 2" />
            </span>
            <ListenButton
              te="మీరు రైతా? వ్యవసాయం లేదా భూమి కలిగిన వారు అవును ఎంచుకోండి."
              en="Question 1: Are you a farmer? Choose Yes for farmer questions or No for family questions."
              compact
            />
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="w-1/2 h-full bg-[#1B6B2F] rounded-full" />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-gradient-to-b from-white to-emerald-50/50 rounded-2xl border border-slate-200 p-6 text-center space-y-2">
          <div className="w-11 h-11 rounded-xl bg-emerald-100 text-[#1B6B2F] font-extrabold text-lg flex items-center justify-center mx-auto">
            ?
          </div>
          <BiStack
            te="మీరు రైతా?"
            en="Are you a farmer?"
            teClass="text-2xl font-extrabold text-slate-900"
            enClass="text-base font-bold text-slate-700"
          />
          <p className="text-xs text-slate-500">
            <Bi
              te="వ్యవసాయం లేదా భూమి కలిగిన వారు అవును ఎంచుకోండి"
              en="Select Yes if you cultivate crops or own farmland"
            />
          </p>
        </div>

        {/* YES Button */}
        <button
          type="button"
          onClick={() => {
            setIsFarmer(true);
            setStep('q2-farmer');
          }}
          className="w-full bg-[#1B6B2F] hover:bg-[#155724] text-white rounded-2xl p-4 flex items-center justify-between gap-3 text-left cursor-pointer shadow-xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-white/15 flex items-center justify-center shrink-0">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <BiStack
                te="అవును"
                en="YES, I am a farmer"
                teClass="text-lg font-extrabold text-white"
                enClass="text-xs text-emerald-100 font-bold"
              />
              <div className="text-[11px] text-emerald-100 mt-0.5">
                → <Bi te="రైతు ప్రశ్నలు తదుపరి" en="Farmer questions next" />
              </div>
            </div>
          </div>
          <CheckCircle2 className="w-6 h-6 shrink-0" />
        </button>

        {/* NO Button */}
        <button
          type="button"
          onClick={() => {
            setIsFarmer(false);
            setStep('q2-family');
          }}
          className="w-full bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-3 text-left cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
              <User className="w-6 h-6" />
            </div>
            <div>
              <BiStack
                te="కాదు"
                en="NO, Not a farmer"
                teClass="text-lg font-extrabold text-slate-900"
                enClass="text-xs text-slate-600 font-bold"
              />
              <div className="text-[11px] text-slate-500 mt-0.5">
                → <Bi te="కుటుంబ ప్రశ్నలు తదుపరి" en="Family questions next" />
              </div>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 text-slate-400 shrink-0" />
        </button>

        {/* Helpdesk footer */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between gap-3">
          <BiStack
            te="సందేహం ఉంటే గ్రామ సచివాలయ సిబ్బందిని సంప్రదించండి"
            en="Call Panchayat helpdesk if in doubt"
            teClass="text-xs font-bold text-slate-800"
            enClass="text-[11px] text-slate-500"
          />
          <button
            type="button"
            onClick={() =>
              openCallModal({
                title: SAMPLE_CONTACTS.sachivalayam.name,
                phone: SAMPLE_CONTACTS.sachivalayam.phone,
                note: SAMPLE_CONTACTS.sachivalayam.note,
              })
            }
            className="px-3.5 py-2 rounded-full bg-[#1E4E79] text-white text-xs font-extrabold flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>1902</span>
          </button>
        </div>
      </div>
    );
  }

  if (step === 'q2-farmer') {
    return (
      <div className="space-y-4 pb-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#1B6B2F] text-xs font-extrabold">
              🌾 <Bi te="రైతు" en="Farmer" />
            </span>
            <span className="text-xs font-bold text-slate-600">
              <Bi te="ప్రశ్న 2 / 2" en="Question 2 of 2" />
            </span>
          </div>
          <div className="w-full h-2 bg-[#1B6B2F] rounded-full" />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setStep('q1')}
            className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <Bi te="వెనక్కి" en="Back" />
          </button>
          <ListenButton
            te="మీ సొంత భూమి ఉందా? సొంత భూమి, కౌలు రైతు లేదా రెండూ ఎంచుకోండి."
            en="Do you own the land you farm? Choose Yes I own land, No I rent land, or Both."
            variant="blue"
            compact
          />
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-1">
          <BiStack
            te="మీ సొంత భూమి ఉందా?"
            en="Do you own the land you farm?"
            teClass="text-xl font-extrabold text-slate-900"
            enClass="text-sm text-slate-600 font-semibold"
          />
        </div>

        <div className="relative rounded-2xl overflow-hidden h-32 border border-slate-200">
          <SafeImage
            src={ASSETS.villageBanner}
            alt="Farmland"
            className="w-full h-full object-cover"
            fallbackTitle={{ te: 'వ్యవసాయ భూమి వివరాలు', en: 'Land status selection' }}
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3 text-white text-xs font-bold">
            <Bi te="వ్యవసాయ భూమి వివరాలు" en="Land status selection" />
          </div>
        </div>

        <div className="space-y-2.5">
          {[
            {
              id: 'own' as const,
              te: 'అవును, సొంత భూమి ఉంది',
              en: 'Yes, I own land',
            },
            {
              id: 'rent' as const,
              te: 'కాదు, కౌలు రైతును',
              en: 'No, I rent land',
            },
            {
              id: 'both' as const,
              te: 'రెండూ',
              en: 'Both (Own & Tenant)',
            },
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => {
                setLandStatus(opt.id);
                setStep('result');
              }}
              className="w-full bg-white hover:bg-emerald-50 border border-slate-200 hover:border-[#1B6B2F] rounded-2xl p-4 flex items-center justify-between gap-3 text-left cursor-pointer"
            >
              <BiStack
                te={opt.te}
                en={opt.en}
                teClass="text-sm sm:text-base font-extrabold text-slate-900"
                enClass="text-xs text-slate-500"
              />
              <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
            </button>
          ))}
        </div>

        <div className="bg-slate-100 border border-slate-200 rounded-xl p-3 flex items-start gap-2 text-xs text-slate-700">
          <ShieldCheck className="w-4 h-4 text-[#1B6B2F] shrink-0 mt-0.5" />
          <Bi
            te="పట్టాదారు లేదా కౌలుదారు కార్డు వివరాలు స్థానికంగా సరిచూడబడతాయి."
            en="Land titles or tenant cards are verified locally at Grama Sachivalayam."
          />
        </div>
      </div>
    );
  }

  if (step === 'q2-family') {
    return (
      <div className="space-y-4 pb-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-800">
              ● <Bi te="ప్రశ్న 2 / 2" en="Question 2 of 2" />
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
              👥 <Bi te="కుటుంబం" en="Family" />
            </span>
          </div>
          <div className="w-full h-2 bg-[#1B6B2F] rounded-full" />
        </div>

        <div className="flex items-center justify-between">
          <ListenButton
            te="మీ కుటుంబానికి రేషన్ కార్డు ఉందా? తెల్ల రేషన్ కార్డు లేదా రైస్ కార్డు సరిపోతుంది."
            en="Does your family have a ration card? White ration card or rice card is accepted."
            variant="blue"
            compact
          />
          <button
            type="button"
            onClick={() => setStep('q1')}
            className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <Bi te="వెనక్కి" en="Back" />
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <BiStack
            te="మీ కుటుంబానికి రేషన్ కార్డు ఉందా?"
            en="Does your family have a ration card?"
            teClass="text-xl font-extrabold text-slate-900"
            enClass="text-sm text-slate-600 font-semibold"
          />
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-700">
            <div className="font-extrabold">
              <Bi te="రైస్ కార్డు / White Ration Card" en="White Ration / Rice Card" />
            </div>
            <div className="text-slate-500">
              <Bi te="ఏపీ ప్రజా పంపిణీ వ్యవస్థ" en="Food Security Card" />
            </div>
          </div>
        </div>

        <div className="space-y-2.5">
          <button
            type="button"
            onClick={() => {
              setHasRationCard(true);
              setStep('result');
            }}
            className="w-full bg-white hover:bg-emerald-50 border border-slate-200 hover:border-[#1B6B2F] rounded-2xl p-4 flex items-center justify-between gap-3 text-left cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#1B6B2F] flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
              <BiStack
                te="అవును"
                en="Yes, we have it"
                teClass="text-base font-extrabold text-slate-900"
                enClass="text-xs text-slate-500"
              />
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>

          <button
            type="button"
            onClick={() => {
              setHasRationCard(false);
              setStep('result');
            }}
            className="w-full bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-3 text-left cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold">
                ✕
              </div>
              <BiStack
                te="కాదు"
                en="No, we don't have"
                teClass="text-base font-extrabold text-slate-900"
                enClass="text-xs text-slate-500"
              />
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="bg-slate-100 border border-slate-200 rounded-xl p-3 flex items-start gap-2 text-xs text-slate-700">
          <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <Bi
            te="తెల్ల రేషన్ కార్డు లేదా రైస్ కార్డు సరిపోతుంది."
            en="White ration card or rice card is accepted."
          />
        </div>
      </div>
    );
  }

  // RESULT STEP
  return (
    <div className="space-y-4 pb-6">
      <div className="flex items-center justify-between">
        <div className="text-xs font-bold text-slate-600">
          📍 <Bi te="కాంతేరు గ్రామం" en="Kantheru Village" />
        </div>
        <ListenButton
          te={`మీరు ${matchedSchemes.length} పథకాలకు అర్హులు కావచ్చు. దరఖాస్తు చేయడానికి ముందు గ్రామ సచివాలయంలో నిర్ధారించుకోండి.`}
          en={`You may be eligible for ${matchedSchemes.length} schemes. Please confirm at the panchayat office before applying.`}
          variant="blue"
          compact
        />
      </div>

      {/* Eligible Hero Banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-start gap-3">
        <div className="w-11 h-11 rounded-full bg-[#1B6B2F] text-white flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <BiStack
            te="మీరు ఈ పథకాలకు అర్హులు కావచ్చు!"
            en="You may be eligible for these schemes!"
            teClass="text-lg font-extrabold text-slate-900"
            enClass="text-sm font-bold text-[#1B6B2F]"
          />
          <p className="text-xs text-slate-600">
            <Bi
              te="మీ వివరాల ఆధారంగా కనుగొనబడిన పథకాలు"
              en="Schemes matched based on your answers"
            />
          </p>
        </div>
      </div>

      {/* Category Header */}
      <div className="flex items-center justify-between">
        <BiStack
          te="అర్హత ఉన్న పథకాలు"
          en="Eligible Schemes for your household"
          teClass="text-base font-extrabold text-slate-900"
          enClass="text-xs text-slate-500"
        />
        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-[#1B6B2F] text-xs font-extrabold tabular-nums">
          {matchedSchemes.length} <Bi te="పథకాలు" en="Schemes" />
        </span>
      </div>

      {/* Matched Schemes Cards */}
      <div className="space-y-3">
        {matchedSchemes.map((scheme, idx) => (
          <div
            key={scheme.id}
            className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                  <SchemeIcon type={scheme.iconType} />
                </div>
                <BiStack
                  te={scheme.name.te}
                  en={scheme.name.en}
                  teClass="text-base font-extrabold text-slate-900"
                  enClass="text-xs font-bold text-slate-600"
                />
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold">
                #{idx + 1}
              </span>
            </div>

            <p className="text-xs text-slate-600">
              <Bi te={scheme.shortDesc.te} en={scheme.shortDesc.en} />
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700">
              🌿 <Bi te={scheme.benefitTag.te} en={scheme.benefitTag.en} />
            </div>

            <button
              type="button"
              onClick={() => navigate('how-to-apply', { schemeId: scheme.id })}
              className="w-full bg-[#1B6B2F] hover:bg-[#155724] text-white rounded-xl py-3 px-4 font-extrabold text-xs sm:text-sm flex items-center justify-between cursor-pointer"
            >
              <Bi te="ఎలా దరఖాస్తు చేయాలి" en="How to apply" />
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Panchayat Confirmation Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-2.5 text-xs text-blue-950 font-semibold">
        <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
        <Bi
          te="ముఖ్య గమనిక: దరఖాస్తు చేయడానికి ముందు గ్రామ సచివాలయంలో నిర్ధారించుకోండి."
          en="Please Note: Please confirm all details at the panchayat office before applying."
        />
      </div>

      <div className="space-y-2">
        <button
          type="button"
          onClick={() => setStep('q1')}
          className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-2xl py-3.5 font-extrabold text-sm cursor-pointer"
        >
          ↺ <Bi te="మళ్ళీ తనిఖీ చేయండి" en="Check again" />
        </button>

        <button
          type="button"
          onClick={() => navigate('home')}
          className="w-full bg-[#1B6B2F] hover:bg-[#155724] text-white rounded-2xl py-3.5 font-extrabold text-sm cursor-pointer"
        >
          <Bi te="హోమ్‌కు వెళ్ళండి" en="Back to Home" />
        </button>
      </div>
    </div>
  );
};

export const HowToApplyPage: React.FC = () => {
  const { selectedSchemeId, openCallModal } = useApp();
  const scheme = SCHEMES.find((s) => s.id === selectedSchemeId) || SCHEMES[0];

  return (
    <div className="space-y-4 pb-6">
      {/* Audio Assist */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3.5 flex items-center justify-between gap-3">
        <BiStack
          te="వినండి / Audio Assist"
          en="ఈ పథకం వివరాలు వినడానికి నొక్కండి"
          teClass="text-xs font-extrabold text-slate-900"
          enClass="text-[11px] text-slate-500"
        />
        <ListenButton
          te={`${scheme.name.te}. ${scheme.shortDesc.te}. ఎవరు దరఖాస్తు చేసుకోవచ్చు: ${scheme.whoCanApply.map((i) => i.te).join(', ')}. కావలసిన పత్రాలు: ${scheme.documentsNeeded.map((d) => d.te).join(', ')}. దరఖాస్తు విధానం: ${scheme.stepsToApply.map((s) => s.title.te).join(', ')}.`}
          en={`${scheme.name.en}. ${scheme.shortDesc.en}. Who can apply: ${scheme.whoCanApply.map((i) => i.en).join(', ')}. Documents needed: ${scheme.documentsNeeded.map((d) => d.en).join(', ')}. Steps to apply: ${scheme.stepsToApply.map((s) => s.title.en).join(', ')}.`}
          variant="green"
          compact
        />
      </div>

      {/* Scheme Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
          <SchemeIcon type={scheme.iconType} />
        </div>
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#1B6B2F] text-[10px] font-bold mb-1">
            <Bi te="కాంతేరు గ్రామ సేవలు" en="Kantheru Village Service" />
          </span>
          <BiStack
            te={scheme.name.te}
            en={scheme.name.en}
            teClass="text-lg font-extrabold text-slate-900"
            enClass="text-xs font-bold text-slate-600"
          />
          <p className="text-xs text-slate-500 mt-1">
            <Bi te={scheme.shortDesc.te} en={scheme.shortDesc.en} />
          </p>
        </div>
      </div>

      {/* Who can apply */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2.5">
        <BiStack
          te="ఎవరు దరఖాస్తు చేసుకోవచ్చు?"
          en="Who can apply"
          teClass="text-sm font-extrabold text-slate-900"
          enClass="text-xs text-slate-500"
        />
        <div className="space-y-2">
          {scheme.whoCanApply.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-start gap-2.5"
            >
              <CheckCircle2 className="w-5 h-5 text-[#1B6B2F] shrink-0 mt-0.5" />
              <BiStack
                te={item.te}
                en={item.en}
                teClass="text-xs sm:text-sm font-bold text-slate-900"
                enClass="text-xs text-slate-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Documents Needed */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2.5">
        <BiStack
          te="కావలసిన పత్రాలు"
          en="Documents you need"
          teClass="text-sm font-extrabold text-slate-900"
          enClass="text-xs text-slate-500"
        />
        <div className="space-y-2">
          {scheme.documentsNeeded.map((doc, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <BiStack
                te={doc.te}
                en={doc.en}
                teClass="text-xs sm:text-sm font-bold text-slate-900"
                enClass="text-xs text-slate-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Steps to Apply */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
        <BiStack
          te="దరఖాస్తు విధానం"
          en="Steps to apply"
          teClass="text-sm font-extrabold text-slate-900"
          enClass="text-xs text-slate-500"
        />
        <div className="space-y-2.5">
          {scheme.stepsToApply.map((st, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-start gap-3"
            >
              <span className="w-7 h-7 rounded-full bg-[#1B6B2F] text-white text-xs font-extrabold flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <div>
                <BiStack
                  te={st.title.te}
                  en={st.title.en}
                  teClass="text-xs sm:text-sm font-extrabold text-slate-900"
                  enClass="text-[11px] font-bold text-slate-600"
                />
                <p className="text-xs text-slate-600 mt-1">
                  <Bi te={st.desc.te} en={st.desc.en} />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-2.5 text-xs text-blue-950 font-semibold">
        <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
        <Bi
          te="ముఖ్య గమనిక: వివరాల కోసం గ్రామ సచివాలయంలో సంప్రదించండి."
          en="Notice: Please confirm all details at the panchayat office."
        />
      </div>

      {/* Call Helpdesk */}
      <button
        type="button"
        onClick={() =>
          openCallModal({
            title: SAMPLE_CONTACTS.sachivalayam.name,
            phone: SAMPLE_CONTACTS.sachivalayam.phone,
            note: SAMPLE_CONTACTS.sachivalayam.note,
          })
        }
        className="w-full bg-[#1B6B2F] hover:bg-[#155724] text-white rounded-2xl p-4 font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer"
      >
        <Phone className="w-4 h-4" />
        <Bi te="సచివాలయ సహాయం (1902 SAMPLE)" en="Call Helpdesk (1902 SAMPLE)" />
      </button>
    </div>
  );
};

export const SchemeAlertsPage: React.FC = () => {
  const {
    schemeAlertsEnabled,
    setSchemeAlertsEnabled,
    alertChannel,
    setAlertChannel,
    navigate,
    openCallModal,
  } = useApp();

  return (
    <div className="space-y-4 pb-6">
      {/* Audio bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3.5 flex items-center justify-between gap-2">
        <BiStack
          te="అన్ని వివరాలను వినండి"
          en="Listen to schemes update in Telugu"
          teClass="text-xs font-extrabold text-slate-900"
          enClass="text-[11px] text-slate-500"
        />
        <ListenButton
          te="పథకాల అలర్ట్‌లు. కొత్త పథకం వచ్చినప్పుడు సమాచారం పొందడానికి నోటిఫికేషన్లు ఆన్ చేయండి."
          en="Scheme Alerts. Turn on notifications to receive updates about village schemes."
          compact
        />
      </div>

      {/* Notification Toggle Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-[#1B6B2F]" />
              <Bi te="పథకాల నోటిఫికేషన్లు" en="SCHEME NOTIFICATIONS" />
            </div>
            <p className="text-xs text-slate-600 mt-1">
              <Bi
                te="కొత్త పథకం వచ్చినప్పుడు సమాచారం పొందండి"
                en="Get alerts when a new scheme update arrives"
              />
            </p>
          </div>

          {/* Toggle Switch */}
          <button
            type="button"
            role="switch"
            aria-checked={schemeAlertsEnabled}
            onClick={() => setSchemeAlertsEnabled(!schemeAlertsEnabled)}
            className={`w-14 h-8 rounded-full p-1 transition-colors cursor-pointer shrink-0 flex items-center ${
              schemeAlertsEnabled ? 'bg-[#1B6B2F] justify-end' : 'bg-slate-300 justify-start'
            }`}
          >
            <span className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center text-[11px] font-bold text-[#1B6B2F]">
              {schemeAlertsEnabled ? '✓' : ''}
            </span>
          </button>
        </div>

        <div
          className={`rounded-xl px-3 py-2 text-xs font-bold flex items-center gap-2 ${
            schemeAlertsEnabled
              ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
              : 'bg-slate-100 text-slate-600 border border-slate-200'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          {schemeAlertsEnabled ? (
            <Bi te="నోటిఫికేషన్లు ఆన్‌లో ఉన్నాయి" en="Notifications Active" />
          ) : (
            <Bi te="నోటిఫికేషన్లు ఆఫ్‌లో ఉన్నాయి" en="Notifications Paused" />
          )}
        </div>

        {schemeAlertsEnabled && (
          <div className="space-y-2 pt-1">
            <div className="text-xs font-bold text-slate-700">
              <Bi te="సమాచారం ఎందులో రావాలి?" en="Delivery Channel" />
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setAlertChannel('sms')}
                className={`rounded-xl p-3 border text-left flex items-center justify-between cursor-pointer ${
                  alertChannel === 'sms'
                    ? 'bg-[#1B6B2F] border-[#1B6B2F] text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <BiStack
                  te="ఎస్ఎంఎస్"
                  en="SMS"
                  teClass="text-xs font-extrabold"
                  enClass={`text-[11px] ${alertChannel === 'sms' ? 'text-emerald-100' : 'text-slate-500'}`}
                />
                <span>{alertChannel === 'sms' ? '◉' : '○'}</span>
              </button>

              <button
                type="button"
                onClick={() => setAlertChannel('whatsapp')}
                className={`rounded-xl p-3 border text-left flex items-center justify-between cursor-pointer ${
                  alertChannel === 'whatsapp'
                    ? 'bg-[#1B6B2F] border-[#1B6B2F] text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <BiStack
                  te="వాట్సాప్"
                  en="WhatsApp"
                  teClass="text-xs font-extrabold"
                  enClass={`text-[11px] ${alertChannel === 'whatsapp' ? 'text-emerald-100' : 'text-slate-500'}`}
                />
                <span>{alertChannel === 'whatsapp' ? '◉' : '○'}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Recent Scheme Alerts */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <BiStack
            te="తాజా పథకాల అలర్ట్‌లు"
            en="Recent Scheme Alerts"
            teClass="text-base font-extrabold text-slate-900"
            enClass="text-xs text-slate-500"
          />
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#1B6B2F] text-xs font-bold tabular-nums">
            ● {SCHEME_ALERTS.length} <Bi te="కొత్తవి" en="New" />
          </span>
        </div>

        <div className="space-y-3">
          {SCHEME_ALERTS.map((alert) => (
            <div
              key={alert.id}
              className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#1B6B2F] text-[11px] font-extrabold">
                  <Bi te="కొత్తది" en="New" />
                </span>
                <span className="text-[11px] text-slate-500 font-semibold">
                  <Bi te={alert.recency.te} en={alert.recency.en} />
                </span>
              </div>

              <BiStack
                te={alert.title.te}
                en={alert.title.en}
                teClass="text-base font-extrabold text-slate-900"
                enClass="text-xs font-bold text-slate-600"
              />

              <div className="bg-slate-50 rounded-xl px-3 py-2 text-xs text-slate-700 font-medium">
                👥 <Bi te={alert.audience.te} en={alert.audience.en} />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => navigate('how-to-apply', { schemeId: alert.schemeId })}
                  className="bg-emerald-100 hover:bg-emerald-200 text-[#1B6B2F] rounded-xl py-2.5 px-3 text-xs font-extrabold cursor-pointer"
                >
                  <Bi te="వివరాలు" en="Details" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    navigate('scheme-assistant', { schemeQuestionId: alert.schemeId })
                  }
                  className="bg-[#1B6B2F] hover:bg-[#155724] text-white rounded-xl py-2.5 px-3 text-xs font-extrabold cursor-pointer"
                >
                  🤖 <Bi te="సహాయం" en="Help Me Apply" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Secretariat Footer */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between gap-3">
        <BiStack
          te="కాంతేరు గ్రామ సచివాలయం"
          en="Kantheru Grama Sachivalayam (1902 SAMPLE)"
          teClass="text-sm font-extrabold text-slate-900"
          enClass="text-xs text-slate-500"
        />
        <button
          type="button"
          onClick={() =>
            openCallModal({
              title: SAMPLE_CONTACTS.sachivalayam.name,
              phone: SAMPLE_CONTACTS.sachivalayam.phone,
              note: SAMPLE_CONTACTS.sachivalayam.note,
            })
          }
          className="px-3.5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>1902</span>
        </button>
      </div>
    </div>
  );
};

interface SchemeMsg {
  id: string;
  sender: 'user' | 'bot';
  textTe: string;
  textEn: string;
  qa?: ChatQA;
}

export const SchemeAssistantPage: React.FC = () => {
  const { openCallModal, preselectedSchemeChatId, setPreselectedSchemeChatId } = useApp();
  const [input, setInput] = useState('');
  const { isListening, toggleListening } = useSpeechInput((transcript) => {
    setInput(transcript);
  });
  const [messages, setMessages] = useState<SchemeMsg[]>([
    {
      id: 'init-u',
      sender: 'user',
      textTe: SCHEME_CHAT_QA[0].chip.te,
      textEn: SCHEME_CHAT_QA[0].chip.en,
    },
    {
      id: 'init-b',
      sender: 'bot',
      textTe: SCHEME_CHAT_QA[0].title.te,
      textEn: SCHEME_CHAT_QA[0].title.en,
      qa: SCHEME_CHAT_QA[0],
    },
  ]);

  useEffect(() => {
    if (preselectedSchemeChatId) {
      const matched =
        SCHEME_CHAT_QA.find((q) => q.id.includes(preselectedSchemeChatId)) || SCHEME_CHAT_QA[0];
      setMessages([
        {
          id: `u-${Date.now()}`,
          sender: 'user',
          textTe: matched.chip.te,
          textEn: matched.chip.en,
        },
        {
          id: `b-${Date.now() + 1}`,
          sender: 'bot',
          textTe: matched.title.te,
          textEn: matched.title.en,
          qa: matched,
        },
      ]);
      setPreselectedSchemeChatId(null);
    }
  }, [preselectedSchemeChatId, setPreselectedSchemeChatId]);

  const askQA = (qa: ChatQA) => {
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, sender: 'user', textTe: qa.chip.te, textEn: qa.chip.en },
      { id: `b-${Date.now() + 1}`, sender: 'bot', textTe: qa.title.te, textEn: qa.title.en, qa },
    ]);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    setInput('');

    const lower = q.toLowerCase();
    const matched =
      SCHEME_CHAT_QA.find((item) => item.keywords.some((kw) => lower.includes(kw))) ||
      SCHEME_CHAT_QA[0];

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
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-emerald-100 text-[#1B6B2F] flex items-center justify-center shrink-0">
            <Bot className="w-6 h-6" />
          </div>
          <BiStack
            te="పథకా మిత్ర (Scheme Mitra)"
            en="ఆన్‌లైన్ • గ్రామ సంక్షేమ మార్గదర్శి"
            teClass="text-sm font-extrabold text-slate-900"
            enClass="text-xs font-semibold text-emerald-700"
          />
        </div>
        <ListenButton
          te="నమస్కారం! నేను పథకా మిత్ర. దరఖాస్తు చేయడంలో సాధారణ సమాచారం ఇస్తాను. ఖచ్చితమైన వివరాల కోసం గ్రామ సచివాలయంలో నిర్ధారించుకోండి."
          en="Hello, I am Scheme Mitra. I give general guidance only. Please confirm all details at Kantheru Panchayat Office."
          compact
        />
      </div>

      {/* Greeting + Mandatory General Guidance Disclaimer */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2.5">
        <BiStack
          te="నమస్కారం! నేను దరఖాస్తు చేయడంలో సహాయం చేస్తాను. ఏ పథకం గురించి తెలుసుకోవాలి?"
          en="Hello! I am here to help you apply for schemes. Which scheme would you like to know about?"
          teClass="text-sm font-extrabold text-slate-900"
          enClass="text-xs text-slate-600"
        />
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-950 font-bold flex items-start gap-2">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <Bi
            te="గమనిక: ఇది సాధారణ మార్గదర్శనం మాత్రమే. దరఖాస్తుకు ముందు కాంతేరు గ్రామ పంచాయతీ / సచివాలయంలో నిర్ధారించుకోండి."
            en="General guidance only — please confirm eligibility and documents at Kantheru Panchayat Office."
          />
        </div>
      </div>

      {/* Quick Questions */}
      <div className="space-y-2">
        <div className="text-xs font-extrabold text-slate-600">
          <Bi te="త్వరిత ప్రశ్నలు" en="Quick Questions" />:
        </div>
        <div className="flex flex-wrap gap-2">
          {SCHEME_CHAT_QA.map((qa) => (
            <button
              key={qa.id}
              type="button"
              onClick={() => askQA(qa)}
              className="bg-white hover:bg-emerald-50 border border-blue-200 hover:border-[#1B6B2F] rounded-full px-3.5 py-2 text-xs font-bold text-slate-900 cursor-pointer transition-colors"
            >
              🌾 <Bi te={qa.chip.te} en={qa.chip.en} />
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
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
                      className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-start gap-2.5"
                    >
                      <span className="w-6 h-6 rounded-full bg-[#1B6B2F] text-white text-xs font-extrabold flex items-center justify-center shrink-0">
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

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-950 font-semibold">
                📍{' '}
                <Bi
                  te="గమనిక: ఖచ్చితమైన వివరాల కోసం కాంతేరు గ్రామ సచివాలయంలో నిర్ధారించుకోండి."
                  en="Please confirm all details at Kantheru Panchayat Office."
                />
              </div>

              <button
                type="button"
                onClick={() =>
                  openCallModal({
                    title: SAMPLE_CONTACTS.sachivalayam.name,
                    phone: SAMPLE_CONTACTS.sachivalayam.phone,
                    note: SAMPLE_CONTACTS.sachivalayam.note,
                  })
                }
                className="w-full bg-[#1B6B2F] hover:bg-[#155724] text-white rounded-xl py-3 px-4 font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <Bi te="RBK హెల్ప్‌లైన్ కాల్ (1902 SAMPLE)" en="Call RBK Helpline (1902 SAMPLE)" />
              </button>
            </div>
          )
        )}
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
              : 'మీ సందేహం ఇక్కడ టైప్ చేయండి...'
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
