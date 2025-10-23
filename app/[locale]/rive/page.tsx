'use client';
import { useRive } from '@rive-app/react-canvas';

export default function page() {
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
          onMouseEnter={() => rive?.play()}
          onMouseLeave={() => rive?.pause()}
        />
      </div>
    </div>
  );
}
