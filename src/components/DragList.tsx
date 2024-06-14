// components/DraggableList.js
import Image from 'next/image';
import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import DragLayer from './DragLayer';

const ItemType = 'ITEM';

const items = [
  { id: '1', title: 'Scotland Island', location: 'Sydney, Australia', image: '/images/image1.jpg' },
  { id: '2', title: 'The Charles Grand Brasserie & Bar', location: 'Lorem ipsum, Dolor', image: '/images/image2.jpg' },
  { id: '3', title: 'Bridge Climb', location: 'Dolor, Sit amet', image: '/images/image3.jpg' },
  { id: '4', title: 'Clam Bar', location: 'Etcetera veni, Vidi vici', image: '/images/image4.jpg' },
  { id: '5', title: 'Vivid Festival', location: 'Sydney, Australia', image: '/images/image5.jpg' },
];

const DraggableList = () => {
  const [list, setList] = useState(items);

  const moveItem = (dragIndex, hoverIndex) => {
    const draggedItem = list[dragIndex];
    const updatedList = [...list];
    updatedList.splice(dragIndex, 1);
    updatedList.splice(hoverIndex, 0, draggedItem);
    setList(updatedList);
  };

  return (
    <div className="container">
      {list.map((item, index) => (
        <DraggableListItem key={item.id} index={index} item={item} moveItem={moveItem} />
      ))}
      <DragLayer />
    </div>
  );
};

const DraggableListItem = ({ item, index, moveItem }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover(draggedItem) {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index, item },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`item ${isDragging ? 'dragging' : ''}`}
      style={{ opacity: isDragging ? 0 : 1 }}
    >
      <div className="drag-handle">
        <Image src={item.image} alt={item.title} width={64} height={64} className="item-img" />
      </div>
      <div className="item-content">
        <h4 className="item-title">{item.title}</h4>
        <p className="item-location">{item.location}</p>
      </div>
    </div>
  );
};

export default DraggableList;