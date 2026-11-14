/**
 * Text box + "خمّن" button.
 *
 * The input text is local state; on submit the parent receives the raw text
 * and the box is cleared. Both controls are disabled once the game is over.
 *
 * Props:
 *  - onGuess(text)  called with the typed text
 *  - disabled       true when the game is over
 */
import { useState } from 'react';
import { t } from '../../content/strings.js';
import Button from '../ui/Button.jsx';

export default function GuessForm({ onGuess, disabled = false }) {
  const [value, setValue] = useState('');

  function handleSubmit(event) {
    event.preventDefault(); // stop the page from reloading
    if (!value.trim()) return;
    onGuess(value);
    setValue('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-2.5 flex items-center gap-2 rounded-xl border-2 border-pine bg-white p-1"
    >
      {/* Visually hidden label keeps the input accessible */}
      <label htmlFor="guess" className="sr-only">
        {t.game.guessLabel}
      </label>
      <input
        id="guess"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        placeholder={t.game.guessPlaceholder}
        autoComplete="off"
        className="h-10 min-w-0 flex-1 bg-transparent px-3 text-base text-ink outline-none placeholder:text-muted/70 disabled:opacity-60"
      />
      <Button type="submit" disabled={disabled} className="h-10 px-6 text-base">
        {t.game.guessButton}
      </Button>
    </form>
  );
}
