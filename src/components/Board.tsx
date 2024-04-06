import { useContext } from 'react'
import Cell from './Cell'
import Generator from './Generator'
import { generateCells } from '../lib/lib'
import { CellType } from '../types/cell'
import GameContext from '../store/context'
import Item from './Item'
import { GeneratorType, ItemType } from '../types/item'

const cellArray = generateCells()
const rows = Array.from('123456')

export default function Board() {
  const { board, generate } = useContext(GameContext)

  return (
    <div className='board'>
      {rows.map((r, i) => (
        <div className='board-row' key={r}>
          {cellArray.slice(i * 6, i * 6 + 6).map((c: CellType) => {
            const currentBoardRow = board.slice(i * 6, i * 6 + 6)
            const render = currentBoardRow.find(
              (b) => b.position[0] == c[0] && b.position[1] == c[1],
            )
            return (
              <Cell position={c} key={`${c[0]}-${c[1]}`}>
                {render?.content !== null &&
                  ('toGenerate' in render!.content ? (
                    <Generator
                      generate={generate}
                      position={c}
                      item={render?.content as GeneratorType}
                    />
                  ) : (
                    <Item
                      position={c}
                      item={render!.content as ItemType}
                    />
                  ))}
              </Cell>
            )
          })}
        </div>
      ))}
    </div>
  )
}
