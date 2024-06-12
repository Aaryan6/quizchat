import { create } from "zustand";

type Props = {
  query: string | null;
  setQuery: (v: string) => void;
};

const useChatQuery = create<Props>((set) => ({
  query: null,
  setQuery: (value) => set({ query: value }),
}));

export default useChatQuery;
