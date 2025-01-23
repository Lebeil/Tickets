'use client'

import { HStack, Button, Box } from '@chakra-ui/react';
import Card from '../components/Card';
import { useState } from 'react';

interface List {
  id: number;
  title: string;
}

export default function CardLayout() {
  const [lists, setLists] = useState<List[]>([])
  const [isAddingList, setIsAddingList] = useState(false)
  const [newListTitle, setNewListTitle] = useState('')

  const addList = () => {
    if (newListTitle.trim()) {
      setLists([...lists, { id: Date.now(), title: newListTitle }])
      setNewListTitle('')
      setIsAddingList(false)
    }
  }

  return (
    <HStack gap={4} p={4} align="flex-start" bg="blue.500" h="100vh">
      {lists.map((list) => (
        <Card key={list.id} title={list.title} />
      ))}

      {isAddingList ? (
        <Box bg="gray.200" borderRadius="lg" w="300px" p={4}>
          <input
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
            placeholder="Saisissez le titre de la liste..."
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '8px',
              borderRadius: '4px',
              border: '2px solid blue',
            }}
            autoFocus
          />
          <Button size="sm" colorScheme="blue" onClick={addList} mr={2}>
            Ajouter la liste
          </Button>
          <Button size="sm" onClick={() => setIsAddingList(false)}>
            Annuler
          </Button>
        </Box>
      ) : (
        <Button
          w="300px"
          h="40px"
          bg="gray.200"
          color="black"
          _hover={{ bg: 'gray.300' }}
          onClick={() => setIsAddingList(true)}
        >
          + Ajouter une liste
        </Button>
      )}
    </HStack>
  )
}
