import {StyleProp, TextStyle, ViewProps} from 'react-native';

/**
 * @description This is a helper hook to get the styles of the button variants
 * @param props.baseStyles The base styles of the button
 * @param props.containerStyles The container styles of the button
 * @param props.labelStyles The label styles of the button
 * @returns The styles of the button variants
 */
export function useButtonVariants<T extends string>(props: {
  baseStyles: {
    container: StyleProp<ViewProps>;
    label: StyleProp<TextStyle>;
  };
  containerStyles: {
    [key in T]: {
      container: StyleProp<ViewProps>;
      containerDisabled: StyleProp<ViewProps>;
    };
  };
  labelStyles: {
    [key in T]: {
      label: StyleProp<TextStyle>;
      labelDisabled: StyleProp<TextStyle>;
    };
  };
}) {
  const getContainerStyle = (
    enabled: boolean,
    variant: T,
    containerStyle: StyleProp<ViewProps>,
  ) => {
    return [
      props.baseStyles.container,
      props.containerStyles[variant]?.container,
      containerStyle,
      !enabled && props.containerStyles[variant]?.containerDisabled,
    ];
  };

  const getLabelStyle = (
    enabled: boolean,
    variant: T,
    labelStyle: StyleProp<TextStyle>,
  ): StyleProp<TextStyle>[] => {
    return [
      props.baseStyles.label,
      props.labelStyles[variant]?.label,
      labelStyle,
      !enabled && props.labelStyles[variant]?.labelDisabled,
    ];
  };

  return {
    getContainerStyle,
    getLabelStyle,
  };
}
