'use client'

import { Box, Text, Button, VStack, Input } from '@chakra-ui/react';
import { Droppable } from '@hello-pangea/dnd';
import { Card } from './Card';
import { useState } from 'react';

interface CardItem {
    id: string;
    text: string;
    listId: string;
}

interface ListProps {
    id: string;
    title: string;
    cards: CardItem[];
    onAddCard: (listId: string, text: string) => void;
}

export function List({ id, title, cards, onAddCard }: Readonly<ListProps>) {
    const [isAdding, setIsAdding] = useState(false);
    const [newCardText, setNewCardText] = useState('');

    const handleAddCard = () => {
        if (newCardText.trim()) {
            onAddCard(id, newCardText);
            setNewCardText('');
            setIsAdding(false);
        }
    };

    return (
        <Box
            bg="gray.100"
            p={4}
            borderRadius="lg"
            w="300px"
            minH="100px"
        >
            <Text fontWeight="bold" mb={4}>{title}</Text>

            <Droppable droppableId={id}>
                {(provided) => (
                    <VStack
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        gap={2}
                        align="stretch"
                        minH="50px"
                    >
                        {cards.map((card, index) => (
                            <Card
                                key={card.id}
                                id={card.id}
                                text={card.text}
                                index={index}
                            />
                        ))}
                        {provided.placeholder}
                    </VStack>
                )}
            </Droppable>

            {isAdding ? (
                <Box mt={2}>
                    <Input
                        value={newCardText}
                        onChange={(e) => setNewCardText(e.target.value)}
                        placeholder="Entrez le texte de la carte..."
                        mb={2}
                        autoFocus
                    />
                    <Button size="sm" colorScheme="blue" onClick={handleAddCard} mr={2}>
                        Ajouter
                    </Button>
                    <Button size="sm" onClick={() => setIsAdding(false)}>
                        Annuler
                    </Button>
                </Box>
            ) : (
                <Button
                    variant="ghost"
                    width="100%"
                    mt={2}
                    onClick={() => setIsAdding(true)}
                >
                    + Ajouter une carte
                </Button>
            )}
        </Box>
    );
} 