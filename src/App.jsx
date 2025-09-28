import { useState, useEffect, useCallback } from 'react'
import './App.css'

function App() {
  const [currentText, setCurrentText] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [selectedSuggestion, setSelectedSuggestion] = useState(0)
  const [backgroundImage, setBackgroundImage] = useState('/aesthetic/hd/1.webp')

  // Background images - using HD images with your new image first
  const backgroundImages = [
    '/aesthetic/hd/1.webp',
    '/aesthetic/hd/1199641-4k-ultra-hd-nature-wallpaper-3840x2160-image.jpg', // Grand Canyon
    '/aesthetic/hd/photo-1615551043360-33de8b5f410c.jpeg',
    '/aesthetic/hd/pexels-eberhardgross-443446.jpg',
    '/aesthetic/hd/pexels-simon73-1183099.jpg',
    '/aesthetic/hd/53EJw1.jpg',
    '/aesthetic/hd/31189.jpg',
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
    
    // 3. Massive vocabulary for fluent sentence building
    const fluentWords = [
      // Common words
      'the', 'and', 'to', 'of', 'a', 'in', 'is', 'it', 'you', 'that', 'he', 'was', 'for', 'on', 'are', 'as', 'with', 'his', 'they', 'i', 'at', 'be', 'this', 'have', 'from', 'or', 'one', 'had', 'by', 'word', 'but', 'not', 'what', 'all', 'were', 'we', 'when', 'your', 'can', 'said', 'there', 'each', 'which', 'she', 'do', 'how', 'their', 'if', 'will', 'up', 'other', 'about', 'out', 'many', 'then', 'them', 'these', 'so', 'some', 'her', 'would', 'make', 'like', 'into', 'him', 'time', 'has', 'two', 'more', 'go', 'no', 'way', 'could', 'my', 'than', 'first', 'been', 'call', 'who', 'its', 'now', 'find', 'long', 'down', 'day', 'did', 'get', 'come', 'made', 'may', 'part',
      
      // Extended vocabulary
      'beautiful', 'amazing', 'incredible', 'wonderful', 'fantastic', 'awesome', 'brilliant', 'excellent', 'perfect', 'great', 'good', 'nice', 'cool', 'hot', 'cold', 'warm', 'bright', 'dark', 'light', 'heavy', 'light', 'big', 'small', 'large', 'tiny', 'huge', 'massive', 'enormous', 'giant', 'micro', 'macro', 'fast', 'slow', 'quick', 'rapid', 'swift', 'gradual', 'sudden', 'instant', 'immediate', 'delayed', 'early', 'late', 'soon', 'later', 'before', 'after', 'during', 'while', 'since', 'until', 'always', 'never', 'sometimes', 'often', 'rarely', 'usually', 'normally', 'typically', 'generally', 'specifically', 'particularly', 'especially', 'mainly', 'mostly', 'entirely', 'completely', 'totally', 'absolutely', 'definitely', 'certainly', 'probably', 'maybe', 'perhaps', 'possibly', 'likely', 'unlikely', 'impossible', 'possible', 'real', 'fake', 'true', 'false', 'correct', 'wrong', 'right', 'left', 'center', 'middle', 'top', 'bottom', 'front', 'back', 'side', 'inside', 'outside', 'within', 'without', 'beyond', 'above', 'below', 'under', 'over', 'through', 'across', 'around', 'near', 'far', 'close', 'distant', 'here', 'there', 'everywhere', 'nowhere', 'somewhere', 'anywhere',
      
      // Action words
      'create', 'build', 'make', 'do', 'work', 'play', 'run', 'walk', 'jump', 'fly', 'swim', 'dive', 'climb', 'fall', 'rise', 'stand', 'sit', 'lie', 'sleep', 'wake', 'eat', 'drink', 'cook', 'bake', 'fry', 'boil', 'freeze', 'melt', 'burn', 'cut', 'slice', 'chop', 'mix', 'stir', 'shake', 'roll', 'spin', 'turn', 'rotate', 'move', 'stop', 'start', 'begin', 'end', 'finish', 'complete', 'continue', 'pause', 'wait', 'hurry', 'rush', 'slow', 'speed', 'accelerate', 'decelerate', 'drive', 'ride', 'sail', 'travel', 'journey', 'explore', 'discover', 'find', 'lose', 'hide', 'seek', 'search', 'look', 'see', 'watch', 'observe', 'notice', 'hear', 'listen', 'smell', 'taste', 'touch', 'feel', 'think', 'know', 'understand', 'learn', 'teach', 'study', 'read', 'write', 'speak', 'talk', 'say', 'tell', 'ask', 'answer', 'reply', 'respond', 'explain', 'describe', 'show', 'demonstrate', 'prove', 'test', 'try', 'attempt', 'succeed', 'fail', 'win', 'lose', 'gain', 'earn', 'spend', 'save', 'buy', 'sell', 'trade', 'exchange', 'give', 'take', 'receive', 'accept', 'reject', 'refuse', 'allow', 'permit', 'forbid', 'prevent', 'stop', 'start', 'help', 'assist', 'support', 'encourage', 'motivate', 'inspire', 'influence', 'affect', 'change', 'improve', 'enhance', 'develop', 'grow', 'expand', 'increase', 'decrease', 'reduce', 'minimize', 'maximize', 'optimize', 'perfect', 'fix', 'repair', 'break', 'damage', 'destroy', 'ruin', 'waste', 'save', 'protect', 'defend', 'attack', 'fight', 'battle', 'war', 'peace', 'love', 'hate', 'like', 'dislike', 'enjoy', 'suffer', 'pain', 'pleasure', 'joy', 'sadness', 'happiness', 'anger', 'fear', 'worry', 'concern', 'care', 'ignore', 'forget', 'remember', 'recall', 'recognize', 'identify', 'name', 'call', 'label', 'title', 'designate', 'appoint', 'choose', 'select', 'pick', 'decide', 'determine', 'conclude', 'result', 'cause', 'effect', 'reason', 'purpose', 'goal', 'aim', 'target', 'objective', 'plan', 'strategy', 'method', 'way', 'means', 'tool', 'instrument', 'device', 'machine', 'technology', 'science', 'art', 'music', 'dance', 'sport', 'game', 'fun', 'entertainment', 'education', 'knowledge', 'wisdom', 'intelligence', 'creativity', 'imagination', 'dream', 'hope', 'wish', 'desire', 'want', 'need', 'require', 'demand', 'request', 'order', 'command', 'control', 'manage', 'lead', 'follow', 'guide', 'direct', 'instruct', 'advise', 'suggest', 'recommend', 'propose', 'offer', 'present', 'introduce', 'meet', 'greet', 'welcome', 'farewell', 'goodbye', 'hello', 'hi', 'thanks', 'thank', 'please', 'sorry', 'excuse', 'pardon', 'forgive', 'apologize', 'celebrate', 'congratulate', 'praise', 'compliment', 'criticize', 'blame', 'accuse', 'judge', 'evaluate', 'assess', 'measure', 'calculate', 'count', 'number', 'amount', 'quantity', 'quality', 'size', 'weight', 'length', 'width', 'height', 'depth', 'distance', 'speed', 'time', 'hour', 'minute', 'second', 'day', 'week', 'month', 'year', 'century', 'decade', 'moment', 'instant', 'period', 'duration', 'interval', 'frequency', 'rate', 'ratio', 'proportion', 'percentage', 'fraction', 'decimal', 'whole', 'part', 'piece', 'section', 'portion', 'share', 'half', 'quarter', 'third', 'double', 'triple', 'single', 'multiple', 'many', 'few', 'several', 'some', 'all', 'none', 'every', 'each', 'both', 'either', 'neither', 'any', 'much', 'little', 'more', 'less', 'most', 'least', 'best', 'worst', 'better', 'worse', 'same', 'different', 'similar', 'alike', 'unlike', 'opposite', 'contrary', 'reverse', 'forward', 'backward', 'upward', 'downward', 'inward', 'outward', 'north', 'south', 'east', 'west', 'direction', 'position', 'location', 'place', 'area', 'region', 'country', 'nation', 'state', 'city', 'town', 'village', 'street', 'road', 'path', 'way', 'route', 'journey', 'trip', 'travel', 'vacation', 'holiday', 'festival', 'celebration', 'party', 'meeting', 'conference', 'event', 'occasion', 'situation', 'circumstance', 'condition', 'state', 'status', 'situation', 'position', 'role', 'function', 'purpose', 'reason', 'cause', 'effect', 'result', 'consequence', 'outcome', 'conclusion', 'ending', 'beginning', 'start', 'finish', 'complete', 'whole', 'entire', 'total', 'full', 'empty', 'partial', 'incomplete', 'unfinished', 'done', 'undone', 'ready', 'prepared', 'organized', 'planned', 'structured', 'systematic', 'random', 'chaotic', 'orderly', 'messy', 'clean', 'dirty', 'fresh', 'old', 'new', 'young', 'ancient', 'modern', 'contemporary', 'current', 'present', 'future', 'past', 'recent', 'latest', 'earliest', 'first', 'last', 'final', 'initial', 'original', 'copy', 'duplicate', 'unique', 'common', 'rare', 'special', 'ordinary', 'normal', 'typical', 'unusual', 'strange', 'weird', 'bizarre', 'amazing', 'incredible', 'unbelievable', 'remarkable', 'extraordinary', 'outstanding', 'exceptional', 'excellent', 'perfect', 'flawless', 'ideal', 'wonderful', 'marvelous', 'fantastic', 'awesome', 'great', 'good', 'fine', 'okay', 'alright', 'acceptable', 'satisfactory', 'decent', 'fair', 'average', 'mediocre', 'poor', 'bad', 'terrible', 'awful', 'horrible', 'disgusting', 'ugly', 'beautiful', 'pretty', 'handsome', 'attractive', 'charming', 'lovely', 'cute', 'adorable', 'sweet', 'kind', 'gentle', 'friendly', 'nice', 'pleasant', 'delightful', 'enjoyable', 'fun', 'entertaining', 'interesting', 'exciting', 'thrilling', 'amazing', 'boring', 'dull', 'tiring', 'exhausting', 'relaxing', 'calm', 'peaceful', 'quiet', 'loud', 'noisy', 'silent', 'still', 'active', 'busy', 'free', 'available', 'unavailable', 'occupied', 'vacant', 'empty', 'full', 'crowded', 'packed', 'spacious', 'roomy', 'tight', 'loose', 'firm', 'soft', 'hard', 'smooth', 'rough', 'sharp', 'dull', 'bright', 'dark', 'light', 'heavy', 'thick', 'thin', 'wide', 'narrow', 'tall', 'short', 'deep', 'shallow', 'long', 'brief', 'quick', 'slow', 'fast', 'rapid', 'swift', 'gradual', 'sudden', 'instant', 'immediate', 'delayed', 'early', 'late', 'soon', 'later', 'before', 'after', 'during', 'while', 'since', 'until', 'always', 'never', 'sometimes', 'often', 'rarely', 'usually', 'normally', 'typically', 'generally', 'specifically', 'particularly', 'especially', 'mainly', 'mostly', 'entirely', 'completely', 'totally', 'absolutely', 'definitely', 'certainly', 'probably', 'maybe', 'perhaps', 'possibly', 'likely', 'unlikely', 'impossible', 'possible', 'real', 'fake', 'true', 'false', 'correct', 'wrong', 'right', 'left', 'center', 'middle', 'top', 'bottom', 'front', 'back', 'side', 'inside', 'outside', 'within', 'without', 'beyond', 'above', 'below', 'under', 'over', 'through', 'across', 'around', 'near', 'far', 'close', 'distant', 'here', 'there', 'everywhere', 'nowhere', 'somewhere', 'anywhere'
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
    
    // Auto-correct while typing
    const correctedText = autoCorrectText(text)
    if (correctedText !== text) {
      setCurrentText(correctedText)
      // Generate suggestions for corrected text
      const newSuggestions = generateSuggestions(correctedText)
      setSuggestions(newSuggestions)
    } else {
      // Always generate suggestions, even for empty text
      const newSuggestions = generateSuggestions(text)
      setSuggestions(newSuggestions)
    }
    setSelectedSuggestion(0)
  }

  // Auto-correct function
  const autoCorrectText = (text) => {
    const words = text.split(' ')
    const correctedWords = words.map(word => {
      const corrections = {
        'teh': 'the', 'adn': 'and', 'taht': 'that', 'wht': 'what', 'wher': 'where',
        'wen': 'when', 'recieve': 'receive', 'seperate': 'separate', 'definately': 'definitely',
        'occured': 'occurred', 'begining': 'beginning', 'neccessary': 'necessary',
        'beleive': 'believe', 'accomodate': 'accommodate', 'embarass': 'embarrass',
        'priviledge': 'privilege', 'acheive': 'achieve', 'calender': 'calendar',
        'existance': 'existence', 'maintainance': 'maintenance', 'occassion': 'occasion',
        'thier': 'their', 'alot': 'a lot', 'becuase': 'because', 'untill': 'until',
        'thru': 'through', 'lite': 'light', 'nite': 'night', 'rite': 'right',
        'rite': 'write', 'loose': 'lose', 'loose': 'loose', 'its': "it's",
        'your': "you're", 'there': "they're", 'to': 'too', 'to': 'two',
        'here': 'hear', 'no': 'know', 'new': 'knew', 'wear': 'where',
        'weather': 'whether', 'peace': 'piece', 'plain': 'plane', 'sale': 'sail',
        'see': 'sea', 'sight': 'site', 'sight': 'cite', 'son': 'sun',
        'tail': 'tale', 'their': 'there', 'threw': 'through', 'to': 'too',
        'weak': 'week', 'wood': 'would', 'write': 'right', 'your': "you're"
      }
      
      const cleanWord = word.toLowerCase().replace(/[^\w]/g, '')
      if (corrections[cleanWord]) {
        return word.replace(cleanWord, corrections[cleanWord])
      }
      return word
    })
    
    return correctedWords.join(' ')
  }

  const applySuggestion = useCallback((index) => {
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
  }, [suggestions, currentText])

  // Keyboard event handler - only when NOT typing in text box
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Only handle arrow keys if we're NOT focused on the text input
      const isTypingInBox = document.activeElement?.tagName === 'TEXTAREA'
      
      if (isTypingInBox) {
        // Allow normal typing in the text box - don't interfere
        return
      }
      
      console.log('Key pressed outside text box:', event.key)
      
      switch(event.key) {
        case 'ArrowLeft':
          event.preventDefault()
          console.log('Left arrow pressed - applying suggestion 0')
          applySuggestion(0)
          break
        case 'ArrowDown':
          event.preventDefault()
          console.log('Down arrow pressed - applying suggestion 1')
          applySuggestion(1)
          break
        case 'ArrowRight':
          event.preventDefault()
          console.log('Right arrow pressed - applying suggestion 2')
          applySuggestion(2)
          break
        case 'Enter':
          event.preventDefault()
          console.log('Enter pressed - applying suggestion 1 (center)')
          applySuggestion(1)
          break
        case ' ':
          // Check if we're at the end of a word that needs correction
          const currentWords = currentText.split(' ')
          const lastWord = currentWords[currentWords.length - 1]?.toLowerCase() || ''
          const corrections = {
            'teh': 'the', 'adn': 'and', 'taht': 'that', 'wht': 'what', 'wher': 'where',
            'wen': 'when', 'recieve': 'receive', 'seperate': 'separate', 'definately': 'definitely'
          }
          
          if (corrections[lastWord]) {
            event.preventDefault()
            const correctedText = currentText.replace(lastWord, corrections[lastWord]) + ' '
            setCurrentText(correctedText)
            const newSuggestions = generateSuggestions(correctedText)
            setSuggestions(newSuggestions)
            setSelectedSuggestion(0)
            console.log('Space pressed - auto-corrected:', lastWord, 'to:', corrections[lastWord])
          } else {
            event.preventDefault()
            console.log('Space pressed - applying suggestion 1 (center)')
            applySuggestion(1)
          }
          break
        default:
          // Allow normal typing
          break
      }
    }

    // Add event listener
    document.addEventListener('keydown', handleKeyPress)
    
    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [applySuggestion])

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
                  title="Left Arrow Key"
                >
                  ←
                </button>
                <button 
                  className="key-btn center-key" 
                  onClick={() => applySuggestion(1)}
                  title="Down Arrow, Enter, or Space"
                >
                  ↓
                </button>
                <button 
                  className="key-btn right-key" 
                  onClick={() => applySuggestion(2)}
                  title="Right Arrow Key"
                >
                  →
                </button>
              </div>
              <div className="keyboard-hint">
                Use ← ↓ → arrow keys, Enter, or Space to apply suggestions
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
            autoComplete="nope"
            spellCheck="false"
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