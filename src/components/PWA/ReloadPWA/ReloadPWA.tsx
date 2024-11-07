import './ReloadPWA.scss';
import { useRegisterSW } from 'virtual:pwa-register/react';

export default function ReloadPWA() {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  if (!needRefresh) return null;

  return (
    <div className="ReloadPWA">
      <div className="modal-reload">
        <p>New content available. Reload to update.</p>

        <button
          className="btn-reload"
          onClick={() => updateServiceWorker(true)}
        >
          RELOAD
        </button>
      </div>
    </div>
  );
}
