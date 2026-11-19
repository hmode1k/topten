import { Clock } from 'lucide-react'
import Page from '../components/Page'
import Chip from '../components/Chip'
import { ButtonLink } from '../components/Button'
import { allQuestions, categories } from '../data/categories'
import { toAr } from '../lib/arabic'

/** Static, decorative copy of the game screen. Not interactive on purpose. */
function GamePreview() {
  const row = (rank: number, name?: string, ring = false) => (
    <div
      className={`flex h-14 items-center gap-3 rounded-[14px] px-3 ${
        name
          ? `border-2 border-violet bg-violet-tint ${ring ? 'ring-4 ring-brand/30' : ''}`
          : 'border-2 border-dashed border-line bg-card/50'
      }`}
    >
      <span
        className={`grid h-9 w-9 place-items-center rounded-[10px] text-lg font-black ${
          name ? 'bg-brand text-brand-ink' : 'bg-track text-soft'
        }`}
      >
        {toAr(rank)}
      </span>
      {name ? (
        <span className="text-lg font-extrabold">{name}</span>
      ) : (
        <span className="h-1 w-6 rounded-full bg-track" />
      )}
    </div>
  )

  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[560px]">
      <div className="rounded-card border border-line bg-card p-6 shadow-glow">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xl font-black">أندر ١٠ عناصر في ماينكرافت</p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-card2 px-3 py-1 text-sm font-bold text-mut">
            <Clock className="h-3.5 w-3.5" />
            <span dir="ltr">٠٢:١٤</span>
          </span>
        </div>
        <div className="mt-4 space-y-2.5">
          {row(1, 'بيضة التنين')}
          {row(2)}
          {row(3, 'تفاحة ذهبية مسحورة', true)}
          {row(4)}
          {row(5)}
          {row(6)}
        </div>
        <div className="mt-4 flex items-stretch gap-3">
          <div className="flex h-14 flex-1 items-center rounded-[16px] border-2 border-brand bg-card2 px-4 text-xl font-bold">
            منارة
            <span className="ms-0.5 inline-block h-6 w-0.5 bg-brand" />
          </div>
          <span className="grid place-items-center rounded-[16px] bg-brand px-6 text-xl font-black text-brand-ink">
            حزّر
          </span>
        </div>
      </div>

      <span className="absolute -top-4 end-6 rounded-full border border-pink/40 bg-pink-tint px-4 py-1.5 text-sm font-bold text-pink">
        الأخطاء ١ من ٥
      </span>
      <span className="absolute -bottom-4 start-6 rounded-full border border-brand/40 bg-bg px-4 py-1.5 text-sm font-bold text-brand">
        صح! مكانه رقم ٣
      </span>
    </div>
  )
}

/** Landing: only the hero section (headline, short text, play button, stats, game preview). */
export default function Landing() {
  return (
    <Page header="landing">
      <section className="grid items-center gap-14 py-8 lg:grid-cols-2 lg:py-16">
        {/* Text column: first in the DOM, so it is on the right in RTL */}
        <div>
          <Chip tone="mint">لعبة كتابة جديدة</Chip>
          <h1 className="mt-6 text-[44px] font-black leading-[1.25] sm:text-6xl lg:text-[68px]">
            اكتب أفضل ١٠ قبل ما تخسر فرصك الخمس
          </h1>
          <p className="mt-6 max-w-[34ch] text-lg leading-[1.7] text-mut sm:text-xl">
            اختر موضوعًا تحبه وخمّن عناصر القائمة. كل إجابة صحيحة تأخذ مكانها في الترتيب من ١ إلى ١٠.
          </p>

          <div className="mt-8">
            <ButtonLink to="/categories" size="lg">
              ابدأ اللعب
            </ButtonLink>
          </div>

          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-5">
            <div>
              <dt className="text-3xl font-black">{toAr(allQuestions.length)}</dt>
              <dd className="text-base text-mut">أسئلة جاهزة</dd>
            </div>
            <div>
              <dt className="text-3xl font-black">{toAr(categories.length)}</dt>
              <dd className="text-base text-mut">فئات رئيسية</dd>
            </div>
            <div>
              <dt className="text-3xl font-black">مجانًا</dt>
              <dd className="text-base text-mut">تلعب بدون تسجيل</dd>
            </div>
          </dl>
        </div>

        {/* Preview: second in the DOM, so it is on the left in RTL */}
        <GamePreview />
      </section>
    </Page>
  )
}
