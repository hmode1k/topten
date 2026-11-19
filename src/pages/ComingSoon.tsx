import Page from '../components/Page'
import { ButtonLink } from '../components/Button'

/** Stand-in for pages that are not designed yet (Leaderboard, SignIn, Results). */
export default function ComingSoon({ title }: { title: string }) {
  return (
    <Page>
      <h1 className="text-4xl font-black sm:text-5xl">{title}</h1>
      <p className="mt-3 text-lg text-mut">هذه الصفحة قيد التصميم. نضيفها قريبًا.</p>
      <ButtonLink to="/categories" className="mt-8">
        ارجع للفئات
      </ButtonLink>
    </Page>
  )
}
