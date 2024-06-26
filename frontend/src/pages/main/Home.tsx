import React from "react";

import { Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import './HomeStyle.scss';

export default function Home() {
    console.log(12121212)

  
    return (
        <>
            <Container>
                <Carousel
                    data-bs-theme="dark"
                    // className="mb-5 d-none d-sm-block"
                    className="mb-5"
                >
                    <Carousel.Item>
                        <a href="/ads/1">
                            <img
                            className="d-block w-100"
                            src="/files/main-banner/main-background.jpg"
                            alt="First slide"
                        />
                        </a>

                    </Carousel.Item>

                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/files/main-banner/mediinaya_reklama.jpg"
                            alt="Second slide"
                        />

                    </Carousel.Item>
                </Carousel>

                <Row className="mb-5 main-sale-place">
                    <Col xs={12} sm={6} lg={3} className="mb-3">
                        <a href="/ads/1">
                            <Image
                                src="/files/reklama/sale.jpg"
                                thumbnail
                                className="img-mob"
                            />
                        </a>
                    </Col>
                    <Col xs={12} sm={6} lg={3} className="mb-3">
                        <a href="https://kopi34.ru/">
                            <Image
                                src="/files/reklama/bagetnaya-masterskaya.jpg"
                                thumbnail
                                className="img-mob"
                            />
                        </a>
                    </Col>
                    <Col xs={12} sm={6} lg={3} className="mb-3">
                        <a href="https://kopi34.ru/3d-details">
                            <Image
                                src="/files/reklama/3d-pechat.jpg"
                                thumbnail
                                className="img-mob"
                            />
                        </a>
                    </Col>
                    <Col xs={12} sm={6} lg={3} className="mb-3">
                        {/* <a href="/produce/banner"> */}
                            <Image
                                src="/files/reklama/vykup-auto.jpg"
                                thumbnail
                                className="img-mob"
                            />
                        {/* </a> */}
                    </Col>
                    {/* <Col xs={12} sm={6} lg={3} className="mb-3">
                        <a href="/produce/vizitki">
                            <Image
                                src="/files/reklama/reklama.jpg"
                                thumbnail
                                className="img-mob"
                            />
                        </a>
                    </Col> */}
                </Row>

                    <iframe className="youtube-video"  src="https://www.youtube.com/embed/RgECxaxUIb0?si=ajSKtrHoKWKY9VPm" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                
                <h1 style={{fontSize: '19px'}}>Первый агрегатор скидок и объявлений в Волгограде!</h1>
                <p>Первый агрегатор скидок и объявлений в Волгограде это система поиска и систиматизации всех скидок, мероприятий, благотворительности и объявлений в городе! На страницах нашего сайта есть интерактивная карта на которой вы можете найти скидки, которые размещают для вас компании нашего города. Все скидки и объявления действуют до тех пор пока размещенны на сайте!
                    Каждый житель города (только жители города могут оставлять объявления) может оставить свое объявление о продаже или благотворительности (отдать бесплатно), за объявления о благотворительностью начисляются социальные баллы, которые позволят получать дополнительные скидки в магазинах родного города!

                </p>



                {/* карта яндекс 888*/}
                {/* <div className="contacts__map" id="map">
                  <iframe id="iframe-map" src="https://yandex.ru/map-widget/v1/?um=constructor%3A5c026c8b1d39d8438c5a2f7eca3c7779041f6c19eac5844e20ab76f1c95a0cdd&amp;source=constructor" width="100%" height="400" frameBorder="0"></iframe>
                </div> */}

            </Container>
        </>
    );
}
