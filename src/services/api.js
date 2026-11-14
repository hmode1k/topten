/**
 * API layer: the ONLY place the front end talks to a backend.
 *
 * Today every function returns sample data from src/data/mockData.js after a
 * short delay (to mimic the network). When your backend is ready, replace the
 * body of each function with a real `fetch` call. Nothing else in the app
 * needs to change as long as the returned shapes stay the same
 * (see the typedefs in mockData.js).
 *
 * Example of the swap:
 *
 *   export async function getDailyChallenge() {
 *     const res = await fetch(`${API_BASE}/challenges/today`);
 *     if (!res.ok) throw new Error('Failed to load challenge');
 *     return res.json();
 *   }
 */
import { mockCategories, mockChallenge, mockStreak } from '../data/mockData.js';

/** Base URL of your backend. Set VITE_API_BASE in a .env file. */
// eslint-disable-next-line no-unused-vars
const API_BASE = import.meta.env?.VITE_API_BASE ?? '/api';

/** Simulated network latency (ms). Remove together with `delay` below. */
const FAKE_LATENCY = 300;
const delay = (value) => new Promise((resolve) => setTimeout(() => resolve(value), FAKE_LATENCY));

/**
 * Today's challenge.
 * Suggested endpoint: GET /api/challenges/today
 * @returns {Promise<import('../data/mockData.js').Challenge>}
 */
export function getDailyChallenge() {
  return delay(mockChallenge);
}

/**
 * Challenge categories for the sidebar.
 * Suggested endpoint: GET /api/categories
 * @returns {Promise<import('../data/mockData.js').Category[]>}
 */
export function getCategories() {
  return delay(mockCategories);
}

/**
 * The signed-in player's streak in days (0 when logged out).
 * Suggested endpoint: GET /api/me/streak
 * @returns {Promise<number>}
 */
export function getStreak() {
  return delay(mockStreak);
}
