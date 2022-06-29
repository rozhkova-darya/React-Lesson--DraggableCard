import React, {useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import randomColor from 'randomcolor';
import Draggable from 'react-draggable';

import './App.css';

function App() {

  const [item, setItem] = useState('');
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  );

  useEffect(() => {
     localStorage.setItem('items', JSON.stringify(items))
  }, [items]);

  const newItem = () => {
    if(item.trim() !== '') {
      const nItem = {
        id: uuidv4(),
        item,
        color: randomColor({
          luminosity: 'light',
        }),
        defaultPos: {
          x: 0, y: 0,
        }
      }
      setItems([...items, nItem]); 
    }
    
    setItem('');
  };

  const deliteItem = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const updatePos = (data, index) => {
    let newArrayItems = [...items];
    newArrayItems[index].defaultPos = {x: data.x, y: data.y}
    setItems(newArrayItems)
  }


  return (
    <>
      <div className="wrapper">
        <input className='add_input' type="text" placeholder='Создай карточку' 
          onChange = {(e) => setItem(e.target.value)} value={item}
          onKeyPress={(e) => e.code === 'Enter' && newItem()}
        />
        <button className='add_btn' onClick={newItem}>Добавить</button>
      </div>

      {
        items.map((item, index) => {
          return <Draggable
              key={index}
              defaultPosition={item.defaultPos}
              onStop={(e, data) => updatePos(data, index)}
            >

            <div className='todo__item' style={{backgroundColor: item.color}}>
              {`${item.item}`}
              <button className='del_btn' onClick={() => deliteItem(item.id)}>X</button>
            </div>

            </Draggable>
        })
      }
    </>
  );
}

export default App;
