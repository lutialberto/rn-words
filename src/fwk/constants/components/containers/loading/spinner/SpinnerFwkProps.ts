import {PropsWithChildren} from 'react';
import {StyleProp, ViewStyle} from 'react-native';

export interface SpinnerFwkProps extends PropsWithChildren {
  visible: boolean;
  color?: string;
  style: StyleProp<ViewStyle>;
  variant?: 'default' | 'overlap';
}
