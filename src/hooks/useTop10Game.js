/**
 * Game logic for one Top 10 challenge. No UI in here.
 *
 * Rules (edit the constants/functions below to change them):
 *  - The player guesses answers; correct guesses are revealed in their slot.
 *  - Every wrong guess costs one "life". At MAX_MISTAKES wrong guesses the
 *    game is lost and the remaining answers are shown.
 *  - Finding all answers wins. The player can also give up.
 *
 * Usage:
 *   const game = useTop10Game(challenge);
 *   game.slots, game.submitGuess('ماينكرافت'), game.giveUp(), game.reset() ...
 *
 * If the backend should validate guesses instead, replace the matching logic
 * in `submitGuess` with a call to your API (the rest of the hook can stay).
 */
import { useCallback, useMemo, useState } from 'react';
import { normalizeArabic } from '../lib/normalizeArabic.js';
import { t } from '../content/strings.js';

export const MAX_MISTAKES = 5;

/** Game phases. */
export const PHASE = {
  PLAYING: 'playing',
  WON: 'won',
  LOST: 'lost',
  GAVE_UP: 'gaveUp',
};

/** Slot display states, consumed by <AnswerSlot />. */
export const SLOT = {
  HIDDEN: 'hidden', // not found yet, text is hidden
  FOUND: 'found', // guessed by the player
  MISSED: 'missed', // revealed after the game ended without being found
};

/** Feedback tones, consumed by <StatusChip />. */
export const TONE = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
};

/**
 * @param {import('../data/mockData.js').Challenge} challenge
 */
export function useTop10Game(challenge) {
  const [foundRanks, setFoundRanks] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [phase, setPhase] = useState(PHASE.PLAYING);
  const [feedback, setFeedback] = useState(null); // { tone, text } | null

  const isOver = phase !== PHASE.PLAYING;

  // Pre-compute the accepted spellings of every answer once per challenge.
  const matchers = useMemo(
    () =>
      challenge.answers.map((answer) => ({
        rank: answer.rank,
        accepted: [answer.text, ...(answer.aliases ?? [])].map(normalizeArabic),
      })),
    [challenge],
  );

  /** Answers prepared for display, in rank order. */
  const slots = useMemo(
    () =>
      challenge.answers.map((answer) => {
        const found = foundRanks.includes(answer.rank);
        let state = SLOT.HIDDEN;
        if (found) state = SLOT.FOUND;
        else if (isOver) state = SLOT.MISSED;
        return { rank: answer.rank, text: answer.text, state };
      }),
    [challenge, foundRanks, isOver],
  );

  /** Process one guess typed by the player. */
  const submitGuess = useCallback(
    (rawGuess) => {
      if (isOver) return;
      const guess = normalizeArabic(rawGuess);
      if (!guess) return;

      const match = matchers.find((m) => m.accepted.includes(guess));

      // Correct guess ----------------------------------------------------
      if (match) {
        if (foundRanks.includes(match.rank)) {
          setFeedback({ tone: TONE.INFO, text: t.feedback.duplicate });
          return;
        }
        const nextFound = [...foundRanks, match.rank];
        setFoundRanks(nextFound);
        if (nextFound.length === challenge.answers.length) {
          setPhase(PHASE.WON);
          setFeedback({ tone: TONE.SUCCESS, text: t.feedback.won });
        } else {
          setFeedback({ tone: TONE.SUCCESS, text: t.feedback.correct });
        }
        return;
      }

      // Wrong guess ------------------------------------------------------
      const nextMistakes = mistakes + 1;
      setMistakes(nextMistakes);
      if (nextMistakes >= MAX_MISTAKES) {
        setPhase(PHASE.LOST);
        setFeedback({ tone: TONE.ERROR, text: t.feedback.lost });
      } else {
        setFeedback({ tone: TONE.ERROR, text: t.feedback.wrong });
      }
    },
    [isOver, matchers, foundRanks, mistakes, challenge],
  );

  /** Reveal everything and end the game. */
  const giveUp = useCallback(() => {
    if (isOver) return;
    setPhase(PHASE.GAVE_UP);
    setFeedback({ tone: TONE.INFO, text: t.feedback.gaveUp });
  }, [isOver]);

  /** Start the same challenge again from scratch. */
  const reset = useCallback(() => {
    setFoundRanks([]);
    setMistakes(0);
    setPhase(PHASE.PLAYING);
    setFeedback(null);
  }, []);

  return {
    slots,
    foundCount: foundRanks.length,
    total: challenge.answers.length,
    mistakes,
    maxMistakes: MAX_MISTAKES,
    phase,
    isOver,
    feedback,
    submitGuess,
    giveUp,
    reset,
  };
}
