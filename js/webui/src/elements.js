import React from 'react'
import PropTypes from 'prop-types'
import spriteSvg from 'open-iconic/sprite/sprite.svg'

export function Icon(props)
{
    const { name, className } = props;
    const fullClassName = 'icon icon-' + name + (className ? ' ' + className : '');

    if (name === 'none')
        return (<div className={fullClassName} />);

    return (
        <svg className={fullClassName}>
            <use xlinkHref={spriteSvg + '#' + name} />
        </svg>
    );
}

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export const Button = React.forwardRef(function Button(props, ref)
{
    const { name, title, className, href, onClick, active } = props;

    const fullClassName = 'button'
        + (className ? ' ' + className : '')
        + (active ? ' active' : '');

    return (
        <a ref={ref} href={href || '#'} title={title} className={fullClassName} onClick={onClick}>
            <Icon name={name} />
        </a>
    );
});

Button.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
    href: PropTypes.string,
    onClick: PropTypes.func,
    active: PropTypes.bool
};

export function Menu(props)
{
    const { children } = props;

    return (
        <ul className='menu'>
            {children}
        </ul>
    );
}

export function MenuItem(props)
{
    const { title, href, onClick, checked } = props;

    let menuIcon;

    if (checked === true)
        menuIcon = (<Icon name='check' />);
    else if (checked === false)
        menuIcon = (<Icon name='none' />);
    else
        menuIcon = null;

    return (
        <li className='menu-item'>
            <a href={href || '#'} onClick={onClick}>
                { menuIcon }<span>{ title }</span>
            </a>
        </li>
    );
}

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    href: PropTypes.string,
    onClick: PropTypes.func,
    checked: PropTypes.bool,
};

export function MenuSeparator(props)
{
    return (
        <li className='menu-separator' />
    );
}

export function MenuLabel(props)
{
    return (
        <li className='menu-label'>{props.title}</li>
    );
}

MenuLabel.propTypes = {
    title: PropTypes.string.isRequired
};

export function PanelHeader(props)
{
    return (
        <div className='panel-header'>
            <div className='header-block header-block-primary'>
                <span className='header-label header-label-primary'>{props.title}</span>
            </div>
        </div>
    );
}

PanelHeader.propTypes = {
    title: PropTypes.string.isRequired
};
