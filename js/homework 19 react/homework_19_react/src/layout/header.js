import {Link} from 'react-router-dom'

const MenuItem = ( {menuItem: {url, title}} ) => 
    <li type='None' className='MenuItem'>
        <Link to={url} children={title}/>
    </li>

const Menu = ({menuItems=[
    {url: '/spoiler', title: 'Spoiler'},
    {url: '/range-input', title: 'Range input'},
    {url: '/password-confirm', title: 'Password confirm'},
    {url: '/timer', title: 'Timer'},
    {url: '/timer-control', title: 'Timer control'},
    {url: '/timer-container', title: 'Timer container'},
    {url: '/watch', title: 'Watch'}
]}) => 
    <ul className='Menu'>
        <h2>Tasks</h2>
        {menuItems.map(menuItem => <MenuItem menuItem={menuItem} key={menuItem.url}/>)}
    </ul>

const Header = () => 
    <header>
        <Menu />
    </header>

export default Header