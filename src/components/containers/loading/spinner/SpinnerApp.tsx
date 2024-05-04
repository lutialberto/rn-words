import React from 'react';
import Colors from '~/constants/Colors';
import SpinnerFwk from '~/fwk/constants/components/containers/loading/spinner/SpinnerFwk';
import {SpinnerFwkProps} from '~/fwk/constants/components/containers/loading/spinner/SpinnerFwkProps';

/**
 * @description Application spinner component
 * @example Minimal Example
 * <SpinnerApp
 *  visible={true}
 *  style={{
 *   height: 100,//usar este
 *   flex: 1,//o este
 *  }}
 * />
 * @example Full Example
 * <SpinnerApp
 *  visible={true}
 *  style={{
 *   height: 100,//usar este
 *   flex: 1,//o este
 *  }}
 *  variant={'default'}
 * >
 *   <Text>Content</Text>
 * </SpinnerApp>
 * @dependencies SpinnerFwk, useTheme
 * @param visible - spinner visible
 * @param variant - spinner variant
 */
const SpinnerApp = (props: SpinnerFwkProps) => {
  return <SpinnerFwk {...props} color={Colors.custom.primary} />;
};

export default SpinnerApp;
