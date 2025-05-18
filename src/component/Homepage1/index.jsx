import './homepage.css';
import { TextField, Button } from '@mui/material';

const HomePage = ({searchTerm,setSearchTerm, onSearch}) => {
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
      };
    return (
        <div className="homepage">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Welcome To Happy Travel</h1>
                    <p>Enjoy The Journey.</p>
                    <div style={{ marginBottom: '20px' }}>
                    <input
                         type="text"
                         placeholder="Search items..."
                         value={searchTerm}
                        onChange={handleInputChange}
                        style={{
                        padding: '10px',
                        width: '100%',
                        maxWidth: '400px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onSearch}
                        style={{ textTransform: 'none' }}
                    >
                    Search
                    </Button>
                </div>
                </div>
            </section>

            {/* Features Section
            <section className="features-section">
                <h2>Our Features</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <h3>Feature One</h3>
                        <p>This is an amazing feature that helps you do X.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Feature Two</h3>
                        <p>Another great feature that allows you to do Y.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Feature Three</h3>
                        <p>This feature enhances your productivity by Z.</p>
                    </div>
                </div>
            </section> */}
        </div>
    );
};

export default HomePage;
