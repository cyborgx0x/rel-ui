import { useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
// material

// ----------------------------------------------------------------------

MHidden.propTypes = {
  width: PropTypes.oneOf(['xsDown', 'smDown', 'mdDown', 'lgDown', 'xlDown', 'xsUp', 'smUp', 'mdUp', 'lgUp', 'xlUp'])
    .isRequired,
};

interface IProps {
  width: string;
  children: any;
}

export default function MHidden({ width, children }: IProps) {
  const breakpoint = width.substring(0, 2);

  const hiddenUp = useMediaQuery((theme: any) => theme.breakpoints.up(breakpoint));
  const hiddenDown = useMediaQuery((theme: any) => theme.breakpoints.down(breakpoint));

  if (width.includes('Down')) {
    return hiddenDown ? null : children;
  }

  if (width.includes('Up')) {
    return hiddenUp ? null : children;
  }

  return null;
}
