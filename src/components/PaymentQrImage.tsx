'use client';

import { useState, useEffect } from 'react';
import { QrCode, RefreshCw } from 'lucide-react';

interface PaymentQrImageProps {
  src: string;
  alt?: string;
  defaultSrc?: string;
}

export default function PaymentQrImage({
  src = '/images/Weekend-animal.jpg',
  alt = 'Payment QR Code',
  defaultSrc = '/images/Weekend-animal.jpg',
}: PaymentQrImageProps) {
  const STATIC_DEFAULT = '/images/Weekend-animal.jpg';
  const cleanSrc = src && src !== '/images/payment-qr.png' && src !== 'images/payment-qr.png' ? src : STATIC_DEFAULT;

  const [imgSrc, setImgSrc] = useState<string>(cleanSrc);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const validSrc = src && src !== '/images/payment-qr.png' && src !== 'images/payment-qr.png' ? src : STATIC_DEFAULT;
    setImgSrc(validSrc);
    setLoading(true);
  }, [src]);

  const handleError = () => {
    if (imgSrc !== STATIC_DEFAULT) {
      setImgSrc(STATIC_DEFAULT);
      setLoading(true);
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-[180px] w-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse">
          <RefreshCw className="w-6 h-6 text-slate-400 animate-spin" />
        </div>
      )}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imgSrc || STATIC_DEFAULT}
        alt={alt}
        onLoad={() => setLoading(false)}
        onError={handleError}
        className={`w-full h-auto max-w-[220px] mx-auto object-contain transition-opacity duration-300 ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
}
