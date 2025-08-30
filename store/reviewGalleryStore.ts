import { create } from "zustand";

interface ReviewGalleryState {
  isGalleryOpen: boolean;
  currentReviewIndex: number;
  currentImageIndex: number;

  // Actions
  openGallery: (reviewIndex: number, imageIndex: number) => void;
  closeGallery: () => void;
}

const useReviewGalleryStore = create<ReviewGalleryState>((set, get) => ({
  // Initial state
  isGalleryOpen: false,
  reviews: [],
  currentReviewIndex: 0,
  currentImageIndex: 0,

  // Actions
  openGallery: (currentReviewIndex: number, currentImageIndex: number) => {
    if (currentReviewIndex >= 0) {
      set({
        isGalleryOpen: true,
        currentReviewIndex: currentReviewIndex || 0,
        currentImageIndex: currentImageIndex || 0,
      });
    }
  },

  closeGallery: () =>
    set({ isGalleryOpen: false, currentImageIndex: 0, currentReviewIndex: 0 }),
}));

export default useReviewGalleryStore;
