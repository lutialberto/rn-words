import {ScrollView, View} from 'react-native';
import React from 'react';
import TextApp from '~/components/texts/text/TextApp';
import Colors from '~/constants/Colors';

interface Props {
  permutations: {word: string; found: boolean}[] | undefined;
}

const Permutations = ({permutations}: Props) => {
  const permutationsGroupedBySize = permutations?.reduce(
    (acc: {word: string; found: boolean}[][], permutation) => {
      const size = permutation.word.length;
      if (!acc[size]) {
        acc[size] = [];
      }
      acc[size].push(permutation);
      return acc;
    },
    [],
  );

  return (
    <View style={{flex: 1}}>
      <TextApp style={{textAlign: 'center'}}>
        Permutaciones {permutations?.filter(p => p.found).length}/{permutations?.length}
      </TextApp>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          backgroundColor: Colors.custom.backgroundColor,
          borderRadius: 15,
        }}
        fadingEdgeLength={100}
        showsVerticalScrollIndicator={false}>
        {permutationsGroupedBySize?.map((permutationsGroup, index) => {
          if (!permutationsGroup) return null;
          const allFound = permutationsGroup.every(({found}) => found);
          return (
            <View key={index} style={{alignItems: 'center'}}>
              {allFound ? (
                <TextApp style={{color: Colors.custom.primary}}>{index} letras completado!</TextApp>
              ) : (
                <TextApp>{index} letras</TextApp>
              )}
              {!allFound &&
                permutationsGroup.map(({word, found}) => (
                  <TextApp key={word}>
                    {found ? word : word.replaceAll(/([A-Za-z]){1}/g, '*')}
                  </TextApp>
                ))}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Permutations;
