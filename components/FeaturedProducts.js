/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
// eslint-disable-next-line import/no-unresolved
import onImageError from '@/utils/onImageError';

const FeaturedProductosWrapper = styled.section`
  margin: 2em 3em;

  h3 {
    text-align: center;
    margin: 10px;
  }
`;

const ImageItemCarrousel = styled.img`
  width: 100%;
  object-fit: contain;
  transition: transform 0.3s ease-out;
`;

const ItemCarrouselWrapper = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 5px;
  display: flex !important;
  padding: 10px;
  margin: 0 10px;
  max-width: 200px;
  max-height: 200px;
  min-height: 200px;
  cursor: pointer;

  &:hover ${ImageItemCarrousel} {
    transform: scale(1.05);
  }
`;

// const ItemPlaceholder = styled.div`
//   height: 250px;
//   background: #eee;
// `;

const Arrow = styled.div`
  color: red;
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 1em;
  z-index: 99;

  :before {
    font-size: 2.5em !important;
    color: black;
  }
`;

const NextArrow = styled(Arrow)`
  :before {
    content: ${FaAngleRight};
  }
`;
const PrevArrow = styled(Arrow)`
  :before {
    content: ${FaAngleRight};
  }
`;
const FeaturedProducts = ({ featuredProducts }) => {
  const [products, setProducts] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (featuredProducts) {
      setProducts(featuredProducts);
      setIsLoading(false);
    }
  }, [featuredProducts]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 8,
    slidesToScroll: 1,
    variableWidth: false,
    centerMode: false,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  };

  return (
    <FeaturedProductosWrapper>
      <h3>Productos Destacados</h3>
      <Slider {...settings}>
        {isLoading
          ? []
          : products.map((i) => (
            <ItemCarrouselWrapper key={i.id}>
              <Link
                href="/detalle/[name]/[id]"
                as={`/detalle/${i.name}/${i.id}`}
              >
                <ImageItemCarrousel
                  onError={onImageError}
                  key={i}
                  src={process.env.NEXT_PUBLIC_API_URL + i.imagePath}
                  alt={i.name}
                  title={i.name}
                />
              </Link>
            </ItemCarrouselWrapper>
          ))}
      </Slider>
    </FeaturedProductosWrapper>
  );
};

FeaturedProducts.propTypes = {
  featuredProducts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequried,
      name: PropTypes.string.isRequried,
      imagePath: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default FeaturedProducts;
