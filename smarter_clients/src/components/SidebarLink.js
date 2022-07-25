import React from 'react'
import { Link } from 'react-router-dom'


const SidebarLink = ({path,active,title,Icon,handleLinkActiveStates}) => { 
  return (
    <>
    <section onClick={(e)=>{handleLinkActiveStates(e)}} className={active===true? 'sideBarLink sidebarlink-active' :'sideBarLink'}>
        <span>
        <aside className='sideBarIconBox circle'><Icon/></aside>
        <Link to={path} className='sideBarLinkTitle'>{title}</Link> 
        </span>
    </section>
    </>
  )
}

export default SidebarLink