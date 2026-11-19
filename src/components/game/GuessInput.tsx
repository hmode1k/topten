import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import type { Feedback } from '../../lib/gameLogic'

/**
 * Big input + separate "حزّر" button. The button is the second child, so in RTL it sits
 * on the left of the input. Keyboard: Enter = submit, Esc = clear, Tab = hint.
 */
export default function GuessInput({
  value,
  onChange,
  onSubmit,
  onHint,
  feedback,
  feedbackId,
}: {
  value: string
  onChange: (v: string) => void
  onSubmit: () => void
  onHint: () => void
  feedback: Feedback | null
  feedbackId: number
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [shake, setShake] = useState(false)

  // Keep focus in the input at all times
  useEffect(() => {
    inputRef.current?.focus()
  }, [feedbackId])

  // Small shake on a wrong guess
  useEffect(() => {
    if (feedback?.kind === 'wrong') setShake(true)
  }, [feedbackId]) // eslint-disable-line react-hooks/exhaustive-deps

  const submit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit()
    inputRef.current?.focus()
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      onChange('')
    } else if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault()
      onHint()
    }
  }

  return (
    <div>
      <form onSubmit={submit} className="flex items-stretch gap-3 sm:gap-4">
        <div
          className={`flex-1 rounded-[26px] p-1 shadow-[0_0_0_6px_rgba(74,222,128,0.12)] ${shake ? 'anim-shake' : ''}`}
          onAnimationEnd={() => setShake(false)}
        >
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="اكتب تخمينك"
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            className="h-16 w-full rounded-[22px] border-2 border-brand bg-card px-5 text-2xl font-bold text-ink caret-brand placeholder:text-soft focus:outline-none sm:h-24 sm:px-7 sm:text-[38px]"
          />
        </div>
        <button
          type="submit"
          className="shrink-0 whitespace-nowrap rounded-[22px] bg-brand px-6 text-2xl font-black text-brand-ink shadow-glow hover:brightness-105 sm:px-10 sm:text-[30px]"
        >
          حزّر
        </button>
      </form>

      <p
        role="status"
        aria-live="polite"
        className={`mt-3 min-h-[28px] text-lg font-bold ${
          feedback?.kind === 'correct' ? 'text-brand' : feedback?.kind === 'wrong' ? 'text-pink' : 'text-mut'
        }`}
      >
        {feedback?.text ?? ''}
      </p>

      <p className="mt-1 hidden gap-5 text-sm text-soft sm:flex">
        <span><b className="text-mut">Enter</b> حزّر</span>
        <span><b className="text-mut">Tab</b> تلميح</span>
        <span><b className="text-mut">Esc</b> مسح</span>
        <span>لا يهم الإملاء الدقيق أو الهمزات</span>
      </p>
    </div>
  )
}
