import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer'


// 基本寫法
// interface BearState {
//   bears: number;
//   increase: () => void;
// }

// export const useBearStore = create<BearState>()((set) => ({
//   bears: 1,
//   increase: () => set((state) => ({ bears: state.bears + 1 })),
// }));


// 使用 immer 寫法
type State = {
  bears: number
}

type Actions = {
  increase: () => void
}

export const useBearStore = create(
  immer<State & Actions>((set) => ({
    bears: 1,
    increase: () => {
      set((state) => {
        state.bears += 1
      })
    }
  }))
)

