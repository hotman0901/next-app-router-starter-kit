import { useBearStore } from '@/store/count';

export default function Count() {
  const bears = useBearStore((state) => state.bears);
  const increase = useBearStore((state) => state.increase);

  return (
    <div>
      Child Count {bears}
      <div>
        <button onClick={() => increase()}>increase</button>
      </div>
    </div>
  );
}
