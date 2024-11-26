import { create } from 'zustand';

const useInformationStore = create((set) => ({
  age: null,
  category: null,
  setAge: (age) => set({ age }),
  setCategory: (category) => set({ category }),
}));

export default useInformationStore;
