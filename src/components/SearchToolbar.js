import { useContext, useState } from 'react';
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import SumIcon from '@mui/icons-material/Functions';
import SortIcon from '@mui/icons-material/Sort';
import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { ListViewMode, ListSortMode } from '../store/index.js';
import SearchDropdown from './SearchDropdown';
import { useTheme } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.primary.dark,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
const menuId = 'sort-menu';

export default function SearchToolbar() {
    const theme = useTheme();
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleHomeLists = () => {
      store.loadMyLists();
    };

    const handleAllLists = () => {
      store.loadPublishedLists();
    };

    const handleUserLists = () => {
      store.clearListsForUserView();
    };

    const handleCommunityLists = () => {
        store.loadCommunityLists();
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDateNewest = async () => {
        store.sortLists(ListSortMode.DATE_NEWEST);
        handleMenuClose();
    }

    const handleDateOldest = async () => {
        store.sortLists(ListSortMode.DATE_OLDEST);
        handleMenuClose();
    }

    const handleViews = async () => {
        store.sortLists(ListSortMode.VIEWS);
        handleMenuClose();
    }

    const handleLikes = async () => {
        store.sortLists(ListSortMode.LIKES);
        handleMenuClose();
    }

    const handleDislikes = async () => {
        store.sortLists(ListSortMode.DISLIKES);
        handleMenuClose();
    }

    function handleSearchEnter(event) {
        if (event.code === "Enter") {
          if (event.taget.value)
            store.searchPosts(event.target.value);
        }
    }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar>
          <Search
            disabled={store.currentPost !== null}
            className="toolbar-black"
            onKeyPress={handleSearchEnter}>
            <SearchIconWrapper>
              <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase color={theme.palette.primary.dark}
              disabled={store.currentPost !== null}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <SearchDropdown/>
        </Toolbar>
    </Box>
  );
}