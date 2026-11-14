/**
 * Loads everything the home page needs (challenge, categories, streak).
 *
 * Returns a simple state object so components never deal with promises:
 *   { status: 'loading' | 'ready' | 'error', challenge, categories, streak, reload }
 */
import { useCallback, useEffect, useState } from 'react';
import { getCategories, getDailyChallenge, getStreak } from '../services/api.js';

export function useHomeData() {
  const [state, setState] = useState({
    status: 'loading',
    challenge: null,
    categories: [],
    streak: 0,
  });

  const load = useCallback(async () => {
    setState((s) => ({ ...s, status: 'loading' }));
    try {
      const [challenge, categories, streak] = await Promise.all([
        getDailyChallenge(),
        getCategories(),
        getStreak(),
      ]);
      setState({ status: 'ready', challenge, categories, streak });
    } catch {
      setState((s) => ({ ...s, status: 'error' }));
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, reload: load };
}
