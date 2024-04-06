import { GeneratorType, ItemType } from "./item"

export type CellType = [number, number]

export type BoardCellType = {
  position: CellType
  content: GeneratorType | ItemType | null
}
