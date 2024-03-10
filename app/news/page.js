import React from 'react';
import Navbar from '/frontend/components/Navbar';
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
      title: 'The Best Fashion Boutiques in the Country, According to Vogue Editors',
      imageSrc: '/assets/news4.jpg',
      link: 'https://www.vogue.com/article/fashion-boutiques-around-the-country',
      description: 'Read more',
    },
    {
      slug: 'news5',
      title: 'Aurora James on Her 15 Percent Pledge Campaign to Support Black-Owned Businesses',
      imageSrc: '/assets/news5.jpg',
      link: 'https://www.vogue.com/article/aurora-james-brother-vellies-15-percent-pledge-small-business-spotlight',
      description: 'Read more',
    },
    {
      slug: 'news6',
      title: 'Rio Uribe of Gypsy Sport on Finding More Meaningful Diversity in Fashion',
      imageSrc: '/assets/news6.jpg',
      link: 'https://www.vogue.com/article/rio-uribe-gypsy-sport-pride-small-business-spotlight',
      description: 'Read more',
    },
    {
      slug: 'news7',
      title: 'Small brands are setting goalposts for sustainable fashion',
      imageSrc: '/assets/news7.jpg',
      link: 'https://www.voguebusiness.com/sustainability/small-brands-are-setting-goalposts-for-sustainable-fashion',
      description: 'Read more',
    },
    {
      slug: 'news8',
      title: 'How London Label Tove Is Quietly Building a New Blueprint for Emerging Brands',
      imageSrc: '/assets/news8.jpg',
      link: 'https://www.vogue.com/article/tove-small-business-spotlight',
      description: 'Read more',
    },
    {
      slug: 'news9',
      title: "33 Small Female-Founded Fashion Brands To Get To Know This International Women's Day",
      imageSrc: '/assets/news9.jpg',
      link: 'https://www.elle.com/uk/fashion/g26748220/small-female-fashion-brands-to-get-to-know/',
      description: 'Read more',
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="flex flex-wrap justify-center">
        {newsList.map((news, index) => (
          <div key={news.slug} className="text-center max-w-[400px] mb-8 mx-4">
            {/* Updated Image component */}
            <Image
              src={news.imageSrc}
              width={400}
              height={367}
              alt={news.title}
              className="mb-4"
              layout="fixed" // Set layout to "fixed"
              objectFit="cover" // Set objectFit to "cover" or "contain" as needed
            />
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
