import { Link } from 'react-router-dom'
import type { Question } from '../../types'
import { difficultyLabel } from '../Chip'

export default function NextQuestions({
  topicName,
  topicPath,
  questions,
}: {
  topicName: string
  topicPath: string
  questions: Question[]
}) {
  return (
    <section className="rounded-card border border-line bg-card p-5">
      <h2 className="text-lg font-bold text-mut">التالي في {topicName}</h2>
      {questions.length > 0 && (
        <ul className="mt-3 list-none divide-y divide-line p-0">
          {questions.map((q) => (
            <li key={q.id}>
              <Link to={`/play/${q.id}`} className="flex items-center justify-between gap-3 py-3 hover:text-brand">
                <span className="text-lg font-bold">{q.title}</span>
                <span className="text-sm text-soft">{difficultyLabel[q.difficulty]}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Link to={topicPath} className="mt-3 block text-base font-bold text-brand hover:underline">
        عرض كل أسئلة {topicName}
      </Link>
    </section>
  )
}
