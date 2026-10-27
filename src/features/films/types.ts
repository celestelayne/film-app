import { z } from 'zod'

const text = z.string().min(1)
const textList = z.array(text).min(1)

export const filmSchema = z.object({
  id: text,
  title: text,
  year: z.number().int().optional(),
  runtimeMinutes: z.number().int().positive().optional(),
  genres: textList.optional(),
  director: text.optional(),
  actors: textList.optional(),
  description: text.optional(),
})

export const filmsSchema = z.array(filmSchema).refine(
  (films) => new Set(films.map((film) => film.id)).size === films.length,
  { message: 'Film ids must be unique' },
)

export type Film = z.infer<typeof filmSchema>
