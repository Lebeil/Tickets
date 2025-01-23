import { useState } from 'react';
import { Box, Text, Button, Textarea } from '@chakra-ui/react';

interface Card {
    id: number;
    text: string;
}

const Card = ({ title }: { title: string }) => {
    const [cards, setCards] = useState<Card[]>([])
    const [isAdding, setIsAdding] = useState(false)
    const [newCardText, setNewCardText] = useState('')


    const addCard = () => {
        if (newCardText.trim()) {
            setCards([...cards, { id: Date.now(), text: newCardText }])
            setNewCardText('')
            setIsAdding(false)
        }
    }

    return (
        <Box bg="gray.200" borderRadius="lg" w="300px" p={4}>
            <Text fontWeight="bold" mb={4}>{title}</Text>

            {cards.map((card) => (
                <Box key={card.id} bg="gray.100" p={2} mb={2} borderRadius="md">
                    <Text>{card.text}</Text>
                </Box>
            ))}

            {isAdding ? (
                <Box mb={2}>
                    <Textarea
                        value={newCardText}
                        onChange={(e) => setNewCardText(e.target.value)}
                        placeholder="Saisissez un titre pour cette carte..."
                        size="sm"
                        mb={2}
                        autoFocus
                    />
                    <Button size="sm" colorScheme="blue" onClick={addCard} mr={2}>
                        Ajouter la carte
                    </Button>
                    <Button size="sm" onClick={() => setIsAdding(false)}>
                        Annuler
                    </Button>
                </Box>
            ) : (
                <Button
                    variant="ghost"
                    width="100%"
                    justifyContent="flex-start"
                    onClick={() => setIsAdding(true)}
                >
                    Ajouter une carte
                </Button>
            )}
        </Box>
    );
};

export default Card;