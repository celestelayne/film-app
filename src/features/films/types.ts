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

export const filmsSchema = z.array(filmSchema).superRefine((films, ctx) => {
  const seen = new Set<string>()
  films.forEach((film, index) => {
    if (seen.has(film.id)) {
      ctx.addIssue({
        code: 'custom',
        message: `Duplicate film id: "${film.id}"`,
        path: [index, 'id'],
      })
    }
    seen.add(film.id)
  })
})

export type Film = z.infer<typeof filmSchema>
