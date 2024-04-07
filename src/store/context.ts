import { createContext } from 'react'
import { BoardCellType, CellType } from '../types/cell'

export type GameContextType = {
  board: BoardCellType[]
  move: (type: 'generator' | 'item', start: CellType, end: CellType) => void
  generate: (id: string) => void
  resetGenerator: (id: string) => void
}

const GameContext = createContext<GameContextType>({
  board: [],
  move: () => {},
  generate: () => {},
  resetGenerator: () => {}
})

export default GameContext
