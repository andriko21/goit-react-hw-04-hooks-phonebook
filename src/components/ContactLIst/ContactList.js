import React from 'react'
import style from './ContactList.module.css'

const ContactList = ({ itemsRender, deleteItem }) => (

    <div className={style.contacts__container}>
          <h2>Contacts</h2>
    <ul className={style.list}>
      
            {itemsRender.map(({ name, id, number }) => (
              <li className={style.item} key={id}>
                <p className={style.userName}>{name}: </p>
                <p>{number}</p>
                <button type="button" className={style.button} onClick={() => deleteItem(id)}>delete</button>
              </li>

            ))}
          </ul>
        </div>
)

export default ContactList;