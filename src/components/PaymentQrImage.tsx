'use client';

import { useState, useEffect } from 'react';
import { QrCode, RefreshCw } from 'lucide-react';

interface PaymentQrImageProps {
  src: string;
  alt?: string;
  defaultSrc?: string;
}

export default function PaymentQrImage({
  src,
  alt = 'Payment QR Code',
  defaultSrc = '/images/Weekend-animal.jpg',
}: PaymentQrImageProps) {
  const sanitizeSrc = (input?: string) => {
    if (!input || input === '/images/payment-qr.png' || input === 'images/payment-qr.png') {
      return defaultSrc;
    }
    if (input.startsWith('http://') || input.startsWith('https://') || input.startsWith('data:')) {
      return input;
    }
    return input.startsWith('/') ? input : `/${input}`;
  };

  const initialSrc = sanitizeSrc(src);
  const [imgSrc, setImgSrc] = useState<string>(initialSrc);
  const [hasError, setHasError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const cleanSrc = sanitizeSrc(src);
    setImgSrc(cleanSrc);
    setHasError(false);
    setLoading(true);
  }, [src, defaultSrc]);

  const handleError = () => {
    if (!hasError && imgSrc !== defaultSrc) {
      console.warn('QR code image failed to load, falling back to default QR image.');
      setImgSrc(defaultSrc);
      setLoading(true);
    } else {
      setHasError(true);
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-[180px] w-full">
      {loading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse">
          <RefreshCw className="w-6 h-6 text-slate-400 animate-spin" />
        </div>
      )}

      {hasError ? (
        <div className="p-4 text-center space-y-2">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600">
            <QrCode className="w-8 h-8" />
          </div>
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            QR Code Available via UPI ID below
          </p>
        </div>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={imgSrc}
          alt={alt}
          onLoad={() => setLoading(false)}
          onError={handleError}
          className={`w-full h-auto max-w-[220px] mx-auto object-contain transition-opacity duration-300 ${
            loading ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}
    </div>
  );
}
