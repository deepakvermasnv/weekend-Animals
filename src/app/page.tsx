import Header from '@/components/Header';
import Hero from '@/components/Hero';
import NextMatchCard from '@/components/NextMatchCard';
import HowItWorks from '@/components/HowItWorks';
import WhoCanJoin from '@/components/WhoCanJoin';
import PlayersRoster from '@/components/PlayersRoster';
import WhatYouGet from '@/components/WhatYouGet';
import GroundInfo from '@/components/GroundInfo';
import RulesSection from '@/components/RulesSection';
import FaqSection from '@/components/FaqSection';
import FinalCta from '@/components/FinalCta';
import Footer from '@/components/Footer';

import { getSiteSettings } from '@/lib/settings';
import { getApiUrl } from '@/lib/api';

export const revalidate = 0; // Ensure fresh match data on every request

type FAQItem = { id: string; question: string; answer: string; displayOrder: number; published: boolean };
type RuleItem = { id: string; text: string; displayOrder: number; published: boolean };

type MatchData = {
  id: string;
  title: string;
  date: string | Date;
  startTime: string;
  endTime: string;
  groundName: string;
  groundAddress: string;
  mapsUrl: string;
  fee: number;
  maxPlayers: number;
  description?: string;
  status: string;
  registrationOpen: boolean;
  isWaitlistEnabled: boolean;
};

export default async function HomePage() {
  const settings = await getSiteSettings();
  let match: MatchData | null = null;
  let confirmedCount = 0;
  let availableSpots = 0;
  let publicPlayers: string[] = [];
  let faqs: FAQItem[] = [];
  let rules: RuleItem[] = [];

  try {
    // 1. Fetch public match details
    const matchRes = await fetch(getApiUrl('/api/public/match'), { cache: 'no-store' });
    if (matchRes.ok) {
      const matchData = await matchRes.json();
      match = matchData.match || null;
      confirmedCount = matchData.confirmedCount || 0;
      availableSpots = matchData.availableSpots || 0;
      publicPlayers = matchData.publicPlayers || [];
    }

    // 2. Fetch FAQs & Rules
    const faqsRes = await fetch(getApiUrl('/api/public/faqs'), { cache: 'no-store' });
    if (faqsRes.ok) {
      const faqsData = await faqsRes.json();
      faqs = faqsData.faqs || [];
    }

    const rulesRes = await fetch(getApiUrl('/api/public/rules'), { cache: 'no-store' });
    if (rulesRes.ok) {
      const rulesData = await rulesRes.json();
      rules = rulesData.rules || [];
    }
  } catch (error) {
    console.error('API fetch error on HomePage:', error);
  }

  const googleFormUrl = settings.googleFormUrl || 'https://forms.google.com';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      <Header googleFormUrl={googleFormUrl} communityName={settings.communityName} />

      <main className="flex-grow pt-16 sm:pt-20">
        <Hero
          googleFormUrl={googleFormUrl}
          confirmedCount={match ? confirmedCount : undefined}
          maxPlayers={match ? match.maxPlayers : undefined}
        />

        <NextMatchCard
          match={
            match
              ? {
                  id: match.id,
                  title: match.title,
                  date: match.date,
                  startTime: match.startTime,
                  endTime: match.endTime,
                  groundName: match.groundName,
                  groundAddress: match.groundAddress,
                  mapsUrl: match.mapsUrl,
                  fee: match.fee,
                  maxPlayers: match.maxPlayers,
                  description: match.description || undefined,
                  status: match.status,
                  registrationOpen: match.registrationOpen,
                  isWaitlistEnabled: match.isWaitlistEnabled,
                }
              : null
          }
          confirmedCount={confirmedCount}
          availableSpots={availableSpots}
          googleFormUrl={googleFormUrl}
        />

        <PlayersRoster publicPlayers={publicPlayers} confirmedCount={confirmedCount} />

        <GroundInfo
          groundName={match?.groundName || 'ABC Cricket Ground'}
          groundAddress={match?.groundAddress || '123 Stadium Road'}
          mapsUrl={match?.mapsUrl || settings.googleMapsUrl}
        />

        <HowItWorks />

        <WhoCanJoin />

        <WhatYouGet />

        <RulesSection rules={rules} />

        <FaqSection faqs={faqs} />

        <FinalCta googleFormUrl={googleFormUrl} whatsappGroupUrl={settings.whatsappGroupUrl} />
      </main>

      <Footer
        communityName={settings.communityName}
        communityDescription={settings.communityDescription}
        whatsappGroupUrl={settings.whatsappGroupUrl}
        contactWhatsappNumber={settings.contactWhatsappNumber}
        contactEmail={settings.contactEmail}
      />
    </div>
  );
}
