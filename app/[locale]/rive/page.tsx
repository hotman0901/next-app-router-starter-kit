'use client';
import { useRive } from '@rive-app/react-canvas';
import { useRouter } from 'next/navigation';

import { useI18n, useScopedI18n } from '@/locales/client';

export default function page() {
  const router = useRouter();
  const t = useI18n();
  const scopedT = useScopedI18n('hello');
  const { rive, RiveComponent } = useRive({
    src: 'https://cdn.rive.app/animations/vehicles.riv',
    stateMachines: 'bumpy',
    autoplay: false,
  });
  return (
    <div>
      <h2>RIVE</h2>
      <div style={{ width: '500px', height: '500px' }}>
        <RiveComponent
          onMouseEnter={() => rive && rive.play()}
          onMouseLeave={() => rive && rive.pause()}
        />
      </div>
    </div>
  );
}
