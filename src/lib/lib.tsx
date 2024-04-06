import { BoardCellType, CellType } from '../types/cell'
import { combineGroup } from '../types/combineGroup'
import { GeneratorType, ItemType } from '../types/item'

export function generateCells() {
  const cells = [] as CellType[]
  for (let i = 1; i < 7; i++) {
    for (let j = 1; j < 7; j++) cells.push([i, j])
  }
  return cells
}

export function generateBoardCells() {
  const cells = [] as BoardCellType[]
  for (let i = 1; i < 7; i++) {
    for (let j = 1; j < 7; j++)
      cells.push({ position: [i, j], content: null })
  }
  cells[5].content = {
    id: 'horseGenerator',
    toGenerate: combineGroup['horseGenerator'].items,
    image: combineGroup['horseGenerator'].images[0]
  } as GeneratorType

  cells[3].content = {
    id: combineGroup['horseGenerator'].items[0],
    generator: 'horseGenerator',
    image: combineGroup['horseGenerator'].images[0]
  } as ItemType

  cells[11].content = {
    id: 'dotGenerator',
    toGenerate: combineGroup['dotGenerator'].items,
    image: combineGroup['dotGenerator'].images[0]
  } as GeneratorType
  return cells
}

export function getNext(id: string, list: string[]) {
  const index = list.findIndex((i) => i === id)
  if (index <= list.length - 2) return index + 1
  else return index
}