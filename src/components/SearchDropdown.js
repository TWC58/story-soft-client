import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useTheme } from '@mui/material/styles';
import { useContext } from 'react'
import { GlobalStoreContext, SearchBy } from '../store'

const options = [
  'Title',
  'Author',
  'Tag',
];

export default function SearchDropdown() {
  const { store } = useContext(GlobalStoreContext);
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);

    console.log("SEARCH SWAP TO INDEX " + index);

    if (index === 0) {
      store.setSearchBy(SearchBy.TITLE);
    } else if (index === 1) {
      store.setSearchBy(SearchBy.AUTHOR);
    } else if (index === 2) {
      store.setSearchBy(SearchBy.TAG);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div id="search-dropdown">
      <List
        component="nav"
        aria-label="Device settings"
        sx={{ bgcolor: theme.palette.primary.dark, p: 1 }}
      >
        <ListItem
          button
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="Search By"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText
            primary="Search By"
            secondary={options[selectedIndex]}
          />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
        style={{ padding: 10 }}
      >
        {options.map((option, index) => (<>
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem><br></br>
        </>))}
      </Menu>
    </div>
  );
}