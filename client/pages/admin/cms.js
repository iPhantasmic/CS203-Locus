import {useEffect, useState} from "react";
import AdminNavbar from "../../components/AdminNavbar";
import Spinner from "../../components/Spinner";
import {
    Breadcrumb,
    Col,
    Descriptions,
    Image, notification,
    PageHeader,
    Row,
    Table,
    Tabs,
} from "antd";
import {EditOutlined, HomeOutlined} from "@ant-design/icons";
import toastr from "toastr";
import "toastr/build/toastr.css";
import Cookies from "js-cookie";
import {useRouter} from "next/router";

export default function Cms() {
    // Show Spin while loading is true
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    // Allocation for Data
    const [dailyData, setDailyData] = useState([]);
    const {TabPane} = Tabs;

    // Fetch Database Data onLoad
    const axios = require("axios");
    var config = {
        method: "get",
        url: "https://locus-dev.herokuapp.com/v1/daily",
    };

    const uploadFailureNotification = (type) => {
        notification[type]({
            message: "Oops! An error occurred.",
            description:
                "Unable to reach Heroku database.",
        });
    };

    // Fetch data onLoad
    useEffect(() => {
        async function fetchNews() {
            await axios(config).then(function (response) {
                setDailyData(response.data.json_list)
                console.log(response.data.json_list)
                setLoading(false)
            }).catch(function (error) {
                setLoading(false);
                uploadFailureNotification("error");
            })
        }

        fetchNews();
    }, []);

    const daily_columns = [
        {title: "ID", dataIndex: "articleId", key: "articleId"},
        {
            title: "Publish Date",
            dataIndex: "datePublished",
            key: "datePublished",
        },
        {
            title: "Article Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Body Text",
            dataIndex: "bodyText",
            key: "bodyText",
        },
    ];


    const dummy_daily_data = [
        {
            imgUrl: "www.gov.sg//-/media/gov/covid-19/resources_may2021.jpg",
            minutesToRead: "7",
            articleUrl: "www.gov.sg//article/covid-19-resources",
            articleTitle: "COVID-19 Resources",
            articleDescription:
                "A collection of useful sources, posters and videos on COVID-19 (Coronavirus Disease 2019)",
            articleID: "{6EA3E704-DFF6-48FA-921D-50A9E9DFE707}",
            articleSummarized:
                "Official COVID-19 sources Posters on COVID-19 Downloadables \ud83d\udcbb\ud83d\udcf1 Websites, Social Media & Mobile Apps Official COVID-19 websites Ministry of Health Gov.sg COVID-19 Gov.sg social media channels Keeping the public informed on the latest COVID-19 situation in Singapore Gov.sg WhatsApp Subscription Available in 4 official languages Local Overseas Gov.sg Telegram Gov.sg Facebook Gov.sg Twitter Gov.sg Instagram Gov.sg YouTube Gov.sg TikTok Living with COVID-19 Find out what you should do if you are exposed or test positive for COVID-19 covid.gov.sg COVID-19 Situation Report Find latest statistics on COVID-19 and the map of areas frequented by detected COVID-19 cases in Singapore covidsitrep.moh.gov.sg COVID-19 Frequently Asked Questions Find answers to popular COVID-19 questions ask.gov.sg/agency/moh Go Where Your go-to government websites to fight against COVID-19 gowhere.gov.sg ART Go Where Locate a vending machine to collect your Antigen Rapid Test (ART) self-test kits, if you are eligible gowhere.gov.sg/art Singapore COVID-19 Symptom Checker Check your symptoms and decide on your next steps sgcovidcheck.gov.sg COVID-19 Vaccination Registration The COVID-19 vaccination programme seeks to protect Singaporeans against COVID-19, as well as to protect businessses and jobs through the progressive re-opening of Singapore vaccine.gov.sg Not\u03b1rise Use Not\u03b1rise to get your Pre-Departure Test (PDT) or Vaccination HealthCerts digitally authenticated and endorsed in 4 easy steps. notarise.gov.sg OneMap Find the shortest traveling route to nearby PHPCs and essential amenities including hawker centres and supermarkets New on OneMap: Vaccination Centres, COVID-19 polymerase chain reaction (PCR) test providers OneMap website OneMap Android OneMap iOS Regional Screening Centres (RSCs) RSCs are set up around Singapore to carry out COVID-19 swab tests for target groups from the general community who are well or have been diagnosed with acute respiratory infection (ARI). Find the closest regional screening centre to you. moh.gov.sg/covid-19/rsc Stories Of Us Fear, anxiety, hope, gratitude \u2013 we all have our stories to tell of this period. They remind us of what living through COVID-19 means to us, and are testament to our resolve as we navigate these difficult times. Reflect on the stories of others and share yours too storiesofus.gov.sg SafeTravel As Singapore progressively reopens amid the COVID-19 pandemic, Singapore has implemented special travel arrangements with some countries/regions to facilitate travel while safeguarding public health safetravel.ica.gov.sg TraceTogether Help stop the spread of COVID-19 through community-driven contact tracing Website App Store Google Play Token Go Where The TraceTogether Token complements the TraceTogether App by extending the protection provided by digital contact tracing tools to those who may not own or prefer not to use a mobile phone. token.gowhere.gov.sg COVID-19 Recovery Grant \u2022 Lower- to middle-income employees and self-employed persons who are financially impacted by COVID-19 may be eligible to receive up to $700 a month for three months. \u2022 Applications open from 18 January 2021. COVID-19 Recovery Grant Support Go Where Find available grants, funds and packages for individuals, or use the eligibility checker to find out which available support schemes are applicable to you supportgowhere.gov.sg Flu Go Where Locate a Public Health Preparedness Clinic (PHPC) or Swab and Send Home (SASH) clinic near you flu.gowhere.gov.sg Mask Go Where How to care for your mask? maskgowhere.gov.sg Space Out Check how crowded malls, supermarkets and post offices are before going spaceout.gov.sg Safe Distance @ Parks Check how crowded parks are before going safedistparks.nparks.gov.sg OneService App Report hotspots where safe distancing is still not practised How to report: 1",
            datePublished: "02 Oct 2021",
        },
    ];

    return (
        <>
            {loading ? (
                <Spinner/>
            ) : (
                <>
                    <AdminNavbar
                        user={Cookies.get("username")}
                        userID={Cookies.get("id")}
                    />
                    <div className="px-16">
                        <Col flex="100px"></Col>
                        <Col flex="auto">
                            <Breadcrumb style={{paddingTop: 20}}>
                                <Breadcrumb.Item href="/admin">
                                    <HomeOutlined
                                        style={{display: "inline-flex"}}
                                    />
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    <span>CMS</span>
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <div className="flex-row justify-between flex mr-10">
                                <PageHeader
                                    className="site-page-header"
                                    title="Content Management System"
                                    subTitle="Manage Locus announcement content"
                                    style={{
                                        paddingTop: 0,
                                        paddingBottom: 30,
                                        paddingLeft: 0,
                                    }}
                                />
                                <button onClick={() => router.push("/admin/addnewarticle")}
                                        className="py-2 px-4 mt-5 ml-0 text-sm bg-green-500 rounded-full text-white font-semibold hover:bg-green-600">Create
                                    new update
                                </button>
                            </div>

                            <Tabs defaultActiveKey="1">
                                <TabPane tab="Government Press" key="1">
                                    <Table
                                        columns={daily_columns}
                                        dataSource={dailyData}
                                    />
                                </TabPane>
                            </Tabs>
                        </Col>
                        <Col flex="100px"></Col>
                    </div>
                </>
            )}
        </>
    );
}
