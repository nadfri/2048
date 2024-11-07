import IOSshareIcon from '@/components/Icons/IOSshareIcon/IOSshareIcon';
import './InstallPWA.scss';
import { useEffect, useRef, useState } from 'react';

export default function InstallPWA() {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const promptRef = useRef<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const handleBeforeInstallPrompt = (event: Event) => {
      const beforeInstallPromptEvent = event as BeforeInstallPromptEvent;
      beforeInstallPromptEvent.preventDefault();
      promptRef.current = beforeInstallPromptEvent;

      setIsVisible(true);

      timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
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
    >
      Click here to install 2048 👍
    </button>
  );
}
