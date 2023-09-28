import { create } from 'zustand'
import { redux, devtools } from "zustand/middleware";


interface BearState {
  bears: number,
  increase: () => void
}


export const useBearStore = create<BearState>()(
  (set) => ({
    bears: 1,
    increase: () => set((state) => ({ bears: state.bears + 1 })),
  })
)
