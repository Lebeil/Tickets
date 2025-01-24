'use client'

import { Box, Text } from '@chakra-ui/react';
import { Draggable } from '@hello-pangea/dnd';

interface CardProps {
    id: string;
    text: string;
    index: number;
}

export function Card({ id, text, index }: CardProps) {
    return (
        <Draggable draggableId={id} index={index}>
            {(provided, snapshot) => (
                <Box
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    bg={snapshot.isDragging ? "blue.100" : "white"}
                    p={3}
                    borderRadius="md"
                    boxShadow="sm"
                    _hover={{ bg: "gray.50" }}
                >
                    <Text>{text}</Text>
                </Box>
            )}
        </Draggable>
    );
}