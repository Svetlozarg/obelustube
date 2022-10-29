import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';

import { logo } from '../utils/constants';
import { SearchBar } from './';

const Navbar = () => (
  <Stack
    direction='row'
    alignItems='center'
    p={2}
    sx={{
      position: 'sticky',
      background: '#000',
      top: 0,
      justifyContent: 'space-between',
    }}
    style={{ backgroundColor: '#0f0f0f', zIndex: '999', overflow: 'hidden' }}
    className='navbar'
  >
    <Link to='/' style={{ display: 'flex', alignItems: 'center' }}>
      <img src={logo} alt='logo' height={45} />
      <h1 style={{ color: '#fff', marginLeft: '1rem' }}>ObelusTube</h1>
    </Link>
    <SearchBar />
  </Stack>
);

export default Navbar;
