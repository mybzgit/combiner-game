import { useDrag } from 'react-dnd'
import { CellType } from '../types/cell'
import { ItemType } from '../types/item'
import { memo } from 'react'

type Props = {
  item: ItemType
  position: CellType
}

const Item = memo(
  ({ item, position }: Props) => {
    const [{ isDragging }, drag] = useDrag(
      () => ({
        type: 'item',
        item: { position, type: 'item' },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
      }),
      [position],
    )

    return (
      <div
        className='item'
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        {item.image}
      </div>
    )
  },
  (prev, next) => {
    return (
      prev.position[0] == next.position[0] &&
      prev.position[1] == next.position[1] &&
      prev.item.id == next.item.id
    )
  },
)

export default Item
