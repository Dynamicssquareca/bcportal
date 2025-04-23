import React, { useState,useRef } from 'react';
import ServiceBox from "@/components/ServiceBox";
import Head from "next/head";
import Image from "next/image";
// import { Inter } from "next/font/google";
// import styles from "@/styles/Home.module.css";
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import ModelBox from '@/components/ModelBox';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
// const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };


  return (
    <>
      <Head>
        <title>Trusted Salesforce Implementation Partner in USA | CRM Frontier</title>
        <meta name="description" content="CRM Frontier is a trusted Salesforce consulting and implementation partner in USA, offering expert solutions to optimize your business processes and drive success with Salesforce CRM. Contact us today!" />
        <link rel="canonical" href="https://www.crmfrontier.com/" />
        <meta property="og:locale" content="US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Trusted Salesforce Implementation Partner in USA | CRM Frontier" />
        <meta property="og:description" content="CRM Frontier is a trusted Salesforce consulting and implementation partner in USA, offering expert solutions to optimize your business processes and drive success with Salesforce CRM. Contact us today!" />
        <meta property="og:url" content="https://www.crmfrontier.com/" />
        <meta property="og:site_name" content="CRM Frontier " />
        <meta property="og:image" content="https://www.crmfrontier.com/img/feature/Homepage.jpg" />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
        <meta property="og:image:type" content="image/jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@CRM Frontier" />
        <meta name="twitter:title" content="Trusted Salesforce Implementation Partner in USA | CRM Frontier" />
        <meta name="twitter:description" content="CRM Frontier is a trusted Salesforce consulting and implementation partner in USA, offering expert solutions to optimize your business processes and drive success with Salesforce CRM. Contact us today!" />
        <meta name="twitter:image" content="https://www.crmfrontier.com/img/feature/Homepage.jpg" />

      </Head>
      



    </>
  );
}
