import {ButtonFwkProps} from '~/fwk/constants/components/button/ButtonFwkProps';
import {Variant} from './models/Variant';

export interface ButtonAppProps extends ButtonFwkProps {
  variant?: Variant;
}
