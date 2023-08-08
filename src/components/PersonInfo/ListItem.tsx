import * as React from 'react';

import { Link } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

interface Item {
  icon: React.ReactNode;
  type: string;
  primaryText: string[];
}
function isKeyAnEmptyList(obj: { [key: string]: any }, keyToCheck: string): boolean {
  return Array.isArray(obj[keyToCheck]) && obj[keyToCheck].length === 0;
}
interface CustomizableListProps {
  items: Item[];
}

export default function CustomizableList({ items }: CustomizableListProps) {

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          {items.map((item, index) => (
            <ListItem key={index} disablePadding>
              {item.primaryText.length !== 0 &&
                <ListItemButton
                  onClick={() => { navigator.clipboard.writeText(`${item.primaryText}`) }}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText>
                    {item.primaryText.map((text, index2) => (
                      <React.Fragment key={index2}>
                        {item.type === 'facebook' ? <Link variant="button" href={`https://www.facebook.com/${text}`}>Facebook</Link> : <Typography variant="body1" style={{ fontSize: '12pt' }}> {text} </Typography>}
                        {index !== item.primaryText.length - 1}
                      </React.Fragment>
                    ))}

                    <hr />
                  </ListItemText>
                </ListItemButton>}
            </ListItem>
          ))}
        </List>
      </nav>
      <Divider />
    </Box>
  );
}
