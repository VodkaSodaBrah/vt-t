// components/DragLayer.js
import Image from 'next/image';
import { useDragLayer } from 'react-dnd';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 1000,
};

const getItemStyles = (currentOffset) => {
  if (!currentOffset) {
    return {
      display: 'none',
    };
  }

  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px) scale(0.95)`;
  return {
    transform,
    WebkitTransform: transform,
  };
};

const DragLayer = () => {
  const { item, isDragging, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  if (!isDragging) {
    return null;
  }

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(currentOffset)} className="drag-preview">
        <div className="drag-handle">
          <Image src={item.item.image} alt={item.item.title} width={64} height={64} className="item-img" />
        </div>
        <div className="item-content">
          <h4 className="item-title">{item.item.title}</h4>
          <p className="item-location">{item.item.location}</p>
        </div>
      </div>
    </div>
  );
};

export default DragLayer;