import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface LearningState {
  selectedLanguage: string | null;
  selectedLevel: string | null;
  quizProgress: { [key: string]: any }; // To store quiz progress
  setSelectedLanguage: (language: string | null) => void;
  setSelectedLevel: (level: string | null) => void;
  updateQuizProgress: (quizId: string, progress: any) => void;
}

const useLearningStore = create<LearningState>()(
  persist(
    (set) => ({
      selectedLanguage: null,
      selectedLevel: null,
      quizProgress: {},
      setSelectedLanguage: (language) => set({ selectedLanguage: language }),
      setSelectedLevel: (level) => set({ selectedLevel: level }),
      updateQuizProgress: (quizId, progress) =>
        set((state) => ({
          quizProgress: {
            ...state.quizProgress,
            [quizId]: progress,
          },
        })),
    }),
    {
      name: 'learning-storage', // name of the item in localStorage
      storage: createJSONStorage(() => localStorage), // use localStorage
    }
  )
);

export default useLearningStore;
