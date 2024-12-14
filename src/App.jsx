import WoopChat from './components/WoopChat'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="App">
      <div className="background-container">
        <video 
          autoPlay
          loop
          muted
          className="background-gif"
        >
          <source src="/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <WoopChat />
      <Footer />
    </div>
  )
}

export default App 