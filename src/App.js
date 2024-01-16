import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const data = [
        { name: 'shireesha', email: 'shireesha@gmail.com', profileLogo: 'https://thumbs.dreamstime.com/b/calligraphic-monogram-letter-s-logo-ornate-feminine-initial-symbol-old-style-creative-emblem-fashion-boutique-170598786.jpg' },
         { name: 'Ankitha', email: 'ankitha@gmail.com', profileLogo: 'https://static.vecteezy.com/system/resources/thumbnails/017/208/923/small/luxury-letter-a-logo-a-logotype-for-elegant-and-stylish-fashion-symbol-vector.jpg' },
         { name: 'chinni', email: 'chinni@gmail.com', profileLogo: 'https://img.freepik.com/free-vector/branding-identity-corporate-c-logo-vector-design-template_460848-13936.jpg' },
         { name: 'vanaja', email: 'vanaja@gmail.com', profileLogo: 'https://static.vecteezy.com/system/resources/thumbnails/003/651/643/small/v-letter-logo-icon-for-business-and-company-vector.jpg' },
         { name: 'Ammulu', email: 'ammulu@gmail.com', profileLogo: 'https://static.vecteezy.com/system/resources/thumbnails/017/208/923/small/luxury-letter-a-logo-a-logotype-for-elegant-and-stylish-fashion-symbol-vector.jpg' },
         { name: 'Anjali', email: 'nick@gmail.com', profileLogo: 'https://static.vecteezy.com/system/resources/thumbnails/017/208/923/small/luxury-letter-a-logo-a-logotype-for-elegant-and-stylish-fashion-symbol-vector.jpg' },
         { name: 'Harshitha', email: 'harshitha@gmail.com', profileLogo: 'https://images-platform.99static.com//v6Aa4Q2kYUFBXFyEv7emqhkowEY=/1145x129:1927x911/fit-in/500x500/99designs-contests-attachments/103/103854/attachment_103854253' },
         { name: 'Swapna', email: 'swapna@gmail.com', profileLogo: 'https://thumbs.dreamstime.com/b/calligraphic-monogram-letter-s-logo-ornate-feminine-initial-symbol-old-style-creative-emblem-fashion-boutique-170598786.jpg' },
         { name: 'Chandrakala', email: 'chandrakala@gmail.com', profileLogo: 'https://img.freepik.com/free-vector/branding-identity-corporate-c-logo-vector-design-template_460848-13936.jpg' },
         { name: 'Muneera', email: 'muneera@gmail.com', profileLogo: 'https://i.pinimg.com/originals/6e/36/f2/6e36f2c9d9cc523f5904d6e4c91921f4.jpg' },
       ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selectedChips, setSelectedChips] = useState([]);
  const [enteredNames, setEnteredNames] = useState([]);
  const inputRef = useRef(null);
  const isInputClicked = useRef(false);
  const hasEnteredData = useRef(false);

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (isInputClicked.current) {
      const filteredOptions = data.filter(option =>
        option.name.toLowerCase().includes(value.toLowerCase())
      ).filter(option => !selectedChips.map(chip => chip.name).includes(option.name) && !enteredNames.includes(option.name));
      setFilteredOptions(filteredOptions);
    }
  };

  const handleChipClick = (user) => {
    setSelectedChips((chips) => [...chips, user]);
    setEnteredNames((names) => [...names, user.name]);
    setFilteredOptions((options) => options.filter(option => option !== user));
    setSearchTerm('');
  };

  const handleChipRemove = (user) => {
    setSelectedChips((chips) => chips.filter(c => c !== user));
    setEnteredNames((names) => names.filter(name => name !== user.name));
    setFilteredOptions((options) => {
      if (!options.some(option => option.name === user.name)) {
        return [...options, user];
      }
      return options;
    });
  };

  const handleBackspace = () => {
    if (searchTerm === '' && selectedChips.length > 0) {
      const lastChip = selectedChips[selectedChips.length - 1];
      handleChipRemove(lastChip);
    }
  };

  useEffect(() => {
    if (inputRef.current && isInputClicked.current) {
      if (!hasEnteredData.current) {
        setFilteredOptions(data.filter(option => !selectedChips.map(chip => chip.name).includes(option.name) && !enteredNames.includes(option.name)));
        hasEnteredData.current = true;
      }
    }
  }, [selectedChips, enteredNames]);

  return (
    <div className="app">
      <h3 className='title'>Pick Users</h3>
      <div className="chip-container">
        {selectedChips.map((user, index) => (
          <div key={index} className="chip" onClick={() => handleChipRemove(user)}>
            <img src={user.profileLogo} alt={user.name} className="profile-logo" />
            {user.name}
            <span className="chip-remove-icon" role="button" onClick={() => handleChipRemove(user)}>
              X
            </span>
          </div>
        ))}
        <input className='input'
          type="text"
          ref={inputRef}
          placeholder="Search name"
          value={searchTerm}
          onClick={() => {
            isInputClicked.current = true;
            hasEnteredData.current = false;
            setFilteredOptions(data.filter(option => !selectedChips.map(chip => chip.name).includes(option.name) && !enteredNames.includes(option.name)));
          }}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Backspace' && handleBackspace()}
        />
      </div>
      {isInputClicked.current && (
        <div className="options-container">
          <div className="options-scroll">
            {filteredOptions.map((user, index) => (
              <div key={index} className="option" onClick={() => handleChipClick(user)}>
                <img src={user.profileLogo} alt={user.name} className="profile-logo" />
                <span className='name'>{user.name}  </span><span className='email'>{user.email}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
