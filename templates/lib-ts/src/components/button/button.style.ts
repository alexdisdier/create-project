import { createUseStyles } from 'react-jss';

export default createUseStyles((theme: any) => ({
  root: {
    color: ({ color }) => color || theme.primaryColor,
    backgroundColor: 'yellow',
    transition: '250ms',
    '&:hover': {
      color: theme.secondaryColor
    },
    '&[disabled]': {
      opacity: 0.3
    }
  },
  label: {
    fontWeight: 'bold'
  }
}));