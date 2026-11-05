// Icons: lucide-react (thin 1.75 stroke) for UI, plus the two brand marks
// lucide doesn't ship in colour (Facebook, Google).
import {
  ArrowRight,
  ArrowUpRight,
  Banknote,
  Clock,
  MapPin,
  Pause,
  Phone,
  Play,
  Star,
} from "lucide-react";

type IconProps = { className?: string };
const STROKE = 1.75;

export function PhoneIcon({ className = "size-5" }: IconProps) {
  return <Phone aria-hidden="true" strokeWidth={STROKE} className={className} />;
}
export function MapPinIcon({ className = "size-5" }: IconProps) {
  return <MapPin aria-hidden="true" strokeWidth={STROKE} className={className} />;
}
export function ArrowRightIcon({ className = "size-4" }: IconProps) {
  return <ArrowRight aria-hidden="true" strokeWidth={STROKE} className={className} />;
}
export function ArrowUpRightIcon({ className = "size-4" }: IconProps) {
  return <ArrowUpRight aria-hidden="true" strokeWidth={STROKE} className={className} />;
}
export function BanknoteIcon({ className = "size-5" }: IconProps) {
  return <Banknote aria-hidden="true" strokeWidth={STROKE} className={className} />;
}
export function ClockIcon({ className = "size-5" }: IconProps) {
  return <Clock aria-hidden="true" strokeWidth={STROKE} className={className} />;
}
export function PauseIcon({ className = "size-4" }: IconProps) {
  return <Pause aria-hidden="true" strokeWidth={STROKE} className={className} />;
}
export function PlayIcon({ className = "size-4" }: IconProps) {
  return <Play aria-hidden="true" strokeWidth={STROKE} className={className} />;
}

/** Filled star — rating stars only (yellow) */
export function StarIcon({ className = "size-4" }: IconProps) {
  return <Star aria-hidden="true" strokeWidth={0} fill="currentColor" className={className} />;
}

export function FacebookIcon({ className = "size-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function GoogleIcon({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.56-5.17 3.56-8.81z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-3c-1.07.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.95H1.3v3.1A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.29 14.29a7.2 7.2 0 0 1 0-4.58v-3.1H1.3a12 12 0 0 0 0 10.78l3.99-3.1z" />
      <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44A11.5 11.5 0 0 0 12 0 12 12 0 0 0 1.3 6.61l3.99 3.1C6.23 6.88 8.88 4.77 12 4.77z" />
    </svg>
  );
}
