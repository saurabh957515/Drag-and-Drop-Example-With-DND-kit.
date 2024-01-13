import React, { useState, useCallback, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,  
  DragOverlay,
  useSensor,
  useSensors,
  rectIntersection,
} from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

function WidgetList({ items, setItems }) {
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const [overedItem, setOverdItem] = useState({});
  const SelectedUser = ({ item }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: item?.id });

    return (
      <div
        className={`${item?.title === "three" ? "col-span-2 " : ""}
          'content-center min-w-[400px] h-96 shadow-sm sm:rounded-lg'
     `}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
      >
        <div
          className={`flex py-2 h-full pt-3 px-3 space-x-4 rounded-lg border-b justify-between ${
            isDragging ? "bg-gray-200 " : " bg-white"
          }`}
        >
          {!isDragging && (
            <>
              <span ref={setNodeRef} {...attributes} {...listeners}></span>
              <div className="text-md font-medium leading-6 text-gray-900 pt-0 mt-0">
                {item.title ?? "Title Name Here"}
              </div>
              <div>
                {item?.viewAllLink && item?.viewAllLink != "" && (
                  <a
                    href={item?.viewAllLink}
                    target="_blank"
                    className="text-md font-medium leading-6 text-blue-600 hover:text-blue-600"
                  >
                    View All
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const handleDragEnd = useCallback(
    (event) => {
      setActiveId(null);
    },
    [setItems]
  );

  const handleDragStart = useCallback(
    (event) => {
      let Widget = items.find((item) => item.id == event.active.id);
      setActiveId(Widget);
    },
    [items]
  );

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  const handleDrageOver = (event) => {
    setOverdItem(event.over);
  };

  useEffect(() => {
    if (activeId?.id !== (overedItem && overedItem?.id)) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === activeId?.id);
        const newIndex = items.findIndex((item) => item.id === overedItem?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }, [overedItem]);
  return (
    <DndContext
      modifiers={[restrictToParentElement]}
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      onDragOver={handleDrageOver}
    >
      <div className="grid w-full gap-4 grid-cols-3  overflow-hidden">
        <SortableContext items={items} strategy={rectSortingStrategy}>
          {items.map((item, index) => (
            <SelectedUser key={item?.id} item={item} index={index} />
          ))}
        </SortableContext>
      </div>
      <DragOverlay>
        <div
          style={{ width: activeId?.colspan == 2 && `${1044}px` }}
          className={
            "content-center  w-full min-h-[400px] bg-white shadow-sm sm:rounded-lg"
          }
        >
          <div className="flex py-2 pt-3 px-3 space-x-4 bg-white rounded-t-lg border-b justify-between">
            <span></span>
            <div className="text-md font-medium leading-6 text-gray-900 pt-0 mt-0">
              {activeId?.title ?? "Title Name Here"}
            </div>
            <div>
              {activeId?.viewAllLink && activeId?.viewAllLink != "" && (
                <a
                  href={activeId?.viewAllLink}
                  target="_blank"
                  className="text-md font-medium leading-6 text-blue-600 hover:text-blue-600"
                >
                  View All
                </a>
              )}
            </div>
          </div>
          {activeId?.id && activeId?.widget}
        </div>
      </DragOverlay>
    </DndContext>
  );
}

export default WidgetList;
