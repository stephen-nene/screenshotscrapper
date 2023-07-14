import { useState } from 'react';
import './App.css';
import { message } from 'antd';
import axios from 'axios';

function App() {
  const [link, setLink] = useState('');
  const [statement, setStatement] = useState(" ")
  const [img, setImg] = useState('https://placehold.co/600x400/orange/white?text=Screenshot+appears+here');

  const handleScreenshot = async (e) => {
    e.preventDefault();
    if (link) {
      try {
        message.loading('Taking screenshot...');        
        const response = await axios.post('http://localhost:3000/screenshot', { link });
        const { title, filename } = response.data;
        
        const imageURL = `http://localhost:3000/images/${filename}`;
        setImg(imageURL);
        setStatement(`Scrapped ${title}`)
        message.success(`Screenshot taken for "${title}"`);
      } catch (error) {
        console.error(error);
        message.error('Failed to take screenshot');
      }
    } else {
      message.error('Empty link to fetch');
    }
  };

  return (
    <>
      <div className="home">
        <h1>screenShot scrapper</h1>
        <form onSubmit={handleScreenshot}>
          <div className="inputs">
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              type="text"
              placeholder="Paste a link here"
            />
            <button type="submit" className="scrape">
              Screenshot
            </button>
          </div>
        </form>
        <img src={img} alt="scrapped site" />
        <p>{statement}</p>
      </div>
    </>
  );
}

export default App;
