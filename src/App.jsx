import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [currentText, setCurrentText] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [selectedSuggestion, setSelectedSuggestion] = useState(0)
  const [backgroundImage, setBackgroundImage] = useState('/aesthetic/hd/photo-1615551043360-33de8b5f410c.jpeg')

  // Background images - using HD images
  const backgroundImages = [
    '/aesthetic/hd/photo-1615551043360-33de8b5f410c.jpeg',
    '/aesthetic/hd/pexels-eberhardgross-443446.jpg',
    '/aesthetic/hd/pexels-simon73-1183099.jpg',
    '/aesthetic/hd/53EJw1.jpg',
    '/aesthetic/hd/31189.jpg',
    '/aesthetic/hd/1199641-4k-ultra-hd-nature-wallpaper-3840x2160-image.jpg',
    '/aesthetic/hd/nature-background-high-resolution-wallpaper-for-a-serene-and-stunning-view-free-photo.jpg',
    '/aesthetic/hd/wallpapersden.com_k-a-different-world_1920x1080.jpg'
  ]

  // Enhanced suggestions that always show 3 options
  const generateSuggestions = (text) => {
    const words = text.split(' ').filter(word => word.length > 0)
    const lastWord = words[words.length - 1]?.toLowerCase() || ''
    
    const suggestions = []
    
    // 1. Autocorrect suggestions
    const corrections = {
      'teh': 'the', 'adn': 'and', 'taht': 'that', 'wht': 'what', 'wher': 'where',
      'wen': 'when', 'recieve': 'receive', 'seperate': 'separate', 'definately': 'definitely',
      'occured': 'occurred', 'begining': 'beginning', 'neccessary': 'necessary',
      'beleive': 'believe', 'accomodate': 'accommodate', 'embarass': 'embarrass',
      'priviledge': 'privilege', 'acheive': 'achieve', 'calender': 'calendar'
    }
    
    if (lastWord && corrections[lastWord]) {
      suggestions.push(corrections[lastWord])
    }
    
    // 2. Smart next word predictions
    const smartNextWords = {
      'the': ['quick', 'brown', 'fox', 'cat', 'dog', 'man', 'woman', 'house', 'car', 'book'],
      'and': ['the', 'then', 'also', 'so', 'but', 'or', 'yet', 'for', 'nor'],
      'that': ['is', 'was', 'will', 'can', 'should', 'might', 'could', 'would'],
      'what': ['is', 'are', 'was', 'were', 'do', 'does', 'did', 'will', 'can'],
      'where': ['is', 'are', 'was', 'were', 'do', 'does', 'did', 'will', 'can'],
      'when': ['you', 'we', 'I', 'he', 'she', 'they', 'it', 'this', 'that'],
      'how': ['to', 'are', 'do', 'does', 'did', 'will', 'can', 'should', 'could'],
      'this': ['is', 'was', 'will', 'can', 'should', 'might', 'could', 'would'],
      'with': ['the', 'a', 'my', 'your', 'his', 'her', 'our', 'their', 'this'],
      'from': ['the', 'a', 'my', 'your', 'his', 'her', 'our', 'their', 'this'],
      'they': ['are', 'were', 'will', 'can', 'should', 'might', 'could', 'would'],
      'have': ['been', 'had', 'will', 'can', 'should', 'might', 'could', 'would'],
      'will': ['be', 'have', 'go', 'come', 'do', 'make', 'take', 'get', 'see'],
      'can': ['be', 'do', 'go', 'come', 'make', 'take', 'get', 'see', 'help'],
      'should': ['be', 'do', 'go', 'come', 'make', 'take', 'get', 'see', 'help'],
      'could': ['be', 'do', 'go', 'come', 'make', 'take', 'get', 'see', 'help'],
      'would': ['be', 'do', 'go', 'come', 'make', 'take', 'get', 'see', 'help'],
      'must': ['be', 'do', 'go', 'come', 'make', 'take', 'get', 'see', 'help'],
      'may': ['be', 'do', 'go', 'come', 'make', 'take', 'get', 'see', 'help'],
      'might': ['be', 'do', 'go', 'come', 'make', 'take', 'get', 'see', 'help'],
      'i': ['am', 'was', 'will', 'can', 'should', 'might', 'could', 'would', 'have'],
      'you': ['are', 'were', 'will', 'can', 'should', 'might', 'could', 'would'],
      'he': ['is', 'was', 'will', 'can', 'should', 'might', 'could', 'would'],
      'she': ['is', 'was', 'will', 'can', 'should', 'might', 'could', 'would'],
      'we': ['are', 'were', 'will', 'can', 'should', 'might', 'could', 'would'],
      'it': ['is', 'was', 'will', 'can', 'should', 'might', 'could', 'would']
    }
    
    if (lastWord && smartNextWords[lastWord]) {
      suggestions.push(...smartNextWords[lastWord].slice(0, 2))
    }
    
    // 3. Common fluent words for sentence building
    const fluentWords = [
      'the', 'and', 'to', 'of', 'a', 'in', 'is', 'it', 'you', 'that', 'he', 'was', 'for', 'on', 'are', 'as', 'with', 'his', 'they', 'i', 'at', 'be', 'this', 'have', 'from', 'or', 'one', 'had', 'by', 'word', 'but', 'not', 'what', 'all', 'were', 'we', 'when', 'your', 'can', 'said', 'there', 'each', 'which', 'she', 'do', 'how', 'their', 'if', 'will', 'up', 'other', 'about', 'out', 'many', 'then', 'them', 'these', 'so', 'some', 'her', 'would', 'make', 'like', 'into', 'him', 'time', 'has', 'two', 'more', 'go', 'no', 'way', 'could', 'my', 'than', 'first', 'been', 'call', 'who', 'its', 'now', 'find', 'long', 'down', 'day', 'did', 'get', 'come', 'made', 'may', 'part'
    ]
    
    // 4. Add fluent words if we need more suggestions
    while (suggestions.length < 3 && fluentWords.length > 0) {
      const word = fluentWords[Math.floor(Math.random() * fluentWords.length)]
      if (!suggestions.includes(word)) {
        suggestions.push(word)
      }
    }
    
    return suggestions.slice(0, 3)
  }

  // Initialize suggestions on component mount
  useEffect(() => {
    const initialSuggestions = generateSuggestions('')
    setSuggestions(initialSuggestions)
  }, [])

  const handleTextChange = (e) => {
    const text = e.target.value
    setCurrentText(text)
    
    // Always generate suggestions, even for empty text
    const newSuggestions = generateSuggestions(text)
    setSuggestions(newSuggestions)
    setSelectedSuggestion(0)
  }

  const applySuggestion = (index) => {
    if (suggestions[index]) {
      const suggestionToApply = suggestions[index]
      let newText
      
      // Handle empty text or text ending with space
      if (currentText.trim() === '' || currentText.endsWith(' ')) {
        newText = currentText + suggestionToApply + ' '
      } else {
        // Replace the last word
        const words = currentText.split(' ').filter(word => word.length > 0)
        if (words.length > 0) {
          words[words.length - 1] = suggestionToApply
          newText = words.join(' ') + ' '
        } else {
          newText = suggestionToApply + ' '
        }
      }
      
      setCurrentText(newText)
      
      // Generate new suggestions for the updated text
      const newSuggestions = generateSuggestions(newText)
      setSuggestions(newSuggestions)
      setSelectedSuggestion(0)
    }
  }

  const changeBackground = () => {
    const currentIndex = backgroundImages.indexOf(backgroundImage)
    const nextIndex = (currentIndex + 1) % backgroundImages.length
    setBackgroundImage(backgroundImages[nextIndex])
  }

  return (
    <div className="app">
      <div 
        className="container"
        style={{
          backgroundImage: `url(${backgroundImage})`
        }}
      >
        {/* Top section */}
        <div className="top-section">
          <h1 className="logo">LEXA</h1>
        </div>

        {/* Middle section */}
        <div className="middle-section">
          {/* Suggestions with Navigation Keys - Always Visible */}
          <div className="suggestions-container">
            <div className="suggestions-display">
              <div className="suggestions-list">
                {suggestions.map((suggestion, index) => (
                  <span 
                    key={index}
                    className={`suggestion ${index === selectedSuggestion ? 'selected' : ''}`}
                  >
                    {suggestion}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Navigation Keys directly under suggestions */}
            <div className="keyboard-keys">
              <div className="key-row">
                <button 
                  className="key-btn left-key" 
                  onClick={() => applySuggestion(0)}
                >
                  ←
                </button>
                <button 
                  className="key-btn center-key" 
                  onClick={() => applySuggestion(1)}
                >
                  ↓
                </button>
                <button 
                  className="key-btn right-key" 
                  onClick={() => applySuggestion(2)}
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Typing section */}
        <div className="typing-section">
          <textarea
            className="text-input"
            placeholder="Enter something..."
            value={currentText}
            onChange={handleTextChange}
            rows={3}
          />
        </div>

        {/* Background change button */}
        <button className="bg-btn" onClick={changeBackground} title="Change Background">
        </button>
        
        {/* Footer */}
        <div className="footer">
          <p>Made at SunHacks 2025</p>
        </div>
      </div>
    </div>
  )
}

export default App