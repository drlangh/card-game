import { create } from 'zustand';

const useCardStore = create((set) => ({
  rotating: false,
  cardReady: false,
  cardData: 'Click "Generate Card" to begin.',
  setRotating: (rotating) => set({ rotating }),
  setCardReady: (cardReady) => set({ cardReady }),
  setCardData: (cardData) => set({ cardData }),
}));

export default useCardStore;
