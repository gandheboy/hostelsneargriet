
# HostelNest - HTML Version

A standalone HTML/CSS/JS version of the HostelNest hostel booking website, built with Bootstrap and Tailwind CSS.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Advanced Filtering**: Filter hostels by gender, distance, price, and sharing type
- **Interactive UI**: Smooth animations and hover effects
- **Modal Details**: Detailed hostel information in a beautiful modal
- **Glass Morphism Design**: Modern glassmorphism UI with gradient backgrounds
- **Search Functionality**: Real-time filtering of hostel results

## Technologies Used

- **HTML5**: Semantic markup and modern web standards
- **CSS3**: Custom animations, glass morphism effects, and responsive design
- **JavaScript (ES6+)**: Modern JavaScript for interactivity
- **Bootstrap 5**: Component framework for responsive design
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide Icons**: Beautiful icon library
- **Google Fonts**: Poppins font family

## File Structure

```
├── index.html          # Main HTML file
├── styles.css          # Custom CSS styles
├── script.js           # JavaScript functionality
└── README.md          # This file
```

## Getting Started

1. **Download the files**: Save all files in the same directory
2. **Open in browser**: Double-click `index.html` or open it in any modern web browser
3. **No server required**: This is a static website that runs entirely in the browser

## Features Breakdown

### Filter System
- **Gender Filter**: Filter by Male, Female, Co-ed, or All
- **Distance Filter**: Set maximum distance from GRIET (0.5km to 10km)
- **Price Filter**: Set maximum budget (₹3,000 to ₹10,000)
- **Sharing Type**: Filter by 2, 3, 4 sharing or All

### Hostel Cards
- High-quality images with hover effects
- Star ratings and recommendations
- Distance from GRIET
- Facility tags
- Pricing information
- Click to view detailed information

### Hostel Details Modal
- Image gallery
- Complete facility list
- Detailed pricing for all sharing types
- Book Now and Contact buttons
- Responsive design

### Animations
- Floating background elements
- Smooth slide-in animations
- Hover effects on cards
- Modal transitions
- Loading states

## Customization

### Adding New Hostels
Edit the `mockHostels` array in `script.js`:

```javascript
const mockHostels = [
    {
        id: 4, // Unique ID
        name: "New Hostel Name",
        distance: "1.5 km",
        gender: "Co-ed", // Male, Female, or Co-ed
        rating: 4.7,
        isRecommended: true,
        facilities: ["Wifi", "Mess", "Laundry"],
        pricing: {
            "2 Sharing": 9000,
            "3 Sharing": 7500,
            "4 Sharing": 6000
        },
        images: [
            "https://example.com/image1.jpg",
            "https://example.com/image2.jpg"
        ]
    }
];
```

### Styling Changes
- **Colors**: Modify CSS variables in `styles.css`
- **Fonts**: Change the Google Fonts import in `index.html`
- **Layout**: Adjust Bootstrap classes or custom CSS
- **Animations**: Modify keyframes in `styles.css`

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## Performance Features

- Optimized images with proper sizing
- Efficient filtering algorithms
- Smooth animations with CSS transforms
- Lazy loading considerations
- Responsive image handling

## Deployment

This static website can be deployed to any web hosting service:

- **Netlify**: Drag and drop the folder
- **Vercel**: Connect to a Git repository
- **GitHub Pages**: Upload to a repository
- **Traditional hosting**: Upload files via FTP

## License

This project is open source and available under the MIT License.

## Support

For any issues or questions, please check the code comments or create an issue in the repository.
