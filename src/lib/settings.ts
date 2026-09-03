import { getApiUrl } from './api';

export const DEFAULT_SETTINGS: Record<string, string> = {
  communityName: 'Weekend Animal',
  communityDescription: 'Join our local weekend cricket community, meet new players and enjoy a game every weekend.',
  googleFormUrl: 'https://forms.google.com',
  paymentQrCodeUrl: '/images/Weekend-animal.jpg',
  upiId: 'deepuverma124124-1@okicici',
  paymentConfirmationUrl: 'https://wa.me/919876543210?text=I%20have%20completed%20the%20payment%20for%20the%20upcoming%20cricket%20match',
  whatsappGroupUrl: 'https://chat.whatsapp.com/sample-group-invite',
  contactWhatsappNumber: '+919876543210',
  contactEmail: 'organizer@weekendcricket.com',
  googleMapsUrl: 'https://maps.google.com',
  showPublicPlayerNames: 'true',
};

export async function getSiteSettings(): Promise<Record<string, string>> {
  try {
    const res = await fetch(getApiUrl('/api/public/settings'), { cache: 'no-store' });
    if (!res.ok) return DEFAULT_SETTINGS;
    const data = await res.json();
    return data.settings || DEFAULT_SETTINGS;
  } catch (error) {
    console.error('Failed to load site settings from API:', error);
    return DEFAULT_SETTINGS;
  }
}
