import IOSshareIcon from '@/components/Icons/IOSshareIcon/IOSshareIcon';
import './InstallPWA.scss';
import { useEffect, useRef, useState } from 'react';

export default function InstallPWA() {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const promptRef = useRef<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    setIsVisible(true);

    timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    const handleBeforeInstallPrompt = (event: Event) => {
      const beforeInstallPromptEvent = event as BeforeInstallPromptEvent;
      beforeInstallPromptEvent.preventDefault();
      promptRef.current = beforeInstallPromptEvent;
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const handleInstall = () => {
    if (promptRef.current) {
      promptRef.current.prompt();
    }
  };

  return isIOS ? (
    <div className={`InstallPWA ios ${isVisible ? 'show' : ''}`}>
      To install click <IOSshareIcon /> and Add to Home Screen
    </div>
  ) : (
    <button
      className={`InstallPWA ${isVisible ? 'show' : ''}`}
      onClick={handleInstall}
      aria-label="Install 2048 Game"
    >
      Click here to install 2048 👍
    </button>
  );
}
