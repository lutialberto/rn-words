import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {ButtonFwkProps} from './ButtonFwkProps';

/**
 * @description Framework button component
 * @example
 * <ButtonFwk
 *   enabled={true}
 *   onPress={() => { }}
 *   label={'Button'}
 *   icon={<Icon name={'check'} />}
 *   containerStyle={styles.container}
 *   labelStyle={styles.label}
 * />
 * @param enabled - button enabled
 * @param onPress - function to execute when the button is pressed and enabled
 * @param label - button label
 * @param icon - button icon
 * @param containerStyle - style of the button container
 * @param labelStyle - style of the button label
 * @param labelComponent - set a custom label component
 */
const ButtonFwk = ({
  enabled = true,
  onPress,
  label = '',
  icon = <></>,
  containerStyle,
  labelStyle,
  labelComponent,
}: ButtonFwkProps) => {
  return (
    <TouchableOpacity
      onPress={enabled ? onPress : () => {}}
      style={containerStyle}
      disabled={!enabled}>
      <>
        {icon}
        {labelComponent ?? <Text style={labelStyle}>{label}</Text>}
      </>
    </TouchableOpacity>
  );
};

export default ButtonFwk;
