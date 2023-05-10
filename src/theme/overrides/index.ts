import { merge } from 'lodash';

import Button from './Button';
import Card from './Card';
import CssBaseline from './CssBaseline';
import Drawer from './Drawer';
import Table from './Table';
import Tabs from './Tabs';
import Typography from './Typography';

export default function ComponentsOverrides(theme: any) {
  return merge({
    ...Button(theme),
    ...Card(theme),
    ...Table(theme),
    ...Typography(theme),
    ...Tabs(theme),
    ...Drawer(theme),
    ...CssBaseline(theme),
  });
}
