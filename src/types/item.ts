
export type ItemType = {
  id: string
  generator: GeneratorType["id"]
  image: JSX.Element,
}

export type GeneratorType = {
  id: string
  leftItems: number
  maxItems: number
  toGenerate: string[]
  image: JSX.Element,
}

