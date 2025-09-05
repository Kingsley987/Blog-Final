/*
  # Add dummy blog posts

  1. New Data
    - Insert sample blog posts with varied content
    - Different authors and timestamps
    - Mix of technical and lifestyle content

  2. Content
    - 6 sample posts covering different topics
    - Realistic content lengths and authors
    - Varied creation dates for better testing
*/

INSERT INTO posts (title, content, author, created_at) VALUES
(
  'The Future of Web Development: Trends to Watch in 2025',
  'Web development continues to evolve at a rapid pace, and 2025 promises to bring exciting new trends and technologies. From the rise of AI-powered development tools to the increasing adoption of edge computing, developers need to stay ahead of the curve.

One of the most significant trends is the integration of artificial intelligence into the development workflow. AI-powered code completion, automated testing, and intelligent debugging are becoming standard tools in every developer''s toolkit.

Edge computing is another game-changer, bringing computation closer to users and reducing latency. This shift is particularly important for real-time applications and IoT devices.

The JAMstack architecture continues to gain popularity, offering better performance, security, and developer experience. Static site generators and headless CMS solutions are becoming more sophisticated and user-friendly.

Finally, the focus on web accessibility and inclusive design is stronger than ever. Developers are increasingly prioritizing creating experiences that work for everyone, regardless of their abilities or the devices they use.',
  'Sarah Chen',
  '2024-12-15 10:30:00'
),
(
  'Building Scalable React Applications: Best Practices',
  'Creating scalable React applications requires careful planning and adherence to best practices. In this post, we''ll explore the key strategies that have helped me build maintainable applications that can grow with your team and user base.

First, establish a clear folder structure from the beginning. Organize your components by feature rather than by type. This makes it easier to locate and modify related code as your application grows.

Component composition is crucial for reusability. Instead of creating monolithic components, break them down into smaller, focused pieces that can be combined in different ways.

State management becomes critical as your app scales. While React''s built-in state is sufficient for small applications, consider tools like Redux Toolkit or Zustand for more complex state requirements.

Don''t forget about performance optimization. Use React.memo, useMemo, and useCallback judiciously to prevent unnecessary re-renders. Code splitting with React.lazy can significantly improve initial load times.

Testing should be part of your development process from day one. Write unit tests for your components and integration tests for critical user flows.',
  'Alex Rodriguez',
  '2024-12-14 14:45:00'
),
(
  'The Art of Minimalist Design: Less is More',
  'In a world cluttered with information and visual noise, minimalist design stands as a beacon of clarity and purpose. The philosophy of "less is more" isn''t just about removing elements—it''s about intentional design that serves both form and function.

Minimalism in design starts with understanding your core message. What is the one thing you want your audience to understand or do? Everything else should support that primary goal or be removed entirely.

White space, often called negative space, is not empty space—it''s a powerful design tool. It gives your content room to breathe, improves readability, and creates a sense of elegance and sophistication.

Typography becomes even more important in minimalist design. With fewer elements competing for attention, your choice of fonts, sizes, and spacing carries more weight. Choose typefaces that align with your brand personality and ensure excellent readability across all devices.

Color palettes in minimalist design are typically restrained, often featuring a neutral base with one or two accent colors. This creates visual harmony and ensures that color is used purposefully to guide attention and convey meaning.

Remember, minimalism isn''t about being boring—it''s about being intentional. Every element should have a purpose and contribute to the overall user experience.',
  'Emma Thompson',
  '2024-12-13 09:15:00'
),
(
  'Coffee Culture Around the World: A Journey Through Flavors',
  'Coffee is more than just a beverage—it''s a cultural phenomenon that brings people together across the globe. From the bustling cafés of Vienna to the traditional coffee ceremonies of Ethiopia, each culture has developed its unique relationship with this beloved drink.

In Italy, coffee culture is deeply ingrained in daily life. The morning cappuccino, the quick espresso at the bar, and the strict rules about when to drink what—Italians have turned coffee consumption into an art form. Never order a cappuccino after 11 AM, and definitely not after a meal!

Ethiopian coffee ceremonies are elaborate social events that can last for hours. The green coffee beans are roasted, ground, and brewed in front of guests, creating an aromatic experience that engages all the senses. It''s about community, respect, and taking time to connect with others.

Turkish coffee, with its thick, unfiltered preparation, represents one of the oldest brewing methods still in use today. The coffee is ground to a fine powder and brewed in a special pot called a cezve. It''s so culturally significant that it was inscribed on UNESCO''s list of Intangible Cultural Heritage.

In Australia and New Zealand, the flat white has become a symbol of the region''s coffee innovation. The perfect balance of espresso and steamed milk, served in a smaller cup than a latte, represents the precision and quality focus of Antipodean coffee culture.

Each sip tells a story of tradition, innovation, and the human desire to gather and share experiences.',
  'Marco Rossi',
  '2024-12-12 16:20:00'
),
(
  'Sustainable Living: Small Changes, Big Impact',
  'Living sustainably doesn''t require a complete lifestyle overhaul. Small, consistent changes in our daily habits can collectively make a significant impact on our environment and future generations.

Start with your energy consumption. Simple actions like switching to LED bulbs, unplugging devices when not in use, and adjusting your thermostat by just a few degrees can reduce your carbon footprint and lower your utility bills.

Transportation choices matter enormously. Consider walking, cycling, or using public transport for short trips. If you need a car, carpooling or choosing fuel-efficient vehicles can make a difference. For longer distances, offsetting your carbon emissions from flights is becoming more accessible.

Food choices have a substantial environmental impact. Reducing meat consumption, even just one day a week, can significantly lower your carbon footprint. Supporting local farmers and choosing seasonal produce reduces transportation emissions and supports your local economy.

Waste reduction is another powerful tool. The three R''s—Reduce, Reuse, Recycle—should be applied in that order. Before buying something new, ask if you really need it. Can you repair, repurpose, or borrow instead?

Water conservation is often overlooked but crucial. Fix leaks promptly, take shorter showers, and consider collecting rainwater for your garden. These small actions add up to significant water savings over time.

Remember, sustainability is a journey, not a destination. Every small step counts, and collective action creates the momentum needed for larger systemic changes.',
  'Dr. Lisa Green',
  '2024-12-11 11:00:00'
),
(
  'The Psychology of Color in User Interface Design',
  'Color is one of the most powerful tools in a designer''s arsenal, capable of evoking emotions, guiding user behavior, and creating memorable experiences. Understanding the psychology behind color choices can dramatically improve the effectiveness of your user interfaces.

Red is often associated with urgency, passion, and energy. It''s excellent for call-to-action buttons and error messages, but use it sparingly as it can be overwhelming. Many e-commerce sites use red for sale prices and urgent notifications.

Blue conveys trust, stability, and professionalism. It''s no coincidence that many financial institutions and social media platforms use blue as their primary color. It''s also easy on the eyes, making it suitable for interfaces that users interact with for extended periods.

Green represents growth, harmony, and success. It''s perfect for confirmation messages, progress indicators, and anything related to money or environmental themes. The association with "go" makes it ideal for positive actions.

Yellow is attention-grabbing and associated with happiness and creativity, but it can be difficult to read and may cause eye strain if overused. Use it for highlights and accents rather than large areas or text.

Purple suggests luxury, creativity, and sophistication. It''s less commonly used in UI design, which can make it stand out, but it should align with your brand personality.

Cultural context is crucial when choosing colors. Colors can have different meanings across cultures, so consider your global audience when making design decisions.

The key is to use color intentionally, creating a hierarchy that guides users through your interface while supporting your brand identity and user goals.',
  'Jordan Kim',
  '2024-12-10 13:30:00'
);