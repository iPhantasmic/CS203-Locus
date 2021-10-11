import {useState} from "react";
import AdminNavbar from "../../components/AdminNavbar";
import Spinner from "../../components/Spinner";
import {Breadcrumb, Button, Col, Descriptions, Divider, Image, Input, PageHeader, Row, Space, Table, Tabs} from 'antd';
import {EditOutlined, HomeOutlined} from '@ant-design/icons';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import Cookies from 'js-cookie';

export default function verify() {
    // Show Spin while loading is true
    const [loading, setLoading] = useState(true);

    // Allocation for Data
    const [govPressData, setGovPressData] = useState([]);
    const [dailyData, setDailyData] = useState([]);
    const {TabPane} = Tabs;
    const {TextArea} = Input;

    // Fetch Database Data onLoad
    const axios = require("axios");
    var config = {
        method: 'get',
        url: 'https://locus-dev.herokuapp.com/v1/govpress',
    };

    var config2 = {
        method: 'get',
        url: 'https://locus-dev.herokuapp.com/v1/daily',
    };

    // Fetch data onLoad
    dailyData.length === 0 || govPressData.length === 0 ?
        axios(config)
            .then(function (response) {
                for (const obj in response.data) {
                    response.data[obj].key = obj;
                }
                setGovPressData(response.data)
                axios(config2)
                    .then(function (response2) {
                        for (const obj in response2.data) {
                            response2.data[obj].key = obj;
                        }
                        setDailyData(response2.data)
                    })
                setLoading(false);
            })
            .catch(function (error) {
                setLoading(false);
                toastr.error('An error has occurred')
            }) : null;

    const gp_data = [
        {
            "imgUrl": "www.gov.sg//-/media/gov/covid-19/resources_may2021.jpg",
            "minutesToRead": "7",
            "articleUrl": "www.gov.sg//article/covid-19-resources",
            "articleTitle": "COVID-19 Resources",
            "articleDescription": "A collection of useful sources, posters and videos on COVID-19 (Coronavirus Disease 2019)",
            "articleID": "{6EA3E704-DFF6-48FA-921D-50A9E9DFE707}",
            "articleSummarized": "Official COVID-19 sources Posters on COVID-19 Downloadables \ud83d\udcbb\ud83d\udcf1 Websites, Social Media & Mobile Apps Official COVID-19 websites Ministry of Health Gov.sg COVID-19 Gov.sg social media channels Keeping the public informed on the latest COVID-19 situation in Singapore Gov.sg WhatsApp Subscription Available in 4 official languages Local Overseas Gov.sg Telegram Gov.sg Facebook Gov.sg Twitter Gov.sg Instagram Gov.sg YouTube Gov.sg TikTok Living with COVID-19 Find out what you should do if you are exposed or test positive for COVID-19 covid.gov.sg COVID-19 Situation Report Find latest statistics on COVID-19 and the map of areas frequented by detected COVID-19 cases in Singapore covidsitrep.moh.gov.sg COVID-19 Frequently Asked Questions Find answers to popular COVID-19 questions ask.gov.sg/agency/moh Go Where Your go-to government websites to fight against COVID-19 gowhere.gov.sg ART Go Where Locate a vending machine to collect your Antigen Rapid Test (ART) self-test kits, if you are eligible gowhere.gov.sg/art Singapore COVID-19 Symptom Checker Check your symptoms and decide on your next steps sgcovidcheck.gov.sg COVID-19 Vaccination Registration The COVID-19 vaccination programme seeks to protect Singaporeans against COVID-19, as well as to protect businessses and jobs through the progressive re-opening of Singapore vaccine.gov.sg Not\u03b1rise Use Not\u03b1rise to get your Pre-Departure Test (PDT) or Vaccination HealthCerts digitally authenticated and endorsed in 4 easy steps. notarise.gov.sg OneMap Find the shortest traveling route to nearby PHPCs and essential amenities including hawker centres and supermarkets New on OneMap: Vaccination Centres, COVID-19 polymerase chain reaction (PCR) test providers OneMap website OneMap Android OneMap iOS Regional Screening Centres (RSCs) RSCs are set up around Singapore to carry out COVID-19 swab tests for target groups from the general community who are well or have been diagnosed with acute respiratory infection (ARI). Find the closest regional screening centre to you. moh.gov.sg/covid-19/rsc Stories Of Us Fear, anxiety, hope, gratitude \u2013 we all have our stories to tell of this period. They remind us of what living through COVID-19 means to us, and are testament to our resolve as we navigate these difficult times. Reflect on the stories of others and share yours too storiesofus.gov.sg SafeTravel As Singapore progressively reopens amid the COVID-19 pandemic, Singapore has implemented special travel arrangements with some countries/regions to facilitate travel while safeguarding public health safetravel.ica.gov.sg TraceTogether Help stop the spread of COVID-19 through community-driven contact tracing Website App Store Google Play Token Go Where The TraceTogether Token complements the TraceTogether App by extending the protection provided by digital contact tracing tools to those who may not own or prefer not to use a mobile phone. token.gowhere.gov.sg COVID-19 Recovery Grant \u2022 Lower- to middle-income employees and self-employed persons who are financially impacted by COVID-19 may be eligible to receive up to $700 a month for three months. \u2022 Applications open from 18 January 2021. COVID-19 Recovery Grant Support Go Where Find available grants, funds and packages for individuals, or use the eligibility checker to find out which available support schemes are applicable to you supportgowhere.gov.sg Flu Go Where Locate a Public Health Preparedness Clinic (PHPC) or Swab and Send Home (SASH) clinic near you flu.gowhere.gov.sg Mask Go Where How to care for your mask? maskgowhere.gov.sg Space Out Check how crowded malls, supermarkets and post offices are before going spaceout.gov.sg Safe Distance @ Parks Check how crowded parks are before going safedistparks.nparks.gov.sg OneService App Report hotspots where safe distancing is still not practised How to report: 1",
            "datePublished": "02 Oct 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/mtf021021_banner-image.jpg",
            "minutesToRead": "4",
            "articleUrl": "www.gov.sg//article/changes-to-align-border-measures-with-domestic-protocols",
            "articleTitle": "Changes to align border measures with domestic protocols",
            "articleDescription": "Revised border measures to facilitate safe travel",
            "articleID": "{5D2CD9F8-287D-451C-9DC1-2B5F3910A801}",
            "articleSummarized": "From 7 Oct 2021, border measures for incoming travellers will be determined based on the travellers\u2019 recent travel history in the last 14 days, instead of 21 days. The Stay-Home Notice (SHN) for those who are currently serving 14 days will be reduced to 10 days, due to the shorter incubation period of the Delta variant. Adjustments have been made to the classification of countries/region and their corresponding border measures. Reviewing the length of the Stay-Home Notice duration from 14 to 10 days Since June 2021, the Multi-Ministry Taskforce on COVID-19 had required travellers with recent travel history to Category III and IV countries/regions to serve a 14-day SHN to account for the maximum COVID-19 incubation period. As the Delta variant has a shorter incubation period, the Taskforce will reduce the SHN period for travellers from 14 to 10 days. 1) From 7 October 2021, all travellers with travel history to Category III and IV countries/regions in the last 14 days immediately prior to arrival in Singapore (including being in Singapore prior to travel), will serve 10 days of SHN at dedicated SHN facilities \u2022 To undergo a COVID-19 PCR test on-arrival and on Day 10, and self-administered ART tests on Days 3 and 7 \u2022 SHN will be ended as long as they have a negative result for their PCR test on Day 10 2) Travellers who stayed in Category III countries/regions in the 14 days immediately prior to arrival in Singapore (including being in Singapore prior to travel) and are fully vaccinated: \u2022 May apply to serve their SHN at their place of residence (e.g. residential address) or at other suitable accommodation (e.g",
            "datePublished": "02 Oct 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/covid-19/girl_laptop_home.jpg",
            "minutesToRead": "2",
            "articleUrl": "www.gov.sg//article/faqs-on-quarantine-orders-and-home-quarantine-orders",
            "articleTitle": "FAQs on Quarantine Orders and Home Quarantine Orders",
            "articleDescription": "Your questions on Quarantine Orders and Home Quarantine Orders answered ",
            "articleID": "{3A7E6981-B6BB-4202-ABFB-44D8DD84A382}",
            "articleSummarized": "1. I\u2019ve been issued a Quarantine Order/Home Quarantine Order (QO /HQO) by MOH. Why am I being asked to quarantine? If you are suspected to be a carrier of the COVID-19 virus, especially having been in close contact with an infected person(s), you are being quarantined under the Infectious Diseases Act to prevent the potential spread of the virus to others. 2. I\u2019ve been informed of my QO via SMS. What should I do next? You should return home immediately and isolate in your room, preferably with attached bathroom. Keep room well ventilated by keeping the windows open. Make sure you do not have physical contact with household members. The QO Agent, Certis, will contact you to verify details and provide you with further information. If you have questions, you may also contact Certis at 6380 5072. 3",
            "datePublished": "29 Sep 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/covid-19/woman_art_home.jpg",
            "minutesToRead": "1",
            "articleUrl": "www.gov.sg//article/faqs-on-positive-antigen-rapid-tests",
            "articleTitle": "FAQs on Positive Antigen Rapid Tests",
            "articleDescription": "What you need to know if your Antigen Rapid Test result is positive ",
            "articleID": "{B4CD6117-D2EC-40B6-9A94-ED35CAE77337}",
            "articleSummarized": "1. What should I do if my Antigen Rapid Test (ART) is positive? If you have no symptoms, self-isolate in your room and monitor your health. Repeat the ART after 72 hours. If negative , resume normal activities. If positive , continue to self-isolate and repeat ART at least one day apart. Resume normal activities when you test negative. If you have symptoms of acute respiratory infection, for example, fever, cough, or flu, visit your nearest Swab and Send Home (SASH) clinic . 2",
            "datePublished": "28 Sep 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/mtfarticle_240921a.jpg",
            "minutesToRead": "2",
            "articleUrl": "www.gov.sg//article/regular-self-testing-for-all-and-expansion-of-the-booster-vaccination-strategy",
            "articleTitle": "Regular self-testing for all and expansion of the booster vaccination strategy",
            "articleDescription": "Increased weekend testing options and expansion of booster shots for those 50-59 years old ",
            "articleID": "{0264B913-0020-463D-B5F9-3F0E148B86C4}",
            "articleSummarized": "Encouraging regular self-testing for all Firms with employees that work onsite and are not already subject to mandatory RRT may apply for 8 ART kits per onsite employee for weekly testing of their staff over a two-month period. Applications are open until 13 October and firms with employees who are unable to work from home are strongly encouraged to apply for ART kits. More details may be found at go.gov.sg/time-limited-rrt-art . From 1 October 2021, the MOH website will publish a map of areas frequented recently by a larger number of confirmed COVID-19 cases. This can help guide individuals on your movement and activities",
            "datePublished": "24 Sep 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/mtfarticle_240921b.jpg",
            "minutesToRead": "2",
            "articleUrl": "www.gov.sg//article/stabilising-singapores-covid-19-situation-and-protecting-our-overall-healthcare-capacity",
            "articleTitle": "Stabilising Singapore's COVID-19 situation and protecting our overall healthcare capacity",
            "articleDescription": "Tightening safe management measures and appropriate care management for COVID-19 patients are key to stabilising the current situation ",
            "articleID": "{BDCEA5D3-B36C-48A3-A2C5-DEA75143CEC4}",
            "articleSummarized": "Community Treatment Facility will now be known as COVID-19 Treatment Facility. The recent exponential rise in COVID-19 cases from end of August 2021 has put a strain on Singapore\u2019s healthcare system. While the number of COVID-positive individuals who become severely ill \u2013 those requiring oxygen supplementation and intensive care unit (ICU) \u2013 remains within expectations, the number of individuals with mild symptoms has increased very rapidly. Singapore will thus be tightening our community safe management measures until the healthcare and response capacity have stabilised. Right-siting patients for appropriate care Here is a summary of the most appropriate care management protocol for different groups of individuals. Safe management measures for stabilisation phase If the infection continues at its current trajectory, Singapore can expect to reach a daily count of about 3,200 in the week of 27 Sep",
            "datePublished": "24 Sep 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/covid-19/faqhomerecovery_tamil.jpg",
            "minutesToRead": "1",
            "articleUrl": "www.gov.sg//article/faqs-on-home-recovery-tamil",
            "articleTitle": "\u0bb5\u0bc0\u0b9f\u0bcd\u0b9f\u0bbf\u0bb2\u0bcd \u0b95\u0bc1\u0ba3\u0bae\u0b9f\u0bc8\u0ba4\u0bb2\u0bcd \u0b95\u0bc1\u0bb1\u0bbf\u0ba4\u0bcd\u0ba4\u0bc1 \u0b85\u0b9f\u0bbf\u0b95\u0bcd\u0b95\u0b9f\u0bbf \u0b95\u0bc7\u0b9f\u0bcd\u0b95\u0baa\u0bcd\u0baa\u0b9f\u0bc1\u0bae\u0bcd \u0b95\u0bc7\u0bb3\u0bcd\u0bb5\u0bbf\u0b95\u0bb3\u0bcd",
            "articleDescription": "\u0bb5\u0bc0\u0b9f\u0bcd\u0b9f\u0bbf\u0bb2\u0bcd \u0b95\u0bc1\u0ba3\u0bae\u0b9f\u0bc8\u0ba4\u0bb2\u0bcd \u0b95\u0bc1\u0bb1\u0bbf\u0ba4\u0bcd\u0ba4 \u0b89\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0b95\u0bc7\u0bb3\u0bcd\u0bb5\u0bbf\u0b95\u0bb3\u0bc1\u0b95\u0bcd\u0b95\u0bbe\u0ba9 \u0baa\u0ba4\u0bbf\u0bb2\u0bcd\u0b95\u0bb3\u0bcd \u0b87\u0b99\u0bcd\u0b95\u0bc7",
            "articleID": "{08FE0CF8-0999-494F-99E6-FB20AD3DA58C}",
            "articleSummarized": "",
            "datePublished": "23 Sep 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/covid-19/faqhomerecovery_malay.jpg",
            "minutesToRead": "1",
            "articleUrl": "www.gov.sg//article/faqs-on-home-recovery-malay",
            "articleTitle": "Soalan Lazim tentang Pemulihan di Rumah",
            "articleDescription": "Soalan-soalan anda tentang Pemulihan di Rumah dijawab di sini",
            "articleID": "{E0F156FD-B64F-4507-BCA8-F9D8E0591A6B}",
            "articleSummarized": "",
            "datePublished": "23 Sep 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/covid-19/faqhomerecovery_chinese.jpg",
            "minutesToRead": "1",
            "articleUrl": "www.gov.sg//article/faqs-on-home-recovery-chinese",
            "articleTitle": "\u536b\u751f\u90e8\u56de\u7b54\u6709\u5173\u5c45\u5bb6\u5eb7\u590d\u8ba1\u5212\u7684\u5e38\u89c1\u95ee\u9898",
            "articleDescription": "\u5bf9\u5c45\u5bb6\u5eb7\u590d\u8ba1\u5212\u6709\u7591\u95ee\uff1f\u8ba9\u6211\u4eec\u4e3a\u60a8\u89e3\u7b54",
            "articleID": "{211AC63E-003C-429C-AF7F-48FC5E5728C0}",
            "articleSummarized": "",
            "datePublished": "23 Sep 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/faqhomerecovery_230921_b.jpg",
            "minutesToRead": "2",
            "articleUrl": "www.gov.sg//article/faqs-on-home-recovery",
            "articleTitle": "FAQs on Home Recovery",
            "articleDescription": "Your questions on Home Recovery answered here ",
            "articleID": "{F473F087-7284-49FD-BDE7-4BCDAF534D4C}",
            "articleSummarized": "Home Recovery is currently the default care management protocol for fully vaccinated individuals who are infected with COVID-19. We answer some of your questions on Home Recovery here. 1) Who is eligible for Home Recovery? Home recovery is the default for fully vaccinated persons, who are: Aged 12 \u2013 69 years old Have mild or no symptoms Have no severe illness or co-morbidities No household member over 80 years old or deemed vulnerable e.g. pregnant, weak immune response Able to self-isolate in a room, preferably with an attached bathroom 2) I'm PCR positive, but no one has contacted me. What do I do? Your Home Recovery buddy will be in touch and you will get an SMS. You will be issued a 10-day Isolation Order. Meanwhile, you should: Isolate in a room, preferably with attached toilet Wear a mask if you leave the room Call your designated Telemedicine Provider or HR buddy 6874 4939 for help. A home care pack will be sent to you if you do not have an oximeter at home. Your household members must register for a Quarantine Order at go.gov.sg/quarantinereg ",
            "datePublished": "23 Sep 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/gov_mw_2.png",
            "minutesToRead": "2",
            "articleUrl": "www.gov.sg//article/forming-friendships-that-transcend-time-nationality-and-ethnicity",
            "articleTitle": "Forming friendships that transcend time, nationality and ethnicity",
            "articleDescription": "Migrant workers in Singapore find opportunities, encouragement and friendship during their time in Singapore.",
            "articleID": "{FA2FEB29-E9C4-440D-A3F2-A5C2851A78E0}",
            "articleSummarized": "Finalists of a talent competition on \u2018Chill Pannu Maappi\u2019, an exclusive online series produced specifically for migrant workers here, shared that Singapore has been more than just a country of work for them \u2013 but a place to meet new friends and develop their aspirations. Second prize winner Vignesh Satish, third prize winner Saran, and consolation prize winner Prasath, who have since become friends through the competition, have made meaningful friendships and built strong bonds with fellow migrant workers, their employers and others in the community. 27-year old Satish, who works in construction is passionate about dance and had submitted a video of him performing the Karakattam \u2013 an Indian folk-dance. Satish, who lives in a rental flat with his boss\u2019 family and fellow colleagues, finds time to practise his craft on his days off from work. In his spare time, he also performs with local dance group Rameshwara Dancers, who had provided him with the costume he had used for his video submission. Sathish added that the support he has received, has been unimaginable",
            "datePublished": "20 Sep 2021"
        },
        {
            "imgUrl": "www.gov.sg/",
            "minutesToRead": "1",
            "articleUrl": "www.gov.sg//article/forming-friendships-that-transcend-time-nationality-and-ethnicity",
            "articleTitle": "Forming friendships that transcend time nationality and ethnicity",
            "articleDescription": "None",
            "articleID": "{87777C3E-4903-451A-A69D-3348CCA9BD7C}",
            "articleSummarized": "",
            "datePublished": "20 Sep 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/govsg--home-quarantine.jpg",
            "minutesToRead": "2",
            "articleUrl": "www.gov.sg//article/what-you-need-to-know-about-home-quarantine",
            "articleTitle": "What you need to know about Home Quarantine",
            "articleDescription": "What to take note of if you are exposed to COVID-19 and issued a Quarantine Order",
            "articleID": "{378552EF-8B34-4993-96BA-F0B2FBEAA81C}",
            "articleSummarized": "The Home Quarantine Protocol has been adjusted to manage resources as we lay the foundation for a more COVID-resilient Singapore. From 11 September 2021, the quarantine period has been reduced from 14 days to 10 days from the date of last exposure to a COVID-19 case. All Persons-under-Quarantine will be issued an electronic Quarantine Order via SMS. From 14 September 2021, newly confirmed less sensitive COVID-19 cases will be sent an SMS to notify them to inform their household contacts to register themselves via an online portal . I have been notified as a close contact of a COVID-19 case. What should I do next? Follow these steps: Go home immediately. Isolate yourself in your own room, preferably with attached bathroom. Make sure there is no physical contact with your household members. Register at go.gov.sg/quarantinereg as a close contact. Provide your contact number as well as the last date of exposure with your household member who is infected. You will receive an electronic Quarantine Order via SMS with your quarantine period indicated and instructions on how to book your Polymerase Chain Reaction (PCR) tests",
            "datePublished": "17 Sep 2021"
        },
        {
            "imgUrl": "www.gov.sg/",
            "minutesToRead": "1",
            "articleUrl": "www.gov.sg//article/test",
            "articleTitle": "What you need to know about Home Recovery",
            "articleDescription": "None",
            "articleID": "{801FFC0D-0966-4B7F-ACC1-AD7E7E8E1DBE}",
            "articleSummarized": "",
            "datePublished": "17 Sep 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/gov_hra_hrw.jpg",
            "minutesToRead": "1",
            "articleUrl": "www.gov.sg//article/health-risk-warning-and-health-risk-alert",
            "articleTitle": "Health Risk Warning and Health Risk Alert",
            "articleDescription": "What to do if you receive a Health Risk Warning/Alert ",
            "articleID": "{0296B1A1-59AB-4CEE-B2E8-2B75B95C80A4}",
            "articleSummarized": "For persons identified as close contacts of a confirmed COVID-19 case via TraceTogether data, you may receive a Health Risk Warning (HRW) or a Health Risk Alert (HRA) based on your degree of risk exposure. To facilitate testing, the Ministry of Health (MOH) is deploying vending machines islandwide to distribute Antigen Rapid Test (ART) kits to those who receive a HRW or HRA SMS notification",
            "datePublished": "17 Sep 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/gov_hra.jpg",
            "minutesToRead": "2",
            "articleUrl": "www.gov.sg//article/what-you-need-to-know-about-home-recovery",
            "articleTitle": "What you need to know about Home Recovery",
            "articleDescription": "Home Recovery will be the default care management model for those fully vaccinated who are infected ",
            "articleID": "{B1255BD9-36DA-41CA-B661-2C742C9ED061}",
            "articleSummarized": "Home Recovery will be the default care management protocol for fully vaccinated individuals who are infected. It is part of Singapore\u2019s transition to a COVID-resilient nation. Are you eligible for Home Recovery? From 18 September 2021, those who test positive for COVID-19 and meet the following criteria are eligible: a. Fully vaccinated; b. Aged 12 to 69 years old; c. Have no or mild symptoms; d. Have no severe co-morbidities (diseases) or illnesses; and e. Have no household members who are more than 80 years old or are in one of the vulnerable groups (e.g. those who are pregnant, with a weakened immune response or with multiple co-morbidities). You will need to have a room, preferably with an attached bathroom. What if my home setting does not allow me to recover at home? If your home setting is assessed to be unsuitable for Home Recovery, MOH will make the arrangements for you to recover at a COVID-19 Treatment Facility or at a hospital",
            "datePublished": "17 Sep 2021"
        },
        {
            "imgUrl": "www.gov.sg/",
            "minutesToRead": "1",
            "articleUrl": "www.gov.sg//article/story-article",
            "articleTitle": "Story article",
            "articleDescription": "None",
            "articleID": "{E64FA2A7-42D3-4A4F-9453-E2935E6DB3C1}",
            "articleSummarized": "",
            "datePublished": "17 Sep 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/100921_mtf.jpg",
            "minutesToRead": "2",
            "articleUrl": "www.gov.sg//article/updates-to-healthcare-protocols-and-implementation-of-vaccine-booster-strategy",
            "articleTitle": "Updates to healthcare protocols and implementation of vaccine booster strategy",
            "articleDescription": "None",
            "articleID": "{0052975F-70E2-4C5E-8A10-67416DEBB505}",
            "articleSummarized": "In response to the current infection wave that began on 23 August 2021, the Multi-Ministry Taskforce (MTF) had earlier announced some measures to slow the spread of new cases . There will be further adjustments to healthcare and quarantine protocols to help us cope with the current level of infections. Updates to healthcare protocols The Ministry of Health (MOH) started the Home Recovery Pilot on 30 August 2021 for fully vaccinated individuals infected with COVID-19 to recover from home. Given the encouraging pilot results, MOH will expand home recovery as the default care management protocol for more fully vaccinated individuals from 15 September 2021. The scheme will be extended progressively to individuals up to 50 years-old who have no significant co-morbidities or underlying illnesses \u2022 Should be generally well with no or mild symptoms and are able to self-care at home \u2022 Once notified of their COVID-19 positive results, these individuals should immediately self-isolate at home MOH will also allow and encourage parents to bring their infected children home, if they are at least 5-years old do not have co-morbidities or underlying illnesses",
            "datePublished": "10 Sep 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/gov_doc.png",
            "minutesToRead": "2",
            "articleUrl": "www.gov.sg//article/slowing-down-covid-19-community-transmission",
            "articleTitle": "Slowing Down COVID-19 Community Transmission",
            "articleDescription": "More pervasive testing and additional workplace measures will be taken to reduce infections",
            "articleID": "{15F406B5-89C1-420D-ACB7-94F7E5C14A36}",
            "articleSummarized": "The number of new infection cases in the community has almost doubled to more than 1,200 cases in the week ending 5 September 2021, up from around 600 cases in the week before. Should the COVID-19 infections continue at this trajectory, cases will double every week and put a strain on hospital capacity. To slow down community transmission, more pervasive testing as well as additional measures to detect cases quickly and reduce infections in workplaces will be introduced. This will buy us time to get more people, such as our seniors, to get vaccinated as soon as possible, and also to roll out our booster programme to those aged 60 and above. Updates to Public Health Actions Once a cluster is identified, the Ministry of Health will issue an SMS \u201c Health Risk Warning \u201d (HRW) or Health Risk Alert \u201d (HRA) to individuals to cast a net around the cases, in addition to the quarantine of close contacts. The HRW and HRA are not quarantine orders but individuals who receive the HRW are required by law to get PCR tests and to self-isolate. For both HRW and HRA, individuals should reduce their social interactions for 14 days",
            "datePublished": "06 Sep 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/gov_art.jpg",
            "minutesToRead": "3",
            "articleUrl": "www.gov.sg//article/expanding-testing-and-surveillance-and-introducing-a-national-vaccine-booster-programme",
            "articleTitle": "Expanding testing and surveillance; introducing a national vaccine booster programme  ",
            "articleDescription": "The expansion of regular testing and the implementation of a vaccine booster programme will help Singapore attain COVID resilience ",
            "articleID": "{FF5B2A45-93F0-4A48-8A19-AF60CA15B123}",
            "articleSummarized": "As Singapore takes the next steps towards achieving COVID resilience, the Multi-Ministry Taskforce (MTF) has announced more extensive testing and contact tracing measures; as well as the introduction of the next phase of the National Vaccination Programme with the commencement of a booster programme in September 2021. Expansion of testing and surveillance measures Frequent testing helps in the early identification of cases and can prevent spikes in cases that could strain our healthcare system. For individuals : All are encouraged to exercise social responsibility and self-test regularly using Antigen Rapid Test (ART) kits. This includes those who are fully-vaccinated and especially for those who are taking part in large-scale events. ART kits are being issued to every Singaporean household between 28 August to 27 September 2021. Six approved ART self-test kits are also widely available at major retailers and e-commerce platforms. 1 For employers : Encouraged to make regular testing a new norm at workplaces as a key element of business continuity plans",
            "datePublished": "03 Sep 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/intersection.jpg",
            "minutesToRead": "1",
            "articleUrl": "www.gov.sg//article/ndr-2021",
            "articleTitle": "National Day Rally 2021",
            "articleDescription": "One Singapore \u2013 Our Home, Our Shared Future ",
            "articleID": "{2726F4F7-77FB-4A6F-9853-B486611961DB}",
            "articleSummarized": "At the National Day Rally 2021, Prime Minister Lee Hsien Loong outlined efforts for inclusive growth that will benefit all Singaporeans",
            "datePublished": "28 Aug 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/gov_mw_banner.png",
            "minutesToRead": "2",
            "articleUrl": "www.gov.sg//article/persevering-to-achieve-ones-goals",
            "articleTitle": "Persevering to achieve one's goals",
            "articleDescription": "Two migrant workers\u2019 journeys to achieving their dreams",
            "articleID": "{28B14E27-442B-4876-9141-E7737A57E85F}",
            "articleSummarized": "When Kumaravel was a young boy, he dreamt of becoming a chef. Now, through a talent competition on \u2018Chill Pannu Maappi\u2019, an exclusive online series produced specifically for migrant workers here, Kumaravel has gotten one step closer to realising this dream. He has won a consolation prize on the show after exhibiting his talents by cooking a tantalizing fish dish. He started his cooking journey at a young age by helping his mother in the kitchen at home in the village of Karisakkaadu. He enjoyed watching her mix the spices to the perfect concoction bringing out the best taste in food. Apart from creating delectable dishes, his mother inculcated values of self-sufficiency, responsibility and patience when she cooked with him. She was overjoyed when Kumaravel informed her that his cooking skills had won him a consolation prize in a competition here",
            "datePublished": "23 Aug 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/changi-airport-tower.jpg",
            "minutesToRead": "3",
            "articleUrl": "www.gov.sg//article/updates-to-vaccination-differentiated-border-measures",
            "articleTitle": "Vaccination-differentiated border measures (updated as of 17 Sep) ",
            "articleDescription": "Border measures to facilitate safe travel ",
            "articleID": "{4A57FD7D-C083-4E9B-B612-1B5C8E00ABAD}",
            "articleSummarized": "Vaccination-differentiated border measures will be introduced for travellers from counties/regions that have controlled the pandemic well and vaccinated large parts of their population. Countries/ regions will be classified into 4 categories with differentiated border measures, based on a traveller\u2019s 21-day travel history prior to their entry into Singapore. If the traveller visits or transits through countries/ regions in different categories, the strictest set of requirements among those countries/ regions will apply. Categories for countries/regions The latest classifications and associated testing requirements for each of the 4 categories, can be found on the SafeTravel website. These changes will be effective from 23 September 2021. Category 1 Travellers from countries/regions in this category can enter Singapore without having to serve a Stay-Home Notice (SHN). They will have to undergo an On-Arrival COVID-19 Polymerase Chain Reaction (PCR) test, If the test is negative, they will be allowed to go about their activities. Hong Kong Macao Mainland China Taiwan Category 2 Travellers will be required to undergo a 7-day SHN, which can be served at their accommodation of choice. They may serve their SHN at their place of residence, if conditions are suitable",
            "datePublished": "19 Aug 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/mtf-article-190821.png",
            "minutesToRead": "7",
            "articleUrl": "www.gov.sg//article/updates-to-singapores-covid-19-measures-from-19-august-2021",
            "articleTitle": "Updates to Singapore's COVID-19 measures from 19 August 2021",
            "articleDescription": "Easing of community measures and piloting home isolation as a care model for fully-vaccinated patients without severe symptoms ",
            "articleID": "{CEFF9E52-EA03-4B12-8C32-5CE537AF2686}",
            "articleSummarized": "Given the current stable COVID-19 situation, Singapore will continue as planned with the second step in the easing of community measures starting from 19 August 2021. The involves mainly increasing the size of masked-on events and religious services, and will not have significant risk impact. Please refer to Table 1 below for full details. Piloting Home Isolation as a Care Model for Fully Vaccinated COVID-19 Patients without Severe Symptoms Singapore\u2019s high vaccination rates also enable us to review our treatment and care model for COVID-19 patients. From 30 August 2021, the Ministry of Health (MOH) will be piloting the Home Isolation model for medically stable COVID-19 patients that require minimal supportive care. Patients and their household members must both be fully vaccinated and must not belong to any vulnerable groups, such as the elderly or immunocompromised. These patients will spend the first few days in a medical facility, before moving to home isolation. By then, the viral loads of vaccinated patients would have dropped",
            "datePublished": "19 Aug 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/covid_fake-death.jpg",
            "minutesToRead": "1",
            "articleUrl": "www.gov.sg//article/factually150821",
            "articleTitle": "Corrections and Clarifications Regarding Falsehoods on alleged death of three-year-old girl from COVID-19",
            "articleDescription": "Fabrication that a three year-old has passed away from COVID-19 in KKH",
            "articleID": "{BE4C6C54-64BE-43D1-873C-5F9D91FF4556}",
            "articleSummarized": "There was a false statement contained in a Facebook post by a user, Eileen Loh, on 14 Aug 2021, about a three-year-old preschooler who had allegedly passed away from COVID-19 at KK Women\u2019s and Children\u2019s Hospital (KKH), and that the death was deliberately not reported. Here are the facts",
            "datePublished": "15 Aug 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/sustainability-as-a-business-bp.jpg",
            "minutesToRead": "4",
            "articleUrl": "www.gov.sg//article/sustainability-as-a-business",
            "articleTitle": "Sustainability as a business",
            "articleDescription": "The green transformation of local companies Sembcorp and Keppel",
            "articleID": "{BF45892D-0B60-4E79-B089-EFC085183C3C}",
            "articleSummarized": "At Sembcorp Industries, all meetings start with a Sustainability Moment. \"During these moments, we share case studies of sustainable ideas and practices we can adopt in our day to day operations and personal life\u201d, says Gwendolyn Loh, Vice President, Group Strategic Communications and Sustainability. Gwendolyn (extreme left) with Sembcorp volunteers preparing the Sembcorp Cool House for its official opening. Picture taken on 18 March 2021. Picture credit: Sembcorp Industries. To further encourage employees to break new ground on green solutions, Sembcorp has started running a Sustainability Moment contest. From large-scale ideas like the recycling of wind turbine blades to more day-to-day suggestions on replacing bottled water dispensers with piped water systems, the goal is for everyone to start thinking of how to incorporate green practices into their daily work. Keppel Corporation also spreads greater awareness of sustainability issues through organising regular talks for staff and engaging the wider community. In November last year, Keppel partnered with the Sustainable Singapore Gallery to launch the \u201cR.I.S.E to the Challenge\u201d roving exhibition to raise awareness about the impact of rising sea levels and the urgent need for action. The programme is expected to reach over 200,000 people in Singapore. Ms Grace Fu, Minister for Sustainability and the Environment (centre), accompanied by Mr Loh Chin Hua, Chief Executive Officer of Keppel Corporation (first from right) and senior management of Keppel Land at the launch of \u2018R.I.S.E. to the Challenge.\u2019 Picture credit: Keppel Corporation. From trash to treasure At Sembcorp, maintaining a circular economy , where resources are used efficiently to minimise wastage, is key to their business. Ho Kee Hoe in front of Sembcorp\u2019s Energy-from-Waste plant",
            "datePublished": "11 Aug 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/covid-19/vaccinevial.jpg",
            "minutesToRead": "1",
            "articleUrl": "www.gov.sg//article/vaccinate-or-regular-test-regime-for-selected-sectors",
            "articleTitle": "\u201cVaccinate or Regular Test\u201d Regime for selected sectors",
            "articleDescription": "Vaccination and regular testing will help to keep the community safe as Singapore moves towards COVID resilience",
            "articleID": "{AF35AB86-C53B-4EC7-BC46-088CD31A3DEC}",
            "articleSummarized": "The Multi-Ministry Taskforce (MTF) has announced that COVID-19 vaccination will be required for workers in selected sectors. Unvaccinated persons will be required to undergo regular testing to detect infection early so as to prevent further transmission within the community. The \u201cvaccinate or regular test\u201d regime will be implemented from 1 October 2021 across the following sectors: Individuals working in the healthcare sector, eldercare sector and settings with children 12 years and below",
            "datePublished": "06 Aug 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/6-aug-mtf-smm-article-banner.jpg",
            "minutesToRead": "9",
            "articleUrl": "www.gov.sg//article/updates-to-p2ha-from-10-august-2021",
            "articleTitle": "Updates to Phase 2 (Heightened Alert) from 10 August 2021",
            "articleDescription": "P2HA measures will be lifted in a calibrated manner as part of Singapore\u2019s transition towards COVID resilience",
            "articleID": "{7C25246E-AD00-4A5F-9C94-B1CC8C06F8F5}",
            "articleSummarized": "The Multi-Ministry Taskforce (MTF) has announced updated measures as part of Phase 2 (Heightened Alert), which will take effect from 10 August 2021. These measures will supersede the measures that were introduced on 22 July 2021. Increase of social gathering group sizes from a maximum of 2 persons to 5 persons , and the cap of 2 distinct visitors per household per day to 5 distinct visitors per household per day . Unvaccinated individuals should remain in groups of no more than 2 persons, to reduce the likelihood of transmission. Dine-in at hawker centres and coffee shops will be allowed in groups of 2, for both vaccinated and unvaccinated persons. Groups of up to 5 persons will be allowed for all F&B establishments if all diners are vaccinated , a recovered patient, or possess a valid negative COVID-19 test result covering the duration of dine-in. Unvaccinated children aged 12 and below may be included in the group of 5, if all children are from the same household. Fully vaccinated individuals, recovered patients, and/or those who possess a valid negative COVID-19 test result may participate in higher-risk activities (e.g. indoor mask-off sports, F&B dine-in) and large events (e.g. solemnisations, congregational and other worship services) in groups of up to 5 persons. Increase of event sizes and event size caps (see table below) . Similarly, unvaccinated children may be included in a group of up to 5 persons if all the children are from the same household",
            "datePublished": "06 Aug 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/mtf-20-jul-pic.jpg",
            "minutesToRead": "7",
            "articleUrl": "www.gov.sg//article/as-of-20-july-2021-return-to-phase-2-heightened-alert-measures",
            "articleTitle": "(As of 20 July 2021) Return to Phase 2 (Heightened Alert) Measures",
            "articleDescription": "From 22 July 2021 to 18 August 2021 (both dates inclusive), social gathering group sizes will be reduced to a maximum of 2 persons and dining-in at all F&B establishments will cease.",
            "articleID": "{9EC46DA9-837F-429C-A0A5-167D3EB372F6}",
            "articleSummarized": "The Multi-Ministry Taskforce (MTF) has announced the reversion to Phase 2 (Heightened Alert) measures which will take effect from 22 July to 18 August (both dates inclusive). This is done to contain the growing COVID-19 clusters linked to the Jurong Fishery Port, as we push ahead with the vaccination of individuals. These measures will supersede those that were introduced on 19 July 2021. Reduction of social gathering group sizes from a maximum of 5 persons to a maximum of 2 persons, with a cap of 2 distinct visitors per household per day. Grandchildren being cared for daily by their grandparents will be not be counted towards this cap. Work-from-home to remain the default at workplaces. Employers who need staff to return to workplaces need to ensure no cross-deployment at various worksites, and enforce staggered start times and flexible working hours. Social gatherings at workplaces will not be allowed. Cessation of dine-in at all F&B establishments (including hawker centres and food courts), with only takeaway and delivery options allowed. All staff at such establishments must continue with regular 14-day Fast and Easy Test (FET) requirement, which will remain free-of-charge during this period",
            "datePublished": "20 Jul 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/karaoke.jpg",
            "minutesToRead": "2",
            "articleUrl": "www.gov.sg//article/breaking-the-chains-of-transmission-of-the-ktv-cluster",
            "articleTitle": "Breaking the chains of transmission of the KTV cluster",
            "articleDescription": "Two-week suspension for all nightlife establishments that pivoted into F&B establishments",
            "articleID": "{6EEDCF8B-A07C-4F56-8335-4B203AE4FFAD}",
            "articleSummarized": "Suspension of All Pivoted Nightlife Establishments MOH will implement a 2-week suspension of operations from 16 July 2021 through 30 July 2021 for all nightlife establishments that had pivoted into F&B establishments. During this period, MOH will test the staff of these 400-odd establishments, inspect their SMM protocols, ensure proper implementation, before they are allowed to resume F&B operations. Aggressive Ringfencing Around Cases To mitigate the risk of wider, undetected community transmission, MOH will aggressively ringfence cases emerging around the KTV cluster through the use of SafeEntry (SE) data: Individuals identified to have visited hotspots at the same time as a confirmed COVID-19 case will receive an SMS \u201cHealth Risk Warning\u201d. They will be required under the law to get tested at a designated testing centre , and self-isolate until they receive a negative test from their first polymerase chain reaction (PCR) test. As such individuals who test negative could still be incubating the virus, they should still limit their interactions with others as an added precaution for 14 days from their last exposure and only undertake essential activities during this period. These individuals will also be issued with self-test Antigen Rapid Test (ART) kits when they come forward to do their first PCR test. They will be required to self-administer an ART test on the 7 th day from the last exposure to confirm that they are not infected",
            "datePublished": "16 Jul 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/singapore_skyline_sunset.jpg",
            "minutesToRead": "8",
            "articleUrl": "www.gov.sg//article/updates-to-phase-3-heightened-alert-measures",
            "articleTitle": "Updates to Phase 3 (Heightened Alert) Measures",
            "articleDescription": "From 19 July through 8 August 2021 (both dates inclusive), up to 2 persons per group for F&B dining-in and indoor high-intensity mask-off sports and exercise activities",
            "articleID": "{8195DCAB-CC35-4923-B844-2E62B65D26D3}",
            "articleSummarized": "The Multi-Ministry Taskforce (MTF) has announced updated measures as part of Phase 3 (Heightened Alert) which will take effect from 19 July 2021 through 8 August 2021 (both dates inclusive). Maximum group size allowed to dine-in at F&B establishments will be dialled back to groups of up to 2 persons. Fully-vaccinated individuals can continue to dine-in in groups of up to 5 persons at participating F&B establishments that have put in place systems to check their statuses. Wedding receptions will continue at the current group size of up to 5 persons per table, with no change to the existing Pre-Event Testing (PET) requirement. Group size for indoor high-intensity mask-off sports and exercise activities will be reduced to no more than 2 persons, or in groups of 5 persons if all in the class are fully vaccinated, or a recovered patient, or have a valid COVID-19 test result covering the duration of the class. Work-from-home remains default, social gatherings at workplaces will be disallowed. Please refer to this table for full details: Current Measures for Phase 3 (Heightened Alert) from 12 July onwards, or as indicated Phase 3 (Heightened Alert) from 19 July onwards refers to measures that have been updated since the 7 July announcement Community Measures Social gatherings and interactions \u00b7 Group sizes of up to 5 persons \u00b7 Up to 5 unique household visitors a day \u00b7 2 social gatherings per day, whether to another household or in a public place \u00b7 The cap on visitors does not apply for grandchildren being cared for by grandparents. Workplace Work-from-home as the default No cross-deployment Social gatherings will be allowed up to the prevailing group size Work-from-home as the default No cross-deployment Social gatherings not allowed Event Parameters Funerals Up to 20 persons at any point in time on all days Live performances \u00b7 Up to 250 persons with PET; up to 50 persons without PET \u00b7 Unmasking and singing/ playing of instruments that require expulsion of air for live performances may resume, subject to updated safe management measures MICE events \u00b7 Up to 250 persons with PET; up to 50 persons without PET \u00b7 Unmasking and singing/ playing of instruments that require expulsion of air for live performances may resume, subject to updated safe management measures Spectator and participatory sports events \u00b7 Up to 250 persons with PET, up to 50 persons without PET Solemnisations and weddings Marriage solemnisations: \u00b7 Up to 250 persons with PET required for all attendees \u00b7 Up to 50 persons without PET \u00b7 Couple allowed to unmask for key moments; and attendees allowed to unmask momentarily for photo-taking Wedding receptions \u00b7 Up to 250 persons with PET required for all attendees \u00b7 Up to 50 persons with PET required for wedding party of up to 20 persons \u00b7 Only one reception allowed \u00b7 Group size of up to 5 persons Marriage solemnisations Wedding receptions Sector Measures Attractions, cruises Operating capacity of 50% Barbeque pits and campsites (in parks, HDB estates, condominiums, and country clubs) Closed Cinemas \u00b7 Up to 250 persons with PET, up to 50 persons without PET \u00b7 F&B service maybe served \u00b7 Up to 250 persons with PET, up to 50 persons without PET \u00b7 F&B may be served if all customers are in groups of no more than 2 persons if any individual in the group is ineligible*; in groups of no more than 5 persons if all individuals are eligible*. Children aged 12 years and below may make up half the group if from different households, and up to 4 children if all are from the same household \u00b7 If F&B service is not allowed, customers may be in groups of up to 5 persons Congregational and worship services \u00b7 Up to 250 pax with PET; up to 50 pax without PET \u00b7 Unmasking and singing/ playing of instruments that require expulsion of air for live performances may resume, subject to updated safe management measures Food & Beverage establishments \u00b7 Dine-in allowed with group sizes of up to 5 persons \u00b7 Prohibition of recorded music and sounds in F&B establishments \u00b7 If any individual in the group is ineligible*, dine-in allowed with group sizes of up to 2 persons ; If all individuals are eligible*, dine-in allowed with group sizes of up to 5 persons ",
            "datePublished": "16 Jul 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/financial-services-bp.jpg",
            "minutesToRead": "6",
            "articleUrl": "www.gov.sg//article/where-tech-and-finance-meet",
            "articleTitle": "Where tech and finance meet",
            "articleDescription": "Find out more about jobs that combine technological and financial expertise",
            "articleID": "{FA385FDD-01DB-494C-B2A4-25E86FCDE811}",
            "articleSummarized": "Chatbot Coach, UX/UI Designer Robotics Process Designer, Cloud Specialist, Machine Learning Architect. These may sound like Information Technology (IT) jobs, but they are actually roles that exist in the financial services sector. In the past few years, financial institutions have digital upskilling a key priority. Just ask the Talent Acquisition Head at DBS Bank, Ms Susan Cheong. \u201cWith COVID-19 accelerating digital disruption and changing the way we live, we are ramping up our upskilling efforts to stay ahead of these massive changes,\u201d she says. From this year, DBS has identified over 7,200 employees to be upskilled or reskilled, in emerging areas such as design thinking, artificial intelligence and machine learning. Head of Group Human Resources at UOB, Mr Dean Tong, says that technology is core to the Bank\u2019s innovation and transformation drive. \u201cBy deepening digital knowledge and skills, we ensure that our workforce is ever ready to harness the future of technology,\u201d he says. This push towards digitalisation has opened up opportunities in financial services for many Singaporeans, such as 33-year-old Muhammad Helmy Bin Razali. Having previously been in the security sector for 10 years, he made the switch to the Financial Services sector, and is currently a Cyber Threat Monitoring Specialist at Deutsche Bank. \u201cSpeaking to computers\u201d To pursue his goal of having a career in tech, Helmy decided to move into cybersecurity through the Technology in Finance Immersion Programme (TFIP) in October 2019. Covering cybersecurity as well as banking and finance during the four-month course proved to be a challenging experience \u2013 in more ways than one. \u201cThere were frequent tests during the course. Having to take in all that knowledge and present my understanding on the topics was quite a hurdle,\u201d Helmy recalls. Fortunately, he wasn\u2019t alone. \u201cFellow trainees in TFIP were an awesome bunch, and we pulled through the course together.\u201d Upon completing the course, Helmy began his on-the-job training at Deutsche Bank. Helmy was first tasked with developing his \u201ccyber instincts.\u201d I was given the opportunity to see frontline cybersecurity action, make sense of events to determine if they are risks",
            "datePublished": "22 Jun 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/gov_ema/14.jpg",
            "minutesToRead": "1",
            "articleUrl": "www.gov.sg//article/false-and-misleading-websites-that-claim-that-singaporeans-are-overpaying-for-electricity",
            "articleTitle": "False and misleading websites that claim that Singaporeans are overpaying for electricity",
            "articleDescription": "Watch out for scam websites that claim to sell \u201cpower-saving\u201d devices",
            "articleID": "{D834031E-9F81-484D-8824-88B5C35470DB}",
            "articleSummarized": "There have been false statements circulating online alleging that the Government has been passive in allowing electricity companies to overcharge Singaporeans for electricity through deceptive schemes. One such website \u2013 known as Voltex \u2013 claims that Singaporeans are overpaying for electricity by $27.6 billion dollars a year, and that \u201clawmakers\u201d and the \u201cPublic Utility Commission\u201d are not preventing electricity companies from running a \u201ccrooked business\u201d of selling overpriced electricity to consumers. These claims are false. Fact #1: There is no \u201cPublic Utility Commission\u201d in Singapore. The Singapore electricity market is regulated by the Energy Market Authority (EMA ), consisting of the wholesale electricity market and the retail electricity market ",
            "datePublished": "20 Jun 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/factually---mrna-vs-inactivated.jpg",
            "minutesToRead": "3",
            "articleUrl": "www.gov.sg//article/watch-out-for-misinformation-about-mrna-and-inactivated-virus-covid-19-vaccines",
            "articleTitle": "Watch out for misinformation about mRNA and inactivated virus COVID-19 vaccines",
            "articleDescription": "The mRNA vaccines approved by HSA are safe and highly effective against COVID-19, including Variants of Concern",
            "articleID": "{2CB917C2-4688-44F7-902D-7BC89124A4BC}",
            "articleSummarized": "Misleading social media messages have been claiming that the mRNA COVID-19 vaccines \u2013 authorised by the Health Sciences Authority (HSA) under the Pandemic Special Access Route (PSAR) \u2013 are unsafe and ineffective in protecting against COVID-19, including Variants of Concern (VOCs) such as the B16172 or \u201cdelta\u201d variant. These messages also asserted that inactivated virus COVID-19 vaccines, like Sinovac, would provide superior protection, and should be offered to children instead. Let us examine the claims. Claim #1: mRNA vaccines are ineffective against COVID-19 Both the Pfizer-BioNTech and Moderna mRNA vaccines continue to be highly efficacious, with efficacy rate at around 90%. This has been established by the Expert Committee on COVID-19 Vaccination (EC19V) based on their continual review of global and local data. These two vaccines are also especially effective in protecting against severe COVID-19 disease and hospitalisation. Claim #2: mRNA vaccines are useless in protecting us against COVID-19 mutations The mRNA vaccines are effective in protecting us against key VOCs, including the B16172 or \u201cdelta\u201d variant. Studies in the UK demonstrated that two doses of the Pfizer-BioNTech mRNA vaccine can provide around 80% protection against symptomatic COVID-19 infection with the delta variant. While further studies are required before drawing definitive conclusions, the available data globally indicates that substantial protection is preserved",
            "datePublished": "17 Jun 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/factually---15-jun.jpg",
            "minutesToRead": "1",
            "articleUrl": "www.gov.sg//article/false-message-circulating-on-changes-to-treatment-protocols",
            "articleTitle": "False message circulating on changes to treatment protocols following an alleged COVID-19 patient autopsy",
            "articleDescription": "The message also claimed that COVID-19 is a bacterium and not a virus",
            "articleID": "{E7B2F888-8AD9-439D-9B88-67E7F5E17C22}",
            "articleSummarized": "A false message attributed to the Ministry of Health, Singapore has been circulating on messaging platforms. It claimed that following an autopsy on a COVID-19 patient, Singapore discovered that COVID-19 does not exist as a virus, but instead as a \u201cbacterium that has been exposed to radiation and causes human death by coagulation in the blood\u201d. The message also falsely claimed that the authorities had changed the treatment protocols for COVID-19, and instead gave aspirins to patients who tested positive for COVID-19. The allegations are all false and the message did not originate from the Ministry of Health, Singapore. Earlier versions of this message, citing countries such as Italy and Russia instead of Singapore, have been exposed as untrue ",
            "datePublished": "15 Jun 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/microsite/vaccine/mci-vaccine_main-desktop-masthead_final.png",
            "minutesToRead": "1",
            "articleUrl": "www.gov.sg//article/covid-19-vaccination-faqs",
            "articleTitle": "COVID-19 Vaccination FAQs",
            "articleDescription": "None",
            "articleID": "{FE746E4F-16B4-4957-BECE-EEFDBAA27B53}",
            "articleSummarized": "Your COVID-19 vaccine questions answered Addressing common questions you have about the vaccines. Are COVID-19 vaccines effective? Why is vaccination still important in fighting the virus",
            "datePublished": "11 Jun 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/microsite/vaccine/mci-vaccine_main-desktop-masthead_final.png",
            "minutesToRead": "1",
            "articleUrl": "www.gov.sg//article/covid-19-vaccination-infographics",
            "articleTitle": "COVID-19 Vaccination Infographics",
            "articleDescription": "None",
            "articleID": "{51E9FBBF-6B99-4801-8CBB-6FFEF9C86668}",
            "articleSummarized": "Vaccines provide strong defence against COVID-19 View profiles: Profile 1 Profile 2 Profile 3 Profile 4 Vaccination protects you from COVID-19 Poster available in the following languages: English \u4e2d\u6587 Melayu \u0ba4\u0bae\u0bbf\u0bb4\u0bcd Medical Eligibility Poster available in the following languages: English \u4e2d\u6587 Melayu \u0ba4\u0bae\u0bbf\u0bb4\u0bcd How the COVID-19 mRNA vaccine works Poster available in the following languages: English \u4e2d\u6587 Melayu \u0ba4\u0bae\u0bbf\u0bb4\u0bcd COVID-19 vaccines are safe Poster available in the following languages: English \u4e2d\u6587 Melayu \u0ba4\u0bae\u0bbf\u0bb4\u0bcd Vaccination Brochure Brochure available in the following languages: English \u4e2d\u6587 Melayu \u0ba4\u0bae\u0bbf\u0bb4\u0bcd COVID-19 Vaccination Comics Comics available in the following languages: English \u4e2d\u6587 Melayu \u0ba4\u0bae\u0bbf\u0bb4\u0bcd Back to COVID-19 Vaccinatio",
            "datePublished": "11 Jun 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/microsite/vaccine/mci-vaccine_main-desktop-masthead_final.png",
            "minutesToRead": "8",
            "articleUrl": "www.gov.sg//article/a-covid-19-vaccination-photo-stories",
            "articleTitle": "COVID-19 Vaccination Photo Stories",
            "articleDescription": "Our frontliners, together with these Singaporeans who have medical conditions, stepped forward to get their shots when they were offered. Find out more.",
            "articleID": "{347501F1-CA16-4F74-80AA-65EAAF63476D}",
            "articleSummarized": "Mdm Chue Khuan Hou, 65 Grandma who has taken both doses of her COVID-19 vaccine despite suffering from a heart condition and high cholesterol \u201cI\u2019ve had high cholesterol for about 10 years. I also went for an angioplasty (ballooning) before \u2013 for blocked arteries. Because of my heart condition, before I went for the vaccination, I checked with the doctor at the polyclinic to ask if it was suitable for me. He assured me that it is suitable, and encouraged me to go for it. With that, I asked my daughter to help me to register for the vaccination. I did my injections at the Community Club. The wait took about 5 to 10 minutes, and then after taking the jab, I waited half an hour to make sure everything was ok. I didn\u2019t have noticeable side effects after the jabs. Vaccination is important because I want to continue to be active. Every morning, I do a little exercise, then I go to the market to get food and groceries. I also want to be healthy enough to look after my 11-month-old grandson. Because of my medical conditions, I think it\u2019s even more important that I take the COVID-19 vaccination. I want to protect myself.\u201d \u2013 Mdm Chue Khuan Hou, 65, a grandma who has taken both doses of her COVID-19 vaccine despite suffering from a heart condition and high cholesterol Abdul Lathiff Mohamed Rafi, 48 Senior Bus Captain at SBS Transit and Ulu Pandan Bus Depot Union Leader \u201cI really miss interacting freely with passengers and my fellow colleagues. Life has not been the same since. There were many days where I have felt discouraged. The COVID-19 pandemic has affected the transport industry tremendously. During Circuit Breaker, our ridership went down quite a bit. We also had to intensify various safety precautions for our passengers, such as disinfecting high-touch points and sanitising our buses twice a day. That\u2019s why I was happy to hear about the COVID-19 vaccines. I believe that the vaccine will protect myself, my loved ones and my passengers. I was one of the first Bus Captains to sign up for the vaccination. I chose to go for the first available slot to instill confidence and encourage my fellow colleagues and union members to do the same. As a frontliner, it is also my duty to protect myself so I can protect the passengers I meet daily. All of us have a role to play in the fight against COVID-19. Even though there is a small chance that a vaccinated person can still get infected, the risk of them falling very sick is greatly reduced! We should all take the vaccination to protect ourselves and those around us!\u201d \u2013 Abdul Lathiff Mohamed Rafi, 48, Senior Bus Captain at SBS Transit and Ulu Pandan Bus Depot Union Leader Teo Khee Huat, 78 Colorectal and skin cancer survivor, Chairperson of the Singapore Cancer Society SemiColon Support Group \u201cI started experiencing health issues in 2008 when I found occasional blood clots in the stools. I went to the polyclinic, thinking it was piles. But they ended up finding a 2.5cm tumour in my colon, that I soon learnt was cancerous",
            "datePublished": "11 Jun 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/covidvaccines.jpg",
            "minutesToRead": "3",
            "articleUrl": "www.gov.sg//article/covid-19-vaccination-extended-to-singapore-citizens-aged-12-to-39",
            "articleTitle": "(Updated 24 Jun 2021) COVID-19 vaccination extended to Singapore Citizens aged 12 to 39",
            "articleDescription": "PRs and long-term pass holders can also register interest for vaccination from 2 Jul 2021",
            "articleID": "{5BCE5373-7A04-4B30-B71D-E8A198AEBAD1}",
            "articleSummarized": "As of 23 June 2021, over 5 million doses of the COVID-19 vaccine have been administered in Singapore, with 3 million individuals receiving at least their first dose. Updates on the Vaccination Programme On 24 June 2021, the Multi-Ministry Taskforce (MTF) announced the following updates to the national vaccination programme: 1. Acceleration of National Vaccination Programme (NEW) From 26 June 2021, up to 80,000 daily doses of the vaccine will be administered - an increase from 47,000 in mid-June 2021 and 40,000 in May 2021. Another 500,000 new first dose appointments will be available for registration, with additional slots opening up in subsequent weeks. If supplies continue to arrive as planned, 2/3 of Singapore\u2019s population will be fully vaccinated by National Day (9 August). MOH is also looking to reduce the current dose interval of between six to eight weeks, to four weeks. This will allow more of the population to complete their vaccination of two doses sooner. More details will be announced soon. 2",
            "datePublished": "10 Jun 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/microsite/vaccine/mci-vaccine_main-desktop-masthead_final.png",
            "minutesToRead": "1",
            "articleUrl": "www.gov.sg//article/seniors-vaccination-resources---tamil",
            "articleTitle": "\u0bae\u0bc2\u0ba4\u0bcd\u0ba4\u0bcb\u0bb0\u0bc1\u0b95\u0bcd\u0b95\u0bbe\u0ba9 \u0ba4\u0b9f\u0bc1\u0baa\u0bcd\u0baa\u0bc2\u0b9a\u0bbf \u0bb5\u0bb3\u0b99\u0bcd\u0b95\u0bb3\u0bcd",
            "articleDescription": "\u0baa\u0ba4\u0bbf\u0bb5\u0bc1 \u0b9a\u0bc6\u0baf\u0bcd\u0bb5\u0ba4\u0bc1 \u0bae\u0bc1\u0ba4\u0bb2\u0bcd \u0ba4\u0b9f\u0bc1\u0baa\u0bcd\u0baa\u0bc2\u0b9a\u0bbf \u0baa\u0bcb\u0b9f\u0bcd\u0b9f\u0bc1\u0b95\u0bcd\u0b95\u0bca\u0bb3\u0bcd\u0bb5\u0ba4\u0bc1 \u0bb5\u0bb0\u0bc8 \u0b89\u0b99\u0bcd\u0b95\u0bb3\u0bc1\u0b95\u0bcd\u0b95\u0bc1 \u0b86\u0ba4\u0bb0\u0bb5\u0bb3\u0bbf\u0ba4\u0bcd\u0ba4\u0bb2\u0bcd ",
            "articleID": "{AA943DDC-8342-4253-ACBF-BED801E1E2A1}",
            "articleSummarized": "\u0ba4\u0b9f\u0bc1\u0baa\u0bcd\u0baa\u0bc2\u0b9a\u0bbf \u0baa\u0bcb\u0b9f\u0bcd\u0b9f\u0bc1\u0b95\u0bcd\u0b95\u0bca\u0bb3\u0bcd\u0bb5\u0ba4\u0bc8 \u0bae\u0bc2\u0ba4\u0bcd\u0ba4\u0bcb\u0bb0\u0bc1\u0b95\u0bcd\u0b95\u0bc1 \u0b8a\u0b95\u0bcd\u0b95\u0bc1\u0bb5\u0bbf\u0ba4\u0bcd\u0ba4\u0bb2\u0bcd \u0b89\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0b95\u0bc1\u0b9f\u0bc1\u0bae\u0bcd\u0baa\u0ba4\u0bcd\u0ba4\u0bc8\u0b9a\u0bcd \u0b9a\u0bc7\u0bb0\u0bcd\u0ba8\u0bcd\u0ba4 \u0bae\u0bc2\u0ba4\u0bcd\u0ba4\u0bcb\u0bb0\u0bcd \u0ba4\u0b9f\u0bc1\u0baa\u0bcd\u0baa\u0bc2\u0b9a\u0bbf \u0baa\u0bcb\u0b9f\u0bcd\u0b9f\u0bc1\u0b95\u0bcd\u0b95\u0bca\u0ba3\u0bcd\u0b9f\u0bc1\u0bb3\u0bcd\u0bb3\u0ba9\u0bb0\u0bbe \u0b85\u0bb2\u0bcd\u0bb2\u0ba4\u0bc1 \u0b85\u0ba4\u0bc1\u0baa\u0bb1\u0bcd\u0bb1\u0bbf \u0b87\u0ba9\u0bcd\u0ba9\u0bc1\u0bae\u0bcd \u0ba4\u0bc6\u0bb3\u0bbf\u0bb5\u0bbf\u0ba9\u0bcd\u0bae\u0bc8\u0baf\u0bc1\u0b9f\u0ba9\u0bcd \u0b87\u0bb0\u0bc1\u0b95\u0bcd\u0b95\u0bbf\u0bb1\u0bbe\u0bb0\u0bcd\u0b95\u0bb3\u0bbe? \u0b95\u0bca\u0bb5\u0bbf\u0b9f\u0bcd \u2013 19 \u0ba4\u0b9f\u0bc1\u0baa\u0bcd\u0baa\u0bc2\u0b9a\u0bbf \u0ba4\u0bca\u0b9f\u0bb0\u0bcd\u0baa\u0bbe\u0ba9 \u0bae\u0bc2\u0ba4\u0bcd\u0ba4\u0bcb\u0bb0\u0bbf\u0ba9\u0bcd \u0b9a\u0ba8\u0bcd\u0ba4\u0bc7\u0b95\u0b99\u0bcd\u0b95\u0bb3\u0bc1\u0b95\u0bcd\u0b95\u0bc1 \u0bb5\u0bbf\u0bb3\u0b95\u0bcd\u0b95\u0bae\u0bb3\u0bbf\u0b95\u0bcd\u0b95\u0bbf\u0bb1\u0bbe\u0bb0\u0bcd, \u0b85\u0bae\u0bc8\u0b9a\u0bcd\u0b9a\u0bb0\u0bcd S \u0b88\u0bb8\u0bcd\u0bb5\u0bb0\u0ba9\u0bcd. \u0bae\u0bc2\u0ba4\u0bcd\u0ba4\u0bcb\u0bb0\u0bbf\u0ba9\u0bcd \u0ba4\u0b9f\u0bc1\u0baa\u0bcd\u0baa\u0bc2\u0b9a\u0bbf\u0baa\u0bcd \u0baa\u0baf\u0ba3\u0bae\u0bcd \u0ba4\u0b9f\u0bc1\u0baa\u0bcd\u0baa\u0bc2\u0b9a\u0bbf \u0baa\u0bcb\u0b9f\u0bcd\u0b9f\u0bc1\u0b95\u0bcd\u0b95\u0bca\u0bb3\u0bcd\u0bb5\u0ba4\u0bc1, \u0bae\u0bc1\u0b95\u0bcd\u0b95\u0bbf\u0baf\u0bae\u0bbe\u0ba9\u0ba4\u0bc1; \u0b9a\u0bc1\u0bb2\u0baa\u0bae\u0bbe\u0ba9\u0ba4\u0bc1. \u0b95\u0bca\u0bb5\u0bbf\u0b9f\u0bcd-19 \u0ba4\u0b9f\u0bc1\u0baa\u0bcd\u0baa\u0bc2\u0b9a\u0bbf\u0b95\u0bcd\u0b95\u0bc1\u0baa\u0bcd \u0baa\u0ba4\u0bbf\u0bb5\u0bc1 \u0b9a\u0bc6\u0baf\u0bcd\u0bb5\u0ba4\u0bbf\u0bb2\u0bbf\u0bb0\u0bc1\u0ba8\u0bcd\u0ba4\u0bc1 \u0bae\u0bc1\u0ba4\u0bb2\u0bcd\u0bae\u0bc1\u0bb1\u0bc8 \u0ba4\u0b9f\u0bc1\u0baa\u0bcd\u0baa\u0bc2\u0b9a\u0bbf \u0baa\u0bcb\u0b9f\u0bcd\u0b9f\u0bc1\u0b95\u0bcd\u0b95\u0bca\u0bb3\u0bcd\u0bb5\u0ba4\u0bc1 \u0bb5\u0bb0\u0bc8\u0baf\u0bbf\u0bb2\u0bbe\u0ba9 \u0ba4\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0b85\u0ba9\u0bc1\u0baa\u0bb5\u0b99\u0bcd\u0b95\u0bb3\u0bc8\u0baa\u0bcd \u0baa\u0b95\u0bbf\u0bb0\u0bcd\u0ba8\u0bcd\u0ba4\u0bc1\u0b95\u0bca\u0bb3\u0bcd\u0bb3\u0bc1\u0bae\u0bcd \u0bae\u0bc2\u0ba4\u0bcd\u0ba4 \u0b95\u0bb2\u0bc8\u0b9e\u0bb0\u0bcd\u0b95\u0bb3\u0bc8\u0baa\u0bcd \u0baa\u0bbe\u0bb0\u0bc1\u0b99\u0bcd\u0b95\u0bb3\u0bcd",
            "datePublished": "10 Jun 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/microsite/vaccine/mci-vaccine_main-desktop-masthead_final.png",
            "minutesToRead": "1",
            "articleUrl": "www.gov.sg//article/seniors-vaccination-resources---malay",
            "articleTitle": "Sumber Maklumat Vaksinasi untuk Warga Emas",
            "articleDescription": "Menyokong perjalanan anda bermula dari pendaftaran hingga mendapatkan vaksinasi",
            "articleID": "{D3E39735-950F-473D-AAB0-AE9612EC3F8F}",
            "articleSummarized": "Menggalakkan warga emas menjalani vaksinasi Lebih daripada 75% masyarakat Melayu/Islam yang layak telah pun mendapatkan vaksinasi COVID-19 mereka atau membuat janji temu. Masih ragu-ragu sama ada anda harus mendapatkan vaksinasi? Ikuti perbincangan Setiausaha Parlimen Puan Rahayu Mahzam dan Deejay Warna, RZ, mengenai keprihatinan warga emas terhadap vaksin-vaksin ini. Perjalanan Vaksinasi untuk Warga Emas Mendapatkan suntikan vaksin adalah penting dan mudah. Saksikan para artis veteran melalui perjalanan vaksinasi mereka bermula dari pendaftaran hingga mendapatkan suntikan dos pertama vaksin COVID-19 mereka",
            "datePublished": "10 Jun 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/microsite/vaccine/mci-vaccine_main-desktop-masthead_final.png",
            "minutesToRead": "1",
            "articleUrl": "www.gov.sg//article/seniors-vaccination-resources---english",
            "articleTitle": "Seniors' Vaccination Resources",
            "articleDescription": "Supporting your journey from registration to vaccination ",
            "articleID": "{CAC2BCCD-0167-4324-98F1-E218727B1F62}",
            "articleSummarized": "Seniors\u2019 Vaccination Journey Getting vaccinated is important and easy. Watch veteran artistes go through their vaccination journey, from registration to receiving their first dose of the COVID-19 vaccine. Book Your Vaccination Appointment The COVID-19 vaccination programme is being progressively rolled out to all Singaporeans and long term residents",
            "datePublished": "10 Jun 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/microsite/vaccine/mci-vaccine_main-desktop-masthead_final.png",
            "minutesToRead": "1",
            "articleUrl": "www.gov.sg//article/seniors-vaccination-resources---chinese",
            "articleTitle": "\u5e74\u957f\u4eba\u58eb\u63a5\u79cd\u75ab\u82d7\u7684\u76f8\u5173\u8d44\u8baf",
            "articleDescription": "\u4ece\u62a5\u540d\u9884\u7ea6\u5230\u63a5\u79cd\u75ab\u82d7\uff0c\u4e00\u8def\u7ed9\u4e88\u60a8\u652f\u6301\u548c\u534f\u52a9",
            "articleID": "{F83CB51E-5ED0-40F4-84C8-1ED92DF2E96A}",
            "articleSummarized": "\u9f13\u52b1\u5e74\u957f\u8005\u6ce8\u5c04\u51a0\u75c5\u75ab\u82d7 \u51a0\u75c5\u75ab\u82d7\u662f\u5426\u4f1a\u5bfc\u81f4\u5e74\u957f\u8005\u5fc3\u810f\u75c5\u53d1\u4f5c\u548c\u4e2d\u98ce\uff1f\u536b\u751f\u90e8\u957f\u738b\u4e59\u5eb7\u548c\u827a\u4eba\u90d1\u60e0\u7389\u4e3a\u4f60\u89e3\u7b54\u548c\u5206\u4eab\u63a5\u79cd\u75ab\u82d7\u7684\u91cd\u8981. \u90e8\u957f\u4e5f\u9f13\u52b1\u5e74\u957f\u8005\u6ce8\u5c04\u51a0\u75c5\u75ab\u82d7\uff0c\u4ee5\u83b7\u5f97\u66f4\u597d\u7684\u4fdd\u62a4\u3002 \u63a5\u79cd\u51a0\u75c5\u75ab\u82d7\u5c31\u597d\u6bd4\u4e0b\u96e8\u65f6\u6709\u96e8\u4f1e\u7684\u4fdd\u62a4\u3002\u542c\u542c\u901a\u8baf\u53ca\u65b0\u95fb\u90e8\u957f\u517c\u5185\u653f\u90e8\u7b2c\u4e8c\u90e8\u957f\u6768\u8389\u660e\u548c\u827a\u4eba\u5411\u4e91\u5206\u4eab\u63a5\u79cd\u51a0\u75c5\u75ab\u82d7\u7684\u91cd\u8981\u6027.\u90e8\u957f\u4e5f\u9f13\u52b1\u5e74\u957f\u8005\u6ce8\u5c04\u75ab\u82d7\uff0c\u4ee5\u83b7\u5f97\u66f4\u597d\u7684\u4fdd\u62a4\u3002 \u51a0\u75c5\u75ab\u82d7\u662f\u5426\u6709\u6548\uff1f\u75ab\u82d7\u662f\u5426\u4f1a\u5bfc\u81f4\u5e74\u957f\u8005\u5fc3\u810f\u75c5\u53d1\u4f5c\u548c\u4e2d\u98ce\uff1f \u542c\u542c\u738b\u4e59\u5eb7\u90e8\u957f\u548c\u827a\u4eba\u82cf\u68bd\u8bda\u4e3a\u4f60\u89e3\u7b54\u548c\u5206\u4eab\u63a5\u79cd\u75ab\u82d7\u7684\u91cd\u8981\uff0c\u5e76\u9f13\u52b1\u5e74\u957f\u8005\u6ce8\u5c04\u75ab\u82d7\uff0c\u4ee5\u83b7\u5f97\u66f4\u597d\u7684\u4fdd\u62a4\u3002 \u5982\u679c\u5e74\u957f\u8005\u611f\u67d3\u4e0a\u51a0\u75c5\uff0c\u5f97\u5230\u4e25\u91cd\u75be\u75c5\u7684\u673a\u4f1a\u4f1a\u66f4\u9ad8\u3002 \u6ce8\u5c04\u75ab\u82d7\u4ee5\u4fdd\u62a4\u81ea\u5df1\u548c\u4eb2\u4eba\u662f\u975e\u5e38\u91cd\u8981\u7684\u3002\u542c\u542c\u536b\u751f\u90e8\u517c\u4eba\u529b\u90e8\u9ad8\u7ea7\u653f\u52a1\u90e8\u957f\u8bb8\u5b9d\u7428\u533b\u751f\u548c\u827a\u4eba\u9648\u6cf0\u94ed\u5206\u4eab\u63a5\u79cd\u75ab\u82d7\u7684\u91cd\u8981\u6027\uff0c\u9f13\u52b1\u5e74\u957f\u8005\u6ce8\u5c04\u75ab\u82d7\u3002 \u5e74\u957f\u4eba\u58eb\u63a5\u79cd\u75ab\u82d7\u4e4b\u65c5 \u63a5\u79cd\u75ab\u82d7\u4e0d\u4ec5\u91cd\u8981\uff0c\u8fc7\u7a0b\u4e5f\u975e\u5e38\u7b80\u4fbf\u3002\u8ddf\u7740\u672c\u5730\u8d44\u6df1\u827a\u4eba\u4e00\u8d77\u8e0f\u4e0a\u63a5\u79cd\u75ab\u82d7\u4e4b\u65c5\uff0c\u89c2\u770b\u4ed6\u4eec\u5206\u4eab\u4ece\u62a5\u540d\u5230\u63a5\u79cd\u7b2c\u4e00\u52422019\u51a0\u75c5\u75ab\u82d7\u7684\u7ecf\u5386\u3002 \u9884\u7ea6\u63a5\u79cd\u75ab\u82d7 \u653f\u5e9c\u6b63\u9010\u6b65\u4e3a\u6240\u6709\u65b0\u52a0\u5761\u4eba\u548c\u672c\u5730\u957f\u671f\u5c45\u6c11\u5c55\u5f00\u51a0\u75c5\u75ab\u82d7\u63a5\u79cd\u8ba1\u5212\u3002 1",
            "datePublished": "10 Jun 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/mtf-31-may-vax-bp.jpg",
            "minutesToRead": "3",
            "articleUrl": "www.gov.sg//article/expanding-singapores-vaccination-programme",
            "articleTitle": "Expanding Singapore\u2019s vaccination programme",
            "articleDescription": "Updated vaccination guidelines for sub-groups of individuals and enhancing access for seniors",
            "articleID": "{3B403D8E-0656-45A0-847B-92ABEBB1D1D2}",
            "articleSummarized": "To date, over 4 million doses of the COVID-19 vaccine have been administered in Singapore, with above 1.7 million individuals fully vaccinated. Based on the latest scientific evidence, the vaccination guidelines for pregnant and breastfeeding women, cancer patients on treatment and individuals with history of Severe Cutaneous Adverse Reactions (SCAR) have been updated. To further encourage vaccination for seniors, all Vaccination Centres in the community will now accept walk-ins for those aged 60 and above. Updates on Vaccination Programme With more people vaccinated both locally and globally, there is more evidence on the efficacy and safety of vaccine use especially in relation to various sub-groups. The Expert Committee on COVID-19 Vaccination (EC19V) has revised the guidance for the following: Pregnant Women There is currently no evidence to suggest that the Pfizer-BioNTech or Moderna vaccines may cause harm to the mother or child . As there is less data available for pregnant women, pregnant women should discuss with their doctors to make an informed decision. Pregnant women can register and book an appointment from 4 June 2021 onwards. Breastfeeding Women It is safe for breastfeeding women to be vaccinated. There is no need to suspend breastfeeding to receive the BioNTech or Moderna COVID-19 vaccine. Cancer Patients on Active Treatment Remain a vulnerable population that is at an increased risk of complications from COVID-19",
            "datePublished": "31 May 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/covid-testing.jpg",
            "minutesToRead": "2",
            "articleUrl": "www.gov.sg//article/enhanced-measures-for-testing-and-contact-tracing",
            "articleTitle": "Enhanced measures for testing and contact tracing",
            "articleDescription": "Extended Antigen Rapid Testing in more settings, household contacts of confirmed cases to self-isolate",
            "articleID": "{9DE3DA90-D6F5-4E54-9DCF-2AA189989D95}",
            "articleSummarized": "Increase Surveillance Testing Using Antigen Rapid Tests (ARTs) The Polymerase Chain Reaction (PCR) test has been effective in detecting positive COVID-19 cases. However, results for the PCR test can take more than a day. Newer tests, such as ARTs, complement existing testing regimes as they are cheaper, faster, and more convenient to administer, thus making them very effective surveillance tests. This allows the scale of testing to be expanded to the wider population, allowing for early identification of potential infections so that public health actions can be triggered sooner to stem further spread. As a start, ARTs have been piloted for regular surveillance testing for workers in dorms, construction sites, airport and selected marine shipyards. This is in addition to the PCR-based Rostered Routine Testing",
            "datePublished": "31 May 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/empty-classroom.jpg",
            "minutesToRead": "2",
            "articleUrl": "www.gov.sg//article/vaccination-exercise-to-progressively-cover-students",
            "articleTitle": "Vaccination exercise to progressively cover students",
            "articleDescription": "Part of the larger national effort to keep education institutions and the wider community safe",
            "articleID": "{842DCC9B-5DC7-4342-8BD8-937D01ACE4DA}",
            "articleSummarized": "Vaccination roll-out for students Based on approval from the Health Science Authority (HSA) of the medical suitability of the vaccines, students below the age of 18 will only be offered the Pfizer-BioNTech vaccine, while students aged 18 and above can opt for either the Pfizer-BioNTech or Moderna vaccine. All eligible students can expect to receive their invitation to sign up for their vaccination from 1 June 2021. Graduating cohorts at the secondary schools and Pre-University levels, in particular students sitting for the GCE N-, O-, A- Level examinations in the second-half of 2021, will be the first to receive their invitations. This is to ensure they have greater flexibility in scheduling their vaccination appointments. Invitations will be progressively extended over the next two weeks to other groups of full-time students 1 in schools and IHLs, including the Privately-Funded Schools, Madrasahs and Special Education (SPED) schools. Medically eligible students can receive their vaccinations at the following locations: Community vaccination centres Four additional dedicated MOE vaccination centres. Three are jointly set-up by MOE and the Health Promotion Board (HPB) at ITE College campuses - ITE College Central, ITE College East and ITE College West",
            "datePublished": "31 May 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/supporting-causes-bp.jpg",
            "minutesToRead": "2",
            "articleUrl": "www.gov.sg//article/5-ways-you-can-support-green-causes",
            "articleTitle": "5 Ways You Can Support Green Causes",
            "articleDescription": "How we can support local environmental movements",
            "articleID": "{92EF7672-226E-482A-9168-AC41F2A2A159}",
            "articleSummarized": "Interested in supporting environmental causes, but not sure how to get started? Here are some suggestions: Reduce Food Wastage Did you know that in a year alone, Singapore generates over 744 million kilograms of food waste, which is roughly the weight of 51,000 double decker buses? While we can each play our part as by cooking or ordering only what we can finish, consider donating to Community Fridges if you have excess or unsold food. This initiative aims to reduce food wastage while offering a helping hand to those in need. Community fridges can be found across Singapore, such as Tampines and Chong Pang . Say No to Plastic To reduce plastic waste when shopping, remember to bring your own reusable tote bag, and buy things in bulk where possible. A green initiative you can also support is the Bounce Bags initiative, which aims to help citizens build eco-consciousness by encouraging residents to pick up or donate free reusable bags at designated sharing points",
            "datePublished": "31 May 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/elderlylady/15.jpg",
            "minutesToRead": "1",
            "articleUrl": "www.gov.sg//article/factually210521",
            "articleTitle": "CLARIFICATIONS ON ONLINE POSTS ALLEGING POLICE BULLYING",
            "articleDescription": "False statements that Police officers had reprimanded and taunted an elderly woman have been circulating",
            "articleID": "{AAEF8D80-2D71-4C45-A9AC-D1FA7418AA30}",
            "articleSummarized": "On 18 May 2021, Instagram user @nichology published an Instagram story, which contained falsehoods that the Police severely reprimanded and taunted an elderly woman. These falsehoods were reproduced by The Online Citizen Asia and Singapore Uncensored. The Instagram story alleged that four Police officers, who had \u201ccluster an elderly auntie that took off her mask because she was feeling breathless\u201d, \u201ccontinued to tell her off to the extent someone had to come and salvage the situation\u201d and \u201ctaunt \u201d the elderly woman",
            "datePublished": "21 May 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/thermometerandmask/spike.png",
            "minutesToRead": "1",
            "articleUrl": "www.gov.sg//article/factually200521",
            "articleTitle": "CORRECTIONS AND CLARIFICATIONS REGARDING FALSEHOOD ON \u201cSINGAPORE\u201d STRAIN",
            "articleDescription": "False statement circulated by multiple sources about a \u201cSingapore\u201d COVID-19 variant",
            "articleID": "{DB6F06B2-6145-4D10-B1F9-8B59CD6E9B7C}",
            "articleSummarized": "There is a false statement circulating online by multiple media outlets and social media platforms, which implies that a new, previously unknown variant of COVID-19 originated in Singapore and/or risks spreading to India from Singapore. Facts This is false",
            "datePublished": "19 May 2021"
        },
        {
            "imgUrl": "www.gov.sg//-/media/gov/igms-article-3---kathryn-mastura-abdul-header.png",
            "minutesToRead": "3",
            "articleUrl": "www.gov.sg//article/i-got-my-shot-to-protect-my-loved-ones-at-the-community",
            "articleTitle": "#IGotMyShotSG to protect my loved ones and the community",
            "articleDescription": "Hear from our frontliners on why they chose to get vaccinated against COVID-19",
            "articleID": "{03458A99-6907-416D-8D10-0FE0F1D7F89D}",
            "articleSummarized": "Unsure if you should be taking the COVID-19 vaccines? Hear from frontliners Kathryn, Mastura and Abdul Lathiff, who had their fair share of initial fears, but still decided to get vaccinated to protect themselves, their loved ones and the community. Read their stories below: \u201cThis pandemic has changed our lives drastically and almost everything we do here at PCF Sparkletots. While some semblance of normalcy has been restored with the resumption of physical classes, things are not as they were before. This was one of my motivations to get vaccinated. As the Executive Principal of the preschool centre, I\u2019m in frequent contact with my staff, parents and students. I know that I\u2019ve a social responsibility to protect those around me, especially the children who cannot be vaccinated. All of us have the responsibility to protect those who cannot take the vaccine due to age or certain medical conditions. Even though I was a little apprehensive about taking the COVID-19 vaccine due to my hypertension, my fears were alleviated after I consulted with my doctor. He assured me that the vaccines were safe, which gave me the extra resolve to put my foot forward. If someone tells me that they will \u2018wait and see\u2019 before taking the vaccine, I will ask them \u2018Why wait and see, when you can take it now to protect yourself and your loved ones?\u2019 If you are medically fit, take the COVID-19 vaccine. If not for yourself, do it for your loved ones.\u201d \u2013 Kathryn Goy, 54, Executive Principal of PAP Community Foundation (PCF) Sparkletots and Early Childhood Development Agency (ECDA) Fellow \u201cI\u2019ve always suffered from frequent and chronic coughs",
            "datePublished": "19 May 2021"
        }
    ];

    const daily_data = [
        {
            "title": "UPDATE ON LOCAL COVID-19 SITUATION  (6 OCT 2021)",
            "body_text": "1,520 cases are currently warded in hospital. 255 cases require oxygen supplementation and 37 are in the intensive care unit (ICU). Over the last 28 days, of the 43,610 infected individuals, 98.3% had no or mild symptoms, 1.4% required oxygen supplementation, 0.1% required ICU care, and 0.2% has died.  As of 5 October 2021, 83% of our population has completed their full regimen/ received two doses of COVID-19 vaccines, and 85% has received at least one dose.  As of 6 October 2021, 12pm, the Ministry of Health has detected a total of 3,577 new cases of COVID-19 infection in Singapore, with 2,932 in the community, 630 in the migrant worker dormitories and 15 imported cases.",
            "date_published": "Wed, 06 Oct 2021 15:32:00 Z",
            "article_link": "https://www.moh.gov.sg/news-highlights/details/update-on-local-covid-19-situation-(6-oct-2021)/"
        },
        {
            "title": "Update on Local COVID-19 Situation",
            "body_text": "1,512 cases are currently warded in hospital. 247 cases require oxygen supplementation and 34 are in the intensive care unit (ICU). Over the last 28 days, of the 40,396 infected individuals, 98.3% had no or mild symptoms, 1.4% required oxygen supplementation, 0.1% required ICU care, and 0.2% has died.  As of 4 October 2021, 83% of our population has completed their full regimen/ received two doses of COVID-19 vaccines, and 85% has received at least one dose.  As of 5 October 2021, 12pm, the Ministry of Health has detected a total of 3,486 new cases of COVID-19 infection in Singapore, with 2,767 in the community, 713 in the migrant worker dormitories and 6 imported cases.",
            "date_published": "Tue, 05 Oct 2021 15:02:00 Z",
            "article_link": "https://www.moh.gov.sg/news-highlights/details/update-on-local-covid-19-situation_5_October_2021/"
        },
        {
            "title": "Update On Local Covid-19 Situation (4 Oct 2021)",
            "body_text": "1,355 cases are currently warded in hospital. 226 cases require oxygen supplementation and 35 are in the intensive care unit (ICU).  Over the last 28 days, of the 37,242 infected individuals, 98.2% had no or mild symptoms, 1.5% required oxygen supplementation, 0.1% required ICU care, and 0.2% has died.  As of 3 October 2021, 82% of our population has completed their full regimen/ received two doses of COVID-19 vaccines, and 85% has received at least one dose.  As of 4 October 2021, 12pm, the Ministry of Health has detected a total of 2,475 new cases of COVID-19 infection in Singapore, with 1,859 in the community, 601 in the migrant worker dormitories and 15 imported cases.",
            "date_published": "Sun, 03 Oct 2021 16:00:00 Z",
            "article_link": "https://www.moh.gov.sg/news-highlights/details/update-on-local-covid-19-situation-(4-oct-2021)/"
        },
        {
            "title": "Update on Local COVID-19 Situation",
            "body_text": "1,337 cases are currently warded in hospital. 250 cases require oxygen supplementation and 35 are in the intensive care unit (ICU). Over the last 28 days, of the 35,017 infected individuals, 98.1% had no or mild symptoms, 1.5% required oxygen supplementation, 0.2% required ICU care, and 0.2% has died.  As of 2 October 2021, 82% of our population has completed their full regimen/ received two doses of COVID-19 vaccines, and 85% has received at least one dose.  As of 3 October 2021, 12pm, the Ministry of Health has detected a total of 2,057 new cases of COVID-19 infection in Singapore, with 1,676 in the community, 373 in the migrant worker dormitories and 8 imported cases.",
            "date_published": "Sun, 03 Oct 2021 15:08:00 Z",
            "article_link": "https://www.moh.gov.sg/news-highlights/details/update-on-local-covid-19-situation_3_October_2021/"
        },
        {
            "title": "UPDATE ON LOCAL COVID-19 SITUATION (2 OCT 2021)",
            "body_text": "1,422 cases are currently warded in hospital. 243 cases require oxygen supplementation and 31 are in the intensive care unit (ICU). Over the last 28 days, of the 33,155 infected individuals, 98.2% had no or mild symptoms, 1.5% required oxygen supplementation, 0.2% required ICU care, and 0.1% has died.  As of 1 October 2021, 82% of our population has completed their full regimen/ received two doses of COVID-19 vaccines, and 85% has received at least one dose.  As of 2 October 2021, 12pm, the Ministry of Health has detected a total of 2,356 new cases of COVID-19 infection in Singapore, with 1,938 in the community, 412 in the migrant worker dormitories and 6 imported cases.",
            "date_published": "Sat, 02 Oct 2021 15:21:00 Z",
            "article_link": "https://www.moh.gov.sg/news-highlights/details/update-on-local-covid-19-situation-(2-oct-2021)/"
        },
        {
            "title": "Update on Local COVID-19 Situation (1 Oct 2021)",
            "body_text": "1,356 cases are currently warded in hospital. 222 cases require oxygen supplementation and 34 are in the intensive care unit (ICU). Over the last 28 days, of the 31,057 infected individuals, 98.2% had no or mild symptoms, 1.5% required oxygen supplementation, 0.2% required ICU care, and 0.1% has died. As of 30 September 2021, 82% of our population has completed their full regimen/ received two doses of COVID-19 vaccines, and 85% has received at least one dose. As of 1 October 2021, 12pm, the Ministry of Health has detected a total of 2,909 new cases of COVID-19 infection in Singapore, with 2,079 in the community, 818 in the migrant worker dormitories and 12 imported cases.",
            "date_published": "Fri, 01 Oct 2021 15:30:00 Z",
            "article_link": "https://www.moh.gov.sg/news-highlights/details/update-on-local-covid-19-situation-(1-oct-2021)/"
        },
        {
            "title": "Update on Local COVID-19 Situation (30 Sep 2021)",
            "body_text": "1,360 cases are currently warded in hospital. There are currently 204 cases of serious illness requiring oxygen supplementation, and 34 in critical condition in the intensive care unit (ICU).Over the last 28 days, of the 28,375 infected individuals, 98.1% had no or mild symptoms, 1.6% required oxygen supplementation, 0.2% required ICU care, and 0.1% has died.As of 29 September 2021, 82% of our population has completed their full regimen/ received two doses of COVID-19 vaccines, and 85% has received at least one dose.As of 30 September 2021, 12pm, the Ministry of Health has detected a total of 2,478 new cases of COVID-19 infection in Singapore, with 2,022 in the community, 452 in the migrant worker dormitories and 4 imported cases.",
            "date_published": "Thu, 30 Sep 2021 15:02:00 Z",
            "article_link": "https://www.moh.gov.sg/news-highlights/details/update-on-local-covid-19-situation-(30-sep-2021)/"
        },
        {
            "title": "UPDATE ON LOCAL COVID-19 SITUATION (29 SEP 2021)",
            "body_text": "1,335 cases are currently warded in hospital. There are currently 197 cases of serious illness requiring oxygen supplementation, and 34 in critical condition in the intensive care unit (ICU). Over the last 28 days, of the 26,088 infected individuals, 98.1% had no or mild symptoms, 1.6% required oxygen supplementation, 0.2% required ICU care, and 0.1% has died.  As of 28 September 2021, 82% of our population has completed their full regimen/ received two doses of COVID-19 vaccines, and 85% has received at least one dose.  As of 29 September 2021, 12pm, the Ministry of Health has detected a total of 2,268 new cases of COVID-19 infection in Singapore, with 1,810 in the community, 448 in the migrant worker dormitories and 10 imported cases.",
            "date_published": "Wed, 29 Sep 2021 15:17:00 Z",
            "article_link": "https://www.moh.gov.sg/news-highlights/details/update-on-local-covid-19-situation-(29-sep-2021)/"
        },
        {
            "title": "Update on Local COVID-19 Situation",
            "body_text": "1,288 cases are currently warded in hospital. There are currently 194 cases of serious illness requiring oxygen supplementation, and 27 in critical condition in the intensive care unit (ICU). Over the last 28 days, of the 21,935 infected individuals, 98.0% had no or mild symptoms, 1.7% required oxygen supplementation, 0.2% required ICU care, and 0.1% has died.  As of 26 September 2021, 82% of our population has completed their full regimen/ received two doses of COVID-19 vaccines, and 85% has received at least one dose.  As of 27 September 2021, 12pm, the Ministry of Health has detected a total of 1,647 new cases of COVID-19 infection in Singapore, with 1,280 in the community, 362 in the migrant worker dormitories and 5 imported cases.",
            "date_published": "Mon, 27 Sep 2021 14:55:00 Z",
            "article_link": "https://www.moh.gov.sg/news-highlights/details/update-on-local-covid-19-situation_27_September_2021/"
        },
        {
            "title": "Update on Local COVID-19 Situation (26 Sep 2021)",
            "body_text": "1,203 cases are currently warded in hospital. There are currently 172 cases of serious illness requiring oxygen supplementation, and 30 in critical condition in the intensive care unit (ICU). Over the last 28 days, of the 20,439 infected individuals, 98.0% had no or mild symptoms, 1.7% required oxygen supplementation, 0.2% required ICU care, and 0.1% has died. As of 25 September 2021, 82% of our population has completed their full regimen/ received two doses of COVID-19 vaccines, and 85% has received at least one dose. As of 26 September 2021, 12pm, the Ministry of Health has detected a total of 1,939 new cases of COVID-19 infection in Singapore, with 1,536 in the community, 398 in the migrant worker dormitories and 5 imported cases.",
            "date_published": "Sun, 26 Sep 2021 14:45:00 Z",
            "article_link": "https://www.moh.gov.sg/news-highlights/details/update-on-local-covid-19-situation-(26-sep-2021)/"
        },
        {
            "title": "Update on Local COVID-19 Situation",
            "body_text": "1,142 cases are currently warded in hospital. There are currently 165 cases of serious illness requiring oxygen supplementation, and 27 in critical condition in the intensive care unit (ICU). Over the last 28 days, of the 18,629 infected individuals, 97.9% had no or mild symptoms, 1.7% required oxygen supplementation, 0.2% required ICU care, and 0.1% has died.  As of 24 September 2021, 82% of our population has completed their full regimen/ received two doses of COVID-19 vaccines, and 84% has received at least one dose.  As of 25 September 2021, 12pm, the Ministry of Health has detected a total of 1,443 new cases of COVID-19 infection in Singapore, with 1,053 in the community, 371 in the migrant worker dormitories and 19 imported cases.",
            "date_published": "Sat, 25 Sep 2021 15:00:00 Z",
            "article_link": "https://www.moh.gov.sg/news-highlights/details/update-on-local-covid-19-situation_25_September_2021/"
        },
        {
            "title": "UPDATE ON LOCAL COVID-19 SITUATION (24 SEPTEMBER 2021)",
            "body_text": "1,092 cases are currently warded in hospital. There are currently 162 cases of serious illness requiring oxygen supplementation, and 23 in critical condition in the intensive care unit (ICU).Over the last 28 days, of the 17,318 infected individuals, 98.0% had no or mild symptoms, 1.7% required oxygen supplementation, 0.2% required ICU care, and 0.1% has died.As of 23 September 2021, 82% of our population has completed their full regimen/ received two doses of COVID-19 vaccines, and 84% has received at least one dose.As of 24 September 2021, 12pm, the Ministry of Health has detected a total of 1,650 new cases of COVID-19 infection in Singapore, with 1,369 in the community, 277 in the migrant worker dormitories and 4 imported cases.",
            "date_published": "Fri, 24 Sep 2021 14:40:00 Z",
            "article_link": "https://www.moh.gov.sg/news-highlights/details/update-on-local-covid-19-situation-(24-september-2021)/"
        },
        {
            "title": "Update on Local COVID-19 Situation (23 Sep 2021)",
            "body_text": "1,120 cases are currently warded in hospital. There are currently 163 cases of serious illness requiring oxygen supplementation, and 23 in critical condition in the intensive care unit (ICU). Over the last 28 days, of the 15,791 infected individuals, 97.9% had no or mild symptoms, 1.8% required oxygen supplementation, 0.2% required ICU care, and 0.1% has died. As of 22 September 2021, 82% of our population has completed their full regimen/ received two doses of COVID-19 vaccines, and 84% has received at least one dose. As of 23 September 2021, 12pm, the Ministry of Health has detected a total of 1,504 new cases of COVID-19 infection in Singapore, with 1,218 in the community, 273 in the migrant worker dormitories and 13 imported cases.",
            "date_published": "Thu, 23 Sep 2021 14:30:00 Z",
            "article_link": "https://www.moh.gov.sg/news-highlights/details/update-on-local-covid-19-situation-(23-sep-2021)/"
        },
        {
            "title": "Update On Local COVID-19 Situation (22 Sep)",
            "body_text": "1,083 cases are currently warded in hospital. There are currently 145 cases of serious illness requiring oxygen supplementation, and 19 in critical condition in the intensive care unit (ICU).Over the last 28 days, of the 14,412 infected individuals, 97.9% had no or mild symptoms, 1.8% required oxygen supplementation, 0.2% required ICU care, and 0.08% has died.As of 21 September 2021, 82% of our population has completed their full regimen/ received two doses of COVID-19 vaccines, and 84% has received at least one dose.As of 22 September 2021, 12pm, the Ministry of Health has detected a total of 1,457 new cases of COVID-19 infection in Singapore, with 1,277 in the community, 176 in the migrant worker dormitories and 4 imported cases.",
            "date_published": "Wed, 22 Sep 2021 15:00:00 Z",
            "article_link": "https://www.moh.gov.sg/news-highlights/details/update-on-local-covid-19-situation-(22-sep)/"
        },
        {
            "title": "UPDATE ON LOCAL COVID-19 SITUATION (21 SEP 2021)",
            "body_text": "1,109 cases are currently warded in hospital. There are currently 147 cases of serious illness requiring oxygen supplementation, and 17 in critical condition in the intensive care unit (ICU). Over the last 28 days, of the 13,075 infected individuals, 97.9% had no or mild symptoms, 1.9% required oxygen supplementation, 0.2% required ICU care, and 0.06% has died.  As of 20 September 2021, 82% of our population has completed their full regimen/ received two doses of COVID-19 vaccines, and 84% has received at least one dose.  As of 21 September 2021, 12pm, the Ministry of Health has detected a total of 1,178 new cases of COVID-19 infection in Singapore, with 1,038 in the community, 135 in the migrant worker dormitories and 5 imported cases.",
            "date_published": "Tue, 21 Sep 2021 15:59:00 Z",
            "article_link": "https://www.moh.gov.sg/news-highlights/details/update-on-local-covid-19-situation-(21-sep-2021)/"
        },
        {
            "title": "UPDATE ON LOCAL COVID-19 SITUATION \u200b(20 SEP 2021)",
            "body_text": "",
            "date_published": "Mon, 20 Sep 2021 15:45:00 Z",
            "article_link": "https://www.moh.gov.sg/news-highlights/details/update-on-local-covid-19-situation-(20-sep-2021)/"
        },
        {
            "title": "UPDATE ON LOCAL COVID-19 SITUATION (19 SEP 2021)",
            "body_text": "873 cases are currently warded in hospital. There are currently 118 cases of serious illness requiring oxygen supplementation, and 21 in critical condition in the intensive care unit (ICU).Over the last 28 days, of the 11,196 infected individuals, 98.1% have no or mild symptoms, 1.7% requires oxygen supplementation, 0.2% requires ICU care, and 0.04% has died. As of 18 September 2021, 82% of our population has completed their full regimen/ received two doses of COVID-19 vaccines, and 84% has received at least one dose. As of 19 September 2021, 12pm, the Ministry of Health has detected a total of 1,012 new cases of COVID-19 infection in Singapore, with 919 in the community, 90 in the migrant worker dormitories and 3 imported cases.",
            "date_published": "Sun, 19 Sep 2021 15:45:00 Z",
            "article_link": "https://www.moh.gov.sg/news-highlights/details/update-on-local-covid-19-situation-(19-sep-2021)/"
        },
        {
            "title": "Update on Local Covid-19 Situation (18 Sep 2021)",
            "body_text": "863 cases are currently warded in hospital. There are currently 105 cases of serious illness requiring oxygen supplementation, and 18 in critical condition in the intensive care unit (ICU).  Over the last 28 days, of the 10,017 infected individuals, 98.1% have no or mild symptoms, 1.7% requires oxygen supplementation, 0.2% requires ICU care, and 0.04% has died.  As of 17 September 2021, 82% of our population has completed their full regimen/ received two doses of COVID-19 vaccines, and 84% has received at least one dose.  As of 18 September 2021, 12pm, the Ministry of Health has detected a total of 1,009 new cases of COVID-19 infection in Singapore, with 926 in the community, 78 in the migrant worker dormitories and 5 imported cases.",
            "date_published": "Fri, 17 Sep 2021 16:00:00 Z",
            "article_link": "https://www.moh.gov.sg/news-highlights/details/update-on-local-covid-19-situation-(18-sep-2021)/"
        },
        {
            "title": "Update on Local COVID-19 Situation (17 Sep 2021)",
            "body_text": "813 cases are currently warded in hospital. There are currently 90 cases of serious illness requiring oxygen supplementation, and 14 in critical condition in the intensive care unit (ICU). Over the last 28 days, of the 9,244 infected individuals, 98.2% have no or mild symptoms, 1.7% requires oxygen supplementation, 0.2% requires ICU care, and 0.03% has died. As of 16 September 2021, 82% of our population has completed their full regimen/ received two doses of COVID-19 vaccines, and 84% has received at least one dose. As of 17 September 2021, 12pm, the Ministry of Health has detected a total of 935 new cases of COVID-19 infection in Singapore, with 838 in the community, 96 in the migrant worker dormitories and 1 imported case.",
            "date_published": "Fri, 17 Sep 2021 15:40:00 Z",
            "article_link": "https://www.moh.gov.sg/news-highlights/details/update-on-local-covid-19-situation-(17-sep-2021)/"
        },
        {
            "title": "Update on Local Covid-19 Situation (16 Sep 2021)",
            "body_text": "837 cases are currently warded in hospital. There are currently 77 cases of serious illness requiring oxygen supplementation, and 12 in critical condition in the intensive care unit (ICU).  Over the last 28 days, of the 8,346 infected individuals, 98.2% have no or mild symptoms, 1.6% requires oxygen supplementation, 0.1% requires ICU care, and 0.05% died.  As of 15 September 2021, 82% of our population has completed their full regimen/ received two doses of COVID-19 vaccines, and 84% has received at least one dose.  As of 16 September 2021, 12pm, the Ministry of Health has detected a total of 910 new cases of COVID-19 infection in Singapore, with 803 in the community, 103 in the migrant worker dormitories and 4 imported cases.",
            "date_published": "Thu, 16 Sep 2021 15:00:00 Z",
            "article_link": "https://www.moh.gov.sg/news-highlights/details/update-on-local-covid-19-situation-(16-sep-2021)/"
        },
        {
            "title": "Update on Local COVID-19 Situation",
            "body_text": "822 cases are currently warded in hospital. There are currently 76 cases of serious illness requiring oxygen supplementation, and 9 in critical condition in the intensive care unit (ICU). Over the last 28 days, the percentage of unvaccinated who became severely ill or died is 5.7%, while that for the fully vaccinated is 1.1%. As of 14 September 2021, 81% of our population has completed their full regimen/ received two doses of COVID-19 vaccines, and 84% has received at least one dose.  As of 15 September 2021, 12pm, the Ministry of Health has detected a total of 807 new cases of COVID-19 infection in Singapore, with 770 in the community, 34 in the migrant worker dormitories and 3 imported cases.",
            "date_published": "Wed, 15 Sep 2021 15:22:00 Z",
            "article_link": "https://www.moh.gov.sg/news-highlights/details/update-on-local-covid-19-situation_15_September_2021/"
        },
        {
            "title": "Update on Local COVID-19 Situation (14 Sep)",
            "body_text": "809 cases are currently warded in hospital. There are currently 75 cases of serious illness requiring oxygen supplementation, and 9 in critical condition in the intensive care unit (ICU).Over the last 28 days, the percentage of unvaccinated who became severely ill or died is 6.1%, while that for the fully vaccinated is 1.1%.As of 13 September 2021, 81% of our population has completed their full regimen/ received two doses of COVID-19 vaccines, and 84% has received at least one dose.As of 14 September 2021, 12pm, the Ministry of Health has detected a total of 837 new cases of COVID-19 infection in Singapore, with 755 in the community, 77 in the migrant worker dormitories and 5 imported cases.",
            "date_published": "Tue, 14 Sep 2021 15:30:00 Z",
            "article_link": "https://www.moh.gov.sg/news-highlights/details/update-on-local-covid-19-situation-(14-sep)/"
        },
        {
            "title": "UPDATE ON LOCAL COVID-19 SITUATION (13 SEP 2021)",
            "body_text": "\u2022 774 cases are currently warded in hospital. There are currently 57 cases of serious illness requiring oxygen supplementation, and 8 in critical condition in the intensive care unit (ICU).\u2022 Over the last 28 days, the percentage of unvaccinated who became severely ill or died is 5.4%, while that for the fully vaccinated is 1.0%.\u2022 As of 12 September 2021, 81% of our population has completed their full regimen/ received two doses of COVID-19 vaccines, and 84% has received at least one dose. \u2022 As of 13 September 2021, 12pm, the Ministry of Health has detected a total of 607 new cases of COVID-19 infection in Singapore, with 534 in the community, 63 in the migrant worker dormitories and 10 imported cases.",
            "date_published": "Mon, 13 Sep 2021 15:18:00 Z",
            "article_link": "https://www.moh.gov.sg/news-highlights/details/update-on-local-covid-19-situation-(13-sep-2021)/"
        },
        {
            "title": "Update on Local COVID-19 Situation (12 Sep 2021)",
            "body_text": "780 cases are currently warded in hospital. There are currently 54 cases of serious illness requiring oxygen supplementation, and 7 in critical condition in the intensive care unit (ICU). Over the last 28 days, the percentage of unvaccinated who became severely ill or died is 5.2%, while that for the fully vaccinated is 1.0%. As of 11 September 2021, 81% of our population has completed their full regimen/ received two doses of COVID-19 vaccines, and 84% has received at least one dose. As of 12 September 2021, 12pm, the Ministry of Health (MOH) has detected a total of 520 new cases of COVID-19 infection in Singapore today.",
            "date_published": "Sun, 12 Sep 2021 15:45:00 Z",
            "article_link": "https://www.moh.gov.sg/news-highlights/details/update-on-local-covid-19-situation-(12-sep-2021)/"
        },
        {
            "title": "UPDATE ON LOCAL COVID-19 SITUATION  (11 SEP 2021)",
            "body_text": "\u2022 708 cases are currently warded in hospital. There are currently 35 cases of serious illness requiring oxygen supplementation, and 7 in critical condition in the intensive care unit (ICU).\u2022 Over the last 28 days, the percentage of unvaccinated who became severely ill or died is 4.6%, while that for the fully vaccinated is 0.8%.\u2022 As of 10 September 2021, 81% of our population has completed their full regimen/ received two doses of COVID-19 vaccines, and 84% has received at least one dose. \u2022 As of 11 September 2021, 12pm, the Ministry of Health (MOH) has detected a total of 555 new cases of COVID-19 infection in Singapore today.",
            "date_published": "Sat, 11 Sep 2021 15:59:00 Z",
            "article_link": "https://www.moh.gov.sg/news-highlights/details/update-on-local-covid-19-situation-(11-sep-2021)/"
        },
        {
            "title": "UPDATE ON LOCAL COVID-19 SITUATION (10 SEP 2021)",
            "body_text": "\u2022 689 cases are currently warded in hospital. There are currently 25 cases of serious illness requiring oxygen supplementation, and 6 in critical condition in the intensive care unit (ICU).\u2022 Over the last 28 days, the percentage of unvaccinated who became severely ill or died is 4.5%, while that for the fully vaccinated is 0.7%.\u2022 As of 9 September 2021, 81% of our population has completed their full regimen/ received two doses of COVID-19 vaccines, and 83% has received at least one dose. \u2022 As of 10 September 2021, 12pm, the Ministry of Health (MOH) has detected a total of 573 new cases of COVID-19 infection in Singapore today.",
            "date_published": "Fri, 10 Sep 2021 15:53:00 Z",
            "article_link": "https://www.moh.gov.sg/news-highlights/details/update-on-local-covid-19-situation-(10-sep-2021)/"
        },
        {
            "title": "Update on Local COVID-19 Situation",
            "body_text": "664 cases are currently warded in hospital. There are currently 26 cases of serious illness requiring oxygen supplementation, and 7 in critical condition in the intensive care unit (ICU). Over the last 28 days, the percentage of unvaccinated who became severely ill or died is 5.2%, while that for the fully vaccinated is 0.8%. As of 8 September 2021, 81% of our population has completed their full regimen/ received two doses of COVID-19 vaccines, and 83% has received at least one dose.  As of 9 September 2021, 12pm, the Ministry of Health (MOH) has detected a total of 457 new cases of COVID-19 infection in Singapore today.",
            "date_published": "Thu, 09 Sep 2021 15:25:00 Z",
            "article_link": "https://www.moh.gov.sg/news-highlights/details/update-on-local-covid-19-situation_9_September_2021/"
        },
        {
            "title": "Update on Local COVID-19 Situation (8 Sep 2021)",
            "body_text": "664 cases are currently warded in hospital. There are currently 23 cases of serious illness requiring oxygen supplementation, and 6 in critical condition in the intensive care unit (ICU). Over the last 28 days, the percentage of unvaccinated who became severely ill or died is 6.1%, while that for the fully vaccinated is 0.7%. As of 7 September 2021, 81% of our population has completed their full regimen/ received two doses of COVID-19 vaccines, and 83% has received at least one dose. As of 8 September 2021, 12pm, the Ministry of Health (MOH) has detected a total of 349 new cases of COVID-19 infection in Singapore today.",
            "date_published": "Wed, 08 Sep 2021 15:30:00 Z",
            "article_link": "https://www.moh.gov.sg/news-highlights/details/update-on-local-covid-19-situation-(8-sep-2021)/"
        },
        {
            "title": "Update on Local COVID-19 Situation and Vaccination Progress (7 Sep)",
            "body_text": "As of 7 September 2021, 12pm, the Ministry of Health (MOH) has confirmed and verified that there are 328 cases of locally transmitted COVID-19 infection and 4 imported cases.643 cases are currently warded in hospital. Most are well and under observation. There are currently 24 cases of serious illness requiring oxygen supplementation, and 6 in critical condition in the intensive care unit (ICU).Over the last 28 days, the percentage of unvaccinated who became severely ill or died is 6.1%, while that for the fully vaccinated is 0.8%.As of 6 September 2021, 81% of our population has completed their full regimen/ received two doses of COVID-19 vaccines, and 83% has received at least one dose.",
            "date_published": "Tue, 07 Sep 2021 14:30:00 Z",
            "article_link": "https://www.moh.gov.sg/news-highlights/details/update-on-local-covid-19-situation-and-vaccination-progress-(7-sep)/"
        }
    ];

    const gp_columns = [
        {title: 'Key', dataIndex: 'key', key: 'key'},
        {title: 'Publish Date', dataIndex: 'datePublished', key: 'datePublished'},
        {title: 'Minutes to Read', dataIndex: 'minutesToRead', key: 'minutesToRead'},
        {title: 'Article Title', dataIndex: 'articleTitle', key: 'articleTitle'},
        {title: 'Description', dataIndex: 'articleDescription', key: 'articleDescription'},
        {
            title: 'Edit', dataIndex: 'edit', key: 'edit',
            render: edit => <EditOutlined/>,
        },
    ];

    const daily_columns = [
        {title: 'Key', dataIndex: 'key', key: 'key'},
        {title: 'Title', dataIndex: 'title', key: 'title'},
        {title: 'Article Url', dataIndex: 'articleUrl', key: 'articleUrl'},
        {title: 'Publish Date', dataIndex: 'datePublished', key: 'datePublished'},
        {
            title: 'Edit', dataIndex: 'edit', key: 'edit',
            render: edit => <EditOutlined/>,
        },
    ];

    return (
        <>
            {loading ? <Spinner/> :
                <>
                    <AdminNavbar user = {Cookies.get('username')}/>
                    <Row>
                        <Col flex="100px"></Col>
                        <Col flex="auto">
                            <Breadcrumb style={{paddingTop: 20}}>
                                <Breadcrumb.Item href="/admin">
                                    <HomeOutlined style={{display: 'inline-flex'}}/>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    <span>CMS</span>
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <PageHeader
                                className="site-page-header"
                                title="Content Management System"
                                subTitle="Manage Locus announcement content"
                                style={{paddingTop: 0, paddingBottom: 30, paddingLeft: 0}}
                            />
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="Government Press" key="1">
                                    <Table columns={gp_columns} dataSource={gp_data}
                                           expandable={{
                                               expandedRowRender: record => <>
                                                   <Row>
                                                       <Col span={6} style={{paddingRight: 20}}>
                                                           <Image src={record.imgUrl}/>
                                                       </Col>
                                                       <Col span={16}>
                                                           <Descriptions title="Article Information" bordered>
                                                               <Descriptions.Item
                                                                   label="Article ID">{record.articleID}</Descriptions.Item>
                                                               <Descriptions.Item label="Minutes to Read"
                                                                                  span={2}>{record.minutesToRead}</Descriptions.Item>

                                                               <Descriptions.Item label="Date Published"
                                                                                  span={3}>{record.datePublished}</Descriptions.Item>

                                                               <Descriptions.Item
                                                                   label="Title"
                                                                   span={3}>{record.articleTitle}</Descriptions.Item>

                                                               <Descriptions.Item
                                                                   label="Summary"
                                                                   span={3}>{record.articleSummarized}</Descriptions.Item>

                                                               <Descriptions.Item label="Description"
                                                                                  span={3}>{record.articleDescription}</Descriptions.Item>

                                                               <Descriptions.Item
                                                                   label="Article URL"
                                                                   span={3}>{record.articleUrl}</Descriptions.Item>
                                                           </Descriptions>
                                                       </Col>
                                                   </Row>
                                               </>
                                           }}/>

                                </TabPane>
                                <TabPane tab="Daily Reports" key="2">
                                    <Table columns={daily_columns} dataSource={daily_data}
                                           expandable={{
                                               expandedRowRender: record => <>
                                                   <Row>
                                                       <Col span={24}>
                                                           <Descriptions title="User Account Info" bordered>
                                                               <Descriptions.Item
                                                                   label="Title"
                                                                   span={3}>{record.title}</Descriptions.Item>

                                                               <Descriptions.Item
                                                                   label="Date Published"
                                                                   span={3}>{record.date_published}</Descriptions.Item>

                                                               <Descriptions.Item
                                                                   label="Description"
                                                                   span={3}>{record.body_text}</Descriptions.Item>

                                                               <Descriptions.Item
                                                                   label="Article LInk"
                                                                   span={3}>{record.article_link}</Descriptions.Item>
                                                           </Descriptions>
                                                       </Col>
                                                   </Row>

                                                   <Row>
                                                       <Col span={6}>
                                                       </Col>
                                                       <Col span={18}>
                                                           <Divider orientation="left" plain>
                                                               Adminstrative Actions
                                                           </Divider>
                                                           <TextArea rows={4} style={{marginTop: 10}}
                                                                     placeholder="Please input your justifications (if any)"/>
                                                           <Space wrap style={{marginTop: 10}}>
                                                               <Button onClick={showConfirm}
                                                                       type="primary">Verify</Button>
                                                               <Button onClick={showPromiseConfirm} type="primary"
                                                                       danger>Reject</Button>
                                                               <Button onClick={showPropsConfirm} danger>Revoke
                                                                   Verification</Button>
                                                           </Space>
                                                       </Col>
                                                   </Row>
                                               </>
                                           }}/>
                                </TabPane>
                            </Tabs>
                        </Col>
                        <Col flex="100px"></Col>
                    </Row>
                </>
            }
        </>
    );
}

function showConfirm() {
    confirm({
        title: 'Do you Want to delete these items?',
        icon: <ExclamationCircleOutlined/>,
        content: 'Some descriptions',
        onOk() {
            console.log('OK');
        },
        onCancel() {
            console.log('Cancel');
        },
    });
}

function showPromiseConfirm() {
    confirm({
        title: 'Do you want to delete these items?',
        icon: <ExclamationCircleOutlined/>,
        content: 'When clicked the OK button, this dialog will be closed after 1 second',
        onOk() {
            return new Promise((resolve, reject) => {
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            }).catch(() => console.log('Oops errors!'));
        },
        onCancel() {
        },
    });
}

function showPropsConfirm() {
    confirm({
        title: 'Are you sure delete this task?',
        icon: <ExclamationCircleOutlined/>,
        content: 'Some descriptions',
        okText: 'Yes',
        okType: 'danger',
        okButtonProps: {
            disabled: true,
        },
        cancelText: 'No',
        onOk() {
            console.log('OK');
        },
        onCancel() {
            console.log('Cancel');
        },
    });
}
