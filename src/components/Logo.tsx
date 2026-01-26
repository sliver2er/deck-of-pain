import logoLight from '@/assets/logo/logo.png';
import logoDark from '@/assets/logo/logo_dark.png';

interface LogoProps {
  size?: number;
  variant?: 'light' | 'dark' | 'auto';
  className?: string;
  style?: React.CSSProperties;
}

export function Logo({
  size = 120,
  variant = 'auto',
  className,
  style
}: LogoProps) {
  const isDarkMode = variant === 'dark' ||
    (variant === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const logoSrc = isDarkMode ? logoDark : logoLight;

  return (
    <img
      src={logoSrc}
      alt="Deck of Pain Logo"
      width={size}
      height={size}
      className={className}
      style={{
        objectFit: 'contain',
        ...style,
      }}
    />
  );
}
