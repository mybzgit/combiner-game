import { PropsWithChildren, useContext } from 'react'
import { useDrop } from 'react-dnd'
import GameContext from '../store/context'
import { CellType } from '../types/cell'

type Props = PropsWithChildren<{
  position: CellType
}>

export default function Cell({ children, position }: Props) {
  const { move } = useContext(GameContext)
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['generator', 'item'],
    drop: (item: {
      position: CellType
      type: 'generator' | 'item'
    }) => {
      move(item.type, item.position, position)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  return (
    <div
      ref={drop}
      className='cell'
      style={{ outline: isOver ? '2px dashed blue' : undefined }}
    >
      {children}
    </div>
  )
}
