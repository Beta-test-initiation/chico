import React from 'react';
import Navbar from '@/frontend/components/Navbar';
import Image from 'next/image';
import { ABeeZee } from 'next/font/google';

const aBeeZee = ABeeZee({
  weight: '400',
  subsets: ['latin'],
});

const NewsIndex = () => {
  const newsList = [
    {
      slug: 'news1',
      title: '42 Holiday Gifts From Vogue’s Favorite Young Designers and Small Businesses',
      imageSrc: '/assets/news1.jpg',
      link: 'https://www.vogue.com/article/best-small-business-saturday-shops',
      description: 'Read more',
    },
    {
      slug: 'news2',
      title: 'Tracy Reese’s Hope for Flowers Is Bringing “Heart and Soul” to Sustainable Fashion',
      imageSrc: '/assets/news2.jpg',
      link: 'https://www.vogue.com/article/tracy-reese-hope-for-flowers-small-business-spotlight',
      description: 'Read more',
    },
    {
      slug: 'news3',
      title: 'How 6 Small, Independent Brands Are Honoring Their Roots',
      imageSrc: '/assets/news3.jpg',
      link: 'https://www.vogue.com/article/6-independent-brands-small-business-spotlight',
      description: 'Read more',
    },
    {
      slug: 'news4',
      title: 'Title for News 4',
      imageSrc: '/assets/news1.jpg',
      link: '#',
      description: 'Read more',
    },
    {
      slug: 'news5',
      title: 'Title for News 5',
      imageSrc: '/assets/news2.jpg',
      link: '#',
      description: 'Read more',
    },
    {
      slug: 'news6',
      title: 'Title for News 6',
      imageSrc: '/assets/news3.jpg',
      link: '#',
      description: 'Read more',
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="flex flex-wrap justify-center">
        {newsList.map((news, index) => (
          <div key={news.slug} className="text-center max-w-[400px] mb-8 mx-4"> {/* Added mx-4 for horizontal margin */}
            <Image src={news.imageSrc} width={400} height={367} alt={news.title} className="mb-4" /> {/* Added mb-4 for vertical margin */}
            <h3 className={`mt-2 ${aBeeZee.className} text-left`} style={{ fontSize: '26px' }}>
              {news.title}
            </h3>
            <p className={`${aBeeZee.className} mt-2 text-left`}>
              <a
                href={news.link}
                className="text-black hover:text-light-green-500 hover:underline transition-all duration-300"
              >
                {news.description}
              </a>
            </p>
            {index % 3 === 2 && <div className="w-full"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsIndex;