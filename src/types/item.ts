
export type ItemType = {
  id: string
  generator: GeneratorType["id"]
  image: JSX.Element,
}

export type GeneratorType = {
  id: string
  toGenerate: string[]
  image: JSX.Element,
}

