import {Link} from 'react-router-dom'

const MenuItem = ( {menuItem: {url, title}} ) => 
    <li type='None' className="MenuItem">
        <Link to={url} children={title}/>
    </li>

const Menu = ({menuItems=[
    {url: '/spoiler',title: 'Spoiler'},
    {url: '/range_input',title: 'Range input'},
    {url: '/password_confirm',title: 'Password confirm'},
    {url: '/timer',title: 'Timer'}
]}) => 
    <ul className='Menu'>
        {menuItems.map(menuItem => <MenuItem menuItem={menuItem} key={menuItem.url}/>)}
    </ul>

const Header = () => 
    <header>
        <Menu />
    </header>

export default Header