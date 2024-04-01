import {StyleSheet, StyleProp, ViewStyle, TextStyle} from 'react-native';
import React from 'react';
import {ButtonAppProps} from './ButtonAppProps';
import {Variant} from './models/Variant';
import {useButtonVariants} from '~/fwk/constants/components/button/hooks/useButtonVariants';
import Colors from '~/constants/Colors';
import ButtonFwk from '~/fwk/constants/components/button/ButtonFwk';
import TextApp from '~/components/texts/text/TextApp';

/**
 * @description Application button component
 * @example Minimal Example
 * <ButtonApp onPress={() => { }} />
 * @example Full Example
 * <ButtonApp
 *  variant={'default'}
 *  enabled={true}
 *  onPress={() => { }}
 *  label={'Button'}
 *  icon={<Icon name={'check'} />}
 *  containerStyle={styles.container}
 *  labelStyle={styles.label}
 * />
 * @dependencies ButtonFwk, useButtonVariants, TextApp, useTheme, vw
 * @param variant - button variant
 * @param enabled - button enabled
 * @param onPress - function to execute when the button is pressed and enabled
 * @param label - button label
 * @param icon - button icon
 * @param containerStyle - style of the button container
 * @param labelStyle - style of the button label
 */

const ButtonApp = ({
  variant = 'default',
  enabled = true,
  containerStyle,
  labelStyle,
  labelComponent,
  ...props
}: ButtonAppProps) => {
  const {getContainerStyle, getLabelStyle} = useButtonVariants<Variant>({
    baseStyles: {
      container: styles.baseContainer as StyleProp<ViewStyle>,
      label: styles.baseLabel as StyleProp<TextStyle>,
    },
    containerStyles: {
      default: {
        container: styles.defaultContainer as StyleProp<ViewStyle>,
        containerDisabled: styles.defaultDisabledContainer as StyleProp<ViewStyle>,
      },
      outline: {
        container: styles.outlineContainer as StyleProp<ViewStyle>,
        containerDisabled: styles.outlineDisabledContainer as StyleProp<ViewStyle>,
      },
      textOnly: {
        container: {},
        containerDisabled: styles.outlineDisabledContainer as StyleProp<ViewStyle>,
      },
    },
    labelStyles: {
      default: {
        label: {},
        labelDisabled: {},
      },
      outline: {
        label: styles.outlineLabel as StyleProp<TextStyle>,
        labelDisabled: styles.outlineDisabledLabel as StyleProp<TextStyle>,
      },
      textOnly: {
        label: styles.outlineLabel as StyleProp<TextStyle>,
        labelDisabled: styles.outlineDisabledLabel as StyleProp<TextStyle>,
      },
    },
  });

  const containerStyleFinal = getContainerStyle(enabled, variant, containerStyle);
  const labelStyleFinal = getLabelStyle(enabled, variant, labelStyle);

  return (
    <ButtonFwk
      {...props}
      enabled={enabled}
      containerStyle={containerStyleFinal}
      labelStyle={labelStyleFinal}
      labelComponent={
        labelComponent ?? <TextApp style={labelStyleFinal}>{props.label ?? ''}</TextApp>
      }
    />
  );
};

export default ButtonApp;

const styles = StyleSheet.create({
  baseContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  baseLabel: {
    marginLeft: 5,
    textAlign: 'center',
    color: Colors.custom.fontColor,
  },
  defaultContainer: {
    backgroundColor: Colors.custom.primary,
  },
  defaultDisabledContainer: {
    backgroundColor: Colors.custom.disabledColor,
  },
  outlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.custom.primary,
  },
  outlineDisabledContainer: {
    borderColor: Colors.custom.disabledColor,
  },
  outlineLabel: {
    color: Colors.custom.primary,
  },
  outlineDisabledLabel: {
    color: Colors.custom.disabledColor,
  },
});
