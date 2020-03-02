import { createUseStyles } from 'react-jss';

export default createUseStyles((theme: any) => ({
  root: {
    color: (props: { color: string; }) => props.color || theme.colorPrimary,
    backgroundColor: 'yellow',
    transition: '250ms',
    '&:hover': {
      color: theme.colorSecondary
    },
    '&[disabled]': {
      opacity: 0.3
    }
  },
  label: {
    fontWeight: 'bold'
  }
}));