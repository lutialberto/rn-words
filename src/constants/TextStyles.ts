import {StyleSheet} from 'react-native';
import Colors from './Colors';

export default StyleSheet.create({
  textDefault: {
    color: Colors.custom.fontColor,
    fontSize: 16,
    fontWeight: '400',
  },
  inputError: {
    color: Colors.generic.red,
    fontSize: 12,
  },
  inputLabel: {
    color: Colors.custom.fontColor,
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  screenTitle: {
    fontSize: 24,
    textAlign: 'center',
  },
});
