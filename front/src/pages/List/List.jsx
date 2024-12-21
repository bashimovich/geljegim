import React, { useEffect, useState } from 'react';
import InfoPanel from '../../components/Info/InfoPanel';
import Navigation from '../../components/Navigation/Navigation';
import '../../App.css';
import Footer from '../../components/Footer/Footer';
import './List.css';
import { useLocation } from 'react-router-dom';
import { axiosInstance } from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import HumanReadableDate from '../../utils/HumanReadableDate';
import DOMPurify from "dompurify";
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';
import { ShimmerDiv, ShimmerTitle } from 'shimmer-effects-react';


function List() {
    const {t, i18n} = useTranslation()
    const navigate = useNavigate();
    const location = useLocation();
    const typear = location.state;
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        setArticles([]);
        setPage(1);
        setLoading(true);
        axiosInstance
            .get(`articles/via/${typear}/?page=1`)
            .then((res) => {
                setArticles(res.data.results);  // Load new articles
                setHasMore(res.data.next !== null);  // Check if there's more data to load
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, [typear]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading || !hasMore) return;
            setPage(prevPage => prevPage + 1);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore]);

    // This effect will handle the subsequent pages when scrolling
    useEffect(() => {
        if (page === 1) return;  // Don't run this effect on the initial load

        setLoading(true);
        axiosInstance
            .get(`articles/via/${typear}/?page=${page}`)
            .then((res) => {
                setArticles(prevArticles => [...prevArticles, ...res.data.results]);  // Append new articles to existing ones
                setHasMore(res.data.next !== null);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, [page, typear]);



    function handleClick(id) {
        navigate('/article/', { state: id });
    }

    return (
        <>
            <InfoPanel />
            <Navigation />
            <div className="list__wrapper container">
                {loading ? (
                    <>
                        <div>
                            <ShimmerDiv mode="light" rounded={1} className='daily_four_img_shimmer_in_list' />
                            <ShimmerTitle mode="light" line={2} gap={8} />  
                        </div>
                        <div>
                            <ShimmerDiv mode="light" rounded={1} className='daily_four_img_shimmer_in_list' />
                            <ShimmerTitle mode="light" line={2} gap={8} />  
                        </div>
                        <div>
                            <ShimmerDiv mode="light" rounded={1} className='daily_four_img_shimmer_in_list' />
                            <ShimmerTitle mode="light" line={2} gap={8} />  
                        </div>
                        <div>
                            <ShimmerDiv mode="light" rounded={1} className='daily_four_img_shimmer_in_list' />
                            <ShimmerTitle mode="light" line={2} gap={8} />  
                        </div>
                        <div>
                            <ShimmerDiv mode="light" rounded={1} className='daily_four_img_shimmer_in_list' />
                            <ShimmerTitle mode="light" line={2} gap={8} />  
                        </div>
                        <div>
                            <ShimmerDiv mode="light" rounded={1} className='daily_four_img_shimmer_in_list' />
                            <ShimmerTitle mode="light" line={2} gap={8} />  
                        </div>
                        <div>
                            <ShimmerDiv mode="light" rounded={1} className='daily_four_img_shimmer_in_list' />
                            <ShimmerTitle mode="light" line={2} gap={8} />  
                        </div>
                        <div>
                            <ShimmerDiv mode="light" rounded={1} className='daily_four_img_shimmer_in_list' />
                            <ShimmerTitle mode="light" line={2} gap={8} />  
                        </div>
                        <div>
                            <ShimmerDiv mode="light" rounded={1} className='daily_four_img_shimmer_in_list' />
                            <ShimmerTitle mode="light" line={2} gap={8} />  
                        </div>
                        <div>
                            <ShimmerDiv mode="light" rounded={1} className='daily_four_img_shimmer_in_list' />
                            <ShimmerTitle mode="light" line={2} gap={8} />  
                        </div>
                        <div>
                            <ShimmerDiv mode="light" rounded={1} className='daily_four_img_shimmer_in_list' />
                            <ShimmerTitle mode="light" line={2} gap={8} />  
                        </div>
                        <div>
                            <ShimmerDiv mode="light" rounded={1} className='daily_four_img_shimmer_in_list' />
                            <ShimmerTitle mode="light" line={2} gap={8} />  
                        </div>
                    </>
                ) : (
                    articles?.map((item, index) => (
                        <div className="article__card" key={index}>
                            <div
                                className="article__card__image"
                                style={{ backgroundImage: `url(${item.images_for_web[0].src})` }}
                            >
                                <div className="article__card__date">
                                    <p>{item.views}</p>
                                    <p>
                                        <HumanReadableDate date={item.created_at} />
                                    </p>
                                </div>
                            </div>
                            <div className="article__card__title">
                                <p
                                    onClick={() => { handleClick(item.id); }}
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(
                                        i18n.language === 'tm'?
                                        item.description_tm:
                                        i18n.language === 'en'?
                                        item.description_en:
                                        i18n.language === 'ru'?
                                        item.description_ru:null
                                        ) }}
                                ></p>
                            </div>
                        </div>
                    ))
                )}
                {!hasMore && !loading && (
                    <div className="end-message">
                        <p>{t('No more articles to load')}</p>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default List;
