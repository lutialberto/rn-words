import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import TabooWords from './components/tabooWords/TabooWords';
import TabooCounter from './components/counter/TabooCounter';
import TextApp from '~/components/texts/text/TextApp';
import {TabooCardTracking} from './models/TabooCardTracking';
import ButtonApp from '~/components/buttons/button/ButtonApp';
import {fetchTabooCard} from '~/services/words.service';

const TabooScreen = () => {
  const [cardsTracking, setCardsTracking] = useState<TabooCardTracking[]>([
    {
      card: {
        id: 34,
        wordToGuess: 'piscina',
        unmentionableWords: ['nadar', 'agua', 'verano', 'profundidad', 'diversión'],
      },
      status: 'pending',
      isLatestPreviousCard: false,
    },
  ]);

  const loadNewCard = async () => {
    const idsToExlude = cardsTracking.map(cardTracking => cardTracking.card.id);

    fetchTabooCard(idsToExlude).then(card => {
      setCardsTracking(prev => [
        ...prev,
        {
          card,
          status: 'pending',
          isLatestPreviousCard: false,
        },
      ]);
    });
  };

  const card = cardsTracking.find(e => e.status === 'pending')?.card;

  const handleGoPreviousCard = () => {
    setCardsTracking(prev =>
      prev.map(cardTracking => {
        if (cardTracking.card.id === card.id) {
          return {
            ...cardTracking,
            status: 'skipped',
            isLatestPreviousCard: true,
          };
        }
        if (cardTracking.isLatestPreviousCard) {
          return {
            ...cardTracking,
            isLatestPreviousCard: false,
          };
        }
        return cardTracking;
      }),
    );
  };

  const handleSkipCard = () => {
    setCardsTracking(prev =>
      prev.map(cardTracking => {
        if (cardTracking.card.id === card.id) {
          return {
            ...cardTracking,
            status: 'skipped',
            isLatestPreviousCard: true,
          };
        }
        if (cardTracking.isLatestPreviousCard) {
          return {
            ...cardTracking,
            isLatestPreviousCard: false,
          };
        }
        return cardTracking;
      }),
    );

    loadNewCard();
  };

  if (!card) return <TextApp>No hay más cartas</TextApp>;

  return (
    <View style={{padding: 15}}>
      <TabooWords card={card} />
      <TabooCounter initialTimeInSeconds={90} onTimeEnd={() => {}} />
      <View style={{flexDirection: 'row', justifyContent: 'center', gap: 10}}>
        <ButtonApp label={'Anterior'} onPress={handleGoPreviousCard} containerStyle={{flex: 1}} />
        <ButtonApp label={'Saltar'} onPress={handleSkipCard} containerStyle={{flex: 1}} />
      </View>
    </View>
  );
};

export default TabooScreen;

const styles = StyleSheet.create({});
