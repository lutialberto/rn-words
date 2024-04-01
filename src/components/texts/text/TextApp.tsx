import {Text, TextProps} from 'react-native';
import React from 'react';
import TextStyles from '~/constants/TextStyles';

/**
 * @description Application text component
 * @snippet appText
 * @example Minimal Example
 * <TextApp>GenericText</TextApp>
 * @example Full Example
 * <TextApp
 *  style={styles.text}
 * >
 *  GenericText
 * </TextApp>
 * @dependencies TextStyles
 */
const TextApp = (props: TextProps) => {
  return (
    <Text {...props} style={[TextStyles.textDefault, props.style]}>
      {props.children}
    </Text>
  );
};

export default TextApp;
