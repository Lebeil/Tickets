'use client'

import { useState } from 'react';
import { Box, HStack } from '@chakra-ui/react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { List } from '@/components/List';

interface CardItem {
  id: string;
  text: string;
  listId: string;
}

export default function Board() {
  const lists = [
    { id: 'list-1', title: 'À faire' },
    { id: 'list-2', title: 'En cours' },
    { id: 'list-3', title: 'Terminé' },
  ];

  const [cards, setCards] = useState<CardItem[]>([]);

  const onDragEnd = (result: DropResult) => {
    const { destination, draggableId } = result;

    if (!destination) return;

    const card = cards.find(c => c.id === draggableId);
    if (!card) return;

    setCards(prevCards => {
      const newCards = prevCards.filter(c => c.id !== draggableId);
      return [...newCards, { ...card, listId: destination.droppableId }];
    });
  };

  const handleAddCard = (listId: string, text: string) => {
    const newCard: CardItem = {
      id: `card-${Date.now()}`,
      text,
      listId,
    };
    setCards(prevCards => [...prevCards, newCard]);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box p={4} bg="blue.500" minH="100vh">
        <HStack align="start" gap={4}>
          {lists.map((list) => (
            <List
              key={list.id}
              id={list.id}
              title={list.title}
              cards={cards.filter(card => card.listId === list.id)}
              onAddCard={handleAddCard}
            />
          ))}
        </HStack>
      </Box>
    </DragDropContext>
  );
}
