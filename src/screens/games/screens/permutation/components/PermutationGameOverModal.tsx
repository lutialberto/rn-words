import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import ModalApp from '~/components/modal/ModalApp';
import ButtonApp from '~/components/buttons/button/ButtonApp';
import TextApp from '~/components/texts/text/TextApp';
import {vh} from '~/fwk/constants/Dimentions';
import Colors from '~/constants/Colors';

interface Props {
  visible: boolean;
  gameWon: boolean;
  permutations: {word: string; found: boolean}[] | undefined;
  onStartNewGame: () => void;
}

const PermutationGameOverModal = ({visible, gameWon, permutations, onStartNewGame}: Props) => {
  return (
    <ModalApp
      modalProps={{
        visible,
      }}>
      {gameWon ? (
        <TextApp>Felicitaciones! Encontraste todas las palabras</TextApp>
      ) : (
        <View style={{alignItems: 'center'}}>
          <TextApp>Has perdido!</TextApp>
          <TextApp>Estas son las palabras que te faltaron</TextApp>
          <ScrollView
            style={{maxHeight: vh * 20, width: '100%', marginVertical: 10}}
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Colors.custom.cardColor,
              borderRadius: 10,
            }}
            fadingEdgeLength={50}>
            {permutations
              ?.filter(p => !p.found)
              .map(({word}) => <TextApp key={word}>{word}</TextApp>)}
          </ScrollView>
        </View>
      )}
      <ButtonApp label={'Nuevo Juego'} onPress={onStartNewGame} />
    </ModalApp>
  );
};

export default PermutationGameOverModal;
