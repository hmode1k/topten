import type { Category, Question } from '../types'

// Placeholder content. The owner will replace it (later this can be swapped for an API/DB).

const a = (rank: number, label: string, aliases?: string[]) => ({ rank, label, aliases })

const minecraftQuestions: Question[] = [
  {
    id: 'mc-rarest-items',
    title: 'أندر ١٠ عناصر',
    difficulty: 'easy',
    hints: ['أندرها يُحصل عليه بعد هزيمة التنين', 'فيها عنصر يمنحك الطيران'],
    answers: [
      a(1, 'بيضة التنين', ['بيضه التنين', 'دراغون ايج']),
      a(2, 'قلب البحر'),
      a(3, 'تفاحة ذهبية مسحورة', ['تفاحة مسحورة', 'تفاحه ذهبيه مسحوره']),
      a(4, 'رأس الويذر', ['جمجمة الويذر']),
      a(5, 'نجمة النذر', ['نجمة الويذر', 'نذر ستار']),
      a(6, 'الرمح الثلاثي', ['ترايدنت']),
      a(7, 'الإليترا', ['اجنحة', 'أجنحة']),
      a(8, 'توتم الخلود', ['توتم']),
      a(9, 'أسطوانة بيغ ستيب', ['بيغ ستيب', 'بيجستيب']),
      a(10, 'صندوق الإندر', ['انتر شست', 'صندوق الاندر']),
    ],
  },
  {
    id: 'mc-dangerous-mobs',
    title: 'أخطر ١٠ وحوش',
    difficulty: 'easy',
    hints: ['أخطرها يتكوّن من جماجم', 'بعضها ينفجر بالقرب منك'],
    answers: [
      a(1, 'الويذر', ['وذر']),
      a(2, 'التنين', ['إندر دراغون', 'اندر دراجون']),
      a(3, 'الواردن', ['وردن']),
      a(4, 'الغاست', ['غاست']),
      a(5, 'الكريبر', ['كريبر']),
      a(6, 'البليز', ['بليز']),
      a(7, 'الإندرمان', ['اندرمان']),
      a(8, 'الهيكل العظمي', ['سكيليتون']),
      a(9, 'الزومبي', ['زومبي']),
      a(10, 'العنكبوت', ['سبايدر']),
    ],
  },
  {
    id: 'mc-expensive-blocks',
    title: 'أغلى ١٠ بلوكات',
    difficulty: 'medium',
    hints: ['أغلاها يُصنع من خامة النذرايت', 'فيها بلوك أزرق وبلوك أخضر'],
    answers: [
      a(1, 'بلوك النذرايت', ['نذرايت', 'نيذرايت']),
      a(2, 'بلوك الزمرد', ['زمرد', 'ايميرالد', 'إيميرالد']),
      a(3, 'بلوك الألماس', ['ألماس', 'الماس', 'دايموند']),
      a(4, 'بلوك الذهب', ['ذهب']),
      a(5, 'بلوك اللازورد', ['لازورد']),
      a(6, 'بلوك الحديد', ['حديد']),
      a(7, 'بلوك الريدستون', ['ريدستون']),
      a(8, 'بلوك النحاس', ['نحاس']),
      a(9, 'بلوك الكوارتز', ['كوارتز']),
      a(10, 'بلوك الفحم', ['فحم']),
    ],
  },
]

export const categories: Category[] = [
  {
    id: 'games',
    name: 'ألعاب',
    icon: 'gamepad',
    tint: 'mint',
    topics: [
      { id: 'minecraft', name: 'ماينكرافت', questions: minecraftQuestions },
      { id: 'gta6', name: 'جي تي إيه ٦', questions: [] },
      { id: 'dark-souls', name: 'دارك سولز', questions: [] },
      { id: 'fortnite', name: 'فورتنايت', questions: [] },
      { id: 'mario', name: 'ماريو', questions: [] },
      { id: 'zelda', name: 'زيلدا', questions: [] },
      { id: 'valorant', name: 'فالورانت', questions: [] },
      { id: 'fifa', name: 'فيفا', questions: [] },
    ],
  },
  { id: 'sports', name: 'رياضة', icon: 'goal', tint: 'violet', topics: [] },
  { id: 'food', name: 'طعام ومطابخ', icon: 'utensils', tint: 'pink', topics: [] },
  { id: 'movies', name: 'أفلام ومسلسلات', icon: 'film', tint: 'blue', topics: [] },
  { id: 'music', name: 'موسيقى', icon: 'music', tint: 'violet', topics: [] },
  { id: 'geography', name: 'دول وجغرافيا', icon: 'globe', tint: 'mint', topics: [] },
  { id: 'tech', name: 'تقنية', icon: 'cpu', tint: 'blue', topics: [] },
  { id: 'science', name: 'علوم', icon: 'flask', tint: 'pink', topics: [] },
]

// ---- lookups ----

export const categoryQuestions = (c: Category): Question[] => c.topics.flatMap((t) => t.questions)

export const allQuestions: Question[] = categories.flatMap(categoryQuestions)

export const findCategory = (id: string) => categories.find((c) => c.id === id)

export const findTopic = (catId: string, topicId: string) =>
  findCategory(catId)?.topics.find((t) => t.id === topicId)

/** Find a question plus where it lives (for breadcrumbs and "next in topic"). */
export function findQuestion(questionId: string) {
  for (const category of categories) {
    for (const topic of category.topics) {
      const question = topic.questions.find((q) => q.id === questionId)
      if (question) return { category, topic, question }
    }
  }
  return undefined
}
